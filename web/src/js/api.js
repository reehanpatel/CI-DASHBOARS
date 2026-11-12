// Remove .html extension from browser address bar cleanly
(function cleanHtmlFromUrl() {
  try {
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('.html')) {
      let cleanPath = window.location.pathname.slice(0, -5);
      if (cleanPath === '/index') cleanPath = '/';
      window.history.replaceState(null, '', (cleanPath || '/') + window.location.search + window.location.hash);
    }
  } catch (e) { }
})();

// Thin fetch wrapper shared by all dashboards.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function getToken() { return localStorage.getItem('ci360_token'); }
export function getUser() { try { return JSON.parse(localStorage.getItem('ci360_user')); } catch (e) { return null; } }
export function setSession(token, user) { localStorage.setItem('ci360_token', token); localStorage.setItem('ci360_user', JSON.stringify(user)); }
export function clearSession() { localStorage.removeItem('ci360_token'); localStorage.removeItem('ci360_user'); }

export function requireAuth(expectedRole) {
  const token = getToken();
  const user = getUser();
  if (!token || !user) {
    clearSession();
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    return null;
  }

  const isSuper = user.role === 'superadmin' || user.role === 'admin';
  const isEkta = (user.name && user.name.toLowerCase().includes('ekta')) ||
    (user.email && user.email.toLowerCase().includes('ekta'));

  if (expectedRole && user.role !== expectedRole && !isSuper) {
    // Accounts role or Ekta can access both accounts and employee workspaces
    if ((user.role === 'accounts' || isEkta) && (expectedRole === 'accounts' || expectedRole === 'employee')) {
      return user;
    }
    const target = isSuper ? '/admin' : ((user.role === 'accounts' || isEkta) ? '/accounts' : (user.role === 'employee' ? '/employee' : (user.role === 'client' ? '/client' : null)));
    if (!target) {
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return null;
    }
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith(target)) {
      window.location.href = target;
      return null;
    }
  }
  return user;
}

export async function api(path, options = {}) {
  const token = getToken();
  const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, Object.assign({}, options, { headers }));

  let data = null;
  try { data = await res.json(); } catch (e) { /* no body or non-JSON body */ }

  if (res.status === 401) {
    // If login attempt failed, return the specific backend error message directly
    if (path === '/auth/login' || path.includes('/auth/login')) {
      throw new Error((data && data.error) || 'Invalid username/email or password.');
    }

    // Do NOT clear session or kick the user out on background non-critical requests!
    // Background requests like /notifications, /subscribe, /vapid should never log the user out!
    if (path.includes('/notifications') || path.includes('/subscribe') || path.includes('/vapid')) {
      throw new Error((data && data.error) || 'Unauthorized');
    }

    clearSession();
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login?expired=1';
    }
    throw new Error((data && data.error) || 'Session expired. Please sign in again.');
  }

  if (!res.ok) { throw new Error((data && data.error) || ('Server status ' + res.status + ' — Backend waking up, please retry in 10s.')); }

  // If this was a mutating request (POST, PUT, PATCH, DELETE) and not notification read/delete,
  // immediately fetch notifications so alerts, popups, and sounds trigger instantly!
  if (options.method && options.method !== 'GET' && !path.includes('/notifications')) {
    if (typeof window !== 'undefined' && typeof window.ci360FetchNotifications === 'function') {
      setTimeout(() => {
        try { window.ci360FetchNotifications(); } catch (e) { }
      }, 350);
    }
  }

  return data;
}

export const apiGet = (path) => api(path, { method: 'GET' });
export const apiPost = (path, body) => api(path, { method: 'POST', body: JSON.stringify(body) });
export const apiPut = (path, body) => api(path, { method: 'PUT', body: JSON.stringify(body) });
export const apiPatch = (path, body) => api(path, { method: 'PATCH', body: JSON.stringify(body) });
export const apiDelete = (path) => api(path, { method: 'DELETE' });

// Database Archive APIs (Compulsory preserved deleted records)
export const getArchive = (type) => apiGet('/archive' + (type ? `?type=${encodeURIComponent(type)}` : ''));
export const restoreArchiveItem = (type, id) => apiPost(`/archive/restore/${type}/${id}`, {});
export const purgeArchiveItem = (type, id) => apiDelete(`/archive/purge/${type}/${id}`);
export const purgeAllArchive = (type) => apiDelete(`/archive/purge-all/${type}`);

export function fmtINR(n) { n = Number(n) || 0; return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 }); }
export function fmtHours(n) { return (Number(n) || 0).toLocaleString('en-IN', { maximumFractionDigits: 1 }) + ' hrs'; }
export function escapeHtml(str) { if (str == null) return ''; return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
export function fmtDate(d) { if (!d) return '—'; return new Date(d).toISOString().slice(0, 10); }

/* ── THEME MANAGEMENT ───────────────────────────────────────── */
export function getTheme() { return localStorage.getItem('ci360_theme') || 'light'; }
export function setTheme(t) {
  localStorage.setItem('ci360_theme', t);
  document.documentElement.setAttribute('data-theme', t);
  // update desktop toggle buttons
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === t);
  });
  // Topbar dropdown desktop theme toggle
  const tudThemeBtn = document.getElementById('tudThemeToggleBtn');
  if (tudThemeBtn) {
    const icon = tudThemeBtn.querySelector('.tud-icon');
    const label = tudThemeBtn.querySelector('.tud-label');
    if (icon) icon.textContent = t === 'dark' ? '☀️' : '🌙';
    if (label) label.textContent = `Switch to ${t === 'dark' ? 'Light' : 'Dark'} Mode`;
  }
  // Mobile popover toggle button
  const tudMobileThemeIcon = document.getElementById('tudMobileThemeIcon');
  const tudMobileThemeText = document.getElementById('tudMobileThemeText');
  if (tudMobileThemeIcon) tudMobileThemeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
  if (tudMobileThemeText) tudMobileThemeText.textContent = t === 'dark' ? 'Light Mode' : 'Dark Mode';

  // Mobile more sheet toggle button
  const mmsThemeBtn = document.getElementById('mmsToggleThemeBtn');
  if (mmsThemeBtn) {
    const span = mmsThemeBtn.querySelector('span');
    if (span) span.textContent = t === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}
export function initTheme() {
  // Never flip login page to light theme — login has dedicated dark cybersecurity styling
  if (typeof document !== 'undefined' && (document.body?.classList.contains('login-page') || window.location.pathname.includes('login') || document.querySelector('.login-box'))) {
    document.documentElement.setAttribute('data-theme', 'dark');
    return;
  }
  const saved = getTheme();
  document.documentElement.setAttribute('data-theme', saved);
  // sync any buttons that exist in DOM
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === saved);
  });
  const tudThemeBtn = document.getElementById('tudThemeToggleBtn');
  if (tudThemeBtn) {
    const icon = tudThemeBtn.querySelector('.tud-icon');
    const label = tudThemeBtn.querySelector('.tud-label');
    if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';
    if (label) label.textContent = `Switch to ${saved === 'dark' ? 'Light' : 'Dark'} Mode`;
  }
  const tudMobileThemeIcon = document.getElementById('tudMobileThemeIcon');
  const tudMobileThemeText = document.getElementById('tudMobileThemeText');
  if (tudMobileThemeIcon) tudMobileThemeIcon.textContent = saved === 'dark' ? '☀️' : '🌙';
  if (tudMobileThemeText) tudMobileThemeText.textContent = saved === 'dark' ? 'Light Mode' : 'Dark Mode';

  const mmsThemeBtn = document.getElementById('mmsToggleThemeBtn');
  if (mmsThemeBtn) {
    const span = mmsThemeBtn.querySelector('span');
    if (span) span.textContent = saved === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}
// Run theme initialization immediately on module load
try {
  initTheme();
} catch (e) { }

/* ── TOAST ───────────────────────────────────────────────────── */
export function flashToast(msg, isError) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.borderLeftColor = isError ? 'var(--red-500)' : 'var(--green-500)';
  t.textContent = (isError ? '⚠️  ' : '✓  ') + msg;
  document.body.appendChild(t);
  const remove = () => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; setTimeout(() => t.remove(), 200); };
  setTimeout(remove, 2800);
}

/* ── MODAL ───────────────────────────────────────────────────── */
export function openModal(html) {
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal">${html}</div>`;
  bg.onclick = (e) => { if (e.target === bg) bg.remove(); };
  document.body.appendChild(bg);
  return bg;
}

export function logout() { clearSession(); window.location.href = '/login?loggedOut=1'; }

// Silent rolling session refresh in background
if (typeof window !== 'undefined' && getToken() && !window.location.pathname.startsWith('/login')) {
  setTimeout(() => {
    apiGet('/auth/refresh').then(res => {
      if (res && res.token && res.user) setSession(res.token, res.user);
    }).catch(() => {});
  }, 1000);
}

/* ── NOTIFICATION ENGINE & SOUND/VIBRATION ───────────────────── */
let swRegistration = null;

export async function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      swRegistration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.log('CI360 Service Worker active:', swRegistration.scope);
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && getToken()) {
        registerPushSubscription(swRegistration).catch(() => { });
      }
    } catch (err) {
      console.warn('CI360 Service Worker registration notice:', err);
    }
  }
}

// Auto-register service worker on load
try {
  initServiceWorker();
} catch (e) { }

/* ── NOTIFICATION DEDUPLICATION & THROTTLING (ALERT ONCE ONLY) ── */
let lastChimeTimestamp = 0;
let lastVibrateTimestamp = 0;
export const alertedNotifIds = new Set();
export const seenNotifIds = new Set();
let isSessionBaselineEstablished = false;

function getNotifStorageKey(prefix) {
  try {
    const user = (typeof getUser === 'function') ? getUser() : null;
    const uid = (user && user._id) ? String(user._id) : 'default';
    return `${prefix}_${uid}`;
  } catch (e) {
    return `${prefix}_default`;
  }
}

export function loadAlertedNotifIds() {
  try {
    const key = getNotifStorageKey('ci360_alerted_ids');
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        parsed.forEach(id => alertedNotifIds.add(String(id)));
      }
    }
  } catch (e) { }
}

export function saveAlertedNotifIds() {
  try {
    const key = getNotifStorageKey('ci360_alerted_ids');
    const arr = Array.from(alertedNotifIds).slice(-2000);
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) { }
}

// Cross-tab synchronization so sibling tabs do not repeat alerts
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.includes('ci360_alerted_ids')) {
      loadAlertedNotifIds();
    }
  });
}

/* ── AUDIO & VIBRATION ENGINES (DESKTOP & MOBILE PHONE) ── */
let unlockedAudioCtx = null;

function unlockAudioOnFirstInteraction() {
  if (typeof window === 'undefined') return;
  const unlock = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!unlockedAudioCtx) unlockedAudioCtx = new AudioCtx();
        if (unlockedAudioCtx.state === 'suspended') unlockedAudioCtx.resume();
      }
    } catch (e) { }
    window.removeEventListener('touchstart', unlock, true);
    window.removeEventListener('pointerdown', unlock, true);
    window.removeEventListener('click', unlock, true);
  };
  window.addEventListener('touchstart', unlock, true);
  window.addEventListener('pointerdown', unlock, true);
  window.addEventListener('click', unlock, true);
}
unlockAudioOnFirstInteraction();

export function playNotificationChime() {
  try {
    const now = Date.now();
    // Throttle: Never play chime repeatedly within 2.5 seconds
    if (now - lastChimeTimestamp < 2500) return;
    lastChimeTimestamp = now;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = unlockedAudioCtx || new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const curTime = ctx.currentTime;

    // Harmonic 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, curTime);
    gain1.gain.setValueAtTime(0, curTime);
    gain1.gain.linearRampToValueAtTime(0.25, curTime + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, curTime + 0.38);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(curTime);
    osc1.stop(curTime + 0.38);

    // Harmonic 2: 880 Hz (A5) with pleasant harmonic bell chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, curTime + 0.12);
    gain2.gain.setValueAtTime(0, curTime + 0.12);
    gain2.gain.linearRampToValueAtTime(0.28, curTime + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.001, curTime + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(curTime + 0.12);
    osc2.stop(curTime + 0.6);
  } catch (e) {
    // Browser autoplay policy until user gesture
  }
}

export function triggerPhoneVibration() {
  try {
    const now = Date.now();
    // Throttle: Never vibrate repeatedly within 2.5 seconds
    if (now - lastVibrateTimestamp < 2500) return;
    lastVibrateTimestamp = now;

    if ('vibrate' in navigator) {
      // Distinct double buzz on phone
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  } catch (e) { }
}

export function isNotificationEnabled() {
  try {
    if (localStorage.getItem('ci360_notif_enabled') === 'false') return false;
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      return true;
    }
  } catch (e) { }
  return false;
}

export function isNotificationBannerDismissed() {
  try {
    if (isNotificationEnabled()) return true;
    if (localStorage.getItem('ci360_notif_banner_dismissed') === 'true') return true;
    if (typeof Notification !== 'undefined' && Notification.permission === 'denied') return true;
  } catch (e) { }
  return false;
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    flashToast('Your device browser does not support Web Notifications.', true);
    return false;
  }
  try {
    let perm;
    try {
      perm = await Notification.requestPermission();
    } catch (_) {
      perm = await new Promise(resolve => Notification.requestPermission(resolve));
    }
    const banner = document.getElementById('notifPermissionBanner');
    const globalBanner = document.getElementById('ci360GlobalNotifBanner');
    if (globalBanner) globalBanner.remove();

    if (perm === 'granted') {
      localStorage.setItem('ci360_notif_enabled', 'true');
      // Fire push subscription asynchronously without blocking UI or notifications
      registerPushSubscription().catch(() => {});
      if (banner) {
        banner.classList.add('hidden');
        banner.style.setProperty('display', 'none', 'important');
        banner.remove();
      }
      flashToast('Desktop notifications successfully enabled! 🔔');
      playNotificationChime();
      triggerPhoneVibration();
      await triggerSystemNotification({
        title: 'CI360 Desktop Alerts Active 🔔',
        message: 'Instant notifications are now live on your computer and browser!',
        id: 'ci360-perm-welcome-' + Date.now(),
        bypassDedup: true
      });
      return true;
    } else if (perm === 'denied') {
      if (banner) {
        banner.classList.add('hidden');
        banner.style.setProperty('display', 'none', 'important');
      }
      flashToast('Notifications are blocked. In your browser (Chrome/Brave/Edge), click the lock or shield icon in the address bar to Allow notifications.', true);
      return false;
    } else {
      if (banner) {
        banner.classList.add('hidden');
        banner.style.setProperty('display', 'none', 'important');
      }
      flashToast('Notification permission was not granted.', true);
      return false;
    }
  } catch (e) {
    console.error('Notification permission request error:', e);
  }
  return false;
}

export function setNotificationEnabled(enabled) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ci360_notif_enabled', enabled ? 'true' : 'false');
  if (enabled && 'Notification' in window && Notification.permission === 'default') {
    requestNotificationPermission();
  }
}

export async function triggerSystemNotification({ title, message, type, id, url, bypassDedup = false }) {
  if (typeof window === 'undefined') return;

  // Check if disabled by user setting
  if (localStorage.getItem('ci360_notif_enabled') === 'false') {
    return;
  }

  const strId = id ? String(id) : null;
  loadAlertedNotifIds();

  // Deduplication check
  if (!bypassDedup && strId && alertedNotifIds.has(strId)) {
    return;
  }
  if (strId) {
    alertedNotifIds.add(strId);
    saveAlertedNotifIds();
  }

  // Play chime and vibrate mobile phone
  playNotificationChime();
  triggerPhoneVibration();

  if (!('Notification' in window)) {
    return;
  }

  // If permission is not yet granted, trigger UI prompt banner
  if (Notification.permission !== 'granted') {
    checkAndShowGlobalNotifBanner();
    return;
  }

  const iconUrl = (typeof window !== 'undefined' && window.location)
    ? new URL('/logo.png', window.location.origin).href
    : '/logo.png';

  const cleanTitleStr = cleanNotificationTitle(title) || 'CI360 Alert';
  const cleanBodyStr = (message || 'You have a new update in CI360.').slice(0, 220);

  const options = {
    body: cleanBodyStr,
    icon: iconUrl,
    badge: iconUrl,
    tag: strId ? `ci360-notif-${strId}` : ('ci360-alert-' + Date.now()),
    renotify: true,
    requireInteraction: true, // Keep notification visible on screen on desktop until user dismisses or clicks
    silent: false,
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: url || (typeof window !== 'undefined' ? window.location.href : '/'),
      type: type || 'general'
    }
  };

  let shownOnDesktop = false;

  // 1. Direct window Notification (instant native desktop balloon on Windows, macOS, Linux)
  try {
    const n = new Notification(cleanTitleStr, options);
    n.onclick = (e) => {
      try {
        e.preventDefault();
        window.focus();
        if (options.data && options.data.url) {
          window.location.href = options.data.url;
        }
        n.close();
      } catch (_) {}
    };
    shownOnDesktop = true;
  } catch (desktopErr) {
    console.warn('Direct window Notification notice:', desktopErr);
  }

  // 2. Service Worker showNotification (ensures delivery when tab is minimized or backgrounded)
  if ('serviceWorker' in navigator) {
    try {
      const reg = swRegistration || await navigator.serviceWorker.getRegistration();
      if (reg && reg.showNotification && (!shownOnDesktop || document.visibilityState === 'hidden')) {
        await reg.showNotification(cleanTitleStr, options);
        shownOnDesktop = true;
      }
    } catch (swErr) {
      console.warn('Service worker showNotification notice:', swErr);
    }
  }

  // 3. Post to Service Worker controller if active
  try {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title: cleanTitleStr,
        options
      });
    }
  } catch (e) { }
}

export function checkAndShowGlobalNotifBanner() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!('Notification' in window)) return;

  const existing = document.getElementById('ci360GlobalNotifBanner');

  // If already granted, ensure no banner is showing
  if (Notification.permission === 'granted') {
    if (existing) existing.remove();
    return;
  }

  // If already rendered, don't duplicate
  if (existing) return;

  const banner = document.createElement('div');
  banner.id = 'ci360GlobalNotifBanner';
  banner.className = 'ci360-notif-prompt-banner';

  if (Notification.permission === 'denied') {
    // Permission is blocked in browser settings
    banner.style.cssText = 'background:linear-gradient(90deg, rgba(239,68,68,0.18), rgba(220,38,38,0.12));border:1px solid rgba(239,68,68,0.4);border-radius:12px;padding:12px 18px;margin:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.15);';
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;flex:1;">
        <span style="font-size:24px;line-height:1;">⚠️</span>
        <div style="font-size:12.5px;color:var(--text-1);line-height:1.4;">
          <strong style="color:#ef4444;font-size:13.5px;display:block;margin-bottom:2px;">Desktop Notifications are Blocked in Your Browser</strong>
          <span>To get desktop alerts for tasks, tickets, chat & jobs, click the lock/tune icon <strong style="color:var(--text-1);">🔒</strong> next to the URL in your browser address bar, set <strong>Notifications</strong> to <strong>Allow</strong>, and click Check Again.</span>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button type="button" id="ci360GlobalNotifCheckBtn" class="btn primary small" style="background:#ef4444;border-color:#ef4444;font-weight:700;white-space:nowrap;padding:7px 14px;border-radius:8px;">🔄 Check Again</button>
        <button type="button" id="ci360GlobalNotifDismissBtn" class="btn ghost small" style="color:var(--text-3);padding:4px 8px;font-size:14px;" title="Dismiss">✕</button>
      </div>
    `;
  } else {
    // Permission is default (not yet requested or granted)
    banner.style.cssText = 'background:linear-gradient(90deg, rgba(234,179,8,0.16), rgba(245,158,11,0.1));border:1px solid rgba(234,179,8,0.4);border-radius:12px;padding:12px 18px;margin:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.12);';
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;flex:1;">
        <span style="font-size:24px;line-height:1;">🔔</span>
        <div style="font-size:12.5px;color:var(--text-1);line-height:1.4;">
          <strong style="color:#d97706;font-size:13.5px;display:block;margin-bottom:2px;">Enable Desktop Notifications</strong>
          <span>Get real-time desktop popups on your computer for tasks, tickets, team chat & jobs across all dashboards.</span>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button type="button" id="ci360GlobalNotifEnableBtn" class="btn primary small" style="background:#d97706;border-color:#d97706;font-weight:700;white-space:nowrap;padding:7px 16px;border-radius:8px;">🔔 Turn On Notifications</button>
        <button type="button" id="ci360GlobalNotifDismissBtn" class="btn ghost small" style="color:var(--text-3);padding:4px 8px;font-size:14px;" title="Dismiss">✕</button>
      </div>
    `;
  }

  const appMain = document.querySelector('.app-main') || document.body;
  const topbar = appMain.querySelector('.app-topbar');
  if (topbar && topbar.nextSibling) {
    appMain.insertBefore(banner, topbar.nextSibling);
  } else if (appMain.firstChild) {
    appMain.insertBefore(banner, appMain.firstChild);
  } else {
    appMain.appendChild(banner);
  }

  const enableBtn = banner.querySelector('#ci360GlobalNotifEnableBtn');
  const checkBtn = banner.querySelector('#ci360GlobalNotifCheckBtn');
  const dismissBtn = banner.querySelector('#ci360GlobalNotifDismissBtn');

  if (enableBtn) {
    enableBtn.onclick = async (e) => {
      e.stopPropagation();
      banner.remove();
      localStorage.setItem('ci360_notif_enabled', 'true');
      const granted = await requestNotificationPermission();
      if (granted) {
        flashToast('Desktop notifications enabled successfully! 🔔');
      }
    };
  }

  if (checkBtn) {
    checkBtn.onclick = (e) => {
      e.stopPropagation();
      banner.remove();
      if (Notification.permission === 'granted') {
        localStorage.setItem('ci360_notif_enabled', 'true');
        flashToast('Notifications are now allowed! 🔔');
        triggerSystemNotification({
          title: 'CI360 Desktop Alerts Active 🔔',
          message: 'Notifications are working on your computer!',
          id: 'test-check-' + Date.now(),
          bypassDedup: true
        });
      } else {
        checkAndShowGlobalNotifBanner();
        flashToast('Still blocked. Please change permission to Allow in your browser URL bar.', true);
      }
    };
  }

  if (dismissBtn) {
    dismissBtn.onclick = (e) => {
      e.stopPropagation();
      banner.remove();
      localStorage.setItem('ci360_global_notif_banner_dismissed', String(Date.now()));
    };
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerPushSubscription(registration = null) {
  try {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      return null;
    }
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
      return null;
    }
    const token = getToken();
    if (!token) {
      // Do not subscribe unauthenticated visitors to prevent 401 errors on login page
      return null;
    }
    const readyPromise = ('serviceWorker' in navigator) ? navigator.serviceWorker.ready : Promise.resolve(null);
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 10000));
    const reg = registration || swRegistration || await Promise.race([readyPromise, timeoutPromise]);
    if (!reg || !reg.pushManager) return null;

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const vapidRes = await apiGet('/notifications/vapid-public-key').catch(() => null);
      const vapidKey = vapidRes && vapidRes.publicKey
        ? vapidRes.publicKey
        : 'BLU6W-Tq2_DQaI2HiUJujMzdddeVd52DUTtgxHVeLTywkctQIggkk5R3ZclRlJrhPfEwjH7Sq9sas5d5GSmqS5Q';

      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      });
    }

    if (sub) {
      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      await api('/notifications/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          subscription: sub.toJSON ? sub.toJSON() : sub,
          deviceType: isMobile ? 'mobile' : 'desktop'
        })
      }).catch((e) => {
        console.warn('Push subscription sync notice:', e.message);
      });
      console.log('CI360 Web Push active for background & closed-site alerts.');
      return sub;
    }
  } catch (err) {
    console.warn('Push subscription registration notice:', err.message);
  }
  return null;
}

if (typeof window !== 'undefined') {
  window.triggerSystemNotification = triggerSystemNotification;
  window.requestNotificationPermission = requestNotificationPermission;
  window.registerPushSubscription = registerPushSubscription;

  // On first user interaction anywhere in the app, prompt for notification permission if still default
  if ('Notification' in window) {
    const promptOnUserInteraction = () => {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') {
            localStorage.setItem('ci360_notif_enabled', 'true');
          }
        }).catch(() => { });
      }
      window.removeEventListener('click', promptOnUserInteraction, true);
      window.removeEventListener('touchstart', promptOnUserInteraction, true);
    };
    window.addEventListener('click', promptOnUserInteraction, true);
    window.addEventListener('touchstart', promptOnUserInteraction, true);
  }
}

/* ── IN-APP POPUP NOTIFICATIONS & OVERDUE INVOICE MODAL ──────── */
export function cleanNotificationTitle(title) {
  if (!title) return '';
  return String(title).replace(/^[\p{Extended_Pictographic}\u2000-\u3300\uD800-\uDFFF\uFE00-\uFE0F\s]+/u, '').trim() || title;
}

export function getOrCreateFloatingAlertContainer() {
  if (typeof document === 'undefined') return null;
  let container = document.getElementById('ci360FloatingContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ci360FloatingContainer';
    container.className = 'ci360-floating-container';
    document.body.appendChild(container);
  }
  return container;
}

export function showInAppPopupAlert({ id, title, message, type, time, actionText, onAction, persistent = false, timeout = 4500 }) {
  const container = getOrCreateFloatingAlertContainer();
  if (!container) return;

  const cardId = `ci360-pop-${id || Math.random().toString(36).slice(2, 9)}`;

  // Strictly enforce only 1 visible popup at any time ("it should just come once and than go")
  while (container.firstChild) {
    try { container.removeChild(container.firstChild); } catch (e) { }
  }

  let icon = '🔔';
  let priority = 'info';
  let defaultActionText = 'View';
  let defaultNavTab = '';

  const t = (type || '').toLowerCase();
  const m = (message || '').toLowerCase();

  if (t.includes('chat_message') || t.includes('chat') || t.includes('message')) {
    icon = '💬'; priority = 'info'; defaultActionText = 'Open Chat'; defaultNavTab = 'teambonding';
  } else if (t.includes('game_challenge') || t.includes('game') || t.includes('invitation') || t.includes('challenge')) {
    icon = '🎮'; priority = 'warning'; defaultActionText = 'View Game'; defaultNavTab = 'teambonding';
  } else if (t.includes('invoice_overdue')) {
    icon = '🚨'; priority = 'critical'; defaultActionText = 'View Invoice'; defaultNavTab = 'billing';
  } else if (t.includes('invoice_paid') || t.includes('payment')) {
    icon = '💳'; priority = 'success'; defaultActionText = 'View Billing'; defaultNavTab = 'billing';
  } else if (t.includes('invoice')) {
    icon = '🧾'; priority = 'info'; defaultActionText = 'View Invoice'; defaultNavTab = 'billing';
  } else if (t.includes('job') && (m.includes('overdue') || t.includes('overdue'))) {
    icon = '⚠️'; priority = 'critical'; defaultActionText = 'View Job'; defaultNavTab = 'jobs';
  } else if (t.includes('job') && m.includes('due today')) {
    icon = '⏳'; priority = 'warning'; defaultActionText = 'View Job'; defaultNavTab = 'jobs';
  } else if (t.includes('job_created')) {
    icon = '📋'; priority = 'info'; defaultActionText = 'View Job'; defaultNavTab = 'jobs';
  } else if (t.includes('job') || t.includes('status')) {
    icon = '📋'; priority = 'info'; defaultActionText = 'View Job'; defaultNavTab = 'jobs';
  } else if (t.includes('task') && (m.includes('overdue') || t.includes('overdue'))) {
    icon = '⚠️'; priority = 'critical'; defaultActionText = 'View Planner'; defaultNavTab = 'dailytasks';
  } else if (t.includes('task_completed')) {
    icon = '✅'; priority = 'success'; defaultActionText = 'View Planner'; defaultNavTab = 'dailytasks';
  } else if (t.includes('task')) {
    icon = '📅'; priority = 'info'; defaultActionText = 'Open Planner'; defaultNavTab = 'dailytasks';
  } else if (t.includes('ticket_under_review') || (t.includes('ticket') && m.includes('under review'))) {
    icon = '🔍'; priority = 'warning'; defaultActionText = 'Review Ticket'; defaultNavTab = 'tickets';
  } else if (t.includes('ticket_resolved') || t.includes('ticket_completed') || (t.includes('ticket') && m.includes('completed'))) {
    icon = '✅'; priority = 'success'; defaultActionText = 'View Ticket'; defaultNavTab = 'tickets';
  } else if (t.includes('ticket')) {
    icon = '🎫'; priority = 'info'; defaultActionText = 'View Ticket'; defaultNavTab = 'tickets';
  } else if (t.includes('target')) {
    icon = '🎯'; priority = 'success'; defaultActionText = 'View Targets'; defaultNavTab = 'targets';
  }

  const finalActionText = actionText || defaultActionText;

  // Prevent double icons: strip any leading emoji from title
  let cleanTitle = cleanNotificationTitle(title || 'Notification');
  if (icon && cleanTitle.startsWith(icon)) {
    cleanTitle = cleanTitle.slice(icon.length).trim();
  }

  const card = document.createElement('div');
  card.id = cardId;
  card.className = `ci360-popup-card ci360-priority-${priority}`;
  card.innerHTML = `
    <div class="ci360-popup-body">
      <div class="ci360-popup-header">
        <div class="ci360-popup-header-left">
          <span class="ci360-popup-icon">${icon}</span>
          <span class="ci360-popup-title">${escapeHtml(cleanTitle || 'Notification')}</span>
        </div>
        <div class="ci360-popup-header-right">
          ${finalActionText ? `<button type="button" class="ci360-popup-action-btn">${finalActionText}</button>` : ''}
          <button type="button" class="ci360-popup-close-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
      ${message ? `<div class="ci360-popup-message">${escapeHtml(message || '')}</div>` : ''}
    </div>
  `;

  // Subtle audio chime & vibration
  playNotificationChime();
  triggerPhoneVibration();

  // Purge notification from database and bell list UI when dismissed or expired
  const purgeNotification = async () => {
    if (id) {
      try {
        await apiDelete(`/notifications/${id}`);
      } catch (err) { }
      if (typeof window.ci360RemoveNotifFromUI === 'function') {
        window.ci360RemoveNotifFromUI(id);
      }
    }
  };

  // Close handler
  const closeCard = () => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-6px) scale(0.97)';
    setTimeout(() => {
      try { card.remove(); } catch (e) { }
    }, 180);
    purgeNotification();
  };

  const closeBtn = card.querySelector('.ci360-popup-close-btn');
  if (closeBtn) closeBtn.onclick = (e) => { e.stopPropagation(); closeCard(); };

  // Action button click
  const executeAction = () => {
    if (typeof onAction === 'function') {
      onAction();
    } else if (defaultNavTab && typeof window.ci360NavTab === 'function') {
      const curUser = (typeof getUser === 'function') ? getUser() : null;
      let navTarget = defaultNavTab;
      if (curUser && curUser.role === 'employee' && (navTarget === 'jobs' || navTarget === 'myjobs')) {
        navTarget = 'myjobs';
      }
      window.ci360NavTab(navTarget);
    }
    purgeNotification();
    closeCard();
  };

  const actionBtn = card.querySelector('.ci360-popup-action-btn');
  if (actionBtn) {
    actionBtn.onclick = (e) => {
      e.stopPropagation();
      executeAction();
    };
  }

  card.style.cursor = 'pointer';
  card.onclick = (e) => {
    if (e.target.closest('.ci360-popup-close-btn')) return;
    executeAction();
  };

  // Strictly keep only 1 visible popup ("it should just come once and than go")
  while (container.children.length >= 1) {
    const oldest = container.firstChild;
    if (oldest) container.removeChild(oldest);
  }

  container.appendChild(card);

  // Auto-dismiss timeout (4.5s: come once and then go)
  if (!persistent) {
    setTimeout(() => {
      if (document.body.contains(card)) {
        closeCard();
      }
    }, timeout || 4500);
  }
}

export function showClientOverdueInvoiceModal(overdueInvoices = []) {
  if (!overdueInvoices || !overdueInvoices.length) return;
  // If dismissed in this session within last 45 minutes, don't show
  const lastDismissed = sessionStorage.getItem('ci360_client_overdue_dismissed');
  if (lastDismissed && (Date.now() - Number(lastDismissed) < 45 * 60 * 1000)) return;

  const totalOverdue = overdueInvoices.reduce((s, i) => s + (Number(i.pendingAmount || i.totalAmount) || 0), 0);

  const modalHtml = `
    <div class="ci360-overdue-modal-card">
      <div class="ci360-overdue-header">
        <div class="ci360-overdue-alert-icon">⚠️</div>
        <div>
          <h2 style="margin:0;font-size:17px;font-weight:800;color:var(--red-600)">Action Required: Overdue Invoices</h2>
          <p style="margin:4px 0 0;font-size:12.5px;color:var(--text-3);line-height:1.4">
            You have outstanding balances past due date. Please process settlement to keep active deliverables on track.
          </p>
        </div>
      </div>

      <div class="ci360-overdue-amount-box">
        <div>
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-4);font-weight:700">Total Outstanding Overdue</div>
          <div style="font-size:24px;font-weight:900;color:var(--red-600);margin-top:2px">${fmtINR(totalOverdue)}</div>
        </div>
        <span class="badge red" style="font-size:11px;padding:5px 10px">${overdueInvoices.length} Overdue Invoice${overdueInvoices.length > 1 ? 's' : ''}</span>
      </div>

      <div class="ci360-overdue-list">
        ${overdueInvoices.map(inv => {
    const due = inv.dueDate ? new Date(inv.dueDate) : new Date();
    const daysOverdue = Math.max(1, Math.floor((Date.now() - due.getTime()) / (1000 * 60 * 60 * 24)));
    return `
            <div class="ci360-overdue-item">
              <div>
                <strong style="font-size:13px;color:var(--text-1)">${escapeHtml(inv.invoiceNumber)}</strong>
                <div style="font-size:11.5px;color:var(--text-4);margin-top:2px">
                  Due: ${fmtDate(inv.dueDate)} <span style="color:var(--red-600);font-weight:700">(${daysOverdue}d overdue)</span>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:14px;font-weight:800;color:var(--red-600)">${fmtINR(inv.pendingAmount || inv.totalAmount || 0)}</div>
                <span class="badge red" style="font-size:9.5px;margin-top:2px">OVERDUE</span>
              </div>
            </div>`;
  }).join('')}
      </div>

      <div class="ci360-overdue-bank-box">
        <div style="font-weight:700;font-size:12px;color:var(--text-1);margin-bottom:4px">Settlement Bank & UPI Details:</div>
        <div style="font-size:12px;color:var(--text-3);line-height:1.5">
          Bank: <strong>HDFC Bank</strong> | A/C: <strong>50200088992211</strong><br>
          IFSC: <strong>HDFC0001234</strong> | UPI: <strong>cognitoinnovo@hdfcbank</strong>
        </div>
      </div>

      <div class="ci360-overdue-actions">
        <button id="ci360OverdueRemindBtn" type="button" class="btn ghost" style="padding:10px 16px;font-size:12.5px">
          Remind Me Later
        </button>
        <button id="ci360OverduePayBtn" type="button" class="btn gold" style="padding:10px 20px;font-size:13px;font-weight:700">
          💳 View & Settle Invoices
        </button>
      </div>
    </div>
  `;

  const modalBg = openModal(modalHtml);
  const payBtn = modalBg.querySelector('#ci360OverduePayBtn');
  const remindBtn = modalBg.querySelector('#ci360OverdueRemindBtn');

  if (payBtn) {
    payBtn.onclick = () => {
      sessionStorage.setItem('ci360_client_overdue_dismissed', String(Date.now()));
      modalBg.remove();
      if (typeof window.ci360NavTab === 'function') {
        window.ci360NavTab('billing');
      }
    };
  }

  if (remindBtn) {
    remindBtn.onclick = () => {
      sessionStorage.setItem('ci360_client_overdue_dismissed', String(Date.now()));
      modalBg.remove();
    };
  }
}

/* ── NOTIFICATION BELL ───────────────────────────────────────── */
export function renderNotificationBell() {
  const shouldShowBanner = !isNotificationBannerDismissed() && (typeof Notification === 'undefined' || Notification.permission === 'default');

  return `
    <div class="notif-wrapper">
      <button id="notifBellBtn" type="button" class="notif-bell-btn" title="Notifications" aria-label="Notifications">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span id="notifBadge" class="notif-badge" style="display:none">0</span>
      </button>
      <div id="notifBackdrop" class="notif-backdrop" style="display:none"></div>
      <div id="notifDropdown" class="notif-dropdown" style="display:none">
        <div class="notif-dropdown-header">
          <div class="notif-header-title">
            <span class="notif-header-bell">🔔</span>
            <span class="notif-header-heading">Notifications</span>
            <span id="notifUnreadBadge" class="notif-header-count" style="display:none"></span>
          </div>
          <div class="notif-header-actions">
            <button id="notifTestAlertBtn" type="button" class="btn ghost small notif-action-btn" title="Send a test notification to your desktop">🔔 Test Alert</button>
            <button id="markAllReadBtn" type="button" class="btn ghost small notif-action-btn">Mark Read</button>
            <button id="clearNotifBtn" type="button" class="btn ghost small notif-action-btn">Clear</button>
            <button id="notifCloseBtn" type="button" class="notif-mobile-close" aria-label="Close notifications">✕</button>
          </div>
        </div>

        ${shouldShowBanner ? `
        <div id="notifPermissionBanner" class="notif-perm-banner">
          <div class="npb-content">
            <span class="npb-icon">🔔</span>
            <div class="npb-text">
              <strong>Enable Phone & Browser Alerts</strong>
              <span>Get notified on this device when jobs or tasks are updated.</span>
            </div>
          </div>
          <div class="npb-actions">
            <button type="button" class="btn primary small npb-btn" id="notifEnableBtn">Enable</button>
            <button type="button" class="npb-close" id="notifDismissBannerBtn" aria-label="Dismiss">✕</button>
          </div>
        </div>` : ''}

        <div class="notif-filters">
          <button type="button" class="notif-filter-btn active" data-filter="all">All</button>
          <button type="button" class="notif-filter-btn" data-filter="task">✅ Tasks</button>
          <button type="button" class="notif-filter-btn" data-filter="target">🎯 Targets</button>
          <button type="button" class="notif-filter-btn" data-filter="job">📋 Jobs</button>
          <button type="button" class="notif-filter-btn" data-filter="ticket">🎫 Tickets</button>
          <button type="button" class="notif-filter-btn" data-filter="chat">💬 Chat</button>
        </div>
        <div class="notif-list" id="notifList">
          <div class="empty" style="padding:24px 16px;font-size:12.5px;">Loading notifications…</div>
        </div>
      </div>
    </div>`;
}

export function getNotifIcon(type) {
  if (!type) return '🔔';
  if (type.startsWith('chat') || type.startsWith('message')) return '💬';
  if (type.startsWith('game') || type.startsWith('invitation') || type.startsWith('challenge')) return '🎮';
  if (type.startsWith('task_completed')) return '🎉';
  if (type.startsWith('task_due')) return '⚡';
  if (type.startsWith('task')) return '✅';
  if (type.startsWith('target_completed')) return '🎉';
  if (type.startsWith('target')) return '🎯';
  if (type.startsWith('job_due')) return '⏳';
  if (type.startsWith('job')) return '📋';
  if (type.startsWith('ticket_under_review')) return '🔍';
  if (type.startsWith('ticket_resolved') || type.startsWith('ticket_completed')) return '✅';
  if (type.startsWith('ticket')) return '🎫';
  if (type.startsWith('status')) return '🔄';
  if (type.startsWith('test')) return '🧪';
  return '🔔';
}

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const sec = Math.floor((now - d) / 1000);
  if (sec < 60) return 'Just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return fmtDate(dateStr);
}

export function openNotificationModal(n) {
  if (!n) return;
  const icon = getNotifIcon(n.type);
  const type = (n.type || '').toLowerCase();
  const title = n.title || 'Notification';
  const message = n.message || '';
  const dateStr = n.createdAt ? (fmtDate(n.createdAt) + ' at ' + new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : 'Recently';
  const timeStr = timeAgo(n.createdAt);
  const curUser = (typeof getUser === 'function') ? getUser() : null;
  const isEmployee = curUser && curUser.role === 'employee';

  let badgeLabel = 'Update';
  let badgeClass = 'blue';
  let actionBtnText = '';
  let targetTab = '';
  const highlightId = n.jobId || n.taskId || n.ticketId || n.targetId || null;

  if (type.includes('job')) {
    badgeLabel = 'Job Deliverable';
    badgeClass = 'blue';
    targetTab = isEmployee ? 'myjobs' : 'jobs';
    actionBtnText = isEmployee ? 'Open in My Jobs 📋' : 'View Job 📁';
  } else if (type.includes('chat') || type.includes('bonding_message') || type.includes('message')) {
    badgeLabel = 'Team Chat';
    badgeClass = 'blue';
    targetTab = 'teambonding';
    actionBtnText = 'Open Chat & Lounge 💬';
  } else if (type.includes('game') || type.includes('challenge') || type.includes('invitation')) {
    badgeLabel = 'Game Challenge';
    badgeClass = 'purple';
    targetTab = 'teambonding';
    actionBtnText = 'Enter Game Lounge 🎮';
  } else if (type.includes('task')) {
    badgeLabel = 'Daily Planner';
    badgeClass = 'green';
    targetTab = 'dailytasks';
    actionBtnText = 'Open Daily Planner 📅';
  } else if (type.includes('ticket')) {
    badgeLabel = 'Support Ticket';
    badgeClass = 'brand';
    targetTab = 'tickets';
    actionBtnText = 'Open Support Tickets 🎫';
  } else if (type.includes('target')) {
    badgeLabel = 'Target Goal';
    badgeClass = 'gold';
    targetTab = 'targets';
    actionBtnText = 'View My Targets 🎯';
  } else if (type.includes('invoice') || type.includes('billing')) {
    badgeLabel = 'Billing & Invoice';
    badgeClass = 'purple';
    targetTab = 'billing';
    actionBtnText = 'Open Billing 💳';
  }

  const hasAttachments = Array.isArray(n.attachments) && n.attachments.length > 0;

  const bg = openModal(`
    <div class="notif-detail-modal" style="padding:4px 0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-xs)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:12px;background:var(--bg-elevated);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:var(--shadow-xs)">
            ${icon}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <span class="badge ${badgeClass}" style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${badgeLabel}</span>
              <span style="font-size:11.5px;color:var(--text-4)">${timeStr}</span>
            </div>
            <div style="font-size:11px;color:var(--text-4)">${dateStr}</div>
          </div>
        </div>
        <button type="button" class="btn ghost small notif-modal-close-btn" aria-label="Close" style="padding:4px 8px;font-size:16px;line-height:1;border-radius:6px;color:var(--text-3)">✕</button>
      </div>

      <h3 style="font-size:16.5px;font-weight:800;color:var(--text-1);margin:0 0 12px 0;line-height:1.35;letter-spacing:-0.3px">
        ${escapeHtml(cleanNotificationTitle(title))}
      </h3>

      <div style="background:var(--bg-elevated);border:1px solid var(--border-xs);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13.5px;color:var(--text-2);line-height:1.6;white-space:pre-wrap;word-break:break-word">
        ${escapeHtml(message)}
      </div>

      ${hasAttachments ? `
        <div style="margin-bottom:16px">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Attachments (${n.attachments.length})</div>
          ${renderAttachmentChips(n.attachments, { title: 'Attachments' })}
        </div>
      ` : ''}

      <div class="modal-actions" style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border-xs);display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap">
        <button type="button" class="btn secondary notif-modal-dismiss-btn" style="font-weight:600">Close</button>
        ${targetTab ? `
          <button type="button" class="btn primary notif-modal-go-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <span>${actionBtnText}</span>
          </button>
        ` : ''}
      </div>
    </div>
  `);

  const closeModal = () => bg.remove();
  const closeBtn = bg.querySelector('.notif-modal-close-btn');
  const dismissBtn = bg.querySelector('.notif-modal-dismiss-btn');
  const goBtn = bg.querySelector('.notif-modal-go-btn');

  if (closeBtn) closeBtn.onclick = closeModal;
  if (dismissBtn) dismissBtn.onclick = closeModal;

  if (goBtn) {
    goBtn.onclick = () => {
      closeModal();
      if (typeof window.ci360NavTab === 'function') {
        window.ci360NavTab(targetTab, highlightId);
      }
    };
  }
}

export function initNotificationBell() {
  const bellBtn = document.getElementById('notifBellBtn');
  const dropdown = document.getElementById('notifDropdown');
  const badge = document.getElementById('notifBadge');
  const list = document.getElementById('notifList');
  const clearBtn = document.getElementById('clearNotifBtn');
  const markReadBtn = document.getElementById('markAllReadBtn');
  const testAlertBtn = document.getElementById('notifTestAlertBtn');
  const notifEnableBtn = document.getElementById('notifEnableBtn');
  const notifDismissBannerBtn = document.getElementById('notifDismissBannerBtn');
  const permBanner = document.getElementById('notifPermissionBanner');
  const unreadTxt = document.getElementById('notifUnreadBadge');
  if (!bellBtn || !dropdown) return;

  // Initialize service worker & ensure background push subscription is linked
  initServiceWorker().then(() => {
    if (isNotificationEnabled()) {
      registerPushSubscription().catch(() => {});
    }
  }).catch(() => {});

  function hidePermBanner() {
    const b = document.getElementById('notifPermissionBanner');
    if (b) {
      b.classList.add('hidden');
      b.style.setProperty('display', 'none', 'important');
      b.remove();
    }
  }

  // Check permission state for banner
  function checkPermissionUI() {
    if (isNotificationBannerDismissed()) {
      hidePermBanner();
      return;
    }
    if ('Notification' in window) {
      if (Notification.permission === 'granted' || Notification.permission === 'denied') {
        hidePermBanner();
      } else if (Notification.permission === 'default') {
        if (permBanner) permBanner.style.setProperty('display', 'flex', 'important');
        checkAndShowGlobalNotifBanner();
      }
    }
  }
  checkPermissionUI();
  checkAndShowGlobalNotifBanner();

  if (testAlertBtn) {
    testAlertBtn.onclick = async (e) => {
      e.stopPropagation();
      if (!('Notification' in window)) {
        flashToast('Your browser does not support desktop notifications.', true);
        return;
      }
      if (Notification.permission === 'default') {
        const granted = await requestNotificationPermission();
        if (!granted) return;
      } else if (Notification.permission === 'denied') {
        flashToast('Notifications are blocked in your browser. Click the lock/shield icon in the address bar to Allow notifications.', true);
        return;
      }
      playNotificationChime();
      triggerPhoneVibration();
      await triggerSystemNotification({
        title: '🔔 CI360 Desktop Alert Test',
        message: 'Desktop notifications are working perfectly on your computer!',
        id: 'test-manual-' + Date.now(),
        bypassDedup: true
      });
      flashToast('Desktop notification sent! 🔔 Check your screen.');
    };
  }

  if (notifDismissBannerBtn) {
    notifDismissBannerBtn.onclick = (e) => {
      e.stopPropagation();
      localStorage.setItem('ci360_notif_banner_dismissed', 'true');
      hidePermBanner();
    };
  }

  if (notifEnableBtn) {
    notifEnableBtn.onclick = async (e) => {
      e.stopPropagation();
      localStorage.setItem('ci360_notif_enabled', 'true');
      hidePermBanner();
      await requestNotificationPermission();
      hidePermBanner();
    };
  }

  if (isNotificationEnabled()) {
    registerPushSubscription();
  }

  // Clear any existing polling interval to ensure only one interval runs across tab switches
  if (window.__ci360PollInterval) {
    clearInterval(window.__ci360PollInterval);
    window.__ci360PollInterval = null;
  }

  loadAlertedNotifIds();

  let allNotifs = [];
  let currentFilter = 'all';

  function renderList() {
    if (!list) return;
    let filtered = allNotifs;
    if (currentFilter === 'task') filtered = allNotifs.filter(n => (n.type || '').includes('task'));
    else if (currentFilter === 'target') filtered = allNotifs.filter(n => (n.type || '').includes('target'));
    else if (currentFilter === 'job') filtered = allNotifs.filter(n => (n.type || '').includes('job'));
    else if (currentFilter === 'ticket') filtered = allNotifs.filter(n => (n.type || '').includes('ticket'));
    else if (currentFilter === 'chat') filtered = allNotifs.filter(n => (n.type || '').includes('chat') || (n.type || '').includes('game') || (n.type || '').includes('bonding'));

    if (filtered.length === 0) {
      list.innerHTML = `<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${currentFilter === 'all' ? '' : currentFilter + ' '}notifications</div>`;
      return;
    }

    list.innerHTML = filtered.map(n => {
      const icon = getNotifIcon(n.type);
      return `
        <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n._id}" data-type="${escapeHtml(n.type || '')}">
          <div class="notif-icon">${icon}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${escapeHtml(cleanNotificationTitle(n.title))}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${timeAgo(n.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${escapeHtml(n.message)}</div>
          </div>
          <div style="color:var(--text-4);font-size:16px;line-height:1;margin-top:2px;flex-shrink:0">›</div>
        </div>`;
    }).join('');

    list.querySelectorAll('.notif-item').forEach(item => {
      item.onclick = async () => {
        const id = item.dataset.id;
        const notif = allNotifs.find(n => String(n._id) === String(id));
        if (id && item.classList.contains('unread')) {
          item.classList.remove('unread');
          try { await api(`/notifications/${id}/read`, { method: 'PATCH' }); } catch (e) { }
          const unreadCount = allNotifs.filter(n => !n.read && String(n._id) !== String(id)).length;
          if (badge) {
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
          }
          if (unreadTxt) {
            unreadTxt.textContent = unreadCount > 0 ? `${unreadCount} new` : '';
            unreadTxt.style.display = unreadCount > 0 ? 'inline-block' : 'none';
          }
        }
        closeDropdown();
        if (notif) {
          openNotificationModal(notif);
        } else {
          const type = item.dataset.type;
          const u = (typeof getUser === 'function') ? getUser() : null;
          const isEmp = u && u.role === 'employee';
          if (type && type.includes('task') && typeof window.ci360NavTab === 'function') {
            window.ci360NavTab('dailytasks');
          } else if (type && type.includes('job') && typeof window.ci360NavTab === 'function') {
            window.ci360NavTab(isEmp ? 'myjobs' : 'jobs');
          } else if (type && type.includes('ticket') && typeof window.ci360NavTab === 'function') {
            window.ci360NavTab('tickets');
          } else if (type && type.includes('target') && typeof window.ci360NavTab === 'function') {
            window.ci360NavTab('targets');
          } else if (type && (type.includes('chat') || type.includes('game') || type.includes('bonding')) && typeof window.ci360NavTab === 'function') {
            window.ci360NavTab('teambonding');
          }
        }
      };
    });
  }

  let lastKnownTimestamps = { jobs: 0, tasks: 0, invoices: 0, tickets: 0 };
  let hasReceivedFirstSync = false;

  async function fetchNotifications(isManual = false) {
    try {
      const data = await apiGet('/notifications');
      allNotifs = data.notifications || [];
      const unread = data.unreadCount || 0;
      if (badge) {
        badge.textContent = unread > 99 ? '99+' : unread;
        badge.style.display = unread > 0 ? 'flex' : 'none';
      }
      if (unreadTxt) {
        unreadTxt.textContent = unread > 0 ? `${unread} new` : '';
        unreadTxt.style.display = unread > 0 ? 'inline-block' : 'none';
      }

      loadAlertedNotifIds();

      // Check overdue invoices for clients
      if (data.overdue && data.overdue.invoices && data.overdue.invoices.length > 0) {
        const user = (typeof getUser === 'function') ? getUser() : null;
        if (user && user.role === 'client') {
          showClientOverdueInvoiceModal(data.overdue.invoices);
        }
      }

      // Check sync timestamps for live auto-updating without manual page refresh
      if (data.syncTimestamps) {
        const cur = data.syncTimestamps;
        if (!hasReceivedFirstSync) {
          lastKnownTimestamps = { ...cur };
          hasReceivedFirstSync = true;
        } else {
          const changedKeys = [];
          if (cur.jobs > (lastKnownTimestamps.jobs || 0)) changedKeys.push('jobs');
          if (cur.tasks > (lastKnownTimestamps.tasks || 0)) changedKeys.push('tasks');
          if (cur.invoices > (lastKnownTimestamps.invoices || 0)) changedKeys.push('invoices');
          if (cur.tickets > (lastKnownTimestamps.tickets || 0)) changedKeys.push('tickets');

          if (changedKeys.length > 0) {
            lastKnownTimestamps = { ...cur };
            window.dispatchEvent(new CustomEvent('ci360:dataUpdated', {
              detail: { changedKeys, syncTimestamps: cur, overdue: data.overdue }
            }));
            if (typeof window.ci360TriggerAutoUpdate === 'function') {
              window.ci360TriggerAutoUpdate({ changedKeys, syncTimestamps: cur });
            }
          }
        }
      }

      // Session baseline: On initial page load / refresh, mark notifications older than 10 minutes as alerted
      // so older history does not bombard the user, BUT recent unread notifications that arrived while away will trigger!
      if (!isSessionBaselineEstablished) {
        const tenMinsAgo = Date.now() - (10 * 60 * 1000);
        allNotifs.forEach(n => {
          const sid = String(n._id);
          const notifTime = n.createdAt ? new Date(n.createdAt).getTime() : 0;
          if (n.read || notifTime < tenMinsAgo) {
            seenNotifIds.add(sid);
            alertedNotifIds.add(sid);
          }
        });
        saveAlertedNotifIds();
        isSessionBaselineEstablished = true;
      }

      // Genuine new incoming unread notifications that arrived during active session or recently while away
      const newlyArrived = allNotifs.filter(n => !n.read && !alertedNotifIds.has(String(n._id)));

      if (newlyArrived.length > 0) {
        const todayStr = new Date().toISOString().slice(0, 10);
        const dailyJobAlertKey = 'ci360_daily_alert_job_' + todayStr;
        let jobDueAlertedInLoop = !!localStorage.getItem(dailyJobAlertKey);

        // Mark all newly arrived items as alerted immediately so they don't loop
        newlyArrived.forEach(n => {
          const sid = String(n._id);
          seenNotifIds.add(sid);
          alertedNotifIds.add(sid);
        });
        saveAlertedNotifIds();

        // Stagger alert delivery for newly arrived notifications (up to 4 at once) so every event pops up on desktop
        const toAlert = newlyArrived.slice(0, 4);
        toAlert.forEach((item, index) => {
          setTimeout(async () => {
            const sid = String(item._id);
            let shouldShow = true;
            if (item.type === 'job_due' || (item.title && item.title.includes('Job Due'))) {
              if (jobDueAlertedInLoop) {
                shouldShow = false;
              } else {
                localStorage.setItem(dailyJobAlertKey, 'true');
                jobDueAlertedInLoop = true;
              }
            }

            if (shouldShow) {
              // Pop up interactive in-app toast card (for primary new notification)
              if (index === 0) {
                showInAppPopupAlert({
                  id: sid,
                  title: item.title || 'CI360 Alert',
                  message: item.message || '',
                  type: item.type
                });
              }

              // Trigger system / OS desktop notification with bypassDedup: true so it is guaranteed to show
              await triggerSystemNotification({
                title: item.title || 'CI360 Alert',
                message: item.message || '',
                type: item.type,
                id: sid,
                bypassDedup: true
              });
            }
          }, index * 250);
        });
        saveAlertedNotifIds();

        // Also trigger view auto update so new items immediately appear without refresh
        window.dispatchEvent(new CustomEvent('ci360:dataUpdated', {
          detail: { newNotifications: newlyArrived }
        }));
        if (typeof window.ci360TriggerAutoUpdate === 'function') {
          window.ci360TriggerAutoUpdate({ newNotifications: newlyArrived });
        }
      }

      renderList();
    } catch (e) {
      if (list && allNotifs.length === 0) list.innerHTML = `<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>`;
    }
  }

  // Expose remove & fetch helpers globally
  if (typeof window !== 'undefined') {
    window.ci360FetchNotifications = fetchNotifications;
    window.showInAppPopupAlert = showInAppPopupAlert;
    window.showClientOverdueInvoiceModal = showClientOverdueInvoiceModal;
    window.ci360RemoveNotifFromUI = (notifId) => {
      if (!notifId) return;
      const sId = String(notifId);
      allNotifs = allNotifs.filter(n => String(n._id) !== sId);
      const unread = allNotifs.filter(n => !n.read).length;
      if (badge) {
        badge.textContent = unread > 99 ? '99+' : unread;
        badge.style.display = unread > 0 ? 'inline-flex' : 'none';
      }
      if (unreadTxt) {
        unreadTxt.textContent = unread > 0 ? `${unread} unread` : '';
        unreadTxt.style.display = unread > 0 ? 'inline' : 'none';
      }
      renderList();
    };
  }

  fetchNotifications();
  // Fast responsive auto-polling interval every 6 seconds for real-time updates without manual refresh
  window.__ci360PollInterval = setInterval(fetchNotifications, 6000);
  window.addEventListener('focus', () => fetchNotifications(true));
  window.addEventListener('beforeunload', () => {
    if (window.__ci360PollInterval) {
      clearInterval(window.__ci360PollInterval);
      window.__ci360PollInterval = null;
    }
  });


  // Filter chips
  dropdown.querySelectorAll('.notif-filter-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      dropdown.querySelectorAll('.notif-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderList();
    };
  });

  const backdrop = document.getElementById('notifBackdrop');

  function openDropdown() {
    dropdown.style.display = 'flex';
    dropdown.classList.add('open');
    if (backdrop) {
      backdrop.style.display = 'block';
      backdrop.classList.add('open');
    }
    bellBtn.setAttribute('aria-expanded', 'true');
    checkPermissionUI();
    const userDropdown = document.getElementById('topbarUserDropdown');
    if (userDropdown) userDropdown.style.display = 'none';
    fetchNotifications();
  }

  function closeDropdown() {
    dropdown.style.display = 'none';
    dropdown.classList.remove('open');
    if (backdrop) {
      backdrop.style.display = 'none';
      backdrop.classList.remove('open');
    }
    bellBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    const isOpen = dropdown.classList.contains('open') || dropdown.style.display === 'flex' || dropdown.style.display === 'block';
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  window.ci360CloseNotifications = closeDropdown;

  const notifCloseBtn = document.getElementById('notifCloseBtn');
  if (notifCloseBtn) {
    notifCloseBtn.onclick = (e) => {
      e.stopPropagation();
      closeDropdown();
    };
  }

  if (backdrop) {
    backdrop.onclick = (e) => {
      e.stopPropagation();
      closeDropdown();
    };
  }

  bellBtn.onclick = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  if (markReadBtn) {
    markReadBtn.onclick = async (e) => {
      e.stopPropagation();
      try {
        await api('/notifications/read', { method: 'PATCH' });
        badge.style.display = 'none';
        if (unreadTxt) { unreadTxt.textContent = ''; unreadTxt.style.display = 'none'; }
        allNotifs.forEach(n => n.read = true);
        renderList();
        flashToast('All notifications marked as read');
      } catch (err) { flashToast(err.message, true); }
    };
  }

  if (window.__ci360NotifDocClickHandler) {
    document.removeEventListener('click', window.__ci360NotifDocClickHandler);
  }
  window.__ci360NotifDocClickHandler = (e) => {
    if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
      closeDropdown();
    }
  };
  document.addEventListener('click', window.__ci360NotifDocClickHandler);

  if (clearBtn) {
    clearBtn.onclick = async (e) => {
      e.stopPropagation();
      try {
        await apiDelete('/notifications');
        allNotifs = [];
        list.innerHTML = `<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>`;
        badge.style.display = 'none';
        if (unreadTxt) { unreadTxt.textContent = ''; unreadTxt.style.display = 'none'; }
        flashToast('Notifications cleared');
      } catch (err) { flashToast(err.message, true); }
    };
  }

  // Auto-open notification from URL parameter (?notifId=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const targetNotifId = urlParams.get('notifId');
    if (targetNotifId) {
      apiGet('/notifications').then(data => {
        const notifs = data.notifications || [];
        const match = notifs.find(n => String(n._id) === String(targetNotifId));
        if (match) {
          openNotificationModal(match);
          const cleanUrl = window.location.pathname + window.location.hash;
          window.history.replaceState(null, '', cleanUrl);
        }
      }).catch(() => { });
    }
  } catch (e) { }
}

/* ── SIDEBAR NAVIGATION CONFIGURATION ────────────────────────── */
export const DEFAULT_SIDEBAR_CONFIG = {
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: '📊', visible: true, category: 'Core' },
    { key: 'dailytasks', label: 'Daily Planner', icon: '📅', visible: true, category: 'Productivity' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'billing_dashboard', label: 'Accounts & Billing', icon: '💳', href: '/accounts', visible: true, category: 'Finance' },
    { key: 'proposals', label: 'Proposal Studio', icon: '📜', visible: true, category: 'Sales' },
    { key: 'teambonding', label: 'Team Chat & Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'jobs', label: 'All Jobs', icon: '📁', visible: true, category: 'Operations' },
    { key: 'byclient', label: 'By Client', icon: '💼', visible: true, category: 'Analytics' },
    { key: 'byperson', label: 'By Person', icon: '👥', visible: true, category: 'Analytics' },
    { key: 'accounts', label: 'Client Roster', icon: '🏢', visible: true, category: 'Directory' },
    { key: 'targets', label: 'Targets', icon: '🎯', visible: true, category: 'Management' },
    { key: 'salaries', label: 'Salaries', icon: '💰', visible: true, superadminOnly: true, category: 'Finance' },
    { key: 'users', label: 'Users', icon: '👤', visible: true, superadminOnly: true, category: 'System' },
    { key: 'manage', label: 'Settings & Manage', icon: '⚙️', visible: true, locked: true, category: 'System' }
  ],
  employee: [
    { key: 'dashboard', label: 'Overview Dashboard', icon: '📊', visible: true, category: 'Core' },
    { key: 'myjobs', label: 'My Jobs', icon: '📋', visible: true, category: 'Operations' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'jobs', label: 'All Jobs', icon: '📁', visible: true, category: 'Operations' },
    { key: 'dailytasks', label: 'Daily Planner', icon: '📅', visible: true, category: 'Productivity' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'billing_dashboard', label: 'Accounts & Billing', icon: '💳', href: '/accounts', visible: true, category: 'Finance' },
    { key: 'proposals', label: 'Proposal Studio', icon: '📜', visible: true, category: 'Sales' },
    { key: 'teambonding', label: 'Team Chat & Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'byclient', label: 'By Client', icon: '💼', visible: true, category: 'Analytics' },
    { key: 'byperson', label: 'By Person', icon: '👥', visible: true, category: 'Analytics' },
    { key: 'accounts', label: 'Client Roster', icon: '🏢', visible: true, category: 'Directory' },
    { key: 'targets', label: 'Targets', icon: '🎯', visible: true, category: 'Productivity' },
    { key: 'salaries', label: 'Salaries', icon: '💰', visible: true, superadminOnly: true, category: 'Finance' },
    { key: 'users', label: 'Users', icon: '👤', visible: true, superadminOnly: true, category: 'System' },
    { key: 'manage', label: 'Settings & Manage', icon: '⚙️', visible: true, category: 'System' },
    { key: 'settings', label: 'Settings', icon: '⚙️', visible: true, category: 'System' }
  ],
  accounts: [
    { key: 'overview', label: 'Overview', icon: '📊', visible: true, category: 'Core' },
    { key: 'invoices', label: 'Invoices', icon: '📄', visible: true, category: 'Billing' },
    { key: 'payments', label: 'Payments', icon: '💵', visible: true, category: 'Billing' },
    { key: 'receivables', label: 'Pending & Receivables', icon: '⏳', visible: true, category: 'Billing' },
    { key: 'billing', label: 'Billing Profiles', icon: '📑', visible: true, category: 'Billing' },
    { key: 'tally', label: 'TallyPrime Silver', icon: '🏛️', visible: true, category: 'Integration' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'jobs', label: 'All Jobs', icon: '📁', visible: true, category: 'Operations' },
    { key: 'proposals', label: 'Proposal Studio', icon: '📜', visible: true, category: 'Sales' },
    { key: 'teambonding', label: 'Team Chat & Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'settings', label: 'Settings', icon: '⚙️', visible: true, category: 'System' }
  ],
  client: [
    { key: 'dashboard', label: 'Overview Dashboard', icon: '📊', visible: true, category: 'Core' },
    { key: 'jobs', label: 'All Jobs Logged', icon: '📋', visible: true, category: 'Operations' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'delivered', label: 'Work Delivered', icon: '📦', visible: true, category: 'Deliverables' },
    { key: 'proposals', label: 'Proposals & Scope', icon: '📜', visible: true, category: 'Contracts' },
    { key: 'billing', label: 'Billing & Invoices', icon: '💳', visible: true, category: 'Finance' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'team', label: 'Our Team', icon: '👥', visible: true, category: 'Personnel' },
    { key: 'teambonding', label: 'Team Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'settings', label: 'Settings', icon: '⚙️', visible: true, category: 'System' }
  ]
};

export function getCachedSidebarNavConfig() {
  try {
    const cached = localStorage.getItem('ci360_nav_config');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {}
  return DEFAULT_SIDEBAR_CONFIG;
}

export async function fetchSidebarNavConfig() {
  try {
    const res = await apiGet('/settings/navigation');
    if (res && res.config) {
      localStorage.setItem('ci360_nav_config', JSON.stringify(res.config));
      return res.config;
    }
  } catch (e) {}
  return getCachedSidebarNavConfig();
}

export async function saveSidebarNavConfig(config) {
  const res = await apiPut('/settings/navigation', { config });
  if (res && res.config) {
    localStorage.setItem('ci360_nav_config', JSON.stringify(res.config));
  }
  return res;
}

export async function resetSidebarNavConfig() {
  const res = await apiPost('/settings/navigation/reset', {});
  if (res && res.config) {
    localStorage.setItem('ci360_nav_config', JSON.stringify(res.config));
  }
  return res;
}

export async function saveUserModulePermissions(userId, customModules) {
  let res;
  try {
    res = await apiPut(`/users/${userId}/modules`, { customModules });
  } catch (err) {
    res = await apiPut(`/users/${userId}`, { customModules });
  }
  const currentUser = getUser();
  if (currentUser && (currentUser.id === userId || currentUser._id === userId)) {
    currentUser.customModules = customModules;
    setSession(getToken(), currentUser);
  }
  return res;
}

export function filterTabsForDashboard(dashboardRole, tabs, isSuperadmin = false, targetUser = null) {
  if (!Array.isArray(tabs)) return [];
  const u = targetUser || getUser();
  const config = getCachedSidebarNavConfig();
  const dashConfig = config[dashboardRole] || DEFAULT_SIDEBAR_CONFIG[dashboardRole] || [];
  const hiddenKeys = new Set(
    dashConfig
      .filter(item => item.visible === false)
      .map(item => item.key)
  );

  const userOverrides = (u && u.customModules && typeof u.customModules === 'object') ? u.customModules : null;

  return tabs.filter(t => {
    // Locked items are always visible
    if (t.locked || (dashboardRole === 'admin' && t.key === 'manage')) return true;

    // Per-person custom override takes highest precedence!
    if (userOverrides && userOverrides[t.key] !== undefined) {
      return !!userOverrides[t.key];
    }

    // Baseline restrictions for non-superadmin only if not explicitly enabled in dashboard config
    if (!isSuperadmin && (t.key === 'salaries' || t.key === 'users')) {
      const cfgItem = dashConfig.find(item => item.key === t.key);
      if (!cfgItem || cfgItem.visible === false) return false;
    }

    // Fall back to dashboard default visibility
    if (hiddenKeys.has(t.key)) return false;

    return true;
  });
}

/* ── APP SHELL ───────────────────────────────────────────────── */
export function renderAppShell({ user, currentRole, activeTab, tabs, title, subtitle }) {
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'U';
  const roleBadge = user && (user.role === 'superadmin' || user.role === 'admin')
    ? 'Admin'
    : user && user.role === 'accounts'
      ? 'Accounts'
      : user && user.role === 'employee'
        ? 'Employee'
        : user && user.role === 'client'
          ? 'Client'
          : (user && user.role ? user.role.toUpperCase() : 'User');
  const userName = user && user.name ? user.name : 'User';
  const userEmail = user && user.email ? user.email : (user && user.username ? user.username : '');

  const isSuperadmin = user && user.role === 'superadmin';
  const dashKey = (currentRole === 'superadmin' || currentRole === 'admin') ? 'admin' : currentRole;
  const effectiveTabs = filterTabsForDashboard(dashKey, tabs || [], isSuperadmin, user);
  const hasLogJobTab = effectiveTabs && effectiveTabs.some(t => t.key === 'logjob');
  const activeTabObj = (effectiveTabs && effectiveTabs.find(t => t.key === activeTab)) || (tabs && tabs.find(t => t.key === activeTab));
  const pageTitle = title || (activeTabObj && activeTabObj.label) || 'Dashboard';

  // Mobile Bottom Navigation Mapping
  let mobileNavItems = [];
  if (currentRole === 'accounts') {
    mobileNavItems = [
      {
        key: 'overview',
        label: 'Overview',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
        active: activeTab === 'overview'
      },
      {
        key: 'invoices',
        label: 'Invoices',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
        active: activeTab === 'invoices'
      },
      {
        key: 'payments',
        label: 'Payments',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
        active: activeTab === 'payments'
      },
      {
        key: 'receivables',
        label: 'Pending',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        active: activeTab === 'receivables'
      },
      {
        key: '__more__',
        label: 'More',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>`,
        active: !['overview', 'invoices', 'payments', 'receivables'].includes(activeTab),
        isMore: true
      }
    ];
  } else if (currentRole === 'superadmin' || currentRole === 'admin') {
    mobileNavItems = [
      {
        key: 'dashboard',
        label: 'Dashboard',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
        active: activeTab === 'dashboard'
      },
      {
        key: 'dailytasks',
        label: 'Planner',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        active: activeTab === 'dailytasks'
      },
      {
        key: 'logjob',
        label: 'Jobs',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
        active: activeTab === 'logjob'
      },
      {
        key: 'byclient',
        label: 'Clients',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        active: activeTab === 'byclient'
      },
      {
        key: '__more__',
        label: 'More',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>`,
        active: !['dashboard', 'dailytasks', 'logjob', 'byclient'].includes(activeTab),
        isMore: true
      }
    ];
  } else if (currentRole === 'employee') {
    mobileNavItems = [
      {
        key: 'myjobs',
        label: 'Jobs',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        active: activeTab === 'myjobs'
      },
      {
        key: 'dailytasks',
        label: 'Planner',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        active: activeTab === 'dailytasks'
      },
      {
        key: 'proposals',
        label: 'Proposals',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
        active: activeTab === 'proposals'
      },
      {
        key: 'targets',
        label: 'Targets',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        active: activeTab === 'targets'
      },
      {
        key: '__more__',
        label: 'More',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>`,
        active: !['myjobs', 'dailytasks', 'proposals', 'targets'].includes(activeTab),
        isMore: true
      }
    ];
  } else {
    // client or generic
    mobileNavItems = [
      {
        key: 'logjob',
        label: 'Log Job',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
        active: activeTab === 'logjob'
      },
      {
        key: 'jobs',
        label: 'All Jobs',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
        active: activeTab === 'jobs'
      },
      {
        key: 'delivered',
        label: 'Delivered',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        active: activeTab === 'delivered'
      },
      {
        key: 'team',
        label: 'Team',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        active: activeTab === 'team'
      },
      {
        key: '__more__',
        label: 'More',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>`,
        active: !['logjob', 'jobs', 'delivered', 'team'].includes(activeTab),
        isMore: true
      }
    ];
  }

  // Filter mobile bottom nav items if customizer hid corresponding tabs
  if (mobileNavItems && mobileNavItems.length) {
    const config = getCachedSidebarNavConfig();
    const dashItems = config[dashKey] || DEFAULT_SIDEBAR_CONFIG[dashKey] || [];
    const hiddenSet = new Set(dashItems.filter(i => i.visible === false).map(i => i.key));
    const userOverrides = (user && user.customModules && typeof user.customModules === 'object') ? user.customModules : null;

    mobileNavItems = mobileNavItems.filter(m => {
      if (m.isMore) return true;
      if (userOverrides && userOverrides[m.key] !== undefined) {
        return !!userOverrides[m.key];
      }
      return !hiddenSet.has(m.key);
    });
  }

  const isSidebarCollapsed = typeof localStorage !== 'undefined' && localStorage.getItem('ci360_sidebar_collapsed') === 'true';

  return `
    <div class="app-shell ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}">
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img">
          <div class="brand-info">
            <h1>CI360</h1>
            <div class="tag">Cognitio Innovo Private Limited</div>
          </div>
          <button type="button" class="sidebar-collapse-btn" id="sidebarCollapseBtn" title="Toggle Sidebar (Ctrl+B)" aria-label="Toggle sidebar">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
        <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
          ${effectiveTabs.map(t => t.href ? `
            <a href="${t.href}" class="sidebar-item ${activeTab === t.key ? 'active' : ''}" data-tab="${t.key}" aria-current="${activeTab === t.key ? 'page' : 'false'}" style="text-decoration:none;">
              <span class="icon">${t.icon || '📌'}</span>
              <span>${t.label}</span>
            </a>` : `
            <button type="button" class="sidebar-item ${activeTab === t.key ? 'active' : ''}" data-tab="${t.key}" aria-current="${activeTab === t.key ? 'page' : 'false'}">
              <span class="icon">${t.icon || '📌'}</span>
              <span>${t.label}</span>
            </button>`).join('')}
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">${initial}</div>
          <div class="user-details">
            <div class="name">${escapeHtml(user ? user.name : 'User')}</div>
            <div class="role">${escapeHtml(roleBadge)}</div>
          </div>
        </div>
      </aside>

      <main class="app-main" role="main">
        <header class="app-topbar">
          <!-- Left: Mobile Toggle & Mobile Brand & Breadcrumbs -->
          <div class="topbar-left">
            <button type="button" class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open navigation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>

            <!-- Mobile Brand Title (Same Logo as Desktop) -->
            <div class="mobile-brand-title">
              <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img mobile-brand-logo-img">
              <div class="mobile-brand-info">
                <span class="mobile-brand-text">CI360</span>
                <span class="mobile-brand-tag">Intelligence</span>
              </div>
            </div>

            <div class="topbar-breadcrumb-wrap">
              <h1 class="page-heading-title">${escapeHtml(pageTitle)}</h1>
            </div>
          </div>

          <!-- Center: Command Palette Trigger -->
          <div class="topbar-center">
            <button type="button" class="cmd-trigger" id="topbarCmdTrigger" aria-label="Search and command palette">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span class="cmd-trigger-text">Search commands, tabs…</span>
              <kbd class="cmd-kbd">⌘K</kbd>
            </button>
          </div>

          <!-- Right: Actions, Theme, Notifications & User Menu -->
          <div class="topbar-right">
            <!-- Mobile Calendar Button (Mockup Right Item 1) -->
            <button type="button" class="mobile-topbar-btn" id="mobileCalBtn" aria-label="Select Period" title="Select Period">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </button>

            <button type="button" class="cmd-trigger-mobile" id="topbarCmdTriggerMobile" title="Quick Search (⌘K)" aria-label="Quick Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

            ${hasLogJobTab ? `
            <button type="button" class="topbar-quick-btn" id="topbarQuickLogJobBtn" title="Log a new job">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Log Job</span>
            </button>` : ''}

            <div class="theme-toggle-wrap">
              <button class="theme-btn ${getTheme() === 'light' ? 'active' : ''}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${getTheme() === 'dark' ? 'active' : ''}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
            </div>

            <!-- Notification Bell (Mockup Right Item 2 with badge 3) -->
            ${renderNotificationBell()}

            <!-- User Menu Avatar (Mockup Right Item 3: Orange 'P' + Chevron) -->
            <div class="topbar-user-menu-wrap">
              <button type="button" class="topbar-user-btn" id="topbarUserBtn" aria-expanded="false" aria-haspopup="true" title="Account & settings">
                <div class="topbar-user-avatar">
                  <span>${initial}</span>
                  <span class="topbar-online-dot"></span>
                </div>
                <div class="topbar-user-meta">
                  <span class="topbar-user-name">${escapeHtml(userName)}</span>
                  <span class="topbar-user-role-badge">${escapeHtml(roleBadge)}</span>
                </div>
                <svg class="topbar-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <div class="topbar-user-dropdown" id="topbarUserDropdown" style="display:none" role="menu">
                <!-- Desktop Dropdown Items -->
                <div class="tud-desktop-only">
                  <div class="tud-header">
                    <div class="tud-avatar">${initial}</div>
                    <div class="tud-meta">
                      <div class="tud-name">${escapeHtml(userName)}</div>
                      ${userEmail ? `<div class="tud-email">${escapeHtml(userEmail)}</div>` : ''}
                      <span class="tud-role-chip">${escapeHtml(roleBadge)}</span>
                    </div>
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item" id="tudProfileSettingsBtn" role="menuitem">
                      <span class="tud-icon">⚙️</span>
                      <span class="tud-label">Account Settings</span>
                    </button>
                    <button type="button" class="tud-item" id="tudCmdBtn" role="menuitem">
                      <span class="tud-icon">⚡</span>
                      <span class="tud-label">Command Palette</span>
                      <kbd class="tud-kbd">⌘K</kbd>
                    </button>
                    <button type="button" class="tud-item" id="tudThemeToggleBtn" role="menuitem">
                      <span class="tud-icon">${getTheme() === 'dark' ? '☀️' : '🌙'}</span>
                      <span class="tud-label">Switch to ${getTheme() === 'dark' ? 'Light' : 'Dark'} Mode</span>
                    </button>
                    <div class="tud-item-static">
                      <span class="tud-icon">🛡️</span>
                      <span class="tud-label">Session: Verified</span>
                    </div>
                    ${user && user.role === 'superadmin' ? `
                    <button type="button" class="tud-item" id="tudSidebarConfigBtn" role="menuitem">
                      <span class="tud-icon">🧭</span>
                      <span class="tud-label">Customize Sidebars</span>
                    </button>` : ''}
                  </div>
                  <div class="tud-divider"></div>
                  <div class="tud-items">
                    <button type="button" class="tud-item danger" id="logoutBtn" role="menuitem">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      <span class="tud-label">Sign out</span>
                    </button>
                  </div>
                </div>

                <!-- Mobile Dropdown Popover matching User Mockup -->
                <div class="tud-mobile-only">
                  <div class="tud-mobile-list">
                    <button type="button" class="tud-mobile-item" id="tudMobileThemeBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px" id="tudMobileThemeIcon">${getTheme() === 'dark' ? '☀️' : '🌙'}</span>
                        <span id="tudMobileThemeText">${getTheme() === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileNotifsBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span>Notifications</span>
                      </div>
                      <div class="tmi-right">
                        <span class="tmi-badge" id="tudMobileNotifBadge">3</span>
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item" id="tudMobileSettingsBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span>Settings</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    ${user && user.role === 'superadmin' ? `
                    <button type="button" class="tud-mobile-item" id="tudMobileSidebarConfigBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px">🧭</span>
                        <span>Customize Sidebars</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>` : ''}

                    <button type="button" class="tud-mobile-item" id="tudMobileHelpBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>Help & Support</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    ${user && user.role === 'superadmin' ? `
                    <button type="button" class="tud-mobile-item" id="tudMobileSidebarConfigBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px">🧭</span>
                        <span>Customize Sidebars</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>` : ''}

                    <button type="button" class="tud-mobile-item danger" id="logoutBtnMobile" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    ${user && user.role === 'superadmin' ? `
                    <button type="button" class="tud-mobile-item" id="tudMobileSidebarConfigBtn" role="menuitem">
                      <div class="tmi-left">
                        <span style="font-size:16px">🧭</span>
                        <span>Customize Sidebars</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Global Command Palette Modal -->
        <div id="cmdPaletteBackdrop" class="cmd-backdrop" aria-hidden="true">
          <div class="cmd-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
            <div class="cmd-input-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="cmdSearchInput" placeholder="Type a command or jump to tab..." autocomplete="off" spellcheck="false">
              <kbd class="cmd-kbd" id="cmdCloseKbd">ESC</kbd>
            </div>
            <div class="cmd-results" id="cmdResultsList"></div>
            <div class="cmd-footer">
              <span class="cmd-footer-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span class="cmd-footer-hint"><kbd>↵</kbd> select</span>
              <span class="cmd-footer-hint"><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="app-content">
          <div id="content"></div>
        </div>

        <!-- Mobile Bottom Navigation Dock (Matching Mockup 5 Tabs) -->
        <nav class="mobile-bottom-nav" id="mobileBottomNav" aria-label="Mobile Navigation">
          ${mobileNavItems.map(item => `
            <button type="button" class="mbn-item ${item.active ? 'active' : ''}" data-tab="${item.key}" ${item.isMore ? 'id="mobileMoreBtn"' : ''}>
              <span class="mbn-icon">${item.iconSvg}</span>
              <span class="mbn-label">${escapeHtml(item.label)}</span>
              ${item.active ? `<span class="mbn-active-dot"></span>` : ''}
            </button>
          `).join('')}
        </nav>

        <!-- Mobile More Sheet Backdrop & Slide-up Drawer -->
        <div class="mobile-more-backdrop" id="mobileMoreBackdrop" aria-hidden="true">
          <div class="mobile-more-sheet" id="mobileMoreSheet" role="dialog" aria-modal="true" aria-label="All Navigation Items">
            <div class="mms-handle-wrap"><div class="mms-drag-handle"></div></div>
            <div class="mms-header">
              <div class="mms-brand">
                <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img mms-brand-logo-img">
                <div class="mms-brand-info">
                  <span class="mms-title">CI360</span>
                  <span class="mms-subtitle">Suite Navigation</span>
                </div>
              </div>
              <button type="button" class="mms-close-btn" id="mmsCloseBtn" aria-label="Close menu">✕</button>
            </div>
            <div class="mms-grid">
              ${tabs.map(t => t.href ? `
                <a href="${t.href}" class="mms-card ${activeTab === t.key ? 'active' : ''}" data-tab="${t.key}" style="text-decoration:none;">
                  <span class="mms-card-icon">${t.icon || '📌'}</span>
                  <span class="mms-card-label">${escapeHtml(t.label)}</span>
                </a>` : `
                <button type="button" class="mms-card ${activeTab === t.key ? 'active' : ''}" data-tab="${t.key}">
                  <span class="mms-card-icon">${t.icon || '📌'}</span>
                  <span class="mms-card-label">${escapeHtml(t.label)}</span>
                </button>`).join('')}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${getTheme() === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
              </button>
              <button type="button" class="btn ghost small mms-action-btn" id="mmsNotifsBtn">
                <span>🔔 Notifications</span>
              </button>
              <button type="button" class="btn ghost small danger mms-action-btn" id="mmsLogoutBtn">
                <span>🚪 Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>`;
}

export function bindAppShellEvents(onTabChange) {
  // Mobile nav (sidebar)
  const mobileToggle = document.getElementById('mobileNavToggle');
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  if (mobileToggle) mobileToggle.onclick = openSidebar;
  if (overlay) overlay.onclick = closeSidebar;

  // Desktop sidebar collapse toggle
  const shell = document.querySelector('.app-shell');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');

  function toggleSidebarCollapse() {
    if (!shell) return;
    shell.classList.toggle('sidebar-collapsed');
    const isCollapsed = shell.classList.contains('sidebar-collapsed');
    if (sidebarCollapseBtn) {
      sidebarCollapseBtn.title = isCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)';
      sidebarCollapseBtn.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
    }
    try {
      localStorage.setItem('ci360_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    } catch (e) { }
  }

  if (sidebarCollapseBtn) {
    const isCollapsed = shell?.classList.contains('sidebar-collapsed');
    if (isCollapsed) {
      sidebarCollapseBtn.title = 'Expand Sidebar (Ctrl+B)';
      sidebarCollapseBtn.setAttribute('aria-label', 'Expand sidebar');
    }
    sidebarCollapseBtn.onclick = (e) => {
      e.stopPropagation();
      toggleSidebarCollapse();
    };
  }

  const sidebarBrand = document.querySelector('.sidebar-brand');
  if (sidebarBrand) {
    sidebarBrand.onclick = (e) => {
      if (document.querySelector('.app-shell.sidebar-collapsed')) {
        toggleSidebarCollapse();
      }
    };
  }

  const desktopSidebarToggle = document.getElementById('desktopSidebarToggle');
  if (desktopSidebarToggle) desktopSidebarToggle.onclick = toggleSidebarCollapse;

  if (!window.__ci360SidebarKeyBound) {
    window.__ci360SidebarKeyBound = true;
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable)) return;
        e.preventDefault();
        toggleSidebarCollapse();
      }
    });
  }

  // Mobile More Sheet Drawer
  const moreBackdrop = document.getElementById('mobileMoreBackdrop');
  const moreSheet = document.getElementById('mobileMoreSheet');
  const moreCloseBtn = document.getElementById('mmsCloseBtn');
  const mobileMoreBtn = document.getElementById('mobileMoreBtn');

  function openMoreSheet() {
    if (moreBackdrop) moreBackdrop.classList.add('active');
    if (moreSheet) moreSheet.classList.add('active');
  }
  function closeMoreSheet() {
    if (moreBackdrop) moreBackdrop.classList.remove('active');
    if (moreSheet) moreSheet.classList.remove('active');
  }

  if (mobileMoreBtn) mobileMoreBtn.onclick = (e) => { e.stopPropagation(); openMoreSheet(); };
  if (moreCloseBtn) moreCloseBtn.onclick = closeMoreSheet;
  if (moreBackdrop) moreBackdrop.onclick = (e) => { if (e.target === moreBackdrop) closeMoreSheet(); };

  // Bottom Navigation Bar items
  document.querySelectorAll('.mbn-item').forEach(btn => {
    if (btn.dataset.tab && btn.dataset.tab !== '__more__') {
      btn.onclick = () => {
        closeMoreSheet();
        if (onTabChange) onTabChange(btn.dataset.tab);
      };
    }
  });

  // Mobile More Sheet tab cards
  document.querySelectorAll('.mms-card').forEach(card => {
    card.onclick = () => {
      closeMoreSheet();
      if (card.tagName === 'A') return;
      if (onTabChange) onTabChange(card.dataset.tab);
    };
  });

  // Mobile More Sheet quick actions
  const mmsThemeBtn = document.getElementById('mmsToggleThemeBtn');
  if (mmsThemeBtn) {
    mmsThemeBtn.onclick = () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };
  }
  const mmsNotifsBtn = document.getElementById('mmsNotifsBtn');
  if (mmsNotifsBtn) {
    mmsNotifsBtn.onclick = () => {
      closeMoreSheet();
      const bell = document.getElementById('notifBellBtn');
      if (bell) bell.click();
    };
  }
  const mmsLogoutBtn = document.getElementById('mmsLogoutBtn');
  if (mmsLogoutBtn) mmsLogoutBtn.onclick = logout;

  // Mobile Calendar Button in Header
  const mobileCalBtn = document.getElementById('mobileCalBtn');
  if (mobileCalBtn) {
    mobileCalBtn.onclick = () => {
      const periodRow = document.querySelector('.period-row');
      if (periodRow) {
        periodRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        periodRow.classList.add('pulse-highlight');
        setTimeout(() => periodRow.classList.remove('pulse-highlight'), 1200);
      }
    };
  }

  // Mobile User Popover Actions
  const tudMobileThemeBtn = document.getElementById('tudMobileThemeBtn');
  if (tudMobileThemeBtn) {
    tudMobileThemeBtn.onclick = (e) => {
      e.stopPropagation();
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };
  }

  const tudMobileNotifsBtn = document.getElementById('tudMobileNotifsBtn');
  if (tudMobileNotifsBtn) {
    tudMobileNotifsBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if (userDropdown) userDropdown.style.display = 'none';
      const bell = document.getElementById('notifBellBtn');
      if (bell) bell.click();
    };
  }

  const tudMobileSettingsBtn = document.getElementById('tudMobileSettingsBtn');
  if (tudMobileSettingsBtn) {
    tudMobileSettingsBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if (userDropdown) userDropdown.style.display = 'none';
      const settingsTab = document.querySelector('[data-tab="settings"], [data-tab="manage"]');
      if (settingsTab && onTabChange) {
        onTabChange(settingsTab.dataset.tab);
      } else {
        openAccountSettingsModal();
      }
    };
  }

  const tudProfileSettingsBtn = document.getElementById('tudProfileSettingsBtn');
  if (tudProfileSettingsBtn) {
    tudProfileSettingsBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if (userDropdown) userDropdown.style.display = 'none';
      const settingsTab = document.querySelector('[data-tab="settings"], [data-tab="manage"]');
      if (settingsTab && onTabChange) {
        onTabChange(settingsTab.dataset.tab);
      } else {
        openAccountSettingsModal();
      }
    };
  }

  const tudSidebarConfigBtn = document.getElementById('tudSidebarConfigBtn');
  if (tudSidebarConfigBtn) {
    tudSidebarConfigBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if (userDropdown) userDropdown.style.display = 'none';
      if (typeof window.ci360NavTab === 'function') {
        window.ci360NavTab('manage', { section: 'sidebar-customizer' });
      } else {
        window.location.href = '/admin?tab=manage&section=sidebar-customizer';
      }
    };
  }

  const tudMobileSidebarConfigBtn = document.getElementById('tudMobileSidebarConfigBtn');
  if (tudMobileSidebarConfigBtn) {
    tudMobileSidebarConfigBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if (userDropdown) userDropdown.style.display = 'none';
      if (typeof window.ci360NavTab === 'function') {
        window.ci360NavTab('manage', { section: 'sidebar-customizer' });
      } else {
        window.location.href = '/admin?tab=manage&section=sidebar-customizer';
      }
    };
  }

  const tudMobileHelpBtn = document.getElementById('tudMobileHelpBtn');
  if (tudMobileHelpBtn) {
    tudMobileHelpBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if (userDropdown) userDropdown.style.display = 'none';
      openModal(`
        <div style="padding:24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">💬</div>
          <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
          <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
            For immediate technical assistance, client onboarding, or workspace inquiries, reach out to your system administrator or support team.
          </p>
          <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
        </div>
      `);
    };
  }

  const logoutBtnMobile = document.getElementById('logoutBtnMobile');
  if (logoutBtnMobile) logoutBtnMobile.onclick = logout;

  // User Dropdown Menu
  const userBtn = document.getElementById('topbarUserBtn');
  const userDropdown = document.getElementById('topbarUserDropdown');
  if (userBtn && userDropdown) {
    userBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = userDropdown.style.display !== 'none';
      userDropdown.style.display = isOpen ? 'none' : 'block';
      userBtn.setAttribute('aria-expanded', String(!isOpen));
      if (typeof window.ci360CloseNotifications === 'function') {
        window.ci360CloseNotifications();
      }
    };

    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
        userDropdown.style.display = 'none';
        userBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // User Dropdown Theme Toggle Button
  const tudThemeBtn = document.getElementById('tudThemeToggleBtn');
  if (tudThemeBtn) {
    tudThemeBtn.onclick = () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };
  }

  // Topbar Quick Action (+ Log Job)
  const quickLogJobBtn = document.getElementById('topbarQuickLogJobBtn');
  if (quickLogJobBtn) {
    quickLogJobBtn.onclick = () => {
      if (onTabChange) onTabChange('logjob');
    };
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.onclick = logout;

  // Init notifications
  initNotificationBell();
  checkAndShowGlobalNotifBanner();

  // Tab navigation
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.onclick = () => {
      closeSidebar();
      if (btn.tagName === 'A') return;
      if (onTabChange) onTabChange(btn.dataset.tab);
    };
  });

  // Command Palette Initialization
  initCommandPalette(onTabChange);
}

function initCommandPalette(onTabChange) {
  const backdrop = document.getElementById('cmdPaletteBackdrop');
  const input = document.getElementById('cmdSearchInput');
  const results = document.getElementById('cmdResultsList');
  const triggerDesktop = document.getElementById('topbarCmdTrigger');
  const triggerMobile = document.getElementById('topbarCmdTriggerMobile');
  const tudCmdBtn = document.getElementById('tudCmdBtn');
  const closeKbd = document.getElementById('cmdCloseKbd');

  if (!backdrop || !input || !results) return;

  // Gather navigation items from sidebar
  const sidebarItems = Array.from(document.querySelectorAll('.sidebar-item'));
  const commands = sidebarItems.map(item => ({
    type: 'tab',
    id: item.dataset.tab,
    label: item.querySelector('span:last-child')?.textContent || item.dataset.tab,
    icon: item.querySelector('.icon')?.textContent || '📌',
    sub: 'Navigate to section',
    action: () => {
      if (onTabChange) onTabChange(item.dataset.tab);
    }
  }));

  // Quick Action: Log Job if available
  const hasLogJob = sidebarItems.some(i => i.dataset.tab === 'logjob');
  if (hasLogJob) {
    commands.unshift({
      type: 'action',
      id: 'quick-logjob',
      label: 'Log a New Job',
      icon: '➕',
      sub: 'Create & submit work delivery',
      action: () => {
        if (onTabChange) onTabChange('logjob');
      }
    });
  }

  // System Actions
  commands.push({
    type: 'action',
    id: 'toggle-theme',
    label: getTheme() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    icon: '🌓',
    sub: 'Change interface appearance',
    action: () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    }
  });

  commands.push({
    type: 'action',
    id: 'notifs',
    label: 'View Notifications',
    icon: '🔔',
    sub: 'Pending alerts and notices',
    action: () => {
      const bell = document.getElementById('notifBellBtn');
      if (bell) bell.click();
    }
  });

  commands.push({
    type: 'action',
    id: 'account-settings',
    label: 'Account Settings & Credentials',
    icon: '⚙️',
    sub: 'Update username, email, and password',
    action: () => {
      openAccountSettingsModal();
    }
  });

  commands.push({
    type: 'action',
    id: 'logout',
    label: 'Sign out of CI360',
    icon: '🚪',
    sub: 'End current authenticated session',
    action: () => logout()
  });

  let selectedIndex = 0;
  let filtered = [...commands];

  function renderList() {
    if (!filtered.length) {
      results.innerHTML = `<div class="cmd-result" style="color:var(--text-4);cursor:default;justify-content:center;padding:24px 14px;">No matching tabs or commands found</div>`;
      return;
    }
    results.innerHTML = filtered.map((cmd, idx) => `
      <div class="cmd-result ${idx === selectedIndex ? 'selected' : ''}" data-idx="${idx}">
        <div class="cmd-result-icon">${cmd.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;line-height:1.2">${escapeHtml(cmd.label)}</div>
          <div style="font-size:11px;color:var(--text-4);font-weight:500">${escapeHtml(cmd.sub)}</div>
        </div>
        <kbd class="cmd-kbd" style="font-size:9.5px">↵</kbd>
      </div>
    `).join('');

    results.querySelectorAll('.cmd-result').forEach(el => {
      el.onmouseenter = () => {
        selectedIndex = Number(el.dataset.idx);
        updateSelection();
      };
      el.onclick = () => {
        execute(Number(el.dataset.idx));
      };
    });
  }

  function updateSelection() {
    results.querySelectorAll('.cmd-result').forEach((el, idx) => {
      el.classList.toggle('selected', idx === selectedIndex);
    });
  }

  function execute(idx) {
    const cmd = filtered[idx];
    if (cmd && cmd.action) {
      closePalette();
      cmd.action();
    }
  }

  function openPalette() {
    const userDropdown = document.getElementById('topbarUserDropdown');
    if (userDropdown) userDropdown.style.display = 'none';
    backdrop.classList.add('open');
    input.value = '';
    filtered = [...commands];
    selectedIndex = 0;
    renderList();
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    backdrop.classList.remove('open');
    input.blur();
  }

  if (triggerDesktop) triggerDesktop.onclick = openPalette;
  if (triggerMobile) triggerMobile.onclick = openPalette;
  if (tudCmdBtn) tudCmdBtn.onclick = () => {
    const userDropdown = document.getElementById('topbarUserDropdown');
    if (userDropdown) userDropdown.style.display = 'none';
    openPalette();
  };
  if (closeKbd) closeKbd.onclick = closePalette;

  backdrop.onclick = (e) => {
    if (e.target === backdrop) closePalette();
  };

  input.oninput = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      filtered = [...commands];
    } else {
      filtered = commands.filter(c =>
        c.label.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q)
      );
    }
    selectedIndex = 0;
    renderList();
  };

  input.onkeydown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) {
        selectedIndex = (selectedIndex + 1) % filtered.length;
        updateSelection();
        const sel = results.querySelector('.cmd-result.selected');
        if (sel) sel.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) {
        selectedIndex = (selectedIndex - 1 + filtered.length) % filtered.length;
        updateSelection();
        const sel = results.querySelector('.cmd-result.selected');
        if (sel) sel.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(selectedIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  };

  // Keyboard shortcut listener
  const keyHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closePalette();
    }
  };
  if (window.__ci360CmdKeyHandler) {
    window.removeEventListener('keydown', window.__ci360CmdKeyHandler);
  }
  window.__ci360CmdKeyHandler = keyHandler;
  window.addEventListener('keydown', keyHandler);
}

/* ── SKELETON LOADERS ────────────────────────────────────────── */
export function renderSkeletonCards(count = 4) {
  return `
    <div class="grid grid-${Math.min(count, 4)}" style="margin-bottom:24px">
      ${Array(count).fill(0).map(() => `
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join('')}
    </div>`;
}

/* ── EMPTY STATE ─────────────────────────────────────────────── */
export function renderEmptyState(title, subtitle, icon = '📁', actionBtn = '') {
  return `
    <div class="empty">
      <span class="empty-icon">${icon}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(subtitle)}</p>
      ${actionBtn}
    </div>`;
}

/* ── KPI CARD ────────────────────────────────────────────────── */
export function renderKpiCard(title, value, subtext = '', icon = '📊', trend = '') {
  let trendHtml = '';
  if (trend) {
    const isUp = trend.startsWith('+') || trend.includes('↑') || trend.toLowerCase().includes('up');
    trendHtml = `<span class="kpi-trend ${isUp ? 'up' : 'down'}">${escapeHtml(trend)}</span>`;
  }
  return `
    <div class="card kpi">
      <div class="kpi-header">
        <span class="kpi-label">${escapeHtml(title)}</span>
        <div class="kpi-icon">${icon}</div>
      </div>
      <div class="kpi-value">${escapeHtml(value)}</div>
      <div class="kpi-sub">${trendHtml}<span>${escapeHtml(subtext)}</span></div>
    </div>`;
}

export function renderBadge(text, type = 'gray') {
  return `<span class="badge ${type}">${escapeHtml(text)}</span>`;
}

export function renderProgressBar(pct, type = 'indigo') {
  const percent = Math.min(100, Math.max(0, Number(pct) || 0));
  return `
    <div class="progress-bar-wrap" title="${percent.toFixed(0)}%">
      <div class="progress-bar-fill ${type}" style="width:${percent}%"></div>
    </div>`;
}

/* ── PERIOD PICKER & DROPDOWN ────────────────────────────────── */
export function renderPeriodPicker(currentPeriod) {
  const periods = [['all', 'All Time'], ['today', 'Today'], ['week', 'This Week'], ['month', 'This Month'], ['quarter', 'This Quarter']];
  return `<div class="period-row">${periods.map(([k, l]) => `<button class="pchip ${currentPeriod === k ? 'active' : ''}" data-period="${k}">${l}</button>`).join('')}</div>`;
}

export function renderPeriodDropdown(currentPeriod, selectId = 'dashPeriodSelect') {
  const periods = [
    ['all', 'All Time'],
    ['today', 'Today'],
    ['week', 'Weekly'],
    ['month', 'Monthly'],
    ['quarter', 'Quarterly']
  ];
  return `
    <div class="period-dropdown-wrap" style="display:inline-flex;align-items:center;gap:8px;">
      <div style="position:relative;display:inline-block;">
        <select id="${selectId}" class="input period-select-dropdown" style="padding:7px 32px 7px 14px;font-size:13px;font-weight:700;border-radius:var(--r-md);min-width:150px;background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);cursor:pointer;appearance:none;-webkit-appearance:none;box-shadow:var(--shadow-xs);">
          ${periods.map(([k, l]) => `<option value="${k}" ${currentPeriod === k ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
        <span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--text-3);font-size:10px;">▼</span>
      </div>
    </div>
  `;
}

export function getTimeGreeting(name) {
  const hr = new Date().getHours();
  let greet = 'Good Evening';
  if (hr >= 5 && hr < 12) {
    greet = 'Good Morning';
  } else if (hr >= 12 && hr < 17) {
    greet = 'Good Afternoon';
  }
  const cleanName = (name || '').trim();
  return cleanName ? `${greet}, ${cleanName} 👋` : `${greet} 👋`;
}

/* ── SUPPORT TICKET HELPERS ──────────────────────────────────── */

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── FILE ATTACHMENTS & UPLOADER UTILITIES ──────────────────── */
export function fmtFileSize(bytes) {
  bytes = Number(bytes) || 0;
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + (sizes[i] || 'GB');
}
export const formatFileSize = fmtFileSize;


export function resolveFileUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) return url;
  if (API_BASE && /^https?:\/\//i.test(API_BASE)) {
    try {
      const origin = new URL(API_BASE).origin;
      return origin + (url.startsWith('/') ? url : '/' + url);
    } catch (e) { }
  }
  return url;
}

export function getFileCategory(name = '', type = '') {
  const ext = (name.split('.').pop() || '').toLowerCase();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'tif', 'heic', 'heif'].includes(ext) || type.startsWith('image/')) return { icon: '🖼️', cls: 'img', label: 'Image' };
  if (ext === 'pdf' || type === 'application/pdf') return { icon: '📄', cls: 'pdf', label: 'PDF Document' };
  if (['doc', 'docx', 'odt', 'txt', 'rtf'].includes(ext)) return { icon: '📝', cls: 'doc', label: 'Document' };
  if (['xls', 'xlsx', 'csv', 'ods', 'tsv'].includes(ext)) return { icon: '📊', cls: 'sheet', label: 'Spreadsheet' };
  if (['ppt', 'pptx', 'key'].includes(ext)) return { icon: '📑', cls: 'pres', label: 'Presentation' };
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)) return { icon: '📦', cls: 'zip', label: 'Archive' };
  if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v', '3gp', 'wmv', 'flv'].includes(ext) || type.startsWith('video/')) return { icon: '🎬', cls: 'video', label: 'Video' };
  if (['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'wma'].includes(ext) || type.startsWith('audio/')) return { icon: '🎵', cls: 'audio', label: 'Audio' };
  if (['psd', 'ai', 'eps', 'sketch', 'fig', 'xd', 'blend', 'obj', 'fbx', 'cdr'].includes(ext)) return { icon: '🎨', cls: 'design', label: 'Design & Creative' };
  if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'xml', 'py', 'sql', 'md', 'sh', 'php'].includes(ext)) return { icon: '💻', cls: 'code', label: 'Code File' };
  return { icon: '📎', cls: 'other', label: 'File' };
}

export function isImageAttachment(att) {
  if (!att) return false;
  const cat = getFileCategory(att.name || att.filename || '', att.type || '');
  return cat.cls === 'img';
}

export function openFilePreviewModal(att) {
  if (!att || !att.url) return;
  const cat = getFileCategory(att.name, att.type);
  const isImg = cat.cls === 'img';
  const isPdf = cat.cls === 'pdf';
  const fileName = escapeHtml(att.name || 'Attachment');
  const fileSize = fmtFileSize(att.size);

  let bodyHtml = '';
  if (isImg) {
    bodyHtml = `<img src="${att.url}" alt="${fileName}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${att.url}','_blank')">`;
  } else if (isPdf) {
    bodyHtml = `<iframe src="${att.url}" title="${fileName}"></iframe>`;
  } else if (cat.cls === 'video') {
    bodyHtml = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;width:100%;max-width:880px;">
        <video controls autoplay preload="metadata" style="max-height:70vh;width:100%;border-radius:8px;background:#000;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
          <source src="${att.url}" type="${att.type || 'video/mp4'}">
          Your browser does not support HTML5 video streaming.
        </video>
        <div style="margin-top:10px;font-size:12px;color:var(--text-3);display:flex;align-items:center;gap:12px;">
          <span>🎬 ${fileName}</span>
          <span>•</span>
          <span>${fileSize}</span>
        </div>
      </div>
    `;
  } else if (cat.cls === 'audio') {
    bodyHtml = `
      <div style="text-align:center;padding:32px 20px;max-width:480px;margin:0 auto">
        <div style="font-size:44px;margin-bottom:12px">🎵</div>
        <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${fileName}</div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:16px">${fileSize}</div>
        <audio controls autoplay style="width:100%;margin-bottom:16px;">
          <source src="${att.url}" type="${att.type || 'audio/mpeg'}">
          Your browser does not support audio playback.
        </audio>
        <div>
          <a href="${att.url}" download="${fileName}" target="_blank" class="btn gold small">Download Audio</a>
        </div>
      </div>
    `;
  } else {
    bodyHtml = `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:48px;margin-bottom:12px">${cat.icon}</div>
        <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${fileName}</div>
        <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${cat.label} · ${fileSize}</div>
        <a href="${att.url}" download="${fileName}" target="_blank" class="btn gold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Attachment
        </a>
      </div>
    `;
  }

  const modal = document.createElement('div');
  modal.className = 'preview-modal-overlay';
  modal.innerHTML = `
    <div class="preview-modal-card">
      <div class="preview-modal-header">
        <div class="preview-modal-title">
          <span>${cat.icon}</span>
          <span>${fileName}</span>
          <span style="font-size:11px;font-weight:500;color:var(--text-4)">(${fileSize})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${att.url}" download="${fileName}" target="_blank" class="btn ghost small" style="font-size:12px;padding:4px 10px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
          <button type="button" class="btn ghost small preview-modal-close" style="padding:4px 8px;font-size:14px">✕</button>
        </div>
      </div>
      <div class="preview-modal-body">
        ${bodyHtml}
      </div>
    </div>
  `;

  modal.onclick = (e) => {
    if (e.target === modal || e.target.closest('.preview-modal-close')) {
      modal.remove();
    }
  };
  document.body.appendChild(modal);
}

export function renderAttachmentChips(attachments = [], options = {}) {
  if (!attachments || !attachments.length) return '';
  const canDelete = !!options.canDelete;

  // Filter out any video deliverables to render dedicated playable inline video players
  const videos = attachments.filter(att => {
    if (!att || !att.url) return false;
    if (att.type === 'url' || /^https?:\/\//i.test(att.url || '')) return false;
    const cat = getFileCategory(att.name, att.type);
    return cat.cls === 'video' || (att.name && att.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)) || (att.type && att.type.startsWith('video/'));
  });

  return `
    <div class="attachment-chips-wrap" data-attachments="${encodeURIComponent(JSON.stringify(attachments))}">
      ${options.title ? `<div class="attachment-chips-header">📎 ${escapeHtml(options.title)} <span style="font-weight:500;color:var(--text-4)">(${attachments.length})</span></div>` : ''}
      <div class="attachment-chips-list">
        ${attachments.map((att, idx) => {
    const isUrl = att.type === 'url' || /^https?:\/\//i.test(att.url || '');
    const cat = isUrl ? { cls: 'file-type-doc', icon: '🌐', label: 'Live Link' } : getFileCategory(att.name, att.type);
    const name = escapeHtml(att.name || (isUrl ? 'Live Deliverable URL' : 'File'));
    const size = isUrl ? 'Live Link' : fmtFileSize(att.size);
    const isVid = cat.cls === 'video' || (att.name && att.name.match(/\.(mp4|mov|webm|mkv|avi)$/i));
    const fileUrl = resolveFileUrl(att.url);
    return `
            <div class="attachment-chip ${isVid ? 'is-video' : ''}" data-idx="${idx}" title="${name} (${size})">
              <span class="file-type-icon ${cat.cls}" style="width:22px;height:22px;font-size:12px">${cat.icon}</span>
              ${isUrl ? `
                <a href="${att.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-name" style="text-decoration:none;color:inherit;cursor:pointer" title="Open live URL in new tab">
                  ${name} <span style="font-size:11px;opacity:0.75">↗</span>
                </a>
              ` : `
                <span class="attachment-chip-name" onclick="window.__openPreview(${idx}, this)">
                  ${name}
                  ${isVid ? '<span class="badge blue" style="font-size:9.5px;padding:1px 4px;margin-left:5px">🎬 MP4 Video</span>' : ''}
                </span>
              `}
              <span class="attachment-chip-size">${size}</span>
              <div class="attachment-chip-actions">
                ${isUrl ? `
                  <a href="${att.url}" target="_blank" rel="noopener noreferrer" class="attachment-chip-btn" title="Open Live Link" onclick="event.stopPropagation()">🔗</a>
                ` : `
                  <button type="button" class="attachment-chip-btn" title="${isVid ? 'Play Video' : 'View Preview'}" onclick="window.__openPreview(${idx}, this)">${isVid ? '▶️' : '👁️'}</button>
                  <a href="${fileUrl}" download="${name}" target="_blank" class="attachment-chip-btn" title="Download File" onclick="event.stopPropagation()">⬇️</a>
                `}
                ${canDelete ? `<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${idx}, this)">✕</button>` : ''}
              </div>
            </div>
          `;
  }).join('')}
      </div>

      ${videos.length > 0 ? `
        <div class="attachment-videos-container" style="display:flex;flex-direction:column;gap:12px;margin-top:10px">
          ${videos.map((v) => {
    const vName = escapeHtml(v.name || 'Deliverable Video');
    const vSize = fmtFileSize(v.size);
    const vUrl = resolveFileUrl(v.url);
    return `
              <div class="attachment-video-card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:8px;padding:12px;overflow:hidden">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:6px">
                  <span style="font-size:12.5px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
                    <span style="font-size:16px">🎬</span>
                    <span>${vName}</span>
                    <span class="badge blue" style="font-size:10px;padding:2px 6px">${vSize}</span>
                  </span>
                  <a href="${vUrl}" download="${vName}" target="_blank" class="btn ghost small" style="font-size:11.5px;padding:3px 10px" onclick="event.stopPropagation()">
                    ⬇️ Download Video (${vSize})
                  </a>
                </div>
                <video controls preload="metadata" style="width:100%;max-height:380px;background:#000;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.4);" playsinline>
                  <source src="${vUrl}" type="${v.type || 'video/mp4'}">
                  Your browser does not support HTML5 video streaming.
                </video>
              </div>
            `;
  }).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// Global state container for file uploaders
const uploaderStores = {};

export function uploadSingleFileDirectly(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const token = (typeof getToken === 'function') ? getToken() : (localStorage.getItem('ci360_token') || '');
    const encodedName = encodeURIComponent(file.name || 'file.bin');
    const mimeType = file.type || 'application/octet-stream';
    const base = (API_BASE ? API_BASE.replace(/\/+$/, '') : '/api');
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
    const url = `${base}/upload/stream?name=${encodedName}&type=${encodeURIComponent(mimeType)}${tokenParam}`;

    xhr.open('POST', url, true);
    if (token) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('X-File-Name', encodedName);
    xhr.setRequestHeader('X-File-Type', mimeType);

    if (xhr.upload) {
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable && typeof onProgress === 'function') {
          const percent = Math.min(99, Math.round((evt.loaded / evt.total) * 100));
          onProgress(percent, evt.loaded, evt.total);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (typeof onProgress === 'function') onProgress(100, file.size, file.size);
          resolve(res.file || (res.files && res.files[0]));
        } catch (e) {
          reject(new Error('Failed to parse upload response'));
        }
      } else {
        try {
          const res = JSON.parse(xhr.responseText);
          reject(new Error(res.error || `Upload failed with HTTP ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with HTTP ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during file upload. Please check connection.'));
    xhr.ontimeout = () => reject(new Error('Upload timed out. File may be too heavy or connection slow.'));
    xhr.timeout = 3600000; // 60 min for heavy 1GB+ files
    xhr.send(file);
  });
}

// Parallel fast multi-file uploader (up to 3 parallel streams for instantaneous uploads)
export async function uploadMultipleFilesFast(fileList, onProgress) {
  const files = Array.from(fileList || []);
  if (!files.length) return [];

  const results = new Array(files.length);
  const progressMap = {};
  for (let i = 0; i < files.length; i++) progressMap[i] = 0;

  let activeIndex = 0;
  const concurrency = 3;

  async function worker() {
    while (activeIndex < files.length) {
      const idx = activeIndex++;
      const file = files[idx];

      try {
        const res = await uploadSingleFileDirectly(file, (percent, loaded, total) => {
          progressMap[idx] = percent;
          if (typeof onProgress === 'function') {
            const sum = Object.values(progressMap).reduce((a, b) => a + b, 0);
            const overall = Math.round(sum / files.length);
            onProgress(overall, loaded, total, file, idx, files.length);
          }
        });
        results[idx] = res;
      } catch (err) {
        console.warn('Fast upload error for', file.name, err);
        // Fallback for smaller files
        if (file.size < 10 * 1024 * 1024) {
          const fallback = await new Promise(res => {
            const reader = new FileReader();
            reader.onload = () => res({
              name: file.name,
              url: reader.result,
              size: file.size,
              type: file.type || 'application/octet-stream',
              uploadedAt: new Date()
            });
            reader.onerror = () => res(null);
            reader.readAsDataURL(file);
          });
          results[idx] = fallback;
        } else {
          throw err;
        }
      }
    }
  }

  const pool = [];
  for (let c = 0; c < Math.min(concurrency, files.length); c++) {
    pool.push(worker());
  }
  await Promise.all(pool);

  return results.filter(Boolean);
}

export async function uploadFilesToServer(fileList, onProgress) {
  return uploadMultipleFilesFast(fileList, onProgress);
}
export function renderAttachmentUploader({
  id = 'uploader',
  label = 'Attachments & Files',
  subtitle = 'Upload any file: MP4 videos (up to 1GB), images, PDFs, spreadsheets, design assets, or archives',
  multiple = true,
  accept = '',
  maxFiles = 30
} = {}) {
  const acceptAttr = accept ? `accept="${accept}"` : '';
  return `
    <div class="uploader-container" id="container-${id}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${escapeHtml(label)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${id}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${id}">
        <input type="file" id="input-${id}" ${multiple ? 'multiple' : ''} ${acceptAttr} style="display:none">
        <div class="uploader-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div class="uploader-title">Click to upload or drag &amp; drop files here</div>
        <div class="uploader-subtitle">${escapeHtml(subtitle)}</div>
        <button type="button" class="uploader-browse-btn" onclick="document.getElementById('input-${id}').click()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Browse Local Files
        </button>
      </div>
      <div class="uploader-file-list" id="list-${id}"></div>
    </div>
  `;
}

export function bindAttachmentUploader(id, options = {}) {
  const zone = document.getElementById('zone-' + id);
  const input = document.getElementById('input-' + id);
  const list = document.getElementById('list-' + id);
  const countEl = document.getElementById('count-' + id);

  uploaderStores[id] = options.existing ? [...options.existing] : [];

  function updateListUI() {
    const files = uploaderStores[id] || [];
    if (countEl) countEl.textContent = `${files.length} file${files.length === 1 ? '' : 's'} attached`;

    if (!list) return;
    if (!files.length) {
      list.innerHTML = '';
      return;
    }

    list.innerHTML = files.map((f, idx) => {
      const cat = getFileCategory(f.name, f.type);
      const name = escapeHtml(f.name || 'File');
      const size = fmtFileSize(f.size);
      const isVideo = cat.cls === 'video' || (f.name && f.name.match(/\.(mp4|mov|webm|mkv|avi)$/i)) || (f.type && f.type.startsWith('video/'));
      const fUrl = resolveFileUrl(f.url);
      return `
        <div class="uploader-file-item ${isVideo ? 'is-video' : ''}" style="display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:6px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div class="uploader-file-info" style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
              <span class="file-type-icon ${cat.cls}" style="width:24px;height:24px;font-size:13px">${cat.icon}</span>
              <div style="min-width:0;flex:1">
                <div class="uploader-file-name" title="${name}" style="font-size:12px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${name}
                  ${isVideo ? '<span class="badge blue" style="font-size:9.5px;padding:1px 5px;margin-left:6px">🎬 Video Deliverable</span>' : ''}
                </div>
                <div class="uploader-file-size" style="font-size:11px;color:var(--text-3)">${cat.label} · ${size}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${id}', ${idx})">Preview / Play</button>
              <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${id}', ${idx})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          ${isVideo && fUrl ? `
            <div style="margin-top:4px;border-radius:6px;overflow:hidden;background:#000;border:1px solid var(--border-sm)">
              <video controls preload="metadata" style="width:100%;max-height:240px;display:block;" playsinline>
                <source src="${fUrl}" type="${f.type || 'video/mp4'}">
                Your browser does not support HTML5 video streaming.
              </video>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    if (options.onChange) options.onChange(files);
  }

  // Handle uploading files with live visual progress bar
  async function handleFilesUpload(fileList) {
    const rawFiles = Array.from(fileList || []);
    if (!rawFiles.length) return;

    if (!list) return;

    for (let i = 0; i < rawFiles.length; i++) {
      const file = rawFiles[i];
      const tempId = `up-prog-${Date.now()}-${i}`;
      const fName = escapeHtml(file.name || 'video.mp4');
      const fSize = fmtFileSize(file.size);
      const isVid = file.type?.startsWith('video/') || file.name?.match(/\.(mp4|mov|webm|mkv|avi)$/i);

      // Render progress item card
      const progItem = document.createElement('div');
      progItem.id = tempId;
      progItem.className = 'uploader-progress-card';
      progItem.style.cssText = 'padding:10px 12px;background:var(--bg-elevated);border:1px solid var(--brand-500,#3b82f6);border-radius:6px;margin-bottom:8px;';
      progItem.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
            <span>${isVid ? '🎬' : '📎'}</span>
            <span style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fName}</span>
          </span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand-500,#3b82f6)" id="${tempId}-percent">0%</span>
        </div>
        <div style="background:rgba(255,255,255,0.12);height:7px;border-radius:4px;overflow:hidden;margin-bottom:6px">
          <div id="${tempId}-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #3b82f6, #06b6d4);transition:width 0.1s linear;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-3)">
          <span id="${tempId}-status">Uploading ${fSize}… please wait</span>
          <span id="${tempId}-bytes">0 MB / ${fSize}</span>
        </div>
      `;
      list.appendChild(progItem);

      try {
        const uploadedFile = await uploadSingleFileDirectly(file, (percent, loaded, total) => {
          const bar = document.getElementById(`${tempId}-bar`);
          const pct = document.getElementById(`${tempId}-percent`);
          const bytes = document.getElementById(`${tempId}-bytes`);
          if (bar) bar.style.width = `${percent}%`;
          if (pct) pct.textContent = `${percent}%`;
          if (bytes) bytes.textContent = `${fmtFileSize(loaded)} / ${fmtFileSize(total)}`;
        });

        progItem.remove();
        if (uploadedFile) {
          uploaderStores[id] = [...(uploaderStores[id] || []), uploadedFile];
          updateListUI();
        }
      } catch (err) {
        console.error('File upload failed:', err);
        const status = document.getElementById(`${tempId}-status`);
        if (status) {
          status.textContent = '❌ Upload failed: ' + (err.message || 'Network error');
          status.style.color = 'var(--red-500, #ef4444)';
        }
        flashToast('Upload failed for ' + file.name + ': ' + (err.message || 'Network error'), true);
      }
    }
    flashToast('File attached successfully! ✓');
  }

  window.__removeUploaderFile = (storeId, idx) => {
    if (uploaderStores[storeId]) {
      uploaderStores[storeId].splice(idx, 1);
      const updater = window[`__update_${storeId}`];
      if (updater) updater();
    }
  };

  window.__previewUploaderFile = (storeId, idx) => {
    const file = (uploaderStores[storeId] || [])[idx];
    if (file) openFilePreviewModal(file);
  };

  window[`__update_${id}`] = updateListUI;

  if (zone && input) {
    zone.onclick = (e) => {
      if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
        input.click();
      }
    };

    zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
    zone.ondragleave = () => zone.classList.remove('dragover');
    zone.ondrop = async (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        await handleFilesUpload(e.dataTransfer.files);
      }
    };

    input.onchange = async () => {
      const selectedFiles = Array.from(input.files || []);
      input.value = '';
      if (selectedFiles.length > 0) {
        await handleFilesUpload(selectedFiles);
      }
    };
  }

  updateListUI();
}
export function getUploaderAttachments(id) {
  return uploaderStores[id] || [];
}

export function setUploaderAttachments(id, files = []) {
  uploaderStores[id] = [...files];
  const updater = window[`__update_${id}`];
  if (updater) updater();
}

// Global preview & chip remove helpers
window.__openPreview = (idx, el) => {
  const container = el.closest('.attachment-chips-wrap') || el.closest('[data-attachments]');
  if (!container) return;
  const chip = el.closest('.attachment-chip');
  const chipIdx = chip ? Number(chip.dataset.idx) : idx;
  const jsonStr = container.dataset.attachments || container.parentElement?.dataset?.attachments;
  if (jsonStr) {
    try {
      const arr = JSON.parse(decodeURIComponent(jsonStr));
      if (arr[chipIdx]) openFilePreviewModal(arr[chipIdx]);
    } catch (e) { }
  }
};

/* ── SUPPORT TICKETS ENHANCED WITH ATTACHMENTS ──────────────── */
export function renderSupportTicketSection(jobId, isAdmin = false) {
  const safeid = jobId.replace(/[^a-z0-9]/gi, '');
  return `
    <div class="ticket-section" id="tksec-${safeid}">
      <div class="ticket-section-header">
        <div class="ticket-section-title">
          <span style="font-size:14px">🎫</span>
          <span>Support &amp; Feedback</span>
          <span class="ticket-count-pill" id="tkcnt-${safeid}">0</span>
        </div>
        <button type="button" class="btn ghost small ticket-toggle-btn" data-jobid="${jobId}" data-safeid="${safeid}">
          + Raise Ticket
        </button>
      </div>

      <div class="ticket-create-form" id="tkform-${safeid}">
        <div class="form-grid-2">
          <div class="field">
            <label>Subject / Issue *</label>
            <input type="text" id="tksub-${safeid}" placeholder="e.g. Revision required for Instagram Reel" />
          </div>
          <div class="field">
            <label>Priority</label>
            <select id="tkpri-${safeid}">
              <option value="Medium" selected>🟡 Medium</option>
              <option value="Low">🟢 Low</option>
              <option value="High">🟠 High</option>
              <option value="Urgent">🔴 Urgent</option>
            </select>
          </div>
        </div>
        <div class="field" style="margin-bottom:10px">
          <label>Detailed Description *</label>
          <textarea id="tkmsg-${safeid}" rows="3" placeholder="Provide full details, feedback, or blockers so the team can resolve it quickly…"></textarea>
        </div>
        ${renderAttachmentUploader({ id: 'tkup-' + safeid, label: 'Attach Screenshots or Reference Files', subtitle: 'Upload screenshots, mockups, briefs, or error logs' })}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn ghost small tk-cancel-btn" data-safeid="${safeid}">Cancel</button>
          <button type="button" class="btn gold small tk-submit-btn" data-jobid="${jobId}" data-safeid="${safeid}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      </div>

      <div class="ticket-list" id="tklist-${safeid}">
        <div style="font-size:12px;color:var(--text-4);padding:8px 0;display:flex;align-items:center;gap:6px">
          <span class="pulse-dot"></span> Loading tickets…
        </div>
      </div>
    </div>`;
}

const TICKET_STATUS_BADGE = { 'Open': 'red', 'In Review': 'amber', 'Resolved': 'green', 'Closed': 'gray' };
const TICKET_PRI_BADGE = { 'Low': 'green', 'Medium': 'gray', 'High': 'amber', 'Urgent': 'red' };

function ticketCardHtml(t, isAdmin) {
  const statusSlug = (t.status || 'Open').toLowerCase().replace(' ', '-');
  const isOpen = t.status === 'Open';
  const shortId = (t._id || '').slice(-4).toUpperCase();
  const initials = getInitials(t.userName);
  const attachmentsJson = encodeURIComponent(JSON.stringify(t.attachments || []));
  const adminAttachmentsJson = encodeURIComponent(JSON.stringify(t.adminAttachments || []));

  return `
    <div class="ticket-card status-${statusSlug}" id="tkcard-${t._id}">
      <div class="ticket-card-header">
        <div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <span class="ticket-id-tag">#TK-${shortId}</span>
            <span class="ticket-subject">${escapeHtml(t.subject)}</span>
          </div>
        </div>
        <div class="ticket-meta-badges">
          <span class="badge ${TICKET_STATUS_BADGE[t.status] || 'gray'}">
            ${isOpen ? '<span class="pulse-dot"></span>' : ''} ${escapeHtml(t.status)}
          </span>
          <span class="badge ${TICKET_PRI_BADGE[t.priority] || 'gray'}">${escapeHtml(t.priority)}</span>
        </div>
      </div>

      <div class="ticket-author-row">
        <div class="ticket-avatar">${initials}</div>
        <div class="ticket-author-meta">
          <div class="ticket-author-name">
            ${escapeHtml(t.userName)}
            <span class="ticket-role-pill">${escapeHtml(t.userRole)}</span>
          </div>
          <span class="ticket-time-ago">${timeAgo(t.createdAt)} · ${fmtDate(t.createdAt)}</span>
        </div>
      </div>

      <div class="ticket-message-box">${escapeHtml(t.message)}</div>

      ${t.attachments && t.attachments.length ? `
        <div data-attachments="${attachmentsJson}">
          ${renderAttachmentChips(t.attachments, { title: 'Ticket Attachments' })}
        </div>
      ` : ''}

      ${t.adminReply ? `
        <div class="ticket-thread-wrap">
          <div class="ticket-admin-reply-card">
            <div class="ticket-admin-reply-header">
              <span class="ticket-shield-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Support Team Response
              </span>
              ${t.repliedAt ? `<span style="font-size:11px;color:var(--text-4)">${timeAgo(t.repliedAt)}</span>` : ''}
            </div>
            <div class="ticket-admin-reply-text">${escapeHtml(t.adminReply)}</div>
            ${t.adminAttachments && t.adminAttachments.length ? `
              <div data-attachments="${adminAttachmentsJson}">
                ${renderAttachmentChips(t.adminAttachments, { title: 'Support Attached Files' })}
              </div>
            ` : ''}
          </div>
        </div>` : ''}

      ${isAdmin ? `
        <div class="ticket-toolbar">
          <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
          <select class="tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
            <option value="Open" ${t.status === 'Open' ? 'selected' : ''}>🔴 Open</option>
            <option value="In Review" ${t.status === 'In Review' ? 'selected' : ''}>🟡 In Review</option>
            <option value="Resolved" ${t.status === 'Resolved' ? 'selected' : ''}>🟢 Resolved</option>
            <option value="Closed" ${t.status === 'Closed' ? 'selected' : ''}>⚪ Closed</option>
          </select>

          <button class="btn ghost small tk-reply-toggle" data-tkid="${t._id}" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${t.adminReply ? 'Edit Reply' : '💬 Reply'}
          </button>

          ${t.status !== 'Resolved' ? `
            <button class="btn ghost small tk-quick-resolve-btn" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
              ✓ Quick Resolve
            </button>` : ''}

          <button class="btn danger small tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

          <div class="ticket-reply-form" id="tkreplyform-${t._id}">
            <div class="ticket-templates-bar">
              <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
              <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
            </div>
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(t.adminReply || '')}</textarea>
            ${renderAttachmentUploader({ id: 'tkreplyup-' + t._id, label: 'Attach Response Files / Deliverables', subtitle: 'Upload updated files, receipts, or resolution proofs' })}
            <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
              <button class="btn ghost small tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
              <button class="btn gold small tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
            </div>
          </div>
        </div>` : ''}
    </div>`;
}

async function loadTicketList(jobId, safeid, isAdmin) {
  const list = document.getElementById('tklist-' + safeid);
  const countPill = document.getElementById('tkcnt-' + safeid);
  if (!list) return;
  try {
    const tickets = await apiGet('/tickets/job/' + jobId);
    if (countPill) countPill.textContent = tickets.length;
    if (!tickets.length) {
      list.innerHTML = `<div style="font-size:12px;color:var(--text-4);padding:8px 0;font-style:italic">No tickets on this job yet.</div>`;
    } else {
      list.innerHTML = tickets.map(t => ticketCardHtml(t, isAdmin)).join('');
      bindTicketListEvents(jobId, safeid, isAdmin, list, tickets);
    }
  } catch (e) {
    list.innerHTML = `<div style="font-size:12px;color:var(--s-red-text)">Could not load tickets.</div>`;
  }
}

function bindTicketListEvents(jobId, safeid, isAdmin, list, tickets) {
  if (!isAdmin) return;
  // Status change
  list.querySelectorAll('.tk-status-sel').forEach(sel => {
    sel.onchange = async () => {
      try {
        await apiPut('/tickets/' + sel.dataset.tkid, { status: sel.value });
        flashToast('Status updated');
        loadTicketList(jobId, safeid, isAdmin);
      } catch (err) { flashToast(err.message, true); }
    };
  });

  // Quick Resolve
  list.querySelectorAll('.tk-quick-resolve-btn').forEach(btn => {
    btn.onclick = async () => {
      try {
        await apiPut('/tickets/' + btn.dataset.tkid, { status: 'Resolved' });
        flashToast('Ticket marked as Resolved! 🎉');
        loadTicketList(jobId, safeid, isAdmin);
      } catch (err) { flashToast(err.message, true); }
    };
  });

  // Template clicks
  list.querySelectorAll('.ticket-template-btn').forEach(btn => {
    btn.onclick = () => {
      const txt = document.getElementById('tkreplytxt-' + btn.dataset.tkid);
      if (txt) {
        txt.value = btn.dataset.tpl;
        txt.focus();
      }
    };
  });

  // Reply toggle
  list.querySelectorAll('.tk-reply-toggle').forEach(btn => {
    btn.onclick = () => {
      const tkid = btn.dataset.tkid;
      const form = document.getElementById('tkreplyform-' + tkid);
      if (form) {
        form.classList.toggle('show');
        const tkObj = tickets.find(t => t._id === tkid);
        bindAttachmentUploader('tkreplyup-' + tkid, { existing: tkObj ? tkObj.adminAttachments : [] });
      }
    };
  });

  // Reply cancel
  list.querySelectorAll('.tk-reply-cancel').forEach(btn => {
    btn.onclick = () => {
      const form = document.getElementById('tkreplyform-' + btn.dataset.tkid);
      if (form) form.classList.remove('show');
    };
  });

  // Reply save
  list.querySelectorAll('.tk-reply-save').forEach(btn => {
    btn.onclick = async () => {
      const tkid = btn.dataset.tkid;
      const txt = document.getElementById('tkreplytxt-' + tkid);
      if (!txt) return;
      const adminAttachments = getUploaderAttachments('tkreplyup-' + tkid);
      try {
        await apiPut('/tickets/' + tkid, { adminReply: txt.value.trim(), adminAttachments });
        flashToast('Response saved! 🛡️');
        loadTicketList(jobId, safeid, isAdmin);
      } catch (err) { flashToast(err.message, true); }
    };
  });

  // Delete
  list.querySelectorAll('.tk-del-btn').forEach(btn => {
    btn.onclick = async () => {
      if (!confirm('Permanently delete this ticket?')) return;
      try {
        await apiDelete('/tickets/' + btn.dataset.tkid);
        flashToast('Ticket deleted');
        loadTicketList(jobId, safeid, isAdmin);
      } catch (err) { flashToast(err.message, true); }
    };
  });
}

/**
 * Bind all ticket interactions for a job card after rendering.
 */
export function bindSupportTicketSection(jobId, isAdmin = false) {
  const safeid = jobId.replace(/[^a-z0-9]/gi, '');

  // Load existing tickets immediately
  loadTicketList(jobId, safeid, isAdmin);

  // Bind uploader for raising tickets
  bindAttachmentUploader('tkup-' + safeid);

  // Toggle form
  const toggleBtn = document.querySelector(`[data-jobid="${jobId}"].ticket-toggle-btn`);
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const form = document.getElementById('tkform-' + safeid);
      if (!form) return;
      const showing = form.style.display === 'block';
      form.style.display = showing ? 'none' : 'block';
      toggleBtn.textContent = showing ? '+ Raise Ticket' : '✕ Cancel';
    };
  }

  // Cancel form
  const cancelBtn = document.querySelector(`.tk-cancel-btn[data-safeid="${safeid}"]`);
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      const form = document.getElementById('tkform-' + safeid);
      if (form) form.style.display = 'none';
      if (toggleBtn) toggleBtn.textContent = '+ Raise Ticket';
    };
  }

  // Submit ticket
  const submitBtn = document.querySelector(`.tk-submit-btn[data-safeid="${safeid}"]`);
  if (submitBtn) {
    submitBtn.onclick = async () => {
      const subject = (document.getElementById('tksub-' + safeid) || {}).value?.trim();
      const message = (document.getElementById('tkmsg-' + safeid) || {}).value?.trim();
      const priority = (document.getElementById('tkpri-' + safeid) || {}).value;
      const attachments = getUploaderAttachments('tkup-' + safeid);
      if (!subject) { flashToast('Please enter a subject', true); return; }
      if (!message) { flashToast('Please enter a message', true); return; }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';
      try {
        await apiPost('/tickets', { jobId, subject, message, priority, attachments });
        flashToast('Ticket submitted! 🎫');
        const form = document.getElementById('tkform-' + safeid);
        if (form) form.style.display = 'none';
        if (toggleBtn) toggleBtn.textContent = '+ Raise Ticket';
        // Clear fields
        const sub = document.getElementById('tksub-' + safeid);
        const msg = document.getElementById('tkmsg-' + safeid);
        if (sub) sub.value = '';
        if (msg) msg.value = '';
        setUploaderAttachments('tkup-' + safeid, []);
        loadTicketList(jobId, safeid, isAdmin);
      } catch (err) {
        flashToast(err.message, true);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Ticket';
      }
    };
  }
}

// legacy compat
export function renderRoleSwitcher() { return ''; }
export function bindRoleSwitcher() { }

/* ── ACCOUNT SETTINGS & CREDENTIALS COMPONENT ────────────────── */
export function renderAccountSettingsCard(options = {}) {
  const {
    title = 'Account Settings & Credentials',
    subtitle = 'Update your personal name, login email, and security password',
    showCardWrapper = true,
    formId = 'accSettingsForm'
  } = options;
  const user = getUser() || {};
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
  const roleBadge = (user.role || 'user').toUpperCase();

  const notifEnabled = typeof window !== 'undefined'
    ? (localStorage.getItem('ci360_notif_enabled') !== 'false' && ('Notification' in window && Notification.permission === 'granted'))
    : true;
  const isBraveBrowser = typeof navigator !== 'undefined' && ((navigator.brave && typeof navigator.brave.isBrave === 'function') || /Brave/i.test(navigator.userAgent));
  const permStatus = typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default';
  const permStatusText = permStatus === 'granted'
    ? 'Status: 🟢 Active on this laptop & browser'
    : (permStatus === 'denied'
      ? `Status: 🔴 Blocked by browser. Click the lock/shield icon next to URL in ${isBraveBrowser ? 'Brave' : 'your browser'} bar to allow.`
      : 'Status: ⚪ Ready to enable (Click toggle or Send Test Alert)');

  return `
    <div class="${showCardWrapper ? 'card' : ''}" style="max-width:100%;margin:0;width:100%;box-sizing:border-box;" id="${formId}-wrap">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500,#d4af37),#b8860b);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 4px 12px rgba(212,175,55,0.25);flex-shrink:0;">
          ${escapeHtml(initial)}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-1);margin:0;">${escapeHtml(title)}</h3>
            <span class="badge gold" style="font-size:11px;padding:2px 8px;">${escapeHtml(roleBadge)}</span>
          </div>
          <div style="font-size:13px;color:var(--text-3);margin-top:2px;">${escapeHtml(subtitle)}</div>
        </div>
      </div>

      <form id="${formId}" onsubmit="return false;" style="display:flex;flex-direction:column;gap:20px;">
        <!-- Personal Identity -->
        <div>
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span>👤</span> Profile Identity
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${formId}-name" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Username / Full Name *</label>
              <input type="text" id="${formId}-name" class="input" value="${escapeHtml(user.name || '')}" placeholder="Your display name" required autocomplete="name">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${formId}-email" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Email Address *</label>
              <input type="email" id="${formId}-email" class="input" value="${escapeHtml(user.email || '')}" placeholder="name@company.com" required autocomplete="email">
            </div>
          </div>
        </div>

        <!-- Security & Password -->
        <div style="padding-top:16px;border-top:1px dashed var(--border);">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
            <span>🔐</span> Change Password
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:14px;">
            Leave password fields blank if you only want to update your name or email.
          </div>

          <div class="field" style="margin-bottom:14px;">
            <label for="${formId}-currentPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Current Password</label>
            <div style="position:relative;">
              <input type="password" id="${formId}-currentPass" class="input" placeholder="Enter current password" autocomplete="current-password" style="padding-right:42px;">
              <button type="button" class="pass-toggle-btn" data-target="${formId}-currentPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label for="${formId}-newPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">New Password</label>
              <div style="position:relative;">
                <input type="password" id="${formId}-newPass" class="input" placeholder="Min. 6 characters" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${formId}-newPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <div class="field" style="margin-bottom:0;">
              <label for="${formId}-confirmPass" style="font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:6px;display:block;">Confirm New Password</label>
              <div style="position:relative;">
                <input type="password" id="${formId}-confirmPass" class="input" placeholder="Re-enter new password" autocomplete="new-password" style="padding-right:42px;">
                <button type="button" class="pass-toggle-btn" data-target="${formId}-confirmPass" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px 6px;border:none;background:transparent;color:var(--text-3);cursor:pointer;font-size:15px;line-height:1;" title="Toggle visibility" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications & Alerts (Browser / Laptop / Web App) -->
        <div style="padding-top:16px;border-top:1px dashed var(--border);">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold-500,#d4af37);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
            <span>🔔</span> Laptop & Browser Notifications
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:14px;">
            Receive real-time desktop popups on your laptop and browser when tasks are assigned, dates change, or jobs update. Works seamlessly in browser tabs and installed web apps.
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;background:var(--bg-2,rgba(255,255,255,0.03));padding:12px 16px;border-radius:10px;border:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:12px;">
              <input type="checkbox" id="${formId}-notifToggle" class="checkbox" ${notifEnabled ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer;">
              <div>
                <label for="${formId}-notifToggle" style="font-size:13px;font-weight:600;color:var(--text-1);cursor:pointer;display:block;" id="${formId}-notifStateText">
                  ${notifEnabled ? 'Notifications Enabled' : 'Notifications Disabled'}
                </label>
                <div style="font-size:11.5px;color:var(--text-3);" id="${formId}-notifSubtext">
                  ${permStatusText}
                </div>
              </div>
            </div>
            <button type="button" class="btn ghost small" id="${formId}-testNotifBtn" style="padding:6px 12px;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
              <span>🔔</span> Send Test Alert
            </button>
          </div>
          <div style="margin-top:10px;font-size:11.5px;color:var(--text-3);line-height:1.4;">
            💡 <strong>Brave, Chrome, Edge & Firefox on Laptops:</strong> Notifications pop up in the Windows Action Center (bottom-right of your screen) with audio chime. In Brave, ensure notifications are allowed under the site shield/lock icon in the URL bar.
          </div>
        </div>

        <!-- Alert Notice Box -->
        <div id="${formId}-alert" style="display:none;padding:12px 14px;border-radius:8px;font-size:13px;line-height:1.4;"></div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:12px;padding-top:8px;">
          <button type="button" class="btn gold" id="${formId}-saveBtn" style="min-width:150px;display:flex;align-items:center;justify-content:center;gap:8px;">
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  `;
}

export function bindAccountSettingsCard(container, options = {}) {
  const { formId = 'accSettingsForm', onSaved = null, modalBg = null } = options;
  const root = container || document;

  // Password visibility toggle buttons
  root.querySelectorAll('.pass-toggle-btn').forEach(btn => {
    btn.onclick = () => {
      const targetId = btn.dataset.target;
      const inp = root.querySelector('#' + targetId) || document.getElementById(targetId);
      if (inp) {
        const isPass = inp.type === 'password';
        inp.type = isPass ? 'text' : 'password';
        btn.textContent = isPass ? '🙈' : '👁️';
        btn.style.opacity = isPass ? '1' : '0.65';
      }
    };
  });

  // Notification Toggle & Test Button
  const notifToggle = root.querySelector('#' + formId + '-notifToggle') || document.getElementById(formId + '-notifToggle');
  const notifStateText = root.querySelector('#' + formId + '-notifStateText') || document.getElementById(formId + '-notifStateText');
  const notifSubtext = root.querySelector('#' + formId + '-notifSubtext') || document.getElementById(formId + '-notifSubtext');
  const testNotifBtn = root.querySelector('#' + formId + '-testNotifBtn') || document.getElementById(formId + '-testNotifBtn');

  if (notifToggle) {
    notifToggle.onchange = async () => {
      const isChecked = notifToggle.checked;
      if (isChecked) {
        if ('Notification' in window && Notification.permission !== 'granted') {
          const granted = await requestNotificationPermission();
          if (!granted) {
            notifToggle.checked = false;
            if (notifStateText) notifStateText.textContent = 'Notifications Disabled';
            if (notifSubtext) notifSubtext.textContent = 'Status: Permission not granted';
            return;
          }
        }
        localStorage.setItem('ci360_notif_enabled', 'true');
        if (notifStateText) notifStateText.textContent = 'Notifications Enabled';
        if (notifSubtext) notifSubtext.textContent = 'Status: Active on this device';
        flashToast('Notifications enabled on this laptop/device! 🔔');
      } else {
        localStorage.setItem('ci360_notif_enabled', 'false');
        if (notifStateText) notifStateText.textContent = 'Notifications Disabled';
        if (notifSubtext) notifSubtext.textContent = 'Status: Disabled in settings';
        flashToast('Notifications disabled on this laptop/device.');
      }
    };
  }

  if (testNotifBtn) {
    testNotifBtn.onclick = async () => {
      if ('Notification' in window && Notification.permission !== 'granted') {
        const granted = await requestNotificationPermission();
        if (!granted) {
          if (Notification.permission === 'denied') {
            alert('Notifications are blocked by your browser.\n\nIn Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.');
          } else {
            flashToast('Please grant notification permission in your browser.', true);
          }
          return;
        }
      }
      localStorage.setItem('ci360_notif_enabled', 'true');
      if (notifToggle) notifToggle.checked = true;
      if (notifStateText) notifStateText.textContent = 'Notifications Enabled';
      if (notifSubtext) notifSubtext.textContent = 'Status: 🟢 Active on this laptop & browser';
      await triggerSystemNotification({
        title: 'CI360 Laptop Alert 🔔',
        message: 'Desktop & downloaded app notifications are active and working!',
        id: 'ci360-test-' + Date.now()
      });
      flashToast('Test notification sent to your laptop/browser! 🔔');
    };
  }

  const saveBtn = root.querySelector('#' + formId + '-saveBtn') || document.getElementById(formId + '-saveBtn');
  const alertBox = root.querySelector('#' + formId + '-alert') || document.getElementById(formId + '-alert');

  function showAlert(msg, isError = true) {
    if (!alertBox) return;
    alertBox.style.display = 'block';
    alertBox.style.background = isError ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)';
    alertBox.style.border = isError ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(34,197,94,0.3)';
    alertBox.style.color = isError ? '#ef4444' : '#22c55e';
    alertBox.innerHTML = (isError ? '⚠️ ' : '✓ ') + escapeHtml(msg);
  }

  function hideAlert() {
    if (alertBox) alertBox.style.display = 'none';
  }

  if (saveBtn) {
    saveBtn.onclick = async () => {
      hideAlert();
      const nameInp = root.querySelector('#' + formId + '-name') || document.getElementById(formId + '-name');
      const emailInp = root.querySelector('#' + formId + '-email') || document.getElementById(formId + '-email');
      const curPassInp = root.querySelector('#' + formId + '-currentPass') || document.getElementById(formId + '-currentPass');
      const newPassInp = root.querySelector('#' + formId + '-newPass') || document.getElementById(formId + '-newPass');
      const confPassInp = root.querySelector('#' + formId + '-confirmPass') || document.getElementById(formId + '-confirmPass');

      const name = (nameInp?.value || '').trim();
      const email = (emailInp?.value || '').trim();
      const currentPassword = curPassInp?.value || '';
      const newPassword = newPassInp?.value || '';
      const confirmPassword = confPassInp?.value || '';

      if (!name) {
        showAlert('Please enter your full name or username.', true);
        nameInp?.focus();
        return;
      }
      if (!email || !email.includes('@')) {
        showAlert('Please enter a valid email address.', true);
        emailInp?.focus();
        return;
      }

      if (newPassword || confirmPassword) {
        if (!currentPassword) {
          showAlert('Please enter your current password to set a new password.', true);
          curPassInp?.focus();
          return;
        }
        if (newPassword.length < 6) {
          showAlert('New password must be at least 6 characters long.', true);
          newPassInp?.focus();
          return;
        }
        if (newPassword !== confirmPassword) {
          showAlert('New passwords do not match. Please re-check.', true);
          confPassInp?.focus();
          return;
        }
      }

      const payload = { name, email };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const originalHtml = saveBtn.innerHTML;
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<span>Saving Changes…</span>';

      try {
        const res = await apiPut('/auth/profile', payload);
        if (res && res.token && res.user) {
          setSession(res.token, res.user);
        }

        // Update topbar & shell elements in DOM
        document.querySelectorAll('.topbar-user-name, .sidebar-user .name, .tud-name').forEach(el => {
          el.textContent = res.user.name;
        });
        document.querySelectorAll('.tud-email').forEach(el => {
          el.textContent = res.user.email;
        });
        const initial = res.user.name ? res.user.name.charAt(0).toUpperCase() : 'U';
        document.querySelectorAll('.topbar-user-avatar span, .user-avatar, .tud-avatar').forEach(el => {
          if (!el.classList.contains('topbar-online-dot')) {
            el.textContent = initial;
          }
        });

        // Clear password fields
        if (curPassInp) curPassInp.value = '';
        if (newPassInp) newPassInp.value = '';
        if (confPassInp) confPassInp.value = '';

        showAlert('Account credentials updated successfully!', false);
        flashToast('Account settings saved! ✓');

        if (typeof onSaved === 'function') {
          onSaved(res.user);
        }

        if (modalBg) {
          setTimeout(() => {
            try { modalBg.remove(); } catch (e) { }
          }, 900);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to update credentials. Please try again.', true);
        flashToast(err.message || 'Update failed', true);
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
      }
    };
  }
}

export function openAccountSettingsModal() {
  const modalHtml = `
    <div style="position:relative;padding:12px 6px;">
      <button type="button" id="closeAccSettingsModalBtn" style="position:absolute;top:-4px;right:0;border:none;background:transparent;color:var(--text-3);font-size:20px;cursor:pointer;padding:6px 10px;" aria-label="Close modal">✕</button>
      ${renderAccountSettingsCard({
    title: 'Account Settings',
    subtitle: 'Manage your personal email, username, and password',
    showCardWrapper: false,
    formId: 'modalAccSettingsForm'
  })}
    </div>
  `;
  const bg = openModal(modalHtml);
  const closeBtn = bg.querySelector('#closeAccSettingsModalBtn');
  if (closeBtn) closeBtn.onclick = () => bg.remove();
  bindAccountSettingsCard(bg, { formId: 'modalAccSettingsForm', modalBg: bg });
  return bg;
}

/* ── WINDOW GLOBALS ──────────────────────────────────────────── */
window.__setTheme = function (t) { setTheme(t); };

Object.assign(window, {
  getToken, getUser, setSession, clearSession, requireAuth, initTheme,
  api, apiGet, apiPost, apiPut, apiPatch, apiDelete,
  fmtINR, fmtHours, escapeHtml, fmtDate, flashToast, openModal, logout,
  getTheme, setTheme,
  initServiceWorker, playNotificationChime, triggerPhoneVibration,
  requestNotificationPermission, triggerSystemNotification, checkAndShowGlobalNotifBanner,
  isNotificationEnabled, setNotificationEnabled,
  fmtFileSize, formatFileSize, uploadSingleFileDirectly, uploadMultipleFilesFast, getFileCategory, isImageAttachment, openFilePreviewModal,
  renderAttachmentChips, uploadFilesToServer, renderAttachmentUploader,
  bindAttachmentUploader, getUploaderAttachments, setUploaderAttachments,
  renderRoleSwitcher, bindRoleSwitcher, renderNotificationBell, initNotificationBell,
  openNotificationModal, getNotifIcon,
  renderAppShell, bindAppShellEvents, renderSkeletonCards, renderEmptyState,
  renderKpiCard, renderBadge, renderProgressBar, renderPeriodPicker,
  renderSupportTicketSection, bindSupportTicketSection,
  renderAccountSettingsCard, bindAccountSettingsCard, openAccountSettingsModal,
  getArchive, restoreArchiveItem, purgeArchiveItem, purgeAllArchive,
  DEFAULT_SIDEBAR_CONFIG, getCachedSidebarNavConfig, fetchSidebarNavConfig,
  saveSidebarNavConfig, resetSidebarNavConfig, filterTabsForDashboard,
  saveUserModulePermissions
});


