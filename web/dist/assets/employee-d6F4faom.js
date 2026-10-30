import{l as q,m as J}from"./api-CIt4WUyE.js";import{initProposalStudio as M}from"./proposals-BL0xR5cR.js";import{i as O,a as L}from"./teambonding-67O1_op4.js";let o=null,S={personnel:[],clients:[],services:[]},p={tab:"dashboard",period:"month"};async function B(){if(initTheme(),o=requireAuth("employee"),!o)return;const[t,i,a]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);S.personnel=t,S.clients=i,S.services=a,C()}function H(t){const i=S.clients.find(a=>a._id===t);return i?i.name:"—"}function N(){return o&&(/mansi/i.test(o.name)||/urna/i.test(o.name))}function F(){const t=o&&(o.role==="accounts"||o.role==="superadmin"||/ekta/i.test(o.name)||/ekta/i.test(o.email)),i=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"myjobs",label:"My Jobs",icon:"📋"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"targets",label:"My Targets",icon:"🎯"},{key:"settings",label:"Settings",icon:"⚙️"}];return t&&i.push({key:"accounts_redirect",label:"Accounts Dashboard 💰",icon:"💳"}),i}function C(){const t=document.getElementById("app"),i=F(),a=i.find(e=>e.key===p.tab)||i[0];t.innerHTML=renderAppShell({user:o,currentRole:"employee",activeTab:p.tab,tabs:i,title:a.label,subtitle:N()?"Lead Workspace · Mansi & Urna Management":"Employee Workspace & Productivity Dashboard"}),bindAppShellEvents(e=>{if(e==="accounts_redirect"){window.location.href="/accounts";return}p.tab=e,C()}),x()}window.ci360NavTab=(t,i=null)=>{if(t==="accounts_redirect"){window.location.href="/accounts";return}t==="jobs"||t==="myjobs"?t="myjobs":t==="tasks"||t==="mytasks"||t==="dailytasks"?t="dailytasks":t==="target"||t==="targets"?t="targets":t==="proposal"||t==="proposals"?t="proposals":t==="teambonding"||t==="bonding"||t==="arcade"||t==="chat"?t="teambonding":(t==="dashboard"||t==="overview")&&(t="dashboard"),p.tab=t,i&&(p.highlightId=i),C()};async function x(){const t=document.getElementById("content");if(t){t.innerHTML=renderSkeletonCards(3);try{p.tab==="dashboard"?await _(t):p.tab==="myjobs"||p.tab==="jobs"?await K(t):p.tab==="dailytasks"||p.tab==="mytasks"||p.tab==="tasks"?await ie(t):p.tab==="proposals"||p.tab==="proposal"?await W(t):p.tab==="teambonding"||p.tab==="bonding"?await G(t):p.tab==="targets"||p.tab==="target"?await ae(t):p.tab==="settings"?await Q(t):(p.tab="dashboard",await _(t))}catch(i){t.innerHTML=renderEmptyState("Something went wrong",i.message,"⚠️")}}}async function W(t){t.innerHTML='<div id="proposals-module-root"></div>';const i=t.querySelector("#proposals-module-root");M(i,{userRole:"employee",currentUser:o})}async function G(t){t.innerHTML='<div id="teambonding-module-root"></div>';const i=t.querySelector("#teambonding-module-root");L(i,{currentUser:o})}async function Q(t){t.innerHTML=`
    <div style="padding:8px 0 24px 0;">
      ${q({title:"Employee Account & Security",subtitle:"Manage your personal login email, display name, and password"})}
    </div>
  `,J(t)}function V(){return renderPeriodPicker(p.period)}function Y(){document.querySelectorAll("[data-period]").forEach(t=>{t.onclick=()=>{p.period=t.dataset.period,x()}})}async function _(t){const[i,a,e]=await Promise.all([apiGet("/dashboard/employee?period="+p.period).catch(()=>({stats:{},person:{},recentJobs:[],accounts:[]})),apiGet("/jobs?mine=true").catch(()=>[]),apiGet("/tasks").catch(()=>[])]),n=i.person||{},r=n.name||(o==null?void 0:o.name)||"Team Member",d=n.duties||"Creative Specialist",g=Number(n.capacity)||48,v=i.stats||{hours:0,revenue:0,utilization:0,label:"Optimal",badge:"green"},c=a||[],l=c.filter(s=>s.status==="Completed"||s.clientApproval&&s.clientApproval.status==="Approved"||s.completionDate),m=c.filter(s=>!s.completionDate&&s.status!=="Completed"&&(!s.clientApproval||s.clientApproval.status!=="Approved")),b=c.filter(s=>s.clientApproval&&s.clientApproval.status==="Revision Requested"),u=m.filter(s=>s.priority==="Urgent");m.filter(s=>s.priority==="High");const f=new Date().toISOString().slice(0,10),y=(e||[]).filter(s=>s.date?s.date.slice(0,10)===f:!0),k=y.filter(s=>s.status==="Completed"),T=y.filter(s=>s.status!=="Completed"),A=y.length>0?Math.round(k.length/y.length*100):100,h=i.accounts||[];t.innerHTML=`
    <div class="block employee-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Employee Profile Hero Card -->
      <div class="card employee-hero-card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.05) 50%, rgba(16,185,129,0.05) 100%);border:1px solid rgba(99,102,241,0.22);border-radius:var(--r-xl);padding:24px 28px;margin-bottom:24px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
          
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:56px;height:56px;border-radius:var(--r-lg);background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(79,70,229,0.4);flex-shrink:0">
              ${r.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(r)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(d)}</span>
                <span class="badge ${v.badge||"green"}" style="font-size:11px;font-weight:700">● ${escapeHtml(v.label||"Optimal Pace")}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Personal Workspace &amp; Performance Radar · Standard Capacity: <strong>${g}h / week</strong>
              </p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn primary" id="btnEmpQuickJobs" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md)">
              <span>📋</span> My Jobs (${c.length})
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
            ${renderPeriodPicker(p.period)}
          </div>
        </div>
      </div>

      <!-- Action Banner: Urgent / Revision Alerts -->
      ${u.length>0||b.length>0?`
        <div class="card" style="background:linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.06) 100%);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <span style="font-size:24px">⚡</span>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                High Priority Focus Items
              </div>
              <div style="font-size:13px;color:var(--text-2);display:flex;gap:12px;flex-wrap:wrap">
                ${u.length>0?`<span style="color:var(--red);font-weight:700">🔴 ${u.length} Urgent Job(s)</span>`:""}
                ${b.length>0?`<span style="color:var(--amber-500);font-weight:700">↺ ${b.length} Revision Request(s)</span>`:""}
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
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${l.length} completed deliverables</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Today's Task Progress</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${k.length} <span style="font-size:18px;font-weight:600;color:var(--text-4)">/ ${y.length}</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${A}% of today's checklist completed</div>
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${T.length} pending · ${k.length} done</p>
            </div>
            <button class="btn secondary small" onclick="ci360NavTab('dailytasks')" style="font-size:12px">
              Open Checklist →
            </button>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom:16px">
            <div style="width:100%;height:8px;background:var(--border-sm);border-radius:8px;overflow:hidden">
              <div style="width:${A}%;height:100%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:8px;transition:width 0.4s ease"></div>
            </div>
          </div>

          ${y.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${y.slice(0,5).map(s=>{const w=s.status==="Completed";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <span style="font-size:16px">${w?"✅":"⚪"}</span>
                      <span style="font-size:13px;font-weight:600;color:${w?"var(--text-4)":"var(--text-1)"};${w?"text-decoration:line-through":""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                        ${escapeHtml(s.title||"Task")}
                      </span>
                    </div>
                    <span class="badge ${s.priority==="Urgent"?"red":s.priority==="High"?"amber":"gray"}" style="font-size:10.5px">
                      ${escapeHtml(s.priority||"Normal")}
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${h.length} active client accounts on roster</p>
            </div>
            <span class="badge gold" style="font-weight:700">${h.length} Accounts</span>
          </div>

          ${h.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${h.slice(0,5).map(s=>{const E=(S.clients.find(P=>String(P._id)===String(s.clientId))||{}).name||"Client Account";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0">
                        ${E.slice(0,2).toUpperCase()}
                      </div>
                      <div style="min-width:0">
                        <div style="font-size:13.5px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(E)}</div>
                        <div style="font-size:11px;color:var(--text-4)">${escapeHtml(s.nature||"Retainer")} · ${escapeHtml(s.difficulty||"Normal")}</div>
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
            View All Jobs (${c.length}) →
          </button>
        </div>

        ${c.length>0?`
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
                ${c.slice(0,6).map(s=>{var R;const w=s.status==="Completed"||s.clientApproval&&s.clientApproval.status==="Approved"||s.completionDate,E=s.clientApproval&&s.clientApproval.status==="Revision Requested",P=((R=s.clientId)==null?void 0:R.name)||H(s.clientId)||"Client",I=s.priority==="Urgent"?"red":s.priority==="High"?"amber":"gray";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('myjobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(s.title||"Untitled Job")}
                      </td>
                      <td>
                        <span class="badge blue" style="font-size:11px">${escapeHtml(P)}</span>
                      </td>
                      <td>
                        <span class="badge ${I}" style="font-size:11px;font-weight:700">${escapeHtml(s.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(s.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${s.completionDate?fmtDate(s.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${w?"green":E?"red":"amber"}" style="font-weight:700">
                          ${w?"✓ Completed":E?"↺ Revision":"⏳ In Progress"}
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
  `;const $=document.getElementById("btnEmpQuickJobs");$&&($.onclick=()=>{p.tab="myjobs",C()});const z=document.getElementById("btnEmpQuickTasks");z&&(z.onclick=()=>{p.tab="dailytasks",C()});const D=document.getElementById("btnEmpQuickProposals");D&&(D.onclick=()=>{p.tab="proposals",C()}),document.querySelectorAll("#empOverviewPeriodWrapper [data-period]").forEach(s=>{s.onclick=()=>{p.period=s.dataset.period,x()}})}async function K(t){const i=await apiGet("/jobs?mine=true"),a={Medium:"gray",High:"amber",Urgent:"red"};if(i.length===0){t.innerHTML=`
      <div class="block">
        <h2>My Jobs <span class="eyebrow">No assigned jobs yet</span></h2>
        ${renderEmptyState("No jobs assigned yet","Jobs assigned to you by admins will appear here.","📋")}
      </div>`;return}if(t.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h2 style="margin:0">My Jobs <span class="eyebrow">${i.length} total</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--text-3)">Click the date or 💾 to save completion date</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${i.map(e=>{var u,f,y,k,T,A,h,$,z,D,s;const n=(e.assignments||[]).find(w=>String(w.personId)===String(o.personnelId._id||o.personnelId)),r=String(e.createdBy)===String(o._id),d=e.status==="Denied"||e.clientApproval&&e.clientApproval.status==="Denied",g=e.status==="Completed"&&!d,v=e.clientApproval&&e.clientApproval.status==="Approved"&&!d,c=e.clientApproval&&e.clientApproval.status==="Revision Requested"&&!d,l=!v&&!d&&!c&&!!(e.clientApproval&&e.clientApproval.isRevised),m=e.completionDate?new Date(e.completionDate).toISOString().slice(0,10):"",b=a[e.priority||"Medium"]||"gray";return`
          <div class="job-card" id="job-card-${e._id}" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${d?"var(--red-500)":v?"var(--green-500)":c?"var(--amber-500)":l?"var(--brand-500)":g?"var(--green-500)":"var(--brand-500)"}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(e.title||"Untitled Job")}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${d?"red":g?"green":"amber"}">${d?"❌ Denied by Client":g?"✓ Completed":"⏳ In Progress"}</span>
                  ${v?`<span class="badge green">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:""}
                  ${c?'<span class="badge red">↺ Revision Requested</span>':""}
                  ${l?'<span class="badge blue">📦 Revised — Awaiting Client Re-approval</span>':""}
                  <span class="badge ${b}">${escapeHtml(e.priority||"Medium")}</span>
                  ${(e.serviceNames||[]).map(w=>`<span class="badge gray">${escapeHtml(w)}</span>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                ${d||c?`
                  <button type="button" class="btn gold small emp-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(((u=e.clientApproval)==null?void 0:u.feedback)||((f=e.clientApproval)==null?void 0:f.deniedReason)||"")}" data-type="${c?"revision":"denial"}" style="font-weight:700;font-size:12px">
                    🔁 Resubmit Job
                  </button>
                `:`
                  <!-- Toggle Status -->
                  <button type="button" class="btn ${g?"secondary":"primary"} small"
                          onclick="toggleStatus('${e._id}', ${!g})"
                          style="font-size:12px">
                    ${g?"↩ Reopen":"✓ Mark Done"}
                  </button>
                `}
                ${r?`<button type="button" class="btn danger small" onclick="delJob('${e._id}')">Delete</button>`:""}
              </div>
            </div>

            <!-- Denied Alert Box for Employee -->
            ${d?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>❌</span> Job Denied by Client (${escapeHtml(((y=e.clientApproval)==null?void 0:y.deniedBy)||"Client")})
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(((k=e.clientApproval)==null?void 0:k.deniedAt)||e.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;border-left:3px solid var(--red-500);line-height:1.4">
                  <strong style="color:var(--red-500);font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Reason for Denial:</strong>
                  "${escapeHtml(((T=e.clientApproval)==null?void 0:T.deniedReason)||((A=e.clientApproval)==null?void 0:A.feedback)||"Job denied")}"
                </div>
                <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px dashed rgba(239,68,68,0.25)">
                  <span style="font-size:12px;color:var(--text-3)">Review client's reason above, then resubmit:</span>
                  <button type="button" class="btn gold small emp-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(((h=e.clientApproval)==null?void 0:h.deniedReason)||"")}" style="font-weight:700">
                    🔁 Resubmit Work to Client
                  </button>
                </div>
              </div>
            `:""}

            <!-- Revision Requested Alert Box for Employee -->
            ${c?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate((($=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:$.requestedAt)||e.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(e.clientApproval.feedback||"Revision requested")}"
                </div>
                ${(D=(z=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:z.attachments)!=null&&D.length?`
                  <div style="margin-top:8px">
                    ${renderAttachmentChips(e.clientApproval.revisions.slice(-1)[0].attachments,{title:"Client Reference Markups"})}
                  </div>
                `:""}
                <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px dashed rgba(239,68,68,0.25)">
                  <span style="font-size:12px;color:var(--text-3)">Review client's revision notes above, make corrections, then resubmit:</span>
                  <button type="button" class="btn gold small emp-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(((s=e.clientApproval)==null?void 0:s.feedback)||"")}" data-type="revision" style="font-weight:700">
                    🔁 Resubmit Revised Work to Client
                  </button>
                </div>
              </div>
            `:""}

            <!-- Details grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:14px">
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Client</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(H(e.clientId))}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Start Date</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${fmtDate(e.date)}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Target End Date (Admin / Client)</div>
                <div style="font-size:13px;font-weight:700;color:${e.completionDate?"var(--brand-600)":"var(--text-4)"}">
                  ${e.completionDate?`📅 ${fmtDate(e.completionDate)}`:"— Not Specified —"}
                </div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Your Logged Hours</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${n?fmtHours(n.hours):"0 hrs"}</div>
              </div>
              ${e.description?`
              <div style="grid-column:1 / -1">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Description</div>
                <div style="font-size:12.5px;color:var(--text-2);line-height:1.5">${escapeHtml(e.description)}</div>
              </div>`:""}
            </div>

            <!-- Brief Attachments & Deliverables Section -->
            ${e.attachments&&e.attachments.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(e.attachments))}">
                ${renderAttachmentChips(e.attachments,{title:"Job Brief & Reference Files"})}
              </div>
            `:""}

            ${e.deliverables&&e.deliverables.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(e.deliverables))}">
                ${renderAttachmentChips(e.deliverables,{title:"Finished Deliverables & Completed Artifacts"})}
              </div>
            `:""}

            <!-- Deliverable Uploader for Employee -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-size:12.5px;font-weight:700;color:var(--text-1)">📦 Submit Finished Deliverable / Work Artifact</span>
                <button type="button" class="btn ghost small emp-del-toggle" data-id="${e._id}" style="padding:2px 8px;font-size:11px">+ Add Deliverables</button>
              </div>
              <div class="emp-del-form" id="empDelForm-${e._id}" style="display:none;margin-top:10px">
                <div class="field" style="margin-bottom:8px">
                  <label style="font-size:11.5px">Deliverable Notes / Version Details</label>
                  <input type="text" id="empDelNotes-${e._id}" placeholder="e.g. Final Website build, Video Render v2, Figma export link..." style="font-size:12.5px;padding:6px 10px" />
                </div>
                <div class="field" style="margin-bottom:10px">
                  <label style="font-size:11.5px;font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
                  <input type="url" id="empDelUrl-${e._id}" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="font-size:12.5px;padding:6px 10px;width:100%;box-sizing:border-box" />
                  <span style="font-size:10.5px;color:var(--text-4)">For website builds, web apps, Figma designs or cloud links</span>
                </div>
                ${renderAttachmentUploader({id:"empDelUp-"+e._id,label:"Completed Files (Optional if URL provided)",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, images or zip packages"})}
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px">
                  <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
                    <input type="checkbox" id="empDelMarkComplete-${e._id}" ${g?"":"checked"} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
                    <span>Mark Work as Completed &amp; Send to Client for Approval</span>
                  </label>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn ghost small emp-del-cancel" data-id="${e._id}">Cancel</button>
                    <button type="button" class="btn gold small emp-del-submit" data-id="${e._id}">Submit Deliverables</button>
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
                data-id="${e._id}"
                value="${m}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${e._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${m?`<span class="badge green" style="margin-left:auto">Committed Delivery: ${m}</span>`:'<span class="badge gray" style="margin-left:auto">No Date Set</span>'}
            </div>
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".emp-completion-date").forEach(e=>{e.addEventListener("focus",()=>{e.style.borderColor="var(--border-focus)",e.style.boxShadow="0 0 0 3px var(--accent-ring)"}),e.addEventListener("blur",()=>{e.style.borderColor="",e.style.boxShadow=""})}),i.forEach(e=>{bindAttachmentUploader("empDelUp-"+e._id)}),document.querySelectorAll(".emp-del-toggle").forEach(e=>{e.onclick=()=>{const n=document.getElementById("empDelForm-"+e.dataset.id);if(n){const r=n.style.display==="none";n.style.display=r?"block":"none",e.textContent=r?"✕ Close":"+ Add Deliverables"}}}),document.querySelectorAll(".emp-del-cancel").forEach(e=>{e.onclick=()=>{const n=document.getElementById("empDelForm-"+e.dataset.id);n&&(n.style.display="none");const r=document.querySelector(`.emp-del-toggle[data-id="${e.dataset.id}"]`);r&&(r.textContent="+ Add Deliverables")}}),document.querySelectorAll(".emp-resubmit-btn").forEach(e=>{e.onclick=()=>se(e.dataset.id,e.dataset.title,e.dataset.reason,e.dataset.type)}),document.querySelectorAll(".emp-del-submit").forEach(e=>{e.onclick=async()=>{var l,m,b;const n=e.dataset.id,r=getUploaderAttachments("empDelUp-"+n),d=((l=(document.getElementById("empDelNotes-"+n)||{}).value)==null?void 0:l.trim())||"",g=((m=(document.getElementById("empDelUrl-"+n)||{}).value)==null?void 0:m.trim())||"",v=((b=document.getElementById("empDelMarkComplete-"+n))==null?void 0:b.checked)||!1,c=r.map(u=>({...u,notes:d}));if(g){let u=g;/^https?:\/\//i.test(u)||(u="https://"+u),c.unshift({name:d?`${d} (Live URL)`:"Live Deliverable URL / Website",url:u,type:"url",size:0,notes:d||"Live URL"})}if(!c.length){flashToast("Please enter a deliverable URL or attach files",!0);return}e.disabled=!0,e.textContent="Submitting…";try{await apiPost(`/jobs/${n}/deliverables`,{deliverables:c,markComplete:v}),flashToast(v?"Deliverables submitted & sent to Client for Approval! 📦🎉":"Deliverables submitted successfully! 📦"),x()}catch(u){flashToast(u.message,!0)}finally{e.disabled=!1,e.textContent="Submit Deliverables"}}}),p.highlightId){const e=p.highlightId;delete p.highlightId,setTimeout(()=>{const n=document.getElementById("job-card-"+e);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.classList.add("pulse-highlight"),setTimeout(()=>n.classList.remove("pulse-highlight"),2200))},150)}}let X={date:new Date().toISOString().slice(0,10),filter:"all",search:""};async function Z(){try{const t=await apiGet("/tasks");if(Array.isArray(t))return localStorage.setItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"),JSON.stringify(t)),t}catch(t){console.warn("Backend /api/tasks offline, using local fallback:",t)}try{const t=localStorage.getItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"));return t?JSON.parse(t):[]}catch{return[]}}async function j(t,i=null){let a=null;try{i?a=await apiPut("/tasks/"+i,t):a=await apiPost("/tasks",t)}catch(n){console.warn("API task save failed, writing local backup:",n)}let e=[];try{const n=localStorage.getItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"));e=n?JSON.parse(n):[]}catch{}if(i){const n=e.findIndex(r=>r._id===i);n>=0&&(e[n]=a||{...e[n],...t,updatedAt:new Date})}else a||(a={_id:"loc_"+Date.now(),...t,createdAt:new Date,completedAt:t.status==="Completed"?new Date:null}),e.unshift(a);return localStorage.setItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"),JSON.stringify(e)),a}async function ee(t){try{await apiDelete("/tasks/"+t)}catch(i){console.warn("API task delete failed, updating storage:",i)}try{const i=localStorage.getItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"));let a=i?JSON.parse(i):[];a=a.filter(e=>e._id!==t),localStorage.setItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"),JSON.stringify(a))}catch{}}async function te(t){try{return await apiPatch("/tasks/"+t+"/toggle",{})}catch(i){console.warn("API toggle failed, toggling locally:",i)}try{const i=localStorage.getItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"));let a=i?JSON.parse(i):[];const e=a.find(n=>n._id===t);if(e){const n=e.status!=="Completed";return e.status=n?"Completed":"Todo",e.completedAt=n?new Date:null,localStorage.setItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"),JSON.stringify(a)),e}}catch{}return null}async function ie(t){O(t,{userRole:"employee",currentUser:o})}window.toggleDailyTask=async function(t){try{await te(t),x()}catch(i){flashToast(i.message,!0)}};window.deleteDailyTask=async function(t){try{await ee(t),flashToast("Task deleted"),x()}catch(i){flashToast(i.message,!0)}};window.editDailyTask=async function(t){const a=(await Z()).find(n=>n._id===t);if(!a)return;const e=prompt("Edit task:",a.title);if(e!==null&&e.trim())try{await j({title:e.trim()},t),flashToast("Task updated"),x()}catch(n){flashToast(n.message,!0)}};window.clearCompletedDailyTasks=async function(){if(confirm("Delete all completed tasks from this view?"))try{await apiPost("/tasks/clear-completed",{date:X.date});try{const t=localStorage.getItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"));if(t){let i=JSON.parse(t);i=i.filter(a=>a.status!=="Completed"),localStorage.setItem("ci360_tasks_"+((o==null?void 0:o._id)||"user"),JSON.stringify(i))}}catch{}flashToast("Completed tasks deleted! 🗑️"),x()}catch(t){flashToast(t.message,!0)}};window.saveCompDate=async function(t){try{const i=document.querySelector(`.emp-completion-date[data-id="${t}"]`);if(!i)return;const a=i.value?i.value:null;await apiPut("/jobs/"+t,{completionDate:a,status:a?"Completed":"In Progress"}),flashToast("Delivery date & status saved!"),x()}catch(i){flashToast(i.message,!0)}};window.toggleStatus=async function(t,i){try{const a=document.querySelector(`.emp-completion-date[data-id="${t}"]`);let e=i?(a==null?void 0:a.value)||new Date().toISOString().slice(0,10):null;a&&(a.value=e||""),await apiPut("/jobs/"+t,{status:i?"Completed":"In Progress",completionDate:e}),flashToast(i?"Job marked as Completed! 🎉":"Job reopened as In Progress"),x()}catch(a){flashToast(a.message,!0)}};window.delJob=async function(t){if(confirm("Delete this job entry? This cannot be undone."))try{await apiDelete("/jobs/"+t),flashToast("Job deleted"),x()}catch(i){flashToast(i.message,!0)}};async function ae(t){const[i,a]=await Promise.all([apiGet("/dashboard/employee?period="+p.period),apiGet("/targets?mine=true")]),e=S.personnel.find(l=>{var m;return String(l._id)===String(((m=o.personnelId)==null?void 0:m._id)||o.personnelId)}),n=e?e.capacity:48,r=i.target?i.target.targetHours:Math.round(n*.85),d=Math.round(i.hours/(r||1)*100),g=d>=100?"green":d>=75?"amber":"red",v=Math.min(d,100);t.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(o.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${V()}
      </div>

      <!-- Top Summary Metrics -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Hours Logged</span><div class="kpi-icon">⏱</div></div>
          <div class="kpi-value">${fmtHours(i.hours)}</div>
          <div class="kpi-sub">${i.jobCount} jobs this period</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Target Hours</span><div class="kpi-icon">🎯</div></div>
          <div class="kpi-value">${fmtHours(r)}</div>
          <div class="kpi-sub">${d}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${n} hrs/wk</div>
          <div class="kpi-sub">${e?e.status:"active"} status</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Assigned Targets</span><div class="kpi-icon">📋</div></div>
          <div class="kpi-value">${a.length}</div>
          <div class="kpi-sub">Admin configured</div>
        </div>
      </div>

      <!-- Period Hours Progress Card -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${p.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(i.hours)} logged of ${fmtHours(r)} target capacity</div>
          </div>
          <span class="badge ${g}" style="font-size:12.5px;padding:4px 10px">${d}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${g}" style="width:${v}%;height:100%;border-radius:var(--r-full);background:var(--${g==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(r)}</span>
        </div>
      </div>

      <!-- Admin Assigned Throughput Targets -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px;margin:0;display:flex;align-items:center;gap:8px">
          <span>🎯 Service & Throughput Targets</span>
          <span class="eyebrow">${a.length} active</span>
        </h3>
        <button class="btn gold small" id="addEmpTargetBtn" type="button">+ Set Target</button>
      </div>

      ${a.length===0?`
        <div class="card" style="text-align:center;padding:36px 20px">
          <div style="font-size:32px;margin-bottom:8px">🎯</div>
          <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-bottom:4px">No specific service targets assigned yet</div>
          <div style="font-size:12.5px;color:var(--text-3);max-width:420px;margin:0 auto 16px">Your general hours target is active above. Click "+ Set Target" to define your own daily or weekly quotas for reels, stories, posts, or deliverables.</div>
          <button class="btn gold small" onclick="openEmpTargetModal(null)">+ Set First Target</button>
        </div>
      `:`
        <div class="grid grid-2" style="gap:16px">
          ${a.map(l=>{var $;const m=(($=l.serviceId)==null?void 0:$.name)||"General Service",u={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"}[l.unit]||(l.unit?l.unit.charAt(0).toUpperCase()+l.unit.slice(1):"Deliverables"),f=l.actual||0,y=l.quantity||1,k=y>0?f/y:0,T=Math.round(k*100),A=Math.min(T,100),h=k>=1?{l:"🟢 On Pace",c:"green"}:k>=.6?{l:"🟡 Behind",c:"amber"}:{l:"🔴 Off Pace",c:"red"};return`
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(m)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${h.c}">${h.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${l._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${f}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${y} ${escapeHtml(u)} per ${l.period==="day"?"day":l.period==="week"?"week":"month"}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${h.c}" style="width:${A}%;height:100%;border-radius:var(--r-full);background:var(--${h.c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${l._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${l._id}" value="${f}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${l._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${l._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${l.attachments&&l.attachments.length?`
                  <div data-attachments="${encodeURIComponent(JSON.stringify(l.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(l.attachments,{title:"Attached Proofs & Files"})}
                  </div>
                `:""}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${l.period==="day"?"Daily":l.period==="week"?"Weekly":"Monthly"}</strong></span>
                <span><strong>${T}%</strong> Completed</span>
              </div>
            </div>`}).join("")}
        </div>
      `}
    </div>`;const c=document.getElementById("addEmpTargetBtn");c&&(c.onclick=()=>U(null)),document.querySelectorAll(".edit-emp-target").forEach(l=>{l.onclick=()=>U(a.find(m=>m._id===l.dataset.id))}),Y()}window.stepTargetCompleted=function(t,i){const a=document.querySelector(`.emp-target-completed-inp[data-id="${t}"]`);if(!a)return;let e=Math.max(0,(Number(a.value)||0)+i);a.value=e,saveTargetCompleted(t)};window.saveTargetCompleted=async function(t){try{const i=document.querySelector(`.emp-target-completed-inp[data-id="${t}"]`);if(!i)return;const a=Number(i.value)||0;await apiPut("/targets/"+t,{completed:a}),flashToast("Target progress updated! 🎯"),x()}catch(i){flashToast(i.message,!0)}};function U(t){var l,m;const i=!t,a=S.services||[];t=t||{serviceId:(l=a[0])==null?void 0:l._id,quantity:5,unit:"reels",period:"day",completed:0,attachments:[]};const e=((m=t.serviceId)==null?void 0:m._id)||t.serviceId||"",r=["reels","stories","posts","count","hours"].includes(t.unit),d=openModal(`
    <h3>${i?"Set New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${a.map(b=>`<option value="${b._id}" ${String(b._id)===String(e)?"selected":""}>${escapeHtml(b.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Goal Quota *</label>
        <input type="number" id="mEmpTgtQty" min="0.5" step="0.5" value="${t.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Completed Output</label>
        <input type="number" id="mEmpTgtCompleted" min="0" step="0.5" value="${t.actual||t.completed||0}">
      </div>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mEmpTgtUnit">
          <option value="reels" ${r&&t.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${r&&t.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${r&&t.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${r&&t.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${r&&t.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${r?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>

      <div class="field" style="margin-bottom:0">
        <label>Frequency / Target Period *</label>
        <select id="mEmpTgtPeriod">
          <option value="day" ${t.period==="day"?"selected":""}>Per Day</option>
          <option value="week" ${t.period==="week"?"selected":""}>Per Week</option>
          <option value="month" ${t.period==="month"?"selected":""}>Per Month</option>
        </select>
      </div>
    </div>

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${r?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${r?"":escapeHtml(t.unit||"")}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpTgtAttachments",label:"Proof of Work / Deliverable Attachments",subtitle:"Upload links, finished files, screenshots or design outputs"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);bindAttachmentUploader("mEmpTgtAttachments",{existing:t.attachments||[]});const g=d.querySelector("#mEmpTgtUnit"),v=d.querySelector("#mEmpTgtCustomUnitWrap"),c=d.querySelector("#mEmpTgtCustomUnit");g.onchange=()=>{g.value==="custom"?(v.style.display="flex",c.focus()):v.style.display="none"},d.querySelector("#mEmpTgtCancel").onclick=()=>d.remove(),d.querySelector("#mEmpTgtSave").onclick=async()=>{let b=g.value;b==="custom"&&(b=c.value.trim()||"Deliverables");const u=getUploaderAttachments("mEmpTgtAttachments"),f={serviceId:d.querySelector("#mEmpTgtService").value,quantity:Number(d.querySelector("#mEmpTgtQty").value)||1,completed:Number(d.querySelector("#mEmpTgtCompleted").value)||0,unit:b,period:d.querySelector("#mEmpTgtPeriod").value,attachments:u};if(!f.serviceId){flashToast("Service is required",!0);return}try{i?await apiPost("/targets",f):await apiPut("/targets/"+t._id,f),flashToast("Target saved! 🎯"),d.remove(),x()}catch(y){flashToast(y.message,!0)}}}window.addEventListener("ci360:dataUpdated",t=>{const i=document.activeElement,a=i&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"||i.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal");!a&&!e&&p.tab!=="logjob"&&x()});B();function se(t,i,a,e="denial"){const n=e==="revision",r=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:8px">
        <span>🔁</span> Resubmit Work to Client for Approval
      </div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i)}</div>
    </div>

    ${a?`
      <div style="margin-bottom:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--r-sm);padding:10px 14px">
        <strong style="color:var(--red-500);font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:2px">${n?"Client's Revision Request / Notes:":"Client's Previous Denial Reason:"}</strong>
        <div style="font-size:12.5px;color:var(--text-1)">"${escapeHtml(a)}"</div>
      </div>
    `:""}

    <div class="field" style="margin-bottom:12px">
      <label for="mEmpResubNotes" style="font-weight:700">Resubmission / Correction Notes</label>
      <input type="text" id="mEmpResubNotes" placeholder="e.g. Corrected design according to feedback, updated live website link..." style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px" />
    </div>

    <div class="field" style="margin-bottom:12px">
      <label for="mEmpResubUrl" style="font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
      <input type="url" id="mEmpResubUrl" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px" />
      <span style="font-size:11px;color:var(--text-4)">For live websites, applications, Figma links or cloud files</span>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpResubUp",label:"Upload Corrected Files (Optional if URL provided)",subtitle:"Upload corrected exports, PDFs, images or archive files"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpResubCancel">Cancel</button>
      <button class="btn gold" id="mEmpResubConfirm" style="font-weight:700">🔁 Resubmit to Client for Approval</button>
    </div>
  `);bindAttachmentUploader("mEmpResubUp"),r.querySelector("#mEmpResubCancel").onclick=()=>r.remove(),r.querySelector("#mEmpResubConfirm").onclick=async()=>{const d=r.querySelector("#mEmpResubNotes").value.trim(),g=r.querySelector("#mEmpResubUrl").value.trim(),v=getUploaderAttachments("mEmpResubUp"),c=r.querySelector("#mEmpResubConfirm");c.disabled=!0,c.textContent="Resubmitting…";try{await apiPost(`/jobs/${t}/resubmit`,{notes:d,url:g,deliverables:v}),flashToast("Job resubmitted to client for re-approval! 🔁🎉"),r.remove(),x()}catch(l){flashToast(l.message,!0),c.disabled=!1,c.textContent="🔁 Resubmit to Client for Approval"}}}
