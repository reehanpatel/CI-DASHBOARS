/**
 * CI360 SUPPORT TICKETS MODULE — JIRA-STYLE INTERNAL MANAGEMENT
 * Complete Scrum board with drag-and-drop, 2-column issue detail modal,
 * subtasks, comments, attachments, activity history, and work logging.
 *
 * STRICT INTERNAL MODULE: ONLY ADMINS & EMPLOYEES CAN ACCESS.
 */

import {
  apiGet,
  apiPost,
  apiPatch,
  apiPut,
  apiDelete,
  escapeHtml,
  flashToast,
  timeAgo,
  fmtFileSize
} from './api.js';

const STATUS_COLUMNS = [
  { key: 'To Do', label: 'To Do', badgeClass: 'todo' },
  { key: 'Content', label: 'Content', badgeClass: 'content' },
  { key: 'Design', label: 'Design', badgeClass: 'design' },
  { key: 'Under Review', label: 'Under Review', badgeClass: 'review' },
  { key: 'Ready to Leave', label: 'Ready to Leave', badgeClass: 'ready' }
];

const CATEGORIES = [
  { key: 'Task', label: 'Task', icon: '📝', slug: 'task' },
  { key: 'Bug', label: 'Bug', icon: '🐛', slug: 'bug' },
  { key: 'Feature', label: 'Feature', icon: '✨', slug: 'feature' },
  { key: 'Internal', label: 'Internal', icon: '🏢', slug: 'internal' },
  { key: 'Infrastructure', label: 'Infrastructure', icon: '⚙️', slug: 'infrastructure' },
  { key: 'Client Request', label: 'Client Request', icon: '💼', slug: 'client-request' },
  { key: 'General', label: 'General', icon: '📌', slug: 'general' }
];

const PRIORITIES = [
  { key: 'Critical', label: 'Critical', icon: '🔴 ⬆⬆', color: '#ef4444' },
  { key: 'High', label: 'High', icon: '🟠 ⬆', color: '#f97316' },
  { key: 'Medium', label: 'Medium', icon: '🟡 〓', color: '#eab308' },
  { key: 'Low', label: 'Low', icon: '🟢 ⬇', color: '#22c55e' }
];

export async function initSupportTickets(container, options = {}) {
  const { userRole = 'employee', currentUser = null, initialTicketId = null } = options;
  const isSuper = userRole === 'superadmin' || userRole === 'admin';

  // Strict check: if client somehow triggers this, abort immediately
  if (userRole === 'client' || (currentUser && currentUser.role === 'client')) {
    container.innerHTML = `
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;
    return;
  }

  let tickets = [];
  let stats = {};
  let employees = [];
  let jobs = [];

  let filters = {
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    assigneeId: 'all',
    reporterId: 'all',
    scope: 'all', // 'all' | 'assigned' | 'created'
    jobId: options.initialJobId || 'all',
    myIssuesOnly: false
  };

  let activeModalTicket = null;
  let activeActivityTab = 'comments'; // 'comments' | 'history' | 'worklog' | 'all'
  let isEditingDescription = false;

  // Render Skeleton Initial Structure
  container.innerHTML = `
    <div class="jira-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="jira-header-bar">
        <div class="jira-header-left">
          <div class="jira-breadcrumb">
            <span class="jira-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${isSuper ? 'ALL TICKETS (ADMIN)' : 'INTERNAL TICKETS (ASSIGNED & CREATED)'}</span>
          </div>
          <div class="jira-title-row">
            <h2 class="jira-main-title">🎫 ${isSuper ? 'Support Tickets Board' : 'Support Tickets'}</h2>
          </div>
        </div>
        <div class="jira-header-actions">
          <button class="btn-jira-secondary" id="btn-jira-refresh" title="Refresh Board">
            🔄 Refresh
          </button>
          <button class="btn-jira-primary" id="btn-jira-create-ticket">
            + Create Ticket
          </button>
        </div>
      </div>

      <!-- Stats Overview Ribbon -->
      <div class="jira-stats-ribbon" id="jira-stats-root">
        <div class="jira-stat-card"><span class="jira-stat-val">—</span><span class="jira-stat-lbl">Loading Stats...</span></div>
      </div>

      <!-- Filter Toolbar -->
      <div class="jira-filter-bar">
        <div class="jira-filter-left">
          <div class="jira-search-wrap">
            <span class="jira-search-icon">🔍</span>
            <input type="text" id="jira-search-input" class="jira-search-input" placeholder="Search ticket (ID, title, description)..." />
          </div>

          <select id="jira-filter-priority" class="jira-filter-select">
            <option value="all">Priority: All</option>
            <option value="Critical">🔴 Critical</option>
            <option value="High">🟠 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <select id="jira-filter-category" class="jira-filter-select">
            <option value="all">Category: All</option>
            ${CATEGORIES.map(c => `<option value="${c.key}">${c.icon} ${c.label}</option>`).join('')}
          </select>

          <select id="jira-filter-job" class="jira-filter-select">
            <option value="all">Linked Job: All</option>
          </select>

          ${isSuper ? `
            <select id="jira-filter-assignee" class="jira-filter-select">
              <option value="all">Assignee: All</option>
              <option value="unassigned">Unassigned</option>
            </select>

            <button type="button" class="jira-pill-filter" id="jira-pill-my-issues">
              Only My Issues
            </button>
          ` : `
            <button type="button" class="jira-pill-filter active" id="jira-pill-scope-all">
              📁 All My Tickets
            </button>
            <button type="button" class="jira-pill-filter" id="jira-pill-scope-assigned">
              👤 Assigned to Me
            </button>
            <button type="button" class="jira-pill-filter" id="jira-pill-scope-created">
              ✍️ Created by Me
            </button>
          `}

          <span class="jira-clear-filters" id="jira-clear-filters" style="display:none;">Clear Filters</span>
        </div>
      </div>

      <!-- Scrum Board Columns Container -->
      <div class="jira-board-columns" id="jira-board-columns-root">
        <div style="padding:40px;color:#94a3b8;font-size:14px;font-weight:600;">
          Loading Scrum Board...
        </div>
      </div>

      <!-- Modal Injection Root -->
      <div id="jira-modals-root"></div>
    </div>
  `;

  // Fetch all initial data
  await Promise.all([
    fetchStats(),
    fetchTickets(),
    fetchEmployees(),
    fetchJobs()
  ]);

  renderStats();
  renderBoard();
  populateFilterDropdowns();
  bindGlobalEvents();

  if (initialTicketId) {
    openTicketDetailModal(initialTicketId);
  }

  // Auto-refresh board in background (every 12s) and on window focus
  const autoRefreshTimer = setInterval(() => {
    if (!document.contains(container)) {
      clearInterval(autoRefreshTimer);
      return;
    }
    const isInteracting = container.querySelector('.dragging') ||
      container.querySelector('input:focus') ||
      container.querySelector('textarea:focus');
    if (!isInteracting && !activeModalTicket) {
      reloadBoard();
    }
  }, 12000);

  const onWindowFocus = () => {
    if (document.contains(container) && !activeModalTicket) {
      reloadBoard();
    }
  };
  window.addEventListener('focus', onWindowFocus);

  /* ──────────────────────────────────────────────────────────────────────────
     DATA FETCHING
     ────────────────────────────────────────────────────────────────────────── */
  async function fetchTickets() {
    try {
      const qParams = new URLSearchParams();
      if (filters.search) qParams.set('search', filters.search);
      if (filters.priority !== 'all') qParams.set('priority', filters.priority);
      if (filters.category !== 'all') qParams.set('category', filters.category);
      if (filters.assigneeId !== 'all') qParams.set('assigneeId', filters.assigneeId);
      if (filters.jobId && filters.jobId !== 'all') qParams.set('jobId', filters.jobId);
      if (filters.reporterId && filters.reporterId !== 'all') qParams.set('reporterId', filters.reporterId);
      if (filters.scope === 'created') qParams.set('reporterId', currentUser?._id || currentUser?.id);
      if (filters.scope === 'assigned') qParams.set('assigneeId', currentUser?._id || currentUser?.id);
      if (filters.myIssuesOnly) qParams.set('myIssuesOnly', 'true');

      const data = await apiGet('/tickets?' + qParams.toString());
      tickets = Array.isArray(data) ? data : [];
    } catch (err) {
      flashToast(err.message || 'Failed to load tickets', true);
      tickets = [];
    }
  }

  async function fetchStats() {
    try {
      stats = await apiGet('/tickets/stats');
    } catch (e) {
      console.warn('Could not fetch ticket stats:', e);
    }
  }

  async function fetchEmployees() {
    try {
      const res = await apiGet('/users');
      // Filter strictly active internal staff (no clients)
      employees = (res || []).filter(u => u.active && u.role !== 'client');
    } catch (e) {
      console.warn('Could not fetch employees:', e);
    }
  }

  async function fetchJobs() {
    try {
      const res = await apiGet('/jobs?limit=250');
      jobs = Array.isArray(res) ? res : (res?.jobs || []);
    } catch (e) {
      console.warn('Could not fetch jobs:', e);
    }
  }

  /* ──────────────────────────────────────────────────────────────────────────
     RENDER STATS OVERVIEW RIBBON
     ────────────────────────────────────────────────────────────────────────── */
  function renderStats() {
    const root = container.querySelector('#jira-stats-root');
    if (!root) return;

    root.innerHTML = `
      <div class="jira-stat-card ${filters.status === 'all' && !filters.myIssuesOnly ? 'active' : ''}" data-stat-filter="all">
        <span class="jira-stat-val">${stats.total || 0}</span>
        <span class="jira-stat-lbl">Total Tickets</span>
      </div>
      <div class="jira-stat-card ${filters.status === 'To Do' ? 'active' : ''}" data-stat-filter="To Do">
        <span class="jira-stat-val">${stats.toDo || 0}</span>
        <span class="jira-stat-lbl">To Do</span>
      </div>
      <div class="jira-stat-card content ${filters.status === 'Content' ? 'active' : ''}" data-stat-filter="Content">
        <span class="jira-stat-val">${stats.content ?? (stats.inProgress || 0)}</span>
        <span class="jira-stat-lbl">Content</span>
      </div>
      <div class="jira-stat-card design ${filters.status === 'Design' ? 'active' : ''}" data-stat-filter="Design">
        <span class="jira-stat-val">${stats.design || 0}</span>
        <span class="jira-stat-lbl">Design</span>
      </div>
      <div class="jira-stat-card review ${filters.status === 'Under Review' ? 'active' : ''}" data-stat-filter="Under Review">
        <span class="jira-stat-val">${stats.underReview || 0}</span>
        <span class="jira-stat-lbl">Under Review</span>
      </div>
      <div class="jira-stat-card ready ${filters.status === 'Ready to Leave' ? 'active' : ''}" data-stat-filter="Ready to Leave">
        <span class="jira-stat-val">${stats.readyToLeave ?? (stats.resolved || stats.closed || 0)}</span>
        <span class="jira-stat-lbl">Ready to Leave</span>
      </div>
      <div class="jira-stat-card critical" data-stat-filter="critical">
        <span class="jira-stat-val">${stats.critical || 0}</span>
        <span class="jira-stat-lbl">Critical 🔴</span>
      </div>
      <div class="jira-stat-card overdue" data-stat-filter="overdue">
        <span class="jira-stat-val">${stats.overdue || 0}</span>
        <span class="jira-stat-lbl">Overdue ⚠️</span>
      </div>
    `;

    root.querySelectorAll('.jira-stat-card').forEach(card => {
      card.onclick = async () => {
        const filterType = card.dataset.statFilter;
        if (filterType === 'all') {
          filters.status = 'all';
          filters.priority = 'all';
        } else if (filterType === 'critical') {
          filters.priority = 'Critical';
          filters.status = 'all';
        } else {
          filters.status = filterType;
          filters.priority = 'all';
        }
        await reloadBoard();
      };
    });
  }

  function populateFilterDropdowns() {
    const selAssignee = container.querySelector('#jira-filter-assignee');
    if (selAssignee) {
      selAssignee.innerHTML = `
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${employees.map(u => `
          <option value="${u._id}" ${filters.assigneeId === u._id.toString() ? 'selected' : ''}>
            ${escapeHtml(u.name)} (${escapeHtml(u.role)})
          </option>
        `).join('')}
      `;
    }

    const selJob = container.querySelector('#jira-filter-job');
    if (selJob) {
      selJob.innerHTML = `
        <option value="all">Linked Job: All</option>
        ${jobs.map(j => `
          <option value="${j._id}" ${filters.jobId === j._id.toString() ? 'selected' : ''}>
            📁 ${escapeHtml(j.title || 'Untitled Job')}
          </option>
        `).join('')}
      `;
    }
  }

  /* ──────────────────────────────────────────────────────────────────────────
     RENDER SCRUM BOARD COLUMNS & CARDS
     ────────────────────────────────────────────────────────────────────────── */
  function renderBoard() {
    const boardRoot = container.querySelector('#jira-board-columns-root');
    if (!boardRoot) return;

    // Group tickets by status
    const grouped = {};
    STATUS_COLUMNS.forEach(col => { grouped[col.key] = []; });

    tickets.forEach(t => {
      let st = t.status || 'To Do';
      if (st === 'In Progress') st = 'Content';
      else if (st === 'Resolved') st = 'Under Review';
      else if (st === 'Closed') st = 'Ready to Leave';
      if (!grouped[st]) grouped[st] = [];
      grouped[st].push(t);
    });

    boardRoot.innerHTML = STATUS_COLUMNS.map(col => {
      const colTickets = grouped[col.key] || [];

      return `
        <div class="jira-board-column" data-status="${col.key}">
          <div class="jira-column-header">
            <div class="jira-col-title-wrap">
              <span class="jira-col-title">${escapeHtml(col.label)}</span>
              <span class="jira-col-badge">${colTickets.length}</span>
            </div>
          </div>
          <div class="jira-cards-list" data-column-status="${col.key}">
            ${colTickets.length === 0 ? `
              <div style="padding:28px 10px;text-align:center;color:#475569;font-size:12px;font-style:italic;">
                No tickets
              </div>
            ` : colTickets.map(t => renderCardHtml(t)).join('')}
          </div>
        </div>
      `;
    }).join('');

    bindDragAndDrop();
    bindCardClicks();
  }

  function renderCardHtml(t) {
    const cat = CATEGORIES.find(c => c.key === t.category) || CATEGORIES[0];
    const pri = PRIORITIES.find(p => p.key === t.priority) || PRIORITIES[2];
    const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Ready to Leave' && t.status !== 'Closed';
    const subtaskDone = (t.subtasks || []).filter(s => s.completed).length;
    const subtaskTotal = (t.subtasks || []).length;

    const assigneesList = Array.isArray(t.assignees) && t.assignees.length > 0
      ? t.assignees
      : (t.assignee && t.assignee.userId ? [t.assignee] : []);

    const myId = currentUser?._id || currentUser?.id;
    const isReporter = t.reporter && t.reporter.userId && String(t.reporter.userId) === String(myId);

    let avatarsHtml = '';
    if (assigneesList.length === 0) {
      avatarsHtml = `<div class="jira-avatar unassigned" title="Unassigned">?</div>`;
    } else {
      const displayAssignees = assigneesList.slice(0, 3);
      const remainingCount = assigneesList.length - 3;
      avatarsHtml = `
        <div class="jira-avatar-group">
          ${displayAssignees.map(a => `
            <div class="jira-avatar" title="Assignee: ${escapeHtml(a.name || 'Member')} (${escapeHtml(a.role || '')})">
              ${(a.avatar || a.name?.slice(0, 1) || 'U').toUpperCase()}
            </div>
          `).join('')}
          ${remainingCount > 0 ? `
            <div class="jira-avatar extra-count" title="${remainingCount} more assignees: ${escapeHtml(assigneesList.slice(3).map(a => a.name).join(', '))}">
              +${remainingCount}
            </div>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="jira-card" draggable="true" data-ticket-id="${t._id}">
        <div class="jira-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="jira-category-pill ${cat.slug}">
              ${cat.icon} ${cat.label}
            </span>
            ${isReporter ? `
              <span class="jira-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            ` : ''}
            ${t.dueDate ? `
              <span class="jira-due-pill ${isOverdue ? 'overdue' : ''}" title="Due Date">
                ${isOverdue ? '⚠️ ' : '📅 '}
                ${new Date(t.dueDate).toISOString().slice(0, 10)}
              </span>
            ` : ''}
          </div>
          <button type="button" class="jira-card-quick-del btn-delete-card-ticket" data-ticket-id="${t._id}" data-ticket-num="${escapeHtml(t.ticketId)}" title="Delete Ticket">
            🗑️
          </button>
        </div>

        <div class="jira-card-title" title="${escapeHtml(t.title)}">
          ${escapeHtml(t.title)}
        </div>

        ${(t.jobTitle || (t.jobId && t.jobId.title)) ? `
          <div class="jira-card-job-link" title="Linked Internal Job: ${escapeHtml(t.jobTitle || t.jobId.title)}">
            📁 ${escapeHtml(t.jobTitle || t.jobId.title)}
          </div>
        ` : ''}

        <div class="jira-card-bottom">
          <div class="jira-card-id-row">
            <span class="jira-pri-icon" title="Priority: ${pri.label}">${pri.icon}</span>
            <span class="jira-ticket-id">${escapeHtml(t.ticketId)}</span>
          </div>

          <div class="jira-card-assignee-row">
            ${subtaskTotal > 0 ? `
              <span class="jira-subtask-badge" title="${subtaskDone} of ${subtaskTotal} subtasks completed">
                ☑ ${subtaskDone}/${subtaskTotal}
              </span>
            ` : ''}
            ${avatarsHtml}
          </div>
        </div>
      </div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     HTML5 DRAG AND DROP ENGINE
     ────────────────────────────────────────────────────────────────────────── */
  function bindDragAndDrop() {
    const cards = container.querySelectorAll('.jira-card');
    const columns = container.querySelectorAll('.jira-board-column');

    cards.forEach(card => {
      card.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.ticketId);
        card.classList.add('dragging');
      };

      card.ondragend = () => {
        card.classList.remove('dragging');
      };
    });

    columns.forEach(col => {
      col.ondragover = (e) => {
        e.preventDefault();
        col.classList.add('drag-over');
      };

      col.ondragleave = () => {
        col.classList.remove('drag-over');
      };

      col.ondrop = async (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        const ticketDocId = e.dataTransfer.getData('text/plain');
        const targetStatus = col.dataset.status;

        if (!ticketDocId || !targetStatus) return;

        const ticket = tickets.find(t => t._id.toString() === ticketDocId);
        if (!ticket || ticket.status === targetStatus) return;

        // Optimistic UI update
        const prevStatus = ticket.status;
        ticket.status = targetStatus;
        renderBoard();

        try {
          const updated = await apiPatch(`/tickets/${ticketDocId}/status`, { status: targetStatus });
          flashToast(`Moved ${updated.ticketId} to ${targetStatus}`, false);
          await reloadBoard();
        } catch (err) {
          flashToast(err.message || 'Status update failed', true);
          ticket.status = prevStatus;
          await reloadBoard();
        }
      };
    });
  }

  function bindCardClicks() {
    // Quick Delete button on cards
    container.querySelectorAll('.btn-delete-card-ticket').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const ticketDocId = btn.dataset.ticketId;
        const ticketNum = btn.dataset.ticketNum || 'ticket';
        if (!confirm(`Are you sure you want to permanently delete ticket ${ticketNum}?`)) return;

        btn.disabled = true;
        try {
          await apiDelete(`/tickets/${ticketDocId}`);
          flashToast(`Ticket ${ticketNum} deleted`, false);
          await reloadBoard();
        } catch (err) {
          flashToast(err.message || 'Failed to delete ticket', true);
          btn.disabled = false;
        }
      };
    });

    container.querySelectorAll('.jira-card').forEach(card => {
      card.onclick = (e) => {
        // Prevent trigger if clicking an internal link or delete button
        if (e.target.tagName === 'A' || e.target.closest('.btn-delete-card-ticket')) return;
        const ticketDocId = card.dataset.ticketId;
        openTicketDetailModal(ticketDocId);
      };
    });
  }

  /* ──────────────────────────────────────────────────────────────────────────
     GLOBAL FILTER & HEADER EVENTS
     ────────────────────────────────────────────────────────────────────────── */
  function bindGlobalEvents() {
    // Refresh button
    const btnRefresh = container.querySelector('#btn-jira-refresh');
    if (btnRefresh) {
      btnRefresh.onclick = async () => {
        btnRefresh.classList.add('pulse');
        await reloadBoard();
        flashToast('Board updated', false);
        btnRefresh.classList.remove('pulse');
      };
    }

    // Create ticket button
    const btnCreate = container.querySelector('#btn-jira-create-ticket');
    if (btnCreate) {
      btnCreate.onclick = () => {
        openCreateTicketModal();
      };
    }

    // Search input (debounced)
    const searchInp = container.querySelector('#jira-search-input');
    let searchDebounce = null;
    if (searchInp) {
      searchInp.oninput = (e) => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(async () => {
          filters.search = e.target.value.trim();
          updateClearFiltersVisibility();
          await reloadBoard();
        }, 300);
      };
    }

    // Priority filter
    const priSelect = container.querySelector('#jira-filter-priority');
    if (priSelect) {
      priSelect.onchange = async (e) => {
        filters.priority = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Category filter
    const catSelect = container.querySelector('#jira-filter-category');
    if (catSelect) {
      catSelect.onchange = async (e) => {
        filters.category = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Linked Job filter
    const jobSelect = container.querySelector('#jira-filter-job');
    if (jobSelect) {
      jobSelect.onchange = async (e) => {
        filters.jobId = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Assignee filter
    const assSelect = container.querySelector('#jira-filter-assignee');
    if (assSelect) {
      assSelect.onchange = async (e) => {
        filters.assigneeId = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Only My Issues pill (Admin)
    const pillMy = container.querySelector('#jira-pill-my-issues');
    if (pillMy) {
      pillMy.onclick = async () => {
        filters.myIssuesOnly = !filters.myIssuesOnly;
        pillMy.classList.toggle('active', filters.myIssuesOnly);
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Employee scope filter pills (All / Assigned / Created)
    const pillScopeAll = container.querySelector('#jira-pill-scope-all');
    const pillScopeAssigned = container.querySelector('#jira-pill-scope-assigned');
    const pillScopeCreated = container.querySelector('#jira-pill-scope-created');

    const setScope = async (scope) => {
      filters.scope = scope;
      if (pillScopeAll) pillScopeAll.classList.toggle('active', scope === 'all');
      if (pillScopeAssigned) pillScopeAssigned.classList.toggle('active', scope === 'assigned');
      if (pillScopeCreated) pillScopeCreated.classList.toggle('active', scope === 'created');
      updateClearFiltersVisibility();
      await reloadBoard();
    };

    if (pillScopeAll) pillScopeAll.onclick = () => setScope('all');
    if (pillScopeAssigned) pillScopeAssigned.onclick = () => setScope('assigned');
    if (pillScopeCreated) pillScopeCreated.onclick = () => setScope('created');

    // Clear filters
    const clearBtn = container.querySelector('#jira-clear-filters');
    if (clearBtn) {
      clearBtn.onclick = async () => {
        filters = {
          search: '',
          status: 'all',
          priority: 'all',
          category: 'all',
          assigneeId: 'all',
          reporterId: 'all',
          scope: 'all',
          jobId: 'all',
          myIssuesOnly: false
        };
        if (searchInp) searchInp.value = '';
        if (priSelect) priSelect.value = 'all';
        if (catSelect) catSelect.value = 'all';
        const jobSel = container.querySelector('#jira-filter-job');
        if (jobSel) jobSel.value = 'all';
        if (assSelect) assSelect.value = 'all';
        if (pillMy) pillMy.classList.remove('active');
        if (pillScopeAll) pillScopeAll.classList.add('active');
        if (pillScopeAssigned) pillScopeAssigned.classList.remove('active');
        if (pillScopeCreated) pillScopeCreated.classList.remove('active');
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }
  }

  function updateClearFiltersVisibility() {
    const clearBtn = container.querySelector('#jira-clear-filters');
    if (!clearBtn) return;
    const hasActive = filters.search || filters.priority !== 'all' || filters.category !== 'all' || (filters.jobId && filters.jobId !== 'all') || filters.assigneeId !== 'all' || filters.myIssuesOnly || (filters.scope && filters.scope !== 'all');
    clearBtn.style.display = hasActive ? 'inline' : 'none';
  }

  async function reloadBoard() {
    await fetchTickets();
    renderBoard();
  }

  /* ──────────────────────────────────────────────────────────────────────────
     JIRA ISSUE DETAIL MODAL (2-COLUMN COMPREHENSIVE VIEW)
     ────────────────────────────────────────────────────────────────────────── */
  async function openTicketDetailModal(ticketDocId) {
    const modalRoot = container.querySelector('#jira-modals-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="jira-modal-backdrop">
        <div class="jira-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;

    try {
      activeModalTicket = await apiGet(`/tickets/${ticketDocId}`);
    } catch (e) {
      flashToast(e.message || 'Could not load ticket', true);
      modalRoot.innerHTML = '';
      return;
    }

    renderTicketDetailModal();
  }

  function renderTicketDetailModal() {
    const modalRoot = container.querySelector('#jira-modals-root');
    if (!modalRoot || !activeModalTicket) return;

    const t = activeModalTicket;
    const cat = CATEGORIES.find(c => c.key === t.category) || CATEGORIES[0];
    const pri = PRIORITIES.find(p => p.key === t.priority) || PRIORITIES[2];

    const subtasks = t.subtasks || [];
    const subtaskDone = subtasks.filter(s => s.completed).length;
    const subtaskPct = subtasks.length > 0 ? Math.round((subtaskDone / subtasks.length) * 100) : 0;

    const attachments = t.attachments || [];
    const comments = t.comments || [];
    const history = (t.history || []).slice().reverse();
    const workLogs = t.workLogs || [];
    const linkedTickets = t.linkedTickets || [];

    const myId = currentUser?._id || currentUser?.id;
    const isReporter = (t.reporter && t.reporter.userId && String(t.reporter.userId) === String(myId)) ||
                       (t.userId && String(t.userId) === String(myId));
    const assigneesList = Array.isArray(t.assignees) && t.assignees.length > 0
      ? t.assignees
      : (t.assignee && t.assignee.userId ? [t.assignee] : []);
    const isAssigned = assigneesList.some(a => a && a.userId && String(a.userId) === String(myId));
    const isSuper = userRole === 'superadmin' || userRole === 'admin';
    const canManageTicket = isSuper || isReporter || isAssigned;

    const currentJobId = t.jobId?._id ? t.jobId._id.toString() : (t.jobId ? t.jobId.toString() : '');
    const currentJobTitle = t.jobTitle || (t.jobId && t.jobId.title) || '';

    modalRoot.innerHTML = `
      <div class="jira-modal-backdrop" id="jira-detail-backdrop">
        <div class="jira-modal-card">
          <!-- Top Bar -->
          <div class="jira-modal-header">
            <div class="jira-modal-title-row">
              <span class="jira-category-pill ${cat.slug}">${cat.icon} ${cat.label}</span>
              <span class="jira-ticket-id" style="font-size:13px;color:#38bdf8;">${escapeHtml(t.ticketId)}</span>
            </div>
            <button class="jira-modal-close" id="btn-close-jira-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="jira-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="jira-detail-main">
              <!-- Issue Title Header -->
              <div class="jira-issue-header-wrap">
                <input type="text" class="jira-editable-title" id="inp-detail-title" value="${escapeHtml(t.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Description</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-desc-edit">
                    ${isEditingDescription ? 'Cancel' : '✏️ Edit'}
                  </button>
                </div>

                ${isEditingDescription ? `
                  <div class="jira-editor-toolbar">
                    <button type="button" class="jira-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="jira-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="jira-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="jira-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="jira-desc-editor" rows="6">${escapeHtml(t.description || '')}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-jira-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-jira-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                ` : `
                  <div class="jira-desc-wrap" id="view-detail-desc">
                    ${t.description ? escapeHtml(t.description) : '<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Attachments Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Attachments (${attachments.length})</span>
                  <label class="btn-jira-secondary" style="font-size:11px;padding:4px 8px;cursor:pointer;">
                    📎 Upload File
                    <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                  </label>
                </div>

                ${attachments.length === 0 ? `
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload screenshots, logs, or briefs.</div>
                ` : `
                  <div class="jira-attachments-grid">
                    ${attachments.map(att => `
                      <div class="jira-att-card">
                        <div class="jira-att-left">
                          <span>📎</span>
                          <a href="${att.url}" target="_blank" rel="noopener noreferrer" class="jira-att-name" title="${escapeHtml(att.name)}">
                            ${escapeHtml(att.name)}
                          </a>
                        </div>
                        <button type="button" class="jira-att-del btn-del-att" data-att-id="${att.id}" title="Delete file">&times;</button>
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Subtasks (${subtaskDone}/${subtasks.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${subtaskPct}% Done</span>
                </div>

                <div class="jira-subtask-progress">
                  <div class="jira-subtask-bar" style="width:${subtaskPct}%"></div>
                </div>

                <div class="jira-subtask-list">
                  ${subtasks.map(s => `
                    <div class="jira-subtask-item">
                      <div class="jira-subtask-left">
                        <input type="checkbox" class="jira-subtask-cb cb-subtask-toggle" data-subtask-id="${s.id}" ${s.completed ? 'checked' : ''} />
                        <span class="jira-subtask-title ${s.completed ? 'done' : ''}">${escapeHtml(s.title)}</span>
                      </div>
                      <button type="button" class="jira-att-del btn-del-subtask" data-subtask-id="${s.id}" title="Remove subtask">&times;</button>
                    </div>
                  `).join('')}
                </div>

                <div class="jira-subtask-add-row">
                  <input type="text" id="inp-new-subtask" class="jira-subtask-input" placeholder="+ Add a subtask (press Enter)..." />
                  <button type="button" class="btn-jira-secondary" id="btn-add-subtask">Add</button>
                </div>
              </div>

              <!-- Linked Work Items Section -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span>Linked Work Items (${linkedTickets.length})</span>
                  <button type="button" class="btn-jira-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${linkedTickets.length === 0 ? `
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                ` : `
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${linkedTickets.map(lnk => `
                      <div class="jira-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${escapeHtml(lnk.relationship)}</span>
                          <span class="jira-ticket-id" style="color:#38bdf8;">${escapeHtml(lnk.ticketId)}</span>
                          <span style="font-size:12.5px;color:#f1f5f9;">${escapeHtml(lnk.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="jira-col-badge">${escapeHtml(lnk.status || 'Open')}</span>
                          <button type="button" class="jira-att-del btn-del-link" data-link-id="${lnk.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `}

                <div id="jira-link-box" style="display:none;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;margin-top:6px;">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="sel-link-rel" class="jira-select-field" style="width:140px;">
                      <option value="relates to">relates to</option>
                      <option value="blocks">blocks</option>
                      <option value="is blocked by">is blocked by</option>
                      <option value="duplicates">duplicates</option>
                    </select>
                    <input type="text" id="inp-link-target" class="jira-subtask-input" placeholder="Ticket ID (e.g. SUP-002)..." style="flex:1;" />
                    <button class="btn-jira-primary" id="btn-submit-link">Link</button>
                    <button class="btn-jira-secondary" id="btn-cancel-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Dedicated Linked Internal Job Block -->
              <div class="jira-section-block">
                <div class="jira-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="jira-tool-btn" id="btn-toggle-job-link">
                    ${currentJobTitle ? '✏️ Change Job' : '+ Link a Job'}
                  </button>
                </div>
                ${currentJobTitle ? `
                  <div class="jira-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div style="font-weight:700;color:#f8fafc;font-size:13px;">${escapeHtml(currentJobTitle)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${escapeHtml(currentJobId)}</div>
                      </div>
                    </div>
                    <button type="button" class="jira-tool-btn" id="btn-unlink-job" style="color:#ef4444;border-color:rgba(239,68,68,0.3);" title="Remove job link">
                      ✕ Unlink
                    </button>
                  </div>
                ` : `
                  <div style="color:#64748b;font-size:12.5px;font-style:italic;padding:4px 0;">
                    No job linked yet. Click "+ Link a Job" to associate this ticket with a client deliverable or project.
                  </div>
                `}

                <div id="jira-job-link-box" style="display:none;padding:12px;background:#162032;border:1px solid #334155;border-radius:6px;margin-top:8px;">
                  <label style="font-size:11.5px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="jira-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${jobs.map(j => `
                        <option value="${j._id}" ${currentJobId === j._id.toString() ? 'selected' : ''}>
                          📁 ${escapeHtml(j.title || 'Untitled Job')}
                        </option>
                      `).join('')}
                    </select>
                    <button class="btn-jira-primary" id="btn-save-job-link">Link Job</button>
                    <button class="btn-jira-secondary" id="btn-cancel-job-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="jira-section-block" style="margin-top:10px;">
                <div class="jira-sec-title">Activity</div>
                <div class="jira-activity-tabs">
                  <button type="button" class="jira-act-tab ${activeActivityTab === 'comments' ? 'active' : ''}" data-act-tab="comments">
                    Comments (${comments.length})
                  </button>
                  <button type="button" class="jira-act-tab ${activeActivityTab === 'history' ? 'active' : ''}" data-act-tab="history">
                    History (${history.length})
                  </button>
                  <button type="button" class="jira-act-tab ${activeActivityTab === 'worklog' ? 'active' : ''}" data-act-tab="worklog">
                    Work Log (${workLogs.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${activeActivityTab === 'comments' ? `
                  <div class="jira-comments-feed">
                    ${comments.map(c => `
                      <div class="jira-comment-item">
                        <div class="jira-avatar" style="background:#2563eb;">
                          ${(c.userName || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <div class="jira-comment-main">
                          <div class="jira-comment-head">
                            <span class="jira-comment-author">${escapeHtml(c.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${escapeHtml(c.userRole)})</span></span>
                            <span class="jira-comment-time">${timeAgo(c.createdAt)}</span>
                          </div>
                          <div class="jira-comment-body">${escapeHtml(c.content)}</div>
                        </div>
                      </div>
                    `).join('')}

                    <!-- Add Comment Composer -->
                    <div class="jira-comment-composer">
                      <div class="jira-avatar" style="background:#3b82f6;">
                        ${(currentUser?.name || 'U').slice(0, 1).toUpperCase()}
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                        <textarea id="inp-new-comment" class="jira-comment-textarea" rows="2" placeholder="Add an internal comment..."></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                          <button class="btn-jira-primary" id="btn-submit-comment">Save Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : ''}

                <!-- B. History Tab -->
                ${activeActivityTab === 'history' ? `
                  <div class="jira-history-feed">
                    ${history.length === 0 ? `
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    ` : history.map(h => `
                      <div class="jira-history-item">
                        <div class="jira-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(h.userName || 'S').slice(0, 1).toUpperCase()}
                        </div>
                        <div class="jira-history-main">
                          <div class="jira-history-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${escapeHtml(h.userName)}</span>
                            <span class="jira-comment-time">${timeAgo(h.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong style="color:#cbd5e1;">${escapeHtml(h.field)}</strong>:
                            ${h.from ? `<span style="text-decoration:line-through;color:#ef4444;">${escapeHtml(h.from)}</span> ➔ ` : ''}
                            <span style="color:#10b981;font-weight:600;">${escapeHtml(h.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                <!-- C. Work Log Tab -->
                ${activeActivityTab === 'worklog' ? `
                  <div class="jira-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${t.loggedHours || 0} hrs</strong></span>
                      <button class="btn-jira-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="jira-worklog-box" style="display:none;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="jira-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="jira-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-jira-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-jira-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${workLogs.length === 0 ? `
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    ` : workLogs.map(w => `
                      <div class="jira-worklog-item">
                        <div class="jira-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(w.userName || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <div class="jira-worklog-main">
                          <div class="jira-worklog-head">
                            <span style="font-weight:600;color:#f1f5f9;font-size:12px;">${escapeHtml(w.userName)} logged <strong style="color:#38bdf8;">${escapeHtml(w.timeSpent)}</strong></span>
                            <span class="jira-comment-time">${timeAgo(w.loggedAt)}</span>
                          </div>
                          ${w.description ? `<div style="font-size:12px;color:#cbd5e1;">${escapeHtml(w.description)}</div>` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Right Sidebar Panel (32%) -->
            <div class="jira-detail-sidebar">
              <!-- Status -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Status</span>
                <select id="sel-detail-status" class="jira-select-field">
                  ${STATUS_COLUMNS.map(s => {
      let normSt = t.status || 'To Do';
      if (normSt === 'In Progress') normSt = 'Content';
      else if (normSt === 'Resolved') normSt = 'Under Review';
      else if (normSt === 'Closed') normSt = 'Ready to Leave';
      return `
                      <option value="${s.key}" ${normSt === s.key ? 'selected' : ''}>
                        ${s.label}
                      </option>
                    `;
    }).join('')}
                </select>
              </div>

              <!-- Priority -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="jira-select-field">
                  ${PRIORITIES.map(p => `
                    <option value="${p.key}" ${t.priority === p.key ? 'selected' : ''}>
                      ${p.icon} ${p.label}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="jira-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="jira-side-lbl" style="margin-bottom:0;">Assigned Personnel (${assigneesList.length})</span>
                  ${canManageTicket ? `
                    <button type="button" class="jira-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  ` : ''}
                </div>

                <div class="jira-assigned-chips-wrap">
                  ${assigneesList.length === 0 ? `
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  ` : assigneesList.map(a => `
                    <div class="jira-assignee-chip">
                      <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(a.avatar || a.name?.slice(0, 1) || 'U').toUpperCase()}
                      </div>
                      <span class="jira-assignee-chip-name" title="${escapeHtml(a.name)}">${escapeHtml(a.name)}</span>
                      ${canManageTicket ? `
                        <button type="button" class="jira-assignee-chip-remove btn-remove-assignee" data-user-id="${a.userId}" title="Remove ${escapeHtml(a.name)}">&times;</button>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="jira-detail-assignee-box" style="display:none;margin-top:8px;padding:10px;background:#162032;border:1px solid #334155;border-radius:6px;">
                  <div style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="jira-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${employees.map(u => {
                      const isAssigned = assigneesList.some(a => a && a.userId && String(a.userId) === String(u._id));
                      return `
                        <label class="jira-emp-check-item ${isAssigned ? 'selected' : ''}">
                          <input type="checkbox" class="chk-detail-emp" value="${u._id}" ${isAssigned ? 'checked' : ''} />
                          <div class="jira-avatar" style="width:18px;height:18px;font-size:9px;">${(u.name || 'U').slice(0, 1).toUpperCase()}</div>
                          <span style="font-size:12px;color:#f1f5f9;flex:1;">
                            ${escapeHtml(u.name)} <span style="font-size:10.5px;color:#94a3b8;">(${escapeHtml(u.role)})</span>
                          </span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                  <div style="margin-top:8px;display:flex;justify-content:flex-end;gap:6px;">
                    <button type="button" class="btn-jira-primary" id="btn-save-detail-assignees" style="font-size:11px;padding:4px 10px;">
                      Save Assignees
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="jira-avatar" style="background:#2563eb;">
                    ${(t.reporter?.name || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${escapeHtml(t.reporter?.name || 'Staff')}</div>
                    <div style="font-size:11px;color:#94a3b8;">${escapeHtml(t.reporter?.role || 'employee')}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Category</span>
                <select id="sel-detail-category" class="jira-select-field">
                  ${CATEGORIES.map(c => `
                    <option value="${c.key}" ${t.category === c.key ? 'selected' : ''}>
                      ${c.icon} ${c.label}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Due Date -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="jira-date-field" value="${t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : ''}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="jira-select-field">
                  <option value="">None (Workspace General)</option>
                  ${jobs.map(j => `
                    <option value="${j._id}" ${currentJobId === j._id.toString() ? 'selected' : ''}>
                      📁 ${escapeHtml(j.title || 'Untitled Job')}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="jira-side-field">
                <span class="jira-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${t.loggedHours || 0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" value="${t.estimatedHours || 0}" style="width:45px;background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:2px 4px;border-radius:4px;font-size:12px;" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(t.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(t.updatedAt).toLocaleString()}</div>
                ${t.resolvedAt ? `<div style="color:#10b981;">Resolved: ${new Date(t.resolvedAt).toLocaleString()}</div>` : ''}
              </div>

              <!-- Actions (Delete) -->
              ${(isSuper || isReporter || isAssigned) ? `
                <div style="padding-top:10px;">
                  <button type="button" class="jira-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
                    🗑️ Delete Ticket
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    bindTicketDetailEvents();
  }

  function bindTicketDetailEvents() {
    const modalRoot = container.querySelector('#jira-modals-root');
    if (!modalRoot || !activeModalTicket) return;

    // Close button & backdrop click
    const btnClose = modalRoot.querySelector('#btn-close-jira-modal');
    if (btnClose) btnClose.onclick = closeTicketDetailModal;

    const backdrop = modalRoot.querySelector('#jira-detail-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) closeTicketDetailModal();
      };
    }

    // Editable Title (Save on change/blur)
    const inpTitle = modalRoot.querySelector('#inp-detail-title');
    if (inpTitle) {
      inpTitle.onchange = async () => {
        const val = inpTitle.value.trim();
        if (!val) return;
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { title: val });
          activeModalTicket = updated;
          await reloadBoard();
        } catch (e) {
          flashToast(e.message || 'Failed to update title', true);
        }
      };
    }

    // Description edit toggle
    const btnToggleDesc = modalRoot.querySelector('#btn-toggle-desc-edit');
    if (btnToggleDesc) {
      btnToggleDesc.onclick = () => {
        isEditingDescription = !isEditingDescription;
        renderTicketDetailModal();
      };
    }

    const btnCancelDesc = modalRoot.querySelector('#btn-cancel-desc');
    if (btnCancelDesc) {
      btnCancelDesc.onclick = () => {
        isEditingDescription = false;
        renderTicketDetailModal();
      };
    }

    const btnSaveDesc = modalRoot.querySelector('#btn-save-desc');
    if (btnSaveDesc) {
      btnSaveDesc.onclick = async () => {
        const val = modalRoot.querySelector('#inp-detail-desc')?.value;
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { description: val });
          activeModalTicket = updated;
          isEditingDescription = false;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast('Description saved', false);
        } catch (e) {
          flashToast(e.message || 'Failed to save description', true);
        }
      };
    }

    // Status change
    const selStatus = modalRoot.querySelector('#sel-detail-status');
    if (selStatus) {
      selStatus.onchange = async (e) => {
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}/status`, { status: e.target.value });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await fetchStats();
          renderStats();
          await reloadBoard();
          flashToast(`Status changed to ${updated.status}`, false);
        } catch (err) {
          flashToast(err.message || 'Status change failed', true);
        }
      };
    }

    // Priority change
    const selPriority = modalRoot.querySelector('#sel-detail-priority');
    if (selPriority) {
      selPriority.onchange = async (e) => {
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { priority: e.target.value });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    // Assignee Picker Toggle & Actions
    const btnToggleAssigneePicker = modalRoot.querySelector('#btn-toggle-assignee-picker');
    const detailAssigneeBox = modalRoot.querySelector('#jira-detail-assignee-box');
    const btnCloseDetailAssignee = modalRoot.querySelector('#btn-close-detail-assignee-box');
    const btnSaveDetailAssignees = modalRoot.querySelector('#btn-save-detail-assignees');

    if (btnToggleAssigneePicker && detailAssigneeBox) {
      btnToggleAssigneePicker.onclick = () => {
        const isHidden = detailAssigneeBox.style.display === 'none';
        detailAssigneeBox.style.display = isHidden ? 'block' : 'none';
      };
    }

    if (btnCloseDetailAssignee && detailAssigneeBox) {
      btnCloseDetailAssignee.onclick = () => {
        detailAssigneeBox.style.display = 'none';
      };
    }

    modalRoot.querySelectorAll('.chk-detail-emp').forEach(chk => {
      chk.onchange = () => {
        chk.closest('.jira-emp-check-item')?.classList.toggle('selected', chk.checked);
      };
    });

    if (btnSaveDetailAssignees) {
      btnSaveDetailAssignees.onclick = async () => {
        const checkedIds = Array.from(modalRoot.querySelectorAll('.chk-detail-emp:checked')).map(c => c.value);
        try {
          btnSaveDetailAssignees.disabled = true;
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { assigneeIds: checkedIds });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast('Assignees updated!', false);
        } catch (err) {
          flashToast(err.message, true);
          btnSaveDetailAssignees.disabled = false;
        }
      };
    }

    // Remove single assignee chip
    modalRoot.querySelectorAll('.btn-remove-assignee').forEach(btn => {
      btn.onclick = async () => {
        const removeUserId = btn.dataset.userId;
        const currentAssignees = Array.isArray(activeModalTicket.assignees) && activeModalTicket.assignees.length > 0
          ? activeModalTicket.assignees
          : (activeModalTicket.assignee?.userId ? [activeModalTicket.assignee] : []);
        const newIds = currentAssignees
          .filter(a => a && a.userId && String(a.userId) !== String(removeUserId))
          .map(a => String(a.userId));
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { assigneeIds: newIds });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast('Assignee removed', false);
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    });

    // Category change
    const selCategory = modalRoot.querySelector('#sel-detail-category');
    if (selCategory) {
      selCategory.onchange = async (e) => {
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { category: e.target.value });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    // Due date change
    const inpDueDate = modalRoot.querySelector('#inp-detail-duedate');
    if (inpDueDate) {
      inpDueDate.onchange = async (e) => {
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { dueDate: e.target.value || null });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    // Linked Job change (Sidebar)
    const selJob = modalRoot.querySelector('#sel-detail-job');
    if (selJob) {
      selJob.onchange = async (e) => {
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { jobId: e.target.value || null });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast(e.target.value ? 'Job linked to ticket! 📁' : 'Job unlinked', false);
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    // Toggle Job link form (Main Section)
    const btnToggleJobLink = modalRoot.querySelector('#btn-toggle-job-link');
    const jobLinkBox = modalRoot.querySelector('#jira-job-link-box');
    if (btnToggleJobLink && jobLinkBox) {
      btnToggleJobLink.onclick = () => {
        jobLinkBox.style.display = jobLinkBox.style.display === 'none' ? 'block' : 'none';
      };
    }

    const btnCancelJobLink = modalRoot.querySelector('#btn-cancel-job-link');
    if (btnCancelJobLink && jobLinkBox) {
      btnCancelJobLink.onclick = () => {
        jobLinkBox.style.display = 'none';
      };
    }

    const btnSaveJobLink = modalRoot.querySelector('#btn-save-job-link');
    if (btnSaveJobLink) {
      btnSaveJobLink.onclick = async () => {
        const val = modalRoot.querySelector('#inp-modal-job-select')?.value || null;
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { jobId: val });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast(val ? 'Job linked to ticket! 📁' : 'Job unlinked', false);
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    const btnUnlinkJob = modalRoot.querySelector('#btn-unlink-job');
    if (btnUnlinkJob) {
      btnUnlinkJob.onclick = async () => {
        if (!confirm('Unlink this job from the support ticket?')) return;
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { jobId: null });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast('Job unlinked', false);
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    // Estimated hours change
    const inpEstHours = modalRoot.querySelector('#inp-detail-esthours');
    if (inpEstHours) {
      inpEstHours.onchange = async (e) => {
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}`, { estimatedHours: Number(e.target.value) || 0 });
          activeModalTicket = updated;
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    }

    // Subtasks checkbox toggle
    modalRoot.querySelectorAll('.cb-subtask-toggle').forEach(cb => {
      cb.onchange = async () => {
        const sId = cb.dataset.subtaskId;
        try {
          const updated = await apiPatch(`/tickets/${activeModalTicket._id}/subtasks/${sId}`, { completed: cb.checked });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    });

    // Delete subtask
    modalRoot.querySelectorAll('.btn-del-subtask').forEach(btn => {
      btn.onclick = async () => {
        const sId = btn.dataset.subtaskId;
        try {
          const updated = await apiDelete(`/tickets/${activeModalTicket._id}/subtasks/${sId}`);
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    });

    // Add subtask
    const inpSubtask = modalRoot.querySelector('#inp-new-subtask');
    const btnAddSubtask = modalRoot.querySelector('#btn-add-subtask');
    const handleAddSubtask = async () => {
      const val = inpSubtask?.value.trim();
      if (!val) return;
      try {
        const updated = await apiPost(`/tickets/${activeModalTicket._id}/subtasks`, { title: val });
        activeModalTicket = updated;
        renderTicketDetailModal();
        await reloadBoard();
      } catch (err) {
        flashToast(err.message, true);
      }
    };
    if (btnAddSubtask) btnAddSubtask.onclick = handleAddSubtask;
    if (inpSubtask) {
      inpSubtask.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAddSubtask();
        }
      };
    }

    // Attachments upload
    const attUploadInp = modalRoot.querySelector('#inp-detail-att-upload');
    if (attUploadInp) {
      attUploadInp.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        flashToast('Uploading attachment(s)...', false);
        const uploadedMeta = [];

        for (const file of files) {
          // Read as base64 to leverage existing /api/upload
          const reader = new FileReader();
          await new Promise((resolve) => {
            reader.onload = async () => {
              try {
                const base64Data = reader.result.split(',')[1];
                const res = await apiPost('/upload', {
                  files: [{
                    name: file.name,
                    data: base64Data,
                    size: file.size,
                    type: file.type
                  }]
                });
                if (res && res.files && res.files[0]) {
                  uploadedMeta.push({
                    name: res.files[0].name || file.name,
                    url: res.files[0].url,
                    size: file.size,
                    type: file.type
                  });
                }
              } catch (upErr) {
                console.warn('Upload error for file:', file.name, upErr);
              }
              resolve();
            };
            reader.readAsDataURL(file);
          });
        }

        if (uploadedMeta.length) {
          try {
            const updated = await apiPost(`/tickets/${activeModalTicket._id}/attachments`, { attachments: uploadedMeta });
            activeModalTicket = updated;
            renderTicketDetailModal();
            flashToast('File(s) attached successfully', false);
          } catch (err) {
            flashToast(err.message || 'Failed to attach file(s)', true);
          }
        }
      };
    }

    // Delete attachment
    modalRoot.querySelectorAll('.btn-del-att').forEach(btn => {
      btn.onclick = async () => {
        const aId = btn.dataset.attId;
        try {
          const updated = await apiDelete(`/tickets/${activeModalTicket._id}/attachments/${aId}`);
          activeModalTicket = updated;
          renderTicketDetailModal();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    });

    // Activity Tabs
    modalRoot.querySelectorAll('.jira-act-tab').forEach(tab => {
      tab.onclick = () => {
        activeActivityTab = tab.dataset.actTab;
        renderTicketDetailModal();
      };
    });

    // Add Comment
    const inpComment = modalRoot.querySelector('#inp-new-comment');
    const btnComment = modalRoot.querySelector('#btn-submit-comment');
    if (btnComment && inpComment) {
      btnComment.onclick = async () => {
        const val = inpComment.value.trim();
        if (!val) return;
        try {
          btnComment.disabled = true;
          btnComment.textContent = 'Saving...';
          const updated = await apiPost(`/tickets/${activeModalTicket._id}/comments`, { content: val });
          activeModalTicket = updated;
          renderTicketDetailModal();
          flashToast('Comment added', false);
        } catch (err) {
          flashToast(err.message || 'Failed to add comment', true);
        } finally {
          btnComment.disabled = false;
        }
      };
    }

    // Link Issue Dialog
    const btnOpenLink = modalRoot.querySelector('#btn-open-link-dialog');
    const linkBox = modalRoot.querySelector('#jira-link-box');
    const btnCancelLink = modalRoot.querySelector('#btn-cancel-link');
    const btnSubmitLink = modalRoot.querySelector('#btn-submit-link');
    const inpLinkTarget = modalRoot.querySelector('#inp-link-target');
    const selLinkRel = modalRoot.querySelector('#sel-link-rel');

    if (btnOpenLink && linkBox) {
      btnOpenLink.onclick = () => { linkBox.style.display = 'block'; };
    }
    if (btnCancelLink && linkBox) {
      btnCancelLink.onclick = () => { linkBox.style.display = 'none'; };
    }
    if (btnSubmitLink && linkBox) {
      btnSubmitLink.onclick = async () => {
        const target = inpLinkTarget?.value.trim();
        const rel = selLinkRel?.value || 'relates to';
        if (!target) return;
        try {
          btnSubmitLink.disabled = true;
          const updated = await apiPost(`/tickets/${activeModalTicket._id}/links`, { targetTicketId: target, relationship: rel });
          activeModalTicket = updated;
          renderTicketDetailModal();
          flashToast(`Linked with ${target}`, false);
        } catch (err) {
          flashToast(err.message || 'Failed to link ticket', true);
        } finally {
          btnSubmitLink.disabled = false;
        }
      };
    }

    // Delete linked issue
    modalRoot.querySelectorAll('.btn-del-link').forEach(btn => {
      btn.onclick = async () => {
        const lId = btn.dataset.linkId;
        try {
          const updated = await apiDelete(`/tickets/${activeModalTicket._id}/links/${lId}`);
          activeModalTicket = updated;
          renderTicketDetailModal();
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    });

    // Log Work Dialog
    const btnOpenWorklog = modalRoot.querySelector('#btn-open-worklog-dialog');
    const worklogBox = modalRoot.querySelector('#jira-worklog-box');
    const btnCancelWorklog = modalRoot.querySelector('#btn-cancel-worklog');
    const btnSubmitWorklog = modalRoot.querySelector('#btn-submit-worklog');
    const inpWorkTime = modalRoot.querySelector('#inp-worklog-time');
    const inpWorkDesc = modalRoot.querySelector('#inp-worklog-desc');

    if (btnOpenWorklog && worklogBox) {
      btnOpenWorklog.onclick = () => { worklogBox.style.display = 'block'; };
    }
    if (btnCancelWorklog && worklogBox) {
      btnCancelWorklog.onclick = () => { worklogBox.style.display = 'none'; };
    }
    if (btnSubmitWorklog && worklogBox) {
      btnSubmitWorklog.onclick = async () => {
        const time = inpWorkTime?.value.trim();
        const desc = inpWorkDesc?.value.trim();
        if (!time) {
          flashToast('Enter time spent (e.g. 2h 30m)', true);
          return;
        }
        try {
          btnSubmitWorklog.disabled = true;
          const updated = await apiPost(`/tickets/${activeModalTicket._id}/worklogs`, { timeSpent: time, description: desc });
          activeModalTicket = updated;
          renderTicketDetailModal();
          flashToast('Work logged', false);
        } catch (err) {
          flashToast(err.message || 'Failed to log work', true);
        } finally {
          btnSubmitWorklog.disabled = false;
        }
      };
    }

    // Delete Ticket
    const btnDeleteTicket = modalRoot.querySelector('#btn-delete-ticket');
    if (btnDeleteTicket) {
      btnDeleteTicket.onclick = async () => {
        if (!confirm(`Are you sure you want to permanently delete ticket ${activeModalTicket.ticketId}?`)) return;
        try {
          btnDeleteTicket.disabled = true;
          await apiDelete(`/tickets/${activeModalTicket._id}`);
          flashToast(`Ticket ${activeModalTicket.ticketId} deleted`, false);
          closeTicketDetailModal();
          await fetchStats();
          renderStats();
          await reloadBoard();
        } catch (err) {
          flashToast(err.message || 'Failed to delete ticket', true);
          btnDeleteTicket.disabled = false;
        }
      };
    }
  }

  function closeTicketDetailModal() {
    activeModalTicket = null;
    isEditingDescription = false;
    const modalRoot = container.querySelector('#jira-modals-root');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  /* ──────────────────────────────────────────────────────────────────────────
     CREATE TICKET MODAL (JIRA-STYLE)
     ────────────────────────────────────────────────────────────────────────── */
  function openCreateTicketModal(preSelectedJobId = null) {
    const modalRoot = container.querySelector('#jira-modals-root');
    if (!modalRoot) return;

    const chosenJobId = preSelectedJobId || (filters.jobId && filters.jobId !== 'all' ? filters.jobId : null);

    modalRoot.innerHTML = `
      <div class="jira-modal-backdrop" id="jira-create-backdrop">
        <div class="jira-modal-card" style="max-width:680px;height:auto;max-height:92vh;">
          <div class="jira-modal-header">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#f8fafc;">
              🎫 Create Support Ticket
            </h3>
            <button class="jira-modal-close" id="btn-close-create-modal">&times;</button>
          </div>

          <div style="padding:22px;overflow-y:auto;flex:1;">
            <div class="jira-form-grid-2">
              <div class="jira-form-group">
                <label class="jira-form-label">Issue Type / Category *</label>
                <select id="create-ticket-cat" class="jira-select-field">
                  ${CATEGORIES.map(c => `<option value="${c.key}">${c.icon} ${c.label}</option>`).join('')}
                </select>
              </div>

              <div class="jira-form-group">
                <label class="jira-form-label">Priority *</label>
                <select id="create-ticket-pri" class="jira-select-field">
                  <option value="Medium" selected>🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div class="jira-form-group">
              <label class="jira-form-label">Summary / Title *</label>
              <input type="text" id="create-ticket-title" class="jira-form-input" placeholder="e.g. Navigation dropdown glitch on Safari mobile" required />
            </div>

            <div class="jira-form-group">
              <label class="jira-form-label">Description (Provide details, steps, or context)</label>
              <textarea id="create-ticket-desc" class="jira-form-textarea" rows="4" placeholder="Describe the issue, requirements, or internal request..."></textarea>
            </div>

            <div class="jira-form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="jira-form-label" style="margin-bottom:0;">Assign Employees (Choose one or multiple)</label>
                <div style="display:flex;gap:8px;">
                  <button type="button" id="btn-create-assign-self" style="background:none;border:none;color:#38bdf8;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    + Select Myself
                  </button>
                  <button type="button" id="btn-create-clear-assign" style="background:none;border:none;color:#94a3b8;font-size:11px;cursor:pointer;">
                    Clear All
                  </button>
                </div>
              </div>

              <div class="jira-emp-checklist-box">
                <div class="jira-emp-checklist" id="create-emp-checklist">
                  ${employees.map(u => {
                    const isSelf = currentUser && String(currentUser._id || currentUser.id) === String(u._id);
                    return `
                      <label class="jira-emp-check-item ${isSelf ? 'selected' : ''}">
                        <input type="checkbox" class="chk-create-emp" value="${u._id}" ${isSelf ? 'checked' : ''} />
                        <div class="jira-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(u.name || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <span style="font-size:12px;color:#f1f5f9;flex:1;">
                          ${escapeHtml(u.name)} <span style="font-size:10.5px;color:#94a3b8;">(${escapeHtml(u.role)})${isSelf ? ' — (You)' : ''}</span>
                        </span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>
              <div id="create-assignee-hint" style="font-size:11px;color:#94a3b8;margin-top:4px;">
                Check all employees you want to assign to this ticket.
              </div>
            </div>

            <div class="jira-form-grid-2">
              <div class="jira-form-group">
                <label class="jira-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="jira-date-field" />
              </div>

              <div class="jira-form-group">
                <label class="jira-form-label">Related Job / Internal Project (Optional)</label>
                <select id="create-ticket-job" class="jira-select-field">
                  <option value="">None (General Workspace Issue)</option>
                  ${jobs.map(j => `
                    <option value="${j._id}" ${chosenJobId && String(chosenJobId) === String(j._id) ? 'selected' : ''}>
                      📁 ${escapeHtml(j.title || 'Untitled Job')}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>

          <div class="jira-modal-footer">
            <button type="button" class="btn-jira-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-jira-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;

    const updateSelectedStyles = () => {
      modalRoot.querySelectorAll('.jira-emp-check-item').forEach(label => {
        const chk = label.querySelector('.chk-create-emp');
        label.classList.toggle('selected', Boolean(chk?.checked));
      });
    };

    modalRoot.querySelectorAll('.chk-create-emp').forEach(chk => {
      chk.onchange = updateSelectedStyles;
    });

    const btnAssignSelf = modalRoot.querySelector('#btn-create-assign-self');
    if (btnAssignSelf && currentUser) {
      btnAssignSelf.onclick = () => {
        const selfId = String(currentUser._id || currentUser.id);
        modalRoot.querySelectorAll('.chk-create-emp').forEach(chk => {
          if (chk.value === selfId) chk.checked = true;
        });
        updateSelectedStyles();
      };
    }

    const btnClearAssign = modalRoot.querySelector('#btn-create-clear-assign');
    if (btnClearAssign) {
      btnClearAssign.onclick = () => {
        modalRoot.querySelectorAll('.chk-create-emp').forEach(chk => { chk.checked = false; });
        updateSelectedStyles();
      };
    }

    const closeCreate = () => { modalRoot.innerHTML = ''; };

    const btnClose = modalRoot.querySelector('#btn-close-create-modal');
    if (btnClose) btnClose.onclick = closeCreate;

    const btnCancel = modalRoot.querySelector('#btn-cancel-create-ticket');
    if (btnCancel) btnCancel.onclick = closeCreate;

    const backdrop = modalRoot.querySelector('#jira-create-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => { if (e.target === backdrop) closeCreate(); };
    }

    const btnSubmit = modalRoot.querySelector('#btn-submit-create-ticket');
    if (btnSubmit) {
      btnSubmit.onclick = async () => {
        const title = modalRoot.querySelector('#create-ticket-title')?.value.trim();
        const desc = modalRoot.querySelector('#create-ticket-desc')?.value.trim();
        const category = modalRoot.querySelector('#create-ticket-cat')?.value || 'Task';
        const priority = modalRoot.querySelector('#create-ticket-pri')?.value || 'Medium';
        const assigneeCheckboxes = Array.from(modalRoot.querySelectorAll('.chk-create-emp:checked'));
        const assigneeIds = assigneeCheckboxes.map(cb => cb.value);
        const dueDate = modalRoot.querySelector('#create-ticket-duedate')?.value || null;
        const jobId = modalRoot.querySelector('#create-ticket-job')?.value || null;

        if (!title) {
          flashToast('Ticket summary / title is required', true);
          return;
        }

        try {
          btnSubmit.disabled = true;
          btnSubmit.textContent = 'Creating...';

          const created = await apiPost('/tickets', {
            title,
            description: desc,
            category,
            priority,
            assigneeIds,
            assigneeId: assigneeIds[0] || null,
            dueDate,
            jobId
          });

          flashToast(`Ticket ${created.ticketId} created! 🎫`, false);
          closeCreate();

          await fetchStats();
          renderStats();
          await reloadBoard();

          // Open newly created ticket in detail view
          openTicketDetailModal(created._id);
        } catch (err) {
          flashToast(err.message || 'Could not create ticket', true);
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'Create Ticket 🚀';
        }
      };
    }
  }

  // Expose methods on container for direct programmatic actions
  container._openCreateTicketModal = openCreateTicketModal;
  container._openTicketDetailModal = openTicketDetailModal;
  container._setJobFilter = async (jobId) => {
    filters.jobId = jobId || 'all';
    const jobSel = container.querySelector('#jira-filter-job');
    if (jobSel) jobSel.value = filters.jobId;
    updateClearFiltersVisibility();
    await reloadBoard();
  };
}

