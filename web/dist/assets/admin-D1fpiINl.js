import{l as ie,m as ne}from"./api-DijGpCeC.js";import{initProposalStudio as le}from"./proposals-DQFCiaP5.js";import{i as oe,a as re,b as de}from"./supporttickets-G2SVWvX9.js";let P=null,v={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},C=null,g={tab:"dashboard",period:"month",jobsFilter:"all"},p={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function ce(){initTheme(),P=requireAuth("superadmin"),P&&(await E(),O())}async function E(){const[t,s,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);v.personnel=t,v.clients=s,v.services=e}function L(){const t=v.personnel.find(a=>/mansi/i.test(a.name)),s=v.personnel.find(a=>/urna/i.test(a.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),s&&e.push({personId:s._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function te(t){const s=v.personnel.find(e=>e._id===t);return s?s.name:"—"}function F(t){const s=v.clients.find(e=>e._id===t);return s?s.name:"—"}const j=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"billing_dashboard",label:"Accounts Dashboard",icon:"💳"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Settings & Manage",icon:"⚙️"}];function O(){const t=document.getElementById("app"),s=j.find(e=>e.key===g.tab)||j[0];t.innerHTML=renderAppShell({user:P,currentRole:"superadmin",activeTab:g.tab,tabs:j,title:s.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{g.tab=e,O()}),y()}window.ci360NavTab=(t,s={})=>{g.tab=t,g.tabParams=s,O()};async function y(t=!1){const s=document.getElementById("content");if(s){!t&&!s.dataset.loaded&&(s.innerHTML=renderSkeletonCards(4)),s.dataset.loaded="true";try{if(g.tab==="dashboard")await ve(s);else if(g.tab==="dailytasks")await Ie(s);else if(g.tab==="tickets"||g.tab==="supporttickets")await ue(s);else if(g.tab==="proposals")await pe(s);else if(g.tab==="teambonding"||g.tab==="bonding")await me(s);else if(g.tab==="logjob")D(s);else if(g.tab==="jobs")await he(s);else if(g.tab==="byclient")await we(s);else if(g.tab==="byperson")await se(s);else if(g.tab==="accounts")await Se(s);else if(g.tab==="billing_dashboard"){window.location.href="/accounts";return}else g.tab==="targets"?await ke(s):g.tab==="salaries"?await Ae(s):g.tab==="settings"||g.tab==="manage"?Te(s):g.tab==="users"&&await ae(s)}catch(e){s.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(e.message)}</div>`}}}async function pe(t){t.innerHTML='<div id="proposals-module-root"></div>';const s=t.querySelector("#proposals-module-root");le(s)}async function me(t){t.innerHTML='<div id="teambonding-module-root"></div>';const s=t.querySelector("#teambonding-module-root");de(s,{currentUser:P})}async function ue(t){t.innerHTML='<div id="support-tickets-module-root"></div>';const s=t.querySelector("#support-tickets-module-root"),e=g.tabParams||{};re(s,{userRole:"superadmin",currentUser:P,initialJobId:e.jobId||null})}function J(){return renderPeriodPicker(g.period)}function W(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{g.period=t.dataset.period,y()}})}async function ve(t){C=await apiGet("/dashboard/admin?period="+g.period);const s=C.overview;t.innerHTML=`
    <div class="dash-overview-header">
      <div class="dash-overview-title-wrap">
        <h2 style="font-size:22px;font-weight:700;color:var(--navy-900);margin:0 0 2px 0;">Dashboard Overview</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      ${J()}
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
          <div class="value">${fmtINR(s.totalValue)}</div>
          <div class="sub">across ${s.activeClients} of ${s.totalClients} active clients</div>
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
          <div class="value">${s.totalJobs}</div>
          <div class="sub">${fmtHours(s.totalHours)} of effort tracked</div>
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
          <div class="value" style="color:var(--red)">${s.overworked}</div>
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
          <div class="value" style="color:var(--blue)">${s.underused}</div>
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


    <section class="block">
      <h2>Roadmap Signals <span class="eyebrow">Auto-generated</span></h2>
      ${C.insights.length?C.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${V(C.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${V(C.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${C.personnel.filter(e=>e.status!=="inactive").map(ge).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,W()}function V(t,s){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(a=>a[1]));return t.map(([a,i])=>`
    <div class="bar-row">
      <div>${escapeHtml(a)}</div>
      <div class="bar-track"><div class="bar-fill ${s?"gold":""}" style="width:${(i/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(i)}</div>
    </div>`).join("")}function ge(t){const s=Math.min(t.utilization,160);return`
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
        <div class="gauge-fill" style="left:${Math.min(s/1.6,99)}%;"></div>
      </div>
    </div>`}function D(t){(!p.assignments||p.assignments.every(e=>!e.personId))&&(p.assignments=L());const s=p.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0);t.innerHTML=`
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
                ${v.clients.map(e=>`<option value="${e._id}" ${e._id===p.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${p.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${p.completion||""}" placeholder="dd.mm.yyyy">
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
                ${v.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${p.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${p.serviceIds.map(e=>{const a=v.services.find(i=>i._id===e);return a?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(a.name)}
                      <span class="remove-service-tag" data-id="${a._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `:""}).join("")}
              </div>
            `:""}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="jValue" value="${p.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(p.desc||"")}</textarea>
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
              ${p.assignments.map((e,a)=>be(e,a)).join("")}
            </div>
            <button class="btn ghost small" id="addAssignRow" type="button" style="margin-top:10px;">+ Add Team Member</button>
            <div style="margin-top:14px;">
              <div class="assign-total ${s!==100?"warn":""}">
                <span>${s===100?"✓":"⚠️"}</span>
                <span>${s}% of work allocated ${s!==100?"— should total 100%":"(100% Complete)"}</span>
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
  `,fe()}function be(t,s){return`
    <div class="person-assign-row" data-idx="${s}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${v.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
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
  `}function fe(){const t=document.getElementById("jClient");t&&(t.onchange=d=>p.clientId=d.target.value);const s=document.getElementById("addNewClientBtn");s&&(s.onclick=()=>{const d=openModal(`
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
      `);d.querySelector("#mCancel").onclick=()=>d.remove(),d.querySelector("#mSave").onclick=async()=>{const b=d.querySelector("#newClientName").value.trim(),o=d.querySelector("#newClientNotes").value.trim();if(!b){flashToast("Client name is required",!0);return}try{const S=await apiPost("/clients",{name:b,notes:o});await E(),p.clientId=S._id,flashToast("Client added"),d.remove(),D(document.getElementById("content"))}catch(S){flashToast(S.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=d=>p.date=d.target.value);const a=document.getElementById("jCompletion");a&&(a.onchange=d=>p.completion=d.target.value);const i=document.getElementById("jService");i&&(i.onchange=d=>{const b=d.target.value;b&&(p.serviceIds.includes(b)||p.serviceIds.push(b),D(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(d=>{d.onclick=b=>{b.stopPropagation();const o=d.dataset.id;p.serviceIds=p.serviceIds.filter(S=>S!==o),D(document.getElementById("content"))}});const n=document.getElementById("addNewServiceBtn");n&&(n.onclick=()=>{const d=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);d.querySelector("#mCancel").onclick=()=>d.remove(),d.querySelector("#mSave").onclick=async()=>{const b=d.querySelector("#newServiceName").value.trim();if(!b){flashToast("Service name is required",!0);return}try{const o=await apiPost("/services",{name:b});await E(),p.serviceIds.includes(o._id)||p.serviceIds.push(o._id),flashToast("Service added"),d.remove(),D(document.getElementById("content"))}catch(o){flashToast(o.message,!0)}}});const r=document.getElementById("jDesc");r&&(r.oninput=d=>p.desc=d.target.value);const m=document.getElementById("jValue");m&&(m.oninput=d=>p.value=d.target.value),document.querySelectorAll(".person-assign-row").forEach(d=>{const b=Number(d.dataset.idx),o=d.querySelector(".a-person");o&&(o.onchange=u=>p.assignments[b].personId=u.target.value);const S=d.querySelector(".a-percent");S&&(S.oninput=u=>{p.assignments[b].percent=u.target.value,ye()});const k=d.querySelector(".a-hours");k&&(k.oninput=u=>p.assignments[b].hours=u.target.value);const c=d.querySelector(".a-remove");c&&(c.onclick=()=>{p.assignments.length>1&&(p.assignments.splice(b,1),D(document.getElementById("content")))})});const x=document.getElementById("addAssignRow");x&&(x.onclick=()=>{p.assignments.push({personId:"",percent:0,hours:""}),D(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:p.attachments||[]});const h=document.getElementById("clearJobBtn");h&&(h.onclick=()=>{p={title:"",assignments:L(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),D(document.getElementById("content"))});const f=document.getElementById("saveJobBtn");f&&(f.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!p.clientId){flashToast("Please select a client",!0);return}if(!p.serviceIds||!p.serviceIds.length){flashToast("Please select at least one service",!0);return}const d=p.assignments.filter(u=>u.personId);if(!d.length){flashToast("Please assign at least one person",!0);return}for(const u of d)if(u.hours===""||u.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const b=v.clients.find(u=>u._id===p.clientId),S=v.services.filter(u=>p.serviceIds.includes(u._id)).map(u=>u.name).join(", "),k=p.title||(b?`${b.name} — ${S||"Deliverable"}`:S||"Untitled Job"),c=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:k,clientId:p.clientId,serviceIds:p.serviceIds,date:p.date||new Date().toISOString().slice(0,10),completionDate:p.completion||null,value:Number(p.value)||0,description:p.desc||"",assignments:d,attachments:c}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),p={title:"",assignments:L(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},g.tab="jobs",y()}catch(d){flashToast(d.message,!0)}})}function ye(){const t=p.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0),s=document.querySelector(".assign-total");s&&(s.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,s.classList.toggle("warn",t!==100))}async function he(t){let s=await apiGet("/jobs");s.sort((e,a)=>new Date(a.date)-new Date(e.date)),g.jobsFilter==="progress"&&(s=s.filter(e=>!e.completionDate)),g.jobsFilter==="done"&&(s=s.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${s.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${g.jobsFilter==="all"?"active":""}" data-jf="all">All</button>
        <button class="pchip ${g.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${g.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${s.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${s.map(e=>{const a=e.status==="Completed",i=(e.assignments||[]).map(m=>`${escapeHtml(te(m.personId))} (${m.percent}%)`).join(", "),n=(e.attachments||[]).length,r=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${n?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${n} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${n} Brief</span></button>`:""}
                  ${r?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${r} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${r} Work</span></button>`:""}
                  ${!n&&!r?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${a?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${a}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${a?"green":e.status==="Needs Revision"||e.status==="Denied"?"red":"amber"}">${a?"Completed":e.status==="Needs Revision"?"Needs Revision":e.status==="Denied"?"Denied":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`<span style="font-size:10px;font-weight:700;color:var(--amber-500)">↺ Revision Req.</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(e.clientApproval?.feedback||"")}" data-type="revision" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:e.clientApproval&&e.clientApproval.isRevised?'<span style="font-size:10px;font-weight:700;color:var(--brand-500)">📦 Revised — Awaiting Re-approval</span>':e.status==="Denied"||e.clientApproval?.status==="Denied"?`<span style="font-size:10px;font-weight:700;color:var(--red-500)" title="Reason: ${escapeHtml(e.clientApproval?.deniedReason||"")}">❌ Denied</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(e.clientApproval?.deniedReason||"")}" data-type="denial" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:""}
                </div>
              </td>
              <td>${escapeHtml(F(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(m=>`<span class="badge gray">${escapeHtml(m)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${i||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((m,x)=>m+(Number(x.hours)||0),0))}</td>
              <td style="text-align:right;white-space:nowrap;">
                <button class="btn ghost small job-ticket-btn" data-id="${e._id}" title="Support Tickets linked to this Job" style="margin-right:4px;padding:3px 8px;font-size:11px;">🎫 Ticket</button>
                <button class="btn ghost small view-job-files" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">📁 Files</button>
                <button class="btn ghost small edit-job" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">Assign / Edit</button>
                <button class="btn danger small del-job" data-id="${e._id}" style="padding:3px 8px;font-size:11px;">Delete</button>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table>
      </div>`}
    </section>
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{g.jobsFilter=e.dataset.jf,y()}),document.querySelectorAll(".job-ticket-btn").forEach(e=>{e.onclick=()=>{window.ci360NavTab("tickets",{jobId:e.dataset.id})}}),document.querySelectorAll(".admin-resubmit-btn").forEach(e=>{e.onclick=()=>Ee(e.dataset.id,e.dataset.title,e.dataset.reason,e.dataset.type)}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,i=s.find(x=>x._id===a);if(!i)return;const n=encodeURIComponent(JSON.stringify(i.attachments||[])),r=encodeURIComponent(JSON.stringify(i.deliverables||[])),m=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i.title||"Untitled Job")}</div>
        </div>

        ${i.clientApproval?.status==="Revision Requested"||i.status==="Needs Revision"?`
          <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--amber-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>⚠️</span> Client Requested Changes / Revision
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(i.clientApproval?.feedback||"Revision requested")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${i._id}', '${escapeHtml(i.title||"Job")}', '${escapeHtml(i.clientApproval?.feedback||"")}', 'revision')" style="font-weight:700">
              🔁 Resubmit Revised Work
            </button>
          </div>
        `:i.status==="Denied"||i.clientApproval?.status==="Denied"?`
          <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--red-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>❌</span> Job Denied by Client
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(i.clientApproval?.deniedReason||"Job denied")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${i._id}', '${escapeHtml(i.title||"Job")}', '${escapeHtml(i.clientApproval?.deniedReason||"")}', 'denial')" style="font-weight:700">
              🔁 Resubmit Corrected Work
            </button>
          </div>
        `:""}

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(i.attachments||[]).length})</h4>
          ${i.attachments&&i.attachments.length?`
            <div data-attachments="${n}">
              ${renderAttachmentChips(i.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(i.deliverables||[]).length})</h4>
          ${i.deliverables&&i.deliverables.length?`
            <div data-attachments="${r}">
              ${renderAttachmentChips(i.deliverables)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No completed deliverables attached yet.</div>'}
        </div>

        <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:14px;margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:6px">+ Upload Deliverables to Job</h4>
          <p style="font-size:11.5px;color:var(--text-3);margin-bottom:10px">Add completed artifacts, links, or finalized files for this job</p>
          <div class="field" style="margin-bottom:10px">
            <label>Deliverable Notes / Version description</label>
            <input type="text" id="mDelNote" placeholder="e.g. Final Website build, Video Cut v2 (color graded)" />
          </div>
          <div class="field" style="margin-bottom:10px">
            <label style="font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
            <input type="url" id="mDelUrl" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="width:100%;box-sizing:border-box" />
            <span style="font-size:11px;color:var(--text-4)">For live websites, applications, Figma links or cloud files</span>
          </div>
          ${renderAttachmentUploader({id:"mDelUpload",label:"Upload Deliverable Files (Optional if URL provided)",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, or images"})}
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:12px">
            <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
              <input type="checkbox" id="mDelMarkComplete" checked style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
              <span>Mark Work Completed &amp; Send to Client for Approval</span>
            </label>
            <button type="button" class="btn gold small" id="mDelSaveBtn">Save Deliverables &amp; Send to Client</button>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCloseFiles">Close</button>
        </div>
      `);bindAttachmentUploader("mDelUpload"),m.querySelector("#mDelSaveBtn").onclick=async()=>{const x=getUploaderAttachments("mDelUpload"),h=m.querySelector("#mDelNote").value.trim(),f=(m.querySelector("#mDelUrl")||{}).value?.trim()||"",d=m.querySelector("#mDelMarkComplete")?.checked??!0,b=x.map(o=>({...o,notes:h}));if(f){let o=f;/^https?:\/\//i.test(o)||(o="https://"+o),b.unshift({name:h?`${h} (Live URL)`:"Live Deliverable URL / Website",url:o,type:"url",size:0,notes:h||"Live URL"})}if(!b.length){flashToast("Please enter a deliverable URL or select files",!0);return}try{await apiPost(`/jobs/${a}/deliverables`,{deliverables:b,markComplete:d}),flashToast(d?"Deliverables added & sent to Client for Approval! 📦🎉":"Deliverables added! 📦"),m.remove(),y()}catch(o){flashToast(o.message,!0)}},m.querySelector("#mCloseFiles").onclick=()=>m.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,i=s.find(n=>n._id===a);i&&xe(i,()=>y())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const a=e.dataset.id,i=e.dataset.done==="false",n=s.find(m=>m._id===a);let r=n?n.completionDate:null;i&&!r&&(r=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+a,{status:i?"Completed":"In Progress",completionDate:r}),flashToast(i?"Job marked as Completed!":"Job marked as In Progress"),y()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),y())})}function xe(t,s){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(l=>l._id||l):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(l=>({personId:String(l.personId._id||l.personId),percent:l.percent!=null?l.percent:0,hours:l.hours!=null?l.hours:0})):L()};function a(){return e.serviceIds.length?e.serviceIds.map(l=>{const w=v.services.find($=>String($._id)===String(l));return w?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(w.name)}
          <span class="m-remove-service" data-id="${w._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function i(){return e.assignments.map((l,w)=>`
      <div class="m-person-assign-row" data-idx="${w}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${v.personnel.map($=>`<option value="${$._id}" ${String($._id)===String(l.personId)?"selected":""}>${escapeHtml($.name)}${$.duties?` (${escapeHtml($.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${l.percent!=null?l.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${l.hours!=null?l.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div style="display:flex;justify-content:center;">
          <button class="btn-remove-person m-a-remove" type="button" title="Remove person" style="cursor:pointer;background:none;border:none;color:var(--red);font-weight:bold;font-size:16px;">✕</button>
        </div>
      </div>
    `).join("")}const n=openModal(`
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
            ${v.clients.map(l=>`<option value="${l._id}" ${String(l._id)===String(e.clientId)?"selected":""}>${escapeHtml(l.name)}</option>`).join("")}
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
          ${v.services.map(l=>`<option value="${l._id}">${escapeHtml(l.name)}</option>`).join("")}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${a()}
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
  `),r=n.querySelector(".modal");r&&(r.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const m=()=>{const l=e.assignments.reduce(($,q)=>$+(Number(q.percent)||0),0),w=n.querySelector("#mAssignTotalInfo");w&&(w.innerHTML=l===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${l}% Allocated (should be 100%)</span>`)},x=()=>{n.querySelectorAll(".m-remove-service").forEach(l=>{l.onclick=()=>{const w=l.dataset.id;e.serviceIds=e.serviceIds.filter($=>String($)!==String(w)),n.querySelector("#mEditServicesTags").innerHTML=a(),x()}})},h=()=>{n.querySelectorAll(".m-person-assign-row").forEach(l=>{const w=Number(l.dataset.idx),$=l.querySelector(".m-a-person");$&&($.onchange=R=>e.assignments[w].personId=R.target.value);const q=l.querySelector(".m-a-percent");q&&(q.oninput=R=>{e.assignments[w].percent=R.target.value,m()});const B=l.querySelector(".m-a-hours");B&&(B.oninput=R=>e.assignments[w].hours=R.target.value);const _=l.querySelector(".m-a-remove");_&&(_.onclick=()=>{e.assignments.length>1?(e.assignments.splice(w,1),n.querySelector("#mEditAssignRows").innerHTML=i(),h(),m()):flashToast("Job must have at least one team member row",!0)})})},f=n.querySelector("#mCloseJobEdit"),d=n.querySelector("#mEditCancel");f&&(f.onclick=()=>n.remove()),d&&(d.onclick=()=>n.remove());const b=n.querySelector("#mEditTitle");b&&(b.oninput=l=>e.title=l.target.value);const o=n.querySelector("#mEditClient");o&&(o.onchange=l=>e.clientId=l.target.value);const S=n.querySelector("#mEditStatus");S&&(S.onchange=l=>e.status=l.target.value);const k=n.querySelector("#mEditDate");k&&(k.onchange=l=>e.date=l.target.value);const c=n.querySelector("#mEditCompletionDate");c&&(c.onchange=l=>e.completionDate=l.target.value);const u=n.querySelector("#mEditPriority");u&&(u.onchange=l=>e.priority=l.target.value);const T=n.querySelector("#mEditValue");T&&(T.oninput=l=>e.value=l.target.value);const I=n.querySelector("#mEditDesc");I&&(I.oninput=l=>e.description=l.target.value);const H=n.querySelector("#mEditServiceSelect");H&&(H.onchange=l=>{const w=l.target.value;w&&!e.serviceIds.map(String).includes(String(w))&&(e.serviceIds.push(w),n.querySelector("#mEditServicesTags").innerHTML=a(),x()),H.value=""}),x(),h(),m();const U=n.querySelector("#mAddAssignRow");U&&(U.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),n.querySelector("#mEditAssignRows").innerHTML=i(),h(),m()});const N=n.querySelector("#mEditSave");N&&(N.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const l=e.assignments.filter(A=>A.personId&&String(A.personId).trim()!=="");if(!l.length){flashToast("Please select at least one assigned team member",!0);return}for(const A of l)if(A.hours===""||A.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const w=v.clients.find(A=>String(A._id)===String(e.clientId)),q=v.services.filter(A=>e.serviceIds.map(String).includes(String(A._id))).map(A=>A.name).join(", "),B=e.title||(w?`${w.name} — ${q||"Deliverable"}`:q||"Untitled Job"),_=getUploaderAttachments("mEditAttachments"),R=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:B,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:l,attachments:_,deliverables:R});const De=l.map(A=>te(A.personId)).join(", ");flashToast("Job updated & saved! 📁"),n.remove(),s&&s()}catch(l){flashToast(l.message,!0)}finally{N.disabled=!1,N.textContent="Save & Update Assignments"}})}async function we(t){C=await apiGet("/dashboard/admin?period="+g.period),t.innerHTML=`${J()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${C.clients.map(s=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(s.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${s.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${s.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,W()}async function se(t){C=await apiGet("/dashboard/admin?period="+g.period),t.innerHTML=`${J()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${C.personnel.map(s=>{const e=(s.status||"active").toLowerCase(),a=s.personId||s._id;return`<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(s.name)}</strong></td><td class="muted">${escapeHtml(s.duties||"")}</td>
              <td>
                <select class="person-status-sel" data-id="${a}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
                  <option value="active" ${e==="active"?"selected":""}>🟢 Active</option>
                  <option value="work from home" ${e==="work from home"||e==="wfh"?"selected":""}>🏠 Work From Home</option>
                  <option value="on leave" ${e==="on leave"||e==="pn leave"?"selected":""}>🏖️ On Leave</option>
                </select>
              </td>
              <td class="num">${fmtHours(s.hours)}</td>
              <td class="num"><span class="badge ${s.cls}">${s.label}</span> ${s.utilization.toFixed(0)}%</td>
              <td class="num">${s.jobCount}</td><td class="num" style="padding-right:22px">${fmtINR(s.revenue)}</td>
            </tr>`}).join("")}</tbody></table>
        </div>
      </div>
    </section>`,W(),document.querySelectorAll(".person-status-sel").forEach(s=>{s.onchange=async e=>{const a=s.dataset.id,i=e.target.value;try{await apiPut("/personnel/"+a,{status:i}),await E(),flashToast("Status updated to "+i),se(t)}catch(n){flashToast(n.message,!0)}}})}const z=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function Se(t){const s=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <h2>Accounts <span class="eyebrow">${s.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${z.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${s.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(F(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${z.map(a=>`<td>${escapeHtml(e.roles[a[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>G(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>G(s.find(a=>a._id===e.dataset.id)))}function G(t){const s=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};z.forEach(i=>{e.roles[i[0]]==null&&(e.roles[i[0]]="")});const a=openModal(`
    <h3>${s?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${s?`<select id="rClient"><option value="">Select…</option>${v.clients.map(i=>`<option value="${i._id}">${escapeHtml(i.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(F(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${z.slice(0,5).map(i=>`<div class="field"><label>${i[1]}</label><input type="text" class="r-role" data-key="${i[0]}" value="${escapeHtml(e.roles[i[0]])}"></div>`).join("")}</div>
    <div class="field-row">${z.slice(5,10).map(i=>`<div class="field"><label>${i[1]}</label><input type="text" class="r-role" data-key="${i[0]}" value="${escapeHtml(e.roles[i[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${s?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);a.querySelector("#mCancel").onclick=()=>a.remove(),s||(a.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),a.remove(),y())}),a.querySelector("#mSave").onclick=async()=>{const i={};a.querySelectorAll(".r-role").forEach(r=>i[r.dataset.key]=r.value.trim());const n={nature:a.querySelector("#rNature").value,roles:i,difficulty:Number(a.querySelector("#rDifficulty").value)||1,comments:a.querySelector("#rComments").value.trim()};try{if(s){const r=a.querySelector("#rClient").value;if(!r){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:r},n))}else await apiPut("/roster/"+e._id,n);a.remove(),y()}catch(r){flashToast(r.message,!0)}}}function $e(t){if(!t)return"Deliverables";const s={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return s[t]?s[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function ke(t){const s=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
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
              ${s.map(a=>{const i=a.personId?.name||"—",n=a.serviceId?.name||"—",r=$e(a.unit),m=e[a.period]||(a.period?a.period.toUpperCase():"Daily"),x=a.actual||0,h=a.quantity>0?x/a.quantity:0,f=Math.round(h*100),d=h>=1?"green":h>=.6?"amber":"red",b=h>=1?"✓ Met":h>=.6?"Behind":"Off Pace",o=Math.min(f,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(i)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(n)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${a.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(r)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${m}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${x} / ${a.quantity} <span style="font-weight:500;color:var(--text-3)">(${f}%)</span></span>
                        <span class="badge ${d}" style="font-size:10px;padding:1px 5px">${b}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${o}%;height:100%;background:var(--${d==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${a._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${a._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`}).join("")||'<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,document.getElementById("addAdminTargetBtn").onclick=()=>Q(null),document.querySelectorAll(".edit-target").forEach(a=>{a.onclick=()=>Q(s.find(i=>i._id===a.dataset.id))}),document.querySelectorAll(".del-target").forEach(a=>{a.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+a.dataset.id),flashToast("Target removed"),y()}catch(i){flashToast(i.message,!0)}}})}function Q(t){const s=!t;t=t||{personId:v.personnel[0]?._id,serviceId:v.services[0]?._id,quantity:5,unit:"reels",period:"day"};const e=t.personId?._id||t.personId||"",a=t.serviceId?._id||t.serviceId||"",n=["reels","stories","posts","count","hours"].includes(t.unit),r=openModal(`
    <h3>${s?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${v.personnel.map(f=>`<option value="${f._id}" ${String(f._id)===String(e)?"selected":""}>${escapeHtml(f.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${v.services.map(f=>`<option value="${f._id}" ${String(f._id)===String(a)?"selected":""}>${escapeHtml(f.name)}</option>`).join("")}
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
          <option value="reels" ${n&&t.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${n&&t.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${n&&t.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${n&&t.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${n&&t.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${n?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>
    </div>

    <div class="field" id="mTgtCustomUnitWrap" style="margin-bottom:12px;display:${n?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${n?"":escapeHtml(t.unit||"")}">
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
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const m=r.querySelector("#mTgtUnit"),x=r.querySelector("#mTgtCustomUnitWrap"),h=r.querySelector("#mTgtCustomUnit");m.onchange=()=>{m.value==="custom"?(x.style.display="flex",h.focus()):x.style.display="none"},r.querySelector("#mCancel").onclick=()=>r.remove(),r.querySelector("#mSave").onclick=async()=>{let f=m.value;f==="custom"&&(f=h.value.trim()||"Deliverables");const d=getUploaderAttachments("mTgtAttachments"),b={personId:r.querySelector("#mTgtPerson").value,serviceId:r.querySelector("#mTgtService").value,quantity:Number(r.querySelector("#mTgtQty").value)||1,unit:f,period:r.querySelector("#mTgtPeriod").value,attachments:d};if(!b.personId||!b.serviceId){flashToast("Person and Service are required",!0);return}try{s?await apiPost("/targets",b):await apiPut("/targets/"+t._id,b),flashToast("Target saved successfully! 🎯"),r.remove(),y()}catch(o){flashToast(o.message,!0)}}}async function Ae(t){const[s,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);v.salaryGrades=s,v.salaryAssignments=e;const a={};e.forEach(i=>a[i.personId]=i.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${s.map(i=>`<div class="manage-item"><div><strong>${escapeHtml(i.label)}</strong><div class="muted">${fmtINR(i.min)} – ${fmtINR(i.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${i._id}">Edit</button><button class="btn danger small del-grade" data-id="${i._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${v.personnel.map(i=>`<tr><td><strong>${escapeHtml(i.name)}</strong><div class="muted">${escapeHtml(i.duties||"")}</div></td>
        <td><span class="badge green">${i.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${i._id}"><option value="">Not set</option>${s.map(n=>`<option value="${n._id}" ${a[i._id]===n._id?"selected":""}>${escapeHtml(n.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>Y(null),document.querySelectorAll(".edit-grade").forEach(i=>i.onclick=()=>Y(s.find(n=>n._id===i.dataset.id))),document.querySelectorAll(".del-grade").forEach(i=>i.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+i.dataset.id),y())}),document.querySelectorAll(".grade-select").forEach(i=>{i.onchange=async()=>{await apiPut("/salary/assignments/"+i.dataset.id,{gradeId:i.value||null}),flashToast("Saved")}})}function Y(t){const s=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${s?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!a.label){flashToast("Label required",!0);return}try{s?await apiPost("/salary/grades",a):await apiPut("/salary/grades/"+t._id,a),e.remove(),y()}catch(i){flashToast(i.message,!0)}}}function Ce(t){const s={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <!-- Admin Account Settings Card -->
      <div style="margin-bottom:24px;">
        ${ie({title:"My Administrator Credentials",subtitle:"Manage your personal login email, display name, and password"})}
      </div>

      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${v.personnel.length})</h3>
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
              ${v.personnel.map(n=>`
                <tr>
                  <td><strong>${escapeHtml(n.name)}</strong></td>
                  <td>${escapeHtml(n.duties||"—")}</td>
                  <td class="num"><strong>${n.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${s[n.status]||"green"}">${escapeHtml(n.status||"active")}</span></td>
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${v.clients.length})</h3>
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
              ${v.clients.map(n=>`
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${v.services.length})</h3>
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
              ${v.services.map(n=>`
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
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>X(null)),document.querySelectorAll(".edit-person").forEach(n=>n.onclick=()=>X(v.personnel.find(r=>r._id===n.dataset.id))),document.querySelectorAll(".del-person").forEach(n=>n.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+n.dataset.id),await E(),y())});const a=document.getElementById("addClientBtn");a&&(a.onclick=()=>Z(null)),document.querySelectorAll(".edit-client").forEach(n=>n.onclick=()=>Z(v.clients.find(r=>r._id===n.dataset.id))),document.querySelectorAll(".del-client").forEach(n=>n.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+n.dataset.id),await E(),y())});const i=document.getElementById("addServiceBtn");i&&(i.onclick=()=>K(null)),document.querySelectorAll(".edit-service").forEach(n=>n.onclick=()=>K(v.services.find(r=>r._id===n.dataset.id))),document.querySelectorAll(".del-service").forEach(n=>n.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+n.dataset.id),await E(),y())}),ne(t)}const Te=Ce;function X(t){const s=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Person</h3>
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
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mPersonFiles"),i={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:a};if(!i.name){flashToast("Name is required",!0);return}try{s?await apiPost("/personnel",i):await apiPut("/personnel/"+t._id,i),await E(),flashToast("Person saved! 📁"),e.remove(),y()}catch(n){flashToast(n.message,!0)}}}function Z(t){const s=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mClientFiles"),i={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:a};if(!i.name){flashToast("Name is required",!0);return}try{s?await apiPost("/clients",i):await apiPut("/clients/"+t._id,i),await E(),flashToast("Client saved! 📁"),e.remove(),y()}catch(n){flashToast(n.message,!0)}}}function K(t){const s=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!a.name){flashToast("Name is required",!0);return}try{s?await apiPost("/services",a):await apiPut("/services/"+t._id,a),await E(),e.remove(),y()}catch(i){flashToast(i.message,!0)}}}async function ae(t){const s=await apiGet("/users");let e="all",a="role",i="";function n(){let o=[...s];if(i){const c=i.toLowerCase();o=o.filter(u=>u.name&&u.name.toLowerCase().includes(c)||u.email&&u.email.toLowerCase().includes(c)||u.role&&u.role.toLowerCase().includes(c))}e==="admin"?o=o.filter(c=>c.role==="superadmin"||c.role==="admin"):e==="accounts"?o=o.filter(c=>c.role==="accounts"):e==="employee"?o=o.filter(c=>c.role==="employee"):e==="client"&&(o=o.filter(c=>c.role==="client"));const S={superadmin:1,admin:1,accounts:2,employee:3,client:4};a==="role"?o.sort((c,u)=>{const T=S[c.role]||9,I=S[u.role]||9;return T!==I?T-I:(c.name||"").localeCompare(u.name||"")}):a==="role-desc"?o.sort((c,u)=>{const T=S[c.role]||9,I=S[u.role]||9;return T!==I?I-T:(c.name||"").localeCompare(u.name||"")}):a==="name-asc"?o.sort((c,u)=>(c.name||"").localeCompare(u.name||"")):a==="name-desc"?o.sort((c,u)=>(u.name||"").localeCompare(c.name||"")):a==="status"&&o.sort((c,u)=>(u.active?1:0)-(c.active?1:0));const k=t.querySelector("#userTableBody");if(k){if(o.length===0){k.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}k.innerHTML=o.map(c=>{const u=c.role==="superadmin",T=c.role==="admin",I=c.role==="accounts",H=c.role==="employee",U=u?'<span class="badge gold" style="font-weight:700">👑 Superadmin</span>':T?'<span class="badge gold" style="font-weight:700">🛡️ Admin</span>':I?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':H?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',N=c.personnelId?escapeHtml(c.personnelId.name):c.clientId?escapeHtml(c.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(c.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(c.email)}</span></td>
          <td>${U}</td>
          <td>${N}</td>
          <td><span class="badge ${c.active?"green":"gray"}">${c.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),k.querySelectorAll(".edit-user").forEach(c=>c.onclick=()=>ee(s.find(u=>u._id===c.dataset.id))),k.querySelectorAll(".del-user").forEach(c=>c.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+c.dataset.id),flashToast("User removed"),ae(t)}catch(u){flashToast(u.message,!0)}})}}const r=s.filter(o=>o.role==="superadmin"||o.role==="admin").length,m=s.filter(o=>o.role==="accounts").length,x=s.filter(o=>o.role==="employee").length,h=s.filter(o=>o.role==="client").length;t.innerHTML=`
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
          <button class="pchip active user-role-filter" data-role="all">All (${s.length})</button>
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${r})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${m})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${x})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${h})</button>
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
    </section>`,n(),t.querySelectorAll(".user-role-filter").forEach(o=>{o.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(S=>S.classList.remove("active")),o.classList.add("active"),e=o.dataset.role,n()}});const f=t.querySelector("#userSortSel");f&&(f.onchange=()=>{a=f.value,n()});const d=t.querySelector("#userSearchInp");d&&(d.oninput=()=>{i=d.value.trim(),n()});const b=t.querySelector("#addUserBtn");b&&(b.onclick=()=>ee(null))}function ee(t){const s=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,a=openModal(`<h3>${s?"Add":"Edit"} User</h3>
    <div class="field-row">
      <div class="field"><label>Name</label><input id="uName" type="text" value="${escapeHtml(t.name)}"></div>
      <div class="field"><label>Email</label><input id="uEmail" type="email" value="${escapeHtml(t.email)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Role</label><select id="uRole">
        <option value="admin" ${e==="admin"||e==="superadmin"?"selected":""}>Admin</option>
        <option value="accounts" ${e==="accounts"?"selected":""}>Accounts & Finance</option>
        <option value="employee" ${e==="employee"?"selected":""}>Employee</option>
        <option value="client" ${e==="client"?"selected":""}>Client</option></select></div>
      <div class="field"><label>Password ${s?"":"(leave blank to keep current)"}</label><input id="uPassword" type="password"></div>
    </div>
    <div class="field" id="uLinkWrap"></div>
    <div class="field"><label><input type="checkbox" id="uActive" ${t.active?"checked":""}> Active</label></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function i(){const n=a.querySelector("#uRole").value,r=a.querySelector("#uLinkWrap");n==="employee"?r.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${v.personnel.map(m=>`<option value="${m._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===m._id?"selected":""}>${escapeHtml(m.name)}</option>`).join("")}</select>`:n==="client"?r.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${v.clients.map(m=>`<option value="${m._id}" ${t.clientId&&(t.clientId._id||t.clientId)===m._id?"selected":""}>${escapeHtml(m.name)}</option>`).join("")}</select>`:r.innerHTML=""}a.querySelector("#uRole").onchange=i,i(),a.querySelector("#mCancel").onclick=()=>a.remove(),a.querySelector("#mSave").onclick=async()=>{const n=a.querySelector("#uRole").value,r={name:a.querySelector("#uName").value.trim(),email:a.querySelector("#uEmail").value.trim(),role:n,active:a.querySelector("#uActive").checked,personnelId:n==="employee"&&a.querySelector("#uPersonnel")?.value||null,clientId:n==="client"&&a.querySelector("#uClient")?.value||null},m=a.querySelector("#uPassword").value;if(m&&(r.password=m),!r.name||!r.email){flashToast("Name and email required",!0);return}if(s&&!m){flashToast("Password required for a new user",!0);return}try{s?await apiPost("/users",r):await apiPut("/users/"+t._id,r),a.remove(),y()}catch(x){flashToast(x.message,!0)}}}let M={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};async function Ie(t){oe(t,{userRole:"superadmin",currentUser:P})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),y()}catch(s){flashToast(s.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(i=>i._id===t);if(!e)return;const a=prompt("Edit task title:",e.title);a!==null&&a.trim()&&(await apiPut("/tasks/"+t,{title:a.trim()}),flashToast("Task updated"),y())}catch(s){flashToast(s.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const s=prompt("Enter task for this employee:");if(!(!s||!s.trim()))try{const e=new Date,a=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,i=M.date==="all"?a:M.date;await apiPost("/tasks",{title:s.trim(),personnelId:t,dueDate:i,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),y()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),y()}catch(s){flashToast(s.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const s={date:M.date};t&&t!=="all"?s.personnelId=t:M.personnelId&&M.personnelId;const e=await apiPost("/tasks/clear-completed",s);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),y()}catch(s){flashToast(s.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,s=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!s&&!e&&g.tab!=="logjob"&&y(!0)});ce();function Ee(t,s,e,a="denial"){const i=a==="revision",n=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:8px">
        <span>🔁</span> Resubmit Work to Client for Approval
      </div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(s)}</div>
    </div>

    ${e?`
      <div style="margin-bottom:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--r-sm);padding:10px 14px">
        <strong style="color:var(--red-500);font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:2px">${i?"Client's Revision Request / Notes:":"Client's Previous Denial Reason:"}</strong>
        <div style="font-size:12.5px;color:var(--text-1)">"${escapeHtml(e)}"</div>
      </div>
    `:""}

    <div class="field" style="margin-bottom:12px">
      <label for="mAdmResubNotes" style="font-weight:700">Resubmission / Correction Notes</label>
      <input type="text" id="mAdmResubNotes" placeholder="e.g. Corrected deliverables according to client notes, updated live website link..." style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px" />
    </div>

    <div class="field" style="margin-bottom:12px">
      <label for="mAdmResubUrl" style="font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
      <input type="url" id="mAdmResubUrl" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px" />
      <span style="font-size:11px;color:var(--text-4)">For live websites, applications, Figma links or cloud files</span>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mAdmResubUp",label:"Upload Corrected Files (Optional if URL provided)",subtitle:"Upload corrected exports, PDFs, images or archive files"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mAdmResubCancel">Cancel</button>
      <button class="btn gold" id="mAdmResubConfirm" style="font-weight:700">🔁 Resubmit to Client for Approval</button>
    </div>
  `);bindAttachmentUploader("mAdmResubUp"),n.querySelector("#mAdmResubCancel").onclick=()=>n.remove(),n.querySelector("#mAdmResubConfirm").onclick=async()=>{const r=n.querySelector("#mAdmResubNotes").value.trim(),m=n.querySelector("#mAdmResubUrl").value.trim(),x=getUploaderAttachments("mAdmResubUp"),h=n.querySelector("#mAdmResubConfirm");h.disabled=!0,h.textContent="Resubmitting…";try{await apiPost(`/jobs/${t}/resubmit`,{notes:r,url:m,deliverables:x}),flashToast("Job resubmitted to client for re-approval! 🔁🎉"),n.remove(),y()}catch(f){flashToast(f.message,!0),h.disabled=!1,h.textContent="🔁 Resubmit to Client for Approval"}}}
