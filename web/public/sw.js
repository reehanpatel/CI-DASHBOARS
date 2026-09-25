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
      renotify: false,
      vibrate: [150, 80, 150],
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

// Handle push events (for Web Push integration)
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'CI360 Notification', body: event.data.text() };
    }
  }

  const title = data.title || 'CI360 Notification';
  const options = {
    body: data.message || data.body || 'You have a new update in CI360.',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: data.tag || 'ci360-push-' + Date.now(),
    renotify: false,
    vibrate: [150, 80, 150],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click on desktop and phone
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and navigate
      for (const client of clientList) {
        if ('focus' in client) {
          if (targetUrl && client.url.includes(new URL(targetUrl, self.location.origin).pathname)) {
            return client.focus();
          }
          return client.focus().then(() => {
            if (targetUrl && 'navigate' in client) {
              return client.navigate(targetUrl);
            }
          });
        }
      }
      // Otherwise open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
