// Remove .html extension from browser address bar cleanly
(function cleanHtmlFromUrl(){
  try {
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('.html')) {
      let cleanPath = window.location.pathname.slice(0, -5);
      if (cleanPath === '/index') cleanPath = '/';
      window.history.replaceState(null, '', (cleanPath || '/') + window.location.search + window.location.hash);
    }
  } catch(e){}
})();

// Thin fetch wrapper shared by all dashboards.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function getToken(){ return localStorage.getItem('ci360_token'); }
export function getUser(){ try{ return JSON.parse(localStorage.getItem('ci360_user')); }catch(e){ return null; } }
export function setSession(token, user){ localStorage.setItem('ci360_token', token); localStorage.setItem('ci360_user', JSON.stringify(user)); }
export function clearSession(){ localStorage.removeItem('ci360_token'); localStorage.removeItem('ci360_user'); }

export function requireAuth(expectedRole){
  const token = getToken();
  const user = getUser();
  if(!token || !user){ window.location.href = '/login'; return null; }
  if(expectedRole && user.role !== expectedRole && user.role !== 'superadmin'){
    window.location.href = user.role === 'superadmin' ? '/admin' : (user.role === 'employee' ? '/employee' : '/client');
    return null;
  }
  return user;
}

export async function api(path, options={}){
  const token = getToken();
  const headers = Object.assign({'Content-Type':'application/json'}, options.headers||{});
  if(token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, Object.assign({}, options, {headers}));
  if(res.status === 401){ clearSession(); window.location.href = '/login'; throw new Error('Session expired'); }
  let data = null;
  try{ data = await res.json(); }catch(e){ /* no body or non-JSON body */ }
  if(!res.ok){ throw new Error((data && data.error) || ('Server status ' + res.status + ' — Backend waking up, please retry in 10s.')); }
  return data;
}

export const apiGet    = (path)       => api(path, {method:'GET'});
export const apiPost   = (path, body) => api(path, {method:'POST',   body: JSON.stringify(body)});
export const apiPut    = (path, body) => api(path, {method:'PUT',    body: JSON.stringify(body)});
export const apiPatch  = (path, body) => api(path, {method:'PATCH',  body: JSON.stringify(body)});
export const apiDelete = (path)       => api(path, {method:'DELETE'});

export function fmtINR(n){ n = Number(n)||0; return '₹' + n.toLocaleString('en-IN', {maximumFractionDigits:0}); }
export function fmtHours(n){ return (Number(n)||0).toLocaleString('en-IN', {maximumFractionDigits:1}) + ' hrs'; }
export function escapeHtml(str){ if(str==null) return ''; return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
export function fmtDate(d){ if(!d) return '—'; return new Date(d).toISOString().slice(0,10); }

/* ── THEME MANAGEMENT ───────────────────────────────────────── */
export function getTheme(){ return localStorage.getItem('ci360_theme') || 'light'; }
export function setTheme(t){
  localStorage.setItem('ci360_theme', t);
  document.documentElement.setAttribute('data-theme', t);
  // update desktop toggle buttons
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === t);
  });
  // Topbar dropdown desktop theme toggle
  const tudThemeBtn = document.getElementById('tudThemeToggleBtn');
  if(tudThemeBtn){
    const icon = tudThemeBtn.querySelector('.tud-icon');
    const label = tudThemeBtn.querySelector('.tud-label');
    if(icon) icon.textContent = t === 'dark' ? '☀️' : '🌙';
    if(label) label.textContent = `Switch to ${t === 'dark' ? 'Light' : 'Dark'} Mode`;
  }
  // Mobile popover toggle button
  const tudMobileThemeIcon = document.getElementById('tudMobileThemeIcon');
  const tudMobileThemeText = document.getElementById('tudMobileThemeText');
  if(tudMobileThemeIcon) tudMobileThemeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
  if(tudMobileThemeText) tudMobileThemeText.textContent = t === 'dark' ? 'Light Mode' : 'Dark Mode';

  // Mobile more sheet toggle button
  const mmsThemeBtn = document.getElementById('mmsToggleThemeBtn');
  if(mmsThemeBtn){
    const span = mmsThemeBtn.querySelector('span');
    if(span) span.textContent = t === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}
export function initTheme(){
  const saved = getTheme();
  document.documentElement.setAttribute('data-theme', saved);
  // sync any buttons that exist in DOM
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === saved);
  });
  const tudThemeBtn = document.getElementById('tudThemeToggleBtn');
  if(tudThemeBtn){
    const icon = tudThemeBtn.querySelector('.tud-icon');
    const label = tudThemeBtn.querySelector('.tud-label');
    if(icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';
    if(label) label.textContent = `Switch to ${saved === 'dark' ? 'Light' : 'Dark'} Mode`;
  }
  const tudMobileThemeIcon = document.getElementById('tudMobileThemeIcon');
  const tudMobileThemeText = document.getElementById('tudMobileThemeText');
  if(tudMobileThemeIcon) tudMobileThemeIcon.textContent = saved === 'dark' ? '☀️' : '🌙';
  if(tudMobileThemeText) tudMobileThemeText.textContent = saved === 'dark' ? 'Light Mode' : 'Dark Mode';

  const mmsThemeBtn = document.getElementById('mmsToggleThemeBtn');
  if(mmsThemeBtn){
    const span = mmsThemeBtn.querySelector('span');
    if(span) span.textContent = saved === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}
// Run theme initialization immediately on module load
try {
  initTheme();
} catch(e){}

/* ── TOAST ───────────────────────────────────────────────────── */
export function flashToast(msg, isError){
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.borderLeftColor = isError ? 'var(--red-500)' : 'var(--green-500)';
  t.textContent = (isError ? '⚠️  ' : '✓  ') + msg;
  document.body.appendChild(t);
  const remove = () => { t.style.opacity='0'; t.style.transform='translateY(10px)'; setTimeout(()=>t.remove(), 200); };
  setTimeout(remove, 2800);
}

/* ── MODAL ───────────────────────────────────────────────────── */
export function openModal(html){
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal">${html}</div>`;
  bg.onclick = (e)=>{ if(e.target===bg) bg.remove(); };
  document.body.appendChild(bg);
  return bg;
}

export function logout(){ clearSession(); window.location.href = '/login'; }

/* ── NOTIFICATION ENGINE & SOUND/VIBRATION ───────────────────── */
let swRegistration = null;

export async function initServiceWorker(){
  if('serviceWorker' in navigator){
    try{
      swRegistration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.log('CI360 Service Worker active:', swRegistration.scope);
    }catch(err){
      console.warn('CI360 Service Worker registration notice:', err);
    }
  }
}

// Auto-register service worker on load
try {
  initServiceWorker();
} catch(e){}

/* ── NOTIFICATION DEDUPLICATION & THROTTLING (ALERT ONCE ONLY) ── */
let lastChimeTimestamp = 0;
let lastVibrateTimestamp = 0;
export const alertedNotifIds = new Set();
export const seenNotifIds = new Set();
let isSessionBaselineEstablished = false;

function getNotifStorageKey(prefix){
  try {
    const user = (typeof getUser === 'function') ? getUser() : null;
    const uid = (user && user._id) ? String(user._id) : 'default';
    return `${prefix}_${uid}`;
  } catch(e){
    return `${prefix}_default`;
  }
}

export function loadAlertedNotifIds(){
  try{
    const key = getNotifStorageKey('ci360_alerted_ids');
    const stored = localStorage.getItem(key);
    if(stored){
      const parsed = JSON.parse(stored);
      if(Array.isArray(parsed)){
        parsed.forEach(id => alertedNotifIds.add(String(id)));
      }
    }
  }catch(e){}
}

export function saveAlertedNotifIds(){
  try{
    const key = getNotifStorageKey('ci360_alerted_ids');
    const arr = Array.from(alertedNotifIds).slice(-2000);
    localStorage.setItem(key, JSON.stringify(arr));
  }catch(e){}
}

// Cross-tab synchronization so sibling tabs do not repeat alerts
if(typeof window !== 'undefined'){
  window.addEventListener('storage', (e) => {
    if(e.key && e.key.includes('ci360_alerted_ids')){
      loadAlertedNotifIds();
    }
  });
}

export function playNotificationChime(){
  try{
    const now = Date.now();
    // Throttle: Never play chime repeatedly within 5 seconds
    if(now - lastChimeTimestamp < 5000) return;
    lastChimeTimestamp = now;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return;
    const ctx = new AudioCtx();
    if(ctx.state === 'suspended') ctx.resume();
    const curTime = ctx.currentTime;

    // Harmonic 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, curTime);
    gain1.gain.setValueAtTime(0, curTime);
    gain1.gain.linearRampToValueAtTime(0.2, curTime + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, curTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(curTime);
    osc1.stop(curTime + 0.35);

    // Harmonic 2: 880 Hz (A5) with slight offset
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, curTime + 0.12);
    gain2.gain.setValueAtTime(0, curTime + 0.12);
    gain2.gain.linearRampToValueAtTime(0.22, curTime + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.001, curTime + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(curTime + 0.12);
    osc2.stop(curTime + 0.55);
  }catch(e){
    // AudioContext blocked by browser autoplay policy until user gesture
  }
}

export function triggerPhoneVibration(){
  try{
    const now = Date.now();
    // Throttle: Never vibrate repeatedly within 5 seconds
    if(now - lastVibrateTimestamp < 5000) return;
    lastVibrateTimestamp = now;

    if('vibrate' in navigator){
      navigator.vibrate([150, 80, 150]);
    }
  }catch(e){}
}

export function isNotificationEnabled(){
  try{
    if(typeof Notification !== 'undefined' && Notification.permission === 'granted'){
      return true;
    }
    if(localStorage.getItem('ci360_notif_enabled') === 'true'){
      return true;
    }
  }catch(e){}
  return false;
}

export function isNotificationBannerDismissed(){
  try{
    if(isNotificationEnabled()) return true;
    if(localStorage.getItem('ci360_notif_banner_dismissed') === 'true') return true;
    if(typeof Notification !== 'undefined' && Notification.permission === 'denied') return true;
  }catch(e){}
  return false;
}

export async function requestNotificationPermission(){
  if(!('Notification' in window)){
    flashToast('Your browser does not support notifications.', true);
    return false;
  }
  try{
    const perm = await Notification.requestPermission();
    const banner = document.getElementById('notifPermissionBanner');
    if(perm === 'granted'){
      localStorage.setItem('ci360_notif_enabled', 'true');
      if(banner){
        banner.classList.add('hidden');
        banner.style.setProperty('display', 'none', 'important');
        banner.remove();
      }
      flashToast('Notifications enabled for this device!');
      await triggerSystemNotification({
        title: 'CI360 Notifications Active 🔔',
        message: 'You will now receive instant alerts on this device for jobs and tasks.',
        id: 'ci360-perm-welcome'
      });
      return true;
    } else {
      if(banner){
        banner.classList.add('hidden');
        banner.style.setProperty('display', 'none', 'important');
      }
      flashToast('Notification permission was declined.', true);
      return false;
    }
  }catch(e){
    console.error('Notification permission request error:', e);
  }
  return false;
}

export async function triggerSystemNotification({ title, message, type, id, url }){
  const strId = id ? String(id) : null;
  loadAlertedNotifIds();

  // STRICT RULE: GIVE NOTIFICATION ONCE ONLY, NEVER REPEATEDLY
  if(strId && alertedNotifIds.has(strId)){
    return; // Already notified once! Stop immediately.
  }
  if(strId){
    alertedNotifIds.add(strId);
    saveAlertedNotifIds();
  }

  // Play sound & phone vibration (both safely throttled)
  playNotificationChime();
  triggerPhoneVibration();

  if(!('Notification' in window)){
    return;
  }

  // If permission is default, ask for permission
  if(Notification.permission === 'default'){
    try {
      const p = await Notification.requestPermission();
      if(p !== 'granted') return;
    } catch(e){
      return;
    }
  }

  if(Notification.permission !== 'granted'){
    return;
  }

  const iconUrl = (typeof window !== 'undefined' && window.location) 
    ? new URL('/logo.png', window.location.origin).href 
    : '/logo.png';

  const options = {
    body: message || 'You have a new update in CI360.',
    icon: iconUrl,
    badge: iconUrl,
    tag: strId ? `ci360-notif-${strId}` : 'ci360-alert',
    renotify: false, // Critical: NEVER re-alert the device repeatedly for existing notifications
    vibrate: [150, 80, 150],
    data: {
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      type: type || 'general'
    }
  };

  // 1. Direct window Notification for desktop Chrome (instant & reliable)
  try {
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
      n.close();
    };
    return;
  } catch(e) {
    // Mobile Chrome throws error on new Notification() and requires ServiceWorker
  }

  // 2. Fallback for mobile Android Chrome: Service Worker showNotification
  try {
    if(swRegistration && swRegistration.showNotification){
      await swRegistration.showNotification(title, options);
      return;
    }
    if('serviceWorker' in navigator){
      const reg = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise(res => setTimeout(() => res(null), 400))
      ]);
      if(reg && reg.showNotification){
        await reg.showNotification(title, options);
      }
    }
  } catch(err){
    console.warn('Service Worker notification dispatch:', err);
  }
}

if(typeof window !== 'undefined'){
  window.triggerSystemNotification = triggerSystemNotification;

  // On first user interaction anywhere in the app, prompt for notification permission if still default
  if('Notification' in window){
    const promptOnUserInteraction = () => {
      if(Notification.permission === 'default'){
        Notification.requestPermission().then(p => {
          if(p === 'granted'){
            localStorage.setItem('ci360_notif_enabled', 'true');
          }
        }).catch(()=>{});
      }
      window.removeEventListener('click', promptOnUserInteraction, true);
    };
    window.addEventListener('click', promptOnUserInteraction, true);
  }
}

/* ── NOTIFICATION BELL ───────────────────────────────────────── */
export function renderNotificationBell(){
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
            <button id="testNotifBtn" type="button" class="btn ghost small notif-action-btn" title="Test notification delivery on this phone/browser">🧪 Test</button>
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
        </div>
        <div class="notif-list" id="notifList">
          <div class="empty" style="padding:24px 16px;font-size:12.5px;">Loading notifications…</div>
        </div>
      </div>
    </div>`;
}

export function initNotificationBell(){
  const bellBtn   = document.getElementById('notifBellBtn');
  const dropdown  = document.getElementById('notifDropdown');
  const badge     = document.getElementById('notifBadge');
  const list      = document.getElementById('notifList');
  const clearBtn  = document.getElementById('clearNotifBtn');
  const markReadBtn = document.getElementById('markAllReadBtn');
  const testNotifBtn = document.getElementById('testNotifBtn');
  const notifEnableBtn = document.getElementById('notifEnableBtn');
  const notifDismissBannerBtn = document.getElementById('notifDismissBannerBtn');
  const permBanner = document.getElementById('notifPermissionBanner');
  const unreadTxt = document.getElementById('notifUnreadBadge');
  if(!bellBtn || !dropdown) return;

  // Initialize service worker
  initServiceWorker();

  function hidePermBanner(){
    const b = document.getElementById('notifPermissionBanner');
    if(b){
      b.classList.add('hidden');
      b.style.setProperty('display', 'none', 'important');
      b.remove();
    }
  }

  // Check permission state for banner
  function checkPermissionUI(){
    if(isNotificationBannerDismissed()){
      hidePermBanner();
      return;
    }
    if('Notification' in window){
      if(Notification.permission === 'granted' || Notification.permission === 'denied'){
        hidePermBanner();
      } else if(Notification.permission === 'default' && permBanner){
        permBanner.style.setProperty('display', 'flex', 'important');
      }
    }
  }
  checkPermissionUI();

  if(notifDismissBannerBtn){
    notifDismissBannerBtn.onclick = (e) => {
      e.stopPropagation();
      localStorage.setItem('ci360_notif_banner_dismissed', 'true');
      hidePermBanner();
    };
  }

  if(notifEnableBtn){
    notifEnableBtn.onclick = async (e) => {
      e.stopPropagation();
      localStorage.setItem('ci360_notif_enabled', 'true');
      hidePermBanner();
      await requestNotificationPermission();
      hidePermBanner();
    };
  }

  // Clear any existing polling interval to ensure only one interval runs across tab switches
  if(window.__ci360PollInterval){
    clearInterval(window.__ci360PollInterval);
    window.__ci360PollInterval = null;
  }

  loadAlertedNotifIds();

  let allNotifs = [];
  let currentFilter = 'all';

  function getNotifIcon(type){
    if(!type) return '🔔';
    if(type.startsWith('task_completed')) return '🎉';
    if(type.startsWith('task_due')) return '⚡';
    if(type.startsWith('task')) return '✅';
    if(type.startsWith('target_completed')) return '🎉';
    if(type.startsWith('target')) return '🎯';
    if(type.startsWith('job_due')) return '⏳';
    if(type.startsWith('job')) return '📋';
    if(type.startsWith('ticket')) return '🎫';
    if(type.startsWith('status')) return '🔄';
    if(type.startsWith('test')) return '🧪';
    return '🔔';
  }

  function timeAgo(dateStr){
    if(!dateStr) return '';
    const d = new Date(dateStr);
    const now = new Date();
    const sec = Math.floor((now - d) / 1000);
    if(sec < 60) return 'Just now';
    const min = Math.floor(sec / 60);
    if(min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if(hr < 24) return `${hr}h ago`;
    const days = Math.floor(hr / 24);
    if(days === 1) return 'Yesterday';
    if(days < 7) return `${days}d ago`;
    return fmtDate(dateStr);
  }

  function renderList(){
    if(!list) return;
    let filtered = allNotifs;
    if(currentFilter === 'task') filtered = allNotifs.filter(n => (n.type||'').includes('task'));
    else if(currentFilter === 'target') filtered = allNotifs.filter(n => (n.type||'').includes('target'));
    else if(currentFilter === 'job') filtered = allNotifs.filter(n => (n.type||'').includes('job'));
    else if(currentFilter === 'ticket') filtered = allNotifs.filter(n => (n.type||'').includes('ticket'));

    if(filtered.length === 0){
      list.innerHTML = `<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No ${currentFilter==='all'?'':currentFilter+' '}notifications</div>`;
      return;
    }

    list.innerHTML = filtered.map(n => {
      const icon = getNotifIcon(n.type);
      return `
        <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n._id}" data-type="${escapeHtml(n.type||'')}">
          <div class="notif-icon">${icon}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:2px">
              <span style="font-weight:700;font-size:12.5px;color:var(--text-1);line-height:1.3">${escapeHtml(n.title)}</span>
              <span style="font-size:10.5px;color:var(--text-4);white-space:nowrap">${timeAgo(n.createdAt)}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);line-height:1.4">${escapeHtml(n.message)}</div>
          </div>
        </div>`;
    }).join('');

    list.querySelectorAll('.notif-item').forEach(item => {
      item.onclick = async () => {
        const id = item.dataset.id;
        const type = item.dataset.type;
        if(id && item.classList.contains('unread')){
          item.classList.remove('unread');
          try { await api(`/notifications/${id}/read`, { method: 'PATCH' }); } catch(e){}
        }
        closeDropdown();
        if(type && type.includes('task') && typeof window.ci360NavTab === 'function') {
          window.ci360NavTab('dailytasks');
        } else if(type && type.includes('job') && typeof window.ci360NavTab === 'function') {
          window.ci360NavTab('jobs');
        } else if(type && type.includes('ticket') && typeof window.ci360NavTab === 'function') {
          window.ci360NavTab('tickets');
        } else if(type && type.includes('target') && typeof window.ci360NavTab === 'function') {
          window.ci360NavTab('targets');
        }
      };
    });
  }

  async function fetchNotifications(){
    try{
      const data = await apiGet('/notifications');
      allNotifs = data.notifications || [];
      const unread = data.unreadCount || 0;
      if(badge){
        badge.textContent = unread > 99 ? '99+' : unread;
        badge.style.display = unread > 0 ? 'flex' : 'none';
      }
      if(unreadTxt) {
        unreadTxt.textContent = unread > 0 ? `${unread} new` : '';
        unreadTxt.style.display = unread > 0 ? 'inline-block' : 'none';
      }

      loadAlertedNotifIds();

      // On initial fetch of the session: establish baseline and register all existing notifications
      // This guarantees opening the app or refreshing never spams old notifications!
      if(!isSessionBaselineEstablished){
        allNotifs.forEach(n => {
          const sid = String(n._id);
          seenNotifIds.add(sid);
          alertedNotifIds.add(sid);
        });
        saveAlertedNotifIds();
        isSessionBaselineEstablished = true;
      } else {
        // Genuine new incoming unread notifications that arrived during the active session
        const newlyArrived = allNotifs.filter(n => !n.read && !alertedNotifIds.has(String(n._id)));
        
        if(newlyArrived.length > 0){
          for(const n of newlyArrived){
            const sid = String(n._id);
            seenNotifIds.add(sid);
            await triggerSystemNotification({
              title: n.title || 'CI360 Alert',
              message: n.message || '',
              type: n.type,
              id: sid
            });
          }
          saveAlertedNotifIds();
        }
      }

      renderList();
    }catch(e){
      if(list && allNotifs.length === 0) list.innerHTML = `<div style="padding:16px;color:var(--s-red-text);font-size:12px">Could not load notifications</div>`;
    }
  }

  // Expose fetchNotifications globally so other actions (like logging a job) can trigger an immediate check
  if(typeof window !== 'undefined'){
    window.ci360FetchNotifications = fetchNotifications;
  }

  fetchNotifications();
  // Single coordinated responsive auto-polling interval every 20 seconds
  window.__ci360PollInterval = setInterval(fetchNotifications, 20000);
  window.addEventListener('beforeunload', () => {
    if(window.__ci360PollInterval){
      clearInterval(window.__ci360PollInterval);
      window.__ci360PollInterval = null;
    }
  });

  // Test Notification Button
  if(testNotifBtn){
    testNotifBtn.onclick = async (e) => {
      e.stopPropagation();
      if('Notification' in window && Notification.permission !== 'granted'){
        const granted = await requestNotificationPermission();
        if(!granted) return;
      }
      try{
        testNotifBtn.disabled = true;
        testNotifBtn.textContent = '…';
        const res = await apiPost('/notifications/test', {});
        const notif = res.notification || {
          title: '🔔 CI360 Alert Test',
          message: `Test alert delivered at ${new Date().toLocaleTimeString()}!`
        };
        await triggerSystemNotification({
          title: notif.title,
          message: notif.message,
          type: 'test_alert',
          id: notif._id || Date.now()
        });
        flashToast('✓ Test notification delivered to your device!');
        await fetchNotifications();
      }catch(err){
        // Fallback test notification if backend endpoint is unavailable
        await triggerSystemNotification({
          title: '🔔 CI360 Alert Test',
          message: `Local test notification delivered at ${new Date().toLocaleTimeString()}!`,
          id: 'ci360-test-' + Date.now()
        });
        flashToast('✓ Local test notification delivered!');
      }finally{
        testNotifBtn.disabled = false;
        testNotifBtn.textContent = '🧪 Test';
      }
    };
  }

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

  function openDropdown(){
    dropdown.style.display = 'flex';
    dropdown.classList.add('open');
    if(backdrop){
      backdrop.style.display = 'block';
      backdrop.classList.add('open');
    }
    bellBtn.setAttribute('aria-expanded', 'true');
    checkPermissionUI();
    const userDropdown = document.getElementById('topbarUserDropdown');
    if(userDropdown) userDropdown.style.display = 'none';
    fetchNotifications();
  }

  function closeDropdown(){
    dropdown.style.display = 'none';
    dropdown.classList.remove('open');
    if(backdrop){
      backdrop.style.display = 'none';
      backdrop.classList.remove('open');
    }
    bellBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(){
    const isOpen = dropdown.classList.contains('open') || dropdown.style.display === 'flex' || dropdown.style.display === 'block';
    if(isOpen){
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  window.ci360CloseNotifications = closeDropdown;

  const notifCloseBtn = document.getElementById('notifCloseBtn');
  if(notifCloseBtn){
    notifCloseBtn.onclick = (e) => {
      e.stopPropagation();
      closeDropdown();
    };
  }

  if(backdrop){
    backdrop.onclick = (e) => {
      e.stopPropagation();
      closeDropdown();
    };
  }

  bellBtn.onclick = (e)=>{
    e.stopPropagation();
    toggleDropdown();
  };

  if(markReadBtn){
    markReadBtn.onclick = async (e) => {
      e.stopPropagation();
      try {
        await api('/notifications/read', { method: 'PATCH' });
        badge.style.display = 'none';
        if(unreadTxt) { unreadTxt.textContent = ''; unreadTxt.style.display = 'none'; }
        allNotifs.forEach(n => n.read = true);
        renderList();
        flashToast('All notifications marked as read');
      } catch(err){ flashToast(err.message, true); }
    };
  }

  document.addEventListener('click', (e)=>{
    if(!dropdown.contains(e.target) && e.target !== bellBtn) dropdown.style.display='none';
  });

  if(clearBtn){
    clearBtn.onclick = async(e)=>{
      e.stopPropagation();
      try{
        await apiDelete('/notifications');
        allNotifs = [];
        list.innerHTML = `<div class="empty" style="padding:28px 16px;font-size:12.5px;color:var(--text-4)">No notifications yet</div>`;
        badge.style.display='none';
        if(unreadTxt) { unreadTxt.textContent = ''; unreadTxt.style.display = 'none'; }
        flashToast('Notifications cleared');
      }catch(err){ flashToast(err.message, true); }
    };
  }
}

/* ── APP SHELL ───────────────────────────────────────────────── */
export function renderAppShell({ user, currentRole, activeTab, tabs, title, subtitle }){
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'U';
  const roleBadge = user && (user.role === 'superadmin' || user.role === 'admin')
    ? 'Admin'
    : user && user.role === 'employee'
      ? 'Employee'
      : user && user.role === 'client'
        ? 'Client'
        : (user && user.role ? user.role.toUpperCase() : 'User');
  const userName = user && user.name ? user.name : 'User';
  const userEmail = user && user.email ? user.email : (user && user.username ? user.username : '');
  const hasLogJobTab = tabs && tabs.some(t => t.key === 'logjob');
  const activeTabObj = tabs && tabs.find(t => t.key === activeTab);
  const pageTitle = title || (activeTabObj && activeTabObj.label) || 'Dashboard';

  // Mobile Bottom Navigation Mapping
  let mobileNavItems = [];
  if (currentRole === 'superadmin') {
    mobileNavItems = [
      {
        key: 'dashboard',
        label: 'Dashboard',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
        active: activeTab === 'dashboard'
      },
      {
        key: 'dailytasks',
        label: 'Tasks',
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
        label: 'Tasks',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        active: activeTab === 'dailytasks'
      },
      {
        key: 'tickets',
        label: 'Tickets',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></svg>`,
        active: activeTab === 'tickets'
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
        active: !['myjobs', 'dailytasks', 'tickets', 'targets'].includes(activeTab),
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
        label: 'Delivered',
        iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        active: activeTab === 'jobs'
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
        active: !['logjob', 'jobs', 'team'].includes(activeTab),
        isMore: true
      }
    ];
  }

  return `
    <div class="app-shell">
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="CI360 Logo" class="brand-logo-img">
          <div class="brand-info">
            <h1>CI360</h1>
            <div class="tag">Intelligence Suite</div>
          </div>
        </div>
        <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
          <div class="nav-group-label">Navigation</div>
          ${tabs.map(t=>`
            <button type="button" class="sidebar-item ${activeTab===t.key?'active':''}" data-tab="${t.key}" aria-current="${activeTab===t.key?'page':'false'}">
              <span class="icon">${t.icon||'📌'}</span>
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
              <div class="topbar-breadcrumbs">
                <span class="topbar-crumb-app">
                  <span class="status-indicator-dot"></span>
                  CI360
                </span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-portal">${escapeHtml(roleBadge)}</span>
                <span class="topbar-crumb-sep">/</span>
                <span class="topbar-crumb-active">${escapeHtml(pageTitle)}</span>
              </div>
              <div class="topbar-title-row">
                <h1 class="page-heading-title">${escapeHtml(pageTitle)}</h1>
                ${subtitle ? `<span class="topbar-subtitle-pill" title="${escapeHtml(subtitle)}">${escapeHtml(subtitle)}</span>` : ''}
              </div>
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
              <button class="theme-btn ${getTheme()==='light'?'active':''}" data-theme="light" onclick="window.__setTheme('light')" title="Light mode" type="button" aria-label="Light mode">☀️</button>
              <button class="theme-btn ${getTheme()==='dark'?'active':''}" data-theme="dark" onclick="window.__setTheme('dark')" title="Dark mode" type="button" aria-label="Dark mode">🌙</button>
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
                    <button type="button" class="tud-item" id="tudCmdBtn" role="menuitem">
                      <span class="tud-icon">⚡</span>
                      <span class="tud-label">Command Palette</span>
                      <kbd class="tud-kbd">⌘K</kbd>
                    </button>
                    <button type="button" class="tud-item" id="tudThemeToggleBtn" role="menuitem">
                      <span class="tud-icon">${getTheme()==='dark' ? '☀️' : '🌙'}</span>
                      <span class="tud-label">Switch to ${getTheme()==='dark' ? 'Light' : 'Dark'} Mode</span>
                    </button>
                    <div class="tud-item-static">
                      <span class="tud-icon">🛡️</span>
                      <span class="tud-label">Session: Verified</span>
                    </div>
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
                        <span style="font-size:16px" id="tudMobileThemeIcon">${getTheme()==='dark' ? '☀️' : '🌙'}</span>
                        <span id="tudMobileThemeText">${getTheme()==='dark' ? 'Light Mode' : 'Dark Mode'}</span>
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

                    <button type="button" class="tud-mobile-item" id="tudMobileHelpBtn" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>Help & Support</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>

                    <button type="button" class="tud-mobile-item danger" id="logoutBtnMobile" role="menuitem">
                      <div class="tmi-left">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                      </div>
                      <div class="tmi-right">
                        <svg class="tmi-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>
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
              ${tabs.map(t => `
                <button type="button" class="mms-card ${activeTab===t.key?'active':''}" data-tab="${t.key}">
                  <span class="mms-card-icon">${t.icon || '📌'}</span>
                  <span class="mms-card-label">${escapeHtml(t.label)}</span>
                </button>
              `).join('')}
            </div>
            <div class="mms-quick-actions">
              <button type="button" class="btn ghost small mms-action-btn" id="mmsToggleThemeBtn">
                <span>${getTheme()==='dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
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

export function bindAppShellEvents(onTabChange){
  // Mobile nav (sidebar)
  const mobileToggle = document.getElementById('mobileNavToggle');
  const sidebar      = document.getElementById('appSidebar');
  const overlay      = document.getElementById('sidebarOverlay');

  function openSidebar(){
    if(sidebar) sidebar.classList.add('open');
    if(overlay) overlay.classList.add('open');
  }
  function closeSidebar(){
    if(sidebar) sidebar.classList.remove('open');
    if(overlay) overlay.classList.remove('open');
  }

  if(mobileToggle) mobileToggle.onclick = openSidebar;
  if(overlay) overlay.onclick = closeSidebar;

  // Mobile More Sheet Drawer
  const moreBackdrop = document.getElementById('mobileMoreBackdrop');
  const moreSheet = document.getElementById('mobileMoreSheet');
  const moreCloseBtn = document.getElementById('mmsCloseBtn');
  const mobileMoreBtn = document.getElementById('mobileMoreBtn');

  function openMoreSheet(){
    if(moreBackdrop) moreBackdrop.classList.add('active');
    if(moreSheet) moreSheet.classList.add('active');
  }
  function closeMoreSheet(){
    if(moreBackdrop) moreBackdrop.classList.remove('active');
    if(moreSheet) moreSheet.classList.remove('active');
  }

  if(mobileMoreBtn) mobileMoreBtn.onclick = (e)=>{ e.stopPropagation(); openMoreSheet(); };
  if(moreCloseBtn) moreCloseBtn.onclick = closeMoreSheet;
  if(moreBackdrop) moreBackdrop.onclick = (e)=>{ if(e.target === moreBackdrop) closeMoreSheet(); };

  // Bottom Navigation Bar items
  document.querySelectorAll('.mbn-item').forEach(btn => {
    if(btn.dataset.tab && btn.dataset.tab !== '__more__'){
      btn.onclick = () => {
        closeMoreSheet();
        if(onTabChange) onTabChange(btn.dataset.tab);
      };
    }
  });

  // Mobile More Sheet tab cards
  document.querySelectorAll('.mms-card').forEach(card => {
    card.onclick = () => {
      closeMoreSheet();
      if(onTabChange) onTabChange(card.dataset.tab);
    };
  });

  // Mobile More Sheet quick actions
  const mmsThemeBtn = document.getElementById('mmsToggleThemeBtn');
  if(mmsThemeBtn){
    mmsThemeBtn.onclick = () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };
  }
  const mmsNotifsBtn = document.getElementById('mmsNotifsBtn');
  if(mmsNotifsBtn){
    mmsNotifsBtn.onclick = () => {
      closeMoreSheet();
      const bell = document.getElementById('notifBellBtn');
      if(bell) bell.click();
    };
  }
  const mmsLogoutBtn = document.getElementById('mmsLogoutBtn');
  if(mmsLogoutBtn) mmsLogoutBtn.onclick = logout;

  // Mobile Calendar Button in Header
  const mobileCalBtn = document.getElementById('mobileCalBtn');
  if(mobileCalBtn){
    mobileCalBtn.onclick = () => {
      const periodRow = document.querySelector('.period-row');
      if(periodRow){
        periodRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        periodRow.classList.add('pulse-highlight');
        setTimeout(() => periodRow.classList.remove('pulse-highlight'), 1200);
      }
    };
  }

  // Mobile User Popover Actions
  const tudMobileThemeBtn = document.getElementById('tudMobileThemeBtn');
  if(tudMobileThemeBtn){
    tudMobileThemeBtn.onclick = (e) => {
      e.stopPropagation();
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };
  }

  const tudMobileNotifsBtn = document.getElementById('tudMobileNotifsBtn');
  if(tudMobileNotifsBtn){
    tudMobileNotifsBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if(userDropdown) userDropdown.style.display = 'none';
      const bell = document.getElementById('notifBellBtn');
      if(bell) bell.click();
    };
  }

  const tudMobileSettingsBtn = document.getElementById('tudMobileSettingsBtn');
  if(tudMobileSettingsBtn){
    tudMobileSettingsBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if(userDropdown) userDropdown.style.display = 'none';
      const manageTab = document.querySelector('[data-tab="manage"]');
      if(manageTab && onTabChange) {
        onTabChange('manage');
      } else {
        openMoreSheet();
      }
    };
  }

  const tudMobileHelpBtn = document.getElementById('tudMobileHelpBtn');
  if(tudMobileHelpBtn){
    tudMobileHelpBtn.onclick = (e) => {
      e.stopPropagation();
      const userDropdown = document.getElementById('topbarUserDropdown');
      if(userDropdown) userDropdown.style.display = 'none';
      const ticketsTab = document.querySelector('[data-tab="tickets"]');
      if(ticketsTab && onTabChange) {
        onTabChange('tickets');
      } else {
        openModal(`
          <div style="padding:24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">💬</div>
            <h3 style="margin-bottom:8px;font-size:18px;color:var(--text-1)">CI360 Help & Support</h3>
            <p style="font-size:13px;color:var(--text-3);line-height:1.5;margin-bottom:20px;">
              For immediate technical assistance, client onboarding, or support tickets, reach out to your system administrator or use the Support Tickets portal.
            </p>
            <button class="btn primary full" type="button" onclick="this.closest('.modal-bg').remove()">Close</button>
          </div>
        `);
      }
    };
  }

  const logoutBtnMobile = document.getElementById('logoutBtnMobile');
  if(logoutBtnMobile) logoutBtnMobile.onclick = logout;

  // User Dropdown Menu
  const userBtn = document.getElementById('topbarUserBtn');
  const userDropdown = document.getElementById('topbarUserDropdown');
  if(userBtn && userDropdown){
    userBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = userDropdown.style.display !== 'none';
      userDropdown.style.display = isOpen ? 'none' : 'block';
      userBtn.setAttribute('aria-expanded', String(!isOpen));
      if(typeof window.ci360CloseNotifications === 'function'){
        window.ci360CloseNotifications();
      }
    };

    document.addEventListener('click', (e) => {
      if(!userDropdown.contains(e.target) && !userBtn.contains(e.target)){
        userDropdown.style.display = 'none';
        userBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // User Dropdown Theme Toggle Button
  const tudThemeBtn = document.getElementById('tudThemeToggleBtn');
  if(tudThemeBtn){
    tudThemeBtn.onclick = () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };
  }

  // Topbar Quick Action (+ Log Job)
  const quickLogJobBtn = document.getElementById('topbarQuickLogJobBtn');
  if(quickLogJobBtn){
    quickLogJobBtn.onclick = () => {
      if(onTabChange) onTabChange('logjob');
    };
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.onclick = logout;

  // Init notifications
  initNotificationBell();

  // Tab navigation
  document.querySelectorAll('.sidebar-item').forEach(btn=>{
    btn.onclick = ()=>{
      closeSidebar();
      if(onTabChange) onTabChange(btn.dataset.tab);
    };
  });

  // Command Palette Initialization
  initCommandPalette(onTabChange);
}

function initCommandPalette(onTabChange){
  const backdrop = document.getElementById('cmdPaletteBackdrop');
  const input = document.getElementById('cmdSearchInput');
  const results = document.getElementById('cmdResultsList');
  const triggerDesktop = document.getElementById('topbarCmdTrigger');
  const triggerMobile = document.getElementById('topbarCmdTriggerMobile');
  const tudCmdBtn = document.getElementById('tudCmdBtn');
  const closeKbd = document.getElementById('cmdCloseKbd');

  if(!backdrop || !input || !results) return;

  // Gather navigation items from sidebar
  const sidebarItems = Array.from(document.querySelectorAll('.sidebar-item'));
  const commands = sidebarItems.map(item => ({
    type: 'tab',
    id: item.dataset.tab,
    label: item.querySelector('span:last-child')?.textContent || item.dataset.tab,
    icon: item.querySelector('.icon')?.textContent || '📌',
    sub: 'Navigate to section',
    action: () => {
      if(onTabChange) onTabChange(item.dataset.tab);
    }
  }));

  // Quick Action: Log Job if available
  const hasLogJob = sidebarItems.some(i => i.dataset.tab === 'logjob');
  if(hasLogJob){
    commands.unshift({
      type: 'action',
      id: 'quick-logjob',
      label: 'Log a New Job',
      icon: '➕',
      sub: 'Create & submit work delivery',
      action: () => {
        if(onTabChange) onTabChange('logjob');
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
      if(bell) bell.click();
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

  function renderList(){
    if(!filtered.length){
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

  function updateSelection(){
    results.querySelectorAll('.cmd-result').forEach((el, idx) => {
      el.classList.toggle('selected', idx === selectedIndex);
    });
  }

  function execute(idx){
    const cmd = filtered[idx];
    if(cmd && cmd.action){
      closePalette();
      cmd.action();
    }
  }

  function openPalette(){
    const userDropdown = document.getElementById('topbarUserDropdown');
    if(userDropdown) userDropdown.style.display = 'none';
    backdrop.classList.add('open');
    input.value = '';
    filtered = [...commands];
    selectedIndex = 0;
    renderList();
    setTimeout(() => input.focus(), 50);
  }

  function closePalette(){
    backdrop.classList.remove('open');
    input.blur();
  }

  if(triggerDesktop) triggerDesktop.onclick = openPalette;
  if(triggerMobile) triggerMobile.onclick = openPalette;
  if(tudCmdBtn) tudCmdBtn.onclick = () => {
    const userDropdown = document.getElementById('topbarUserDropdown');
    if(userDropdown) userDropdown.style.display = 'none';
    openPalette();
  };
  if(closeKbd) closeKbd.onclick = closePalette;

  backdrop.onclick = (e) => {
    if(e.target === backdrop) closePalette();
  };

  input.oninput = () => {
    const q = input.value.trim().toLowerCase();
    if(!q){
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
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      if(filtered.length > 0){
        selectedIndex = (selectedIndex + 1) % filtered.length;
        updateSelection();
        const sel = results.querySelector('.cmd-result.selected');
        if(sel) sel.scrollIntoView({ block: 'nearest' });
      }
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      if(filtered.length > 0){
        selectedIndex = (selectedIndex - 1 + filtered.length) % filtered.length;
        updateSelection();
        const sel = results.querySelector('.cmd-result.selected');
        if(sel) sel.scrollIntoView({ block: 'nearest' });
      }
    } else if(e.key === 'Enter'){
      e.preventDefault();
      execute(selectedIndex);
    } else if(e.key === 'Escape'){
      e.preventDefault();
      closePalette();
    }
  };

  // Keyboard shortcut listener
  const keyHandler = (e) => {
    if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){
      e.preventDefault();
      if(backdrop.classList.contains('open')){
        closePalette();
      } else {
        openPalette();
      }
    } else if(e.key === 'Escape' && backdrop.classList.contains('open')){
      closePalette();
    }
  };
  if(window.__ci360CmdKeyHandler){
    window.removeEventListener('keydown', window.__ci360CmdKeyHandler);
  }
  window.__ci360CmdKeyHandler = keyHandler;
  window.addEventListener('keydown', keyHandler);
}

/* ── SKELETON LOADERS ────────────────────────────────────────── */
export function renderSkeletonCards(count=4){
  return `
    <div class="grid grid-${Math.min(count,4)}" style="margin-bottom:24px">
      ${Array(count).fill(0).map(()=>`
        <div class="card kpi">
          <div class="skeleton-box" style="height:12px;width:55%;margin-bottom:14px;border-radius:4px"></div>
          <div class="skeleton-box" style="height:30px;width:40%;margin-bottom:10px;border-radius:6px"></div>
          <div class="skeleton-box" style="height:11px;width:75%;border-radius:4px"></div>
        </div>`).join('')}
    </div>`;
}

/* ── EMPTY STATE ─────────────────────────────────────────────── */
export function renderEmptyState(title, subtitle, icon='📁', actionBtn=''){
  return `
    <div class="empty">
      <span class="empty-icon">${icon}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(subtitle)}</p>
      ${actionBtn}
    </div>`;
}

/* ── KPI CARD ────────────────────────────────────────────────── */
export function renderKpiCard(title, value, subtext='', icon='📊', trend=''){
  let trendHtml = '';
  if(trend){
    const isUp = trend.startsWith('+') || trend.includes('↑') || trend.toLowerCase().includes('up');
    trendHtml = `<span class="kpi-trend ${isUp?'up':'down'}">${escapeHtml(trend)}</span>`;
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

export function renderBadge(text, type='gray'){
  return `<span class="badge ${type}">${escapeHtml(text)}</span>`;
}

export function renderProgressBar(pct, type='indigo'){
  const percent = Math.min(100, Math.max(0, Number(pct)||0));
  return `
    <div class="progress-bar-wrap" title="${percent.toFixed(0)}%">
      <div class="progress-bar-fill ${type}" style="width:${percent}%"></div>
    </div>`;
}

/* ── PERIOD PICKER ───────────────────────────────────────────── */
export function renderPeriodPicker(currentPeriod){
  const periods = [['all','All Time'],['today','Today'],['week','This Week'],['month','This Month'],['quarter','This Quarter']];
  return `<div class="period-row">${periods.map(([k,l])=>`<button class="pchip ${currentPeriod===k?'active':''}" data-period="${k}">${l}</button>`).join('')}</div>`;
}

/* ── SUPPORT TICKET HELPERS ──────────────────────────────────── */

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function timeAgo(date) {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffSec = Math.floor((now - past) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return fmtDate(date);
}

/* ── FILE ATTACHMENTS & UPLOADER UTILITIES ──────────────────── */
export function fmtFileSize(bytes) {
  bytes = Number(bytes) || 0;
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function getFileCategory(name = '', type = '') {
  const ext = (name.split('.').pop() || '').toLowerCase();
  if (['png','jpg','jpeg','gif','webp','svg','bmp','ico'].includes(ext) || type.startsWith('image/')) return { icon: '🖼️', cls: 'img', label: 'Image' };
  if (ext === 'pdf' || type === 'application/pdf') return { icon: '📄', cls: 'pdf', label: 'PDF Document' };
  if (['doc','docx','odt','txt','rtf'].includes(ext)) return { icon: '📝', cls: 'doc', label: 'Document' };
  if (['xls','xlsx','csv','ods'].includes(ext)) return { icon: '📊', cls: 'sheet', label: 'Spreadsheet' };
  if (['zip','rar','7z','tar','gz'].includes(ext)) return { icon: '📦', cls: 'zip', label: 'Archive' };
  if (['mp4','mov','avi','mkv','webm'].includes(ext) || type.startsWith('video/')) return { icon: '🎬', cls: 'video', label: 'Video' };
  if (['mp3','wav','ogg','m4a'].includes(ext) || type.startsWith('audio/')) return { icon: '🎵', cls: 'audio', label: 'Audio' };
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
        ${isImg ? `
          <img src="${att.url}" alt="${fileName}" style="max-height:72vh;object-fit:contain;cursor:zoom-in" onclick="window.open('${att.url}','_blank')">
        ` : (isPdf ? `
          <iframe src="${att.url}" title="${fileName}"></iframe>
        ` : `
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">${cat.icon}</div>
            <div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">${fileName}</div>
            <div style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">${cat.label} · ${fileSize}</div>
            <a href="${att.url}" download="${fileName}" target="_blank" class="btn gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Attachment
            </a>
          </div>
        `)}
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

  return `
    <div class="attachment-chips-wrap">
      ${options.title ? `<div class="attachment-chips-header">📎 ${escapeHtml(options.title)} <span style="font-weight:500;color:var(--text-4)">(${attachments.length})</span></div>` : ''}
      <div class="attachment-chips-list">
        ${attachments.map((att, idx) => {
          const cat = getFileCategory(att.name, att.type);
          const name = escapeHtml(att.name || 'File');
          const size = fmtFileSize(att.size);
          return `
            <div class="attachment-chip" data-idx="${idx}" title="${name} (${size})">
              <span class="file-type-icon ${cat.cls}" style="width:22px;height:22px;font-size:12px">${cat.icon}</span>
              <span class="attachment-chip-name" onclick="window.__openPreview(${idx}, this)">${name}</span>
              <span class="attachment-chip-size">${size}</span>
              <div class="attachment-chip-actions">
                <button type="button" class="attachment-chip-btn" title="View Preview" onclick="window.__openPreview(${idx}, this)">👁️</button>
                <a href="${att.url}" download="${name}" target="_blank" class="attachment-chip-btn" title="Download" onclick="event.stopPropagation()">⬇️</a>
                ${canDelete ? `<button type="button" class="attachment-chip-btn" title="Remove" style="color:var(--red-500)" onclick="window.__removeChip(${idx}, this)">✕</button>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Global state container for file uploaders
const uploaderStores = {};

export async function uploadFilesToServer(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return [];

  const prepared = await Promise.all(files.map(async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result,
          data: reader.result
        });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }));

  const valid = prepared.filter(Boolean);
  if (!valid.length) return [];

  try {
    const res = await apiPost('/upload', { files: valid });
    if (res && res.files && res.files.length) {
      return res.files;
    }
  } catch (err) {
    console.warn('Backend upload failed, fallback to base64 data URLs:', err);
  }

  // Fallback to data URI attachment object if upload endpoint failed
  return valid.map(f => ({
    name: f.name,
    url: f.base64,
    size: f.size,
    type: f.type,
    uploadedAt: new Date()
  }));
}

export function renderAttachmentUploader({
  id = 'uploader',
  label = 'Attachments & Files',
  subtitle = 'Upload briefs, proofs, PDFs, spreadsheets, screenshots or design assets',
  multiple = true,
  accept = '*/*',
  maxFiles = 10
} = {}) {
  return `
    <div class="uploader-container" id="container-${id}">
      <label style="font-size:12.5px;font-weight:700;color:var(--text-2);display:flex;align-items:center;justify-content:space-between">
        <span>📎 ${escapeHtml(label)}</span>
        <span style="font-size:11px;font-weight:500;color:var(--text-4)" id="count-${id}">0 files attached</span>
      </label>
      <div class="uploader-zone" id="zone-${id}">
        <input type="file" id="input-${id}" ${multiple ? 'multiple' : ''} accept="${accept}" style="display:none">
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
      return `
        <div class="uploader-file-item">
          <div class="uploader-file-info">
            <span class="file-type-icon ${cat.cls}">${cat.icon}</span>
            <div style="min-width:0;flex:1">
              <div class="uploader-file-name" title="${name}">${name}</div>
              <div class="uploader-file-size">${cat.label} · ${size}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" class="btn ghost small" style="padding:3px 8px;font-size:11px" onclick="window.__previewUploaderFile('${id}', ${idx})">Preview</button>
            <button type="button" class="uploader-file-del" title="Remove file" onclick="window.__removeUploaderFile('${id}', ${idx})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (options.onChange) options.onChange(files);
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
        flashToast('Uploading files… ⏳');
        const uploaded = await uploadFilesToServer(e.dataTransfer.files);
        uploaderStores[id] = [...(uploaderStores[id] || []), ...uploaded];
        updateListUI();
        flashToast('Files attached! ✓');
      }
    };

    input.onchange = async () => {
      if (input.files && input.files.length) {
        flashToast('Uploading files… ⏳');
        const uploaded = await uploadFilesToServer(input.files);
        uploaderStores[id] = [...(uploaderStores[id] || []), ...uploaded];
        updateListUI();
        flashToast('Files attached! ✓');
        input.value = '';
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
  const container = el.closest('.attachment-chips-wrap');
  if (!container) return;
  const chip = el.closest('.attachment-chip');
  if (!chip) return;
  const chipIdx = Number(chip.dataset.idx);
  const jsonStr = container.dataset.attachments;
  if (jsonStr) {
    try {
      const arr = JSON.parse(decodeURIComponent(jsonStr));
      if (arr[chipIdx]) openFilePreviewModal(arr[chipIdx]);
    } catch (e) {}
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

const TICKET_STATUS_BADGE = { 'Open':'red', 'In Review':'amber', 'Resolved':'green', 'Closed':'gray' };
const TICKET_PRI_BADGE    = { 'Low':'green', 'Medium':'gray', 'High':'amber', 'Urgent':'red' };

function ticketCardHtml(t, isAdmin) {
  const statusSlug = (t.status || 'Open').toLowerCase().replace(' ','-');
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
          <span class="badge ${TICKET_STATUS_BADGE[t.status]||'gray'}">
            ${isOpen ? '<span class="pulse-dot"></span>' : ''} ${escapeHtml(t.status)}
          </span>
          <span class="badge ${TICKET_PRI_BADGE[t.priority]||'gray'}">${escapeHtml(t.priority)}</span>
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
            <option value="Open" ${t.status==='Open'?'selected':''}>🔴 Open</option>
            <option value="In Review" ${t.status==='In Review'?'selected':''}>🟡 In Review</option>
            <option value="Resolved" ${t.status==='Resolved'?'selected':''}>🟢 Resolved</option>
            <option value="Closed" ${t.status==='Closed'?'selected':''}>⚪ Closed</option>
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
            <textarea id="tkreplytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(t.adminReply||'')}</textarea>
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
      const subject  = (document.getElementById('tksub-' + safeid) || {}).value?.trim();
      const message  = (document.getElementById('tkmsg-' + safeid) || {}).value?.trim();
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
export function renderRoleSwitcher(){ return ''; }
export function bindRoleSwitcher(){}

/* ── WINDOW GLOBALS ──────────────────────────────────────────── */
window.__setTheme = function(t){ setTheme(t); };

Object.assign(window, {
  getToken, getUser, setSession, clearSession, requireAuth, initTheme,
  api, apiGet, apiPost, apiPut, apiPatch, apiDelete,
  fmtINR, fmtHours, escapeHtml, fmtDate, flashToast, openModal, logout,
  getTheme, setTheme,
  initServiceWorker, playNotificationChime, triggerPhoneVibration,
  requestNotificationPermission, triggerSystemNotification,
  fmtFileSize, getFileCategory, isImageAttachment, openFilePreviewModal,
  renderAttachmentChips, uploadFilesToServer, renderAttachmentUploader,
  bindAttachmentUploader, getUploaderAttachments, setUploaderAttachments,
  renderRoleSwitcher, bindRoleSwitcher, renderNotificationBell, initNotificationBell,
  renderAppShell, bindAppShellEvents, renderSkeletonCards, renderEmptyState,
  renderKpiCard, renderBadge, renderProgressBar, renderPeriodPicker,
  renderSupportTicketSection, bindSupportTicketSection
});

