let user = null;
let servicesCache = [];
let personnelCache = [];
let ui = { tab: 'dashboard', period: 'month' };
let draft = { title: '', serviceId: '', date: new Date().toISOString().slice(0,10), completionDate: '', desc: '', priority: 'Medium', preferredPersonId: '' };
const ROLE_COLUMNS = [['strategy','Strategy'],['cs','CS'],['website','Website'],['design','Design'],['copy','Copy'],['edit','Edit'],['shoot','Shoot'],['seo','SEO'],['smo','SMO'],['qc','Quality Check']];

async function boot(){
  initTheme();
  user = requireAuth('client');
  if(!user) return;
  try{
    const [services, personnel] = await Promise.all([apiGet('/services'), apiGet('/personnel')]);
    servicesCache = services;
    personnelCache = personnel.filter(p=>p.status==='active');
  }catch(e){ servicesCache=[]; personnelCache=[]; }
  render();
}

const CLIENT_TABS = [
  { key:'dashboard', label:'Overview Dashboard', icon:'📊' },
  { key:'jobs',      label:'All Jobs Logged',    icon:'📋' },
  { key:'logjob',    label:'Log a Job',          icon:'➕' },
  { key:'delivered', label:'Work Delivered',     icon:'📦' },
  { key:'billing',   label:'Billing & Invoices', icon:'💳' },
  { key:'team',      label:'Our Team',           icon:'👥' }
];

function render(){
  const app = document.getElementById('app');
  const activeTabObj = CLIENT_TABS.find(t=>t.key===ui.tab) || CLIENT_TABS[0];
  app.innerHTML = renderAppShell({
    user,
    currentRole: 'client',
    activeTab: ui.tab,
    tabs: CLIENT_TABS,
    title: activeTabObj.label,
    subtitle: 'Client Portal & Service Requests'
  });
  bindAppShellEvents((newTab)=>{ ui.tab = newTab; render(); });
  renderTab();
}
window.ci360NavTab = (newTab) => { ui.tab = newTab; render(); };

async function renderTab(){
  const c = document.getElementById('content');
  if(!c) return;
  if(ui.tab==='logjob'){ tabLogJob(c); return; }
  c.innerHTML = renderSkeletonCards(3);
  try{
    const d = await apiGet('/dashboard/client?period=' + ui.period);
    if(ui.tab==='dashboard')      tabDashboardOverview(c, d);
    else if(ui.tab==='jobs')      tabJobs(c, d);
    else if(ui.tab==='delivered') tabDelivered(c, d);
    else if(ui.tab==='billing')   await tabBilling(c);
    else if(ui.tab==='team')      tabTeam(c, d);
  }catch(err){ c.innerHTML = renderEmptyState('Something went wrong', err.message, '⚠️'); }
}

/* ════════════════════════════ CLIENT DASHBOARD OVERVIEW ═══════════════════ */
function tabDashboardOverview(c, d){
  const clientName = d.client?.name || user?.name || 'Valued Client';
  const clientCode = d.client?.code || 'CI360-ACC';
  const clientTier = d.client?.nature || d.client?.difficulty || 'Retainer Account';
  const allJobs = d.jobs || [];

  const periodJobs = (ui.period === 'all') ? allJobs : allJobs.filter(j => {
    if (!j.date) return true;
    const dStr = j.date.slice(0, 10);
    return (!d.from || dStr >= d.from) && (!d.to || dStr <= d.to);
  });

  const totalCount = periodJobs.length;
  const completedJobs = periodJobs.filter(j => j.status === 'Completed' || (j.clientApproval && j.clientApproval.status === 'Approved') || j.completionDate);
  const completedCount = completedJobs.length;
  const inProgressJobs = periodJobs.filter(j => !j.completionDate && j.status !== 'Completed' && (!j.clientApproval || j.clientApproval.status !== 'Approved'));
  const inProgressCount = inProgressJobs.length;
  const revisionJobs = periodJobs.filter(j => j.clientApproval && j.clientApproval.status === 'Revision Requested');
  const revisionCount = revisionJobs.length;

  const totalHours = (d.stats?.hours != null ? Number(d.stats.hours) : periodJobs.reduce((acc, j) => {
    let h = 0;
    (j.assignments || []).forEach(a => h += Number(a.hours) || 0);
    return acc + h;
  }, 0));

  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : (allJobs.length > 0 ? Math.round((allJobs.filter(j=>j.completionDate).length / allJobs.length) * 100) : 100);

  // Deliverables awaiting client sign-off
  const pendingApprovals = allJobs.filter(j => j.deliverables && j.deliverables.length && (!j.clientApproval || j.clientApproval.status === 'Pending'));

  // Service breakdown
  const serviceCounts = {};
  periodJobs.forEach(j => {
    const sNames = (j.serviceNames && j.serviceNames.length) ? j.serviceNames : ['General Deliverable'];
    sNames.forEach(n => {
      serviceCounts[n] = (serviceCounts[n] || 0) + 1;
    });
  });
  const serviceList = Object.entries(serviceCounts).sort((a,b)=>b[1]-a[1]);

  // Priority count
  const urgentCount = periodJobs.filter(j => j.priority === 'Urgent').length;
  const highCount = periodJobs.filter(j => j.priority === 'High').length;

  // Account roster
  const roster = d.roster || [];
  const assignedTeam = [];
  roster.forEach(r => {
    ROLE_COLUMNS.forEach(([key, label]) => {
      const names = String(r.roles?.[key] || '').split(',').map(s=>s.trim()).filter(Boolean);
      names.forEach(name => {
        if (!assignedTeam.some(t => t.name === name)) {
          assignedTeam.push({ name, role: label });
        }
      });
    });
  });

  const recentJobs = allJobs.slice(0, 5);

  c.innerHTML = `
    <div class="block client-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Welcome Hero Banner -->
      <div class="card client-hero-card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.05) 50%, rgba(245,158,11,0.04) 100%);border:1px solid rgba(99,102,241,0.22);border-radius:var(--r-xl);padding:24px 28px;margin-bottom:24px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:54px;height:54px;border-radius:var(--r-lg);background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(79,70,229,0.4);flex-shrink:0">
              ${clientName.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(clientName)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(clientCode)}</span>
                <span class="badge gold" style="font-size:11px;font-weight:700">★ ${escapeHtml(clientTier)}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Client Workspace &amp; Deliverables Command Center · Real-time pipeline, team allocation, and asset tracking
              </p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn gold" id="btnHeroLogJob" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md);box-shadow:0 4px 12px rgba(245,158,11,0.25)">
              <span>➕</span> Log New Job
            </button>
            <button class="btn ghost" id="btnHeroInvoices" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;padding:9px 16px;border-radius:var(--r-md)">
              <span>💳</span> View Invoices
            </button>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-top:22px;padding-top:18px;border-top:1px solid var(--border-xs)">
          <div style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4)">
            Reporting Period Filter
          </div>
          <div id="overviewPeriodWrapper">
            ${renderPeriodPicker(ui.period)}
          </div>
        </div>
      </div>

      <!-- Action Required: Pending Approval Banner -->
      ${pendingApprovals.length > 0 ? `
        <div class="card" style="background:linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.05) 100%);border:1px solid var(--amber-500);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(245,158,11,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
              🔔
            </div>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                Deliverables Ready for Review &amp; Approval
              </div>
              <div style="font-size:13px;color:var(--text-2)">
                You have <strong style="color:var(--amber-500)">${pendingApprovals.length} job(s)</strong> with finished creative assets awaiting your client sign-off or feedback.
              </div>
            </div>
          </div>
          <button class="btn gold" id="btnReviewNow" style="font-size:13px;font-weight:700;padding:8px 18px">
            Review Deliverables Now →
          </button>
        </div>
      ` : ''}

      <!-- 4 KPI Summary Cards -->
      <section class="block block-kpi-grid" style="margin-bottom:24px">
        <div class="grid grid-4" style="gap:16px">
          
          <div class="card kpi" style="border-top:3px solid var(--brand-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Work Orders Logged</div>
              <div style="font-size:20px">📋</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${totalCount}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${allJobs.length} all-time requests recorded</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active in Production</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${inProgressCount}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${revisionCount > 0 ? `<strong style="color:var(--amber-600)">${revisionCount}</strong> in revision review` : 'Under active execution'}</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Delivered &amp; Signed Off</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${completedCount}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${completionRate}% delivery fulfillment rate</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Dedicated Effort</div>
              <div style="font-size:20px">⏱️</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${totalHours.toFixed(1)} <span style="font-size:18px;font-weight:600">hrs</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">Tracked creative &amp; production hours</div>
          </div>

        </div>
      </section>

      <!-- 2-Column Delivery Health & Retainer Distribution -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:20px;margin-bottom:24px">
        
        <!-- Delivery Progress Card -->
        <div class="card" style="padding:22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0">Delivery Performance &amp; Health</h3>
            <span class="badge ${completionRate >= 80 ? 'green' : 'gold'}" style="font-weight:700">${completionRate}% Complete</span>
          </div>

          <div style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:var(--text-3);margin-bottom:6px">
              <span>Fulfillment Rate</span>
              <span>${completedCount} of ${totalCount} Jobs Completed</span>
            </div>
            <div style="width:100%;height:10px;background:var(--border-sm);border-radius:10px;overflow:hidden;display:flex">
              <div style="width:${completionRate}%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:10px;transition:width 0.6s ease"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;padding:12px 8px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-xs)">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Completed</div>
              <div style="font-size:18px;font-weight:900;color:var(--green-500);margin-top:2px">${completedCount}</div>
            </div>
            <div style="border-left:1px solid var(--border-sm);border-right:1px solid var(--border-sm)">
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">In Progress</div>
              <div style="font-size:18px;font-weight:900;color:var(--amber-500);margin-top:2px">${inProgressCount}</div>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Urgent / High</div>
              <div style="font-size:18px;font-weight:900;color:var(--brand-500);margin-top:2px">${urgentCount + highCount}</div>
            </div>
          </div>
        </div>

        <!-- Services Retainer Breakdown -->
        <div class="card" style="padding:22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0">Services Retainer Breakdown</h3>
            <span style="font-size:12px;font-weight:700;color:var(--text-3)">${serviceList.length} Active Services</span>
          </div>

          ${serviceList.length > 0 ? `
            <div style="display:flex;flex-direction:column;gap:12px">
              ${serviceList.slice(0, 5).map(([name, count]) => {
                const pct = Math.round((count / (totalCount || 1)) * 100);
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;color:var(--text-2);margin-bottom:4px">
                      <span>${escapeHtml(name)}</span>
                      <span style="color:var(--text-4)">${count} job(s) (${pct}%)</span>
                    </div>
                    <div style="width:100%;height:7px;background:var(--border-sm);border-radius:6px;overflow:hidden">
                      <div style="width:${pct}%;height:100%;background:linear-gradient(90deg, var(--brand-500), #6366F1);border-radius:6px"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="empty" style="padding:20px">No service activity recorded for this period.</div>
          `}
        </div>

      </div>

      <!-- Dedicated Account Team Snapshot -->
      <div class="card" style="padding:22px;margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Your Dedicated Account Team</h3>
            <p style="font-size:12.5px;color:var(--text-3);margin:0">Directly assigned creative specialists and client success partners</p>
          </div>
          <button class="btn ghost small" id="btnMeetTeam" style="font-weight:700">
            View Full Team Roster →
          </button>
        </div>

        ${assignedTeam.length > 0 ? `
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:14px">
            ${assignedTeam.slice(0, 6).map(m => `
              <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">
                  ${m.name.slice(0,2).toUpperCase()}
                </div>
                <div style="min-width:0;flex:1">
                  <div style="font-size:13.5px;font-weight:800;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(m.name)}</div>
                  <div style="font-size:11px;font-weight:600;color:var(--brand-500);text-transform:uppercase">${escapeHtml(m.role)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--bg-surface);border-radius:var(--r-md);flex-wrap:wrap;gap:12px">
            <div style="font-size:13px;color:var(--text-3)">
              Your account is supported by our full multi-disciplinary creative studio.
            </div>
            <button class="btn gold small" onclick="ci360NavTab('team')">Meet the Team</button>
          </div>
        `}
      </div>

      <!-- Recent Work Orders & Active Jobs Table -->
      <div class="card table-card" style="padding:0;overflow:hidden;margin-bottom:24px">
        <div style="padding:18px 24px;border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Recent Work Orders &amp; Requests</h3>
            <p style="font-size:12.5px;color:var(--text-3);margin:0">Latest deliverables in your production queue</p>
          </div>
          <button class="btn ghost small" id="btnViewAllJobs" style="font-weight:700">
            View All Jobs (${allJobs.length}) →
          </button>
        </div>

        ${recentJobs.length > 0 ? `
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:24px">Job Title</th>
                  <th>Service</th>
                  <th>Priority</th>
                  <th>Start Date</th>
                  <th>Delivery Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${recentJobs.map(j => {
                  const isDone = j.status === 'Completed' || (j.clientApproval && j.clientApproval.status === 'Approved') || j.completionDate;
                  const isRev = j.clientApproval && j.clientApproval.status === 'Revision Requested';
                  const priColor = j.priority === 'Urgent' ? 'red' : (j.priority === 'High' ? 'amber' : 'blue');
                  return `
                    <tr style="cursor:pointer" onclick="ci360NavTab('jobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(j.title || 'Untitled Request')}
                      </td>
                      <td>
                        ${(j.serviceNames || []).map(s => `<span class="badge gray" style="font-size:11px">${escapeHtml(s)}</span>`).join(' ') || '<span style="color:var(--text-4)">—</span>'}
                      </td>
                      <td>
                        <span class="badge ${priColor}" style="font-size:11px;font-weight:700">${escapeHtml(j.priority || 'Medium')}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(j.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${j.completionDate ? fmtDate(j.completionDate) : '—'}</td>
                      <td>
                        <span class="badge ${isDone ? 'green' : (isRev ? 'amber' : 'gold')}" style="font-weight:700">
                          ${isDone ? '✓ Completed' : (isRev ? '↺ Revision' : '⏳ In Progress')}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty" style="padding:36px 20px">
            <div style="font-size:32px;margin-bottom:10px">📝</div>
            <h4 style="margin:0 0 6px 0;font-size:16px;font-weight:800;color:var(--text-1)">No Jobs Logged Yet</h4>
            <p style="font-size:13px;color:var(--text-3);margin:0 0 16px 0">Submit your first creative brief or task request to get started.</p>
            <button class="btn gold" onclick="ci360NavTab('logjob')">➕ Log Your First Job</button>
          </div>
        `}
      </div>

    </div>
  `;

  // Bind interactive elements
  const btnHeroLogJob = document.getElementById('btnHeroLogJob');
  if (btnHeroLogJob) btnHeroLogJob.onclick = () => { ui.tab = 'logjob'; render(); };

  const btnHeroInvoices = document.getElementById('btnHeroInvoices');
  if (btnHeroInvoices) btnHeroInvoices.onclick = () => { ui.tab = 'billing'; render(); };

  const btnReviewNow = document.getElementById('btnReviewNow');
  if (btnReviewNow) btnReviewNow.onclick = () => { ui.tab = 'delivered'; render(); };

  const btnMeetTeam = document.getElementById('btnMeetTeam');
  if (btnMeetTeam) btnMeetTeam.onclick = () => { ui.tab = 'team'; render(); };

  const btnViewAllJobs = document.getElementById('btnViewAllJobs');
  if (btnViewAllJobs) btnViewAllJobs.onclick = () => { ui.tab = 'jobs'; render(); };

  document.querySelectorAll('#overviewPeriodWrapper [data-period]').forEach(b => {
    b.onclick = () => {
      ui.period = b.dataset.period;
      renderTab();
    };
  });
}

/* ════════════════════════════ LOG A JOB ════════════════════════ */
function tabLogJob(c){
  c.innerHTML = `
    <div class="block">
      <h2>Log a New Job <span class="eyebrow">Request or record work for your account</span></h2>
      <div class="card form-card">
        <form id="clientLogJobForm" novalidate>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">1</span>
              Job Details
            </div>
            <div class="field">
              <label for="clientJobTitle">Job Title *</label>
              <input type="text" id="clientJobTitle" value="${escapeHtml(draft.title||'')}" placeholder="e.g. Brand Redesign &amp; Social Campaign" required>
            </div>
            <div class="field">
              <label for="clientJobService">Select Service *</label>
              <select id="clientJobService" required>
                <option value="">Select a service…</option>
                ${servicesCache.map(s=>`<option value="${s._id}" ${draft.serviceId===s._id?'selected':''}>${escapeHtml(s.name)}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">2</span>
              Priority & Preferences
            </div>
            <div class="log-job-row">
              <div class="field">
                <label for="clientJobPriority">Priority Level *</label>
                <select id="clientJobPriority">
                  <option value="Medium" ${draft.priority==='Medium'?'selected':''}>🟡 Medium Priority</option>
                  <option value="High"   ${draft.priority==='High'?'selected':''}>🟠 High Priority</option>
                  <option value="Urgent" ${draft.priority==='Urgent'?'selected':''}>🔴 Urgent</option>
                </select>
              </div>
              <div class="field">
                <label for="clientJobPrefPerson">Preferred Team Member</label>
                <select id="clientJobPrefPerson">
                  <option value="">No Preference (Auto-Assign)</option>
                  ${personnelCache.map(p=>`<option value="${p._id}" ${draft.preferredPersonId===p._id?'selected':''}>👤 ${escapeHtml(p.name)}${p.duties ? ` (${escapeHtml(p.duties)})` : ''}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">3</span>
              Timeline
            </div>
            <div class="log-job-row">
              <div class="field">
                <label for="clientJobDate">Start Date *</label>
                <input type="date" id="clientJobDate" value="${draft.date}" required>
              </div>
              <div class="field">
                <label for="clientJobCompDate">Expected End Date</label>
                <input type="date" id="clientJobCompDate" value="${draft.completionDate}">
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">4</span>
              Description
            </div>
            <div class="field">
              <label for="clientJobDesc">Deliverable Details</label>
              <textarea id="clientJobDesc" rows="3" placeholder="Describe the project scope, deliverables, or specific requirements…">${escapeHtml(draft.desc)}</textarea>
            </div>
          </div>

          <div class="form-section" style="border-bottom:none;padding-bottom:0">
            <div class="form-section-title">
              <span class="form-section-num">5</span>
              Briefs &amp; File Attachments
            </div>
            ${renderAttachmentUploader({ id: 'clientJobAttachments', label: 'Briefs & Reference Files', subtitle: 'Upload briefs, design mockups, brand assets, spreadsheets or guideline documents' })}
          </div>

          <div class="form-actions">
            <button class="btn ghost" type="reset" id="resetClientJobBtn">Clear Form</button>
            <button class="btn gold" type="submit" id="submitClientJobBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>`;

  bindAttachmentUploader('clientJobAttachments', { existing: draft.attachments || [] });

  document.getElementById('resetClientJobBtn').onclick = ()=>{
    draft = { title:'', serviceId:'', date:new Date().toISOString().slice(0,10), completionDate:'', desc:'', priority:'Medium', preferredPersonId:'', attachments:[] };
    setUploaderAttachments('clientJobAttachments', []);
    tabLogJob(c);
  };

  document.getElementById('clientLogJobForm').onsubmit = async(e)=>{
    e.preventDefault();
    const btn = document.getElementById('submitClientJobBtn');
    const title      = document.getElementById('clientJobTitle').value.trim();
    const serviceId  = document.getElementById('clientJobService').value;
    if(!serviceId){ flashToast('Please select a service', true); return; }
    const date             = document.getElementById('clientJobDate').value;
    const completionDate   = document.getElementById('clientJobCompDate').value;
    const description      = document.getElementById('clientJobDesc').value.trim();
    const priority         = document.getElementById('clientJobPriority').value;
    const preferredPersonId= document.getElementById('clientJobPrefPerson').value;
    const attachments      = getUploaderAttachments('clientJobAttachments');

    btn.disabled=true; btn.textContent='Submitting…';
    try{
      if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
        try { await Notification.requestPermission(); } catch(e){}
      }
      await apiPost('/jobs', { title, serviceIds:[serviceId], date, completionDate, value:0, description, priority, preferredPersonId: preferredPersonId||null, assignments:[], attachments });
      flashToast('Job logged successfully with attachments! 🎉');
      if (typeof window.ci360FetchNotifications === 'function') {
        window.ci360FetchNotifications();
      }
      draft = { title:'', serviceId:'', date:new Date().toISOString().slice(0,10), completionDate:'', desc:'', priority:'Medium', preferredPersonId:'', attachments:[] };
      ui.tab = 'jobs';
      render();
    }catch(err){
      flashToast(err.message, true);
    }finally{
      btn.disabled=false; btn.textContent='Submit Job';
    }
  };
}

/* ════════════════════════════ CLIENT JOBS & DELIVERIES ═══════════════════ */
let jobsFilter = 'all';
let jobsSearch = '';

function renderClientJobCard(j, priorityBadges) {
  const isDone = j.status === 'Completed' || (j.clientApproval && j.clientApproval.status === 'Approved');
  const isRev = j.clientApproval && j.clientApproval.status === 'Revision Requested';
  const priBadge = priorityBadges[j.priority || 'Medium'] || 'gray';
  const isMine = user && j.createdBy && (
    (typeof j.createdBy === 'object' && String(j.createdBy._id) === String(user._id || user.id)) ||
    String(j.createdBy) === String(user._id || user.id)
  );

  return `
    <div class="card client-job-card" data-id="${j._id}" style="border-left:4px solid ${isDone ? 'var(--green-500)' : isRev ? 'var(--amber-500)' : 'var(--brand-500)'};padding:18px 22px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:15px;font-weight:800;color:var(--text-1)">${escapeHtml(j.title || 'Untitled Job')}</span>
            ${isMine ? `<span class="badge blue" style="font-size:10.5px;padding:2px 8px">👤 Logged by You</span>` : ''}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span class="badge ${isDone ? 'green' : isRev ? 'amber' : 'gold'}">
              ${isDone ? '✓ Completed' : isRev ? '↺ Revision Requested' : '⏳ In Progress'}
            </span>
            <span class="badge ${priBadge}">${escapeHtml(j.priority || 'Medium')}</span>
            ${(j.serviceNames || []).map(s => `<span class="badge gray">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;color:var(--text-4)">Start Date</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-1)">${fmtDate(j.date)}</div>
          ${j.completionDate ? `<div style="font-size:11px;color:var(--text-3);margin-top:2px">Due: ${fmtDate(j.completionDate)}</div>` : ''}
        </div>
      </div>
      ${j.description ? `<div style="font-size:12.5px;color:var(--text-3);line-height:1.5;padding-top:10px;border-top:1px solid var(--border-xs)">${escapeHtml(j.description)}</div>` : ''}
      ${j.preferredPersonName ? `<div style="margin-top:8px;font-size:12px;color:var(--text-4)">Assigned to: <strong style="color:var(--text-2)">${escapeHtml(j.preferredPersonName)}</strong></div>` : ''}
      ${isDone && j.completionDate ? `<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(j.completionDate)}</div>` : ''}

      <!-- Brief Attachments & Completed Deliverables -->
      ${(j.attachments && j.attachments.length) ? `
        <div data-attachments="${encodeURIComponent(JSON.stringify(j.attachments))}">
          ${renderAttachmentChips(j.attachments, { title: 'Initial Briefs & Assets' })}
        </div>
      ` : ''}

      ${(j.deliverables && j.deliverables.length) ? `
        <div data-attachments="${encodeURIComponent(JSON.stringify(j.deliverables))}">
          ${renderAttachmentChips(j.deliverables, { title: 'Finished Deliverables & Artifacts' })}
        </div>
      ` : ''}

      <!-- Client Deliverable Approval / Revision Status Box -->
      ${(j.deliverables && j.deliverables.length) ? `
        ${j.clientApproval && j.clientApproval.status === 'Approved' ? `
          <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:16px">✅</span>
              <div>
                <div style="font-size:13px;font-weight:700;color:var(--green-500)">Approved &amp; Signed Off</div>
                <div style="font-size:11.5px;color:var(--text-3)">Approved by ${escapeHtml(j.clientApproval.approvedBy || 'Client')} on ${fmtDate(j.clientApproval.approvedAt || j.completionDate)}</div>
              </div>
            </div>
            ${j.clientApproval.rating ? `<span class="badge gold" style="font-size:12px">${'★'.repeat(j.clientApproval.rating)} ${j.clientApproval.rating}/5</span>` : ''}
          </div>
        ` : j.clientApproval && j.clientApproval.status === 'Revision Requested' ? `
          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
              <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--amber-500)">
                <span>↺</span> Revision Requested
              </div>
              <span style="font-size:11px;color:var(--text-4)">${fmtDate((j.clientApproval.revisions || []).slice(-1)[0]?.requestedAt || j.updatedAt)}</span>
            </div>
            <div style="font-size:12.5px;color:var(--text-2);background:var(--bg-surface);border-radius:var(--r-xs);padding:8px 10px;margin-top:6px;line-height:1.4">
              "${escapeHtml(j.clientApproval.feedback || 'Revision requested')}"
            </div>
          </div>
        ` : `
          <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08) 0%,rgba(139,92,246,0.04) 100%);border:1px solid rgba(99,102,241,0.25);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--brand-500)">Deliverables Ready for Review</div>
              <div style="font-size:11.5px;color:var(--text-3)">Please inspect the attached files above and approve or request revision.</div>
            </div>
            <div style="display:flex;gap:8px">
              <button type="button" class="btn ghost small client-rev-btn" data-id="${j._id}" data-title="${escapeHtml(j.title || 'Job')}" style="border-color:rgba(245,158,11,0.4);color:var(--amber-500)">
                ↺ Request Revision
              </button>
              <button type="button" class="btn gold small client-app-btn" data-id="${j._id}" data-title="${escapeHtml(j.title || 'Job')}">
                ✓ Approve &amp; Sign Off
              </button>
            </div>
          </div>
        `}
      ` : ''}

      ${renderSupportTicketSection(j._id, false)}
    </div>`;
}

function bindJobCardActions(jobs) {
  document.querySelectorAll('.client-app-btn').forEach(btn => {
    btn.onclick = () => openClientApproveModal(btn.dataset.id, btn.dataset.title, () => renderTab());
  });

  document.querySelectorAll('.client-rev-btn').forEach(btn => {
    btn.onclick = () => openClientRevisionModal(btn.dataset.id, btn.dataset.title, () => renderTab());
  });

  jobs.forEach(j => bindSupportTicketSection(j._id, false));
}

function tabJobs(c, d){
  const allJobs = d.jobs || [];
  const priorityBadges = { Medium:'gray', High:'amber', Urgent:'red' };

  if(allJobs.length === 0){
    c.innerHTML = `
      <div class="block">
        <h2>All Jobs Logged <span class="eyebrow">No jobs logged yet</span></h2>
        ${renderEmptyState('No jobs logged yet', 'Log your first job to request projects, design, campaigns, or services from our team.', '📋', `<button class="btn gold" onclick="ui.tab='logjob';render()">➕ Log Your First Job</button>`)}
      </div>`;
    return;
  }

  function filterList(){
    let list = allJobs;
    if(jobsFilter === 'inprogress'){
      list = list.filter(j => j.status !== 'Completed' && (!j.clientApproval || j.clientApproval.status !== 'Approved'));
    } else if(jobsFilter === 'completed'){
      list = list.filter(j => j.status === 'Completed' || (j.clientApproval && j.clientApproval.status === 'Approved'));
    } else if(jobsFilter === 'revision'){
      list = list.filter(j => j.clientApproval && j.clientApproval.status === 'Revision Requested');
    }
    if(jobsSearch){
      const q = jobsSearch.toLowerCase();
      list = list.filter(j => 
        (j.title||'').toLowerCase().includes(q) || 
        (j.description||'').toLowerCase().includes(q) || 
        (j.serviceNames||[]).some(s=>s.toLowerCase().includes(q)) ||
        (j.preferredPersonName||'').toLowerCase().includes(q)
      );
    }
    return list;
  }

  const inProgCount = allJobs.filter(j => j.status !== 'Completed' && (!j.clientApproval || j.clientApproval.status !== 'Approved')).length;
  const compCount = allJobs.filter(j => j.status === 'Completed' || (j.clientApproval && j.clientApproval.status === 'Approved')).length;
  const revCount = allJobs.filter(j => j.clientApproval && j.clientApproval.status === 'Revision Requested').length;

  function renderView(){
    const filteredJobs = filterList();

    c.innerHTML = `
      <div class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px">
          <div>
            <h2 style="margin-bottom:4px">All Jobs Logged <span class="eyebrow">${allJobs.length} total entries</span></h2>
            <div style="font-size:12.5px;color:var(--text-3)">Track all projects and requests submitted by your account</div>
          </div>
          <button class="btn gold" type="button" id="tabJobsLogNewBtn" style="display:inline-flex;align-items:center;gap:6px">
            <span>➕</span> Log a New Job
          </button>
        </div>

        <!-- Metric Badges Row -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:10px;margin-bottom:16px">
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.5px">Total Logged</div>
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin-top:2px">${allJobs.length}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">In Progress</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${inProgCount}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--green-500);text-transform:uppercase;letter-spacing:0.5px">Completed</div>
            <div style="font-size:22px;font-weight:800;color:var(--green-500);margin-top:2px">${compCount}</div>
          </div>
          ${revCount > 0 ? `
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--red-500);text-transform:uppercase;letter-spacing:0.5px">Revisions</div>
            <div style="font-size:22px;font-weight:800;color:var(--red-500);margin-top:2px">${revCount}</div>
          </div>` : ''}
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;background:var(--bg-surface);padding:10px 14px;border-radius:var(--r-sm);border:1px solid var(--border-xs)">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btn ${jobsFilter==='all'?'primary':'ghost'} small filter-tab-btn" data-f="all">All (${allJobs.length})</button>
            <button type="button" class="btn ${jobsFilter==='inprogress'?'primary':'ghost'} small filter-tab-btn" data-f="inprogress">In Progress (${inProgCount})</button>
            <button type="button" class="btn ${jobsFilter==='completed'?'primary':'ghost'} small filter-tab-btn" data-f="completed">Completed (${compCount})</button>
            ${revCount > 0 ? `<button type="button" class="btn ${jobsFilter==='revision'?'primary':'ghost'} small filter-tab-btn" data-f="revision">Revisions (${revCount})</button>` : ''}
          </div>
          <div style="flex:1;max-width:280px;min-width:180px">
            <input type="text" id="clientJobSearchInput" value="${escapeHtml(jobsSearch)}" placeholder="Search jobs…" style="padding:6px 12px;font-size:12.5px;width:100%;border-radius:var(--r-xs)">
          </div>
        </div>

        <!-- Jobs Listing -->
        <div style="display:flex;flex-direction:column;gap:14px">
          ${filteredJobs.length === 0 ? `
            <div class="card empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-4)">
              No matching jobs found ${jobsSearch ? `for "${escapeHtml(jobsSearch)}"` : ''}
            </div>
          ` : filteredJobs.map(j => renderClientJobCard(j, priorityBadges)).join('')}
        </div>
      </div>`;

    // Bind event handlers
    const logNewBtn = document.getElementById('tabJobsLogNewBtn');
    if(logNewBtn) logNewBtn.onclick = () => { ui.tab = 'logjob'; render(); };

    c.querySelectorAll('.filter-tab-btn').forEach(btn => {
      btn.onclick = () => {
        jobsFilter = btn.dataset.f;
        renderView();
      };
    });

    const searchInput = document.getElementById('clientJobSearchInput');
    if(searchInput){
      searchInput.oninput = (e) => {
        jobsSearch = e.target.value.trim();
        renderView();
        const freshInput = document.getElementById('clientJobSearchInput');
        if(freshInput){
          freshInput.focus();
          freshInput.selectionStart = freshInput.selectionEnd = freshInput.value.length;
        }
      };
    }

    bindJobCardActions(filteredJobs);
  }

  renderView();
}

function tabDelivered(c, d){
  const allJobs = d.jobs || [];
  const deliveredJobs = allJobs.filter(j => (j.deliverables && j.deliverables.length > 0) || j.status === 'Completed' || (j.clientApproval && j.clientApproval.status === 'Approved'));
  const priorityBadges = { Medium:'gray', High:'amber', Urgent:'red' };

  if(deliveredJobs.length === 0){
    c.innerHTML = `
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No delivered work yet</span></h2>
        ${renderEmptyState('No completed deliverables yet', 'When the team uploads final deliverables and marks work complete, you can review and sign off on them here.', '📦', `<button class="btn ghost" onclick="ui.tab='jobs';render()">View All Jobs Logged</button>`)}
      </div>`;
    return;
  }

  const readyForReviewCount = deliveredJobs.filter(j => j.deliverables && j.deliverables.length && (!j.clientApproval || j.clientApproval.status === 'Pending')).length;

  c.innerHTML = `
    <div class="block">
      <div style="margin-bottom:18px">
        <h2 style="margin-bottom:4px">Work Delivered <span class="eyebrow">${deliveredJobs.length} completed deliverables</span></h2>
        <div style="font-size:12.5px;color:var(--text-3)">Review deliverable files, approve completed projects, or request revisions</div>
      </div>

      ${readyForReviewCount > 0 ? `
        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.06));border:1px solid rgba(99,102,241,0.3);border-radius:var(--r-sm);padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--brand-500)">🔔 ${readyForReviewCount} Deliverable${readyForReviewCount>1?'s':''} Waiting for Your Approval</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Please inspect the deliverables below and click Approve or Request Revision.</div>
          </div>
        </div>
      ` : ''}

      <div style="display:flex;flex-direction:column;gap:14px">
        ${deliveredJobs.map(j => renderClientJobCard(j, priorityBadges)).join('')}
      </div>
    </div>`;

  bindJobCardActions(deliveredJobs);
}

function openClientApproveModal(jobId, jobTitle, onDone) {
  let selectedRating = 5;
  const bg = openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Approve Deliverables &amp; Sign Off</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(jobTitle)}</div>
    </div>

    <div style="margin-bottom:16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:12px 14px">
      <div style="font-size:13px;font-weight:600;color:var(--green-500);margin-bottom:4px">✓ Confirming Completion</div>
      <div style="font-size:12px;color:var(--text-3);line-height:1.4">By approving, this job will be verified as completed and signed off.</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Rate Work Quality (Optional)</label>
      <div id="starRatingWrap" style="display:flex;gap:8px;font-size:24px;cursor:pointer;margin-top:4px">
        <span class="star-item" data-val="1" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="2" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="3" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="4" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="5" style="color:#F59E0B">★</span>
      </div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mAppFeedback">Feedback / Review Note (Optional)</label>
      <textarea id="mAppFeedback" rows="3" placeholder="Add comments, praise or notes for the team…"></textarea>
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mAppCancel">Cancel</button>
      <button class="btn gold" id="mAppConfirm">✓ Confirm Approval</button>
    </div>
  `);

  const stars = bg.querySelectorAll('.star-item');
  function updateStars(val) {
    selectedRating = val;
    stars.forEach(s => {
      s.style.color = Number(s.dataset.val) <= val ? '#F59E0B' : 'var(--text-4)';
    });
  }
  stars.forEach(s => {
    s.onclick = () => updateStars(Number(s.dataset.val));
  });

  bg.querySelector('#mAppCancel').onclick = () => bg.remove();
  bg.querySelector('#mAppConfirm').onclick = async () => {
    const feedback = bg.querySelector('#mAppFeedback').value.trim();
    const btn = bg.querySelector('#mAppConfirm');
    btn.disabled = true;
    btn.textContent = 'Approving…';
    try {
      await apiPost(`/jobs/${jobId}/approve`, { rating: selectedRating, feedback });
      flashToast('Deliverables approved & signed off! 🎉');
      bg.remove();
      if (onDone) onDone();
    } catch (err) {
      flashToast(err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = '✓ Confirm Approval';
    }
  };
}

function openClientRevisionModal(jobId, jobTitle, onDone) {
  const bg = openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Request Deliverable Revision</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(jobTitle)}</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mRevNotes">Revision Details &amp; Change Requests *</label>
      <textarea id="mRevNotes" rows="4" placeholder="Describe the changes, edits, or improvements required…"></textarea>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({ id: 'mRevAttachments', label: 'Reference Markups / Screenshots (Optional)', subtitle: 'Attach annotated screenshots, briefs or reference files' })}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mRevCancel">Cancel</button>
      <button class="btn gold" id="mRevConfirm" style="background:linear-gradient(135deg,var(--amber-500) 0%,#D97706 100%)">↺ Send Revision Request</button>
    </div>
  `);

  bindAttachmentUploader('mRevAttachments');

  bg.querySelector('#mRevCancel').onclick = () => bg.remove();
  bg.querySelector('#mRevConfirm').onclick = async () => {
    const feedback = bg.querySelector('#mRevNotes').value.trim();
    if (!feedback) {
      flashToast('Please enter revision details', true);
      return;
    }
    const attachments = getUploaderAttachments('mRevAttachments');
    const btn = bg.querySelector('#mRevConfirm');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      await apiPost(`/jobs/${jobId}/revision`, { feedback, attachments });
      flashToast('Revision request sent to the team! ↺');
      bg.remove();
      if (onDone) onDone();
    } catch (err) {
      flashToast(err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = '↺ Send Revision Request';
    }
  };
}

/* ════════════════════════════ OUR TEAM ═════════════════════════ */
function tabTeam(c, d){
  const roster = d.roster || [];
  const teamList = personnelCache && personnelCache.length ? personnelCache : [];

  c.innerHTML = `
    <div class="block">
      <h2>Our Team <span class="eyebrow">${teamList.length} members</span></h2>

      ${roster.length > 0 ? `
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${roster.map(r=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${r.nature==='Existing'?'green':'blue'}">${r.nature}</span>
              </div>
              <div class="grid grid-2">
                ${ROLE_COLUMNS.filter(([k])=>(r.roles[k]||'').trim()&&r.roles[k]!=='TBD').map(([k,label])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${label}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(r.roles[k])}</strong>
                  </div>`).join('') || '<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join('')}
        </div>` : ''}

      <div class="grid grid-2">
        ${teamList.map(p=>`
          <div class="card" style="border-left:4px solid var(--gold-500);display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500),var(--gold-500));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${p.name?p.name.charAt(0).toUpperCase():'?'}</div>
                <div>
                  <div style="font-size:14px;font-weight:800;color:var(--text-1)">${escapeHtml(p.name)}</div>
                  <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${escapeHtml(p.duties||'Team Member')}</div>
                </div>
              </div>
              <span class="badge ${p.status==='active'?'green':'gray'}">${escapeHtml(p.status)}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ════════════════════════════ BILLING & INVOICES ════════════════════════ */
async function tabBilling(c){
  const portal = await apiGet('/accounts/client-portal');
  const sum = portal.summary || {};
  const invoices = portal.invoices || [];
  const payments = portal.payments || [];

  c.innerHTML = `
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2>Billing & Invoices <span class="eyebrow">${invoices.length} invoices issued</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">View your billing invoices, payment history, and pending balances.</p>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="grid grid-3" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Invoiced</span><span class="badge blue">Billed</span></div>
          <div class="kpi-value">${fmtINR(sum.totalBilled || 0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${sum.invoiceCount || 0} total invoices</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500)">
          <div class="kpi-header"><span class="kpi-label">Total Payments Cleared</span><span class="badge green">Paid</span></div>
          <div class="kpi-value" style="color:var(--green-600)">${fmtINR(sum.totalPaid || 0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${sum.paymentCount || 0} payments recorded</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header"><span class="kpi-label">Pending Dues Balance</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(sum.pendingAmount || 0)}</div>
          <div style="font-size:12px;color:${sum.overdueAmount > 0 ? 'var(--red-600)' : 'var(--text-3)'};margin-top:4px">
            ${sum.overdueAmount > 0 ? `🚨 ${fmtINR(sum.overdueAmount)} is overdue` : 'No overdue invoices'}
          </div>
        </div>
      </div>

      <!-- Bank Details Callout -->
      <div class="card" style="background:var(--bg-elevated);margin-bottom:24px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
        <div>
          <strong style="font-size:13px;color:var(--text-1)">Settlement Bank & UPI Details:</strong>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">HDFC Bank | A/C: 50200088992211 | IFSC: HDFC0001234 | UPI: ci360@hdfcbank</div>
        </div>
        <div style="font-size:12px;color:var(--text-4)">Please share transaction UTR once payment is executed.</div>
      </div>

      <!-- Invoices Table -->
      <div class="card table-card" style="padding:0;overflow:hidden;margin-bottom:24px">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border-sm)">
          <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--text-1)">Invoices</h3>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="padding-left:22px">Invoice #</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th class="num">Amount</th>
                <th class="num">Paid</th>
                <th class="num">Pending</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${invoices.map(inv => `
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(inv.invoiceNumber)}</strong></td>
                  <td>${fmtDate(inv.issueDate)}</td>
                  <td style="color:${inv.status === 'overdue' ? 'var(--red-600)' : 'inherit'}">${fmtDate(inv.dueDate)}</td>
                  <td class="num" style="font-weight:700">${fmtINR(inv.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(inv.amountPaid)}</td>
                  <td class="num" style="font-weight:800;color:${inv.pendingAmount > 0 ? 'var(--amber-600)' : 'var(--text-4)'}">
                    ${fmtINR(inv.pendingAmount)}
                  </td>
                  <td>
                    <span class="badge ${inv.status === 'paid' ? 'green' : (inv.status === 'overdue' ? 'red' : 'amber')}">
                      ${escapeHtml(inv.status.replace('_', ' ').toUpperCase())}
                    </span>
                  </td>
                </tr>`).join('') || `<tr><td colspan="7"><div class="empty" style="padding:28px">No invoices on file.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Payment Receipts Table -->
      ${payments.length > 0 ? `
        <div class="card table-card" style="padding:0;overflow:hidden">
          <div style="padding:16px 20px;border-bottom:1px solid var(--border-sm)">
            <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--text-1)">Payment Receipts & Remittances</h3>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:22px">Receipt #</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Reference / UTR</th>
                  <th class="num" style="padding-right:22px">Amount Cleared</th>
                </tr>
              </thead>
              <tbody>
                ${payments.map(p => `
                  <tr>
                    <td style="padding-left:22px"><strong>${escapeHtml(p.paymentNumber)}</strong></td>
                    <td>${fmtDate(p.paymentDate)}</td>
                    <td><span class="badge">${escapeHtml(p.paymentMethod.toUpperCase())}</span></td>
                    <td style="font-family:var(--font-mono);font-size:12px">${escapeHtml(p.referenceId || '—')}</td>
                    <td class="num" style="padding-right:22px;color:var(--green-600);font-weight:800">${fmtINR(p.amount)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>` : ''}
    </div>`;
}

boot();
