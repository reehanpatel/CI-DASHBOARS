const Notification = require('../models/Notification');
const User = require('../models/User');
const Invoice = require('../models/Invoice');
const Job = require('../models/Job');
const Task = require('../models/Task');
const { sendPushToUsers } = require('./webpush');
const { recordSyncUpdate } = require('./notify');

let cronRunning = false;

async function checkAndDispatchOverduePush() {
  if (cronRunning) return;
  cronRunning = true;
  try {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // 1. Auto-update and notify overdue invoices
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

    const overdueInvoices = await Invoice.find({
      status: 'overdue',
      pendingAmount: { $gt: 0 }
    }).limit(20);

    for (const inv of overdueInvoices) {
      if (inv.clientId) {
        const clientUsers = await User.find({ clientId: inv.clientId, active: true });
        for (const u of clientUsers) {
          const existing = await Notification.findOne({
            userId: u._id,
            invoiceId: inv._id,
            type: 'invoice_overdue',
            createdAt: { $gte: oneDayAgo }
          });
          if (!existing) {
            const dueStr = inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-IN') : 'Recently';
            const notif = await Notification.create({
              userId: u._id,
              type: 'invoice_overdue',
              title: '⚠️ Overdue Invoice Notice',
              message: `Invoice #${inv.invoiceNumber} for ₹${(inv.pendingAmount || inv.totalAmount || 0).toLocaleString('en-IN')} is overdue (Due: ${dueStr}). Please process payment.`,
              invoiceId: inv._id,
              read: false
            });
            await sendPushToUsers([u._id], {
              title: notif.title,
              message: notif.message,
              type: 'invoice_overdue',
              url: '/client'
            });
          }
        }
      }
    }

    // 2. Overdue or due-today jobs
    const activeJobs = await Job.find({ status: { $ne: 'Completed' } }).limit(25);
    for (const j of activeJobs) {
      const jobDateStr = j.completionDate ? new Date(j.completionDate).toISOString().slice(0, 10) : (j.date ? new Date(j.date).toISOString().slice(0, 10) : null);
      if (jobDateStr && jobDateStr <= todayStr) {
        const isOverdue = jobDateStr < todayStr;
        const targetIds = [];
        if (j.createdBy) targetIds.push(String(j.createdBy));
        
        for (const uId of targetIds) {
          const existing = await Notification.findOne({
            userId: uId,
            jobId: j._id,
            type: 'job_due',
            createdAt: { $gte: oneDayAgo }
          });
          if (!existing) {
            const notif = await Notification.create({
              userId: uId,
              type: 'job_due',
              title: isOverdue ? '⚠️ Overdue Job Deadline' : '⏳ Job Due Today',
              message: `Job "${j.title || 'Untitled Job'}" is ${isOverdue ? 'past its deadline' : 'due today'}.`,
              jobId: j._id,
              read: false
            });
            await sendPushToUsers([uId], {
              title: notif.title,
              message: notif.message,
              type: 'job_due',
              url: '/admin'
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('cronNotifications check error:', err.message);
  } finally {
    cronRunning = false;
  }
}

function startNotificationCron() {
  // Run 1 minute after server start, then every 30 minutes
  setTimeout(checkAndDispatchOverduePush, 60 * 1000);
  setInterval(checkAndDispatchOverduePush, 30 * 60 * 1000);
}

module.exports = {
  startNotificationCron,
  checkAndDispatchOverduePush
};
