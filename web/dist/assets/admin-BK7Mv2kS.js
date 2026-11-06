import{f as be,d as fe,q as he,s as ye,n as xe,o as we,D as L,t as ce,u as X,v as Se,w as $e}from"./api-DgcaTBvf.js";import{initProposalStudio as ke}from"./proposals-BWi4DiZ9.js";import{i as Ce,a as Ae,b as Ie}from"./supporttickets-BfYpENiD.js";let E=null,f={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[],users:[]},R=null,y={tab:"dashboard",period:"month",jobsFilter:"all"},h={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]},B="admin",U="",Y=null,I="__global__";async function Te(){initTheme(),E=requireAuth("superadmin"),E&&(await Promise.all([N(),fe().catch(()=>{})]),M())}async function N(){const[t,s,e,n]=await Promise.all([apiGet("/personnel").catch(()=>[]),apiGet("/clients").catch(()=>[]),apiGet("/services").catch(()=>[]),apiGet("/users").catch(()=>[])]);f.personnel=t||[],f.clients=s||[],f.services=e||[],f.users=n||[]}function K(){const t=f.personnel.find(n=>/mansi/i.test(n.name)),s=f.personnel.find(n=>/urna/i.test(n.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),s&&e.push({personId:s._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function pe(t){const s=f.personnel.find(e=>e._id===t);return s?s.name:"—"}function te(t){const s=f.clients.find(e=>e._id===t);return s?s.name:"—"}const Ee=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"billing_dashboard",label:"Accounts & Billing",icon:"💳",href:"/accounts"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Settings & Manage",icon:"⚙️"}];function M(){const t=document.getElementById("app"),s=E?.role==="superadmin",e=be("admin",Ee,s),n=e.find(a=>a.key===y.tab)||e[0];e.some(a=>a.key===y.tab)||(y.tab=n?n.key:"dashboard"),t.innerHTML=renderAppShell({user:E,currentRole:s?"superadmin":"admin",activeTab:y.tab,tabs:e,title:n.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(a=>{y.tab=a,M()}),$()}window.ci360NavTab=(t,s={})=>{y.tab=t,y.tabParams=s,M()};async function $(t=!1){const s=document.getElementById("content");if(!s)return;const e=E?.role==="superadmin";if((y.tab==="salaries"||y.tab==="users")&&!e){y.tab="dashboard",flashToast("Access restricted: Superadmin permission required",!0),M();return}!t&&!s.dataset.loaded&&(s.innerHTML=renderSkeletonCards(4)),s.dataset.loaded="true";try{if(y.tab==="dashboard")await Re(s);else if(y.tab==="dailytasks")await We(s);else if(y.tab==="tickets"||y.tab==="supporttickets")await Ne(s);else if(y.tab==="proposals")await De(s);else if(y.tab==="teambonding"||y.tab==="bonding")await qe(s);else if(y.tab==="logjob")_(s);else if(y.tab==="jobs")await ze(s);else if(y.tab==="byclient")await Ue(s);else if(y.tab==="byperson")await Z(s);else if(y.tab==="accounts")await Le(s);else if(y.tab==="billing_dashboard"){window.location.href="/accounts";return}else y.tab==="targets"?await Fe(s):y.tab==="salaries"?await Oe(s):y.tab==="settings"||y.tab==="manage"?Ve(s):y.tab==="users"&&await ge(s)}catch(n){s.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(n.message)}</div>`}}async function De(t){t.innerHTML='<div id="proposals-module-root"></div>';const s=t.querySelector("#proposals-module-root");ke(s)}async function qe(t){t.innerHTML='<div id="teambonding-module-root"></div>';const s=t.querySelector("#teambonding-module-root");Ie(s,{userRole:E?.role||"admin",currentUser:E})}async function Ne(t){t.innerHTML='<div id="support-tickets-module-root"></div>';const s=t.querySelector("#support-tickets-module-root"),e=y.tabParams||{};Ae(s,{userRole:"superadmin",currentUser:E,initialJobId:e.jobId||null})}function ue(){return renderPeriodPicker(y.period)}function se(){document.querySelectorAll("[data-period]").forEach(s=>{s.onclick=()=>{y.period=s.dataset.period,$()}});const t=document.getElementById("dashPeriodSelect");t&&(t.onchange=s=>{y.period=s.target.value,$()})}async function Re(t){R=await apiGet("/dashboard/admin?period="+y.period);const s=R.overview;t.innerHTML=`
    <div class="dash-overview-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;">
      <div class="dash-overview-title-wrap">
        <h2 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0 0 4px 0;letter-spacing:-0.4px;">${he(E?.name||"Admin")}</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      <div class="dash-period-dropdown-wrap" style="display:inline-flex;align-items:center;gap:8px;">
        ${ye(y.period,"dashPeriodSelect")}
      </div>
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

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${ie(R.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${ie(R.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${R.personnel.filter(e=>e.status!=="inactive").map(_e).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,se()}function ie(t,s){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(n=>n[1]));return t.map(([n,a])=>`
    <div class="bar-row">
      <div>${escapeHtml(n)}</div>
      <div class="bar-track"><div class="bar-fill ${s?"gold":""}" style="width:${(a/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(a)}</div>
    </div>`).join("")}function _e(t){const s=Math.min(t.utilization,160);return`
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
    </div>`}function _(t){(!h.assignments||h.assignments.every(e=>!e.personId))&&(h.assignments=K());const s=h.assignments.reduce((e,n)=>e+(Number(n.percent)||0),0);t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">➕</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Log New Job & Work Deliverable</h1>
            <p class="ci360-hero-subheading">Record client deliverables, services provided, financial value, and team hour attributions.</p>
          </div>
        </div>
      </header>

      <div class="card log-job-card">
        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">1. Client & Timeline</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>CLIENT *</label>
            <div class="select-with-btn">
              <select id="jClient">
                <option value="">Select client…</option>
                ${f.clients.map(e=>`<option value="${e._id}" ${e._id===h.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${h.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${h.completion||""}" placeholder="dd.mm.yyyy">
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
                ${f.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${h.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${h.serviceIds.map(e=>{const n=f.services.find(a=>a._id===e);return n?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(n.name)}
                      <span class="remove-service-tag" data-id="${n._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `:""}).join("")}
              </div>
            `:""}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="jValue" value="${h.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(h.desc||"")}</textarea>
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
              ${h.assignments.map((e,n)=>Pe(e,n)).join("")}
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
  `,Me()}function Pe(t,s){return`
    <div class="person-assign-row" data-idx="${s}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${f.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
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
  `}function Me(){const t=document.getElementById("jClient");t&&(t.onchange=o=>h.clientId=o.target.value);const s=document.getElementById("addNewClientBtn");s&&(s.onclick=()=>{const o=openModal(`
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
      `);o.querySelector("#mCancel").onclick=()=>o.remove(),o.querySelector("#mSave").onclick=async()=>{const b=o.querySelector("#newClientName").value.trim(),u=o.querySelector("#newClientNotes").value.trim();if(!b){flashToast("Client name is required",!0);return}try{const S=await apiPost("/clients",{name:b,notes:u});await N(),h.clientId=S._id,flashToast("Client added"),o.remove(),_(document.getElementById("content"))}catch(S){flashToast(S.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=o=>h.date=o.target.value);const n=document.getElementById("jCompletion");n&&(n.onchange=o=>h.completion=o.target.value);const a=document.getElementById("jService");a&&(a.onchange=o=>{const b=o.target.value;b&&(h.serviceIds.includes(b)||h.serviceIds.push(b),_(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(o=>{o.onclick=b=>{b.stopPropagation();const u=o.dataset.id;h.serviceIds=h.serviceIds.filter(S=>S!==u),_(document.getElementById("content"))}});const i=document.getElementById("addNewServiceBtn");i&&(i.onclick=()=>{const o=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);o.querySelector("#mCancel").onclick=()=>o.remove(),o.querySelector("#mSave").onclick=async()=>{const b=o.querySelector("#newServiceName").value.trim();if(!b){flashToast("Service name is required",!0);return}try{const u=await apiPost("/services",{name:b});await N(),h.serviceIds.includes(u._id)||h.serviceIds.push(u._id),flashToast("Service added"),o.remove(),_(document.getElementById("content"))}catch(u){flashToast(u.message,!0)}}});const l=document.getElementById("jDesc");l&&(l.oninput=o=>h.desc=o.target.value);const m=document.getElementById("jValue");m&&(m.oninput=o=>h.value=o.target.value),document.querySelectorAll(".person-assign-row").forEach(o=>{const b=Number(o.dataset.idx),u=o.querySelector(".a-person");u&&(u.onchange=v=>h.assignments[b].personId=v.target.value);const S=o.querySelector(".a-percent");S&&(S.oninput=v=>{h.assignments[b].percent=v.target.value,He()});const w=o.querySelector(".a-hours");w&&(w.oninput=v=>h.assignments[b].hours=v.target.value);const c=o.querySelector(".a-remove");c&&(c.onclick=()=>{h.assignments.length>1&&(h.assignments.splice(b,1),_(document.getElementById("content")))})});const p=document.getElementById("addAssignRow");p&&(p.onclick=()=>{h.assignments.push({personId:"",percent:0,hours:""}),_(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:h.attachments||[]});const d=document.getElementById("clearJobBtn");d&&(d.onclick=()=>{h={title:"",assignments:K(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),_(document.getElementById("content"))});const r=document.getElementById("saveJobBtn");r&&(r.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!h.clientId){flashToast("Please select a client",!0);return}if(!h.serviceIds||!h.serviceIds.length){flashToast("Please select at least one service",!0);return}const o=h.assignments.filter(v=>v.personId);if(!o.length){flashToast("Please assign at least one person",!0);return}for(const v of o)if(v.hours===""||v.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const b=f.clients.find(v=>v._id===h.clientId),S=f.services.filter(v=>h.serviceIds.includes(v._id)).map(v=>v.name).join(", "),w=h.title||(b?`${b.name} — ${S||"Deliverable"}`:S||"Untitled Job"),c=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:w,clientId:h.clientId,serviceIds:h.serviceIds,date:h.date||new Date().toISOString().slice(0,10),completionDate:h.completion||null,value:Number(h.value)||0,description:h.desc||"",assignments:o,attachments:c}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),h={title:"",assignments:K(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},y.tab="jobs",$()}catch(o){flashToast(o.message,!0)}})}function He(){const t=h.assignments.reduce((e,n)=>e+(Number(n.percent)||0),0),s=document.querySelector(".assign-total");s&&(s.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,s.classList.toggle("warn",t!==100))}async function ze(t){let s=await apiGet("/jobs");s.sort((e,n)=>new Date(n.date)-new Date(e.date)),y.jobsFilter==="progress"&&(s=s.filter(e=>!e.completionDate)),y.jobsFilter==="done"&&(s=s.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">📁</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">All Jobs & Projects</h1>
            <p class="ci360-hero-subheading">Comprehensive pipeline of all client deliverables, status, and assigned personnel</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" onclick="ui.tab='logjob';render()" type="button" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
            <span>➕ Log New Job</span>
          </button>
        </div>
      </header>
      <div style="margin-bottom:14px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <button class="pchip ${y.jobsFilter==="all"?"active":""}" data-jf="all">All (${s.length})</button>
        <button class="pchip ${y.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${y.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${s.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${s.map(e=>{const n=e.status==="Completed",a=(e.assignments||[]).map(m=>`${escapeHtml(pe(m.personId))} (${m.percent}%)`).join(", "),i=(e.attachments||[]).length,l=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${i?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${i} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${i} Brief</span></button>`:""}
                  ${l?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${l} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${l} Work</span></button>`:""}
                  ${!i&&!l?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${n?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${n}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${n?"green":e.status==="Needs Revision"||e.status==="Denied"?"red":"amber"}">${n?"Completed":e.status==="Needs Revision"?"Needs Revision":e.status==="Denied"?"Denied":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`<span style="font-size:10px;font-weight:700;color:var(--amber-500)">↺ Revision Req.</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(e.clientApproval?.feedback||"")}" data-type="revision" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:e.clientApproval&&e.clientApproval.isRevised?'<span style="font-size:10px;font-weight:700;color:var(--brand-500)">📦 Revised — Awaiting Re-approval</span>':e.status==="Denied"||e.clientApproval?.status==="Denied"?`<span style="font-size:10px;font-weight:700;color:var(--red-500)" title="Reason: ${escapeHtml(e.clientApproval?.deniedReason||"")}">❌ Denied</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(e.clientApproval?.deniedReason||"")}" data-type="denial" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:""}
                </div>
              </td>
              <td>${escapeHtml(te(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(m=>`<span class="badge gray">${escapeHtml(m)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${a||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((m,p)=>m+(Number(p.hours)||0),0))}</td>
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
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{y.jobsFilter=e.dataset.jf,$()}),document.querySelectorAll(".job-ticket-btn").forEach(e=>{e.onclick=()=>{window.ci360NavTab("tickets",{jobId:e.dataset.id})}}),document.querySelectorAll(".admin-resubmit-btn").forEach(e=>{e.onclick=()=>Qe(e.dataset.id,e.dataset.title,e.dataset.reason,e.dataset.type)}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const n=e.dataset.id,a=s.find(p=>p._id===n);if(!a)return;const i=encodeURIComponent(JSON.stringify(a.attachments||[])),l=encodeURIComponent(JSON.stringify(a.deliverables||[])),m=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(a.title||"Untitled Job")}</div>
        </div>

        ${a.clientApproval?.status==="Revision Requested"||a.status==="Needs Revision"?`
          <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--amber-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>⚠️</span> Client Requested Changes / Revision
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(a.clientApproval?.feedback||"Revision requested")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${a._id}', '${escapeHtml(a.title||"Job")}', '${escapeHtml(a.clientApproval?.feedback||"")}', 'revision')" style="font-weight:700">
              🔁 Resubmit Revised Work
            </button>
          </div>
        `:a.status==="Denied"||a.clientApproval?.status==="Denied"?`
          <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--red-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>❌</span> Job Denied by Client
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(a.clientApproval?.deniedReason||"Job denied")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${a._id}', '${escapeHtml(a.title||"Job")}', '${escapeHtml(a.clientApproval?.deniedReason||"")}', 'denial')" style="font-weight:700">
              🔁 Resubmit Corrected Work
            </button>
          </div>
        `:""}

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(a.attachments||[]).length})</h4>
          ${a.attachments&&a.attachments.length?`
            <div data-attachments="${i}">
              ${renderAttachmentChips(a.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(a.deliverables||[]).length})</h4>
          ${a.deliverables&&a.deliverables.length?`
            <div data-attachments="${l}">
              ${renderAttachmentChips(a.deliverables)}
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
      `);bindAttachmentUploader("mDelUpload"),m.querySelector("#mDelSaveBtn").onclick=async()=>{const p=getUploaderAttachments("mDelUpload"),d=m.querySelector("#mDelNote").value.trim(),r=(m.querySelector("#mDelUrl")||{}).value?.trim()||"",o=m.querySelector("#mDelMarkComplete")?.checked??!0,b=p.map(u=>({...u,notes:d}));if(r){let u=r;/^https?:\/\//i.test(u)||(u="https://"+u),b.unshift({name:d?`${d} (Live URL)`:"Live Deliverable URL / Website",url:u,type:"url",size:0,notes:d||"Live URL"})}if(!b.length){flashToast("Please enter a deliverable URL or select files",!0);return}try{await apiPost(`/jobs/${n}/deliverables`,{deliverables:b,markComplete:o}),flashToast(o?"Deliverables added & sent to Client for Approval! 📦🎉":"Deliverables added! 📦"),m.remove(),$()}catch(u){flashToast(u.message,!0)}},m.querySelector("#mCloseFiles").onclick=()=>m.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const n=e.dataset.id,a=s.find(i=>i._id===n);a&&Be(a,()=>$())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const n=e.dataset.id,a=e.dataset.done==="false",i=s.find(m=>m._id===n);let l=i?i.completionDate:null;a&&!l&&(l=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+n,{status:a?"Completed":"In Progress",completionDate:l}),flashToast(a?"Job marked as Completed!":"Job marked as In Progress"),$()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),$())})}function Be(t,s){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(g=>g._id||g):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(g=>({personId:String(g.personId._id||g.personId),percent:g.percent!=null?g.percent:0,hours:g.hours!=null?g.hours:0})):K()};function n(){return e.serviceIds.length?e.serviceIds.map(g=>{const C=f.services.find(T=>String(T._id)===String(g));return C?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(C.name)}
          <span class="m-remove-service" data-id="${C._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function a(){return e.assignments.map((g,C)=>`
      <div class="m-person-assign-row" data-idx="${C}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${f.personnel.map(T=>`<option value="${T._id}" ${String(T._id)===String(g.personId)?"selected":""}>${escapeHtml(T.name)}${T.duties?` (${escapeHtml(T.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${g.percent!=null?g.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${g.hours!=null?g.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
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
            ${f.clients.map(g=>`<option value="${g._id}" ${String(g._id)===String(e.clientId)?"selected":""}>${escapeHtml(g.name)}</option>`).join("")}
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
          ${f.services.map(g=>`<option value="${g._id}">${escapeHtml(g.name)}</option>`).join("")}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${n()}
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
          ${a()}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn ghost small" id="mAddAssignRow">+ Add Team Member</button>
          <div id="mAssignTotalInfo" class="assign-total" style="font-size:12px;font-weight:600;"></div>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          ${E?.role==="superadmin"?`
            <button type="button" class="btn danger" id="mEditDeleteJob" style="padding:8px 16px;">🗑️ Delete Job</button>
          `:""}
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" class="btn ghost" id="mEditCancel">Cancel</button>
          <button type="button" class="btn gold" id="mEditSave" style="padding:8px 20px;">Save & Update Assignments</button>
        </div>
      </div>
    </div>
  `),l=i.querySelector(".modal");l&&(l.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const m=()=>{const g=e.assignments.reduce((T,H)=>T+(Number(H.percent)||0),0),C=i.querySelector("#mAssignTotalInfo");C&&(C.innerHTML=g===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${g}% Allocated (should be 100%)</span>`)},p=()=>{i.querySelectorAll(".m-remove-service").forEach(g=>{g.onclick=()=>{const C=g.dataset.id;e.serviceIds=e.serviceIds.filter(T=>String(T)!==String(C)),i.querySelector("#mEditServicesTags").innerHTML=n(),p()}})},d=()=>{i.querySelectorAll(".m-person-assign-row").forEach(g=>{const C=Number(g.dataset.idx),T=g.querySelector(".m-a-person");T&&(T.onchange=z=>e.assignments[C].personId=z.target.value);const H=g.querySelector(".m-a-percent");H&&(H.oninput=z=>{e.assignments[C].percent=z.target.value,m()});const V=g.querySelector(".m-a-hours");V&&(V.oninput=z=>e.assignments[C].hours=z.target.value);const W=g.querySelector(".m-a-remove");W&&(W.onclick=()=>{e.assignments.length>1?(e.assignments.splice(C,1),i.querySelector("#mEditAssignRows").innerHTML=a(),d(),m()):flashToast("Job must have at least one team member row",!0)})})},r=i.querySelector("#mCloseJobEdit"),o=i.querySelector("#mEditCancel");r&&(r.onclick=()=>i.remove()),o&&(o.onclick=()=>i.remove());const b=i.querySelector("#mEditDeleteJob");b&&(b.onclick=async()=>{const g=t.title||"this job";if(confirm(`Are you sure you want to delete "${g}"?
(It will be safely retained in the database archive.)`))try{await apiDelete("/jobs/"+t._id),flashToast("Job deleted"),i.remove(),s&&s()}catch(C){flashToast(C.message,!0)}});const u=i.querySelector("#mEditTitle");u&&(u.oninput=g=>e.title=g.target.value);const S=i.querySelector("#mEditClient");S&&(S.onchange=g=>e.clientId=g.target.value);const w=i.querySelector("#mEditStatus");w&&(w.onchange=g=>e.status=g.target.value);const c=i.querySelector("#mEditDate");c&&(c.onchange=g=>e.date=g.target.value);const v=i.querySelector("#mEditCompletionDate");v&&(v.onchange=g=>e.completionDate=g.target.value);const x=i.querySelector("#mEditPriority");x&&(x.onchange=g=>e.priority=g.target.value);const k=i.querySelector("#mEditValue");k&&(k.oninput=g=>e.value=g.target.value);const A=i.querySelector("#mEditDesc");A&&(A.oninput=g=>e.description=g.target.value);const D=i.querySelector("#mEditServiceSelect");D&&(D.onchange=g=>{const C=g.target.value;C&&!e.serviceIds.map(String).includes(String(C))&&(e.serviceIds.push(C),i.querySelector("#mEditServicesTags").innerHTML=n(),p()),D.value=""}),p(),d(),m();const J=i.querySelector("#mAddAssignRow");J&&(J.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),i.querySelector("#mEditAssignRows").innerHTML=a(),d(),m()});const G=i.querySelector("#mEditSave");G&&(G.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const g=e.assignments.filter(q=>q.personId&&String(q.personId).trim()!=="");if(!g.length){flashToast("Please select at least one assigned team member",!0);return}for(const q of g)if(q.hours===""||q.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const C=f.clients.find(q=>String(q._id)===String(e.clientId)),H=f.services.filter(q=>e.serviceIds.map(String).includes(String(q._id))).map(q=>q.name).join(", "),V=e.title||(C?`${C.name} — ${H||"Deliverable"}`:H||"Untitled Job"),W=getUploaderAttachments("mEditAttachments"),z=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:V,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:g,attachments:W,deliverables:z});const Ye=g.map(q=>pe(q.personId)).join(", ");flashToast("Job updated & saved! 📁"),i.remove(),s&&s()}catch(g){flashToast(g.message,!0)}finally{G.disabled=!1,G.textContent="Save & Update Assignments"}})}async function Ue(t){R=await apiGet("/dashboard/admin?period="+y.period),t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">💼</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Client Breakdown & Analytics</h1>
            <p class="ci360-hero-subheading">Track portfolio value, deliverable volume, and effort invested by client</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          ${ue()}
        </div>
      </header>
      <div class="grid grid-3">
        ${R.clients.map(s=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(s.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${s.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${s.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,se()}async function Z(t){R=await apiGet("/dashboard/admin?period="+y.period);const s=E?.role==="superadmin";t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">👥</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Team Performance & Personnel</h1>
            <p class="ci360-hero-subheading">Track team workload, billable utilization, and work credit attribution</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          ${ue()}
        </div>
      </header>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr>
            <th style="padding-left:22px">Person</th>
            <th>Duties</th>
            <th>Status</th>
            <th class="num">Hours</th>
            <th class="num">Utilization</th>
            <th class="num">Jobs</th>
            <th class="num">Work Credit</th>
            ${s?'<th class="num" style="padding-right:22px;text-align:right">Actions</th>':""}
          </tr></thead>
          <tbody>${R.personnel.map(e=>{const n=(e.status||"active").toLowerCase(),a=e.personId||e._id;return`<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(e.name)}</strong></td><td class="muted">${escapeHtml(e.duties||"")}</td>
              <td>
                <select class="person-status-sel" data-id="${a}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
                  <option value="active" ${n==="active"?"selected":""}>🟢 Active</option>
                  <option value="work from home" ${n==="work from home"||n==="wfh"?"selected":""}>🏠 Work From Home</option>
                  <option value="on leave" ${n==="on leave"||n==="pn leave"?"selected":""}>🏖️ On Leave</option>
                </select>
              </td>
              <td class="num">${fmtHours(e.hours)}</td>
              <td class="num"><span class="badge ${e.cls}">${e.label}</span> ${e.utilization.toFixed(0)}%</td>
              <td class="num">${e.jobCount}</td>
              <td class="num">${fmtINR(e.revenue)}</td>
              ${s?`
                <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
                  <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                    <button class="btn ghost small edit-person-direct" data-id="${a}" style="padding:3px 8px;font-size:11.5px">Edit</button>
                    <button class="btn danger small del-person-direct" data-id="${a}" style="padding:3px 8px;font-size:11.5px">Remove</button>
                  </div>
                </td>
              `:""}
            </tr>`}).join("")}</tbody></table>
        </div>
      </div>
    </section>`,se(),document.querySelectorAll(".person-status-sel").forEach(e=>{e.onchange=async n=>{const a=e.dataset.id,i=n.target.value;try{await apiPut("/personnel/"+a,{status:i}),await N(),flashToast("Status updated to "+i),Z(t)}catch(l){flashToast(l.message,!0)}}}),document.querySelectorAll(".edit-person-direct").forEach(e=>{e.onclick=()=>{const n=f.personnel.find(a=>String(a._id)===String(e.dataset.id));n&&ee(n)}}),document.querySelectorAll(".del-person-direct").forEach(e=>{e.onclick=async()=>{const n=f.personnel.find(i=>String(i._id)===String(e.dataset.id)),a=n?n.name:"this person";if(confirm(`Are you sure you want to remove ${a}?
(They will be safely retained in the database archive.)`))try{await apiDelete("/personnel/"+e.dataset.id),await N(),flashToast(`${a} removed`),Z(t)}catch(i){flashToast(i.message,!0)}}})}const F=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function Le(t){const s=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">🏢</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Client Roster & Account Ownership</h1>
            <p class="ci360-hero-subheading">Who owns which function on each client account — separate from the job log</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addAccountBtn" type="button" style="font-weight:700;">+ Add Account</button>
        </div>
      </header>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${F.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${s.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(te(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${F.map(n=>`<td>${escapeHtml(e.roles[n[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>ae(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>ae(s.find(n=>n._id===e.dataset.id)))}function ae(t){const s=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};F.forEach(a=>{e.roles[a[0]]==null&&(e.roles[a[0]]="")});const n=openModal(`
    <h3>${s?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${s?`<select id="rClient"><option value="">Select…</option>${f.clients.map(a=>`<option value="${a._id}">${escapeHtml(a.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(te(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${F.slice(0,5).map(a=>`<div class="field"><label>${a[1]}</label><input type="text" class="r-role" data-key="${a[0]}" value="${escapeHtml(e.roles[a[0]])}"></div>`).join("")}</div>
    <div class="field-row">${F.slice(5,10).map(a=>`<div class="field"><label>${a[1]}</label><input type="text" class="r-role" data-key="${a[0]}" value="${escapeHtml(e.roles[a[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${s?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);n.querySelector("#mCancel").onclick=()=>n.remove(),s||(n.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),n.remove(),$())}),n.querySelector("#mSave").onclick=async()=>{const a={};n.querySelectorAll(".r-role").forEach(l=>a[l.dataset.key]=l.value.trim());const i={nature:n.querySelector("#rNature").value,roles:a,difficulty:Number(n.querySelector("#rDifficulty").value)||1,comments:n.querySelector("#rComments").value.trim()};try{if(s){const l=n.querySelector("#rClient").value;if(!l){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:l},i))}else await apiPut("/roster/"+e._id,i);n.remove(),$()}catch(l){flashToast(l.message,!0)}}}function je(t){if(!t)return"Deliverables";const s={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return s[t]?s[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function Fe(t){const s=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">🎯</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Output & Productivity Targets</h1>
            <p class="ci360-hero-subheading">Assign and track quotas for team members across reels, stories, posts, deliverables, hours, or any custom unit.</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addAdminTargetBtn" type="button" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
            <span>+ Add Target</span>
          </button>
        </div>
      </header>

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
              ${s.map(n=>{const a=n.personId?.name||"—",i=n.serviceId?.name||"—",l=je(n.unit),m=e[n.period]||(n.period?n.period.toUpperCase():"Daily"),p=n.actual||0,d=n.quantity>0?p/n.quantity:0,r=Math.round(d*100),o=d>=1?"green":d>=.6?"amber":"red",b=d>=1?"✓ Met":d>=.6?"Behind":"Off Pace",u=Math.min(r,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(a)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(i)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${n.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(l)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${m}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${p} / ${n.quantity} <span style="font-weight:500;color:var(--text-3)">(${r}%)</span></span>
                        <span class="badge ${o}" style="font-size:10px;padding:1px 5px">${b}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${u}%;height:100%;background:var(--${o==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${n._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${n._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`}).join("")||'<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,document.getElementById("addAdminTargetBtn").onclick=()=>ne(null),document.querySelectorAll(".edit-target").forEach(n=>{n.onclick=()=>ne(s.find(a=>a._id===n.dataset.id))}),document.querySelectorAll(".del-target").forEach(n=>{n.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+n.dataset.id),flashToast("Target removed"),$()}catch(a){flashToast(a.message,!0)}}})}function ne(t){const s=!t;t=t||{personId:f.personnel[0]?._id,serviceId:f.services[0]?._id,quantity:5,unit:"reels",period:"day"};const e=t.personId?._id||t.personId||"",n=t.serviceId?._id||t.serviceId||"",i=["reels","stories","posts","count","hours"].includes(t.unit),l=openModal(`
    <h3>${s?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${f.personnel.map(r=>`<option value="${r._id}" ${String(r._id)===String(e)?"selected":""}>${escapeHtml(r.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${f.services.map(r=>`<option value="${r._id}" ${String(r._id)===String(n)?"selected":""}>${escapeHtml(r.name)}</option>`).join("")}
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
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const m=l.querySelector("#mTgtUnit"),p=l.querySelector("#mTgtCustomUnitWrap"),d=l.querySelector("#mTgtCustomUnit");m.onchange=()=>{m.value==="custom"?(p.style.display="flex",d.focus()):p.style.display="none"},l.querySelector("#mCancel").onclick=()=>l.remove(),l.querySelector("#mSave").onclick=async()=>{let r=m.value;r==="custom"&&(r=d.value.trim()||"Deliverables");const o=getUploaderAttachments("mTgtAttachments"),b={personId:l.querySelector("#mTgtPerson").value,serviceId:l.querySelector("#mTgtService").value,quantity:Number(l.querySelector("#mTgtQty").value)||1,unit:r,period:l.querySelector("#mTgtPeriod").value,attachments:o};if(!b.personId||!b.serviceId){flashToast("Person and Service are required",!0);return}try{s?await apiPost("/targets",b):await apiPut("/targets/"+t._id,b),flashToast("Target saved successfully! 🎯"),l.remove(),$()}catch(u){flashToast(u.message,!0)}}}async function Oe(t){const[s,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);f.salaryGrades=s,f.salaryAssignments=e;const n={};e.forEach(a=>n[a.personId]=a.gradeId),t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">💰</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Salary Grades & Compensation Bands</h1>
            <p class="ci360-hero-subheading">Configure role bands and assign personnel tiers without exposing individual salaries</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addGradeBtn" type="button" style="font-weight:700;">+ Add Grade</button>
        </div>
      </header>
      <div class="manage-list">${s.map(a=>`<div class="manage-item"><div><strong>${escapeHtml(a.label)}</strong><div class="muted">${fmtINR(a.min)} – ${fmtINR(a.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${a._id}">Edit</button><button class="btn danger small del-grade" data-id="${a._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${f.personnel.map(a=>`<tr><td><strong>${escapeHtml(a.name)}</strong><div class="muted">${escapeHtml(a.duties||"")}</div></td>
        <td><span class="badge green">${a.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${a._id}"><option value="">Not set</option>${s.map(i=>`<option value="${i._id}" ${n[a._id]===i._id?"selected":""}>${escapeHtml(i.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>oe(null),document.querySelectorAll(".edit-grade").forEach(a=>a.onclick=()=>oe(s.find(i=>i._id===a.dataset.id))),document.querySelectorAll(".del-grade").forEach(a=>a.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+a.dataset.id),$())}),document.querySelectorAll(".grade-select").forEach(a=>{a.onchange=async()=>{await apiPut("/salary/assignments/"+a.dataset.id,{gradeId:a.value||null}),flashToast("Saved")}})}function oe(t){const s=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${s?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const n={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!n.label){flashToast("Label required",!0);return}try{s?await apiPost("/salary/grades",n):await apiPut("/salary/grades/"+t._id,n),e.remove(),$()}catch(a){flashToast(a.message,!0)}}}function me(t){const s={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">⚙️</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Settings & Administration</h1>
            <p class="ci360-hero-subheading">Manage team members, roles, permissions, and sidebar navigation layout</p>
          </div>
        </div>
      </header>

      <!-- Admin Account Settings Card -->
      <div style="margin-bottom:24px;width:100%;max-width:100%;box-sizing:border-box;">
        ${xe({title:"My Administrator Credentials",subtitle:"Manage your personal login email, display name, and password"})}
      </div>

      <!-- Superadmin Sidebar Navigation Customizer Card -->
      ${E?.role==="superadmin"?Je():""}

      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${f.personnel.length})</h3>
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
              ${f.personnel.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td>${escapeHtml(i.duties||"—")}</td>
                  <td class="num"><strong>${i.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${s[i.status]||"green"}">${escapeHtml(i.status||"active")}</span></td>
                  <td class="num">
                    <div style="display:inline-flex;gap:4px;align-items:center;justify-content:flex-end;">
                      ${E?.role==="superadmin"?`<button class="btn ghost small person-modules-btn" data-id="${i._id}" data-name="${escapeHtml(i.name)}" style="color:#0070F3;border-color:rgba(0,112,243,0.3);padding:4px 8px;font-size:11px;" title="Customize Sidebar Modules for this Person">🧭 Modules</button>`:""}
                      <button class="btn ghost small edit-person" data-id="${i._id}">Edit</button>
                      <button class="btn danger small del-person" data-id="${i._id}">Remove</button>
                    </div>
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${f.clients.length})</h3>
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
              ${f.clients.map(i=>`
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${f.services.length})</h3>
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
              ${f.services.map(i=>`
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
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>ee(null)),document.querySelectorAll(".edit-person").forEach(i=>i.onclick=()=>ee(f.personnel.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-person").forEach(i=>i.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+i.dataset.id),await N(),$())}),document.querySelectorAll(".person-modules-btn").forEach(i=>{i.onclick=()=>{const l=i.dataset.id,m=i.dataset.name||"",p=(f.users||[]).find(d=>String(d.personnelId?._id||d.personnelId)===String(l))||(f.users||[]).find(d=>d.name&&d.name.toLowerCase()===m.toLowerCase());p?ve(p):flashToast(`No user login account found for ${m} yet. Create one in the Users tab to set modules!`,"info")}});const n=document.getElementById("addClientBtn");n&&(n.onclick=()=>le(null)),document.querySelectorAll(".edit-client").forEach(i=>i.onclick=()=>le(f.clients.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-client").forEach(i=>i.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+i.dataset.id),await N(),$())});const a=document.getElementById("addServiceBtn");a&&(a.onclick=()=>re(null)),document.querySelectorAll(".edit-service").forEach(i=>i.onclick=()=>re(f.services.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-service").forEach(i=>i.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+i.dataset.id),await N(),$())}),we(t),E?.role==="superadmin"&&Ge(),y.tabParams?.section==="sidebar-customizer"&&setTimeout(()=>{const i=document.getElementById("sidebarCustomizerCard");i&&(i.scrollIntoView({behavior:"smooth",block:"start"}),i.style.outline="2px solid #0070F3",setTimeout(()=>i.style.outline="",1500))},120)}function P(){return Y||(Y=JSON.parse(JSON.stringify(ce()))),Y}function Je(){const t=P(),s=I!=="__global__",e=s?(f.users||[]).find(i=>i._id===I):null,n=s&&e?e.role==="superadmin"?"admin":e.role:B||"admin",a=[{key:"admin",label:"🛡️ Admin Dashboard"},{key:"employee",label:"💼 Employee Workspace"},{key:"accounts",label:"💳 Accounts & Billing"},{key:"client",label:"🏢 Client Portal"}];return`
    <div class="nav-customizer-card" id="sidebarCustomizerCard">
      <div class="nav-customizer-header">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="font-size:22px;">🧭</span>
            <h3 style="font-size:18px;font-weight:800;color:var(--text-1);margin:0;">Dashboard Sidebar & Module Customizer</h3>
            <span class="badge purple" style="font-size:11px;padding:3px 8px;font-weight:700;">👑 Superadmin Control</span>
          </div>
          <p style="font-size:13px;color:var(--text-3);margin:0;">
            Customize which sidebar tabs and modules appear across all dashboards or for specific individual team members.
          </p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          ${s?`
            <button type="button" class="btn ghost small" id="resetNavDefaultsBtn" title="Reset this person's module overrides to role defaults">
              ↺ Reset to Role Default
            </button>
            <button type="button" class="btn gold small" id="saveNavConfigBtn">
              💾 Save Permissions for ${escapeHtml(e?e.name:"User")}
            </button>
          `:`
            <button type="button" class="btn ghost small" id="resetNavDefaultsBtn" title="Reset all sidebars back to default visibility">
              ↺ Reset to Defaults
            </button>
            <button type="button" class="btn gold small" id="saveNavConfigBtn">
              💾 Save Navigation Settings
            </button>
          `}
        </div>
      </div>

      <!-- Scope Selector (Global Defaults vs Specific Person) -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 24px;border-bottom:1px solid var(--border-color);background:rgba(255,255,255,0.02);flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <label for="customizerPersonSelect" style="font-size:13px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px;">
            <span>Target Person / Scope:</span>
          </label>
          <select id="customizerPersonSelect" class="input small" style="min-width:290px;font-weight:600;">
            <option value="__global__" ${s?"":"selected"}>🌐 Global Role Defaults (All Users)</option>
            <optgroup label="── Customize Specific Person ──">
              ${(f.users||[]).map(i=>{const l=i.customModules&&Object.keys(i.customModules).length>0;return`
                  <option value="${i._id}" ${I===i._id?"selected":""}>
                    👤 ${escapeHtml(i.name)} (${i.role.toUpperCase()})${l?" ★ Custom":""}
                  </option>
                `}).join("")}
            </optgroup>
          </select>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${s?`
            <span class="badge blue" style="font-size:11px;padding:3px 8px;">👤 Customizing ${escapeHtml(e?e.name:"")}</span>
          `:`
            <span class="badge green" style="font-size:11px;padding:3px 8px;">🌐 Global Dashboard Mode</span>
          `}
        </div>
      </div>

      <!-- Dashboard Selector Pills (Shown when in Global Mode) -->
      ${s?`
      <div style="padding:10px 24px;border-bottom:1px solid var(--border-color);background:rgba(0,112,243,0.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <span style="font-size:12.5px;color:var(--text-1);font-weight:600;">
          Workspace: <strong>${escapeHtml(n.toUpperCase())} DASHBOARD</strong> · Target User: <strong>${escapeHtml(e?e.name:"")}</strong> (${escapeHtml(e?e.email:"")})
        </span>
        <span class="pill-counter" id="dashCount_user" style="background:#0070F3;color:#fff;padding:3px 9px;border-radius:10px;font-weight:700;font-size:11.5px;"></span>
      </div>`:`
      <div class="nav-customizer-dash-tabs" id="navDashTabs">
        ${a.map(i=>{const l=t[i.key]||[],m=l.filter(d=>d.visible!==!1).length,p=l.length;return`
            <button type="button" class="nav-dash-pill ${n===i.key?"active":""}" data-dash="${i.key}">
              <span>${i.label}</span>
              <span class="pill-counter" id="dashCount_${i.key}">${m} / ${p} visible</span>
            </button>
          `}).join("")}
      </div>`}

      <!-- Toolbar with Quick All-Module Show / Hide -->
      <div class="nav-customizer-toolbar">
        <div style="display:flex;align-items:center;gap:10px;flex:1;max-width:320px;">
          <input type="text" class="input small" id="navItemSearch" placeholder="Search sidebar tabs..." value="${escapeHtml(U)}" style="width:100%;">
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <button type="button" class="btn ghost small" id="navShowAllBtn" style="color:#10b981;border-color:rgba(16,185,129,0.3);font-weight:600;" title="Make all modules visible for this scope">
            👁️ Show All Modules
          </button>
          <button type="button" class="btn ghost small" id="navHideAllBtn" style="color:#f59e0b;border-color:rgba(245,158,11,0.3);font-weight:600;" title="Hide all optional modules for this scope">
            🙈 Hide All Modules
          </button>
        </div>
      </div>

      <!-- Nav Items Grid -->
      <div class="nav-items-grid" id="navItemsGrid">
        ${j(n,t,U)}
      </div>
    </div>
  `}function j(t,s,e=""){const n=I!=="__global__",a=n?(f.users||[]).find(p=>p._id===I):null,i=s[t]||L[t]||[],l=(e||"").toLowerCase().trim(),m=i.filter(p=>l?p.label&&p.label.toLowerCase().includes(l)||p.key&&p.key.toLowerCase().includes(l)||p.category&&p.category.toLowerCase().includes(l):!0);return m.length===0?`<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--text-3);font-size:13px;">No sidebar tabs found matching "${escapeHtml(e)}"</div>`:m.map(p=>{let d=p.visible!==!1;n&&a&&a.customModules&&a.customModules[p.key]!==void 0&&(d=!!a.customModules[p.key]);const r=!!p.locked;return`
      <div class="nav-item-card ${d?"":"is-hidden"}" data-dash="${t}" data-key="${p.key}">
        <div style="display:flex;align-items:center;gap:12px;overflow:hidden;">
          <div style="font-size:22px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.06);border-radius:8px;flex-shrink:0;">
            ${p.icon||"📌"}
          </div>
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <strong style="font-size:13px;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(p.label)}</strong>
              ${r?'<span class="badge blue" style="font-size:10px;padding:1px 5px;">🔒 System Required</span>':""}
              ${p.superadminOnly?'<span class="badge purple" style="font-size:10px;padding:1px 5px;">👑 Superadmin</span>':""}
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
              <span style="font-size:11px;color:var(--text-3);font-family:monospace;">${p.key}</span>
              ${p.category?`<span style="font-size:11px;color:var(--text-3);">· ${p.category}</span>`:""}
              <span class="nav-status-indicator" style="font-size:11px;font-weight:600;color:${d?"#10b981":"#f59e0b"};">
                ${d?"● Visible":"○ Hidden"}
              </span>
            </div>
          </div>
        </div>
        <div style="margin-left:12px;flex-shrink:0;">
          <label class="ci-switch" title="${r?"Cannot hide settings to prevent lockout":d?"Click to hide from sidebar":"Click to show in sidebar"}">
            <input type="checkbox" class="nav-toggle-input" data-dash="${t}" data-key="${p.key}" ${d?"checked":""} ${r?"disabled":""}>
            <span class="ci-switch-slider"></span>
          </label>
        </div>
      </div>
    `}).join("")}function Q(){const t=P(),s=I!=="__global__",e=s?(f.users||[]).find(n=>n._id===I):null;if(s&&e){const n=e.role==="superadmin"?"admin":e.role,a=t[n]||L[n]||[];let i=0;a.forEach(m=>{e.customModules&&e.customModules[m.key]!==void 0?e.customModules[m.key]&&i++:m.visible!==!1&&i++});const l=document.getElementById("dashCount_user");l&&(l.textContent=`${i} / ${a.length} modules visible`)}else["admin","employee","accounts","client"].forEach(n=>{const a=document.getElementById(`dashCount_${n}`);if(a){const i=t[n]||[],l=i.filter(m=>m.visible!==!1).length;a.textContent=`${l} / ${i.length} visible`}})}function Ge(t){const s=document.getElementById("sidebarCustomizerCard");if(!s)return;const e=document.getElementById("customizerPersonSelect");e&&(e.onchange=d=>{if(I=d.target.value,I!=="__global__"){const o=(f.users||[]).find(b=>b._id===I);o&&(B=o.role==="superadmin"?"admin":o.role,o.customModules||(o.customModules={}))}const r=document.getElementById("content");r&&me(r)}),s.querySelectorAll(".nav-dash-pill").forEach(d=>{d.onclick=()=>{B=d.dataset.dash,s.querySelectorAll(".nav-dash-pill").forEach(o=>o.classList.toggle("active",o===d));const r=document.getElementById("navItemsGrid");r&&(r.innerHTML=j(B,P(),U),l())}});const n=document.getElementById("navItemSearch");n&&(n.oninput=d=>{U=d.target.value;const r=document.getElementById("navItemsGrid");r&&(r.innerHTML=j(B,P(),U),l())});const a=document.getElementById("navShowAllBtn");a&&(a.onclick=()=>{const d=I!=="__global__",r=d?(f.users||[]).find(w=>w._id===I):null,o=P(),b=d&&r?r.role==="superadmin"?"admin":r.role:B,u=o[b]||L[b]||[];d&&r?(r.customModules||(r.customModules={}),u.forEach(w=>{r.customModules[w.key]=!0})):u.forEach(w=>{w.visible=!0});const S=document.getElementById("navItemsGrid");S&&(S.innerHTML=j(b,o,U),l()),Q()});const i=document.getElementById("navHideAllBtn");i&&(i.onclick=()=>{const d=I!=="__global__",r=d?(f.users||[]).find(w=>w._id===I):null,o=P(),b=d&&r?r.role==="superadmin"?"admin":r.role:B,u=o[b]||L[b]||[];d&&r?(r.customModules||(r.customModules={}),u.forEach(w=>{r.customModules[w.key]=!!w.locked})):u.forEach(w=>{w.locked||(w.visible=!1)});const S=document.getElementById("navItemsGrid");S&&(S.innerHTML=j(b,o,U),l()),Q()});function l(){s.querySelectorAll(".nav-toggle-input").forEach(d=>{d.onchange=()=>{const r=d.dataset.dash,o=d.dataset.key,b=I!=="__global__",u=b?(f.users||[]).find(c=>c._id===I):null,S=P();if(b&&u)u.customModules||(u.customModules={}),u.customModules[o]=d.checked;else{const c=(S[r]||[]).find(v=>v.key===o);c&&!c.locked&&(c.visible=d.checked)}const w=d.closest(".nav-item-card");if(w){w.classList.toggle("is-hidden",!d.checked);const c=w.querySelector(".nav-status-indicator");c&&(c.textContent=d.checked?"● Visible":"○ Hidden",c.style.color=d.checked?"#10b981":"#f59e0b")}Q()}})}l(),Q();const m=document.getElementById("saveNavConfigBtn");m&&(m.onclick=async()=>{m.disabled=!0,m.textContent="Saving…";try{const d=I!=="__global__",r=d?(f.users||[]).find(o=>o._id===I):null;if(d&&r)await X(r._id,r.customModules||{}),flashToast(`✅ Module permissions saved for ${r.name}!`,"success");else{const o=P();await Se(o),flashToast("✅ Dashboard sidebar settings saved! Updating navigation...","success")}setTimeout(()=>{M()},300)}catch(d){flashToast("❌ Failed to save navigation: "+d.message,"error"),m.disabled=!1,m.textContent="💾 Save Navigation Settings"}});const p=document.getElementById("resetNavDefaultsBtn");p&&(p.onclick=async()=>{const d=I!=="__global__",r=d?(f.users||[]).find(o=>o._id===I):null;if(d&&r){if(!confirm(`Reset ${r.name}'s module permissions back to role defaults?`))return;p.disabled=!0,p.textContent="Resetting…";try{r.customModules={},await X(r._id,{}),flashToast(`↺ ${r.name}'s modules reset to role default!`,"success"),M()}catch(o){flashToast("❌ Failed to reset: "+o.message,"error"),p.disabled=!1,p.textContent="↺ Reset to Role Default"}}else{if(!confirm("Are you sure you want to reset sidebar navigation for all dashboards back to default visible tabs?"))return;p.disabled=!0,p.textContent="Resetting…";try{const o=await $e();Y=JSON.parse(JSON.stringify(o.config||L)),flashToast("↺ Sidebar navigation reset to defaults!","success"),M()}catch(o){flashToast("❌ Failed to reset navigation: "+o.message,"error"),p.disabled=!1,p.textContent="↺ Reset to Defaults"}}})}function ve(t){if(!t)return;const s=t.role==="superadmin"?"admin":t.role,e=L[s]||[],n=ce()[s]||e;let a={...t.customModules||{}};function i(r){if(a[r]!==void 0)return!!a[r];const o=n.find(b=>b.key===r);return o?o.visible!==!1:!0}function l(){return e.filter(r=>i(r.key)).length}function m(){return`
      <div style="padding:4px 0 16px 0;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:22px;">🧭</span>
              <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">${escapeHtml(t.name)}</h3>
              <span class="badge ${t.role==="admin"?"blue":t.role==="employee"?"purple":"gold"}">${t.role.toUpperCase()}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px;">
              Configure which sidebar navigation modules are visible for this specific user.
            </div>
          </div>
          <div class="pill-counter" id="modalVisCounter" style="background:#0070F3;color:#fff;padding:4px 10px;border-radius:12px;font-weight:700;font-size:12px;">
            ${l()} / ${e.length} modules visible
          </div>
        </div>

        <!-- Master Bulk Actions Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:10px;padding:10px 14px;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <span style="font-size:12px;font-weight:600;color:var(--text-2);">Quick Controls:</span>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn ghost small" id="mShowAllBtn" style="color:#10b981;border-color:rgba(16,185,129,0.3);font-weight:600;">
              👁️ Show All Modules
            </button>
            <button type="button" class="btn ghost small" id="mHideAllBtn" style="color:#f59e0b;border-color:rgba(245,158,11,0.3);font-weight:600;">
              🙈 Hide All Modules
            </button>
            <button type="button" class="btn ghost small" id="mResetDefaultBtn" style="color:var(--text-3);">
              ↺ Role Default
            </button>
          </div>
        </div>

        <!-- Modules Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:10px;max-height:55vh;overflow-y:auto;padding-right:4px;" id="mModulesGrid">
          ${e.map(r=>{const o=i(r.key),b=!!r.locked;return`
              <div class="nav-item-card ${o?"":"is-hidden"}" data-key="${r.key}" style="padding:10px 12px;">
                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                  <span style="font-size:20px;flex-shrink:0;">${r.icon||"📌"}</span>
                  <div style="min-width:0;">
                    <div style="font-size:13px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.label)}</div>
                    <div style="font-size:11px;font-weight:600;color:${o?"#10b981":"#f59e0b"};" class="m-status-lbl">${o?"● Visible":"○ Hidden"}</div>
                  </div>
                </div>
                <label class="ci-switch">
                  <input type="checkbox" class="m-toggle-input" data-key="${r.key}" ${o?"checked":""} ${b?"disabled":""}>
                  <span class="ci-switch-slider"></span>
                </label>
              </div>
            `}).join("")}
        </div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:14px;border-top:1px solid var(--border-color);">
          <button type="button" class="btn ghost" id="mCancelBtn">Cancel</button>
          <button type="button" class="btn gold" id="mSaveBtn">💾 Save Permissions for ${escapeHtml(t.name)}</button>
        </div>
      </div>
    `}const p=openModal(m(),"medium");function d(){const r=p.querySelector("#modalVisCounter"),o=p.querySelector("#mShowAllBtn");o&&(o.onclick=()=>{e.forEach(x=>{a[x.key]=!0}),c()});const b=p.querySelector("#mHideAllBtn");b&&(b.onclick=()=>{e.forEach(x=>{a[x.key]=!!x.locked}),c()});const u=p.querySelector("#mResetDefaultBtn");u&&(u.onclick=()=>{a={},c()});const S=p.querySelector("#mCancelBtn");S&&(S.onclick=()=>p.remove());function w(){p.querySelectorAll(".m-toggle-input").forEach(x=>{x.onchange=()=>{const k=x.dataset.key;a[k]=x.checked;const A=x.closest(".nav-item-card");if(A){A.classList.toggle("is-hidden",!x.checked);const D=A.querySelector(".m-status-lbl");D&&(D.textContent=x.checked?"● Visible":"○ Hidden",D.style.color=x.checked?"#10b981":"#f59e0b")}r&&(r.textContent=`${l()} / ${e.length} modules visible`)}})}function c(){const x=p.querySelector("#mModulesGrid");x&&(x.innerHTML=e.map(k=>{const A=i(k.key),D=!!k.locked;return`
            <div class="nav-item-card ${A?"":"is-hidden"}" data-key="${k.key}" style="padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                <span style="font-size:20px;flex-shrink:0;">${k.icon||"📌"}</span>
                <div style="min-width:0;">
                  <div style="font-size:13px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(k.label)}</div>
                  <div style="font-size:11px;font-weight:600;color:${A?"#10b981":"#f59e0b"};" class="m-status-lbl">${A?"● Visible":"○ Hidden"}</div>
                </div>
              </div>
              <label class="ci-switch">
                <input type="checkbox" class="m-toggle-input" data-key="${k.key}" ${A?"checked":""} ${D?"disabled":""}>
                <span class="ci-switch-slider"></span>
              </label>
            </div>
          `}).join(""),w()),r&&(r.textContent=`${l()} / ${e.length} modules visible`)}w();const v=p.querySelector("#mSaveBtn");v&&(v.onclick=async()=>{v.disabled=!0,v.textContent="Saving…";try{await X(t._id||t.id,a),t.customModules=a,flashToast(`✅ Module permissions updated for ${t.name}!`,"success"),p.remove(),setTimeout(()=>{M()},300)}catch(x){flashToast("❌ Failed to save: "+x.message,"error"),v.disabled=!1,v.textContent=`💾 Save Permissions for ${escapeHtml(t.name)}`}})}d()}const Ve=me;function ee(t){const s=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
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
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const n=getUploaderAttachments("mPersonFiles"),a={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:n};if(!a.name){flashToast("Name is required",!0);return}try{s?await apiPost("/personnel",a):await apiPut("/personnel/"+t._id,a),await N(),flashToast("Person saved! 📁"),e.remove(),$()}catch(i){flashToast(i.message,!0)}}}function le(t){const s=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const n=getUploaderAttachments("mClientFiles"),a={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:n};if(!a.name){flashToast("Name is required",!0);return}try{s?await apiPost("/clients",a):await apiPut("/clients/"+t._id,a),await N(),flashToast("Client saved! 📁"),e.remove(),$()}catch(i){flashToast(i.message,!0)}}}function re(t){const s=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const n={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!n.name){flashToast("Name is required",!0);return}try{s?await apiPost("/services",n):await apiPut("/services/"+t._id,n),await N(),e.remove(),$()}catch(a){flashToast(a.message,!0)}}}async function ge(t){const s=await apiGet("/users");let e="all",n="role",a="";function i(){let u=[...s];if(a){const c=a.toLowerCase();u=u.filter(v=>v.name&&v.name.toLowerCase().includes(c)||v.email&&v.email.toLowerCase().includes(c)||v.role&&v.role.toLowerCase().includes(c))}e==="admin"?u=u.filter(c=>c.role==="superadmin"||c.role==="admin"):e==="accounts"?u=u.filter(c=>c.role==="accounts"):e==="employee"?u=u.filter(c=>c.role==="employee"):e==="client"&&(u=u.filter(c=>c.role==="client"));const S={superadmin:1,admin:1,accounts:2,employee:3,client:4};n==="role"?u.sort((c,v)=>{const x=S[c.role]||9,k=S[v.role]||9;return x!==k?x-k:(c.name||"").localeCompare(v.name||"")}):n==="role-desc"?u.sort((c,v)=>{const x=S[c.role]||9,k=S[v.role]||9;return x!==k?k-x:(c.name||"").localeCompare(v.name||"")}):n==="name-asc"?u.sort((c,v)=>(c.name||"").localeCompare(v.name||"")):n==="name-desc"?u.sort((c,v)=>(v.name||"").localeCompare(c.name||"")):n==="status"&&u.sort((c,v)=>(v.active?1:0)-(c.active?1:0));const w=t.querySelector("#userTableBody");if(w){if(u.length===0){w.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}w.innerHTML=u.map(c=>{const v=c.role==="superadmin",x=c.role==="admin",k=c.role==="accounts",A=c.role==="employee",D=v?'<span class="badge gold" style="font-weight:700">👑 Superadmin</span>':x?'<span class="badge gold" style="font-weight:700">🛡️ Admin</span>':k?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':A?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',J=c.personnelId?escapeHtml(c.personnelId.name):c.clientId?escapeHtml(c.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(c.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(c.email)}</span></td>
          <td>${D}</td>
          <td>${J}</td>
          <td><span class="badge ${c.active?"green":"gray"}">${c.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small user-modules-btn" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px;color:#0070F3;border-color:rgba(0,112,243,0.35);font-weight:600;" title="Customize Sidebar Modules for this Person">🧭 Modules</button>
              <button class="btn ghost small reset-pw-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px" title="Change Password">🔑 Password</button>
              <button class="btn ghost small edit-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),w.querySelectorAll(".user-modules-btn").forEach(c=>{c.onclick=()=>{const v=s.find(x=>x._id===c.dataset.id);v&&ve(v)}}),w.querySelectorAll(".reset-pw-user").forEach(c=>{c.onclick=async()=>{const v=s.find(k=>k._id===c.dataset.id);if(!v)return;const x=prompt(`Enter new password for ${v.name} (${v.email}):`);if(!(!x||!x.trim()))try{await apiPut("/users/"+v._id,{password:x.trim()}),flashToast(`Password successfully changed for ${v.name}! 🔑`)}catch(k){flashToast(k.message,!0)}}}),w.querySelectorAll(".edit-user").forEach(c=>c.onclick=()=>de(s.find(v=>v._id===c.dataset.id))),w.querySelectorAll(".del-user").forEach(c=>c.onclick=async()=>{const v=c.dataset.id,x=s.find(A=>A._id===v),k=x?x.name:"this user";if(confirm(`Permanently remove ${k} from CI360?`))try{await apiDelete("/users/"+v),flashToast(`User ${k} removed`);const A=s.findIndex(D=>D._id===v);A!==-1&&s.splice(A,1),i(),await ge(t)}catch(A){flashToast(A.message,!0)}})}}const l=s.filter(u=>u.role==="superadmin"||u.role==="admin").length,m=s.filter(u=>u.role==="accounts").length,p=s.filter(u=>u.role==="employee").length,d=s.filter(u=>u.role==="client").length;t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">👤</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">User Accounts & Credentials</h1>
            <p class="ci360-hero-subheading">Manage login access, roles, and security credentials for all team and client users</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addUserBtn" type="button" style="font-weight:700;">+ Add User</button>
        </div>
      </header>

      <!-- Controls: Filter Chips, Search, Sort Dropdown -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <!-- Filter Tabs -->
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="pchip active user-role-filter" data-role="all">All (${s.length})</button>
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${l})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${m})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${p})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${d})</button>
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
    </section>`,i(),t.querySelectorAll(".user-role-filter").forEach(u=>{u.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(S=>S.classList.remove("active")),u.classList.add("active"),e=u.dataset.role,i()}});const r=t.querySelector("#userSortSel");r&&(r.onchange=()=>{n=r.value,i()});const o=t.querySelector("#userSearchInp");o&&(o.oninput=()=>{a=o.value.trim(),i()});const b=t.querySelector("#addUserBtn");b&&(b.onclick=()=>de(null))}function de(t){const s=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,n=openModal(`<h3>${s?"Add":"Edit"} User</h3>
    <div class="field-row">
      <div class="field"><label>Name</label><input id="uName" type="text" value="${escapeHtml(t.name)}"></div>
      <div class="field"><label>Email</label><input id="uEmail" type="email" value="${escapeHtml(t.email)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Role</label><select id="uRole">
        <option value="superadmin" ${e==="superadmin"?"selected":""}>👑 Superadmin</option>
        <option value="admin" ${e==="admin"?"selected":""}>🛡️ Admin</option>
        <option value="accounts" ${e==="accounts"?"selected":""}>💳 Accounts & Finance</option>
        <option value="employee" ${e==="employee"?"selected":""}>💼 Employee</option>
        <option value="client" ${e==="client"?"selected":""}>🤝 Client</option></select></div>
      <div class="field"><label>Password ${s?"*":"(leave blank to keep current)"}</label><input id="uPassword" type="text" placeholder="${s?"Set initial password":"Enter new password to change"}" autocomplete="off"></div>
    </div>
    <div class="field" id="uLinkWrap"></div>
    <div class="field"><label><input type="checkbox" id="uActive" ${t.active?"checked":""}> Active</label></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function a(){const i=n.querySelector("#uRole").value,l=n.querySelector("#uLinkWrap");i==="employee"?l.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${f.personnel.map(m=>`<option value="${m._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===m._id?"selected":""}>${escapeHtml(m.name)}</option>`).join("")}</select>`:i==="client"?l.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${f.clients.map(m=>`<option value="${m._id}" ${t.clientId&&(t.clientId._id||t.clientId)===m._id?"selected":""}>${escapeHtml(m.name)}</option>`).join("")}</select>`:l.innerHTML=""}n.querySelector("#uRole").onchange=a,a(),n.querySelector("#mCancel").onclick=()=>n.remove(),n.querySelector("#mSave").onclick=async()=>{const i=n.querySelector("#uRole").value,l={name:n.querySelector("#uName").value.trim(),email:n.querySelector("#uEmail").value.trim(),role:i,active:n.querySelector("#uActive").checked,personnelId:i==="employee"&&n.querySelector("#uPersonnel")?.value||null,clientId:i==="client"&&n.querySelector("#uClient")?.value||null},m=n.querySelector("#uPassword").value;if(m&&(l.password=m),!l.name||!l.email){flashToast("Name and email required",!0);return}if(s&&!m){flashToast("Password required for a new user",!0);return}try{s?await apiPost("/users",l):await apiPut("/users/"+t._id,l),n.remove(),$()}catch(p){flashToast(p.message,!0)}}}let O={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};async function We(t){Ce(t,{userRole:"superadmin",currentUser:E})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),$()}catch(s){flashToast(s.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(m=>m._id===t);if(!e)return;const n=e.completionDateStr||e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):""),a=prompt("Edit task title:",e.title);if(a===null)return;const i=prompt("Edit completion date (YYYY-MM-DD):",n),l={};a.trim()&&(l.title=a.trim()),i&&i.trim()&&(l.completionDateStr=i.trim(),l.completionDate=i.trim(),l.dateStr=i.trim()),await apiPut("/tasks/"+t,l),flashToast("Task updated"),$()}catch(s){flashToast(s.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const s=prompt("Enter task for this employee:");if(!(!s||!s.trim()))try{const e=new Date,n=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,a=O.date==="all"?n:O.date;await apiPost("/tasks",{title:s.trim(),personnelId:t,dueDate:a,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),$()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),$()}catch(s){flashToast(s.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const s={date:O.date};t&&t!=="all"?s.personnelId=t:O.personnelId&&O.personnelId;const e=await apiPost("/tasks/clear-completed",s);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),$()}catch(s){flashToast(s.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,s=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!s&&!e&&y.tab!=="logjob"&&$(!0)});Te();function Qe(t,s,e,n="denial"){const a=n==="revision",i=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:8px">
        <span>🔁</span> Resubmit Work to Client for Approval
      </div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(s)}</div>
    </div>

    ${e?`
      <div style="margin-bottom:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--r-sm);padding:10px 14px">
        <strong style="color:var(--red-500);font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:2px">${a?"Client's Revision Request / Notes:":"Client's Previous Denial Reason:"}</strong>
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
  `);bindAttachmentUploader("mAdmResubUp"),i.querySelector("#mAdmResubCancel").onclick=()=>i.remove(),i.querySelector("#mAdmResubConfirm").onclick=async()=>{const l=i.querySelector("#mAdmResubNotes").value.trim(),m=i.querySelector("#mAdmResubUrl").value.trim(),p=getUploaderAttachments("mAdmResubUp"),d=i.querySelector("#mAdmResubConfirm");d.disabled=!0,d.textContent="Resubmitting…";try{await apiPost(`/jobs/${t}/resubmit`,{notes:l,url:m,deliverables:p}),flashToast("Job resubmitted to client for re-approval! 🔁🎉"),i.remove(),$()}catch(r){flashToast(r.message,!0),d.disabled=!1,d.textContent="🔁 Resubmit to Client for Approval"}}}
