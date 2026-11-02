const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Invoice = require('../models/Invoice');
const Job = require('../models/Job');
const Task = require('../models/Task');
const { sendPushToUsers } = require('./webpush');
const { recordSyncUpdate } = require('./notify');

const DailyAlertLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alertType: { type: String, required: true },
  date: { type: String, required: true }
}, { timestamps: true });
DailyAlertLogSchema.index({ userId: 1, alertType: 1, date: 1 }, { unique: true });
const DailyAlertLog = mongoose.models.DailyAlertLog || mongoose.model('DailyAlertLog', DailyAlertLogSchema);

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

    // 2. Overdue or due-today jobs (Consolidated to at most 1 per user per day)
    const activeJobs = await Job.find({ status: { $ne: 'Completed' } }).limit(25);
    const userDueJobsMap = new Map();

    for (const j of activeJobs) {
      const jobDateStr = j.completionDate ? new Date(j.completionDate).toISOString().slice(0, 10) : (j.date ? new Date(j.date).toISOString().slice(0, 10) : null);
      if (jobDateStr && jobDateStr === todayStr && j.createdBy) {
        const uId = String(j.createdBy);
        if (!userDueJobsMap.has(uId)) userDueJobsMap.set(uId, []);
        userDueJobsMap.get(uId).push(j);
      }
    }

    for (const [uId, dueList] of userDueJobsMap.entries()) {
      const alreadyAlerted = await DailyAlertLog.findOne({ userId: uId, alertType: 'job_due', date: todayStr });
      if (!alreadyAlerted && dueList.length > 0) {
        await DailyAlertLog.create({ userId: uId, alertType: 'job_due', date: todayStr }).catch(() => {});

        const count = dueList.length;
        const title = count === 1 ? '⏳ Job Due Today' : `⏳ ${count} Jobs Due Today`;
        const names = dueList.map(j => `"${j.title || 'Untitled Job'}"`).slice(0, 3).join(', ');
        const extra = count > 3 ? ` and ${count - 3} more` : '';
        const message = count === 1 ? `Job ${names} is due today.` : `You have ${count} jobs due today: ${names}${extra}.`;

        const notif = await Notification.create({
          userId: uId,
          type: 'job_due',
          title,
          message,
          jobId: dueList[0]._id,
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
