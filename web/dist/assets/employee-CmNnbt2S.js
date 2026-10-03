import"./api-BJqukpni.js";let d=null,I={personnel:[],clients:[],services:[]},k={tab:"dashboard",period:"month",ticketsFilter:"all"};async function W(){if(initTheme(),d=requireAuth("employee"),!d)return;const[a,i,s]=await Promise.all([apiGet("/personnel"),apiGet("/clients"),apiGet("/services")]);I.personnel=a,I.clients=i,I.services=s,R()}function U(a){const i=I.clients.find(s=>s._id===a);return i?i.name:"—"}function B(){return d&&(/mansi/i.test(d.name)||/urna/i.test(d.name))}function G(){const a=d&&(d.role==="accounts"||d.role==="superadmin"||/ekta/i.test(d.name)||/ekta/i.test(d.email)),i=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"myjobs",label:"My Jobs",icon:"📋"},{key:"dailytasks",label:"Daily Tasks",icon:"✅"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"targets",label:"My Targets",icon:"🎯"}];return a&&i.push({key:"accounts_redirect",label:"Accounts Dashboard 💰",icon:"💳"}),i}function R(){const a=document.getElementById("app"),i=G(),s=i.find(e=>e.key===k.tab)||i[0];a.innerHTML=renderAppShell({user:d,currentRole:"employee",activeTab:k.tab,tabs:i,title:s.label,subtitle:B()?"Lead Workspace · Mansi & Urna Management":"Employee Workspace & Productivity Dashboard"}),bindAppShellEvents(e=>{if(e==="accounts_redirect"){window.location.href="/accounts";return}k.tab=e,R()}),u()}window.ci360NavTab=a=>{if(a==="accounts_redirect"){window.location.href="/accounts";return}k.tab=a,R()};async function u(){const a=document.getElementById("content");if(a){a.innerHTML=renderSkeletonCards(3);try{k.tab==="dashboard"?await Y(a):k.tab==="myjobs"?await K(a):k.tab==="dailytasks"||k.tab==="mytasks"?await F(a):k.tab==="tickets"?await M(a):k.tab==="targets"&&await te(a)}catch(i){a.innerHTML=renderEmptyState("Something went wrong",i.message,"⚠️")}}}function Q(){return renderPeriodPicker(k.period)}function V(){document.querySelectorAll("[data-period]").forEach(a=>{a.onclick=()=>{k.period=a.dataset.period,u()}})}async function Y(a){const[i,s,e,l]=await Promise.all([apiGet("/dashboard/employee?period="+k.period).catch(()=>({stats:{},person:{},recentJobs:[],accounts:[]})),apiGet("/jobs?mine=true").catch(()=>[]),apiGet("/tasks").catch(()=>[]),apiGet("/tickets").catch(()=>[])]),v=i.person||{},r=v.name||(d==null?void 0:d.name)||"Team Member",b=v.duties||"Creative Specialist",y=Number(v.capacity)||48,g=i.stats||{hours:0,revenue:0,utilization:0,label:"Optimal",badge:"green"},c=s||[],m=c.filter(o=>o.status==="Completed"||o.clientApproval&&o.clientApproval.status==="Approved"||o.completionDate),$=c.filter(o=>!o.completionDate&&o.status!=="Completed"&&(!o.clientApproval||o.clientApproval.status!=="Approved")),h=c.filter(o=>o.clientApproval&&o.clientApproval.status==="Revision Requested"),w=$.filter(o=>o.priority==="Urgent");$.filter(o=>o.priority==="High");const C=new Date().toISOString().slice(0,10),T=(e||[]).filter(o=>o.date?o.date.slice(0,10)===C:!0),A=T.filter(o=>o.status==="Completed"),t=T.filter(o=>o.status!=="Completed"),n=T.length>0?Math.round(A.length/T.length*100):100,f=(l||[]).filter(o=>o.status!=="resolved"&&o.status!=="closed"),S=i.accounts||[];a.innerHTML=`
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
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(b)}</span>
                <span class="badge ${g.badge||"green"}" style="font-size:11px;font-weight:700">● ${escapeHtml(g.label||"Optimal Pace")}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Personal Workspace &amp; Performance Radar · Standard Capacity: <strong>${y}h / week</strong>
              </p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn primary" id="btnEmpQuickJobs" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md)">
              <span>📋</span> My Jobs (${c.length})
            </button>
            <button class="btn secondary" id="btnEmpQuickTasks" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;padding:9px 16px;border-radius:var(--r-md)">
              <span>✅</span> Daily Tasks
            </button>
          </div>

        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-top:22px;padding-top:18px;border-top:1px solid var(--border-xs)">
          <div style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4)">
            Period Performance Scope
          </div>
          <div id="empOverviewPeriodWrapper">
            ${renderPeriodPicker(k.period)}
          </div>
        </div>
      </div>

      <!-- Action Banner: Urgent / Revision Alerts -->
      ${w.length>0||h.length>0||f.length>0?`
        <div class="card" style="background:linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.06) 100%);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <span style="font-size:24px">⚡</span>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                High Priority Focus Items
              </div>
              <div style="font-size:13px;color:var(--text-2);display:flex;gap:12px;flex-wrap:wrap">
                ${w.length>0?`<span style="color:var(--red);font-weight:700">🔴 ${w.length} Urgent Job(s)</span>`:""}
                ${h.length>0?`<span style="color:var(--amber-500);font-weight:700">↺ ${h.length} Revision Request(s)</span>`:""}
                ${f.length>0?`<span style="color:var(--brand-500);font-weight:700">🎫 ${f.length} Open Ticket(s)</span>`:""}
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
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${Number(g.utilization||0).toFixed(0)}%</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${Number(g.hours||0).toFixed(1)} hrs tracked this period</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active Workload</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${$.length}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${m.length} completed deliverables</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Today's Task Progress</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${A.length} <span style="font-size:18px;font-weight:600;color:var(--text-4)">/ ${T.length}</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${n}% of today's checklist completed</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Value Output Tracked</div>
              <div style="font-size:20px">💰</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${fmtINR(g.revenue||0)}</div>
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${t.length} pending · ${A.length} done</p>
            </div>
            <button class="btn secondary small" onclick="ci360NavTab('dailytasks')" style="font-size:12px">
              Open Checklist →
            </button>
          </div>

          <!-- Progress Bar -->
          <div style="margin-bottom:16px">
            <div style="width:100%;height:8px;background:var(--border-sm);border-radius:8px;overflow:hidden">
              <div style="width:${n}%;height:100%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:8px;transition:width 0.4s ease"></div>
            </div>
          </div>

          ${T.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${T.slice(0,5).map(o=>{const z=o.status==="Completed";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <span style="font-size:16px">${z?"✅":"⚪"}</span>
                      <span style="font-size:13px;font-weight:600;color:${z?"var(--text-4)":"var(--text-1)"};${z?"text-decoration:line-through":""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
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
              <p style="font-size:12px;color:var(--text-3);margin:0">${S.length} active client accounts on roster</p>
            </div>
            <span class="badge gold" style="font-weight:700">${S.length} Accounts</span>
          </div>

          ${S.length>0?`
            <div style="display:flex;flex-direction:column;gap:10px">
              ${S.slice(0,5).map(o=>{const _=(I.clients.find(H=>String(H._id)===String(o.clientId))||{}).name||"Client Account";return`
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0">
                      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0">
                        ${_.slice(0,2).toUpperCase()}
                      </div>
                      <div style="min-width:0">
                        <div style="font-size:13.5px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(_)}</div>
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
                ${c.slice(0,6).map(o=>{var N;const z=o.status==="Completed"||o.clientApproval&&o.clientApproval.status==="Approved"||o.completionDate,_=o.clientApproval&&o.clientApproval.status==="Revision Requested",H=((N=o.clientId)==null?void 0:N.name)||U(o.clientId)||"Client",j=o.priority==="Urgent"?"red":o.priority==="High"?"amber":"gray";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('myjobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(o.title||"Untitled Job")}
                      </td>
                      <td>
                        <span class="badge blue" style="font-size:11px">${escapeHtml(H)}</span>
                      </td>
                      <td>
                        <span class="badge ${j}" style="font-size:11px;font-weight:700">${escapeHtml(o.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(o.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${o.completionDate?fmtDate(o.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${z?"green":_?"red":"amber"}" style="font-weight:700">
                          ${z?"✓ Completed":_?"↺ Revision":"⏳ In Progress"}
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
  `;const D=document.getElementById("btnEmpQuickJobs");D&&(D.onclick=()=>{k.tab="myjobs",R()});const p=document.getElementById("btnEmpQuickTasks");p&&(p.onclick=()=>{k.tab="dailytasks",R()}),document.querySelectorAll("#empOverviewPeriodWrapper [data-period]").forEach(o=>{o.onclick=()=>{k.period=o.dataset.period,u()}})}async function K(a){const i=await apiGet("/jobs?mine=true"),s={Medium:"gray",High:"amber",Urgent:"red"};if(i.length===0){a.innerHTML=`
      <div class="block">
        <h2>My Jobs <span class="eyebrow">No assigned jobs yet</span></h2>
        ${renderEmptyState("No jobs assigned yet","Jobs assigned to you by admins will appear here.","📋")}
      </div>`;return}a.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h2 style="margin:0">My Jobs <span class="eyebrow">${i.length} total</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--text-3)">Click the date or 💾 to save completion date</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${i.map(e=>{var m,$,h;const l=(e.assignments||[]).find(w=>String(w.personId)===String(d.personnelId._id||d.personnelId)),v=String(e.createdBy)===String(d._id),r=e.status==="Completed",b=e.clientApproval&&e.clientApproval.status==="Approved",y=e.clientApproval&&e.clientApproval.status==="Revision Requested",g=e.completionDate?new Date(e.completionDate).toISOString().slice(0,10):"",c=s[e.priority||"Medium"]||"gray";return`
          <div class="job-card" style="background:var(--bg-card);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:20px 22px;box-shadow:var(--shadow-xs);transition:all var(--t-fast);border-left:4px solid ${b?"var(--green-500)":y?"var(--red-500)":r?"var(--green-500)":"var(--brand-500)"}">
            <!-- Header row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0 0 6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(e.title||"Untitled Job")}</h3>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                  <span class="badge ${r?"green":"amber"}">${r?"✓ Completed":"⏳ In Progress"}</span>
                  ${b?`<span class="badge green">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:""}
                  ${y?'<span class="badge red">↺ Revision Requested</span>':""}
                  <span class="badge ${c}">${escapeHtml(e.priority||"Medium")}</span>
                  ${(e.serviceNames||[]).map(w=>`<span class="badge gray">${escapeHtml(w)}</span>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0;align-items:center">
                <!-- Toggle Status -->
                <button type="button" class="btn ${r?"secondary":"primary"} small"
                        onclick="toggleStatus('${e._id}', ${!r})"
                        style="font-size:12px">
                  ${r?"↩ Reopen":"✓ Mark Done"}
                </button>
                ${v?`<button type="button" class="btn danger small" onclick="delJob('${e._id}')">Delete</button>`:""}
              </div>
            </div>

            <!-- Revision Requested Alert Box for Employee -->
            ${y?`
              <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-bottom:14px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
                  <strong style="color:var(--red-500);font-size:13px;display:flex;align-items:center;gap:6px">
                    <span>⚠️</span> Client Requested Changes / Revision
                  </strong>
                  <span style="font-size:11px;color:var(--text-4)">${fmtDate(((m=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:m.requestedAt)||e.updatedAt)}</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);padding:8px 10px;border-radius:var(--r-xs);margin-top:6px;line-height:1.4">
                  "${escapeHtml(e.clientApproval.feedback||"Revision requested")}"
                </div>
                ${(h=($=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:$.attachments)!=null&&h.length?`
                  <div style="margin-top:8px">
                    ${renderAttachmentChips(e.clientApproval.revisions.slice(-1)[0].attachments,{title:"Client Reference Markups"})}
                  </div>
                `:""}
              </div>
            `:""}

            <!-- Details grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:14px">
              <div>
                <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4);margin-bottom:3px">Client</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${escapeHtml(U(e.clientId))}</div>
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
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${l?fmtHours(l.hours):"0 hrs"}</div>
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
                  <label style="font-size:11.5px">Deliverable Notes / Details</label>
                  <input type="text" id="empDelNotes-${e._id}" placeholder="e.g. Final Video Render v2, PSD Source files, Figma export link..." style="font-size:12.5px;padding:6px 10px" />
                </div>
                ${renderAttachmentUploader({id:"empDelUp-"+e._id,label:"Completed Files",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, images or zip packages"})}
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px">
                  <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
                    <input type="checkbox" id="empDelMarkComplete-${e._id}" ${r?"":"checked"} style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
                    <span>Mark Job as Completed upon submitting</span>
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
                value="${g}"
                style="border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:6px 10px;font-size:13px;background:var(--bg-surface);color:var(--text-1);cursor:pointer;outline:none;max-width:180px"
              >
              <button type="button" class="btn gold small" onclick="saveCompDate('${e._id}')" title="Save your delivery date">
                💾 Save Date
              </button>
              ${g?`<span class="badge green" style="margin-left:auto">Committed Delivery: ${g}</span>`:'<span class="badge gray" style="margin-left:auto">No Date Set</span>'}
            </div>

            ${renderSupportTicketSection(e._id,B())}
          </div>`}).join("")}
      </div>
    </div>`,document.querySelectorAll(".emp-completion-date").forEach(e=>{e.addEventListener("focus",()=>{e.style.borderColor="var(--border-focus)",e.style.boxShadow="0 0 0 3px var(--accent-ring)"}),e.addEventListener("blur",()=>{e.style.borderColor="",e.style.boxShadow=""})}),i.forEach(e=>{bindAttachmentUploader("empDelUp-"+e._id)}),document.querySelectorAll(".emp-del-toggle").forEach(e=>{e.onclick=()=>{const l=document.getElementById("empDelForm-"+e.dataset.id);if(l){const v=l.style.display==="none";l.style.display=v?"block":"none",e.textContent=v?"✕ Close":"+ Add Deliverables"}}}),document.querySelectorAll(".emp-del-cancel").forEach(e=>{e.onclick=()=>{const l=document.getElementById("empDelForm-"+e.dataset.id);l&&(l.style.display="none");const v=document.querySelector(`.emp-del-toggle[data-id="${e.dataset.id}"]`);v&&(v.textContent="+ Add Deliverables")}}),document.querySelectorAll(".emp-del-submit").forEach(e=>{e.onclick=async()=>{var y,g;const l=e.dataset.id,v=getUploaderAttachments("empDelUp-"+l),r=((y=(document.getElementById("empDelNotes-"+l)||{}).value)==null?void 0:y.trim())||"",b=((g=document.getElementById("empDelMarkComplete-"+l))==null?void 0:g.checked)||!1;if(!v.length){flashToast("Please upload or attach at least one file",!0);return}e.disabled=!0,e.textContent="Submitting…";try{const c=v.map(m=>({...m,notes:r}));await apiPost(`/jobs/${l}/deliverables`,{deliverables:c,markComplete:b}),flashToast(b?"Deliverables submitted & job marked as Completed! 📦🎉":"Deliverables submitted successfully! 📦"),u()}catch(c){flashToast(c.message,!0)}finally{e.disabled=!1,e.textContent="Submit Deliverables"}}}),i.forEach(e=>bindSupportTicketSection(e._id,B()))}let x={date:new Date().toISOString().slice(0,10),filter:"all",search:""};async function J(){try{const a=await apiGet("/tasks");if(Array.isArray(a))return localStorage.setItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"),JSON.stringify(a)),a}catch(a){console.warn("Backend /api/tasks offline, using local fallback:",a)}try{const a=localStorage.getItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"));return a?JSON.parse(a):[]}catch{return[]}}async function L(a,i=null){let s=null;try{i?s=await apiPut("/tasks/"+i,a):s=await apiPost("/tasks",a)}catch(l){console.warn("API task save failed, writing local backup:",l)}let e=[];try{const l=localStorage.getItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"));e=l?JSON.parse(l):[]}catch{}if(i){const l=e.findIndex(v=>v._id===i);l>=0&&(e[l]=s||{...e[l],...a,updatedAt:new Date})}else s||(s={_id:"loc_"+Date.now(),...a,createdAt:new Date,completedAt:a.status==="Completed"?new Date:null}),e.unshift(s);return localStorage.setItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"),JSON.stringify(e)),s}async function X(a){try{await apiDelete("/tasks/"+a)}catch(i){console.warn("API task delete failed, updating storage:",i)}try{const i=localStorage.getItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"));let s=i?JSON.parse(i):[];s=s.filter(e=>e._id!==a),localStorage.setItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"),JSON.stringify(s))}catch{}}async function Z(a){try{return await apiPatch("/tasks/"+a+"/toggle",{})}catch(i){console.warn("API toggle failed, toggling locally:",i)}try{const i=localStorage.getItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"));let s=i?JSON.parse(i):[];const e=s.find(l=>l._id===a);if(e){const l=e.status!=="Completed";return e.status=l?"Completed":"Todo",e.completedAt=l?new Date:null,localStorage.setItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"),JSON.stringify(s)),e}}catch{}return null}function q(a,i){let s;if(!a||a==="all")s=new Date;else{const r=a.split("-");r.length===3?s=new Date(Number(r[0]),Number(r[1])-1,Number(r[2])):s=new Date}s.setDate(s.getDate()+i);const e=s.getFullYear(),l=String(s.getMonth()+1).padStart(2,"0"),v=String(s.getDate()).padStart(2,"0");return`${e}-${l}-${v}`}function ee(a){if(!a||a==="all")return"All Days Checklist";const i=a.split("-"),s=i.length===3?new Date(Number(i[0]),Number(i[1])-1,Number(i[2])):new Date,e=new Date;e.setHours(0,0,0,0);const l=new Date(s);l.setHours(0,0,0,0);const v=Math.round((l-e)/(1e3*60*60*24)),r=s.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric",year:"numeric"});return v===0?`Today · ${r}`:v===-1?`Yesterday · ${r}`:v===1?`Tomorrow · ${r}`:r}async function F(a){const i=await J(),s=new Date,e=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`,l=x.date;let v=i;l!=="all"&&(v=i.filter(p=>p.dueDate?new Date(p.dueDate).toISOString().slice(0,10)===l:l===e));const r=v.length,b=v.filter(p=>p.status==="Completed").length,y=r-b,g=r>0?Math.round(b/r*100):0,c=r>0&&b===r;let m=v;if(x.filter==="active"?m=m.filter(p=>p.status!=="Completed"):x.filter==="completed"&&(m=m.filter(p=>p.status==="Completed")),x.search){const p=x.search.toLowerCase();m=m.filter(o=>(o.title||"").toLowerCase().includes(p))}const $=l===e;a.innerHTML=`
    <div class="block" style="max-width:880px;margin:0 auto">
      <!-- Section Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="margin:0 0 4px;display:flex;align-items:center;gap:8px">
            <span>Daily Tasks</span>
            <span class="eyebrow">${r} ${r===1?"task":"tasks"}</span>
          </h2>
          <div style="font-size:12.5px;color:var(--text-3)">Your simple daily checklist to check off what gets done today.</div>
        </div>

        <!-- Date Navigation Bar -->
        <div class="daily-date-nav-bar">
          <button type="button" class="daily-nav-arrow" id="dailyPrevDayBtn" title="Previous Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button type="button" class="btn ${$?"primary":"ghost"} small" id="dailyTodayBtn" style="padding:4px 10px;font-size:12px;font-weight:700">
            📅 Today
          </button>

          <input type="date" id="dailyDatePickerInp" class="daily-date-picker-inp" value="${l==="all"?e:l}">

          <button type="button" class="daily-nav-arrow" id="dailyNextDayBtn" title="Next Day">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button type="button" class="btn ${l==="all"?"gold":"ghost"} small" id="dailyAllDatesBtn" style="padding:4px 10px;font-size:12px">
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
              ${ee(l)}
            </span>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:12.5px;font-weight:700;color:${c?"var(--green-600)":"var(--text-2)"}">
                ${r>0?`${b} of ${r} completed (${g}%)`:"No tasks yet"}
              </span>
            </div>
          </div>

          <div class="heatmap-bar-wrap" style="height:8px;background:var(--bg-elevated);border-radius:var(--r-full);overflow:hidden">
            <div class="heatmap-bar-fill" style="width:${g}%;background:${c?"var(--green-500)":"var(--brand-500)"};height:100%;transition:width 0.4s ease"></div>
          </div>

          ${c?`
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
              <button class="pchip ${x.filter==="all"?"active":""}" data-df="all">All (${r})</button>
              <button class="pchip ${x.filter==="active"?"active":""}" data-df="active">To Do (${y})</button>
              <button class="pchip ${x.filter==="completed"?"active":""}" data-df="completed">✓ Completed (${b})</button>
            </div>

            <div style="display:flex;gap:8px;align-items:center">
              <div class="ticket-search-box" style="margin:0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="dailySearchInp" placeholder="Search checklist…" value="${escapeHtml(x.search)}" style="font-size:12px;padding:4px 6px">
                ${x.search?'<button type="button" id="dailyClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:11px">✕</button>':""}
              </div>

              ${b>0?`
                <button type="button" class="btn ghost small" onclick="clearCompletedDailyTasks()" style="font-size:11.5px;color:var(--text-3);padding:4px 8px" title="Remove completed tasks">
                  Clear Completed
                </button>
              `:""}
            </div>
          </div>
        </div>

        <!-- Checklist Rows -->
        <div id="dailyChecklistRowsContainer" style="border-top:1px solid var(--border-xs)">
          ${m.length===0?`
            <div style="text-align:center;padding:48px 20px;color:var(--text-3)">
              <div style="font-size:36px;margin-bottom:8px">📝</div>
              <div style="font-weight:700;font-size:15px;color:var(--text-1);margin-bottom:4px">No tasks on this checklist</div>
              <div style="font-size:12.5px;color:var(--text-4);max-width:320px;margin:0 auto">Type your task above and press Enter to start checking off items for ${l==="all"?"your list":"today"}.</div>
            </div>
          `:m.map(p=>{const o=p.status==="Completed",z=p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):"";return`
              <div class="daily-item-row ${o?"completed":""}" id="daily-row-${p._id}">
                <!-- Circle checkbox -->
                <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:0">
                  <button type="button" class="daily-circle-check ${o?"checked":""}" onclick="toggleDailyTask('${p._id}')" title="${o?"Mark Incomplete":"Mark Complete"}">
                    ✓
                  </button>
                  <span class="daily-item-text" onclick="toggleDailyTask('${p._id}')" style="cursor:pointer;flex:1">
                    ${escapeHtml(p.title)}
                  </span>
                </div>

                <!-- Right Side Meta & Actions -->
                <div class="daily-actions-hover">
                  ${l==="all"&&z?`
                    <span class="task-tag-pill" style="font-size:10.5px;margin-right:6px">📅 ${z===e?"Today":z}</span>
                  `:""}
                  <button type="button" class="btn ghost small" onclick="editDailyTask('${p._id}')" title="Edit task" style="padding:3px 7px;font-size:12px">✏️</button>
                  <button type="button" class="btn ghost small" onclick="deleteDailyTask('${p._id}')" title="Delete task" style="padding:3px 7px;font-size:12px;color:var(--red-500)">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `;const h=document.getElementById("dailyTaskQuickInput"),w=document.getElementById("dailyTaskAddBtn"),C=async()=>{const p=((h==null?void 0:h.value)||"").trim();if(!p){flashToast("Please enter a task",!0);return}const o=x.date==="all"?e:x.date;try{await L({title:p,status:"Todo",dueDate:o}),flashToast("Task added! ✍️"),h&&(h.value="",h.focus()),u()}catch(z){flashToast(z.message,!0)}};w&&(w.onclick=C),h&&(h.onkeydown=p=>{p.key==="Enter"&&C()}),document.querySelectorAll("[data-df]").forEach(p=>{p.onclick=()=>{x.filter=p.dataset.df,u()}});const T=document.getElementById("dailyPrevDayBtn");T&&(T.onclick=()=>{x.date=q(x.date,-1),u()});const A=document.getElementById("dailyNextDayBtn");A&&(A.onclick=()=>{x.date=q(x.date,1),u()});const t=document.getElementById("dailyTodayBtn");t&&(t.onclick=()=>{x.date=e,u()});const n=document.getElementById("dailyAllDatesBtn");n&&(n.onclick=()=>{x.date=x.date==="all"?e:"all",u()});const f=document.getElementById("dailyDatePickerInp");f&&(f.onchange=p=>{p.target.value&&(x.date=p.target.value,u())});const S=document.getElementById("dailySearchInp");S&&(S.oninput=p=>{x.search=p.target.value,F(a)});const D=document.getElementById("dailyClearSearch");D&&(D.onclick=()=>{x.search="",u()})}window.toggleDailyTask=async function(a){try{await Z(a),u()}catch(i){flashToast(i.message,!0)}};window.deleteDailyTask=async function(a){try{await X(a),flashToast("Task deleted"),u()}catch(i){flashToast(i.message,!0)}};window.editDailyTask=async function(a){const s=(await J()).find(l=>l._id===a);if(!s)return;const e=prompt("Edit task:",s.title);if(e!==null&&e.trim())try{await L({title:e.trim()},a),flashToast("Task updated"),u()}catch(l){flashToast(l.message,!0)}};window.clearCompletedDailyTasks=async function(){if(confirm("Delete all completed tasks from this view?"))try{await apiPost("/tasks/clear-completed",{date:x.date});try{const a=localStorage.getItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"));if(a){let i=JSON.parse(a);i=i.filter(s=>s.status!=="Completed"),localStorage.setItem("ci360_tasks_"+((d==null?void 0:d._id)||"user"),JSON.stringify(i))}}catch{}flashToast("Completed tasks deleted! 🗑️"),u()}catch(a){flashToast(a.message,!0)}};let P="",E="all";async function M(a){let i=await apiGet("/tickets");i.sort((t,n)=>new Date(n.createdAt)-new Date(t.createdAt));const s=B(),e=i.length,l=i.filter(t=>t.status==="Open").length,v=i.filter(t=>t.status==="In Review").length,r=i.filter(t=>t.status==="Resolved"||t.status==="Closed").length,b=e>0?Math.round(r/e*100):100,y=k.ticketsFilter||"all";let g=i;if(y==="open"?g=g.filter(t=>t.status==="Open"):y==="in-review"?g=g.filter(t=>t.status==="In Review"):y==="resolved"?g=g.filter(t=>t.status==="Resolved"):y==="closed"&&(g=g.filter(t=>t.status==="Closed")),E!=="all"&&(g=g.filter(t=>t.priority===E)),P){const t=P.toLowerCase();g=g.filter(n=>{const f=n.jobId&&n.jobId.title||"";return(n.subject||"").toLowerCase().includes(t)||(n.message||"").toLowerCase().includes(t)||(n.userName||"").toLowerCase().includes(t)||f.toLowerCase().includes(t)})}const c={Open:"red","In Review":"amber",Resolved:"green",Closed:"gray"},m={Low:"green",Medium:"gray",High:"amber",Urgent:"red"};function $(t){if(!t)return"U";const n=t.trim().split(/\s+/);return n.length===1?n[0].slice(0,2).toUpperCase():(n[0][0]+n[n.length-1][0]).toUpperCase()}function h(t){if(!t)return"";const n=new Date,f=new Date(t),S=Math.floor((n-f)/1e3);if(S<60)return"Just now";const D=Math.floor(S/60);if(D<60)return`${D}m ago`;const p=Math.floor(D/60);if(p<24)return`${p}h ago`;const o=Math.floor(p/24);return o<7?`${o}d ago`:fmtDate(t)}a.innerHTML=`
    <section class="block">
      <!-- Top KPIs -->
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
            <div class="ticket-kpi-val">${l}</div>
            <div class="ticket-kpi-lbl">Open Action Req.</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon amber">🟡</div>
          <div>
            <div class="ticket-kpi-val">${v}</div>
            <div class="ticket-kpi-lbl">In Review</div>
          </div>
        </div>
        <div class="ticket-kpi-card">
          <div class="ticket-kpi-icon green">⚡</div>
          <div>
            <div class="ticket-kpi-val">${b}%</div>
            <div class="ticket-kpi-lbl">Resolution Rate</div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="pchip ${y==="all"?"active":""}" data-tf="all">All (${e})</button>
          <button class="pchip ${y==="open"?"active":""}" data-tf="open">🔴 Open (${l})</button>
          <button class="pchip ${y==="in-review"?"active":""}" data-tf="in-review">🟡 In Review (${v})</button>
          <button class="pchip ${y==="resolved"?"active":""}" data-tf="resolved">🟢 Resolved (${r})</button>
          <button class="pchip ${y==="closed"?"active":""}" data-tf="closed">⚪ Closed</button>
        </div>

        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select id="empTkPriFilter" style="font-size:12.5px;padding:8px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);color:var(--text-1);outline:none">
            <option value="all" ${E==="all"?"selected":""}>All Priorities</option>
            <option value="Urgent" ${E==="Urgent"?"selected":""}>🔴 Urgent</option>
            <option value="High" ${E==="High"?"selected":""}>🟠 High</option>
            <option value="Medium" ${E==="Medium"?"selected":""}>🟡 Medium</option>
            <option value="Low" ${E==="Low"?"selected":""}>🟢 Low</option>
          </select>

          <div class="ticket-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="empTkSearch" placeholder="Search by subject, client, job…" value="${escapeHtml(P)}">
            ${P?'<button type="button" id="empClearSearch" style="background:none;border:none;color:var(--text-4);cursor:pointer;font-size:12px">✕</button>':""}
          </div>

          <button class="btn gold" id="empRaiseTicketGlobalBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Raise Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Cards -->
      ${g.length===0?renderEmptyState("No support tickets found","No tickets match the selected criteria.","🎫"):`
      <div style="display:flex;flex-direction:column;gap:14px">
        ${g.map(t=>{var o;const n=t.jobId?t.jobId.title||"Untitled Job":"General Workspace Support",f=(t.status||"Open").toLowerCase().replace(" ","-"),S=t.status==="Open",D=(t._id||"").slice(-4).toUpperCase(),p=$(t.userName);return`
          <div class="ticket-card status-${f}" id="emp-tk-${t._id}">
            <div class="ticket-card-header">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
                  <span class="ticket-id-tag">#TK-${D}</span>
                  <span class="ticket-subject">${escapeHtml(t.subject)}</span>
                </div>
                <div style="font-size:12px;color:var(--text-4);margin-top:2px">
                  📁 Job: <strong style="color:var(--text-2)">${escapeHtml(n)}</strong>
                </div>
              </div>
              <div class="ticket-meta-badges">
                <span class="badge ${c[t.status]||"gray"}">
                  ${S?'<span class="pulse-dot"></span>':""} ${escapeHtml(t.status)}
                </span>
                <span class="badge ${m[t.priority]||"gray"}">${escapeHtml(t.priority)}</span>
              </div>
            </div>

            <div class="ticket-author-row">
              <div class="ticket-avatar">${p}</div>
              <div class="ticket-author-meta">
                <div class="ticket-author-name">
                  ${escapeHtml(t.userName)}
                  <span class="ticket-role-pill">${escapeHtml(t.userRole)}</span>
                </div>
                <span class="ticket-time-ago">${h(t.createdAt)} · ${fmtDate(t.createdAt)}</span>
              </div>
            </div>

            <div class="ticket-message-box">
              ${escapeHtml(t.message)}
            </div>

            ${t.adminReply?`
              <div class="ticket-thread-wrap">
                <div class="ticket-admin-reply-card">
                  <div class="ticket-admin-reply-header">
                    <span class="ticket-shield-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Staff Response
                    </span>
                    ${t.repliedAt?`<span style="font-size:11px;color:var(--text-4)">${h(t.repliedAt)}</span>`:""}
                  </div>
                  <div class="ticket-admin-reply-text">${escapeHtml(t.adminReply)}</div>
                </div>
              </div>`:""}

            ${s?`
            <div class="ticket-toolbar">
              <label style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Status:</label>
              <select class="emp-tk-status-sel" data-tkid="${t._id}" style="font-size:12px;padding:5px 8px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1)">
                <option value="Open" ${t.status==="Open"?"selected":""}>🔴 Open</option>
                <option value="In Review" ${t.status==="In Review"?"selected":""}>🟡 In Review</option>
                <option value="Resolved" ${t.status==="Resolved"?"selected":""}>🟢 Resolved</option>
                <option value="Closed" ${t.status==="Closed"?"selected":""}>⚪ Closed</option>
              </select>

              <button class="btn ghost small emp-tk-reply-toggle" data-tkid="${t._id}" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${t.adminReply?"Edit Reply":"💬 Reply"}
              </button>

              ${t.status!=="Resolved"?`
                <button class="btn ghost small emp-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Quick Resolve
                </button>`:""}

              <button class="btn danger small emp-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>

              <div class="ticket-reply-form" id="emp-tk-replyform-${t._id}">
                <div class="ticket-templates-bar">
                  <span style="font-size:10px;font-weight:700;color:var(--text-4);text-transform:uppercase;align-self:center">Quick:</span>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Mansi & Urna team is on it! Updates will be shared shortly.">🚀 On It</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="This issue has been resolved and the updates have been saved.">✅ Resolved</button>
                  <button type="button" class="ticket-template-btn" data-tkid="${t._id}" data-tpl="Could you please provide more details so we can assist further?">ℹ️ Need Info</button>
                </div>
                <textarea id="emp-tk-replytxt-${t._id}" rows="2" placeholder="Write response to ticket..." style="font-size:13px;padding:8px 10px;border:1px solid var(--border-sm);border-radius:var(--r-sm);background:var(--bg-surface);color:var(--text-1);resize:vertical;width:100%;box-sizing:border-box">${escapeHtml(t.adminReply||"")}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px">
                  <button class="btn ghost small emp-tk-reply-cancel" data-tkid="${t._id}" type="button">Cancel</button>
                  <button class="btn gold small emp-tk-reply-save" data-tkid="${t._id}" type="button">Save Response</button>
                </div>
              </div>
            </div>`:d&&String(((o=t.userId)==null?void 0:o._id)||t.userId)===String(d._id)?`
            <div class="ticket-toolbar" style="display:flex;align-items:center;gap:8px">
              <span style="font-size:11.5px;color:var(--text-3);font-weight:700">My Ticket</span>
              ${t.status!=="Resolved"&&t.status!=="Closed"?`
                <button class="btn ghost small emp-tk-quick-resolve" data-tkid="${t._id}" type="button" style="color:var(--green-600);border-color:var(--green-400)">
                  ✓ Mark Resolved
                </button>`:""}
              <button class="btn danger small emp-tk-del-btn" data-tkid="${t._id}" type="button" style="margin-left:auto;padding:3px 8px;font-size:11px">Delete</button>
            </div>
            `:""}
          </div>`}).join("")}
      </div>`}
    </section>
  `,document.querySelectorAll("[data-tf]").forEach(t=>{t.onclick=()=>{k.ticketsFilter=t.dataset.tf,u()}});const w=document.getElementById("empTkSearch");w&&(w.oninput=t=>{P=t.target.value,M(a)});const C=document.getElementById("empClearSearch");C&&(C.onclick=()=>{P="",M(a)});const T=document.getElementById("empTkPriFilter");T&&(T.onchange=t=>{E=t.target.value,M(a)});const A=document.getElementById("empRaiseTicketGlobalBtn");A&&(A.onclick=async()=>{let t=[];try{t=await apiGet("/jobs?mine=true"),(!t||!t.length)&&(t=await apiGet("/jobs").catch(()=>[]))}catch{t=[]}const n=openModal(`
        <div style="margin-bottom:14px">
          <h3 style="margin-bottom:4px">🎫 Raise Support Ticket</h3>
          <div style="font-size:12.5px;color:var(--text-3)">Create a new support request, note, or blocker report.</div>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Target / Job (Optional)</label>
          <select id="empModalTkJob" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="">📁 General Workspace Support (No specific job)</option>
            ${t.map(f=>`<option value="${f._id}">${escapeHtml(f.title||"Untitled Job")}</option>`).join("")}
          </select>
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Subject / Issue Title *</label>
          <input type="text" id="empModalTkSub" placeholder="Brief summary of the issue…" maxlength="120" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box">
        </div>

        <div class="field" style="margin-bottom:12px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Priority Level</label>
          <select id="empModalTkPri" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1)">
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium" selected>🟡 Medium Priority</option>
            <option value="High">🟠 High Priority</option>
            <option value="Urgent">🔴 Urgent / Blocker</option>
          </select>
        </div>

        <div class="field" style="margin-bottom:16px">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px;display:block">Detailed Description *</label>
          <textarea id="empModalTkMsg" rows="4" placeholder="Provide full details, feedback, or blockers…" style="width:100%;font-size:13.5px;padding:10px 12px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);box-sizing:border-box;resize:vertical"></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mEmpCancelTicket">Cancel</button>
          <button class="btn gold" id="mEmpSubmitTicket">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Ticket
          </button>
        </div>
      `);n.querySelector("#mEmpCancelTicket").onclick=()=>n.remove(),n.querySelector("#mEmpSubmitTicket").onclick=async()=>{const f=n.querySelector("#empModalTkJob").value||null,S=n.querySelector("#empModalTkSub").value.trim(),D=n.querySelector("#empModalTkPri").value,p=n.querySelector("#empModalTkMsg").value.trim();if(!S){flashToast("Please enter an issue subject",!0);return}if(!p){flashToast("Please enter description",!0);return}try{await apiPost("/tickets",{jobId:f,subject:S,message:p,priority:D}),flashToast("Support Ticket Raised! 🎫"),n.remove(),M(a)}catch(o){flashToast(o.message,!0)}}}),document.querySelectorAll(".emp-tk-quick-resolve").forEach(t=>{t.onclick=async()=>{try{await apiPut("/tickets/"+t.dataset.tkid,{status:"Resolved"}),flashToast("Ticket marked as Resolved! 🎉"),u()}catch(n){flashToast(n.message,!0)}}}),document.querySelectorAll(".emp-tk-del-btn").forEach(t=>{t.onclick=async()=>{if(confirm("Permanently delete this ticket?"))try{await apiDelete("/tickets/"+t.dataset.tkid),flashToast("Ticket deleted"),u()}catch(n){flashToast(n.message,!0)}}}),s&&(document.querySelectorAll(".ticket-template-btn").forEach(t=>{t.onclick=()=>{const n=document.getElementById("emp-tk-replytxt-"+t.dataset.tkid);n&&(n.value=t.dataset.tpl,n.focus())}}),document.querySelectorAll(".emp-tk-status-sel").forEach(t=>{t.onchange=async()=>{try{await apiPut("/tickets/"+t.dataset.tkid,{status:t.value}),flashToast("Status updated"),u()}catch(n){flashToast(n.message,!0)}}}),document.querySelectorAll(".emp-tk-reply-toggle").forEach(t=>{t.onclick=()=>{const n=document.getElementById("emp-tk-replyform-"+t.dataset.tkid);n&&n.classList.toggle("show")}}),document.querySelectorAll(".emp-tk-reply-cancel").forEach(t=>{t.onclick=()=>{const n=document.getElementById("emp-tk-replyform-"+t.dataset.tkid);n&&n.classList.remove("show")}}),document.querySelectorAll(".emp-tk-reply-save").forEach(t=>{t.onclick=async()=>{const n=document.getElementById("emp-tk-replytxt-"+t.dataset.tkid);if(n)try{await apiPut("/tickets/"+t.dataset.tkid,{adminReply:n.value.trim()}),flashToast("Response saved! 🛡️"),u()}catch(f){flashToast(f.message,!0)}}}))}window.saveCompDate=async function(a){try{const i=document.querySelector(`.emp-completion-date[data-id="${a}"]`);if(!i)return;const s=i.value?i.value:null;await apiPut("/jobs/"+a,{completionDate:s,status:s?"Completed":"In Progress"}),flashToast("Delivery date & status saved!"),u()}catch(i){flashToast(i.message,!0)}};window.toggleStatus=async function(a,i){try{const s=document.querySelector(`.emp-completion-date[data-id="${a}"]`);let e=i?(s==null?void 0:s.value)||new Date().toISOString().slice(0,10):null;s&&(s.value=e||""),await apiPut("/jobs/"+a,{status:i?"Completed":"In Progress",completionDate:e}),flashToast(i?"Job marked as Completed! 🎉":"Job reopened as In Progress"),u()}catch(s){flashToast(s.message,!0)}};window.delJob=async function(a){if(confirm("Delete this job entry? This cannot be undone."))try{await apiDelete("/jobs/"+a),flashToast("Job deleted"),u()}catch(i){flashToast(i.message,!0)}};async function te(a){const[i,s]=await Promise.all([apiGet("/dashboard/employee?period="+k.period),apiGet("/targets?mine=true")]),e=I.personnel.find(c=>{var m;return String(c._id)===String(((m=d.personnelId)==null?void 0:m._id)||d.personnelId)}),l=e?e.capacity:48,v=i.target?i.target.targetHours:Math.round(l*.85),r=Math.round(i.hours/(v||1)*100),b=r>=100?"green":r>=75?"amber":"red",y=Math.min(r,100);a.innerHTML=`
    <div class="block">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2 style="margin:0 0 2px">My Targets <span class="eyebrow">${escapeHtml(d.name)}</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track your productivity targets and output quotas assigned by management.</div>
        </div>
        ${Q()}
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
          <div class="kpi-value">${fmtHours(v)}</div>
          <div class="kpi-sub">${r}% completed</div>
        </div>
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Weekly Capacity</span><div class="kpi-icon">⚡</div></div>
          <div class="kpi-value">${l} hrs/wk</div>
          <div class="kpi-sub">${e?e.status:"active"} status</div>
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
            <div style="font-size:13.5px;font-weight:700;color:var(--text-1)">Overall Hours Target (${k.period})</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">${fmtHours(i.hours)} logged of ${fmtHours(v)} target capacity</div>
          </div>
          <span class="badge ${b}" style="font-size:12.5px;padding:4px 10px">${r}% Achieved</span>
        </div>
        <div class="progress-bar-wrap" style="height:10px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden">
          <div class="progress-bar-fill ${b}" style="width:${y}%;height:100%;border-radius:var(--r-full);background:var(--${b==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-4);margin-top:8px">
          <span>0 hrs</span><span>Target: ${fmtHours(v)}</span>
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
          ${s.map(c=>{var f;const m=((f=c.serviceId)==null?void 0:f.name)||"General Service",h={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"}[c.unit]||(c.unit?c.unit.charAt(0).toUpperCase()+c.unit.slice(1):"Deliverables"),w=c.actual||0,C=c.quantity||1,T=C>0?w/C:0,A=Math.round(T*100),t=Math.min(A,100),n=T>=1?{l:"🟢 On Pace",c:"green"}:T>=.6?{l:"🟡 Behind",c:"amber"}:{l:"🔴 Off Pace",c:"red"};return`
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;border:1px solid var(--border-sm);position:relative">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px">
                  <div>
                    <span style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.04em">Service Target</span>
                    <h4 style="font-size:15.5px;font-weight:700;margin:2px 0 0;color:var(--text-1)">${escapeHtml(m)}</h4>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center">
                    <span class="badge ${n.c}">${n.l}</span>
                    <button type="button" class="btn ghost small edit-emp-target" data-id="${c._id}" style="padding:4px 8px;font-size:11.5px">✏️ Edit</button>
                  </div>
                </div>

                <div style="display:flex;align-items:baseline;gap:6px;margin:10px 0 6px">
                  <span style="font-size:24px;font-weight:800;color:var(--text-1)">${w}</span>
                  <span style="font-size:13px;color:var(--text-3)">/ ${C} ${escapeHtml(h)} per ${c.period==="day"?"day":c.period==="week"?"week":"month"}</span>
                </div>

                <!-- Progress Bar -->
                <div class="progress-bar-wrap" style="height:8px;border-radius:var(--r-full);background:var(--bg-surface);overflow:hidden;margin:6px 0 10px">
                  <div class="progress-bar-fill ${n.c}" style="width:${t}%;height:100%;border-radius:var(--r-full);background:var(--${n.c==="green"?"green":"amber"}-500);transition:width 0.8s ease"></div>
                </div>

                <!-- Direct Log Completed Output -->
                <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px">
                  <span style="font-size:12px;font-weight:700;color:var(--text-2)">Completed:</span>
                  <div style="display:flex;align-items:center;gap:5px">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${c._id}', -1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">-</button>
                    <input type="number" min="0" step="0.5" class="emp-target-completed-inp" data-id="${c._id}" value="${w}" style="width:60px;padding:4px 6px;text-align:center;font-weight:700;font-size:13px;border:1px solid var(--border-sm);border-radius:var(--r-xs);background:var(--bg-surface);color:var(--text-1);outline:none">
                    <button type="button" class="btn ghost small" onclick="stepTargetCompleted('${c._id}', 1)" style="padding:2px 8px;font-weight:800;font-size:13px;border:1px solid var(--border-sm);line-height:1">+</button>
                    <button type="button" class="btn gold small" onclick="saveTargetCompleted('${c._id}')" style="padding:4px 8px;font-size:11.5px" title="Save completed quantity">💾 Save</button>
                  </div>
                </div>

                <!-- Proof of Work Attachments -->
                ${c.attachments&&c.attachments.length?`
                  <div data-attachments="${encodeURIComponent(JSON.stringify(c.attachments))}" style="margin-top:8px">
                    ${renderAttachmentChips(c.attachments,{title:"Attached Proofs & Files"})}
                  </div>
                `:""}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-4);border-top:1px solid var(--border-sm);padding-top:10px">
                <span>Period: <strong style="color:var(--text-2)">${c.period==="day"?"Daily":c.period==="week"?"Weekly":"Monthly"}</strong></span>
                <span><strong>${A}%</strong> Completed</span>
              </div>
            </div>`}).join("")}
        </div>
      `}
    </div>`;const g=document.getElementById("addEmpTargetBtn");g&&(g.onclick=()=>O(null)),document.querySelectorAll(".edit-emp-target").forEach(c=>{c.onclick=()=>O(s.find(m=>m._id===c.dataset.id))}),V()}window.stepTargetCompleted=function(a,i){const s=document.querySelector(`.emp-target-completed-inp[data-id="${a}"]`);if(!s)return;let e=Math.max(0,(Number(s.value)||0)+i);s.value=e,saveTargetCompleted(a)};window.saveTargetCompleted=async function(a){try{const i=document.querySelector(`.emp-target-completed-inp[data-id="${a}"]`);if(!i)return;const s=Number(i.value)||0;await apiPut("/targets/"+a,{completed:s}),flashToast("Target progress updated! 🎯"),u()}catch(i){flashToast(i.message,!0)}};function O(a){var c,m;const i=!a,s=I.services||[];a=a||{serviceId:(c=s[0])==null?void 0:c._id,quantity:5,unit:"reels",period:"day",completed:0,attachments:[]};const e=((m=a.serviceId)==null?void 0:m._id)||a.serviceId||"",v=["reels","stories","posts","count","hours"].includes(a.unit),r=openModal(`
    <h3>${i?"Set New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Customize your output target goals, choose or type your own unit, and track completed output.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Category *</label>
      <select id="mEmpTgtService">
        ${s.map($=>`<option value="${$._id}" ${String($._id)===String(e)?"selected":""}>${escapeHtml($.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Goal Quota *</label>
        <input type="number" id="mEmpTgtQty" min="0.5" step="0.5" value="${a.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Completed Output</label>
        <input type="number" id="mEmpTgtCompleted" min="0" step="0.5" value="${a.actual||a.completed||0}">
      </div>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mEmpTgtUnit">
          <option value="reels" ${v&&a.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${v&&a.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${v&&a.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${v&&a.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${v&&a.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${v?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>

      <div class="field" style="margin-bottom:0">
        <label>Frequency / Target Period *</label>
        <select id="mEmpTgtPeriod">
          <option value="day" ${a.period==="day"?"selected":""}>Per Day</option>
          <option value="week" ${a.period==="week"?"selected":""}>Per Week</option>
          <option value="month" ${a.period==="month"?"selected":""}>Per Month</option>
        </select>
      </div>
    </div>

    <div class="field" id="mEmpTgtCustomUnitWrap" style="margin-bottom:16px;display:${v?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mEmpTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${v?"":escapeHtml(a.unit||"")}">
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mEmpTgtAttachments",label:"Proof of Work / Deliverable Attachments",subtitle:"Upload links, finished files, screenshots or design outputs"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mEmpTgtCancel">Cancel</button>
      <button class="btn gold" id="mEmpTgtSave">💾 Save Target</button>
    </div>
  `);bindAttachmentUploader("mEmpTgtAttachments",{existing:a.attachments||[]});const b=r.querySelector("#mEmpTgtUnit"),y=r.querySelector("#mEmpTgtCustomUnitWrap"),g=r.querySelector("#mEmpTgtCustomUnit");b.onchange=()=>{b.value==="custom"?(y.style.display="flex",g.focus()):y.style.display="none"},r.querySelector("#mEmpTgtCancel").onclick=()=>r.remove(),r.querySelector("#mEmpTgtSave").onclick=async()=>{let $=b.value;$==="custom"&&($=g.value.trim()||"Deliverables");const h=getUploaderAttachments("mEmpTgtAttachments"),w={serviceId:r.querySelector("#mEmpTgtService").value,quantity:Number(r.querySelector("#mEmpTgtQty").value)||1,completed:Number(r.querySelector("#mEmpTgtCompleted").value)||0,unit:$,period:r.querySelector("#mEmpTgtPeriod").value,attachments:h};if(!w.serviceId){flashToast("Service is required",!0);return}try{i?await apiPost("/targets",w):await apiPut("/targets/"+a._id,w),flashToast("Target saved! 🎯"),r.remove(),u()}catch(C){flashToast(C.message,!0)}}}window.addEventListener("ci360:dataUpdated",a=>{const i=document.activeElement,s=i&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"||i.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal");!s&&!e&&k.tab!=="logjob"&&u()});W();
