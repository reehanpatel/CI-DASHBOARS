const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Job = require('../models/Job');
const Target = require('../models/Target');
const Personnel = require('../models/Personnel');
const Service = require('../models/Service');
const { verifyToken } = require('../middleware/auth');

const Task = require('../models/Task');

router.use(verifyToken);

// GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const Invoice = require('../models/Invoice');

    // 0. Auto-sync overdue invoices
    try {
      await Invoice.updateMany(
        {
          status: { $in: ['issued', 'partially_paid'] },
          dueDate: { $lt: now },
          pendingAmount: { $gt: 0 }
        },
        { $set: { status: 'overdue' } }
      );
    } catch(e){}

    // 1. Check overdue & due invoices
    let overdueInvoices = [];
    if (req.user.role === 'client' && req.user.clientId) {
      overdueInvoices = await Invoice.find({
        clientId: req.user.clientId,
        status: 'overdue',
        pendingAmount: { $gt: 0 }
      }).sort({ dueDate: 1 }).limit(10);

      for (const inv of overdueInvoices) {
        const existing = await Notification.findOne({ userId, invoiceId: inv._id, type: 'invoice_overdue' });
        if (!existing) {
          const dueStr = inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-IN') : 'Recently';
          await Notification.create({
            userId,
            type: 'invoice_overdue',
            title: '⚠️ Overdue Invoice Notice',
            message: `Invoice #${inv.invoiceNumber} for ₹${(inv.pendingAmount || inv.totalAmount || 0).toLocaleString('en-IN')} is overdue (Due: ${dueStr}). Please process payment.`,
            invoiceId: inv._id,
            read: false
          });
        }
      }
    } else if (['superadmin', 'accounts'].includes(req.user.role)) {
      overdueInvoices = await Invoice.find({
        status: 'overdue',
        pendingAmount: { $gt: 0 }
      }).sort({ dueDate: 1 }).limit(15);

      for (const inv of overdueInvoices.slice(0, 5)) {
        const existing = await Notification.findOne({ userId, invoiceId: inv._id, type: 'invoice_overdue' });
        if (!existing) {
          await Notification.create({
            userId,
            type: 'invoice_overdue',
            title: '⚠️ Client Invoice Overdue',
            message: `Invoice #${inv.invoiceNumber} (${inv.clientName || 'Client'}) has ₹${(inv.pendingAmount || 0).toLocaleString('en-IN')} pending past due date.`,
            invoiceId: inv._id,
            read: false
          });
        }
      }
    }

    // 2. Check for due/overdue jobs relevant to user
    let jobFilter = { status: { $ne: 'Completed' } };
    let pId = req.user.personnelId;
    if (req.user.role === 'employee') {
      if (!pId) {
        const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
        if (p) pId = p._id;
      }
      if (pId) jobFilter['assignments.personId'] = pId;
    } else if (req.user.role === 'client' && req.user.clientId) {
      jobFilter.clientId = req.user.clientId;
    }

    const upcomingJobs = await Job.find(jobFilter).limit(30);
    const overdueJobsList = [];
    for (const j of upcomingJobs) {
      const jobDateStr = j.completionDate ? new Date(j.completionDate).toISOString().slice(0, 10) : (j.date ? new Date(j.date).toISOString().slice(0, 10) : null);
      if (jobDateStr && jobDateStr <= todayStr) {
        const isOverdue = jobDateStr < todayStr;
        if (isOverdue) overdueJobsList.push(j);
        const existing = await Notification.findOne({ userId, jobId: j._id, type: 'job_due' });
        if (!existing) {
          await Notification.create({
            userId,
            type: 'job_due',
            title: isOverdue ? '⚠️ Overdue Job Deadline' : '⏳ Job Due Today',
            message: `Job "${j.title || 'Untitled Job'}" is ${isOverdue ? 'past its deadline (' + jobDateStr + ')' : 'due today'}.`,
            jobId: j._id,
            read: false
          });
        }
      }
    }

    // 3. Check targets for employee
    if (req.user.role === 'employee' && pId) {
      const targets = await Target.find({ personId: pId }).populate('serviceId', 'name');
      for (const t of targets) {
        const sName = t.serviceId?.name || 'Service';
        if (t.completed >= t.quantity && t.quantity > 0) {
          const existing = await Notification.findOne({ userId, targetId: t._id, type: 'target_completed' });
          if (!existing) {
            await Notification.create({
              userId,
              type: 'target_completed',
              title: '🎉 Target Goal Reached!',
              message: `Congratulations! You reached your goal of ${t.quantity} ${t.unit} for ${sName}.`,
              targetId: t._id,
              read: false
            });
          }
        }
      }
    }

    // 4. Check for active/due/overdue tasks
    let overdueTasksList = [];
    if (req.user.role === 'employee' || req.user.role === 'superadmin') {
      const activeTasks = await Task.find({ userId, status: { $ne: 'Completed' } }).limit(30);
      for (const t of activeTasks) {
        const taskDateStr = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : todayStr;
        if (taskDateStr <= todayStr) {
          const isOverdue = taskDateStr < todayStr;
          if (isOverdue) overdueTasksList.push(t);
          const existing = await Notification.findOne({ userId, taskId: t._id, type: 'task_due' });
          if (!existing) {
            await Notification.create({
              userId,
              type: 'task_due',
              title: isOverdue ? '⚠️ Overdue Daily Task' : '⚡ Task Due Today',
              message: `Daily Task "${t.title}" is ${isOverdue ? 'overdue' : 'on your checklist for today'}. Check it off when done!`,
              taskId: t._id,
              read: false
            });
          }
        }
      }
    }

    const notifications = await Notification.find({ userId, dismissed: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({ userId, read: false, dismissed: { $ne: true } });

    res.json({
      notifications,
      unreadCount,
      overdue: {
        invoices: overdueInvoices,
        jobs: overdueJobsList,
        tasks: overdueTasksList,
        totalOverdueCount: overdueInvoices.length + overdueJobsList.length + overdueTasksList.length
      },
      syncTimestamps: {
        jobs: global.__ci360LastJobUpdate || 0,
        tasks: global.__ci360LastTaskUpdate || 0,
        invoices: global.__ci360LastInvoiceUpdate || 0,
        tickets: global.__ci360LastTicketUpdate || 0,
        serverTime: Date.now()
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch notifications', detail: err.message });
  }
});

// PATCH /api/notifications/read
router.patch('/read', async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user._id, read: false, dismissed: { $ne: true } }, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not mark notifications read', detail: err.message });
  }
});

// PATCH /api/notifications/:id/read
router.patch('/:id/read', async (req, res) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not mark notification read', detail: err.message });
  }
});

// DELETE /api/notifications (Clear all - marks dismissed so auto-generators don't recreate them)
router.delete('/', async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user._id, dismissed: { $ne: true } }, { dismissed: true, read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not clear notifications', detail: err.message });
  }
});

// DELETE /api/notifications/:id
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { dismissed: true, read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not dismiss notification', detail: err.message });
  }
});

// POST /api/notifications/test
router.post('/test', async (req, res) => {
  try {
    const userId = req.user._id;
    const testNotif = await Notification.create({
      userId,
      type: 'test_alert',
      title: '🔔 CI360 Alert Test',
      message: `Test notification successfully delivered to your device at ${new Date().toLocaleTimeString()}!`,
      read: false
    });
    res.json({ success: true, notification: testNotif });
  } catch (err) {
    res.status(500).json({ error: 'Could not create test notification', detail: err.message });
  }
});

module.exports = router;
