const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');
const User = require('../models/User');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '4L4WTmaqLe2KrOYUf2kXmaLumgmuImYJ6qDdbUVUnsE';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:admin@ci360.local';

try {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (err) {
  console.warn('WebPush VAPID configuration notice:', err.message);
}

const mongoose = require('mongoose');

/**
 * Send push notification to specific users' subscribed devices (phone & desktop)
 * Delivers immediately even when the browser, site, or app is completely closed.
 * @param {Array<string|ObjectId>} userIds - Target user IDs
 * @param {Object} payload - Notification payload { title, message, url, type, tag }
 */
async function sendPushToUsers(userIds, payload = {}) {
  try {
    if (!userIds || !userIds.length) return;
    const strIds = [];
    const objIds = [];
    userIds.forEach(id => {
      if (!id) return;
      const s = String(id);
      strIds.push(s);
      if (mongoose.Types.ObjectId.isValid(s)) {
        objIds.push(new mongoose.Types.ObjectId(s));
      }
    });

    const subscriptions = await PushSubscription.find({
      $or: [
        { userId: { $in: objIds } },
        { userId: { $in: strIds } }
      ]
    });
    if (!subscriptions || !subscriptions.length) return;

    let userRoleMap = new Map();
    try {
      const users = await User.find({ _id: { $in: objIds } }).select('_id role');
      users.forEach(u => userRoleMap.set(String(u._id), u.role));
    } catch(e){}

    const sendPromises = subscriptions.map(async (sub) => {
      try {
        const uRole = userRoleMap.get(String(sub.userId));
        let userTargetUrl = payload.url || '/';
        if (uRole === 'employee' && (userTargetUrl === '/admin' || userTargetUrl === '/')) {
          userTargetUrl = '/employee';
        } else if (uRole === 'client' && (userTargetUrl === '/admin' || userTargetUrl === '/')) {
          userTargetUrl = '/client';
        } else if (uRole === 'accounts' && (userTargetUrl === '/admin' || userTargetUrl === '/')) {
          userTargetUrl = '/accounts';
        }

        const dataPayload = JSON.stringify({
          title: payload.title || 'CI360 Notification',
          message: payload.message || payload.body || 'You have an update in CI360.',
          url: userTargetUrl,
          type: payload.type || 'general',
          tag: payload.tag || ('ci360-push-' + Date.now())
        });

        const pushConfig = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth
          }
        };

        // RFC 8030: TTL (24h) and urgency 'high' instruct push servers (FCM, WNS, Mozilla)
        // to deliver immediately even when the browser or app is closed.
        const pushOptions = {
          TTL: 86400,
          urgency: 'high'
        };

        await webpush.sendNotification(pushConfig, dataPayload, pushOptions);
      } catch (err) {
        // If subscription is expired or unregistered, remove from DB
        if (err.statusCode === 404 || err.statusCode === 410) {
          try {
            await PushSubscription.deleteOne({ _id: sub._id });
          } catch(e){}
        } else {
          console.warn('Web push send notice for endpoint:', err.statusCode || err.message);
        }
      }
    });

    await Promise.allSettled(sendPromises);
  } catch (err) {
    console.error('sendPushToUsers general error:', err.message);
  }
}

module.exports = {
  VAPID_PUBLIC_KEY,
  sendPushToUsers
};
