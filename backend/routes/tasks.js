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
    const filter = { isDeleted: { $ne: true } };

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

    // Specific Date filtering
    if (req.query.date && req.query.date !== 'all') {
      const dStr = req.query.date.trim();
      const startOfDay = new Date(dStr + 'T00:00:00.000Z');
      const endOfDay = new Date(dStr + 'T23:59:59.999Z');
      const dateCond = [
        { dateStr: dStr },
        { dueDate: { $gte: startOfDay, $lte: endOfDay } }
      ];
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: dateCond }];
        delete filter.$or;
      } else {
        filter.$or = dateCond;
      }
    } else if (req.query.weekStart && req.query.weekEnd) {
      const start = new Date(req.query.weekStart + 'T00:00:00.000Z');
      const end = new Date(req.query.weekEnd + 'T23:59:59.999Z');
      const rangeCond = [
        { dateStr: { $gte: req.query.weekStart, $lte: req.query.weekEnd } },
        { dueDate: { $gte: start, $lte: end } }
      ];
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: rangeCond }];
        delete filter.$or;
      } else {
        filter.$or = rangeCond;
      }
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
      dateStr,
      startTime,
      dueTime,
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

    const dStr = dateStr || (dueDate ? new Date(dueDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
    const calculatedDueDate = dueDate ? new Date(dueDate) : (dStr ? new Date(dStr + 'T00:00:00.000Z') : null);
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
          status: status || 'Pending',
          priority: priority || 'Medium',
          dueDate: calculatedDueDate,
          dateStr: dStr,
          startTime: startTime ? startTime.trim() : '',
          dueTime: dueTime ? dueTime.trim() : '',
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
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate: calculatedDueDate,
      dateStr: dStr,
      startTime: startTime ? startTime.trim() : '',
      dueTime: dueTime ? dueTime.trim() : '',
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
      title: '📅 Daily Task Added',
      message: `"${task.title}" was added to your planner.`,
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
      dateStr,
      startTime,
      dueTime,
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
    if (dateStr !== undefined) {
      task.dateStr = dateStr.trim();
      if (!dueDate && task.dateStr) {
        task.dueDate = new Date(task.dateStr + 'T00:00:00.000Z');
      }
    }
    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : null;
      if (!task.dateStr && task.dueDate) {
        task.dateStr = new Date(task.dueDate).toISOString().slice(0, 10);
      }
    }
    if (startTime !== undefined) task.startTime = startTime.trim();
    if (dueTime !== undefined) task.dueTime = dueTime.trim();
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
    task.status = isNowDone ? 'Completed' : 'Pending';
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

// POST /api/tasks/bulk-import
router.post('/bulk-import', async (req, res) => {
  try {
    const { tasks: rawTasks, date, personnelId: reqPersonnelId } = req.body;
    if (!Array.isArray(rawTasks) || rawTasks.length === 0) {
      return res.status(400).json({ error: 'No tasks provided for import' });
    }

    let targetPersonnelId = reqPersonnelId || req.user.personnelId || null;
    let targetUserId = req.user._id;

    if (req.user.role === 'superadmin' && reqPersonnelId && reqPersonnelId !== 'all') {
      targetPersonnelId = reqPersonnelId;
      const User = mongoose.models.User || require('../models/User');
      const linkedUser = await User.findOne({ personnelId: reqPersonnelId });
      if (linkedUser) targetUserId = linkedUser._id;
    } else if (!targetPersonnelId && req.user.name) {
      const p = await Personnel.findOne({ name: new RegExp('^' + req.user.name + '$', 'i') });
      if (p) targetPersonnelId = p._id;
    }

    const dStr = date ? date.trim() : new Date().toISOString().slice(0, 10);
    const dueDate = new Date(dStr + 'T00:00:00.000Z');

    // Fetch existing active tasks for this user & date to prevent duplicate insertions
    const existing = await Task.find({
      userId: targetUserId,
      isDeleted: { $ne: true },
      $or: [
        { dateStr: dStr },
        { dueDate: { $gte: new Date(dStr + 'T00:00:00.000Z'), $lte: new Date(dStr + 'T23:59:59.999Z') } }
      ]
    }).lean();

    const existingTitles = new Set(existing.map(t => (t.title || '').trim().toLowerCase()));

    const createdList = [];
    for (const item of rawTasks) {
      const itemTitle = typeof item === 'string' ? item.trim() : (item.title || '').trim();
      if (!itemTitle) continue;
      if (existingTitles.has(itemTitle.toLowerCase())) continue;
      existingTitles.add(itemTitle.toLowerCase());

      const t = new Task({
        userId: targetUserId,
        personnelId: targetPersonnelId,
        title: itemTitle,
        description: item.description ? String(item.description).trim() : '',
        status: item.status || 'Pending',
        priority: item.priority || 'Medium',
        category: item.category ? String(item.category).trim() : 'General',
        dueDate,
        dateStr: dStr,
        startTime: item.startTime ? String(item.startTime).trim() : '',
        dueTime: item.dueTime ? String(item.dueTime).trim() : '',
        tags: Array.isArray(item.tags) ? item.tags : []
      });
      await t.save();
      createdList.push(t);
    }

    res.status(201).json({
      success: true,
      importedCount: createdList.length,
      skippedCount: rawTasks.length - createdList.length,
      tasks: createdList
    });
  } catch (err) {
    console.error('Error bulk importing tasks:', err);
    res.status(500).json({ error: 'Failed to import tasks: ' + err.message });
  }
});

// GET /api/tasks/backup
router.get('/backup', async (req, res) => {
  try {
    const filter = { isDeleted: { $ne: true } };
    if (req.user.role !== 'superadmin' || req.query.mine === 'true') {
      filter.userId = req.user._id;
    }

    const tasks = await Task.find(filter)
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();

    const backupPayload = {
      version: '1.0',
      system: 'CI360 Daily Planner',
      exportedAt: new Date().toISOString(),
      exportedBy: {
        id: req.user._id,
        name: req.user.name,
        role: req.user.role
      },
      count: tasks.length,
      tasks: tasks.map(t => ({
        id: t._id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        dateStr: t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : ''),
        startTime: t.startTime || '',
        dueTime: t.dueTime || '',
        category: t.category,
        checklists: t.checklists,
        tags: t.tags,
        completedAt: t.completedAt,
        createdAt: t.createdAt
      }))
    };

    res.json(backupPayload);
  } catch (err) {
    console.error('Error exporting tasks backup:', err);
    res.status(500).json({ error: 'Failed to export backup: ' + err.message });
  }
});

// POST /api/tasks/restore
router.post('/restore', async (req, res) => {
  try {
    const { tasks: restoreTasks, mode = 'merge' } = req.body;
    if (!Array.isArray(restoreTasks) || restoreTasks.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty backup data' });
    }

    let restoredCount = 0;
    let skippedCount = 0;

    for (const item of restoreTasks) {
      if (!item.title || !String(item.title).trim()) {
        skippedCount++;
        continue;
      }

      const dStr = item.dateStr || (item.dueDate ? new Date(item.dueDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
      const dueDate = item.dueDate ? new Date(item.dueDate) : (dStr ? new Date(dStr + 'T00:00:00.000Z') : null);

      const existing = await Task.findOne({
        userId: req.user._id,
        isDeleted: { $ne: true },
        title: String(item.title).trim(),
        $or: [
          { dateStr: dStr },
          { dueDate: dueDate ? { $gte: new Date(dStr + 'T00:00:00.000Z'), $lte: new Date(dStr + 'T23:59:59.999Z') } : null }
        ].filter(Boolean)
      });

      if (existing) {
        if (mode === 'overwrite') {
          existing.description = item.description || existing.description;
          existing.status = item.status || existing.status;
          existing.priority = item.priority || existing.priority;
          existing.startTime = item.startTime || existing.startTime;
          existing.dueTime = item.dueTime || existing.dueTime;
          existing.category = item.category || existing.category;
          await existing.save();
          restoredCount++;
        } else {
          skippedCount++;
        }
      } else {
        const newTask = new Task({
          userId: req.user._id,
          personnelId: req.user.personnelId || null,
          title: String(item.title).trim(),
          description: item.description || '',
          status: item.status || 'Pending',
          priority: item.priority || 'Medium',
          category: item.category || 'General',
          dueDate,
          dateStr: dStr,
          startTime: item.startTime || '',
          dueTime: item.dueTime || '',
          tags: Array.isArray(item.tags) ? item.tags : [],
          completedAt: item.status === 'Completed' ? (item.completedAt ? new Date(item.completedAt) : new Date()) : null
        });
        await newTask.save();
        restoredCount++;
      }
    }

    res.json({
      success: true,
      restoredCount,
      skippedCount,
      totalReceived: restoreTasks.length
    });
  } catch (err) {
    console.error('Error restoring tasks backup:', err);
    res.status(500).json({ error: 'Failed to restore backup: ' + err.message });
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

    const task = await Task.findOne(taskQuery);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.isDeleted = true;
    task.deletedAt = new Date();
    task.deletedBy = req.user ? req.user._id : null;
    task.deletedByName = req.user ? req.user.name : 'User';
    await task.save();
    res.json({ success: true, message: 'Task removed from dashboard (preserved in database)' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task: ' + err.message });
  }
});

// POST /api/tasks/clear-completed
router.post('/clear-completed', async (req, res) => {
  try {
    const filter = { status: 'Completed', isDeleted: { $ne: true } };
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

    const result = await Task.updateMany(filter, {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: req.user ? req.user._id : null,
        deletedByName: req.user ? req.user.name : 'User'
      }
    });
    res.json({ success: true, deletedCount: result.modifiedCount });
  } catch (err) {
    console.error('Error clearing completed tasks:', err);
    res.status(500).json({ error: 'Failed to clear completed tasks: ' + err.message });
  }
});

module.exports = router;
