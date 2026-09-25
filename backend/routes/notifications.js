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

    // 1. Check for due/overdue jobs relevant to user
    const todayStr = new Date().toISOString().slice(0, 10);
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

    const upcomingJobs = await Job.find(jobFilter).limit(20);
    for (const j of upcomingJobs) {
      const jobDateStr = j.completionDate ? new Date(j.completionDate).toISOString().slice(0, 10) : (j.date ? new Date(j.date).toISOString().slice(0, 10) : null);
      if (jobDateStr && jobDateStr <= todayStr) {
        const existing = await Notification.findOne({ userId, jobId: j._id, type: 'job_due' });
        if (!existing) {
          await Notification.create({
            userId,
            type: 'job_due',
            title: jobDateStr < todayStr ? '⚠️ Overdue Job' : '⏳ Job Due Today',
            message: `Job "${j.title || 'Untitled Job'}" is ${jobDateStr < todayStr ? 'overdue' : 'due today'}.`,
            jobId: j._id,
            read: false
          });
        }
      }
    }

    // 2. Check targets for employee
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

    // 3. Check for active/due tasks for employee
    if (req.user.role === 'employee' || req.user.role === 'superadmin') {
      const activeTasks = await Task.find({ userId, status: { $ne: 'Completed' } }).limit(20);
      for (const t of activeTasks) {
        const taskDateStr = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : todayStr;
        if (taskDateStr <= todayStr) {
          const existing = await Notification.findOne({ userId, taskId: t._id, type: 'task_due' });
          if (!existing) {
            await Notification.create({
              userId,
              type: 'task_due',
              title: taskDateStr < todayStr ? '⚠️ Overdue Daily Task' : '⚡ Task Due Today',
              message: `Daily Task "${t.title}" is ${taskDateStr < todayStr ? 'overdue' : 'on your checklist for today'}. Check it off when done!`,
              taskId: t._id,
              read: false
            });
          }
        }
      }
    }

    const notifications = await Notification.find({ userId, dismissed: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(40);

    const unreadCount = await Notification.countDocuments({ userId, read: false, dismissed: { $ne: true } });

    res.json({ notifications, unreadCount });
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
