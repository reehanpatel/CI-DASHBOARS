const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Persistent daily alert log schema & model to guarantee 1 automatic alert per day per user
const DailyAlertLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alertType: { type: String, required: true },
  date: { type: String, required: true }
}, { timestamps: true });
DailyAlertLogSchema.index({ userId: 1, alertType: 1, date: 1 }, { unique: true });
const DailyAlertLog = mongoose.models.DailyAlertLog || mongoose.model('DailyAlertLog', DailyAlertLogSchema);

// In-memory daily alert cache
const dailyAlertTracker = new Map();

const Notification = require('../models/Notification');
const Job = require('../models/Job');
const Target = require('../models/Target');
const Personnel = require('../models/Personnel');
const Service = require('../models/Service');
const { verifyToken, optionalToken } = require('../middleware/auth');

const Task = require('../models/Task');

// GET /api/notifications/vapid-public-key (Public: needed before login to prepare subscription)
router.get('/vapid-public-key', (req, res) => {
  try {
    const { VAPID_PUBLIC_KEY } = require('../utils/webpush');
    res.json({ publicKey: VAPID_PUBLIC_KEY });
  } catch (err) {
    res.json({ publicKey: 'BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q' });
  }
});

// POST /api/notifications/subscribe (Uses optionalToken so unauthenticated devices can register safely without 401)
router.post('/subscribe', optionalToken, async (req, res) => {
  try {
    const { subscription, deviceType } = req.body;
    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({ error: 'Valid push subscription object required' });
    }
    const PushSubscription = require('../models/PushSubscription');
    const updateDoc = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth
      },
      userAgent: req.headers['user-agent'] || '',
      deviceType: deviceType || 'desktop'
    };
    if (req.user && req.user._id) {
      updateDoc.userId = req.user._id;
    }
    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      updateDoc,
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Push subscription registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save push subscription', detail: err.message });
  }
});

// POST /api/notifications/unsubscribe
router.post('/unsubscribe', optionalToken, async (req, res) => {
  try {
    const { endpoint } = req.body;
    if (endpoint) {
      const PushSubscription = require('../models/PushSubscription');
      const query = { endpoint };
      if (req.user && req.user._id) query.userId = req.user._id;
      await PushSubscription.deleteOne(query);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove push subscription', detail: err.message });
  }
});

// Protect remaining notification endpoints
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
    } else if (['superadmin', 'admin', 'accounts'].includes(req.user.role)) {
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

    // 2. Check for due/overdue jobs relevant to user (CONSOLIDATED: ONLY 1 NOTIFICATION PER DAY)
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
    const dueTodayJobsList = [];

    for (const j of upcomingJobs) {
      const jobDateStr = j.completionDate ? new Date(j.completionDate).toISOString().slice(0, 10) : (j.date ? new Date(j.date).toISOString().slice(0, 10) : null);
      if (jobDateStr && jobDateStr <= todayStr) {
        if (jobDateStr < todayStr) {
          overdueJobsList.push(j);
        } else {
          dueTodayJobsList.push(j);
        }
      }
    }

    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
    const dailyKey = `${userId}_${todayStr}`;

    // Only create 1 single automatic job-due notification for today (Tracked in database)
    if (dueTodayJobsList.length > 0) {
      const alreadyAlertedToday = await DailyAlertLog.findOne({ userId, alertType: 'job_due', date: todayStr });

      if (!alreadyAlertedToday) {
        // Record in daily log so it will NEVER re-create today even if user deletes/dismisses the notification
        await DailyAlertLog.create({ userId, alertType: 'job_due', date: todayStr }).catch(() => {});

        const count = dueTodayJobsList.length;
        const title = count === 1 ? 'Job Due Today' : `${count} Jobs Due Today`;
        const names = dueTodayJobsList.map(j => `"${j.title || 'Untitled Job'}"`).slice(0, 3).join(', ');
        const extra = count > 3 ? ` and ${count - 3} more` : '';
        const message = count === 1 ? `Job ${names} is due today.` : `You have ${count} jobs due today: ${names}${extra}.`;

        await Notification.create({
          userId,
          type: 'job_due',
          title,
          message,
          jobId: dueTodayJobsList[0]._id,
          read: false
        });
      }
    }

    // Auto-clean ALL legacy/duplicate job_due notifications and identical notifications so user never sees clutter
    try {
      const allJobDueNotifs = await Notification.find({
        userId,
        $or: [
          { type: 'job_due' },
          { title: /Job Due/i }
        ]
      }).sort({ createdAt: -1 });

      if (allJobDueNotifs.length > 1) {
        const duplicateIds = allJobDueNotifs.slice(1).map(n => n._id);
        await Notification.deleteMany({ _id: { $in: duplicateIds } });
      }

      // Deduplicate any repeated notifications with identical type, title, and message
      const allUserNotifs = await Notification.find({ userId }).sort({ createdAt: -1 });
      const seenSig = new Set();
      const duplicateIdsToDelete = [];
      for (const n of allUserNotifs) {
        const sig = `${n.type || ''}_${(n.title || '').trim()}_${(n.message || '').trim()}`;
        if (seenSig.has(sig)) {
          duplicateIdsToDelete.push(n._id);
        } else {
          seenSig.add(sig);
        }
      }
      if (duplicateIdsToDelete.length > 0) {
        await Notification.deleteMany({ _id: { $in: duplicateIdsToDelete } });
      }
    } catch(e){}

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

    // 4. Check for active/due/overdue tasks (CONSOLIDATED: ONLY 1 NOTIFICATION PER DAY)
    let overdueTasksList = [];
    let dueTodayTasksList = [];
    if (req.user.role === 'employee' || req.user.role === 'superadmin' || req.user.role === 'admin') {
      const userConditions = [{ userId }];
      if (req.user.personnelId) {
        userConditions.push({ personnelId: req.user.personnelId });
        userConditions.push({ coOwners: req.user.personnelId });
      }
      userConditions.push({ coOwners: userId });
      const activeTasks = await Task.find({
        $or: userConditions,
        status: { $ne: 'Completed' },
        isDeleted: { $ne: true }
      }).limit(30);
      for (const t of activeTasks) {
        const taskDateStr = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : todayStr;
        if (taskDateStr <= todayStr) {
          if (taskDateStr < todayStr) overdueTasksList.push(t);
          else dueTodayTasksList.push(t);
        }
      }

      if (dueTodayTasksList.length > 0) {
        const alreadyAlertedTask = await DailyAlertLog.findOne({ userId, alertType: 'task_due', date: todayStr });

        if (!alreadyAlertedTask) {
          await DailyAlertLog.create({ userId, alertType: 'task_due', date: todayStr }).catch(() => {});

          const count = dueTodayTasksList.length;
          const title = count === 1 ? '⚡ Task Due Today' : `⚡ ${count} Tasks Due Today`;
          const names = dueTodayTasksList.map(t => `"${t.title}"`).slice(0, 3).join(', ');
          const extra = count > 3 ? ` and ${count - 3} more` : '';
          const message = count === 1 ? `Daily Task ${names} is on your checklist for today.` : `You have ${count} tasks scheduled for today: ${names}${extra}.`;

          await Notification.create({
            userId,
            type: 'task_due',
            title,
            message,
            taskId: dueTodayTasksList[0]._id,
            read: false
          });
        }
      }

      // Auto-clean any duplicate task_due notifications so user only sees at most 1 in list
      try {
        const allTaskDueNotifs = await Notification.find({
          userId,
          $or: [
            { type: 'task_due' },
            { title: /Task Due/i }
          ]
        }).sort({ createdAt: -1 });

        if (allTaskDueNotifs.length > 1) {
          const duplicateIds = allTaskDueNotifs.slice(1).map(n => n._id);
          await Notification.deleteMany({ _id: { $in: duplicateIds } });
        }
      } catch(e){}
    }

    // Auto-clean any generic ticket status change / moved notifications
    // (Only keep created, under review, and completed/resolved)
    try {
      await Notification.deleteMany({
        userId,
        type: 'ticket_status_changed'
      });
    } catch(e){}

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

// DELETE /api/notifications (Clear all permanently)
router.delete('/', async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: 'All notifications cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Could not clear notifications', detail: err.message });
  }
});

// DELETE /api/notifications/:id - Permanently delete notification
router.delete('/:id', async (req, res) => {
  try {
    await Notification.deleteOne({ _id: req.params.id, userId: req.user._id });
    res.json({ success: true, message: 'Notification removed' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete notification', detail: err.message });
  }
});

module.exports = router;

