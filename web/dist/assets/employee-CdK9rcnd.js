import{l as q,m as U}from"./api-mtZedK4O.js";import{initProposalStudio as R}from"./proposals-siWpsDg9.js";import{i as O,a as B}from"./teambonding-BAqAVLbl.js";let s=null,S={personnel:[],clients:[],services:[]},l={tab:"dashboard",period:"month"};async function N(){if(initTheme(),s=requireAuth("employee"),!s)return;const[e,a,i]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);S.personnel=e,S.clients=a,S.services=i,A()}function M(e){const a=S.clients.find(i=>i._id===e);return a?a.name:"—"}function F(){return s&&(/mansi/i.test(s.name)||/urna/i.test(s.name))}function L(){const e=s&&(s.role==="accounts"||s.role==="superadmin"||/ekta/i.test(s.name)||/ekta/i.test(s.email)),a=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"myjobs",label:"My Jobs",icon:"📋"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"targets",label:"My Targets",icon:"🎯"},{key:"settings",label:"Settings",icon:"⚙️"}];return e&&a.push({key:"accounts_redirect",label:"Accounts Dashboard 💰",icon:"💳"}),a}function A(){const e=document.getElementById("app"),a=L(),i=a.find(t=>t.key===l.tab)||a[0];e.innerHTML=renderAppShell({user:s,currentRole:"employee",activeTab:l.tab,tabs:a,title:i.label,subtitle:F()?"Lead Workspace · Mansi & Urna Management":"Employee Workspace & Productivity Dashboard"}),bindAppShellEvents(t=>{if(t==="accounts_redirect"){window.location.href="/accounts";return}l.tab=t,A()}),b()}window.ci360NavTab=(e,a=null)=>{if(e==="accounts_redirect"){window.location.href="/accounts";return}e==="jobs"||e==="myjobs"?e="myjobs":e==="tasks"||e==="mytasks"||e==="dailytasks"?e="dailytasks":e==="target"||e==="targets"?e="targets":e==="proposal"||e==="proposals"?e="proposals":e==="teambonding"||e==="bonding"||e==="arcade"||e==="chat"?e="teambonding":(e==="dashboard"||e==="overview")&&(e="dashboard"),l.tab=e,a&&(l.highlightId=a),A()};async function b(){const e=document.getElementById("content");if(e){e.innerHTML=renderSkeletonCards(3);try{l.tab==="dashboard"?await I(e):l.tab==="myjobs"||l.tab==="jobs"?await K(e):l.tab==="dailytasks"||l.tab==="mytasks"||l.tab==="tasks"?await ae(e):l.tab==="proposals"||l.tab==="proposal"?await W(e):l.tab==="teambonding"||l.tab==="bonding"?await Q(e):l.tab==="targets"||l.tab==="target"?await ie(e):l.tab==="settings"?await G(e):(l.tab="dashboard",await I(e))}catch(a){e.innerHTML=renderEmptyState("Something went wrong",a.message,"⚠️")}}}async function W(e){e.innerHTML='<div id="proposals-module-root"></div>';const a=e.querySelector("#proposals-module-root");R(a,{userRole:"employee",currentUser:s})}async function Q(e){e.innerHTML='<div id="teambonding-module-root"></div>';const a=e.querySelector("#teambonding-module-root");B(a,{currentUser:s})}async function G(e){e.innerHTML=`
    <div style="padding:8px 0 24px 0;">
      ${q({title:"Employee Account & Security",subtitle:"Manage your personal login email, display name, and password"})}
    </div>
  `,U(e)}function V(){return renderPeriodPicker(l.period)}function Y(){document.querySelectorAll("[data-period]").forEach(e=>{e.onclick=()=>{l.period=e.dataset.period,b()}})}async function I(e){const[a,i,t]=await Promise.all([apiGet("/dashboard/employee?period="+l.period).catch(()=>({stats:{},person:{},recentJobs:[],accounts:[]})),apiGet("/jobs?mine=true").catch(()=>[]),apiGet("/tasks").catch(()=>[])]),n=a.person||{},d=n.name||(s==null?void 0:s.name)||"Team Member",p=n.duties||"Creative Specialist",c=Number(n.capacity)||48,v=a.stats||{hours:0,revenue:0,utilization:0,label:"Optimal",badge:"green"},g=i||[],r=g.filter(o=>o.status==="Completed"||o.clientApproval&&o.clientApproval.status==="Approved"||o.completionDate),m=g.filter(o=>!o.completionDate&&o.status!=="Completed"&&(!o.clientApproval||o.clientApproval.status!=="Approved")),y=g.filter(o=>o.clientApproval&&o.clientApproval.status==="Revision Requested"),h=m.filter(o=>o.priority==="Urgent");m.filter(o=>o.priority==="High");const f=new Date().toISOString().slice(0,10),u=(t||[]).filter(o=>o.date?o.date.slice(0,10)===f:!0),w=u.filter(o=>o.status==="Completed"),k=u.filter(o=>o.status!=="Completed"),$=u.length>0?Math.round(w.length/u.length*100):100,x=a.accounts||[];e.innerHTML=`
    <div class="block employee-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Employee Profile Hero Card -->
      <div class="card employee-hero-card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.05) 50%, rgba(16,185,129,0.05) 100%);border:1px solid rgba(99,102,241,0.22);border-radius:var(--r-xl);padding:24px 28px;margin-bottom:24px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
          
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:56px;height:56px;border-radius:var(--r-lg);background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(79,70,229,0.4);flex-shrink:0">
              ${d.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(d)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(p)}</span>
                <span class="badge ${v.badge||"green"}" style="font-size:11px;font-weight:700">● ${escapeHtml(v.label||"Optimal Pace")}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Personal Workspace &amp; Performance Radar · Standard Capacity: <strong>${c}h / week</strong>
              </p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn primary" id="btnEmpQuickJobs" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md)">
              <span>📋</span> My Jobs (${g.length})
            </button>
            <button class="btn secondary" id="btnEmpQuickTasks" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;padding:9px 16px;border-radius:var(--r-md)">
              <span>📅</span> Daily Planner
            </button>
            <button class="btn gold" id="btnEmpQuickProposals" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 16px;border-radius:var(--r-md)">
              <span>📜</span> Proposal Studio
            </button>
          </div>

        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-top:22px;padding-top:18px;border-top:1px solid var(--border-xs)">
          <div style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4)">
            Period Performance Scope
          </div>
          <div id="empOverviewPeriodWrapper">
            ${renderPeriodPicker(l.period)}
          </div>
        </div>
      </div>

      <!-- Action Banner: Urgent / Revision Alerts -->
      ${h.length>0||y.length>0?`
        <div class="card" style="background:linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.06) 100%);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <span style="font-size:24px">⚡</span>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                High Priority Focus Items
              </div>
              <div style="font-size:13px;color:var(--text-2);display:flex;gap:12px;flex-wrap:wrap">
                ${h.length>0?`<span style="color:var(--red);font-weight:700">🔴 ${h.length} Urgent Job(s)</span>`:""}
                ${y.length>0?`<span style="color:var(--amber-500);font-weight:700">↺ ${y.length} Revision Request(s)</span>`:""}
              </div>
            </div>
          </div>
          <button class="btn ghost small" onclick="ci360NavTab('myjobs')" style="font-weight:700">
            Open Queue →
          </button>
        </div>
      `:""}

      <!-- 4 KPI Summary Cards -->
      <section class="block block-kpi-grid" style="margin-bottom:24px">
        <div class="grid grid-4" style="gap:16px">

          <div class="card kpi" style="border-top:3px solid var(--brand-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Capacity Utilization</div>
              <div style="font-size:20px">📈</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${Number(v.utilization||0).toFixed(0)}%</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${Number(v.hours||0).toFixed(1)} hrs tracked this period</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active Workload</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${m.length}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${r.length} completed deliverables</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Today's Task Progress</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${w.length} <span style="font-size:18px;font-weight:600;color:var(--text-4)">/ ${u.length}</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${$}% of today's checklist completed</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Value Output Tracked</div>
              <div style="font-size:20px">💰</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${fmtINR(v.revenue||0)}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">Revenue deliverable contribution</div>
          </div>

        </div>
      </section>

      <!-- 2-Column: Today's Tasks & Assigned Accounts -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:20px;margin-bottom:24px">
        
        <!-- Today's Tasks Card -->
        <div class="card" style="padding:22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <div>
              <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Today's Task Checklist</h3>
              <p style="font-size:12px;color:var(--text-3);margin:0">${k.length} pending · ${w.length} done</p>
            </div>
            <button class="btn secondary small" onclick="ci360NavTab('dailytasks')" style="font-size:12px">
              Open Checklist →
            </button>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom:16px">
            <div style="width:100%;height:8px;background:var(--border-sm);border-radius:8px;overflow:hidden">
              <div style="width:${$}%;height:100%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:8px;transition:width 0.4s ease"></div>
            </div>
          </div>

          ${u.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${u.slice(0,5).map(o=>{const T=o.status==="Completed";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <span style="font-size:16px">${T?"✅":"⚪"}</span>
                      <span style="font-size:13px;font-weight:600;color:${T?"var(--text-4)":"var(--text-1)"};${T?"text-decoration:line-through":""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                        ${escapeHtml(o.title||"Task")}
                      </span>
                    </div>
                    <span class="badge ${o.priority==="Urgent"?"red":o.priority==="High"?"amber":"gray"}" style="font-size:10.5px">
                      ${escapeHtml(o.priority||"Normal")}
                    </span>
                  </div>
                `}).join("")}
            </div>
          `:`
            <div class="empty" style="padding:24px 10px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">✨</div>
              <div style="font-size:13.5px;font-weight:700;color:var(--text-2)">No tasks logged for today</div>
              <p style="font-size:12px;color:var(--text-4);margin:4px 0 12px 0">Plan your day and log your milestones.</p>
              <button class="btn secondary small" onclick="ci360NavTab('dailytasks')">➕ Add Today's Tasks</button>
            </div>
          `}
        </div>

        <!-- Assigned Client Accounts Card -->
        <div class="card" style="padding:22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <div>
              <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Assigned Client Accounts</h3>
              <p style="font-size:12px;color:var(--text-3);margin:0">${x.length} active client accounts on roster</p>
            </div>
            <span class="badge gold" style="font-weight:700">${x.length} Accounts</span>
          </div>

          ${x.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${x.slice(0,5).map(o=>{const D=(S.clients.find(z=>String(z._id)===String(o.clientId))||{}).name||"Client Account";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0">
                        ${D.slice(0,2).toUpperCase()}
                      </div>
                      <div style="min-width:0">
                        <div style="font-size:13.5px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(D)}</div>
                        <div style="font-size:11px;color:var(--text-4)">${escapeHtml(o.nature||"Retainer")} · ${escapeHtml(o.difficulty||"Normal")}</div>
                      </div>
                    </div>
                    <span class="badge blue" style="font-size:11px;font-weight:600">Active</span>
                  </div>
                `}).join("")}
            </div>
          `:`
            <div class="empty" style="padding:24px 10px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">🏢</div>
              <div style="font-size:13.5px;font-weight:700;color:var(--text-2)">No dedicated roster accounts</div>
              <p style="font-size:12px;color:var(--text-4);margin:4px 0 0 0">Jobs assigned across studio accounts.</p>
            </div>
          `}
        </div>

      </div>

      <!-- Recent Assigned Jobs Table -->
      <div class="card table-card" style="padding:0;overflow:hidden;margin-bottom:24px">
        <div style="padding:18px 24px;border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Assigned Production Jobs</h3>
            <p style="font-size:12.5px;color:var(--text-3);margin:0">Recent deliverables assigned to your workflow</p>
          </div>
          <button class="btn secondary small" onclick="ci360NavTab('myjobs')" style="font-weight:700">
            View All Jobs (${g.length}) →
          </button>
        </div>

        ${g.length>0?`
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:24px">Job Title</th>
                  <th>Client</th>
                  <th>Priority</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${g.slice(0,6).map(o=>{var _;const T=o.status==="Completed"||o.clientApproval&&o.clientApproval.status==="Approved"||o.completionDate,D=o.clientApproval&&o.clientApproval.status==="Revision Requested",z=((_=o.clientId)==null?void 0:_.name)||M(o.clientId)||"Client",J=o.priority==="Urgent"?"red":o.priority==="High"?"amber":"gray";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('myjobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(o.title||"Untitled Job")}
                      </td>
                      <td>
                        <span class="badge blue" style="font-size:11px">${escapeHtml(z)}</span>
                      </td>
                      <td>
                        <span class="badge ${J}" style="font-size:11px;font-weight:700">${escapeHtml(o.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(o.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${o.completionDate?fmtDate(o.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${T?"green":D?"red":"amber"}" style="font-weight:700">
                          ${T?"✓ Completed":D?"↺ Revision":"⏳ In Progress"}
                        </span>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty" style="padding:36px 20px">
            <div style="font-size:32px;margin-bottom:10px">📋</div>
            <h4 style="margin:0 0 6px 0;font-size:16px;font-weight:800;color:var(--text-1)">No Jobs Assigned Yet</h4>
            <p style="font-size:13px;color:var(--text-3);margin:0">Admins will assign jobs to your workflow.</p>
          </div>
        `}
      </div>

    </div>
  `;const C=document.getElementById("btnEmpQuickJobs");C&&(C.onclick=()=>{l.tab="myjobs",A()});const P=document.getElementById("btnEmpQuickTasks");P&&(P.onclick=()=>{l.tab="dailytasks",A()});const E=document.getElementById("btnEmpQuickProposals");E&&(E.onclick=()=>{l.tab="proposals",A()}),document.querySelectorAll("#empOverviewPeriodWrapper [data-period]").forEach(o=>{o.onclick=()=>{l.period=o.dataset.period,b()}})}async function K(e){const a=await apiGet("/jobs?mine=true"),i={Medium:"gray",High:"amber",Urgent:"red"};if(a.length===0){e.innerHTML=`
      <div class="block">
        <h2>My Jobs <span class="eyebrow">No assigned jobs yet</span></h2>
        ${renderEmptyState("No jobs assigned yet","Jobs assigned to you by admins will appear here.","📋")}
      </div>`;return}if(e.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h2 style="margin:0">My Jobs <span class="eyebrow">${a.length} total</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--text-3)">Click the date or 💾 to save completion date</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${a.map(t=>{var y,h,f,u,w,k,$;const n=(t.assignments||[]).find(x=>String(x.personId)===String(s.personnelId._id||s.personnelId)),d=String(t.createdBy)===String(s._id),p=t.status==="Denied"||t.clientApproval&&t.clientApproval.status==="Denied",c=t.status==="Completed"&&!p,v=t.clientApproval&&t.clientApproval.status==="Approved"&&!p,g=t.clientApproval&&t.clientApproval.status==="Revision Requested"&&!p,r=t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",m=i[t.priority||"Medium"]||"gray";return`
          <div class="job-card" id="job-card-${t._id}" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${p?"var(--red-500)":v?"var(--green-500)":g?"var(--amber-500)":c?"var(--green-500)":"var(--brand-500)"}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(t.title||"Untitled Job")}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${p?"red":c?"green":"amber"}">${p?"❌ Denied by Client":c?"✓ Completed":"⏳ In Progress"}</span>
                  ${v?`<span class="badge green">✓ Client Approved ${t.clientApproval.rating?`(${t.clientApproval.rating}★)`:""}</span>`:""}
                  ${g?'<span class="badge red">↺ Revision Requested</span>':""}
                  <span class="badge ${m}">${escapeHtml(t.priority||"Medium")}</span>
                  ${(t.serviceNames||[]).map(x=>`<span class="badge gray">${escapeHtml(x)}</span>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                <!-- Toggle Status -->
                <button type="button" class="btn ${c?"secondary":"primary"} small"
                        onclick="toggleStatus('${t._id}', ${!c})"
                        style="font-size:12px">
                  ${c?"↩ Reopen":"✓ Mark Done"}
                </button>
                ${d?`<button type="button" class="btn danger small" onclick="delJob('${t._id}')">Delete</button>`:""}
              </div>
            </div>

            <!-- Denied Alert Box for Employee -->
            ${p?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>❌</span> Job Denied by Client (${escapeHtml(((y=t.clientApproval)==null?void 0:y.deniedBy)||"Client")})
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(((h=t.clientApproval)==null?void 0:h.deniedAt)||t.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;border-left:3px solid var(--red-500);line-height:1.4">
                  <strong style="color:var(--red-500);font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Reason for Denial:</strong>
                  "${escapeHtml(((f=t.clientApproval)==null?void 0:f.deniedReason)||((u=t.clientApproval)==null?void 0:u.feedback)||"Job denied")}"
                </div>
              </div>
            `:""}

            <!-- Revision Requested Alert Box for Employee -->
            ${g?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(((w=(t.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:w.requestedAt)||t.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(t.clientApproval.feedback||"Revision requested")}"
                </div>
                ${($=(k=(t.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:k.attachments)!=null&&$.length?`
                  <div style="margin-top:8px">
                    ${renderAttachmentChips(t.clientApproval.revisions.slice(-1)[0].attachments,{title:"Client Reference Markups"})}
                  </div>
                `:""}
              </div>
            `:""}

            <!-- Details grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:14px">
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Client</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(M(t.clientId))}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Start Date</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${fmtDate(t.date)}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Target End Date (Admin / Client)</div>
                <div style="font-size:13px;font-weight:700;color:${t.completionDate?"var(--brand-600)":"var(--text-4)"}">
                  ${t.completionDate?`📅 ${fmtDate(t.completionDate)}`:"— Not Specified —"}
                </div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Your Logged Hours</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${n?fmtHours(n.hours):"0 hrs"}</div>
              </div>
              ${t.description?`
              <div style="grid-column:1 / -1">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Description</div>
                <div style="font-size:12.5px;color:var(--text-2);line-height:1.5">${escapeHtml(t.description)}</div>
              </div>`:""}
            </div>

            <!-- Brief Attachments & Deliverables Section -->
            ${t.attachments&&t.attachments.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(t.attachments))}">
                ${renderAttachmentChips(t.attachments,{title:"Job Brief & Reference Files"})}
              </div>
            `:""}

            ${t.deliverables&&t.deliverables.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(t.deliverables))}">
                ${renderAttachmentChips(t.deliverables,{title:"Finished Deliverables & Completed Artifacts"})}
              </div>
            `:""}

            <!-- Deliverable Uploader for Employee -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-size:12.5px;font-weight:700;color:var(--text-1)">📦 Submit Finished Deliverable / Work Artifact</span>
                <button type="button" class="btn ghost small emp-del-toggle" data-id="${t._id}" style="padding:2px 8px;font-size:11px">+ Add Deliverables</button>
              </div>
              <div class="emp-del-form" id="empDelForm-${t._id}" style="display:none;margin-top:10px">
                <div class="field" style="margin-bottom:8px">
                  <label style="font-size:11.5px">Deliverable Notes / Details</label>
                  <input type="text" id="empDelNotes-${t._id}" placeholder="e.g. Final Video Render v2, PSD Source files, Figma export link..." style="font-size:12.5px;padding:6px 10px" />
                </div>
                ${renderAttachmentUploader({id:"empDelUp-"+t._id,label:"Completed Files",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, images or zip packages"})}
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px">
                  <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
                    <input type="checkbox" id="empDelMarkComplete-${t._id}" ${c?"":"checked"} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
                    <span>Mark Job as Completed upon submitting</span>
                  </label>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn ghost small emp-del-cancel" data-id="${t._id}">Cancel</button>
                    <button type="button" class="btn gold small emp-del-submit" data-id="${t._id}">Submit Deliverables</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Employee Delivery Date Setter -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px">
              <div style="display:flex;align-items:center;gap:6px">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span style="font-size:12px;font-weight:700;color:var(--text-2)">Set Delivery Date:</span>
              </div>
              <input
                type="date"
                class="emp-completion-date"
                data-id="${t._id}"
                value="${r}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${t._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${r?`<span class="badge green" style="margin-left:auto">Committed Delivery: ${r}</span>`:'<span class="badge gray" style="margin-left:auto">No Date Set</span>'}
            </div>
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".emp-completion-date").forEach(t=>{t.addEventListener("focus",()=>{t.style.borderColor="var(--border-focus)",t.style.boxShadow="0 0 0 3px var(--accent-ring)"}),t.addEventListener("blur",()=>{t.style.borderColor="",t.style.boxShadow=""})}),a.forEach(t=>{bindAttachmentUploader("empDelUp-"+t._id)}),document.querySelectorAll(".emp-del-toggle").forEach(t=>{t.onclick=()=>{const n=document.getElementById("empDelForm-"+t.dataset.id);if(n){const d=n.style.display==="none";n.style.display=d?"block":"none",t.textContent=d?"✕ Close":"+ Add Deliverables"}}}),document.querySelectorAll(".emp-del-cancel").forEach(t=>{t.onclick=()=>{const n=document.getElementById("empDelForm-"+t.dataset.id);n&&(n.style.display="none");const d=document.querySelector(`.emp-del-toggle[data-id="${t.dataset.id}"]`);d&&(d.textContent="+ Add Deliverables")}}),document.querySelectorAll(".emp-del-submit").forEach(t=>{t.onclick=async()=>{var v,g;const n=t.dataset.id,d=getUploaderAttachments("empDelUp-"+n),p=((v=(document.getElementById("empDelNotes-"+n)||{}).value)==null?void 0:v.trim())||"",c=((g=document.getElementById("empDelMarkComplete-"+n))==null?void 0:g.checked)||!1;if(!d.length){flashToast("Please upload or attach at least one file",!0);return}t.disabled=!0,t.textContent="Submitting…";try{const r=d.map(m=>({...m,notes:p}));await apiPost(`/jobs/${n}/deliverables`,{deliverables:r,markComplete:c}),flashToast(c?"Deliverables submitted & job marked as Completed! 📦🎉":"Deliverables submitted successfully! 📦"),b()}catch(r){flashToast(r.message,!0)}finally{t.disabled=!1,t.textContent="Submit Deliverables"}}}),l.highlightId){const t=l.highlightId;delete l.highlightId,setTimeout(()=>{const n=document.getElementById("job-card-"+t);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.classList.add("pulse-highlight"),setTimeout(()=>n.classList.remove("pulse-highlight"),2200))},150)}}let X={date:new Date().toISOString().slice(0,10),filter:"all",search:""};async function Z(){try{const e=await apiGet("/tasks");if(Array.isArray(e))return localStorage.setItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"),JSON.stringify(e)),e}catch(e){console.warn("Backend /api/tasks offline, using local fallback:",e)}try{const e=localStorage.getItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"));return e?JSON.parse(e):[]}catch{return[]}}async function j(e,a=null){let i=null;try{a?i=await apiPut("/tasks/"+a,e):i=await apiPost("/tasks",e)}catch(n){console.warn("API task save failed, writing local backup:",n)}let t=[];try{const n=localStorage.getItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"));t=n?JSON.parse(n):[]}catch{}if(a){const n=t.findIndex(d=>d._id===a);n>=0&&(t[n]=i||{...t[n],...e,updatedAt:new Date})}else i||(i={_id:"loc_"+Date.now(),...e,createdAt:new Date,completedAt:e.status==="Completed"?new Date:null}),t.unshift(i);return localStorage.setItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"),JSON.stringify(t)),i}async function ee(e){try{await apiDelete("/tasks/"+e)}catch(a){console.warn("API task delete failed, updating storage:",a)}try{const a=localStorage.getItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"));let i=a?JSON.parse(a):[];i=i.filter(t=>t._id!==e),localStorage.setItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"),JSON.stringify(i))}catch{}}async function te(e){try{return await apiPatch("/tasks/"+e+"/toggle",{})}catch(a){console.warn("API toggle failed, toggling locally:",a)}try{const a=localStorage.getItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"));let i=a?JSON.parse(a):[];const t=i.find(n=>n._id===e);if(t){const n=t.status!=="Completed";return t.status=n?"Completed":"Todo",t.completedAt=n?new Date:null,localStorage.setItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"),JSON.stringify(i)),t}}catch{}return null}async function ae(e){O(e,{userRole:"employee",currentUser:s})}window.toggleDailyTask=async function(e){try{await te(e),b()}catch(a){flashToast(a.message,!0)}};window.deleteDailyTask=async function(e){try{await ee(e),flashToast("Task deleted"),b()}catch(a){flashToast(a.message,!0)}};window.editDailyTask=async function(e){const i=(await Z()).find(n=>n._id===e);if(!i)return;const t=prompt("Edit task:",i.title);if(t!==null&&t.trim())try{await j({title:t.trim()},e),flashToast("Task updated"),b()}catch(n){flashToast(n.message,!0)}};window.clearCompletedDailyTasks=async function(){if(confirm("Delete all completed tasks from this view?"))try{await apiPost("/tasks/clear-completed",{date:X.date});try{const e=localStorage.getItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"));if(e){let a=JSON.parse(e);a=a.filter(i=>i.status!=="Completed"),localStorage.setItem("ci360_tasks_"+((s==null?void 0:s._id)||"user"),JSON.stringify(a))}}catch{}flashToast("Completed tasks deleted! 🗑️"),b()}catch(e){flashToast(e.message,!0)}};window.saveCompDate=async function(e){try{const a=document.querySelector(`.emp-completion-date[data-id="${e}"]`);if(!a)return;const i=a.value?a.value:null;await apiPut("/jobs/"+e,{completionDate:i,status:i?"Completed":"In Progress"}),flashToast("Delivery date & status saved!"),b()}catch(a){flashToast(a.message,!0)}};window.toggleStatus=async function(e,a){try{const i=document.querySelector(`.emp-completion-date[data-id="${e}"]`);let t=a?(i==null?void 0:i.value)||new Date().toISOString().slice(0,10):null;i&&(i.value=t||""),await apiPut("/jobs/"+e,{status:a?"Completed":"In Progress",completionDate:t}),flashToast(a?"Job marked as Completed! 🎉":"Job reopened as In Progress"),b()}catch(i){flashToast(i.message,!0)}};window.delJob=async function(e){if(confirm("Delete this job entry? This cannot be undone."))try{await apiDelete("/jobs/"+e),flashToast("Job deleted"),b()}catch(a){flashToast(a.message,!0)}};async function ie(e){const[a,i]=await Promise.all([apiGet("/dashboard/employee?period="+l.period),apiGet("/targets?mine=true")]),t=S.personnel.find(r=>{var m;return String(r._id)===String(((m=s.personnelId)==null?void 0:m._id)||s.personnelId)}),n=t?t.capacity:48,d=a.target?a.target.targetHours:Math.round(n*.85),p=Math.round(a.hours/(d||1)*100),c=p>=100?"green":p>=75?"amber":"red",v=Math.min(p,100);e.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(s.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${V()}
      </div>

      <!-- Top Summary Metrics -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Hours Logged</span><div class="kpi-icon">⏱</div></div>
          <div class="kpi-value">${fmtHours(a.hours)}</div>
          <div class="kpi-sub">${a.jobCount} jobs this period</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Target Hours</span><div class="kpi-icon">🎯</div></div>
          <div class="kpi-value">${fmtHours(d)}</div>
          <div class="kpi-sub">${p}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${n} hrs/wk</div>
          <div class="kpi-sub">${t?t.status:"active"} status</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Assigned Targets</span><div class="kpi-icon">📋</div></div>
          <div class="kpi-value">${i.length}</div>
          <div class="kpi-sub">Admin configured</div>
        </div>
      </div>

      <!-- Period Hours Progress Card -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${l.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(a.hours)} logged of ${fmtHours(d)} target capacity</div>
          </div>
          <span class="badge ${c}" style="font-size:12.5px;padding:4px 10px">${p}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${c}" style="width:${v}%;height:100%;border-radius:var(--r-full);background:var(--${c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(d)}</span>
        </div>
      </div>

      <!-- Admin Assigned Throughput Targets -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px;margin:0;display:flex;align-items:center;gap:8px">
          <span>🎯 Service & Throughput Targets</span>
          <span class="eyebrow">${i.length} active</span>
        </h3>
        <button class="btn gold small" id="addEmpTargetBtn" type="button">+ Set Target</button>
      </div>

      ${i.length===0?`
        <div class="card" style="text-align:center;padding:36px 20px">
          <div style="font-size:32px;margin-bottom:8px">🎯</div>
          <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-bottom:4px">No specific service targets assigned yet</div>
          <div style="font-size:12.5px;color:var(--text-3);max-width:420px;margin:0 auto 16px">Your general hours target is active above. Click "+ Set Target" to define your own daily or weekly quotas for reels, stories, posts, or deliverables.</div>
          <button class="btn gold small" onclick="openEmpTargetModal(null)">+ Set First Target</button>
        </div>
      `:`
        <div class="grid grid-2" style="gap:16px">
          ${i.map(r=>{var C;const m=((C=r.serviceId)==null?void 0:C.name)||"General Service",h={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"}[r.unit]||(r.unit?r.unit.charAt(0).toUpperCase()+r.unit.slice(1):"Deliverables"),f=r.actual||0,u=r.quantity||1,w=u>0?f/u:0,k=Math.round(w*100),$=Math.min(k,100),x=w>=1?{l:"🟢 On Pace",c:"green"}:w>=.6?{l:"🟡 Behind",c:"amber"}:{l:"🔴 Off Pace",c:"red"};return`
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(m)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${x.c}">${x.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${r._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${f}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${u} ${escapeHtml(h)} per ${r.period==="day"?"day":r.period==="week"?"week":"month"}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${x.c}" style="width:${$}%;height:100%;border-radius:var(--r-full);background:var(--${x.c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${r._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${r._id}" value="${f}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${r._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${r._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${r.attachments&&r.attachments.length?`
                  <div data-attachments="${encodeURIComponent(JSON.stringify(r.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(r.attachments,{title:"Attached Proofs & Files"})}
                  </div>
                `:""}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${r.period==="day"?"Daily":r.period==="week"?"Weekly":"Monthly"}</strong></span>
                <span><strong>${k}%</strong> Completed</span>
              </div>
            </div>`}).join("")}
        </div>
      `}
    </div>`;const g=document.getElementById("addEmpTargetBtn");g&&(g.onclick=()=>H(null)),document.querySelectorAll(".edit-emp-target").forEach(r=>{r.onclick=()=>H(i.find(m=>m._id===r.dataset.id))}),Y()}window.stepTargetCompleted=function(e,a){const i=document.querySelector(`.emp-target-completed-inp[data-id="${e}"]`);if(!i)return;let t=Math.max(0,(Number(i.value)||0)+a);i.value=t,saveTargetCompleted(e)};window.saveTargetCompleted=async function(e){try{const a=document.querySelector(`.emp-target-completed-inp[data-id="${e}"]`);if(!a)return;const i=Number(a.value)||0;await apiPut("/targets/"+e,{completed:i}),flashToast("Target progress updated! 🎯"),b()}catch(a){flashToast(a.message,!0)}};function H(e){var r,m;const a=!e,i=S.services||[];e=e||{serviceId:(r=i[0])==null?void 0:r._id,quantity:5,unit:"reels",period:"day",completed:0,attachments:[]};const t=((m=e.serviceId)==null?void 0:m._id)||e.serviceId||"",d=["reels","stories","posts","count","hours"].includes(e.unit),p=openModal(`
    <h3>${a?"Set New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${i.map(y=>`<option value="${y._id}" ${String(y._id)===String(t)?"selected":""}>${escapeHtml(y.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Goal Quota *</label>
        <input type="number" id="mEmpTgtQty" min="0.5" step="0.5" value="${e.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Completed Output</label>
        <input type="number" id="mEmpTgtCompleted" min="0" step="0.5" value="${e.actual||e.completed||0}">
      </div>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mEmpTgtUnit">
          <option value="reels" ${d&&e.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${d&&e.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${d&&e.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${d&&e.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${d&&e.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${d?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>

      <div class="field" style="margin-bottom:0">
        <label>Frequency / Target Period *</label>
        <select id="mEmpTgtPeriod">
          <option value="day" ${e.period==="day"?"selected":""}>Per Day</option>
          <option value="week" ${e.period==="week"?"selected":""}>Per Week</option>
          <option value="month" ${e.period==="month"?"selected":""}>Per Month</option>
        </select>
      </div>
    </div>

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${d?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${d?"":escapeHtml(e.unit||"")}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpTgtAttachments",label:"Proof of Work / Deliverable Attachments",subtitle:"Upload links, finished files, screenshots or design outputs"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);bindAttachmentUploader("mEmpTgtAttachments",{existing:e.attachments||[]});const c=p.querySelector("#mEmpTgtUnit"),v=p.querySelector("#mEmpTgtCustomUnitWrap"),g=p.querySelector("#mEmpTgtCustomUnit");c.onchange=()=>{c.value==="custom"?(v.style.display="flex",g.focus()):v.style.display="none"},p.querySelector("#mEmpTgtCancel").onclick=()=>p.remove(),p.querySelector("#mEmpTgtSave").onclick=async()=>{let y=c.value;y==="custom"&&(y=g.value.trim()||"Deliverables");const h=getUploaderAttachments("mEmpTgtAttachments"),f={serviceId:p.querySelector("#mEmpTgtService").value,quantity:Number(p.querySelector("#mEmpTgtQty").value)||1,completed:Number(p.querySelector("#mEmpTgtCompleted").value)||0,unit:y,period:p.querySelector("#mEmpTgtPeriod").value,attachments:h};if(!f.serviceId){flashToast("Service is required",!0);return}try{a?await apiPost("/targets",f):await apiPut("/targets/"+e._id,f),flashToast("Target saved! 🎯"),p.remove(),b()}catch(u){flashToast(u.message,!0)}}}window.addEventListener("ci360:dataUpdated",e=>{const a=document.activeElement,i=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.isContentEditable),t=document.querySelector(".modal-bg, .modal-backdrop, #jobModal");!i&&!t&&l.tab!=="logjob"&&b()});N();
