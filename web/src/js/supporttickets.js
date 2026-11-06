/**
 * CI360 SUPPORT TICKETS MODULE — CI-360-STYLE INTERNAL MANAGEMENT
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
  fmtFileSize,
  uploadSingleFileDirectly,
  uploadMultipleFilesFast,
  openFilePreviewModal
} from './api.js';

// Convert links in text to clickable hyperlinks
function renderTextWithLinks(text) {
  if (!text) return '';
  const escaped = escapeHtml(text);
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  return escaped.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${url} ↗</a>`;
  });
}

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
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${isSuper ? 'ALL TICKETS (ADMIN)' : 'MY ASSIGNED TICKETS'}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${isSuper ? 'Support Tickets Board' : 'Support Tickets'}</h2>
          </div>
        </div>
        <div class="ci-360-header-actions">
          <button class="btn-ci-360-secondary" id="btn-ci-360-refresh" title="Refresh Board">
            🔄 Refresh
          </button>
          <button class="btn-ci-360-primary" id="btn-ci-360-create-ticket">
            + Create Ticket
          </button>
        </div>
      </div>

      <!-- Stats Overview Ribbon -->
      <div class="ci-360-stats-ribbon" id="ci-360-stats-root">
        <div class="ci-360-stat-card"><span class="ci-360-stat-val">—</span><span class="ci-360-stat-lbl">Loading Stats...</span></div>
      </div>

      <!-- Filter Toolbar -->
      <div class="ci-360-filter-bar">
        <div class="ci-360-filter-left">
          <div class="ci-360-search-wrap">
            <span class="ci-360-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" id="ci-360-search-input" class="ci-360-search-input" placeholder="Search ticket (ID, title, description)..." />
          </div>

          <select id="ci-360-filter-priority" class="ci-360-filter-select">
            <option value="all">Priority: All</option>
            <option value="Critical">🔴 Critical</option>
            <option value="High">🟠 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <select id="ci-360-filter-category" class="ci-360-filter-select">
            <option value="all">Category: All</option>
            ${CATEGORIES.map(c => `<option value="${c.key}">${c.icon} ${c.label}</option>`).join('')}
          </select>

          <select id="ci-360-filter-job" class="ci-360-filter-select">
            <option value="all">Linked Job: All</option>
          </select>

          <select id="ci-360-filter-assignee" class="ci-360-filter-select">
            <option value="all">Assignee: All</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <button type="button" class="ci-360-pill-filter" id="ci-360-pill-my-issues">
            Only My Issues
          </button>

          <span class="ci-360-clear-filters" id="ci-360-clear-filters" style="display:none;">Clear Filters</span>
        </div>
      </div>

      <!-- Scrum Board Columns Container -->
      <div class="ci-360-board-columns" id="ci-360-board-columns-root">
        <div style="padding:40px;color:#94a3b8;font-size:14px;font-weight:600;">
          Loading Scrum Board...
        </div>
      </div>

      <!-- Modal Injection Root -->
      <div id="ci-360-modals-root"></div>
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
      let res;
      try {
        res = await apiGet('/tickets/staff');
      } catch (err) {
        res = await apiGet('/users');
      }
      // Filter strictly active internal staff (no clients)
      employees = (res || []).filter(u => u.active !== false && u.role !== 'client');
    } catch (e) {
      console.warn('Could not fetch employees:', e);
      employees = [];
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
    const root = container.querySelector('#ci-360-stats-root');
    if (!root) return;

    root.innerHTML = `
      <div class="ci-360-stat-card ${filters.status === 'all' && !filters.myIssuesOnly ? 'active' : ''}" data-stat-filter="all">
        <span class="ci-360-stat-val">${stats.total || 0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${filters.status === 'To Do' ? 'active' : ''}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${stats.toDo || 0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${filters.status === 'Content' ? 'active' : ''}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${stats.content ?? (stats.inProgress || 0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${filters.status === 'Design' ? 'active' : ''}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${stats.design || 0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${filters.status === 'Under Review' ? 'active' : ''}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${stats.underReview || 0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${filters.status === 'Ready to Leave' ? 'active' : ''}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${stats.readyToLeave ?? (stats.resolved || stats.closed || 0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${stats.critical || 0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${stats.overdue || 0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `;

    root.querySelectorAll('.ci-360-stat-card').forEach(card => {
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
    const selAssignee = container.querySelector('#ci-360-filter-assignee');
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

    const selJob = container.querySelector('#ci-360-filter-job');
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
    const boardRoot = container.querySelector('#ci-360-board-columns-root');
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
        <div class="ci-360-board-column" data-status="${col.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${escapeHtml(col.label)}</span>
              <span class="ci-360-col-badge">${colTickets.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${col.key}">
            ${colTickets.length === 0 ? `
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
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
    const isReporter = (t.reporter && t.reporter.userId && String(t.reporter.userId) === String(myId)) ||
                       (t.userId && String(t.userId) === String(myId));
    const isSuperadmin = (userRole === 'superadmin' || currentUser?.role === 'superadmin');
    const canDelete = isReporter || isSuperadmin;

    let avatarsHtml = '';
    if (assigneesList.length === 0) {
      avatarsHtml = `<div class="ci-360-avatar unassigned" title="Unassigned">?</div>`;
    } else {
      const displayAssignees = assigneesList.slice(0, 3);
      const remainingCount = assigneesList.length - 3;
      avatarsHtml = `
        <div class="ci-360-avatar-group">
          ${displayAssignees.map(a => `
            <div class="ci-360-avatar" title="Assignee: ${escapeHtml(a.name || 'Member')} (${escapeHtml(a.role || '')})">
              ${(a.avatar || a.name?.slice(0, 1) || 'U').toUpperCase()}
            </div>
          `).join('')}
          ${remainingCount > 0 ? `
            <div class="ci-360-avatar extra-count" title="${remainingCount} more assignees: ${escapeHtml(assigneesList.slice(3).map(a => a.name).join(', '))}">
              +${remainingCount}
            </div>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="ci-360-card" draggable="true" data-ticket-id="${t._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${cat.slug}">
              ${cat.icon} ${cat.label}
            </span>
            ${isReporter ? `
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            ` : ''}
            ${t.dueDate ? `
              <span class="ci-360-due-pill ${isOverdue ? 'overdue' : ''}" title="Due Date">
                ${isOverdue ? '⚠️ ' : '📅 '}
                ${new Date(t.dueDate).toISOString().slice(0, 10)}
              </span>
            ` : ''}
          </div>
          ${canDelete ? `
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${t._id}" data-ticket-num="${escapeHtml(t.ticketId)}" title="Delete Ticket (${isSuperadmin ? 'Superadmin' : 'Creator'})">
              🗑️
            </button>
          ` : ''}
        </div>

        <div class="ci-360-card-title" title="${escapeHtml(t.title)}">
          ${escapeHtml(t.title)}
        </div>

        ${(t.jobTitle || (t.jobId && t.jobId.title)) ? `
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${escapeHtml(t.jobTitle || t.jobId.title)}">
            📁 ${escapeHtml(t.jobTitle || t.jobId.title)}
          </div>
        ` : ''}

        ${(t.linkUrl || (t.links && t.links.length > 0)) ? `
          <div style="margin: 4px 0 2px 0;">
            <a href="${escapeHtml(t.linkUrl || t.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${escapeHtml(t.linkUrl || t.links[0]?.url)}">
              🔗 ${(t.links && t.links[0]?.title) ? escapeHtml(t.links[0].title) : 'External Link'} ↗
            </a>
          </div>
        ` : ''}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${pri.label}">${pri.icon}</span>
            <span class="ci-360-ticket-id">${escapeHtml(t.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${subtaskTotal > 0 ? `
              <span class="ci-360-subtask-badge" title="${subtaskDone} of ${subtaskTotal} subtasks completed">
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
    const cards = container.querySelectorAll('.ci-360-card');
    const columns = container.querySelectorAll('.ci-360-board-column');

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
        const prevAssignees = ticket.assignees ? [...ticket.assignees] : [];
        const prevAssignee = ticket.assignee ? { ...ticket.assignee } : null;
        ticket.status = targetStatus;
        if (targetStatus === 'Under Review') {
          const johnOpt = { name: 'John', role: 'Staff', email: 'john@ci360.local', avatar: 'J' };
          ticket.assignee = johnOpt;
          ticket.assignees = [johnOpt];
        }
        renderBoard();

        try {
          const updated = await apiPatch(`/tickets/${ticketDocId}/status`, { status: targetStatus });
          const toastMsg = targetStatus === 'Under Review'
            ? `Moved ${updated.ticketId} to Under Review (Default assigned to John)`
            : `Moved ${updated.ticketId} to ${targetStatus}`;
          flashToast(toastMsg, false);
          await reloadBoard();
        } catch (err) {
          flashToast(err.message || 'Status update failed', true);
          ticket.status = prevStatus;
          ticket.assignees = prevAssignees;
          ticket.assignee = prevAssignee;
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

    container.querySelectorAll('.ci-360-card').forEach(card => {
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
    const btnRefresh = container.querySelector('#btn-ci-360-refresh');
    if (btnRefresh) {
      btnRefresh.onclick = async () => {
        // no animation on refresh
        await reloadBoard();
        flashToast('Board updated', false);
        
      };
    }

    // Create ticket button
    const btnCreate = container.querySelector('#btn-ci-360-create-ticket');
    if (btnCreate) {
      btnCreate.onclick = () => {
        openCreateTicketModal();
      };
    }

    // Search input (debounced)
    const searchInp = container.querySelector('#ci-360-search-input');
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
    const priSelect = container.querySelector('#ci-360-filter-priority');
    if (priSelect) {
      priSelect.onchange = async (e) => {
        filters.priority = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Category filter
    const catSelect = container.querySelector('#ci-360-filter-category');
    if (catSelect) {
      catSelect.onchange = async (e) => {
        filters.category = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Linked Job filter
    const jobSelect = container.querySelector('#ci-360-filter-job');
    if (jobSelect) {
      jobSelect.onchange = async (e) => {
        filters.jobId = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Assignee filter
    const assSelect = container.querySelector('#ci-360-filter-assignee');
    if (assSelect) {
      assSelect.onchange = async (e) => {
        filters.assigneeId = e.target.value;
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Only My Issues pill (Admin)
    const pillMy = container.querySelector('#ci-360-pill-my-issues');
    if (pillMy) {
      pillMy.onclick = async () => {
        filters.myIssuesOnly = !filters.myIssuesOnly;
        pillMy.classList.toggle('active', filters.myIssuesOnly);
        updateClearFiltersVisibility();
        await reloadBoard();
      };
    }

    // Employee scope filter pills (All / Assigned / Created)
    const pillScopeAll = container.querySelector('#ci-360-pill-scope-all');
    const pillScopeAssigned = container.querySelector('#ci-360-pill-scope-assigned');
    const pillScopeCreated = container.querySelector('#ci-360-pill-scope-created');

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
    const clearBtn = container.querySelector('#ci-360-clear-filters');
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
        const jobSel = container.querySelector('#ci-360-filter-job');
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
    const clearBtn = container.querySelector('#ci-360-clear-filters');
    if (!clearBtn) return;
    const hasActive = filters.search || filters.priority !== 'all' || filters.category !== 'all' || (filters.jobId && filters.jobId !== 'all') || filters.assigneeId !== 'all' || filters.myIssuesOnly || (filters.scope && filters.scope !== 'all');
    clearBtn.style.display = hasActive ? 'inline' : 'none';
  }

  async function reloadBoard() {
    await fetchTickets();
    renderBoard();
  }

  /* ──────────────────────────────────────────────────────────────────────────
     CI-360 ISSUE DETAIL MODAL (2-COLUMN COMPREHENSIVE VIEW)
     ────────────────────────────────────────────────────────────────────────── */
  async function openTicketDetailModal(ticketDocId) {
    const modalRoot = container.querySelector('#ci-360-modals-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
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
    const modalRoot = container.querySelector('#ci-360-modals-root');
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
    const isSuperadmin = (userRole === 'superadmin' || currentUser?.role === 'superadmin');
    const canDelete = isReporter || isSuperadmin;
    const assigneesList = Array.isArray(t.assignees) && t.assignees.length > 0
      ? t.assignees
      : (t.assignee && t.assignee.userId ? [t.assignee] : []);
    const isAssigned = assigneesList.some(a => a && a.userId && String(a.userId) === String(myId));
    const isSuper = userRole === 'superadmin' || userRole === 'admin';
    // User requirement: In support tickets, everyone has identical access/actions on their tickets
    const canManageTicket = true;

    const currentJobId = t.jobId?._id ? t.jobId._id.toString() : (t.jobId ? t.jobId.toString() : '');
    const currentJobTitle = t.jobTitle || (t.jobId && t.jobId.title) || '';

    modalRoot.innerHTML = `
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${cat.slug}">${cat.icon} ${cat.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${escapeHtml(t.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${escapeHtml(t.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${isEditingDescription ? 'Cancel' : '✏️ Edit'}
                  </button>
                </div>

                ${isEditingDescription ? `
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${escapeHtml(t.description || '')}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                ` : `
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${t.description ? renderTextWithLinks(t.description) : '<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(t.links || []).length + (t.linkUrl && !(t.links || []).some(l => l.url === t.linkUrl) ? 1 : 0)})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-toggle-add-link" style="font-size:11px;padding:4px 9px;">
                    + Add Link
                  </button>
                </div>

                <div id="add-link-form" class="ci-360-form-box" style="display:none;padding:12px;margin-bottom:10px;">
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <input type="url" id="inp-new-link-url" class="ci-360-form-input" placeholder="Paste link URL (e.g. https://figma.com/..., https://loom.com/..., live website)..." />
                    <input type="text" id="inp-new-link-title" class="ci-360-form-input" placeholder="Link label / description (Optional, e.g. Figma UI, Loom Video, Live App)..." />
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                      <button type="button" class="btn-ci-360-secondary" id="btn-cancel-new-link" style="font-size:12px;padding:6px 12px;">Cancel</button>
                      <button type="button" class="btn-ci-360-primary" id="btn-save-new-link" style="font-size:12px;padding:6px 12px;">Save Link 🔗</button>
                    </div>
                  </div>
                </div>

                ${(t.links && t.links.length > 0) || t.linkUrl ? `
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${t.linkUrl && !(t.links || []).some(l => l.url === t.linkUrl) ? `
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${escapeHtml(t.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${escapeHtml(t.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${escapeHtml(t.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${escapeHtml(t.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    ` : ''}
                    ${(t.links || []).map(lnk => `
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${escapeHtml(lnk.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${escapeHtml(lnk.title || lnk.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${lnk.title ? `<span style="word-break:break-all;">${escapeHtml(lnk.url)}</span> · ` : ''}Added by ${escapeHtml(lnk.addedBy || 'Staff')}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${escapeHtml(lnk.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${escapeHtml(lnk.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${lnk.id}" title="Remove Link">&times;</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No reference links added yet. Click "+ Add Link" to attach Figma, Loom, Live App, or Drive links.</div>
                `}
              </div>

              <!-- Attachments Section (Fast streaming - any file format up to 1GB) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Attachments (${attachments.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${attachments.length === 0 ? `
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                ` : `
                  <div class="ci-360-attachments-grid">
                    ${attachments.map(att => {
                      const isVideo = (att.type && att.type.includes('video')) || 
                                      (att.name && att.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)) ||
                                      (att.url && att.url.match(/\.(mp4|mov|webm|avi|mkv)$/i));
                      return `
                        <div class="ci-360-att-card ${isVideo ? 'is-video' : ''}" style="${isVideo ? 'grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;' : ''}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${isVideo ? '16px' : '13px'};">${isVideo ? '🎬' : '📎'}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${att.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${escapeHtml(att.name)}">
                                  ${escapeHtml(att.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${fmtFileSize(att.size)} ${isVideo ? '• MP4 Video' : ''}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${isVideo ? `
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${att.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              ` : ''}
                              <a href="${att.url}" download="${escapeHtml(att.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${att.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${isVideo ? `
                            <div class="ci-360-video-slot" id="video-slot-${att.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${att.url}" type="${att.type || 'video/mp4'}">
                                Your browser does not support HTML5 video streaming.
                              </video>
                            </div>
                          ` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Subtasks (${subtaskDone}/${subtasks.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${subtaskPct}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${subtaskPct}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${subtasks.map(s => `
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${s.id}" ${s.completed ? 'checked' : ''} />
                        <span class="ci-360-subtask-title ${s.completed ? 'done' : ''}">${escapeHtml(s.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${s.id}" title="Remove subtask">&times;</button>
                    </div>
                  `).join('')}
                </div>

                <div class="ci-360-subtask-add-row">
                  <input type="text" id="inp-new-subtask" class="ci-360-subtask-input" placeholder="+ Add a subtask (press Enter)..." />
                  <button type="button" class="btn-ci-360-secondary" id="btn-add-subtask">Add</button>
                </div>
              </div>

              <!-- Linked Work Items Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Linked Work Items (${linkedTickets.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${linkedTickets.length === 0 ? `
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                ` : `
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${linkedTickets.map(lnk => `
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${escapeHtml(lnk.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${escapeHtml(lnk.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${escapeHtml(lnk.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${escapeHtml(lnk.status || 'Open')}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${lnk.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `}

                <div id="ci-360-link-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin-top:6px;">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="sel-link-rel" class="ci-360-select-field" style="width:140px;">
                      <option value="relates to">relates to</option>
                      <option value="blocks">blocks</option>
                      <option value="is blocked by">is blocked by</option>
                      <option value="duplicates">duplicates</option>
                    </select>
                    <input type="text" id="inp-link-target" class="ci-360-subtask-input" placeholder="Ticket ID (e.g. SUP-002)..." style="flex:1;" />
                    <button class="btn-ci-360-primary" id="btn-submit-link">Link</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Dedicated Linked Internal Job Block -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-job-link">
                    ${currentJobTitle ? '✏️ Change Job' : '+ Link a Job'}
                  </button>
                </div>
                ${currentJobTitle ? `
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${escapeHtml(currentJobTitle)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${escapeHtml(currentJobId)}</div>
                      </div>
                    </div>
                    <button type="button" class="ci-360-tool-btn" id="btn-unlink-job" style="color:#ef4444;border-color:rgba(239,68,68,0.3);" title="Remove job link">
                      ✕ Unlink
                    </button>
                  </div>
                ` : `
                  <div style="color:#64748b;font-size:12.5px;font-style:italic;padding:4px 0;">
                    No job linked yet. Click "+ Link a Job" to associate this ticket with a client deliverable or project.
                  </div>
                `}

                <div id="ci-360-job-link-box" class="ci-360-form-box" style="display:none;padding:12px;border-radius:6px;margin-top:8px;">
                  <label class="ci-360-form-label" style="font-size:11.5px;font-weight:700;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="ci-360-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${jobs.map(j => `
                        <option value="${j._id}" ${currentJobId === j._id.toString() ? 'selected' : ''}>
                          📁 ${escapeHtml(j.title || 'Untitled Job')}
                        </option>
                      `).join('')}
                    </select>
                    <button class="btn-ci-360-primary" id="btn-save-job-link">Link Job</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-job-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="ci-360-section-block" style="margin-top:10px;">
                <div class="ci-360-sec-title">Activity</div>
                <div class="ci-360-activity-tabs">
                  <button type="button" class="ci-360-act-tab ${activeActivityTab === 'comments' ? 'active' : ''}" data-act-tab="comments">
                    Comments (${comments.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${activeActivityTab === 'history' ? 'active' : ''}" data-act-tab="history">
                    History (${history.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${activeActivityTab === 'worklog' ? 'active' : ''}" data-act-tab="worklog">
                    Work Log (${workLogs.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${activeActivityTab === 'comments' ? `
                  <div class="ci-360-comments-feed">
                    ${comments.map(c => `
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(c.userName || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${escapeHtml(c.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${escapeHtml(c.userRole)})</span></span>
                            <span class="ci-360-comment-time">${timeAgo(c.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${renderTextWithLinks(c.content)}</div>
                        </div>
                      </div>
                    `).join('')}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(currentUser?.name || 'U').slice(0, 1).toUpperCase()}
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                        <textarea id="inp-new-comment" class="ci-360-comment-textarea" rows="2" placeholder="Add an internal comment..."></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                          <button class="btn-ci-360-primary" id="btn-submit-comment">Save Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : ''}

                <!-- B. History Tab -->
                ${activeActivityTab === 'history' ? `
                  <div class="ci-360-history-feed">
                    ${history.length === 0 ? `
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    ` : history.map(h => `
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(h.userName || 'S').slice(0, 1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${escapeHtml(h.userName)}</span>
                            <span class="ci-360-comment-time">${timeAgo(h.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${escapeHtml(h.field)}</strong>:
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
                  <div class="ci-360-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${t.loggedHours || 0} hrs</strong></span>
                      <button class="btn-ci-360-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="ci-360-worklog-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="ci-360-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="ci-360-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-ci-360-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-ci-360-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${workLogs.length === 0 ? `
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    ` : workLogs.map(w => `
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(w.userName || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${escapeHtml(w.userName)} logged <strong style="color:#38bdf8;">${escapeHtml(w.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${timeAgo(w.loggedAt)}</span>
                          </div>
                          ${w.description ? `<div class="ci-360-comment-body" style="font-size:12px;">${escapeHtml(w.description)}</div>` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Right Sidebar Panel (32%) -->
            <div class="ci-360-detail-sidebar">
              <!-- Status -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Status</span>
                <select id="sel-detail-status" class="ci-360-select-field">
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
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${PRIORITIES.map(p => `
                    <option value="${p.key}" ${t.priority === p.key ? 'selected' : ''}>
                      ${p.icon} ${p.label}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${assigneesList.length})</span>
                  ${canManageTicket ? `
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  ` : ''}
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${assigneesList.length === 0 ? `
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  ` : assigneesList.map(a => `
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(a.avatar || a.name?.slice(0, 1) || 'U').toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${escapeHtml(a.name)}">${escapeHtml(a.name)}</span>
                      ${canManageTicket ? `
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${a.userId}" title="Remove ${escapeHtml(a.name)}">&times;</button>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="ci-360-detail-assignee-box" class="ci-360-form-box" style="display:none;margin-top:8px;padding:10px;border-radius:6px;">
                  <div class="ci-360-assignee-header" style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="ci-360-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${employees.map(u => {
                      const isAssigned = assigneesList.some(a => a && a.userId && String(a.userId) === String(u._id));
                      return `
                        <label class="ci-360-emp-check-item ${isAssigned ? 'selected' : ''}">
                          <input type="checkbox" class="chk-detail-emp" value="${u._id}" ${isAssigned ? 'checked' : ''} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(u.name || 'U').slice(0, 1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${escapeHtml(u.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${escapeHtml(u.role)})</span>
                          </span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                  <div style="margin-top:8px;display:flex;justify-content:flex-end;gap:6px;">
                    <button type="button" class="btn-ci-360-primary" id="btn-save-detail-assignees" style="font-size:11px;padding:4px 10px;">
                      Save Assignees
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="ci-360-avatar" style="background:#2563eb;">
                    ${(t.reporter?.name || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${escapeHtml(t.reporter?.name || 'Staff')}</div>
                    <div style="font-size:11px;color:#94a3b8;">${escapeHtml(t.reporter?.role || 'employee')}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${CATEGORIES.map(c => `
                    <option value="${c.key}" ${t.category === c.key ? 'selected' : ''}>
                      ${c.icon} ${c.label}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : ''}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${jobs.map(j => `
                    <option value="${j._id}" ${currentJobId === j._id.toString() ? 'selected' : ''}>
                      📁 ${escapeHtml(j.title || 'Untitled Job')}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${t.loggedHours || 0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${t.estimatedHours || 0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(t.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(t.updatedAt).toLocaleString()}</div>
                ${t.resolvedAt ? `<div style="color:#10b981;">Resolved: ${new Date(t.resolvedAt).toLocaleString()}</div>` : ''}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${canDelete ? `
                <div style="padding-top:10px;">
                  <button type="button" class="ci-360-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
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
    const modalRoot = container.querySelector('#ci-360-modals-root');
    if (!modalRoot || !activeModalTicket) return;

    // Close button & backdrop click
    const btnClose = modalRoot.querySelector('#btn-close-ci-360-modal');
    if (btnClose) btnClose.onclick = closeTicketDetailModal;

    const backdrop = modalRoot.querySelector('#ci-360-detail-backdrop');
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
          const toastMsg = updated.status === 'Under Review'
            ? `Status changed to Under Review (Default assigned to John)`
            : `Status changed to ${updated.status}`;
          flashToast(toastMsg, false);
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
    const detailAssigneeBox = modalRoot.querySelector('#ci-360-detail-assignee-box');
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
        chk.closest('.ci-360-emp-check-item')?.classList.toggle('selected', chk.checked);
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
    const jobLinkBox = modalRoot.querySelector('#ci-360-job-link-box');
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

    // Reference & External Link Controls
    const btnToggleUrlLink = modalRoot.querySelector('#btn-toggle-add-link');
    const urlLinkForm = modalRoot.querySelector('#add-link-form');
    const btnCancelUrlLink = modalRoot.querySelector('#btn-cancel-new-link');
    const btnSaveUrlLink = modalRoot.querySelector('#btn-save-new-link');
    const inpUrlLinkVal = modalRoot.querySelector('#inp-new-link-url');
    const inpUrlLinkTitle = modalRoot.querySelector('#inp-new-link-title');

    if (btnToggleUrlLink && urlLinkForm) {
      btnToggleUrlLink.onclick = () => {
        const isHidden = urlLinkForm.style.display === 'none';
        urlLinkForm.style.display = isHidden ? 'block' : 'none';
        if (isHidden && inpUrlLinkVal) inpUrlLinkVal.focus();
      };
    }

    if (btnCancelUrlLink && urlLinkForm) {
      btnCancelUrlLink.onclick = () => {
        urlLinkForm.style.display = 'none';
        if (inpUrlLinkVal) inpUrlLinkVal.value = '';
        if (inpUrlLinkTitle) inpUrlLinkTitle.value = '';
      };
    }

    if (btnSaveUrlLink && inpUrlLinkVal) {
      btnSaveUrlLink.onclick = async () => {
        const url = inpUrlLinkVal.value.trim();
        const title = inpUrlLinkTitle?.value.trim() || '';
        if (!url) {
          flashToast('Please enter a valid URL link', true);
          return;
        }
        try {
          btnSaveUrlLink.disabled = true;
          btnSaveUrlLink.textContent = 'Saving...';
          const updated = await apiPost(`/tickets/${activeModalTicket._id}/links`, { url, title });
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast('Reference link added! 🔗', false);
        } catch (err) {
          flashToast(err.message || 'Failed to save link', true);
          btnSaveUrlLink.disabled = false;
          btnSaveUrlLink.textContent = 'Save Link 🔗';
        }
      };
    }

    // Copy link buttons
    modalRoot.querySelectorAll('.btn-copy-link').forEach(btn => {
      btn.onclick = () => {
        const u = btn.dataset.url;
        if (u) {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(u).then(() => {
              flashToast('Link copied to clipboard! 📋');
            }).catch(() => {
              flashToast('Link: ' + u);
            });
          } else {
            flashToast('Link: ' + u);
          }
        }
      };
    });

    // Delete link buttons
    modalRoot.querySelectorAll('.btn-del-link').forEach(btn => {
      btn.onclick = async () => {
        const linkId = btn.dataset.linkId;
        try {
          const updated = await apiDelete(`/tickets/${activeModalTicket._id}/links/${linkId}`);
          activeModalTicket = updated;
          renderTicketDetailModal();
          await reloadBoard();
          flashToast('Link removed');
        } catch (err) {
          flashToast(err.message || 'Failed to remove link', true);
        }
      };
    });

    // Attachments upload (ultra-fast parallel streaming - supports all formats up to 1GB)
    const btnTriggerDetail = modalRoot.querySelector('#btn-trigger-detail-upload');
    const attUploadInp = modalRoot.querySelector('#inp-detail-att-upload');
    const attProgressBox = modalRoot.querySelector('#detail-att-upload-progress');

    if (btnTriggerDetail && attUploadInp) {
      btnTriggerDetail.onclick = (e) => {
        e.preventDefault();
        attUploadInp.click();
      };
    }

    if (attUploadInp) {
      attUploadInp.onchange = async () => {
        const files = Array.from(attUploadInp.files || []);
        attUploadInp.value = '';
        if (!files.length) return;

        if (attProgressBox) {
          attProgressBox.style.display = 'block';
          attProgressBox.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${files.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `;
        }

        try {
          const uploadResults = await uploadMultipleFilesFast(files, (overallPercent) => {
            const pctEl = modalRoot.querySelector('#att-prog-pct');
            const barEl = modalRoot.querySelector('#att-prog-bar');
            if (pctEl) pctEl.textContent = `${overallPercent}%`;
            if (barEl) barEl.style.width = `${overallPercent}%`;
          });

          const uploadedMeta = uploadResults.map(res => ({
            name: res.name,
            url: res.url,
            size: res.size || 0,
            type: res.type || 'application/octet-stream'
          }));

          if (uploadedMeta.length) {
            const updated = await apiPost(`/tickets/${activeModalTicket._id}/attachments`, { attachments: uploadedMeta });
            activeModalTicket = updated;
            renderTicketDetailModal();
            flashToast(`Successfully attached ${uploadedMeta.length} file(s)! 📎`, false);
          }
        } catch (upErr) {
          console.error('Upload error:', upErr);
          flashToast(`Upload failed: ${upErr.message}`, true);
        } finally {
          if (attProgressBox) attProgressBox.style.display = 'none';
        }
      };
    }

    // Toggle play for MP4 video attachments
    modalRoot.querySelectorAll('.btn-play-att-video').forEach(btn => {
      btn.onclick = () => {
        const slotId = btn.dataset.slot;
        const slot = modalRoot.querySelector('#' + slotId);
        if (slot) {
          const isHidden = slot.style.display === 'none';
          slot.style.display = isHidden ? 'block' : 'none';
          btn.textContent = isHidden ? '⏸ Close Video' : '▶ Play Video';
          const video = slot.querySelector('video');
          if (video && isHidden) video.play().catch(() => {});
          else if (video) video.pause();
        }
      };
    });

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
    modalRoot.querySelectorAll('.ci-360-act-tab').forEach(tab => {
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
    const linkBox = modalRoot.querySelector('#ci-360-link-box');
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
    const worklogBox = modalRoot.querySelector('#ci-360-worklog-box');
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
    const modalRoot = container.querySelector('#ci-360-modals-root');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  /* ──────────────────────────────────────────────────────────────────────────
     CREATE TICKET MODAL (CI-360-STYLE)
     ────────────────────────────────────────────────────────────────────────── */
  function openCreateTicketModal(preSelectedJobId = null) {
    const modalRoot = container.querySelector('#ci-360-modals-root');
    if (!modalRoot) return;

    const chosenJobId = preSelectedJobId || (filters.jobId && filters.jobId !== 'all' ? filters.jobId : null);

    modalRoot.innerHTML = `
      <div class="ci-360-modal-backdrop" id="ci-360-create-backdrop">
        <div class="ci-360-modal-card" style="max-width:680px;height:auto;max-height:92vh;">
          <div class="ci-360-modal-header">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#f8fafc;">
              🎫 Create Support Ticket
            </h3>
            <button class="ci-360-modal-close" id="btn-close-create-modal">&times;</button>
          </div>

          <div style="padding:22px;overflow-y:auto;flex:1;">
            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Issue Type / Category *</label>
                <select id="create-ticket-cat" class="ci-360-select-field">
                  ${CATEGORIES.map(c => `<option value="${c.key}">${c.icon} ${c.label}</option>`).join('')}
                </select>
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Priority *</label>
                <select id="create-ticket-pri" class="ci-360-select-field">
                  <option value="Medium" selected>🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Summary / Title *</label>
              <input type="text" id="create-ticket-title" class="ci-360-form-input" placeholder="e.g. Navigation dropdown glitch on Safari mobile" required />
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Description (Provide details, steps, or context)</label>
              <textarea id="create-ticket-desc" class="ci-360-form-textarea" rows="4" placeholder="Describe the issue, requirements, or internal request..."></textarea>
            </div>

            <div class="ci-360-form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin-bottom:0;">Assign Employees (Choose one or multiple)</label>
                <div style="display:flex;gap:8px;">
                  <button type="button" id="btn-create-assign-self" style="background:none;border:none;color:#38bdf8;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    + Select Myself
                  </button>
                  <button type="button" id="btn-create-clear-assign" style="background:none;border:none;color:#94a3b8;font-size:11px;cursor:pointer;">
                    Clear All
                  </button>
                </div>
              </div>

              <div class="ci-360-emp-checklist-box">
                <div class="ci-360-emp-checklist" id="create-emp-checklist">
                  ${employees.map(u => {
                    const isSelf = currentUser && String(currentUser._id || currentUser.id) === String(u._id);
                    return `
                      <label class="ci-360-emp-check-item ${isSelf ? 'selected' : ''}">
                        <input type="checkbox" class="chk-create-emp" value="${u._id}" ${isSelf ? 'checked' : ''} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(u.name || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${escapeHtml(u.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${escapeHtml(u.role)})${isSelf ? ' — (You)' : ''}</span>
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

            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="ci-360-date-field" />
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Related Job / Internal Project (Optional)</label>
                <select id="create-ticket-job" class="ci-360-select-field">
                  <option value="">None (General Workspace Issue)</option>
                  ${jobs.map(j => `
                    <option value="${j._id}" ${chosenJobId && String(chosenJobId) === String(j._id) ? 'selected' : ''}>
                      📁 ${escapeHtml(j.title || 'Untitled Job')}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- External Reference URL / Link -->
            <div class="ci-360-form-group">
              <label class="ci-360-form-label">🔗 External Reference Link / URL (Optional)</label>
              <input type="url" id="create-ticket-url" class="ci-360-form-input" placeholder="e.g. https://figma.com/..., https://loom.com/..., live website URL, Google Drive..." />
            </div>

            <!-- Attachments & Fast File Uploader (Up to 1GB) -->
            <div class="ci-360-form-group" style="margin-top:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin:0;">Attachments &amp; Files (All formats up to 1GB)</label>
                <span id="create-att-count" style="font-size:11px;color:#94a3b8;">0 files attached</span>
              </div>
              <label class="ci-360-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border-radius:8px;cursor:pointer;transition:border-color 0.2s;">
                <div style="font-size:18px;">📁 ⚡</div>
                <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Click or drag &amp; drop files or videos here</div>
                <div style="font-size:10.5px;color:#64748b;">Fast parallel uploading: MP4, MOV, WebM, images, PDFs, archives (Up to 1GB supported)</div>
                <input type="file" id="inp-create-ticket-att" multiple style="display:none;" />
              </label>
              <div id="create-att-progress" style="display:none;margin-top:8px;"></div>
              <div id="create-att-list" class="ci-360-attachments-grid" style="margin-top:8px;"></div>
            </div>
          </div>

          <div class="ci-360-modal-footer">
            <button type="button" class="btn-ci-360-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-ci-360-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;

    const updateSelectedStyles = () => {
      modalRoot.querySelectorAll('.ci-360-emp-check-item').forEach(label => {
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

    const pendingAttachments = [];
    const inpCreateAtt = modalRoot.querySelector('#inp-create-ticket-att');
    const attListEl = modalRoot.querySelector('#create-att-list');
    const attCountEl = modalRoot.querySelector('#create-att-count');
    const attProgEl = modalRoot.querySelector('#create-att-progress');

    const renderPendingAtts = () => {
      if (attCountEl) attCountEl.textContent = `${pendingAttachments.length} file(s) attached`;
      if (!attListEl) return;
      attListEl.innerHTML = pendingAttachments.map((att, idx) => {
        const isVideo = (att.type && att.type.includes('video')) || (att.name && att.name.match(/\.(mp4|mov|webm|avi|mkv)$/i));
        return `
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${isVideo ? '🎬' : '📎'}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${escapeHtml(att.name)}">${escapeHtml(att.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${fmtFileSize(att.size)} ${isVideo ? '• MP4' : ''}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${idx}" title="Remove">&times;</button>
          </div>
        `;
      }).join('');

      attListEl.querySelectorAll('.btn-del-pending-att').forEach(btn => {
        btn.onclick = () => {
          pendingAttachments.splice(Number(btn.dataset.idx), 1);
          renderPendingAtts();
        };
      });
    };

    if (inpCreateAtt) {
      inpCreateAtt.onchange = async () => {
        const files = Array.from(inpCreateAtt.files || []);
        inpCreateAtt.value = '';
        if (!files.length) return;

        if (attProgEl) {
          attProgEl.style.display = 'block';
          attProgEl.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${files.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `;
        }

        try {
          const uploadResults = await uploadMultipleFilesFast(files, (overallPercent) => {
            const pctEl = modalRoot.querySelector('#create-prog-pct');
            const barEl = modalRoot.querySelector('#create-prog-bar');
            if (pctEl) pctEl.textContent = `${overallPercent}%`;
            if (barEl) barEl.style.width = `${overallPercent}%`;
          });

          uploadResults.forEach(res => {
            pendingAttachments.push({
              name: res.name,
              url: res.url,
              size: res.size || 0,
              type: res.type || 'application/octet-stream'
            });
          });
          renderPendingAtts();
        } catch (err) {
          flashToast(`Failed to upload files: ${err.message}`, true);
        } finally {
          if (attProgEl) attProgEl.style.display = 'none';
          inpCreateAtt.value = '';
        }
      };
    }

    const closeCreate = () => { modalRoot.innerHTML = ''; };

    const btnClose = modalRoot.querySelector('#btn-close-create-modal');
    if (btnClose) btnClose.onclick = closeCreate;

    const btnCancel = modalRoot.querySelector('#btn-cancel-create-ticket');
    if (btnCancel) btnCancel.onclick = closeCreate;

    const backdrop = modalRoot.querySelector('#ci-360-create-backdrop');
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
        const linkUrl = modalRoot.querySelector('#create-ticket-url')?.value.trim() || '';

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
            jobId,
            linkUrl,
            attachments: pendingAttachments
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
    const jobSel = container.querySelector('#ci-360-filter-job');
    if (jobSel) jobSel.value = filters.jobId;
    updateClearFiltersVisibility();
    await reloadBoard();
  };
}

