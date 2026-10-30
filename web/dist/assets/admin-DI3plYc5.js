import{l as ie,m as ne}from"./api-B6bjYwkm.js";import{initProposalStudio as le}from"./proposals-jRIgOM5M.js";import{i as oe,a as re}from"./teambonding-Dg3qBDfs.js";let U=null,g={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},E=null,f={tab:"dashboard",period:"month",jobsFilter:"all"},m={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function de(){initTheme(),U=requireAuth("superadmin"),U&&(await D(),O())}async function D(){const[t,s,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);g.personnel=t,g.clients=s,g.services=e}function L(){const t=g.personnel.find(a=>/mansi/i.test(a.name)),s=g.personnel.find(a=>/urna/i.test(a.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),s&&e.push({personId:s._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function te(t){const s=g.personnel.find(e=>e._id===t);return s?s.name:"—"}function F(t){const s=g.clients.find(e=>e._id===t);return s?s.name:"—"}const j=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"billing_dashboard",label:"Accounts Dashboard",icon:"💳"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Settings & Manage",icon:"⚙️"}];function O(){const t=document.getElementById("app"),s=j.find(e=>e.key===f.tab)||j[0];t.innerHTML=renderAppShell({user:U,currentRole:"superadmin",activeTab:f.tab,tabs:j,title:s.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{f.tab=e,O()}),h()}window.ci360NavTab=t=>{f.tab=t,O()};async function h(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(4);try{if(f.tab==="dashboard")await me(t);else if(f.tab==="dailytasks")await Ce(t);else if(f.tab==="proposals")await ce(t);else if(f.tab==="teambonding"||f.tab==="bonding")await pe(t);else if(f.tab==="logjob")R(t);else if(f.tab==="jobs")await fe(t);else if(f.tab==="byclient")await he(t);else if(f.tab==="byperson")await se(t);else if(f.tab==="accounts")await xe(t);else if(f.tab==="billing_dashboard"){window.location.href="/accounts";return}else f.tab==="targets"?await Se(t):f.tab==="salaries"?await $e(t):f.tab==="settings"||f.tab==="manage"?Ae(t):f.tab==="users"&&await ae(t)}catch(s){t.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(s.message)}</div>`}}}async function ce(t){t.innerHTML='<div id="proposals-module-root"></div>';const s=t.querySelector("#proposals-module-root");le(s)}async function pe(t){t.innerHTML='<div id="teambonding-module-root"></div>';const s=t.querySelector("#teambonding-module-root");re(s,{currentUser:U})}function J(){return renderPeriodPicker(f.period)}function W(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{f.period=t.dataset.period,h()}})}async function me(t){E=await apiGet("/dashboard/admin?period="+f.period);const s=E.overview;t.innerHTML=`
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
      ${E.insights.length?E.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${V(E.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${V(E.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${E.personnel.filter(e=>e.status!=="inactive").map(ue).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,W()}function V(t,s){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(a=>a[1]));return t.map(([a,i])=>`
    <div class="bar-row">
      <div>${escapeHtml(a)}</div>
      <div class="bar-track"><div class="bar-fill ${s?"gold":""}" style="width:${(i/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(i)}</div>
    </div>`).join("")}function ue(t){const s=Math.min(t.utilization,160);return`
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
    </div>`}function R(t){(!m.assignments||m.assignments.every(e=>!e.personId))&&(m.assignments=L());const s=m.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0);t.innerHTML=`
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
                ${g.clients.map(e=>`<option value="${e._id}" ${e._id===m.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${m.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${m.completion||""}" placeholder="dd.mm.yyyy">
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
                ${g.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${m.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${m.serviceIds.map(e=>{const a=g.services.find(i=>i._id===e);return a?`
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
            <input type="number" id="jValue" value="${m.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(m.desc||"")}</textarea>
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
              ${m.assignments.map((e,a)=>ve(e,a)).join("")}
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
  `,ge()}function ve(t,s){return`
    <div class="person-assign-row" data-idx="${s}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${g.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
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
  `}function ge(){const t=document.getElementById("jClient");t&&(t.onchange=l=>m.clientId=l.target.value);const s=document.getElementById("addNewClientBtn");s&&(s.onclick=()=>{const l=openModal(`
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
      `);l.querySelector("#mCancel").onclick=()=>l.remove(),l.querySelector("#mSave").onclick=async()=>{const b=l.querySelector("#newClientName").value.trim(),c=l.querySelector("#newClientNotes").value.trim();if(!b){flashToast("Client name is required",!0);return}try{const v=await apiPost("/clients",{name:b,notes:c});await D(),m.clientId=v._id,flashToast("Client added"),l.remove(),R(document.getElementById("content"))}catch(v){flashToast(v.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=l=>m.date=l.target.value);const a=document.getElementById("jCompletion");a&&(a.onchange=l=>m.completion=l.target.value);const i=document.getElementById("jService");i&&(i.onchange=l=>{const b=l.target.value;b&&(m.serviceIds.includes(b)||m.serviceIds.push(b),R(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(l=>{l.onclick=b=>{b.stopPropagation();const c=l.dataset.id;m.serviceIds=m.serviceIds.filter(v=>v!==c),R(document.getElementById("content"))}});const n=document.getElementById("addNewServiceBtn");n&&(n.onclick=()=>{const l=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);l.querySelector("#mCancel").onclick=()=>l.remove(),l.querySelector("#mSave").onclick=async()=>{const b=l.querySelector("#newServiceName").value.trim();if(!b){flashToast("Service name is required",!0);return}try{const c=await apiPost("/services",{name:b});await D(),m.serviceIds.includes(c._id)||m.serviceIds.push(c._id),flashToast("Service added"),l.remove(),R(document.getElementById("content"))}catch(c){flashToast(c.message,!0)}}});const d=document.getElementById("jDesc");d&&(d.oninput=l=>m.desc=l.target.value);const u=document.getElementById("jValue");u&&(u.oninput=l=>m.value=l.target.value),document.querySelectorAll(".person-assign-row").forEach(l=>{const b=Number(l.dataset.idx),c=l.querySelector(".a-person");c&&(c.onchange=p=>m.assignments[b].personId=p.target.value);const v=l.querySelector(".a-percent");v&&(v.oninput=p=>{m.assignments[b].percent=p.target.value,be()});const S=l.querySelector(".a-hours");S&&(S.oninput=p=>m.assignments[b].hours=p.target.value);const o=l.querySelector(".a-remove");o&&(o.onclick=()=>{m.assignments.length>1&&(m.assignments.splice(b,1),R(document.getElementById("content")))})});const x=document.getElementById("addAssignRow");x&&(x.onclick=()=>{m.assignments.push({personId:"",percent:0,hours:""}),R(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:m.attachments||[]});const y=document.getElementById("clearJobBtn");y&&(y.onclick=()=>{m={title:"",assignments:L(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),R(document.getElementById("content"))});const w=document.getElementById("saveJobBtn");w&&(w.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!m.clientId){flashToast("Please select a client",!0);return}if(!m.serviceIds||!m.serviceIds.length){flashToast("Please select at least one service",!0);return}const l=m.assignments.filter(p=>p.personId);if(!l.length){flashToast("Please assign at least one person",!0);return}for(const p of l)if(p.hours===""||p.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const b=g.clients.find(p=>p._id===m.clientId),v=g.services.filter(p=>m.serviceIds.includes(p._id)).map(p=>p.name).join(", "),S=m.title||(b?`${b.name} — ${v||"Deliverable"}`:v||"Untitled Job"),o=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:S,clientId:m.clientId,serviceIds:m.serviceIds,date:m.date||new Date().toISOString().slice(0,10),completionDate:m.completion||null,value:Number(m.value)||0,description:m.desc||"",assignments:l,attachments:o}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),m={title:"",assignments:L(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},f.tab="jobs",h()}catch(l){flashToast(l.message,!0)}})}function be(){const t=m.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0),s=document.querySelector(".assign-total");s&&(s.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,s.classList.toggle("warn",t!==100))}async function fe(t){let s=await apiGet("/jobs");s.sort((e,a)=>new Date(a.date)-new Date(e.date)),f.jobsFilter==="progress"&&(s=s.filter(e=>!e.completionDate)),f.jobsFilter==="done"&&(s=s.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${s.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${f.jobsFilter==="all"?"active":""}" data-jf="all">All</button>
        <button class="pchip ${f.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${f.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${s.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${s.map(e=>{var u,x,y,w;const a=e.status==="Completed",i=(e.assignments||[]).map(l=>`${escapeHtml(te(l.personId))} (${l.percent}%)`).join(", "),n=(e.attachments||[]).length,d=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${n?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${n} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${n} Brief</span></button>`:""}
                  ${d?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${d} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${d} Work</span></button>`:""}
                  ${!n&&!d?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${a?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${a}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${a?"green":e.status==="Needs Revision"||e.status==="Denied"?"red":"amber"}">${a?"Completed":e.status==="Needs Revision"?"Needs Revision":e.status==="Denied"?"Denied":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`<span style="font-size:10px;font-weight:700;color:var(--amber-500)">↺ Revision Req.</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(((u=e.clientApproval)==null?void 0:u.feedback)||"")}" data-type="revision" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:e.clientApproval&&e.clientApproval.isRevised?'<span style="font-size:10px;font-weight:700;color:var(--brand-500)">📦 Revised — Awaiting Re-approval</span>':e.status==="Denied"||((x=e.clientApproval)==null?void 0:x.status)==="Denied"?`<span style="font-size:10px;font-weight:700;color:var(--red-500)" title="Reason: ${escapeHtml(((y=e.clientApproval)==null?void 0:y.deniedReason)||"")}">❌ Denied</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(((w=e.clientApproval)==null?void 0:w.deniedReason)||"")}" data-type="denial" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:""}
                </div>
              </td>
              <td>${escapeHtml(F(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(l=>`<span class="badge gray">${escapeHtml(l)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${i||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((l,b)=>l+(Number(b.hours)||0),0))}</td>
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
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{f.jobsFilter=e.dataset.jf,h()}),document.querySelectorAll(".admin-resubmit-btn").forEach(e=>{e.onclick=()=>Ie(e.dataset.id,e.dataset.title,e.dataset.reason,e.dataset.type)}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{var x,y,w,l,b,c;const a=e.dataset.id,i=s.find(v=>v._id===a);if(!i)return;const n=encodeURIComponent(JSON.stringify(i.attachments||[])),d=encodeURIComponent(JSON.stringify(i.deliverables||[])),u=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i.title||"Untitled Job")}</div>
        </div>

        ${((x=i.clientApproval)==null?void 0:x.status)==="Revision Requested"||i.status==="Needs Revision"?`
          <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--amber-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>⚠️</span> Client Requested Changes / Revision
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(((y=i.clientApproval)==null?void 0:y.feedback)||"Revision requested")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${i._id}', '${escapeHtml(i.title||"Job")}', '${escapeHtml(((w=i.clientApproval)==null?void 0:w.feedback)||"")}', 'revision')" style="font-weight:700">
              🔁 Resubmit Revised Work
            </button>
          </div>
        `:i.status==="Denied"||((l=i.clientApproval)==null?void 0:l.status)==="Denied"?`
          <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--red-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>❌</span> Job Denied by Client
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(((b=i.clientApproval)==null?void 0:b.deniedReason)||"Job denied")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${i._id}', '${escapeHtml(i.title||"Job")}', '${escapeHtml(((c=i.clientApproval)==null?void 0:c.deniedReason)||"")}', 'denial')" style="font-weight:700">
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
            <div data-attachments="${d}">
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
      `);bindAttachmentUploader("mDelUpload"),u.querySelector("#mDelSaveBtn").onclick=async()=>{var C,q;const v=getUploaderAttachments("mDelUpload"),S=u.querySelector("#mDelNote").value.trim(),o=((C=(u.querySelector("#mDelUrl")||{}).value)==null?void 0:C.trim())||"",p=((q=u.querySelector("#mDelMarkComplete"))==null?void 0:q.checked)??!0,A=v.map(I=>({...I,notes:S}));if(o){let I=o;/^https?:\/\//i.test(I)||(I="https://"+I),A.unshift({name:S?`${S} (Live URL)`:"Live Deliverable URL / Website",url:I,type:"url",size:0,notes:S||"Live URL"})}if(!A.length){flashToast("Please enter a deliverable URL or select files",!0);return}try{await apiPost(`/jobs/${a}/deliverables`,{deliverables:A,markComplete:p}),flashToast(p?"Deliverables added & sent to Client for Approval! 📦🎉":"Deliverables added! 📦"),u.remove(),h()}catch(I){flashToast(I.message,!0)}},u.querySelector("#mCloseFiles").onclick=()=>u.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,i=s.find(n=>n._id===a);i&&ye(i,()=>h())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const a=e.dataset.id,i=e.dataset.done==="false",n=s.find(u=>u._id===a);let d=n?n.completionDate:null;i&&!d&&(d=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+a,{status:i?"Completed":"In Progress",completionDate:d}),flashToast(i?"Job marked as Completed!":"Job marked as In Progress"),h()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),h())})}function ye(t,s){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(r=>r._id||r):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(r=>({personId:String(r.personId._id||r.personId),percent:r.percent!=null?r.percent:0,hours:r.hours!=null?r.hours:0})):L()};function a(){return e.serviceIds.length?e.serviceIds.map(r=>{const $=g.services.find(k=>String(k._id)===String(r));return $?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml($.name)}
          <span class="m-remove-service" data-id="${$._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function i(){return e.assignments.map((r,$)=>`
      <div class="m-person-assign-row" data-idx="${$}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${g.personnel.map(k=>`<option value="${k._id}" ${String(k._id)===String(r.personId)?"selected":""}>${escapeHtml(k.name)}${k.duties?` (${escapeHtml(k.duties)})`:""}</option>`).join("")}
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
            ${g.clients.map(r=>`<option value="${r._id}" ${String(r._id)===String(e.clientId)?"selected":""}>${escapeHtml(r.name)}</option>`).join("")}
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
          ${g.services.map(r=>`<option value="${r._id}">${escapeHtml(r.name)}</option>`).join("")}
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
  `),d=n.querySelector(".modal");d&&(d.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const u=()=>{const r=e.assignments.reduce((k,N)=>k+(Number(N.percent)||0),0),$=n.querySelector("#mAssignTotalInfo");$&&($.innerHTML=r===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${r}% Allocated (should be 100%)</span>`)},x=()=>{n.querySelectorAll(".m-remove-service").forEach(r=>{r.onclick=()=>{const $=r.dataset.id;e.serviceIds=e.serviceIds.filter(k=>String(k)!==String($)),n.querySelector("#mEditServicesTags").innerHTML=a(),x()}})},y=()=>{n.querySelectorAll(".m-person-assign-row").forEach(r=>{const $=Number(r.dataset.idx),k=r.querySelector(".m-a-person");k&&(k.onchange=P=>e.assignments[$].personId=P.target.value);const N=r.querySelector(".m-a-percent");N&&(N.oninput=P=>{e.assignments[$].percent=P.target.value,u()});const B=r.querySelector(".m-a-hours");B&&(B.oninput=P=>e.assignments[$].hours=P.target.value);const _=r.querySelector(".m-a-remove");_&&(_.onclick=()=>{e.assignments.length>1?(e.assignments.splice($,1),n.querySelector("#mEditAssignRows").innerHTML=i(),y(),u()):flashToast("Job must have at least one team member row",!0)})})},w=n.querySelector("#mCloseJobEdit"),l=n.querySelector("#mEditCancel");w&&(w.onclick=()=>n.remove()),l&&(l.onclick=()=>n.remove());const b=n.querySelector("#mEditTitle");b&&(b.oninput=r=>e.title=r.target.value);const c=n.querySelector("#mEditClient");c&&(c.onchange=r=>e.clientId=r.target.value);const v=n.querySelector("#mEditStatus");v&&(v.onchange=r=>e.status=r.target.value);const S=n.querySelector("#mEditDate");S&&(S.onchange=r=>e.date=r.target.value);const o=n.querySelector("#mEditCompletionDate");o&&(o.onchange=r=>e.completionDate=r.target.value);const p=n.querySelector("#mEditPriority");p&&(p.onchange=r=>e.priority=r.target.value);const A=n.querySelector("#mEditValue");A&&(A.oninput=r=>e.value=r.target.value);const C=n.querySelector("#mEditDesc");C&&(C.oninput=r=>e.description=r.target.value);const q=n.querySelector("#mEditServiceSelect");q&&(q.onchange=r=>{const $=r.target.value;$&&!e.serviceIds.map(String).includes(String($))&&(e.serviceIds.push($),n.querySelector("#mEditServicesTags").innerHTML=a(),x()),q.value=""}),x(),y(),u();const I=n.querySelector("#mAddAssignRow");I&&(I.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),n.querySelector("#mEditAssignRows").innerHTML=i(),y(),u()});const H=n.querySelector("#mEditSave");H&&(H.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const r=e.assignments.filter(T=>T.personId&&String(T.personId).trim()!=="");if(!r.length){flashToast("Please select at least one assigned team member",!0);return}for(const T of r)if(T.hours===""||T.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const $=g.clients.find(T=>String(T._id)===String(e.clientId)),N=g.services.filter(T=>e.serviceIds.map(String).includes(String(T._id))).map(T=>T.name).join(", "),B=e.title||($?`${$.name} — ${N||"Deliverable"}`:N||"Untitled Job"),_=getUploaderAttachments("mEditAttachments"),P=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:B,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:r,attachments:_,deliverables:P});const Te=r.map(T=>te(T.personId)).join(", ");flashToast("Job updated & saved! 📁"),n.remove(),s&&s()}catch(r){flashToast(r.message,!0)}finally{H.disabled=!1,H.textContent="Save & Update Assignments"}})}async function he(t){E=await apiGet("/dashboard/admin?period="+f.period),t.innerHTML=`${J()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${E.clients.map(s=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(s.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${s.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${s.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,W()}async function se(t){E=await apiGet("/dashboard/admin?period="+f.period),t.innerHTML=`${J()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${E.personnel.map(s=>{const e=(s.status||"active").toLowerCase(),a=s.personId||s._id;return`<tr>
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
    </section>`,W(),document.querySelectorAll(".person-status-sel").forEach(s=>{s.onchange=async e=>{const a=s.dataset.id,i=e.target.value;try{await apiPut("/personnel/"+a,{status:i}),await D(),flashToast("Status updated to "+i),se(t)}catch(n){flashToast(n.message,!0)}}})}const z=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function xe(t){const s=await apiGet("/roster");t.innerHTML=`
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
        ${s?`<select id="rClient"><option value="">Select…</option>${g.clients.map(i=>`<option value="${i._id}">${escapeHtml(i.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(F(e.clientId))}" disabled>`}
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
    </div>`);a.querySelector("#mCancel").onclick=()=>a.remove(),s||(a.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),a.remove(),h())}),a.querySelector("#mSave").onclick=async()=>{const i={};a.querySelectorAll(".r-role").forEach(d=>i[d.dataset.key]=d.value.trim());const n={nature:a.querySelector("#rNature").value,roles:i,difficulty:Number(a.querySelector("#rDifficulty").value)||1,comments:a.querySelector("#rComments").value.trim()};try{if(s){const d=a.querySelector("#rClient").value;if(!d){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:d},n))}else await apiPut("/roster/"+e._id,n);a.remove(),h()}catch(d){flashToast(d.message,!0)}}}function we(t){if(!t)return"Deliverables";const s={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return s[t]?s[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function Se(t){const s=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
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
              ${s.map(a=>{var v,S;const i=((v=a.personId)==null?void 0:v.name)||"—",n=((S=a.serviceId)==null?void 0:S.name)||"—",d=we(a.unit),u=e[a.period]||(a.period?a.period.toUpperCase():"Daily"),x=a.actual||0,y=a.quantity>0?x/a.quantity:0,w=Math.round(y*100),l=y>=1?"green":y>=.6?"amber":"red",b=y>=1?"✓ Met":y>=.6?"Behind":"Off Pace",c=Math.min(w,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(i)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(n)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${a.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(d)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${u}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${x} / ${a.quantity} <span style="font-weight:500;color:var(--text-3)">(${w}%)</span></span>
                        <span class="badge ${l}" style="font-size:10px;padding:1px 5px">${b}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${c}%;height:100%;background:var(--${l==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
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
  `,document.getElementById("addAdminTargetBtn").onclick=()=>Q(null),document.querySelectorAll(".edit-target").forEach(a=>{a.onclick=()=>Q(s.find(i=>i._id===a.dataset.id))}),document.querySelectorAll(".del-target").forEach(a=>{a.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+a.dataset.id),flashToast("Target removed"),h()}catch(i){flashToast(i.message,!0)}}})}function Q(t){var w,l,b,c;const s=!t;t=t||{personId:(w=g.personnel[0])==null?void 0:w._id,serviceId:(l=g.services[0])==null?void 0:l._id,quantity:5,unit:"reels",period:"day"};const e=((b=t.personId)==null?void 0:b._id)||t.personId||"",a=((c=t.serviceId)==null?void 0:c._id)||t.serviceId||"",n=["reels","stories","posts","count","hours"].includes(t.unit),d=openModal(`
    <h3>${s?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${g.personnel.map(v=>`<option value="${v._id}" ${String(v._id)===String(e)?"selected":""}>${escapeHtml(v.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${g.services.map(v=>`<option value="${v._id}" ${String(v._id)===String(a)?"selected":""}>${escapeHtml(v.name)}</option>`).join("")}
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
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const u=d.querySelector("#mTgtUnit"),x=d.querySelector("#mTgtCustomUnitWrap"),y=d.querySelector("#mTgtCustomUnit");u.onchange=()=>{u.value==="custom"?(x.style.display="flex",y.focus()):x.style.display="none"},d.querySelector("#mCancel").onclick=()=>d.remove(),d.querySelector("#mSave").onclick=async()=>{let v=u.value;v==="custom"&&(v=y.value.trim()||"Deliverables");const S=getUploaderAttachments("mTgtAttachments"),o={personId:d.querySelector("#mTgtPerson").value,serviceId:d.querySelector("#mTgtService").value,quantity:Number(d.querySelector("#mTgtQty").value)||1,unit:v,period:d.querySelector("#mTgtPeriod").value,attachments:S};if(!o.personId||!o.serviceId){flashToast("Person and Service are required",!0);return}try{s?await apiPost("/targets",o):await apiPut("/targets/"+t._id,o),flashToast("Target saved successfully! 🎯"),d.remove(),h()}catch(p){flashToast(p.message,!0)}}}async function $e(t){const[s,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);g.salaryGrades=s,g.salaryAssignments=e;const a={};e.forEach(i=>a[i.personId]=i.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${s.map(i=>`<div class="manage-item"><div><strong>${escapeHtml(i.label)}</strong><div class="muted">${fmtINR(i.min)} – ${fmtINR(i.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${i._id}">Edit</button><button class="btn danger small del-grade" data-id="${i._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${g.personnel.map(i=>`<tr><td><strong>${escapeHtml(i.name)}</strong><div class="muted">${escapeHtml(i.duties||"")}</div></td>
        <td><span class="badge green">${i.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${i._id}"><option value="">Not set</option>${s.map(n=>`<option value="${n._id}" ${a[i._id]===n._id?"selected":""}>${escapeHtml(n.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>Y(null),document.querySelectorAll(".edit-grade").forEach(i=>i.onclick=()=>Y(s.find(n=>n._id===i.dataset.id))),document.querySelectorAll(".del-grade").forEach(i=>i.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+i.dataset.id),h())}),document.querySelectorAll(".grade-select").forEach(i=>{i.onchange=async()=>{await apiPut("/salary/assignments/"+i.dataset.id,{gradeId:i.value||null}),flashToast("Saved")}})}function Y(t){const s=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${s?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!a.label){flashToast("Label required",!0);return}try{s?await apiPost("/salary/grades",a):await apiPut("/salary/grades/"+t._id,a),e.remove(),h()}catch(i){flashToast(i.message,!0)}}}function ke(t){const s={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <!-- Admin Account Settings Card -->
      <div style="margin-bottom:24px;">
        ${ie({title:"My Administrator Credentials",subtitle:"Manage your personal login email, display name, and password"})}
      </div>

      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${g.personnel.length})</h3>
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
              ${g.personnel.map(n=>`
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${g.clients.length})</h3>
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
              ${g.clients.map(n=>`
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
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${g.services.length})</h3>
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
              ${g.services.map(n=>`
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
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>X(null)),document.querySelectorAll(".edit-person").forEach(n=>n.onclick=()=>X(g.personnel.find(d=>d._id===n.dataset.id))),document.querySelectorAll(".del-person").forEach(n=>n.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+n.dataset.id),await D(),h())});const a=document.getElementById("addClientBtn");a&&(a.onclick=()=>Z(null)),document.querySelectorAll(".edit-client").forEach(n=>n.onclick=()=>Z(g.clients.find(d=>d._id===n.dataset.id))),document.querySelectorAll(".del-client").forEach(n=>n.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+n.dataset.id),await D(),h())});const i=document.getElementById("addServiceBtn");i&&(i.onclick=()=>K(null)),document.querySelectorAll(".edit-service").forEach(n=>n.onclick=()=>K(g.services.find(d=>d._id===n.dataset.id))),document.querySelectorAll(".del-service").forEach(n=>n.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+n.dataset.id),await D(),h())}),ne(t)}const Ae=ke;function X(t){const s=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
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
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mPersonFiles"),i={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:a};if(!i.name){flashToast("Name is required",!0);return}try{s?await apiPost("/personnel",i):await apiPut("/personnel/"+t._id,i),await D(),flashToast("Person saved! 📁"),e.remove(),h()}catch(n){flashToast(n.message,!0)}}}function Z(t){const s=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mClientFiles"),i={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:a};if(!i.name){flashToast("Name is required",!0);return}try{s?await apiPost("/clients",i):await apiPut("/clients/"+t._id,i),await D(),flashToast("Client saved! 📁"),e.remove(),h()}catch(n){flashToast(n.message,!0)}}}function K(t){const s=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!a.name){flashToast("Name is required",!0);return}try{s?await apiPost("/services",a):await apiPut("/services/"+t._id,a),await D(),e.remove(),h()}catch(i){flashToast(i.message,!0)}}}async function ae(t){const s=await apiGet("/users");let e="all",a="role",i="";function n(){let c=[...s];if(i){const o=i.toLowerCase();c=c.filter(p=>p.name&&p.name.toLowerCase().includes(o)||p.email&&p.email.toLowerCase().includes(o)||p.role&&p.role.toLowerCase().includes(o))}e==="admin"?c=c.filter(o=>o.role==="superadmin"||o.role==="admin"):e==="accounts"?c=c.filter(o=>o.role==="accounts"):e==="employee"?c=c.filter(o=>o.role==="employee"):e==="client"&&(c=c.filter(o=>o.role==="client"));const v={superadmin:1,admin:1,accounts:2,employee:3,client:4};a==="role"?c.sort((o,p)=>{const A=v[o.role]||9,C=v[p.role]||9;return A!==C?A-C:(o.name||"").localeCompare(p.name||"")}):a==="role-desc"?c.sort((o,p)=>{const A=v[o.role]||9,C=v[p.role]||9;return A!==C?C-A:(o.name||"").localeCompare(p.name||"")}):a==="name-asc"?c.sort((o,p)=>(o.name||"").localeCompare(p.name||"")):a==="name-desc"?c.sort((o,p)=>(p.name||"").localeCompare(o.name||"")):a==="status"&&c.sort((o,p)=>(p.active?1:0)-(o.active?1:0));const S=t.querySelector("#userTableBody");if(S){if(c.length===0){S.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}S.innerHTML=c.map(o=>{const p=o.role==="superadmin",A=o.role==="admin",C=o.role==="accounts",q=o.role==="employee",I=p?'<span class="badge gold" style="font-weight:700">👑 Superadmin</span>':A?'<span class="badge gold" style="font-weight:700">🛡️ Admin</span>':C?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':q?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',H=o.personnelId?escapeHtml(o.personnelId.name):o.clientId?escapeHtml(o.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(o.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(o.email)}</span></td>
          <td>${I}</td>
          <td>${H}</td>
          <td><span class="badge ${o.active?"green":"gray"}">${o.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),S.querySelectorAll(".edit-user").forEach(o=>o.onclick=()=>ee(s.find(p=>p._id===o.dataset.id))),S.querySelectorAll(".del-user").forEach(o=>o.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+o.dataset.id),flashToast("User removed"),ae(t)}catch(p){flashToast(p.message,!0)}})}}const d=s.filter(c=>c.role==="superadmin"||c.role==="admin").length,u=s.filter(c=>c.role==="accounts").length,x=s.filter(c=>c.role==="employee").length,y=s.filter(c=>c.role==="client").length;t.innerHTML=`
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
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${d})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${u})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${x})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${y})</button>
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
    </section>`,n(),t.querySelectorAll(".user-role-filter").forEach(c=>{c.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(v=>v.classList.remove("active")),c.classList.add("active"),e=c.dataset.role,n()}});const w=t.querySelector("#userSortSel");w&&(w.onchange=()=>{a=w.value,n()});const l=t.querySelector("#userSearchInp");l&&(l.oninput=()=>{i=l.value.trim(),n()});const b=t.querySelector("#addUserBtn");b&&(b.onclick=()=>ee(null))}function ee(t){const s=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,a=openModal(`<h3>${s?"Add":"Edit"} User</h3>
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
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function i(){const n=a.querySelector("#uRole").value,d=a.querySelector("#uLinkWrap");n==="employee"?d.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${g.personnel.map(u=>`<option value="${u._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:n==="client"?d.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${g.clients.map(u=>`<option value="${u._id}" ${t.clientId&&(t.clientId._id||t.clientId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:d.innerHTML=""}a.querySelector("#uRole").onchange=i,i(),a.querySelector("#mCancel").onclick=()=>a.remove(),a.querySelector("#mSave").onclick=async()=>{var x,y;const n=a.querySelector("#uRole").value,d={name:a.querySelector("#uName").value.trim(),email:a.querySelector("#uEmail").value.trim(),role:n,active:a.querySelector("#uActive").checked,personnelId:n==="employee"&&((x=a.querySelector("#uPersonnel"))==null?void 0:x.value)||null,clientId:n==="client"&&((y=a.querySelector("#uClient"))==null?void 0:y.value)||null},u=a.querySelector("#uPassword").value;if(u&&(d.password=u),!d.name||!d.email){flashToast("Name and email required",!0);return}if(s&&!u){flashToast("Password required for a new user",!0);return}try{s?await apiPost("/users",d):await apiPut("/users/"+t._id,d),a.remove(),h()}catch(w){flashToast(w.message,!0)}}}let M={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};async function Ce(t){oe(t,{userRole:"superadmin",currentUser:U})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),h()}catch(s){flashToast(s.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(i=>i._id===t);if(!e)return;const a=prompt("Edit task title:",e.title);a!==null&&a.trim()&&(await apiPut("/tasks/"+t,{title:a.trim()}),flashToast("Task updated"),h())}catch(s){flashToast(s.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const s=prompt("Enter task for this employee:");if(!(!s||!s.trim()))try{const e=new Date,a=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,i=M.date==="all"?a:M.date;await apiPost("/tasks",{title:s.trim(),personnelId:t,dueDate:i,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),h()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),h()}catch(s){flashToast(s.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const s={date:M.date};t&&t!=="all"?s.personnelId=t:M.personnelId&&M.personnelId;const e=await apiPost("/tasks/clear-completed",s);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),h()}catch(s){flashToast(s.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,s=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!s&&!e&&f.tab!=="logjob"&&h()});de();function Ie(t,s,e,a="denial"){const i=a==="revision",n=openModal(`
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
  `);bindAttachmentUploader("mAdmResubUp"),n.querySelector("#mAdmResubCancel").onclick=()=>n.remove(),n.querySelector("#mAdmResubConfirm").onclick=async()=>{const d=n.querySelector("#mAdmResubNotes").value.trim(),u=n.querySelector("#mAdmResubUrl").value.trim(),x=getUploaderAttachments("mAdmResubUp"),y=n.querySelector("#mAdmResubConfirm");y.disabled=!0,y.textContent="Resubmitting…";try{await apiPost(`/jobs/${t}/resubmit`,{notes:d,url:u,deliverables:x}),flashToast("Job resubmitted to client for re-approval! 🔁🎉"),n.remove(),h()}catch(w){flashToast(w.message,!0),y.disabled=!1,y.textContent="🔁 Resubmit to Client for Approval"}}}
