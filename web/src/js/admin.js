let user = null;
let cache = { personnel: [], clients: [], services: [], salaryGrades: [], salaryAssignments: [] };
let dash = null; // last /api/dashboard/admin response
let ui = { tab: 'dashboard', period: 'month', jobsFilter: 'all', ticketsFilter: 'all' };
let draft = { title: '', clientId: '', serviceIds: [], date: new Date().toISOString().slice(0,10), completion: '', value: '', desc: '', assignments: [{personId:'', percent:100, hours:''}, {personId:'', percent:0, hours:''}] };


async function boot(){
  initTheme();
  user = requireAuth('superadmin');
  if(!user) return;
  await refreshCache();
  render();
}

async function refreshCache(){
  const [personnel, clients, services] = await Promise.all([apiGet('/personnel'), apiGet('/clients'), apiGet('/services')]);
  cache.personnel = personnel; cache.clients = clients; cache.services = services;
}

function getDefaultAssignments(){
  const mansi = cache.personnel.find(p=> /mansi/i.test(p.name));
  const urna = cache.personnel.find(p=> /urna/i.test(p.name));
  const rows = [];
  if (mansi) rows.push({ personId: mansi._id, percent: '', hours: '' });
  if (urna) rows.push({ personId: urna._id, percent: '', hours: '' });
  if (rows.length === 0) {
    rows.push({ personId: '', percent: '', hours: '' });
  }
  return rows;
}

function personName(id){ const p = cache.personnel.find(p=>p._id===id); return p ? p.name : '—'; }
function clientName(id){ const c = cache.clients.find(c=>c._id===id); return c ? c.name : '—'; }

const ADMIN_TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'dailytasks', label: 'Daily Tasks', icon: '✅' },
  { key: 'logjob', label: 'Log a Job', icon: '➕' },
  { key: 'jobs', label: 'All Jobs', icon: '📁' },
  { key: 'tickets', label: 'Support Tickets', icon: '🎫' },
  { key: 'byclient', label: 'By Client', icon: '💼' },
  { key: 'byperson', label: 'By Person', icon: '👥' },
  { key: 'accounts', label: 'Accounts', icon: '🏢' },
  { key: 'targets', label: 'Targets', icon: '🎯' },
  { key: 'salaries', label: 'Salaries', icon: '💰' },
  { key: 'users', label: 'Users', icon: '👤' },
  { key: 'manage', label: 'Manage', icon: '⚙️' }
];

function render(){
  const app = document.getElementById('app');
  const activeTabObj = ADMIN_TABS.find(t => t.key === ui.tab) || ADMIN_TABS[0];
  app.innerHTML = renderAppShell({
    user,
    currentRole: 'superadmin',
    activeTab: ui.tab,
    tabs: ADMIN_TABS,
    title: activeTabObj.label,
    subtitle: 'Productivity & Revenue Intelligence'
  });

  bindAppShellEvents((newTab) => {
    ui.tab = newTab;
    render();
  });

  renderTab();
}
window.ci360NavTab = (newTab) => { ui.tab = newTab; render(); };

async function renderTab(){
  const c = document.getElementById('content');
  if(!c) return;
  c.innerHTML = renderSkeletonCards(4);

  try{
    if(ui.tab==='dashboard') await tabDashboard(c);
    else if(ui.tab==='dailytasks') await tabDailyTasks(c);
    else if(ui.tab==='logjob') tabLogJob(c);
    else if(ui.tab==='jobs') await tabJobs(c);
    else if(ui.tab==='tickets') await tabTickets(c);
    else if(ui.tab==='byclient') await tabByClient(c);
    else if(ui.tab==='byperson') await tabByPerson(c);
    else if(ui.tab==='accounts') await tabAccounts(c);
    else if(ui.tab==='targets') await tabTargets(c);
    else if(ui.tab==='salaries') await tabSalaries(c);
    else if(ui.tab==='settings' || ui.tab==='manage') tabSettings(c);
    else if(ui.tab==='users') await tabUsers(c);
  }catch(err){
    c.innerHTML = `<div class="empty"><h3>Something went wrong</h3>${escapeHtml(err.message)}</div>`;
  }
}

function periodPicker(){
  return renderPeriodPicker(ui.period);
}
function bindPeriodPicker(){
  document.querySelectorAll('[data-period]').forEach(b=>{ b.onclick = ()=>{ ui.period = b.dataset.period; renderTab(); }; });
}

/* ---------------- DASHBOARD ---------------- */
async function tabDashboard(c){
  dash = await apiGet('/dashboard/admin?period=' + ui.period);
  const o = dash.overview;
  c.innerHTML = `
    <div class="dash-overview-header">
      <div class="dash-overview-title-wrap">
        <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;">Dashboard Overview</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      ${periodPicker()}
    </div>

    <section class="block block-kpi-grid">
      <div class="grid grid-4">
        <div class="card kpi kpi-work-val">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-purple-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <div class="label">Work Value Tracked <span class="kpi-mini-icon">📊</span></div>
          </div>
          <div class="value">${fmtINR(o.totalValue)}</div>
          <div class="sub">across ${o.activeClients} of ${o.totalClients} active clients</div>
          <svg class="kpi-spark-wave purple-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q25,38 45,26 T80,16 T100,10" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="card kpi kpi-jobs-logged">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-green-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            </div>
            <div class="label">Jobs Logged <span class="kpi-mini-icon">📄</span></div>
          </div>
          <div class="value">${o.totalJobs}</div>
          <div class="sub">${fmtHours(o.totalHours)} of effort tracked</div>
          <svg class="kpi-spark-wave green-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q30,35 60,30 T85,15 T100,10" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="card kpi kpi-overworked">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-amber-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="label">Overworked <span class="kpi-mini-icon">⚠️</span></div>
          </div>
          <div class="value" style="color:var(--red)">${o.overworked}</div>
          <div class="sub">team members above 115% capacity</div>
          <svg class="kpi-spark-wave amber-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q20,38 40,25 T70,30 T100,12" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="card kpi kpi-underused">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-rose-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
            </div>
            <div class="label">Underused Capacity <span class="kpi-mini-icon">📉</span></div>
          </div>
          <div class="value" style="color:var(--blue)">${o.underused}</div>
          <div class="sub">team members below 55% capacity</div>
          <svg class="kpi-spark-wave rose-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q25,35 45,28 T70,32 T100,14" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>Roadmap Signals <span class="eyebrow">Auto-generated</span></h2>
      ${dash.insights.length ? dash.insights.map(i=>`<div class="insight ${i.type}">${escapeHtml(i.text)}</div>`).join('') : `<div class="empty">Log a few jobs to start seeing workload signals here.</div>`}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${barRows(dash.clients.slice(0,8).map(x=>[x.name,x.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${barRows(dash.services.slice(0,8).map(x=>[x.name,x.value]), true)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${dash.personnel.filter(p=>p.status!=='inactive').map(gaugeRow).join('') || '<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `;
  bindPeriodPicker();
}

function barRows(pairs, gold){
  if(!pairs.length) return '<div class="empty">No data yet.</div>';
  const max = Math.max(1, ...pairs.map(p=>p[1]));
  return pairs.map(([name,val])=>`
    <div class="bar-row">
      <div>${escapeHtml(name)}</div>
      <div class="bar-track"><div class="bar-fill ${gold?'gold':''}" style="width:${(val/max*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(val)}</div>
    </div>`).join('');
}

function gaugeRow(b){
  const pct = Math.min(b.utilization, 160);
  return `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px;">
        <span><strong>${escapeHtml(b.name)}</strong> <span class="muted">${escapeHtml(b.duties||'')}</span></span>
        <span><span class="badge ${b.cls}">${b.label}</span> &nbsp; ${b.utilization.toFixed(0)}%</span>
      </div>
      <div class="gauge-track">
        <div class="gauge-zone" style="left:0;width:25%;background:var(--blue-bg);"></div>
        <div class="gauge-zone" style="left:25%;width:30%;background:var(--green-bg);"></div>
        <div class="gauge-zone" style="left:55%;width:35%;background:var(--amber-bg);"></div>
        <div class="gauge-zone" style="left:90%;width:10%;background:var(--red-bg);"></div>
        <div class="gauge-fill" style="left:${Math.min(pct/1.6,99)}%;"></div>
      </div>
    </div>`;
}

/* ---------------- LOG A JOB ---------------- */
function tabLogJob(c){
  if (!draft.assignments || draft.assignments.every(a => !a.personId)) {
    draft.assignments = getDefaultAssignments();
  }
  const totalPercent = draft.assignments.reduce((s,a)=>s+(Number(a.percent)||0),0);
  c.innerHTML = `
    <section class="block">
      <div style="margin-bottom:20px;">
        <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0;">Log New Job & Work Deliverable</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Record client deliverables, services provided, financial value, and team hour attributions.</p>
      </div>

      <div class="card log-job-card">
        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">1. Client & Timeline</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>CLIENT *</label>
            <div class="select-with-btn">
              <select id="jClient">
                <option value="">Select client…</option>
                ${cache.clients.map(cl=>`<option value="${cl._id}" ${cl._id===draft.clientId?'selected':''}>${escapeHtml(cl.name)}</option>`).join('')}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${draft.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${draft.completion||''}" placeholder="dd.mm.yyyy">
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">2. Deliverable & Financials</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>SERVICE(S) DELIVERED *</label>
            <div class="select-with-btn">
              <select id="jService">
                <option value="">Select service to add…</option>
                ${cache.services.map(s => `<option value="${s._id}">${escapeHtml(s.name)}</option>`).join('')}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${draft.serviceIds.length ? `
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${draft.serviceIds.map(id => {
                  const s = cache.services.find(srv => srv._id === id);
                  if (!s) return '';
                  return `
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(s.name)}
                      <span class="remove-service-tag" data-id="${s._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="jValue" value="${draft.value||''}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(draft.desc||'')}</textarea>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">3. Team Work Allocation & Hours</h3>
          <div class="people-assigned-box">
            <div class="people-assigned-headers">
              <div>TEAM MEMBER</div>
              <div>% OF WORK</div>
              <div>HOURS SPENT</div>
              <div></div>
            </div>
            <div id="assignRows">
              ${draft.assignments.map((a,i)=>assignRowHtml(a,i)).join('')}
            </div>
            <button class="btn ghost small" id="addAssignRow" type="button" style="margin-top:10px;">+ Add Team Member</button>
            <div style="margin-top:14px;">
              <div class="assign-total ${totalPercent!==100?'warn':''}">
                <span>${totalPercent===100?'✓':'⚠️'}</span>
                <span>${totalPercent}% of work allocated ${totalPercent!==100?'— should total 100%':'(100% Complete)'}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">4. Briefs &amp; File Attachments</h3>
          ${renderAttachmentUploader({ id: 'jAttachments', label: 'Briefs & Reference Assets', subtitle: 'Upload briefs, design mockups, agreements, logos or source files' })}
        </div>

        <div class="form-actions">
          <button class="btn ghost" id="clearJobBtn" type="button">Reset Draft</button>
          <button class="btn gold" id="saveJobBtn" type="button" style="padding:10px 28px;font-size:14px;">Save Job & Dispatch Notifications</button>
        </div>
      </div>
    </section>
  `;
  bindLogJob();
}

function assignRowHtml(a,i){
  return `
    <div class="person-assign-row" data-idx="${i}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${cache.personnel.map(p=>`<option value="${p._id}" ${p._id===a.personId?'selected':''}>${escapeHtml(p.name)}${p.duties ? ` (${escapeHtml(p.duties)})` : ''}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <input type="number" class="a-percent" value="${a.percent!=null?a.percent:''}" placeholder="100" min="0" max="100">
      </div>
      <div class="field">
        <input type="number" class="a-hours" value="${a.hours||''}" placeholder="e.g. 3.5" min="0" step="0.5">
      </div>
      <div style="display:flex;justify-content:center;">
        <button class="btn-remove-person a-remove" type="button" title="Remove person">✕</button>
      </div>
    </div>
  `;
}

function bindLogJob(){
  const jClient = document.getElementById('jClient');
  if(jClient) jClient.onchange = e=> draft.clientId = e.target.value;

  const addNewClientBtn = document.getElementById('addNewClientBtn');
  if(addNewClientBtn) {
    addNewClientBtn.onclick = () => {
      const bg = openModal(`
        <h3>Add New Client</h3>
        <div class="field">
          <label>Client Name *</label>
          <input type="text" id="newClientName" placeholder="e.g. Acme Corp">
        </div>
        <div class="field">
          <label>Notes (optional)</label>
          <input type="text" id="newClientNotes" placeholder="Notes...">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Client</button>
        </div>
      `);
      bg.querySelector('#mCancel').onclick = () => bg.remove();
      bg.querySelector('#mSave').onclick = async () => {
        const name = bg.querySelector('#newClientName').value.trim();
        const notes = bg.querySelector('#newClientNotes').value.trim();
        if (!name) { flashToast('Client name is required', true); return; }
        try {
          const newClient = await apiPost('/clients', { name, notes });
          await refreshCache();
          draft.clientId = newClient._id;
          flashToast('Client added');
          bg.remove();
          tabLogJob(document.getElementById('content'));
        } catch (err) { flashToast(err.message, true); }
      };
    };
  }

  const jDate = document.getElementById('jDate');
  if(jDate) jDate.onchange = e=> draft.date = e.target.value;

  const jCompletion = document.getElementById('jCompletion');
  if(jCompletion) jCompletion.onchange = e=> draft.completion = e.target.value;

  const jService = document.getElementById('jService');
  if (jService) {
    jService.onchange = e => {
      const val = e.target.value;
      if (val) {
        if (!draft.serviceIds.includes(val)) {
          draft.serviceIds.push(val);
        }
        tabLogJob(document.getElementById('content'));
      }
    };
  }

  document.querySelectorAll('.remove-service-tag').forEach(tag => {
    tag.onclick = e => {
      e.stopPropagation();
      const id = tag.dataset.id;
      draft.serviceIds = draft.serviceIds.filter(sId => sId !== id);
      tabLogJob(document.getElementById('content'));
    };
  });

  const addNewServiceBtn = document.getElementById('addNewServiceBtn');
  if(addNewServiceBtn) {
    addNewServiceBtn.onclick = () => {
      const bg = openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);
      bg.querySelector('#mCancel').onclick = () => bg.remove();
      bg.querySelector('#mSave').onclick = async () => {
        const name = bg.querySelector('#newServiceName').value.trim();
        if (!name) { flashToast('Service name is required', true); return; }
        try {
          const newService = await apiPost('/services', { name });
          await refreshCache();
          if (!draft.serviceIds.includes(newService._id)) {
            draft.serviceIds.push(newService._id);
          }
          flashToast('Service added');
          bg.remove();
          tabLogJob(document.getElementById('content'));
        } catch (err) { flashToast(err.message, true); }
      };
    };
  }

  const jDesc = document.getElementById('jDesc');
  if(jDesc) jDesc.oninput = e=> draft.desc = e.target.value;

  const jValue = document.getElementById('jValue');
  if(jValue) jValue.oninput = e=> draft.value = e.target.value;

  document.querySelectorAll('.person-assign-row').forEach(row=>{
    const idx = Number(row.dataset.idx);
    const personSel = row.querySelector('.a-person');
    if(personSel) personSel.onchange = e=> draft.assignments[idx].personId = e.target.value;

    const percentInp = row.querySelector('.a-percent');
    if(percentInp) percentInp.oninput = e=>{ draft.assignments[idx].percent = e.target.value; syncPercentTotal(); };

    const hoursInp = row.querySelector('.a-hours');
    if(hoursInp) hoursInp.oninput = e=> draft.assignments[idx].hours = e.target.value;

    const removeBtn = row.querySelector('.a-remove');
    if(removeBtn) removeBtn.onclick = ()=>{
      if(draft.assignments.length > 1){
        draft.assignments.splice(idx, 1);
        tabLogJob(document.getElementById('content'));
      }
    };
  });

  const addAssignRow = document.getElementById('addAssignRow');
  if(addAssignRow) {
    addAssignRow.onclick = ()=>{
      draft.assignments.push({personId:'', percent:0, hours:''});
      tabLogJob(document.getElementById('content'));
    };
  }

  bindAttachmentUploader('jAttachments', { existing: draft.attachments || [] });

  const clearJobBtn = document.getElementById('clearJobBtn');
  if(clearJobBtn) {
    clearJobBtn.onclick = ()=>{
      draft = { title: '', assignments: getDefaultAssignments(), serviceIds:[], clientId:'', date: new Date().toISOString().slice(0,10), completion:'', value:'', desc:'', attachments: [] };
      setUploaderAttachments('jAttachments', []);
      tabLogJob(document.getElementById('content'));
    };
  }

  const saveJobBtn = document.getElementById('saveJobBtn');
  if(saveJobBtn) {
    saveJobBtn.onclick = async ()=>{
      try{
        if (!draft.clientId) {
          flashToast('Please select a client', true);
          return;
        }
        if (!draft.serviceIds || !draft.serviceIds.length) {
          flashToast('Please select at least one service', true);
          return;
        }
        const valid = draft.assignments.filter(a=>a.personId);
        if (!valid.length) {
          flashToast('Please assign at least one person', true);
          return;
        }
        for (const a of valid) {
          if (a.hours === '' || a.hours == null) {
            flashToast('Enter hours spent for every assigned person', true);
            return;
          }
        }

        const clientObj = cache.clients.find(c=>c._id === draft.clientId);
        const selectedServices = cache.services.filter(s=>draft.serviceIds.includes(s._id));
        const serviceNamesStr = selectedServices.map(s=>s.name).join(', ');
        const title = draft.title || (clientObj ? `${clientObj.name} — ${serviceNamesStr || 'Deliverable'}` : (serviceNamesStr || 'Untitled Job'));
        const attachments = getUploaderAttachments('jAttachments');

        await apiPost('/jobs', {
          title,
          clientId: draft.clientId,
          serviceIds: draft.serviceIds,
          date: draft.date || new Date().toISOString().slice(0,10),
          completionDate: draft.completion || null,
          value: Number(draft.value) || 0,
          description: draft.desc || '',
          assignments: valid,
          attachments,
        });
        flashToast('Job saved successfully! 📁');
        draft = { title: '', assignments: getDefaultAssignments(), serviceIds:[], clientId:'', date: new Date().toISOString().slice(0,10), completion:'', value:'', desc:'', attachments: [] };
        ui.tab = 'jobs';
        renderTab();
      } catch(err){ flashToast(err.message, true); }
    };
  }
}

function syncPercentTotal(){
  const total = draft.assignments.reduce((s,a)=>s+(Number(a.percent)||0),0);
  const el = document.querySelector('.assign-total');
  if(el){ el.textContent = `${total}% of work allocated ${total!==100?'— should total 100%':'✓'}`; el.classList.toggle('warn', total!==100); }
}


/* ---------------- ALL JOBS ---------------- */
async function tabJobs(c){
  let jobs = await apiGet('/jobs');
  jobs.sort((a,b)=> new Date(b.date)-new Date(a.date));
  if(ui.jobsFilter==='progress') jobs = jobs.filter(j=>!j.completionDate);
  if(ui.jobsFilter==='done') jobs = jobs.filter(j=>j.completionDate);
  c.innerHTML = `
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${jobs.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${ui.jobsFilter==='all'?'active':''}" data-jf="all">All</button>
        <button class="pchip ${ui.jobsFilter==='progress'?'active':''}" data-jf="progress">In Progress</button>
        <button class="pchip ${ui.jobsFilter==='done'?'active':''}" data-jf="done">Completed</button>
      </div>
      ${jobs.length===0 ? `<div class="empty">No jobs logged yet.</div>` : `
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${jobs.map(j=>{
            const isDone = j.status === 'Completed';
            const assignedPeople = (j.assignments||[]).map(a=>`${escapeHtml(personName(a.personId))} (${a.percent}%)`).join(', ');
            const attCount = (j.attachments || []).length;
            const delCount = (j.deliverables || []).length;

            return `<tr>
              <td><strong>${escapeHtml(j.title || 'Untitled Job')}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${attCount ? `<button type="button" class="btn ghost small view-job-files" data-id="${j._id}" title="View ${attCount} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${attCount} Brief</span></button>` : ''}
                  ${delCount ? `<button type="button" class="btn ghost small view-job-files" data-id="${j._id}" title="View ${delCount} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${delCount} Work</span></button>` : ''}
                  ${!attCount && !delCount ? `<span class="muted" style="font-size:11px">—</span>` : ''}
                </div>
              </td>
              <td>${fmtDate(j.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${isDone?'ghost':'gold'} small toggle-status-btn" data-id="${j._id}" data-done="${isDone}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${isDone?'green':(j.status==='Needs Revision'?'red':'amber')}">${isDone?'Completed':(j.status==='Needs Revision'?'Needs Revision':'In Progress')}</span>
                  </button>
                  ${j.clientApproval && j.clientApproval.status === 'Approved' ? `<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${j.clientApproval.rating ? `(${j.clientApproval.rating}★)` : ''}</span>` : (j.clientApproval && j.clientApproval.status === 'Revision Requested' ? `<span style="font-size:10px;font-weight:700;color:var(--red-500)">↺ Revision Req.</span>` : '')}
                </div>
              </td>
              <td>${escapeHtml(clientName(j.clientId))}</td>
              <td>${(j.serviceNames||[]).map(s=>`<span class="badge gray">${escapeHtml(s)}</span>`).join(' ')}</td>
              <td class="assign-cell-click" data-id="${j._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${assignedPeople || '<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((j.assignments||[]).reduce((s,a)=>s+(Number(a.hours)||0),0))}</td>
              <td style="text-align:right;white-space:nowrap;">
                <button class="btn ghost small view-job-files" data-id="${j._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">📁 Files</button>
                <button class="btn ghost small view-job-tickets" data-id="${j._id}" data-title="${escapeHtml(j.title||'Job')}" style="margin-right:4px;padding:3px 8px;font-size:11px;">🎫 Tickets</button>
                <button class="btn ghost small edit-job" data-id="${j._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">Assign / Edit</button>
                <button class="btn danger small del-job" data-id="${j._id}" style="padding:3px 8px;font-size:11px;">Delete</button>
              </td>
            </tr>`;
          }).join('')}
          </tbody>
        </table>
      </div>`}
    </section>
  `;
  document.querySelectorAll('[data-jf]').forEach(b=> b.onclick = ()=>{ ui.jobsFilter = b.dataset.jf; renderTab(); });

  document.querySelectorAll('.view-job-files').forEach(btn => {
    btn.onclick = () => {
      const jobId = btn.dataset.id;
      const jobObj = jobs.find(j => j._id === jobId);
      if (!jobObj) return;
      const attsJson = encodeURIComponent(JSON.stringify(jobObj.attachments || []));
      const delsJson = encodeURIComponent(JSON.stringify(jobObj.deliverables || []));

      const bg = openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(jobObj.title || 'Untitled Job')}</div>
        </div>

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(jobObj.attachments||[]).length})</h4>
          ${(jobObj.attachments && jobObj.attachments.length) ? `
            <div data-attachments="${attsJson}">
              ${renderAttachmentChips(jobObj.attachments)}
            </div>
          ` : `<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>`}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(jobObj.deliverables||[]).length})</h4>
          ${(jobObj.deliverables && jobObj.deliverables.length) ? `
            <div data-attachments="${delsJson}">
              ${renderAttachmentChips(jobObj.deliverables)}
            </div>
          ` : `<div style="font-size:12px;color:var(--text-4);font-style:italic">No completed deliverables attached yet.</div>`}
        </div>

        <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:14px;margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:6px">+ Upload Deliverables to Job</h4>
          <p style="font-size:11.5px;color:var(--text-3);margin-bottom:10px">Add completed artifacts, links, or finalized files for this job</p>
          <div class="field" style="margin-bottom:10px">
            <label>Deliverable Notes / Version description</label>
            <input type="text" id="mDelNote" placeholder="e.g. Final Video Cut v2 (color graded)" />
          </div>
          ${renderAttachmentUploader({ id: 'mDelUpload', label: 'Upload Deliverable Files', subtitle: 'Upload exported videos, PSDs, PDFs, spreadsheets, or images' })}
          <button type="button" class="btn gold small" id="mDelSaveBtn" style="margin-top:10px">Save Deliverables to Job</button>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCloseFiles">Close</button>
        </div>
      `);

      bindAttachmentUploader('mDelUpload');

      bg.querySelector('#mDelSaveBtn').onclick = async () => {
        const files = getUploaderAttachments('mDelUpload');
        const notes = bg.querySelector('#mDelNote').value.trim();
        if (!files.length) {
          flashToast('Please select at least one deliverable file', true);
          return;
        }
        try {
          const deliverables = files.map(f => ({ ...f, notes }));
          await apiPost(`/jobs/${jobId}/deliverables`, { deliverables });
          flashToast('Deliverables added! 📦');
          bg.remove();
          renderTab();
        } catch (err) {
          flashToast(err.message, true);
        }
      };

      bg.querySelector('#mCloseFiles').onclick = () => bg.remove();
    };
  });

  document.querySelectorAll('.view-job-tickets').forEach(btn => {
    btn.onclick = () => {
      const jobId = btn.dataset.id;
      const title = btn.dataset.title;
      const bg = openModal(`
        <div style="margin-bottom:12px">
          <h3 style="margin-bottom:4px">🎫 Support Tickets</h3>
          <div style="font-size:12px;color:var(--text-3)">${escapeHtml(title)}</div>
        </div>
        ${renderSupportTicketSection(jobId, true)}
        <div class="modal-actions" style="margin-top:16px">
          <button class="btn ghost" id="mCloseTickets">Close</button>
        </div>
      `);
      bindSupportTicketSection(jobId, true);
      bg.querySelector('#mCloseTickets').onclick = () => bg.remove();
    };
  });

  document.querySelectorAll('.edit-job, .assign-cell-click').forEach(btn => {
    btn.onclick = () => {
      const jobId = btn.dataset.id;
      const jobObj = jobs.find(j => j._id === jobId);
      if (jobObj) {
        openEditJobModal(jobObj, () => renderTab());
      }
    };
  });

  document.querySelectorAll('.toggle-status-btn').forEach(b=> b.onclick = async ()=>{
    const id = b.dataset.id;
    const completed = b.dataset.done === 'false';
    const jobObj = jobs.find(j=> j._id === id);
    let completionDate = jobObj ? jobObj.completionDate : null;
    if (completed && !completionDate) {
      completionDate = new Date().toISOString().slice(0, 10);
    }
    await apiPut('/jobs/' + id, { status: completed ? 'Completed' : 'In Progress', completionDate });
    flashToast(completed ? 'Job marked as Completed!' : 'Job marked as In Progress');
    renderTab();
  });
  document.querySelectorAll('.del-job').forEach(b=> b.onclick = async ()=>{
    if(!confirm('Delete this job?')) return;
    await apiDelete('/jobs/'+b.dataset.id); flashToast('Deleted'); renderTab();
  });
}

/* ---------------- SUPPORT TICKETS (ADMIN) ---------------- */
let ticketSearchQuery = '';
let ticketPriorityFilter = 'all';

async function tabTickets(c){
  let allTickets = await apiGet('/tickets');
  allTickets.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));

  // Compute metrics
  const totalCount    = allTickets.length;
  const openCount     = allTickets.filter(t => t.status === 'Open').length;
  const reviewCount   = allTickets.filter(t => t.status === 'In Review').length;
  const resolvedCount = allTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
  const resRate       = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 100;

  // Filter
  const filter = ui.ticketsFilter || 'all';
  let filtered = allTickets;
  if(filter === 'open') filtered = filtered.filter(t => t.status === 'Open');
  else if(filter === 'in-review') filtered = filtered.filter(t => t.status === 'In Review');
  else if(filter === 'resolved') filtered = filtered.filter(t => t.status === 'Resolved');
  else if(filter === 'closed') filtered = filtered.filter(t => t.status === 'Closed');

  if(ticketPriorityFilter !== 'all') {
    filtered = filtered.filter(t => t.priority === ticketPriorityFilter);
  }

  if(ticketSearchQuery) {
    const q = ticketSearchQuery.toLowerCase();
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
      <!-- Top Metrics Hub -->
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

      <!-- Controls & Search Bar -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="pchip ${filter==='all'?'active':''}" data-tf="all">All (${totalCount})</button>
          <button class="pchip ${filter==='open'?'active':''}" data-tf="open">🔴 Open (${openCount})</button>
          <button class="pchip ${filter==='in-review'?'active':''}" data-tf="in-review">🟡 In Review (${reviewCount})</button>
          <button class="pchip ${filter==='resolved'?'active':''}" data-tf="resolved">🟢 Resolved (${resolvedCount})</button>
          <button class="pchip ${filter==='closed'?'active':''}" data-tf="closed">⚪ Closed</button>
        </div>

        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select id="admTkPriFilter" style="font-size:12.5px;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);color:var(--text-1);outline:none">
            <option value="all" ${ticketPriorityFilter==='all'?'selected':''}>All Priorities</option>
            <option value="Urgent" ${ticketPriorityFilter==='Urgent'?'selected':''}>🔴 Urgent</option>
            <option value="High" ${ticketPriorityFilter==='High'?'selected':''}>🟠 High</option>
            <option value="Medium" ${ticketPriorityFilter==='Medium'?'selected':''}>🟡 Medium</option>
            <option value="Low" ${ticketPriorityFilter==='Low'?'selected':''}>🟢 Low</option>
          </select>

          <div class="ticket-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="admTkSearch" placeholder="Search by subject, user, job…" value="${escapeHtml(ticketSearchQuery)}">
            ${ticketSearchQuery ? `<button type="button" id="admClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:12px">✕</button>` : ''}
          </div>
          <button class="btn gold" id="admRaiseTicketGlobalBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Raise Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Cards List -->
      ${filtered.length === 0 ? renderEmptyState('No support tickets found', 'No tickets match the active filters or search criteria.', '🎫') : `
      <div style="display:flex;flex-direction:column;gap:14px">
        ${filtered.map(t => {
          const jobTitle = t.jobId ? (t.jobId.title || 'Untitled Job') : 'General Workspace Support';
          const statusSlug = (t.status||'Open').toLowerCase().replace(' ','-');
          const isOpen = t.status === 'Open';
          const shortId = (t._id || '').slice(-4).toUpperCase();
          const initials = getInitials(t.userName);

          return `
          <div class="ticket-card status-${statusSlug}" id="adm-tk-${t._id}">
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
                      Official Support Response
                    </span>
                    ${t.repliedAt ? `<span style="font-size:11px;color:var(--text-4)">${timeAgo(t.repliedAt)}</span>` : ''}
                  </div>
                  <div class="ticket-admin-reply-text">${escapeHtml(t.adminReply)}</div>
                </div>
              </div>` : ''}

            <div class="ticket-toolbar">
              <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
              <select class="adm-tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
                <option value="Open" ${t.status==='Open'?'selected':''}>🔴 Open</option>
                <option value="In Review" ${t.status==='In Review'?'selected':''}>🟡 In Review</option>
                <option value="Resolved" ${t.status==='Resolved'?'selected':''}>🟢 Resolved</option>
                <option value="Closed" ${t.status==='Closed'?'selected':''}>⚪ Closed</option>
              </select>

              <button class="btn ghost small adm-tk-reply-toggle" data-tkid="${t._id}" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${t.adminReply ? 'Edit Reply' : '💬 Reply'}
              </button>

              ${t.status !== 'Resolved' ? `
                <button class="btn ghost small adm-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Quick Resolve
                </button>` : ''}

              <button class="btn danger small adm-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

              <div class="ticket-reply-form" id="adm-tk-replyform-${t._id}">
                <div class="ticket-templates-bar">
                  <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
                </div>
                <textarea id="adm-tk-replytxt-${t._id}" rows="2" placeholder="Write official response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(t.adminReply||'')}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px">
                  <button class="btn ghost small adm-tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
                  <button class="btn gold small adm-tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
                </div>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`}
    </section>
  `;

  // Bind controls
  document.querySelectorAll('[data-tf]').forEach(b => {
    b.onclick = () => { ui.ticketsFilter = b.dataset.tf; renderTab(); };
  });

  const searchInput = document.getElementById('admTkSearch');
  if (searchInput) {
    searchInput.oninput = (e) => {
      ticketSearchQuery = e.target.value;
      // live filter without full reload if possible or render
      tabTickets(c);
    };
  }

  const clearSearchBtn = document.getElementById('admClearSearch');
  if (clearSearchBtn) {
    clearSearchBtn.onclick = () => {
      ticketSearchQuery = '';
      tabTickets(c);
    };
  }

  const priFilterSel = document.getElementById('admTkPriFilter');
  if (priFilterSel) {
    priFilterSel.onchange = (e) => {
      ticketPriorityFilter = e.target.value;
      tabTickets(c);
    };
  }

  // Raise Ticket Modal
  const globalRaiseBtn = document.getElementById('admRaiseTicketGlobalBtn');
  if (globalRaiseBtn) {
    globalRaiseBtn.onclick = async () => {
      let jobs = [];
      try {
        jobs = await apiGet('/jobs');
      } catch(e) { jobs = []; }

      const bg = openModal(`
        <div style="margin-bottom:14px">
          <h3 style="margin-bottom:4px">🎫 Raise Support Ticket</h3>
          <div style="font-size:12.5px;color:var(--text-3)">Create a new support request, revision note, or blocker report.</div>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Target / Job (Optional)</label>
          <select id="modalTkJob" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="">📁 General Workspace Support (No specific job)</option>
            ${jobs.map(j => `<option value="${j._id}">${escapeHtml(j.title || 'Untitled Job')} (${escapeHtml(clientName(j.clientId))})</option>`).join('')}
          </select>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Subject / Issue Title *</label>
          <input type="text" id="modalTkSub" placeholder="Brief summary of the issue…" maxlength="120" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box">
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Priority Level</label>
          <select id="modalTkPri" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium" selected>🟡 Medium Priority</option>
            <option value="High">🟠 High Priority</option>
            <option value="Urgent">🔴 Urgent / Blocker</option>
          </select>
        </div>

        <div class="field" style="margin-bottom:16px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Detailed Description *</label>
          <textarea id="modalTkMsg" rows="4" placeholder="Provide full details, feedback, or blockers…" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box;resize:vertical"></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCancelTicket">Cancel</button>
          <button class="btn gold" id="mSubmitTicket">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      `);

      bg.querySelector('#mCancelTicket').onclick = () => bg.remove();
      bg.querySelector('#mSubmitTicket').onclick = async () => {
        const jobId    = bg.querySelector('#modalTkJob').value || null;
        const subject  = bg.querySelector('#modalTkSub').value.trim();
        const priority = bg.querySelector('#modalTkPri').value;
        const message  = bg.querySelector('#modalTkMsg').value.trim();

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

  // Quick Resolve
  document.querySelectorAll('.adm-tk-quick-resolve').forEach(btn => {
    btn.onclick = async () => {
      try {
        await apiPut('/tickets/' + btn.dataset.tkid, { status: 'Resolved' });
        flashToast('Ticket marked as Resolved! 🎉');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });

  // Template buttons
  document.querySelectorAll('.ticket-template-btn').forEach(btn => {
    btn.onclick = () => {
      const txt = document.getElementById('adm-tk-replytxt-' + btn.dataset.tkid);
      if (txt) {
        txt.value = btn.dataset.tpl;
        txt.focus();
      }
    };
  });

  document.querySelectorAll('.adm-tk-status-sel').forEach(sel => {
    sel.onchange = async () => {
      try {
        await apiPut('/tickets/' + sel.dataset.tkid, { status: sel.value });
        flashToast('Status updated');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });

  document.querySelectorAll('.adm-tk-reply-toggle').forEach(btn => {
    btn.onclick = () => {
      const form = document.getElementById('adm-tk-replyform-' + btn.dataset.tkid);
      if (form) form.classList.toggle('show');
    };
  });

  document.querySelectorAll('.adm-tk-reply-cancel').forEach(btn => {
    btn.onclick = () => {
      const form = document.getElementById('adm-tk-replyform-' + btn.dataset.tkid);
      if (form) form.classList.remove('show');
    };
  });

  document.querySelectorAll('.adm-tk-reply-save').forEach(btn => {
    btn.onclick = async () => {
      const txt = document.getElementById('adm-tk-replytxt-' + btn.dataset.tkid);
      if (!txt) return;
      try {
        await apiPut('/tickets/' + btn.dataset.tkid, { adminReply: txt.value.trim() });
        flashToast('Response saved! 🛡️');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });

  document.querySelectorAll('.adm-tk-del-btn').forEach(btn => {
    btn.onclick = async () => {
      if (!confirm('Permanently delete this ticket?')) return;
      try {
        await apiDelete('/tickets/' + btn.dataset.tkid);
        flashToast('Ticket deleted');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });
}



function openEditJobModal(job, onSaveSuccess) {
  let editDraft = {
    title: job.title || '',
    clientId: job.clientId ? (job.clientId._id || job.clientId) : '',
    serviceIds: job.serviceIds ? job.serviceIds.map(s => s._id || s) : [],
    date: job.date ? new Date(job.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    completionDate: job.completionDate ? new Date(job.completionDate).toISOString().slice(0, 10) : '',
    status: job.status || 'In Progress',
    priority: job.priority || 'Medium',
    value: job.value != null ? job.value : '',
    description: job.description || '',
    preferredPersonId: job.preferredPersonId ? (job.preferredPersonId._id || job.preferredPersonId) : '',
    assignments: (job.assignments && job.assignments.length)
      ? job.assignments.map(a => ({
          personId: String(a.personId._id || a.personId),
          percent: a.percent != null ? a.percent : 0,
          hours: a.hours != null ? a.hours : 0
        }))
      : getDefaultAssignments()
  };

  function getServiceTagsHtml() {
    if (!editDraft.serviceIds.length) return '<span class="muted" style="font-size:12px;">No services selected</span>';
    return editDraft.serviceIds.map(id => {
      const s = cache.services.find(srv => String(srv._id) === String(id));
      if (!s) return '';
      return `
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(s.name)}
          <span class="m-remove-service" data-id="${s._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `;
    }).join('');
  }

  function getModalAssignRowsHtml() {
    return editDraft.assignments.map((a, i) => `
      <div class="m-person-assign-row" data-idx="${i}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${cache.personnel.map(p => `<option value="${p._id}" ${String(p._id) === String(a.personId) ? 'selected' : ''}>${escapeHtml(p.name)}${p.duties ? ` (${escapeHtml(p.duties)})` : ''}</option>`).join('')}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${a.percent != null ? a.percent : ''}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${a.hours != null ? a.hours : ''}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div style="display:flex;justify-content:center;">
          <button class="btn-remove-person m-a-remove" type="button" title="Remove person" style="cursor:pointer;background:none;border:none;color:var(--red);font-weight:bold;font-size:16px;">✕</button>
        </div>
      </div>
    `).join('');
  }

  const bg = openModal(`
    <div style="max-height:85vh;overflow-y:auto;padding-right:4px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border-sm);padding-bottom:12px;">
        <div>
          <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Assign Personnel & Edit Job</h3>
          <p style="margin:2px 0 0 0;font-size:12px;color:var(--text-3);">Assign or change assigned team members and update job details.</p>
        </div>
        <button type="button" class="btn ghost small" id="mCloseJobEdit" style="font-size:16px;line-height:1;padding:4px 8px;">✕</button>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>JOB TITLE *</label>
        <input type="text" id="mEditTitle" value="${escapeHtml(editDraft.title)}" placeholder="Job Title...">
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>CLIENT *</label>
          <select id="mEditClient">
            <option value="">Select client…</option>
            ${cache.clients.map(cl => `<option value="${cl._id}" ${String(cl._id) === String(editDraft.clientId) ? 'selected' : ''}>${escapeHtml(cl.name)}</option>`).join('')}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>STATUS</label>
          <select id="mEditStatus">
            <option value="In Progress" ${editDraft.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${editDraft.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>START DATE *</label>
          <input type="date" id="mEditDate" value="${editDraft.date}">
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>COMPLETION DATE</label>
          <input type="date" id="mEditCompletionDate" value="${editDraft.completionDate}">
        </div>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>SERVICE(S) DELIVERED *</label>
        <select id="mEditServiceSelect">
          <option value="">Select service to add…</option>
          ${cache.services.map(s => `<option value="${s._id}">${escapeHtml(s.name)}</option>`).join('')}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${getServiceTagsHtml()}
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>PRIORITY</label>
          <select id="mEditPriority">
            <option value="Medium" ${editDraft.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${editDraft.priority === 'High' ? 'selected' : ''}>High</option>
            <option value="Urgent" ${editDraft.priority === 'Urgent' ? 'selected' : ''}>Urgent</option>
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>JOB VALUE (₹)</label>
          <input type="number" id="mEditValue" value="${editDraft.value}" placeholder="0" min="0">
        </div>
      </div>

      <div class="field" style="margin-bottom:16px;">
        <label>DESCRIPTION / SCOPE</label>
        <textarea id="mEditDesc" style="height:70px;resize:vertical;" placeholder="Deliverable details...">${escapeHtml(editDraft.description)}</textarea>
      </div>

      <!-- FILE ATTACHMENTS & DELIVERABLES -->
      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:16px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📎 Job Briefs &amp; Initial Assets</h4>
        ${renderAttachmentUploader({ id: 'mEditAttachments', label: 'Brief Attachments', subtitle: 'Upload briefs, design mockups, agreements or logos' })}
      </div>

      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📦 Completed Deliverables &amp; Output Files</h4>
        ${renderAttachmentUploader({ id: 'mEditDeliverables', label: 'Finished Deliverables', subtitle: 'Upload completed exports, videos, PSDs, PDFs, or spreadsheets' })}
      </div>

      <!-- ASSIGN PERSONNEL SECTION -->
      <div style="background:var(--bg-elevated);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4 style="margin:0;font-size:14px;font-weight:700;color:var(--navy-900);">👥 Assigned Personnel (Multiple Allowed)</h4>
          <span style="font-size:11px;color:var(--text-3);">Add or change team members assigned to this job</span>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;font-size:11px;font-weight:700;color:var(--text-3);margin-bottom:6px;text-transform:uppercase;">
          <div>Team Member</div>
          <div>% of Work</div>
          <div>Hours Spent</div>
          <div></div>
        </div>

        <div id="mEditAssignRows">
          ${getModalAssignRowsHtml()}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn ghost small" id="mAddAssignRow">+ Add Team Member</button>
          <div id="mAssignTotalInfo" class="assign-total" style="font-size:12px;font-weight:600;"></div>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:16px;">
        <button type="button" class="btn ghost" id="mEditCancel">Cancel</button>
        <button type="button" class="btn gold" id="mEditSave" style="padding:8px 20px;">Save & Update Assignments</button>
      </div>
    </div>
  `);

  const modalContainer = bg.querySelector('.modal');
  if (modalContainer) modalContainer.style.maxWidth = '680px';

  bindAttachmentUploader('mEditAttachments', { existing: job.attachments || [] });
  bindAttachmentUploader('mEditDeliverables', { existing: job.deliverables || [] });

  const updateModalPercentTotal = () => {
    const total = editDraft.assignments.reduce((sum, a) => sum + (Number(a.percent) || 0), 0);
    const totalEl = bg.querySelector('#mAssignTotalInfo');
    if (totalEl) {
      totalEl.innerHTML = total === 100
        ? `<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>`
        : `<span style="color:var(--amber, #f59e0b);">⚠️ ${total}% Allocated (should be 100%)</span>`;
    }
  };

  const bindServiceTagRemovers = () => {
    bg.querySelectorAll('.m-remove-service').forEach(btn => {
      btn.onclick = () => {
        const sId = btn.dataset.id;
        editDraft.serviceIds = editDraft.serviceIds.filter(id => String(id) !== String(sId));
        bg.querySelector('#mEditServicesTags').innerHTML = getServiceTagsHtml();
        bindServiceTagRemovers();
      };
    });
  };

  const bindAssignRowEvents = () => {
    bg.querySelectorAll('.m-person-assign-row').forEach(row => {
      const idx = Number(row.dataset.idx);
      const personSel = row.querySelector('.m-a-person');
      if (personSel) personSel.onchange = e => editDraft.assignments[idx].personId = e.target.value;

      const percentInp = row.querySelector('.m-a-percent');
      if (percentInp) percentInp.oninput = e => {
        editDraft.assignments[idx].percent = e.target.value;
        updateModalPercentTotal();
      };

      const hoursInp = row.querySelector('.m-a-hours');
      if (hoursInp) hoursInp.oninput = e => editDraft.assignments[idx].hours = e.target.value;

      const removeBtn = row.querySelector('.m-a-remove');
      if (removeBtn) {
        removeBtn.onclick = () => {
          if (editDraft.assignments.length > 1) {
            editDraft.assignments.splice(idx, 1);
            bg.querySelector('#mEditAssignRows').innerHTML = getModalAssignRowsHtml();
            bindAssignRowEvents();
            updateModalPercentTotal();
          } else {
            flashToast('Job must have at least one team member row', true);
          }
        };
      }
    });
  };

  const mClose = bg.querySelector('#mCloseJobEdit');
  const mCancel = bg.querySelector('#mEditCancel');
  if (mClose) mClose.onclick = () => bg.remove();
  if (mCancel) mCancel.onclick = () => bg.remove();

  const mTitle = bg.querySelector('#mEditTitle');
  if (mTitle) mTitle.oninput = e => editDraft.title = e.target.value;

  const mClient = bg.querySelector('#mEditClient');
  if (mClient) mClient.onchange = e => editDraft.clientId = e.target.value;

  const mStatus = bg.querySelector('#mEditStatus');
  if (mStatus) mStatus.onchange = e => editDraft.status = e.target.value;

  const mDate = bg.querySelector('#mEditDate');
  if (mDate) mDate.onchange = e => editDraft.date = e.target.value;

  const mCompDate = bg.querySelector('#mEditCompletionDate');
  if (mCompDate) mCompDate.onchange = e => editDraft.completionDate = e.target.value;

  const mPriority = bg.querySelector('#mEditPriority');
  if (mPriority) mPriority.onchange = e => editDraft.priority = e.target.value;

  const mValue = bg.querySelector('#mEditValue');
  if (mValue) mValue.oninput = e => editDraft.value = e.target.value;

  const mDesc = bg.querySelector('#mEditDesc');
  if (mDesc) mDesc.oninput = e => editDraft.description = e.target.value;

  const mServiceSel = bg.querySelector('#mEditServiceSelect');
  if (mServiceSel) {
    mServiceSel.onchange = e => {
      const val = e.target.value;
      if (val && !editDraft.serviceIds.map(String).includes(String(val))) {
        editDraft.serviceIds.push(val);
        bg.querySelector('#mEditServicesTags').innerHTML = getServiceTagsHtml();
        bindServiceTagRemovers();
      }
      mServiceSel.value = '';
    };
  }

  bindServiceTagRemovers();
  bindAssignRowEvents();
  updateModalPercentTotal();

  const mAddAssignRow = bg.querySelector('#mAddAssignRow');
  if (mAddAssignRow) {
    mAddAssignRow.onclick = () => {
      editDraft.assignments.push({ personId: '', percent: 0, hours: 0 });
      bg.querySelector('#mEditAssignRows').innerHTML = getModalAssignRowsHtml();
      bindAssignRowEvents();
      updateModalPercentTotal();
    };
  }

  const mSave = bg.querySelector('#mEditSave');
  if (mSave) {
    mSave.onclick = async () => {
      try {
        if (!editDraft.clientId) {
          flashToast('Client is required', true);
          return;
        }
        if (!editDraft.serviceIds || !editDraft.serviceIds.length) {
          flashToast('At least one service is required', true);
          return;
        }
        const validAssignments = editDraft.assignments.filter(a => a.personId && String(a.personId).trim() !== '');
        if (!validAssignments.length) {
          flashToast('Please select at least one assigned team member', true);
          return;
        }
        for (const a of validAssignments) {
          if (a.hours === '' || a.hours == null) {
            flashToast('Enter hours spent for every assigned person', true);
            return;
          }
        }

        const clientObj = cache.clients.find(c => String(c._id) === String(editDraft.clientId));
        const selectedServices = cache.services.filter(s => editDraft.serviceIds.map(String).includes(String(s._id)));
        const serviceNamesStr = selectedServices.map(s => s.name).join(', ');
        const title = editDraft.title || (clientObj ? `${clientObj.name} — ${serviceNamesStr || 'Deliverable'}` : (serviceNamesStr || 'Untitled Job'));

        const attachments = getUploaderAttachments('mEditAttachments');
        const deliverables = getUploaderAttachments('mEditDeliverables');

        await apiPut('/jobs/' + job._id, {
          title,
          clientId: editDraft.clientId,
          serviceIds: editDraft.serviceIds,
          date: editDraft.date,
          completionDate: editDraft.completionDate || null,
          status: editDraft.status,
          priority: editDraft.priority,
          value: Number(editDraft.value) || 0,
          description: editDraft.description || '',
          assignments: validAssignments,
          attachments,
          deliverables
        });

        const assignedNames = validAssignments.map(a => personName(a.personId)).join(', ');
        flashToast(`Job updated & saved! 📁`);
        bg.remove();
        if (onSaveSuccess) onSaveSuccess();
      } catch (err) {
        flashToast(err.message, true);
      } finally {
        mSave.disabled = false;
        mSave.textContent = 'Save & Update Assignments';
      }
    };
  }
}

/* ---------------- BY CLIENT / BY PERSON ---------------- */
async function tabByClient(c){
  dash = await apiGet('/dashboard/admin?period=' + ui.period);
  c.innerHTML = `${periodPicker()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${dash.clients.map(cl=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(cl.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(cl.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${cl.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(cl.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${cl.peopleCount}</strong></div>
          </div>`).join('') || '<div class="empty">No clients yet.</div>'}
      </div>
    </section>`;
  bindPeriodPicker();
}

async function tabByPerson(c){
  dash = await apiGet('/dashboard/admin?period=' + ui.period);
  c.innerHTML = `${periodPicker()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${dash.personnel.map(b=>{
            const st = (b.status||'active').toLowerCase();
            const pId = b.personId || b._id;
            return `<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(b.name)}</strong></td><td class="muted">${escapeHtml(b.duties||'')}</td>
              <td>
                <select class="person-status-sel" data-id="${pId}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
                  <option value="active" ${st==='active'?'selected':''}>🟢 Active</option>
                  <option value="work from home" ${(st==='work from home'||st==='wfh')?'selected':''}>🏠 Work From Home</option>
                  <option value="on leave" ${(st==='on leave'||st==='pn leave')?'selected':''}>🏖️ On Leave</option>
                </select>
              </td>
              <td class="num">${fmtHours(b.hours)}</td>
              <td class="num"><span class="badge ${b.cls}">${b.label}</span> ${b.utilization.toFixed(0)}%</td>
              <td class="num">${b.jobCount}</td><td class="num" style="padding-right:22px">${fmtINR(b.revenue)}</td>
            </tr>`;
          }).join('')}</tbody></table>
        </div>
      </div>
    </section>`;
  bindPeriodPicker();
  document.querySelectorAll('.person-status-sel').forEach(sel => {
    sel.onchange = async (e) => {
      const id = sel.dataset.id;
      const newStatus = e.target.value;
      try {
        await apiPut('/personnel/' + id, { status: newStatus });
        await refreshCache();
        flashToast('Status updated to ' + newStatus);
        tabByPerson(c);
      } catch(err) {
        flashToast(err.message, true);
      }
    };
  });
}

/* ---------------- ACCOUNTS (ROSTER) ---------------- */
const ROLE_COLUMNS = [['strategy','Strategy'],['cs','CS'],['website','Website'],['design','Design'],['copy','Copy'],['edit','Edit'],['shoot','Shoot'],['seo','SEO'],['smo','SMO'],['qc','QC']];
async function tabAccounts(c){
  const roster = await apiGet('/roster');
  c.innerHTML = `
    <section class="block">
      <h2>Accounts <span class="eyebrow">${roster.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${ROLE_COLUMNS.map(c=>`<th>${c[1]}</th>`).join('')}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${roster.map(r=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(clientName(r.clientId))}</strong></td>
            <td><span class="badge ${r.nature==='Existing'?'green':'blue'}">${r.nature}</span></td>
            ${ROLE_COLUMNS.map(cc=>`<td>${escapeHtml(r.roles[cc[0]]||'—')}</td>`).join('')}
            <td class="num"><span class="badge ${r.difficulty>=9?'red':r.difficulty>=7?'amber':r.difficulty>=4?'blue':'green'}">${r.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${r._id}">Edit</button></td>
          </tr>`).join('') || '<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`;
  document.getElementById('addAccountBtn').onclick = ()=> openRosterModal(null, roster);
  document.querySelectorAll('.edit-roster').forEach(b=> b.onclick = ()=> openRosterModal(roster.find(r=>r._id===b.dataset.id)));
}
function openRosterModal(entry){
  const isNew = !entry;
  const r = entry || {_id:null, clientId:'', nature:'Existing', roles:{}, difficulty:5, comments:''};
  ROLE_COLUMNS.forEach(cc=>{ if(r.roles[cc[0]]==null) r.roles[cc[0]]=''; });
  const bg = openModal(`
    <h3>${isNew?'Add Account':'Edit Account'}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${isNew ? `<select id="rClient"><option value="">Select…</option>${cache.clients.map(cl=>`<option value="${cl._id}">${escapeHtml(cl.name)}</option>`).join('')}</select>`
                : `<input type="text" value="${escapeHtml(clientName(r.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${r.nature==='Existing'?'selected':''}>Existing</option><option value="Prospect" ${r.nature==='Prospect'?'selected':''}>Prospect</option></select></div>
    </div>
    <div class="field-row">${ROLE_COLUMNS.slice(0,5).map(cc=>`<div class="field"><label>${cc[1]}</label><input type="text" class="r-role" data-key="${cc[0]}" value="${escapeHtml(r.roles[cc[0]])}"></div>`).join('')}</div>
    <div class="field-row">${ROLE_COLUMNS.slice(5,10).map(cc=>`<div class="field"><label>${cc[1]}</label><input type="text" class="r-role" data-key="${cc[0]}" value="${escapeHtml(r.roles[cc[0]])}"></div>`).join('')}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${r.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(r.comments||'')}</textarea></div>
    <div class="modal-actions">
      ${!isNew?`<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>`:''}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);
  bg.querySelector('#mCancel').onclick = ()=> bg.remove();
  if(!isNew) bg.querySelector('#mDelete').onclick = async ()=>{ if(!confirm('Remove this account?')) return; await apiDelete('/roster/'+r._id); bg.remove(); renderTab(); };
  bg.querySelector('#mSave').onclick = async ()=>{
    const roles = {}; bg.querySelectorAll('.r-role').forEach(inp=> roles[inp.dataset.key]=inp.value.trim());
    const payload = { nature: bg.querySelector('#rNature').value, roles, difficulty: Number(bg.querySelector('#rDifficulty').value)||1, comments: bg.querySelector('#rComments').value.trim() };
    try{
      if(isNew){
        const clientId = bg.querySelector('#rClient').value;
        if(!clientId){ flashToast('Select a client', true); return; }
        await apiPost('/roster', Object.assign({clientId}, payload));
      } else { await apiPut('/roster/'+r._id, payload); }
      bg.remove(); renderTab();
    }catch(err){ flashToast(err.message, true); }
  };
}

/* ---------------- TARGETS ---------------- */
function formatTargetUnit(u){
  if (!u) return 'Deliverables';
  const unitNames = { count: 'Deliverables', hours: 'Hours', reels: 'Reels', stories: 'Stories', posts: 'Posts' };
  if (unitNames[u]) return unitNames[u];
  return u.charAt(0).toUpperCase() + u.slice(1);
}

async function tabTargets(c){
  const targets = await apiGet('/targets');
  const periodNames = { day: 'Daily', week: 'Weekly', month: 'Monthly' };

  c.innerHTML = `
    <section class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0;">Output & Productivity Targets</h2>
          <p style="font-size:13px;color:var(--text-3);margin:0;">Assign and track quotas for team members across reels, stories, posts, deliverables, hours, or any custom unit.</p>
        </div>
        <button class="btn gold small" id="addAdminTargetBtn" type="button">+ Add Target</button>
      </div>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table style="width:100%;border-collapse:collapse;table-layout:fixed;min-width:780px">
            <thead>
              <tr>
                <th style="width:16%;padding-left:22px">Personnel</th>
                <th style="width:24%">Service</th>
                <th style="width:10%">Target</th>
                <th style="width:13%">Measured In</th>
                <th style="width:10%">Frequency</th>
                <th style="width:15%">Live Output</th>
                <th class="num" style="width:12%;padding-right:22px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${targets.map(t => {
                const pName = t.personId?.name || '—';
                const sName = t.serviceId?.name || '—';
                const unitLabel = formatTargetUnit(t.unit);
                const freqLabel = periodNames[t.period] || (t.period ? t.period.toUpperCase() : 'Daily');
                const actual = t.actual || 0;
                const ratio = t.quantity > 0 ? (actual / t.quantity) : 0;
                const pct = Math.round(ratio * 100);
                const paceCls = ratio >= 1.0 ? 'green' : (ratio >= 0.6 ? 'amber' : 'red');
                const paceLbl = ratio >= 1.0 ? '✓ Met' : (ratio >= 0.6 ? 'Behind' : 'Off Pace');
                const barWidth = Math.min(pct, 100);

                return `
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(pName)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(sName)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${t.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(unitLabel)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${freqLabel}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${actual} / ${t.quantity} <span style="font-weight:500;color:var(--text-3)">(${pct}%)</span></span>
                        <span class="badge ${paceCls}" style="font-size:10px;padding:1px 5px">${paceLbl}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${barWidth}%;height:100%;background:var(--${paceCls==='green'?'green':'amber'}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${t._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${t._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`;
              }).join('') || '<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  document.getElementById('addAdminTargetBtn').onclick = () => openTargetModal(null);
  document.querySelectorAll('.edit-target').forEach(b => {
    b.onclick = () => openTargetModal(targets.find(t => t._id === b.dataset.id));
  });
  document.querySelectorAll('.del-target').forEach(b => {
    b.onclick = async () => {
      if (!confirm('Remove this target?')) return;
      try {
        await apiDelete('/targets/' + b.dataset.id);
        flashToast('Target removed');
        renderTab();
      } catch (err) { flashToast(err.message, true); }
    };
  });
}

function openTargetModal(t){
  const isNew = !t;
  t = t || { personId: cache.personnel[0]?._id, serviceId: cache.services[0]?._id, quantity: 5, unit: 'reels', period: 'day' };
  const currentPId = t.personId?._id || t.personId || '';
  const currentSId = t.serviceId?._id || t.serviceId || '';
  const stdUnits = ['reels', 'stories', 'posts', 'count', 'hours'];
  const isStd = stdUnits.includes(t.unit);

  const bg = openModal(`
    <h3>${isNew ? 'Assign New' : 'Edit'} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${cache.personnel.map(p => `<option value="${p._id}" ${String(p._id)===String(currentPId)?'selected':''}>${escapeHtml(p.name)}</option>`).join('')}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${cache.services.map(s => `<option value="${s._id}" ${String(s._id)===String(currentSId)?'selected':''}>${escapeHtml(s.name)}</option>`).join('')}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Quantity *</label>
        <input type="number" id="mTgtQty" min="0.5" step="0.5" value="${t.quantity || 1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mTgtUnit">
          <option value="reels" ${isStd && t.unit==='reels'?'selected':''}>🎬 Reels</option>
          <option value="stories" ${isStd && t.unit==='stories'?'selected':''}>📱 Stories</option>
          <option value="posts" ${isStd && t.unit==='posts'?'selected':''}>🖼️ Posts</option>
          <option value="count" ${isStd && t.unit==='count'?'selected':''}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${isStd && t.unit==='hours'?'selected':''}>⏱️ Hours Spent</option>
          <option value="custom" ${!isStd ? 'selected' : ''}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>
    </div>

    <div class="field" id="mTgtCustomUnitWrap" style="margin-bottom:12px;display:${!isStd ? 'flex' : 'none'}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${!isStd ? escapeHtml(t.unit || '') : ''}">
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Target Frequency / Period *</label>
      <select id="mTgtPeriod">
        <option value="day" ${t.period==='day'?'selected':''}>Per Day</option>
        <option value="week" ${t.period==='week'?'selected':''}>Per Week</option>
        <option value="month" ${t.period==='month'?'selected':''}>Per Month</option>
      </select>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({ id: 'mTgtAttachments', label: 'Reference Assets & Proofs', subtitle: 'Upload reference materials, scripts, guidelines or proof examples' })}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save Target</button>
    </div>
  `);

  bindAttachmentUploader('mTgtAttachments', { existing: t.attachments || [] });

  const unitSel = bg.querySelector('#mTgtUnit');
  const customWrap = bg.querySelector('#mTgtCustomUnitWrap');
  const customInp = bg.querySelector('#mTgtCustomUnit');

  unitSel.onchange = () => {
    if (unitSel.value === 'custom') {
      customWrap.style.display = 'flex';
      customInp.focus();
    } else {
      customWrap.style.display = 'none';
    }
  };

  bg.querySelector('#mCancel').onclick = () => bg.remove();
  bg.querySelector('#mSave').onclick = async () => {
    let finalUnit = unitSel.value;
    if (finalUnit === 'custom') {
      finalUnit = customInp.value.trim() || 'Deliverables';
    }
    const attachments = getUploaderAttachments('mTgtAttachments');

    const payload = {
      personId: bg.querySelector('#mTgtPerson').value,
      serviceId: bg.querySelector('#mTgtService').value,
      quantity: Number(bg.querySelector('#mTgtQty').value) || 1,
      unit: finalUnit,
      period: bg.querySelector('#mTgtPeriod').value,
      attachments
    };
    if (!payload.personId || !payload.serviceId) {
      flashToast('Person and Service are required', true);
      return;
    }
    try {
      if (isNew) await apiPost('/targets', payload);
      else await apiPut('/targets/' + t._id, payload);
      flashToast('Target saved successfully! 🎯');
      bg.remove();
      renderTab();
    } catch (err) {
      flashToast(err.message, true);
    }
  };
}

/* ---------------- SALARIES ---------------- */
async function tabSalaries(c){
  const [grades, assignments] = await Promise.all([apiGet('/salary/grades'), apiGet('/salary/assignments')]);
  cache.salaryGrades = grades; cache.salaryAssignments = assignments;
  const assignMap = {}; assignments.forEach(a=> assignMap[a.personId] = a.gradeId);
  c.innerHTML = `
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${grades.map(g=>`<div class="manage-item"><div><strong>${escapeHtml(g.label)}</strong><div class="muted">${fmtINR(g.min)} – ${fmtINR(g.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${g._id}">Edit</button><button class="btn danger small del-grade" data-id="${g._id}">Remove</button></div></div>`).join('') || '<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${cache.personnel.map(p=>`<tr><td><strong>${escapeHtml(p.name)}</strong><div class="muted">${escapeHtml(p.duties||'')}</div></td>
        <td><span class="badge green">${p.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${p._id}"><option value="">Not set</option>${grades.map(g=>`<option value="${g._id}" ${assignMap[p._id]===g._id?'selected':''}>${escapeHtml(g.label)}</option>`).join('')}</select></td>
      </tr>`).join('')}</tbody></table></div>
    </section>`;
  document.getElementById('addGradeBtn').onclick = ()=> openGradeModal(null);
  document.querySelectorAll('.edit-grade').forEach(b=> b.onclick = ()=> openGradeModal(grades.find(g=>g._id===b.dataset.id)));
  document.querySelectorAll('.del-grade').forEach(b=> b.onclick = async ()=>{ if(!confirm('Remove grade?')) return; await apiDelete('/salary/grades/'+b.dataset.id); renderTab(); });
  document.querySelectorAll('.grade-select').forEach(sel=>{
    sel.onchange = async ()=>{ await apiPut('/salary/assignments/'+sel.dataset.id, {gradeId: sel.value||null}); flashToast('Saved'); };
  });
}
function openGradeModal(g){
  const isNew = !g; g = g || {label:'',min:0,max:0};
  const bg = openModal(`<h3>${isNew?'Add':'Edit'} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(g.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${g.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${g.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);
  bg.querySelector('#mCancel').onclick = ()=> bg.remove();
  bg.querySelector('#mSave').onclick = async ()=>{
    const payload = { label: bg.querySelector('#gLabel').value.trim(), min: Number(bg.querySelector('#gMin').value)||0, max: Number(bg.querySelector('#gMax').value)||0 };
    if(!payload.label){ flashToast('Label required', true); return; }
    try{ if(isNew) await apiPost('/salary/grades', payload); else await apiPut('/salary/grades/'+g._id, payload); bg.remove(); renderTab(); }
    catch(err){ flashToast(err.message, true); }
  };
}

/* ---------------- MANAGE (Personnel / Clients / Services) ---------------- */
function tabManage(c){
  const statusBadgeMap = {
    'active': 'green',
    'work from home': 'blue',
    'wfh': 'blue',
    'on leave': 'amber',
    'inactive': 'gray'
  };

  c.innerHTML = `
    <section class="block">
      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${cache.personnel.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Active team members, capacities, and working arrangements</div>
          </div>
          <button class="btn gold small" id="addPersonBtn" type="button">+ Add Person</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Personnel Name</th>
                <th>Duties & Responsibilities</th>
                <th class="num">Weekly Capacity</th>
                <th>Status</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${cache.personnel.map(p => `
                <tr>
                  <td><strong>${escapeHtml(p.name)}</strong></td>
                  <td>${escapeHtml(p.duties || '—')}</td>
                  <td class="num"><strong>${p.capacity || 48} hrs</strong>/wk</td>
                  <td><span class="badge ${statusBadgeMap[p.status] || 'green'}">${escapeHtml(p.status || 'active')}</span></td>
                  <td class="num">
                    <button class="btn ghost small edit-person" data-id="${p._id}">Edit</button>
                    <button class="btn danger small del-person" data-id="${p._id}">Remove</button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="5"><div class="empty">No personnel added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Clients Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${cache.clients.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Corporate clients, account details, and brand specifications</div>
          </div>
          <button class="btn gold small" id="addClientBtn" type="button">+ Add Client</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Notes & Description</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${cache.clients.map(cl => `
                <tr>
                  <td><strong>${escapeHtml(cl.name)}</strong></td>
                  <td>${cl.notes ? escapeHtml(cl.notes) : '<span class="muted">—</span>'}</td>
                  <td class="num">
                    <button class="btn ghost small edit-client" data-id="${cl._id}">Edit</button>
                    <button class="btn danger small del-client" data-id="${cl._id}">Remove</button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="3"><div class="empty">No clients added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Services Section -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${cache.services.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Standard deliverable offerings and reference effort hours</div>
          </div>
          <button class="btn gold small" id="addServiceBtn" type="button">+ Add Service</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th class="num">Reference Effort</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${cache.services.map(s => `
                <tr>
                  <td><strong>${escapeHtml(s.name)}</strong></td>
                  <td class="num"><strong>${s.hours || 0} hrs</strong> baseline</td>
                  <td class="num">
                    <button class="btn ghost small edit-service" data-id="${s._id}">Edit</button>
                    <button class="btn danger small del-service" data-id="${s._id}">Remove</button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="3"><div class="empty">No services added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  // Bind Master Resources actions
  const addPBtn = document.getElementById('addPersonBtn');
  if (addPBtn) addPBtn.onclick = () => openPersonModal(null);
  document.querySelectorAll('.edit-person').forEach(b => b.onclick = () => openPersonModal(cache.personnel.find(p => p._id === b.dataset.id)));
  document.querySelectorAll('.del-person').forEach(b => b.onclick = async () => { if (!confirm('Remove this person?')) return; await apiDelete('/personnel/' + b.dataset.id); await refreshCache(); renderTab(); });
  
  const addCBtn = document.getElementById('addClientBtn');
  if (addCBtn) addCBtn.onclick = () => openClientModal(null);
  document.querySelectorAll('.edit-client').forEach(b => b.onclick = () => openClientModal(cache.clients.find(cl => cl._id === b.dataset.id)));
  document.querySelectorAll('.del-client').forEach(b => b.onclick = async () => { if (!confirm('Remove this client?')) return; await apiDelete('/clients/' + b.dataset.id); await refreshCache(); renderTab(); });
  
  const addSBtn = document.getElementById('addServiceBtn');
  if (addSBtn) addSBtn.onclick = () => openServiceModal(null);
  document.querySelectorAll('.edit-service').forEach(b => b.onclick = () => openServiceModal(cache.services.find(s => s._id === b.dataset.id)));
  document.querySelectorAll('.del-service').forEach(b => b.onclick = async () => { if (!confirm('Remove this service?')) return; await apiDelete('/services/' + b.dataset.id); await refreshCache(); renderTab(); });
}

const tabSettings = tabManage;

function openPersonModal(p){
  const isNew = !p; p = p || {name:'',duties:'',capacity:48,status:'active',attachments:[]};
  const bg = openModal(`
    <h3>${isNew?'Add New':'Edit'} Person</h3>
    <div class="field"><label>Full Name *</label><input id="mName" type="text" value="${escapeHtml(p.name)}" placeholder="e.g. Shatayu Verma"></div>
    <div class="field"><label>Duties / Role</label><input id="mDuties" type="text" value="${escapeHtml(p.duties)}" placeholder="e.g. Lead Designer / Frontend"></div>
    <div class="log-job-row" style="margin-bottom:16px;">
      <div class="field" style="margin-bottom:0;"><label>Weekly Capacity (hrs)</label><input id="mCapacity" type="number" value="${p.capacity||48}"></div>
      <div class="field" style="margin-bottom:0;"><label>Status</label><select id="mStatus">
        <option value="active" ${p.status==='active'?'selected':''}>Active</option>
        <option value="work from home" ${(p.status==='work from home'||p.status==='wfh')?'selected':''}>Work From Home</option>
        <option value="on leave" ${(p.status==='on leave'||p.status==='pn leave')?'selected':''}>On Leave</option>
        <option value="inactive" ${p.status==='inactive'?'selected':''}>Inactive</option>
      </select></div>
    </div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({ id: 'mPersonFiles', label: 'Documents & Contracts', subtitle: 'Upload resumes, ID proofs, employment contracts or certificates' })}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Person</button></div>
  `);
  bindAttachmentUploader('mPersonFiles', { existing: p.attachments || [] });

  bg.querySelector('#mCancel').onclick = () => bg.remove();
  bg.querySelector('#mSave').onclick = async () => {
    const attachments = getUploaderAttachments('mPersonFiles');
    const payload = {
      name: bg.querySelector('#mName').value.trim(),
      duties: bg.querySelector('#mDuties').value.trim(),
      capacity: Number(bg.querySelector('#mCapacity').value)||48,
      status: bg.querySelector('#mStatus').value,
      attachments
    };
    if(!payload.name){ flashToast('Name is required', true); return; }
    try{
      if(isNew) await apiPost('/personnel', payload);
      else await apiPut('/personnel/'+p._id, payload);
      await refreshCache();
      flashToast('Person saved! 📁');
      bg.remove();
      renderTab();
    }
    catch(err){ flashToast(err.message, true); }
  };
}

function openClientModal(cl){
  const isNew = !cl; cl = cl || {name:'',notes:'',attachments:[]};
  const bg = openModal(`
    <h3>${isNew?'Add New':'Edit'} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(cl.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(cl.notes||'')}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({ id: 'mClientFiles', label: 'Brand Assets & Agreements', subtitle: 'Upload brand guidelines, contracts, briefs or logos' })}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);
  bindAttachmentUploader('mClientFiles', { existing: cl.attachments || [] });

  bg.querySelector('#mCancel').onclick = () => bg.remove();
  bg.querySelector('#mSave').onclick = async () => {
    const attachments = getUploaderAttachments('mClientFiles');
    const payload = {
      name: bg.querySelector('#mCName').value.trim(),
      notes: bg.querySelector('#mCNotes').value.trim(),
      attachments
    };
    if(!payload.name){ flashToast('Name is required', true); return; }
    try{
      if(isNew) await apiPost('/clients', payload);
      else await apiPut('/clients/'+cl._id, payload);
      await refreshCache();
      flashToast('Client saved! 📁');
      bg.remove();
      renderTab();
    }
    catch(err){ flashToast(err.message, true); }
  };
}

function openServiceModal(s){
  const isNew = !s; s = s || {name:'',hours:4};
  const bg = openModal(`
    <h3>${isNew?'Add New':'Edit'} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(s.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${s.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);
  bg.querySelector('#mCancel').onclick = () => bg.remove();
  bg.querySelector('#mSave').onclick = async () => {
    const payload = { name: bg.querySelector('#mSName').value.trim(), hours: Number(bg.querySelector('#mSHours').value)||0 };
    if(!payload.name){ flashToast('Name is required', true); return; }
    try{ if(isNew) await apiPost('/services', payload); else await apiPut('/services/'+s._id, payload); await refreshCache(); bg.remove(); renderTab(); }
    catch(err){ flashToast(err.message, true); }
  };
}

/* ---------------- USERS (login accounts) ---------------- */
async function tabUsers(c){
  const users = await apiGet('/users');
  let currentRoleFilter = 'all';
  let currentSort = 'role';
  let searchQuery = '';

  function renderUserTable(){
    let list = [...users];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(u => 
        (u.name && u.name.toLowerCase().includes(q)) || 
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.role && u.role.toLowerCase().includes(q))
      );
    }

    // Role filter
    if (currentRoleFilter === 'admin') {
      list = list.filter(u => u.role === 'superadmin' || u.role === 'admin');
    } else if (currentRoleFilter === 'employee') {
      list = list.filter(u => u.role === 'employee');
    } else if (currentRoleFilter === 'client') {
      list = list.filter(u => u.role === 'client');
    }

    // Sorting
    const rolePriority = { superadmin: 1, admin: 1, employee: 2, client: 3 };
    if (currentSort === 'role') {
      list.sort((a, b) => {
        const pa = rolePriority[a.role] || 9;
        const pb = rolePriority[b.role] || 9;
        if (pa !== pb) return pa - pb;
        return (a.name || '').localeCompare(b.name || '');
      });
    } else if (currentSort === 'role-desc') {
      list.sort((a, b) => {
        const pa = rolePriority[a.role] || 9;
        const pb = rolePriority[b.role] || 9;
        if (pa !== pb) return pb - pa;
        return (a.name || '').localeCompare(b.name || '');
      });
    } else if (currentSort === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (currentSort === 'name-desc') {
      list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else if (currentSort === 'status') {
      list.sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0));
    }

    const tbody = c.querySelector('#userTableBody');
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(u => {
      const isAdm = u.role === 'superadmin' || u.role === 'admin';
      const isEmp = u.role === 'employee';
      const roleBadge = isAdm 
        ? `<span class="badge gold" style="font-weight:700">👑 Admin</span>` 
        : (isEmp 
            ? `<span class="badge blue" style="font-weight:700">💼 Employee</span>` 
            : `<span class="badge green" style="font-weight:700">🤝 Client</span>`);
      
      const linked = u.personnelId ? escapeHtml(u.personnelId.name) : (u.clientId ? escapeHtml(u.clientId.name) : '<span class="muted">—</span>');

      return `
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(u.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(u.email)}</span></td>
          <td>${roleBadge}</td>
          <td>${linked}</td>
          <td><span class="badge ${u.active?'green':'gray'}">${u.active?'🟢 Active':'⚪ Disabled'}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${u._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${u._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`;
    }).join('');

    tbody.querySelectorAll('.edit-user').forEach(b => b.onclick = () => openUserModal(users.find(u => u._id === b.dataset.id)));
    tbody.querySelectorAll('.del-user').forEach(b => b.onclick = async () => {
      if (!confirm('Permanently remove this user account?')) return;
      try {
        await apiDelete('/users/' + b.dataset.id);
        flashToast('User removed');
        tabUsers(c);
      } catch (err) { flashToast(err.message, true); }
    });
  }

  const adminCount = users.filter(u => u.role === 'superadmin' || u.role === 'admin').length;
  const empCount   = users.filter(u => u.role === 'employee').length;
  const clientCount= users.filter(u => u.role === 'client').length;

  c.innerHTML = `
    <section class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0">User Accounts</h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Manage system login credentials for administrators, employees, and clients.</p>
        </div>
        <button class="btn gold small" id="addUserBtn" type="button">+ Add User</button>
      </div>

      <!-- Controls: Filter Chips, Search, Sort Dropdown -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <!-- Filter Tabs -->
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="pchip active user-role-filter" data-role="all">All (${users.length})</button>
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${adminCount})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${empCount})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${clientCount})</button>
        </div>

        <!-- Search & Sort Controls -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <input type="text" id="userSearchInp" placeholder="🔍 Search users..." style="width:170px;padding:6px 10px;font-size:12.5px;border-radius:var(--r-sm)">
          
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:12px;font-weight:700;color:var(--text-3);white-space:nowrap">Sort:</span>
            <select id="userSortSel" style="padding:6px 10px;font-size:12.5px;border-radius:var(--r-sm);width:auto">
              <option value="role" selected>Role (Admin → Employee → Client)</option>
              <option value="role-desc">Role (Client → Employee → Admin)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="status">Status (Active First)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table style="width:100%;border-collapse:collapse;min-width:700px">
            <thead>
              <tr>
                <th style="width:22%;padding-left:22px">Name</th>
                <th style="width:26%">Email / Login</th>
                <th style="width:16%">Role</th>
                <th style="width:18%">Linked Profile</th>
                <th style="width:10%">Status</th>
                <th class="num" style="width:8%;padding-right:22px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody id="userTableBody"></tbody>
          </table>
        </div>
      </div>
    </section>`;

  renderUserTable();

  // Bind Filter buttons
  c.querySelectorAll('.user-role-filter').forEach(btn => {
    btn.onclick = () => {
      c.querySelectorAll('.user-role-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRoleFilter = btn.dataset.role;
      renderUserTable();
    };
  });

  // Bind Sort Dropdown
  const sortSel = c.querySelector('#userSortSel');
  if (sortSel) {
    sortSel.onchange = () => {
      currentSort = sortSel.value;
      renderUserTable();
    };
  }

  // Bind Search Input
  const searchInp = c.querySelector('#userSearchInp');
  if (searchInp) {
    searchInp.oninput = () => {
      searchQuery = searchInp.value.trim();
      renderUserTable();
    };
  }

  const addBtn = c.querySelector('#addUserBtn');
  if (addBtn) addBtn.onclick = () => openUserModal(null);
}
function openUserModal(u){
  const isNew = !u; u = u || {name:'',email:'',role:'employee',personnelId:'',clientId:'',active:true};
  const role0 = u.role;
  const bg = openModal(`<h3>${isNew?'Add':'Edit'} User</h3>
    <div class="field-row">
      <div class="field"><label>Name</label><input id="uName" type="text" value="${escapeHtml(u.name)}"></div>
      <div class="field"><label>Email</label><input id="uEmail" type="email" value="${escapeHtml(u.email)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Role</label><select id="uRole">
        <option value="superadmin" ${role0==='superadmin'?'selected':''}>Admin</option>
        <option value="employee" ${role0==='employee'?'selected':''}>Employee</option>
        <option value="client" ${role0==='client'?'selected':''}>Client</option></select></div>
      <div class="field"><label>Password ${isNew?'':'(leave blank to keep current)'}</label><input id="uPassword" type="password"></div>
    </div>
    <div class="field" id="uLinkWrap"></div>
    <div class="field"><label><input type="checkbox" id="uActive" ${u.active?'checked':''}> Active</label></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);
  function renderLink(){
    const role = bg.querySelector('#uRole').value;
    const wrap = bg.querySelector('#uLinkWrap');
    if(role==='employee'){
      wrap.innerHTML = `<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${cache.personnel.map(p=>`<option value="${p._id}" ${u.personnelId && (u.personnelId._id||u.personnelId)===p._id?'selected':''}>${escapeHtml(p.name)}</option>`).join('')}</select>`;
    } else if(role==='client'){
      wrap.innerHTML = `<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${cache.clients.map(c=>`<option value="${c._id}" ${u.clientId && (u.clientId._id||u.clientId)===c._id?'selected':''}>${escapeHtml(c.name)}</option>`).join('')}</select>`;
    } else { wrap.innerHTML = ''; }
  }
  bg.querySelector('#uRole').onchange = renderLink; renderLink();
  bg.querySelector('#mCancel').onclick = ()=> bg.remove();
  bg.querySelector('#mSave').onclick = async ()=>{
    const role = bg.querySelector('#uRole').value;
    const payload = {
      name: bg.querySelector('#uName').value.trim(), email: bg.querySelector('#uEmail').value.trim(), role,
      active: bg.querySelector('#uActive').checked,
      personnelId: role==='employee' ? (bg.querySelector('#uPersonnel')?.value || null) : null,
      clientId: role==='client' ? (bg.querySelector('#uClient')?.value || null) : null,
    };
    const pw = bg.querySelector('#uPassword').value;
    if(pw) payload.password = pw;
    if(!payload.name || !payload.email){ flashToast('Name and email required', true); return; }
    if(isNew && !pw){ flashToast('Password required for a new user', true); return; }
    try{ if(isNew) await apiPost('/users', payload); else await apiPut('/users/'+u._id, payload); bg.remove(); renderTab(); }
    catch(err){ flashToast(err.message, true); }
  };
}

/* ---------------- ADMIN DAILY TASKS ---------------- */
let adminTaskUi = {
  date: new Date().toISOString().slice(0, 10), // 'YYYY-MM-DD' or 'all'
  personnelId: 'all',
  filter: 'all', // 'all' | 'active' | 'completed'
  search: ''
};

function shiftAdminDateStr(dateStr, deltaDays) {
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

async function tabDailyTasks(c) {
  const [allTasks, personnelList] = await Promise.all([
    apiGet('/tasks'),
    apiGet('/personnel').catch(() => cache.personnel || [])
  ]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const activeDate = adminTaskUi.date; // YYYY-MM-DD or 'all'

  // Filter by date
  let dateFiltered = allTasks;
  if (activeDate !== 'all') {
    dateFiltered = allTasks.filter(t => {
      if (!t.dueDate) return activeDate === todayStr;
      const taskDate = new Date(t.dueDate).toISOString().slice(0, 10);
      return taskDate === activeDate;
    });
  }

  // Filter by Personnel
  let personFiltered = dateFiltered;
  if (adminTaskUi.personnelId !== 'all') {
    personFiltered = personFiltered.filter(t => {
      const pId = t.personnelId?._id || t.personnelId;
      return String(pId) === String(adminTaskUi.personnelId);
    });
  }

  // Calculate high-level stats
  const totalTasks = personFiltered.length;
  const completedTasks = personFiltered.filter(t => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const compRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter by status
  let visibleTasks = personFiltered;
  if (adminTaskUi.filter === 'active') {
    visibleTasks = visibleTasks.filter(t => t.status !== 'Completed');
  } else if (adminTaskUi.filter === 'completed') {
    visibleTasks = visibleTasks.filter(t => t.status === 'Completed');
  }

  if (adminTaskUi.search) {
    const q = adminTaskUi.search.toLowerCase();
    visibleTasks = visibleTasks.filter(t => {
      const empName = (t.personnelId?.name || t.userId?.name || '').toLowerCase();
      const title = (t.title || '').toLowerCase();
      return empName.includes(q) || title.includes(q);
    });
  }

  // Group visible tasks by employee
  const employeeGroups = {};
  visibleTasks.forEach(t => {
    const pId = t.personnelId?._id || t.userId?._id || 'unknown';
    const pName = t.personnelId?.name || t.userId?.name || 'Unassigned Employee';
    const pDept = t.personnelId?.department || t.personnelId?.role || 'Team Member';
    if (!employeeGroups[pId]) {
      employeeGroups[pId] = {
        id: pId,
        name: pName,
        dept: pDept,
        tasks: []
      };
    }
    employeeGroups[pId].tasks.push(t);
  });

  const empGroupList = Object.values(employeeGroups);
  const isTodayActive = activeDate === todayStr;

  c.innerHTML = `
    <div class="block">
      <!-- Top Title & Navigation Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;display:flex;align-items:center;gap:8px">
            <span>Employee Daily Tasks</span>
            <span class="eyebrow">${totalTasks} total tasks</span>
          </h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Live employee daily checklist activity, real-time completion tracking, and submissions</p>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="admDailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${isTodayActive ? 'primary' : 'ghost'} small" id="admDailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="admDailyDatePickerInp" class="daily-date-picker-inp" value="${activeDate === 'all' ? todayStr : activeDate}">

          <button type="button" class="daily-nav-arrow" id="admDailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${activeDate === 'all' ? 'gold' : 'ghost'} small" id="admDailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Daily Tasks</span><div class="kpi-icon">📝</div></div>
          <div class="kpi-value">${totalTasks}</div>
          <div class="kpi-sub">${activeDate === 'all' ? 'Across all dates' : (isTodayActive ? 'Logged for today' : activeDate)}</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Completed Tasks</span><div class="kpi-icon">✅</div></div>
          <div class="kpi-value" style="color:var(--green-600)">${completedTasks}</div>
          <div class="kpi-sub">${compRate}% achievement rate</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Pending / To Do</span><div class="kpi-icon">⏳</div></div>
          <div class="kpi-value" style="color:var(--amber-600)">${pendingTasks}</div>
          <div class="kpi-sub">Items in progress</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Team Members</span><div class="kpi-icon">👥</div></div>
          <div class="kpi-value">${empGroupList.length}</div>
          <div class="kpi-sub">Employees with tasks</div>
        </div>
      </div>

      <!-- Assign Daily Task Card -->
      <div class="card" style="padding:16px 20px;margin-bottom:20px;background:var(--bg-card);border:1px solid var(--border-sm);box-shadow:var(--shadow-xs)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div style="font-size:14px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px">
            <span>➕</span> Assign Daily Task
          </div>
          <div style="font-size:12px;color:var(--text-3)">Assign to an individual team member or broadcast across all active staff</div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <div style="flex:2;min-width:220px">
            <input type="text" id="admDailyTaskInp" placeholder="Enter task title or instruction... (Press Enter to assign)" style="width:100%;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:13px;outline:none" />
          </div>
          <div style="flex:1;min-width:180px">
            <select id="admDailyAssignSelect" style="width:100%;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:12.5px;outline:none">
              <option value="all">👥 All Active Employees</option>
              ${personnelList.filter(p => p.status !== 'inactive').map(p => `
                <option value="${p._id}" ${adminTaskUi.personnelId === p._id ? 'selected' : ''}>${escapeHtml(p.name)} (${p.role || p.department || 'Staff'})</option>
              `).join('')}
            </select>
          </div>
          <div style="width:135px">
            <input type="date" id="admDailyAssignDate" value="${activeDate === 'all' ? todayStr : activeDate}" style="width:100%;padding:7px 10px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:12px;outline:none" />
          </div>
          <div style="width:110px">
            <select id="admDailyAssignPriority" style="width:100%;padding:8px 8px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:12px;outline:none">
              <option value="Medium" selected>Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button type="button" class="btn gold small" id="admDailyAddBtn" style="padding:8px 16px;font-size:12.5px;font-weight:700;white-space:nowrap">
            + Assign Task
          </button>
        </div>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="card" style="padding:14px 18px;margin-bottom:20px;background:var(--bg-card)">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <!-- Left: Filter Chips -->
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
            <button class="pchip ${adminTaskUi.filter==='all'?'active':''}" data-atf="all">All (${totalTasks})</button>
            <button class="pchip ${adminTaskUi.filter==='active'?'active':''}" data-atf="active">Pending (${pendingTasks})</button>
            <button class="pchip ${adminTaskUi.filter==='completed'?'active':''}" data-atf="completed">✓ Completed (${completedTasks})</button>
          </div>

          <!-- Right: Employee Picker & Search -->
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:12px;font-weight:700;color:var(--text-3)">Employee:</span>
              <select id="admTaskPersonFilter" style="font-size:12.5px;padding:6px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);outline:none">
                <option value="all" ${adminTaskUi.personnelId==='all'?'selected':''}>All Employees (${personnelList.length})</option>
                ${personnelList.map(p => `
                  <option value="${p._id}" ${adminTaskUi.personnelId===p._id?'selected':''}>${escapeHtml(p.name)} (${p.role || p.department || 'Staff'})</option>
                `).join('')}
              </select>
            </div>

            <div class="ticket-search-box" style="margin:0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="admTaskSearchInp" placeholder="Search tasks or employee…" value="${escapeHtml(adminTaskUi.search)}" style="font-size:12px;padding:5px 8px">
              ${adminTaskUi.search ? `<button type="button" id="admTaskClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>` : ''}
            </div>

            ${completedTasks > 0 ? `
              <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('all')" style="font-size:11.5px;color:var(--text-3);padding:5px 10px" title="Delete all completed tasks in this view">
                🗑️ Clear Completed (${completedTasks})
              </button>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Employee Task Groups List -->
      ${empGroupList.length === 0 ? `
        <div class="card" style="text-align:center;padding:56px 20px">
          <div style="font-size:40px;margin-bottom:10px">📋</div>
          <div style="font-weight:700;font-size:16px;color:var(--text-1);margin-bottom:4px">No daily tasks found</div>
          <div style="font-size:13px;color:var(--text-3);max-width:380px;margin:0 auto">No tasks have been entered for this date. You can assign tasks using the form above, or wait for employees to add checklist items.</div>
        </div>
      ` : `
        <div style="display:flex;flex-direction:column;gap:18px">
          ${empGroupList.map(emp => {
            const empTotal = emp.tasks.length;
            const empDone = emp.tasks.filter(t => t.status === 'Completed').length;
            const empPct = empTotal > 0 ? Math.round((empDone / empTotal) * 100) : 0;
            const empAllDone = empTotal > 0 && empDone === empTotal;

            return `
              <div class="daily-checklist-card">
                <!-- Employee Header Banner -->
                <div style="padding:16px 20px;background:var(--bg-surface);border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:50%;background:var(--brand-500);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px">
                      ${emp.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style="font-size:15px;font-weight:800;color:var(--text-1);line-height:1.2">${escapeHtml(emp.name)}</div>
                      <div style="font-size:11.5px;color:var(--text-3)">${escapeHtml(emp.dept)}</div>
                    </div>
                  </div>

                  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <span style="font-size:12.5px;font-weight:700;color:${empAllDone ? 'var(--green-600)' : 'var(--text-2)'}">
                      ${empDone} of ${empTotal} completed (${empPct}%)
                    </span>
                    <div style="width:100px;height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
                      <div style="width:${empPct}%;height:100%;background:${empAllDone ? 'var(--green-500)' : 'var(--brand-500)'};transition:width 0.4s ease"></div>
                    </div>
                    <button type="button" class="btn ghost small" onclick="adminQuickAddTaskForEmp('${emp.id}')" style="font-size:11.5px;color:var(--brand-500);padding:3px 8px;font-weight:700" title="Add a task for this employee">
                      + Add Task
                    </button>
                    ${empDone > 0 ? `
                      <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('${emp.id}')" style="font-size:11px;color:var(--text-3);padding:3px 7px" title="Delete completed tasks for this employee">
                        Clear Done (${empDone})
                      </button>
                    ` : ''}
                  </div>
                </div>

                <!-- Employee Checklist Items -->
                <div>
                  ${emp.tasks.map(t => {
                    const isDone = t.status === 'Completed';
                    const taskDate = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : '';
                    return `
                      <div class="daily-item-row ${isDone ? 'completed' : ''}" style="padding:12px 20px">
                        <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                          <button type="button" class="daily-circle-check ${isDone ? 'checked' : ''}" onclick="adminToggleTask('${t._id}')" title="${isDone ? 'Mark Incomplete' : 'Mark Complete'}">
                            ✓
                          </button>
                          <div style="flex:1">
                            <span class="daily-item-text" style="cursor:pointer" onclick="adminToggleTask('${t._id}')">
                              ${escapeHtml(t.title)}
                            </span>
                            ${t.description ? `<div style="font-size:12px;color:var(--text-3);margin-top:2px">${escapeHtml(t.description)}</div>` : ''}
                          </div>
                        </div>

                        <div class="daily-actions-hover" style="opacity:1">
                          ${taskDate ? `<span class="task-tag-pill" style="font-size:10.5px">📅 ${taskDate === todayStr ? 'Today' : taskDate}</span>` : ''}
                          ${t.completedAt ? `<span class="task-tag-pill" style="color:var(--green-600);background:rgba(16,185,129,0.1);font-size:10.5px">Done</span>` : ''}
                          <button type="button" class="btn ghost small" onclick="adminEditTask('${t._id}')" title="Edit this task" style="padding:3px 7px;font-size:11.5px">✏️</button>
                          <button type="button" class="btn ghost small" onclick="adminDeleteTask('${t._id}')" title="Delete this task" style="padding:3px 7px;font-size:11.5px;color:var(--red-500)">🗑️</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  // Bind Date Navigation
  const prevBtn = document.getElementById('admDailyPrevDayBtn');
  if (prevBtn) prevBtn.onclick = () => {
    adminTaskUi.date = shiftAdminDateStr(adminTaskUi.date, -1);
    renderTab();
  };

  const nextBtn = document.getElementById('admDailyNextDayBtn');
  if (nextBtn) nextBtn.onclick = () => {
    adminTaskUi.date = shiftAdminDateStr(adminTaskUi.date, 1);
    renderTab();
  };

  const todayBtn = document.getElementById('admDailyTodayBtn');
  if (todayBtn) todayBtn.onclick = () => {
    adminTaskUi.date = todayStr;
    renderTab();
  };

  const allDatesBtn = document.getElementById('admDailyAllDatesBtn');
  if (allDatesBtn) allDatesBtn.onclick = () => {
    adminTaskUi.date = adminTaskUi.date === 'all' ? todayStr : 'all';
    renderTab();
  };

  const datePicker = document.getElementById('admDailyDatePickerInp');
  if (datePicker) datePicker.onchange = (e) => {
    if (e.target.value) {
      adminTaskUi.date = e.target.value;
      renderTab();
    }
  };

  // Bind Filters
  document.querySelectorAll('[data-atf]').forEach(b => {
    b.onclick = () => {
      adminTaskUi.filter = b.dataset.atf;
      renderTab();
    };
  });

  const personSel = document.getElementById('admTaskPersonFilter');
  if (personSel) personSel.onchange = (e) => {
    adminTaskUi.personnelId = e.target.value;
    renderTab();
  };

  const searchInp = document.getElementById('admTaskSearchInp');
  if (searchInp) searchInp.oninput = (e) => {
    adminTaskUi.search = e.target.value;
    tabDailyTasks(c);
  };

  const clrSearch = document.getElementById('admTaskClearSearch');
  if (clrSearch) clrSearch.onclick = () => {
    adminTaskUi.search = '';
    renderTab();
  };

  // Bind Admin Add Task
  const admTaskInp = document.getElementById('admDailyTaskInp');
  const admAddBtn = document.getElementById('admDailyAddBtn');

  const handleAdminAddTask = async () => {
    const title = (admTaskInp?.value || '').trim();
    if (!title) {
      flashToast('Please enter a task title', true);
      return;
    }

    const pSel = document.getElementById('admDailyAssignSelect');
    const dInp = document.getElementById('admDailyAssignDate');
    const priSel = document.getElementById('admDailyAssignPriority');

    const targetPId = pSel?.value || 'all';
    const dueDate = dInp?.value || (adminTaskUi.date === 'all' ? todayStr : adminTaskUi.date);
    const priority = priSel?.value || 'Medium';

    try {
      const payload = {
        title,
        dueDate,
        priority,
        status: 'Todo'
      };

      if (targetPId === 'all') {
        payload.assignAll = true;
        payload.personnelId = 'all';
      } else {
        payload.personnelId = targetPId;
      }

      await apiPost('/tasks', payload);
      flashToast(targetPId === 'all' ? 'Task assigned to all active employees! 👥' : 'Task assigned! ✍️');
      if (admTaskInp) {
        admTaskInp.value = '';
        admTaskInp.focus();
      }
      renderTab();
    } catch (err) {
      flashToast(err.message, true);
    }
  };

  if (admAddBtn) admAddBtn.onclick = handleAdminAddTask;
  if (admTaskInp) admTaskInp.onkeydown = (e) => {
    if (e.key === 'Enter') handleAdminAddTask();
  };
}

/* ── ADMIN TASK ACTIONS ── */
window.adminToggleTask = async function(id) {
  try {
    await apiPatch('/tasks/' + id + '/toggle', {});
    flashToast('Task status updated');
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

window.adminEditTask = async function(id) {
  try {
    const tasks = await apiGet('/tasks');
    const t = tasks.find(x => x._id === id);
    if (!t) return;
    const newTitle = prompt('Edit task title:', t.title);
    if (newTitle !== null && newTitle.trim()) {
      await apiPut('/tasks/' + id, { title: newTitle.trim() });
      flashToast('Task updated');
      renderTab();
    }
  } catch(err) { flashToast(err.message, true); }
};

window.adminQuickAddTaskForEmp = async function(empId) {
  const title = prompt('Enter task for this employee:');
  if (!title || !title.trim()) return;
  try {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const dueDate = adminTaskUi.date === 'all' ? todayStr : adminTaskUi.date;
    await apiPost('/tasks', {
      title: title.trim(),
      personnelId: empId,
      dueDate,
      priority: 'Medium',
      status: 'Todo'
    });
    flashToast('Task assigned to employee! ✍️');
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

window.adminDeleteTask = async function(id) {
  if (!confirm('Delete this task?')) return;
  try {
    await apiDelete('/tasks/' + id);
    flashToast('Task deleted');
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

window.adminClearCompletedTasks = async function(targetPId) {
  if (!confirm('Delete completed tasks?')) return;
  try {
    const payload = {
      date: adminTaskUi.date
    };
    if (targetPId && targetPId !== 'all') {
      payload.personnelId = targetPId;
    } else if (adminTaskUi.personnelId && adminTaskUi.personnelId !== 'all') {
      payload.personnelId = adminTaskUi.personnelId;
    }
    const res = await apiPost('/tasks/clear-completed', payload);
    flashToast(`Completed tasks deleted (${res.deletedCount || 0} removed) 🗑️`);
    renderTab();
  } catch(err) { flashToast(err.message, true); }
};

boot();

