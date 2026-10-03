import"./api-oMxAWWa9.js";let f=null,w=[],y=[],v={tab:"logjob",period:"month"},c={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:""};const S=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","Quality Check"]];async function D(){if(initTheme(),f=requireAuth("client"),!!f){try{const[e,t]=await Promise.all([apiGet("/services"),apiGet("/personnel")]);w=e,y=t.filter(i=>i.status==="active")}catch{w=[],y=[]}h()}}const $=[{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs Logged",icon:"📋"},{key:"delivered",label:"Work Delivered",icon:"📦"},{key:"billing",label:"Billing & Invoices",icon:"💳"},{key:"team",label:"Our Team",icon:"👥"}];function h(){const e=document.getElementById("app"),t=$.find(i=>i.key===v.tab)||$[0];e.innerHTML=renderAppShell({user:f,currentRole:"client",activeTab:v.tab,tabs:$,title:t.label,subtitle:"Client Portal & Service Requests"}),bindAppShellEvents(i=>{v.tab=i,h()}),A()}async function A(){const e=document.getElementById("content");if(e){if(v.tab==="logjob"){C(e);return}e.innerHTML=renderSkeletonCards(3);try{const t=await apiGet("/dashboard/client?period="+v.period);v.tab==="jobs"?J(e,t):v.tab==="delivered"?I(e,t):v.tab==="billing"?await T(e):v.tab==="team"&&P(e,t)}catch(t){e.innerHTML=renderEmptyState("Something went wrong",t.message,"⚠️")}}}function C(e){e.innerHTML=`
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
              <input type="text" id="clientJobTitle" value="${escapeHtml(c.title||"")}" placeholder="e.g. Brand Redesign &amp; Social Campaign" required>
            </div>
            <div class="field">
              <label for="clientJobService">Select Service *</label>
              <select id="clientJobService" required>
                <option value="">Select a service…</option>
                ${w.map(t=>`<option value="${t._id}" ${c.serviceId===t._id?"selected":""}>${escapeHtml(t.name)}</option>`).join("")}
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
                  <option value="Medium" ${c.priority==="Medium"?"selected":""}>🟡 Medium Priority</option>
                  <option value="High"   ${c.priority==="High"?"selected":""}>🟠 High Priority</option>
                  <option value="Urgent" ${c.priority==="Urgent"?"selected":""}>🔴 Urgent</option>
                </select>
              </div>
              <div class="field">
                <label for="clientJobPrefPerson">Preferred Team Member</label>
                <select id="clientJobPrefPerson">
                  <option value="">No Preference (Auto-Assign)</option>
                  ${y.map(t=>`<option value="${t._id}" ${c.preferredPersonId===t._id?"selected":""}>👤 ${escapeHtml(t.name)}${t.duties?` (${escapeHtml(t.duties)})`:""}</option>`).join("")}
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
                <input type="date" id="clientJobDate" value="${c.date}" required>
              </div>
              <div class="field">
                <label for="clientJobCompDate">Expected End Date</label>
                <input type="date" id="clientJobCompDate" value="${c.completionDate}">
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
              <textarea id="clientJobDesc" rows="3" placeholder="Describe the project scope, deliverables, or specific requirements…">${escapeHtml(c.desc)}</textarea>
            </div>
          </div>

          <div class="form-section" style="border-bottom:none;padding-bottom:0">
            <div class="form-section-title">
              <span class="form-section-num">5</span>
              Briefs &amp; File Attachments
            </div>
            ${renderAttachmentUploader({id:"clientJobAttachments",label:"Briefs & Reference Files",subtitle:"Upload briefs, design mockups, brand assets, spreadsheets or guideline documents"})}
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
    </div>`,bindAttachmentUploader("clientJobAttachments",{existing:c.attachments||[]}),document.getElementById("resetClientJobBtn").onclick=()=>{c={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},setUploaderAttachments("clientJobAttachments",[]),C(e)},document.getElementById("clientLogJobForm").onsubmit=async t=>{t.preventDefault();const i=document.getElementById("submitClientJobBtn"),o=document.getElementById("clientJobTitle").value.trim(),s=document.getElementById("clientJobService").value;if(!s){flashToast("Please select a service",!0);return}const a=document.getElementById("clientJobDate").value,n=document.getElementById("clientJobCompDate").value,d=document.getElementById("clientJobDesc").value.trim(),p=document.getElementById("clientJobPriority").value,l=document.getElementById("clientJobPrefPerson").value,r=getUploaderAttachments("clientJobAttachments");i.disabled=!0,i.textContent="Submitting…";try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}await apiPost("/jobs",{title:o,serviceIds:[s],date:a,completionDate:n,value:0,description:d,priority:p,preferredPersonId:l||null,assignments:[],attachments:r}),flashToast("Job logged successfully with attachments! 🎉"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),c={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},v.tab="jobs",h()}catch(m){flashToast(m.message,!0)}finally{i.disabled=!1,i.textContent="Submit Job"}}}let g="all",u="";function k(e,t){var n;const i=e.status==="Completed"||e.clientApproval&&e.clientApproval.status==="Approved",o=e.clientApproval&&e.clientApproval.status==="Revision Requested",s=t[e.priority||"Medium"]||"gray",a=f&&e.createdBy&&(typeof e.createdBy=="object"&&String(e.createdBy._id)===String(f._id||f.id)||String(e.createdBy)===String(f._id||f.id));return`
    <div class="card client-job-card" data-id="${e._id}" style="border-left:4px solid ${i?"var(--green-500)":o?"var(--amber-500)":"var(--brand-500)"};padding:18px 22px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:15px;font-weight:800;color:var(--text-1)">${escapeHtml(e.title||"Untitled Job")}</span>
            ${a?'<span class="badge blue" style="font-size:10.5px;padding:2px 8px">👤 Logged by You</span>':""}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span class="badge ${i?"green":o?"amber":"gold"}">
              ${i?"✓ Completed":o?"↺ Revision Requested":"⏳ In Progress"}
            </span>
            <span class="badge ${s}">${escapeHtml(e.priority||"Medium")}</span>
            ${(e.serviceNames||[]).map(d=>`<span class="badge gray">${escapeHtml(d)}</span>`).join("")}
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;color:var(--text-4)">Start Date</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-1)">${fmtDate(e.date)}</div>
          ${e.completionDate?`<div style="font-size:11px;color:var(--text-3);margin-top:2px">Due: ${fmtDate(e.completionDate)}</div>`:""}
        </div>
      </div>
      ${e.description?`<div style="font-size:12.5px;color:var(--text-3);line-height:1.5;padding-top:10px;border-top:1px solid var(--border-xs)">${escapeHtml(e.description)}</div>`:""}
      ${e.preferredPersonName?`<div style="margin-top:8px;font-size:12px;color:var(--text-4)">Assigned to: <strong style="color:var(--text-2)">${escapeHtml(e.preferredPersonName)}</strong></div>`:""}
      ${i&&e.completionDate?`<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(e.completionDate)}</div>`:""}

      <!-- Brief Attachments & Completed Deliverables -->
      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${encodeURIComponent(JSON.stringify(e.attachments))}">
          ${renderAttachmentChips(e.attachments,{title:"Initial Briefs & Assets"})}
        </div>
      `:""}

      ${e.deliverables&&e.deliverables.length?`
        <div data-attachments="${encodeURIComponent(JSON.stringify(e.deliverables))}">
          ${renderAttachmentChips(e.deliverables,{title:"Finished Deliverables & Artifacts"})}
        </div>
      `:""}

      <!-- Client Deliverable Approval / Revision Status Box -->
      ${e.deliverables&&e.deliverables.length?`
        ${e.clientApproval&&e.clientApproval.status==="Approved"?`
          <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:16px">✅</span>
              <div>
                <div style="font-size:13px;font-weight:700;color:var(--green-500)">Approved &amp; Signed Off</div>
                <div style="font-size:11.5px;color:var(--text-3)">Approved by ${escapeHtml(e.clientApproval.approvedBy||"Client")} on ${fmtDate(e.clientApproval.approvedAt||e.completionDate)}</div>
              </div>
            </div>
            ${e.clientApproval.rating?`<span class="badge gold" style="font-size:12px">${"★".repeat(e.clientApproval.rating)} ${e.clientApproval.rating}/5</span>`:""}
          </div>
        `:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`
          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
              <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--amber-500)">
                <span>↺</span> Revision Requested
              </div>
              <span style="font-size:11px;color:var(--text-4)">${fmtDate(((n=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:n.requestedAt)||e.updatedAt)}</span>
            </div>
            <div style="font-size:12.5px;color:var(--text-2);background:var(--bg-surface);border-radius:var(--r-xs);padding:8px 10px;margin-top:6px;line-height:1.4">
              "${escapeHtml(e.clientApproval.feedback||"Revision requested")}"
            </div>
          </div>
        `:`
          <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08) 0%,rgba(139,92,246,0.04) 100%);border:1px solid rgba(99,102,241,0.25);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--brand-500)">Deliverables Ready for Review</div>
              <div style="font-size:11.5px;color:var(--text-3)">Please inspect the attached files above and approve or request revision.</div>
            </div>
            <div style="display:flex;gap:8px">
              <button type="button" class="btn ghost small client-rev-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(245,158,11,0.4);color:var(--amber-500)">
                ↺ Request Revision
              </button>
              <button type="button" class="btn gold small client-app-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}">
                ✓ Approve &amp; Sign Off
              </button>
            </div>
          </div>
        `}
      `:""}

      ${renderSupportTicketSection(e._id,!1)}
    </div>`}function R(e){document.querySelectorAll(".client-app-btn").forEach(t=>{t.onclick=()=>B(t.dataset.id,t.dataset.title,()=>A())}),document.querySelectorAll(".client-rev-btn").forEach(t=>{t.onclick=()=>z(t.dataset.id,t.dataset.title,()=>A())}),e.forEach(t=>bindSupportTicketSection(t._id,!1))}function J(e,t){const i=t.jobs||[],o={Medium:"gray",High:"amber",Urgent:"red"};if(i.length===0){e.innerHTML=`
      <div class="block">
        <h2>All Jobs Logged <span class="eyebrow">No jobs logged yet</span></h2>
        ${renderEmptyState("No jobs logged yet","Log your first job to request projects, design, campaigns, or services from our team.","📋",`<button class="btn gold" onclick="ui.tab='logjob';render()">➕ Log Your First Job</button>`)}
      </div>`;return}function s(){let l=i;if(g==="inprogress"?l=l.filter(r=>r.status!=="Completed"&&(!r.clientApproval||r.clientApproval.status!=="Approved")):g==="completed"?l=l.filter(r=>r.status==="Completed"||r.clientApproval&&r.clientApproval.status==="Approved"):g==="revision"&&(l=l.filter(r=>r.clientApproval&&r.clientApproval.status==="Revision Requested")),u){const r=u.toLowerCase();l=l.filter(m=>(m.title||"").toLowerCase().includes(r)||(m.description||"").toLowerCase().includes(r)||(m.serviceNames||[]).some(b=>b.toLowerCase().includes(r))||(m.preferredPersonName||"").toLowerCase().includes(r))}return l}const a=i.filter(l=>l.status!=="Completed"&&(!l.clientApproval||l.clientApproval.status!=="Approved")).length,n=i.filter(l=>l.status==="Completed"||l.clientApproval&&l.clientApproval.status==="Approved").length,d=i.filter(l=>l.clientApproval&&l.clientApproval.status==="Revision Requested").length;function p(){const l=s();e.innerHTML=`
      <div class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px">
          <div>
            <h2 style="margin-bottom:4px">All Jobs Logged <span class="eyebrow">${i.length} total entries</span></h2>
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
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin-top:2px">${i.length}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">In Progress</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${a}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--green-500);text-transform:uppercase;letter-spacing:0.5px">Completed</div>
            <div style="font-size:22px;font-weight:800;color:var(--green-500);margin-top:2px">${n}</div>
          </div>
          ${d>0?`
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--red-500);text-transform:uppercase;letter-spacing:0.5px">Revisions</div>
            <div style="font-size:22px;font-weight:800;color:var(--red-500);margin-top:2px">${d}</div>
          </div>`:""}
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;background:var(--bg-surface);padding:10px 14px;border-radius:var(--r-sm);border:1px solid var(--border-xs)">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btn ${g==="all"?"primary":"ghost"} small filter-tab-btn" data-f="all">All (${i.length})</button>
            <button type="button" class="btn ${g==="inprogress"?"primary":"ghost"} small filter-tab-btn" data-f="inprogress">In Progress (${a})</button>
            <button type="button" class="btn ${g==="completed"?"primary":"ghost"} small filter-tab-btn" data-f="completed">Completed (${n})</button>
            ${d>0?`<button type="button" class="btn ${g==="revision"?"primary":"ghost"} small filter-tab-btn" data-f="revision">Revisions (${d})</button>`:""}
          </div>
          <div style="flex:1;max-width:280px;min-width:180px">
            <input type="text" id="clientJobSearchInput" value="${escapeHtml(u)}" placeholder="Search jobs…" style="padding:6px 12px;font-size:12.5px;width:100%;border-radius:var(--r-xs)">
          </div>
        </div>

        <!-- Jobs Listing -->
        <div style="display:flex;flex-direction:column;gap:14px">
          ${l.length===0?`
            <div class="card empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-4)">
              No matching jobs found ${u?`for "${escapeHtml(u)}"`:""}
            </div>
          `:l.map(b=>k(b,o)).join("")}
        </div>
      </div>`;const r=document.getElementById("tabJobsLogNewBtn");r&&(r.onclick=()=>{v.tab="logjob",h()}),e.querySelectorAll(".filter-tab-btn").forEach(b=>{b.onclick=()=>{g=b.dataset.f,p()}});const m=document.getElementById("clientJobSearchInput");m&&(m.oninput=b=>{u=b.target.value.trim(),p();const x=document.getElementById("clientJobSearchInput");x&&(x.focus(),x.selectionStart=x.selectionEnd=x.value.length)}),R(l)}p()}function I(e,t){const o=(t.jobs||[]).filter(n=>n.deliverables&&n.deliverables.length>0||n.status==="Completed"||n.clientApproval&&n.clientApproval.status==="Approved"),s={Medium:"gray",High:"amber",Urgent:"red"};if(o.length===0){e.innerHTML=`
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No delivered work yet</span></h2>
        ${renderEmptyState("No completed deliverables yet","When the team uploads final deliverables and marks work complete, you can review and sign off on them here.","📦",`<button class="btn ghost" onclick="ui.tab='jobs';render()">View All Jobs Logged</button>`)}
      </div>`;return}const a=o.filter(n=>n.deliverables&&n.deliverables.length&&(!n.clientApproval||n.clientApproval.status==="Pending")).length;e.innerHTML=`
    <div class="block">
      <div style="margin-bottom:18px">
        <h2 style="margin-bottom:4px">Work Delivered <span class="eyebrow">${o.length} completed deliverables</span></h2>
        <div style="font-size:12.5px;color:var(--text-3)">Review deliverable files, approve completed projects, or request revisions</div>
      </div>

      ${a>0?`
        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.06));border:1px solid rgba(99,102,241,0.3);border-radius:var(--r-sm);padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--brand-500)">🔔 ${a} Deliverable${a>1?"s":""} Waiting for Your Approval</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Please inspect the deliverables below and click Approve or Request Revision.</div>
          </div>
        </div>
      `:""}

      <div style="display:flex;flex-direction:column;gap:14px">
        ${o.map(n=>k(n,s)).join("")}
      </div>
    </div>`,R(o)}function B(e,t,i){let o=5;const s=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Approve Deliverables &amp; Sign Off</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
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
  `),a=s.querySelectorAll(".star-item");function n(d){o=d,a.forEach(p=>{p.style.color=Number(p.dataset.val)<=d?"#F59E0B":"var(--text-4)"})}a.forEach(d=>{d.onclick=()=>n(Number(d.dataset.val))}),s.querySelector("#mAppCancel").onclick=()=>s.remove(),s.querySelector("#mAppConfirm").onclick=async()=>{const d=s.querySelector("#mAppFeedback").value.trim(),p=s.querySelector("#mAppConfirm");p.disabled=!0,p.textContent="Approving…";try{await apiPost(`/jobs/${e}/approve`,{rating:o,feedback:d}),flashToast("Deliverables approved & signed off! 🎉"),s.remove(),i&&i()}catch(l){flashToast(l.message,!0)}finally{p.disabled=!1,p.textContent="✓ Confirm Approval"}}}function z(e,t,i){const o=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Request Deliverable Revision</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mRevNotes">Revision Details &amp; Change Requests *</label>
      <textarea id="mRevNotes" rows="4" placeholder="Describe the changes, edits, or improvements required…"></textarea>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mRevAttachments",label:"Reference Markups / Screenshots (Optional)",subtitle:"Attach annotated screenshots, briefs or reference files"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mRevCancel">Cancel</button>
      <button class="btn gold" id="mRevConfirm" style="background:linear-gradient(135deg,var(--amber-500) 0%,#D97706 100%)">↺ Send Revision Request</button>
    </div>
  `);bindAttachmentUploader("mRevAttachments"),o.querySelector("#mRevCancel").onclick=()=>o.remove(),o.querySelector("#mRevConfirm").onclick=async()=>{const s=o.querySelector("#mRevNotes").value.trim();if(!s){flashToast("Please enter revision details",!0);return}const a=getUploaderAttachments("mRevAttachments"),n=o.querySelector("#mRevConfirm");n.disabled=!0,n.textContent="Sending…";try{await apiPost(`/jobs/${e}/revision`,{feedback:s,attachments:a}),flashToast("Revision request sent to the team! ↺"),o.remove(),i&&i()}catch(d){flashToast(d.message,!0)}finally{n.disabled=!1,n.textContent="↺ Send Revision Request"}}}function P(e,t){const i=t.roster||[],o=y&&y.length?y:[];e.innerHTML=`
    <div class="block">
      <h2>Our Team <span class="eyebrow">${o.length} members</span></h2>

      ${i.length>0?`
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${i.map(s=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${s.nature==="Existing"?"green":"blue"}">${s.nature}</span>
              </div>
              <div class="grid grid-2">
                ${S.filter(([a])=>(s.roles[a]||"").trim()&&s.roles[a]!=="TBD").map(([a,n])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${n}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(s.roles[a])}</strong>
                  </div>`).join("")||'<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join("")}
        </div>`:""}

      <div class="grid grid-2">
        ${o.map(s=>`
          <div class="card" style="border-left:4px solid var(--gold-500);display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500),var(--gold-500));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${s.name?s.name.charAt(0).toUpperCase():"?"}</div>
                <div>
                  <div style="font-size:14px;font-weight:800;color:var(--text-1)">${escapeHtml(s.name)}</div>
                  <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${escapeHtml(s.duties||"Team Member")}</div>
                </div>
              </div>
              <span class="badge ${s.status==="active"?"green":"gray"}">${escapeHtml(s.status)}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`}async function T(e){const t=await apiGet("/accounts/client-portal"),i=t.summary||{},o=t.invoices||[],s=t.payments||[];e.innerHTML=`
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2>Billing & Invoices <span class="eyebrow">${o.length} invoices issued</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">View your billing invoices, payment history, and pending balances.</p>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="grid grid-3" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Invoiced</span><span class="badge blue">Billed</span></div>
          <div class="kpi-value">${fmtINR(i.totalBilled||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${i.invoiceCount||0} total invoices</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500)">
          <div class="kpi-header"><span class="kpi-label">Total Payments Cleared</span><span class="badge green">Paid</span></div>
          <div class="kpi-value" style="color:var(--green-600)">${fmtINR(i.totalPaid||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${i.paymentCount||0} payments recorded</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header"><span class="kpi-label">Pending Dues Balance</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(i.pendingAmount||0)}</div>
          <div style="font-size:12px;color:${i.overdueAmount>0?"var(--red-600)":"var(--text-3)"};margin-top:4px">
            ${i.overdueAmount>0?`🚨 ${fmtINR(i.overdueAmount)} is overdue`:"No overdue invoices"}
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
              ${o.map(a=>`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(a.invoiceNumber)}</strong></td>
                  <td>${fmtDate(a.issueDate)}</td>
                  <td style="color:${a.status==="overdue"?"var(--red-600)":"inherit"}">${fmtDate(a.dueDate)}</td>
                  <td class="num" style="font-weight:700">${fmtINR(a.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(a.amountPaid)}</td>
                  <td class="num" style="font-weight:800;color:${a.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${fmtINR(a.pendingAmount)}
                  </td>
                  <td>
                    <span class="badge ${a.status==="paid"?"green":a.status==="overdue"?"red":"amber"}">
                      ${escapeHtml(a.status.replace("_"," ").toUpperCase())}
                    </span>
                  </td>
                </tr>`).join("")||'<tr><td colspan="7"><div class="empty" style="padding:28px">No invoices on file.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Payment Receipts Table -->
      ${s.length>0?`
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
                ${s.map(a=>`
                  <tr>
                    <td style="padding-left:22px"><strong>${escapeHtml(a.paymentNumber)}</strong></td>
                    <td>${fmtDate(a.paymentDate)}</td>
                    <td><span class="badge">${escapeHtml(a.paymentMethod.toUpperCase())}</span></td>
                    <td style="font-family:var(--font-mono);font-size:12px">${escapeHtml(a.referenceId||"—")}</td>
                    <td class="num" style="padding-right:22px;color:var(--green-600);font-weight:800">${fmtINR(a.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`}D();
