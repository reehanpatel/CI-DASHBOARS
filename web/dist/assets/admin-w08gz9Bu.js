import{l as ie,m as ne}from"./api-Chk_3u1-.js";import{initProposalStudio as le}from"./proposals-BrUT5ebv.js";import{i as oe,a as re}from"./teambonding-DUTVVosz.js";let M=null,v={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[]},I=null,b={tab:"dashboard",period:"month",jobsFilter:"all"},m={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]};async function de(){initTheme(),M=requireAuth("superadmin"),M&&(await E(),O())}async function E(){const[t,s,e]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);v.personnel=t,v.clients=s,v.services=e}function U(){const t=v.personnel.find(a=>/mansi/i.test(a.name)),s=v.personnel.find(a=>/urna/i.test(a.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),s&&e.push({personId:s._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function te(t){const s=v.personnel.find(e=>e._id===t);return s?s.name:"—"}function F(t){const s=v.clients.find(e=>e._id===t);return s?s.name:"—"}const L=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"billing_dashboard",label:"Accounts Dashboard",icon:"💳"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Settings & Manage",icon:"⚙️"}];function O(){const t=document.getElementById("app"),s=L.find(e=>e.key===b.tab)||L[0];t.innerHTML=renderAppShell({user:M,currentRole:"superadmin",activeTab:b.tab,tabs:L,title:s.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(e=>{b.tab=e,O()}),f()}window.ci360NavTab=t=>{b.tab=t,O()};async function f(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(4);try{if(b.tab==="dashboard")await me(t);else if(b.tab==="dailytasks")await Ie(t);else if(b.tab==="proposals")await ce(t);else if(b.tab==="teambonding"||b.tab==="bonding")await pe(t);else if(b.tab==="logjob")q(t);else if(b.tab==="jobs")await he(t);else if(b.tab==="byclient")await ye(t);else if(b.tab==="byperson")await se(t);else if(b.tab==="accounts")await xe(t);else if(b.tab==="billing_dashboard"){window.location.href="/accounts";return}else b.tab==="targets"?await Se(t):b.tab==="salaries"?await $e(t):b.tab==="settings"||b.tab==="manage"?Ae(t):b.tab==="users"&&await ae(t)}catch(s){t.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(s.message)}</div>`}}}async function ce(t){t.innerHTML='<div id="proposals-module-root"></div>';const s=t.querySelector("#proposals-module-root");le(s)}async function pe(t){t.innerHTML='<div id="teambonding-module-root"></div>';const s=t.querySelector("#teambonding-module-root");re(s,{currentUser:M})}function J(){return renderPeriodPicker(b.period)}function V(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{b.period=t.dataset.period,f()}})}async function me(t){I=await apiGet("/dashboard/admin?period="+b.period);const s=I.overview;t.innerHTML=`
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
      ${I.insights.length?I.insights.map(e=>`<div class="insight ${e.type}">${escapeHtml(e.text)}</div>`).join(""):'<div class="empty">Log a few jobs to start seeing workload signals here.</div>'}
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${G(I.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${G(I.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${I.personnel.filter(e=>e.status!=="inactive").map(ue).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,V()}function G(t,s){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(a=>a[1]));return t.map(([a,n])=>`
    <div class="bar-row">
      <div>${escapeHtml(a)}</div>
      <div class="bar-track"><div class="bar-fill ${s?"gold":""}" style="width:${(n/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(n)}</div>
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
    </div>`}function q(t){(!m.assignments||m.assignments.every(e=>!e.personId))&&(m.assignments=U());const s=m.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0);t.innerHTML=`
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
                ${v.clients.map(e=>`<option value="${e._id}" ${e._id===m.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
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
                ${v.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${m.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${m.serviceIds.map(e=>{const a=v.services.find(n=>n._id===e);return a?`
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
  `}function ge(){const t=document.getElementById("jClient");t&&(t.onchange=d=>m.clientId=d.target.value);const s=document.getElementById("addNewClientBtn");s&&(s.onclick=()=>{const d=openModal(`
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
      `);d.querySelector("#mCancel").onclick=()=>d.remove(),d.querySelector("#mSave").onclick=async()=>{const h=d.querySelector("#newClientName").value.trim(),c=d.querySelector("#newClientNotes").value.trim();if(!h){flashToast("Client name is required",!0);return}try{const g=await apiPost("/clients",{name:h,notes:c});await E(),m.clientId=g._id,flashToast("Client added"),d.remove(),q(document.getElementById("content"))}catch(g){flashToast(g.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=d=>m.date=d.target.value);const a=document.getElementById("jCompletion");a&&(a.onchange=d=>m.completion=d.target.value);const n=document.getElementById("jService");n&&(n.onchange=d=>{const h=d.target.value;h&&(m.serviceIds.includes(h)||m.serviceIds.push(h),q(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(d=>{d.onclick=h=>{h.stopPropagation();const c=d.dataset.id;m.serviceIds=m.serviceIds.filter(g=>g!==c),q(document.getElementById("content"))}});const i=document.getElementById("addNewServiceBtn");i&&(i.onclick=()=>{const d=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);d.querySelector("#mCancel").onclick=()=>d.remove(),d.querySelector("#mSave").onclick=async()=>{const h=d.querySelector("#newServiceName").value.trim();if(!h){flashToast("Service name is required",!0);return}try{const c=await apiPost("/services",{name:h});await E(),m.serviceIds.includes(c._id)||m.serviceIds.push(c._id),flashToast("Service added"),d.remove(),q(document.getElementById("content"))}catch(c){flashToast(c.message,!0)}}});const r=document.getElementById("jDesc");r&&(r.oninput=d=>m.desc=d.target.value);const u=document.getElementById("jValue");u&&(u.oninput=d=>m.value=d.target.value),document.querySelectorAll(".person-assign-row").forEach(d=>{const h=Number(d.dataset.idx),c=d.querySelector(".a-person");c&&(c.onchange=p=>m.assignments[h].personId=p.target.value);const g=d.querySelector(".a-percent");g&&(g.oninput=p=>{m.assignments[h].percent=p.target.value,be()});const $=d.querySelector(".a-hours");$&&($.oninput=p=>m.assignments[h].hours=p.target.value);const o=d.querySelector(".a-remove");o&&(o.onclick=()=>{m.assignments.length>1&&(m.assignments.splice(h,1),q(document.getElementById("content")))})});const y=document.getElementById("addAssignRow");y&&(y.onclick=()=>{m.assignments.push({personId:"",percent:0,hours:""}),q(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:m.attachments||[]});const x=document.getElementById("clearJobBtn");x&&(x.onclick=()=>{m={title:"",assignments:U(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),q(document.getElementById("content"))});const S=document.getElementById("saveJobBtn");S&&(S.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!m.clientId){flashToast("Please select a client",!0);return}if(!m.serviceIds||!m.serviceIds.length){flashToast("Please select at least one service",!0);return}const d=m.assignments.filter(p=>p.personId);if(!d.length){flashToast("Please assign at least one person",!0);return}for(const p of d)if(p.hours===""||p.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const h=v.clients.find(p=>p._id===m.clientId),g=v.services.filter(p=>m.serviceIds.includes(p._id)).map(p=>p.name).join(", "),$=m.title||(h?`${h.name} — ${g||"Deliverable"}`:g||"Untitled Job"),o=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:$,clientId:m.clientId,serviceIds:m.serviceIds,date:m.date||new Date().toISOString().slice(0,10),completionDate:m.completion||null,value:Number(m.value)||0,description:m.desc||"",assignments:d,attachments:o}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),m={title:"",assignments:U(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},b.tab="jobs",f()}catch(d){flashToast(d.message,!0)}})}function be(){const t=m.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0),s=document.querySelector(".assign-total");s&&(s.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,s.classList.toggle("warn",t!==100))}async function he(t){let s=await apiGet("/jobs");s.sort((e,a)=>new Date(a.date)-new Date(e.date)),b.jobsFilter==="progress"&&(s=s.filter(e=>!e.completionDate)),b.jobsFilter==="done"&&(s=s.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <h2>All Jobs <span class="eyebrow">${s.length} shown</span></h2>
      <div style="margin-bottom:12px;display:flex;gap:6px;">
        <button class="pchip ${b.jobsFilter==="all"?"active":""}" data-jf="all">All</button>
        <button class="pchip ${b.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${b.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${s.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${s.map(e=>{const a=e.status==="Completed",n=(e.assignments||[]).map(u=>`${escapeHtml(te(u.personId))} (${u.percent}%)`).join(", "),i=(e.attachments||[]).length,r=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${i?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${i} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${i} Brief</span></button>`:""}
                  ${r?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${r} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${r} Work</span></button>`:""}
                  ${!i&&!r?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${a?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${a}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${a?"green":e.status==="Needs Revision"?"red":"amber"}">${a?"Completed":e.status==="Needs Revision"?"Needs Revision":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?'<span style="font-size:10px;font-weight:700;color:var(--red-500)">↺ Revision Req.</span>':""}
                </div>
              </td>
              <td>${escapeHtml(F(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(u=>`<span class="badge gray">${escapeHtml(u)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${n||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((u,y)=>u+(Number(y.hours)||0),0))}</td>
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
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{b.jobsFilter=e.dataset.jf,f()}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,n=s.find(y=>y._id===a);if(!n)return;const i=encodeURIComponent(JSON.stringify(n.attachments||[])),r=encodeURIComponent(JSON.stringify(n.deliverables||[])),u=openModal(`
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
      `);bindAttachmentUploader("mDelUpload"),u.querySelector("#mDelSaveBtn").onclick=async()=>{const y=getUploaderAttachments("mDelUpload"),x=u.querySelector("#mDelNote").value.trim();if(!y.length){flashToast("Please select at least one deliverable file",!0);return}try{const S=y.map(d=>({...d,notes:x}));await apiPost(`/jobs/${a}/deliverables`,{deliverables:S}),flashToast("Deliverables added! 📦"),u.remove(),f()}catch(S){flashToast(S.message,!0)}},u.querySelector("#mCloseFiles").onclick=()=>u.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,n=s.find(i=>i._id===a);n&&fe(n,()=>f())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const a=e.dataset.id,n=e.dataset.done==="false",i=s.find(u=>u._id===a);let r=i?i.completionDate:null;n&&!r&&(r=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+a,{status:n?"Completed":"In Progress",completionDate:r}),flashToast(n?"Job marked as Completed!":"Job marked as In Progress"),f()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),f())})}function fe(t,s){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(l=>l._id||l):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(l=>({personId:String(l.personId._id||l.personId),percent:l.percent!=null?l.percent:0,hours:l.hours!=null?l.hours:0})):U()};function a(){return e.serviceIds.length?e.serviceIds.map(l=>{const w=v.services.find(k=>String(k._id)===String(l));return w?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(w.name)}
          <span class="m-remove-service" data-id="${w._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function n(){return e.assignments.map((l,w)=>`
      <div class="m-person-assign-row" data-idx="${w}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${v.personnel.map(k=>`<option value="${k._id}" ${String(k._id)===String(l.personId)?"selected":""}>${escapeHtml(k.name)}${k.duties?` (${escapeHtml(k.duties)})`:""}</option>`).join("")}
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
  `),r=i.querySelector(".modal");r&&(r.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const u=()=>{const l=e.assignments.reduce((k,D)=>k+(Number(D.percent)||0),0),w=i.querySelector("#mAssignTotalInfo");w&&(w.innerHTML=l===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${l}% Allocated (should be 100%)</span>`)},y=()=>{i.querySelectorAll(".m-remove-service").forEach(l=>{l.onclick=()=>{const w=l.dataset.id;e.serviceIds=e.serviceIds.filter(k=>String(k)!==String(w)),i.querySelector("#mEditServicesTags").innerHTML=a(),y()}})},x=()=>{i.querySelectorAll(".m-person-assign-row").forEach(l=>{const w=Number(l.dataset.idx),k=l.querySelector(".m-a-person");k&&(k.onchange=N=>e.assignments[w].personId=N.target.value);const D=l.querySelector(".m-a-percent");D&&(D.oninput=N=>{e.assignments[w].percent=N.target.value,u()});const _=l.querySelector(".m-a-hours");_&&(_.oninput=N=>e.assignments[w].hours=N.target.value);const z=l.querySelector(".m-a-remove");z&&(z.onclick=()=>{e.assignments.length>1?(e.assignments.splice(w,1),i.querySelector("#mEditAssignRows").innerHTML=n(),x(),u()):flashToast("Job must have at least one team member row",!0)})})},S=i.querySelector("#mCloseJobEdit"),d=i.querySelector("#mEditCancel");S&&(S.onclick=()=>i.remove()),d&&(d.onclick=()=>i.remove());const h=i.querySelector("#mEditTitle");h&&(h.oninput=l=>e.title=l.target.value);const c=i.querySelector("#mEditClient");c&&(c.onchange=l=>e.clientId=l.target.value);const g=i.querySelector("#mEditStatus");g&&(g.onchange=l=>e.status=l.target.value);const $=i.querySelector("#mEditDate");$&&($.onchange=l=>e.date=l.target.value);const o=i.querySelector("#mEditCompletionDate");o&&(o.onchange=l=>e.completionDate=l.target.value);const p=i.querySelector("#mEditPriority");p&&(p.onchange=l=>e.priority=l.target.value);const T=i.querySelector("#mEditValue");T&&(T.oninput=l=>e.value=l.target.value);const C=i.querySelector("#mEditDesc");C&&(C.oninput=l=>e.description=l.target.value);const H=i.querySelector("#mEditServiceSelect");H&&(H.onchange=l=>{const w=l.target.value;w&&!e.serviceIds.map(String).includes(String(w))&&(e.serviceIds.push(w),i.querySelector("#mEditServicesTags").innerHTML=a(),y()),H.value=""}),y(),x(),u();const j=i.querySelector("#mAddAssignRow");j&&(j.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),i.querySelector("#mEditAssignRows").innerHTML=n(),x(),u()});const P=i.querySelector("#mEditSave");P&&(P.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const l=e.assignments.filter(A=>A.personId&&String(A.personId).trim()!=="");if(!l.length){flashToast("Please select at least one assigned team member",!0);return}for(const A of l)if(A.hours===""||A.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const w=v.clients.find(A=>String(A._id)===String(e.clientId)),D=v.services.filter(A=>e.serviceIds.map(String).includes(String(A._id))).map(A=>A.name).join(", "),_=e.title||(w?`${w.name} — ${D||"Deliverable"}`:D||"Untitled Job"),z=getUploaderAttachments("mEditAttachments"),N=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:_,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:l,attachments:z,deliverables:N});const Te=l.map(A=>te(A.personId)).join(", ");flashToast("Job updated & saved! 📁"),i.remove(),s&&s()}catch(l){flashToast(l.message,!0)}finally{P.disabled=!1,P.textContent="Save & Update Assignments"}})}async function ye(t){I=await apiGet("/dashboard/admin?period="+b.period),t.innerHTML=`${J()}
    <section class="block"><h2>By Client</h2>
      <div class="grid grid-3">
        ${I.clients.map(s=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(s.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${s.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${s.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,V()}async function se(t){I=await apiGet("/dashboard/admin?period="+b.period),t.innerHTML=`${J()}
    <section class="block"><h2>By Person</h2>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Person</th><th>Duties</th><th>Status</th><th class="num">Hours</th><th class="num">Utilization</th><th class="num">Jobs</th><th class="num" style="padding-right:22px">Work Credit</th></tr></thead>
          <tbody>${I.personnel.map(s=>{const e=(s.status||"active").toLowerCase(),a=s.personId||s._id;return`<tr>
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
    </section>`,V(),document.querySelectorAll(".person-status-sel").forEach(s=>{s.onchange=async e=>{const a=s.dataset.id,n=e.target.value;try{await apiPut("/personnel/"+a,{status:n}),await E(),flashToast("Status updated to "+n),se(t)}catch(i){flashToast(i.message,!0)}}})}const B=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function xe(t){const s=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <h2>Accounts <span class="eyebrow">${s.length} accounts</span></h2>
      <div class="banner">Who owns which function on each account — separate from the job/hours log.</div>
      <div style="margin-bottom:14px;display:flex;gap:8px;"><button class="btn gold small" id="addAccountBtn">+ Add Account</button></div>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${B.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${s.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(F(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${B.map(a=>`<td>${escapeHtml(e.roles[a[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>W(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>W(s.find(a=>a._id===e.dataset.id)))}function W(t){const s=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};B.forEach(n=>{e.roles[n[0]]==null&&(e.roles[n[0]]="")});const a=openModal(`
    <h3>${s?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${s?`<select id="rClient"><option value="">Select…</option>${v.clients.map(n=>`<option value="${n._id}">${escapeHtml(n.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(F(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${B.slice(0,5).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">${B.slice(5,10).map(n=>`<div class="field"><label>${n[1]}</label><input type="text" class="r-role" data-key="${n[0]}" value="${escapeHtml(e.roles[n[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${s?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);a.querySelector("#mCancel").onclick=()=>a.remove(),s||(a.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),a.remove(),f())}),a.querySelector("#mSave").onclick=async()=>{const n={};a.querySelectorAll(".r-role").forEach(r=>n[r.dataset.key]=r.value.trim());const i={nature:a.querySelector("#rNature").value,roles:n,difficulty:Number(a.querySelector("#rDifficulty").value)||1,comments:a.querySelector("#rComments").value.trim()};try{if(s){const r=a.querySelector("#rClient").value;if(!r){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:r},i))}else await apiPut("/roster/"+e._id,i);a.remove(),f()}catch(r){flashToast(r.message,!0)}}}function we(t){if(!t)return"Deliverables";const s={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return s[t]?s[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function Se(t){const s=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
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
              ${s.map(a=>{var g,$;const n=((g=a.personId)==null?void 0:g.name)||"—",i=(($=a.serviceId)==null?void 0:$.name)||"—",r=we(a.unit),u=e[a.period]||(a.period?a.period.toUpperCase():"Daily"),y=a.actual||0,x=a.quantity>0?y/a.quantity:0,S=Math.round(x*100),d=x>=1?"green":x>=.6?"amber":"red",h=x>=1?"✓ Met":x>=.6?"Behind":"Off Pace",c=Math.min(S,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(n)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(i)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${a.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(r)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${u}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${y} / ${a.quantity} <span style="font-weight:500;color:var(--text-3)">(${S}%)</span></span>
                        <span class="badge ${d}" style="font-size:10px;padding:1px 5px">${h}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${c}%;height:100%;background:var(--${d==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
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
  `,document.getElementById("addAdminTargetBtn").onclick=()=>Q(null),document.querySelectorAll(".edit-target").forEach(a=>{a.onclick=()=>Q(s.find(n=>n._id===a.dataset.id))}),document.querySelectorAll(".del-target").forEach(a=>{a.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+a.dataset.id),flashToast("Target removed"),f()}catch(n){flashToast(n.message,!0)}}})}function Q(t){var S,d,h,c;const s=!t;t=t||{personId:(S=v.personnel[0])==null?void 0:S._id,serviceId:(d=v.services[0])==null?void 0:d._id,quantity:5,unit:"reels",period:"day"};const e=((h=t.personId)==null?void 0:h._id)||t.personId||"",a=((c=t.serviceId)==null?void 0:c._id)||t.serviceId||"",i=["reels","stories","posts","count","hours"].includes(t.unit),r=openModal(`
    <h3>${s?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${v.personnel.map(g=>`<option value="${g._id}" ${String(g._id)===String(e)?"selected":""}>${escapeHtml(g.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${v.services.map(g=>`<option value="${g._id}" ${String(g._id)===String(a)?"selected":""}>${escapeHtml(g.name)}</option>`).join("")}
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
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const u=r.querySelector("#mTgtUnit"),y=r.querySelector("#mTgtCustomUnitWrap"),x=r.querySelector("#mTgtCustomUnit");u.onchange=()=>{u.value==="custom"?(y.style.display="flex",x.focus()):y.style.display="none"},r.querySelector("#mCancel").onclick=()=>r.remove(),r.querySelector("#mSave").onclick=async()=>{let g=u.value;g==="custom"&&(g=x.value.trim()||"Deliverables");const $=getUploaderAttachments("mTgtAttachments"),o={personId:r.querySelector("#mTgtPerson").value,serviceId:r.querySelector("#mTgtService").value,quantity:Number(r.querySelector("#mTgtQty").value)||1,unit:g,period:r.querySelector("#mTgtPeriod").value,attachments:$};if(!o.personId||!o.serviceId){flashToast("Person and Service are required",!0);return}try{s?await apiPost("/targets",o):await apiPut("/targets/"+t._id,o),flashToast("Target saved successfully! 🎯"),r.remove(),f()}catch(p){flashToast(p.message,!0)}}}async function $e(t){const[s,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);v.salaryGrades=s,v.salaryAssignments=e;const a={};e.forEach(n=>a[n.personId]=n.gradeId),t.innerHTML=`
    <section class="block">
      <h2>Salary Grades <span class="eyebrow">Admin only</span></h2>
      <div class="banner">No individual's exact salary is ever entered — each person is placed in a grade band, and only the grade label appears anywhere else in the tool.</div>
      <div class="manage-list">${s.map(n=>`<div class="manage-item"><div><strong>${escapeHtml(n.label)}</strong><div class="muted">${fmtINR(n.min)} – ${fmtINR(n.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${n._id}">Edit</button><button class="btn danger small del-grade" data-id="${n._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${v.personnel.map(n=>`<tr><td><strong>${escapeHtml(n.name)}</strong><div class="muted">${escapeHtml(n.duties||"")}</div></td>
        <td><span class="badge green">${n.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${n._id}"><option value="">Not set</option>${s.map(i=>`<option value="${i._id}" ${a[n._id]===i._id?"selected":""}>${escapeHtml(i.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>Y(null),document.querySelectorAll(".edit-grade").forEach(n=>n.onclick=()=>Y(s.find(i=>i._id===n.dataset.id))),document.querySelectorAll(".del-grade").forEach(n=>n.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+n.dataset.id),f())}),document.querySelectorAll(".grade-select").forEach(n=>{n.onchange=async()=>{await apiPut("/salary/assignments/"+n.dataset.id,{gradeId:n.value||null}),flashToast("Saved")}})}function Y(t){const s=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${s?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!a.label){flashToast("Label required",!0);return}try{s?await apiPost("/salary/grades",a):await apiPut("/salary/grades/"+t._id,a),e.remove(),f()}catch(n){flashToast(n.message,!0)}}}function ke(t){const s={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
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
              ${v.personnel.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td>${escapeHtml(i.duties||"—")}</td>
                  <td class="num"><strong>${i.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${s[i.status]||"green"}">${escapeHtml(i.status||"active")}</span></td>
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
              ${v.clients.map(i=>`
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
              ${v.services.map(i=>`
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
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>X(null)),document.querySelectorAll(".edit-person").forEach(i=>i.onclick=()=>X(v.personnel.find(r=>r._id===i.dataset.id))),document.querySelectorAll(".del-person").forEach(i=>i.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+i.dataset.id),await E(),f())});const a=document.getElementById("addClientBtn");a&&(a.onclick=()=>Z(null)),document.querySelectorAll(".edit-client").forEach(i=>i.onclick=()=>Z(v.clients.find(r=>r._id===i.dataset.id))),document.querySelectorAll(".del-client").forEach(i=>i.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+i.dataset.id),await E(),f())});const n=document.getElementById("addServiceBtn");n&&(n.onclick=()=>K(null)),document.querySelectorAll(".edit-service").forEach(i=>i.onclick=()=>K(v.services.find(r=>r._id===i.dataset.id))),document.querySelectorAll(".del-service").forEach(i=>i.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+i.dataset.id),await E(),f())}),ne(t)}const Ae=ke;function X(t){const s=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
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
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mPersonFiles"),n={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:a};if(!n.name){flashToast("Name is required",!0);return}try{s?await apiPost("/personnel",n):await apiPut("/personnel/"+t._id,n),await E(),flashToast("Person saved! 📁"),e.remove(),f()}catch(i){flashToast(i.message,!0)}}}function Z(t){const s=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mClientFiles"),n={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:a};if(!n.name){flashToast("Name is required",!0);return}try{s?await apiPost("/clients",n):await apiPut("/clients/"+t._id,n),await E(),flashToast("Client saved! 📁"),e.remove(),f()}catch(i){flashToast(i.message,!0)}}}function K(t){const s=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!a.name){flashToast("Name is required",!0);return}try{s?await apiPost("/services",a):await apiPut("/services/"+t._id,a),await E(),e.remove(),f()}catch(n){flashToast(n.message,!0)}}}async function ae(t){const s=await apiGet("/users");let e="all",a="role",n="";function i(){let c=[...s];if(n){const o=n.toLowerCase();c=c.filter(p=>p.name&&p.name.toLowerCase().includes(o)||p.email&&p.email.toLowerCase().includes(o)||p.role&&p.role.toLowerCase().includes(o))}e==="admin"?c=c.filter(o=>o.role==="superadmin"||o.role==="admin"):e==="accounts"?c=c.filter(o=>o.role==="accounts"):e==="employee"?c=c.filter(o=>o.role==="employee"):e==="client"&&(c=c.filter(o=>o.role==="client"));const g={superadmin:1,admin:1,accounts:2,employee:3,client:4};a==="role"?c.sort((o,p)=>{const T=g[o.role]||9,C=g[p.role]||9;return T!==C?T-C:(o.name||"").localeCompare(p.name||"")}):a==="role-desc"?c.sort((o,p)=>{const T=g[o.role]||9,C=g[p.role]||9;return T!==C?C-T:(o.name||"").localeCompare(p.name||"")}):a==="name-asc"?c.sort((o,p)=>(o.name||"").localeCompare(p.name||"")):a==="name-desc"?c.sort((o,p)=>(p.name||"").localeCompare(o.name||"")):a==="status"&&c.sort((o,p)=>(p.active?1:0)-(o.active?1:0));const $=t.querySelector("#userTableBody");if($){if(c.length===0){$.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}$.innerHTML=c.map(o=>{const p=o.role==="superadmin",T=o.role==="admin",C=o.role==="accounts",H=o.role==="employee",j=p?'<span class="badge gold" style="font-weight:700">👑 Superadmin</span>':T?'<span class="badge gold" style="font-weight:700">🛡️ Admin</span>':C?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':H?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',P=o.personnelId?escapeHtml(o.personnelId.name):o.clientId?escapeHtml(o.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(o.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(o.email)}</span></td>
          <td>${j}</td>
          <td>${P}</td>
          <td><span class="badge ${o.active?"green":"gray"}">${o.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small edit-user" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),$.querySelectorAll(".edit-user").forEach(o=>o.onclick=()=>ee(s.find(p=>p._id===o.dataset.id))),$.querySelectorAll(".del-user").forEach(o=>o.onclick=async()=>{if(confirm("Permanently remove this user account?"))try{await apiDelete("/users/"+o.dataset.id),flashToast("User removed"),ae(t)}catch(p){flashToast(p.message,!0)}})}}const r=s.filter(c=>c.role==="superadmin"||c.role==="admin").length,u=s.filter(c=>c.role==="accounts").length,y=s.filter(c=>c.role==="employee").length,x=s.filter(c=>c.role==="client").length;t.innerHTML=`
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
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${u})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${y})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${x})</button>
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
    </section>`,i(),t.querySelectorAll(".user-role-filter").forEach(c=>{c.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(g=>g.classList.remove("active")),c.classList.add("active"),e=c.dataset.role,i()}});const S=t.querySelector("#userSortSel");S&&(S.onchange=()=>{a=S.value,i()});const d=t.querySelector("#userSearchInp");d&&(d.oninput=()=>{n=d.value.trim(),i()});const h=t.querySelector("#addUserBtn");h&&(h.onclick=()=>ee(null))}function ee(t){const s=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,a=openModal(`<h3>${s?"Add":"Edit"} User</h3>
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
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function n(){const i=a.querySelector("#uRole").value,r=a.querySelector("#uLinkWrap");i==="employee"?r.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${v.personnel.map(u=>`<option value="${u._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:i==="client"?r.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${v.clients.map(u=>`<option value="${u._id}" ${t.clientId&&(t.clientId._id||t.clientId)===u._id?"selected":""}>${escapeHtml(u.name)}</option>`).join("")}</select>`:r.innerHTML=""}a.querySelector("#uRole").onchange=n,n(),a.querySelector("#mCancel").onclick=()=>a.remove(),a.querySelector("#mSave").onclick=async()=>{var y,x;const i=a.querySelector("#uRole").value,r={name:a.querySelector("#uName").value.trim(),email:a.querySelector("#uEmail").value.trim(),role:i,active:a.querySelector("#uActive").checked,personnelId:i==="employee"&&((y=a.querySelector("#uPersonnel"))==null?void 0:y.value)||null,clientId:i==="client"&&((x=a.querySelector("#uClient"))==null?void 0:x.value)||null},u=a.querySelector("#uPassword").value;if(u&&(r.password=u),!r.name||!r.email){flashToast("Name and email required",!0);return}if(s&&!u){flashToast("Password required for a new user",!0);return}try{s?await apiPost("/users",r):await apiPut("/users/"+t._id,r),a.remove(),f()}catch(S){flashToast(S.message,!0)}}}let R={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};async function Ie(t){oe(t,{userRole:"superadmin",currentUser:M})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),f()}catch(s){flashToast(s.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(n=>n._id===t);if(!e)return;const a=prompt("Edit task title:",e.title);a!==null&&a.trim()&&(await apiPut("/tasks/"+t,{title:a.trim()}),flashToast("Task updated"),f())}catch(s){flashToast(s.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const s=prompt("Enter task for this employee:");if(!(!s||!s.trim()))try{const e=new Date,a=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,n=R.date==="all"?a:R.date;await apiPost("/tasks",{title:s.trim(),personnelId:t,dueDate:n,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),f()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),f()}catch(s){flashToast(s.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const s={date:R.date};t&&t!=="all"?s.personnelId=t:R.personnelId&&R.personnelId;const e=await apiPost("/tasks/clear-completed",s);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),f()}catch(s){flashToast(s.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,s=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!s&&!e&&b.tab!=="logjob"&&f()});de();
