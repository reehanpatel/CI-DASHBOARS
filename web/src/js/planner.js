/**
 * CI360 DAILY PLANNER MODULE
 * Modern, Dayfolio-inspired Daily & Weekly Planner with rich task management,
 * text/file import, dynamic statistics, PNG image export, weekly PDF export,
 * and JSON backup/restore.
 */

import {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  escapeHtml,
  flashToast,
  openModal
} from './api.js';

// Default Settings
const DEFAULT_SETTINGS = {
  displayName: 'Daily Planner',
  weekStartsOn: 1, // 1 = Monday, 0 = Sunday
  timezone: 'Asia/Kolkata',
  defaultPriority: 'Medium',
  density: 'comfortable', // comfortable | compact
  soundEnabled: true
};

function loadSettings() {
  try {
    const raw = localStorage.getItem('ci360_planner_settings');
    if (raw) return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
  } catch (e) {}
  return Object.assign({}, DEFAULT_SETTINGS);
}

function saveSettings(s) {
  try {
    localStorage.setItem('ci360_planner_settings', JSON.stringify(s));
  } catch (e) {}
}

// Formatters and date helpers
function getTodayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatFullDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatShortDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function getDayName(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function getWeekDates(baseDateStr, weekStartsOn = 1) {
  const base = new Date(baseDateStr + 'T00:00:00');
  const currentDay = base.getDay(); // 0 is Sunday, 1 is Monday
  const diff = (currentDay < weekStartsOn ? 7 : 0) + currentDay - weekStartsOn;
  const monday = new Date(base);
  monday.setDate(base.getDate() - diff);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${day}`);
  }
  return dates;
}

// Gentle audio chime on completion
function playTaskChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {}
}

/**
 * Main Daily Planner Initialization Entrypoint
 */
export function initDailyPlanner(container, options = {}) {
  const { userRole = 'employee', currentUser = null, onNavigate = null } = options;
  const isSuperadmin = userRole === 'superadmin' || userRole === 'admin';

  let settings = loadSettings();
  let state = {
    selectedDate: getTodayStr(),
    viewMode: 'daily', // 'daily' | 'weekly' | 'report'
    filterStatus: 'all', // 'all' | 'pending' | 'in_progress' | 'completed' | 'overdue'
    searchQuery: '',
    groupByEmployee: isSuperadmin, // Group tasks by employee on admin dashboard
    collapsedEmployees: {}, // Tracks collapsed employee accordion states
    selectedCategory: 'all',
    selectedPersonnelId: 'all',
    reportPersonnelId: 'all',
    tasks: [],
    personnelList: [],
    clientList: [],
    loading: false
  };

  // Setup styles once
  ensurePlannerStyles();

  // Load initial tasks & team
  loadData();

  async function loadData() {
    state.loading = true;
    renderSkeleton();

    try {
      const promises = [
        apiGet('/tasks'),
        apiGet('/personnel').catch(() => []),
        apiGet('/clients').catch(() => [])
      ];

      const [tasks, personnel, clients] = await Promise.all(promises);
      state.tasks = Array.isArray(tasks) ? tasks : [];
      if (personnel) state.personnelList = Array.isArray(personnel) ? personnel : [];
      if (clients) state.clientList = Array.isArray(clients) ? clients : [];
    } catch (err) {
      flashToast('Failed to load planner tasks: ' + err.message, true);
    } finally {
      state.loading = false;
      render();
    }
  }

  function renderSkeleton() {
    container.innerHTML = `
      <div class="ci360-planner-wrap">
        <div class="ci360-planner-skeleton" style="padding:24px;background:var(--bg-card);border-radius:var(--r-lg);border:1px solid var(--border-sm)">
          <div style="height:32px;width:240px;background:var(--border-xs);border-radius:6px;margin-bottom:12px;animation:pulse 1.5s infinite"></div>
          <div style="height:18px;width:340px;background:var(--border-xs);border-radius:4px;margin-bottom:28px"></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;margin-bottom:24px">
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
          </div>
          <div style="height:200px;background:var(--border-xs);border-radius:12px"></div>
        </div>
      </div>
    `;
  }

  function getTasksForDate(dateStr) {
    return state.tasks.filter(t => {
      // Filter out soft deleted
      if (t.isDeleted === true) return false;

      // Personnel filter for admin (checks primary assignee and co-owners)
      if (isSuperadmin && state.selectedPersonnelId !== 'all') {
        const pId = t.personnelId?._id || t.personnelId;
        const matchesPrimary = String(pId) === String(state.selectedPersonnelId);
        const matchesCoOwner = Array.isArray(t.coOwners) && t.coOwners.some(c => {
          const cId = c.personnelId?._id || c.personnelId || c.userId?._id || c.userId;
          return String(cId) === String(state.selectedPersonnelId);
        });
        if (!matchesPrimary && !matchesCoOwner) return false;
      }

      // Date matching logic
      const dueDateStr = t.completionDateStr || t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      const assignDateStr = t.assignedDateStr || (t.assignedDate ? new Date(t.assignedDate).toISOString().slice(0, 10) : '') || (t.createdAt ? new Date(t.createdAt).toISOString().slice(0, 10) : '') || dueDateStr;

      // In Progress: show on all dates from assigned date to due date
      if (t.status === 'In Progress') {
        const start = (assignDateStr && dueDateStr && assignDateStr <= dueDateStr) ? assignDateStr : (dueDateStr || assignDateStr);
        const end = (assignDateStr && dueDateStr && assignDateStr <= dueDateStr) ? dueDateStr : (assignDateStr || dueDateStr);
        if (start && end) {
          if (dateStr >= start && dateStr <= end) return true;
        } else if (dueDateStr && dueDateStr === dateStr) {
          return true;
        } else if (assignDateStr && assignDateStr === dateStr) {
          return true;
        }
      }

      // If completed or pending, match dueDateStr (or assignDateStr if pending)
      if (dueDateStr && dueDateStr === dateStr) return true;
      if (t.status !== 'Completed' && assignDateStr && assignDateStr === dateStr) return true;
      if (!dueDateStr && !assignDateStr) return dateStr === getTodayStr();
      return false;
    });
  }

  function isOverdue(task, currentDateStr) {
    if (task.status === 'Completed') return false;
    const taskDate = task.completionDateStr || task.dateStr || (task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '');
    if (!taskDate) return false;
    return taskDate < currentDateStr;
  }

  function calculateStats(taskList, currentDateStr) {
    const total = taskList.length;
    const completed = taskList.filter(t => t.status === 'Completed').length;
    const inProgress = taskList.filter(t => t.status === 'In Progress').length;
    const pending = taskList.filter(t => t.status === 'Pending' || t.status === 'Todo').length;
    const overdue = taskList.filter(t => isOverdue(t, currentDateStr)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, pending, overdue, percent };
  }

  function render() {
    const todayStr = getTodayStr();
    const isToday = state.selectedDate === todayStr;
    const dayTasks = getTasksForDate(state.selectedDate);
    const stats = calculateStats(dayTasks, todayStr);

    container.innerHTML = `
      <div class="ci360-planner-wrap ${settings.density === 'compact' ? 'is-compact' : ''}">
        
        <!-- Planner Main Header (Hero Card) -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-hero-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
            </div>
            <div class="ci360-planner-title-group">
              <h1 class="ci360-planner-heading">${escapeHtml(settings.displayName || 'Daily Planner')}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${state.viewMode === 'daily' ? 'active' : ''}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${state.viewMode === 'weekly' ? 'active' : ''}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${state.viewMode === 'report' ? 'active' : ''}" id="btnViewReport" title="Weekly Analytics & Report">
                <span>📊 Report</span>
              </button>
            </div>

            <!-- Primary Add Task Button -->
            <button type="button" class="ci360-btn-primary ${state.selectedDate < todayStr ? 'is-locked-past' : ''}" id="btnOpenAddTaskModal" title="${state.selectedDate < todayStr ? 'Cannot add tasks on previous dates (switch to today or later)' : 'Add Task'}">
              ${state.selectedDate < todayStr ? `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Add Task (Past Date)</span>
              ` : `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Task</span>
              `}
            </button>

            <!-- Actions Dropdown Button -->
            <div class="ci360-dropdown-wrap">
              <button type="button" class="ci360-btn-secondary" id="btnPlannerActionsMenu" title="More Tools & Exports">
                <span>Tools & Export ▾</span>
              </button>
              <div class="ci360-dropdown-menu hidden" id="plannerActionsDropdown">
                <button type="button" class="ci360-menu-item" id="btnActionImport">
                  <span class="icon">📥</span>
                  <div class="meta">
                    <strong>Import Task List</strong>
                    <small>Paste lines or upload .txt file</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionExportPng">
                  <span class="icon">🖼️</span>
                  <div class="meta">
                    <strong>Download Daily Planner Image</strong>
                    <small>High-resolution PNG for today</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionExportPdf">
                  <span class="icon">📄</span>
                  <div class="meta">
                    <strong>Download Weekly Report (PDF)</strong>
                    <small>Summary report with job owner</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionAdminReport">
                  <span class="icon">📊</span>
                  <div class="meta">
                    <strong>Admin Detailed Report (PDF & CSV)</strong>
                    <small>With Client Name & Description</small>
                  </div>
                </button>
                <div class="ci360-dropdown-divider"></div>
                <button type="button" class="ci360-menu-item" id="btnActionBackup">
                  <span class="icon">💾</span>
                  <div class="meta">
                    <strong>Backup / Restore</strong>
                    <small>Export or import JSON backup</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionSettings">
                  <span class="icon">⚙️</span>
                  <div class="meta">
                    <strong>Planner Settings</strong>
                    <small>Timezone, layout & preferences</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Date & Team Navigator Bar -->
        <div class="ci360-planner-nav-strip">
          <div class="ci360-date-nav-controls">
            <button type="button" class="ci360-nav-arrow" id="btnPrevDay" title="Previous Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div class="ci360-date-picker-badge" id="datePickerBadge">
              <span class="calendar-icon">📅</span>
              <span class="date-text" id="displayDateLabel">${formatFullDate(state.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${state.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${isToday ? 'is-current' : ''}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${isSuperadmin ? `
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${state.selectedPersonnelId === 'all' ? 'selected' : ''}>All Team Members</option>
                ${state.personnelList.map(p => `
                  <option value="${p._id}" ${state.selectedPersonnelId === String(p._id) ? 'selected' : ''}>
                    ${escapeHtml(p.name)} (${escapeHtml(p.department || p.role || 'Team')})
                  </option>
                `).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <!-- Progress Summary Ribbon -->
        <section class="ci360-progress-summary-card">
          <div class="ci360-summary-main">
            <div class="ci360-ring-stat">
              <div class="ci360-circular-progress" style="--val: ${stats.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${stats.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${stats.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <div class="kpi-icon-wrap total">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${stats.total}</span>
                  <span class="kpi-label">Total Tasks</span>
                </div>
              </div>
              <div class="kpi-box completed">
                <div class="kpi-icon-wrap completed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${stats.completed}</span>
                  <span class="kpi-label">Completed</span>
                </div>
              </div>
              <div class="kpi-box in-progress">
                <div class="kpi-icon-wrap in-prog">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${stats.inProgress}</span>
                  <span class="kpi-label">In Progress</span>
                </div>
              </div>
              <div class="kpi-box pending">
                <div class="kpi-icon-wrap pending">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14m-2 20v-5a5 5 0 0 0-2.83-4.5A5 5 0 0 0 17 7V2M7 22v-5a5 5 0 0 1 2.83-4.5A5 5 0 0 1 7 7V2"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${stats.pending}</span>
                  <span class="kpi-label">Pending</span>
                </div>
              </div>
              ${stats.overdue > 0 ? `
                <div class="kpi-box overdue">
                  <div class="kpi-icon-wrap overdue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div class="kpi-text-wrap">
                    <span class="kpi-num">${stats.overdue}</span>
                    <span class="kpi-label">Overdue</span>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${stats.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${renderCurrentView(dayTasks, stats)}
        </main>

      </div>
    `;

    bindHeaderEvents();
    bindViewEvents(dayTasks);
  }

  function renderCurrentView(dayTasks, stats) {
    if (state.viewMode === 'weekly') {
      return renderWeeklyView();
    }
    if (state.viewMode === 'report') {
      return renderReportView();
    }
    return renderDailyFocusView(dayTasks, stats);
  }

  /**
   * 1. TODAY'S FOCUS (DAILY VIEW)
   */
  function renderDailyFocusView(dayTasks, stats) {
    const todayStr = getTodayStr();
    const isPastDate = state.selectedDate < todayStr;

    // Filter tasks based on search & filter
    let visibleTasks = dayTasks;

    if (state.filterStatus === 'pending') {
      visibleTasks = visibleTasks.filter(t => t.status === 'Pending' || t.status === 'Todo');
    } else if (state.filterStatus === 'in_progress') {
      visibleTasks = visibleTasks.filter(t => t.status === 'In Progress');
    } else if (state.filterStatus === 'completed') {
      visibleTasks = visibleTasks.filter(t => t.status === 'Completed');
    } else if (state.filterStatus === 'overdue') {
      visibleTasks = visibleTasks.filter(t => isOverdue(t, todayStr));
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase().trim();
      visibleTasks = visibleTasks.filter(t => {
        const title = (t.title || '').toLowerCase();
        const desc = (t.description || '').toLowerCase();
        const cat = (t.category || '').toLowerCase();
        const clientName = (t.clientName || '').toLowerCase();
        const empName = (t.personnelId?.name || t.userId?.name || '').toLowerCase();
        const creatorName = (t.createdByName || t.createdBy?.name || (t.createdBy?.email ? t.createdBy.email.split('@')[0] : '')).toLowerCase();
        const coOwners = Array.isArray(t.coOwners) ? t.coOwners.map(c => (c.name || '').toLowerCase()).join(' ') : '';
        const client = (t.clientId?.name || t.jobId?.clientId?.name || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || cat.includes(q) || clientName.includes(q) || empName.includes(q) || creatorName.includes(q) || coOwners.includes(q) || client.includes(q);
      });
    }

    // Sort: Pending/In Progress first by priority, completed at bottom
    visibleTasks.sort((a, b) => {
      if (a.status === 'Completed' && b.status !== 'Completed') return 1;
      if (a.status !== 'Completed' && b.status === 'Completed') return -1;
      const priOrder = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
      return (priOrder[a.priority] || 2) - (priOrder[b.priority] || 2);
    });

    // Group tasks by employee when in admin mode with grouping active
    const employeeMap = new Map();
    visibleTasks.forEach(task => {
      let empKey = 'unassigned';
      let empName = 'Unassigned / Team';
      let empDept = '';
      let empRole = '';

      if (task.personnelId && typeof task.personnelId === 'object' && task.personnelId._id) {
        empKey = String(task.personnelId._id);
        empName = task.personnelId.name || 'Team Member';
        empRole = task.personnelId.role || 'Personnel';
        empDept = task.personnelId.department || '';
      } else if (task.userId && typeof task.userId === 'object' && task.userId._id) {
        empKey = String(task.userId._id);
        empName = task.userId.name || 'User';
        empRole = task.userId.role || 'Member';
      } else if (task.createdByName || (task.createdBy && task.createdBy.name)) {
        empName = task.createdByName || task.createdBy.name;
        empKey = 'creator_' + empName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        empRole = 'Creator';
      }

      if (!employeeMap.has(empKey)) {
        employeeMap.set(empKey, {
          key: empKey,
          name: empName,
          department: empDept,
          role: empRole,
          tasks: []
        });
      }
      employeeMap.get(empKey).tasks.push(task);
    });

    const employeeGroups = Array.from(employeeMap.values()).sort((a, b) => {
      if (a.key === 'unassigned') return 1;
      if (b.key === 'unassigned') return -1;
      return a.name.localeCompare(b.name);
    });

    return `
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${isPastDate ? 'Focus Archive' : "Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${visibleTasks.length} ${visibleTasks.length === 1 ? 'task' : 'tasks'}</span>
            ${!isPastDate ? `
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(0,112,243,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            ` : ''}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${state.filterStatus === 'all' ? 'active' : ''}" data-f="all">All (${stats.total})</button>
              <button type="button" class="filter-pill ${state.filterStatus === 'pending' ? 'active' : ''}" data-f="pending">Pending (${stats.pending})</button>
              <button type="button" class="filter-pill ${state.filterStatus === 'in_progress' ? 'active' : ''}" data-f="in_progress">In Progress (${stats.inProgress})</button>
              <button type="button" class="filter-pill ${state.filterStatus === 'completed' ? 'active' : ''}" data-f="completed">Completed (${stats.completed})</button>
              ${stats.overdue > 0 ? `
                <button type="button" class="filter-pill overdue ${state.filterStatus === 'overdue' ? 'active' : ''}" data-f="overdue">Overdue (${stats.overdue})</button>
              ` : ''}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${isSuperadmin ? `
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${state.groupByEmployee ? 'active' : ''}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${state.groupByEmployee ? 'By Employee' : 'Flat List'}
                </button>
                ${state.groupByEmployee && employeeGroups.length > 0 ? `
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                ` : ''}
              </div>
            ` : ''}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, client name, employee or co-owner..." value="${escapeHtml(state.searchQuery)}">
              ${state.searchQuery ? `<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>` : ''}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${isPastDate ? `
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${formatShortDate(state.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${visibleTasks.length === 0 ? renderEmptyFocusState(isPastDate) : (
            isSuperadmin && state.groupByEmployee ? `
              <div class="ci360-emp-groups-container">
                ${employeeGroups.map(group => {
                  const isCollapsed = !!state.collapsedEmployees[group.key];
                  const completedCount = group.tasks.filter(t => t.status === 'Completed').length;
                  const inProgCount = group.tasks.filter(t => t.status === 'In Progress').length;
                  const pendingCount = group.tasks.filter(t => t.status === 'Pending' || t.status === 'Todo').length;
                  const pct = group.tasks.length > 0 ? Math.round((completedCount / group.tasks.length) * 100) : 0;

                  return `
                    <div class="ci360-emp-group-card ${isCollapsed ? 'is-collapsed' : ''}" data-emp-key="${group.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${group.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${isCollapsed ? '▶' : '▼'}</span>
                          <div class="emp-avatar">${escapeHtml((group.name || 'U').charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${escapeHtml(group.name)}</span>
                            ${group.department || group.role ? `<span class="emp-subtitle">${escapeHtml(group.department ? group.department + ' · ' + group.role : group.role)}</span>` : ''}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${group.tasks.length} ${group.tasks.length === 1 ? 'task' : 'tasks'}</span>
                          <span class="emp-stat-pill done">${completedCount} done</span>
                          ${inProgCount > 0 ? `<span class="emp-stat-pill in-prog">${inProgCount} in progress</span>` : ''}
                          ${pendingCount > 0 ? `<span class="emp-stat-pill pending">${pendingCount} pending</span>` : ''}
                          <div class="emp-mini-bar-wrap" title="${pct}% completed">
                            <div class="emp-mini-bar-fill" style="width:${pct}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${!isCollapsed ? `
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${group.tasks.map(task => renderTaskCard(task, todayStr)).join('')}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <div class="ci360-task-list">
                ${visibleTasks.map(task => renderTaskCard(task, todayStr)).join('')}
              </div>
            `
          )}
        </div>

      </div>
    `;
  }

  function renderEmptyFocusState(isPastDate = false) {
    return `
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${isPastDate ? '📜' : '✨'}</div>
        <h3>No tasks found for ${formatShortDate(state.selectedDate)}</h3>
        <p>${isPastDate ? 'No scheduled tasks were recorded on this past date.' : 'Your schedule is clean and ready. Add your first priority task above or import your daily agenda.'}</p>
        ${!isPastDate ? `
          <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
            <button type="button" class="ci360-btn-primary" id="btnEmptyStateAddTask">
              + Add Task
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
              📥 Import List
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderTaskCard(task, todayStr) {
    const isCompleted = task.status === 'Completed';
    const isPastDue = isOverdue(task, todayStr);
    const compDateStr = task.completionDateStr || task.dateStr || (task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : todayStr);
    const assignDateStr = task.assignedDateStr || (task.assignedDate ? new Date(task.assignedDate).toISOString().slice(0, 10) : '') || (task.createdAt ? new Date(task.createdAt).toISOString().slice(0, 10) : '');
    const isMultiDayInProgress = task.status === 'In Progress' && assignDateStr && compDateStr && assignDateStr !== compDateStr;
    const priClass = `pri-${(task.priority || 'medium').toLowerCase()}`;
    const statusClass = `status-${(task.status || 'pending').toLowerCase().replace(/\s+/g, '-')}`;
    const addedByName = task.createdByName || task.createdBy?.name || (task.createdBy?.email ? task.createdBy.email.split('@')[0] : '') || (task.personnelId?.name || task.userId?.name || '');

    return `
      <div class="ci360-task-card ${isCompleted ? 'is-completed' : ''} ${isPastDue ? 'is-overdue' : ''}" data-id="${task._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${isCompleted ? 'checked' : ''}" data-action="toggle" data-id="${task._id}" title="${isCompleted ? 'Reopen task' : 'Mark as done'}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${escapeHtml(task.title)}</span>
          </div>

          ${task.description ? `
            <div class="ci360-task-desc">${escapeHtml(task.description)}</div>
          ` : ''}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${priClass}">
              <span class="badge-dot"></span>
              ${escapeHtml(task.priority || 'Medium')}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${statusClass}">
              ${escapeHtml(task.status || 'Pending')}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${isMultiDayInProgress ? `
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${formatShortDate(assignDateStr)} to ${formatShortDate(compDateStr)}">
                📅 ${formatShortDate(assignDateStr)} ➔ Due: ${formatShortDate(compDateStr)}
              </span>
            ` : `
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${compDateStr}">
                📅 Due: ${formatShortDate(compDateStr)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${task.rescheduledFrom && task.rescheduledFrom !== compDateStr ? `
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${formatShortDate(task.rescheduledFrom)} to ${formatShortDate(compDateStr)} (${task.dateChangeCount || 1} change${(task.dateChangeCount || 1) > 1 ? 's' : ''})">
                🔄 Date Changed: ${formatShortDate(task.rescheduledFrom)} ➔ ${formatShortDate(compDateStr)}
              </span>
            ` : ''}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${addedByName ? `
              <span class="ci360-badge creator-badge" title="Created / Added by: ${escapeHtml(addedByName)}">
                ✍️ Added by: ${escapeHtml(addedByName)}
              </span>
            ` : ''}

            <!-- Category -->
            ${task.category ? `
              <span class="ci360-badge category-badge">
                #${escapeHtml(task.category)}
              </span>
            ` : ''}

            <!-- Overdue Warning -->
            ${isPastDue ? `
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            ` : ''}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${isSuperadmin && (task.personnelId?.name || task.userId?.name) && (task.personnelId?.name || task.userId?.name) !== addedByName ? `
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${escapeHtml(task.personnelId?.name || task.userId?.name)}
              </span>
            ` : ''}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(task.coOwners) && task.coOwners.length > 0 ? `
              <span class="ci360-badge coowner-badge" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);" title="Co-Owners: ${task.coOwners.map(c => c.name).filter(Boolean).join(', ')}">
                👥 Co-Owners: ${escapeHtml(task.coOwners.map(c => c.name).filter(Boolean).join(', '))}
              </span>
            ` : ''}

            <!-- Client Badge -->
            ${(task.clientName || task.clientId?.name || task.jobId?.clientId?.name || (task.category && task.category !== 'General' ? task.category : '')) ? `
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${escapeHtml(task.clientName || task.clientId?.name || task.jobId?.clientId?.name || task.category)}">
                🏢 ${escapeHtml(task.clientName || task.clientId?.name || task.jobId?.clientId?.name || task.category)}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${task._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${task._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `;
  }

  /**
   * 2. WEEKLY PLANNER VIEW
   */
  function renderWeeklyView() {
    const weekDates = getWeekDates(state.selectedDate, settings.weekStartsOn);
    const startStr = formatShortDate(weekDates[0]);
    const endStr = formatShortDate(weekDates[6]);
    const todayStr = getTodayStr();

    // Aggregate statistics across the entire week for the 8th card "Week at a Glance"
    const allWeekTasks = weekDates.flatMap(d => getTasksForDate(d));
    const uniqueMap = new Map();
    allWeekTasks.forEach(t => {
      const k = t._id ? String(t._id) : JSON.stringify(t);
      uniqueMap.set(k, t);
    });
    const uniqueWeekTasks = Array.from(uniqueMap.values());
    const weekStats = calculateStats(uniqueWeekTasks, todayStr);

    return `
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${startStr} – ${endStr}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 8-Card Modern Weekly Grid (7 Days + Week at a Glance) -->
        <div class="ci360-week-grid modern-grid">
          ${weekDates.map(dStr => {
            const isDayToday = dStr === todayStr;
            const isDaySelected = dStr === state.selectedDate;
            const tasksForDay = getTasksForDate(dStr);
            const dayStats = calculateStats(tasksForDay, todayStr);

            const dObj = new Date(dStr + 'T00:00:00');
            const dayShort = dObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dayFullName = dObj.toLocaleDateString('en-US', { weekday: 'long' });
            const monthShort = dObj.toLocaleDateString('en-US', { month: 'short' });
            const dayNum = dObj.getDate();

            return `
              <div class="ci360-weekly-day-card ${isDayToday ? 'is-today' : ''} ${isDaySelected ? 'is-selected' : ''}" data-date="${dStr}">
                
                <!-- Day Card Header -->
                <div class="weekly-day-header ${isDayToday ? 'today-banner' : ''}">
                  <div class="day-badge-box">
                    <span class="day-badge-name">${dayShort}</span>
                    <span class="day-badge-num">${dayNum}</span>
                  </div>
                  <div class="day-header-meta">
                    <div class="day-full-name">${dayFullName}, ${monthShort} ${dayNum}</div>
                    <div class="day-header-stats-row">
                      <span class="day-done-label">${dayStats.completed}/${dayStats.total} Done</span>
                      <div class="day-progress-track">
                        <div class="day-progress-bar" style="width: ${dayStats.percent}%"></div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="day-action-clipboard-btn" data-action="add-day" data-date="${dStr}" title="Add/Manage tasks for ${dayFullName}">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                </div>

                <!-- Day Card Tasks List -->
                <div class="weekly-day-tasks">
                  ${tasksForDay.length === 0 ? `
                    <div class="weekly-empty-state">
                      <span>No tasks scheduled</span>
                    </div>
                  ` : tasksForDay.map(t => {
                    const isDone = t.status === 'Completed';
                    const pri = (t.priority || 'medium').toLowerCase();
                    const priLabel = t.priority ? (t.priority.charAt(0).toUpperCase() + t.priority.slice(1).toLowerCase()) : 'Medium';

                    return `
                      <div class="weekly-task-item ${isDone ? 'done' : ''}" data-id="${t._id}">
                        <button type="button" class="weekly-check-btn ${isDone ? 'checked' : ''}" data-action="toggle" data-id="${t._id}" title="Mark ${isDone ? 'Incomplete' : 'Complete'}">
                          ${isDone ? `
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ` : ''}
                        </button>
                        <span class="weekly-task-title ${isDone ? 'strike' : ''}" data-action="edit" data-id="${t._id}" title="${escapeHtml(t.title)}">
                          ${escapeHtml(t.title)}
                        </span>
                        <span class="weekly-pri-badge pri-${pri}">
                          ${priLabel}
                        </span>
                      </div>
                    `;
                  }).join('')}
                </div>

              </div>
            `;
          }).join('')}

          <!-- 8th Card: Week at a Glance -->
          <div class="ci360-weekly-day-card week-glance-card">
            <div class="glance-header">
              <span class="glance-icon">📊</span>
              <h3 class="glance-title">Week at a Glance</h3>
            </div>
            
            <div class="glance-metrics-grid">
              <div class="glance-metric-item">
                <span class="glance-m-icon total">📋</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${weekStats.total}</div>
                  <div class="glance-m-lbl">Total Tasks</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon completed">✅</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${weekStats.completed}</div>
                  <div class="glance-m-lbl">Completed</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon in-progress">🔄</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${weekStats.inProgress}</div>
                  <div class="glance-m-lbl">In Progress</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon pending">⏳</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${weekStats.pending}</div>
                  <div class="glance-m-lbl">Pending</div>
                </div>
              </div>
            </div>

            <div class="glance-footer">
              <div class="glance-progress-track">
                <div class="glance-progress-bar" style="width: ${weekStats.percent}%"></div>
              </div>
              <div class="glance-progress-caption">
                ${weekStats.completed} / ${weekStats.total} Tasks (${weekStats.percent}% Complete)
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  /**
   * 3. WEEKLY REPORT & ANALYTICS VIEW
   */
  function renderReportView() {
    const weekDates = getWeekDates(state.selectedDate, settings.weekStartsOn);
    const startStr = formatFullDate(weekDates[0]);
    const endStr = formatFullDate(weekDates[6]);
    const todayStr = getTodayStr();

    const activeRepEmpId = state.reportPersonnelId || 'all';
    const repEmpObj = state.personnelList.find(p => String(p._id) === String(activeRepEmpId));
    const repEmpName = repEmpObj ? repEmpObj.name : '';

    // Aggregate tasks for this week (filtered by selected employee if chosen by admin)
    const weeklyTasks = state.tasks.filter(t => {
      if (t.isDeleted === true) return false;
      const dueDateStr = t.completionDateStr || t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      const assignDateStr = t.assignedDateStr || (t.assignedDate ? new Date(t.assignedDate).toISOString().slice(0, 10) : '') || dueDateStr;

      const inWeek = (t.status === 'In Progress' && assignDateStr && dueDateStr)
        ? weekDates.some(d => d >= assignDateStr && d <= dueDateStr)
        : (weekDates.includes(dueDateStr) || weekDates.includes(assignDateStr));
      if (!inWeek) return false;

      if (activeRepEmpId !== 'all') {
        const pId = String(t.personnelId?._id || t.personnelId || '');
        const inCo = Array.isArray(t.coOwners) && t.coOwners.some(c => String(c.personnelId?._id || c.personnelId || c.userId?._id || c.userId || '') === String(activeRepEmpId));
        return pId === String(activeRepEmpId) || inCo;
      }
      return true;
    });

    const total = weeklyTasks.length;
    const completed = weeklyTasks.filter(t => t.status === 'Completed').length;
    const inProgress = weeklyTasks.filter(t => t.status === 'In Progress').length;
    const pending = total - completed - inProgress;
    const compRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority breakdown
    const priCounts = { Urgent: 0, High: 0, Medium: 0, Low: 0 };
    weeklyTasks.forEach(t => {
      const p = t.priority || 'Medium';
      if (priCounts[p] !== undefined) priCounts[p]++;
    });

    return `
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${startStr} – ${endStr}</span>
              ${activeRepEmpId !== 'all' && repEmpName ? `
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${escapeHtml(repEmpName)}</span>
              ` : `
                <span class="badge gray" style="font-size:11.5px;padding:2px 8px;font-weight:600;">👥 All Team Members</span>
              `}
            </div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            ${isSuperadmin ? `
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <label for="selectWeeklyReportEmployee" style="font-size:12px;font-weight:700;color:var(--text-2);white-space:nowrap;">Whose Report:</label>
                <select id="selectWeeklyReportEmployee" class="input" style="padding:6px 12px;font-size:12.5px;font-weight:600;min-width:180px;height:36px;border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);">
                  <option value="all" ${activeRepEmpId === 'all' ? 'selected' : ''}>👥 All Team Members</option>
                  ${state.personnelList.map(p => `
                    <option value="${p._id}" ${String(p._id) === String(activeRepEmpId) ? 'selected' : ''}>
                      👤 ${escapeHtml(p.name)} (${escapeHtml(p.department || p.role || 'Member')})
                    </option>
                  `).join('')}
                </select>
              </div>
            ` : ''}

            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf" title="Download weekly report PDF for the selected employee">
              📄 Download Weekly Report PDF
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnOpenAdminReportModal" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);font-weight:700;">
              📊 Specific Admin Report (with Description & Client)
            </button>
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="ci360-report-kpis">
          <div class="card kpi">
            <span class="label">Total Weekly Tasks</span>
            <span class="value" style="font-size:28px">${total}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${completed}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${inProgress}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${compRate}%</span>
          </div>
        </div>

        <!-- Daily Breakdown Table -->
        <div class="card" style="margin-top:20px;padding:20px">
          <h3 style="margin:0 0 16px;font-size:16px">Daily Completion Performance</h3>
          <div style="overflow-x:auto">
            <table class="table" style="width:100%">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Total Tasks</th>
                  <th>Completed</th>
                  <th>Pending / Active</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                ${weekDates.map(dStr => {
                  const tasks = getTasksForDate(dStr);
                  const s = calculateStats(tasks, todayStr);
                  return `
                    <tr>
                      <td><strong>${getDayName(dStr)}</strong></td>
                      <td>${formatShortDate(dStr)}</td>
                      <td>${s.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${s.completed}</td>
                      <td>${s.pending + s.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${s.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${s.percent}%</span>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Priority Breakdown -->
        <div class="card" style="margin-top:20px;padding:20px">
          <h3 style="margin:0 0 14px;font-size:16px">Priority Distribution</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:12px">
            <div class="kpi-box pri-urgent" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--red-600)">Urgent</div>
              <div style="font-size:22px;font-weight:700">${priCounts.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${priCounts.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${priCounts.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${priCounts.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  /**
   * BIND HEADER & NAVIGATION EVENTS
   */
  function bindHeaderEvents() {
    // View Switchers
    const btnDaily = document.getElementById('btnViewDaily');
    const btnWeekly = document.getElementById('btnViewWeekly');
    const btnReport = document.getElementById('btnViewReport');

    if (btnDaily) btnDaily.onclick = () => { state.viewMode = 'daily'; render(); };
    if (btnWeekly) btnWeekly.onclick = () => { state.viewMode = 'weekly'; render(); };
    if (btnReport) btnReport.onclick = () => { state.viewMode = 'report'; render(); };

    // Date Navigation
    const btnPrev = document.getElementById('btnPrevDay');
    const btnNext = document.getElementById('btnNextDay');
    const btnToday = document.getElementById('btnJumpToday');
    const hiddenDateInput = document.getElementById('hiddenDateInput');
    const datePickerBadge = document.getElementById('datePickerBadge');

    if (btnPrev) btnPrev.onclick = () => {
      state.selectedDate = addDays(state.selectedDate, -1);
      render();
    };
    if (btnNext) btnNext.onclick = () => {
      state.selectedDate = addDays(state.selectedDate, 1);
      render();
    };
    if (btnToday) btnToday.onclick = () => {
      state.selectedDate = getTodayStr();
      render();
    };

    if (datePickerBadge && hiddenDateInput) {
      datePickerBadge.onclick = () => {
        try {
          if (typeof hiddenDateInput.showPicker === 'function') {
            hiddenDateInput.showPicker();
          } else {
            hiddenDateInput.focus();
          }
        } catch (e) {
          hiddenDateInput.focus();
        }
      };
      hiddenDateInput.onchange = (e) => {
        if (e.target.value) {
          state.selectedDate = e.target.value;
          render();
        }
      };
    }

    // Superadmin Team Member Select
    const admTeamSelect = document.getElementById('admTeamSelect');
    if (admTeamSelect) {
      admTeamSelect.onchange = (e) => {
        state.selectedPersonnelId = e.target.value;
        render();
      };
    }

    // Add Task Primary Modal
    const btnAdd = document.getElementById('btnOpenAddTaskModal');
    if (btnAdd) {
      btnAdd.onclick = () => {
        if (state.selectedDate < getTodayStr()) {
          flashToast('Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.', true);
          return;
        }
        openAddEditTaskModal();
      };
    }

    // Tools & Actions Dropdown
    const btnTools = document.getElementById('btnPlannerActionsMenu');
    const toolsDropdown = document.getElementById('plannerActionsDropdown');

    if (btnTools && toolsDropdown) {
      btnTools.onclick = (e) => {
        e.stopPropagation();
        toolsDropdown.classList.toggle('hidden');
      };

      document.addEventListener('click', (e) => {
        if (!toolsDropdown.contains(e.target) && e.target !== btnTools) {
          toolsDropdown.classList.add('hidden');
        }
      });
    }

    // Action Items inside dropdown
    const btnImport = document.getElementById('btnActionImport');
    if (btnImport) btnImport.onclick = () => {
      toolsDropdown?.classList.add('hidden');
      openImportModal();
    };

    const btnExportPng = document.getElementById('btnActionExportPng');
    if (btnExportPng) btnExportPng.onclick = () => {
      toolsDropdown?.classList.add('hidden');
      exportDailyImagePng();
    };

    const btnExportPdf = document.getElementById('btnActionExportPdf');
    if (btnExportPdf) btnExportPdf.onclick = () => {
      toolsDropdown?.classList.add('hidden');
      exportWeeklyPdf();
    };

    const btnAdminReport = document.getElementById('btnActionAdminReport');
    if (btnAdminReport) btnAdminReport.onclick = () => {
      toolsDropdown?.classList.add('hidden');
      openAdminReportModal();
    };

    const btnBackup = document.getElementById('btnActionBackup');
    if (btnBackup) btnBackup.onclick = () => {
      toolsDropdown?.classList.add('hidden');
      openBackupRestoreModal();
    };

    const btnSettings = document.getElementById('btnActionSettings');
    if (btnSettings) btnSettings.onclick = () => {
      toolsDropdown?.classList.add('hidden');
      openSettingsModal();
    };
  }

  /**
   * BIND VIEW EVENTS
   */
  function bindViewEvents(dayTasks) {
    // 1. Daily View Controls
    if (state.viewMode === 'daily') {
      // Filter pills
      document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.onclick = () => {
          state.filterStatus = btn.dataset.f;
          render();
        };
      });

      // Search
      const searchInp = document.getElementById('plannerTaskSearchInp');
      if (searchInp) {
        searchInp.oninput = (e) => {
          const val = e.target.value;
          state.searchQuery = val;
          const pos = e.target.selectionStart;
          render();
          const nextInp = document.getElementById('plannerTaskSearchInp');
          if (nextInp) {
            nextInp.focus();
            if (pos !== null) {
              try { nextInp.setSelectionRange(pos, pos); } catch (err) {}
            }
          }
        };
      }
      const btnClearSearch = document.getElementById('btnClearSearch');
      if (btnClearSearch) {
        btnClearSearch.onclick = () => {
          state.searchQuery = '';
          render();
        };
      }

      // Add Task button beside Today's Focus title & empty state button
      const btnFocusAddTask = document.getElementById('btnFocusAddTask');
      if (btnFocusAddTask) {
        btnFocusAddTask.onclick = () => {
          openAddEditTaskModal(null, state.selectedDate);
        };
      }
      const btnEmptyStateAddTask = document.getElementById('btnEmptyStateAddTask');
      if (btnEmptyStateAddTask) {
        btnEmptyStateAddTask.onclick = () => {
          openAddEditTaskModal(null, state.selectedDate);
        };
      }

      // Quick Add (fallback / safe no-op if quick add input is not rendered)
      const quickInp = document.getElementById('quickAddTitleInp');
      const quickDate = document.getElementById('quickAddCompletionDate');
      const quickPri = document.getElementById('quickAddPriority');
      const quickCat = document.getElementById('quickAddCategory');
      const quickBtn = document.getElementById('btnQuickAddSubmit');

      const handleQuickAdd = async () => {
        const todayStr = getTodayStr();
        if (state.selectedDate < todayStr) {
          flashToast('Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.', true);
          return;
        }

        const title = (quickInp?.value || '').trim();
        if (!title) {
          flashToast('Please enter a task title', true);
          quickInp?.focus();
          return;
        }

        // Completion date: if no completion date is added, default to that day (state.selectedDate)
        const compDate = (quickDate?.value || '').trim() || state.selectedDate;
        if (compDate < todayStr) {
          flashToast('Cannot set completion date on a previous date.', true);
          return;
        }

        try {
          const payload = {
            title,
            assignedDate: state.selectedDate,
            assignedDateStr: state.selectedDate,
            dateStr: compDate,
            completionDate: compDate,
            completionDateStr: compDate,
            dueDate: compDate,
            priority: quickPri?.value || settings.defaultPriority,
            category: quickCat?.value || 'General',
            status: 'Pending'
          };
          if (isSuperadmin) {
            const quickAssignee = document.getElementById('quickAddAssignee')?.value;
            if (quickAssignee === 'all') {
              payload.assignAll = true;
              payload.personnelId = 'all';
            } else if (quickAssignee) {
              payload.personnelId = quickAssignee;
            } else if (state.selectedPersonnelId !== 'all') {
              payload.personnelId = state.selectedPersonnelId;
            }
          }

          const created = await apiPost('/tasks', payload);
          state.tasks.unshift(created);
          flashToast('Task added to today\'s focus! ✨');
          if (quickInp) {
            quickInp.value = '';
            quickInp.focus();
          }
          render();
        } catch (err) {
          flashToast(err.message, true);
        }
      };

      if (quickBtn) quickBtn.onclick = handleQuickAdd;
      if (quickInp) quickInp.onkeydown = (e) => {
        if (e.key === 'Enter') handleQuickAdd();
      };

      // Employee group accordion collapse toggle
      document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(hdr => {
        hdr.onclick = () => {
          const empKey = hdr.dataset.empKey;
          state.collapsedEmployees[empKey] = !state.collapsedEmployees[empKey];
          render();
        };
      });

      // Employee grouping toggle
      const btnToggleEmp = document.getElementById('btnToggleEmpGrouping');
      if (btnToggleEmp) {
        btnToggleEmp.onclick = () => {
          state.groupByEmployee = !state.groupByEmployee;
          render();
        };
      }

      // Expand all employee groups
      const btnExpAll = document.getElementById('btnExpandAllEmp');
      if (btnExpAll) {
        btnExpAll.onclick = () => {
          state.collapsedEmployees = {};
          render();
        };
      }

      // Collapse all employee groups
      const btnColAll = document.getElementById('btnCollapseAllEmp');
      if (btnColAll) {
        btnColAll.onclick = () => {
          document.querySelectorAll('.ci360-emp-group-card').forEach(c => {
            const k = c.dataset.empKey;
            if (k) state.collapsedEmployees[k] = true;
          });
          render();
        };
      }

      // Empty state import
      const btnEmptyImport = document.getElementById('btnEmptyStateImport');
      if (btnEmptyImport) btnEmptyImport.onclick = () => openImportModal();
    }

    // 2. Weekly View Controls
    if (state.viewMode === 'weekly') {
      const btnPrevW = document.getElementById('btnPrevWeek');
      const btnNextW = document.getElementById('btnNextWeek');
      const btnThisW = document.getElementById('btnThisWeek');

      if (btnPrevW) btnPrevW.onclick = () => {
        state.selectedDate = addDays(state.selectedDate, -7);
        render();
      };
      if (btnNextW) btnNextW.onclick = () => {
        state.selectedDate = addDays(state.selectedDate, 7);
        render();
      };
      if (btnThisW) btnThisW.onclick = () => {
        state.selectedDate = getTodayStr();
        render();
      };

      // Column Header click to select date
      document.querySelectorAll('.day-col-header').forEach(hdr => {
        hdr.onclick = () => {
          state.selectedDate = hdr.dataset.date;
          state.viewMode = 'daily';
          render();
        };
      });

      // Quick add for specific day in weekly view
      document.querySelectorAll('[data-action="add-day"]').forEach(btn => {
        btn.onclick = () => {
          openAddEditTaskModal(null, btn.dataset.date);
        };
      });
    }

    // 3. Weekly Report Controls
    if (state.viewMode === 'report') {
      const selectEmp = document.getElementById('selectWeeklyReportEmployee');
      if (selectEmp) {
        selectEmp.onchange = (e) => {
          state.reportPersonnelId = e.target.value;
          render();
        };
      }
      const btnDl = document.getElementById('btnDownloadWeeklyPdf');
      if (btnDl) btnDl.onclick = () => exportWeeklyPdf({ personnelId: state.reportPersonnelId || 'all' });
      const btnAdminDl = document.getElementById('btnOpenAdminReportModal');
      if (btnAdminDl) btnAdminDl.onclick = () => openAdminReportModal();
    }

    // Common Task Card Actions: Toggle, Edit, Delete
    container.querySelectorAll('[data-action="toggle"]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        await toggleTaskStatus(id);
      };
    });

    container.querySelectorAll('[data-action="edit"]').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const id = el.dataset.id;
        const task = state.tasks.find(t => t._id === id);
        if (task) openAddEditTaskModal(task);
      };
    });

    container.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        await deleteTaskWithConfirm(id);
      };
    });
  }

  /**
   * TOGGLE TASK STATUS
   */
  async function toggleTaskStatus(taskId) {
    const task = state.tasks.find(t => t._id === taskId);
    if (!task) return;

    const willBeDone = task.status !== 'Completed';

    try {
      const updated = await apiPatch(`/tasks/${taskId}/toggle`, {});
      // Update local state
      const idx = state.tasks.findIndex(t => t._id === taskId);
      if (idx !== -1) {
        state.tasks[idx] = updated;
      }

      if (willBeDone) {
        if (settings.soundEnabled) playTaskChime();
        flashToast('Task marked as completed! 🎉');
      } else {
        flashToast('Task reopened as pending.');
      }

      render();
    } catch (err) {
      flashToast(err.message, true);
    }
  }

  /**
   * DELETE TASK (WITH COMPULSORY DATABASE RETENTION)
   */
  async function deleteTaskWithConfirm(taskId) {
    const task = state.tasks.find(t => t._id === taskId);
    if (!task) return;

    if (!confirm(`Are you sure you want to remove "${task.title}" from your planner?\n(It will be safely retained in the database archive.)`)) {
      return;
    }

    try {
      await apiDelete(`/tasks/${taskId}`);
      // Remove from active view
      state.tasks = state.tasks.filter(t => t._id !== taskId);
      flashToast('Task removed from planner (safely stored in database archive)');
      render();
    } catch (err) {
      flashToast(err.message, true);
    }
  }

  /**
   * ADD / EDIT TASK MODAL
   */
  function openAddEditTaskModal(existingTask = null, targetDate = null) {
    const isEdit = !!existingTask;
    const todayStr = getTodayStr();
    const initialAssignedDate = existingTask
      ? (existingTask.assignedDateStr || (existingTask.assignedDate ? new Date(existingTask.assignedDate).toISOString().slice(0, 10) : '') || existingTask.dateStr || (existingTask.createdAt ? new Date(existingTask.createdAt).toISOString().slice(0, 10) : state.selectedDate))
      : (targetDate && targetDate >= todayStr ? targetDate : (state.selectedDate >= todayStr ? state.selectedDate : todayStr));

    const initialCompDate = existingTask
      ? (existingTask.completionDateStr || (existingTask.dueDate ? new Date(existingTask.dueDate).toISOString().slice(0, 10) : initialAssignedDate))
      : (targetDate && targetDate >= todayStr ? targetDate : (state.selectedDate >= todayStr ? state.selectedDate : todayStr));

    const modalHtml = `
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${isEdit ? 'Edit Task' : 'Add New Task'}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${escapeHtml(existingTask?.title || '')}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${escapeHtml(existingTask?.description || '')}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${initialAssignedDate}" ${isEdit ? '' : `min="${todayStr}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${existingTask?.completionDateStr || (existingTask?.dueDate ? new Date(existingTask.dueDate).toISOString().slice(0, 10) : '')}" ${isEdit ? '' : `min="${todayStr}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${initialAssignedDate})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${existingTask?.priority === 'Low' ? 'selected' : ''}>Low</option>
                <option value="Medium" ${(!existingTask && settings.defaultPriority === 'Medium') || existingTask?.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="High" ${(!existingTask && settings.defaultPriority === 'High') || existingTask?.priority === 'High' ? 'selected' : ''}>High</option>
                <option value="Urgent" ${existingTask?.priority === 'Urgent' ? 'selected' : ''}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${existingTask?.status === 'Pending' || existingTask?.status === 'Todo' || !existingTask ? 'selected' : ''}>Pending</option>
                <option value="In Progress" ${existingTask?.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${existingTask?.status === 'Completed' ? 'selected' : ''}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskClientName">Client Name</label>
              <input type="text" id="taskClientName" class="input" list="clientOptions" placeholder="Enter or select client name..." value="${escapeHtml(existingTask?.clientName || (existingTask?.category && existingTask.category !== 'General' ? existingTask.category : ''))}">
              <datalist id="clientOptions">
                ${(state.clientList || []).map(c => `<option value="${escapeHtml(c.name)}">`).join('')}
                <option value="Internal CI">
                <option value="General">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${isSuperadmin ? `
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!existingTask || (!existingTask?.personnelId && !existingTask?.assignAll) ? 'selected' : ''}>Myself (Admin)</option>
                <option value="all" ${existingTask?.assignAll ? 'selected' : ''}>Assign to All Active Team Members</option>
                ${state.personnelList.map(p => {
                  const isSel = existingTask?.personnelId?._id === p._id || existingTask?.personnelId === p._id;
                  return `<option value="${p._id}" ${isSel ? 'selected' : ''}>👤 ${escapeHtml(p.name)} (${escapeHtml(p.department || p.role || 'Member')})</option>`;
                }).join('')}
              </select>
            </div>
          ` : ''}

          <!-- Co-Owners / Multiple Collaborators -->
          <div class="form-group" style="margin-top:10px;">
            <label style="display:flex;justify-content:space-between;align-items:center;">
              <span>Co-Owners / Additional People</span>
              <small style="color:var(--text-3);font-size:11px;">Add multiple collaborators for this task</small>
            </label>
            <div id="coOwnersSelectedContainer" style="display:flex;flex-wrap:wrap;gap:6px;min-height:28px;margin:4px 0 8px;"></div>
            <select id="taskCoOwnerSelect" class="input">
              <option value="">+ Add Co-Owner / Collaborator...</option>
              ${state.personnelList.map(p => `
                <option value="${p._id}">+ 👤 ${escapeHtml(p.name)} (${escapeHtml(p.department || p.role || 'Member')})</option>
              `).join('')}
            </select>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${isEdit ? `
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              ` : ''}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${isEdit ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    const modalBg = openModal(modalHtml);
    const form = modalBg.querySelector('#taskForm');
    const closeBtn = modalBg.querySelector('#btnModalClose');
    const cancelBtn = modalBg.querySelector('#btnCancelModal');
    const delTaskBtn = modalBg.querySelector('#btnModalDeleteTask');

    const closeModal = () => modalBg.remove();
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (delTaskBtn && existingTask) {
      delTaskBtn.onclick = async () => {
        closeModal();
        await deleteTaskWithConfirm(existingTask._id);
      };
    }

    // Co-Owners state and rendering
    let currentCoOwners = [];
    if (existingTask && Array.isArray(existingTask.coOwners)) {
      currentCoOwners = existingTask.coOwners.map(c => ({
        personnelId: c.personnelId?._id || c.personnelId || null,
        userId: c.userId?._id || c.userId || null,
        name: c.name || (c.personnelId?.name || ''),
        role: c.role || (c.personnelId?.role || ''),
        department: c.department || (c.personnelId?.department || '')
      })).filter(c => c.personnelId || c.name);
    }

    const coContainer = modalBg.querySelector('#coOwnersSelectedContainer');
    const coSelect = modalBg.querySelector('#taskCoOwnerSelect');

    const renderCoOwnersChips = () => {
      if (!coContainer) return;
      if (currentCoOwners.length === 0) {
        coContainer.innerHTML = '<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';
        return;
      }
      coContainer.innerHTML = currentCoOwners.map((c, i) => `
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${escapeHtml(c.name)}
          <button type="button" class="btn-remove-co" data-idx="${i}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join('');

      coContainer.querySelectorAll('.btn-remove-co').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx, 10);
          currentCoOwners.splice(idx, 1);
          renderCoOwnersChips();
        };
      });
    };

    renderCoOwnersChips();

    if (coSelect) {
      coSelect.onchange = () => {
        const selId = coSelect.value;
        if (!selId) return;
        const pers = state.personnelList.find(p => String(p._id) === String(selId));
        if (pers) {
          const already = currentCoOwners.some(c => String(c.personnelId) === String(pers._id));
          if (!already) {
            currentCoOwners.push({
              personnelId: pers._id,
              name: pers.name,
              role: pers.role || '',
              department: pers.department || ''
            });
            renderCoOwnersChips();
          }
        }
        coSelect.value = '';
      };
    }

    form.onsubmit = async (e) => {
      e.preventDefault();
      const title = modalBg.querySelector('#taskTitle').value.trim();
      const description = modalBg.querySelector('#taskDesc').value.trim();
      const assignedDate = modalBg.querySelector('#taskDate').value || initialAssignedDate;
      const compDateInput = modalBg.querySelector('#taskCompletionDate')?.value?.trim();
      // If no completion date is added, default to that day (assignedDate or state.selectedDate)
      const finalCompletionDate = compDateInput || assignedDate || state.selectedDate;
      const priority = modalBg.querySelector('#taskPriority').value;
      const status = modalBg.querySelector('#taskStatus').value;
      const clientName = (modalBg.querySelector('#taskClientName')?.value || modalBg.querySelector('#taskCategory')?.value || '').trim();
      const category = clientName || 'General';

      if (!title) {
        flashToast('Task title is required', true);
        return;
      }

      if (!isEdit && (finalCompletionDate < todayStr || assignedDate < todayStr)) {
        flashToast('Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.', true);
        return;
      }

      const payload = {
        title,
        description,
        assignedDate,
        assignedDateStr: assignedDate,
        dateStr: finalCompletionDate,
        completionDate: finalCompletionDate,
        completionDateStr: finalCompletionDate,
        dueDate: finalCompletionDate,
        startTime: '',
        dueTime: '',
        priority,
        status,
        category,
        clientName,
        coOwners: currentCoOwners
      };

      if (isSuperadmin) {
        const assignee = modalBg.querySelector('#taskAssignee')?.value;
        if (assignee === 'all') {
          payload.assignAll = true;
          payload.personnelId = 'all';
        } else if (assignee === 'me') {
          payload.personnelId = 'me';
        } else if (assignee) {
          payload.personnelId = assignee;
        }
      }

      const saveBtn = modalBg.querySelector('#btnSaveTask');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';

      try {
        if (isEdit) {
          const updated = await apiPut(`/tasks/${existingTask._id}`, payload);
          const idx = state.tasks.findIndex(t => t._id === existingTask._id);
          if (idx !== -1) state.tasks[idx] = updated;
          flashToast('Task updated successfully! ✍️');
        } else {
          const created = await apiPost('/tasks', payload);
          if (Array.isArray(created.tasks)) {
            created.tasks.forEach(t => state.tasks.unshift(t));
          } else {
            state.tasks.unshift(created);
          }
          flashToast('Task created successfully! ✨');
        }
        closeModal();
        render();
      } catch (err) {
        flashToast(err.message, true);
        saveBtn.disabled = false;
        saveBtn.textContent = isEdit ? 'Save Changes' : 'Create Task';
      }
    };
  }

  /**
   * 4. TASK IMPORT MODAL (PASTE OR .TXT FILE)
   */
  function openImportModal() {
    let parsedTasks = [];

    const modalHtml = `
      <div class="ci360-planner-modal import-modal" style="max-width:680px">
        <div class="ci360-modal-header">
          <div>
            <h3>Import Task List</h3>
            <p style="font-size:12px;color:var(--text-3);margin:2px 0 0">Paste tasks or upload a plain-text (.txt) file — one task per line.</p>
          </div>
          <button type="button" class="ci360-modal-close" id="btnImportClose">×</button>
        </div>

        <div class="ci360-modal-form">
          
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="importTargetDate" class="required">Target Date for Tasks</label>
              <input type="date" id="importTargetDate" class="input" value="${state.selectedDate < getTodayStr() ? getTodayStr() : state.selectedDate}" min="${getTodayStr()}">
            </div>

            <div class="form-group flex-1">
              <label for="importPriority">Default Priority</label>
              <select id="importPriority" class="input">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="importCategory">Default Category</label>
              <input type="text" id="importCategory" class="input" value="General">
            </div>
          </div>

          <!-- File Upload Zone -->
          <div class="ci360-dropzone" id="importDropzone">
            <input type="file" id="importFileInput" accept=".txt,text/plain" style="display:none">
            <div class="drop-icon">📄</div>
            <div class="drop-text">
              <strong>Click to upload .txt file</strong> or drag and drop here
            </div>
            <div class="drop-sub" id="importFileInfo">One task per line formatted in plain text</div>
          </div>

          <!-- Paste Textarea -->
          <div class="form-group" style="margin-top:12px">
            <label for="importTextarea">Or Paste Tasks Directly (one task per line):</label>
            <textarea id="importTextarea" class="input" rows="6" placeholder="Finalize onboarding wireframes&#10;Conduct team sync at 11am&#10;Review client contract terms&#10;Deploy frontend v1.6"></textarea>
          </div>

          <!-- Live Preview Box -->
          <div class="ci360-import-preview-wrap">
            <div class="preview-header">
              <strong id="previewCountLabel">Preview (0 tasks found)</strong>
              <span id="previewNotice" style="font-size:12px;color:var(--text-3)"></span>
            </div>
            <div class="preview-list" id="previewListArea">
              <div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">
                Paste lines or upload a file above to preview tasks before importing.
              </div>
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelImport">Cancel</button>
            <button type="button" class="ci360-btn-primary" id="btnConfirmImport" disabled>
              Import 0 Tasks
            </button>
          </div>

        </div>
      </div>
    `;

    const modalBg = openModal(modalHtml);
    const close = () => modalBg.remove();

    modalBg.querySelector('#btnImportClose').onclick = close;
    modalBg.querySelector('#btnCancelImport').onclick = close;

    const textarea = modalBg.querySelector('#importTextarea');
    const fileInput = modalBg.querySelector('#importFileInput');
    const dropzone = modalBg.querySelector('#importDropzone');
    const previewList = modalBg.querySelector('#previewListArea');
    const previewCount = modalBg.querySelector('#previewCountLabel');
    const btnSubmit = modalBg.querySelector('#btnConfirmImport');
    const fileInfo = modalBg.querySelector('#importFileInfo');

    // Parse plain text into lines, stripping bullet points
    function parseInputText(text) {
      if (!text) return [];
      const lines = text.split(/\r?\n/);
      const cleaned = [];

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        // Strip markdown checklists, numbers, bullets
        line = line.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/, '');
        line = line.replace(/^[-*•]\s+/, '');
        line = line.replace(/^\d+[\.\)]\s+/, '');
        line = line.trim();
        if (line) cleaned.push(line);
      }
      return cleaned;
    }

    function updatePreview() {
      const rawText = textarea.value;
      const titles = parseInputText(rawText);
      const targetDate = modalBg.querySelector('#importTargetDate').value;
      const existingForDay = getTasksForDate(targetDate);
      const existingTitles = new Set(existingForDay.map(t => (t.title || '').trim().toLowerCase()));

      parsedTasks = [];
      let duplicateCount = 0;

      for (const t of titles) {
        const isDup = existingTitles.has(t.toLowerCase());
        if (isDup) duplicateCount++;
        parsedTasks.push({
          title: t,
          isDuplicate: isDup
        });
      }

      previewCount.textContent = `Preview (${parsedTasks.length} ${parsedTasks.length === 1 ? 'task' : 'tasks'} found)`;
      btnSubmit.disabled = parsedTasks.length === 0;
      btnSubmit.textContent = `Import ${parsedTasks.length} ${parsedTasks.length === 1 ? 'Task' : 'Tasks'}`;

      if (parsedTasks.length === 0) {
        previewList.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>`;
        return;
      }

      previewList.innerHTML = parsedTasks.map((item, idx) => `
        <div class="preview-item ${item.isDuplicate ? 'is-duplicate' : ''}">
          <span class="preview-index">${idx + 1}.</span>
          <span class="preview-title">${escapeHtml(item.title)}</span>
          ${item.isDuplicate ? `<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>` : ''}
        </div>
      `).join('');
    }

    textarea.oninput = updatePreview;

    // File Upload handling
    dropzone.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      fileInfo.textContent = `File selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      const reader = new FileReader();
      reader.onload = (re) => {
        textarea.value = re.target.result;
        updatePreview();
      };
      reader.readAsText(file);
    };

    // Drag and drop
    dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('dragover'); };
    dropzone.ondragleave = () => dropzone.classList.remove('dragover');
    dropzone.ondrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && (file.type === 'text/plain' || file.name.endsWith('.txt'))) {
        fileInfo.textContent = `File dropped: ${file.name}`;
        const reader = new FileReader();
        reader.onload = (re) => {
          textarea.value = re.target.result;
          updatePreview();
        };
        reader.readAsText(file);
      } else {
        flashToast('Please drop a valid .txt plain-text file', true);
      }
    };

    // Execute Import
    btnSubmit.onclick = async () => {
      if (parsedTasks.length === 0) return;
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Importing...';

      const targetDate = modalBg.querySelector('#importTargetDate').value;
      if (targetDate < getTodayStr()) {
        flashToast('Cannot import tasks for previous dates. Target date must be today or later.', true);
        btnSubmit.disabled = false;
        btnSubmit.textContent = `Import ${parsedTasks.length} ${parsedTasks.length === 1 ? 'Task' : 'Tasks'}`;
        return;
      }
      const defaultPri = modalBg.querySelector('#importPriority').value;
      const defaultCat = modalBg.querySelector('#importCategory').value.trim() || 'General';

      const payload = {
        date: targetDate,
        tasks: parsedTasks.map(p => ({
          title: p.title,
          priority: defaultPri,
          category: defaultCat,
          status: 'Pending'
        }))
      };

      if (isSuperadmin && state.selectedPersonnelId !== 'all') {
        payload.personnelId = state.selectedPersonnelId;
      }

      try {
        const res = await apiPost('/tasks/bulk-import', payload);
        if (Array.isArray(res.tasks)) {
          res.tasks.forEach(t => state.tasks.unshift(t));
        }
        flashToast(`Imported ${res.importedCount} tasks successfully! (${res.skippedCount} skipped duplicates)`);
        close();
        state.selectedDate = targetDate;
        render();
      } catch (err) {
        flashToast(err.message, true);
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Retry Import';
      }
    };
  }

  /**
   * 5. DAILY PLANNER IMAGE EXPORT (PNG)
   * Client-side HTML5 Canvas generating a crisp, high-DPI image of the day's planner
   */
  async function exportDailyImagePng() {
    const dayTasks = getTasksForDate(state.selectedDate);
    const stats = calculateStats(dayTasks, getTodayStr());
    const dateFormatted = formatFullDate(state.selectedDate);

    // Canvas settings
    const scale = 2; // Retina 2x
    const width = 800;
    const headerHeight = 160;
    const statsHeight = 90;
    const itemHeight = 74;
    const footerHeight = 70;
    const contentHeight = Math.max(120, dayTasks.length * itemHeight);
    const totalHeight = headerHeight + statsHeight + contentHeight + footerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = totalHeight * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Theme Colors
    const bgApp = isDark ? '#020713' : '#F0F6FF';
    const bgCard = isDark ? '#081226' : '#FFFFFF';
    const border = isDark ? 'rgba(56, 189, 248, 0.16)' : '#E2E8F0';
    const text1 = isDark ? '#F8FAFC' : '#0F172A';
    const text2 = isDark ? '#8EA4C8' : '#475569';
    const brand = '#0070F3';
    const green = '#10B981';
    const amber = '#F59E0B';
    const red = '#EF4444';

    // Background
    ctx.fillStyle = bgApp;
    ctx.fillRect(0, 0, width, totalHeight);

    // Header Card
    ctx.fillStyle = bgCard;
    roundRect(ctx, 24, 20, width - 48, headerHeight - 30, 16);
    ctx.fill();
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Brand Label
    ctx.fillStyle = brand;
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('CI360 INTELLIGENCE SUITE · DAILY PLANNER', 44, 52);

    // Day & Date Title
    ctx.fillStyle = text1;
    ctx.font = 'bold 22px "Plus Jakarta Sans", Inter, sans-serif';
    ctx.fillText(dateFormatted, 44, 86);

    // Subtitle
    ctx.fillStyle = text2;
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText(`Planned focus list · ${stats.completed} of ${stats.total} tasks completed (${stats.percent}%)`, 44, 114);

    // Stats Ribbon Card
    const statsY = headerHeight + 6;
    ctx.fillStyle = bgCard;
    roundRect(ctx, 24, statsY, width - 48, statsHeight - 16, 12);
    ctx.fill();
    ctx.stroke();

    // Stats items
    const statColumns = [
      { label: 'TOTAL TASKS', val: String(stats.total), color: text1 },
      { label: 'COMPLETED', val: String(stats.completed), color: green },
      { label: 'IN PROGRESS', val: String(stats.inProgress), color: amber },
      { label: 'PENDING', val: String(stats.pending), color: text2 },
      { label: 'PROGRESS', val: `${stats.percent}%`, color: brand }
    ];

    const colW = (width - 48) / statColumns.length;
    statColumns.forEach((c, idx) => {
      const cx = 24 + idx * colW + 20;
      ctx.fillStyle = c.color;
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.fillText(c.val, cx, statsY + 36);

      ctx.fillStyle = text2;
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(c.label, cx, statsY + 54);
    });

    // Task Checklist Box
    const tasksY = statsY + statsHeight;
    ctx.fillStyle = bgCard;
    roundRect(ctx, 24, tasksY, width - 48, contentHeight + 10, 16);
    ctx.fill();
    ctx.stroke();

    if (dayTasks.length === 0) {
      ctx.fillStyle = text2;
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No scheduled tasks recorded for this date.', width / 2, tasksY + 60);
      ctx.textAlign = 'left';
    } else {
      dayTasks.forEach((t, i) => {
        const itemY = tasksY + 16 + i * itemHeight;
        const isDone = t.status === 'Completed';

        // Checkbox circle
        ctx.beginPath();
        ctx.arc(48, itemY + 14, 10, 0, Math.PI * 2);
        if (isDone) {
          ctx.fillStyle = green;
          ctx.fill();
          // checkmark
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(44, itemY + 14);
          ctx.lineTo(47, itemY + 17);
          ctx.lineTo(52, itemY + 11);
          ctx.stroke();
        } else {
          ctx.strokeStyle = border;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Title
        ctx.fillStyle = isDone ? text2 : text1;
        ctx.font = `${isDone ? 'normal' : '500'} 14px Inter, sans-serif`;
        const titleText = t.title.length > 55 ? t.title.slice(0, 52) + '...' : t.title;
        ctx.fillText(titleText, 70, itemY + 18);

        // Strikethrough if done
        if (isDone) {
          const m = ctx.measureText(titleText);
          ctx.strokeStyle = text2;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(70, itemY + 14);
          ctx.lineTo(70 + m.width, itemY + 14);
          ctx.stroke();
        }

        // Priority badge
        const pri = t.priority || 'Medium';
        let priBg = '#E2E8F0';
        let priTxt = '#334155';
        if (pri === 'Urgent') { priBg = '#FEE2E2'; priTxt = '#DC2626'; }
        else if (pri === 'High') { priBg = '#FEF3C7'; priTxt = '#D97706'; }
        else if (pri === 'Low') { priBg = '#ECFDF5'; priTxt = '#059669'; }

        ctx.fillStyle = priBg;
        roundRect(ctx, width - 150, itemY + 4, 60, 20, 10);
        ctx.fill();

        ctx.fillStyle = priTxt;
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(pri, width - 138, itemY + 18);

        // Metadata Row: Who added the task, due date, category, time
        const addedByName = t.createdByName || t.createdBy?.name || (t.createdBy?.email ? t.createdBy.email.split('@')[0] : '') || (t.personnelId?.name || t.userId?.name || 'Member');
        const compDateStr = t.completionDateStr || t.dateStr || '';

        const metaParts = [];
        if (addedByName) metaParts.push(`✍️ Added by: ${addedByName}`);
        if (compDateStr) metaParts.push(`📅 Due: ${formatShortDate(compDateStr)}`);
        if (t.dueTime) metaParts.push(`🕒 ${t.dueTime}`);
        if (t.category && t.category !== 'General') metaParts.push(`#${t.category}`);
        const metaStr = metaParts.join('   ·   ');

        ctx.fillStyle = text2;
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText(metaStr, 70, itemY + 36);

        // Divider
        if (i < dayTasks.length - 1) {
          ctx.strokeStyle = border;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(40, itemY + 54);
          ctx.lineTo(width - 40, itemY + 54);
          ctx.stroke();
        }
      });
    }

    // Footer
    const footY = totalHeight - 35;
    ctx.fillStyle = text2;
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`, 44, footY);

    // Download PNG
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `ci360-daily-planner-${state.selectedDate}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      flashToast('Daily Planner image exported! 🖼️');
    } catch (err) {
      flashToast('Failed to export image: ' + err.message, true);
    }
  }

  // Canvas helper
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * 6. WEEKLY REPORT & PDF EXPORT
   */
  function exportWeeklyPdf(customOptions = {}) {
    const weekDates = getWeekDates(state.selectedDate, settings.weekStartsOn);
    const startStr = formatFullDate(weekDates[0]);
    const endStr = formatFullDate(weekDates[6]);
    const todayStr = getTodayStr();

    let targetTasks = state.tasks.filter(t => {
      if (t.isDeleted === true) return false;
      const dueDateStr = t.completionDateStr || t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      const assignDateStr = t.assignedDateStr || (t.assignedDate ? new Date(t.assignedDate).toISOString().slice(0, 10) : '') || dueDateStr;

      if (customOptions.scope === 'today') {
        return dueDateStr === todayStr || assignDateStr === todayStr;
      }
      if (customOptions.scope === 'all') {
        return true;
      }
      // Default: current selected week (including multi-day in-progress tasks)
      if (t.status === 'In Progress' && assignDateStr && dueDateStr) {
        return weekDates.some(d => d >= assignDateStr && d <= dueDateStr);
      }
      return weekDates.includes(dueDateStr) || weekDates.includes(assignDateStr);
    });

    if (customOptions.personnelId && customOptions.personnelId !== 'all') {
      targetTasks = targetTasks.filter(t => {
        const pId = String(t.personnelId?._id || t.personnelId || '');
        const inCo = Array.isArray(t.coOwners) && t.coOwners.some(c => String(c.personnelId?._id || c.personnelId || c.userId?._id || c.userId || '') === String(customOptions.personnelId));
        return pId === String(customOptions.personnelId) || inCo;
      });
    }

    if (customOptions.status && customOptions.status !== 'all') {
      targetTasks = targetTasks.filter(t => t.status === customOptions.status);
    }

    const total = targetTasks.length;
    const completed = targetTasks.filter(t => t.status === 'Completed').length;
    const inProgress = targetTasks.filter(t => t.status === 'In Progress').length;
    const pending = total - completed - inProgress;
    const compRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Create a print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      flashToast('Pop-up blocked. Please allow pop-ups to print the PDF report.', true);
      return;
    }

    const reportTitle = customOptions.title || (customOptions.isAdminReport ? 'CI360 Admin Detailed Executive Report' : 'Weekly Productivity Report');
    const periodText = customOptions.scope === 'today'
      ? `Date: ${formatFullDate(todayStr)}`
      : (customOptions.scope === 'all' ? 'All Active & Historical Tasks' : `${startStr} – ${endStr}`);

    let empTag = '';
    if (customOptions.personnelId && customOptions.personnelId !== 'all') {
      const empObj = state.personnelList.find(p => String(p._id) === String(customOptions.personnelId));
      if (empObj) {
        empTag = `👤 Employee: ${empObj.name} (${empObj.department || empObj.role || 'Member'})`;
      }
    }

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(reportTitle)} — ${periodText}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.4; padding: 12px; margin: 0; }
          .header { border-bottom: 2.5px solid #0070F3; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: 800; color: #0070F3; letter-spacing: 0.6px; text-transform: uppercase; }
          h1 { margin: 4px 0 2px; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #475569; font-weight: 500; }
          .filter-tag { display: inline-block; font-size: 11px; color: #0369A1; background: #E0F2FE; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: 8px; }
          
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
          .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
          .kpi-num { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 3px; }
          .kpi-label { font-size: 10.5px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.3px; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11.5px; }
          th { text-align: left; background: #f1f5f9; padding: 8px 10px; border: 1px solid #cbd5e1; font-weight: 700; color: #334155; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3px; }
          td { padding: 8px 10px; border: 1px solid #e2e8f0; vertical-align: top; }
          tr:nth-child(even) td { background: #fbfcfe; }
          
          .client-tag { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 10.5px; border: 1px solid #a7f3d0; }
          .owner-tag { font-weight: 700; color: #1e293b; }
          .co-owner-sub { font-size: 10px; color: #0284C7; font-weight: 600; display: block; margin-top: 2px; }
          .desc-text { font-size: 10.5px; color: #475569; white-space: pre-wrap; line-height: 1.35; max-width: 280px; word-break: break-word; }
          
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
          .badge-urgent { background: #fee2e2; color: #b91c1c; }
          .badge-high { background: #fef3c7; color: #b45309; }
          .badge-med { background: #e0e7ff; color: #0369a1; }
          .badge-low { background: #ecfdf5; color: #047857; }
          
          .status-tag { display: inline-block; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 700; }
          .status-completed { background: #dcfce7; color: #15803d; }
          .status-in-progress { background: #fef3c7; color: #b45309; }
          .status-pending { background: #f1f5f9; color: #475569; }
          
          .footer { margin-top: 24px; font-size: 10.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">CI360 Intelligence Productivity Suite · Official Report</div>
            <h1>${escapeHtml(reportTitle)}</h1>
            <div class="period">
              ${periodText}
              ${empTag ? `<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${escapeHtml(empTag)}</span>` : ''}
              ${customOptions.filterSummary ? `<span class="filter-tag">${escapeHtml(customOptions.filterSummary)}</span>` : ''}
            </div>
          </div>
          <div style="text-align:right" class="no-print">
            <button onclick="window.print()" style="padding:8px 16px;background:#0070F3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;box-shadow:0 2px 4px rgba(0,112,243,0.3);">🖨️ Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${total}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${completed}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${inProgress}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#0070F3">${compRate}%</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width:11%">Date</th>
              <th style="width:13%">Client Name</th>
              <th style="width:15%">Job Owner / Assignee</th>
              <th style="width:18%">Task Title</th>
              <th style="width:23%">Description / Deliverables</th>
              <th style="width:8%">Priority</th>
              <th style="width:12%">Status</th>
            </tr>
          </thead>
          <tbody>
            ${targetTasks.length === 0 ? `
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            ` : targetTasks.map(t => {
              const dueDateStr = t.completionDateStr || t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '—');
              const assignDateStr = t.assignedDateStr || (t.assignedDate ? new Date(t.assignedDate).toISOString().slice(0, 10) : '');
              const dateDisplay = (t.status === 'In Progress' && assignDateStr && dueDateStr && assignDateStr !== dueDateStr)
                ? `${formatShortDate(assignDateStr)} ➔ ${formatShortDate(dueDateStr)}`
                : formatShortDate(dueDateStr);

              // 1. Job Owner Name (from linked job preferred person, assignments, or primary task assignee)
              const jobOwner = t.jobId?.preferredPersonName 
                || (t.jobId?.assignments && t.jobId.assignments[0]?.personId?.name) 
                || t.personnelId?.name 
                || t.userId?.name 
                || t.createdByName 
                || '—';

              // 2. Client Name
              const clientName = t.clientId?.name || t.jobId?.clientId?.name || (t.clientId?.company || '') || '—';

              // 3. Description
              const desc = t.description ? escapeHtml(t.description) : '<span style="color:#cbd5e1">—</span>';

              // 4. Co-Owners
              const coOwnerNames = Array.isArray(t.coOwners) && t.coOwners.length > 0 
                ? t.coOwners.map(c => c.name).filter(Boolean).join(', ') 
                : '';

              const pri = (t.priority || 'medium').toLowerCase();
              const badgeClass = pri === 'urgent' ? 'badge-urgent' : (pri === 'high' ? 'badge-high' : (pri === 'low' ? 'badge-low' : 'badge-med'));
              const statusClass = (t.status || 'pending').toLowerCase().replace(/\s+/g, '-');

              return `
                <tr>
                  <td><strong>${dateDisplay}</strong></td>
                  <td><span class="client-tag">${escapeHtml(clientName)}</span></td>
                  <td>
                    <span class="owner-tag">${escapeHtml(jobOwner)}</span>
                    ${coOwnerNames ? `<span class="co-owner-sub">👥 Co: ${escapeHtml(coOwnerNames)}</span>` : ''}
                  </td>
                  <td><strong>${escapeHtml(t.title)}</strong></td>
                  <td><div class="desc-text">${desc}</div></td>
                  <td><span class="badge ${badgeClass}">${escapeHtml(t.priority || 'Medium')}</span></td>
                  <td><span class="status-tag status-${statusClass}">${escapeHtml(t.status || 'Pending')}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="footer">
          <span>Generated automatically by CI360 Daily Planner & Task Manager</span>
          <span>Printed on: ${new Date().toLocaleString()}</span>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(reportHtml);
    printWindow.document.close();
    flashToast('Report generated for printing & PDF download! 📄');
  }

  /**
   * SPECIFIC REPORT FOR ADMIN MODAL (PDF & CSV EXPORT)
   */
  function openAdminReportModal() {
    const todayStr = getTodayStr();
    const weekDates = getWeekDates(state.selectedDate, settings.weekStartsOn);
    const startStr = formatShortDate(weekDates[0]);
    const endStr = formatShortDate(weekDates[6]);

    const modalHtml = `
      <div class="ci360-planner-modal" style="max-width:540px;">
        <div class="ci360-modal-header">
          <h3>📊 Download Specific Admin Report</h3>
          <button type="button" class="ci360-modal-close" id="btnAdminRepClose">×</button>
        </div>

        <div class="ci360-modal-form">
          <p style="font-size:12.5px;color:var(--text-3);margin:0 0 16px;">
            Export a comprehensive administrative report containing full <strong>Task Descriptions</strong>, <strong>Client Names</strong>, <strong>Job Owners</strong>, and <strong>Co-Owners</strong>.
          </p>

          <!-- Report Scope -->
          <div class="form-group">
            <label for="admRepScope">Date Range / Scope</label>
            <select id="admRepScope" class="input">
              <option value="week" selected>Current Week (${startStr} – ${endStr})</option>
              <option value="today">Today Only (${formatShortDate(todayStr)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all" ${(!state.reportPersonnelId || state.reportPersonnelId === 'all') ? 'selected' : ''}>👥 All Team Members</option>
              ${state.personnelList.map(p => `
                <option value="${p._id}" ${String(p._id) === String(state.reportPersonnelId) ? 'selected' : ''}>👤 ${escapeHtml(p.name)} (${escapeHtml(p.department || p.role || 'Member')})</option>
              `).join('')}
            </select>
          </div>

          <!-- Status Filter -->
          <div class="form-group">
            <label for="admRepStatus">Filter by Status</label>
            <select id="admRepStatus" class="input">
              <option value="all" selected>All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <!-- Feature Highlights Checklist -->
          <div style="background:var(--bg-hover);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:10px 14px;margin-bottom:18px;font-size:12px;color:var(--text-2);">
            <div style="font-weight:700;margin-bottom:4px;color:var(--text-1);">Included in this export:</div>
            <div>✓ <strong>Job Owner Name</strong> & Primary Assignee</div>
            <div>✓ <strong>Client Name</strong> & Account association</div>
            <div>✓ Full <strong>Task Description / Notes</strong></div>
            <div>✓ Multiple <strong>Co-Owners & Collaborators</strong></div>
            <div>✓ Priority, Category, and Real-time Status</div>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="ci360-btn-secondary" id="btnAdminRepCancel">Cancel</button>
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn small" id="btnAdminRepCsv" style="background:#059669;color:#fff;font-weight:700;border:none;border-radius:var(--r-sm);padding:8px 14px;cursor:pointer;">
                📊 Export CSV / Excel
              </button>
              <button type="button" class="ci360-btn-primary" id="btnAdminRepPdf" style="font-weight:700;padding:8px 16px;">
                📄 Download Admin PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modalBg = openModal(modalHtml);
    const closeBtn = modalBg.querySelector('#btnAdminRepClose');
    const cancelBtn = modalBg.querySelector('#btnAdminRepCancel');
    const pdfBtn = modalBg.querySelector('#btnAdminRepPdf');
    const csvBtn = modalBg.querySelector('#btnAdminRepCsv');

    const closeModal = () => modalBg.remove();
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    const getFilterValues = () => {
      const scope = modalBg.querySelector('#admRepScope')?.value || 'week';
      const personnelId = modalBg.querySelector('#admRepPersonnel')?.value || 'all';
      const status = modalBg.querySelector('#admRepStatus')?.value || 'all';
      
      let filterSummary = '';
      if (personnelId !== 'all') {
        const pers = state.personnelList.find(p => String(p._id) === String(personnelId));
        if (pers) filterSummary += `Person: ${pers.name} · `;
      }
      if (status !== 'all') {
        filterSummary += `Status: ${status}`;
      }

      return { scope, personnelId, status, filterSummary: filterSummary.replace(/\s*·\s*$/, '') };
    };

    if (pdfBtn) {
      pdfBtn.onclick = () => {
        const filters = getFilterValues();
        closeModal();
        exportWeeklyPdf({
          ...filters,
          isAdminReport: true,
          title: 'CI360 Admin Detailed Executive Task Report'
        });
      };
    }

    if (csvBtn) {
      csvBtn.onclick = () => {
        const filters = getFilterValues();
        closeModal();
        exportAdminCsv(filters);
      };
    }
  }

  /**
   * EXPORT ADMIN CSV WITH DESCRIPTION, CLIENT NAME, JOB OWNER, CO-OWNERS
   */
  function exportAdminCsv(filters = {}) {
    const weekDates = getWeekDates(state.selectedDate, settings.weekStartsOn);
    const todayStr = getTodayStr();

    let targetTasks = state.tasks.filter(t => {
      if (t.isDeleted === true) return false;
      const dueDateStr = t.completionDateStr || t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      const assignDateStr = t.assignedDateStr || (t.assignedDate ? new Date(t.assignedDate).toISOString().slice(0, 10) : '') || dueDateStr;

      if (filters.scope === 'today') {
        return dueDateStr === todayStr || assignDateStr === todayStr;
      }
      if (filters.scope === 'all') {
        return true;
      }
      if (t.status === 'In Progress' && assignDateStr && dueDateStr) {
        return weekDates.some(d => d >= assignDateStr && d <= dueDateStr);
      }
      return weekDates.includes(dueDateStr) || weekDates.includes(assignDateStr);
    });

    if (filters.personnelId && filters.personnelId !== 'all') {
      targetTasks = targetTasks.filter(t => {
        const pId = String(t.personnelId?._id || t.personnelId || '');
        const inCo = Array.isArray(t.coOwners) && t.coOwners.some(c => String(c.personnelId?._id || c.personnelId || '') === String(filters.personnelId));
        return pId === String(filters.personnelId) || inCo;
      });
    }

    if (filters.status && filters.status !== 'all') {
      targetTasks = targetTasks.filter(t => t.status === filters.status);
    }

    const headers = ['Date', 'Client Name', 'Job Owner', 'Primary Assignee', 'Co-Owners', 'Task Title', 'Description', 'Priority', 'Category', 'Status', 'Created By'];
    const rows = targetTasks.map(t => {
      const dueDateStr = t.completionDateStr || t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      const jobOwner = t.jobId?.preferredPersonName || (t.jobId?.assignments && t.jobId.assignments[0]?.personId?.name) || t.personnelId?.name || t.userId?.name || t.createdByName || '';
      const clientName = t.clientId?.name || t.jobId?.clientId?.name || t.clientId?.company || '';
      const assigneeName = t.personnelId?.name || t.userId?.name || '';
      const coOwners = Array.isArray(t.coOwners) ? t.coOwners.map(c => c.name).filter(Boolean).join('; ') : '';
      const title = t.title || '';
      const desc = t.description || '';
      const pri = t.priority || 'Medium';
      const cat = t.category || 'General';
      const st = t.status || 'Pending';
      const createdBy = t.createdByName || t.createdBy?.name || '';

      const clean = str => `"${String(str || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;

      return [
        clean(dueDateStr),
        clean(clientName),
        clean(jobOwner),
        clean(assigneeName),
        clean(coOwners),
        clean(title),
        clean(desc),
        clean(pri),
        clean(cat),
        clean(st),
        clean(createdBy)
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ci360-admin-report-${todayStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    flashToast('Admin CSV report downloaded! 📊');
  }

  /**
   * 7. BACKUP AND RESTORE MODAL
   */
  function openBackupRestoreModal() {
    const modalHtml = `
      <div class="ci360-planner-modal" style="max-width:560px">
        <div class="ci360-modal-header">
          <h3>Backup & Restore Planner</h3>
          <button type="button" class="ci360-modal-close" id="btnBackupClose">×</button>
        </div>

        <div class="ci360-modal-form">
          
          <!-- Export Section -->
          <div class="card" style="padding:16px;margin-bottom:16px;border:1px solid var(--border-sm)">
            <h4 style="margin:0 0 6px;font-size:14px;display:flex;align-items:center;gap:6px">
              <span>💾</span> Export Planner Backup
            </h4>
            <p style="font-size:12px;color:var(--text-3);margin:0 0 12px">
              Download all your planner tasks, timestamps, priorities, and descriptions as a standardized JSON backup file.
            </p>
            <button type="button" class="ci360-btn-primary" id="btnDownloadBackupJson">
              Download JSON Backup
            </button>
          </div>

          <!-- Restore Section -->
          <div class="card" style="padding:16px;border:1px solid var(--border-sm)">
            <h4 style="margin:0 0 6px;font-size:14px;display:flex;align-items:center;gap:6px">
              <span>🔄</span> Restore Planner Backup
            </h4>
            <p style="font-size:12px;color:var(--text-3);margin:0 0 12px">
              Upload a previously exported JSON backup file. Existing records will be preserved safely.
            </p>

            <input type="file" id="restoreFileInput" accept=".json,application/json" style="margin-bottom:12px">
            
            <div id="restorePreviewArea" style="display:none;background:var(--bg-elevated);padding:12px;border-radius:8px;margin-bottom:12px;font-size:12px">
              <strong id="restoreCountText">0 tasks detected in file</strong>
              <div style="margin-top:8px">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
                  <input type="radio" name="restoreMode" value="merge" checked> Merge (skip duplicates)
                </label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:4px">
                  <input type="radio" name="restoreMode" value="overwrite"> Overwrite matching tasks
                </label>
              </div>
            </div>

            <button type="button" class="ci360-btn-secondary" id="btnExecuteRestore" disabled>
              Restore Tasks
            </button>
          </div>

        </div>
      </div>
    `;

    const modalBg = openModal(modalHtml);
    const close = () => modalBg.remove();
    modalBg.querySelector('#btnBackupClose').onclick = close;

    // Export button
    const btnDl = modalBg.querySelector('#btnDownloadBackupJson');
    btnDl.onclick = async () => {
      btnDl.disabled = true;
      btnDl.textContent = 'Generating backup...';
      try {
        const data = await apiGet('/tasks/backup');
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ci360-planner-backup-${getTodayStr()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        flashToast('Planner backup downloaded successfully! 💾');
      } catch (err) {
        flashToast('Backup export failed: ' + err.message, true);
      } finally {
        btnDl.disabled = false;
        btnDl.textContent = 'Download JSON Backup';
      }
    };

    // Restore file input
    const fileInp = modalBg.querySelector('#restoreFileInput');
    const previewArea = modalBg.querySelector('#restorePreviewArea');
    const countText = modalBg.querySelector('#restoreCountText');
    const btnRestore = modalBg.querySelector('#btnExecuteRestore');
    let restoreData = null;

    fileInp.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (re) => {
        try {
          const parsed = JSON.parse(re.target.result);
          const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : (Array.isArray(parsed) ? parsed : null);
          if (!tasks || tasks.length === 0) {
            flashToast('Invalid backup file: No tasks found', true);
            return;
          }
          restoreData = tasks;
          previewArea.style.display = 'block';
          countText.textContent = `Valid backup: ${tasks.length} tasks ready to restore.`;
          btnRestore.disabled = false;
        } catch (err) {
          flashToast('Error parsing JSON backup file: ' + err.message, true);
          previewArea.style.display = 'none';
          btnRestore.disabled = true;
        }
      };
      reader.readAsText(file);
    };

    // Execute restore
    btnRestore.onclick = async () => {
      if (!restoreData || restoreData.length === 0) return;
      btnRestore.disabled = true;
      btnRestore.textContent = 'Restoring...';

      const mode = modalBg.querySelector('input[name="restoreMode"]:checked')?.value || 'merge';

      try {
        const res = await apiPost('/tasks/restore', {
          tasks: restoreData,
          mode
        });
        flashToast(`Restored ${res.restoredCount} tasks! (${res.skippedCount} skipped) ✨`);
        close();
        await loadData();
      } catch (err) {
        flashToast('Restore failed: ' + err.message, true);
        btnRestore.disabled = false;
        btnRestore.textContent = 'Retry Restore';
      }
    };
  }

  /**
   * 8. WORKSPACE SETTINGS MODAL
   */
  function openSettingsModal() {
    const modalHtml = `
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${escapeHtml(settings.displayName || 'Daily Planner')}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${settings.weekStartsOn === 1 ? 'selected' : ''}>Monday</option>
                <option value="0" ${settings.weekStartsOn === 0 ? 'selected' : ''}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${escapeHtml(settings.timezone || 'Asia/Kolkata')}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${settings.defaultPriority === 'Low' ? 'selected' : ''}>Low</option>
                <option value="Medium" ${settings.defaultPriority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="High" ${settings.defaultPriority === 'High' ? 'selected' : ''}>High</option>
                <option value="Urgent" ${settings.defaultPriority === 'Urgent' ? 'selected' : ''}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${settings.density === 'comfortable' ? 'selected' : ''}>Comfortable</option>
                <option value="compact" ${settings.density === 'compact' ? 'selected' : ''}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${settings.soundEnabled ? 'checked' : ''}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <!-- Desktop & Laptop Notifications -->
          <div class="form-group" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
            <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:var(--text-1);">🔔 Desktop & Laptop Notifications (Brave & All Browsers)</div>
            <div style="font-size:12px;color:var(--text-3);margin-bottom:8px;">Receive real-time popups on your laptop and browser when tasks are assigned, dates change, and due alerts arrive.</div>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setNotifEnabled" ${(typeof window !== 'undefined' && localStorage.getItem('ci360_notif_enabled') !== 'false' && typeof Notification !== 'undefined' && Notification.permission === 'granted') ? 'checked' : ''}>
              <span>Enable Browser & Laptop Notifications</span>
            </label>
            <div style="margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn ghost small" id="btnPlannerTestNotif" style="padding:4px 10px;font-size:11.5px;">🔔 Send Test Notification</button>
              <span style="font-size:11px;color:var(--text-3);" id="plannerNotifStatusLabel">${(typeof Notification !== 'undefined' && Notification.permission === 'granted') ? '🟢 Active on this laptop' : (typeof Notification !== 'undefined' && Notification.permission === 'denied' ? '🔴 Blocked in browser' : '⚪ Ready to enable')}</span>
            </div>
            <div style="margin-top:6px;font-size:11px;color:var(--text-3);">
              💡 <strong>Brave, Chrome & Edge Tip:</strong> Notifications show in Windows Action Center. In Brave, ensure notifications are allowed under the site shield/lock icon in the URL bar.
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `;

    const modalBg = openModal(modalHtml);
    const close = () => modalBg.remove();

    modalBg.querySelector('#btnSettingsClose').onclick = close;
    modalBg.querySelector('#btnCancelSettings').onclick = close;

    const testBtn = modalBg.querySelector('#btnPlannerTestNotif');
    if (testBtn) {
      testBtn.onclick = async () => {
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
        const notifChk = modalBg.querySelector('#setNotifEnabled');
        if (notifChk) notifChk.checked = true;
        const statusLbl = modalBg.querySelector('#plannerNotifStatusLabel');
        if (statusLbl) statusLbl.textContent = '🟢 Active on this laptop';
        await triggerSystemNotification({
          title: 'CI360 Planner Alert 🔔',
          message: 'Laptop & browser notifications are active and ready!',
          id: 'ci360-planner-test-' + Date.now()
        });
        flashToast('Test notification sent to your laptop/browser! 🔔');
      };
    }

    modalBg.querySelector('#settingsForm').onsubmit = (e) => {
      e.preventDefault();
      settings.displayName = modalBg.querySelector('#setDisplayName').value.trim() || 'Daily Planner';
      settings.weekStartsOn = Number(modalBg.querySelector('#setWeekStart').value);
      settings.defaultPriority = modalBg.querySelector('#setDefaultPriority').value;
      settings.density = modalBg.querySelector('#setDensity').value;
      settings.soundEnabled = modalBg.querySelector('#setSound').checked;

      const notifVal = modalBg.querySelector('#setNotifEnabled')?.checked;
      localStorage.setItem('ci360_notif_enabled', notifVal ? 'true' : 'false');
      if (notifVal && 'Notification' in window && Notification.permission === 'default') {
        requestNotificationPermission();
      }

      saveSettings(settings);
      flashToast('Planner preferences saved! ⚙️');
      close();
      render();
    };
  }
}

/**
 * PLANNER CSS INJECTION
 * Injects elegant Dayfolio-inspired styling that respects CI360 design tokens & dark mode
 */
function ensurePlannerStyles() {
  if (document.getElementById('ci360-planner-styles')) return;

  const style = document.createElement('style');
  style.id = 'ci360-planner-styles';
  style.textContent = `
    /* CI360 Dayfolio Planner Module Styles */
    .ci360-planner-wrap,
    .ci360-planner-wrap * {
      box-sizing: border-box !important;
    }

    .ci360-planner-wrap {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 0 60px !important;
      box-sizing: border-box !important;
      font-family: var(--font-sans);
      color: var(--text-1);
    }

    .ci360-planner-content,
    .ci360-today-focus-section,
    .ci360-tasks-container,
    .ci360-task-list,
    .ci360-quick-add-bar,
    .ci360-progress-summary-card,
    .ci360-planner-nav-strip,
    .ci360-planner-header {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    /* Header (Hero Card) */
    .ci360-planner-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      padding: 18px 24px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(224, 242, 254, 0.75) 0%, rgba(240, 249, 255, 0.88) 45%, rgba(255, 255, 255, 0.95) 100%);
      border: 1px solid rgba(186, 230, 253, 0.7);
      box-shadow: 0 4px 20px rgba(186, 230, 253, 0.28);
      flex-wrap: wrap;
    }
    [data-theme="dark"] .ci360-planner-header {
      background: linear-gradient(135deg, rgba(6, 24, 60, 0.85) 0%, rgba(5, 15, 38, 0.95) 100%);
      border: 1px solid rgba(56, 189, 248, 0.25);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(125, 211, 252, 0.18);
    }
    .ci360-planner-header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .ci360-planner-hero-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 112, 243, 0.12);
      border: 1px solid rgba(0, 112, 243, 0.2);
      color: #0070F3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.15);
    }
    [data-theme="dark"] .ci360-planner-hero-icon {
      background: rgba(0, 112, 243, 0.2);
      border-color: rgba(56, 189, 248, 0.35);
      color: #38BDF8;
      box-shadow: 0 0 18px rgba(0, 112, 243, 0.35);
    }
    .ci360-planner-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-planner-heading {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-1);
      margin: 0;
      font-family: var(--font-heading);
    }
    .ci360-planner-subheading {
      font-size: 13.5px;
      color: var(--text-3);
      margin: 0;
    }

    /* Header Actions */
    .ci360-planner-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .ci360-view-switcher {
      display: flex;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 3px;
      gap: 2px;
      box-shadow: var(--shadow-xs);
    }
    .ci360-switch-btn {
      background: transparent;
      border: none;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ci360-switch-btn:hover {
      color: var(--text-1);
      background: var(--bg-hover);
    }
    .ci360-switch-btn.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
    }
    [data-theme="dark"] .ci360-switch-btn.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }

    .ci360-btn-primary {
      background: #0070F3;
      color: #FFFFFF;
      border: none;
      padding: 8px 18px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
      transition: all var(--t-fast);
    }
    .ci360-btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.45);
    }
    [data-theme="dark"] .ci360-btn-primary {
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }
    .ci360-btn-secondary {
      background: var(--bg-card);
      color: var(--text-2);
      border: 1px solid var(--border-sm);
      padding: 8px 14px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all var(--t-fast);
    }
    .ci360-btn-secondary:hover {
      background: var(--bg-hover);
      color: var(--text-1);
      border-color: var(--border-md);
    }

    /* Dropdown */
    .ci360-dropdown-wrap {
      position: relative;
    }
    .ci360-dropdown-menu {
      position: absolute;
      right: 0;
      top: 100%;
      margin-top: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-lg);
      min-width: 260px;
      z-index: 100;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-dropdown-menu.hidden {
      display: none !important;
    }
    .ci360-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: transparent;
      border: none;
      border-radius: var(--r-sm);
      text-align: left;
      cursor: pointer;
      color: var(--text-1);
      transition: background var(--t-fast);
      width: 100%;
    }
    .ci360-menu-item:hover {
      background: var(--bg-hover);
    }
    .ci360-menu-item .icon {
      font-size: 16px;
      width: 24px;
      text-align: center;
    }
    .ci360-menu-item .meta strong {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
    }
    .ci360-menu-item .meta small {
      display: block;
      font-size: 11px;
      color: var(--text-3);
    }
    .ci360-dropdown-divider {
      height: 1px;
      background: var(--border-xs);
      margin: 4px 0;
    }

    /* Date Nav Strip */
    .ci360-planner-nav-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 8px 16px;
      flex-wrap: wrap;
      box-shadow: var(--shadow-xs);
    }
    .ci360-date-nav-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-nav-arrow {
      background: transparent;
      border: 1px solid var(--border-sm);
      width: 32px;
      height: 32px;
      border-radius: var(--r-md);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-2);
      transition: all var(--t-fast);
    }
    .ci360-nav-arrow:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .ci360-date-picker-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: var(--r-md);
      background: var(--bg-hover);
      border: 1px solid var(--border-sm);
      cursor: pointer;
      position: relative;
      user-select: none;
    }
    .ci360-date-picker-badge:hover {
      border-color: var(--accent);
    }
    .ci360-date-picker-badge .date-text {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .ci360-hidden-date-input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      width: 1px;
      height: 1px;
    }
    .ci360-today-btn {
      background: transparent;
      border: 1px solid var(--border-sm);
      padding: 5px 14px;
      border-radius: var(--r-full);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .ci360-today-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .ci360-today-btn.is-current {
      background: #E0F2FE;
      color: #0070F3;
      border-color: #BAE6FD;
    }
    [data-theme="dark"] .ci360-today-btn.is-current {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .ci360-team-filter-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-label-inline {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
    }
    .ci360-select-inline {
      padding: 6px 12px;
      font-size: 12.5px;
      border-radius: var(--r-md);
      border: 1px solid var(--border-sm);
      background: var(--bg-app);
      color: var(--text-1);
      cursor: pointer;
    }

    /* Progress Summary Card */
    .ci360-progress-summary-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-xl);
      padding: 16px 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    [data-theme="dark"] .ci360-progress-summary-card {
      background: rgba(8, 18, 38, 0.7);
      border-color: rgba(56, 189, 248, 0.16);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    }
    .ci360-summary-main {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .ci360-ring-stat {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 14px;
      background: var(--bg-app);
      border: 1px solid var(--border-xs);
      border-radius: var(--r-lg);
    }
    [data-theme="dark"] .ci360-ring-stat {
      background: rgba(10, 22, 48, 0.6);
      border-color: rgba(56, 189, 248, 0.14);
    }
    .ci360-circular-progress {
      position: relative;
      width: 64px;
      height: 64px;
    }
    .ci360-circular-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ci360-circular-svg .circle-bg {
      fill: none;
      stroke: var(--border-sm);
      stroke-width: 3.5;
    }
    .ci360-circular-svg .circle-fill {
      fill: none;
      stroke: #0070F3;
      stroke-width: 3.5;
      stroke-linecap: round;
      transition: stroke-dasharray 0.4s ease;
    }
    [data-theme="dark"] .ci360-circular-svg .circle-fill {
      stroke: #38BDF8;
    }
    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ring-num {
      font-size: 14px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1;
    }
    .ring-label {
      font-size: 9.5px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-3);
      margin-top: 2px;
    }

    .ci360-summary-kpis {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      flex-wrap: wrap;
    }
    .kpi-box {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #FFFFFF;
      padding: 12px 18px;
      border-radius: var(--r-lg);
      flex: 1;
      min-width: 140px;
      border: 1px solid var(--border-sm);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .kpi-box {
      background: rgba(8, 18, 38, 0.85);
      border-color: rgba(56, 189, 248, 0.16);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .kpi-box:hover {
      transform: translateY(-1px);
    }
    .kpi-icon-wrap {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-icon-wrap.total {
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
    }
    .kpi-icon-wrap.completed {
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
    }
    .kpi-icon-wrap.in-prog {
      background: rgba(245, 158, 11, 0.1);
      color: #F59E0B;
    }
    .kpi-icon-wrap.pending {
      background: rgba(139, 92, 246, 0.1);
      color: #8B5CF6;
    }
    .kpi-icon-wrap.overdue {
      background: rgba(239, 68, 68, 0.1);
      color: #EF4444;
    }
    .kpi-text-wrap {
      display: flex;
      flex-direction: column;
    }
    .kpi-box .kpi-num {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.1;
    }
    .kpi-box .kpi-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      margin-top: 1px;
    }
    .kpi-box.completed .kpi-num { color: var(--green-500); }
    .kpi-box.in-progress .kpi-num { color: var(--amber-500); }
    .kpi-box.overdue {
      background: rgba(239, 68, 68, 0.08);
      border-color: rgba(239, 68, 68, 0.2);
    }
    .kpi-box.overdue .kpi-num { color: var(--red-500); }

    .ci360-linear-progress-wrap {
      width: 100%;
      height: 4px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
      margin-top: 10px;
    }
    .ci360-linear-bar {
      height: 100%;
      background: linear-gradient(90deg, #0070F3, #10B981);
      border-radius: var(--r-full);
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Today Focus Section */
    .ci360-today-focus-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ci360-focus-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ci360-focus-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ci360-focus-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--text-1);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-focus-title::before {
      content: '';
      width: 3.5px;
      height: 18px;
      border-radius: 2px;
      background: #0070F3;
      display: inline-block;
    }
    .ci360-task-count-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: var(--r-full);
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
    }
    [data-theme="dark"] .ci360-task-count-badge {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
    }

    .ci360-focus-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ci360-filter-pills {
      display: flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: none;
      padding: 0;
    }
    .filter-pill {
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid var(--border-sm);
      padding: 5px 12px;
      border-radius: var(--r-full);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .filter-pill {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(56, 189, 248, 0.14);
      color: #8EA4C8;
    }
    .filter-pill:hover {
      color: var(--text-1);
    }
    .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      border-color: #0070F3 !important;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
    }
    [data-theme="dark"] .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      border-color: #0070F3 !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }
    .filter-pill.overdue.active {
      background: rgba(239, 68, 68, 0.1);
      color: var(--red-500);
    }

    .ci360-search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 6px 12px;
      min-width: 180px;
      position: relative;
    }
    .ci360-search-box input {
      border: none;
      background: transparent;
      font-size: 12.5px;
      color: var(--text-1);
      outline: none;
      width: 100%;
    }
    .clear-search-btn {
      background: transparent;
      border: none;
      font-size: 14px;
      color: var(--text-4);
      cursor: pointer;
      line-height: 1;
    }

    /* Quick-Add Bar */
    .ci360-quick-add-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 10px 16px;
      box-shadow: var(--shadow-xs);
      flex-wrap: wrap;
      transition: border-color var(--t-fast);
    }
    .ci360-quick-add-bar:focus-within {
      border-color: var(--accent);
      border-style: solid;
    }
    .ci360-quick-add-input-wrap {
      flex: 1;
      min-width: 240px;
    }
    .ci360-quick-input {
      width: 100%;
      border: none;
      background: transparent;
      font-size: 14px;
      color: var(--text-1);
      outline: none;
      font-family: inherit;
    }
    .ci360-quick-input::placeholder {
      color: var(--text-4);
    }
    .ci360-quick-add-meta {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-quick-select {
      background: var(--bg-app);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-sm);
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-2);
      outline: none;
      cursor: pointer;
    }
    .ci360-quick-add-btn {
      background: #0070F3;
      color: #FFFFFF;
      border: none;
      border-radius: var(--r-md);
      padding: 7px 16px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all var(--t-fast);
      box-shadow: 0 2px 6px rgba(0, 112, 243, 0.3);
    }
    .ci360-quick-add-btn:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
    }

    /* Task List & Cards */
    .ci360-task-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ci360-task-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-left: 3.5px solid #0070F3;
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .ci360-task-card {
      background: rgba(8, 18, 38, 0.85);
      border-color: rgba(56, 189, 248, 0.16);
      border-left: 3.5px solid #0070F3;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .ci360-task-card:hover {
      box-shadow: var(--shadow-sm);
      border-color: var(--border-md);
      transform: translateY(-1px);
    }
    .ci360-task-card.is-completed {
      background: var(--bg-elevated);
      opacity: 0.75;
      border-left-color: var(--green-500);
    }
    .ci360-task-card.is-overdue {
      border-left: 3.5px solid var(--red-500) !important;
    }

    /* Checkbox */
    .ci360-task-check {
      background: transparent;
      border: 2px solid var(--border-md);
      width: 22px;
      height: 22px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      transition: all var(--t-fast);
      margin-top: 2px;
      flex-shrink: 0;
    }
    .ci360-task-check:hover {
      border-color: var(--accent);
    }
    .ci360-task-check.checked {
      background: var(--green-500);
      border-color: var(--green-500);
      color: #FFFFFF;
      transform: scale(1.05);
    }
    .ci360-task-check .check-svg {
      stroke: currentColor;
    }

    /* Task Body */
    .ci360-task-body {
      flex: 1;
      min-width: 0;
    }
    .ci360-task-title-row {
      margin-bottom: 4px;
    }
    .ci360-task-title {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-1);
      line-height: 1.35;
      word-break: break-word;
    }
    .ci360-task-card.is-completed .ci360-task-title {
      text-decoration: line-through;
      color: var(--text-4);
    }
    .ci360-task-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
      margin-bottom: 8px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .ci360-task-badges {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    /* Badges */
    .ci360-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      line-height: 1.4;
    }
    .ci360-badge .badge-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
    }
    /* Priority Badges */
    .ci360-badge.pri-urgent { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.pri-high { background: rgba(245, 158, 11, 0.14); color: var(--amber-600); }
    .ci360-badge.pri-medium { background: rgba(59, 130, 246, 0.12); color: var(--blue-600); }
    .ci360-badge.pri-low { background: rgba(16, 185, 129, 0.12); color: var(--green-600); }

    /* Status Badges */
    .ci360-badge.status-completed { background: rgba(16, 185, 129, 0.12); color: var(--green-600); }
    .ci360-badge.status-in-progress { background: rgba(245, 158, 11, 0.14); color: var(--amber-600); }
    .ci360-badge.status-pending { background: var(--bg-hover); color: var(--text-3); }

    .ci360-badge.category-badge { background: var(--bg-hover); color: var(--text-2); font-weight: 500; }
    .ci360-badge.time-badge { background: var(--bg-hover); color: var(--text-2); font-weight: 500; }
    .ci360-badge.completion-badge {
      background: rgba(37, 99, 235, 0.12);
      color: #2563EB;
      font-weight: 700;
      border: 1px solid rgba(37, 99, 235, 0.25);
    }
    [data-theme="dark"] .ci360-badge.completion-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #93C5FD;
      border-color: rgba(59, 130, 246, 0.35);
    }
    .ci360-badge.creator-badge {
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
      font-weight: 600;
      border: 1px solid rgba(0, 112, 243, 0.2);
    }
    [data-theme="dark"] .ci360-badge.creator-badge {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: #E0F2FE; color: #0070F3; }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(0, 112, 243, 0.2); color: #38BDF8; }

    .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.14);
      color: #D97706;
      font-weight: 700;
      border: 1px solid rgba(245, 158, 11, 0.35);
    }
    [data-theme="dark"] .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.22);
      color: #FBBF24;
      border-color: rgba(245, 158, 11, 0.45);
    }

    /* Task Actions */
    .ci360-task-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      opacity: 0.6;
      transition: opacity var(--t-fast);
    }
    .ci360-task-card:hover .ci360-task-actions {
      opacity: 1;
    }
    .task-action-btn {
      background: transparent;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-3);
      transition: all var(--t-fast);
    }
    .task-action-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .task-action-btn.delete:hover {
      color: var(--red-500);
      background: rgba(239, 68, 68, 0.1);
    }

    /* Empty State */
    .ci360-empty-focus-state {
      text-align: center;
      padding: 48px 24px;
      background: var(--bg-card);
      border: 1px dashed var(--border-sm);
      border-radius: var(--r-xl);
    }
    .ci360-empty-focus-state .empty-icon-wrap {
      font-size: 32px;
      margin-bottom: 12px;
    }
    .ci360-empty-focus-state h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0 0 6px;
    }
    .ci360-empty-focus-state p {
      font-size: 13px;
      color: var(--text-3);
      max-width: 420px;
      margin: 0 auto;
    }

    /* Weekly Grid Layout */
    .ci360-weekly-planner-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ci360-week-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ci360-week-banner .week-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0 0 2px;
    }
    .ci360-week-banner .week-range-text {
      font-size: 13px;
      color: var(--text-3);
    }
    .ci360-week-banner .week-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ci360-week-grid.modern-grid {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 16px !important;
      align-items: stretch !important;
    }
    @media (max-width: 1200px) {
      .ci360-week-grid.modern-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 640px) {
      .ci360-week-grid.modern-grid {
        grid-template-columns: 1fr !important;
      }
    }

    .ci360-weekly-day-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-height: 270px;
      transition: all 0.2s ease;
    }
    [data-theme="dark"] .ci360-weekly-day-card {
      background: #111827;
      border-color: #1f2937;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    .ci360-weekly-day-card:hover {
      box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06);
      border-color: var(--border-md, #cbd5e1);
    }

    /* Header */
    .weekly-day-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      background: transparent;
    }
    [data-theme="dark"] .weekly-day-header {
      border-bottom-color: rgba(255, 255, 255, 0.05);
    }
    .weekly-day-header.today-banner {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%) !important;
      color: #ffffff !important;
      border-bottom: none !important;
    }

    /* Date Badge Box */
    .day-badge-box {
      width: 44px;
      height: 48px;
      border-radius: 12px;
      background: #eff2fe;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    [data-theme="dark"] .day-badge-box {
      background: #1e293b;
    }
    .weekly-day-header.today-banner .day-badge-box {
      background: rgba(0, 0, 0, 0.28) !important;
    }
    .day-badge-name {
      font-size: 11px;
      font-weight: 700;
      color: #4f46e5;
      line-height: 1;
      margin-bottom: 2px;
    }
    .weekly-day-header.today-banner .day-badge-name {
      color: rgba(255, 255, 255, 0.9) !important;
    }
    .day-badge-num {
      font-size: 17px;
      font-weight: 800;
      color: #1e293b;
      line-height: 1;
    }
    [data-theme="dark"] .day-badge-num {
      color: #f8fafc;
    }
    .weekly-day-header.today-banner .day-badge-num {
      color: #ffffff !important;
    }

    /* Day Title & Progress Row */
    .day-header-meta {
      flex: 1;
      min-width: 0;
    }
    .day-full-name {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    [data-theme="dark"] .day-full-name {
      color: #f8fafc;
    }
    .weekly-day-header.today-banner .day-full-name {
      color: #ffffff !important;
    }
    .day-header-stats-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .day-done-label {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }
    .weekly-day-header.today-banner .day-done-label {
      color: rgba(255, 255, 255, 0.85) !important;
    }
    .day-progress-track {
      height: 4px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      width: 90px;
      max-width: 100%;
    }
    [data-theme="dark"] .day-progress-track {
      background: #334155;
    }
    .weekly-day-header.today-banner .day-progress-track {
      background: rgba(255, 255, 255, 0.3) !important;
    }
    .day-progress-bar {
      height: 100%;
      background: #4f46e5;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .weekly-day-header.today-banner .day-progress-bar {
      background: #ffffff !important;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    /* Action Clipboard Button */
    .day-action-clipboard-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #4f46e5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    [data-theme="dark"] .day-action-clipboard-btn {
      background: #1e293b;
      border-color: #334155;
      color: #818cf8;
    }
    .day-action-clipboard-btn:hover {
      background: #eff2fe;
      border-color: #c7d2fe;
      transform: scale(1.05);
    }
    .weekly-day-header.today-banner .day-action-clipboard-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: #ffffff !important;
    }
    .weekly-day-header.today-banner .day-action-clipboard-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
    }

    /* Day Tasks List */
    .weekly-day-tasks {
      padding: 12px 14px 14px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      overflow-y: auto;
      max-height: 360px;
    }
    .weekly-empty-state {
      padding: 24px 0;
      text-align: center;
      font-size: 12px;
      color: var(--text-4, #94a3b8);
    }
    .weekly-task-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 0;
      font-size: 13px;
    }
    .weekly-check-btn {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #cbd5e1;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      padding: 0;
      transition: all 0.15s ease;
    }
    [data-theme="dark"] .weekly-check-btn {
      border-color: #475569;
    }
    .weekly-check-btn.checked {
      background: #22c55e !important;
      border-color: #22c55e !important;
      color: #ffffff !important;
    }
    .weekly-check-btn:hover:not(.checked) {
      border-color: #4f46e5;
    }
    .weekly-task-title {
      flex: 1;
      min-width: 0;
      font-weight: 500;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    [data-theme="dark"] .weekly-task-title {
      color: #e2e8f0;
    }
    .weekly-task-title.strike {
      text-decoration: line-through;
      color: var(--text-4, #94a3b8);
      opacity: 0.65;
    }
    .weekly-pri-badge {
      font-size: 10.5px;
      font-weight: 700;
      border-radius: 5px;
      padding: 1.5px 7px;
      flex-shrink: 0;
    }
    .weekly-pri-badge.pri-medium {
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #dbeafe;
    }
    .weekly-pri-badge.pri-urgent,
    .weekly-pri-badge.pri-high {
      background: #fef2f2;
      color: #ef4444;
      border: 1px solid #fee2e2;
    }
    .weekly-pri-badge.pri-low {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #dcfce7;
    }
    [data-theme="dark"] .weekly-pri-badge.pri-medium {
      background: rgba(37, 99, 235, 0.15);
      color: #60a5fa;
      border-color: rgba(37, 99, 235, 0.3);
    }
    [data-theme="dark"] .weekly-pri-badge.pri-urgent,
    [data-theme="dark"] .weekly-pri-badge.pri-high {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }
    [data-theme="dark"] .weekly-pri-badge.pri-low {
      background: rgba(22, 163, 74, 0.15);
      color: #4ade80;
      border-color: rgba(22, 163, 74, 0.3);
    }

    /* 8th Card: Week at a Glance */
    .week-glance-card {
      background: linear-gradient(180deg, rgba(238, 242, 255, 0.6) 0%, rgba(255, 255, 255, 1) 40%) !important;
      padding: 18px 16px !important;
    }
    [data-theme="dark"] .week-glance-card {
      background: linear-gradient(180deg, rgba(30, 27, 75, 0.3) 0%, #111827 40%) !important;
    }
    .glance-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .glance-icon {
      font-size: 18px;
    }
    .glance-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0;
    }
    [data-theme="dark"] .glance-title {
      color: #f8fafc;
    }
    .glance-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }
    .glance-metric-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    [data-theme="dark"] .glance-metric-item {
      background: #1e293b;
      border-color: #334155;
    }
    .glance-m-icon {
      font-size: 16px;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eff2fe;
      flex-shrink: 0;
    }
    .glance-m-data {
      display: flex;
      flex-direction: column;
    }
    .glance-m-val {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-1, #0f172a);
      line-height: 1.1;
    }
    [data-theme="dark"] .glance-m-val {
      color: #f8fafc;
    }
    .glance-m-lbl {
      font-size: 11px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }
    .glance-footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .glance-progress-track {
      height: 6px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
    }
    [data-theme="dark"] .glance-progress-track {
      background: #334155;
    }
    .glance-progress-bar {
      height: 100%;
      background: #4f46e5;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .glance-progress-caption {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      font-weight: 600;
      text-align: center;
    }
    .mini-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-1);
      line-height: 1.25;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mini-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 3px;
    }
    .mini-pri {
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
    }
    .mini-pri.pri-urgent { background: rgba(239, 68, 68, 0.15); color: var(--red-600); }
    .mini-pri.pri-high { background: rgba(245, 158, 11, 0.18); color: var(--amber-600); }
    .mini-pri.pri-medium { background: rgba(59, 130, 246, 0.15); color: var(--blue-600); }
    .mini-pri.pri-low { background: rgba(16, 185, 129, 0.15); color: var(--green-600); }
    .mini-time {
      font-size: 9.5px;
      color: var(--text-3);
    }
    .day-col-add-btn {
      margin-top: 8px;
      background: transparent;
      border: 1px dashed var(--border-sm);
      border-radius: var(--r-sm);
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
      width: 100%;
    }
    .day-col-add-btn:hover {
      background: var(--bg-hover);
      color: var(--accent);
      border-color: var(--accent);
    }

    /* Report Section */
    .ci360-report-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .ci360-report-kpis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
    }

    /* Modal Styling */
    .ci360-planner-modal {
      width: 100%;
      max-width: 580px;
      background: var(--bg-card);
      border-radius: var(--r-xl);
      padding: 24px;
      box-shadow: var(--shadow-xl);
      color: var(--text-1);
    }
    .ci360-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .ci360-modal-header h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0;
    }
    .ci360-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      color: var(--text-4);
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
    }
    .ci360-modal-close:hover {
      color: var(--text-1);
    }
    .ci360-modal-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    @media (max-width: 600px) {
      .form-row { flex-direction: column; }
    }
    .flex-1 { flex: 1; }
    .form-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2);
      margin-bottom: 4px;
    }
    .form-group label.required::after {
      content: ' *';
      color: var(--red-500);
    }
    .ci360-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
      padding-top: 14px;
      border-top: 1px solid var(--border-xs);
    }

    /* Dropzone & Import Preview */
    .ci360-dropzone {
      border: 2px dashed var(--border-md);
      border-radius: var(--r-lg);
      padding: 24px;
      text-align: center;
      cursor: pointer;
      background: var(--bg-app);
      transition: all var(--t-fast);
    }
    .ci360-dropzone:hover, .ci360-dropzone.dragover {
      border-color: var(--accent);
      background: var(--brand-50);
    }
    [data-theme="dark"] .ci360-dropzone:hover, [data-theme="dark"] .ci360-dropzone.dragover {
      background: rgba(0, 112, 243, 0.15);
    }
    .ci360-dropzone .drop-icon {
      font-size: 28px;
      margin-bottom: 6px;
    }
    .ci360-dropzone .drop-text {
      font-size: 13px;
      color: var(--text-2);
    }
    .ci360-dropzone .drop-sub {
      font-size: 11px;
      color: var(--text-4);
      margin-top: 2px;
    }

    .ci360-import-preview-wrap {
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      background: var(--bg-app);
      overflow: hidden;
    }
    .ci360-import-preview-wrap .preview-header {
      padding: 8px 12px;
      background: var(--bg-hover);
      border-bottom: 1px solid var(--border-xs);
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ci360-import-preview-wrap .preview-list {
      max-height: 180px;
      overflow-y: auto;
      padding: 6px 12px;
    }
    .preview-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 12px;
      border-bottom: 1px solid var(--border-xs);
    }
    .preview-item.is-duplicate {
      opacity: 0.6;
    }
    .preview-index {
      color: var(--text-4);
      font-size: 11px;
      width: 20px;
    }
    .preview-title {
      flex: 1;
      color: var(--text-1);
    }

    /* Compact Density */
    .ci360-planner-wrap.is-compact .ci360-task-card {
      padding: 8px 12px;
      gap: 10px;
    }
    .ci360-planner-wrap.is-compact .ci360-task-title {
      font-size: 13.5px;
    }
    .ci360-planner-wrap.is-compact .ci360-progress-summary-card {
      padding: 12px 18px;
    }
    .ci360-planner-wrap.is-compact .kpi-box {
      padding: 6px 12px;
      min-width: 80px;
    }

    /* Past Date Banner */
    .ci360-past-date-banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      border-radius: var(--r-lg);
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.25);
      margin-bottom: 8px;
    }
    .past-banner-icon {
      font-size: 22px;
      flex-shrink: 0;
    }
    .past-banner-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .past-banner-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .past-banner-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
    }
    .day-col-locked-note {
      text-align: center;
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-4);
      background: var(--bg-hover);
      border-radius: var(--r-sm);
      margin-top: 8px;
    }
    .ci360-btn-primary.is-locked-past {
      opacity: 0.75;
      background: var(--text-4);
      cursor: not-allowed;
    }

    /* Admin Employee Grouping & Collapsible Cards */
    .ci360-emp-groups-container {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .ci360-emp-group-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      overflow: hidden;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    .ci360-emp-group-card:hover {
      border-color: var(--border-md);
    }
    .ci360-emp-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 18px;
      background: var(--bg-elevated);
      cursor: pointer;
      user-select: none;
      transition: background var(--t-fast);
    }
    .ci360-emp-group-header:hover {
      background: var(--bg-hover);
    }
    .emp-group-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }
    .emp-collapse-icon {
      font-size: 11px;
      color: var(--text-3);
      width: 14px;
      text-align: center;
      transition: transform var(--t-fast);
    }
    .emp-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 112, 243, 0.15);
      color: #0070F3;
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .emp-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .emp-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-1);
    }
    .emp-subtitle {
      font-size: 11.5px;
      color: var(--text-3);
    }
    .emp-group-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .emp-stat-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--bg-card);
      border: 1px solid var(--border-xs);
      color: var(--text-2);
    }
    .emp-stat-pill.done {
      color: var(--green-600);
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .emp-stat-pill.in-prog {
      color: var(--amber-600);
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.2);
    }
    .emp-stat-pill.pending {
      color: var(--text-3);
      background: var(--bg-hover);
    }
    .emp-mini-bar-wrap {
      width: 50px;
      height: 6px;
      border-radius: var(--r-full);
      background: var(--border-xs);
      overflow: hidden;
    }
    .emp-mini-bar-fill {
      height: 100%;
      background: var(--green-500);
      border-radius: var(--r-full);
      transition: width 0.3s ease;
    }
    .ci360-emp-group-body {
      padding: 12px 16px;
      border-top: 1px solid var(--border-xs);
    }

    /* ── COMPREHENSIVE LIGHT THEME ENHANCEMENTS FOR DAILY PLANNER ── */
    [data-theme="light"] .ci360-planner-wrap,
    html:not([data-theme="dark"]) .ci360-planner-wrap {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-heading,
    html:not([data-theme="dark"]) .ci360-planner-heading {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-subheading,
    html:not([data-theme="dark"]) .ci360-planner-subheading {
      color: #64748B;
    }
    [data-theme="light"] .ci360-view-switcher,
    html:not([data-theme="dark"]) .ci360-view-switcher {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-switch-btn,
    html:not([data-theme="dark"]) .ci360-switch-btn {
      color: #64748B;
    }
    [data-theme="light"] .ci360-switch-btn:hover,
    html:not([data-theme="dark"]) .ci360-switch-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-switch-btn.active,
    html:not([data-theme="dark"]) .ci360-switch-btn.active {
      background: #0070F3;
      color: #FFFFFF;
    }
    [data-theme="light"] .ci360-btn-secondary,
    html:not([data-theme="dark"]) .ci360-btn-secondary {
      background: #FFFFFF;
      color: #334155;
      border-color: #CBD5E1;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-btn-secondary:hover,
    html:not([data-theme="dark"]) .ci360-btn-secondary:hover {
      background: #F8FAFC;
      color: #0F172A;
      border-color: #94A3B8;
    }
    [data-theme="light"] .ci360-dropdown-menu,
    html:not([data-theme="dark"]) .ci360-dropdown-menu {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
    }
    [data-theme="light"] .ci360-menu-item,
    html:not([data-theme="dark"]) .ci360-menu-item {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-menu-item:hover,
    html:not([data-theme="dark"]) .ci360-menu-item:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .ci360-menu-item .meta small,
    html:not([data-theme="dark"]) .ci360-menu-item .meta small {
      color: #64748B;
    }
    [data-theme="light"] .ci360-planner-nav-strip,
    html:not([data-theme="dark"]) .ci360-planner-nav-strip {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-nav-arrow,
    html:not([data-theme="dark"]) .ci360-nav-arrow {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-date-picker-badge,
    html:not([data-theme="dark"]) .ci360-date-picker-badge {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-date-picker-badge .date-text,
    html:not([data-theme="dark"]) .ci360-date-picker-badge .date-text {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-today-btn,
    html:not([data-theme="dark"]) .ci360-today-btn {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #475569;
    }
    [data-theme="light"] .ci360-today-btn.is-current,
    html:not([data-theme="dark"]) .ci360-today-btn.is-current {
      background: #E0F2FE;
      color: #0070F3;
      border-color: #BAE6FD;
    }
    [data-theme="light"] .ci360-select-inline,
    html:not([data-theme="dark"]) .ci360-select-inline {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-progress-summary-card,
    html:not([data-theme="dark"]) .ci360-progress-summary-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .kpi-box,
    html:not([data-theme="dark"]) .kpi-box {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .kpi-box .kpi-num,
    html:not([data-theme="dark"]) .kpi-box .kpi-num {
      color: #0F172A;
    }
    [data-theme="light"] .kpi-box .kpi-label,
    html:not([data-theme="dark"]) .kpi-box .kpi-label {
      color: #64748B;
    }
    [data-theme="light"] .ring-num,
    html:not([data-theme="dark"]) .ring-num {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-circular-svg .circle-bg,
    html:not([data-theme="dark"]) .ci360-circular-svg .circle-bg {
      stroke: #E2E8F0;
    }
    [data-theme="light"] .ci360-focus-title,
    html:not([data-theme="dark"]) .ci360-focus-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-filter-pills,
    html:not([data-theme="dark"]) .ci360-filter-pills {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .filter-pill,
    html:not([data-theme="dark"]) .filter-pill {
      color: #64748B;
    }
    [data-theme="light"] .filter-pill:hover,
    html:not([data-theme="dark"]) .filter-pill:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .filter-pill.active,
    html:not([data-theme="dark"]) .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      border-color: #0070F3 !important;
    }
    [data-theme="light"] .ci360-search-box,
    html:not([data-theme="dark"]) .ci360-search-box {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-search-box input,
    html:not([data-theme="dark"]) .ci360-search-box input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-search-box input::placeholder,
    html:not([data-theme="dark"]) .ci360-search-box input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-add-bar,
    html:not([data-theme="dark"]) .ci360-quick-add-bar {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    [data-theme="light"] .ci360-quick-input,
    html:not([data-theme="dark"]) .ci360-quick-input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-quick-input::placeholder,
    html:not([data-theme="dark"]) .ci360-quick-input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-select,
    html:not([data-theme="dark"]) .ci360-quick-select {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-task-card,
    html:not([data-theme="dark"]) .ci360-task-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      border-left: 3.5px solid #0070F3;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-task-card:hover,
    html:not([data-theme="dark"]) .ci360-task-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    [data-theme="light"] .ci360-task-card.is-completed,
    html:not([data-theme="dark"]) .ci360-task-card.is-completed {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-task-title,
    html:not([data-theme="dark"]) .ci360-task-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-task-desc,
    html:not([data-theme="dark"]) .ci360-task-desc {
      color: #475569;
    }
    [data-theme="light"] .ci360-task-check,
    html:not([data-theme="dark"]) .ci360-task-check {
      border-color: #CBD5E1;
    }
    [data-theme="light"] .task-action-btn,
    html:not([data-theme="dark"]) .task-action-btn {
      color: #64748B;
    }
    [data-theme="light"] .task-action-btn:hover,
    html:not([data-theme="dark"]) .task-action-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-past-date-banner,
    html:not([data-theme="dark"]) .ci360-past-date-banner {
      background: #FFFBEB;
      border-color: #FDE68A;
    }
    [data-theme="light"] .past-banner-title,
    html:not([data-theme="dark"]) .past-banner-title {
      color: #92400E;
    }
    [data-theme="light"] .past-banner-desc,
    html:not([data-theme="dark"]) .past-banner-desc {
      color: #B45309;
    }
    [data-theme="light"] .ci360-emp-group-card,
    html:not([data-theme="dark"]) .ci360-emp-group-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-emp-group-header,
    html:not([data-theme="dark"]) .ci360-emp-group-header {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-emp-group-header:hover,
    html:not([data-theme="dark"]) .ci360-emp-group-header:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .emp-avatar,
    html:not([data-theme="dark"]) .emp-avatar {
      background: #E0F2FE;
      color: #0070F3;
      border: 1px solid #BAE6FD;
    }
    [data-theme="light"] .emp-name,
    html:not([data-theme="dark"]) .emp-name {
      color: #0F172A;
    }
    [data-theme="light"] .emp-subtitle,
    html:not([data-theme="dark"]) .emp-subtitle {
      color: #64748B;
    }
    [data-theme="light"] .emp-stat-pill,
    html:not([data-theme="dark"]) .emp-stat-pill {
      background: #FFFFFF;
      border-color: #E2E8F0;
      color: #475569;
    }
    [data-theme="light"] .ci360-day-column,
    html:not([data-theme="dark"]) .ci360-day-column {
      background: #FFFFFF;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .day-col-header .day-name,
    html:not([data-theme="dark"]) .day-col-header .day-name {
      color: #64748B;
    }
    [data-theme="light"] .day-col-header .day-number,
    html:not([data-theme="dark"]) .day-col-header .day-number {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-mini-task-card,
    html:not([data-theme="dark"]) .ci360-mini-task-card {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-mini-task-card:hover,
    html:not([data-theme="dark"]) .ci360-mini-task-card:hover {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .mini-title,
    html:not([data-theme="dark"]) .mini-title {
      color: #0F172A;
    }
    [data-theme="light"] .day-col-add-btn,
    html:not([data-theme="dark"]) .day-col-add-btn {
      border: 1px dashed #CBD5E1;
      color: #64748B;
    }
    [data-theme="light"] .day-col-add-btn:hover,
    html:not([data-theme="dark"]) .day-col-add-btn:hover {
      border-color: #0070F3;
      color: #0070F3;
      background: #E0F2FE;
    }
    [data-theme="light"] .ci360-planner-modal,
    html:not([data-theme="dark"]) .ci360-planner-modal {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #E2E8F0;
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    [data-theme="light"] .ci360-modal-header h3,
    html:not([data-theme="dark"]) .ci360-modal-header h3 {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-modal-form label,
    html:not([data-theme="dark"]) .ci360-modal-form label {
      color: #334155;
    }
    [data-theme="light"] .ci360-modal-form .input,
    html:not([data-theme="dark"]) .ci360-modal-form .input {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #CBD5E1;
    }
    [data-theme="light"] .ci360-badge.creator-badge,
    html:not([data-theme="dark"]) .ci360-badge.creator-badge {
      background: #F5F3FF;
      color: #6D28D9;
      border-color: #DDD6FE;
    }
    [data-theme="light"] .ci360-badge.completion-badge,
    html:not([data-theme="dark"]) .ci360-badge.completion-badge {
      background: #EFF6FF;
      color: #1D4ED8;
      border-color: #BFDBFE;
    }
    [data-theme="light"] .ci360-badge.date-changed-badge,
    html:not([data-theme="dark"]) .ci360-badge.date-changed-badge {
      background: #FFFBEB;
      color: #B45309;
      border-color: #FDE68A;
    }
  `;
  document.head.appendChild(style);
}

