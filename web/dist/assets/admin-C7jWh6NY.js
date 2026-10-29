import{l as me,m as ue}from"./api-PUOyZZL0.js";import{initProposalStudio as ve}from"./proposals-CUHSOedE.js";let V=null,h={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},z=null,k={tab:"dashboard",period:"month",jobsFilter:"all"},g={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function ge(){initTheme(),V=requireAuth("superadmin"),V&&(await H(),J())}async function H(){const[t,a,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);h.personnel=t,h.clients=a,h.services=e}function O(){const t=h.personnel.find(s=>/mansi/i.test(s.name)),a=h.personnel.find(s=>/urna/i.test(s.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),a&&e.push({personId:a._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function re(t){const a=h.personnel.find(e=>e._id===t);return a?a.name:"—"}function W(t){const a=h.clients.find(e=>e._id===t);return a?a.name:"—"}const G=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"billing_dashboard",label:"Accounts Dashboard",icon:"💳"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"archive",label:"DB Archive",icon:"🗄️"},{key:"manage",label:"Settings & Manage",icon:"⚙️"}];function J(){const t=document.getElementById("app"),a=G.find(e=>e.key===k.tab)||G[0];t.innerHTML=renderAppShell({user:V,currentRole:"superadmin",activeTab:k.tab,tabs:G,title:a.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{k.tab=e,J()}),f()}window.ci360NavTab=t=>{k.tab=t,J()};async function f(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(4);try{if(k.tab==="dashboard")await ye(t);else if(k.tab==="dailytasks")await pe(t);else if(k.tab==="proposals")await be(t);else if(k.tab==="logjob")L(t);else if(k.tab==="jobs")await $e(t);else if(k.tab==="byclient")await Se(t);else if(k.tab==="byperson")await de(t);else if(k.tab==="accounts")await Ae(t);else if(k.tab==="billing_dashboard"){window.location.href="/accounts";return}else k.tab==="targets"?await Ie(t):k.tab==="salaries"?await Ce(t):k.tab==="archive"?await Pe(t):k.tab==="settings"||k.tab==="manage"?Ee(t):k.tab==="users"&&await ce(t)}catch(a){t.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(a.message)}</div>`}}}async function be(t){t.innerHTML='<div id="proposals-module-root"></div>';const a=t.querySelector("#proposals-module-root");ve(a)}function Q(){return renderPeriodPicker(k.period)}function Y(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{k.period=t.dataset.period,f()}})}async function ye(t){z=await apiGet("/dashboard/admin?period="+k.period);const a=z.overview;t.innerHTML=`
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
      ${z.insights.length?z.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${Z(z.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${Z(z.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${z.personnel.filter(e=>e.status!=="inactive").map(he).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,Y()}function Z(t,a){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(s=>s[1]));return t.map(([s,i])=>`
    <div class="bar-row">
      <div>${escapeHtml(s)}</div>
      <div class="bar-track"><div class="bar-fill ${a?"gold":""}" style="width:${(i/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(i)}</div>
    </div>`).join("")}function he(t){const a=Math.min(t.utilization,160);return`
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
    </div>`}function L(t){(!g.assignments||g.assignments.every(e=>!e.personId))&&(g.assignments=O());const a=g.assignments.reduce((e,s)=>e+(Number(s.percent)||0),0);t.innerHTML=`
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
                ${h.clients.map(e=>`<option value="${e._id}" ${e._id===g.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${g.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${g.completion||""}" placeholder="dd.mm.yyyy">
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
                ${h.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${g.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${g.serviceIds.map(e=>{const s=h.services.find(i=>i._id===e);return s?`
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
            <input type="number" id="jValue" value="${g.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(g.desc||"")}</textarea>
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
              ${g.assignments.map((e,s)=>fe(e,s)).join("")}
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
  `,xe()}function fe(t,a){return`
    <div class="person-assign-row" data-idx="${a}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${h.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
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
  `}function xe(){const t=document.getElementById("jClient");t&&(t.onchange=u=>g.clientId=u.target.value);const a=document.getElementById("addNewClientBtn");a&&(a.onclick=()=>{const u=openModal(`
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
      `);u.querySelector("#mCancel").onclick=()=>u.remove(),u.querySelector("#mSave").onclick=async()=>{const y=u.querySelector("#newClientName").value.trim(),p=u.querySelector("#newClientNotes").value.trim();if(!y){flashToast("Client name is required",!0);return}try{const b=await apiPost("/clients",{name:y,notes:p});await H(),g.clientId=b._id,flashToast("Client added"),u.remove(),L(document.getElementById("content"))}catch(b){flashToast(b.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=u=>g.date=u.target.value);const s=document.getElementById("jCompletion");s&&(s.onchange=u=>g.completion=u.target.value);const i=document.getElementById("jService");i&&(i.onchange=u=>{const y=u.target.value;y&&(g.serviceIds.includes(y)||g.serviceIds.push(y),L(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(u=>{u.onclick=y=>{y.stopPropagation();const p=u.dataset.id;g.serviceIds=g.serviceIds.filter(b=>b!==p),L(document.getElementById("content"))}});const l=document.getElementById("addNewServiceBtn");l&&(l.onclick=()=>{const u=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);u.querySelector("#mCancel").onclick=()=>u.remove(),u.querySelector("#mSave").onclick=async()=>{const y=u.querySelector("#newServiceName").value.trim();if(!y){flashToast("Service name is required",!0);return}try{const p=await apiPost("/services",{name:y});await H(),g.serviceIds.includes(p._id)||g.serviceIds.push(p._id),flashToast("Service added"),u.remove(),L(document.getElementById("content"))}catch(p){flashToast(p.message,!0)}}});const n=document.getElementById("jDesc");n&&(n.oninput=u=>g.desc=u.target.value);const m=document.getElementById("jValue");m&&(m.oninput=u=>g.value=u.target.value),document.querySelectorAll(".person-assign-row").forEach(u=>{const y=Number(u.dataset.idx),p=u.querySelector(".a-person");p&&(p.onchange=v=>g.assignments[y].personId=v.target.value);const b=u.querySelector(".a-percent");b&&(b.oninput=v=>{g.assignments[y].percent=v.target.value,we()});const r=u.querySelector(".a-hours");r&&(r.oninput=v=>g.assignments[y].hours=v.target.value);const o=u.querySelector(".a-remove");o&&(o.onclick=()=>{g.assignments.length>1&&(g.assignments.splice(y,1),L(document.getElementById("content")))})});const $=document.getElementById("addAssignRow");$&&($.onclick=()=>{g.assignments.push({personId:"",percent:0,hours:""}),L(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:g.attachments||[]});const w=document.getElementById("clearJobBtn");w&&(w.onclick=()=>{g={title:"",assignments:O(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),L(document.getElementById("content"))});const A=document.getElementById("saveJobBtn");A&&(A.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!g.clientId){flashToast("Please select a client",!0);return}if(!g.serviceIds||!g.serviceIds.length){flashToast("Please select at least one service",!0);return}const u=g.assignments.filter(v=>v.personId);if(!u.length){flashToast("Please assign at least one person",!0);return}for(const v of u)if(v.hours===""||v.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const y=h.clients.find(v=>v._id===g.clientId),b=h.services.filter(v=>g.serviceIds.includes(v._id)).map(v=>v.name).join(", "),r=g.title||(y?`${y.name} — ${b||"Deliverable"}`:b||"Untitled Job"),o=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:r,clientId:g.clientId,serviceIds:g.serviceIds,date:g.date||new Date().toISOString().slice(0,10),completionDate:g.completion||null,value:Number(g.value)||0,description:g.desc||"",assignments:u,attachments:o}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),g={title:"",assignments:O(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},k.tab="jobs",f()}catch(u){flashToast(u.message,!0)}})}function we(){const t=g.assignments.reduce((e,s)=>e+(Number(s.percent)||0),0),a=document.querySelector(".assign-total");a&&(a.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,a.classList.toggle("warn",t!==100))}async function $e(t){let a=await apiGet("/jobs");a.sort((e,s)=>new Date(s.date)-new Date(e.date)),k.jobsFilter==="progress"&&(a=a.filter(e=>!e.completionDate)),k.jobsFilter==="done"&&(a=a.filter(e=>e.completionDate)),t.innerHTML=`
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
          ${a.map(e=>{const s=e.status==="Completed",i=(e.assignments||[]).map(m=>`${escapeHtml(re(m.personId))} (${m.percent}%)`).join(", "),l=(e.attachments||[]).length,n=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${l?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${l} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${l} Brief</span></button>`:""}
                  ${n?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${n} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${n} Work</span></button>`:""}
                  ${!l&&!n?'<span class="muted" style="font-size:11px">—</span>':""}
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
              <td>${escapeHtml(W(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(m=>`<span class="badge gray">${escapeHtml(m)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${i||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((m,$)=>m+(Number($.hours)||0),0))}</td>
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
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{k.jobsFilter=e.dataset.jf,f()}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const s=e.dataset.id,i=a.find($=>$._id===s);if(!i)return;const l=encodeURIComponent(JSON.stringify(i.attachments||[])),n=encodeURIComponent(JSON.stringify(i.deliverables||[])),m=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i.title||"Untitled Job")}</div>
        </div>

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(i.attachments||[]).length})</h4>
          ${i.attachments&&i.attachments.length?`
            <div data-attachments="${l}">
              ${renderAttachmentChips(i.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(i.deliverables||[]).length})</h4>
          ${i.deliverables&&i.deliverables.length?`
            <div data-attachments="${n}">
              ${renderAttachmentChips(i.deliverables)}
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
      `);bindAttachmentUploader("mDelUpload"),m.querySelector("#mDelSaveBtn").onclick=async()=>{const $=getUploaderAttachments("mDelUpload"),w=m.querySelector("#mDelNote").value.trim();if(!$.length){flashToast("Please select at least one deliverable file",!0);return}try{const A=$.map(u=>({...u,notes:w}));await apiPost(`/jobs/${s}/deliverables`,{deliverables:A}),flashToast("Deliverables added! 📦"),m.remove(),f()}catch(A){flashToast(A.message,!0)}},m.querySelector("#mCloseFiles").onclick=()=>m.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const s=e.dataset.id,i=a.find(l=>l._id===s);i&&ke(i,()=>f())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const s=e.dataset.id,i=e.dataset.done==="false",l=a.find(m=>m._id===s);let n=l?l.completionDate:null;i&&!n&&(n=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+s,{status:i?"Completed":"In Progress",completionDate:n}),flashToast(i?"Job marked as Completed!":"Job marked as In Progress"),f()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),f())})}function ke(t,a){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(c=>c._id||c):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(c=>({personId:String(c.personId._id||c.personId),percent:c.percent!=null?c.percent:0,hours:c.hours!=null?c.hours:0})):O()};function s(){return e.serviceIds.length?e.serviceIds.map(c=>{const S=h.services.find(P=>String(P._id)===String(c));return S?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(S.name)}
          <span class="m-remove-service" data-id="${S._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function i(){return e.assignments.map((c,S)=>`
      <div class="m-person-assign-row" data-idx="${S}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${h.personnel.map(P=>`<option value="${P._id}" ${String(P._id)===String(c.personId)?"selected":""}>${escapeHtml(P.name)}${P.duties?` (${escapeHtml(P.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${c.percent!=null?c.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${c.hours!=null?c.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div style="display:flex;justify-content:center;">
          <button class="btn-remove-person m-a-remove" type="button" title="Remove person" style="cursor:pointer;background:none;border:none;color:var(--red);font-weight:bold;font-size:16px;">✕</button>
        </div>
      </div>
    `).join("")}const l=openModal(`
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
            ${h.clients.map(c=>`<option value="${c._id}" ${String(c._id)===String(e.clientId)?"selected":""}>${escapeHtml(c.name)}</option>`).join("")}
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
          ${h.services.map(c=>`<option value="${c._id}">${escapeHtml(c.name)}</option>`).join("")}
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
          ${i()}
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
  `),n=l.querySelector(".modal");n&&(n.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const m=()=>{const c=e.assignments.reduce((P,M)=>P+(Number(M.percent)||0),0),S=l.querySelector("#mAssignTotalInfo");S&&(S.innerHTML=c===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${c}% Allocated (should be 100%)</span>`)},$=()=>{l.querySelectorAll(".m-remove-service").forEach(c=>{c.onclick=()=>{const S=c.dataset.id;e.serviceIds=e.serviceIds.filter(P=>String(P)!==String(S)),l.querySelector("#mEditServicesTags").innerHTML=s(),$()}})},w=()=>{l.querySelectorAll(".m-person-assign-row").forEach(c=>{const S=Number(c.dataset.idx),P=c.querySelector(".m-a-person");P&&(P.onchange=C=>e.assignments[S].personId=C.target.value);const M=c.querySelector(".m-a-percent");M&&(M.oninput=C=>{e.assignments[S].percent=C.target.value,m()});const d=c.querySelector(".m-a-hours");d&&(d.oninput=C=>e.assignments[S].hours=C.target.value);const T=c.querySelector(".m-a-remove");T&&(T.onclick=()=>{e.assignments.length>1?(e.assignments.splice(S,1),l.querySelector("#mEditAssignRows").innerHTML=i(),w(),m()):flashToast("Job must have at least one team member row",!0)})})},A=l.querySelector("#mCloseJobEdit"),u=l.querySelector("#mEditCancel");A&&(A.onclick=()=>l.remove()),u&&(u.onclick=()=>l.remove());const y=l.querySelector("#mEditTitle");y&&(y.oninput=c=>e.title=c.target.value);const p=l.querySelector("#mEditClient");p&&(p.onchange=c=>e.clientId=c.target.value);const b=l.querySelector("#mEditStatus");b&&(b.onchange=c=>e.status=c.target.value);const r=l.querySelector("#mEditDate");r&&(r.onchange=c=>e.date=c.target.value);const o=l.querySelector("#mEditCompletionDate");o&&(o.onchange=c=>e.completionDate=c.target.value);const v=l.querySelector("#mEditPriority");v&&(v.onchange=c=>e.priority=c.target.value);const E=l.querySelector("#mEditValue");E&&(E.oninput=c=>e.value=c.target.value);const B=l.querySelector("#mEditDesc");B&&(B.oninput=c=>e.description=c.target.value);const R=l.querySelector("#mEditServiceSelect");R&&(R.onchange=c=>{const S=c.target.value;S&&!e.serviceIds.map(String).includes(String(S))&&(e.serviceIds.push(S),l.querySelector("#mEditServicesTags").innerHTML=s(),$()),R.value=""}),$(),w(),m();const _=l.querySelector("#mAddAssignRow");_&&(_.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),l.querySelector("#mEditAssignRows").innerHTML=i(),w(),m()});const U=l.querySelector("#mEditSave");U&&(U.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const c=e.assignments.filter(I=>I.personId&&String(I.personId).trim()!=="");if(!c.length){flashToast("Please select at least one assigned team member",!0);return}for(const I of c)if(I.hours===""||I.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const S=h.clients.find(I=>String(I._id)===String(e.clientId)),M=h.services.filter(I=>e.serviceIds.map(String).includes(String(I._id))).map(I=>I.name).join(", "),d=e.title||(S?`${S.name} — ${M||"Deliverable"}`:M||"Untitled Job"),T=getUploaderAttachments("mEditAttachments"),C=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:d,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:c,attachments:T,deliverables:C});const q=c.map(I=>re(I.personId)).join(", ");flashToast("Job updated & saved! 📁"),l.remove(),a&&a()}catch(c){flashToast(c.message,!0)}finally{U.disabled=!1,U.textContent="Save & Update Assignments"}})}async function Se(t){z=await apiGet("/dashboard/admin?period="+k.period),t.innerHTML=`${Q()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${z.clients.map(a=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(a.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(a.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${a.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(a.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${a.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,Y()}async function de(t){z=await apiGet("/dashboard/admin?period="+k.period),t.innerHTML=`${Q()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${z.personnel.map(a=>{const e=(a.status||"active").toLowerCase(),s=a.personId||a._id;return`<tr>
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
    </section>`,Y(),document.querySelectorAll(".person-status-sel").forEach(a=>{a.onchange=async e=>{const s=a.dataset.id,i=e.target.value;try{await apiPut("/personnel/"+s,{status:i}),await H(),flashToast("Status updated to "+i),de(t)}catch(l){flashToast(l.message,!0)}}})}const F=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function Ae(t){const a=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <h2>Accounts <span class="eyebrow">${a.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${F.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${a.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(W(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${F.map(s=>`<td>${escapeHtml(e.roles[s[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>ee(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>ee(a.find(s=>s._id===e.dataset.id)))}function ee(t){const a=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};F.forEach(i=>{e.roles[i[0]]==null&&(e.roles[i[0]]="")});const s=openModal(`
    <h3>${a?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${a?`<select id="rClient"><option value="">Select…</option>${h.clients.map(i=>`<option value="${i._id}">${escapeHtml(i.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(W(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${F.slice(0,5).map(i=>`<div class="field"><label>${i[1]}</label><input type="text" class="r-role" data-key="${i[0]}" value="${escapeHtml(e.roles[i[0]])}"></div>`).join("")}</div>
    <div class="field-row">${F.slice(5,10).map(i=>`<div class="field"><label>${i[1]}</label><input type="text" class="r-role" data-key="${i[0]}" value="${escapeHtml(e.roles[i[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${a?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);s.querySelector("#mCancel").onclick=()=>s.remove(),a||(s.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),s.remove(),f())}),s.querySelector("#mSave").onclick=async()=>{const i={};s.querySelectorAll(".r-role").forEach(n=>i[n.dataset.key]=n.value.trim());const l={nature:s.querySelector("#rNature").value,roles:i,difficulty:Number(s.querySelector("#rDifficulty").value)||1,comments:s.querySelector("#rComments").value.trim()};try{if(a){const n=s.querySelector("#rClient").value;if(!n){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:n},l))}else await apiPut("/roster/"+e._id,l);s.remove(),f()}catch(n){flashToast(n.message,!0)}}}function Te(t){if(!t)return"Deliverables";const a={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return a[t]?a[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function Ie(t){const a=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
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
              ${a.map(s=>{var b,r;const i=((b=s.personId)==null?void 0:b.name)||"—",l=((r=s.serviceId)==null?void 0:r.name)||"—",n=Te(s.unit),m=e[s.period]||(s.period?s.period.toUpperCase():"Daily"),$=s.actual||0,w=s.quantity>0?$/s.quantity:0,A=Math.round(w*100),u=w>=1?"green":w>=.6?"amber":"red",y=w>=1?"✓ Met":w>=.6?"Behind":"Off Pace",p=Math.min(A,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(i)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(l)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${s.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(n)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${m}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${$} / ${s.quantity} <span style="font-weight:500;color:var(--text-3)">(${A}%)</span></span>
                        <span class="badge ${u}" style="font-size:10px;padding:1px 5px">${y}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${p}%;height:100%;background:var(--${u==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
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
  `,document.getElementById("addAdminTargetBtn").onclick=()=>te(null),document.querySelectorAll(".edit-target").forEach(s=>{s.onclick=()=>te(a.find(i=>i._id===s.dataset.id))}),document.querySelectorAll(".del-target").forEach(s=>{s.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+s.dataset.id),flashToast("Target removed"),f()}catch(i){flashToast(i.message,!0)}}})}function te(t){var A,u,y,p;const a=!t;t=t||{personId:(A=h.personnel[0])==null?void 0:A._id,serviceId:(u=h.services[0])==null?void 0:u._id,quantity:5,unit:"reels",period:"day"};const e=((y=t.personId)==null?void 0:y._id)||t.personId||"",s=((p=t.serviceId)==null?void 0:p._id)||t.serviceId||"",l=["reels","stories","posts","count","hours"].includes(t.unit),n=openModal(`
    <h3>${a?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${h.personnel.map(b=>`<option value="${b._id}" ${String(b._id)===String(e)?"selected":""}>${escapeHtml(b.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${h.services.map(b=>`<option value="${b._id}" ${String(b._id)===String(s)?"selected":""}>${escapeHtml(b.name)}</option>`).join("")}
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
          <option value="reels" ${l&&t.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${l&&t.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${l&&t.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${l&&t.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${l&&t.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${l?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>
    </div>

    <div class="field" id="mTgtCustomUnitWrap" style="margin-bottom:12px;display:${l?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${l?"":escapeHtml(t.unit||"")}">
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
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const m=n.querySelector("#mTgtUnit"),$=n.querySelector("#mTgtCustomUnitWrap"),w=n.querySelector("#mTgtCustomUnit");m.onchange=()=>{m.value==="custom"?($.style.display="flex",w.focus()):$.style.display="none"},n.querySelector("#mCancel").onclick=()=>n.remove(),n.querySelector("#mSave").onclick=async()=>{let b=m.value;b==="custom"&&(b=w.value.trim()||"Deliverables");const r=getUploaderAttachments("mTgtAttachments"),o={personId:n.querySelector("#mTgtPerson").value,serviceId:n.querySelector("#mTgtService").value,quantity:Number(n.querySelector("#mTgtQty").value)||1,unit:b,period:n.querySelector("#mTgtPeriod").value,attachments:r};if(!o.personId||!o.serviceId){flashToast("Person and Service are required",!0);return}try{a?await apiPost("/targets",o):await apiPut("/targets/"+t._id,o),flashToast("Target saved successfully! 🎯"),n.remove(),f()}catch(v){flashToast(v.message,!0)}}}async function Ce(t){const[a,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);h.salaryGrades=a,h.salaryAssignments=e;const s={};e.forEach(i=>s[i.personId]=i.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${a.map(i=>`<div class="manage-item"><div><strong>${escapeHtml(i.label)}</strong><div class="muted">${fmtINR(i.min)} – ${fmtINR(i.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${i._id}">Edit</button><button class="btn danger small del-grade" data-id="${i._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${h.personnel.map(i=>`<tr><td><strong>${escapeHtml(i.name)}</strong><div class="muted">${escapeHtml(i.duties||"")}</div></td>
        <td><span class="badge green">${i.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${i._id}"><option value="">Not set</option>${a.map(l=>`<option value="${l._id}" ${s[i._id]===l._id?"selected":""}>${escapeHtml(l.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>ae(null),document.querySelectorAll(".edit-grade").forEach(i=>i.onclick=()=>ae(a.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-grade").forEach(i=>i.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+i.dataset.id),f())}),document.querySelectorAll(".grade-select").forEach(i=>{i.onchange=async()=>{await apiPut("/salary/assignments/"+i.dataset.id,{gradeId:i.value||null}),flashToast("Saved")}})}function ae(t){const a=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${a?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!s.label){flashToast("Label required",!0);return}try{a?await apiPost("/salary/grades",s):await apiPut("/salary/grades/"+t._id,s),e.remove(),f()}catch(i){flashToast(i.message,!0)}}}function De(t){const a={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <!-- Admin Account Settings Card -->
      <div style="margin-bottom:24px;">
        ${me({title:"My Administrator Credentials",subtitle:"Manage your personal login email, display name, and password"})}
      </div>

      <!-- Database Archive Card in Settings -->
      <div class="card" style="margin-bottom:24px;border:1px solid rgba(239,68,68,0.25);background:linear-gradient(180deg, rgba(239,68,68,0.03) 0%, rgba(0,0,0,0) 100%)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:22px">🗄️</span>
              <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0">Database Archive & Preserved Records</h3>
            </div>
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">
              Items removed from dashboards are <strong>compulsorily preserved in MongoDB</strong>. They will never leave the database until you explicitly purge them from the archive.
            </div>
          </div>
          <button class="btn gold small" id="openArchiveTabBtn" type="button" style="border-color:rgba(239,68,68,0.3)">
            🗄️ Open Database Archive →
          </button>
        </div>
      </div>

      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${h.personnel.length})</h3>
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
              ${h.personnel.map(n=>`
                <tr>
                  <td><strong>${escapeHtml(n.name)}</strong></td>
                  <td>${escapeHtml(n.duties||"—")}</td>
                  <td class="num"><strong>${n.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${a[n.status]||"green"}">${escapeHtml(n.status||"active")}</span></td>
                  <td class="num">
                    <button class="btn ghost small edit-person" data-id="${n._id}">Edit</button>
                    <button class="btn danger small del-person" data-id="${n._id}">Remove</button>
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${h.clients.length})</h3>
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
              ${h.clients.map(n=>`
                <tr>
                  <td><strong>${escapeHtml(n.name)}</strong></td>
                  <td>${n.notes?escapeHtml(n.notes):'<span class="muted">—</span>'}</td>
                  <td class="num">
                    <button class="btn ghost small edit-client" data-id="${n._id}">Edit</button>
                    <button class="btn danger small del-client" data-id="${n._id}">Remove</button>
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${h.services.length})</h3>
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
              ${h.services.map(n=>`
                <tr>
                  <td><strong>${escapeHtml(n.name)}</strong></td>
                  <td class="num"><strong>${n.hours||0} hrs</strong> baseline</td>
                  <td class="num">
                    <button class="btn ghost small edit-service" data-id="${n._id}">Edit</button>
                    <button class="btn danger small del-service" data-id="${n._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No services added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>se(null)),document.querySelectorAll(".edit-person").forEach(n=>n.onclick=()=>se(h.personnel.find(m=>m._id===n.dataset.id))),document.querySelectorAll(".del-person").forEach(n=>n.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+n.dataset.id),await H(),f())});const s=document.getElementById("addClientBtn");s&&(s.onclick=()=>ie(null)),document.querySelectorAll(".edit-client").forEach(n=>n.onclick=()=>ie(h.clients.find(m=>m._id===n.dataset.id))),document.querySelectorAll(".del-client").forEach(n=>n.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+n.dataset.id),await H(),f())});const i=document.getElementById("addServiceBtn");i&&(i.onclick=()=>ne(null)),document.querySelectorAll(".edit-service").forEach(n=>n.onclick=()=>ne(h.services.find(m=>m._id===n.dataset.id))),document.querySelectorAll(".del-service").forEach(n=>n.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+n.dataset.id),await H(),f())}),ue(t);const l=document.getElementById("openArchiveTabBtn");l&&(l.onclick=()=>{k.tab="archive",J()})}const Ee=De;function se(t){const a=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
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
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s=getUploaderAttachments("mPersonFiles"),i={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:s};if(!i.name){flashToast("Name is required",!0);return}try{a?await apiPost("/personnel",i):await apiPut("/personnel/"+t._id,i),await H(),flashToast("Person saved! 📁"),e.remove(),f()}catch(l){flashToast(l.message,!0)}}}function ie(t){const a=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s=getUploaderAttachments("mClientFiles"),i={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:s};if(!i.name){flashToast("Name is required",!0);return}try{a?await apiPost("/clients",i):await apiPut("/clients/"+t._id,i),await H(),flashToast("Client saved! 📁"),e.remove(),f()}catch(l){flashToast(l.message,!0)}}}function ne(t){const a=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const s={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!s.name){flashToast("Name is required",!0);return}try{a?await apiPost("/services",s):await apiPut("/services/"+t._id,s),await H(),e.remove(),f()}catch(i){flashToast(i.message,!0)}}}async function ce(t){const a=await apiGet("/users");let e="all",s="role",i="";function l(){let p=[...a];if(i){const o=i.toLowerCase();p=p.filter(v=>v.name&&v.name.toLowerCase().includes(o)||v.email&&v.email.toLowerCase().includes(o)||v.role&&v.role.toLowerCase().includes(o))}e==="admin"?p=p.filter(o=>o.role==="superadmin"||o.role==="admin"):e==="accounts"?p=p.filter(o=>o.role==="accounts"):e==="employee"?p=p.filter(o=>o.role==="employee"):e==="client"&&(p=p.filter(o=>o.role==="client"));const b={superadmin:1,admin:1,accounts:2,employee:3,client:4};s==="role"?p.sort((o,v)=>{const E=b[o.role]||9,B=b[v.role]||9;return E!==B?E-B:(o.name||"").localeCompare(v.name||"")}):s==="role-desc"?p.sort((o,v)=>{const E=b[o.role]||9,B=b[v.role]||9;return E!==B?B-E:(o.name||"").localeCompare(v.name||"")}):s==="name-asc"?p.sort((o,v)=>(o.name||"").localeCompare(v.name||"")):s==="name-desc"?p.sort((o,v)=>(v.name||"").localeCompare(o.name||"")):s==="status"&&p.sort((o,v)=>(v.active?1:0)-(o.active?1:0));const r=t.querySelector("#userTableBody");if(r){if(p.length===0){r.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}r.innerHTML=p.map(o=>{const v=o.role==="superadmin"||o.role==="admin",E=o.role==="accounts",B=o.role==="employee",R=v?'<span class="badge gold" style="font-weight:700">👑 Admin</span>':E?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':B?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',_=o.personnelId?escapeHtml(o.personnelId.name):o.clientId?escapeHtml(o.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(o.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(o.email)}</span></td>
          <td>${R}</td>
          <td>${_}</td>
          <td><span class="badge ${o.active?"green":"gray"}">${o.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),r.querySelectorAll(".edit-user").forEach(o=>o.onclick=()=>le(a.find(v=>v._id===o.dataset.id))),r.querySelectorAll(".del-user").forEach(o=>o.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+o.dataset.id),flashToast("User removed"),ce(t)}catch(v){flashToast(v.message,!0)}})}}const n=a.filter(p=>p.role==="superadmin"||p.role==="admin").length,m=a.filter(p=>p.role==="accounts").length,$=a.filter(p=>p.role==="employee").length,w=a.filter(p=>p.role==="client").length;t.innerHTML=`
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
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${n})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${m})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${$})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${w})</button>
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
    </section>`,l(),t.querySelectorAll(".user-role-filter").forEach(p=>{p.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(b=>b.classList.remove("active")),p.classList.add("active"),e=p.dataset.role,l()}});const A=t.querySelector("#userSortSel");A&&(A.onchange=()=>{s=A.value,l()});const u=t.querySelector("#userSearchInp");u&&(u.oninput=()=>{i=u.value.trim(),l()});const y=t.querySelector("#addUserBtn");y&&(y.onclick=()=>le(null))}async function Pe(t){t.innerHTML='<div style="padding:40px;text-align:center;"><div class="loading">Loading database archive from MongoDB...</div></div>';let a="all",e="",s=null;async function i(){try{s=await apiGet("/archive"+(a!=="all"?`?type=${encodeURIComponent(a)}`:"")),l()}catch(n){t.innerHTML=`<div class="empty"><h3>Failed to load database archive</h3><p>${escapeHtml(n.message)}</p><button class="btn gold small" id="retryArchiveBtn">Retry</button></div>`;const m=t.querySelector("#retryArchiveBtn");m&&(m.onclick=()=>i())}}function l(){if(!s)return;const{summary:n,items:m}=s,$=n.total||0;let w=[...m||[]];if(e){const r=e.toLowerCase();w=w.filter(o=>o.title&&o.title.toLowerCase().includes(r)||o.detail&&o.detail.toLowerCase().includes(r)||o.deletedByName&&o.deletedByName.toLowerCase().includes(r)||o.type&&o.type.toLowerCase().includes(r))}const A={job:"📁",task:"✅",invoice:"💳",payment:"💰",client:"💼",personnel:"👥",service:"⚙️",proposal:"📜"},u={job:"blue",task:"green",invoice:"amber",payment:"cyan",client:"purple",personnel:"gold",service:"gray",proposal:"red"};t.innerHTML=`
      <section class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:flex;align-items:center;gap:10px">
              <h2 style="font-size:22px;font-weight:800;color:var(--text-1);margin:0">🗄️ Database Archive & Preserved Storage</h2>
              <span class="badge red" style="font-weight:700">${$} Preserved in DB</span>
            </div>
            <p style="font-size:13px;color:var(--text-3);margin:4px 0 0 0">
              Records deleted from dashboards are <strong>compulsorily preserved in MongoDB</strong>. They will never leave the database until you explicitly purge them from here.
            </p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button class="btn ghost small" id="refreshArchiveBtn" type="button">🔄 Refresh</button>
            ${a!=="all"&&(n[a]||0)>0?`
              <button class="btn danger small" id="purgeTypeBtn" type="button">⚠️ Purge All ${a.toUpperCase()} from DB</button>
            `:""}
          </div>
        </div>

        <!-- Filter Pills with counts -->
        <div style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap;align-items:center">
          <button class="pchip archive-type-pill ${a==="all"?"active":""}" data-type="all">All (${n.total||0})</button>
          <button class="pchip archive-type-pill ${a==="jobs"?"active":""}" data-type="jobs">📁 Jobs (${n.jobs||0})</button>
          <button class="pchip archive-type-pill ${a==="tasks"?"active":""}" data-type="tasks">✅ Tasks (${n.tasks||0})</button>
          <button class="pchip archive-type-pill ${a==="invoices"?"active":""}" data-type="invoices">💳 Invoices (${n.invoices||0})</button>
          <button class="pchip archive-type-pill ${a==="payments"?"active":""}" data-type="payments">💰 Payments (${n.payments||0})</button>
          <button class="pchip archive-type-pill ${a==="clients"?"active":""}" data-type="clients">💼 Clients (${n.clients||0})</button>
          <button class="pchip archive-type-pill ${a==="personnel"?"active":""}" data-type="personnel">👥 Personnel (${n.personnel||0})</button>
          <button class="pchip archive-type-pill ${a==="services"?"active":""}" data-type="services">⚙️ Services (${n.services||0})</button>
          <button class="pchip archive-type-pill ${a==="proposals"?"active":""}" data-type="proposals">📜 Proposals (${n.proposals||0})</button>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom:16px;">
          <input type="text" id="archiveSearchInp" placeholder="🔍 Search preserved records by title, client, or details..." value="${escapeHtml(e)}" style="max-width:460px;font-size:13px;padding:8px 14px;border-radius:8px">
        </div>

        <!-- Main Archive Table Card -->
        <div class="card" style="border:1px solid rgba(239,68,68,0.2)">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width:110px">Record Type</th>
                  <th>Item Title / Subject</th>
                  <th>Preserved Information</th>
                  <th>Deleted At (Preserved In DB)</th>
                  <th>Deleted By</th>
                  <th class="num" style="min-width:210px">Database Actions</th>
                </tr>
              </thead>
              <tbody>
                ${w.length===0?`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:48px 16px;text-align:center">
                        <div style="font-size:36px;margin-bottom:8px">🗄️</div>
                        <h4 style="margin:0 0 4px 0;font-size:15px">No Deleted Records in This View</h4>
                        <p style="font-size:12px;color:var(--text-3);max-width:440px;margin:0 auto">
                          ${e?"No archive records matched your search query.":"No records of this type have been deleted from dashboards. They remain active on the system."}
                        </p>
                      </div>
                    </td>
                  </tr>
                `:w.map(r=>{const o=r.deletedAt?new Date(r.deletedAt):null,v=o?`${o.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})} ${o.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}`:"—",E=A[r.type]||"📄";return`
                    <tr>
                      <td><span class="badge ${u[r.type]||"gray"}">${E} ${escapeHtml((r.type||"").toUpperCase())}</span></td>
                      <td><strong style="color:var(--text-1);font-size:13px">${escapeHtml(r.title||"Untitled")}</strong></td>
                      <td><span style="font-size:12px;color:var(--text-2)">${escapeHtml(r.detail||"—")}</span></td>
                      <td><span style="font-size:12px;color:var(--text-3)">${v}</span></td>
                      <td><span style="font-size:12px;color:var(--text-2);font-weight:600">${escapeHtml(r.deletedByName||"Admin")}</span></td>
                      <td class="num" style="white-space:nowrap">
                        <button class="btn gold small restore-btn" data-type="${r.type}" data-id="${r.id}" title="Restore this record back to active dashboard view" style="margin-right:6px">
                          🔄 Restore to Dashboard
                        </button>
                        <button class="btn danger small purge-btn" data-type="${r.type}" data-id="${r.id}" title="Permanently delete from MongoDB database">
                          🗑️ Delete from DB
                        </button>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;const y=t.querySelector("#refreshArchiveBtn");y&&(y.onclick=()=>i()),t.querySelectorAll(".archive-type-pill").forEach(r=>{r.onclick=()=>{a=r.dataset.type,i()}});const p=t.querySelector("#archiveSearchInp");p&&(p.oninput=()=>{e=p.value.trim(),l();const r=t.querySelector("#archiveSearchInp");r&&(r.focus(),r.setSelectionRange(r.value.length,r.value.length))}),t.querySelectorAll(".restore-btn").forEach(r=>{r.onclick=async()=>{const o=r.dataset.type,v=r.dataset.id;r.disabled=!0,r.textContent="Restoring...";try{await apiPost(`/archive/restore/${o}/${v}`,{}),flashToast(`✓ ${o.toUpperCase()} restored to dashboard!`),["client","personnel","service"].includes(o)&&await H(),await i()}catch(E){flashToast(E.message,!0),r.disabled=!1,r.textContent="🔄 Restore to Dashboard"}}}),t.querySelectorAll(".purge-btn").forEach(r=>{r.onclick=async()=>{const o=r.dataset.type,v=r.dataset.id;if(confirm(`⚠️ PERMANENT DATABASE DELETION

This will permanently delete this ${o} from MongoDB.

It cannot be recovered. Are you sure you want to permanently delete it from the database?`)){r.disabled=!0,r.textContent="Purging...";try{await apiDelete(`/archive/purge/${o}/${v}`),flashToast("✓ Record permanently removed from database."),await i()}catch(B){flashToast(B.message,!0),r.disabled=!1,r.textContent="🗑️ Delete from DB"}}}});const b=t.querySelector("#purgeTypeBtn");b&&(b.onclick=async()=>{if(confirm(`⚠️ PURGE ALL ${a.toUpperCase()} RECORDS FROM DATABASE?

This will permanently delete all ${a} records currently in the archive from MongoDB.

This cannot be undone. Continue?`)){b.disabled=!0,b.textContent="Purging...";try{await apiDelete(`/archive/purge-all/${a}`),flashToast(`✓ All ${a} records permanently purged from database.`),await i()}catch(o){flashToast(o.message,!0),b.disabled=!1}}})}await i()}function le(t){const a=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,s=openModal(`<h3>${a?"Add":"Edit"} User</h3>
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
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function i(){const l=s.querySelector("#uRole").value,n=s.querySelector("#uLinkWrap");l==="employee"?n.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${h.personnel.map(m=>`<option value="${m._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===m._id?"selected":""}>${escapeHtml(m.name)}</option>`).join("")}</select>`:l==="client"?n.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${h.clients.map(m=>`<option value="${m._id}" ${t.clientId&&(t.clientId._id||t.clientId)===m._id?"selected":""}>${escapeHtml(m.name)}</option>`).join("")}</select>`:n.innerHTML=""}s.querySelector("#uRole").onchange=i,i(),s.querySelector("#mCancel").onclick=()=>s.remove(),s.querySelector("#mSave").onclick=async()=>{var $,w;const l=s.querySelector("#uRole").value,n={name:s.querySelector("#uName").value.trim(),email:s.querySelector("#uEmail").value.trim(),role:l,active:s.querySelector("#uActive").checked,personnelId:l==="employee"&&(($=s.querySelector("#uPersonnel"))==null?void 0:$.value)||null,clientId:l==="client"&&((w=s.querySelector("#uClient"))==null?void 0:w.value)||null},m=s.querySelector("#uPassword").value;if(m&&(n.password=m),!n.name||!n.email){flashToast("Name and email required",!0);return}if(a&&!m){flashToast("Password required for a new user",!0);return}try{a?await apiPost("/users",n):await apiPut("/users/"+t._id,n),s.remove(),f()}catch(A){flashToast(A.message,!0)}}}let x={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};function oe(t,a){let e;if(!t||t==="all")e=new Date;else{const n=t.split("-");n.length===3?e=new Date(Number(n[0]),Number(n[1])-1,Number(n[2])):e=new Date}e.setDate(e.getDate()+a);const s=e.getFullYear(),i=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${s}-${i}-${l}`}async function pe(t){const[a,e]=await Promise.all([apiGet("/tasks"),apiGet("/personnel").catch(()=>h.personnel||[])]),s=new Date,i=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`,l=x.date;let n=a;l!=="all"&&(n=a.filter(d=>d.dueDate?new Date(d.dueDate).toISOString().slice(0,10)===l:l===i));let m=n;x.personnelId!=="all"&&(m=m.filter(d=>{var C;const T=((C=d.personnelId)==null?void 0:C._id)||d.personnelId;return String(T)===String(x.personnelId)}));const $=m.length,w=m.filter(d=>d.status==="Completed").length,A=$-w,u=$>0?Math.round(w/$*100):0;let y=m;if(x.filter==="active"?y=y.filter(d=>d.status!=="Completed"):x.filter==="completed"&&(y=y.filter(d=>d.status==="Completed")),x.search){const d=x.search.toLowerCase();y=y.filter(T=>{var I,D;const C=(((I=T.personnelId)==null?void 0:I.name)||((D=T.userId)==null?void 0:D.name)||"").toLowerCase(),q=(T.title||"").toLowerCase();return C.includes(d)||q.includes(d)})}const p={};y.forEach(d=>{var I,D,j,N,K,X;const T=((I=d.personnelId)==null?void 0:I._id)||((D=d.userId)==null?void 0:D._id)||"unknown",C=((j=d.personnelId)==null?void 0:j.name)||((N=d.userId)==null?void 0:N.name)||"Unassigned Employee",q=((K=d.personnelId)==null?void 0:K.department)||((X=d.personnelId)==null?void 0:X.role)||"Team Member";p[T]||(p[T]={id:T,name:C,dept:q,tasks:[]}),p[T].tasks.push(d)});const b=Object.values(p),r=l===i;t.innerHTML=`
    <div class="block">
      <!-- Top Title & Navigation Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;display:flex;align-items:center;gap:8px">
            <span>Employee Daily Tasks</span>
            <span class="eyebrow">${$} total tasks</span>
          </h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Live employee daily checklist activity, real-time completion tracking, and submissions</p>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="admDailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${r?"primary":"ghost"} small" id="admDailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="admDailyDatePickerInp" class="daily-date-picker-inp" value="${l==="all"?i:l}">

          <button type="button" class="daily-nav-arrow" id="admDailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${l==="all"?"gold":"ghost"} small" id="admDailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Daily Tasks</span><div class="kpi-icon">📝</div></div>
          <div class="kpi-value">${$}</div>
          <div class="kpi-sub">${l==="all"?"Across all dates":r?"Logged for today":l}</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Completed Tasks</span><div class="kpi-icon">✅</div></div>
          <div class="kpi-value" style="color:var(--green-600)">${w}</div>
          <div class="kpi-sub">${u}% achievement rate</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Pending / To Do</span><div class="kpi-icon">⏳</div></div>
          <div class="kpi-value" style="color:var(--amber-600)">${A}</div>
          <div class="kpi-sub">Items in progress</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Team Members</span><div class="kpi-icon">👥</div></div>
          <div class="kpi-value">${b.length}</div>
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
              ${e.filter(d=>d.status!=="inactive").map(d=>`
                <option value="${d._id}" ${x.personnelId===d._id?"selected":""}>${escapeHtml(d.name)} (${d.role||d.department||"Staff"})</option>
              `).join("")}
            </select>
          </div>
          <div style="width:135px">
            <input type="date" id="admDailyAssignDate" value="${l==="all"?i:l}" style="width:100%;padding:7px 10px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:12px;outline:none" />
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
            <button class="pchip ${x.filter==="all"?"active":""}" data-atf="all">All (${$})</button>
            <button class="pchip ${x.filter==="active"?"active":""}" data-atf="active">Pending (${A})</button>
            <button class="pchip ${x.filter==="completed"?"active":""}" data-atf="completed">✓ Completed (${w})</button>
          </div>

          <!-- Right: Employee Picker & Search -->
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:12px;font-weight:700;color:var(--text-3)">Employee:</span>
              <select id="admTaskPersonFilter" style="font-size:12.5px;padding:6px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);outline:none">
                <option value="all" ${x.personnelId==="all"?"selected":""}>All Employees (${e.length})</option>
                ${e.map(d=>`
                  <option value="${d._id}" ${x.personnelId===d._id?"selected":""}>${escapeHtml(d.name)} (${d.role||d.department||"Staff"})</option>
                `).join("")}
              </select>
            </div>

            <div class="ticket-search-box" style="margin:0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="admTaskSearchInp" placeholder="Search tasks or employee…" value="${escapeHtml(x.search)}" style="font-size:12px;padding:5px 8px">
              ${x.search?'<button type="button" id="admTaskClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
            </div>

            ${w>0?`
              <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('all')" style="font-size:11.5px;color:var(--text-3);padding:5px 10px" title="Delete all completed tasks in this view">
                🗑️ Clear Completed (${w})
              </button>
            `:""}
          </div>
        </div>
      </div>

      <!-- Employee Task Groups List -->
      ${b.length===0?`
        <div class="card" style="text-align:center;padding:56px 20px">
          <div style="font-size:40px;margin-bottom:10px">📋</div>
          <div style="font-weight:700;font-size:16px;color:var(--text-1);margin-bottom:4px">No daily tasks found</div>
          <div style="font-size:13px;color:var(--text-3);max-width:380px;margin:0 auto">No tasks have been entered for this date. You can assign tasks using the form above, or wait for employees to add checklist items.</div>
        </div>
      `:`
        <div style="display:flex;flex-direction:column;gap:18px">
          ${b.map(d=>{const T=d.tasks.length,C=d.tasks.filter(D=>D.status==="Completed").length,q=T>0?Math.round(C/T*100):0,I=T>0&&C===T;return`
              <div class="daily-checklist-card">
                <!-- Employee Header Banner -->
                <div style="padding:16px 20px;background:var(--bg-surface);border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:50%;background:var(--brand-500);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px">
                      ${d.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style="font-size:15px;font-weight:800;color:var(--text-1);line-height:1.2">${escapeHtml(d.name)}</div>
                      <div style="font-size:11.5px;color:var(--text-3)">${escapeHtml(d.dept)}</div>
                    </div>
                  </div>

                  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <span style="font-size:12.5px;font-weight:700;color:${I?"var(--green-600)":"var(--text-2)"}">
                      ${C} of ${T} completed (${q}%)
                    </span>
                    <div style="width:100px;height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
                      <div style="width:${q}%;height:100%;background:${I?"var(--green-500)":"var(--brand-500)"};transition:width 0.4s ease"></div>
                    </div>
                    <button type="button" class="btn ghost small" onclick="adminQuickAddTaskForEmp('${d.id}')" style="font-size:11.5px;color:var(--brand-500);padding:3px 8px;font-weight:700" title="Add a task for this employee">
                      + Add Task
                    </button>
                    ${C>0?`
                      <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('${d.id}')" style="font-size:11px;color:var(--text-3);padding:3px 7px" title="Delete completed tasks for this employee">
                        Clear Done (${C})
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Employee Checklist Items -->
                <div>
                  ${d.tasks.map(D=>{const j=D.status==="Completed",N=D.dueDate?new Date(D.dueDate).toISOString().slice(0,10):"";return`
                      <div class="daily-item-row ${j?"completed":""}" style="padding:12px 20px">
                        <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                          <button type="button" class="daily-circle-check ${j?"checked":""}" onclick="adminToggleTask('${D._id}')" title="${j?"Mark Incomplete":"Mark Complete"}">
                            ✓
                          </button>
                          <div style="flex:1">
                            <span class="daily-item-text" style="cursor:pointer" onclick="adminToggleTask('${D._id}')">
                              ${escapeHtml(D.title)}
                            </span>
                            ${D.description?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${escapeHtml(D.description)}</div>`:""}
                          </div>
                        </div>

                        <div class="daily-actions-hover" style="opacity:1">
                          ${N?`<span class="task-tag-pill" style="font-size:10.5px">📅 ${N===i?"Today":N}</span>`:""}
                          ${D.completedAt?'<span class="task-tag-pill" style="color:var(--green-600);background:rgba(16,185,129,0.1);font-size:10.5px">Done</span>':""}
                          <button type="button" class="btn ghost small" onclick="adminEditTask('${D._id}')" title="Edit this task" style="padding:3px 7px;font-size:11.5px">✏️</button>
                          <button type="button" class="btn ghost small" onclick="adminDeleteTask('${D._id}')" title="Delete this task" style="padding:3px 7px;font-size:11.5px;color:var(--red-500)">🗑️</button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `;const o=document.getElementById("admDailyPrevDayBtn");o&&(o.onclick=()=>{x.date=oe(x.date,-1),f()});const v=document.getElementById("admDailyNextDayBtn");v&&(v.onclick=()=>{x.date=oe(x.date,1),f()});const E=document.getElementById("admDailyTodayBtn");E&&(E.onclick=()=>{x.date=i,f()});const B=document.getElementById("admDailyAllDatesBtn");B&&(B.onclick=()=>{x.date=x.date==="all"?i:"all",f()});const R=document.getElementById("admDailyDatePickerInp");R&&(R.onchange=d=>{d.target.value&&(x.date=d.target.value,f())}),document.querySelectorAll("[data-atf]").forEach(d=>{d.onclick=()=>{x.filter=d.dataset.atf,f()}});const _=document.getElementById("admTaskPersonFilter");_&&(_.onchange=d=>{x.personnelId=d.target.value,f()});const U=document.getElementById("admTaskSearchInp");U&&(U.oninput=d=>{x.search=d.target.value,pe(t)});const c=document.getElementById("admTaskClearSearch");c&&(c.onclick=()=>{x.search="",f()});const S=document.getElementById("admDailyTaskInp"),P=document.getElementById("admDailyAddBtn"),M=async()=>{const d=((S==null?void 0:S.value)||"").trim();if(!d){flashToast("Please enter a task title",!0);return}const T=document.getElementById("admDailyAssignSelect"),C=document.getElementById("admDailyAssignDate"),q=document.getElementById("admDailyAssignPriority"),I=(T==null?void 0:T.value)||"all",D=(C==null?void 0:C.value)||(x.date==="all"?i:x.date),j=(q==null?void 0:q.value)||"Medium";try{const N={title:d,dueDate:D,priority:j,status:"Todo"};I==="all"?(N.assignAll=!0,N.personnelId="all"):N.personnelId=I,await apiPost("/tasks",N),flashToast(I==="all"?"Task assigned to all active employees! 👥":"Task assigned! ✍️"),S&&(S.value="",S.focus()),f()}catch(N){flashToast(N.message,!0)}};P&&(P.onclick=M),S&&(S.onkeydown=d=>{d.key==="Enter"&&M()})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),f()}catch(a){flashToast(a.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(i=>i._id===t);if(!e)return;const s=prompt("Edit task title:",e.title);s!==null&&s.trim()&&(await apiPut("/tasks/"+t,{title:s.trim()}),flashToast("Task updated"),f())}catch(a){flashToast(a.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const a=prompt("Enter task for this employee:");if(!(!a||!a.trim()))try{const e=new Date,s=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,i=x.date==="all"?s:x.date;await apiPost("/tasks",{title:a.trim(),personnelId:t,dueDate:i,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),f()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),f()}catch(a){flashToast(a.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const a={date:x.date};t&&t!=="all"?a.personnelId=t:x.personnelId&&x.personnelId!=="all"&&(a.personnelId=x.personnelId);const e=await apiPost("/tasks/clear-completed",a);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),f()}catch(a){flashToast(a.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,a=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!a&&!e&&k.tab!=="logjob"&&f()});ge();
