import"./api-DGR5VCGO.js";import{initProposalStudio as O}from"./proposals-Dx79T4Ej.js";let n=null,A={personnel:[],clients:[],services:[]},p={tab:"dashboard",period:"month"};async function F(){if(initTheme(),n=requireAuth("employee"),!n)return;const[e,a,s]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);A.personnel=e,A.clients=a,A.services=s,z()}function N(e){const a=A.clients.find(s=>s._id===e);return a?a.name:"—"}function L(){return n&&(/mansi/i.test(n.name)||/urna/i.test(n.name))}function W(){const e=n&&(n.role==="accounts"||n.role==="superadmin"||/ekta/i.test(n.name)||/ekta/i.test(n.email)),a=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"myjobs",label:"My Jobs",icon:"📋"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"targets",label:"My Targets",icon:"🎯"}];return e&&a.push({key:"accounts_redirect",label:"Accounts Dashboard 💰",icon:"💳"}),a}function z(){const e=document.getElementById("app"),a=W(),s=a.find(t=>t.key===p.tab)||a[0];e.innerHTML=renderAppShell({user:n,currentRole:"employee",activeTab:p.tab,tabs:a,title:s.label,subtitle:L()?"Lead Workspace · Mansi & Urna Management":"Employee Workspace & Productivity Dashboard"}),bindAppShellEvents(t=>{if(t==="accounts_redirect"){window.location.href="/accounts";return}p.tab=t,z()}),u()}window.ci360NavTab=(e,a=null)=>{if(e==="accounts_redirect"){window.location.href="/accounts";return}e==="jobs"||e==="myjobs"?e="myjobs":e==="tasks"||e==="mytasks"||e==="dailytasks"?e="dailytasks":e==="target"||e==="targets"?e="targets":e==="proposal"||e==="proposals"?e="proposals":(e==="dashboard"||e==="overview")&&(e="dashboard"),p.tab=e,a&&(p.highlightId=a),z()};async function u(){const e=document.getElementById("content");if(e){e.innerHTML=renderSkeletonCards(3);try{p.tab==="dashboard"?await B(e):p.tab==="myjobs"||p.tab==="jobs"?await Y(e):p.tab==="dailytasks"||p.tab==="mytasks"||p.tab==="tasks"?await R(e):p.tab==="proposals"||p.tab==="proposal"?await Q(e):p.tab==="targets"||p.tab==="target"?await Z(e):(p.tab="dashboard",await B(e))}catch(a){e.innerHTML=renderEmptyState("Something went wrong",a.message,"⚠️")}}}async function Q(e){e.innerHTML='<div id="proposals-module-root"></div>';const a=e.querySelector("#proposals-module-root");O(a,{userRole:"employee",currentUser:n})}function G(){return renderPeriodPicker(p.period)}function V(){document.querySelectorAll("[data-period]").forEach(e=>{e.onclick=()=>{p.period=e.dataset.period,u()}})}async function B(e){const[a,s,t]=await Promise.all([apiGet("/dashboard/employee?period="+p.period).catch(()=>({stats:{},person:{},recentJobs:[],accounts:[]})),apiGet("/jobs?mine=true").catch(()=>[]),apiGet("/tasks").catch(()=>[])]),o=a.person||{},r=o.name||(n==null?void 0:n.name)||"Team Member",l=o.duties||"Creative Specialist",m=Number(o.capacity)||48,x=a.stats||{hours:0,revenue:0,utilization:0,label:"Optimal",badge:"green"},v=s||[],d=v.filter(i=>i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate),c=v.filter(i=>!i.completionDate&&i.status!=="Completed"&&(!i.clientApproval||i.clientApproval.status!=="Approved")),b=v.filter(i=>i.clientApproval&&i.clientApproval.status==="Revision Requested"),f=c.filter(i=>i.priority==="Urgent");c.filter(i=>i.priority==="High");const h=new Date().toISOString().slice(0,10),w=(t||[]).filter(i=>i.date?i.date.slice(0,10)===h:!0),T=w.filter(i=>i.status==="Completed"),S=w.filter(i=>i.status!=="Completed"),C=w.length>0?Math.round(T.length/w.length*100):100,k=a.accounts||[];e.innerHTML=`
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
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(l)}</span>
                <span class="badge ${x.badge||"green"}" style="font-size:11px;font-weight:700">● ${escapeHtml(x.label||"Optimal Pace")}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Personal Workspace &amp; Performance Radar · Standard Capacity: <strong>${m}h / week</strong>
              </p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn primary" id="btnEmpQuickJobs" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md)">
              <span>📋</span> My Jobs (${v.length})
            </button>
            <button class="btn secondary" id="btnEmpQuickTasks" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;padding:9px 16px;border-radius:var(--r-md)">
              <span>✅</span> Daily Tasks
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
      ${f.length>0||b.length>0?`
        <div class="card" style="background:linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.06) 100%);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <span style="font-size:24px">⚡</span>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                High Priority Focus Items
              </div>
              <div style="font-size:13px;color:var(--text-2);display:flex;gap:12px;flex-wrap:wrap">
                ${f.length>0?`<span style="color:var(--red);font-weight:700">🔴 ${f.length} Urgent Job(s)</span>`:""}
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
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${Number(x.utilization||0).toFixed(0)}%</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${Number(x.hours||0).toFixed(1)} hrs tracked this period</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active Workload</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${c.length}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${d.length} completed deliverables</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Today's Task Progress</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${T.length} <span style="font-size:18px;font-weight:600;color:var(--text-4)">/ ${w.length}</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${C}% of today's checklist completed</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Value Output Tracked</div>
              <div style="font-size:20px">💰</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${fmtINR(x.revenue||0)}</div>
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${S.length} pending · ${T.length} done</p>
            </div>
            <button class="btn secondary small" onclick="ci360NavTab('dailytasks')" style="font-size:12px">
              Open Checklist →
            </button>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom:16px">
            <div style="width:100%;height:8px;background:var(--border-sm);border-radius:8px;overflow:hidden">
              <div style="width:${C}%;height:100%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:8px;transition:width 0.4s ease"></div>
            </div>
          </div>

          ${w.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${w.slice(0,5).map(i=>{const y=i.status==="Completed";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <span style="font-size:16px">${y?"✅":"⚪"}</span>
                      <span style="font-size:13px;font-weight:600;color:${y?"var(--text-4)":"var(--text-1)"};${y?"text-decoration:line-through":""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                        ${escapeHtml(i.title||"Task")}
                      </span>
                    </div>
                    <span class="badge ${i.priority==="Urgent"?"red":i.priority==="High"?"amber":"gray"}" style="font-size:10.5px">
                      ${escapeHtml(i.priority||"Normal")}
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${k.length} active client accounts on roster</p>
            </div>
            <span class="badge gold" style="font-weight:700">${k.length} Accounts</span>
          </div>

          ${k.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${k.slice(0,5).map(i=>{const $=(A.clients.find(I=>String(I._id)===String(i.clientId))||{}).name||"Client Account";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0">
                        ${$.slice(0,2).toUpperCase()}
                      </div>
                      <div style="min-width:0">
                        <div style="font-size:13.5px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml($)}</div>
                        <div style="font-size:11px;color:var(--text-4)">${escapeHtml(i.nature||"Retainer")} · ${escapeHtml(i.difficulty||"Normal")}</div>
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
                ${v.slice(0,6).map(i=>{var _;const y=i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate,$=i.clientApproval&&i.clientApproval.status==="Revision Requested",I=((_=i.clientId)==null?void 0:_.name)||N(i.clientId)||"Client",U=i.priority==="Urgent"?"red":i.priority==="High"?"amber":"gray";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('myjobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(i.title||"Untitled Job")}
                      </td>
                      <td>
                        <span class="badge blue" style="font-size:11px">${escapeHtml(I)}</span>
                      </td>
                      <td>
                        <span class="badge ${U}" style="font-size:11px;font-weight:700">${escapeHtml(i.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(i.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${i.completionDate?fmtDate(i.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${y?"green":$?"red":"amber"}" style="font-weight:700">
                          ${y?"✓ Completed":$?"↺ Revision":"⏳ In Progress"}
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
  `;const D=document.getElementById("btnEmpQuickJobs");D&&(D.onclick=()=>{p.tab="myjobs",z()});const E=document.getElementById("btnEmpQuickTasks");E&&(E.onclick=()=>{p.tab="dailytasks",z()});const P=document.getElementById("btnEmpQuickProposals");P&&(P.onclick=()=>{p.tab="proposals",z()}),document.querySelectorAll("#empOverviewPeriodWrapper [data-period]").forEach(i=>{i.onclick=()=>{p.period=i.dataset.period,u()}})}async function Y(e){const a=await apiGet("/jobs?mine=true"),s={Medium:"gray",High:"amber",Urgent:"red"};if(a.length===0){e.innerHTML=`
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
        ${a.map(t=>{var c,b,f;const o=(t.assignments||[]).find(h=>String(h.personId)===String(n.personnelId._id||n.personnelId)),r=String(t.createdBy)===String(n._id),l=t.status==="Completed",m=t.clientApproval&&t.clientApproval.status==="Approved",x=t.clientApproval&&t.clientApproval.status==="Revision Requested",v=t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",d=s[t.priority||"Medium"]||"gray";return`
          <div class="job-card" id="job-card-${t._id}" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${m?"var(--green-500)":x?"var(--red-500)":l?"var(--green-500)":"var(--brand-500)"}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(t.title||"Untitled Job")}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${l?"green":"amber"}">${l?"✓ Completed":"⏳ In Progress"}</span>
                  ${m?`<span class="badge green">✓ Client Approved ${t.clientApproval.rating?`(${t.clientApproval.rating}★)`:""}</span>`:""}
                  ${x?'<span class="badge red">↺ Revision Requested</span>':""}
                  <span class="badge ${d}">${escapeHtml(t.priority||"Medium")}</span>
                  ${(t.serviceNames||[]).map(h=>`<span class="badge gray">${escapeHtml(h)}</span>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                <!-- Toggle Status -->
                <button type="button" class="btn ${l?"secondary":"primary"} small"
                        onclick="toggleStatus('${t._id}', ${!l})"
                        style="font-size:12px">
                  ${l?"↩ Reopen":"✓ Mark Done"}
                </button>
                ${r?`<button type="button" class="btn danger small" onclick="delJob('${t._id}')">Delete</button>`:""}
              </div>
            </div>

            <!-- Revision Requested Alert Box for Employee -->
            ${x?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(((c=(t.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:c.requestedAt)||t.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(t.clientApproval.feedback||"Revision requested")}"
                </div>
                ${(f=(b=(t.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:b.attachments)!=null&&f.length?`
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
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(N(t.clientId))}</div>
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
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${o?fmtHours(o.hours):"0 hrs"}</div>
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
                    <input type="checkbox" id="empDelMarkComplete-${t._id}" ${l?"":"checked"} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
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
                value="${v}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${t._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${v?`<span class="badge green" style="margin-left:auto">Committed Delivery: ${v}</span>`:'<span class="badge gray" style="margin-left:auto">No Date Set</span>'}
            </div>
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".emp-completion-date").forEach(t=>{t.addEventListener("focus",()=>{t.style.borderColor="var(--border-focus)",t.style.boxShadow="0 0 0 3px var(--accent-ring)"}),t.addEventListener("blur",()=>{t.style.borderColor="",t.style.boxShadow=""})}),a.forEach(t=>{bindAttachmentUploader("empDelUp-"+t._id)}),document.querySelectorAll(".emp-del-toggle").forEach(t=>{t.onclick=()=>{const o=document.getElementById("empDelForm-"+t.dataset.id);if(o){const r=o.style.display==="none";o.style.display=r?"block":"none",t.textContent=r?"✕ Close":"+ Add Deliverables"}}}),document.querySelectorAll(".emp-del-cancel").forEach(t=>{t.onclick=()=>{const o=document.getElementById("empDelForm-"+t.dataset.id);o&&(o.style.display="none");const r=document.querySelector(`.emp-del-toggle[data-id="${t.dataset.id}"]`);r&&(r.textContent="+ Add Deliverables")}}),document.querySelectorAll(".emp-del-submit").forEach(t=>{t.onclick=async()=>{var x,v;const o=t.dataset.id,r=getUploaderAttachments("empDelUp-"+o),l=((x=(document.getElementById("empDelNotes-"+o)||{}).value)==null?void 0:x.trim())||"",m=((v=document.getElementById("empDelMarkComplete-"+o))==null?void 0:v.checked)||!1;if(!r.length){flashToast("Please upload or attach at least one file",!0);return}t.disabled=!0,t.textContent="Submitting…";try{const d=r.map(c=>({...c,notes:l}));await apiPost(`/jobs/${o}/deliverables`,{deliverables:d,markComplete:m}),flashToast(m?"Deliverables submitted & job marked as Completed! 📦🎉":"Deliverables submitted successfully! 📦"),u()}catch(d){flashToast(d.message,!0)}finally{t.disabled=!1,t.textContent="Submit Deliverables"}}}),p.highlightId){const t=p.highlightId;delete p.highlightId,setTimeout(()=>{const o=document.getElementById("job-card-"+t);o&&(o.scrollIntoView({behavior:"smooth",block:"center"}),o.classList.add("pulse-highlight"),setTimeout(()=>o.classList.remove("pulse-highlight"),2200))},150)}}let g={date:new Date().toISOString().slice(0,10),filter:"all",search:""};async function q(){try{const e=await apiGet("/tasks");if(Array.isArray(e))return localStorage.setItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"),JSON.stringify(e)),e}catch(e){console.warn("Backend /api/tasks offline, using local fallback:",e)}try{const e=localStorage.getItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"));return e?JSON.parse(e):[]}catch{return[]}}async function J(e,a=null){let s=null;try{a?s=await apiPut("/tasks/"+a,e):s=await apiPost("/tasks",e)}catch(o){console.warn("API task save failed, writing local backup:",o)}let t=[];try{const o=localStorage.getItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"));t=o?JSON.parse(o):[]}catch{}if(a){const o=t.findIndex(r=>r._id===a);o>=0&&(t[o]=s||{...t[o],...e,updatedAt:new Date})}else s||(s={_id:"loc_"+Date.now(),...e,createdAt:new Date,completedAt:e.status==="Completed"?new Date:null}),t.unshift(s);return localStorage.setItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"),JSON.stringify(t)),s}async function j(e){try{await apiDelete("/tasks/"+e)}catch(a){console.warn("API task delete failed, updating storage:",a)}try{const a=localStorage.getItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"));let s=a?JSON.parse(a):[];s=s.filter(t=>t._id!==e),localStorage.setItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"),JSON.stringify(s))}catch{}}async function K(e){try{return await apiPatch("/tasks/"+e+"/toggle",{})}catch(a){console.warn("API toggle failed, toggling locally:",a)}try{const a=localStorage.getItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"));let s=a?JSON.parse(a):[];const t=s.find(o=>o._id===e);if(t){const o=t.status!=="Completed";return t.status=o?"Completed":"Todo",t.completedAt=o?new Date:null,localStorage.setItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"),JSON.stringify(s)),t}}catch{}return null}function H(e,a){let s;if(!e||e==="all")s=new Date;else{const l=e.split("-");l.length===3?s=new Date(Number(l[0]),Number(l[1])-1,Number(l[2])):s=new Date}s.setDate(s.getDate()+a);const t=s.getFullYear(),o=String(s.getMonth()+1).padStart(2,"0"),r=String(s.getDate()).padStart(2,"0");return`${t}-${o}-${r}`}function X(e){if(!e||e==="all")return"All Days Checklist";const a=e.split("-"),s=a.length===3?new Date(Number(a[0]),Number(a[1])-1,Number(a[2])):new Date,t=new Date;t.setHours(0,0,0,0);const o=new Date(s);o.setHours(0,0,0,0);const r=Math.round((o-t)/(1e3*60*60*24)),l=s.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric",year:"numeric"});return r===0?`Today · ${l}`:r===-1?`Yesterday · ${l}`:r===1?`Tomorrow · ${l}`:l}async function R(e){const a=await q(),s=new Date,t=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`,o=g.date;let r=a;o!=="all"&&(r=a.filter(i=>i.dueDate?new Date(i.dueDate).toISOString().slice(0,10)===o:o===t));const l=r.length,m=r.filter(i=>i.status==="Completed").length,x=l-m,v=l>0?Math.round(m/l*100):0,d=l>0&&m===l;let c=r;if(g.filter==="active"?c=c.filter(i=>i.status!=="Completed"):g.filter==="completed"&&(c=c.filter(i=>i.status==="Completed")),g.search){const i=g.search.toLowerCase();c=c.filter(y=>(y.title||"").toLowerCase().includes(i))}const b=o===t;e.innerHTML=`
    <div class="block" style="max-width:880px;margin:0 auto">
      <!-- Section Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="margin:0 0 4px;display:flex;align-items:center;gap:8px">
            <span>Daily Tasks</span>
            <span class="eyebrow">${l} ${l===1?"task":"tasks"}</span>
          </h2>
          <div style="font-size:12.5px;color:var(--text-3)">Your simple daily checklist to check off what gets done today.</div>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="dailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${b?"primary":"ghost"} small" id="dailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="dailyDatePickerInp" class="daily-date-picker-inp" value="${o==="all"?t:o}">

          <button type="button" class="daily-nav-arrow" id="dailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${o==="all"?"gold":"ghost"} small" id="dailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
            All Tasks
          </button>
        </div>
      </div>

      <!-- Main Checklist Card -->
      <div class="daily-checklist-card">
        <!-- Day Banner & Progress -->
        <div class="daily-checklist-header">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <span style="font-size:16px;font-weight:800;color:var(--text-1)">
              ${X(o)}
            </span>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:12.5px;font-weight:700;color:${d?"var(--green-600)":"var(--text-2)"}">
                ${l>0?`${m} of ${l} completed (${v}%)`:"No tasks yet"}
              </span>
            </div>
          </div>

          <div class="heatmap-bar-wrap" style="height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
            <div class="heatmap-bar-fill" style="width:${v}%;background:${d?"var(--green-500)":"var(--brand-500)"};height:100%;transition:width 0.4s ease"></div>
          </div>

          ${d?`
            <div style="margin-top:10px;padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);color:var(--green-600);font-size:12.5px;font-weight:700;display:flex;align-items:center;gap:6px">
              <span>🎉</span> All tasks for today completed! Excellent job!
            </div>
          `:""}
        </div>

        <!-- Add Task Bar -->
        <div style="padding:20px 24px 10px">
          <div class="daily-checklist-add-bar">
            <span style="font-size:16px;color:var(--text-4);font-weight:700">◯</span>
            <input type="text" id="dailyTaskQuickInput" class="daily-checklist-input" placeholder="Add a daily task... (Press Enter to add)">
            <button type="button" class="btn gold small" id="dailyTaskAddBtn" style="padding:6px 14px;font-weight:700">
              + Add Task
            </button>
          </div>

          <!-- Controls: Filter Chips & Search -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <button class="pchip ${g.filter==="all"?"active":""}" data-df="all">All (${l})</button>
              <button class="pchip ${g.filter==="active"?"active":""}" data-df="active">To Do (${x})</button>
              <button class="pchip ${g.filter==="completed"?"active":""}" data-df="completed">✓ Completed (${m})</button>
            </div>

            <div style="display:flex;gap:8px;align-items:center">
              <div class="ticket-search-box" style="margin:0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="dailySearchInp" placeholder="Search checklist…" value="${escapeHtml(g.search)}" style="font-size:12px;padding:4px 6px">
                ${g.search?'<button type="button" id="dailyClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
              </div>

              ${m>0?`
                <button type="button" class="btn ghost small" onclick="clearCompletedDailyTasks()" style="font-size:11.5px;color:var(--text-3);padding:4px 8px" title="Remove completed tasks">
                  Clear Completed
                </button>
              `:""}
            </div>
          </div>
        </div>

        <!-- Checklist Rows -->
        <div id="dailyChecklistRowsContainer" style="border-top:1px solid var(--border-xs)">
          ${c.length===0?`
            <div style="text-align:center;padding:48px 20px;color:var(--text-3)">
              <div style="font-size:36px;margin-bottom:8px">📝</div>
              <div style="font-weight:700;font-size:15px;color:var(--text-1);margin-bottom:4px">No tasks on this checklist</div>
              <div style="font-size:12.5px;color:var(--text-4);max-width:320px;margin:0 auto">Type your task above and press Enter to start checking off items for ${o==="all"?"your list":"today"}.</div>
            </div>
          `:c.map(i=>{const y=i.status==="Completed",$=i.dueDate?new Date(i.dueDate).toISOString().slice(0,10):"";return`
              <div class="daily-item-row ${y?"completed":""}" id="daily-row-${i._id}">
                <!-- Circle checkbox -->
                <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                  <button type="button" class="daily-circle-check ${y?"checked":""}" onclick="toggleDailyTask('${i._id}')" title="${y?"Mark Incomplete":"Mark Complete"}">
                    ✓
                  </button>
                  <span class="daily-item-text" onclick="toggleDailyTask('${i._id}')" style="cursor:pointer;flex:1">
                    ${escapeHtml(i.title)}
                  </span>
                </div>

                <!-- Right Side Meta & Actions -->
                <div class="daily-actions-hover">
                  ${o==="all"&&$?`
                    <span class="task-tag-pill" style="font-size:10.5px;margin-right:6px">📅 ${$===t?"Today":$}</span>
                  `:""}
                  <button type="button" class="btn ghost small" onclick="editDailyTask('${i._id}')" title="Edit task" style="padding:3px 7px;font-size:12px">✏️</button>
                  <button type="button" class="btn ghost small" onclick="deleteDailyTask('${i._id}')" title="Delete task" style="padding:3px 7px;font-size:12px;color:var(--red-500)">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `;const f=document.getElementById("dailyTaskQuickInput"),h=document.getElementById("dailyTaskAddBtn"),w=async()=>{const i=((f==null?void 0:f.value)||"").trim();if(!i){flashToast("Please enter a task",!0);return}const y=g.date==="all"?t:g.date;try{await J({title:i,status:"Todo",dueDate:y}),flashToast("Task added! ✍️"),f&&(f.value="",f.focus()),u()}catch($){flashToast($.message,!0)}};h&&(h.onclick=w),f&&(f.onkeydown=i=>{i.key==="Enter"&&w()}),document.querySelectorAll("[data-df]").forEach(i=>{i.onclick=()=>{g.filter=i.dataset.df,u()}});const T=document.getElementById("dailyPrevDayBtn");T&&(T.onclick=()=>{g.date=H(g.date,-1),u()});const S=document.getElementById("dailyNextDayBtn");S&&(S.onclick=()=>{g.date=H(g.date,1),u()});const C=document.getElementById("dailyTodayBtn");C&&(C.onclick=()=>{g.date=t,u()});const k=document.getElementById("dailyAllDatesBtn");k&&(k.onclick=()=>{g.date=g.date==="all"?t:"all",u()});const D=document.getElementById("dailyDatePickerInp");D&&(D.onchange=i=>{i.target.value&&(g.date=i.target.value,u())});const E=document.getElementById("dailySearchInp");E&&(E.oninput=i=>{g.search=i.target.value,R(e)});const P=document.getElementById("dailyClearSearch");if(P&&(P.onclick=()=>{g.search="",u()}),p.highlightId){const i=p.highlightId;delete p.highlightId,setTimeout(()=>{const y=document.getElementById("daily-row-"+i);y&&(y.scrollIntoView({behavior:"smooth",block:"center"}),y.classList.add("pulse-highlight"),setTimeout(()=>y.classList.remove("pulse-highlight"),2200))},150)}}window.toggleDailyTask=async function(e){try{await K(e),u()}catch(a){flashToast(a.message,!0)}};window.deleteDailyTask=async function(e){try{await j(e),flashToast("Task deleted"),u()}catch(a){flashToast(a.message,!0)}};window.editDailyTask=async function(e){const s=(await q()).find(o=>o._id===e);if(!s)return;const t=prompt("Edit task:",s.title);if(t!==null&&t.trim())try{await J({title:t.trim()},e),flashToast("Task updated"),u()}catch(o){flashToast(o.message,!0)}};window.clearCompletedDailyTasks=async function(){if(confirm("Delete all completed tasks from this view?"))try{await apiPost("/tasks/clear-completed",{date:g.date});try{const e=localStorage.getItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"));if(e){let a=JSON.parse(e);a=a.filter(s=>s.status!=="Completed"),localStorage.setItem("ci360_tasks_"+((n==null?void 0:n._id)||"user"),JSON.stringify(a))}}catch{}flashToast("Completed tasks deleted! 🗑️"),u()}catch(e){flashToast(e.message,!0)}};window.saveCompDate=async function(e){try{const a=document.querySelector(`.emp-completion-date[data-id="${e}"]`);if(!a)return;const s=a.value?a.value:null;await apiPut("/jobs/"+e,{completionDate:s,status:s?"Completed":"In Progress"}),flashToast("Delivery date & status saved!"),u()}catch(a){flashToast(a.message,!0)}};window.toggleStatus=async function(e,a){try{const s=document.querySelector(`.emp-completion-date[data-id="${e}"]`);let t=a?(s==null?void 0:s.value)||new Date().toISOString().slice(0,10):null;s&&(s.value=t||""),await apiPut("/jobs/"+e,{status:a?"Completed":"In Progress",completionDate:t}),flashToast(a?"Job marked as Completed! 🎉":"Job reopened as In Progress"),u()}catch(s){flashToast(s.message,!0)}};window.delJob=async function(e){if(confirm("Delete this job entry? This cannot be undone."))try{await apiDelete("/jobs/"+e),flashToast("Job deleted"),u()}catch(a){flashToast(a.message,!0)}};async function Z(e){const[a,s]=await Promise.all([apiGet("/dashboard/employee?period="+p.period),apiGet("/targets?mine=true")]),t=A.personnel.find(d=>{var c;return String(d._id)===String(((c=n.personnelId)==null?void 0:c._id)||n.personnelId)}),o=t?t.capacity:48,r=a.target?a.target.targetHours:Math.round(o*.85),l=Math.round(a.hours/(r||1)*100),m=l>=100?"green":l>=75?"amber":"red",x=Math.min(l,100);e.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(n.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${G()}
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
          <div class="kpi-value">${fmtHours(r)}</div>
          <div class="kpi-sub">${l}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${o} hrs/wk</div>
          <div class="kpi-sub">${t?t.status:"active"} status</div>
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
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${p.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(a.hours)} logged of ${fmtHours(r)} target capacity</div>
          </div>
          <span class="badge ${m}" style="font-size:12.5px;padding:4px 10px">${l}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${m}" style="width:${x}%;height:100%;border-radius:var(--r-full);background:var(--${m==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(r)}</span>
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
          ${s.map(d=>{var D;const c=((D=d.serviceId)==null?void 0:D.name)||"General Service",f={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"}[d.unit]||(d.unit?d.unit.charAt(0).toUpperCase()+d.unit.slice(1):"Deliverables"),h=d.actual||0,w=d.quantity||1,T=w>0?h/w:0,S=Math.round(T*100),C=Math.min(S,100),k=T>=1?{l:"🟢 On Pace",c:"green"}:T>=.6?{l:"🟡 Behind",c:"amber"}:{l:"🔴 Off Pace",c:"red"};return`
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(c)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${k.c}">${k.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${d._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${h}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${w} ${escapeHtml(f)} per ${d.period==="day"?"day":d.period==="week"?"week":"month"}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${k.c}" style="width:${C}%;height:100%;border-radius:var(--r-full);background:var(--${k.c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${d._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${d._id}" value="${h}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${d._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${d._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${d.attachments&&d.attachments.length?`
                  <div data-attachments="${encodeURIComponent(JSON.stringify(d.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(d.attachments,{title:"Attached Proofs & Files"})}
                  </div>
                `:""}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${d.period==="day"?"Daily":d.period==="week"?"Weekly":"Monthly"}</strong></span>
                <span><strong>${S}%</strong> Completed</span>
              </div>
            </div>`}).join("")}
        </div>
      `}
    </div>`;const v=document.getElementById("addEmpTargetBtn");v&&(v.onclick=()=>M(null)),document.querySelectorAll(".edit-emp-target").forEach(d=>{d.onclick=()=>M(s.find(c=>c._id===d.dataset.id))}),V()}window.stepTargetCompleted=function(e,a){const s=document.querySelector(`.emp-target-completed-inp[data-id="${e}"]`);if(!s)return;let t=Math.max(0,(Number(s.value)||0)+a);s.value=t,saveTargetCompleted(e)};window.saveTargetCompleted=async function(e){try{const a=document.querySelector(`.emp-target-completed-inp[data-id="${e}"]`);if(!a)return;const s=Number(a.value)||0;await apiPut("/targets/"+e,{completed:s}),flashToast("Target progress updated! 🎯"),u()}catch(a){flashToast(a.message,!0)}};function M(e){var d,c;const a=!e,s=A.services||[];e=e||{serviceId:(d=s[0])==null?void 0:d._id,quantity:5,unit:"reels",period:"day",completed:0,attachments:[]};const t=((c=e.serviceId)==null?void 0:c._id)||e.serviceId||"",r=["reels","stories","posts","count","hours"].includes(e.unit),l=openModal(`
    <h3>${a?"Set New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${s.map(b=>`<option value="${b._id}" ${String(b._id)===String(t)?"selected":""}>${escapeHtml(b.name)}</option>`).join("")}
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
          <option value="reels" ${r&&e.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${r&&e.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${r&&e.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${r&&e.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${r&&e.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${r?"":"selected"}>✏️ Custom / Add Your Own…</option>
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

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${r?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${r?"":escapeHtml(e.unit||"")}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpTgtAttachments",label:"Proof of Work / Deliverable Attachments",subtitle:"Upload links, finished files, screenshots or design outputs"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);bindAttachmentUploader("mEmpTgtAttachments",{existing:e.attachments||[]});const m=l.querySelector("#mEmpTgtUnit"),x=l.querySelector("#mEmpTgtCustomUnitWrap"),v=l.querySelector("#mEmpTgtCustomUnit");m.onchange=()=>{m.value==="custom"?(x.style.display="flex",v.focus()):x.style.display="none"},l.querySelector("#mEmpTgtCancel").onclick=()=>l.remove(),l.querySelector("#mEmpTgtSave").onclick=async()=>{let b=m.value;b==="custom"&&(b=v.value.trim()||"Deliverables");const f=getUploaderAttachments("mEmpTgtAttachments"),h={serviceId:l.querySelector("#mEmpTgtService").value,quantity:Number(l.querySelector("#mEmpTgtQty").value)||1,completed:Number(l.querySelector("#mEmpTgtCompleted").value)||0,unit:b,period:l.querySelector("#mEmpTgtPeriod").value,attachments:f};if(!h.serviceId){flashToast("Service is required",!0);return}try{a?await apiPost("/targets",h):await apiPut("/targets/"+e._id,h),flashToast("Target saved! 🎯"),l.remove(),u()}catch(w){flashToast(w.message,!0)}}}window.addEventListener("ci360:dataUpdated",e=>{const a=document.activeElement,s=a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.isContentEditable),t=document.querySelector(".modal-bg, .modal-backdrop, #jobModal");!s&&!t&&p.tab!=="logjob"&&u()});F();
