import{f as M,d as N,n as O,o as q}from"./api-FGezNYCI.js";import{initProposalStudio as j}from"./proposals-4cMLzKY7.js";import{i as F,a as W,b as G}from"./supporttickets-DUhBU_Bq.js";let u=null,w={personnel:[],clients:[],services:[]},l={tab:"dashboard",period:"month"};async function V(){if(initTheme(),u=requireAuth("employee"),!u)return;const[e,t,s]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services"),N().catch(()=>{})]);w.personnel=e,w.clients=t,w.services=s,A()}function R(e){const t=w.clients.find(s=>s._id===e);return t?t.name:"—"}function Q(){return u&&(/mansi/i.test(u.name)||/urna/i.test(u.name))}function Y(){return[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"myjobs",label:"My Jobs",icon:"📋"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"billing_dashboard",label:"Accounts & Billing",icon:"💳",href:"/accounts"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Settings & Manage",icon:"⚙️"},{key:"settings",label:"Settings",icon:"⚙️"}]}function A(){const e=document.getElementById("app"),t=Y(),s=M("employee",t,!1),i=s.find(r=>r.key===l.tab)||s[0];s.some(r=>r.key===l.tab)||(l.tab=i?i.key:"dashboard"),e.innerHTML=renderAppShell({user:u,currentRole:"employee",activeTab:l.tab,tabs:s,title:i?i.label:"Overview Dashboard",subtitle:Q()?"Lead Workspace · Mansi & Urna Management":"Employee Workspace & Productivity Dashboard"}),bindAppShellEvents(r=>{if(r==="accounts_redirect"||r==="billing_dashboard"){window.location.href="/accounts";return}l.tab=r,A()}),k()}window.ci360NavTab=(e,t=null)=>{if(e==="accounts_redirect"||e==="billing_dashboard"){window.location.href="/accounts";return}e==="tasks"||e==="mytasks"||e==="dailytasks"?e="dailytasks":e==="target"||e==="targets"?e="targets":e==="proposal"||e==="proposals"?e="proposals":e==="teambonding"||e==="bonding"||e==="arcade"||e==="chat"?e="teambonding":e==="tickets"||e==="supporttickets"||e==="ticket"?e="tickets":(e==="dashboard"||e==="overview")&&(e="dashboard");let s=null;t&&typeof t=="object"&&(s=t,t=s.highlightId||null),l.tabParams=s||{},l.tab=e,t&&(l.highlightId=t),A()};async function k(e=!1){const t=document.getElementById("content");if(t){!e&&!t.dataset.loaded&&(t.innerHTML=renderSkeletonCards(3)),t.dataset.loaded="true";try{if(l.tab==="dashboard")await U(t);else if(l.tab==="myjobs")await B(t,!1);else if(l.tab==="jobs")await B(t,!0);else if(l.tab==="logjob")C(t);else if(l.tab==="dailytasks"||l.tab==="mytasks"||l.tab==="tasks")await ve(t);else if(l.tab==="tickets"||l.tab==="supporttickets"||l.tab==="ticket")await Z(t);else if(l.tab==="billing_dashboard"){window.location.href="/accounts";return}else l.tab==="proposals"||l.tab==="proposal"?await K(t):l.tab==="teambonding"||l.tab==="bonding"?await X(t):l.tab==="byclient"?await ie(t):l.tab==="byperson"?await oe(t):l.tab==="accounts"?await ne(t):l.tab==="targets"||l.tab==="target"?await ue(t):l.tab==="salaries"?await le(t):l.tab==="users"?await re(t):l.tab==="settings"||l.tab==="manage"?await ee(t):(l.tab="dashboard",await U(t))}catch(s){t.innerHTML=renderEmptyState("Something went wrong",s.message,"⚠️")}}}async function K(e){e.innerHTML='<div id="proposals-module-root"></div>';const t=e.querySelector("#proposals-module-root");j(t,{userRole:"employee",currentUser:u})}async function X(e){e.innerHTML='<div id="teambonding-module-root"></div>';const t=e.querySelector("#teambonding-module-root");G(t,{userRole:"employee",currentUser:u})}async function Z(e){e.innerHTML='<div id="support-tickets-module-root"></div>';const t=e.querySelector("#support-tickets-module-root"),s=l.tabParams||{};W(t,{userRole:"employee",currentUser:u,initialJobId:s.jobId||null})}async function ee(e){e.innerHTML=`
    <div style="padding:8px 0 24px 0;">
      ${O({title:"Employee Account & Security",subtitle:"Manage your personal login email, display name, and password"})}
    </div>
  `,q(e)}function te(){return renderPeriodPicker(l.period)}function se(){document.querySelectorAll("[data-period]").forEach(e=>{e.onclick=()=>{l.period=e.dataset.period,k()}})}async function U(e){const[t,s,i]=await Promise.all([apiGet("/dashboard/employee?period="+l.period).catch(()=>({stats:{},person:{},recentJobs:[],accounts:[]})),apiGet("/jobs?mine=true").catch(()=>[]),apiGet("/tasks").catch(()=>[])]),r=t.person||{},m=r.name||u?.name||"Team Member",b=r.duties||"Creative Specialist",a=Number(r.capacity)||48,c=t.stats||{hours:0,revenue:0,utilization:0,label:"Optimal",badge:"green"},v=s||[],o=v.filter(n=>n.status==="Completed"||n.clientApproval&&n.clientApproval.status==="Approved"||n.completionDate),d=v.filter(n=>!n.completionDate&&n.status!=="Completed"&&(!n.clientApproval||n.clientApproval.status!=="Approved")),g=v.filter(n=>n.clientApproval&&n.clientApproval.status==="Revision Requested"),x=d.filter(n=>n.priority==="Urgent");d.filter(n=>n.priority==="High");const y=new Date().toISOString().slice(0,10),h=(i||[]).filter(n=>n.date?n.date.slice(0,10)===y:!0),$=h.filter(n=>n.status==="Completed"),f=h.filter(n=>n.status!=="Completed"),E=h.length>0?Math.round($.length/h.length*100):100,S=t.accounts||[];e.innerHTML=`
    <div class="block employee-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Employee Profile Hero Card -->
      <div class="card employee-hero-card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.05) 50%, rgba(16,185,129,0.05) 100%);border:1px solid rgba(99,102,241,0.22);border-radius:var(--r-xl);padding:24px 28px;margin-bottom:24px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
          
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:56px;height:56px;border-radius:var(--r-lg);background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(79,70,229,0.4);flex-shrink:0">
              ${m.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(m)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(b)}</span>
                <span class="badge ${c.badge||"green"}" style="font-size:11px;font-weight:700">● ${escapeHtml(c.label||"Optimal Pace")}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Personal Workspace &amp; Performance Radar · Standard Capacity: <strong>${a}h / week</strong>
              </p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn primary" id="btnEmpQuickJobs" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md)">
              <span>📋</span> My Jobs (${v.length})
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
      ${x.length>0||g.length>0?`
        <div class="card" style="background:linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.06) 100%);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <span style="font-size:24px">⚡</span>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                High Priority Focus Items
              </div>
              <div style="font-size:13px;color:var(--text-2);display:flex;gap:12px;flex-wrap:wrap">
                ${x.length>0?`<span style="color:var(--red);font-weight:700">🔴 ${x.length} Urgent Job(s)</span>`:""}
                ${g.length>0?`<span style="color:var(--amber-500);font-weight:700">↺ ${g.length} Revision Request(s)</span>`:""}
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
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${Number(c.utilization||0).toFixed(0)}%</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${Number(c.hours||0).toFixed(1)} hrs tracked this period</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active Workload</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${d.length}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${o.length} completed deliverables</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Today's Task Progress</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${$.length} <span style="font-size:18px;font-weight:600;color:var(--text-4)">/ ${h.length}</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${E}% of today's checklist completed</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Value Output Tracked</div>
              <div style="font-size:20px">💰</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${fmtINR(c.revenue||0)}</div>
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${f.length} pending · ${$.length} done</p>
            </div>
            <button class="btn secondary small" onclick="ci360NavTab('dailytasks')" style="font-size:12px">
              Open Checklist →
            </button>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom:16px">
            <div style="width:100%;height:8px;background:var(--border-sm);border-radius:8px;overflow:hidden">
              <div style="width:${E}%;height:100%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:8px;transition:width 0.4s ease"></div>
            </div>
          </div>

          ${h.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${h.slice(0,5).map(n=>{const T=n.status==="Completed";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <span style="font-size:16px">${T?"✅":"⚪"}</span>
                      <span style="font-size:13px;font-weight:600;color:${T?"var(--text-4)":"var(--text-1)"};${T?"text-decoration:line-through":""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                        ${escapeHtml(n.title||"Task")}
                      </span>
                    </div>
                    <span class="badge ${n.priority==="Urgent"?"red":n.priority==="High"?"amber":"gray"}" style="font-size:10.5px">
                      ${escapeHtml(n.priority||"Normal")}
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${S.length} active client accounts on roster</p>
            </div>
            <span class="badge gold" style="font-weight:700">${S.length} Accounts</span>
          </div>

          ${S.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${S.slice(0,5).map(n=>{const D=(w.clients.find(z=>String(z._id)===String(n.clientId))||{}).name||"Client Account";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0">
                        ${D.slice(0,2).toUpperCase()}
                      </div>
                      <div style="min-width:0">
                        <div style="font-size:13.5px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(D)}</div>
                        <div style="font-size:11px;color:var(--text-4)">${escapeHtml(n.nature||"Retainer")} · ${escapeHtml(n.difficulty||"Normal")}</div>
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
            View All Jobs (${v.length}) →
          </button>
        </div>

        ${v.length>0?`
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
                ${v.slice(0,6).map(n=>{const T=n.status==="Completed"||n.clientApproval&&n.clientApproval.status==="Approved"||n.completionDate,D=n.clientApproval&&n.clientApproval.status==="Revision Requested",z=n.clientId?.name||R(n.clientId)||"Client",L=n.priority==="Urgent"?"red":n.priority==="High"?"amber":"gray";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('myjobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(n.title||"Untitled Job")}
                      </td>
                      <td>
                        <span class="badge blue" style="font-size:11px">${escapeHtml(z)}</span>
                      </td>
                      <td>
                        <span class="badge ${L}" style="font-size:11px;font-weight:700">${escapeHtml(n.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(n.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${n.completionDate?fmtDate(n.completionDate):"—"}</td>
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
  `;const H=document.getElementById("btnEmpQuickJobs");H&&(H.onclick=()=>{l.tab="myjobs",A()});const P=document.getElementById("btnEmpQuickTasks");P&&(P.onclick=()=>{l.tab="dailytasks",A()});const _=document.getElementById("btnEmpQuickProposals");_&&(_.onclick=()=>{l.tab="proposals",A()}),document.querySelectorAll("#empOverviewPeriodWrapper [data-period]").forEach(n=>{n.onclick=()=>{l.period=n.dataset.period,k()}})}async function B(e,t=!1){const s=t?"/jobs":"/jobs?mine=true",i=await apiGet(s),r={Medium:"gray",High:"amber",Urgent:"red"},m=t?"All Jobs":"My Jobs",b=t?"No jobs have been logged in the system yet.":"Jobs assigned to you by admins will appear here.";if(i.length===0){e.innerHTML=`
      <div class="block">
        <h2>${m} <span class="eyebrow">No jobs found</span></h2>
        ${renderEmptyState(t?"No jobs found":"No jobs assigned yet",b,"📋")}
      </div>`;return}if(e.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h2 style="margin:0">${m} <span class="eyebrow">${i.length} total</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--text-3)">Click the date or 💾 to save completion date</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${i.map(a=>{const c=(a.assignments||[]).find(f=>String(f.personId)===String(u.personnelId._id||u.personnelId)),v=String(a.createdBy)===String(u._id),o=a.status==="Denied"||a.clientApproval&&a.clientApproval.status==="Denied",d=a.status==="Completed"&&!o,g=a.clientApproval&&a.clientApproval.status==="Approved"&&!o,x=a.clientApproval&&a.clientApproval.status==="Revision Requested"&&!o,y=!g&&!o&&!x&&!!(a.clientApproval&&a.clientApproval.isRevised),h=a.completionDate?new Date(a.completionDate).toISOString().slice(0,10):"",$=r[a.priority||"Medium"]||"gray";return`
          <div class="job-card" id="job-card-${a._id}" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${o?"var(--red-500)":g?"var(--green-500)":x?"var(--amber-500)":y?"var(--brand-500)":d?"var(--green-500)":"var(--brand-500)"}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(a.title||"Untitled Job")}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${o?"red":d?"green":"amber"}">${o?"❌ Denied by Client":d?"✓ Completed":"⏳ In Progress"}</span>
                  ${g?`<span class="badge green">✓ Client Approved ${a.clientApproval.rating?`(${a.clientApproval.rating}★)`:""}</span>`:""}
                  ${x?'<span class="badge red">↺ Revision Requested</span>':""}
                  ${y?'<span class="badge blue">📦 Revised — Awaiting Client Re-approval</span>':""}
                  <span class="badge ${$}">${escapeHtml(a.priority||"Medium")}</span>
                  ${(a.serviceNames||[]).map(f=>`<span class="badge gray">${escapeHtml(f)}</span>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                <button type="button" class="btn ghost small emp-job-ticket-btn" data-id="${a._id}" title="Support Tickets linked to this Job" style="font-size:12px">
                  🎫 Ticket
                </button>
                ${o||x?`
                  <button type="button" class="btn gold small emp-resubmit-btn" data-id="${a._id}" data-title="${escapeHtml(a.title||"Job")}" data-reason="${escapeHtml(a.clientApproval?.feedback||a.clientApproval?.deniedReason||"")}" data-type="${x?"revision":"denial"}" style="font-weight:700;font-size:12px">
                    🔁 Resubmit Job
                  </button>
                `:`
                  <!-- Toggle Status -->
                  <button type="button" class="btn ${d?"secondary":"primary"} small"
                          onclick="toggleStatus('${a._id}', ${!d})"
                          style="font-size:12px">
                    ${d?"↩ Reopen":"✓ Mark Done"}
                  </button>
                `}
                ${v?`<button type="button" class="btn danger small" onclick="delJob('${a._id}')">Delete</button>`:""}
              </div>
            </div>

            <!-- Denied Alert Box for Employee -->
            ${o?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>❌</span> Job Denied by Client (${escapeHtml(a.clientApproval?.deniedBy||"Client")})
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(a.clientApproval?.deniedAt||a.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;border-left:3px solid var(--red-500);line-height:1.4">
                  <strong style="color:var(--red-500);font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Reason for Denial:</strong>
                  "${escapeHtml(a.clientApproval?.deniedReason||a.clientApproval?.feedback||"Job denied")}"
                </div>
                <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px dashed rgba(239,68,68,0.25)">
                  <span style="font-size:12px;color:var(--text-3)">Review client's reason above, then resubmit:</span>
                  <button type="button" class="btn gold small emp-resubmit-btn" data-id="${a._id}" data-title="${escapeHtml(a.title||"Job")}" data-reason="${escapeHtml(a.clientApproval?.deniedReason||"")}" style="font-weight:700">
                    🔁 Resubmit Work to Client
                  </button>
                </div>
              </div>
            `:""}

            <!-- Revision Requested Alert Box for Employee -->
            ${x?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate((a.clientApproval.revisions||[]).slice(-1)[0]?.requestedAt||a.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(a.clientApproval.feedback||"Revision requested")}"
                </div>
                ${(a.clientApproval.revisions||[]).slice(-1)[0]?.attachments?.length?`
                  <div style="margin-top:8px">
                    ${renderAttachmentChips(a.clientApproval.revisions.slice(-1)[0].attachments,{title:"Client Reference Markups"})}
                  </div>
                `:""}
                <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px dashed rgba(239,68,68,0.25)">
                  <span style="font-size:12px;color:var(--text-3)">Review client's revision notes above, make corrections, then resubmit:</span>
                  <button type="button" class="btn gold small emp-resubmit-btn" data-id="${a._id}" data-title="${escapeHtml(a.title||"Job")}" data-reason="${escapeHtml(a.clientApproval?.feedback||"")}" data-type="revision" style="font-weight:700">
                    🔁 Resubmit Revised Work to Client
                  </button>
                </div>
              </div>
            `:""}

            <!-- Details grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:14px">
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Client</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(R(a.clientId))}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Start Date</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${fmtDate(a.date)}</div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Target End Date (Admin / Client)</div>
                <div style="font-size:13px;font-weight:700;color:${a.completionDate?"var(--brand-600)":"var(--text-4)"}">
                  ${a.completionDate?`📅 ${fmtDate(a.completionDate)}`:"— Not Specified —"}
                </div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Your Logged Hours</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${c?fmtHours(c.hours):"0 hrs"}</div>
              </div>
              ${a.description?`
              <div style="grid-column:1 / -1">
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Description</div>
                <div style="font-size:12.5px;color:var(--text-2);line-height:1.5">${escapeHtml(a.description)}</div>
              </div>`:""}
            </div>

            <!-- Brief Attachments & Deliverables Section -->
            ${a.attachments&&a.attachments.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(a.attachments))}">
                ${renderAttachmentChips(a.attachments,{title:"Job Brief & Reference Files"})}
              </div>
            `:""}

            ${a.deliverables&&a.deliverables.length?`
              <div data-attachments="${encodeURIComponent(JSON.stringify(a.deliverables))}">
                ${renderAttachmentChips(a.deliverables,{title:"Finished Deliverables & Completed Artifacts"})}
              </div>
            `:""}

            <!-- Deliverable Uploader for Employee -->
            <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-size:12.5px;font-weight:700;color:var(--text-1)">📦 Submit Finished Deliverable / Work Artifact</span>
                <button type="button" class="btn ghost small emp-del-toggle" data-id="${a._id}" style="padding:2px 8px;font-size:11px">+ Add Deliverables</button>
              </div>
              <div class="emp-del-form" id="empDelForm-${a._id}" style="display:none;margin-top:10px">
                <div class="field" style="margin-bottom:8px">
                  <label style="font-size:11.5px">Deliverable Notes / Version Details</label>
                  <input type="text" id="empDelNotes-${a._id}" placeholder="e.g. Final Website build, Video Render v2, Figma export link..." style="font-size:12.5px;padding:6px 10px" />
                </div>
                <div class="field" style="margin-bottom:10px">
                  <label style="font-size:11.5px;font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
                  <input type="url" id="empDelUrl-${a._id}" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="font-size:12.5px;padding:6px 10px;width:100%;box-sizing:border-box" />
                  <span style="font-size:10.5px;color:var(--text-4)">For website builds, web apps, Figma designs or cloud links</span>
                </div>
                ${renderAttachmentUploader({id:"empDelUp-"+a._id,label:"Completed Files (Optional if URL provided)",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, images or zip packages"})}
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px">
                  <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
                    <input type="checkbox" id="empDelMarkComplete-${a._id}" ${d?"":"checked"} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
                    <span>Mark Work as Completed &amp; Send to Client for Approval</span>
                  </label>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn ghost small emp-del-cancel" data-id="${a._id}">Cancel</button>
                    <button type="button" class="btn gold small emp-del-submit" data-id="${a._id}">Submit Deliverables</button>
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
                data-id="${a._id}"
                value="${h}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${a._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${h?`<span class="badge green" style="margin-left:auto">Committed Delivery: ${h}</span>`:'<span class="badge gray" style="margin-left:auto">No Date Set</span>'}
            </div>
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".emp-completion-date").forEach(a=>{a.addEventListener("focus",()=>{a.style.borderColor="var(--border-focus)",a.style.boxShadow="0 0 0 3px var(--accent-ring)"}),a.addEventListener("blur",()=>{a.style.borderColor="",a.style.boxShadow=""})}),i.forEach(a=>{bindAttachmentUploader("empDelUp-"+a._id)}),document.querySelectorAll(".emp-del-toggle").forEach(a=>{a.onclick=()=>{const c=document.getElementById("empDelForm-"+a.dataset.id);if(c){const v=c.style.display==="none";c.style.display=v?"block":"none",a.textContent=v?"✕ Close":"+ Add Deliverables"}}}),document.querySelectorAll(".emp-del-cancel").forEach(a=>{a.onclick=()=>{const c=document.getElementById("empDelForm-"+a.dataset.id);c&&(c.style.display="none");const v=document.querySelector(`.emp-del-toggle[data-id="${a.dataset.id}"]`);v&&(v.textContent="+ Add Deliverables")}}),document.querySelectorAll(".emp-resubmit-btn").forEach(a=>{a.onclick=()=>be(a.dataset.id,a.dataset.title,a.dataset.reason,a.dataset.type)}),document.querySelectorAll(".emp-job-ticket-btn").forEach(a=>{a.onclick=()=>{window.ci360NavTab("tickets",{jobId:a.dataset.id})}}),document.querySelectorAll(".emp-del-submit").forEach(a=>{a.onclick=async()=>{const c=a.dataset.id,v=getUploaderAttachments("empDelUp-"+c),o=(document.getElementById("empDelNotes-"+c)||{}).value?.trim()||"",d=(document.getElementById("empDelUrl-"+c)||{}).value?.trim()||"",g=document.getElementById("empDelMarkComplete-"+c)?.checked||!1,x=v.map(y=>({...y,notes:o}));if(d){let y=d;/^https?:\/\//i.test(y)||(y="https://"+y),x.unshift({name:o?`${o} (Live URL)`:"Live Deliverable URL / Website",url:y,type:"url",size:0,notes:o||"Live URL"})}if(!x.length){flashToast("Please enter a deliverable URL or attach files",!0);return}a.disabled=!0,a.textContent="Submitting…";try{await apiPost(`/jobs/${c}/deliverables`,{deliverables:x,markComplete:g}),flashToast(g?"Deliverables submitted & sent to Client for Approval! 📦🎉":"Deliverables submitted successfully! 📦"),k()}catch(y){flashToast(y.message,!0)}finally{a.disabled=!1,a.textContent="Submit Deliverables"}}}),l.highlightId){const a=l.highlightId;delete l.highlightId,setTimeout(()=>{const c=document.getElementById("job-card-"+a);c&&(c.scrollIntoView({behavior:"smooth",block:"center"}),c.classList.add("pulse-highlight"),setTimeout(()=>c.classList.remove("pulse-highlight"),2200))},150)}}let p={title:"",assignments:[],serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]};function I(){const e=(w.personnel||[]).find(t=>String(t._id)===String(u?.personnelId?._id||u?.personnelId));return[{personId:e?e._id:w.personnel&&w.personnel[0]?w.personnel[0]._id:"",percent:100,hours:""}]}function C(e){(!p.assignments||!p.assignments.length)&&(p.assignments=I());const t=p.assignments.reduce((s,i)=>s+(Number(i.percent)||0),0);e.innerHTML=`
    <section class="block">
      <div style="margin-bottom:20px;">
        <h2 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:4px;border:none;padding:0;">Log New Job & Work Deliverable</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Record client deliverables, services provided, financial value, and team hour attributions.</p>
      </div>

      <div class="card log-job-card" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:24px;">
        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">1. Client & Timeline</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>CLIENT *</label>
            <div class="select-with-btn">
              <select id="ejClient">
                <option value="">Select client…</option>
                ${(w.clients||[]).map(s=>`<option value="${s._id}" ${s._id===p.clientId?"selected":""}>${escapeHtml(s.name)}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="log-job-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="ejDate" value="${p.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="ejCompletion" value="${p.completion||""}">
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">2. Deliverable & Financials</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>SERVICE(S) DELIVERED *</label>
            <div class="select-with-btn">
              <select id="ejService">
                <option value="">Select service to add…</option>
                ${(w.services||[]).map(s=>`<option value="${s._id}">${escapeHtml(s.name)}</option>`).join("")}
              </select>
            </div>
            ${p.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${p.serviceIds.map(s=>{const i=(w.services||[]).find(r=>r._id===s);return i?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(i.name)}
                      <span class="remove-service-tag" data-id="${i._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `:""}).join("")}
              </div>
            `:""}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB TITLE (OPTIONAL — AUTO-GENERATES IF BLANK)</label>
            <input type="text" id="ejTitle" value="${escapeHtml(p.title||"")}" placeholder="e.g. Brand Redesign & Social Campaign">
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="ejValue" value="${p.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="ejDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(p.desc||"")}</textarea>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">3. Team Work Allocation & Hours</h3>
          <div class="people-assigned-box">
            <div class="people-assigned-headers" style="display:grid;grid-template-columns:2fr 1fr 1fr 40px;gap:12px;font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:8px;">
              <div>TEAM MEMBER</div>
              <div>% OF WORK</div>
              <div>HOURS SPENT</div>
              <div></div>
            </div>
            <div id="eAssignRows">
              ${p.assignments.map((s,i)=>`
                <div class="person-assign-row" data-idx="${i}" style="display:grid;grid-template-columns:2fr 1fr 1fr 40px;gap:12px;align-items:center;margin-bottom:8px;">
                  <div class="field" style="margin-bottom:0;">
                    <select class="ea-person">
                      <option value="">Select…</option>
                      ${(w.personnel||[]).map(r=>`<option value="${r._id}" ${r._id===s.personId?"selected":""}>${escapeHtml(r.name)}${r.duties?` (${escapeHtml(r.duties)})`:""}</option>`).join("")}
                    </select>
                  </div>
                  <div class="field" style="margin-bottom:0;">
                    <input type="number" class="ea-percent" value="${s.percent!=null?s.percent:""}" placeholder="100" min="0" max="100">
                  </div>
                  <div class="field" style="margin-bottom:0;">
                    <input type="number" class="ea-hours" value="${s.hours||""}" placeholder="e.g. 3.5" min="0" step="0.5">
                  </div>
                  <div style="display:flex;justify-content:center;">
                    <button class="btn-remove-person ea-remove" type="button" title="Remove person" style="background:transparent;border:none;color:var(--red-500);cursor:pointer;font-size:16px;">✕</button>
                  </div>
                </div>
              `).join("")}
            </div>
            <button class="btn ghost small" id="eAddAssignRow" type="button" style="margin-top:10px;">+ Add Team Member</button>
            <div style="margin-top:14px;">
              <div class="assign-total ${t!==100?"warn":""}" style="font-size:12px;display:flex;align-items:center;gap:6px;color:${t===100?"var(--green-500)":"var(--amber-500)"};">
                <span>${t===100?"✓":"⚠️"}</span>
                <span>${t}% of work allocated ${t!==100?"— should total 100%":"(100% Complete)"}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">4. Briefs & File Attachments</h3>
          ${renderAttachmentUploader({id:"ejAttachments",label:"Briefs & Reference Assets",subtitle:"Upload briefs, design mockups, agreements, logos or source files"})}
        </div>

        <div class="form-actions" style="display:flex;gap:12px;justify-content:flex-end;">
          <button class="btn ghost" id="eClearJobBtn" type="button">Reset Draft</button>
          <button class="btn gold" id="eSaveJobBtn" type="button" style="padding:10px 28px;font-size:14px;">Save Job & Dispatch Notifications</button>
        </div>
      </div>
    </section>
  `,ae(e)}function ae(e){const t=document.getElementById("ejClient");t&&(t.onchange=d=>p.clientId=d.target.value);const s=document.getElementById("ejDate");s&&(s.onchange=d=>p.date=d.target.value);const i=document.getElementById("ejCompletion");i&&(i.onchange=d=>p.completion=d.target.value);const r=document.getElementById("ejTitle");r&&(r.oninput=d=>p.title=d.target.value);const m=document.getElementById("ejValue");m&&(m.oninput=d=>p.value=d.target.value);const b=document.getElementById("ejDesc");b&&(b.oninput=d=>p.desc=d.target.value);const a=document.getElementById("ejService");a&&(a.onchange=d=>{const g=d.target.value;g&&!p.serviceIds.includes(g)&&(p.serviceIds.push(g),C(e))}),e.querySelectorAll(".remove-service-tag").forEach(d=>{d.onclick=g=>{g.stopPropagation();const x=d.dataset.id;p.serviceIds=p.serviceIds.filter(y=>y!==x),C(e)}}),e.querySelectorAll(".person-assign-row").forEach(d=>{const g=Number(d.dataset.idx),x=d.querySelector(".ea-person");x&&(x.onchange=f=>{p.assignments[g]&&(p.assignments[g].personId=f.target.value)});const y=d.querySelector(".ea-percent");y&&(y.oninput=f=>{p.assignments[g]&&(p.assignments[g].percent=f.target.value)});const h=d.querySelector(".ea-hours");h&&(h.oninput=f=>{p.assignments[g]&&(p.assignments[g].hours=f.target.value)});const $=d.querySelector(".ea-remove");$&&($.onclick=()=>{p.assignments.length>1&&(p.assignments.splice(g,1),C(e))})});const c=document.getElementById("eAddAssignRow");c&&(c.onclick=()=>{p.assignments.push({personId:"",percent:0,hours:""}),C(e)}),bindAttachmentUploader("ejAttachments",{existing:p.attachments||[]});const v=document.getElementById("eClearJobBtn");v&&(v.onclick=()=>{p={title:"",assignments:I(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("ejAttachments",[]),C(e)});const o=document.getElementById("eSaveJobBtn");o&&(o.onclick=async()=>{try{if(!p.clientId){flashToast("Please select a client",!0);return}if(!p.serviceIds||!p.serviceIds.length){flashToast("Please select at least one service",!0);return}const d=p.assignments.filter(f=>f.personId);if(!d.length){flashToast("Please assign at least one person",!0);return}for(const f of d)if(f.hours===""||f.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const g=(w.clients||[]).find(f=>f._id===p.clientId),y=(w.services||[]).filter(f=>p.serviceIds.includes(f._id)).map(f=>f.name).join(", "),h=p.title||(g?`${g.name} — ${y||"Deliverable"}`:y||"Untitled Job"),$=getUploaderAttachments("ejAttachments");await apiPost("/jobs",{title:h,clientId:p.clientId,serviceIds:p.serviceIds,date:p.date||new Date().toISOString().slice(0,10),completionDate:p.completion||null,value:Number(p.value)||0,description:p.desc||"",assignments:d,attachments:$}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),p={title:"",assignments:I(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},l.tab="myjobs",A()}catch(d){flashToast(d.message,!0)}})}async function ie(e){try{const t=await apiGet("/dashboard/admin?period="+l.period);e.innerHTML=`
      <section class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <h2 style="margin:0;">By Client <span class="eyebrow">${(t.clients||[]).length} clients</span></h2>
        </div>
        <div class="grid grid-3">
          ${(t.clients||[]).map(s=>`
            <div class="card" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:18px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:12px;color:var(--text-1);">${escapeHtml(s.name)}</h3>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px;"><span style="color:var(--text-3);">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px;"><span style="color:var(--text-3);">Jobs</span><strong>${s.jobCount}</strong></div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px;"><span style="color:var(--text-3);">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
              <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-3);">Team Members</span><strong>${s.peopleCount}</strong></div>
            </div>
          `).join("")||renderEmptyState("No clients found","No client records available for this period.","💼")}
        </div>
      </section>
    `}catch(t){e.innerHTML=renderEmptyState("Unable to load client analytics",t.message,"💼")}}async function oe(e){try{const t=await apiGet("/dashboard/admin?period="+l.period);e.innerHTML=`
      <section class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <h2 style="margin:0;">By Person <span class="eyebrow">${(t.personnel||[]).length} team members</span></h2>
        </div>
        <div class="card table-card" style="padding:0;overflow:hidden;background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:20px;">Person</th>
                  <th>Duties</th>
                  <th>Status</th>
                  <th class="num">Hours</th>
                  <th class="num">Utilization</th>
                  <th class="num">Jobs</th>
                  <th class="num" style="padding-right:20px;">Work Credit</th>
                </tr>
              </thead>
              <tbody>
                ${(t.personnel||[]).map(s=>`
                  <tr>
                    <td style="padding-left:20px;"><strong>${escapeHtml(s.name)}</strong></td>
                    <td><span style="color:var(--text-3);font-size:12px;">${escapeHtml(s.duties||"—")}</span></td>
                    <td><span class="badge ${s.status==="active"?"green":"amber"}">${escapeHtml(s.status||"active")}</span></td>
                    <td class="num">${fmtHours(s.hours)}</td>
                    <td class="num">${s.utilization}%</td>
                    <td class="num">${s.jobCount}</td>
                    <td class="num" style="padding-right:20px;"><strong>${fmtINR(s.credit)}</strong></td>
                  </tr>
                `).join("")||'<tr><td colspan="7" style="text-align:center;padding:24px;">No team member records found</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `}catch(t){e.innerHTML=renderEmptyState("Unable to load team member analytics",t.message,"👥")}}async function ne(e){try{const t=await apiGet("/roster");e.innerHTML=`
      <section class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <h2 style="margin:0;">Client Roster <span class="eyebrow">${t.length} accounts</span></h2>
        </div>
        <div class="card table-card" style="padding:0;overflow:hidden;background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:20px;">Client</th>
                  <th>Nature</th>
                  <th>Strategy</th>
                  <th>CS</th>
                  <th>Website</th>
                  <th>Design</th>
                  <th>Copy</th>
                  <th>Edit</th>
                  <th>Shoot</th>
                  <th>SEO</th>
                  <th>SMO</th>
                  <th>QC</th>
                  <th class="num" style="padding-right:20px;">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                ${t.map(s=>`
                  <tr>
                    <td style="padding-left:20px;"><strong>${escapeHtml(R(s.clientId))}</strong></td>
                    <td><span class="badge ${s.nature==="Existing"?"green":"blue"}">${escapeHtml(s.nature||"Existing")}</span></td>
                    <td>${escapeHtml(s.roles&&s.roles.strategy||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.cs||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.website||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.design||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.copy||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.edit||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.shoot||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.seo||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.smo||"—")}</td>
                    <td>${escapeHtml(s.roles&&s.roles.qc||"—")}</td>
                    <td class="num" style="padding-right:20px;"><span class="badge ${s.difficulty>=9?"red":s.difficulty>=7?"amber":"green"}">${s.difficulty||5}</span></td>
                  </tr>
                `).join("")||'<tr><td colspan="13" style="text-align:center;padding:24px;">No client roster entries found</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `}catch(t){e.innerHTML=renderEmptyState("Unable to load client roster",t.message,"🏢")}}async function le(e){try{const t=await apiGet("/salary");e.innerHTML=`
      <section class="block">
        <h2>Salaries &amp; Compensation</h2>
        <div class="card table-card" style="padding:0;overflow:hidden;background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:20px;">Person</th>
                  <th class="num">Monthly Base</th>
                  <th class="num" style="padding-right:20px;">Annual CTC</th>
                </tr>
              </thead>
              <tbody>
                ${(t||[]).map(s=>`
                  <tr>
                    <td style="padding-left:20px;"><strong>${escapeHtml(s.personName||s.name||"Team Member")}</strong></td>
                    <td class="num">${fmtINR(s.monthlySalary||s.salary||0)}</td>
                    <td class="num" style="padding-right:20px;"><strong>${fmtINR((s.monthlySalary||s.salary||0)*12)}</strong></td>
                  </tr>
                `).join("")||'<tr><td colspan="3" style="text-align:center;padding:24px;">No salary records available</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `}catch{e.innerHTML=renderEmptyState("Access Restricted","Salary details require superadmin authorization.","💰")}}async function re(e){try{const t=await apiGet("/users");e.innerHTML=`
      <section class="block">
        <h2>Users Directory</h2>
        <div class="card table-card" style="padding:0;overflow:hidden;background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:20px;">User Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style="padding-right:20px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${(t||[]).map(s=>`
                  <tr>
                    <td style="padding-left:20px;"><strong>${escapeHtml(s.name)}</strong></td>
                    <td>${escapeHtml(s.email||s.username||"—")}</td>
                    <td><span class="badge blue">${escapeHtml(s.role||"user")}</span></td>
                    <td style="padding-right:20px;"><span class="badge ${s.status==="disabled"?"red":"green"}">${escapeHtml(s.status||"active")}</span></td>
                  </tr>
                `).join("")||'<tr><td colspan="4" style="text-align:center;padding:24px;">No users found</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `}catch{e.innerHTML=renderEmptyState("Access Restricted","User management requires administrative privileges.","👤")}}let de={date:new Date().toISOString().slice(0,10),filter:"all",search:""};async function pe(){try{const e=await apiGet("/tasks");if(Array.isArray(e))return localStorage.setItem("ci360_tasks_"+(u?._id||"user"),JSON.stringify(e)),e}catch(e){console.warn("Backend /api/tasks offline, using local fallback:",e)}try{const e=localStorage.getItem("ci360_tasks_"+(u?._id||"user"));return e?JSON.parse(e):[]}catch{return[]}}async function ce(e,t=null){let s=null;try{t?s=await apiPut("/tasks/"+t,e):s=await apiPost("/tasks",e)}catch(r){console.warn("API task save failed, writing local backup:",r)}let i=[];try{const r=localStorage.getItem("ci360_tasks_"+(u?._id||"user"));i=r?JSON.parse(r):[]}catch{}if(t){const r=i.findIndex(m=>m._id===t);r>=0&&(i[r]=s||{...i[r],...e,updatedAt:new Date})}else s||(s={_id:"loc_"+Date.now(),...e,createdAt:new Date,completedAt:e.status==="Completed"?new Date:null}),i.unshift(s);return localStorage.setItem("ci360_tasks_"+(u?._id||"user"),JSON.stringify(i)),s}async function me(e){try{await apiDelete("/tasks/"+e)}catch(t){console.warn("API task delete failed, updating storage:",t)}try{const t=localStorage.getItem("ci360_tasks_"+(u?._id||"user"));let s=t?JSON.parse(t):[];s=s.filter(i=>i._id!==e),localStorage.setItem("ci360_tasks_"+(u?._id||"user"),JSON.stringify(s))}catch{}}async function ge(e){try{return await apiPatch("/tasks/"+e+"/toggle",{})}catch(t){console.warn("API toggle failed, toggling locally:",t)}try{const t=localStorage.getItem("ci360_tasks_"+(u?._id||"user"));let s=t?JSON.parse(t):[];const i=s.find(r=>r._id===e);if(i){const r=i.status!=="Completed";return i.status=r?"Completed":"Todo",i.completedAt=r?new Date:null,localStorage.setItem("ci360_tasks_"+(u?._id||"user"),JSON.stringify(s)),i}}catch{}return null}async function ve(e){F(e,{userRole:"employee",currentUser:u})}window.toggleDailyTask=async function(e){try{await ge(e),k()}catch(t){flashToast(t.message,!0)}};window.deleteDailyTask=async function(e){try{await me(e),flashToast("Task deleted"),k()}catch(t){flashToast(t.message,!0)}};window.editDailyTask=async function(e){const s=(await pe()).find(r=>r._id===e);if(!s)return;const i=prompt("Edit task:",s.title);if(i!==null&&i.trim())try{await ce({title:i.trim()},e),flashToast("Task updated"),k()}catch(r){flashToast(r.message,!0)}};window.clearCompletedDailyTasks=async function(){if(confirm("Delete all completed tasks from this view?"))try{await apiPost("/tasks/clear-completed",{date:de.date});try{const e=localStorage.getItem("ci360_tasks_"+(u?._id||"user"));if(e){let t=JSON.parse(e);t=t.filter(s=>s.status!=="Completed"),localStorage.setItem("ci360_tasks_"+(u?._id||"user"),JSON.stringify(t))}}catch{}flashToast("Completed tasks deleted! 🗑️"),k()}catch(e){flashToast(e.message,!0)}};window.saveCompDate=async function(e){try{const t=document.querySelector(`.emp-completion-date[data-id="${e}"]`);if(!t)return;const s=t.value?t.value:null;await apiPut("/jobs/"+e,{completionDate:s,status:s?"Completed":"In Progress"}),flashToast("Delivery date & status saved!"),k()}catch(t){flashToast(t.message,!0)}};window.toggleStatus=async function(e,t){try{const s=document.querySelector(`.emp-completion-date[data-id="${e}"]`);let i=t?s?.value||new Date().toISOString().slice(0,10):null;s&&(s.value=i||""),await apiPut("/jobs/"+e,{status:t?"Completed":"In Progress",completionDate:i}),flashToast(t?"Job marked as Completed! 🎉":"Job reopened as In Progress"),k()}catch(s){flashToast(s.message,!0)}};window.delJob=async function(e){if(confirm("Delete this job entry? This cannot be undone."))try{await apiDelete("/jobs/"+e),flashToast("Job deleted"),k()}catch(t){flashToast(t.message,!0)}};async function ue(e){const[t,s]=await Promise.all([apiGet("/dashboard/employee?period="+l.period),apiGet("/targets?mine=true")]),i=w.personnel.find(o=>String(o._id)===String(u.personnelId?._id||u.personnelId)),r=i?i.capacity:48,m=t.target?t.target.targetHours:Math.round(r*.85),b=Math.round(t.hours/(m||1)*100),a=b>=100?"green":b>=75?"amber":"red",c=Math.min(b,100);e.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(u.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${te()}
      </div>

      <!-- Top Summary Metrics -->
      <div class="grid grid-4" style="margin-bottom:20px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Hours Logged</span><div class="kpi-icon">⏱</div></div>
          <div class="kpi-value">${fmtHours(t.hours)}</div>
          <div class="kpi-sub">${t.jobCount} jobs this period</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Target Hours</span><div class="kpi-icon">🎯</div></div>
          <div class="kpi-value">${fmtHours(m)}</div>
          <div class="kpi-sub">${b}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${r} hrs/wk</div>
          <div class="kpi-sub">${i?i.status:"active"} status</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Assigned Targets</span><div class="kpi-icon">📋</div></div>
          <div class="kpi-value">${s.length}</div>
          <div class="kpi-sub">Admin configured</div>
        </div>
      </div>

      <!-- Period Hours Progress Card -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${l.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(t.hours)} logged of ${fmtHours(m)} target capacity</div>
          </div>
          <span class="badge ${a}" style="font-size:12.5px;padding:4px 10px">${b}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${a}" style="width:${c}%;height:100%;border-radius:var(--r-full);background:var(--${a==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(m)}</span>
        </div>
      </div>

      <!-- Admin Assigned Throughput Targets -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px;margin:0;display:flex;align-items:center;gap:8px">
          <span>🎯 Service & Throughput Targets</span>
          <span class="eyebrow">${s.length} active</span>
        </h3>
        <button class="btn gold small" id="addEmpTargetBtn" type="button">+ Set Target</button>
      </div>

      ${s.length===0?`
        <div class="card" style="text-align:center;padding:36px 20px">
          <div style="font-size:32px;margin-bottom:8px">🎯</div>
          <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-bottom:4px">No specific service targets assigned yet</div>
          <div style="font-size:12.5px;color:var(--text-3);max-width:420px;margin:0 auto 16px">Your general hours target is active above. Click "+ Set Target" to define your own daily or weekly quotas for reels, stories, posts, or deliverables.</div>
          <button class="btn gold small" onclick="openEmpTargetModal(null)">+ Set First Target</button>
        </div>
      `:`
        <div class="grid grid-2" style="gap:16px">
          ${s.map(o=>{const d=o.serviceId?.name||"General Service",x={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"}[o.unit]||(o.unit?o.unit.charAt(0).toUpperCase()+o.unit.slice(1):"Deliverables"),y=o.actual||0,h=o.quantity||1,$=h>0?y/h:0,f=Math.round($*100),E=Math.min(f,100),S=$>=1?{l:"🟢 On Pace",c:"green"}:$>=.6?{l:"🟡 Behind",c:"amber"}:{l:"🔴 Off Pace",c:"red"};return`
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(d)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${S.c}">${S.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${o._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${y}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${h} ${escapeHtml(x)} per ${o.period==="day"?"day":o.period==="week"?"week":"month"}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${S.c}" style="width:${E}%;height:100%;border-radius:var(--r-full);background:var(--${S.c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${o._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${o._id}" value="${y}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${o._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${o._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${o.attachments&&o.attachments.length?`
                  <div data-attachments="${encodeURIComponent(JSON.stringify(o.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(o.attachments,{title:"Attached Proofs & Files"})}
                  </div>
                `:""}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${o.period==="day"?"Daily":o.period==="week"?"Weekly":"Monthly"}</strong></span>
                <span><strong>${f}%</strong> Completed</span>
              </div>
            </div>`}).join("")}
        </div>
      `}
    </div>`;const v=document.getElementById("addEmpTargetBtn");v&&(v.onclick=()=>J(null)),document.querySelectorAll(".edit-emp-target").forEach(o=>{o.onclick=()=>J(s.find(d=>d._id===o.dataset.id))}),se()}window.stepTargetCompleted=function(e,t){const s=document.querySelector(`.emp-target-completed-inp[data-id="${e}"]`);if(!s)return;let i=Math.max(0,(Number(s.value)||0)+t);s.value=i,saveTargetCompleted(e)};window.saveTargetCompleted=async function(e){try{const t=document.querySelector(`.emp-target-completed-inp[data-id="${e}"]`);if(!t)return;const s=Number(t.value)||0;await apiPut("/targets/"+e,{completed:s}),flashToast("Target progress updated! 🎯"),k()}catch(t){flashToast(t.message,!0)}};function J(e){const t=!e,s=w.services||[];e=e||{serviceId:s[0]?._id,quantity:5,unit:"reels",period:"day",completed:0,attachments:[]};const i=e.serviceId?._id||e.serviceId||"",m=["reels","stories","posts","count","hours"].includes(e.unit),b=openModal(`
    <h3>${t?"Set New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${s.map(o=>`<option value="${o._id}" ${String(o._id)===String(i)?"selected":""}>${escapeHtml(o.name)}</option>`).join("")}
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
          <option value="reels" ${m&&e.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${m&&e.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${m&&e.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${m&&e.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${m&&e.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${m?"":"selected"}>✏️ Custom / Add Your Own…</option>
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

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${m?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${m?"":escapeHtml(e.unit||"")}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpTgtAttachments",label:"Proof of Work / Deliverable Attachments",subtitle:"Upload links, finished files, screenshots or design outputs"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);bindAttachmentUploader("mEmpTgtAttachments",{existing:e.attachments||[]});const a=b.querySelector("#mEmpTgtUnit"),c=b.querySelector("#mEmpTgtCustomUnitWrap"),v=b.querySelector("#mEmpTgtCustomUnit");a.onchange=()=>{a.value==="custom"?(c.style.display="flex",v.focus()):c.style.display="none"},b.querySelector("#mEmpTgtCancel").onclick=()=>b.remove(),b.querySelector("#mEmpTgtSave").onclick=async()=>{let o=a.value;o==="custom"&&(o=v.value.trim()||"Deliverables");const d=getUploaderAttachments("mEmpTgtAttachments"),g={serviceId:b.querySelector("#mEmpTgtService").value,quantity:Number(b.querySelector("#mEmpTgtQty").value)||1,completed:Number(b.querySelector("#mEmpTgtCompleted").value)||0,unit:o,period:b.querySelector("#mEmpTgtPeriod").value,attachments:d};if(!g.serviceId){flashToast("Service is required",!0);return}try{t?await apiPost("/targets",g):await apiPut("/targets/"+e._id,g),flashToast("Target saved! 🎯"),b.remove(),k()}catch(x){flashToast(x.message,!0)}}}window.addEventListener("ci360:dataUpdated",e=>{const t=document.activeElement,s=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),i=document.querySelector(".modal-bg, .modal-backdrop, #jobModal");!s&&!i&&l.tab!=="logjob"&&k(!0)});V();function be(e,t,s,i="denial"){const r=i==="revision",m=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:8px">
        <span>🔁</span> Resubmit Work to Client for Approval
      </div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
    </div>

    ${s?`
      <div style="margin-bottom:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--r-sm);padding:10px 14px">
        <strong style="color:var(--red-500);font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:2px">${r?"Client's Revision Request / Notes:":"Client's Previous Denial Reason:"}</strong>
        <div style="font-size:12.5px;color:var(--text-1)">"${escapeHtml(s)}"</div>
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
  `);bindAttachmentUploader("mEmpResubUp"),m.querySelector("#mEmpResubCancel").onclick=()=>m.remove(),m.querySelector("#mEmpResubConfirm").onclick=async()=>{const b=m.querySelector("#mEmpResubNotes").value.trim(),a=m.querySelector("#mEmpResubUrl").value.trim(),c=getUploaderAttachments("mEmpResubUp"),v=m.querySelector("#mEmpResubConfirm");v.disabled=!0,v.textContent="Resubmitting…";try{await apiPost(`/jobs/${e}/resubmit`,{notes:b,url:a,deliverables:c}),flashToast("Job resubmitted to client for re-approval! 🔁🎉"),m.remove(),k()}catch(o){flashToast(o.message,!0),v.disabled=!1,v.textContent="🔁 Resubmit to Client for Approval"}}}
