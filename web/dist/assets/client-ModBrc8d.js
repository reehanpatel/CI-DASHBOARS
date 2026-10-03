import"./api-BsUU16QT.js";let u=null,N=[],A=[],c={tab:"dashboard",period:"month"},b={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:""};const Y=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","Quality Check"]];async function ie(){if(initTheme(),u=requireAuth("client"),!!u){try{const[e,t]=await Promise.all([apiGet("/services"),apiGet("/personnel")]);N=e,A=t.filter(o=>o.status==="active")}catch{N=[],A=[]}y()}}const P=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"jobs",label:"All Jobs Logged",icon:"📋"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"delivered",label:"Work Delivered",icon:"📦"},{key:"billing",label:"Billing & Invoices",icon:"💳"},{key:"team",label:"Our Team",icon:"👥"}];function y(){const e=document.getElementById("app"),t=P.find(o=>o.key===c.tab)||P[0];e.innerHTML=renderAppShell({user:u,currentRole:"client",activeTab:c.tab,tabs:P,title:t.label,subtitle:"Client Portal & Service Requests"}),bindAppShellEvents(o=>{c.tab=o,y()}),k()}window.ci360NavTab=e=>{c.tab=e,y()};async function k(){const e=document.getElementById("content");if(e){if(c.tab==="logjob"){G(e);return}e.innerHTML=renderSkeletonCards(3);try{const t=await apiGet("/dashboard/client?period="+c.period);c.tab==="dashboard"?await ae(e,t):c.tab==="jobs"?oe(e,t):c.tab==="delivered"?se(e,t):c.tab==="billing"?await de(e):c.tab==="team"&&le(e,t)}catch(t){e.innerHTML=renderEmptyState("Something went wrong",t.message,"⚠️")}}}async function ae(e,t){var U,O,W,_,V;const o=((U=t.client)==null?void 0:U.name)||(u==null?void 0:u.name)||"Valued Client",r=((O=t.client)==null?void 0:O.code)||"CI360-ACC",s=((W=t.client)==null?void 0:W.nature)||((_=t.client)==null?void 0:_.difficulty)||"Retainer Account",a=t.jobs||[];let n=[];try{n=((await apiGet("/accounts/client-portal")).invoices||[]).filter(m=>m.status==="overdue"||m.pendingAmount>0&&new Date(m.dueDate)<new Date),n.length>0&&typeof window.showClientOverdueInvoiceModal=="function"&&window.showClientOverdueInvoiceModal(n)}catch{}const d=c.period==="all"?a:a.filter(i=>{if(!i.date)return!0;const g=i.date.slice(0,10);return(!t.from||g>=t.from)&&(!t.to||g<=t.to)}),v=d.length,p=d.filter(i=>i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate).length,x=d.filter(i=>!i.completionDate&&i.status!=="Completed"&&(!i.clientApproval||i.clientApproval.status!=="Approved")).length,B=d.filter(i=>i.clientApproval&&i.clientApproval.status==="Revision Requested").length,X=((V=t.stats)==null?void 0:V.hours)!=null?Number(t.stats.hours):d.reduce((i,g)=>{let m=0;return(g.assignments||[]).forEach(R=>m+=Number(R.hours)||0),i+m},0),C=v>0?Math.round(p/v*100):a.length>0?Math.round(a.filter(i=>i.completionDate).length/a.length*100):100,T=a.filter(i=>i.deliverables&&i.deliverables.length&&(!i.clientApproval||i.clientApproval.status==="Pending")),J={};d.forEach(i=>{(i.serviceNames&&i.serviceNames.length?i.serviceNames:["General Deliverable"]).forEach(m=>{J[m]=(J[m]||0)+1})});const I=Object.entries(J).sort((i,g)=>g[1]-i[1]),Z=d.filter(i=>i.priority==="Urgent").length,j=d.filter(i=>i.priority==="High").length,ee=t.roster||[],z=[];ee.forEach(i=>{Y.forEach(([g,m])=>{var D;String(((D=i.roles)==null?void 0:D[g])||"").split(",").map(S=>S.trim()).filter(Boolean).forEach(S=>{z.some(te=>te.name===S)||z.push({name:S,role:m})})})});const H=a.slice(0,5);e.innerHTML=`
    <div class="block client-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Overdue Invoice Urgent Alert (if any) -->
      ${n.length>0?`
        <div class="card" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.35);margin-bottom:20px;padding:16px 22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;border-radius:var(--r-xl);box-shadow:0 8px 24px -6px rgba(239,68,68,0.2)">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:42px;height:42px;border-radius:12px;background:rgba(239,68,68,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🚨</div>
            <div>
              <strong style="color:var(--red-600);font-size:14px">Immediate Action Required: ${n.length} Overdue Invoice${n.length>1?"s":""}</strong>
              <div style="font-size:12.5px;color:var(--text-3);margin-top:2px">
                Total outstanding overdue balance: <strong style="color:var(--red-600);font-weight:800">${fmtINR(n.reduce((i,g)=>i+(Number(g.pendingAmount||g.totalAmount)||0),0))}</strong>. Please settle to keep active deliverable pipelines moving smoothly.
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="btn gold" onclick="window.ci360NavTab('billing')" style="font-weight:700;padding:9px 18px;font-size:13px">
              💳 Pay & Settle Now →
            </button>
          </div>
        </div>
      `:""}

      <!-- Welcome Hero Banner -->
      <div class="card client-hero-card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.05) 50%, rgba(245,158,11,0.04) 100%);border:1px solid rgba(99,102,241,0.22);border-radius:var(--r-xl);padding:24px 28px;margin-bottom:24px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:54px;height:54px;border-radius:var(--r-lg);background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(79,70,229,0.4);flex-shrink:0">
              ${o.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(o)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(r)}</span>
                <span class="badge gold" style="font-size:11px;font-weight:700">★ ${escapeHtml(s)}</span>
              </div>
              <p style="font-size:13.5px;color:var(--text-3);margin:0">
                Client Workspace &amp; Deliverables Command Center · Real-time pipeline, team allocation, and asset tracking
              </p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button class="btn gold" id="btnHeroLogJob" style="display:inline-flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-radius:var(--r-md);box-shadow:0 4px 12px rgba(245,158,11,0.25)">
              <span>➕</span> Log New Job
            </button>
            <button class="btn ghost" id="btnHeroInvoices" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;padding:9px 16px;border-radius:var(--r-md)">
              <span>💳</span> View Invoices
            </button>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-top:22px;padding-top:18px;border-top:1px solid var(--border-xs)">
          <div style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-4)">
            Reporting Period Filter
          </div>
          <div id="overviewPeriodWrapper">
            ${renderPeriodPicker(c.period)}
          </div>
        </div>
      </div>

      <!-- Action Required: Pending Approval Banner -->
      ${T.length>0?`
        <div class="card" style="background:linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.05) 100%);border:1px solid var(--amber-500);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(245,158,11,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
              🔔
            </div>
            <div>
              <div style="font-size:15px;font-weight:800;color:var(--text-1);margin-bottom:2px">
                Deliverables Ready for Review &amp; Approval
              </div>
              <div style="font-size:13px;color:var(--text-2)">
                You have <strong style="color:var(--amber-500)">${T.length} job(s)</strong> with finished creative assets awaiting your client sign-off or feedback.
              </div>
            </div>
          </div>
          <button class="btn gold" id="btnReviewNow" style="font-size:13px;font-weight:700;padding:8px 18px">
            Review Deliverables Now →
          </button>
        </div>
      `:""}

      <!-- 4 KPI Summary Cards -->
      <section class="block block-kpi-grid" style="margin-bottom:24px">
        <div class="grid grid-4" style="gap:16px">
          
          <div class="card kpi" style="border-top:3px solid var(--brand-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Work Orders Logged</div>
              <div style="font-size:20px">📋</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${v}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${a.length} all-time requests recorded</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active in Production</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${x}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${B>0?`<strong style="color:var(--amber-600)">${B}</strong> in revision review`:"Under active execution"}</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Delivered &amp; Signed Off</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${p}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${C}% delivery fulfillment rate</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Dedicated Effort</div>
              <div style="font-size:20px">⏱️</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${X.toFixed(1)} <span style="font-size:18px;font-weight:600">hrs</span></div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">Tracked creative &amp; production hours</div>
          </div>

        </div>
      </section>

      <!-- 2-Column Delivery Health & Retainer Distribution -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:20px;margin-bottom:24px">
        
        <!-- Delivery Progress Card -->
        <div class="card" style="padding:22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0">Delivery Performance &amp; Health</h3>
            <span class="badge ${C>=80?"green":"gold"}" style="font-weight:700">${C}% Complete</span>
          </div>

          <div style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:var(--text-3);margin-bottom:6px">
              <span>Fulfillment Rate</span>
              <span>${p} of ${v} Jobs Completed</span>
            </div>
            <div style="width:100%;height:10px;background:var(--border-sm);border-radius:10px;overflow:hidden;display:flex">
              <div style="width:${C}%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:10px;transition:width 0.6s ease"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;padding:12px 8px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-xs)">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Completed</div>
              <div style="font-size:18px;font-weight:900;color:var(--green-500);margin-top:2px">${p}</div>
            </div>
            <div style="border-left:1px solid var(--border-sm);border-right:1px solid var(--border-sm)">
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">In Progress</div>
              <div style="font-size:18px;font-weight:900;color:var(--amber-500);margin-top:2px">${x}</div>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Urgent / High</div>
              <div style="font-size:18px;font-weight:900;color:var(--brand-500);margin-top:2px">${Z+j}</div>
            </div>
          </div>
        </div>

        <!-- Services Retainer Breakdown -->
        <div class="card" style="padding:22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0">Services Retainer Breakdown</h3>
            <span style="font-size:12px;font-weight:700;color:var(--text-3)">${I.length} Active Services</span>
          </div>

          ${I.length>0?`
            <div style="display:flex;flex-direction:column;gap:12px">
              ${I.slice(0,5).map(([i,g])=>{const m=Math.round(g/(v||1)*100);return`
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;color:var(--text-2);margin-bottom:4px">
                      <span>${escapeHtml(i)}</span>
                      <span style="color:var(--text-4)">${g} job(s) (${m}%)</span>
                    </div>
                    <div style="width:100%;height:7px;background:var(--border-sm);border-radius:6px;overflow:hidden">
                      <div style="width:${m}%;height:100%;background:linear-gradient(90deg, var(--brand-500), #6366F1);border-radius:6px"></div>
                    </div>
                  </div>
                `}).join("")}
            </div>
          `:`
            <div class="empty" style="padding:20px">No service activity recorded for this period.</div>
          `}
        </div>

      </div>

      <!-- Dedicated Account Team Snapshot -->
      <div class="card" style="padding:22px;margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Your Dedicated Account Team</h3>
            <p style="font-size:12.5px;color:var(--text-3);margin:0">Directly assigned creative specialists and client success partners</p>
          </div>
          <button class="btn ghost small" id="btnMeetTeam" style="font-weight:700">
            View Full Team Roster →
          </button>
        </div>

        ${z.length>0?`
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:14px">
            ${z.slice(0,6).map(i=>`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">
                  ${i.name.slice(0,2).toUpperCase()}
                </div>
                <div style="min-width:0;flex:1">
                  <div style="font-size:13.5px;font-weight:800;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(i.name)}</div>
                  <div style="font-size:11px;font-weight:600;color:var(--brand-500);text-transform:uppercase">${escapeHtml(i.role)}</div>
                </div>
              </div>
            `).join("")}
          </div>
        `:`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--bg-surface);border-radius:var(--r-md);flex-wrap:wrap;gap:12px">
            <div style="font-size:13px;color:var(--text-3)">
              Your account is supported by our full multi-disciplinary creative studio.
            </div>
            <button class="btn gold small" onclick="ci360NavTab('team')">Meet the Team</button>
          </div>
        `}
      </div>

      <!-- Recent Work Orders & Active Jobs Table -->
      <div class="card table-card" style="padding:0;overflow:hidden;margin-bottom:24px">
        <div style="padding:18px 24px;border-bottom:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Recent Work Orders &amp; Requests</h3>
            <p style="font-size:12.5px;color:var(--text-3);margin:0">Latest deliverables in your production queue</p>
          </div>
          <button class="btn ghost small" id="btnViewAllJobs" style="font-weight:700">
            View All Jobs (${a.length}) →
          </button>
        </div>

        ${H.length>0?`
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:24px">Job Title</th>
                  <th>Service</th>
                  <th>Priority</th>
                  <th>Start Date</th>
                  <th>Delivery Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${H.map(i=>{const g=i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate,m=i.clientApproval&&i.clientApproval.status==="Revision Requested",R=i.priority==="Urgent"?"red":i.priority==="High"?"amber":"blue";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('jobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(i.title||"Untitled Request")}
                      </td>
                      <td>
                        ${(i.serviceNames||[]).map(D=>`<span class="badge gray" style="font-size:11px">${escapeHtml(D)}</span>`).join(" ")||'<span style="color:var(--text-4)">—</span>'}
                      </td>
                      <td>
                        <span class="badge ${R}" style="font-size:11px;font-weight:700">${escapeHtml(i.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(i.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${i.completionDate?fmtDate(i.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${g?"green":m?"amber":"gold"}" style="font-weight:700">
                          ${g?"✓ Completed":m?"↺ Revision":"⏳ In Progress"}
                        </span>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty" style="padding:36px 20px">
            <div style="font-size:32px;margin-bottom:10px">📝</div>
            <h4 style="margin:0 0 6px 0;font-size:16px;font-weight:800;color:var(--text-1)">No Jobs Logged Yet</h4>
            <p style="font-size:13px;color:var(--text-3);margin:0 0 16px 0">Submit your first creative brief or task request to get started.</p>
            <button class="btn gold" onclick="ci360NavTab('logjob')">➕ Log Your First Job</button>
          </div>
        `}
      </div>

    </div>
  `;const E=document.getElementById("btnHeroLogJob");E&&(E.onclick=()=>{c.tab="logjob",y()});const q=document.getElementById("btnHeroInvoices");q&&(q.onclick=()=>{c.tab="billing",y()});const L=document.getElementById("btnReviewNow");L&&(L.onclick=()=>{c.tab="delivered",y()});const F=document.getElementById("btnMeetTeam");F&&(F.onclick=()=>{c.tab="team",y()});const M=document.getElementById("btnViewAllJobs");M&&(M.onclick=()=>{c.tab="jobs",y()}),document.querySelectorAll("#overviewPeriodWrapper [data-period]").forEach(i=>{i.onclick=()=>{c.period=i.dataset.period,k()}})}function G(e){e.innerHTML=`
    <div class="block">
      <h2>Log a New Job <span class="eyebrow">Request or record work for your account</span></h2>
      <div class="card form-card">
        <form id="clientLogJobForm" novalidate>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">1</span>
              Job Details
            </div>
            <div class="field">
              <label for="clientJobTitle">Job Title *</label>
              <input type="text" id="clientJobTitle" value="${escapeHtml(b.title||"")}" placeholder="e.g. Brand Redesign &amp; Social Campaign" required>
            </div>
            <div class="field">
              <label for="clientJobService">Select Service *</label>
              <select id="clientJobService" required>
                <option value="">Select a service…</option>
                ${N.map(t=>`<option value="${t._id}" ${b.serviceId===t._id?"selected":""}>${escapeHtml(t.name)}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">2</span>
              Priority & Preferences
            </div>
            <div class="log-job-row">
              <div class="field">
                <label for="clientJobPriority">Priority Level *</label>
                <select id="clientJobPriority">
                  <option value="Medium" ${b.priority==="Medium"?"selected":""}>🟡 Medium Priority</option>
                  <option value="High"   ${b.priority==="High"?"selected":""}>🟠 High Priority</option>
                  <option value="Urgent" ${b.priority==="Urgent"?"selected":""}>🔴 Urgent</option>
                </select>
              </div>
              <div class="field">
                <label for="clientJobPrefPerson">Preferred Team Member</label>
                <select id="clientJobPrefPerson">
                  <option value="">No Preference (Auto-Assign)</option>
                  ${A.map(t=>`<option value="${t._id}" ${b.preferredPersonId===t._id?"selected":""}>👤 ${escapeHtml(t.name)}${t.duties?` (${escapeHtml(t.duties)})`:""}</option>`).join("")}
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">3</span>
              Timeline
            </div>
            <div class="log-job-row">
              <div class="field">
                <label for="clientJobDate">Start Date *</label>
                <input type="date" id="clientJobDate" value="${b.date}" required>
              </div>
              <div class="field">
                <label for="clientJobCompDate">Expected End Date</label>
                <input type="date" id="clientJobCompDate" value="${b.completionDate}">
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">4</span>
              Description
            </div>
            <div class="field">
              <label for="clientJobDesc">Deliverable Details</label>
              <textarea id="clientJobDesc" rows="3" placeholder="Describe the project scope, deliverables, or specific requirements…">${escapeHtml(b.desc)}</textarea>
            </div>
          </div>

          <div class="form-section" style="border-bottom:none;padding-bottom:0">
            <div class="form-section-title">
              <span class="form-section-num">5</span>
              Briefs &amp; File Attachments
            </div>
            ${renderAttachmentUploader({id:"clientJobAttachments",label:"Briefs & Reference Files",subtitle:"Upload briefs, design mockups, brand assets, spreadsheets or guideline documents"})}
          </div>

          <div class="form-actions">
            <button class="btn ghost" type="reset" id="resetClientJobBtn">Clear Form</button>
            <button class="btn gold" type="submit" id="submitClientJobBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>`,bindAttachmentUploader("clientJobAttachments",{existing:b.attachments||[]}),document.getElementById("resetClientJobBtn").onclick=()=>{b={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},setUploaderAttachments("clientJobAttachments",[]),G(e)},document.getElementById("clientLogJobForm").onsubmit=async t=>{t.preventDefault();const o=document.getElementById("submitClientJobBtn"),r=document.getElementById("clientJobTitle").value.trim(),s=document.getElementById("clientJobService").value;if(!s){flashToast("Please select a service",!0);return}const a=document.getElementById("clientJobDate").value,n=document.getElementById("clientJobCompDate").value,d=document.getElementById("clientJobDesc").value.trim(),v=document.getElementById("clientJobPriority").value,l=document.getElementById("clientJobPrefPerson").value,p=getUploaderAttachments("clientJobAttachments");o.disabled=!0,o.textContent="Submitting…";try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}await apiPost("/jobs",{title:r,serviceIds:[s],date:a,completionDate:n,value:0,description:d,priority:v,preferredPersonId:l||null,assignments:[],attachments:p}),flashToast("Job logged successfully with attachments! 🎉"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),b={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},c.tab="jobs",y()}catch(f){flashToast(f.message,!0)}finally{o.disabled=!1,o.textContent="Submit Job"}}}let h="all",$="";function Q(e,t){var n;const o=e.status==="Completed"||e.clientApproval&&e.clientApproval.status==="Approved",r=e.clientApproval&&e.clientApproval.status==="Revision Requested",s=t[e.priority||"Medium"]||"gray",a=u&&e.createdBy&&(typeof e.createdBy=="object"&&String(e.createdBy._id)===String(u._id||u.id)||String(e.createdBy)===String(u._id||u.id));return`
    <div class="card client-job-card" data-id="${e._id}" style="border-left:4px solid ${o?"var(--green-500)":r?"var(--amber-500)":"var(--brand-500)"};padding:18px 22px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:15px;font-weight:800;color:var(--text-1)">${escapeHtml(e.title||"Untitled Job")}</span>
            ${a?'<span class="badge blue" style="font-size:10.5px;padding:2px 8px">👤 Logged by You</span>':""}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span class="badge ${o?"green":r?"amber":"gold"}">
              ${o?"✓ Completed":r?"↺ Revision Requested":"⏳ In Progress"}
            </span>
            <span class="badge ${s}">${escapeHtml(e.priority||"Medium")}</span>
            ${(e.serviceNames||[]).map(d=>`<span class="badge gray">${escapeHtml(d)}</span>`).join("")}
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;color:var(--text-4)">Start Date</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-1)">${fmtDate(e.date)}</div>
          ${e.completionDate?`<div style="font-size:11px;color:var(--text-3);margin-top:2px">Due: ${fmtDate(e.completionDate)}</div>`:""}
        </div>
      </div>
      ${e.description?`<div style="font-size:12.5px;color:var(--text-3);line-height:1.5;padding-top:10px;border-top:1px solid var(--border-xs)">${escapeHtml(e.description)}</div>`:""}
      ${e.preferredPersonName?`<div style="margin-top:8px;font-size:12px;color:var(--text-4)">Assigned to: <strong style="color:var(--text-2)">${escapeHtml(e.preferredPersonName)}</strong></div>`:""}
      ${o&&e.completionDate?`<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(e.completionDate)}</div>`:""}

      <!-- Brief Attachments & Completed Deliverables -->
      ${e.attachments&&e.attachments.length?`
        <div data-attachments="${encodeURIComponent(JSON.stringify(e.attachments))}">
          ${renderAttachmentChips(e.attachments,{title:"Initial Briefs & Assets"})}
        </div>
      `:""}

      ${e.deliverables&&e.deliverables.length?`
        <div data-attachments="${encodeURIComponent(JSON.stringify(e.deliverables))}">
          ${renderAttachmentChips(e.deliverables,{title:"Finished Deliverables & Artifacts"})}
        </div>
      `:""}

      <!-- Client Deliverable Approval / Revision Status Box -->
      ${e.deliverables&&e.deliverables.length?`
        ${e.clientApproval&&e.clientApproval.status==="Approved"?`
          <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:16px">✅</span>
              <div>
                <div style="font-size:13px;font-weight:700;color:var(--green-500)">Approved &amp; Signed Off</div>
                <div style="font-size:11.5px;color:var(--text-3)">Approved by ${escapeHtml(e.clientApproval.approvedBy||"Client")} on ${fmtDate(e.clientApproval.approvedAt||e.completionDate)}</div>
              </div>
            </div>
            ${e.clientApproval.rating?`<span class="badge gold" style="font-size:12px">${"★".repeat(e.clientApproval.rating)} ${e.clientApproval.rating}/5</span>`:""}
          </div>
        `:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`
          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
              <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--amber-500)">
                <span>↺</span> Revision Requested
              </div>
              <span style="font-size:11px;color:var(--text-4)">${fmtDate(((n=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:n.requestedAt)||e.updatedAt)}</span>
            </div>
            <div style="font-size:12.5px;color:var(--text-2);background:var(--bg-surface);border-radius:var(--r-xs);padding:8px 10px;margin-top:6px;line-height:1.4">
              "${escapeHtml(e.clientApproval.feedback||"Revision requested")}"
            </div>
          </div>
        `:`
          <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08) 0%,rgba(139,92,246,0.04) 100%);border:1px solid rgba(99,102,241,0.25);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--brand-500)">Deliverables Ready for Review</div>
              <div style="font-size:11.5px;color:var(--text-3)">Please inspect the attached files above and approve or request revision.</div>
            </div>
            <div style="display:flex;gap:8px">
              <button type="button" class="btn ghost small client-rev-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(245,158,11,0.4);color:var(--amber-500)">
                ↺ Request Revision
              </button>
              <button type="button" class="btn gold small client-app-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}">
                ✓ Approve &amp; Sign Off
              </button>
            </div>
          </div>
        `}
      `:""}

      ${renderSupportTicketSection(e._id,!1)}
    </div>`}function K(e){document.querySelectorAll(".client-app-btn").forEach(t=>{t.onclick=()=>ne(t.dataset.id,t.dataset.title,()=>k())}),document.querySelectorAll(".client-rev-btn").forEach(t=>{t.onclick=()=>re(t.dataset.id,t.dataset.title,()=>k())}),e.forEach(t=>bindSupportTicketSection(t._id,!1))}function oe(e,t){const o=t.jobs||[],r={Medium:"gray",High:"amber",Urgent:"red"};if(o.length===0){e.innerHTML=`
      <div class="block">
        <h2>All Jobs Logged <span class="eyebrow">No jobs logged yet</span></h2>
        ${renderEmptyState("No jobs logged yet","Log your first job to request projects, design, campaigns, or services from our team.","📋",`<button class="btn gold" onclick="ui.tab='logjob';render()">➕ Log Your First Job</button>`)}
      </div>`;return}function s(){let l=o;if(h==="inprogress"?l=l.filter(p=>p.status!=="Completed"&&(!p.clientApproval||p.clientApproval.status!=="Approved")):h==="completed"?l=l.filter(p=>p.status==="Completed"||p.clientApproval&&p.clientApproval.status==="Approved"):h==="revision"&&(l=l.filter(p=>p.clientApproval&&p.clientApproval.status==="Revision Requested")),$){const p=$.toLowerCase();l=l.filter(f=>(f.title||"").toLowerCase().includes(p)||(f.description||"").toLowerCase().includes(p)||(f.serviceNames||[]).some(x=>x.toLowerCase().includes(p))||(f.preferredPersonName||"").toLowerCase().includes(p))}return l}const a=o.filter(l=>l.status!=="Completed"&&(!l.clientApproval||l.clientApproval.status!=="Approved")).length,n=o.filter(l=>l.status==="Completed"||l.clientApproval&&l.clientApproval.status==="Approved").length,d=o.filter(l=>l.clientApproval&&l.clientApproval.status==="Revision Requested").length;function v(){const l=s();e.innerHTML=`
      <div class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px">
          <div>
            <h2 style="margin-bottom:4px">All Jobs Logged <span class="eyebrow">${o.length} total entries</span></h2>
            <div style="font-size:12.5px;color:var(--text-3)">Track all projects and requests submitted by your account</div>
          </div>
          <button class="btn gold" type="button" id="tabJobsLogNewBtn" style="display:inline-flex;align-items:center;gap:6px">
            <span>➕</span> Log a New Job
          </button>
        </div>

        <!-- Metric Badges Row -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:10px;margin-bottom:16px">
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.5px">Total Logged</div>
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin-top:2px">${o.length}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">In Progress</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${a}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--green-500);text-transform:uppercase;letter-spacing:0.5px">Completed</div>
            <div style="font-size:22px;font-weight:800;color:var(--green-500);margin-top:2px">${n}</div>
          </div>
          ${d>0?`
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--red-500);text-transform:uppercase;letter-spacing:0.5px">Revisions</div>
            <div style="font-size:22px;font-weight:800;color:var(--red-500);margin-top:2px">${d}</div>
          </div>`:""}
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;background:var(--bg-surface);padding:10px 14px;border-radius:var(--r-sm);border:1px solid var(--border-xs)">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btn ${h==="all"?"primary":"ghost"} small filter-tab-btn" data-f="all">All (${o.length})</button>
            <button type="button" class="btn ${h==="inprogress"?"primary":"ghost"} small filter-tab-btn" data-f="inprogress">In Progress (${a})</button>
            <button type="button" class="btn ${h==="completed"?"primary":"ghost"} small filter-tab-btn" data-f="completed">Completed (${n})</button>
            ${d>0?`<button type="button" class="btn ${h==="revision"?"primary":"ghost"} small filter-tab-btn" data-f="revision">Revisions (${d})</button>`:""}
          </div>
          <div style="flex:1;max-width:280px;min-width:180px">
            <input type="text" id="clientJobSearchInput" value="${escapeHtml($)}" placeholder="Search jobs…" style="padding:6px 12px;font-size:12.5px;width:100%;border-radius:var(--r-xs)">
          </div>
        </div>

        <!-- Jobs Listing -->
        <div style="display:flex;flex-direction:column;gap:14px">
          ${l.length===0?`
            <div class="card empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-4)">
              No matching jobs found ${$?`for "${escapeHtml($)}"`:""}
            </div>
          `:l.map(x=>Q(x,r)).join("")}
        </div>
      </div>`;const p=document.getElementById("tabJobsLogNewBtn");p&&(p.onclick=()=>{c.tab="logjob",y()}),e.querySelectorAll(".filter-tab-btn").forEach(x=>{x.onclick=()=>{h=x.dataset.f,v()}});const f=document.getElementById("clientJobSearchInput");f&&(f.oninput=x=>{$=x.target.value.trim(),v();const w=document.getElementById("clientJobSearchInput");w&&(w.focus(),w.selectionStart=w.selectionEnd=w.value.length)}),K(l)}v()}function se(e,t){const r=(t.jobs||[]).filter(n=>n.deliverables&&n.deliverables.length>0||n.status==="Completed"||n.clientApproval&&n.clientApproval.status==="Approved"),s={Medium:"gray",High:"amber",Urgent:"red"};if(r.length===0){e.innerHTML=`
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No delivered work yet</span></h2>
        ${renderEmptyState("No completed deliverables yet","When the team uploads final deliverables and marks work complete, you can review and sign off on them here.","📦",`<button class="btn ghost" onclick="ui.tab='jobs';render()">View All Jobs Logged</button>`)}
      </div>`;return}const a=r.filter(n=>n.deliverables&&n.deliverables.length&&(!n.clientApproval||n.clientApproval.status==="Pending")).length;e.innerHTML=`
    <div class="block">
      <div style="margin-bottom:18px">
        <h2 style="margin-bottom:4px">Work Delivered <span class="eyebrow">${r.length} completed deliverables</span></h2>
        <div style="font-size:12.5px;color:var(--text-3)">Review deliverable files, approve completed projects, or request revisions</div>
      </div>

      ${a>0?`
        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.06));border:1px solid rgba(99,102,241,0.3);border-radius:var(--r-sm);padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--brand-500)">🔔 ${a} Deliverable${a>1?"s":""} Waiting for Your Approval</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Please inspect the deliverables below and click Approve or Request Revision.</div>
          </div>
        </div>
      `:""}

      <div style="display:flex;flex-direction:column;gap:14px">
        ${r.map(n=>Q(n,s)).join("")}
      </div>
    </div>`,K(r)}function ne(e,t,o){let r=5;const s=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Approve Deliverables &amp; Sign Off</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
    </div>

    <div style="margin-bottom:16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:12px 14px">
      <div style="font-size:13px;font-weight:600;color:var(--green-500);margin-bottom:4px">✓ Confirming Completion</div>
      <div style="font-size:12px;color:var(--text-3);line-height:1.4">By approving, this job will be verified as completed and signed off.</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Rate Work Quality (Optional)</label>
      <div id="starRatingWrap" style="display:flex;gap:8px;font-size:24px;cursor:pointer;margin-top:4px">
        <span class="star-item" data-val="1" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="2" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="3" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="4" style="color:#F59E0B">★</span>
        <span class="star-item" data-val="5" style="color:#F59E0B">★</span>
      </div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mAppFeedback">Feedback / Review Note (Optional)</label>
      <textarea id="mAppFeedback" rows="3" placeholder="Add comments, praise or notes for the team…"></textarea>
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mAppCancel">Cancel</button>
      <button class="btn gold" id="mAppConfirm">✓ Confirm Approval</button>
    </div>
  `),a=s.querySelectorAll(".star-item");function n(d){r=d,a.forEach(v=>{v.style.color=Number(v.dataset.val)<=d?"#F59E0B":"var(--text-4)"})}a.forEach(d=>{d.onclick=()=>n(Number(d.dataset.val))}),s.querySelector("#mAppCancel").onclick=()=>s.remove(),s.querySelector("#mAppConfirm").onclick=async()=>{const d=s.querySelector("#mAppFeedback").value.trim(),v=s.querySelector("#mAppConfirm");v.disabled=!0,v.textContent="Approving…";try{await apiPost(`/jobs/${e}/approve`,{rating:r,feedback:d}),flashToast("Deliverables approved & signed off! 🎉"),s.remove(),o&&o()}catch(l){flashToast(l.message,!0)}finally{v.disabled=!1,v.textContent="✓ Confirm Approval"}}}function re(e,t,o){const r=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Request Deliverable Revision</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(t)}</div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mRevNotes">Revision Details &amp; Change Requests *</label>
      <textarea id="mRevNotes" rows="4" placeholder="Describe the changes, edits, or improvements required…"></textarea>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mRevAttachments",label:"Reference Markups / Screenshots (Optional)",subtitle:"Attach annotated screenshots, briefs or reference files"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mRevCancel">Cancel</button>
      <button class="btn gold" id="mRevConfirm" style="background:linear-gradient(135deg,var(--amber-500) 0%,#D97706 100%)">↺ Send Revision Request</button>
    </div>
  `);bindAttachmentUploader("mRevAttachments"),r.querySelector("#mRevCancel").onclick=()=>r.remove(),r.querySelector("#mRevConfirm").onclick=async()=>{const s=r.querySelector("#mRevNotes").value.trim();if(!s){flashToast("Please enter revision details",!0);return}const a=getUploaderAttachments("mRevAttachments"),n=r.querySelector("#mRevConfirm");n.disabled=!0,n.textContent="Sending…";try{await apiPost(`/jobs/${e}/revision`,{feedback:s,attachments:a}),flashToast("Revision request sent to the team! ↺"),r.remove(),o&&o()}catch(d){flashToast(d.message,!0)}finally{n.disabled=!1,n.textContent="↺ Send Revision Request"}}}function le(e,t){const o=t.roster||[],r=A&&A.length?A:[];e.innerHTML=`
    <div class="block">
      <h2>Our Team <span class="eyebrow">${r.length} members</span></h2>

      ${o.length>0?`
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${o.map(s=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${s.nature==="Existing"?"green":"blue"}">${s.nature}</span>
              </div>
              <div class="grid grid-2">
                ${Y.filter(([a])=>(s.roles[a]||"").trim()&&s.roles[a]!=="TBD").map(([a,n])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${n}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(s.roles[a])}</strong>
                  </div>`).join("")||'<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join("")}
        </div>`:""}

      <div class="grid grid-2">
        ${r.map(s=>`
          <div class="card" style="border-left:4px solid var(--gold-500);display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500),var(--gold-500));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${s.name?s.name.charAt(0).toUpperCase():"?"}</div>
                <div>
                  <div style="font-size:14px;font-weight:800;color:var(--text-1)">${escapeHtml(s.name)}</div>
                  <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${escapeHtml(s.duties||"Team Member")}</div>
                </div>
              </div>
              <span class="badge ${s.status==="active"?"green":"gray"}">${escapeHtml(s.status)}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`}async function de(e){const t=await apiGet("/accounts/client-portal"),o=t.summary||{},r=t.invoices||[],s=t.payments||[];e.innerHTML=`
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2>Billing & Invoices <span class="eyebrow">${r.length} invoices issued</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">View your billing invoices, payment history, and pending balances.</p>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="grid grid-3" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Invoiced</span><span class="badge blue">Billed</span></div>
          <div class="kpi-value">${fmtINR(o.totalBilled||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${o.invoiceCount||0} total invoices</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500)">
          <div class="kpi-header"><span class="kpi-label">Total Payments Cleared</span><span class="badge green">Paid</span></div>
          <div class="kpi-value" style="color:var(--green-600)">${fmtINR(o.totalPaid||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${o.paymentCount||0} payments recorded</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header"><span class="kpi-label">Pending Dues Balance</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(o.pendingAmount||0)}</div>
          <div style="font-size:12px;color:${o.overdueAmount>0?"var(--red-600)":"var(--text-3)"};margin-top:4px">
            ${o.overdueAmount>0?`🚨 ${fmtINR(o.overdueAmount)} is overdue`:"No overdue invoices"}
          </div>
        </div>
      </div>

      <!-- Bank Details Callout -->
      <div class="card" style="background:var(--bg-elevated);margin-bottom:24px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
        <div>
          <strong style="font-size:13px;color:var(--text-1)">Settlement Bank & UPI Details:</strong>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">HDFC Bank | A/C: 50200088992211 | IFSC: HDFC0001234 | UPI: ci360@hdfcbank</div>
        </div>
        <div style="font-size:12px;color:var(--text-4)">Please share transaction UTR once payment is executed.</div>
      </div>

      <!-- Invoices Table -->
      <div class="card table-card" style="padding:0;overflow:hidden;margin-bottom:24px">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border-sm)">
          <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--text-1)">Invoices</h3>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="padding-left:22px">Invoice #</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th class="num">Amount</th>
                <th class="num">Paid</th>
                <th class="num">Pending</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(a=>`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(a.invoiceNumber)}</strong></td>
                  <td>${fmtDate(a.issueDate)}</td>
                  <td style="color:${a.status==="overdue"?"var(--red-600)":"inherit"}">${fmtDate(a.dueDate)}</td>
                  <td class="num" style="font-weight:700">${fmtINR(a.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(a.amountPaid)}</td>
                  <td class="num" style="font-weight:800;color:${a.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${fmtINR(a.pendingAmount)}
                  </td>
                  <td>
                    <span class="badge ${a.status==="paid"?"green":a.status==="overdue"?"red":"amber"}">
                      ${escapeHtml(a.status.replace("_"," ").toUpperCase())}
                    </span>
                  </td>
                </tr>`).join("")||'<tr><td colspan="7"><div class="empty" style="padding:28px">No invoices on file.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Payment Receipts Table -->
      ${s.length>0?`
        <div class="card table-card" style="padding:0;overflow:hidden">
          <div style="padding:16px 20px;border-bottom:1px solid var(--border-sm)">
            <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--text-1)">Payment Receipts & Remittances</h3>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:22px">Receipt #</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Reference / UTR</th>
                  <th class="num" style="padding-right:22px">Amount Cleared</th>
                </tr>
              </thead>
              <tbody>
                ${s.map(a=>`
                  <tr>
                    <td style="padding-left:22px"><strong>${escapeHtml(a.paymentNumber)}</strong></td>
                    <td>${fmtDate(a.paymentDate)}</td>
                    <td><span class="badge">${escapeHtml(a.paymentMethod.toUpperCase())}</span></td>
                    <td style="font-family:var(--font-mono);font-size:12px">${escapeHtml(a.referenceId||"—")}</td>
                    <td class="num" style="padding-right:22px;color:var(--green-600);font-weight:800">${fmtINR(a.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`}window.addEventListener("ci360:dataUpdated",e=>{const t=document.activeElement;!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))&&c.tab!=="logjob"&&k()});ie();
