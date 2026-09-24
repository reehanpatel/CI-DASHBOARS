let user = null;
let cache = { personnel: [], clients: [], services: [] };
let ui = { tab: 'myjobs', period: 'month', ticketsFilter: 'all' };

async function boot(){
  initTheme();
  user = requireAuth('employee');
  if(!user) return;
  const [personnel, clients, services] = await Promise.all([
    apiGet('/personnel'), apiGet('/clients'), apiGet('/services')
  ]);
  cache.personnel = personnel; cache.clients = clients; cache.services = services;
  render();
}

function clientName(id){ const c = cache.clients.find(c=>c._id===id); return c ? c.name : '—'; }
function isLeadManager(){ return user && (/mansi/i.test(user.name) || /urna/i.test(user.name)); }

const EMPLOYEE_TABS = [
  { key: 'myjobs',     label: 'My Jobs',         icon: '📋' },
  { key: 'dailytasks', label: 'Daily Tasks',     icon: '✅' },
  { key: 'tickets',    label: 'Support Tickets', icon: '🎫' },
  { key: 'targets',    label: 'My Targets',      icon: '🎯' }
];

function render(){
  const app = document.getElementById('app');
  const activeTabObj = EMPLOYEE_TABS.find(t=>t.key===ui.tab) || EMPLOYEE_TABS[0];
  app.innerHTML = renderAppShell({
    user,
    currentRole: 'employee',
    activeTab: ui.tab,
    tabs: EMPLOYEE_TABS,
    title: activeTabObj.label,
    subtitle: isLeadManager() ? 'Lead Workspace · Mansi & Urna Management' : 'Employee Workspace & Daily Task Checklist'
  });
  bindAppShellEvents((newTab)=>{ ui.tab = newTab; render(); });
  renderTab();
}
window.ci360NavTab = (tabName) => { ui.tab = tabName; render(); };

async function renderTab(){
  const c = document.getElementById('content');
  if(!c) return;
  c.innerHTML = renderSkeletonCards(3);
  try{
    if(ui.tab==='myjobs')                                 await tabMyJobs(c);
    else if(ui.tab==='dailytasks' || ui.tab==='mytasks') await tabDailyTasks(c);
    else if(ui.tab==='tickets')                           await tabTickets(c);
    else if(ui.tab==='targets')                           await tabTargets(c);
  }catch(err){
    c.innerHTML = renderEmptyState('Something went wrong', err.message, '⚠️');
  }
}

function periodPicker(){
  return renderPeriodPicker(ui.period);
}

function bindPeriodPicker(){
  document.querySelectorAll('[data-period]').forEach(b=>{
    b.onclick = ()=>{ ui.period = b.dataset.period; renderTab(); };
  });
}


/* ════════════════════════════ MY JOBS ════════════════════════════ */
async function tabMyJobs(c){
  const jobs = await apiGet('/jobs?mine=true');
  const priorityBadges = { Medium:'gray', High:'amber', Urgent:'red' };

  if(jobs.length === 0){
    c.innerHTML = `
      <div class="block">
        <h2>My Jobs <span class="eyebrow">No assigned jobs yet</span></h2>
        ${renderEmptyState('No jobs assigned yet', 'Jobs assigned to you by admins will appear here.', '📋')}
      </div>`;
    return;
  }

  c.innerHTML = `
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h2 style="margin:0">My Jobs <span class="eyebrow">${jobs.length} total</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--text-3)">Click the date or 💾 to save completion date</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${jobs.map(j=>{
          const myAss = (j.assignments||[]).find(a=>String(a.personId)===String(user.personnelId._id||user.personnelId));
          const isCreator = String(j.createdBy) === String(user._id);
          const isDone = j.status === 'Completed';
          const isApproved = j.clientApproval && j.clientApproval.status === 'Approved';
          const isRevisionReq = j.clientApproval && j.clientApproval.status === 'Revision Requested';
          const compVal = j.completionDate ? new Date(j.completionDate).toISOString().slice(0,10) : '';
          const priBadge = priorityBadges[j.priority||'Medium'] || 'gray';

          return `
          <div class="job-card" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${isApproved ? 'var(--green-500)' : (isRevisionReq ? 'var(--red-500)' : (isDone ? 'var(--green-500)' : 'var(--brand-500)'))}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(j.title || 'Untitled Job')}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${isDone?'green':'amber'}">${isDone ? '✓ Completed' : '⏳ In Progress'}</span>
                  ${isApproved ? `<span class="badge green">✓ Client Approved ${j.clientApproval.rating ? `(${j.clientApproval.rating}★)` : ''}</span>` : ''}
                  ${isRevisionReq ? `<span class="badge red">↺ Revision Requested</span>` : ''}
                  <span class="badge ${priBadge}">${escapeHtml(j.priority||'Medium')}</span>
                  ${(j.serviceNames||[]).map(s=>`<span class="badge gray">${escapeHtml(s)}</span>`).join('')}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                <!-- Toggle Status -->
                <button type="button" class="btn ${isDone?'secondary':'primary'} small"
                        onclick="toggleStatus('${j._id}', ${!isDone})"
                        style="font-size:12px">
                  ${isDone ? '↩ Reopen' : '✓ Mark Done'}
                </button>
                ${isCreator ? `<button type="button" class="btn danger small" onclick="delJob('${j._id}')">Delete</button>` : ''}
              </div>
            </div>

            <!-- Revision Requested Alert Box for Employee -->
            ${isRevisionReq ? `
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate((j.clientApproval.revisions||[]).slice(-1)[0]?.requestedAt || j.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(j.clientApproval.feedback || 'Revision requested')}"
                </div>
                ${((j.clientApproval.revisions||[]).slice(-1)[0]?.attachments?.length) ? `
                  <div style="margin-top:8px">
                    ${renderAttachmentChips(((j.clientApproval.revisions.slice(-1)[0].attachments)), { title: 'Client Reference Markups' })}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Details grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:14px">
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Client</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(clientName(j.clientId))}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Start Date</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${fmtDate(j.date)}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Target End Date (Admin / Client)</div>
                <div style="font-size:13px;font-weight:700;color:${j.completionDate ? 'var(--brand-600)' : 'var(--text-4)'}">
                  ${j.completionDate ? `📅 ${fmtDate(j.completionDate)}` : '— Not Specified —'}
                </div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Your Logged Hours</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${myAss ? fmtHours(myAss.hours) : '0 hrs'}</div>
              </div>
              ${j.description ? `
              <div style="grid-column:1 / -1">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Description</div>
                <div style="font-size:12.5px;color:var(--text-2);line-height:1.5">${escapeHtml(j.description)}</div>
              </div>` : ''}
            </div>

            <!-- Brief Attachments & Deliverables Section -->
            ${(j.attachments && j.attachments.length) ? `
              <div data-attachments="${encodeURIComponent(JSON.stringify(j.attachments))}">
                ${renderAttachmentChips(j.attachments, { title: 'Job Brief & Reference Files' })}
              </div>
            ` : ''}

            ${(j.deliverables && j.deliverables.length) ? `
              <div data-attachments="${encodeURIComponent(JSON.stringify(j.deliverables))}">
                ${renderAttachmentChips(j.deliverables, { title: 'Finished Deliverables & Completed Artifacts' })}
              </div>
            ` : ''}

            <!-- Deliverable Uploader for Employee -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-size:12.5px;font-weight:700;color:var(--text-1)">📦 Submit Finished Deliverable / Work Artifact</span>
                <button type="button" class="btn ghost small emp-del-toggle" data-id="${j._id}" style="padding:2px 8px;font-size:11px">+ Add Deliverables</button>
              </div>
              <div class="emp-del-form" id="empDelForm-${j._id}" style="display:none;margin-top:10px">
                <div class="field" style="margin-bottom:8px">
                  <label style="font-size:11.5px">Deliverable Notes / Details</label>
                  <input type="text" id="empDelNotes-${j._id}" placeholder="e.g. Final Video Render v2, PSD Source files, Figma export link..." style="font-size:12.5px;padding:6px 10px" />
                </div>
                ${renderAttachmentUploader({ id: 'empDelUp-' + j._id, label: 'Completed Files', subtitle: 'Upload exported videos, PSDs, PDFs, spreadsheets, images or zip packages' })}
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px">
                  <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
                    <input type="checkbox" id="empDelMarkComplete-${j._id}" ${isDone ? '' : 'checked'} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
                    <span>Mark Job as Completed upon submitting</span>
                  </label>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn ghost small emp-del-cancel" data-id="${j._id}">Cancel</button>
                    <button type="button" class="btn gold small emp-del-submit" data-id="${j._id}">Submit Deliverables</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Employee Delivery Date Setter -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px">
              <div style="display:flex;align-items:center;gap:6px">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span style="font-size:12px;font-weight:700;color:var(--text-2)">Set Delivery Date:</span>
              </div>
              <input
                type="date"
                class="emp-completion-date"
                data-id="${j._id}"
                value="${compVal}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${j._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${compVal ? `<span class="badge green" style="margin-left:auto">Committed Delivery: ${compVal}</span>` : `<span class="badge gray" style="margin-left:auto">No Date Set</span>`}
            </div>

            ${renderSupportTicketSection(j._id, isLeadManager())}
          </div>`;
        }).join('')}
      </div>
    </div>`;

  // Also bind on-change inline save
  document.querySelectorAll('.emp-completion-date').forEach(inp=>{
    inp.addEventListener('focus', ()=>{ inp.style.borderColor = 'var(--border-focus)'; inp.style.boxShadow = '0 0 0 3px var(--accent-ring)'; });
    inp.addEventListener('blur',  ()=>{ inp.style.borderColor = ''; inp.style.boxShadow = ''; });
  });

  // Bind deliverable uploaders and forms
  jobs.forEach(j => {
    bindAttachmentUploader('empDelUp-' + j._id);
  });

  document.querySelectorAll('.emp-del-toggle').forEach(btn => {
    btn.onclick = () => {
      const form = document.getElementById('empDelForm-' + btn.dataset.id);
      if (form) {
        const isHidden = form.style.display === 'none';
        form.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden ? '✕ Close' : '+ Add Deliverables';
      }
    };
  });

  document.querySelectorAll('.emp-del-cancel').forEach(btn => {
    btn.onclick = () => {
      const form = document.getElementById('empDelForm-' + btn.dataset.id);
      if (form) form.style.display = 'none';
      const toggle = document.querySelector(`.emp-del-toggle[data-id="${btn.dataset.id}"]`);
      if (toggle) toggle.textContent = '+ Add Deliverables';
    };
  });

  document.querySelectorAll('.emp-del-submit').forEach(btn => {
    btn.onclick = async () => {
      const jId = btn.dataset.id;
      const files = getUploaderAttachments('empDelUp-' + jId);
      const notes = (document.getElementById('empDelNotes-' + jId) || {}).value?.trim() || '';
      const markComplete = document.getElementById('empDelMarkComplete-' + jId)?.checked || false;
      if (!files.length) {
        flashToast('Please upload or attach at least one file', true);
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Submitting…';
      try {
        const deliverables = files.map(f => ({ ...f, notes }));
        await apiPost(`/jobs/${jId}/deliverables`, { deliverables, markComplete });
        flashToast(markComplete ? 'Deliverables submitted & job marked as Completed! 📦🎉' : 'Deliverables submitted successfully! 📦');
        renderTab();
      } catch (err) {
        flashToast(err.message, true);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Submit Deliverables';
      }
    };
  });

  // Bind ticket interactions for each job
  jobs.forEach(j => bindSupportTicketSection(j._id, isLeadManager()));
}

/* ════════════════════════════ DAILY TASKS (CHECKLIST) ════════════════════════════ */
let dailyTaskUi = {
  date: new Date().toISOString().slice(0, 10), // default to today YYYY-MM-DD or 'all'
  filter: 'all',                               // 'all' | 'active' | 'completed'
  search: ''
};

async function getLocalOrApiTasks() {
  try {
    const res = await apiGet('/tasks');
    if (Array.isArray(res)) {
      localStorage.setItem('ci360_tasks_' + (user?._id || 'user'), JSON.stringify(res));
      return res;
    }
  } catch(e) {
    console.warn('Backend /api/tasks offline, using local fallback:', e);
  }
  try {
    const cached = localStorage.getItem('ci360_tasks_' + (user?._id || 'user'));
    return cached ? JSON.parse(cached) : [];
  } catch(e) { return []; }
}

async function saveTaskLocalOrApi(payload, editId = null) {
  let saved = null;
  try {
    if (editId) {
      saved = await apiPut('/tasks/' + editId, payload);
    } else {
      saved = await apiPost('/tasks', payload);
    }
  } catch(e) {
    console.warn('API task save failed, writing local backup:', e);
  }
  let list = [];
  try {
    const cached = localStorage.getItem('ci360_tasks_' + (user?._id || 'user'));
    list = cached ? JSON.parse(cached) : [];
  } catch(e) {}

  if (editId) {
    const idx = list.findIndex(t => t._id === editId);
    if (idx >= 0) {
      list[idx] = saved || { ...list[idx], ...payload, updatedAt: new Date() };
    }
  } else {
    if (!saved) {
      saved = {
        _id: 'loc_' + Date.now(),
        ...payload,
        createdAt: new Date(),
        completedAt: payload.status === 'Completed' ? new Date() : null
      };
    }
    list.unshift(saved);
  }
  localStorage.setItem('ci360_tasks_' + (user?._id || 'user'), JSON.stringify(list));
  return saved;
}

async function deleteTaskLocalOrApi(id) {
  try {
    await apiDelete('/tasks/' + id);
  } catch(e) {
    console.warn('API task delete failed, updating storage:', e);
  }
  try {
    const cached = localStorage.getItem('ci360_tasks_' + (user?._id || 'user'));
    let list = cached ? JSON.parse(cached) : [];
    list = list.filter(t => t._id !== id);
    localStorage.setItem('ci360_tasks_' + (user?._id || 'user'), JSON.stringify(list));
  } catch(e) {}
}

async function toggleTaskLocalOrApi(id) {
  try {
    return await apiPatch('/tasks/' + id + '/toggle', {});
  } catch(e) {
    console.warn('API toggle failed, toggling locally:', e);
  }
  try {
    const cached = localStorage.getItem('ci360_tasks_' + (user?._id || 'user'));
    let list = cached ? JSON.parse(cached) : [];
    const t = list.find(x => x._id === id);
    if (t) {
      const isDone = t.status !== 'Completed';
      t.status = isDone ? 'Completed' : 'Todo';
      t.completedAt = isDone ? new Date() : null;
      localStorage.setItem('ci360_tasks_' + (user?._id || 'user'), JSON.stringify(list));
      return t;
    }
  } catch(e) {}
  return null;
}

function shiftDateStr(dateStr, deltaDays) {
  let d;
  if (!dateStr || dateStr === 'all') {
    d = new Date();
  } else {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    } else {
      d = new Date();
    }
  }
  d.setDate(d.getDate() + deltaDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getFriendlyDayLabel(dateStr) {
  if (!dateStr || dateStr === 'all') return 'All Days Checklist';
  const parts = dateStr.split('-');
  const target = parts.length === 3 
    ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])) 
    : new Date();
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const targetMidnight = new Date(target);
  targetMidnight.setHours(0,0,0,0);
  const diffDays = Math.round((targetMidnight - today) / (1000 * 60 * 60 * 24));

  const dayOfWeek = target.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  if (diffDays === 0) return `Today · ${dayOfWeek}`;
  if (diffDays === -1) return `Yesterday · ${dayOfWeek}`;
  if (diffDays === 1) return `Tomorrow · ${dayOfWeek}`;
  return dayOfWeek;
}

async function tabDailyTasks(c) {
  const allTasks = await getLocalOrApiTasks();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const activeDate = dailyTaskUi.date; // YYYY-MM-DD or 'all'

  // Filter by date
  let dateFiltered = allTasks;
  if (activeDate !== 'all') {
    dateFiltered = allTasks.filter(t => {
      if (!t.dueDate) return activeDate === todayStr; // default untimed tasks to today
      const taskDate = new Date(t.dueDate).toISOString().slice(0, 10);
      return taskDate === activeDate;
    });
  }

  // Calculate day metrics
  const totalDayCount = dateFiltered.length;
  const completedCount = dateFiltered.filter(t => t.status === 'Completed').length;
  const activeCount = totalDayCount - completedCount;
  const compPct = totalDayCount > 0 ? Math.round((completedCount / totalDayCount) * 100) : 0;
  const allDone = totalDayCount > 0 && completedCount === totalDayCount;

  // Filter by status (all / active / completed)
  let visibleTasks = dateFiltered;
  if (dailyTaskUi.filter === 'active') {
    visibleTasks = visibleTasks.filter(t => t.status !== 'Completed');
  } else if (dailyTaskUi.filter === 'completed') {
    visibleTasks = visibleTasks.filter(t => t.status === 'Completed');
  }

  if (dailyTaskUi.search) {
    const q = dailyTaskUi.search.toLowerCase();
    visibleTasks = visibleTasks.filter(t => (t.title || '').toLowerCase().includes(q));
  }

  const isTodayActive = activeDate === todayStr;

  c.innerHTML = `
    <div class="block" style="max-width:880px;margin:0 auto">
      <!-- Section Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="margin:0 0 4px;display:flex;align-items:center;gap:8px">
            <span>Daily Tasks</span>
            <span class="eyebrow">${totalDayCount} ${totalDayCount === 1 ? 'task' : 'tasks'}</span>
          </h2>
          <div style="font-size:12.5px;color:var(--text-3)">Your simple daily checklist to check off what gets done today.</div>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="dailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${isTodayActive ? 'primary' : 'ghost'} small" id="dailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="dailyDatePickerInp" class="daily-date-picker-inp" value="${activeDate === 'all' ? todayStr : activeDate}">

          <button type="button" class="daily-nav-arrow" id="dailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${activeDate === 'all' ? 'gold' : 'ghost'} small" id="dailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- Main Checklist Card -->
      <div class="daily-checklist-card">
        <!-- Day Banner & Progress -->
        <div class="daily-checklist-header">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <span style="font-size:16px;font-weight:800;color:var(--text-1)">
              ${getFriendlyDayLabel(activeDate)}
            </span>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:12.5px;font-weight:700;color:${allDone ? 'var(--green-600)' : 'var(--text-2)'}">
                ${totalDayCount > 0 ? `${completedCount} of ${totalDayCount} completed (${compPct}%)` : 'No tasks yet'}
              </span>
            </div>
          </div>

          <div class="heatmap-bar-wrap" style="height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
            <div class="heatmap-bar-fill" style="width:${compPct}%;background:${allDone ? 'var(--green-500)' : 'var(--brand-500)'};height:100%;transition:width 0.4s ease"></div>
          </div>

          ${allDone ? `
            <div style="margin-top:10px;padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);color:var(--green-600);font-size:12.5px;font-weight:700;display:flex;align-items:center;gap:6px">
              <span>🎉</span> All tasks for today completed! Excellent job!
            </div>
          ` : ''}
        </div>

        <!-- Add Task Bar -->
        <div style="padding:20px 24px 10px">
          <div class="daily-checklist-add-bar">
            <span style="font-size:16px;color:var(--text-4);font-weight:700">◯</span>
            <input type="text" id="dailyTaskQuickInput" class="daily-checklist-input" placeholder="Add a daily task... (Press Enter to add)">
            <button type="button" class="btn gold small" id="dailyTaskAddBtn" style="padding:6px 14px;font-weight:700">
              + Add Task
            </button>
          </div>

          <!-- Controls: Filter Chips & Search -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <button class="pchip ${dailyTaskUi.filter==='all'?'active':''}" data-df="all">All (${totalDayCount})</button>
              <button class="pchip ${dailyTaskUi.filter==='active'?'active':''}" data-df="active">To Do (${activeCount})</button>
              <button class="pchip ${dailyTaskUi.filter==='completed'?'active':''}" data-df="completed">✓ Completed (${completedCount})</button>
            </div>

            <div style="display:flex;gap:8px;align-items:center">
              <div class="ticket-search-box" style="margin:0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="dailySearchInp" placeholder="Search checklist…" value="${escapeHtml(dailyTaskUi.search)}" style="font-size:12px;padding:4px 6px">
                ${dailyTaskUi.search ? `<button type="button" id="dailyClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>` : ''}
              </div>

              ${completedCount > 0 ? `
                <button type="button" class="btn ghost small" onclick="clearCompletedDailyTasks()" style="font-size:11.5px;color:var(--text-3);padding:4px 8px" title="Remove completed tasks">
                  Clear Completed
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Checklist Rows -->
        <div id="dailyChecklistRowsContainer" style="border-top:1px solid var(--border-xs)">
          ${visibleTasks.length === 0 ? `
            <div style="text-align:center;padding:48px 20px;color:var(--text-3)">
              <div style="font-size:36px;margin-bottom:8px">📝</div>
              <div style="font-weight:700;font-size:15px;color:var(--text-1);margin-bottom:4px">No tasks on this checklist</div>
              <div style="font-size:12.5px;color:var(--text-4);max-width:320px;margin:0 auto">Type your task above and press Enter to start checking off items for ${activeDate === 'all' ? 'your list' : 'today'}.</div>
            </div>
          ` : visibleTasks.map(t => {
            const isDone = t.status === 'Completed';
            const taskDate = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '';

            return `
              <div class="daily-item-row ${isDone ? 'completed' : ''}" id="daily-row-${t._id}">
                <!-- Circle checkbox -->
                <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                  <button type="button" class="daily-circle-check ${isDone ? 'checked' : ''}" onclick="toggleDailyTask('${t._id}')" title="${isDone ? 'Mark Incomplete' : 'Mark Complete'}">
                    ✓
                  </button>
                  <span class="daily-item-text" onclick="toggleDailyTask('${t._id}')" style="cursor:pointer;flex:1">
                    ${escapeHtml(t.title)}
                  </span>
                </div>

                <!-- Right Side Meta & Actions -->
                <div class="daily-actions-hover">
                  ${activeDate === 'all' && taskDate ? `
                    <span class="task-tag-pill" style="font-size:10.5px;margin-right:6px">📅 ${taskDate === todayStr ? 'Today' : taskDate}</span>
                  ` : ''}
                  <button type="button" class="btn ghost small" onclick="editDailyTask('${t._id}')" title="Edit task" style="padding:3px 7px;font-size:12px">✏️</button>
                  <button type="button" class="btn ghost small" onclick="deleteDailyTask('${t._id}')" title="Delete task" style="padding:3px 7px;font-size:12px;color:var(--red-500)">🗑️</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Bind Quick Add Input
  const qInput = document.getElementById('dailyTaskQuickInput');
  const qAddBtn = document.getElementById('dailyTaskAddBtn');
  const handleQuickAdd = async () => {
    const title = (qInput?.value || '').trim();
    if (!title) {
      flashToast('Please enter a task', true);
      return;
    }
    const dueDate = dailyTaskUi.date === 'all' ? todayStr : dailyTaskUi.date;
    try {
      await saveTaskLocalOrApi({
        title,
        status: 'Todo',
        dueDate
      });
      flashToast('Task added! ✍️');
      if (qInput) {
        qInput.value = '';
        qInput.focus();
      }
      renderTab();
    } catch (err) {
      flashToast(err.message, true);
    }
  };

  if (qAddBtn) qAddBtn.onclick = handleQuickAdd;
  if (qInput) qInput.onkeydown = (e) => { if (e.key === 'Enter') handleQuickAdd(); };

  // Bind Filters
  document.querySelectorAll('[data-df]').forEach(b => {
    b.onclick = () => { dailyTaskUi.filter = b.dataset.df; renderTab(); };
  });

  // Bind Date Navigation
  const prevBtn = document.getElementById('dailyPrevDayBtn');
  if (prevBtn) prevBtn.onclick = () => {
    dailyTaskUi.date = shiftDateStr(dailyTaskUi.date, -1);
    renderTab();
  };

  const nextBtn = document.getElementById('dailyNextDayBtn');
  if (nextBtn) nextBtn.onclick = () => {
    dailyTaskUi.date = shiftDateStr(dailyTaskUi.date, 1);
    renderTab();
  };

  const todayBtn = document.getElementById('dailyTodayBtn');
  if (todayBtn) todayBtn.onclick = () => {
    dailyTaskUi.date = todayStr;
    renderTab();
  };

  const allDatesBtn = document.getElementById('dailyAllDatesBtn');
  if (allDatesBtn) allDatesBtn.onclick = () => {
    dailyTaskUi.date = dailyTaskUi.date === 'all' ? todayStr : 'all';
    renderTab();
  };

  const datePicker = document.getElementById('dailyDatePickerInp');
  if (datePicker) datePicker.onchange = (e) => {
    if (e.target.value) {
      dailyTaskUi.date = e.target.value;
      renderTab();
    }
  };

  // Bind Search
  const searchInp = document.getElementById('dailySearchInp');
  if (searchInp) searchInp.oninput = (e) => {
    dailyTaskUi.search = e.target.value;
    tabDailyTasks(c);
  };

  const clrSearch = document.getElementById('dailyClearSearch');
  if (clrSearch) clrSearch.onclick = () => {
    dailyTaskUi.search = '';
    renderTab();
  };
}

/* ── DAILY CHECKLIST ACTIONS ── */
window.toggleDailyTask = async function(id) {
  try {
    await toggleTaskLocalOrApi(id);
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

window.deleteDailyTask = async function(id) {
  try {
    await deleteTaskLocalOrApi(id);
    flashToast('Task deleted');
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

window.editDailyTask = async function(id) {
  const tasks = await getLocalOrApiTasks();
  const t = tasks.find(x => x._id === id);
  if (!t) return;
  const newTitle = prompt('Edit task:', t.title);
  if (newTitle !== null && newTitle.trim()) {
    try {
      await saveTaskLocalOrApi({ title: newTitle.trim() }, id);
      flashToast('Task updated');
      renderTab();
    } catch(err) { flashToast(err.message, true); }
  }
};

window.clearCompletedDailyTasks = async function() {
  if (!confirm('Delete all completed tasks from this view?')) return;
  try {
    await apiPost('/tasks/clear-completed', { date: dailyTaskUi.date });
    try {
      const cached = localStorage.getItem('ci360_tasks_' + (user?._id || 'user'));
      if (cached) {
        let list = JSON.parse(cached);
        list = list.filter(t => t.status !== 'Completed');
        localStorage.setItem('ci360_tasks_' + (user?._id || 'user'), JSON.stringify(list));
      }
    } catch(e) {}
    flashToast('Completed tasks deleted! 🗑️');
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

/* ════════════════════════════ SUPPORT TICKETS ══════════════════ */

/* ════════════════════════════ SUPPORT TICKETS ══════════════════ */
let empTicketSearch = '';
let empTicketPriFilter = 'all';

async function tabTickets(c){
  let allTickets = await apiGet('/tickets');
  allTickets.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));

  const isLead = isLeadManager();
  const totalCount    = allTickets.length;
  const openCount     = allTickets.filter(t => t.status === 'Open').length;
  const reviewCount   = allTickets.filter(t => t.status === 'In Review').length;
  const resolvedCount = allTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
  const resRate       = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 100;

  const filter = ui.ticketsFilter || 'all';
  let filtered = allTickets;
  if(filter === 'open') filtered = filtered.filter(t => t.status === 'Open');
  else if(filter === 'in-review') filtered = filtered.filter(t => t.status === 'In Review');
  else if(filter === 'resolved') filtered = filtered.filter(t => t.status === 'Resolved');
  else if(filter === 'closed') filtered = filtered.filter(t => t.status === 'Closed');

  if(empTicketPriFilter !== 'all') {
    filtered = filtered.filter(t => t.priority === empTicketPriFilter);
  }

  if(empTicketSearch) {
    const q = empTicketSearch.toLowerCase();
    filtered = filtered.filter(t => {
      const jobTitle = t.jobId ? (t.jobId.title || '') : '';
      return (t.subject||'').toLowerCase().includes(q) ||
             (t.message||'').toLowerCase().includes(q) ||
             (t.userName||'').toLowerCase().includes(q) ||
             jobTitle.toLowerCase().includes(q);
    });
  }

  const statusBadges = { 'Open':'red', 'In Review':'amber', 'Resolved':'green', 'Closed':'gray' };
  const priBadges    = { 'Low':'green', 'Medium':'gray', 'High':'amber', 'Urgent':'red' };

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

  c.innerHTML = `
    <section class="block">
      <!-- Top KPIs -->
      <div class="ticket-hub-kpis">
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon blue">🎫</div>
          <div>
            <div class="ticket-kpi-val">${totalCount}</div>
            <div class="ticket-kpi-lbl">Total Tickets</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon red">🔴</div>
          <div>
            <div class="ticket-kpi-val">${openCount}</div>
            <div class="ticket-kpi-lbl">Open Action Req.</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon amber">🟡</div>
          <div>
            <div class="ticket-kpi-val">${reviewCount}</div>
            <div class="ticket-kpi-lbl">In Review</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon green">⚡</div>
          <div>
            <div class="ticket-kpi-val">${resRate}%</div>
            <div class="ticket-kpi-lbl">Resolution Rate</div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="pchip ${filter==='all'?'active':''}" data-tf="all">All (${totalCount})</button>
          <button class="pchip ${filter==='open'?'active':''}" data-tf="open">🔴 Open (${openCount})</button>
          <button class="pchip ${filter==='in-review'?'active':''}" data-tf="in-review">🟡 In Review (${reviewCount})</button>
          <button class="pchip ${filter==='resolved'?'active':''}" data-tf="resolved">🟢 Resolved (${resolvedCount})</button>
          <button class="pchip ${filter==='closed'?'active':''}" data-tf="closed">⚪ Closed</button>
        </div>

        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select id="empTkPriFilter" style="font-size:12.5px;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);color:var(--text-1);outline:none">
            <option value="all" ${empTicketPriFilter==='all'?'selected':''}>All Priorities</option>
            <option value="Urgent" ${empTicketPriFilter==='Urgent'?'selected':''}>🔴 Urgent</option>
            <option value="High" ${empTicketPriFilter==='High'?'selected':''}>🟠 High</option>
            <option value="Medium" ${empTicketPriFilter==='Medium'?'selected':''}>🟡 Medium</option>
            <option value="Low" ${empTicketPriFilter==='Low'?'selected':''}>🟢 Low</option>
          </select>

          <div class="ticket-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="empTkSearch" placeholder="Search by subject, client, job…" value="${escapeHtml(empTicketSearch)}">
            ${empTicketSearch ? `<button type="button" id="empClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:12px">✕</button>` : ''}
          </div>

          <button class="btn gold" id="empRaiseTicketGlobalBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Raise Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Cards -->
      ${filtered.length === 0 ? renderEmptyState('No support tickets found', 'No tickets match the selected criteria.', '🎫') : `
      <div style="display:flex;flex-direction:column;gap:14px">
        ${filtered.map(t => {
          const jobTitle = t.jobId ? (t.jobId.title || 'Untitled Job') : 'General Workspace Support';
          const statusSlug = (t.status||'Open').toLowerCase().replace(' ','-');
          const isOpen = t.status === 'Open';
          const shortId = (t._id || '').slice(-4).toUpperCase();
          const initials = getInitials(t.userName);

          return `
          <div class="ticket-card status-${statusSlug}" id="emp-tk-${t._id}">
            <div class="ticket-card-header">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
                  <span class="ticket-id-tag">#TK-${shortId}</span>
                  <span class="ticket-subject">${escapeHtml(t.subject)}</span>
                </div>
                <div style="font-size:12px;color:var(--text-4);margin-top:2px">
                  📁 Job: <strong style="color:var(--text-2)">${escapeHtml(jobTitle)}</strong>
                </div>
              </div>
              <div class="ticket-meta-badges">
                <span class="badge ${statusBadges[t.status]||'gray'}">
                  ${isOpen ? '<span class="pulse-dot"></span>' : ''} ${escapeHtml(t.status)}
                </span>
                <span class="badge ${priBadges[t.priority]||'gray'}">${escapeHtml(t.priority)}</span>
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

            <div class="ticket-message-box">
              ${escapeHtml(t.message)}
            </div>

            ${t.adminReply ? `
              <div class="ticket-thread-wrap">
                <div class="ticket-admin-reply-card">
                  <div class="ticket-admin-reply-header">
                    <span class="ticket-shield-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Staff Response
                    </span>
                    ${t.repliedAt ? `<span style="font-size:11px;color:var(--text-4)">${timeAgo(t.repliedAt)}</span>` : ''}
                  </div>
                  <div class="ticket-admin-reply-text">${escapeHtml(t.adminReply)}</div>
                </div>
              </div>` : ''}

            ${isLead ? `
            <div class="ticket-toolbar">
              <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
              <select class="emp-tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
                <option value="Open" ${t.status==='Open'?'selected':''}>🔴 Open</option>
                <option value="In Review" ${t.status==='In Review'?'selected':''}>🟡 In Review</option>
                <option value="Resolved" ${t.status==='Resolved'?'selected':''}>🟢 Resolved</option>
                <option value="Closed" ${t.status==='Closed'?'selected':''}>⚪ Closed</option>
              </select>

              <button class="btn ghost small emp-tk-reply-toggle" data-tkid="${t._id}" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${t.adminReply ? 'Edit Reply' : '💬 Reply'}
              </button>

              ${t.status !== 'Resolved' ? `
                <button class="btn ghost small emp-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Quick Resolve
                </button>` : ''}

              <button class="btn danger small emp-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

              <div class="ticket-reply-form" id="emp-tk-replyform-${t._id}">
                <div class="ticket-templates-bar">
                  <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Mansi & Urna team is on it! Updates will be shared shortly.">🚀 On It</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
                </div>
                <textarea id="emp-tk-replytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(t.adminReply||'')}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px">
                  <button class="btn ghost small emp-tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
                  <button class="btn gold small emp-tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
                </div>
              </div>
            </div>` : (user && String(t.userId?._id || t.userId) === String(user._id) ? `
            <div class="ticket-toolbar" style="display:flex;align-items:center;gap:8px">
              <span style="font-size:11.5px;color:var(--text-3);font-weight:700">My Ticket</span>
              ${t.status !== 'Resolved' && t.status !== 'Closed' ? `
                <button class="btn ghost small emp-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Mark Resolved
                </button>` : ''}
              <button class="btn danger small emp-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>
            </div>
            ` : '')}
          </div>`;
        }).join('')}
      </div>`}
    </section>
  `;

  // Bind controls
  document.querySelectorAll('[data-tf]').forEach(b => {
    b.onclick = () => { ui.ticketsFilter = b.dataset.tf; renderTab(); };
  });

  const searchInput = document.getElementById('empTkSearch');
  if (searchInput) {
    searchInput.oninput = (e) => {
      empTicketSearch = e.target.value;
      tabTickets(c);
    };
  }

  const clearSearchBtn = document.getElementById('empClearSearch');
  if (clearSearchBtn) {
    clearSearchBtn.onclick = () => {
      empTicketSearch = '';
      tabTickets(c);
    };
  }

  const priFilterSel = document.getElementById('empTkPriFilter');
  if (priFilterSel) {
    priFilterSel.onchange = (e) => {
      empTicketPriFilter = e.target.value;
      tabTickets(c);
    };
  }

  // Raise Ticket Modal
  const empRaiseBtn = document.getElementById('empRaiseTicketGlobalBtn');
  if (empRaiseBtn) {
    empRaiseBtn.onclick = async () => {
      let jobs = [];
      try {
        jobs = await apiGet('/jobs?mine=true');
        if (!jobs || !jobs.length) {
          jobs = await apiGet('/jobs').catch(() => []);
        }
      } catch(e) { jobs = []; }

      const bg = openModal(`
        <div style="margin-bottom:14px">
          <h3 style="margin-bottom:4px">🎫 Raise Support Ticket</h3>
          <div style="font-size:12.5px;color:var(--text-3)">Create a new support request, note, or blocker report.</div>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Target / Job (Optional)</label>
          <select id="empModalTkJob" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="">📁 General Workspace Support (No specific job)</option>
            ${jobs.map(j => `<option value="${j._id}">${escapeHtml(j.title || 'Untitled Job')}</option>`).join('')}
          </select>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Subject / Issue Title *</label>
          <input type="text" id="empModalTkSub" placeholder="Brief summary of the issue…" maxlength="120" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box">
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Priority Level</label>
          <select id="empModalTkPri" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium" selected>🟡 Medium Priority</option>
            <option value="High">🟠 High Priority</option>
            <option value="Urgent">🔴 Urgent / Blocker</option>
          </select>
        </div>

        <div class="field" style="margin-bottom:16px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Detailed Description *</label>
          <textarea id="empModalTkMsg" rows="4" placeholder="Provide full details, feedback, or blockers…" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box;resize:vertical"></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mEmpCancelTicket">Cancel</button>
          <button class="btn gold" id="mEmpSubmitTicket">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      `);

      bg.querySelector('#mEmpCancelTicket').onclick = () => bg.remove();
      bg.querySelector('#mEmpSubmitTicket').onclick = async () => {
        const jobId    = bg.querySelector('#empModalTkJob').value || null;
        const subject  = bg.querySelector('#empModalTkSub').value.trim();
        const priority = bg.querySelector('#empModalTkPri').value;
        const message  = bg.querySelector('#empModalTkMsg').value.trim();

        if (!subject) { flashToast('Please enter an issue subject', true); return; }
        if (!message) { flashToast('Please enter description', true); return; }

        try {
          await apiPost('/tickets', { jobId, subject, message, priority });
          flashToast('Support Ticket Raised! 🎫');
          bg.remove();
          tabTickets(c);
        } catch (err) {
          flashToast(err.message, true);
        }
      };
    };
  }

  // Quick Resolve (all authorized users: leads and ticket owners)
  document.querySelectorAll('.emp-tk-quick-resolve').forEach(btn => {
    btn.onclick = async () => {
      try {
        await apiPut('/tickets/' + btn.dataset.tkid, { status: 'Resolved' });
        flashToast('Ticket marked as Resolved! 🎉');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });

  // Delete ticket (leads and ticket owners)
  document.querySelectorAll('.emp-tk-del-btn').forEach(btn => {
    btn.onclick = async () => {
      if (!confirm('Permanently delete this ticket?')) return;
      try {
        await apiDelete('/tickets/' + btn.dataset.tkid);
        flashToast('Ticket deleted');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });

  if (isLead) {
    document.querySelectorAll('.ticket-template-btn').forEach(btn => {
      btn.onclick = () => {
        const txt = document.getElementById('emp-tk-replytxt-' + btn.dataset.tkid);
        if (txt) {
          txt.value = btn.dataset.tpl;
          txt.focus();
        }
      };
    });

    document.querySelectorAll('.emp-tk-status-sel').forEach(sel => {
      sel.onchange = async () => {
        try {
          await apiPut('/tickets/' + sel.dataset.tkid, { status: sel.value });
          flashToast('Status updated');
          renderTab();
        } catch (err) { flashToast(err.message, true); }
      };
    });

    document.querySelectorAll('.emp-tk-reply-toggle').forEach(btn => {
      btn.onclick = () => {
        const form = document.getElementById('emp-tk-replyform-' + btn.dataset.tkid);
        if (form) form.classList.toggle('show');
      };
    });

    document.querySelectorAll('.emp-tk-reply-cancel').forEach(btn => {
      btn.onclick = () => {
        const form = document.getElementById('emp-tk-replyform-' + btn.dataset.tkid);
        if (form) form.classList.remove('show');
      };
    });

    document.querySelectorAll('.emp-tk-reply-save').forEach(btn => {
      btn.onclick = async () => {
        const txt = document.getElementById('emp-tk-replytxt-' + btn.dataset.tkid);
        if (!txt) return;
        try {
          await apiPut('/tickets/' + btn.dataset.tkid, { adminReply: txt.value.trim() });
          flashToast('Response saved! 🛡️');
          renderTab();
        } catch (err) { flashToast(err.message, true); }
      };
    });
  }
}

/* ════════════════════════════ WINDOW ACTIONS ════════════════════ */

window.saveCompDate = async function(id){
  try{
    const inp = document.querySelector(`.emp-completion-date[data-id="${id}"]`);
    if(!inp) return;
    const val = inp.value ? inp.value : null;
    await apiPut('/jobs/' + id, { completionDate: val, status: val ? 'Completed' : 'In Progress' });
    flashToast('Delivery date & status saved!');
    renderTab();
  }catch(err){ flashToast(err.message, true); }
};

window.toggleStatus = async function(id, completed){
  try{
    const jobInp = document.querySelector(`.emp-completion-date[data-id="${id}"]`);
    let completionDate = completed ? (jobInp?.value || new Date().toISOString().slice(0,10)) : null;
    if (jobInp) jobInp.value = completionDate || '';
    await apiPut('/jobs/' + id, { status: completed ? 'Completed' : 'In Progress', completionDate });
    flashToast(completed ? 'Job marked as Completed! 🎉' : 'Job reopened as In Progress');
    renderTab();
  }catch(err){ flashToast(err.message, true); }
};

window.delJob = async function(id){
  if(!confirm('Delete this job entry? This cannot be undone.')) return;
  try{
    await apiDelete('/jobs/' + id);
    flashToast('Job deleted');
    renderTab();
  }catch(err){ flashToast(err.message, true); }
};


/* ════════════════════════════ MY TARGETS ════════════════════════ */
async function tabTargets(c){
  const [d, adminTargets] = await Promise.all([
    apiGet('/dashboard/employee?period=' + ui.period),
    apiGet('/targets?mine=true')
  ]);

  const myP  = cache.personnel.find(p => String(p._id) === String(user.personnelId?._id || user.personnelId));
  const cap  = myP ? myP.capacity : 48;
  const tgt  = d.target ? d.target.targetHours : Math.round(cap * 0.85);
  const pct  = Math.round((d.hours / (tgt || 1)) * 100);
  const cls  = pct >= 100 ? 'green' : pct >= 75 ? 'amber' : 'red';
  const barW = Math.min(pct, 100);

  c.innerHTML = `
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(user.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${periodPicker()}
      </div>

      <!-- Top Summary Metrics -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Hours Logged</span><div class="kpi-icon">⏱</div></div>
          <div class="kpi-value">${fmtHours(d.hours)}</div>
          <div class="kpi-sub">${d.jobCount} jobs this period</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Target Hours</span><div class="kpi-icon">🎯</div></div>
          <div class="kpi-value">${fmtHours(tgt)}</div>
          <div class="kpi-sub">${pct}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${cap} hrs/wk</div>
          <div class="kpi-sub">${myP ? myP.status : 'active'} status</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Assigned Targets</span><div class="kpi-icon">📋</div></div>
          <div class="kpi-value">${adminTargets.length}</div>
          <div class="kpi-sub">Admin configured</div>
        </div>
      </div>

      <!-- Period Hours Progress Card -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${ui.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(d.hours)} logged of ${fmtHours(tgt)} target capacity</div>
          </div>
          <span class="badge ${cls}" style="font-size:12.5px;padding:4px 10px">${pct}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${cls}" style="width:${barW}%;height:100%;border-radius:var(--r-full);background:var(--${cls==='green'?'green':'amber'}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(tgt)}</span>
        </div>
      </div>

      <!-- Admin Assigned Throughput Targets -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px;margin:0;display:flex;align-items:center;gap:8px">
          <span>🎯 Service & Throughput Targets</span>
          <span class="eyebrow">${adminTargets.length} active</span>
        </h3>
        <button class="btn gold small" id="addEmpTargetBtn" type="button">+ Set Target</button>
      </div>

      ${adminTargets.length === 0 ? `
        <div class="card" style="text-align:center;padding:36px 20px">
          <div style="font-size:32px;margin-bottom:8px">🎯</div>
          <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-bottom:4px">No specific service targets assigned yet</div>
          <div style="font-size:12.5px;color:var(--text-3);max-width:420px;margin:0 auto 16px">Your general hours target is active above. Click "+ Set Target" to define your own daily or weekly quotas for reels, stories, posts, or deliverables.</div>
          <button class="btn gold small" onclick="openEmpTargetModal(null)">+ Set First Target</button>
        </div>
      ` : `
        <div class="grid grid-2" style="gap:16px">
          ${adminTargets.map(t => {
            const serviceName = t.serviceId?.name || 'General Service';
            const unitNames = { count: 'Deliverables', hours: 'Hours', reels: 'Reels', stories: 'Stories', posts: 'Posts' };
            const unitLabel   = unitNames[t.unit] || (t.unit ? t.unit.charAt(0).toUpperCase() + t.unit.slice(1) : 'Deliverables');
            const actualVal   = t.actual || 0;
            const targetVal   = t.quantity || 1;
            const ratio       = targetVal > 0 ? (actualVal / targetVal) : 0;
            const targetPct   = Math.round(ratio * 100);
            const targetBarW  = Math.min(targetPct, 100);
            const pace        = ratio >= 1.0 ? { l: '🟢 On Pace', c: 'green' } : (ratio >= 0.6 ? { l: '🟡 Behind', c: 'amber' } : { l: '🔴 Off Pace', c: 'red' });

            return `
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(serviceName)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${pace.c}">${pace.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${t._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${actualVal}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${targetVal} ${escapeHtml(unitLabel)} per ${t.period === 'day' ? 'day' : (t.period === 'week' ? 'week' : 'month')}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${pace.c}" style="width:${targetBarW}%;height:100%;border-radius:var(--r-full);background:var(--${pace.c==='green'?'green':'amber'}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${t._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${t._id}" value="${actualVal}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${t._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${t._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${(t.attachments && t.attachments.length) ? `
                  <div data-attachments="${encodeURIComponent(JSON.stringify(t.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(t.attachments, { title: 'Attached Proofs & Files' })}
                  </div>
                ` : ''}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${t.period === 'day' ? 'Daily' : (t.period === 'week' ? 'Weekly' : 'Monthly')}</strong></span>
                <span><strong>${targetPct}%</strong> Completed</span>
              </div>
            </div>`;
          }).join('')}
        </div>
      `}
    </div>`;

  const addBtn = document.getElementById('addEmpTargetBtn');
  if (addBtn) addBtn.onclick = () => openEmpTargetModal(null);

  document.querySelectorAll('.edit-emp-target').forEach(b => {
    b.onclick = () => openEmpTargetModal(adminTargets.find(t => t._id === b.dataset.id));
  });

  bindPeriodPicker();
}

window.stepTargetCompleted = function(id, delta) {
  const inp = document.querySelector(`.emp-target-completed-inp[data-id="${id}"]`);
  if (!inp) return;
  let val = Math.max(0, (Number(inp.value) || 0) + delta);
  inp.value = val;
  saveTargetCompleted(id);
};

window.saveTargetCompleted = async function(id) {
  try {
    const inp = document.querySelector(`.emp-target-completed-inp[data-id="${id}"]`);
    if (!inp) return;
    const completed = Number(inp.value) || 0;
    await apiPut('/targets/' + id, { completed });
    flashToast('Target progress updated! 🎯');
    renderTab();
  } catch(err) {
    flashToast(err.message, true);
  }
};

function openEmpTargetModal(t){
  const isNew = !t;
  const services = cache.services || [];
  t = t || { serviceId: services[0]?._id, quantity: 5, unit: 'reels', period: 'day', completed: 0, attachments: [] };
  const currentSId = t.serviceId?._id || t.serviceId || '';
  const stdUnits = ['reels', 'stories', 'posts', 'count', 'hours'];
  const isStd = stdUnits.includes(t.unit);

  const bg = openModal(`
    <h3>${isNew ? 'Set New' : 'Edit'} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${services.map(s => `<option value="${s._id}" ${String(s._id)===String(currentSId)?'selected':''}>${escapeHtml(s.name)}</option>`).join('')}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Goal Quota *</label>
        <input type="number" id="mEmpTgtQty" min="0.5" step="0.5" value="${t.quantity || 1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Completed Output</label>
        <input type="number" id="mEmpTgtCompleted" min="0" step="0.5" value="${t.actual || t.completed || 0}">
      </div>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mEmpTgtUnit">
          <option value="reels" ${isStd && t.unit==='reels'?'selected':''}>🎬 Reels</option>
          <option value="stories" ${isStd && t.unit==='stories'?'selected':''}>📱 Stories</option>
          <option value="posts" ${isStd && t.unit==='posts'?'selected':''}>🖼️ Posts</option>
          <option value="count" ${isStd && t.unit==='count'?'selected':''}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${isStd && t.unit==='hours'?'selected':''}>⏱️ Hours Spent</option>
          <option value="custom" ${!isStd ? 'selected' : ''}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>

      <div class="field" style="margin-bottom:0">
        <label>Frequency / Target Period *</label>
        <select id="mEmpTgtPeriod">
          <option value="day" ${t.period==='day'?'selected':''}>Per Day</option>
          <option value="week" ${t.period==='week'?'selected':''}>Per Week</option>
          <option value="month" ${t.period==='month'?'selected':''}>Per Month</option>
        </select>
      </div>
    </div>

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${!isStd ? 'flex' : 'none'}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${!isStd ? escapeHtml(t.unit || '') : ''}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({ id: 'mEmpTgtAttachments', label: 'Proof of Work / Deliverable Attachments', subtitle: 'Upload links, finished files, screenshots or design outputs' })}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);

  bindAttachmentUploader('mEmpTgtAttachments', { existing: t.attachments || [] });

  const unitSel = bg.querySelector('#mEmpTgtUnit');
  const customWrap = bg.querySelector('#mEmpTgtCustomUnitWrap');
  const customInp = bg.querySelector('#mEmpTgtCustomUnit');

  unitSel.onchange = () => {
    if (unitSel.value === 'custom') {
      customWrap.style.display = 'flex';
      customInp.focus();
    } else {
      customWrap.style.display = 'none';
    }
  };

  bg.querySelector('#mEmpTgtCancel').onclick = () => bg.remove();
  bg.querySelector('#mEmpTgtSave').onclick = async () => {
    let finalUnit = unitSel.value;
    if (finalUnit === 'custom') {
      finalUnit = customInp.value.trim() || 'Deliverables';
    }
    const attachments = getUploaderAttachments('mEmpTgtAttachments');

    const payload = {
      serviceId: bg.querySelector('#mEmpTgtService').value,
      quantity: Number(bg.querySelector('#mEmpTgtQty').value) || 1,
      completed: Number(bg.querySelector('#mEmpTgtCompleted').value) || 0,
      unit: finalUnit,
      period: bg.querySelector('#mEmpTgtPeriod').value,
      attachments
    };
    if (!payload.serviceId) {
      flashToast('Service is required', true);
      return;
    }
    try {
      if (isNew) await apiPost('/targets', payload);
      else await apiPut('/targets/' + t._id, payload);
      flashToast('Target saved! 🎯');
      bg.remove();
      renderTab();
    } catch(err) { flashToast(err.message, true); }
  };
}

boot();
