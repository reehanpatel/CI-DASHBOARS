const express = require('express');
const mongoose = require('mongoose');
const Job = mongoose.models.Job || require('../models/Job');
const Task = mongoose.models.Task || require('../models/Task');
const Invoice = mongoose.models.Invoice || require('../models/Invoice');
const Payment = mongoose.models.Payment || require('../models/Payment');
const Client = mongoose.models.Client || require('../models/Client');
const Personnel = mongoose.models.Personnel || require('../models/Personnel');
const Service = mongoose.models.Service || require('../models/Service');
const Proposal = mongoose.models.Proposal || require('../models/Proposal');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken);
router.use(requireRole('superadmin'));

function getModel(type) {
  switch (type) {
    case 'jobs': return Job;
    case 'tasks': return Task;
    case 'invoices': return Invoice;
    case 'payments': return Payment;
    case 'clients': return Client;
    case 'personnel': return Personnel;
    case 'services': return Service;
    case 'proposals': return Proposal;
    default: return null;
  }
}

// GET /api/archive - Retrieve all records deleted from dashboard (preserved in database)
router.get('/', async (req, res) => {
  try {
    const { type = 'all', search = '' } = req.query;
    const items = [];

    if (type === 'all' || type === 'jobs') {
      const jobs = await Job.find({ isDeleted: true }).populate('clientId', 'name').sort('-deletedAt -updatedAt').lean();
      jobs.forEach(j => {
        items.push({
          _id: j._id,
          type: 'jobs',
          typeLabel: 'Job Deliverable',
          title: j.title || 'Untitled Job',
          subtitle: (j.clientId && j.clientId.name) ? `Client: ${j.clientId.name}` : (j.serviceNames && j.serviceNames.join(', ')) || 'General Job',
          meta: `₹${(j.value || 0).toLocaleString('en-IN')}`,
          deletedAt: j.deletedAt || j.updatedAt,
          deletedByName: j.deletedByName || 'User',
          originalCreatedAt: j.createdAt
        });
      });
    }

    if (type === 'all' || type === 'tasks') {
      const tasks = await Task.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      tasks.forEach(t => {
        items.push({
          _id: t._id,
          type: 'tasks',
          typeLabel: 'Daily Task',
          title: t.title,
          subtitle: `Priority: ${t.priority || 'Medium'} · Status: ${t.status || 'Todo'}`,
          meta: t.category || 'Task',
          deletedAt: t.deletedAt || t.updatedAt,
          deletedByName: t.deletedByName || 'User',
          originalCreatedAt: t.createdAt
        });
      });
    }

    if (type === 'all' || type === 'invoices') {
      const invoices = await Invoice.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      invoices.forEach(inv => {
        items.push({
          _id: inv._id,
          type: 'invoices',
          typeLabel: 'Invoice',
          title: inv.invoiceNumber,
          subtitle: `Client: ${inv.clientName || '—'} · Status: ${inv.status || 'issued'}`,
          meta: `₹${(inv.totalAmount || 0).toLocaleString('en-IN')}`,
          deletedAt: inv.deletedAt || inv.updatedAt,
          deletedByName: inv.deletedByName || 'Accounts',
          originalCreatedAt: inv.createdAt
        });
      });
    }

    if (type === 'all' || type === 'payments') {
      const payments = await Payment.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      payments.forEach(p => {
        items.push({
          _id: p._id,
          type: 'payments',
          typeLabel: 'Payment Record',
          title: p.paymentNumber,
          subtitle: `Client: ${p.clientName || '—'} · Method: ${p.paymentMethod || 'bank'}`,
          meta: `₹${(p.amount || 0).toLocaleString('en-IN')}`,
          deletedAt: p.deletedAt || p.updatedAt,
          deletedByName: p.deletedByName || 'Accounts',
          originalCreatedAt: p.createdAt
        });
      });
    }

    if (type === 'all' || type === 'clients') {
      const clients = await Client.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      clients.forEach(c => {
        items.push({
          _id: c._id,
          type: 'clients',
          typeLabel: 'Client Account',
          title: c.name,
          subtitle: c.notes || 'No description notes',
          meta: 'Client Profile',
          deletedAt: c.deletedAt || c.updatedAt,
          deletedByName: c.deletedByName || 'Admin',
          originalCreatedAt: c.createdAt
        });
      });
    }

    if (type === 'all' || type === 'personnel') {
      const personnel = await Personnel.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      personnel.forEach(p => {
        items.push({
          _id: p._id,
          type: 'personnel',
          typeLabel: 'Personnel',
          title: p.name,
          subtitle: `Duties: ${p.duties || 'Team Member'}`,
          meta: `${p.capacity || 48} hrs/wk`,
          deletedAt: p.deletedAt || p.updatedAt,
          deletedByName: p.deletedByName || 'Admin',
          originalCreatedAt: p.createdAt
        });
      });
    }

    if (type === 'all' || type === 'services') {
      const services = await Service.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      services.forEach(s => {
        items.push({
          _id: s._id,
          type: 'services',
          typeLabel: 'Service Offering',
          title: s.name,
          subtitle: `Standard Reference: ${s.hours || 0} hrs`,
          meta: 'Service',
          deletedAt: s.deletedAt || s.updatedAt,
          deletedByName: s.deletedByName || 'Admin',
          originalCreatedAt: s.createdAt
        });
      });
    }

    if (type === 'all' || type === 'proposals') {
      const proposals = await Proposal.find({ isDeleted: true }).sort('-deletedAt -updatedAt').lean();
      proposals.forEach(pr => {
        items.push({
          _id: pr._id,
          type: 'proposals',
          typeLabel: 'Proposal',
          title: pr.title || pr.proposalNumber || 'Untitled Proposal',
          subtitle: `Client: ${pr.clientName || '—'} · Status: ${pr.status || 'draft'}`,
          meta: `₹${(pr.totals?.grandTotal || 0).toLocaleString('en-IN')}`,
          deletedAt: pr.deletedAt || pr.updatedAt,
          deletedByName: pr.deletedByName || 'Admin',
          originalCreatedAt: pr.createdAt
        });
      });
    }

    let filtered = items;
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = items.filter(it => 
        (it.title && it.title.toLowerCase().includes(q)) ||
        (it.subtitle && it.subtitle.toLowerCase().includes(q)) ||
        (it.typeLabel && it.typeLabel.toLowerCase().includes(q))
      );
    }

    filtered.sort((a, b) => new Date(b.deletedAt || 0) - new Date(a.deletedAt || 0));

    res.json({
      total: filtered.length,
      items: filtered
    });
  } catch (err) {
    console.error('Error fetching archive:', err);
    res.status(500).json({ error: 'Failed to fetch archived records: ' + err.message });
  }
});

// POST /api/archive/restore/:type/:id - Restore a soft-deleted item back to active dashboard
router.post('/restore/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = getModel(type);
    if (!Model) return res.status(400).json({ error: 'Invalid record type: ' + type });

    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Record not found in database' });

    item.isDeleted = false;
    item.deletedAt = null;
    item.deletedBy = null;
    item.deletedByName = '';
    await item.save();

    res.json({
      ok: true,
      message: 'Record successfully restored back to active dashboard!'
    });
  } catch (err) {
    console.error('Error restoring record:', err);
    res.status(500).json({ error: 'Failed to restore record: ' + err.message });
  }
});

// DELETE /api/archive/purge/:type/:id - Permanently purge from database ("untill u delete it from there")
router.delete('/purge/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = getModel(type);
    if (!Model) return res.status(400).json({ error: 'Invalid record type: ' + type });

    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Record not found in database' });

    res.json({
      ok: true,
      message: 'Record permanently deleted from the database.'
    });
  } catch (err) {
    console.error('Error purging record:', err);
    res.status(500).json({ error: 'Failed to purge record from database: ' + err.message });
  }
});

// DELETE /api/archive/purge-all/:type - Permanently purge all soft-deleted records of given type
router.delete('/purge-all/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const Model = getModel(type);
    if (!Model) return res.status(400).json({ error: 'Invalid record type: ' + type });

    const result = await Model.deleteMany({ isDeleted: true });
    res.json({
      ok: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} record(s) permanently purged from database.`
    });
  } catch (err) {
    console.error('Error purging all records:', err);
    res.status(500).json({ error: 'Failed to purge records: ' + err.message });
  }
});

module.exports = router;
