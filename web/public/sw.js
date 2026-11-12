// CI360 Notification & PWA Service Worker
const CACHE_NAME = 'ci360-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle messages from the client (for mobile browsers like Chrome Android)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    const notifOptions = {
      body: options.body || '',
      icon: options.icon || '/logo.png',
      badge: options.badge || '/logo.png',
      tag: options.tag || 'ci360-notification',
      renotify: options.renotify !== undefined ? options.renotify : true,
      vibrate: options.vibrate || [200, 100, 200, 100, 200],
      data: options.data || { url: '/' },
      actions: [
        { action: 'open', title: 'View Details' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(title, notifOptions)
    );
  }
});

// Handle push events (for Web Push integration - triggers even when site or app is closed)
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      try {
        data = { title: 'CI360 Notification', body: event.data.text() };
      } catch (_) {
        data = { title: 'CI360 Notification', body: 'You have a new update in CI360.' };
      }
    }
  }

  const origin = self.location ? self.location.origin : '';
  const iconUrl = origin ? (origin + '/logo.png') : '/logo.png';
  const title = data.title || 'CI360 Notification';

  const options = {
    body: data.message || data.body || 'You have a new update in CI360.',
    icon: data.icon || iconUrl,
    badge: data.badge || iconUrl,
    tag: data.tag || ('ci360-push-' + Date.now()),
    renotify: true,
    requireInteraction: true,
    silent: false,
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: data.url || '/'
    },
    actions: [
      { action: 'open', title: 'Open CI360' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click on desktop and phone (works when site or app is closed)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const rawUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/';
  const targetUrl = new URL(rawUrl, self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window/tab is already open, focus it and navigate
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus().then(() => {
            if ('navigate' in client && client.url !== targetUrl) {
              return client.navigate(targetUrl);
            }
          });
        }
      }
      // If no window/tab is open (site was closed), open a new window to target URL
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
