const express = require('express');
const mongoose = require('mongoose');
const Task = mongoose.models.Task || require('../models/Task');
const Personnel = mongoose.models.Personnel || require('../models/Personnel');
const { verifyToken } = require('../middleware/auth');
const { createNotificationForTask } = require('../utils/notify');

const router = express.Router();
router.use(verifyToken);

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const filter = {};

    if (req.user.role !== 'superadmin' || req.query.mine === 'true') {
      const userConditions = [{ userId: req.user._id }];
      if (req.user.personnelId) {
        userConditions.push({ personnelId: req.user.personnelId });
      } else if (req.user.name) {
        const p = await Personnel.findOne({ name: new RegExp('^' + req.user.name + '$', 'i') });
        if (p) userConditions.push({ personnelId: p._id });
      }
      filter.$or = userConditions;
    } else {
      if (req.query.personnelId && req.query.personnelId !== 'all') {
        filter.personnelId = req.query.personnelId;
      }
      if (req.query.userId && req.query.userId !== 'all') {
        filter.userId = req.query.userId;
      }
    }

    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }
    if (req.query.priority && req.query.priority !== 'all') {
      filter.priority = req.query.priority;
    }
    if (req.query.jobId) {
      filter.jobId = req.query.jobId;
    }
    if (req.query.search) {
      const q = req.query.search.trim();
      const searchCond = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: searchCond }];
        delete filter.$or;
      } else {
        filter.$or = searchCond;
      }
    }

    const tasks = await Task.find(filter)
      .populate('userId', 'name email role')
      .populate('personnelId', 'name role department status')
      .populate('jobId', 'title clientApproval status date')
      .populate('clientId', 'name')
      .sort({ createdAt: -1 })
      .lean();

    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks: ' + err.message });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      category,
      jobId,
      clientId,
      checklists,
      tags,
      personnelId: reqPersonnelId,
      assignAll
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const isCompleted = status === 'Completed';

    // Handle Admin bulk assignment to all team members
    if (req.user.role === 'superadmin' && (assignAll === true || reqPersonnelId === 'all')) {
      const allPersonnel = await Personnel.find({ status: { $ne: 'inactive' } });
      const User = mongoose.models.User || require('../models/User');
      const createdTasks = [];

      for (const pers of allPersonnel) {
        let uId = req.user._id;
        const linkedUser = await User.findOne({ personnelId: pers._id });
        if (linkedUser) uId = linkedUser._id;

        const t = new Task({
          userId: uId,
          personnelId: pers._id,
          title: title.trim(),
          description: description ? description.trim() : '',
          status: status || 'Todo',
          priority: priority || 'Medium',
          dueDate: dueDate ? new Date(dueDate) : null,
          category: category ? category.trim() : 'General',
          jobId: jobId || null,
          clientId: clientId || null,
          checklists: Array.isArray(checklists) ? checklists : [],
          tags: Array.isArray(tags) ? tags : [],
          completedAt: isCompleted ? new Date() : null
        });
        await t.save();
        createdTasks.push(t);
      }

      return res.status(201).json({ success: true, count: createdTasks.length, tasks: createdTasks });
    }

    // Determine target personnel and target user
    let personnelId = reqPersonnelId || req.user.personnelId || null;
    let targetUserId = req.user._id;

    if (req.user.role === 'superadmin' && reqPersonnelId) {
      personnelId = reqPersonnelId;
      const User = mongoose.models.User || require('../models/User');
      const linkedUser = await User.findOne({ personnelId: reqPersonnelId });
      if (linkedUser) targetUserId = linkedUser._id;
    } else if (!personnelId && req.user.name) {
      const p = await Personnel.findOne({ name: new RegExp('^' + req.user.name + '$', 'i') });
      if (p) personnelId = p._id;
    }

    const task = new Task({
      userId: targetUserId,
      personnelId,
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Todo',
      priority: priority || 'Medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category ? category.trim() : 'General',
      jobId: jobId || null,
      clientId: clientId || null,
      checklists: Array.isArray(checklists) ? checklists : [],
      tags: Array.isArray(tags) ? tags : [],
      completedAt: isCompleted ? new Date() : null
    });

    await task.save();

    await createNotificationForTask({
      type: 'task_created',
      title: '✅ Daily Task Added',
      message: `"${task.title}" was added to daily checklist.`,
      task,
      actorId: req.user._id,
      actorName: req.user.name
    });

    const populated = await Task.findById(task._id)
      .populate('userId', 'name email role')
      .populate('personnelId', 'name role department status')
      .populate('jobId', 'title clientApproval status date')
      .populate('clientId', 'name');

    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task: ' + err.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    let taskQuery = { _id: req.params.id };
    if (req.user.role !== 'superadmin') {
      const userConditions = [{ userId: req.user._id }];
      if (req.user.personnelId) userConditions.push({ personnelId: req.user.personnelId });
      taskQuery.$or = userConditions;
    }

    const task = await Task.findOne(taskQuery);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate,
      category,
      jobId,
      clientId,
      checklists,
      timeSpent,
      tags,
      personnelId
    } = req.body;

    const wasCompleted = task.status === 'Completed';

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (personnelId !== undefined && req.user.role === 'superadmin') {
      task.personnelId = personnelId || null;
    }
    if (status !== undefined) {
      if (status === 'Completed' && !wasCompleted) {
        task.completedAt = new Date();
      } else if (status !== 'Completed') {
        task.completedAt = null;
      }
      task.status = status;
    }
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (category !== undefined) task.category = category.trim();
    if (jobId !== undefined) task.jobId = jobId || null;
    if (clientId !== undefined) task.clientId = clientId || null;
    if (checklists !== undefined) task.checklists = checklists;
    if (timeSpent !== undefined) task.timeSpent = Number(timeSpent) || 0;
    if (tags !== undefined) task.tags = tags;

    await task.save();

    if (status === 'Completed' && !wasCompleted) {
      await createNotificationForTask({
        type: 'task_completed',
        title: '🎉 Daily Task Completed!',
        message: `Great job! You completed "${task.title}".`,
        task,
        actorId: req.user._id,
        actorName: req.user.name
      });
    } else {
      await createNotificationForTask({
        type: 'task_updated',
        title: '✏️ Daily Task Updated',
        message: `"${task.title}" was updated.`,
        task,
        actorId: req.user._id,
        actorName: req.user.name
      });
    }

    const populated = await Task.findById(task._id)
      .populate('userId', 'name email role')
      .populate('personnelId', 'name role department status')
      .populate('jobId', 'title clientApproval status date')
      .populate('clientId', 'name');

    res.json(populated);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task: ' + err.message });
  }
});

// PATCH /api/tasks/:id/toggle
router.patch('/:id/toggle', async (req, res) => {
  try {
    let taskQuery = { _id: req.params.id };
    if (req.user.role !== 'superadmin') {
      const userConditions = [{ userId: req.user._id }];
      if (req.user.personnelId) userConditions.push({ personnelId: req.user.personnelId });
      taskQuery.$or = userConditions;
    }

    const task = await Task.findOne(taskQuery);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const isNowDone = task.status !== 'Completed';
    task.status = isNowDone ? 'Completed' : 'Todo';
    task.completedAt = isNowDone ? new Date() : null;

    await task.save();

    await createNotificationForTask({
      type: isNowDone ? 'task_completed' : 'task_updated',
      title: isNowDone ? '🎉 Daily Task Completed!' : '🔄 Task Reopened',
      message: isNowDone ? `"${task.title}" was completed!` : `"${task.title}" was reopened.`,
      task,
      actorId: req.user._id,
      actorName: req.user.name
    });

    const populated = await Task.findById(task._id)
      .populate('userId', 'name email role')
      .populate('personnelId', 'name role department status')
      .populate('jobId', 'title clientApproval status date')
      .populate('clientId', 'name');

    res.json(populated);
  } catch (err) {
    console.error('Error toggling task:', err);
    res.status(500).json({ error: 'Failed to toggle task: ' + err.message });
  }
});

// PATCH /api/tasks/:id/checklist/:checkId
router.patch('/:id/checklist/:checkId', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const item = task.checklists.id(req.params.checkId);
    if (!item) {
      return res.status(404).json({ error: 'Checklist item not found' });
    }

    item.completed = !item.completed;
    await task.save();
    const populated = await Task.findById(task._id)
      .populate('jobId', 'title clientApproval status date')
      .populate('clientId', 'name');

    res.json(populated);
  } catch (err) {
    console.error('Error toggling checklist item:', err);
    res.status(500).json({ error: 'Failed to toggle checklist: ' + err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    let taskQuery = { _id: req.params.id };
    if (req.user.role !== 'superadmin') {
      const userConditions = [{ userId: req.user._id }];
      if (req.user.personnelId) userConditions.push({ personnelId: req.user.personnelId });
      taskQuery.$or = userConditions;
    }

    const task = await Task.findOneAndDelete(taskQuery);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task: ' + err.message });
  }
});

// POST /api/tasks/clear-completed
router.post('/clear-completed', async (req, res) => {
  try {
    const filter = { status: 'Completed' };
    if (req.user.role !== 'superadmin' || req.body.mine === true) {
      const userConditions = [{ userId: req.user._id }];
      if (req.user.personnelId) userConditions.push({ personnelId: req.user.personnelId });
      filter.$or = userConditions;
    } else if (req.body.personnelId && req.body.personnelId !== 'all') {
      filter.personnelId = req.body.personnelId;
    }

    if (req.body.date && req.body.date !== 'all') {
      const start = new Date(req.body.date + 'T00:00:00.000Z');
      const end = new Date(req.body.date + 'T23:59:59.999Z');
      filter.dueDate = { $gte: start, $lte: end };
    }

    const result = await Task.deleteMany(filter);
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error clearing completed tasks:', err);
    res.status(500).json({ error: 'Failed to clear completed tasks: ' + err.message });
  }
});

module.exports = router;
