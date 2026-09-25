const Notification = require('../models/Notification');
const User = require('../models/User');
const Personnel = require('../models/Personnel');
const Service = require('../models/Service');
const Client = require('../models/Client');

// Helper to filter out duplicates: only insert if no unread notification exists for this user & entity & type
async function filterDuplicateNotifications(docs, entityField, entityId) {
  if (!docs || !docs.length) return [];
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const filtered = [];

  for (const doc of docs) {
    const query = {
      userId: doc.userId,
      type: doc.type,
      read: false,
      dismissed: { $ne: true },
      createdAt: { $gte: thirtyMinutesAgo }
    };
    if (entityField && entityId) {
      query[entityField] = entityId;
    }
    const existing = await Notification.findOne(query);
    if (!existing) {
      filtered.push(doc);
    }
  }
  return filtered;
}

async function createNotificationsForJob({ type, title, message, job, actorId, actorName }) {
  try {
    if (!job) return;
    const targetUserIds = new Set();

    // 1. All Super Admins
    const superadmins = await User.find({ role: { $in: ['superadmin', 'admin'] }, active: true });
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

    // For minor updates, don't ping the actor. For job_created, ensure all admins & creator get the notification
    if (actorId && type !== 'job_created') {
      targetUserIds.delete(String(actorId));
    }

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'job_updated',
      title,
      message,
      jobId: job._id,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'jobId', job._id);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
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
    const superadmins = await User.find({ role: { $in: ['superadmin', 'admin'] }, active: true });
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

    // Do NOT notify the person who triggered the action
    if (actorId) {
      targetUserIds.delete(String(actorId));
    }

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'target_updated',
      title,
      message,
      targetId: target._id,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'targetId', target._id);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
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
    const superadmins = await User.find({ role: { $in: ['superadmin', 'admin'] }, active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    // 2. Ticket creator user
    if (ticket.userId) {
      targetUserIds.add(String(ticket.userId));
    }

    // Do NOT notify the person who triggered the action
    if (actorId) {
      targetUserIds.delete(String(actorId));
    }

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'ticket_created',
      title,
      message,
      jobId: ticket.jobId,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'jobId', ticket.jobId);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
    }
  } catch (err) {
    console.error('Error creating ticket notifications:', err.message);
  }
}

async function createNotificationForTask({ type, title, message, task, actorId, actorName }) {
  try {
    if (!task) return;
    const targetUserIds = new Set();

    // 1. Employee who owns the task (only if not the actor)
    if (task.userId && String(task.userId) !== String(actorId)) {
      targetUserIds.add(String(task.userId));
    }

    // 2. All Superadmins (only if not the actor)
    const superadmins = await User.find({ role: { $in: ['superadmin', 'admin'] }, active: true });
    superadmins.forEach(u => {
      if (String(u._id) !== String(actorId)) {
        targetUserIds.add(String(u._id));
      }
    });

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

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'taskId', task._id);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
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
