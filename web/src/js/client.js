let user = null;
let servicesCache = [];
let personnelCache = [];
let ui = { tab: 'logjob', period: 'month' };
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
  { key:'logjob', label:'Log a Job',        icon:'➕' },
  { key:'jobs',   label:'Work Delivered',    icon:'📦' },
  { key:'team',   label:'Our Team',          icon:'👥' }
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

async function renderTab(){
  const c = document.getElementById('content');
  if(!c) return;
  if(ui.tab==='logjob'){ tabLogJob(c); return; }
  c.innerHTML = renderSkeletonCards(3);
  try{
    const d = await apiGet('/dashboard/client?period=' + ui.period);
    if(ui.tab==='jobs')      tabJobs(c, d);
    else if(ui.tab==='team') tabTeam(c, d);
  }catch(err){ c.innerHTML = renderEmptyState('Something went wrong', err.message, '⚠️'); }
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
      await apiPost('/jobs', { title, serviceIds:[serviceId], date, completionDate, value:0, description, priority, preferredPersonId: preferredPersonId||null, assignments:[], attachments });
      flashToast('Job logged successfully with attachments! 🎉');
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

/* ════════════════════════════ WORK DELIVERED ═══════════════════ */
function tabJobs(c, d){
  const jobs = d.jobs || [];
  const priorityBadges = { Medium:'gray', High:'amber', Urgent:'red' };

  if(jobs.length === 0){
    c.innerHTML = `
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No work logged yet</span></h2>
        ${renderEmptyState('Nothing logged for your account yet', 'Log a new job to start tracking work delivered.', '📦', `<button class="btn gold" onclick="ui.tab='logjob';render()">Log Your First Job</button>`)}
      </div>`;
    return;
  }

  c.innerHTML = `
    <div class="block">
      <h2>Work Delivered <span class="eyebrow">${jobs.length} entries, all time</span></h2>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${jobs.map(j=>{
          const isDone = j.status==='Completed';
          const priBadge = priorityBadges[j.priority||'Medium']||'gray';
          return `
          <div class="card" style="border-left:4px solid ${isDone?'var(--green-500)':'var(--amber-500)'};padding:18px 22px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
              <div>
                <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:6px">${escapeHtml(j.title||'Untitled Job')}</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  <span class="badge ${isDone?'green':'amber'}">${isDone?'✓ Completed':'⏳ In Progress'}</span>
                  <span class="badge ${priBadge}">${escapeHtml(j.priority||'Medium')}</span>
                  ${(j.serviceNames||[]).map(s=>`<span class="badge gray">${escapeHtml(s)}</span>`).join('')}
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;color:var(--text-4)">Start</div>
                <div style="font-size:13px;font-weight:700;color:var(--text-1)">${fmtDate(j.date)}</div>
              </div>
            </div>
            ${j.description ? `<div style="font-size:12.5px;color:var(--text-3);line-height:1.5;padding-top:10px;border-top:1px solid var(--border-xs)">${escapeHtml(j.description)}</div>` : ''}
            ${j.preferredPersonName ? `<div style="margin-top:8px;font-size:12px;color:var(--text-4)">Assigned to: <strong style="color:var(--text-2)">${escapeHtml(j.preferredPersonName)}</strong></div>` : ''}
            ${j.completionDate ? `<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(j.completionDate)}</div>` : ''}

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
        }).join('')}
      </div>
    </div>`;

  // Bind Approval & Revision Modal Buttons
  document.querySelectorAll('.client-app-btn').forEach(btn => {
    btn.onclick = () => openClientApproveModal(btn.dataset.id, btn.dataset.title, () => renderTab());
  });

  document.querySelectorAll('.client-rev-btn').forEach(btn => {
    btn.onclick = () => openClientRevisionModal(btn.dataset.id, btn.dataset.title, () => renderTab());
  });

  // Bind ticket interactions for each job
  jobs.forEach(j => bindSupportTicketSection(j._id, false));
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

boot();
