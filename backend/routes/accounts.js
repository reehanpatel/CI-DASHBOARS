const express = require('express');
const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');
const BillingProfile = require('../models/BillingProfile');
const Client = require('../models/Client');
const Service = require('../models/Service');
const SystemSetting = require('../models/SystemSetting');
const { verifyToken, requireRole } = require('../middleware/auth');
const { createNotificationForInvoice, recordSyncUpdate } = require('../utils/notify');

const router = express.Router();

// Helper to generate next sequential invoice number
async function getNextInvoiceNumber() {
  const currentYear = new Date().getFullYear();
  const prefix = `INV-${currentYear}-`;
  const lastInvoice = await Invoice.findOne({ invoiceNumber: new RegExp(`^${prefix}`) })
    .sort({ invoiceNumber: -1 })
    .collation({ locale: 'en', numericOrdering: true });

  if (!lastInvoice) {
    return `${prefix}0001`;
  }
  const parts = lastInvoice.invoiceNumber.split('-');
  const seq = parseInt(parts[2], 10);
  const nextSeq = isNaN(seq) ? 1 : seq + 1;
  return `${prefix}${String(nextSeq).padStart(4, '0')}`;
}

// Helper to generate next sequential payment number
async function getNextPaymentNumber() {
  const currentYear = new Date().getFullYear();
  const prefix = `PAY-${currentYear}-`;
  const lastPayment = await Payment.findOne({ paymentNumber: new RegExp(`^${prefix}`) })
    .sort({ paymentNumber: -1 })
    .collation({ locale: 'en', numericOrdering: true });

  if (!lastPayment) {
    return `${prefix}0001`;
  }
  const parts = lastPayment.paymentNumber.split('-');
  const seq = parseInt(parts[2], 10);
  const nextSeq = isNaN(seq) ? 1 : seq + 1;
  return `${prefix}${String(nextSeq).padStart(4, '0')}`;
}

// Helper to recalculate overdue statuses
async function syncAllInvoiceStatuses() {
  const now = new Date();
  await Invoice.updateMany(
    {
      status: { $in: ['issued', 'partially_paid'] },
      dueDate: { $lt: now },
      pendingAmount: { $gt: 0 }
    },
    { $set: { status: 'overdue' } }
  );
}

/* ─────────────────────────────────────────────────────────────
   CLIENT PORTAL: Client viewing their own invoices & payments
   ───────────────────────────────────────────────────────────── */
router.get('/client-portal', verifyToken, async (req, res) => {
  try {
    let clientId = req.user.clientId;
    if (!clientId && req.user.role === 'superadmin') {
      clientId = req.query.clientId;
    }
    if (!clientId) {
      return res.status(400).json({ error: 'No associated client found for this account' });
    }

    await syncAllInvoiceStatuses();

    const [invoices, payments, profile, client] = await Promise.all([
      Invoice.find({ clientId, status: { $ne: 'cancelled' } }).sort({ issueDate: -1 }),
      Payment.find({ clientId, status: 'completed' }).sort({ paymentDate: -1 }),
      BillingProfile.findOne({ clientId }),
      Client.findById(clientId).select('name')
    ]);

    const totalBilled = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const totalPaid = payments.reduce((sum, pay) => sum + (pay.amount || 0), 0);
    const pendingAmount = invoices.reduce((sum, inv) => sum + (inv.pendingAmount || 0), 0);
    const overdueAmount = invoices
      .filter(inv => inv.status === 'overdue')
      .reduce((sum, inv) => sum + (inv.pendingAmount || 0), 0);

    res.json({
      clientName: client ? client.name : 'Valued Client',
      summary: {
        totalBilled,
        totalPaid,
        pendingAmount,
        overdueAmount,
        invoiceCount: invoices.length,
        paymentCount: payments.length
      },
      billingProfile: profile,
      invoices,
      payments
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load client billing portal', detail: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────
   ACCOUNTS & SUPERADMIN AUTH REQUIRED FOR ALL BELOW ENDPOINTS
   ───────────────────────────────────────────────────────────── */
router.use(verifyToken, requireRole('superadmin', 'accounts'));

/* ── 1. ACCOUNTS DASHBOARD OVERVIEW ── */
router.get('/dashboard', async (req, res) => {
  try {
    await syncAllInvoiceStatuses();

    const [invoices, payments, clients, profiles] = await Promise.all([
      Invoice.find({ status: { $ne: 'cancelled' } }).sort({ issueDate: -1 }),
      Payment.find({ status: 'completed' }).sort({ paymentDate: -1 }),
      Client.find().select('name'),
      BillingProfile.find()
    ]);

    const totalBilled = invoices.reduce((s, i) => s + (i.totalAmount || 0), 0);
    const totalReceived = payments.reduce((s, p) => s + (p.amount || 0), 0);
    const totalPending = invoices.reduce((s, i) => s + (i.pendingAmount || 0), 0);
    const totalOverdue = invoices
      .filter(i => i.status === 'overdue')
      .reduce((s, i) => s + (i.pendingAmount || 0), 0);

    const now = new Date();
    const aging = {
      current: 0,      // 0 - 30 days overdue or not yet due
      days31to60: 0,   // 31 - 60 days overdue
      days61to90: 0,   // 61 - 90 days overdue
      days90plus: 0    // > 90 days overdue
    };

    invoices.forEach(inv => {
      if (inv.pendingAmount > 0 && inv.status !== 'cancelled' && inv.status !== 'draft') {
        const due = new Date(inv.dueDate);
        const diffDays = Math.floor((now - due) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) {
          aging.current += inv.pendingAmount;
        } else if (diffDays <= 60) {
          aging.days31to60 += inv.pendingAmount;
        } else if (diffDays <= 90) {
          aging.days61to90 += inv.pendingAmount;
        } else {
          aging.days90plus += inv.pendingAmount;
        }
      }
    });

    const invoiceCounts = {
      total: invoices.length,
      paid: invoices.filter(i => i.status === 'paid').length,
      partially_paid: invoices.filter(i => i.status === 'partially_paid').length,
      issued: invoices.filter(i => i.status === 'issued').length,
      overdue: invoices.filter(i => i.status === 'overdue').length,
      draft: invoices.filter(i => i.status === 'draft').length
    };

    // Client-wise outstanding summary (top pending balances)
    const clientMap = {};
    clients.forEach(c => {
      clientMap[String(c._id)] = {
        clientId: c._id,
        clientName: c.name,
        totalBilled: 0,
        totalPaid: 0,
        pendingAmount: 0,
        overdueAmount: 0,
        invoiceCount: 0,
        overdueCount: 0
      };
    });

    invoices.forEach(inv => {
      const cId = String(inv.clientId);
      if (!clientMap[cId]) {
        clientMap[cId] = {
          clientId: inv.clientId,
          clientName: inv.clientName || 'Unknown Client',
          totalBilled: 0,
          totalPaid: 0,
          pendingAmount: 0,
          overdueAmount: 0,
          invoiceCount: 0,
          overdueCount: 0
        };
      }
      clientMap[cId].totalBilled += inv.totalAmount || 0;
      clientMap[cId].totalPaid += inv.amountPaid || 0;
      clientMap[cId].pendingAmount += inv.pendingAmount || 0;
      clientMap[cId].invoiceCount += 1;
      if (inv.status === 'overdue') {
        clientMap[cId].overdueAmount += inv.pendingAmount || 0;
        clientMap[cId].overdueCount += 1;
      }
    });

    const topClientsPending = Object.values(clientMap)
      .filter(c => c.pendingAmount > 0)
      .sort((a, b) => b.pendingAmount - a.pendingAmount)
      .slice(0, 10);

    // Monthly Trend (Last 6 months)
    const monthlyTrend = [];
    for (let m = 5; m >= 0; m--) {
      const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - m + 1, 1);
      const monthLabel = d.toLocaleString('default', { month: 'short', year: '2-digit' });

      const billed = invoices
        .filter(inv => {
          const idate = new Date(inv.issueDate);
          return idate >= d && idate < nextMonth;
        })
        .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

      const collected = payments
        .filter(p => {
          const pdate = new Date(p.paymentDate);
          return pdate >= d && pdate < nextMonth;
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      monthlyTrend.push({
        month: monthLabel,
        billed,
        collected
      });
    }

    res.json({
      metrics: {
        totalBilled,
        totalReceived,
        totalPending,
        totalOverdue,
        collectionRate: totalBilled > 0 ? Math.round((totalReceived / totalBilled) * 100) : 0,
        invoiceCounts
      },
      aging,
      monthlyTrend,
      topClientsPending,
      recentInvoices: invoices.slice(0, 6),
      recentPayments: payments.slice(0, 6),
      totalClients: clients.length,
      activeBillingProfiles: profiles.filter(p => p.status === 'active').length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch accounts dashboard', detail: err.message });
  }
});

/* ── 2. NEXT NUMBERS ── */
router.get('/next-invoice-number', async (req, res) => {
  try {
    const num = await getNextInvoiceNumber();
    res.json({ invoiceNumber: num });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate invoice number', detail: err.message });
  }
});

router.get('/next-payment-number', async (req, res) => {
  try {
    const num = await getNextPaymentNumber();
    res.json({ paymentNumber: num });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate payment number', detail: err.message });
  }
});

/* ── 3. INVOICES CRUD ── */
router.get('/invoices', async (req, res) => {
  try {
    await syncAllInvoiceStatuses();
    const { status, clientId, search, fromDate, toDate } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (clientId) {
      filter.clientId = clientId;
    }
    if (fromDate || toDate) {
      filter.issueDate = {};
      if (fromDate) filter.issueDate.$gte = new Date(fromDate);
      if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);
        filter.issueDate.$lte = end;
      }
    }
    if (search) {
      const q = search.trim();
      filter.$or = [
        { invoiceNumber: new RegExp(q, 'i') },
        { clientName: new RegExp(q, 'i') },
        { 'items.description': new RegExp(q, 'i') }
      ];
    }

    const invoices = await Invoice.find(filter).sort({ issueDate: -1, createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices', detail: err.message });
  }
});

router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    invoice.syncStatus();
    await invoice.save();

    const payments = await Payment.find({ invoiceId: invoice._id }).sort({ paymentDate: -1 });
    const client = await Client.findById(invoice.clientId);
    const profile = await BillingProfile.findOne({ clientId: invoice.clientId });

    res.json({
      invoice,
      payments,
      client,
      billingProfile: profile
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load invoice', detail: err.message });
  }
});

router.post('/invoices', async (req, res) => {
  try {
    const {
      clientId,
      invoiceNumber: customInvoiceNumber,
      issueDate,
      dueDate,
      billingType,
      status: requestedStatus,
      items,
      discount,
      taxRate,
      notes,
      paymentTerms,
      billingAddress,
      gstin,
      bankDetails
    } = req.body;

    if (!clientId) return res.status(400).json({ error: 'Client is required' });
    if (!dueDate) return res.status(400).json({ error: 'Due date is required' });
    if (!items || !items.length) return res.status(400).json({ error: 'At least one invoice line item is required' });

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: 'Selected client not found' });

    const invoiceNumber = (customInvoiceNumber && customInvoiceNumber.trim()) || (await getNextInvoiceNumber());

    // Check duplicate
    const existing = await Invoice.findOne({ invoiceNumber: invoiceNumber.trim().toUpperCase() });
    if (existing) {
      return res.status(400).json({ error: `Invoice number ${invoiceNumber} already exists. Please use a unique number.` });
    }

    // Process line items
    let subtotal = 0;
    const processedItems = items.map(item => {
      const qty = Number(item.quantity) || 1;
      const rate = Number(item.rate) || 0;
      const amount = item.amount != null ? Number(item.amount) : qty * rate;
      subtotal += amount;
      return {
        description: (item.description || 'Service rendered').trim(),
        serviceId: item.serviceId || null,
        serviceName: item.serviceName || '',
        quantity: qty,
        rate,
        amount
      };
    });

    const numDiscount = Number(discount) || 0;
    const taxableAmount = Math.max(0, subtotal - numDiscount);
    const numTaxRate = taxRate != null ? Number(taxRate) : 18;
    const taxAmount = Math.round(taxableAmount * (numTaxRate / 100));
    const totalAmount = taxableAmount + taxAmount;
    const pendingAmount = totalAmount;

    let initStatus = requestedStatus || 'issued';
    if (initStatus !== 'draft') {
      if (new Date() > new Date(dueDate)) {
        initStatus = 'overdue';
      } else {
        initStatus = 'issued';
      }
    }

    const invoice = await Invoice.create({
      invoiceNumber: invoiceNumber.trim().toUpperCase(),
      clientId: client._id,
      clientName: client.name,
      issueDate: issueDate ? new Date(issueDate) : new Date(),
      dueDate: new Date(dueDate),
      billingType: billingType || 'retainer',
      status: initStatus,
      items: processedItems,
      subtotal,
      discount: numDiscount,
      taxRate: numTaxRate,
      taxAmount,
      totalAmount,
      amountPaid: 0,
      pendingAmount,
      notes: notes || 'Thank you for partnering with COGNITO INNOVO PRIVATE LIMITED.',
      paymentTerms: paymentTerms || 'Payment due within 15 days of invoice date.',
      billingAddress: billingAddress || '',
      gstin: gstin || '',
      bankDetails: bankDetails || undefined,
      createdById: req.user ? req.user._id : null,
      createdByName: req.user ? req.user.name : 'System'
    });

    await createNotificationForInvoice({
      type: 'invoice_issued',
      title: '🧾 New Invoice Issued',
      message: `Invoice #${invoice.invoiceNumber} for ₹${(invoice.totalAmount || 0).toLocaleString('en-IN')} has been issued to ${invoice.clientName}.`,
      invoice,
      actorId: req.user ? req.user._id : null
    });

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create invoice', detail: err.message });
  }
});

router.put('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const {
      clientId,
      issueDate,
      dueDate,
      billingType,
      status,
      items,
      discount,
      taxRate,
      notes,
      paymentTerms,
      billingAddress,
      gstin,
      bankDetails
    } = req.body;

    if (clientId && String(clientId) !== String(invoice.clientId)) {
      const client = await Client.findById(clientId);
      if (client) {
        invoice.clientId = client._id;
        invoice.clientName = client.name;
      }
    }

    if (issueDate) invoice.issueDate = new Date(issueDate);
    if (dueDate) invoice.dueDate = new Date(dueDate);
    if (billingType) invoice.billingType = billingType;
    if (notes != null) invoice.notes = notes;
    if (paymentTerms != null) invoice.paymentTerms = paymentTerms;
    if (billingAddress != null) invoice.billingAddress = billingAddress;
    if (gstin != null) invoice.gstin = gstin;
    if (bankDetails) invoice.bankDetails = bankDetails;

    if (items && Array.isArray(items)) {
      let subtotal = 0;
      invoice.items = items.map(item => {
        const qty = Number(item.quantity) || 1;
        const rate = Number(item.rate) || 0;
        const amount = item.amount != null ? Number(item.amount) : qty * rate;
        subtotal += amount;
        return {
          description: (item.description || 'Service').trim(),
          serviceId: item.serviceId || null,
          serviceName: item.serviceName || '',
          quantity: qty,
          rate,
          amount
        };
      });
      invoice.subtotal = subtotal;

      const numDiscount = discount != null ? Number(discount) : invoice.discount;
      invoice.discount = numDiscount;

      const numTaxRate = taxRate != null ? Number(taxRate) : invoice.taxRate;
      invoice.taxRate = numTaxRate;

      const taxable = Math.max(0, subtotal - numDiscount);
      invoice.taxAmount = Math.round(taxable * (numTaxRate / 100));
      invoice.totalAmount = taxable + invoice.taxAmount;
      invoice.pendingAmount = Math.max(0, invoice.totalAmount - (invoice.amountPaid || 0));
    }

    if (status) {
      invoice.status = status;
    } else {
      invoice.syncStatus();
    }

    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update invoice', detail: err.message });
  }
});

router.patch('/invoices/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['draft', 'issued', 'partially_paid', 'paid', 'overdue', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    invoice.status = status;
    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update invoice status', detail: err.message });
  }
});

router.delete('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const force = req.query.force === 'true';
    const linkedPayments = await Payment.countDocuments({ invoiceId: invoice._id });
    if (linkedPayments > 0 && !force) {
      return res.status(400).json({
        error: `Cannot delete invoice ${invoice.invoiceNumber} because it has ${linkedPayments} payment record(s). Please delete or unlink the payments first, or confirm force delete.`
      });
    }

    if (linkedPayments > 0 && force) {
      await Payment.updateMany({ invoiceId: invoice._id }, { $set: { invoiceId: null, invoiceNumber: '' } });
    }

    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: `Invoice ${invoice.invoiceNumber} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete invoice', detail: err.message });
  }
});

router.post('/invoices/bulk-delete', async (req, res) => {
  try {
    const { ids, deleteAll } = req.body;
    let query = {};
    if (deleteAll) {
      query = {};
    } else if (Array.isArray(ids) && ids.length) {
      query = { _id: { $in: ids } };
    } else {
      return res.status(400).json({ error: 'No invoice IDs provided for deletion' });
    }

    const invoicesToDelete = await Invoice.find(query).select('_id invoiceNumber');
    if (!invoicesToDelete.length) {
      return res.json({ ok: true, deletedCount: 0, message: 'No invoices found to delete' });
    }

    const invoiceIds = invoicesToDelete.map(i => i._id);

    // Unlink any payments tied to these invoices so payments ledger remains consistent
    await Payment.updateMany(
      { invoiceId: { $in: invoiceIds } },
      { $set: { invoiceId: null, invoiceNumber: '' } }
    );

    const result = await Invoice.deleteMany({ _id: { $in: invoiceIds } });

    res.json({
      ok: true,
      deletedCount: result.deletedCount,
      message: `Successfully deleted ${result.deletedCount} invoice(s)`
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to bulk delete invoices', detail: err.message });
  }
});

/* ── 4. PAYMENTS CRUD ── */
router.get('/payments', async (req, res) => {
  try {
    const { clientId, invoiceId, paymentMethod, search } = req.query;
    const filter = {};

    if (clientId) filter.clientId = clientId;
    if (invoiceId) filter.invoiceId = invoiceId;
    if (paymentMethod && paymentMethod !== 'all') filter.paymentMethod = paymentMethod;
    if (search) {
      const q = search.trim();
      filter.$or = [
        { paymentNumber: new RegExp(q, 'i') },
        { invoiceNumber: new RegExp(q, 'i') },
        { clientName: new RegExp(q, 'i') },
        { referenceId: new RegExp(q, 'i') }
      ];
    }

    const payments = await Payment.find(filter).sort({ paymentDate: -1, createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payments', detail: err.message });
  }
});

router.post('/payments', async (req, res) => {
  try {
    const {
      clientId,
      invoiceId,
      amount,
      paymentDate,
      paymentMethod,
      referenceId,
      notes,
      receiptUrl
    } = req.body;

    const numAmount = Number(amount);
    if (!clientId) return res.status(400).json({ error: 'Client is required' });
    if (!numAmount || numAmount <= 0) return res.status(400).json({ error: 'Valid payment amount is required' });

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    let invoice = null;
    let invoiceNumber = '';
    if (invoiceId) {
      invoice = await Invoice.findById(invoiceId);
      if (invoice) {
        invoiceNumber = invoice.invoiceNumber;
      }
    }

    const paymentNumber = await getNextPaymentNumber();

    const payment = await Payment.create({
      paymentNumber,
      clientId: client._id,
      clientName: client.name,
      invoiceId: invoice ? invoice._id : null,
      invoiceNumber,
      amount: numAmount,
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      paymentMethod: paymentMethod || 'bank_transfer',
      referenceId: (referenceId || '').trim(),
      receiptUrl: receiptUrl || '',
      status: 'completed',
      notes: notes || '',
      recordedById: req.user ? req.user._id : null,
      recordedByName: req.user ? req.user.name : 'Accounts'
    });

    // If tied to an invoice, adjust invoice balance and status
    if (invoice) {
      invoice.amountPaid = (invoice.amountPaid || 0) + numAmount;
      invoice.pendingAmount = Math.max(0, invoice.totalAmount - invoice.amountPaid);
      invoice.syncStatus();
      await invoice.save();

      await createNotificationForInvoice({
        type: invoice.pendingAmount <= 0 ? 'invoice_paid' : 'payment_received',
        title: invoice.pendingAmount <= 0 ? '✅ Invoice Fully Settled' : '💳 Payment Received',
        message: `Payment of ₹${numAmount.toLocaleString('en-IN')} recorded for Invoice #${invoice.invoiceNumber}. Remaining balance: ₹${invoice.pendingAmount.toLocaleString('en-IN')}.`,
        invoice,
        actorId: req.user ? req.user._id : null
      });
    } else {
      recordSyncUpdate('invoices');
    }

    res.status(201).json({
      payment,
      updatedInvoice: invoice
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record payment', detail: err.message });
  }
});

router.delete('/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    // Revert invoice amount if tied
    if (payment.invoiceId) {
      const invoice = await Invoice.findById(payment.invoiceId);
      if (invoice) {
        invoice.amountPaid = Math.max(0, (invoice.amountPaid || 0) - payment.amount);
        invoice.pendingAmount = Math.max(0, invoice.totalAmount - invoice.amountPaid);
        invoice.syncStatus();
        await invoice.save();
      }
    }

    await Payment.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: `Payment ${payment.paymentNumber} removed and balances restored` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete payment', detail: err.message });
  }
});

router.post('/payments/bulk-delete', async (req, res) => {
  try {
    const { ids, deleteAll } = req.body;
    let query = {};
    if (deleteAll) {
      query = {};
    } else if (Array.isArray(ids) && ids.length) {
      query = { _id: { $in: ids } };
    } else {
      return res.status(400).json({ error: 'No payment IDs provided for deletion' });
    }

    const paymentsToDelete = await Payment.find(query);
    if (!paymentsToDelete.length) {
      return res.json({ ok: true, deletedCount: 0, message: 'No payments found to delete' });
    }

    // Revert invoice balances
    const invoiceReversions = {};
    for (const p of paymentsToDelete) {
      if (p.invoiceId) {
        const idStr = String(p.invoiceId);
        invoiceReversions[idStr] = (invoiceReversions[idStr] || 0) + (p.amount || 0);
      }
    }

    for (const [invId, totalPaidToRevert] of Object.entries(invoiceReversions)) {
      const invoice = await Invoice.findById(invId);
      if (invoice) {
        invoice.amountPaid = Math.max(0, (invoice.amountPaid || 0) - totalPaidToRevert);
        invoice.pendingAmount = Math.max(0, invoice.totalAmount - invoice.amountPaid);
        invoice.syncStatus();
        await invoice.save();
      }
    }

    const result = await Payment.deleteMany(query);
    res.json({
      ok: true,
      deletedCount: result.deletedCount,
      message: `Successfully deleted ${result.deletedCount} payment(s) and restored invoice balances`
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to bulk delete payments', detail: err.message });
  }
});

router.post('/clear-all', async (req, res) => {
  try {
    const [invResult, payResult] = await Promise.all([
      Invoice.deleteMany({}),
      Payment.deleteMany({})
    ]);

    res.json({
      ok: true,
      message: `Cleared all accounts data: ${invResult.deletedCount} invoice(s) and ${payResult.deletedCount} payment(s) removed.`,
      invoicesDeleted: invResult.deletedCount,
      paymentsDeleted: payResult.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear accounts data', detail: err.message });
  }
});

/* ── 5. BILLING PROFILES CRUD ── */
router.get('/billing-profiles', async (req, res) => {
  try {
    const [clients, profiles] = await Promise.all([
      Client.find().sort('name'),
      BillingProfile.find()
    ]);

    const profileMap = {};
    profiles.forEach(p => {
      profileMap[String(p.clientId)] = p;
    });

    const result = clients.map(c => {
      const p = profileMap[String(c._id)];
      return {
        clientId: c._id,
        clientName: c.name,
        profile: p || {
          clientId: c._id,
          clientName: c.name,
          billingType: 'retainer',
          billingCycle: 'monthly',
          retainerAmount: 0,
          hourlyRate: 0,
          currency: 'INR',
          gstin: '',
          panNumber: '',
          billingEmail: '',
          billingPhone: '',
          billingAddress: '',
          billingDay: 1,
          paymentTermsDays: 15,
          status: 'active',
          notes: ''
        }
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch billing profiles', detail: err.message });
  }
});

router.put('/billing-profiles/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const {
      billingType,
      billingCycle,
      retainerAmount,
      hourlyRate,
      currency,
      gstin,
      panNumber,
      billingEmail,
      billingPhone,
      billingAddress,
      billingDay,
      paymentTermsDays,
      status,
      notes
    } = req.body;

    let profile = await BillingProfile.findOne({ clientId });
    if (!profile) {
      profile = new BillingProfile({
        clientId: client._id,
        clientName: client.name
      });
    }

    if (billingType) profile.billingType = billingType;
    if (billingCycle) profile.billingCycle = billingCycle;
    if (retainerAmount != null) profile.retainerAmount = Number(retainerAmount) || 0;
    if (hourlyRate != null) profile.hourlyRate = Number(hourlyRate) || 0;
    if (currency) profile.currency = currency;
    if (gstin != null) profile.gstin = gstin.trim().toUpperCase();
    if (panNumber != null) profile.panNumber = panNumber.trim().toUpperCase();
    if (billingEmail != null) profile.billingEmail = billingEmail.trim();
    if (billingPhone != null) profile.billingPhone = billingPhone.trim();
    if (billingAddress != null) profile.billingAddress = billingAddress.trim();
    if (billingDay != null) profile.billingDay = Number(billingDay) || 1;
    if (paymentTermsDays != null) profile.paymentTermsDays = Number(paymentTermsDays) || 15;
    if (status) profile.status = status;
    if (notes != null) profile.notes = notes.trim();

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update billing profile', detail: err.message });
  }
});

/* ── 6. ONE-CLICK GENERATE INVOICE FROM BILLING PROFILE ── */
router.post('/billing-profiles/:clientId/generate-invoice', async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const profile = await BillingProfile.findOne({ clientId });
    const retainerAmount = profile ? profile.retainerAmount : 0;
    const amount = Number(req.body.amount) || retainerAmount || 50000;

    const invoiceNumber = await getNextInvoiceNumber();
    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    const termsDays = profile ? profile.paymentTermsDays || 15 : 15;
    const dueDate = new Date(now.getTime() + termsDays * 24 * 60 * 60 * 1000);

    const taxRate = req.body.taxRate != null ? Number(req.body.taxRate) : 18;
    const taxAmount = Math.round(amount * (taxRate / 100));
    const totalAmount = amount + taxAmount;

    const description = req.body.description || `Digital Marketing & Strategy Retainer — ${currentMonth}`;

    const invoice = await Invoice.create({
      invoiceNumber,
      clientId: client._id,
      clientName: client.name,
      issueDate: now,
      dueDate,
      billingType: profile ? profile.billingType : 'retainer',
      status: 'issued',
      items: [
        {
          description,
          quantity: 1,
          rate: amount,
          amount
        }
      ],
      subtotal: amount,
      discount: 0,
      taxRate,
      taxAmount,
      totalAmount,
      amountPaid: 0,
      pendingAmount: totalAmount,
      billingAddress: profile ? profile.billingAddress : '',
      gstin: profile ? profile.gstin : '',
      notes: `Invoice generated for ${currentMonth}. Thank you for your continued business.`,
      paymentTerms: `Net ${termsDays} days.`,
      createdById: req.user ? req.user._id : null,
      createdByName: req.user ? req.user.name : 'Accounts'
    });

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate invoice from profile', detail: err.message });
  }
});

/* ── 7. DETAILED OUTSTANDING RECEIVABLES & AGING ── */
router.get('/receivables', async (req, res) => {
  try {
    await syncAllInvoiceStatuses();

    const [clients, invoices, payments, profiles] = await Promise.all([
      Client.find().sort('name'),
      Invoice.find({ status: { $ne: 'cancelled' } }).sort({ dueDate: 1 }),
      Payment.find({ status: 'completed' }).sort({ paymentDate: -1 }),
      BillingProfile.find()
    ]);

    const now = new Date();
    const profileMap = {};
    profiles.forEach(p => { profileMap[String(p.clientId)] = p; });

    const clientPaymentsMap = {};
    payments.forEach(p => {
      const cId = String(p.clientId);
      if (!clientPaymentsMap[cId]) clientPaymentsMap[cId] = [];
      clientPaymentsMap[cId].push(p);
    });

    const clientInvoicesMap = {};
    invoices.forEach(inv => {
      const cId = String(inv.clientId);
      if (!clientInvoicesMap[cId]) clientInvoicesMap[cId] = [];
      clientInvoicesMap[cId].push(inv);
    });

    const receivables = clients.map(c => {
      const cId = String(c._id);
      const cInvoices = clientInvoicesMap[cId] || [];
      const cPayments = clientPaymentsMap[cId] || [];
      const profile = profileMap[cId] || null;

      const totalBilled = cInvoices.reduce((s, i) => s + (i.totalAmount || 0), 0);
      const totalPaid = cPayments.reduce((s, p) => s + (p.amount || 0), 0);
      const pendingAmount = cInvoices.reduce((s, i) => s + (i.pendingAmount || 0), 0);
      const overdueInvoices = cInvoices.filter(i => i.status === 'overdue' && i.pendingAmount > 0);
      const overdueAmount = overdueInvoices.reduce((s, i) => s + (i.pendingAmount || 0), 0);

      const aging = { current: 0, days31to60: 0, days61to90: 0, days90plus: 0 };
      let oldestDueDate = null;

      cInvoices.forEach(inv => {
        if (inv.pendingAmount > 0 && inv.status !== 'draft') {
          const due = new Date(inv.dueDate);
          if (!oldestDueDate || due < oldestDueDate) oldestDueDate = due;
          const diffDays = Math.floor((now - due) / (1000 * 60 * 60 * 24));
          if (diffDays <= 30) aging.current += inv.pendingAmount;
          else if (diffDays <= 60) aging.days31to60 += inv.pendingAmount;
          else if (diffDays <= 90) aging.days61to90 += inv.pendingAmount;
          else aging.days90plus += inv.pendingAmount;
        }
      });

      const lastPayment = cPayments[0] || null;

      return {
        clientId: c._id,
        clientName: c.name,
        gstin: profile ? profile.gstin : '',
        billingEmail: profile ? profile.billingEmail : '',
        billingPhone: profile ? profile.billingPhone : '',
        retainerAmount: profile ? profile.retainerAmount : 0,
        totalBilled,
        totalPaid,
        pendingAmount,
        overdueAmount,
        unpaidInvoicesCount: cInvoices.filter(i => i.pendingAmount > 0).length,
        overdueCount: overdueInvoices.length,
        oldestDueDate,
        lastPaymentDate: lastPayment ? lastPayment.paymentDate : null,
        lastPaymentAmount: lastPayment ? lastPayment.amount : 0,
        aging,
        invoices: cInvoices.map(i => ({
          _id: i._id,
          invoiceNumber: i.invoiceNumber,
          issueDate: i.issueDate,
          dueDate: i.dueDate,
          totalAmount: i.totalAmount,
          amountPaid: i.amountPaid,
          pendingAmount: i.pendingAmount,
          status: i.status
        }))
      };
    });

    res.json(receivables);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch receivables report', detail: err.message });
  }
});

/* ── 8. SEED DEMO FINANCIAL DATA IF EMPTY ── */
router.post('/seed-demo', async (req, res) => {
  try {
    const existingCount = await Invoice.countDocuments();
    if (existingCount > 0 && !req.query.force) {
      return res.json({ message: 'Accounts data already exists. Add ?force=true to reset.' });
    }

    if (req.query.force) {
      await Invoice.deleteMany({});
      await Payment.deleteMany({});
      await BillingProfile.deleteMany({});
    }

    const clients = await Client.find().limit(6);
    if (!clients.length) {
      return res.status(400).json({ error: 'No clients found in system to seed accounts for.' });
    }

    const demoProfiles = [
      { retainer: 85000, type: 'retainer', gstin: '24AAACC1206M1ZT' },
      { retainer: 65000, type: 'retainer', gstin: '24BBBCD2307N1ZU' },
      { retainer: 120000, type: 'retainer', gstin: '24CCDDE3408P1ZV' },
      { retainer: 45000, type: 'project', gstin: '24DDEEF4509Q1ZW' },
      { retainer: 95000, type: 'retainer', gstin: '24EEFFG5610R1ZX' },
      { retainer: 55000, type: 'hourly', gstin: '24FFGGH6711S1ZY' },
    ];

    const year = new Date().getFullYear();
    const createdInvoices = [];
    const createdPayments = [];

    for (let idx = 0; idx < clients.length; idx++) {
      const client = clients[idx];
      const pData = demoProfiles[idx % demoProfiles.length];

      // Create Billing Profile
      await BillingProfile.create({
        clientId: client._id,
        clientName: client.name,
        billingType: pData.type,
        billingCycle: 'monthly',
        retainerAmount: pData.retainer,
        hourlyRate: 1500,
        currency: 'INR',
        gstin: pData.gstin,
        billingEmail: `accounts@${client.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        billingAddress: 'Corporate Heights, SG Highway, Ahmedabad, Gujarat',
        billingDay: 1,
        paymentTermsDays: 15,
        status: 'active'
      });

      // Create an older paid invoice (2 months ago)
      const date2MonthsAgo = new Date();
      date2MonthsAgo.setMonth(date2MonthsAgo.getMonth() - 2);
      const subtotal1 = pData.retainer;
      const tax1 = Math.round(subtotal1 * 0.18);
      const total1 = subtotal1 + tax1;

      const inv1Num = `INV-${year}-${String(idx * 3 + 1).padStart(4, '0')}`;
      const inv1 = await Invoice.create({
        invoiceNumber: inv1Num,
        clientId: client._id,
        clientName: client.name,
        issueDate: date2MonthsAgo,
        dueDate: new Date(date2MonthsAgo.getTime() + 15 * 86400000),
        billingType: pData.type,
        status: 'paid',
        items: [{
          description: `Strategic Marketing & Creative Production — ${date2MonthsAgo.toLocaleString('default', { month: 'long' })}`,
          quantity: 1,
          rate: subtotal1,
          amount: subtotal1
        }],
        subtotal: subtotal1,
        taxRate: 18,
        taxAmount: tax1,
        totalAmount: total1,
        amountPaid: total1,
        pendingAmount: 0,
        gstin: pData.gstin
      });
      createdInvoices.push(inv1);

      // Create payment for inv1
      const pay1 = await Payment.create({
        paymentNumber: `PAY-${year}-${String(idx * 3 + 1).padStart(4, '0')}`,
        clientId: client._id,
        clientName: client.name,
        invoiceId: inv1._id,
        invoiceNumber: inv1.invoiceNumber,
        amount: total1,
        paymentDate: new Date(date2MonthsAgo.getTime() + 10 * 86400000),
        paymentMethod: 'bank_transfer',
        referenceId: `HDFC${Math.floor(100000000 + Math.random() * 900000000)}`,
        status: 'completed',
        notes: 'Full payment cleared via RTGS/NEFT'
      });
      createdPayments.push(pay1);

      // Create an invoice from last month (partially paid or overdue)
      const date1MonthAgo = new Date();
      date1MonthAgo.setMonth(date1MonthAgo.getMonth() - 1);
      const subtotal2 = pData.retainer;
      const tax2 = Math.round(subtotal2 * 0.18);
      const total2 = subtotal2 + tax2;

      let status2 = 'issued';
      let amountPaid2 = 0;
      if (idx % 3 === 0) {
        // Partially paid
        amountPaid2 = Math.round(total2 * 0.5);
        status2 = 'partially_paid';
      } else if (idx % 3 === 1) {
        // Overdue
        amountPaid2 = 0;
        status2 = 'overdue';
      } else {
        // Paid
        amountPaid2 = total2;
        status2 = 'paid';
      }

      const inv2Num = `INV-${year}-${String(idx * 3 + 2).padStart(4, '0')}`;
      const inv2 = await Invoice.create({
        invoiceNumber: inv2Num,
        clientId: client._id,
        clientName: client.name,
        issueDate: date1MonthAgo,
        dueDate: new Date(date1MonthAgo.getTime() + 15 * 86400000),
        billingType: pData.type,
        status: status2,
        items: [{
          description: `Social Media & Performance Retainer — ${date1MonthAgo.toLocaleString('default', { month: 'long' })}`,
          quantity: 1,
          rate: subtotal2,
          amount: subtotal2
        }],
        subtotal: subtotal2,
        taxRate: 18,
        taxAmount: tax2,
        totalAmount: total2,
        amountPaid: amountPaid2,
        pendingAmount: Math.max(0, total2 - amountPaid2),
        gstin: pData.gstin
      });
      createdInvoices.push(inv2);

      if (amountPaid2 > 0) {
        const pay2 = await Payment.create({
          paymentNumber: `PAY-${year}-${String(idx * 3 + 2).padStart(4, '0')}`,
          clientId: client._id,
          clientName: client.name,
          invoiceId: inv2._id,
          invoiceNumber: inv2.invoiceNumber,
          amount: amountPaid2,
          paymentDate: new Date(date1MonthAgo.getTime() + 12 * 86400000),
          paymentMethod: 'upi',
          referenceId: `UPI${Math.floor(100000000 + Math.random() * 900000000)}`,
          status: 'completed',
          notes: status2 === 'partially_paid' ? '50% advance / interim payment received' : 'Full payment received'
        });
        createdPayments.push(pay2);
      }

      // Create current active invoice (current month)
      const nowIssue = new Date();
      const subtotal3 = pData.retainer;
      const tax3 = Math.round(subtotal3 * 0.18);
      const total3 = subtotal3 + tax3;

      const inv3Num = `INV-${year}-${String(idx * 3 + 3).padStart(4, '0')}`;
      const inv3 = await Invoice.create({
        invoiceNumber: inv3Num,
        clientId: client._id,
        clientName: client.name,
        issueDate: nowIssue,
        dueDate: new Date(nowIssue.getTime() + 15 * 86400000),
        billingType: pData.type,
        status: 'issued',
        items: [{
          description: `Full Stack Agency Retainer & Ad Management — ${nowIssue.toLocaleString('default', { month: 'long', year: 'numeric' })}`,
          quantity: 1,
          rate: subtotal3,
          amount: subtotal3
        }],
        subtotal: subtotal3,
        taxRate: 18,
        taxAmount: tax3,
        totalAmount: total3,
        amountPaid: 0,
        pendingAmount: total3,
        gstin: pData.gstin
      });
      createdInvoices.push(inv3);
    }

    res.json({
      success: true,
      message: 'Successfully seeded demo accounts, invoices, billing profiles, and payments!',
      invoicesCreated: createdInvoices.length,
      paymentsCreated: createdPayments.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed accounts demo data', detail: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────
   8. TALLYPRIME SILVER INTEGRATION & XML SYNC
   ───────────────────────────────────────────────────────────── */
const DEFAULT_TALLY_CONFIG = {
  edition: 'TallyPrime Silver',
  serverHost: 'localhost',
  serverPort: 9000,
  companyName: 'COGNITO INNOVO PRIVATE LIMITED',
  salesLedger: 'Sales - Professional Services',
  cgstLedger: 'Output CGST @ 9%',
  sgstLedger: 'Output SGST @ 9%',
  igstLedger: 'Output IGST @ 18%',
  bankLedger: 'HDFC Bank Current A/c',
  cashLedger: 'Cash in Hand',
  debtorsGroup: 'Sundry Debtors',
  voucherTypeSales: 'Sales',
  voucherTypeReceipt: 'Receipt',
  enableDirectPush: true
};

function formatTallyDate(date) {
  const d = new Date(date || Date.now());
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

function escapeXml(unsafe) {
  if (unsafe == null) return '';
  return String(unsafe).replace(/[<>&'"]/g, c => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  }[c]));
}

async function getTallyConfig() {
  const setting = await SystemSetting.findOne({ key: 'tally_prime_config' });
  if (setting && setting.value) {
    const cfg = { ...DEFAULT_TALLY_CONFIG, ...setting.value };
    if (!cfg.companyName || cfg.companyName === 'CI360 INTELLIGENCE PRIVATE LIMITED' || cfg.companyName === 'CI360') {
      cfg.companyName = 'COGNITO INNOVO PRIVATE LIMITED';
    }
    return cfg;
  }
  return { ...DEFAULT_TALLY_CONFIG };
}

function buildTallyXml({ invoices = [], payments = [], clients = [], config, type = 'all' }) {
  const company = escapeXml(config.companyName || 'CI360');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<ENVELOPE>\n`;
  xml += `  <HEADER>\n`;
  xml += `    <TALLYREQUEST>Import Data</TALLYREQUEST>\n`;
  xml += `  </HEADER>\n`;
  xml += `  <BODY>\n`;
  xml += `    <IMPORTDATA>\n`;
  xml += `      <REQUESTDESC>\n`;
  xml += `        <REPORTNAME>All Masters and Vouchers</REPORTNAME>\n`;
  xml += `        <STATICVARIABLES>\n`;
  xml += `          <SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>\n`;
  xml += `        </STATICVARIABLES>\n`;
  xml += `      </REQUESTDESC>\n`;
  xml += `      <REQUESTDATA>\n`;

  // 1. Client Masters (Sundry Debtors)
  if (type === 'all' || type === 'masters') {
    clients.forEach(c => {
      const cName = escapeXml(c.name || 'Client');
      const gstin = escapeXml(c.gstin || '');
      const pan = escapeXml(c.pan || (gstin.length >= 12 ? gstin.substring(2, 12) : ''));
      xml += `        <TALLYMESSAGE xmlns:UDF="TallyUDF">\n`;
      xml += `          <LEDGER NAME="${cName}" ACTION="Create">\n`;
      xml += `            <NAME>${cName}</NAME>\n`;
      xml += `            <PARENT>${escapeXml(config.debtorsGroup || 'Sundry Debtors')}</PARENT>\n`;
      xml += `            <ISBILLWISEON>Yes</ISBILLWISEON>\n`;
      if (gstin) xml += `            <PARTYGSTIN>${gstin}</PARTYGSTIN>\n`;
      if (pan) xml += `            <PANNUMBER>${pan}</PANNUMBER>\n`;
      xml += `            <COUNTRYNAME>India</COUNTRYNAME>\n`;
      xml += `          </LEDGER>\n`;
      xml += `        </TALLYMESSAGE>\n`;
    });
  }

  // 2. Sales Vouchers (Invoices)
  if (type === 'all' || type === 'sales') {
    invoices.forEach(inv => {
      const vDate = formatTallyDate(inv.issueDate);
      const effDate = formatTallyDate(inv.dueDate);
      const invNum = escapeXml(inv.invoiceNumber);
      const party = escapeXml(inv.clientName);
      const total = Number(inv.totalAmount || 0).toFixed(2);
      const subtotal = Number(inv.subtotal || 0).toFixed(2);
      const taxRate = Number(inv.taxRate || 18);
      const totalTax = Number(inv.taxAmount || 0);
      const isInterstate = inv.gstin && !inv.gstin.startsWith('24'); // Gujarat state code is 24

      xml += `        <TALLYMESSAGE xmlns:UDF="TallyUDF">\n`;
      xml += `          <VOUCHER VCHTYPE="${escapeXml(config.voucherTypeSales || 'Sales')}" ACTION="Create" OBJVIEW="Invoice Voucher View">\n`;
      xml += `            <DATE>${vDate}</DATE>\n`;
      xml += `            <VOUCHERTYPENAME>${escapeXml(config.voucherTypeSales || 'Sales')}</VOUCHERTYPENAME>\n`;
      xml += `            <VOUCHERNUMBER>${invNum}</VOUCHERNUMBER>\n`;
      xml += `            <REFERENCE>${invNum}</REFERENCE>\n`;
      xml += `            <PARTYLEDGERNAME>${party}</PARTYLEDGERNAME>\n`;
      xml += `            <EFFECTIVEDATE>${vDate}</EFFECTIVEDATE>\n`;
      xml += `            <NARRATION>${escapeXml(inv.notes || `Invoice ${invNum} for ${inv.clientName}`)}</NARRATION>\n`;

      // Debtor entry (Debit / Positive)
      xml += `            <ALLLEDGERENTRIES.LIST>\n`;
      xml += `              <LEDGERNAME>${party}</LEDGERNAME>\n`;
      xml += `              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>\n`;
      xml += `              <AMOUNT>-${total}</AMOUNT>\n`;
      xml += `              <BILLALLOCATIONS.LIST>\n`;
      xml += `                <NAME>${invNum}</NAME>\n`;
      xml += `                <BILLTYPE>New Ref</BILLTYPE>\n`;
      xml += `                <AMOUNT>-${total}</AMOUNT>\n`;
      xml += `              </BILLALLOCATIONS.LIST>\n`;
      xml += `            </ALLLEDGERENTRIES.LIST>\n`;

      // Sales Ledger (Credit / Negative in Tally)
      xml += `            <ALLLEDGERENTRIES.LIST>\n`;
      xml += `              <LEDGERNAME>${escapeXml(config.salesLedger || 'Sales - Professional Services')}</LEDGERNAME>\n`;
      xml += `              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>\n`;
      xml += `              <AMOUNT>${subtotal}</AMOUNT>\n`;
      xml += `            </ALLLEDGERENTRIES.LIST>\n`;

      // Tax Ledger(s)
      if (totalTax > 0) {
        if (isInterstate) {
          xml += `            <ALLLEDGERENTRIES.LIST>\n`;
          xml += `              <LEDGERNAME>${escapeXml(config.igstLedger || 'Output IGST @ 18%')}</LEDGERNAME>\n`;
          xml += `              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>\n`;
          xml += `              <AMOUNT>${totalTax.toFixed(2)}</AMOUNT>\n`;
          xml += `            </ALLLEDGERENTRIES.LIST>\n`;
        } else {
          const halfTax = (totalTax / 2).toFixed(2);
          xml += `            <ALLLEDGERENTRIES.LIST>\n`;
          xml += `              <LEDGERNAME>${escapeXml(config.cgstLedger || 'Output CGST @ 9%')}</LEDGERNAME>\n`;
          xml += `              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>\n`;
          xml += `              <AMOUNT>${halfTax}</AMOUNT>\n`;
          xml += `            </ALLLEDGERENTRIES.LIST>\n`;
          xml += `            <ALLLEDGERENTRIES.LIST>\n`;
          xml += `              <LEDGERNAME>${escapeXml(config.sgstLedger || 'Output SGST @ 9%')}</LEDGERNAME>\n`;
          xml += `              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>\n`;
          xml += `              <AMOUNT>${halfTax}</AMOUNT>\n`;
          xml += `            </ALLLEDGERENTRIES.LIST>\n`;
        }
      }

      xml += `          </VOUCHER>\n`;
      xml += `        </TALLYMESSAGE>\n`;
    });
  }

  // 3. Receipt Vouchers (Payments)
  if (type === 'all' || type === 'receipts') {
    payments.forEach(p => {
      const vDate = formatTallyDate(p.paymentDate);
      const pNum = escapeXml(p.paymentNumber);
      const party = escapeXml(p.clientName);
      const amount = Number(p.amount || 0).toFixed(2);
      const bankOrCash = p.paymentMethod === 'cash' ? (config.cashLedger || 'Cash in Hand') : (config.bankLedger || 'HDFC Bank Current A/c');

      xml += `        <TALLYMESSAGE xmlns:UDF="TallyUDF">\n`;
      xml += `          <VOUCHER VCHTYPE="${escapeXml(config.voucherTypeReceipt || 'Receipt')}" ACTION="Create">\n`;
      xml += `            <DATE>${vDate}</DATE>\n`;
      xml += `            <VOUCHERTYPENAME>${escapeXml(config.voucherTypeReceipt || 'Receipt')}</VOUCHERTYPENAME>\n`;
      xml += `            <VOUCHERNUMBER>${pNum}</VOUCHERNUMBER>\n`;
      xml += `            <PARTYLEDGERNAME>${party}</PARTYLEDGERNAME>\n`;
      xml += `            <NARRATION>${escapeXml(p.notes || `Payment received ${p.referenceId ? 'ref ' + p.referenceId : ''}`)}</NARRATION>\n`;

      // Bank/Cash (Debit)
      xml += `            <ALLLEDGERENTRIES.LIST>\n`;
      xml += `              <LEDGERNAME>${escapeXml(bankOrCash)}</LEDGERNAME>\n`;
      xml += `              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>\n`;
      xml += `              <AMOUNT>-${amount}</AMOUNT>\n`;
      xml += `            </ALLLEDGERENTRIES.LIST>\n`;

      // Party (Credit)
      xml += `            <ALLLEDGERENTRIES.LIST>\n`;
      xml += `              <LEDGERNAME>${party}</LEDGERNAME>\n`;
      xml += `              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>\n`;
      xml += `              <AMOUNT>${amount}</AMOUNT>\n`;
      if (p.invoiceNumber) {
        xml += `              <BILLALLOCATIONS.LIST>\n`;
        xml += `                <NAME>${escapeXml(p.invoiceNumber)}</NAME>\n`;
        xml += `                <BILLTYPE>Agst Ref</BILLTYPE>\n`;
        xml += `                <AMOUNT>${amount}</AMOUNT>\n`;
        xml += `              </BILLALLOCATIONS.LIST>\n`;
      }
      xml += `            </ALLLEDGERENTRIES.LIST>\n`;

      xml += `          </VOUCHER>\n`;
      xml += `        </TALLYMESSAGE>\n`;
    });
  }

  xml += `      </REQUESTDATA>\n`;
  xml += `    </IMPORTDATA>\n`;
  xml += `  </BODY>\n`;
  xml += `</ENVELOPE>\n`;
  return xml;
}

// GET Tally Configuration
router.get('/tally/config', async (req, res) => {
  try {
    const config = await getTallyConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Tally configuration', detail: err.message });
  }
});

// UPDATE Tally Configuration
router.put('/tally/config', async (req, res) => {
  try {
    const updates = req.body || {};
    let setting = await SystemSetting.findOne({ key: 'tally_prime_config' });
    if (!setting) {
      setting = new SystemSetting({
        key: 'tally_prime_config',
        value: { ...DEFAULT_TALLY_CONFIG, ...updates },
        description: 'TallyPrime Silver Integration Settings & Ledger Mappings'
      });
    } else {
      setting.value = { ...DEFAULT_TALLY_CONFIG, ...(setting.value || {}), ...updates };
    }
    await setting.save();
    res.json({ ok: true, config: setting.value, message: 'TallyPrime configuration saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Tally configuration', detail: err.message });
  }
});

// Tally Summary & Statistics
router.get('/tally/summary', async (req, res) => {
  try {
    const config = await getTallyConfig();
    const lastSyncSetting = await SystemSetting.findOne({ key: 'tally_last_sync' });
    const [invoicesCount, paymentsCount, clientsCount] = await Promise.all([
      Invoice.countDocuments({ status: { $ne: 'cancelled' } }),
      Payment.countDocuments({ status: 'completed' }),
      Client.countDocuments()
    ]);

    const recentInvoices = await Invoice.find({ createdByName: 'TallyPrime Silver' }).sort({ createdAt: -1 }).limit(10);
    const recentPayments = await Payment.find({ recordedByName: 'TallyPrime Silver' }).sort({ createdAt: -1 }).limit(10);

    res.json({
      config,
      lastSync: lastSyncSetting ? lastSyncSetting.value : null,
      stats: {
        totalInvoices: invoicesCount,
        totalPayments: paymentsCount,
        totalClients: clientsCount,
        tallyInvoices: await Invoice.countDocuments({ createdByName: 'TallyPrime Silver' }),
        tallyPayments: await Payment.countDocuments({ recordedByName: 'TallyPrime Silver' })
      },
      recentInvoices,
      recentPayments
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get Tally summary', detail: err.message });
  }
});

// Test Connection to TallyPrime XML Server
router.post('/tally/test-connection', async (req, res) => {
  try {
    const config = await getTallyConfig();
    const host = req.body.serverHost || config.serverHost || 'localhost';
    const port = req.body.serverPort || config.serverPort || 9000;
    const url = `http://${host}:${port}`;

    // Test ping with a simple Tally ping request
    const testPayload = `<ENVELOPE><HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER><BODY><EXPORTDATA><REQUESTDESC><REPORTNAME>List of Companies</REPORTNAME></REQUESTDESC></EXPORTDATA></BODY></ENVELOPE>`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    try {
      const tallyRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml;charset=utf-8' },
        body: testPayload,
        signal: controller.signal
      });
      clearTimeout(timeout);

      const responseText = await tallyRes.text();
      res.json({
        success: true,
        connected: true,
        endpoint: url,
        message: `Connected successfully to TallyPrime Silver on ${url}`,
        rawResponseSnippet: responseText.slice(0, 200)
      });
    } catch (netErr) {
      clearTimeout(timeout);
      res.json({
        success: false,
        connected: false,
        endpoint: url,
        message: `Could not connect to TallyPrime at ${url}. TallyPrime is either offline or the XML Server port is not enabled.`,
        instructions: 'Open TallyPrime → Press F1 (Help) → Settings → Connectivity → Client/Server configuration → Enable ODBC & XML server on port ' + port
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Connection test failed', detail: err.message });
  }
});

// Export XML Download
router.get('/tally/export-xml', async (req, res) => {
  try {
    const { type = 'all', startDate, endDate, clientId } = req.query;
    const config = await getTallyConfig();

    const invFilter = { status: { $ne: 'cancelled' } };
    const payFilter = { status: 'completed' };
    const clientFilter = {};

    if (clientId) {
      invFilter.clientId = clientId;
      payFilter.clientId = clientId;
      clientFilter._id = clientId;
    }
    if (startDate || endDate) {
      invFilter.issueDate = {};
      payFilter.paymentDate = {};
      if (startDate) {
        invFilter.issueDate.$gte = new Date(startDate);
        payFilter.paymentDate.$gte = new Date(startDate);
      }
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        invFilter.issueDate.$lte = eDate;
        payFilter.paymentDate.$lte = eDate;
      }
    }

    const [invoices, payments, clients] = await Promise.all([
      (type === 'all' || type === 'sales') ? Invoice.find(invFilter).sort({ issueDate: 1 }) : Promise.resolve([]),
      (type === 'all' || type === 'receipts') ? Payment.find(payFilter).sort({ paymentDate: 1 }) : Promise.resolve([]),
      (type === 'all' || type === 'masters') ? Client.find(clientFilter).sort({ name: 1 }) : Promise.resolve([])
    ]);

    const xmlContent = buildTallyXml({ invoices, payments, clients, config, type });
    const filename = `TallyPrime_Silver_${type}_${formatTallyDate(new Date())}.xml`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(xmlContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate Tally XML', detail: err.message });
  }
});

function extractTagValue(xmlChunk, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const m = xmlChunk.match(re);
  return m ? m[1].trim() : '';
}

function parseTallyDate(rawDate) {
  if (!rawDate) return new Date();
  const clean = rawDate.replace(/\D/g, '');
  if (clean.length === 8) {
    const y = parseInt(clean.substring(0, 4), 10);
    const m = parseInt(clean.substring(4, 6), 10) - 1;
    const d = parseInt(clean.substring(6, 8), 10);
    return new Date(y, m, d);
  }
  const parsed = new Date(rawDate);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

// Core Tally XML Ingestion Engine: Extracts vouchers and masters into CI360
async function parseAndImportTallyXml(xmlContent) {
  if (!xmlContent || typeof xmlContent !== 'string') {
    throw new Error('No valid XML content received from Tally');
  }

  let invoicesImported = 0;
  let paymentsImported = 0;
  let clientsCreated = 0;
  const importedList = [];

  // 1. Extract Masters / Ledgers (Sundry Debtors)
  const ledgerMatches = xmlContent.match(/<LEDGER[\s\S]*?<\/LEDGER>/gi) || [];
  for (const lXml of ledgerMatches) {
    const name = extractTagValue(lXml, 'NAME');
    const parent = extractTagValue(lXml, 'PARENT');
    const gstin = extractTagValue(lXml, 'PARTYGSTIN');
    const pan = extractTagValue(lXml, 'PANNUMBER');
    if (name && (parent.toLowerCase().includes('debtor') || !parent)) {
      let client = await Client.findOne({ name: new RegExp(`^${name.trim()}$`, 'i') });
      if (!client) {
        client = await Client.create({
          name: name.trim(),
          gstin: gstin || '',
          pan: pan || '',
          status: 'active'
        });
        clientsCreated++;
      }
    }
  }

  // 2. Extract Vouchers
  const voucherMatches = xmlContent.match(/<VOUCHER[\s\S]*?<\/VOUCHER>/gi) || [];
  for (const vXml of voucherMatches) {
    const vchType = (extractTagValue(vXml, 'VOUCHERTYPENAME') || extractTagValue(vXml, 'VCHTYPE') || '').toLowerCase();
    const vchNumber = extractTagValue(vXml, 'VOUCHERNUMBER') || extractTagValue(vXml, 'REFERENCE');
    const rawDate = extractTagValue(vXml, 'DATE') || extractTagValue(vXml, 'EFFECTIVEDATE');
    const vDate = parseTallyDate(rawDate);
    const partyName = extractTagValue(vXml, 'PARTYLEDGERNAME') || extractTagValue(vXml, 'BASICBUYERNAME');
    const narration = extractTagValue(vXml, 'NARRATION');

    if (!partyName && !vchNumber) continue;

    // Find or create Client
    let client = null;
    if (partyName) {
      client = await Client.findOne({ name: new RegExp(`^${partyName.trim()}$`, 'i') });
      if (!client) {
        client = await Client.create({
          name: partyName.trim(),
          status: 'active'
        });
        clientsCreated++;
      }
    }

    // Extract all LEDGERENTRIES
    const entryMatches = vXml.match(/<ALLLEDGERENTRIES\.LIST[\s\S]*?<\/ALLLEDGERENTRIES\.LIST>/gi) || [];
    let voucherAmount = 0;
    let salesAmount = 0;
    let taxAmount = 0;
    let bankOrCashLedger = '';

    for (const eXml of entryMatches) {
      const lName = extractTagValue(eXml, 'LEDGERNAME');
      const amtStr = extractTagValue(eXml, 'AMOUNT');
      const amt = Math.abs(parseFloat(amtStr) || 0);

      if (lName && lName.toLowerCase() === (partyName || '').toLowerCase()) {
        voucherAmount = amt;
      } else if (lName && (lName.toLowerCase().includes('sale') || lName.toLowerCase().includes('revenue') || lName.toLowerCase().includes('service'))) {
        salesAmount = amt;
      } else if (lName && (lName.toLowerCase().includes('gst') || lName.toLowerCase().includes('tax'))) {
        taxAmount += amt;
      } else if (lName && (lName.toLowerCase().includes('bank') || lName.toLowerCase().includes('hdfc') || lName.toLowerCase().includes('icici') || lName.toLowerCase().includes('cash') || lName.toLowerCase().includes('sbi') || lName.toLowerCase().includes('kotak'))) {
        bankOrCashLedger = lName;
        if (!voucherAmount) voucherAmount = amt;
      }
    }

    if (!voucherAmount && salesAmount) {
      voucherAmount = salesAmount + taxAmount;
    }
    if (voucherAmount <= 0) continue;

    // A. SALES VOUCHER -> INVOICE IN CI360
    if (vchType.includes('sale')) {
      const invNum = vchNumber || `TALLY-INV-${vDate.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      let invoice = await Invoice.findOne({ invoiceNumber: invNum });
      const subtotal = salesAmount > 0 ? salesAmount : Math.round(voucherAmount / 1.18);
      const tax = taxAmount > 0 ? taxAmount : voucherAmount - subtotal;
      const dueDate = new Date(vDate.getTime() + 15 * 86400000);

      if (!invoice) {
        invoice = await Invoice.create({
          invoiceNumber: invNum,
          clientId: client ? client._id : null,
          clientName: client ? client.name : (partyName || 'Tally Client'),
          issueDate: vDate,
          dueDate,
          billingType: 'retainer',
          status: 'issued',
          items: [{
            description: narration || 'Professional Services (Imported from TallyPrime)',
            quantity: 1,
            rate: subtotal,
            amount: subtotal
          }],
          subtotal,
          taxRate: 18,
          taxAmount: tax,
          totalAmount: voucherAmount,
          amountPaid: 0,
          pendingAmount: voucherAmount,
          notes: narration || 'Imported from TallyPrime Silver',
          createdByName: 'TallyPrime Silver'
        });
        invoicesImported++;
      } else {
        invoice.totalAmount = voucherAmount;
        invoice.subtotal = subtotal;
        invoice.taxAmount = tax;
        invoice.pendingAmount = Math.max(0, voucherAmount - (invoice.amountPaid || 0));
        invoice.syncStatus();
        await invoice.save();
        invoicesImported++;
      }

      importedList.push({
        type: 'Sales Invoice',
        number: invNum,
        party: client ? client.name : partyName,
        amount: voucherAmount,
        date: vDate
      });
    }
    // B. RECEIPT VOUCHER -> PAYMENT IN CI360
    else if (vchType.includes('receipt')) {
      const payNum = vchNumber || `TALLY-REC-${vDate.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      let payment = await Payment.findOne({ paymentNumber: payNum });
      const paymentMethod = bankOrCashLedger.toLowerCase().includes('cash')
        ? 'cash'
        : (narration && narration.toLowerCase().includes('upi') ? 'upi' : 'bank_transfer');

      // Check linked invoice
      const billRef = extractTagValue(vXml, 'NAME');
      let linkedInvoice = null;
      if (billRef) {
        linkedInvoice = await Invoice.findOne({ invoiceNumber: new RegExp(`^${billRef.trim()}$`, 'i') });
      }
      if (!linkedInvoice && client) {
        linkedInvoice = await Invoice.findOne({ clientId: client._id, pendingAmount: { $gt: 0 } }).sort({ issueDate: 1 });
      }

      if (!payment) {
        payment = await Payment.create({
          paymentNumber: payNum,
          clientId: client ? client._id : null,
          clientName: client ? client.name : (partyName || 'Tally Client'),
          invoiceId: linkedInvoice ? linkedInvoice._id : null,
          invoiceNumber: linkedInvoice ? linkedInvoice.invoiceNumber : (billRef || ''),
          amount: voucherAmount,
          paymentDate: vDate,
          paymentMethod,
          referenceId: billRef || payNum,
          status: 'completed',
          notes: narration || `Receipt imported from Tally (${bankOrCashLedger || 'Bank'})`,
          recordedByName: 'TallyPrime Silver'
        });

        if (linkedInvoice) {
          linkedInvoice.amountPaid = (linkedInvoice.amountPaid || 0) + voucherAmount;
          linkedInvoice.pendingAmount = Math.max(0, linkedInvoice.totalAmount - linkedInvoice.amountPaid);
          linkedInvoice.syncStatus();
          await linkedInvoice.save();
        }
        paymentsImported++;

        importedList.push({
          type: 'Payment Receipt',
          number: payNum,
          party: client ? client.name : partyName,
          amount: voucherAmount,
          date: vDate
        });
      }
    }
  }

  // Update last sync timestamp in SystemSetting
  await SystemSetting.findOneAndUpdate(
    { key: 'tally_last_sync' },
    {
      key: 'tally_last_sync',
      value: {
        syncedAt: new Date(),
        invoicesImported,
        paymentsImported,
        clientsCreated,
        totalVouchers: voucherMatches.length
      }
    },
    { upsert: true }
  );

  return {
    invoicesImported,
    paymentsImported,
    clientsCreated,
    totalVouchersProcessed: voucherMatches.length,
    importedList: importedList.slice(0, 50)
  };
}

// 1. LIVE PULL: Fetch vouchers directly from TallyPrime HTTP port (port 9000)
router.post('/tally/fetch-from-tally', async (req, res) => {
  try {
    const config = await getTallyConfig();
    const host = req.body.serverHost || config.serverHost || 'localhost';
    const port = req.body.serverPort || config.serverPort || 9000;
    const url = `http://${host}:${port}`;

    // Tally XML request to export all vouchers from Tally Day Book
    const exportRequestXml = `
      <ENVELOPE>
        <HEADER>
          <TALLYREQUEST>Export Data</TALLYREQUEST>
        </HEADER>
        <BODY>
          <EXPORTDATA>
            <REQUESTDESC>
              <REPORTNAME>Vouchers</REPORTNAME>
              <STATICVARIABLES>
                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                <SVCURRENTCOMPANY>${escapeXml(config.companyName || 'COGNITO INNOVO PRIVATE LIMITED')}</SVCURRENTCOMPANY>
              </STATICVARIABLES>
            </REQUESTDESC>
          </EXPORTDATA>
        </BODY>
      </ENVELOPE>
    `;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const tallyRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml;charset=utf-8' },
        body: exportRequestXml,
        signal: controller.signal
      });
      clearTimeout(timeout);

      const xmlResponse = await tallyRes.text();
      const result = await parseAndImportTallyXml(xmlResponse);

      res.json({
        success: true,
        message: `Successfully fetched and imported from TallyPrime: ${result.invoicesImported} sales invoice(s), ${result.paymentsImported} receipt(s), and ${result.clientsCreated} client(s).`,
        ...result
      });
    } catch (netErr) {
      clearTimeout(timeout);
      res.status(503).json({
        error: `Could not connect to TallyPrime at ${url}`,
        detail: netErr.message,
        suggestion: 'Make sure TallyPrime is open with your company, and ODBC/XML Server is enabled on port ' + port + '. Alternatively, you can export your Day Book as XML from Tally and use the "Upload Tally XML" button!'
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries from Tally', detail: err.message });
  }
});

// 2. FILE UPLOAD: Parse and import Tally XML file uploaded by user
router.post('/tally/import-xml-file', async (req, res) => {
  try {
    const { xmlContent } = req.body;
    if (!xmlContent || !xmlContent.trim()) {
      return res.status(400).json({ error: 'Please provide XML file content exported from Tally' });
    }

    const result = await parseAndImportTallyXml(xmlContent);

    res.json({
      success: true,
      message: `Tally XML parsed successfully! Imported ${result.invoicesImported} sales invoice(s), ${result.paymentsImported} receipt(s), and ${result.clientsCreated} client(s).`,
      ...result
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to import Tally XML file', detail: err.message });
  }
});

// 3. Export XML (optional backup)
router.get('/tally/export-xml', async (req, res) => {
  try {
    const { type = 'all', startDate, endDate, clientId } = req.query;
    const config = await getTallyConfig();

    const invFilter = { status: { $ne: 'cancelled' } };
    const payFilter = { status: 'completed' };
    const clientFilter = {};

    if (clientId) {
      invFilter.clientId = clientId;
      payFilter.clientId = clientId;
      clientFilter._id = clientId;
    }
    if (startDate || endDate) {
      invFilter.issueDate = {};
      payFilter.paymentDate = {};
      if (startDate) {
        invFilter.issueDate.$gte = new Date(startDate);
        payFilter.paymentDate.$gte = new Date(startDate);
      }
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        invFilter.issueDate.$lte = eDate;
        payFilter.paymentDate.$lte = eDate;
      }
    }

    const [invoices, payments, clients] = await Promise.all([
      (type === 'all' || type === 'sales') ? Invoice.find(invFilter).sort({ issueDate: 1 }) : Promise.resolve([]),
      (type === 'all' || type === 'receipts') ? Payment.find(payFilter).sort({ paymentDate: 1 }) : Promise.resolve([]),
      (type === 'all' || type === 'masters') ? Client.find(clientFilter).sort({ name: 1 }) : Promise.resolve([])
    ]);

    const xmlContent = buildTallyXml({ invoices, payments, clients, config, type });
    const filename = `TallyPrime_Silver_${type}_${formatTallyDate(new Date())}.xml`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(xmlContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate Tally XML', detail: err.message });
  }
});

module.exports = router;
