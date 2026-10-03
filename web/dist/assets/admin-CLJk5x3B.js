import"./api-Q2QyLQ8F.js";let Y=null,x={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},M=null,w={tab:"dashboard",period:"month",jobsFilter:"all",ticketsFilter:"all"},g={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function ge(){initTheme(),Y=requireAuth("superadmin"),Y&&(await _(),K())}async function _(){const[t,a,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);x.personnel=t,x.clients=a,x.services=e}function V(){const t=x.personnel.find(i=>/mansi/i.test(i.name)),a=x.personnel.find(i=>/urna/i.test(i.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),a&&e.push({personId:a._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function pe(t){const a=x.personnel.find(e=>e._id===t);return a?a.name:"—"}function W(t){const a=x.clients.find(e=>e._id===t);return a?a.name:"—"}const Q=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"billing_dashboard",label:"Accounts Dashboard",icon:"💳"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Manage",icon:"⚙️"}];function K(){const t=document.getElementById("app"),a=Q.find(e=>e.key===w.tab)||Q[0];t.innerHTML=renderAppShell({user:Y,currentRole:"superadmin",activeTab:w.tab,tabs:Q,title:a.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{w.tab=e,K()}),h()}window.ci360NavTab=t=>{w.tab=t,K()};async function h(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(4);try{if(w.tab==="dashboard")await be(t);else if(w.tab==="dailytasks")await ve(t);else if(w.tab==="logjob")F(t);else if(w.tab==="jobs")await ke(t);else if(w.tab==="tickets")await J(t);else if(w.tab==="byclient")await $e(t);else if(w.tab==="byperson")await me(t);else if(w.tab==="accounts")await Se(t);else if(w.tab==="billing_dashboard"){window.location.href="/accounts";return}else w.tab==="targets"?await Ie(t):w.tab==="salaries"?await Ae(t):w.tab==="settings"||w.tab==="manage"?Ee(t):w.tab==="users"&&await ue(t)}catch(a){t.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(a.message)}</div>`}}}function X(){return renderPeriodPicker(w.period)}function Z(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{w.period=t.dataset.period,h()}})}async function be(t){M=await apiGet("/dashboard/admin?period="+w.period);const a=M.overview;t.innerHTML=`
    <div class="dash-overview-header">
      <div class="dash-overview-title-wrap">
        <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;">Dashboard Overview</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      ${X()}
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
    <div class="card" style="background:linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%);border:1px solid rgba(99, 102, 241, 0.25);margin-bottom:28px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
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

    <section class="block">
      <h2>Roadmap Signals <span class="eyebrow">Auto-generated</span></h2>
      ${M.insights.length?M.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${ae(M.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${ae(M.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${M.personnel.filter(e=>e.status!=="inactive").map(ye).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,Z()}function ae(t,a){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(i=>i[1]));return t.map(([i,n])=>`
    <div class="bar-row">
      <div>${escapeHtml(i)}</div>
      <div class="bar-track"><div class="bar-fill ${a?"gold":""}" style="width:${(n/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(n)}</div>
    </div>`).join("")}function ye(t){const a=Math.min(t.utilization,160);return`
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
    </div>`}function F(t){(!g.assignments||g.assignments.every(e=>!e.personId))&&(g.assignments=V());const a=g.assignments.reduce((e,i)=>e+(Number(i.percent)||0),0);t.innerHTML=`
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
                ${x.clients.map(e=>`<option value="${e._id}" ${e._id===g.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
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
                ${x.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${g.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${g.serviceIds.map(e=>{const i=x.services.find(n=>n._id===e);return i?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(i.name)}
                      <span class="remove-service-tag" data-id="${i._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
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
              ${g.assignments.map((e,i)=>fe(e,i)).join("")}
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
  `,he()}function fe(t,a){return`
    <div class="person-assign-row" data-idx="${a}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${x.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
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
  `}function he(){const t=document.getElementById("jClient");t&&(t.onchange=v=>g.clientId=v.target.value);const a=document.getElementById("addNewClientBtn");a&&(a.onclick=()=>{const v=openModal(`
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
      `);v.querySelector("#mCancel").onclick=()=>v.remove(),v.querySelector("#mSave").onclick=async()=>{const f=v.querySelector("#newClientName").value.trim(),p=v.querySelector("#newClientNotes").value.trim();if(!f){flashToast("Client name is required",!0);return}try{const y=await apiPost("/clients",{name:f,notes:p});await _(),g.clientId=y._id,flashToast("Client added"),v.remove(),F(document.getElementById("content"))}catch(y){flashToast(y.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=v=>g.date=v.target.value);const i=document.getElementById("jCompletion");i&&(i.onchange=v=>g.completion=v.target.value);const n=document.getElementById("jService");n&&(n.onchange=v=>{const f=v.target.value;f&&(g.serviceIds.includes(f)||g.serviceIds.push(f),F(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(v=>{v.onclick=f=>{f.stopPropagation();const p=v.dataset.id;g.serviceIds=g.serviceIds.filter(y=>y!==p),F(document.getElementById("content"))}});const l=document.getElementById("addNewServiceBtn");l&&(l.onclick=()=>{const v=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);v.querySelector("#mCancel").onclick=()=>v.remove(),v.querySelector("#mSave").onclick=async()=>{const f=v.querySelector("#newServiceName").value.trim();if(!f){flashToast("Service name is required",!0);return}try{const p=await apiPost("/services",{name:f});await _(),g.serviceIds.includes(p._id)||g.serviceIds.push(p._id),flashToast("Service added"),v.remove(),F(document.getElementById("content"))}catch(p){flashToast(p.message,!0)}}});const r=document.getElementById("jDesc");r&&(r.oninput=v=>g.desc=v.target.value);const u=document.getElementById("jValue");u&&(u.oninput=v=>g.value=v.target.value),document.querySelectorAll(".person-assign-row").forEach(v=>{const f=Number(v.dataset.idx),p=v.querySelector(".a-person");p&&(p.onchange=s=>g.assignments[f].personId=s.target.value);const y=v.querySelector(".a-percent");y&&(y.oninput=s=>{g.assignments[f].percent=s.target.value,xe()});const E=v.querySelector(".a-hours");E&&(E.oninput=s=>g.assignments[f].hours=s.target.value);const c=v.querySelector(".a-remove");c&&(c.onclick=()=>{g.assignments.length>1&&(g.assignments.splice(f,1),F(document.getElementById("content")))})});const b=document.getElementById("addAssignRow");b&&(b.onclick=()=>{g.assignments.push({personId:"",percent:0,hours:""}),F(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:g.attachments||[]});const $=document.getElementById("clearJobBtn");$&&($.onclick=()=>{g={title:"",assignments:V(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),F(document.getElementById("content"))});const I=document.getElementById("saveJobBtn");I&&(I.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!g.clientId){flashToast("Please select a client",!0);return}if(!g.serviceIds||!g.serviceIds.length){flashToast("Please select at least one service",!0);return}const v=g.assignments.filter(s=>s.personId);if(!v.length){flashToast("Please assign at least one person",!0);return}for(const s of v)if(s.hours===""||s.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const f=x.clients.find(s=>s._id===g.clientId),y=x.services.filter(s=>g.serviceIds.includes(s._id)).map(s=>s.name).join(", "),E=g.title||(f?`${f.name} — ${y||"Deliverable"}`:y||"Untitled Job"),c=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:E,clientId:g.clientId,serviceIds:g.serviceIds,date:g.date||new Date().toISOString().slice(0,10),completionDate:g.completion||null,value:Number(g.value)||0,description:g.desc||"",assignments:v,attachments:c}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),g={title:"",assignments:V(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},w.tab="jobs",h()}catch(v){flashToast(v.message,!0)}})}function xe(){const t=g.assignments.reduce((e,i)=>e+(Number(i.percent)||0),0),a=document.querySelector(".assign-total");a&&(a.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,a.classList.toggle("warn",t!==100))}async function ke(t){let a=await apiGet("/jobs");a.sort((e,i)=>new Date(i.date)-new Date(e.date)),w.jobsFilter==="progress"&&(a=a.filter(e=>!e.completionDate)),w.jobsFilter==="done"&&(a=a.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${a.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${w.jobsFilter==="all"?"active":""}" data-jf="all">All</button>
        <button class="pchip ${w.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${w.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${a.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${a.map(e=>{const i=e.status==="Completed",n=(e.assignments||[]).map(u=>`${escapeHtml(pe(u.personId))} (${u.percent}%)`).join(", "),l=(e.attachments||[]).length,r=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${l?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${l} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${l} Brief</span></button>`:""}
                  ${r?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${r} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${r} Work</span></button>`:""}
                  ${!l&&!r?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${i?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${i}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${i?"green":e.status==="Needs Revision"?"red":"amber"}">${i?"Completed":e.status==="Needs Revision"?"Needs Revision":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?'<span style="font-size:10px;font-weight:700;color:var(--red-500)">↺ Revision Req.</span>':""}
                </div>
              </td>
              <td>${escapeHtml(W(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(u=>`<span class="badge gray">${escapeHtml(u)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${n||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((u,b)=>u+(Number(b.hours)||0),0))}</td>
              <td style="text-align:right;white-space:nowrap;">
                <button class="btn ghost small view-job-files" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">📁 Files</button>
                <button class="btn ghost small view-job-tickets" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="margin-right:4px;padding:3px 8px;font-size:11px;">🎫 Tickets</button>
                <button class="btn ghost small edit-job" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">Assign / Edit</button>
                <button class="btn danger small del-job" data-id="${e._id}" style="padding:3px 8px;font-size:11px;">Delete</button>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table>
      </div>`}
    </section>
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{w.jobsFilter=e.dataset.jf,h()}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const i=e.dataset.id,n=a.find(b=>b._id===i);if(!n)return;const l=encodeURIComponent(JSON.stringify(n.attachments||[])),r=encodeURIComponent(JSON.stringify(n.deliverables||[])),u=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(n.title||"Untitled Job")}</div>
        </div>

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(n.attachments||[]).length})</h4>
          ${n.attachments&&n.attachments.length?`
            <div data-attachments="${l}">
              ${renderAttachmentChips(n.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(n.deliverables||[]).length})</h4>
          ${n.deliverables&&n.deliverables.length?`
            <div data-attachments="${r}">
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
      `);bindAttachmentUploader("mDelUpload"),u.querySelector("#mDelSaveBtn").onclick=async()=>{const b=getUploaderAttachments("mDelUpload"),$=u.querySelector("#mDelNote").value.trim();if(!b.length){flashToast("Please select at least one deliverable file",!0);return}try{const I=b.map(v=>({...v,notes:$}));await apiPost(`/jobs/${i}/deliverables`,{deliverables:I}),flashToast("Deliverables added! 📦"),u.remove(),h()}catch(I){flashToast(I.message,!0)}},u.querySelector("#mCloseFiles").onclick=()=>u.remove()}}),document.querySelectorAll(".view-job-tickets").forEach(e=>{e.onclick=()=>{const i=e.dataset.id,n=e.dataset.title,l=openModal(`
        <div style="margin-bottom:12px">
          <h3 style="margin-bottom:4px">🎫 Support Tickets</h3>
          <div style="font-size:12px;color:var(--text-3)">${escapeHtml(n)}</div>
        </div>
        ${renderSupportTicketSection(i,!0)}
        <div class="modal-actions" style="margin-top:16px">
          <button class="btn ghost" id="mCloseTickets">Close</button>
        </div>
      `);bindSupportTicketSection(i,!0),l.querySelector("#mCloseTickets").onclick=()=>l.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const i=e.dataset.id,n=a.find(l=>l._id===i);n&&we(n,()=>h())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const i=e.dataset.id,n=e.dataset.done==="false",l=a.find(u=>u._id===i);let r=l?l.completionDate:null;n&&!r&&(r=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+i,{status:n?"Completed":"In Progress",completionDate:r}),flashToast(n?"Job marked as Completed!":"Job marked as In Progress"),h()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),h())})}let O="",U="all";async function J(t){let a=await apiGet("/tickets");a.sort((s,m)=>new Date(m.createdAt)-new Date(s.createdAt));const e=a.length,i=a.filter(s=>s.status==="Open").length,n=a.filter(s=>s.status==="In Review").length,l=a.filter(s=>s.status==="Resolved"||s.status==="Closed").length,r=e>0?Math.round(l/e*100):100,u=w.ticketsFilter||"all";let b=a;if(u==="open"?b=b.filter(s=>s.status==="Open"):u==="in-review"?b=b.filter(s=>s.status==="In Review"):u==="resolved"?b=b.filter(s=>s.status==="Resolved"):u==="closed"&&(b=b.filter(s=>s.status==="Closed")),U!=="all"&&(b=b.filter(s=>s.priority===U)),O){const s=O.toLowerCase();b=b.filter(m=>{const T=m.jobId&&m.jobId.title||"";return(m.subject||"").toLowerCase().includes(s)||(m.message||"").toLowerCase().includes(s)||(m.userName||"").toLowerCase().includes(s)||T.toLowerCase().includes(s)})}const $={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},I={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function v(s){if(!s)return"U";const m=s.trim().split(/\s+/);return m.length===1?m[0].slice(0,2).toUpperCase():(m[0][0]+m[m.length-1][0]).toUpperCase()}function f(s){if(!s)return"";const m=new Date,T=new Date(s),N=Math.floor((m-T)/1e3);if(N<60)return"Just now";const H=Math.floor(N/60);if(H<60)return`${H}m ago`;const B=Math.floor(H/60);if(B<24)return`${B}h ago`;const o=Math.floor(B/24);return o<7?`${o}d ago`:fmtDate(s)}t.innerHTML=`
    <section class="block">
      <!-- Top Metrics Hub -->
      <div class="ticket-hub-kpis">
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon blue">🎫</div>
          <div>
            <div class="ticket-kpi-val">${e}</div>
            <div class="ticket-kpi-lbl">Total Tickets</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon red">🔴</div>
          <div>
            <div class="ticket-kpi-val">${i}</div>
            <div class="ticket-kpi-lbl">Open Action Req.</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon amber">🟡</div>
          <div>
            <div class="ticket-kpi-val">${n}</div>
            <div class="ticket-kpi-lbl">In Review</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon green">⚡</div>
          <div>
            <div class="ticket-kpi-val">${r}%</div>
            <div class="ticket-kpi-lbl">Resolution Rate</div>
          </div>
        </div>
      </div>

      <!-- Controls & Search Bar -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="pchip ${u==="all"?"active":""}" data-tf="all">All (${e})</button>
          <button class="pchip ${u==="open"?"active":""}" data-tf="open">🔴 Open (${i})</button>
          <button class="pchip ${u==="in-review"?"active":""}" data-tf="in-review">🟡 In Review (${n})</button>
          <button class="pchip ${u==="resolved"?"active":""}" data-tf="resolved">🟢 Resolved (${l})</button>
          <button class="pchip ${u==="closed"?"active":""}" data-tf="closed">⚪ Closed</button>
        </div>

        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select id="admTkPriFilter" style="font-size:12.5px;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);color:var(--text-1);outline:none">
            <option value="all" ${U==="all"?"selected":""}>All Priorities</option>
            <option value="Urgent" ${U==="Urgent"?"selected":""}>🔴 Urgent</option>
            <option value="High" ${U==="High"?"selected":""}>🟠 High</option>
            <option value="Medium" ${U==="Medium"?"selected":""}>🟡 Medium</option>
            <option value="Low" ${U==="Low"?"selected":""}>🟢 Low</option>
          </select>

          <div class="ticket-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="admTkSearch" placeholder="Search by subject, user, job…" value="${escapeHtml(O)}">
            ${O?'<button type="button" id="admClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:12px">✕</button>':""}
          </div>
          <button class="btn gold" id="admRaiseTicketGlobalBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Raise Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Cards List -->
      ${b.length===0?renderEmptyState("No support tickets found","No tickets match the active filters or search criteria.","🎫"):`
      <div style="display:flex;flex-direction:column;gap:14px">
        ${b.map(s=>{const m=s.jobId?s.jobId.title||"Untitled Job":"General Workspace Support",T=(s.status||"Open").toLowerCase().replace(" ","-"),N=s.status==="Open",H=(s._id||"").slice(-4).toUpperCase(),B=v(s.userName);return`
          <div class="ticket-card status-${T}" id="adm-tk-${s._id}">
            <div class="ticket-card-header">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
                  <span class="ticket-id-tag">#TK-${H}</span>
                  <span class="ticket-subject">${escapeHtml(s.subject)}</span>
                </div>
                <div style="font-size:12px;color:var(--text-4);margin-top:2px">
                  📁 Job: <strong style="color:var(--text-2)">${escapeHtml(m)}</strong>
                </div>
              </div>
              <div class="ticket-meta-badges">
                <span class="badge ${$[s.status]||"gray"}">
                  ${N?'<span class="pulse-dot"></span>':""} ${escapeHtml(s.status)}
                </span>
                <span class="badge ${I[s.priority]||"gray"}">${escapeHtml(s.priority)}</span>
              </div>
            </div>

            <div class="ticket-author-row">
              <div class="ticket-avatar">${B}</div>
              <div class="ticket-author-meta">
                <div class="ticket-author-name">
                  ${escapeHtml(s.userName)}
                  <span class="ticket-role-pill">${escapeHtml(s.userRole)}</span>
                </div>
                <span class="ticket-time-ago">${f(s.createdAt)} · ${fmtDate(s.createdAt)}</span>
              </div>
            </div>

            <div class="ticket-message-box">
              ${escapeHtml(s.message)}
            </div>

            ${s.adminReply?`
              <div class="ticket-thread-wrap">
                <div class="ticket-admin-reply-card">
                  <div class="ticket-admin-reply-header">
                    <span class="ticket-shield-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Official Support Response
                    </span>
                    ${s.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${f(s.repliedAt)}</span>`:""}
                  </div>
                  <div class="ticket-admin-reply-text">${escapeHtml(s.adminReply)}</div>
                </div>
              </div>`:""}

            <div class="ticket-toolbar">
              <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
              <select class="adm-tk-status-sel" data-tkid="${s._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
                <option value="Open" ${s.status==="Open"?"selected":""}>🔴 Open</option>
                <option value="In Review" ${s.status==="In Review"?"selected":""}>🟡 In Review</option>
                <option value="Resolved" ${s.status==="Resolved"?"selected":""}>🟢 Resolved</option>
                <option value="Closed" ${s.status==="Closed"?"selected":""}>⚪ Closed</option>
              </select>

              <button class="btn ghost small adm-tk-reply-toggle" data-tkid="${s._id}" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${s.adminReply?"Edit Reply":"💬 Reply"}
              </button>

              ${s.status!=="Resolved"?`
                <button class="btn ghost small adm-tk-quick-resolve" data-tkid="${s._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Quick Resolve
                </button>`:""}

              <button class="btn danger small adm-tk-del-btn" data-tkid="${s._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

              <div class="ticket-reply-form" id="adm-tk-replyform-${s._id}">
                <div class="ticket-templates-bar">
                  <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
                  <button type="button" class="ticket-template-btn" data-tkid="${s._id}" data-tpl="We are actively investigating this and will update you shortly.">🔍 Investigating</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${s._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${s._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
                </div>
                <textarea id="adm-tk-replytxt-${s._id}" rows="2" placeholder="Write official response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(s.adminReply||"")}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px">
                  <button class="btn ghost small adm-tk-reply-cancel" data-tkid="${s._id}" type="button">Cancel</button>
                  <button class="btn gold small adm-tk-reply-save" data-tkid="${s._id}" type="button">Save Response</button>
                </div>
              </div>
            </div>
          </div>`}).join("")}
      </div>`}
    </section>
  `,document.querySelectorAll("[data-tf]").forEach(s=>{s.onclick=()=>{w.ticketsFilter=s.dataset.tf,h()}});const p=document.getElementById("admTkSearch");p&&(p.oninput=s=>{O=s.target.value,J(t)});const y=document.getElementById("admClearSearch");y&&(y.onclick=()=>{O="",J(t)});const E=document.getElementById("admTkPriFilter");E&&(E.onchange=s=>{U=s.target.value,J(t)});const c=document.getElementById("admRaiseTicketGlobalBtn");c&&(c.onclick=async()=>{let s=[];try{s=await apiGet("/jobs")}catch{s=[]}const m=openModal(`
        <div style="margin-bottom:14px">
          <h3 style="margin-bottom:4px">🎫 Raise Support Ticket</h3>
          <div style="font-size:12.5px;color:var(--text-3)">Create a new support request, revision note, or blocker report.</div>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Target / Job (Optional)</label>
          <select id="modalTkJob" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="">📁 General Workspace Support (No specific job)</option>
            ${s.map(T=>`<option value="${T._id}">${escapeHtml(T.title||"Untitled Job")} (${escapeHtml(W(T.clientId))})</option>`).join("")}
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
      `);m.querySelector("#mCancelTicket").onclick=()=>m.remove(),m.querySelector("#mSubmitTicket").onclick=async()=>{const T=m.querySelector("#modalTkJob").value||null,N=m.querySelector("#modalTkSub").value.trim(),H=m.querySelector("#modalTkPri").value,B=m.querySelector("#modalTkMsg").value.trim();if(!N){flashToast("Please enter an issue subject",!0);return}if(!B){flashToast("Please enter description",!0);return}try{await apiPost("/tickets",{jobId:T,subject:N,message:B,priority:H}),flashToast("Support Ticket Raised! 🎫"),m.remove(),J(t)}catch(o){flashToast(o.message,!0)}}}),document.querySelectorAll(".adm-tk-quick-resolve").forEach(s=>{s.onclick=async()=>{try{await apiPut("/tickets/"+s.dataset.tkid,{status:"Resolved"}),flashToast("Ticket marked as Resolved! 🎉"),h()}catch(m){flashToast(m.message,!0)}}}),document.querySelectorAll(".ticket-template-btn").forEach(s=>{s.onclick=()=>{const m=document.getElementById("adm-tk-replytxt-"+s.dataset.tkid);m&&(m.value=s.dataset.tpl,m.focus())}}),document.querySelectorAll(".adm-tk-status-sel").forEach(s=>{s.onchange=async()=>{try{await apiPut("/tickets/"+s.dataset.tkid,{status:s.value}),flashToast("Status updated"),h()}catch(m){flashToast(m.message,!0)}}}),document.querySelectorAll(".adm-tk-reply-toggle").forEach(s=>{s.onclick=()=>{const m=document.getElementById("adm-tk-replyform-"+s.dataset.tkid);m&&m.classList.toggle("show")}}),document.querySelectorAll(".adm-tk-reply-cancel").forEach(s=>{s.onclick=()=>{const m=document.getElementById("adm-tk-replyform-"+s.dataset.tkid);m&&m.classList.remove("show")}}),document.querySelectorAll(".adm-tk-reply-save").forEach(s=>{s.onclick=async()=>{const m=document.getElementById("adm-tk-replytxt-"+s.dataset.tkid);if(m)try{await apiPut("/tickets/"+s.dataset.tkid,{adminReply:m.value.trim()}),flashToast("Response saved! 🛡️"),h()}catch(T){flashToast(T.message,!0)}}}),document.querySelectorAll(".adm-tk-del-btn").forEach(s=>{s.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await apiDelete("/tickets/"+s.dataset.tkid),flashToast("Ticket deleted"),h()}catch(m){flashToast(m.message,!0)}}})}function we(t,a){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(o=>o._id||o):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(o=>({personId:String(o.personId._id||o.personId),percent:o.percent!=null?o.percent:0,hours:o.hours!=null?o.hours:0})):V()};function i(){return e.serviceIds.length?e.serviceIds.map(o=>{const S=x.services.find(P=>String(P._id)===String(o));return S?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(S.name)}
          <span class="m-remove-service" data-id="${S._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function n(){return e.assignments.map((o,S)=>`
      <div class="m-person-assign-row" data-idx="${S}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${x.personnel.map(P=>`<option value="${P._id}" ${String(P._id)===String(o.personId)?"selected":""}>${escapeHtml(P.name)}${P.duties?` (${escapeHtml(P.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${o.percent!=null?o.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${o.hours!=null?o.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
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
            ${x.clients.map(o=>`<option value="${o._id}" ${String(o._id)===String(e.clientId)?"selected":""}>${escapeHtml(o.name)}</option>`).join("")}
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
          ${x.services.map(o=>`<option value="${o._id}">${escapeHtml(o.name)}</option>`).join("")}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${i()}
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
  `),r=l.querySelector(".modal");r&&(r.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const u=()=>{const o=e.assignments.reduce((P,j)=>P+(Number(j.percent)||0),0),S=l.querySelector("#mAssignTotalInfo");S&&(S.innerHTML=o===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${o}% Allocated (should be 100%)</span>`)},b=()=>{l.querySelectorAll(".m-remove-service").forEach(o=>{o.onclick=()=>{const S=o.dataset.id;e.serviceIds=e.serviceIds.filter(P=>String(P)!==String(S)),l.querySelector("#mEditServicesTags").innerHTML=i(),b()}})},$=()=>{l.querySelectorAll(".m-person-assign-row").forEach(o=>{const S=Number(o.dataset.idx),P=o.querySelector(".m-a-person");P&&(P.onchange=D=>e.assignments[S].personId=D.target.value);const j=o.querySelector(".m-a-percent");j&&(j.oninput=D=>{e.assignments[S].percent=D.target.value,u()});const d=o.querySelector(".m-a-hours");d&&(d.oninput=D=>e.assignments[S].hours=D.target.value);const A=o.querySelector(".m-a-remove");A&&(A.onclick=()=>{e.assignments.length>1?(e.assignments.splice(S,1),l.querySelector("#mEditAssignRows").innerHTML=n(),$(),u()):flashToast("Job must have at least one team member row",!0)})})},I=l.querySelector("#mCloseJobEdit"),v=l.querySelector("#mEditCancel");I&&(I.onclick=()=>l.remove()),v&&(v.onclick=()=>l.remove());const f=l.querySelector("#mEditTitle");f&&(f.oninput=o=>e.title=o.target.value);const p=l.querySelector("#mEditClient");p&&(p.onchange=o=>e.clientId=o.target.value);const y=l.querySelector("#mEditStatus");y&&(y.onchange=o=>e.status=o.target.value);const E=l.querySelector("#mEditDate");E&&(E.onchange=o=>e.date=o.target.value);const c=l.querySelector("#mEditCompletionDate");c&&(c.onchange=o=>e.completionDate=o.target.value);const s=l.querySelector("#mEditPriority");s&&(s.onchange=o=>e.priority=o.target.value);const m=l.querySelector("#mEditValue");m&&(m.oninput=o=>e.value=o.target.value);const T=l.querySelector("#mEditDesc");T&&(T.oninput=o=>e.description=o.target.value);const N=l.querySelector("#mEditServiceSelect");N&&(N.onchange=o=>{const S=o.target.value;S&&!e.serviceIds.map(String).includes(String(S))&&(e.serviceIds.push(S),l.querySelector("#mEditServicesTags").innerHTML=i(),b()),N.value=""}),b(),$(),u();const H=l.querySelector("#mAddAssignRow");H&&(H.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),l.querySelector("#mEditAssignRows").innerHTML=n(),$(),u()});const B=l.querySelector("#mEditSave");B&&(B.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const o=e.assignments.filter(C=>C.personId&&String(C.personId).trim()!=="");if(!o.length){flashToast("Please select at least one assigned team member",!0);return}for(const C of o)if(C.hours===""||C.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const S=x.clients.find(C=>String(C._id)===String(e.clientId)),j=x.services.filter(C=>e.serviceIds.map(String).includes(String(C._id))).map(C=>C.name).join(", "),d=e.title||(S?`${S.name} — ${j||"Deliverable"}`:j||"Untitled Job"),A=getUploaderAttachments("mEditAttachments"),D=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:d,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:o,attachments:A,deliverables:D});const R=o.map(C=>pe(C.personId)).join(", ");flashToast("Job updated & saved! 📁"),l.remove(),a&&a()}catch(o){flashToast(o.message,!0)}finally{B.disabled=!1,B.textContent="Save & Update Assignments"}})}async function $e(t){M=await apiGet("/dashboard/admin?period="+w.period),t.innerHTML=`${X()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${M.clients.map(a=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(a.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(a.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${a.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(a.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${a.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,Z()}async function me(t){M=await apiGet("/dashboard/admin?period="+w.period),t.innerHTML=`${X()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${M.personnel.map(a=>{const e=(a.status||"active").toLowerCase(),i=a.personId||a._id;return`<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(a.name)}</strong></td><td class="muted">${escapeHtml(a.duties||"")}</td>
              <td>
                <select class="person-status-sel" data-id="${i}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
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
    </section>`,Z(),document.querySelectorAll(".person-status-sel").forEach(a=>{a.onchange=async e=>{const i=a.dataset.id,n=e.target.value;try{await apiPut("/personnel/"+i,{status:n}),await _(),flashToast("Status updated to "+n),me(t)}catch(l){flashToast(l.message,!0)}}})}const G=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function Se(t){const a=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <h2>Accounts <span class="eyebrow">${a.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${G.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${a.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(W(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${G.map(i=>`<td>${escapeHtml(e.roles[i[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>se(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>se(a.find(i=>i._id===e.dataset.id)))}function se(t){const a=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};G.forEach(n=>{e.roles[n[0]]==null&&(e.roles[n[0]]="")});const i=openModal(`
    <h3>${a?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${a?`<select id="rClient"><option value="">Select…</option>${x.clients.map(n=>`<option value="${n._id}">${escapeHtml(n.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(W(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${G.slice(0,5).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">${G.slice(5,10).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${a?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);i.querySelector("#mCancel").onclick=()=>i.remove(),a||(i.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),i.remove(),h())}),i.querySelector("#mSave").onclick=async()=>{const n={};i.querySelectorAll(".r-role").forEach(r=>n[r.dataset.key]=r.value.trim());const l={nature:i.querySelector("#rNature").value,roles:n,difficulty:Number(i.querySelector("#rDifficulty").value)||1,comments:i.querySelector("#rComments").value.trim()};try{if(a){const r=i.querySelector("#rClient").value;if(!r){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:r},l))}else await apiPut("/roster/"+e._id,l);i.remove(),h()}catch(r){flashToast(r.message,!0)}}}function Te(t){if(!t)return"Deliverables";const a={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return a[t]?a[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function Ie(t){const a=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
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
              ${a.map(i=>{var y,E;const n=((y=i.personId)==null?void 0:y.name)||"—",l=((E=i.serviceId)==null?void 0:E.name)||"—",r=Te(i.unit),u=e[i.period]||(i.period?i.period.toUpperCase():"Daily"),b=i.actual||0,$=i.quantity>0?b/i.quantity:0,I=Math.round($*100),v=$>=1?"green":$>=.6?"amber":"red",f=$>=1?"✓ Met":$>=.6?"Behind":"Off Pace",p=Math.min(I,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(n)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(l)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${i.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(r)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${u}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${b} / ${i.quantity} <span style="font-weight:500;color:var(--text-3)">(${I}%)</span></span>
                        <span class="badge ${v}" style="font-size:10px;padding:1px 5px">${f}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${p}%;height:100%;background:var(--${v==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${i._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${i._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`}).join("")||'<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,document.getElementById("addAdminTargetBtn").onclick=()=>ie(null),document.querySelectorAll(".edit-target").forEach(i=>{i.onclick=()=>ie(a.find(n=>n._id===i.dataset.id))}),document.querySelectorAll(".del-target").forEach(i=>{i.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+i.dataset.id),flashToast("Target removed"),h()}catch(n){flashToast(n.message,!0)}}})}function ie(t){var I,v,f,p;const a=!t;t=t||{personId:(I=x.personnel[0])==null?void 0:I._id,serviceId:(v=x.services[0])==null?void 0:v._id,quantity:5,unit:"reels",period:"day"};const e=((f=t.personId)==null?void 0:f._id)||t.personId||"",i=((p=t.serviceId)==null?void 0:p._id)||t.serviceId||"",l=["reels","stories","posts","count","hours"].includes(t.unit),r=openModal(`
    <h3>${a?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${x.personnel.map(y=>`<option value="${y._id}" ${String(y._id)===String(e)?"selected":""}>${escapeHtml(y.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${x.services.map(y=>`<option value="${y._id}" ${String(y._id)===String(i)?"selected":""}>${escapeHtml(y.name)}</option>`).join("")}
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
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const u=r.querySelector("#mTgtUnit"),b=r.querySelector("#mTgtCustomUnitWrap"),$=r.querySelector("#mTgtCustomUnit");u.onchange=()=>{u.value==="custom"?(b.style.display="flex",$.focus()):b.style.display="none"},r.querySelector("#mCancel").onclick=()=>r.remove(),r.querySelector("#mSave").onclick=async()=>{let y=u.value;y==="custom"&&(y=$.value.trim()||"Deliverables");const E=getUploaderAttachments("mTgtAttachments"),c={personId:r.querySelector("#mTgtPerson").value,serviceId:r.querySelector("#mTgtService").value,quantity:Number(r.querySelector("#mTgtQty").value)||1,unit:y,period:r.querySelector("#mTgtPeriod").value,attachments:E};if(!c.personId||!c.serviceId){flashToast("Person and Service are required",!0);return}try{a?await apiPost("/targets",c):await apiPut("/targets/"+t._id,c),flashToast("Target saved successfully! 🎯"),r.remove(),h()}catch(s){flashToast(s.message,!0)}}}async function Ae(t){const[a,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);x.salaryGrades=a,x.salaryAssignments=e;const i={};e.forEach(n=>i[n.personId]=n.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${a.map(n=>`<div class="manage-item"><div><strong>${escapeHtml(n.label)}</strong><div class="muted">${fmtINR(n.min)} – ${fmtINR(n.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${n._id}">Edit</button><button class="btn danger small del-grade" data-id="${n._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${x.personnel.map(n=>`<tr><td><strong>${escapeHtml(n.name)}</strong><div class="muted">${escapeHtml(n.duties||"")}</div></td>
        <td><span class="badge green">${n.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${n._id}"><option value="">Not set</option>${a.map(l=>`<option value="${l._id}" ${i[n._id]===l._id?"selected":""}>${escapeHtml(l.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>le(null),document.querySelectorAll(".edit-grade").forEach(n=>n.onclick=()=>le(a.find(l=>l._id===n.dataset.id))),document.querySelectorAll(".del-grade").forEach(n=>n.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+n.dataset.id),h())}),document.querySelectorAll(".grade-select").forEach(n=>{n.onchange=async()=>{await apiPut("/salary/assignments/"+n.dataset.id,{gradeId:n.value||null}),flashToast("Saved")}})}function le(t){const a=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${a?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!i.label){flashToast("Label required",!0);return}try{a?await apiPost("/salary/grades",i):await apiPut("/salary/grades/"+t._id,i),e.remove(),h()}catch(n){flashToast(n.message,!0)}}}function Ce(t){const a={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${x.personnel.length})</h3>
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
              ${x.personnel.map(l=>`
                <tr>
                  <td><strong>${escapeHtml(l.name)}</strong></td>
                  <td>${escapeHtml(l.duties||"—")}</td>
                  <td class="num"><strong>${l.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${a[l.status]||"green"}">${escapeHtml(l.status||"active")}</span></td>
                  <td class="num">
                    <button class="btn ghost small edit-person" data-id="${l._id}">Edit</button>
                    <button class="btn danger small del-person" data-id="${l._id}">Remove</button>
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${x.clients.length})</h3>
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
              ${x.clients.map(l=>`
                <tr>
                  <td><strong>${escapeHtml(l.name)}</strong></td>
                  <td>${l.notes?escapeHtml(l.notes):'<span class="muted">—</span>'}</td>
                  <td class="num">
                    <button class="btn ghost small edit-client" data-id="${l._id}">Edit</button>
                    <button class="btn danger small del-client" data-id="${l._id}">Remove</button>
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${x.services.length})</h3>
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
              ${x.services.map(l=>`
                <tr>
                  <td><strong>${escapeHtml(l.name)}</strong></td>
                  <td class="num"><strong>${l.hours||0} hrs</strong> baseline</td>
                  <td class="num">
                    <button class="btn ghost small edit-service" data-id="${l._id}">Edit</button>
                    <button class="btn danger small del-service" data-id="${l._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No services added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>ne(null)),document.querySelectorAll(".edit-person").forEach(l=>l.onclick=()=>ne(x.personnel.find(r=>r._id===l.dataset.id))),document.querySelectorAll(".del-person").forEach(l=>l.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+l.dataset.id),await _(),h())});const i=document.getElementById("addClientBtn");i&&(i.onclick=()=>oe(null)),document.querySelectorAll(".edit-client").forEach(l=>l.onclick=()=>oe(x.clients.find(r=>r._id===l.dataset.id))),document.querySelectorAll(".del-client").forEach(l=>l.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+l.dataset.id),await _(),h())});const n=document.getElementById("addServiceBtn");n&&(n.onclick=()=>re(null)),document.querySelectorAll(".edit-service").forEach(l=>l.onclick=()=>re(x.services.find(r=>r._id===l.dataset.id))),document.querySelectorAll(".del-service").forEach(l=>l.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+l.dataset.id),await _(),h())})}const Ee=Ce;function ne(t){const a=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
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
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i=getUploaderAttachments("mPersonFiles"),n={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:i};if(!n.name){flashToast("Name is required",!0);return}try{a?await apiPost("/personnel",n):await apiPut("/personnel/"+t._id,n),await _(),flashToast("Person saved! 📁"),e.remove(),h()}catch(l){flashToast(l.message,!0)}}}function oe(t){const a=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i=getUploaderAttachments("mClientFiles"),n={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:i};if(!n.name){flashToast("Name is required",!0);return}try{a?await apiPost("/clients",n):await apiPut("/clients/"+t._id,n),await _(),flashToast("Client saved! 📁"),e.remove(),h()}catch(l){flashToast(l.message,!0)}}}function re(t){const a=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${a?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const i={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!i.name){flashToast("Name is required",!0);return}try{a?await apiPost("/services",i):await apiPut("/services/"+t._id,i),await _(),e.remove(),h()}catch(n){flashToast(n.message,!0)}}}async function ue(t){const a=await apiGet("/users");let e="all",i="role",n="";function l(){let p=[...a];if(n){const c=n.toLowerCase();p=p.filter(s=>s.name&&s.name.toLowerCase().includes(c)||s.email&&s.email.toLowerCase().includes(c)||s.role&&s.role.toLowerCase().includes(c))}e==="admin"?p=p.filter(c=>c.role==="superadmin"||c.role==="admin"):e==="accounts"?p=p.filter(c=>c.role==="accounts"):e==="employee"?p=p.filter(c=>c.role==="employee"):e==="client"&&(p=p.filter(c=>c.role==="client"));const y={superadmin:1,admin:1,accounts:2,employee:3,client:4};i==="role"?p.sort((c,s)=>{const m=y[c.role]||9,T=y[s.role]||9;return m!==T?m-T:(c.name||"").localeCompare(s.name||"")}):i==="role-desc"?p.sort((c,s)=>{const m=y[c.role]||9,T=y[s.role]||9;return m!==T?T-m:(c.name||"").localeCompare(s.name||"")}):i==="name-asc"?p.sort((c,s)=>(c.name||"").localeCompare(s.name||"")):i==="name-desc"?p.sort((c,s)=>(s.name||"").localeCompare(c.name||"")):i==="status"&&p.sort((c,s)=>(s.active?1:0)-(c.active?1:0));const E=t.querySelector("#userTableBody");if(E){if(p.length===0){E.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}E.innerHTML=p.map(c=>{const s=c.role==="superadmin"||c.role==="admin",m=c.role==="accounts",T=c.role==="employee",N=s?'<span class="badge gold" style="font-weight:700">👑 Admin</span>':m?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':T?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',H=c.personnelId?escapeHtml(c.personnelId.name):c.clientId?escapeHtml(c.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(c.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(c.email)}</span></td>
          <td>${N}</td>
          <td>${H}</td>
          <td><span class="badge ${c.active?"green":"gray"}">${c.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),E.querySelectorAll(".edit-user").forEach(c=>c.onclick=()=>de(a.find(s=>s._id===c.dataset.id))),E.querySelectorAll(".del-user").forEach(c=>c.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+c.dataset.id),flashToast("User removed"),ue(t)}catch(s){flashToast(s.message,!0)}})}}const r=a.filter(p=>p.role==="superadmin"||p.role==="admin").length,u=a.filter(p=>p.role==="accounts").length,b=a.filter(p=>p.role==="employee").length,$=a.filter(p=>p.role==="client").length;t.innerHTML=`
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
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${r})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${u})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${b})</button>
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
    </section>`,l(),t.querySelectorAll(".user-role-filter").forEach(p=>{p.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(y=>y.classList.remove("active")),p.classList.add("active"),e=p.dataset.role,l()}});const I=t.querySelector("#userSortSel");I&&(I.onchange=()=>{i=I.value,l()});const v=t.querySelector("#userSearchInp");v&&(v.oninput=()=>{n=v.value.trim(),l()});const f=t.querySelector("#addUserBtn");f&&(f.onclick=()=>de(null))}function de(t){const a=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,i=openModal(`<h3>${a?"Add":"Edit"} User</h3>
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
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function n(){const l=i.querySelector("#uRole").value,r=i.querySelector("#uLinkWrap");l==="employee"?r.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${x.personnel.map(u=>`<option value="${u._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:l==="client"?r.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${x.clients.map(u=>`<option value="${u._id}" ${t.clientId&&(t.clientId._id||t.clientId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:r.innerHTML=""}i.querySelector("#uRole").onchange=n,n(),i.querySelector("#mCancel").onclick=()=>i.remove(),i.querySelector("#mSave").onclick=async()=>{var b,$;const l=i.querySelector("#uRole").value,r={name:i.querySelector("#uName").value.trim(),email:i.querySelector("#uEmail").value.trim(),role:l,active:i.querySelector("#uActive").checked,personnelId:l==="employee"&&((b=i.querySelector("#uPersonnel"))==null?void 0:b.value)||null,clientId:l==="client"&&(($=i.querySelector("#uClient"))==null?void 0:$.value)||null},u=i.querySelector("#uPassword").value;if(u&&(r.password=u),!r.name||!r.email){flashToast("Name and email required",!0);return}if(a&&!u){flashToast("Password required for a new user",!0);return}try{a?await apiPost("/users",r):await apiPut("/users/"+t._id,r),i.remove(),h()}catch(I){flashToast(I.message,!0)}}}let k={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};function ce(t,a){let e;if(!t||t==="all")e=new Date;else{const r=t.split("-");r.length===3?e=new Date(Number(r[0]),Number(r[1])-1,Number(r[2])):e=new Date}e.setDate(e.getDate()+a);const i=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${i}-${n}-${l}`}async function ve(t){const[a,e]=await Promise.all([apiGet("/tasks"),apiGet("/personnel").catch(()=>x.personnel||[])]),i=new Date,n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`,l=k.date;let r=a;l!=="all"&&(r=a.filter(d=>d.dueDate?new Date(d.dueDate).toISOString().slice(0,10)===l:l===n));let u=r;k.personnelId!=="all"&&(u=u.filter(d=>{var D;const A=((D=d.personnelId)==null?void 0:D._id)||d.personnelId;return String(A)===String(k.personnelId)}));const b=u.length,$=u.filter(d=>d.status==="Completed").length,I=b-$,v=b>0?Math.round($/b*100):0;let f=u;if(k.filter==="active"?f=f.filter(d=>d.status!=="Completed"):k.filter==="completed"&&(f=f.filter(d=>d.status==="Completed")),k.search){const d=k.search.toLowerCase();f=f.filter(A=>{var C,q;const D=(((C=A.personnelId)==null?void 0:C.name)||((q=A.userId)==null?void 0:q.name)||"").toLowerCase(),R=(A.title||"").toLowerCase();return D.includes(d)||R.includes(d)})}const p={};f.forEach(d=>{var C,q,L,z,ee,te;const A=((C=d.personnelId)==null?void 0:C._id)||((q=d.userId)==null?void 0:q._id)||"unknown",D=((L=d.personnelId)==null?void 0:L.name)||((z=d.userId)==null?void 0:z.name)||"Unassigned Employee",R=((ee=d.personnelId)==null?void 0:ee.department)||((te=d.personnelId)==null?void 0:te.role)||"Team Member";p[A]||(p[A]={id:A,name:D,dept:R,tasks:[]}),p[A].tasks.push(d)});const y=Object.values(p),E=l===n;t.innerHTML=`
    <div class="block">
      <!-- Top Title & Navigation Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;display:flex;align-items:center;gap:8px">
            <span>Employee Daily Tasks</span>
            <span class="eyebrow">${b} total tasks</span>
          </h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">Live employee daily checklist activity, real-time completion tracking, and submissions</p>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="admDailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${E?"primary":"ghost"} small" id="admDailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="admDailyDatePickerInp" class="daily-date-picker-inp" value="${l==="all"?n:l}">

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
          <div class="kpi-value">${b}</div>
          <div class="kpi-sub">${l==="all"?"Across all dates":E?"Logged for today":l}</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Completed Tasks</span><div class="kpi-icon">✅</div></div>
          <div class="kpi-value" style="color:var(--green-600)">${$}</div>
          <div class="kpi-sub">${v}% achievement rate</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Pending / To Do</span><div class="kpi-icon">⏳</div></div>
          <div class="kpi-value" style="color:var(--amber-600)">${I}</div>
          <div class="kpi-sub">Items in progress</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Team Members</span><div class="kpi-icon">👥</div></div>
          <div class="kpi-value">${y.length}</div>
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
                <option value="${d._id}" ${k.personnelId===d._id?"selected":""}>${escapeHtml(d.name)} (${d.role||d.department||"Staff"})</option>
              `).join("")}
            </select>
          </div>
          <div style="width:135px">
            <input type="date" id="admDailyAssignDate" value="${l==="all"?n:l}" style="width:100%;padding:7px 10px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);font-size:12px;outline:none" />
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
            <button class="pchip ${k.filter==="all"?"active":""}" data-atf="all">All (${b})</button>
            <button class="pchip ${k.filter==="active"?"active":""}" data-atf="active">Pending (${I})</button>
            <button class="pchip ${k.filter==="completed"?"active":""}" data-atf="completed">✓ Completed (${$})</button>
          </div>

          <!-- Right: Employee Picker & Search -->
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:12px;font-weight:700;color:var(--text-3)">Employee:</span>
              <select id="admTaskPersonFilter" style="font-size:12.5px;padding:6px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);outline:none">
                <option value="all" ${k.personnelId==="all"?"selected":""}>All Employees (${e.length})</option>
                ${e.map(d=>`
                  <option value="${d._id}" ${k.personnelId===d._id?"selected":""}>${escapeHtml(d.name)} (${d.role||d.department||"Staff"})</option>
                `).join("")}
              </select>
            </div>

            <div class="ticket-search-box" style="margin:0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="admTaskSearchInp" placeholder="Search tasks or employee…" value="${escapeHtml(k.search)}" style="font-size:12px;padding:5px 8px">
              ${k.search?'<button type="button" id="admTaskClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
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
      ${y.length===0?`
        <div class="card" style="text-align:center;padding:56px 20px">
          <div style="font-size:40px;margin-bottom:10px">📋</div>
          <div style="font-weight:700;font-size:16px;color:var(--text-1);margin-bottom:4px">No daily tasks found</div>
          <div style="font-size:13px;color:var(--text-3);max-width:380px;margin:0 auto">No tasks have been entered for this date. You can assign tasks using the form above, or wait for employees to add checklist items.</div>
        </div>
      `:`
        <div style="display:flex;flex-direction:column;gap:18px">
          ${y.map(d=>{const A=d.tasks.length,D=d.tasks.filter(q=>q.status==="Completed").length,R=A>0?Math.round(D/A*100):0,C=A>0&&D===A;return`
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
                    <span style="font-size:12.5px;font-weight:700;color:${C?"var(--green-600)":"var(--text-2)"}">
                      ${D} of ${A} completed (${R}%)
                    </span>
                    <div style="width:100px;height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
                      <div style="width:${R}%;height:100%;background:${C?"var(--green-500)":"var(--brand-500)"};transition:width 0.4s ease"></div>
                    </div>
                    <button type="button" class="btn ghost small" onclick="adminQuickAddTaskForEmp('${d.id}')" style="font-size:11.5px;color:var(--brand-500);padding:3px 8px;font-weight:700" title="Add a task for this employee">
                      + Add Task
                    </button>
                    ${D>0?`
                      <button type="button" class="btn ghost small" onclick="adminClearCompletedTasks('${d.id}')" style="font-size:11px;color:var(--text-3);padding:3px 7px" title="Delete completed tasks for this employee">
                        Clear Done (${D})
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Employee Checklist Items -->
                <div>
                  ${d.tasks.map(q=>{const L=q.status==="Completed",z=q.dueDate?new Date(q.dueDate).toISOString().slice(0,10):"";return`
                      <div class="daily-item-row ${L?"completed":""}" style="padding:12px 20px">
                        <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                          <button type="button" class="daily-circle-check ${L?"checked":""}" onclick="adminToggleTask('${q._id}')" title="${L?"Mark Incomplete":"Mark Complete"}">
                            ✓
                          </button>
                          <div style="flex:1">
                            <span class="daily-item-text" style="cursor:pointer" onclick="adminToggleTask('${q._id}')">
                              ${escapeHtml(q.title)}
                            </span>
                            ${q.description?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${escapeHtml(q.description)}</div>`:""}
                          </div>
                        </div>

                        <div class="daily-actions-hover" style="opacity:1">
                          ${z?`<span class="task-tag-pill" style="font-size:10.5px">📅 ${z===n?"Today":z}</span>`:""}
                          ${q.completedAt?'<span class="task-tag-pill" style="color:var(--green-600);background:rgba(16,185,129,0.1);font-size:10.5px">Done</span>':""}
                          <button type="button" class="btn ghost small" onclick="adminEditTask('${q._id}')" title="Edit this task" style="padding:3px 7px;font-size:11.5px">✏️</button>
                          <button type="button" class="btn ghost small" onclick="adminDeleteTask('${q._id}')" title="Delete this task" style="padding:3px 7px;font-size:11.5px;color:var(--red-500)">🗑️</button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `;const c=document.getElementById("admDailyPrevDayBtn");c&&(c.onclick=()=>{k.date=ce(k.date,-1),h()});const s=document.getElementById("admDailyNextDayBtn");s&&(s.onclick=()=>{k.date=ce(k.date,1),h()});const m=document.getElementById("admDailyTodayBtn");m&&(m.onclick=()=>{k.date=n,h()});const T=document.getElementById("admDailyAllDatesBtn");T&&(T.onclick=()=>{k.date=k.date==="all"?n:"all",h()});const N=document.getElementById("admDailyDatePickerInp");N&&(N.onchange=d=>{d.target.value&&(k.date=d.target.value,h())}),document.querySelectorAll("[data-atf]").forEach(d=>{d.onclick=()=>{k.filter=d.dataset.atf,h()}});const H=document.getElementById("admTaskPersonFilter");H&&(H.onchange=d=>{k.personnelId=d.target.value,h()});const B=document.getElementById("admTaskSearchInp");B&&(B.oninput=d=>{k.search=d.target.value,ve(t)});const o=document.getElementById("admTaskClearSearch");o&&(o.onclick=()=>{k.search="",h()});const S=document.getElementById("admDailyTaskInp"),P=document.getElementById("admDailyAddBtn"),j=async()=>{const d=((S==null?void 0:S.value)||"").trim();if(!d){flashToast("Please enter a task title",!0);return}const A=document.getElementById("admDailyAssignSelect"),D=document.getElementById("admDailyAssignDate"),R=document.getElementById("admDailyAssignPriority"),C=(A==null?void 0:A.value)||"all",q=(D==null?void 0:D.value)||(k.date==="all"?n:k.date),L=(R==null?void 0:R.value)||"Medium";try{const z={title:d,dueDate:q,priority:L,status:"Todo"};C==="all"?(z.assignAll=!0,z.personnelId="all"):z.personnelId=C,await apiPost("/tasks",z),flashToast(C==="all"?"Task assigned to all active employees! 👥":"Task assigned! ✍️"),S&&(S.value="",S.focus()),h()}catch(z){flashToast(z.message,!0)}};P&&(P.onclick=j),S&&(S.onkeydown=d=>{d.key==="Enter"&&j()})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),h()}catch(a){flashToast(a.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(n=>n._id===t);if(!e)return;const i=prompt("Edit task title:",e.title);i!==null&&i.trim()&&(await apiPut("/tasks/"+t,{title:i.trim()}),flashToast("Task updated"),h())}catch(a){flashToast(a.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const a=prompt("Enter task for this employee:");if(!(!a||!a.trim()))try{const e=new Date,i=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,n=k.date==="all"?i:k.date;await apiPost("/tasks",{title:a.trim(),personnelId:t,dueDate:n,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),h()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),h()}catch(a){flashToast(a.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const a={date:k.date};t&&t!=="all"?a.personnelId=t:k.personnelId&&k.personnelId!=="all"&&(a.personnelId=k.personnelId);const e=await apiPost("/tasks/clear-completed",a);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),h()}catch(a){flashToast(a.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,a=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!a&&!e&&w.tab!=="logjob"&&h()});ge();
