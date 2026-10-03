const Notification = require('../models/Notification');
const User = require('../models/User');
const Personnel = require('../models/Personnel');
const Service = require('../models/Service');
const Client = require('../models/Client');
const Job = require('../models/Job');
const { sendPushToUsers } = require('./webpush');

// Only debounce duplicate rapid double-clicks (within 3 seconds) for the exact same user & title
async function filterDuplicateNotifications(docs, entityField, entityId) {
  if (!docs || !docs.length) return [];
  const threeSecondsAgo = new Date(Date.now() - 3000);
  const filtered = [];

  for (const doc of docs) {
    const query = {
      userId: doc.userId,
      type: doc.type,
      title: doc.title,
      read: false,
      createdAt: { $gte: threeSecondsAgo }
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

function recordSyncUpdate(entity) {
  const now = Date.now();
  if (entity === 'jobs') global.__ci360LastJobUpdate = now;
  else if (entity === 'tasks') global.__ci360LastTaskUpdate = now;
  else if (entity === 'invoices') global.__ci360LastInvoiceUpdate = now;
  else if (entity === 'tickets') global.__ci360LastTicketUpdate = now;
  global.__ci360LastGlobalUpdate = now;
}

async function createNotificationsForJob({ type, title, message, job, actorId, actorName }) {
  try {
    if (!job) return;
    const targetUserIds = new Set();

    // 1. All Super Admins & Admins
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

    // 5. Always include the actor who performed the action so they get confirmation & notification
    if (actorId) {
      targetUserIds.add(String(actorId));
    }

    const nTitle = title || `📋 Job Update: ${job.title || 'Job'}`;
    const nMessage = message || `Job "${job.title || 'Untitled Job'}" was updated.`;

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'job_updated',
      title: nTitle,
      message: nMessage,
      jobId: job._id,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'jobId', job._id);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
      sendPushToUsers(Array.from(targetUserIds), {
        title: nTitle,
        message: nMessage,
        type: type || 'job_updated',
        url: '/admin'
      }).catch(e => console.warn('Push error:', e.message));
    }
    recordSyncUpdate('jobs');
  } catch (err) {
    console.error('Error creating job notifications:', err.message);
  }
}

async function createNotificationForTarget({ type, title, message, target, actorId, actorName }) {
  try {
    if (!target) return;
    const targetUserIds = new Set();

    // 1. All Super Admins & Admins
    const superadmins = await User.find({ role: { $in: ['superadmin', 'admin'] }, active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    // 2. Assigned Personnel User
    if (target.personId) {
      const personUser = await User.findOne({ personnelId: target.personId, active: true });
      if (personUser) targetUserIds.add(String(personUser._id));
      else {
        const p = await Personnel.findById(target.personId);
        if (p) {
          const u = await User.findOne({ name: new RegExp('^' + p.name + '$', 'i'), active: true });
          if (u) targetUserIds.add(String(u._id));
        }
      }
    }

    // 3. Always include actor
    if (actorId) {
      targetUserIds.add(String(actorId));
    }

    const nTitle = title || '🎯 Target Goal Updated';
    const nMessage = message || 'Your target progress was updated.';

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'target_updated',
      title: nTitle,
      message: nMessage,
      targetId: target._id,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'targetId', target._id);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
      sendPushToUsers(Array.from(targetUserIds), {
        title: nTitle,
        message: nMessage,
        type: type || 'target_updated',
        url: '/employee'
      }).catch(e => console.warn('Push error:', e.message));
    }
  } catch (err) {
    console.error('Error creating target notifications:', err.message);
  }
}

async function createNotificationForTicket({ type, title, message, ticket, actorId, actorName }) {
  try {
    if (!ticket) return;
    const targetUserIds = new Set();

    // 1. All Super Admins & Managers
    const managers = await User.find({ 
      $or: [
        { role: { $in: ['superadmin', 'admin'] } },
        { name: { $regex: /(mansi|urna)/i } }
      ], 
      active: true 
    });
    managers.forEach(u => targetUserIds.add(String(u._id)));

    // 2. Ticket creator user
    if (ticket.userId) {
      targetUserIds.add(String(ticket.userId));
    }

    // 3. If tied to a job, include assigned personnel & client
    if (ticket.jobId) {
      try {
        const job = await Job.findById(ticket.jobId);
        if (job) {
          if (job.clientId) {
            const clientUsers = await User.find({ clientId: job.clientId, active: true });
            clientUsers.forEach(u => targetUserIds.add(String(u._id)));
          }
          if (job.assignments && job.assignments.length) {
            const pIds = job.assignments.map(a => a.personId).filter(Boolean);
            const assignedUsers = await User.find({ personnelId: { $in: pIds }, active: true });
            assignedUsers.forEach(u => targetUserIds.add(String(u._id)));
          }
        }
      } catch(e){}
    }

    // 4. Always include actor
    if (actorId) {
      targetUserIds.add(String(actorId));
    }

    const nTitle = title || `🎫 Support Ticket: ${ticket.subject || 'Update'}`;
    const nMessage = message || `Ticket "${ticket.subject || ''}" was updated.`;

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'ticket_created',
      title: nTitle,
      message: nMessage,
      jobId: ticket.jobId || null,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'jobId', ticket.jobId);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
      sendPushToUsers(Array.from(targetUserIds), {
        title: nTitle,
        message: nMessage,
        type: type || 'ticket_created',
        url: '/admin'
      }).catch(e => console.warn('Push error:', e.message));
    }
    recordSyncUpdate('tickets');
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

    // 2. Linked Personnel user
    if (task.personnelId) {
      const linkedUser = await User.findOne({ personnelId: task.personnelId, active: true });
      if (linkedUser) targetUserIds.add(String(linkedUser._id));
    }

    // 3. All Superadmins & Admins
    const superadmins = await User.find({ role: { $in: ['superadmin', 'admin'] }, active: true });
    superadmins.forEach(u => targetUserIds.add(String(u._id)));

    // 4. Always include the actor who performed the action
    if (actorId) {
      targetUserIds.add(String(actorId));
    }

    const nTitle = title || `✅ Daily Task: ${task.title || 'Task'}`;
    const nMessage = message || `Task "${task.title || ''}" was updated.`;

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'task_created',
      title: nTitle,
      message: nMessage,
      taskId: task._id,
      jobId: task.jobId || null,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'taskId', task._id);

    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
      sendPushToUsers(Array.from(targetUserIds), {
        title: nTitle,
        message: nMessage,
        type: type || 'task_created',
        url: '/employee'
      }).catch(e => console.warn('Push error:', e.message));
    }
    recordSyncUpdate('tasks');
  } catch (err) {
    console.error('Error creating task notification:', err.message);
  }
}

async function createNotificationForInvoice({ type, title, message, invoice, actorId, actorName }) {
  try {
    if (!invoice) return;
    const targetUserIds = new Set();

    // 1. Client user(s) tied to invoice.clientId
    if (invoice.clientId) {
      const clientUsers = await User.find({ clientId: invoice.clientId, active: true });
      clientUsers.forEach(u => targetUserIds.add(String(u._id)));
    }

    // 2. Accounts, Admin, and Superadmin staff
    const staff = await User.find({ role: { $in: ['superadmin', 'admin', 'accounts'] }, active: true });
    staff.forEach(u => targetUserIds.add(String(u._id)));

    // 3. Always include the actor who performed the action
    if (actorId) {
      targetUserIds.add(String(actorId));
    }

    const nTitle = title || `🧾 Invoice #${invoice.invoiceNumber || 'Notice'}`;
    const nMessage = message || `Invoice #${invoice.invoiceNumber || ''} has an update.`;

    const docs = Array.from(targetUserIds).map(uId => ({
      userId: uId,
      type: type || 'invoice_issued',
      title: nTitle,
      message: nMessage,
      invoiceId: invoice._id,
      read: false
    }));

    const deduplicatedDocs = await filterDuplicateNotifications(docs, 'invoiceId', invoice._id);
    if (deduplicatedDocs.length) {
      await Notification.insertMany(deduplicatedDocs);
      sendPushToUsers(Array.from(targetUserIds), {
        title: nTitle,
        message: nMessage,
        type: type || 'invoice_issued',
        url: '/accounts'
      }).catch(e => console.warn('Push error:', e.message));
    }
    recordSyncUpdate('invoices');
  } catch (err) {
    console.error('Error creating invoice notification:', err.message);
  }
}

module.exports = { 
  createNotificationsForJob, 
  createNotificationForTarget, 
  createNotificationForTicket,
  createNotificationForTask,
  createNotificationForInvoice,
  recordSyncUpdate
};
