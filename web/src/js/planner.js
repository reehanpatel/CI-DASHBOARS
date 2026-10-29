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
    selectedCategory: 'all',
    selectedPersonnelId: 'all',
    tasks: [],
    personnelList: [],
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
      const promises = [apiGet('/tasks')];
      if (isSuperadmin) {
        promises.push(apiGet('/personnel').catch(() => []));
      }

      const [tasks, personnel] = await Promise.all(promises);
      state.tasks = Array.isArray(tasks) ? tasks : [];
      if (personnel) state.personnelList = Array.isArray(personnel) ? personnel : [];
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

      // Personnel filter for admin
      if (isSuperadmin && state.selectedPersonnelId !== 'all') {
        const pId = t.personnelId?._id || t.personnelId;
        if (String(pId) !== String(state.selectedPersonnelId)) return false;
      }

      // Exact date match
      const taskDate = t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      if (taskDate) {
        return taskDate === dateStr;
      }
      // If task has no explicit date, associate with today
      return dateStr === getTodayStr();
    });
  }

  function isOverdue(task, currentDateStr) {
    if (task.status === 'Completed') return false;
    const taskDate = task.dateStr || (task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '');
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
        
        <!-- Planner Main Header -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-title-group">
              <div class="ci360-planner-eyebrow">
                <span class="ci360-planner-tag-badge">Dayfolio System</span>
                <span class="ci360-planner-date-indicator">${formatShortDate(state.selectedDate)}</span>
              </div>
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
            <button type="button" class="ci360-btn-primary" id="btnOpenAddTaskModal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Add Task</span>
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
                    <small>Formatted summary report</small>
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
                <span class="kpi-num">${stats.total}</span>
                <span class="kpi-label">Total Tasks</span>
              </div>
              <div class="kpi-box completed">
                <span class="kpi-num">${stats.completed}</span>
                <span class="kpi-label">Completed</span>
              </div>
              <div class="kpi-box in-progress">
                <span class="kpi-num">${stats.inProgress}</span>
                <span class="kpi-label">In Progress</span>
              </div>
              <div class="kpi-box pending">
                <span class="kpi-num">${stats.pending}</span>
                <span class="kpi-label">Pending</span>
              </div>
              ${stats.overdue > 0 ? `
                <div class="kpi-box overdue">
                  <span class="kpi-num">${stats.overdue}</span>
                  <span class="kpi-label">Overdue</span>
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
      const q = state.searchQuery.toLowerCase();
      visibleTasks = visibleTasks.filter(t => {
        return (t.title || '').toLowerCase().includes(q) ||
               (t.description || '').toLowerCase().includes(q) ||
               (t.category || '').toLowerCase().includes(q);
      });
    }

    // Sort: Pending/In Progress first by priority, completed at bottom
    visibleTasks.sort((a, b) => {
      if (a.status === 'Completed' && b.status !== 'Completed') return 1;
      if (a.status !== 'Completed' && b.status === 'Completed') return -1;
      const priOrder = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
      return (priOrder[a.priority] || 2) - (priOrder[b.priority] || 2);
    });

    return `
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap">
            <h2 class="ci360-focus-title">
              <span class="accent-dot"></span>
              Today's Focus
            </h2>
            <span class="ci360-task-count-badge">${visibleTasks.length} ${visibleTasks.length === 1 ? 'task' : 'tasks'}</span>
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

            <!-- Search Bar -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks..." value="${escapeHtml(state.searchQuery)}">
              ${state.searchQuery ? `<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>` : ''}
            </div>
          </div>
        </div>

        <!-- Inline Quick-Add Card -->
        <div class="ci360-quick-add-bar">
          <div class="ci360-quick-add-input-wrap">
            <input type="text" id="quickAddTitleInp" class="ci360-quick-input" placeholder="Add a focus task for ${formatShortDate(state.selectedDate)}... (Press Enter to save)">
          </div>

          <div class="ci360-quick-add-meta">
            <select id="quickAddPriority" class="ci360-quick-select" title="Priority">
              <option value="Low">Priority: Low</option>
              <option value="Medium" selected>Priority: Medium</option>
              <option value="High">Priority: High</option>
              <option value="Urgent">Priority: Urgent</option>
            </select>

            <select id="quickAddCategory" class="ci360-quick-select" title="Category">
              <option value="General" selected>General</option>
              <option value="Client Work">Client Work</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
            </select>

            <button type="button" class="ci360-quick-add-btn" id="btnQuickAddSubmit">
              <span>+ Add</span>
            </button>
          </div>
        </div>

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${visibleTasks.length === 0 ? renderEmptyFocusState() : `
            <div class="ci360-task-list">
              ${visibleTasks.map(task => renderTaskCard(task, todayStr)).join('')}
            </div>
          `}
        </div>

      </div>
    `;
  }

  function renderEmptyFocusState() {
    return `
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">✨</div>
        <h3>No tasks found for ${formatShortDate(state.selectedDate)}</h3>
        <p>Your schedule is clean and ready. Add your first priority task above or import your daily agenda.</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
          <button type="button" class="ci360-btn-primary" onclick="document.getElementById('quickAddTitleInp')?.focus()">
            + Quick Add Task
          </button>
          <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
            📥 Import List
          </button>
        </div>
      </div>
    `;
  }

  function renderTaskCard(task, todayStr) {
    const isCompleted = task.status === 'Completed';
    const isPastDue = isOverdue(task, todayStr);
    const priClass = `pri-${(task.priority || 'medium').toLowerCase()}`;
    const statusClass = `status-${(task.status || 'pending').toLowerCase().replace(/\s+/g, '-')}`;

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

            <!-- Category -->
            ${task.category ? `
              <span class="ci360-badge category-badge">
                #${escapeHtml(task.category)}
              </span>
            ` : ''}

            <!-- Time Display -->
            ${(task.startTime || task.dueTime) ? `
              <span class="ci360-badge time-badge">
                🕒 ${task.startTime ? escapeHtml(task.startTime) : ''}
                   ${task.startTime && task.dueTime ? '–' : ''}
                   ${task.dueTime ? escapeHtml(task.dueTime) : ''}
              </span>
            ` : ''}

            <!-- Overdue Warning -->
            ${isPastDue ? `
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            ` : ''}

            <!-- Superadmin assigned employee name -->
            ${isSuperadmin && (task.personnelId?.name || task.userId?.name) ? `
              <span class="ci360-badge personnel-badge">
                👤 ${escapeHtml(task.personnelId?.name || task.userId?.name)}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Task Actions Menu -->
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

        <!-- 7-Day Grid -->
        <div class="ci360-week-grid">
          ${weekDates.map(dStr => {
            const isDayToday = dStr === todayStr;
            const isDaySelected = dStr === state.selectedDate;
            const tasksForDay = getTasksForDate(dStr);
            const dayStats = calculateStats(tasksForDay, todayStr);

            return `
              <div class="ci360-day-column ${isDayToday ? 'is-today' : ''} ${isDaySelected ? 'is-selected' : ''}" data-date="${dStr}">
                
                <!-- Column Header -->
                <div class="day-col-header" data-date="${dStr}">
                  <div class="day-name">${getDayName(dStr)}</div>
                  <div class="day-number">${new Date(dStr + 'T00:00:00').getDate()}</div>
                  ${isDayToday ? `<span class="today-pill">Today</span>` : ''}
                </div>

                <!-- Daily Progress Bar -->
                <div class="day-col-stats">
                  <span class="stat-text">${dayStats.completed}/${dayStats.total} done</span>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" style="width: ${dayStats.percent}%"></div>
                  </div>
                </div>

                <!-- Tasks Column Body -->
                <div class="day-col-tasks">
                  ${tasksForDay.length === 0 ? `
                    <div class="day-empty">No tasks</div>
                  ` : tasksForDay.map(t => `
                    <div class="ci360-mini-task-card ${t.status === 'Completed' ? 'done' : ''}" data-id="${t._id}">
                      <button type="button" class="mini-check ${t.status === 'Completed' ? 'checked' : ''}" data-action="toggle" data-id="${t._id}">
                        ✓
                      </button>
                      <div class="mini-info" data-action="edit" data-id="${t._id}">
                        <div class="mini-title">${escapeHtml(t.title)}</div>
                        <div class="mini-meta">
                          <span class="mini-pri pri-${(t.priority || 'medium').toLowerCase()}">${t.priority || 'Med'}</span>
                          ${t.dueTime ? `<span class="mini-time">${escapeHtml(t.dueTime)}</span>` : ''}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Quick Add for Day Button -->
                <button type="button" class="day-col-add-btn" data-action="add-day" data-date="${dStr}">
                  + Add Task
                </button>

              </div>
            `;
          }).join('')}
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

    // Aggregate all tasks for this week
    const weeklyTasks = state.tasks.filter(t => {
      if (t.isDeleted === true) return false;
      const tDate = t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      return weekDates.includes(tDate);
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
        
        <div class="ci360-report-banner">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3)">Week Period: ${startStr} – ${endStr}</div>
          </div>

          <div style="display:flex;gap:10px">
            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf">
              📄 Download Weekly Report PDF
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
    if (btnAdd) btnAdd.onclick = () => openAddEditTaskModal();

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
          state.searchQuery = e.target.value;
          render();
        };
      }
      const btnClearSearch = document.getElementById('btnClearSearch');
      if (btnClearSearch) {
        btnClearSearch.onclick = () => {
          state.searchQuery = '';
          render();
        };
      }

      // Quick Add
      const quickInp = document.getElementById('quickAddTitleInp');
      const quickPri = document.getElementById('quickAddPriority');
      const quickCat = document.getElementById('quickAddCategory');
      const quickBtn = document.getElementById('btnQuickAddSubmit');

      const handleQuickAdd = async () => {
        const title = (quickInp?.value || '').trim();
        if (!title) {
          flashToast('Please enter a task title', true);
          quickInp?.focus();
          return;
        }

        try {
          const payload = {
            title,
            dateStr: state.selectedDate,
            priority: quickPri?.value || settings.defaultPriority,
            category: quickCat?.value || 'General',
            status: 'Pending'
          };
          if (isSuperadmin && state.selectedPersonnelId !== 'all') {
            payload.personnelId = state.selectedPersonnelId;
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
      const btnDl = document.getElementById('btnDownloadWeeklyPdf');
      if (btnDl) btnDl.onclick = exportWeeklyPdf;
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
    const initialDate = existingTask
      ? (existingTask.dateStr || (existingTask.dueDate ? new Date(existingTask.dueDate).toISOString().slice(0, 10) : state.selectedDate))
      : (targetDate || state.selectedDate);

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

          <!-- Date & Time Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate" class="required">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${initialDate}" required>
            </div>
            <div class="form-group flex-1">
              <label for="taskStartTime">Start Time</label>
              <input type="time" id="taskStartTime" class="input" value="${existingTask?.startTime || ''}">
            </div>
            <div class="form-group flex-1">
              <label for="taskDueTime">Due Time</label>
              <input type="time" id="taskDueTime" class="input" value="${existingTask?.dueTime || ''}">
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
              <label for="taskCategory">Category / Label</label>
              <input type="text" id="taskCategory" class="input" list="categoryOptions" placeholder="e.g. Design, Meeting" value="${escapeHtml(existingTask?.category || 'General')}">
              <datalist id="categoryOptions">
                <option value="General">
                <option value="Client Work">
                <option value="Development">
                <option value="Design">
                <option value="Meeting">
                <option value="Review">
                <option value="Urgent">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${isSuperadmin ? `
            <div class="form-group">
              <label for="taskAssignee">Assign To</label>
              <select id="taskAssignee" class="input">
                <option value="all" ${!existingTask || existingTask?.assignAll ? 'selected' : ''}>Assign to All Active Team Members</option>
                ${state.personnelList.map(p => {
                  const isSel = existingTask?.personnelId?._id === p._id || existingTask?.personnelId === p._id;
                  return `<option value="${p._id}" ${isSel ? 'selected' : ''}>${escapeHtml(p.name)} (${escapeHtml(p.department || p.role || 'Member')})</option>`;
                }).join('')}
              </select>
            </div>
          ` : ''}

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
            <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
              ${isEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    `;

    const modalBg = openModal(modalHtml);
    const form = modalBg.querySelector('#taskForm');
    const closeBtn = modalBg.querySelector('#btnModalClose');
    const cancelBtn = modalBg.querySelector('#btnCancelModal');

    const closeModal = () => modalBg.remove();
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    form.onsubmit = async (e) => {
      e.preventDefault();
      const title = modalBg.querySelector('#taskTitle').value.trim();
      const description = modalBg.querySelector('#taskDesc').value.trim();
      const dateStr = modalBg.querySelector('#taskDate').value;
      const startTime = modalBg.querySelector('#taskStartTime').value.trim();
      const dueTime = modalBg.querySelector('#taskDueTime').value.trim();
      const priority = modalBg.querySelector('#taskPriority').value;
      const status = modalBg.querySelector('#taskStatus').value;
      const category = modalBg.querySelector('#taskCategory').value.trim() || 'General';

      if (!title) {
        flashToast('Task title is required', true);
        return;
      }

      const payload = {
        title,
        description,
        dateStr,
        startTime,
        dueTime,
        priority,
        status,
        category
      };

      if (isSuperadmin) {
        const assignee = modalBg.querySelector('#taskAssignee')?.value;
        if (assignee === 'all') {
          payload.assignAll = true;
          payload.personnelId = 'all';
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
              <input type="date" id="importTargetDate" class="input" value="${state.selectedDate}">
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
    const itemHeight = 65;
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
    const bgApp = isDark ? '#0F172A' : '#F8FAFC';
    const bgCard = isDark ? '#1E293B' : '#FFFFFF';
    const border = isDark ? '#334155' : '#E2E8F0';
    const text1 = isDark ? '#F8FAFC' : '#0F172A';
    const text2 = isDark ? '#94A3B8' : '#475569';
    const brand = '#4F46E5';
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

        // Status or Time
        const metaStr = t.dueTime ? `🕒 ${t.dueTime}` : (t.category || 'General');
        ctx.fillStyle = text2;
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText(metaStr, 70, itemY + 34);

        // Divider
        if (i < dayTasks.length - 1) {
          ctx.strokeStyle = border;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(40, itemY + 48);
          ctx.lineTo(width - 40, itemY + 48);
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
  function exportWeeklyPdf() {
    const weekDates = getWeekDates(state.selectedDate, settings.weekStartsOn);
    const startStr = formatFullDate(weekDates[0]);
    const endStr = formatFullDate(weekDates[6]);
    const todayStr = getTodayStr();

    const weeklyTasks = state.tasks.filter(t => {
      if (t.isDeleted === true) return false;
      const tDate = t.dateStr || (t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '');
      return weekDates.includes(tDate);
    });

    const total = weeklyTasks.length;
    const completed = weeklyTasks.filter(t => t.status === 'Completed').length;
    const compRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Create a print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      flashToast('Pop-up blocked. Please allow pop-ups to print the PDF report.', true);
      return;
    }

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Planner Report — ${startStr}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.4; padding: 10px; }
          .header { border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: bold; color: #4f46e5; letter-spacing: 0.5px; text-transform: uppercase; }
          h1 { margin: 4px 0 0; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #64748b; }
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
          .kpi-num { font-size: 22px; font-weight: bold; color: #0f172a; margin-top: 4px; }
          .kpi-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 12px; }
          th { text-align: left; background: #f1f5f9; padding: 8px 10px; border-bottom: 1px solid #cbd5e1; font-weight: 600; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
          .done { color: #10b981; font-weight: bold; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; }
          .badge-urgent { background: #fee2e2; color: #dc2626; }
          .badge-high { background: #fef3c7; color: #d97706; }
          .badge-med { background: #e0e7ff; color: #4338ca; }
          .badge-low { background: #ecfdf5; color: #059669; }
          .footer { margin-top: 30px; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; text-align: center; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">CI360 Intelligence Suite · Productivity Report</div>
            <h1>Weekly Planner Report</h1>
            <div class="period">${startStr} – ${endStr}</div>
          </div>
          <div style="text-align:right">
            <button class="no-print" onclick="window.print()" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600">Print / Save as PDF</button>
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
            <div class="kpi-label">Pending / Active</div>
            <div class="kpi-num">${total - completed}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#4f46e5">${compRate}%</div>
          </div>
        </div>

        <h3 style="font-size:14px;margin:18px 0 8px">Daily Tasks Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task Title</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${weekDates.map(dStr => {
              const tasks = getTasksForDate(dStr);
              if (tasks.length === 0) {
                return `<tr><td><strong>${formatShortDate(dStr)}</strong></td><td colspan="5" style="color:#94a3b8">No scheduled tasks</td></tr>`;
              }
              return tasks.map(t => `
                <tr>
                  <td><strong>${formatShortDate(dStr)}</strong></td>
                  <td>${escapeHtml(t.title)}</td>
                  <td><span class="badge badge-${(t.priority || 'medium').toLowerCase().slice(0,3)}">${t.priority || 'Medium'}</span></td>
                  <td>${escapeHtml(t.category || 'General')}</td>
                  <td>${t.dueTime || t.startTime || '—'}</td>
                  <td class="${t.status === 'Completed' ? 'done' : ''}">${t.status || 'Pending'}</td>
                </tr>
              `).join('');
            }).join('')}
          </tbody>
        </table>

        <div class="footer">
          Generated automatically by CI360 Daily Planner on ${new Date().toLocaleString()}
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
    flashToast('Weekly PDF report generated for printing! 📄');
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

    modalBg.querySelector('#settingsForm').onsubmit = (e) => {
      e.preventDefault();
      settings.displayName = modalBg.querySelector('#setDisplayName').value.trim() || 'Daily Planner';
      settings.weekStartsOn = Number(modalBg.querySelector('#setWeekStart').value);
      settings.defaultPriority = modalBg.querySelector('#setDefaultPriority').value;
      settings.density = modalBg.querySelector('#setDensity').value;
      settings.soundEnabled = modalBg.querySelector('#setSound').checked;

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
    .ci360-planner-wrap {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 4px 60px;
      font-family: var(--font-sans);
      color: var(--text-1);
    }

    /* Header */
    .ci360-planner-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .ci360-planner-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-planner-eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .ci360-planner-tag-badge {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--brand-50);
      color: var(--brand-600);
    }
    [data-theme="dark"] .ci360-planner-tag-badge {
      background: rgba(99, 102, 241, 0.2);
      color: var(--brand-400);
    }
    .ci360-planner-date-indicator {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-3);
    }
    .ci360-planner-heading {
      font-size: 26px;
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
      padding: 6px 12px;
      border-radius: 6px;
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
      background: var(--accent);
      color: #FFFFFF;
      box-shadow: 0 1px 3px rgba(79, 70, 229, 0.3);
    }

    .ci360-btn-primary {
      background: var(--accent);
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
      transition: all var(--t-fast);
    }
    .ci360-btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
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
      padding: 6px 12px;
      border-radius: var(--r-md);
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
      background: var(--brand-50);
      color: var(--brand-600);
      border-color: var(--brand-200);
    }
    [data-theme="dark"] .ci360-today-btn.is-current {
      background: rgba(99, 102, 241, 0.15);
      color: var(--brand-400);
      border-color: rgba(99, 102, 241, 0.3);
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
      border-radius: var(--r-lg);
      padding: 18px 24px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
    }
    .ci360-summary-main {
      display: flex;
      align-items: center;
      gap: 28px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .ci360-ring-stat {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ci360-circular-progress {
      position: relative;
      width: 72px;
      height: 72px;
    }
    .ci360-circular-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ci360-circular-svg .circle-bg {
      fill: none;
      stroke: var(--border-xs);
      stroke-width: 3.5;
    }
    .ci360-circular-svg .circle-fill {
      fill: none;
      stroke: var(--accent);
      stroke-width: 3.5;
      stroke-linecap: round;
      transition: stroke-dasharray 0.4s ease;
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
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-4);
      margin-top: 2px;
    }

    .ci360-summary-kpis {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
      flex-wrap: wrap;
    }
    .kpi-box {
      display: flex;
      flex-direction: column;
      background: var(--bg-app);
      padding: 10px 16px;
      border-radius: var(--r-md);
      min-width: 100px;
      border: 1px solid var(--border-xs);
    }
    .kpi-box .kpi-num {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.1;
    }
    .kpi-box .kpi-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-3);
      margin-top: 2px;
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
      height: 6px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
    }
    .ci360-linear-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--brand-500), var(--green-500));
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
      font-weight: 700;
      color: var(--text-1);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-focus-title .accent-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      display: inline-block;
    }
    .ci360-task-count-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--bg-hover);
      color: var(--text-3);
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
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 3px;
    }
    .filter-pill {
      background: transparent;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .filter-pill:hover {
      color: var(--text-1);
    }
    .filter-pill.active {
      background: var(--bg-hover);
      color: var(--accent);
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
      border: 1px dashed var(--border-md);
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
      background: var(--accent);
      color: #FFFFFF;
      border: none;
      border-radius: var(--r-sm);
      padding: 6px 14px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .ci360-quick-add-btn:hover {
      filter: brightness(1.1);
    }

    /* Task List & Cards */
    .ci360-task-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ci360-task-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 14px 16px;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    .ci360-task-card:hover {
      box-shadow: var(--shadow-sm);
      border-color: var(--border-md);
      transform: translateY(-1px);
    }
    .ci360-task-card.is-completed {
      background: var(--bg-elevated);
      opacity: 0.75;
    }
    .ci360-task-card.is-overdue {
      border-left: 3px solid var(--red-500);
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
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: var(--brand-50); color: var(--brand-600); }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(99, 102, 241, 0.2); color: var(--brand-400); }

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
    .ci360-week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
    }
    @media (max-width: 992px) {
      .ci360-week-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
    .ci360-day-column {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      min-height: 380px;
      transition: all var(--t-fast);
    }
    .ci360-day-column.is-today {
      border-color: var(--accent);
      background: var(--bg-elevated);
      box-shadow: var(--shadow-sm);
    }
    .ci360-day-column.is-selected {
      outline: 2px solid var(--brand-400);
    }
    .day-col-header {
      cursor: pointer;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-xs);
      margin-bottom: 8px;
      text-align: center;
    }
    .day-col-header .day-name {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-3);
    }
    .day-col-header .day-number {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.2;
    }
    .day-col-header .today-pill {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 1px 6px;
      border-radius: var(--r-full);
      background: var(--accent);
      color: #FFFFFF;
      margin-top: 2px;
    }
    .day-col-stats {
      margin-bottom: 10px;
    }
    .day-col-stats .stat-text {
      font-size: 10.5px;
      color: var(--text-4);
      display: block;
      margin-bottom: 4px;
      text-align: center;
    }
    .day-col-stats .mini-bar-wrap {
      height: 4px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
    }
    .day-col-stats .mini-bar {
      height: 100%;
      background: var(--accent);
      border-radius: var(--r-full);
    }

    .day-col-tasks {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow-y: auto;
      max-height: 440px;
    }
    .day-empty {
      font-size: 11px;
      color: var(--text-4);
      text-align: center;
      padding: 16px 0;
    }

    .ci360-mini-task-card {
      background: var(--bg-app);
      border: 1px solid var(--border-xs);
      border-radius: var(--r-sm);
      padding: 6px 8px;
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 12px;
      transition: all var(--t-fast);
    }
    .ci360-mini-task-card:hover {
      border-color: var(--border-md);
      background: var(--bg-card);
    }
    .ci360-mini-task-card.done {
      opacity: 0.6;
    }
    .ci360-mini-task-card.done .mini-title {
      text-decoration: line-through;
    }
    .mini-check {
      background: transparent;
      border: 1px solid var(--border-md);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      font-size: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: transparent;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .mini-check.checked {
      background: var(--green-500);
      border-color: var(--green-500);
      color: #fff;
    }
    .mini-info {
      flex: 1;
      min-width: 0;
      cursor: pointer;
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
      background: rgba(99, 102, 241, 0.1);
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
  `;
  document.head.appendChild(style);
}
