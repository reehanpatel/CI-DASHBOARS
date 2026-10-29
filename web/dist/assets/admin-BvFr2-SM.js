import"./api-Bz9aAFqL.js";import{initProposalStudio as me}from"./proposals-CPVXv9OC.js";let G=null,b={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},H=null,k={tab:"dashboard",period:"month",jobsFilter:"all"},v={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function ue(){initTheme(),G=requireAuth("superadmin"),G&&(await M(),W())}async function M(){const[t,a,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);b.personnel=t,b.clients=a,b.services=e}function O(){const t=b.personnel.find(s=>/mansi/i.test(s.name)),a=b.personnel.find(s=>/urna/i.test(s.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),a&&e.push({personId:a._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function re(t){const a=b.personnel.find(e=>e._id===t);return a?a.name:"—"}function V(t){const a=b.clients.find(e=>e._id===t);return a?a.name:"—"}const J=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"billing_dashboard",label:"Accounts Dashboard",icon:"💳"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Manage",icon:"⚙️"}];function W(){const t=document.getElementById("app"),a=J.find(e=>e.key===k.tab)||J[0];t.innerHTML=renderAppShell({user:G,currentRole:"superadmin",activeTab:k.tab,tabs:J,title:a.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{k.tab=e,W()}),f()}window.ci360NavTab=t=>{k.tab=t,W()};async function f(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(4);try{if(k.tab==="dashboard")await ge(t);else if(k.tab==="dailytasks")await pe(t);else if(k.tab==="proposals")await ve(t);else if(k.tab==="logjob")R(t);else if(k.tab==="jobs")await xe(t);else if(k.tab==="byclient")await ke(t);else if(k.tab==="byperson")await de(t);else if(k.tab==="accounts")await $e(t);else if(k.tab==="billing_dashboard"){window.location.href="/accounts";return}else k.tab==="targets"?await Ie(t):k.tab==="salaries"?await Ae(t):k.tab==="settings"||k.tab==="manage"?Ce(t):k.tab==="users"&&await ce(t)}catch(a){t.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(a.message)}</div>`}}}async function ve(t){t.innerHTML='<div id="proposals-module-root"></div>';const a=t.querySelector("#proposals-module-root");me(a)}function Q(){return renderPeriodPicker(k.period)}function Y(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{k.period=t.dataset.period,f()}})}async function ge(t){H=await apiGet("/dashboard/admin?period="+k.period);const a=H.overview;t.innerHTML=`
    <div class="dash-overview-header">
      <div class="dash-overview-title-wrap">
        <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;">Dashboard Overview</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      ${Q()}
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
          <div class="value">${fmtINR(a.totalValue)}</div>
          <div class="sub">across ${a.activeClients} of ${a.totalClients} active clients</div>
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
          <div class="value">${a.totalJobs}</div>
          <div class="sub">${fmtHours(a.totalHours)} of effort tracked</div>
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
          <div class="value" style="color:var(--red)">${a.overworked}</div>
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
          <div class="value" style="color:var(--blue)">${a.underused}</div>
          <div class="sub">team members below 55% capacity</div>
          <svg class="kpi-spark-wave rose-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q25,35 45,28 T70,32 T100,14" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Accounts & Billing Quick Link -->
    <div class="card" style="background:linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%);border:1px solid rgba(99, 102, 241, 0.25);margin-bottom:16px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:44px;height:44px;background:var(--brand-500);color:#FFFFFF;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
          💳
        </div>
        <div>
          <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 3px 0">Accounts & Billing Dashboard</h3>
          <p style="font-size:12.5px;color:var(--text-3);margin:0">Manage client billing schedules, generate tax invoices, track payment receipts, and monitor outstanding pending amounts.</p>
        </div>
      </div>
      <a href="/accounts" class="btn gold" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px">
        <span>Open Accounts Dashboard →</span>
      </a>
    </div>

    <!-- Proposal Studio & Rate Card Quick Link -->
    <div class="card" style="background:linear-gradient(135deg, rgba(15, 42, 74, 0.08) 0%, rgba(184, 137, 58, 0.12) 100%);border:1px solid rgba(184, 137, 58, 0.35);margin-bottom:28px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:44px;height:44px;background:#0F2A4A;color:#D4A657;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
          📜
        </div>
        <div>
          <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 3px 0">CI360 Proposal Studio & Rate Card</h3>
          <p style="font-size:12.5px;color:var(--text-3);margin:0">Build branded client proposals with automatic volume discount rate card pricing, and authorize sign-offs with secure Admin PIN approval.</p>
        </div>
      </div>
      <button onclick="window.ci360NavTab('proposals')" class="btn gold" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;">
        <span>Open Proposal Studio →</span>
      </button>
    </div>

    <section class="block">
      <h2>Roadmap Signals <span class="eyebrow">Auto-generated</span></h2>
      ${H.insights.length?H.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${Z(H.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${Z(H.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${H.personnel.filter(e=>e.status!=="inactive").map(be).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,Y()}function Z(t,a){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(s=>s[1]));return t.map(([s,n])=>`
    <div class="bar-row">
      <div>${escapeHtml(s)}</div>
      <div class="bar-track"><div class="bar-fill ${a?"gold":""}" style="width:${(n/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(n)}</div>
    </div>`).join("")}function be(t){const a=Math.min(t.utilization,160);return`
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px;">
        <span><strong>${escapeHtml(t.name)}</strong> <span class="muted">${escapeHtml(t.duties||"")}</span></span>
        <span><span class="badge ${t.cls}">${t.label}</span> &nbsp; ${t.utilization.toFixed(0)}%</span>
      </div>
      <div class="gauge-track">
        <div class="gauge-zone" style="left:0;width:25%;background:var(--blue-bg);"></div>
        <div class="gauge-zone" style="left:25%;width:30%;background:var(--green-bg);"></div>
        <div class="gauge-zone" style="left:55%;width:35%;background:var(--amber-bg);"></div>
        <div class="gauge-zone" style="left:90%;width:10%;background:var(--red-bg);"></div>
        <div class="gauge-fill" style="left:${Math.min(a/1.6,99)}%;"></div>
      </div>
    </div>`}function R(t){(!v.assignments||v.assignments.every(e=>!e.personId))&&(v.assignments=O());const a=v.assignments.reduce((e,s)=>e+(Number(s.percent)||0),0);t.innerHTML=`
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
                ${b.clients.map(e=>`<option value="${e._id}" ${e._id===v.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${v.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${v.completion||""}" placeholder="dd.mm.yyyy">
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
                ${b.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${v.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${v.serviceIds.map(e=>{const s=b.services.find(n=>n._id===e);return s?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(s.name)}
                      <span class="remove-service-tag" data-id="${s._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `:""}).join("")}
              </div>
            `:""}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="jValue" value="${v.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(v.desc||"")}</textarea>
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
              ${v.assignments.map((e,s)=>ye(e,s)).join("")}
            </div>
            <button class="btn ghost small" id="addAssignRow" type="button" style="margin-top:10px;">+ Add Team Member</button>
            <div style="margin-top:14px;">
              <div class="assign-total ${a!==100?"warn":""}">
                <span>${a===100?"✓":"⚠️"}</span>
                <span>${a}% of work allocated ${a!==100?"— should total 100%":"(100% Complete)"}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">4. Briefs &amp; File Attachments</h3>
          ${renderAttachmentUploader({id:"jAttachments",label:"Briefs & Reference Assets",subtitle:"Upload briefs, design mockups, agreements, logos or source files"})}
        </div>

        <div class="form-actions">
          <button class="btn ghost" id="clearJobBtn" type="button">Reset Draft</button>
          <button class="btn gold" id="saveJobBtn" type="button" style="padding:10px 28px;font-size:14px;">Save Job & Dispatch Notifications</button>
        </div>
      </div>
    </section>
  `,fe()}function ye(t,a){return`
    <div class="person-assign-row" data-idx="${a}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${b.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <input type="number" class="a-percent" value="${t.percent!=null?t.percent:""}" placeholder="100" min="0" max="100">
      </div>
      <div class="field">
        <input type="number" class="a-hours" value="${t.hours||""}" placeholder="e.g. 3.5" min="0" step="0.5">
      </div>
      <div style="display:flex;justify-content:center;">
        <button class="btn-remove-person a-remove" type="button" title="Remove person">✕</button>
      </div>
    </div>
  `}function fe(){const t=document.getElementById("jClient");t&&(t.onchange=c=>v.clientId=c.target.value);const a=document.getElementById("addNewClientBtn");a&&(a.onclick=()=>{const c=openModal(`
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
      `);c.querySelector("#mCancel").onclick=()=>c.remove(),c.querySelector("#mSave").onclick=async()=>{const y=c.querySelector("#newClientName").value.trim(),p=c.querySelector("#newClientNotes").value.trim();if(!y){flashToast("Client name is required",!0);return}try{const g=await apiPost("/clients",{name:y,notes:p});await M(),v.clientId=g._id,flashToast("Client added"),c.remove(),R(document.getElementById("content"))}catch(g){flashToast(g.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=c=>v.date=c.target.value);const s=document.getElementById("jCompletion");s&&(s.onchange=c=>v.completion=c.target.value);const n=document.getElementById("jService");n&&(n.onchange=c=>{const y=c.target.value;y&&(v.serviceIds.includes(y)||v.serviceIds.push(y),R(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(c=>{c.onclick=y=>{y.stopPropagation();const p=c.dataset.id;v.serviceIds=v.serviceIds.filter(g=>g!==p),R(document.getElementById("content"))}});const i=document.getElementById("addNewServiceBtn");i&&(i.onclick=()=>{const c=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);c.querySelector("#mCancel").onclick=()=>c.remove(),c.querySelector("#mSave").onclick=async()=>{const y=c.querySelector("#newServiceName").value.trim();if(!y){flashToast("Service name is required",!0);return}try{const p=await apiPost("/services",{name:y});await M(),v.serviceIds.includes(p._id)||v.serviceIds.push(p._id),flashToast("Service added"),c.remove(),R(document.getElementById("content"))}catch(p){flashToast(p.message,!0)}}});const o=document.getElementById("jDesc");o&&(o.oninput=c=>v.desc=c.target.value);const u=document.getElementById("jValue");u&&(u.oninput=c=>v.value=c.target.value),document.querySelectorAll(".person-assign-row").forEach(c=>{const y=Number(c.dataset.idx),p=c.querySelector(".a-person");p&&(p.onchange=m=>v.assignments[y].personId=m.target.value);const g=c.querySelector(".a-percent");g&&(g.oninput=m=>{v.assignments[y].percent=m.target.value,he()});const C=c.querySelector(".a-hours");C&&(C.oninput=m=>v.assignments[y].hours=m.target.value);const d=c.querySelector(".a-remove");d&&(d.onclick=()=>{v.assignments.length>1&&(v.assignments.splice(y,1),R(document.getElementById("content")))})});const x=document.getElementById("addAssignRow");x&&(x.onclick=()=>{v.assignments.push({personId:"",percent:0,hours:""}),R(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:v.attachments||[]});const $=document.getElementById("clearJobBtn");$&&($.onclick=()=>{v={title:"",assignments:O(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),R(document.getElementById("content"))});const A=document.getElementById("saveJobBtn");A&&(A.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!v.clientId){flashToast("Please select a client",!0);return}if(!v.serviceIds||!v.serviceIds.length){flashToast("Please select at least one service",!0);return}const c=v.assignments.filter(m=>m.personId);if(!c.length){flashToast("Please assign at least one person",!0);return}for(const m of c)if(m.hours===""||m.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const y=b.clients.find(m=>m._id===v.clientId),g=b.services.filter(m=>v.serviceIds.includes(m._id)).map(m=>m.name).join(", "),C=v.title||(y?`${y.name} — ${g||"Deliverable"}`:g||"Untitled Job"),d=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:C,clientId:v.clientId,serviceIds:v.serviceIds,date:v.date||new Date().toISOString().slice(0,10),completionDate:v.completion||null,value:Number(v.value)||0,description:v.desc||"",assignments:c,attachments:d}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),v={title:"",assignments:O(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},k.tab="jobs",f()}catch(c){flashToast(c.message,!0)}})}function he(){const t=v.assignments.reduce((e,s)=>e+(Number(s.percent)||0),0),a=document.querySelector(".assign-total");a&&(a.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,a.classList.toggle("warn",t!==100))}async function xe(t){let a=await apiGet("/jobs");a.sort((e,s)=>new Date(s.date)-new Date(e.date)),k.jobsFilter==="progress"&&(a=a.filter(e=>!e.completionDate)),k.jobsFilter==="done"&&(a=a.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${a.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${k.jobsFilter==="all"?"active":""}" data-jf="all">All</button>
        <button class="pchip ${k.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${k.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${a.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${a.map(e=>{const s=e.status==="Completed",n=(e.assignments||[]).map(u=>`${escapeHtml(re(u.personId))} (${u.percent}%)`).join(", "),i=(e.attachments||[]).length,o=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${i?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${i} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${i} Brief</span></button>`:""}
                  ${o?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${o} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${o} Work</span></button>`:""}
                  ${!i&&!o?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${s?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${s}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${s?"green":e.status==="Needs Revision"?"red":"amber"}">${s?"Completed":e.status==="Needs Revision"?"Needs Revision":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?'<span style="font-size:10px;font-weight:700;color:var(--red-500)">↺ Revision Req.</span>':""}
                </div>
              </td>
              <td>${escapeHtml(V(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(u=>`<span class="badge gray">${escapeHtml(u)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${n||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((u,x)=>u+(Number(x.hours)||0),0))}</td>
              <td style="text-align:right;white-space:nowrap;">
                <button class="btn ghost small view-job-files" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">📁 Files</button>
                <button class="btn ghost small edit-job" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">Assign / Edit</button>
                <button class="btn danger small del-job" data-id="${e._id}" style="padding:3px 8px;font-size:11px;">Delete</button>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table>
      </div>`}
    </section>
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{k.jobsFilter=e.dataset.jf,f()}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const s=e.dataset.id,n=a.find(x=>x._id===s);if(!n)return;const i=encodeURIComponent(JSON.stringify(n.attachments||[])),o=encodeURIComponent(JSON.stringify(n.deliverables||[])),u=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(n.title||"Untitled Job")}</div>
        </div>

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(n.attachments||[]).length})</h4>
          ${n.attachments&&n.attachments.length?`
            <div data-attachments="${i}">
              ${renderAttachmentChips(n.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(n.deliverables||[]).length})</h4>
          ${n.deliverables&&n.deliverables.length?`
            <div data-attachments="${o}">
              ${renderAttachmentChips(n.deliverables)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No completed deliverables attached yet.</div>'}
        </div>

        <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:14px;margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:6px">+ Upload Deliverables to Job</h4>
          <p style="font-size:11.5px;color:var(--text-3);margin-bottom:10px">Add completed artifacts, links, or finalized files for this job</p>
          <div class="field" style="margin-bottom:10px">
            <label>Deliverable Notes / Version description</label>
            <input type="text" id="mDelNote" placeholder="e.g. Final Video Cut v2 (color graded)" />
          </div>
          ${renderAttachmentUploader({id:"mDelUpload",label:"Upload Deliverable Files",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, or images"})}
          <button type="button" class="btn gold small" id="mDelSaveBtn" style="margin-top:10px">Save Deliverables to Job</button>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCloseFiles">Close</button>
        </div>
      `);bindAttachmentUploader("mDelUpload"),u.querySelector("#mDelSaveBtn").onclick=async()=>{const x=getUploaderAttachments("mDelUpload"),$=u.querySelector("#mDelNote").value.trim();if(!x.length){flashToast("Please select at least one deliverable file",!0);return}try{const A=x.map(c=>({...c,notes:$}));await apiPost(`/jobs/${s}/deliverables`,{deliverables:A}),flashToast("Deliverables added! 📦"),u.remove(),f()}catch(A){flashToast(A.message,!0)}},u.querySelector("#mCloseFiles").onclick=()=>u.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const s=e.dataset.id,n=a.find(i=>i._id===s);n&&we(n,()=>f())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const s=e.dataset.id,n=e.dataset.done==="false",i=a.find(u=>u._id===s);let o=i?i.completionDate:null;n&&!o&&(o=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+s,{status:n?"Completed":"In Progress",completionDate:o}),flashToast(n?"Job marked as Completed!":"Job marked as In Progress"),f()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),f())})}function we(t,a){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(r=>r._id||r):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(r=>({personId:String(r.personId._id||r.personId),percent:r.percent!=null?r.percent:0,hours:r.hours!=null?r.hours:0})):O()};function s(){return e.serviceIds.length?e.serviceIds.map(r=>{const w=b.services.find(D=>String(D._id)===String(r));return w?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(w.name)}
          <span class="m-remove-service" data-id="${w._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function n(){return e.assignments.map((r,w)=>`
      <div class="m-person-assign-row" data-idx="${w}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${b.personnel.map(D=>`<option value="${D._id}" ${String(D._id)===String(r.personId)?"selected":""}>${escapeHtml(D.name)}${D.duties?` (${escapeHtml(D.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${r.percent!=null?r.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${r.hours!=null?r.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div style="display:flex;justify-content:center;">
          <button class="btn-remove-person m-a-remove" type="button" title="Remove person" style="cursor:pointer;background:none;border:none;color:var(--red);font-weight:bold;font-size:16px;">✕</button>
        </div>
      </div>
    `).join("")}const i=openModal(`
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
        <input type="text" id="mEditTitle" value="${escapeHtml(e.title)}" placeholder="Job Title...">
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>CLIENT *</label>
          <select id="mEditClient">
            <option value="">Select client…</option>
            ${b.clients.map(r=>`<option value="${r._id}" ${String(r._id)===String(e.clientId)?"selected":""}>${escapeHtml(r.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>STATUS</label>
          <select id="mEditStatus">
            <option value="In Progress" ${e.status==="In Progress"?"selected":""}>In Progress</option>
            <option value="Completed" ${e.status==="Completed"?"selected":""}>Completed</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>START DATE *</label>
          <input type="date" id="mEditDate" value="${e.date}">
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>COMPLETION DATE</label>
          <input type="date" id="mEditCompletionDate" value="${e.completionDate}">
        </div>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>SERVICE(S) DELIVERED *</label>
        <select id="mEditServiceSelect">
          <option value="">Select service to add…</option>
          ${b.services.map(r=>`<option value="${r._id}">${escapeHtml(r.name)}</option>`).join("")}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${s()}
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>PRIORITY</label>
          <select id="mEditPriority">
            <option value="Medium" ${e.priority==="Medium"?"selected":""}>Medium</option>
            <option value="High" ${e.priority==="High"?"selected":""}>High</option>
            <option value="Urgent" ${e.priority==="Urgent"?"selected":""}>Urgent</option>
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>JOB VALUE (₹)</label>
          <input type="number" id="mEditValue" value="${e.value}" placeholder="0" min="0">
        </div>
      </div>

      <div class="field" style="margin-bottom:16px;">
        <label>DESCRIPTION / SCOPE</label>
        <textarea id="mEditDesc" style="height:70px;resize:vertical;" placeholder="Deliverable details...">${escapeHtml(e.description)}</textarea>
      </div>

      <!-- FILE ATTACHMENTS & DELIVERABLES -->
      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:16px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📎 Job Briefs &amp; Initial Assets</h4>
        ${renderAttachmentUploader({id:"mEditAttachments",label:"Brief Attachments",subtitle:"Upload briefs, design mockups, agreements or logos"})}
      </div>

      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📦 Completed Deliverables &amp; Output Files</h4>
        ${renderAttachmentUploader({id:"mEditDeliverables",label:"Finished Deliverables",subtitle:"Upload completed exports, videos, PSDs, PDFs, or spreadsheets"})}
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
          ${n()}
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
  `),o=i.querySelector(".modal");o&&(o.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const u=()=>{const r=e.assignments.reduce((D,z)=>D+(Number(z.percent)||0),0),w=i.querySelector("#mAssignTotalInfo");w&&(w.innerHTML=r===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${r}% Allocated (should be 100%)</span>`)},x=()=>{i.querySelectorAll(".m-remove-service").forEach(r=>{r.onclick=()=>{const w=r.dataset.id;e.serviceIds=e.serviceIds.filter(D=>String(D)!==String(w)),i.querySelector("#mEditServicesTags").innerHTML=s(),x()}})},$=()=>{i.querySelectorAll(".m-person-assign-row").forEach(r=>{const w=Number(r.dataset.idx),D=r.querySelector(".m-a-person");D&&(D.onchange=T=>e.assignments[w].personId=T.target.value);const z=r.querySelector(".m-a-percent");z&&(z.oninput=T=>{e.assignments[w].percent=T.target.value,u()});const l=r.querySelector(".m-a-hours");l&&(l.oninput=T=>e.assignments[w].hours=T.target.value);const S=r.querySelector(".m-a-remove");S&&(S.onclick=()=>{e.assignments.length>1?(e.assignments.splice(w,1),i.querySelector("#mEditAssignRows").innerHTML=n(),$(),u()):flashToast("Job must have at least one team member row",!0)})})},A=i.querySelector("#mCloseJobEdit"),c=i.querySelector("#mEditCancel");A&&(A.onclick=()=>i.remove()),c&&(c.onclick=()=>i.remove());const y=i.querySelector("#mEditTitle");y&&(y.oninput=r=>e.title=r.target.value);const p=i.querySelector("#mEditClient");p&&(p.onchange=r=>e.clientId=r.target.value);const g=i.querySelector("#mEditStatus");g&&(g.onchange=r=>e.status=r.target.value);const C=i.querySelector("#mEditDate");C&&(C.onchange=r=>e.date=r.target.value);const d=i.querySelector("#mEditCompletionDate");d&&(d.onchange=r=>e.completionDate=r.target.value);const m=i.querySelector("#mEditPriority");m&&(m.onchange=r=>e.priority=r.target.value);const N=i.querySelector("#mEditValue");N&&(N.oninput=r=>e.value=r.target.value);const P=i.querySelector("#mEditDesc");P&&(P.oninput=r=>e.description=r.target.value);const j=i.querySelector("#mEditServiceSelect");j&&(j.onchange=r=>{const w=r.target.value;w&&!e.serviceIds.map(String).includes(String(w))&&(e.serviceIds.push(w),i.querySelector("#mEditServicesTags").innerHTML=s(),x()),j.value=""}),x(),$(),u();const L=i.querySelector("#mAddAssignRow");L&&(L.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),i.querySelector("#mEditAssignRows").innerHTML=n(),$(),u()});const U=i.querySelector("#mEditSave");U&&(U.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const r=e.assignments.filter(I=>I.personId&&String(I.personId).trim()!=="");if(!r.length){flashToast("Please select at least one assigned team member",!0);return}for(const I of r)if(I.hours===""||I.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const w=b.clients.find(I=>String(I._id)===String(e.clientId)),z=b.services.filter(I=>e.serviceIds.map(String).includes(String(I._id))).map(I=>I.name).join(", "),l=e.title||(w?`${w.name} — ${z||"Deliverable"}`:z||"Untitled Job"),S=getUploaderAttachments("mEditAttachments"),T=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:l,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:r,attachments:S,deliverables:T});const B=r.map(I=>re(I.personId)).join(", ");flashToast("Job updated & saved! 📁"),i.remove(),a&&a()}catch(r){flashToast(r.message,!0)}finally{U.disabled=!1,U.textContent="Save & Update Assignments"}})}async function ke(t){H=await apiGet("/dashboard/admin?period="+k.period),t.innerHTML=`${Q()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${H.clients.map(a=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(a.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(a.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${a.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(a.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${a.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,Y()}async function de(t){H=await apiGet("/dashboard/admin?period="+k.period),t.innerHTML=`${Q()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${H.personnel.map(a=>{const e=(a.status||"active").toLowerCase(),s=a.personId||a._id;return`<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(a.name)}</strong></td><td class="muted">${escapeHtml(a.duties||"")}</td>
              <td>
                <select class="person-status-sel" data-id="${s}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
                  <option value="active" ${e==="active"?"selected":""}>🟢 Active</option>
                  <option value="work from home" ${e==="work from home"||e==="wfh"?"selected":""}>🏠 Work From Home</option>
                  <option value="on leave" ${e==="on leave"||e==="pn leave"?"selected":""}>🏖️ On Leave</option>
                </select>
              </td>
              <td class="num">${fmtHours(a.hours)}</td>
              <td class="num"><span class="badge ${a.cls}">${a.label}</span> ${a.utilization.toFixed(0)}%</td>
              <td class="num">${a.jobCount}</td><td class="num" style="padding-right:22px">${fmtINR(a.revenue)}</td>
            </tr>`}).join("")}</tbody></table>
        </div>
      </div>
    </section>`,Y(),document.querySelectorAll(".person-status-sel").forEach(a=>{a.onchange=async e=>{const s=a.dataset.id,n=e.target.value;try{await apiPut("/personnel/"+s,{status:n}),await M(),flashToast("Status updated to "+n),de(t)}catch(i){flashToast(i.message,!0)}}})}const F=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function $e(t){const a=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <h2>Accounts <span class="eyebrow">${a.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${F.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${a.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(V(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${F.map(s=>`<td>${escapeHtml(e.roles[s[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>ee(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>ee(a.find(s=>s._id===e.dataset.id)))}function ee(t){const a=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};F.forEach(n=>{e.roles[n[0]]==null&&(e.roles[n[0]]="")});const s=openModal(`
    <h3>${a?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${a?`<select id="rClient"><option value="">Select…</option>${b.clients.map(n=>`<option value="${n._id}">${escapeHtml(n.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(V(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${F.slice(0,5).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">${F.slice(5,10).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${a?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);s.querySelector("#mCancel").onclick=()=>s.remove(),a||(s.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),s.remove(),f())}),s.querySelector("#mSave").onclick=async()=>{const n={};s.querySelectorAll(".r-role").forEach(o=>n[o.dataset.key]=o.value.trim());const i={nature:s.querySelector("#rNature").value,roles:n,difficulty:Number(s.querySelector("#rDifficulty").value)||1,comments:s.querySelector("#rComments").value.trim()};try{if(a){const o=s.querySelector("#rClient").value;if(!o){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:o},i))}else await apiPut("/roster/"+e._id,i);s.remove(),f()}catch(o){flashToast(o.message,!0)}}}function Se(t){if(!t)return"Deliverables";const a={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return a[t]?a[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function Ie(t){const a=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
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
              ${a.map(s=>{var g,C;const n=((g=s.personId)==null?void 0:g.name)||"—",i=((C=s.serviceId)==null?void 0:C.name)||"—",o=Se(s.unit),u=e[s.period]||(s.period?s.period.toUpperCase():"Daily"),x=s.actual||0,$=s.quantity>0?x/s.quantity:0,A=Math.round($*100),c=$>=1?"green":$>=.6?"amber":"red",y=$>=1?"✓ Met":$>=.6?"Behind":"Off Pace",p=Math.min(A,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(n)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(i)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${s.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(o)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${u}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${x} / ${s.quantity} <span style="font-weight:500;color:var(--text-3)">(${A}%)</span></span>
                        <span class="badge ${c}" style="font-size:10px;padding:1px 5px">${y}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${p}%;height:100%;background:var(--${c==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${s._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${s._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`}).join("")||'<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,document.getElementById("addAdminTargetBtn").onclick=()=>te(null),document.querySelectorAll(".edit-target").forEach(s=>{s.onclick=()=>te(a.find(n=>n._id===s.dataset.id))}),document.querySelectorAll(".del-target").forEach(s=>{s.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+s.dataset.id),flashToast("Target removed"),f()}catch(n){flashToast(n.message,!0)}}})}function te(t){var A,c,y,p;const a=!t;t=t||{personId:(A=b.personnel[0])==null?void 0:A._id,serviceId:(c=b.services[0])==null?void 0:c._id,quantity:5,unit:"reels",period:"day"};const e=((y=t.personId)==null?void 0:y._id)||t.personId||"",s=((p=t.serviceId)==null?void 0:p._id)||t.serviceId||"",i=["reels","stories","posts","count","hours"].includes(t.unit),o=openModal(`
    <h3>${a?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${b.personnel.map(g=>`<option value="${g._id}" ${String(g._id)===String(e)?"selected":""}>${escapeHtml(g.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${b.services.map(g=>`<option value="${g._id}" ${String(g._id)===String(s)?"selected":""}>${escapeHtml(g.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Quantity *</label>
        <input type="number" id="mTgtQty" min="0.5" step="0.5" value="${t.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mTgtUnit">
          <option value="reels" ${i&&t.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${i&&t.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${i&&t.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${i&&t.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${i&&t.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${i?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>
    </div>

    <div class="field" id="mTgtCustomUnitWrap" style="margin-bottom:12px;display:${i?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${i?"":escapeHtml(t.unit||"")}">
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Target Frequency / Period *</label>
      <select id="mTgtPeriod">
        <option value="day" ${t.period==="day"?"selected":""}>Per Day</option>
        <option value="week" ${t.period==="week"?"selected":""}>Per Week</option>
        <option value="month" ${t.period==="month"?"selected":""}>Per Month</option>
      </select>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mTgtAttachments",label:"Reference Assets & Proofs",subtitle:"Upload reference materials, scripts, guidelines or proof examples"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save Target</button>
    </div>
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const u=o.querySelector("#mTgtUnit"),x=o.querySelector("#mTgtCustomUnitWrap"),$=o.querySelector("#mTgtCustomUnit");u.onchange=()=>{u.value==="custom"?(x.style.display="flex",$.focus()):x.style.display="none"},o.querySelector("#mCancel").onclick=()=>o.remove(),o.querySelector("#mSave").onclick=async()=>{let g=u.value;g==="custom"&&(g=$.value.trim()||"Deliverables");const C=getUploaderAttachments("mTgtAttachments"),d={personId:o.querySelector("#mTgtPerson").value,serviceId:o.querySelector("#mTgtService").value,quantity:Number(o.querySelector("#mTgtQty").value)||1,unit:g,period:o.querySelector("#mTgtPeriod").value,attachments:C};if(!d.personId||!d.serviceId){flashToast("Person and Service are required",!0);return}try{a?await apiPost("/targets",d):await apiPut("/targets/"+t._id,d),flashToast("Target saved successfully! 🎯"),o.remove(),f()}catch(m){flashToast(m.message,!0)}}}async function Ae(t){const[a,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);b.salaryGrades=a,b.salaryAssignments=e;const s={};e.forEach(n=>s[n.personId]=n.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${a.map(n=>`<div class="manage-item"><div><strong>${escapeHtml(n.label)}</strong><div class="muted">${fmtINR(n.min)} – ${fmtINR(n.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${n._id}">Edit</button><button class="btn danger small del-grade" data-id="${n._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${b.personnel.map(n=>`<tr><td><strong>${escapeHtml(n.name)}</strong><div class="muted">${escapeHtml(n.duties||"")}</div></td>
        <td><span class="badge green">${n.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${n._id}"><option value="">Not set</option>${a.map(i=>`<option value="${i._id}" ${s[n._id]===i._id?"selected":""}>${escapeHtml(i.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>ae(null),document.querySelectorAll(".edit-grade").forEach(n=>n.onclick=()=>ae(a.find(i=>i._id===n.dataset.id))),document.querySelectorAll(".del-grade").forEach(n=>n.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+n.dataset.id),f())}),document.querySelectorAll(".grade-select").forEach(n=>{n.onchange=async()=>{await apiPut("/salary/assignments/"+n.dataset.id,{gradeId:n.value||null}),flashToast("Saved")}})}function ae(t){const a=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${a?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!s.label){flashToast("Label required",!0);return}try{a?await apiPost("/salary/grades",s):await apiPut("/salary/grades/"+t._id,s),e.remove(),f()}catch(n){flashToast(n.message,!0)}}}function Te(t){const a={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${b.personnel.length})</h3>
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
              ${b.personnel.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td>${escapeHtml(i.duties||"—")}</td>
                  <td class="num"><strong>${i.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${a[i.status]||"green"}">${escapeHtml(i.status||"active")}</span></td>
                  <td class="num">
                    <button class="btn ghost small edit-person" data-id="${i._id}">Edit</button>
                    <button class="btn danger small del-person" data-id="${i._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="5"><div class="empty">No personnel added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Clients Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${b.clients.length})</h3>
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
              ${b.clients.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td>${i.notes?escapeHtml(i.notes):'<span class="muted">—</span>'}</td>
                  <td class="num">
                    <button class="btn ghost small edit-client" data-id="${i._id}">Edit</button>
                    <button class="btn danger small del-client" data-id="${i._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No clients added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Services Section -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${b.services.length})</h3>
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
              ${b.services.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td class="num"><strong>${i.hours||0} hrs</strong> baseline</td>
                  <td class="num">
                    <button class="btn ghost small edit-service" data-id="${i._id}">Edit</button>
                    <button class="btn danger small del-service" data-id="${i._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No services added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>se(null)),document.querySelectorAll(".edit-person").forEach(i=>i.onclick=()=>se(b.personnel.find(o=>o._id===i.dataset.id))),document.querySelectorAll(".del-person").forEach(i=>i.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+i.dataset.id),await M(),f())});const s=document.getElementById("addClientBtn");s&&(s.onclick=()=>ie(null)),document.querySelectorAll(".edit-client").forEach(i=>i.onclick=()=>ie(b.clients.find(o=>o._id===i.dataset.id))),document.querySelectorAll(".del-client").forEach(i=>i.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+i.dataset.id),await M(),f())});const n=document.getElementById("addServiceBtn");n&&(n.onclick=()=>ne(null)),document.querySelectorAll(".edit-service").forEach(i=>i.onclick=()=>ne(b.services.find(o=>o._id===i.dataset.id))),document.querySelectorAll(".del-service").forEach(i=>i.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+i.dataset.id),await M(),f())})}const Ce=Te;function se(t){const a=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Person</h3>
    <div class="field"><label>Full Name *</label><input id="mName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Shatayu Verma"></div>
    <div class="field"><label>Duties / Role</label><input id="mDuties" type="text" value="${escapeHtml(t.duties)}" placeholder="e.g. Lead Designer / Frontend"></div>
    <div class="log-job-row" style="margin-bottom:16px;">
      <div class="field" style="margin-bottom:0;"><label>Weekly Capacity (hrs)</label><input id="mCapacity" type="number" value="${t.capacity||48}"></div>
      <div class="field" style="margin-bottom:0;"><label>Status</label><select id="mStatus">
        <option value="active" ${t.status==="active"?"selected":""}>Active</option>
        <option value="work from home" ${t.status==="work from home"||t.status==="wfh"?"selected":""}>Work From Home</option>
        <option value="on leave" ${t.status==="on leave"||t.status==="pn leave"?"selected":""}>On Leave</option>
        <option value="inactive" ${t.status==="inactive"?"selected":""}>Inactive</option>
      </select></div>
    </div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mPersonFiles",label:"Documents & Contracts",subtitle:"Upload resumes, ID proofs, employment contracts or certificates"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Person</button></div>
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s=getUploaderAttachments("mPersonFiles"),n={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:s};if(!n.name){flashToast("Name is required",!0);return}try{a?await apiPost("/personnel",n):await apiPut("/personnel/"+t._id,n),await M(),flashToast("Person saved! 📁"),e.remove(),f()}catch(i){flashToast(i.message,!0)}}}function ie(t){const a=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s=getUploaderAttachments("mClientFiles"),n={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:s};if(!n.name){flashToast("Name is required",!0);return}try{a?await apiPost("/clients",n):await apiPut("/clients/"+t._id,n),await M(),flashToast("Client saved! 📁"),e.remove(),f()}catch(i){flashToast(i.message,!0)}}}function ne(t){const a=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!s.name){flashToast("Name is required",!0);return}try{a?await apiPost("/services",s):await apiPut("/services/"+t._id,s),await M(),e.remove(),f()}catch(n){flashToast(n.message,!0)}}}async function ce(t){const a=await apiGet("/users");let e="all",s="role",n="";function i(){let p=[...a];if(n){const d=n.toLowerCase();p=p.filter(m=>m.name&&m.name.toLowerCase().includes(d)||m.email&&m.email.toLowerCase().includes(d)||m.role&&m.role.toLowerCase().includes(d))}e==="admin"?p=p.filter(d=>d.role==="superadmin"||d.role==="admin"):e==="accounts"?p=p.filter(d=>d.role==="accounts"):e==="employee"?p=p.filter(d=>d.role==="employee"):e==="client"&&(p=p.filter(d=>d.role==="client"));const g={superadmin:1,admin:1,accounts:2,employee:3,client:4};s==="role"?p.sort((d,m)=>{const N=g[d.role]||9,P=g[m.role]||9;return N!==P?N-P:(d.name||"").localeCompare(m.name||"")}):s==="role-desc"?p.sort((d,m)=>{const N=g[d.role]||9,P=g[m.role]||9;return N!==P?P-N:(d.name||"").localeCompare(m.name||"")}):s==="name-asc"?p.sort((d,m)=>(d.name||"").localeCompare(m.name||"")):s==="name-desc"?p.sort((d,m)=>(m.name||"").localeCompare(d.name||"")):s==="status"&&p.sort((d,m)=>(m.active?1:0)-(d.active?1:0));const C=t.querySelector("#userTableBody");if(C){if(p.length===0){C.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}C.innerHTML=p.map(d=>{const m=d.role==="superadmin"||d.role==="admin",N=d.role==="accounts",P=d.role==="employee",j=m?'<span class="badge gold" style="font-weight:700">👑 Admin</span>':N?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':P?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',L=d.personnelId?escapeHtml(d.personnelId.name):d.clientId?escapeHtml(d.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(d.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(d.email)}</span></td>
          <td>${j}</td>
          <td>${L}</td>
          <td><span class="badge ${d.active?"green":"gray"}">${d.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${d._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${d._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),C.querySelectorAll(".edit-user").forEach(d=>d.onclick=()=>le(a.find(m=>m._id===d.dataset.id))),C.querySelectorAll(".del-user").forEach(d=>d.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+d.dataset.id),flashToast("User removed"),ce(t)}catch(m){flashToast(m.message,!0)}})}}const o=a.filter(p=>p.role==="superadmin"||p.role==="admin").length,u=a.filter(p=>p.role==="accounts").length,x=a.filter(p=>p.role==="employee").length,$=a.filter(p=>p.role==="client").length;t.innerHTML=`
    <section class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0">User Accounts</h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Manage system login credentials for administrators, accounts, employees, and clients.</p>
        </div>
        <button class="btn gold small" id="addUserBtn" type="button">+ Add User</button>
      </div>

      <!-- Controls: Filter Chips, Search, Sort Dropdown -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <!-- Filter Tabs -->
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="pchip active user-role-filter" data-role="all">All (${a.length})</button>
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${o})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${u})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${x})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${$})</button>
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
    </section>`,i(),t.querySelectorAll(".user-role-filter").forEach(p=>{p.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(g=>g.classList.remove("active")),p.classList.add("active"),e=p.dataset.role,i()}});const A=t.querySelector("#userSortSel");A&&(A.onchange=()=>{s=A.value,i()});const c=t.querySelector("#userSearchInp");c&&(c.oninput=()=>{n=c.value.trim(),i()});const y=t.querySelector("#addUserBtn");y&&(y.onclick=()=>le(null))}function le(t){const a=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,s=openModal(`<h3>${a?"Add":"Edit"} User</h3>
    <div class="field-row">
      <div class="field"><label>Name</label><input id="uName" type="text" value="${escapeHtml(t.name)}"></div>
      <div class="field"><label>Email</label><input id="uEmail" type="email" value="${escapeHtml(t.email)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Role</label><select id="uRole">
        <option value="superadmin" ${e==="superadmin"?"selected":""}>Admin</option>
        <option value="accounts" ${e==="accounts"?"selected":""}>Accounts & Finance</option>
        <option value="employee" ${e==="employee"?"selected":""}>Employee</option>
        <option value="client" ${e==="client"?"selected":""}>Client</option></select></div>
      <div class="field"><label>Password ${a?"":"(leave blank to keep current)"}</label><input id="uPassword" type="password"></div>
    </div>
    <div class="field" id="uLinkWrap"></div>
    <div class="field"><label><input type="checkbox" id="uActive" ${t.active?"checked":""}> Active</label></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function n(){const i=s.querySelector("#uRole").value,o=s.querySelector("#uLinkWrap");i==="employee"?o.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${b.personnel.map(u=>`<option value="${u._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:i==="client"?o.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${b.clients.map(u=>`<option value="${u._id}" ${t.clientId&&(t.clientId._id||t.clientId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:o.innerHTML=""}s.querySelector("#uRole").onchange=n,n(),s.querySelector("#mCancel").onclick=()=>s.remove(),s.querySelector("#mSave").onclick=async()=>{var x,$;const i=s.querySelector("#uRole").value,o={name:s.querySelector("#uName").value.trim(),email:s.querySelector("#uEmail").value.trim(),role:i,active:s.querySelector("#uActive").checked,personnelId:i==="employee"&&((x=s.querySelector("#uPersonnel"))==null?void 0:x.value)||null,clientId:i==="client"&&(($=s.querySelector("#uClient"))==null?void 0:$.value)||null},u=s.querySelector("#uPassword").value;if(u&&(o.password=u),!o.name||!o.email){flashToast("Name and email required",!0);return}if(a&&!u){flashToast("Password required for a new user",!0);return}try{a?await apiPost("/users",o):await apiPut("/users/"+t._id,o),s.remove(),f()}catch(A){flashToast(A.message,!0)}}}let h={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};function oe(t,a){let e;if(!t||t==="all")e=new Date;else{const o=t.split("-");o.length===3?e=new Date(Number(o[0]),Number(o[1])-1,Number(o[2])):e=new Date}e.setDate(e.getDate()+a);const s=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${s}-${n}-${i}`}async function pe(t){const[a,e]=await Promise.all([apiGet("/tasks"),apiGet("/personnel").catch(()=>b.personnel||[])]),s=new Date,n=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`,i=h.date;let o=a;i!=="all"&&(o=a.filter(l=>l.dueDate?new Date(l.dueDate).toISOString().slice(0,10)===i:i===n));let u=o;h.personnelId!=="all"&&(u=u.filter(l=>{var T;const S=((T=l.personnelId)==null?void 0:T._id)||l.personnelId;return String(S)===String(h.personnelId)}));const x=u.length,$=u.filter(l=>l.status==="Completed").length,A=x-$,c=x>0?Math.round($/x*100):0;let y=u;if(h.filter==="active"?y=y.filter(l=>l.status!=="Completed"):h.filter==="completed"&&(y=y.filter(l=>l.status==="Completed")),h.search){const l=h.search.toLowerCase();y=y.filter(S=>{var I,E;const T=(((I=S.personnelId)==null?void 0:I.name)||((E=S.userId)==null?void 0:E.name)||"").toLowerCase(),B=(S.title||"").toLowerCase();return T.includes(l)||B.includes(l)})}const p={};y.forEach(l=>{var I,E,_,q,K,X;const S=((I=l.personnelId)==null?void 0:I._id)||((E=l.userId)==null?void 0:E._id)||"unknown",T=((_=l.personnelId)==null?void 0:_.name)||((q=l.userId)==null?void 0:q.name)||"Unassigned Employee",B=((K=l.personnelId)==null?void 0:K.department)||((X=l.personnelId)==null?void 0:X.role)||"Team Member";p[S]||(p[S]={id:S,name:T,dept:B,tasks:[]}),p[S].tasks.push(l)});const g=Object.values(p),C=i===n;t.innerHTML=`
    <div class="block">
      <!-- Top Title & Navigation Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;display:flex;align-items:center;gap:8px">
            <span>Employee Daily Tasks</span>
            <span class="eyebrow">${x} total tasks</span>
          </h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Live employee daily checklist activity, real-time completion tracking, and submissions</p>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="admDailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${C?"primary":"ghost"} small" id="admDailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="admDailyDatePickerInp" class="daily-date-picker-inp" value="${i==="all"?n:i}">

          <button type="button" class="daily-nav-arrow" id="admDailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${i==="all"?"gold":"ghost"} small" id="admDailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Daily Tasks</span><div class="kpi-icon">📝</div></div>
          <div class="kpi-value">${x}</div>
          <div class="kpi-sub">${i==="all"?"Across all dates":C?"Logged for today":i}</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Completed Tasks</span><div class="kpi-icon">✅</div></div>
          <div class="kpi-value" style="color:var(--green-600)">${$}</div>
          <div class="kpi-sub">${c}% achievement rate</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Pending / To Do</span><div class="kpi-icon">⏳</div></div>
          <div class="kpi-value" style="color:var(--amber-600)">${A}</div>
          <div class="kpi-sub">Items in progress</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Team Members</span><div class="kpi-icon">👥</div></div>
          <div class="kpi-value">${g.length}</div>
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
              ${e.filter(l=>l.status!=="inactive").map(l=>`
                <option value="${l._id}" ${h.personnelId===l._id?"selected":""}>${escapeHtml(l.name)} (${l.role||l.department||"Staff"})</option>
              `).join("")}
            </select>
          </div>
          <div style="width:135px">
            <input type="date" id="admDailyAssignDate" value="${i==="all"?n:i}" style="width:100%;padding:7px 10px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:12px;outline:none" />
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
            <button class="pchip ${h.filter==="all"?"active":""}" data-atf="all">All (${x})</button>
            <button class="pchip ${h.filter==="active"?"active":""}" data-atf="active">Pending (${A})</button>
            <button class="pchip ${h.filter==="completed"?"active":""}" data-atf="completed">✓ Completed (${$})</button>
          </div>

          <!-- Right: Employee Picker & Search -->
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:12px;font-weight:700;color:var(--text-3)">Employee:</span>
              <select id="admTaskPersonFilter" style="font-size:12.5px;padding:6px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);outline:none">
                <option value="all" ${h.personnelId==="all"?"selected":""}>All Employees (${e.length})</option>
                ${e.map(l=>`
                  <option value="${l._id}" ${h.personnelId===l._id?"selected":""}>${escapeHtml(l.name)} (${l.role||l.department||"Staff"})</option>
                `).join("")}
              </select>
            </div>

            <div class="ticket-search-box" style="margin:0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="admTaskSearchInp" placeholder="Search tasks or employee…" value="${escapeHtml(h.search)}" style="font-size:12px;padding:5px 8px">
              ${h.search?'<button type="button" id="admTaskClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
            </div>

            ${$>0?`
              <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('all')" style="font-size:11.5px;color:var(--text-3);padding:5px 10px" title="Delete all completed tasks in this view">
                🗑️ Clear Completed (${$})
              </button>
            `:""}
          </div>
        </div>
      </div>

      <!-- Employee Task Groups List -->
      ${g.length===0?`
        <div class="card" style="text-align:center;padding:56px 20px">
          <div style="font-size:40px;margin-bottom:10px">📋</div>
          <div style="font-weight:700;font-size:16px;color:var(--text-1);margin-bottom:4px">No daily tasks found</div>
          <div style="font-size:13px;color:var(--text-3);max-width:380px;margin:0 auto">No tasks have been entered for this date. You can assign tasks using the form above, or wait for employees to add checklist items.</div>
        </div>
      `:`
        <div style="display:flex;flex-direction:column;gap:18px">
          ${g.map(l=>{const S=l.tasks.length,T=l.tasks.filter(E=>E.status==="Completed").length,B=S>0?Math.round(T/S*100):0,I=S>0&&T===S;return`
              <div class="daily-checklist-card">
                <!-- Employee Header Banner -->
                <div style="padding:16px 20px;background:var(--bg-surface);border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:50%;background:var(--brand-500);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px">
                      ${l.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style="font-size:15px;font-weight:800;color:var(--text-1);line-height:1.2">${escapeHtml(l.name)}</div>
                      <div style="font-size:11.5px;color:var(--text-3)">${escapeHtml(l.dept)}</div>
                    </div>
                  </div>

                  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <span style="font-size:12.5px;font-weight:700;color:${I?"var(--green-600)":"var(--text-2)"}">
                      ${T} of ${S} completed (${B}%)
                    </span>
                    <div style="width:100px;height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
                      <div style="width:${B}%;height:100%;background:${I?"var(--green-500)":"var(--brand-500)"};transition:width 0.4s ease"></div>
                    </div>
                    <button type="button" class="btn ghost small" onclick="adminQuickAddTaskForEmp('${l.id}')" style="font-size:11.5px;color:var(--brand-500);padding:3px 8px;font-weight:700" title="Add a task for this employee">
                      + Add Task
                    </button>
                    ${T>0?`
                      <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('${l.id}')" style="font-size:11px;color:var(--text-3);padding:3px 7px" title="Delete completed tasks for this employee">
                        Clear Done (${T})
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Employee Checklist Items -->
                <div>
                  ${l.tasks.map(E=>{const _=E.status==="Completed",q=E.dueDate?new Date(E.dueDate).toISOString().slice(0,10):"";return`
                      <div class="daily-item-row ${_?"completed":""}" style="padding:12px 20px">
                        <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                          <button type="button" class="daily-circle-check ${_?"checked":""}" onclick="adminToggleTask('${E._id}')" title="${_?"Mark Incomplete":"Mark Complete"}">
                            ✓
                          </button>
                          <div style="flex:1">
                            <span class="daily-item-text" style="cursor:pointer" onclick="adminToggleTask('${E._id}')">
                              ${escapeHtml(E.title)}
                            </span>
                            ${E.description?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${escapeHtml(E.description)}</div>`:""}
                          </div>
                        </div>

                        <div class="daily-actions-hover" style="opacity:1">
                          ${q?`<span class="task-tag-pill" style="font-size:10.5px">📅 ${q===n?"Today":q}</span>`:""}
                          ${E.completedAt?'<span class="task-tag-pill" style="color:var(--green-600);background:rgba(16,185,129,0.1);font-size:10.5px">Done</span>':""}
                          <button type="button" class="btn ghost small" onclick="adminEditTask('${E._id}')" title="Edit this task" style="padding:3px 7px;font-size:11.5px">✏️</button>
                          <button type="button" class="btn ghost small" onclick="adminDeleteTask('${E._id}')" title="Delete this task" style="padding:3px 7px;font-size:11.5px;color:var(--red-500)">🗑️</button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `;const d=document.getElementById("admDailyPrevDayBtn");d&&(d.onclick=()=>{h.date=oe(h.date,-1),f()});const m=document.getElementById("admDailyNextDayBtn");m&&(m.onclick=()=>{h.date=oe(h.date,1),f()});const N=document.getElementById("admDailyTodayBtn");N&&(N.onclick=()=>{h.date=n,f()});const P=document.getElementById("admDailyAllDatesBtn");P&&(P.onclick=()=>{h.date=h.date==="all"?n:"all",f()});const j=document.getElementById("admDailyDatePickerInp");j&&(j.onchange=l=>{l.target.value&&(h.date=l.target.value,f())}),document.querySelectorAll("[data-atf]").forEach(l=>{l.onclick=()=>{h.filter=l.dataset.atf,f()}});const L=document.getElementById("admTaskPersonFilter");L&&(L.onchange=l=>{h.personnelId=l.target.value,f()});const U=document.getElementById("admTaskSearchInp");U&&(U.oninput=l=>{h.search=l.target.value,pe(t)});const r=document.getElementById("admTaskClearSearch");r&&(r.onclick=()=>{h.search="",f()});const w=document.getElementById("admDailyTaskInp"),D=document.getElementById("admDailyAddBtn"),z=async()=>{const l=((w==null?void 0:w.value)||"").trim();if(!l){flashToast("Please enter a task title",!0);return}const S=document.getElementById("admDailyAssignSelect"),T=document.getElementById("admDailyAssignDate"),B=document.getElementById("admDailyAssignPriority"),I=(S==null?void 0:S.value)||"all",E=(T==null?void 0:T.value)||(h.date==="all"?n:h.date),_=(B==null?void 0:B.value)||"Medium";try{const q={title:l,dueDate:E,priority:_,status:"Todo"};I==="all"?(q.assignAll=!0,q.personnelId="all"):q.personnelId=I,await apiPost("/tasks",q),flashToast(I==="all"?"Task assigned to all active employees! 👥":"Task assigned! ✍️"),w&&(w.value="",w.focus()),f()}catch(q){flashToast(q.message,!0)}};D&&(D.onclick=z),w&&(w.onkeydown=l=>{l.key==="Enter"&&z()})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),f()}catch(a){flashToast(a.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(n=>n._id===t);if(!e)return;const s=prompt("Edit task title:",e.title);s!==null&&s.trim()&&(await apiPut("/tasks/"+t,{title:s.trim()}),flashToast("Task updated"),f())}catch(a){flashToast(a.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const a=prompt("Enter task for this employee:");if(!(!a||!a.trim()))try{const e=new Date,s=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,n=h.date==="all"?s:h.date;await apiPost("/tasks",{title:a.trim(),personnelId:t,dueDate:n,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),f()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),f()}catch(a){flashToast(a.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const a={date:h.date};t&&t!=="all"?a.personnelId=t:h.personnelId&&h.personnelId!=="all"&&(a.personnelId=h.personnelId);const e=await apiPost("/tasks/clear-completed",a);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),f()}catch(a){flashToast(a.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,a=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!a&&!e&&k.tab!=="logjob"&&f()});ue();
