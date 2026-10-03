const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '4L4WTmaqLe2KrOYUf2kXmaLumgmuImYJ6qDdbUVUnsE';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:admin@ci360.local';

try {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (err) {
  console.warn('WebPush VAPID configuration notice:', err.message);
}

/**
 * Send push notification to specific users' subscribed devices (phone & desktop)
 * @param {Array<string|ObjectId>} userIds - Target user IDs
 * @param {Object} payload - Notification payload { title, message, url, type, tag }
 */
async function sendPushToUsers(userIds, payload = {}) {
  try {
    if (!userIds || !userIds.length) return;
    const ids = userIds.map(id => String(id));

    const subscriptions = await PushSubscription.find({ userId: { $in: ids } });
    if (!subscriptions || !subscriptions.length) return;

    const dataPayload = JSON.stringify({
      title: payload.title || 'CI360 Notification',
      message: payload.message || payload.body || 'You have an update in CI360.',
      url: payload.url || '/',
      type: payload.type || 'general',
      tag: payload.tag || ('ci360-push-' + Date.now())
    });

    const sendPromises = subscriptions.map(async (sub) => {
      try {
        const pushConfig = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth
          }
        };
        await webpush.sendNotification(pushConfig, dataPayload);
      } catch (err) {
        // If subscription is expired or unregistered, remove from DB
        if (err.statusCode === 404 || err.statusCode === 410) {
          try {
            await PushSubscription.deleteOne({ _id: sub._id });
          } catch(e){}
        } else {
          console.warn('Web push send error for endpoint:', err.statusCode || err.message);
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
