const Notification = require('../models/Notification');
const User = require('../models/User');
const Personnel = require('../models/Personnel');
const Service = require('../models/Service');
const Client = require('../models/Client');

async function createNotificationsForJob({ type, title, message, job, actorId, actorName }) {
  try {
    if (!job) return;
    const targetUserIds = new Set();

    // 1. All Super Admins
    const superadmins = await User.find({ role: 'superadmin', active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    // 2. Assigned Employees
    if (job.assignments && job.assignments.length) {
      const pIds = job.assignments.map(a => a.personId).filter(Boolean);
      if (pIds.length) {
        const assignedUsers = await User.find({ personnelId: { $in: pIds }, active: true });
        assignedUsers.forEach(u => targetUserIds.add(String(u._id)));
      }
    }

    // 3. Client User linked to job.clientId
    if (job.clientId) {
      const clientUsers = await User.find({ clientId: job.clientId, active: true });
      clientUsers.forEach(u => targetUserIds.add(String(u._id)));
    }

    // 4. Job Creator
    if (job.createdBy) {
      targetUserIds.add(String(job.createdBy));
    }

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'job_updated',
      title,
      message,
      jobId: job._id,
      read: false
    }));

    if (docs.length) {
      await Notification.insertMany(docs);
    }
  } catch (err) {
    console.error('Error creating job notifications:', err.message);
  }
}

async function createNotificationForTarget({ type, title, message, target, actorId, actorName }) {
  try {
    if (!target) return;
    const targetUserIds = new Set();

    // 1. All Super Admins
    const superadmins = await User.find({ role: 'superadmin', active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    // 2. Assigned Personnel User
    if (target.personId) {
      const personUser = await User.findOne({ personnelId: target.personId, active: true });
      if (personUser) targetUserIds.add(String(personUser._id));
      else {
        const p = await Personnel.findById(target.personId);
        if (p) {
          const u = await User.findOne({ name: new RegExp(p.name, 'i'), active: true });
          if (u) targetUserIds.add(String(u._id));
        }
      }
    }

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'target_updated',
      title,
      message,
      targetId: target._id,
      read: false
    }));

    if (docs.length) {
      await Notification.insertMany(docs);
    }
  } catch (err) {
    console.error('Error creating target notifications:', err.message);
  }
}

async function createNotificationForTicket({ type, title, message, ticket, actorId, actorName }) {
  try {
    if (!ticket) return;
    const targetUserIds = new Set();

    // 1. Super Admins
    const superadmins = await User.find({ role: 'superadmin', active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    // 2. Ticket creator user
    if (ticket.userId) {
      targetUserIds.add(String(ticket.userId));
    }

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'ticket_created',
      title,
      message,
      jobId: ticket.jobId,
      read: false
    }));

    if (docs.length) {
      await Notification.insertMany(docs);
    }
  } catch (err) {
    console.error('Error creating ticket notifications:', err.message);
  }
}

async function createNotificationForTask({ type, title, message, task, actorId, actorName }) {
  try {
    if (!task) return;
    const targetUserIds = new Set();

    // 1. Employee who owns the task
    if (task.userId) {
      targetUserIds.add(String(task.userId));
    }

    // 2. All Superadmins (so admin receives live notifications when employee enters/updates tasks)
    const superadmins = await User.find({ role: 'superadmin', active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    const docs = [];
    for (const uId of targetUserIds) {
      const isOwner = String(uId) === String(task.userId);
      const isSuperadmin = superadmins.some(sa => String(sa._id) === String(uId));

      let nTitle = title;
      let nMessage = message;

      if (!isOwner && isSuperadmin) {
        const empName = actorName || 'An employee';
        if (type === 'task_created') {
          nTitle = `📝 ${empName} added a daily task`;
          nMessage = `"${task.title}" was added to their daily checklist.`;
        } else if (type === 'task_completed') {
          nTitle = `✅ ${empName} completed a daily task`;
          nMessage = `"${task.title}" was completed!`;
        } else if (type === 'task_updated') {
          nTitle = `✏️ ${empName} updated a daily task`;
          nMessage = `"${task.title}" was updated.`;
        }
      }

      docs.push({
        userId: uId,
        type: type || 'task_created',
        title: nTitle,
        message: nMessage,
        taskId: task._id,
        jobId: task.jobId || null,
        read: false
      });
    }

    if (docs.length) {
      await Notification.insertMany(docs);
    }
  } catch (err) {
    console.error('Error creating task notification:', err.message);
  }
}

module.exports = { 
  createNotificationsForJob, 
  createNotificationForTarget, 
  createNotificationForTicket,
  createNotificationForTask
};
