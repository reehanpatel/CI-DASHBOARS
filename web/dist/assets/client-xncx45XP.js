import"./api-oMxAWWa9.js";let x=null,B=[],A=[],c={tab:"dashboard",period:"month"},f={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:""};const V=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","Quality Check"]];async function te(){if(initTheme(),x=requireAuth("client"),!!x){try{const[e,t]=await Promise.all([apiGet("/services"),apiGet("/personnel")]);B=e,A=t.filter(s=>s.status==="active")}catch{B=[],A=[]}u()}}const P=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"jobs",label:"All Jobs Logged",icon:"📋"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"delivered",label:"Work Delivered",icon:"📦"},{key:"billing",label:"Billing & Invoices",icon:"💳"},{key:"team",label:"Our Team",icon:"👥"}];function u(){const e=document.getElementById("app"),t=P.find(s=>s.key===c.tab)||P[0];e.innerHTML=renderAppShell({user:x,currentRole:"client",activeTab:c.tab,tabs:P,title:t.label,subtitle:"Client Portal & Service Requests"}),bindAppShellEvents(s=>{c.tab=s,u()}),S()}window.ci360NavTab=e=>{c.tab=e,u()};async function S(){const e=document.getElementById("content");if(e){if(c.tab==="logjob"){Y(e);return}e.innerHTML=renderSkeletonCards(3);try{const t=await apiGet("/dashboard/client?period="+c.period);c.tab==="dashboard"?ie(e,t):c.tab==="jobs"?ae(e,t):c.tab==="delivered"?se(e,t):c.tab==="billing"?await le(e):c.tab==="team"&&ne(e,t)}catch(t){e.innerHTML=renderEmptyState("Something went wrong",t.message,"⚠️")}}}function ie(e,t){var M,U,O,W,_;const s=((M=t.client)==null?void 0:M.name)||(x==null?void 0:x.name)||"Valued Client",l=((U=t.client)==null?void 0:U.code)||"CI360-ACC",r=((O=t.client)==null?void 0:O.nature)||((W=t.client)==null?void 0:W.difficulty)||"Retainer Account",a=t.jobs||[],o=c.period==="all"?a:a.filter(i=>{if(!i.date)return!0;const v=i.date.slice(0,10);return(!t.from||v>=t.from)&&(!t.to||v<=t.to)}),d=o.length,n=o.filter(i=>i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate).length,m=o.filter(i=>!i.completionDate&&i.status!=="Completed"&&(!i.clientApproval||i.clientApproval.status!=="Approved")).length,h=o.filter(i=>i.clientApproval&&i.clientApproval.status==="Revision Requested").length,K=((_=t.stats)==null?void 0:_.hours)!=null?Number(t.stats.hours):o.reduce((i,v)=>{let b=0;return(v.assignments||[]).forEach(z=>b+=Number(z.hours)||0),i+b},0),k=d>0?Math.round(n/d*100):a.length>0?Math.round(a.filter(i=>i.completionDate).length/a.length*100):100,H=a.filter(i=>i.deliverables&&i.deliverables.length&&(!i.clientApproval||i.clientApproval.status==="Pending")),J={};o.forEach(i=>{(i.serviceNames&&i.serviceNames.length?i.serviceNames:["General Deliverable"]).forEach(b=>{J[b]=(J[b]||0)+1})});const I=Object.entries(J).sort((i,v)=>v[1]-i[1]),X=o.filter(i=>i.priority==="Urgent").length,Z=o.filter(i=>i.priority==="High").length,j=t.roster||[],C=[];j.forEach(i=>{V.forEach(([v,b])=>{var R;String(((R=i.roles)==null?void 0:R[v])||"").split(",").map(D=>D.trim()).filter(Boolean).forEach(D=>{C.some(ee=>ee.name===D)||C.push({name:D,role:b})})})});const N=a.slice(0,5);e.innerHTML=`
    <div class="block client-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Welcome Hero Banner -->
      <div class="card client-hero-card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.05) 50%, rgba(245,158,11,0.04) 100%);border:1px solid rgba(99,102,241,0.22);border-radius:var(--r-xl);padding:24px 28px;margin-bottom:24px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:54px;height:54px;border-radius:var(--r-lg);background:linear-gradient(135deg,var(--brand-500) 0%,#4338CA 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(79,70,229,0.4);flex-shrink:0">
              ${s.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(s)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(l)}</span>
                <span class="badge gold" style="font-size:11px;font-weight:700">★ ${escapeHtml(r)}</span>
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
      ${H.length>0?`
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
                You have <strong style="color:var(--amber-500)">${H.length} job(s)</strong> with finished creative assets awaiting your client sign-off or feedback.
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
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${d}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${a.length} all-time requests recorded</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active in Production</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${m}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${h>0?`<strong style="color:var(--amber-600)">${h}</strong> in revision review`:"Under active execution"}</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Delivered &amp; Signed Off</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${n}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${k}% delivery fulfillment rate</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Dedicated Effort</div>
              <div style="font-size:20px">⏱️</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${K.toFixed(1)} <span style="font-size:18px;font-weight:600">hrs</span></div>
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
            <span class="badge ${k>=80?"green":"gold"}" style="font-weight:700">${k}% Complete</span>
          </div>

          <div style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:var(--text-3);margin-bottom:6px">
              <span>Fulfillment Rate</span>
              <span>${n} of ${d} Jobs Completed</span>
            </div>
            <div style="width:100%;height:10px;background:var(--border-sm);border-radius:10px;overflow:hidden;display:flex">
              <div style="width:${k}%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:10px;transition:width 0.6s ease"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;padding:12px 8px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-xs)">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Completed</div>
              <div style="font-size:18px;font-weight:900;color:var(--green-500);margin-top:2px">${n}</div>
            </div>
            <div style="border-left:1px solid var(--border-sm);border-right:1px solid var(--border-sm)">
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">In Progress</div>
              <div style="font-size:18px;font-weight:900;color:var(--amber-500);margin-top:2px">${m}</div>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Urgent / High</div>
              <div style="font-size:18px;font-weight:900;color:var(--brand-500);margin-top:2px">${X+Z}</div>
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
              ${I.slice(0,5).map(([i,v])=>{const b=Math.round(v/(d||1)*100);return`
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;color:var(--text-2);margin-bottom:4px">
                      <span>${escapeHtml(i)}</span>
                      <span style="color:var(--text-4)">${v} job(s) (${b}%)</span>
                    </div>
                    <div style="width:100%;height:7px;background:var(--border-sm);border-radius:6px;overflow:hidden">
                      <div style="width:${b}%;height:100%;background:linear-gradient(90deg, var(--brand-500), #6366F1);border-radius:6px"></div>
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

        ${C.length>0?`
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:14px">
            ${C.slice(0,6).map(i=>`
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

        ${N.length>0?`
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
                ${N.map(i=>{const v=i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate,b=i.clientApproval&&i.clientApproval.status==="Revision Requested",z=i.priority==="Urgent"?"red":i.priority==="High"?"amber":"blue";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('jobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(i.title||"Untitled Request")}
                      </td>
                      <td>
                        ${(i.serviceNames||[]).map(R=>`<span class="badge gray" style="font-size:11px">${escapeHtml(R)}</span>`).join(" ")||'<span style="color:var(--text-4)">—</span>'}
                      </td>
                      <td>
                        <span class="badge ${z}" style="font-size:11px;font-weight:700">${escapeHtml(i.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(i.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${i.completionDate?fmtDate(i.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${v?"green":b?"amber":"gold"}" style="font-weight:700">
                          ${v?"✓ Completed":b?"↺ Revision":"⏳ In Progress"}
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
  `;const T=document.getElementById("btnHeroLogJob");T&&(T.onclick=()=>{c.tab="logjob",u()});const E=document.getElementById("btnHeroInvoices");E&&(E.onclick=()=>{c.tab="billing",u()});const q=document.getElementById("btnReviewNow");q&&(q.onclick=()=>{c.tab="delivered",u()});const L=document.getElementById("btnMeetTeam");L&&(L.onclick=()=>{c.tab="team",u()});const F=document.getElementById("btnViewAllJobs");F&&(F.onclick=()=>{c.tab="jobs",u()}),document.querySelectorAll("#overviewPeriodWrapper [data-period]").forEach(i=>{i.onclick=()=>{c.period=i.dataset.period,S()}})}function Y(e){e.innerHTML=`
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
              <input type="text" id="clientJobTitle" value="${escapeHtml(f.title||"")}" placeholder="e.g. Brand Redesign &amp; Social Campaign" required>
            </div>
            <div class="field">
              <label for="clientJobService">Select Service *</label>
              <select id="clientJobService" required>
                <option value="">Select a service…</option>
                ${B.map(t=>`<option value="${t._id}" ${f.serviceId===t._id?"selected":""}>${escapeHtml(t.name)}</option>`).join("")}
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
                  <option value="Medium" ${f.priority==="Medium"?"selected":""}>🟡 Medium Priority</option>
                  <option value="High"   ${f.priority==="High"?"selected":""}>🟠 High Priority</option>
                  <option value="Urgent" ${f.priority==="Urgent"?"selected":""}>🔴 Urgent</option>
                </select>
              </div>
              <div class="field">
                <label for="clientJobPrefPerson">Preferred Team Member</label>
                <select id="clientJobPrefPerson">
                  <option value="">No Preference (Auto-Assign)</option>
                  ${A.map(t=>`<option value="${t._id}" ${f.preferredPersonId===t._id?"selected":""}>👤 ${escapeHtml(t.name)}${t.duties?` (${escapeHtml(t.duties)})`:""}</option>`).join("")}
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
                <input type="date" id="clientJobDate" value="${f.date}" required>
              </div>
              <div class="field">
                <label for="clientJobCompDate">Expected End Date</label>
                <input type="date" id="clientJobCompDate" value="${f.completionDate}">
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
              <textarea id="clientJobDesc" rows="3" placeholder="Describe the project scope, deliverables, or specific requirements…">${escapeHtml(f.desc)}</textarea>
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
    </div>`,bindAttachmentUploader("clientJobAttachments",{existing:f.attachments||[]}),document.getElementById("resetClientJobBtn").onclick=()=>{f={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},setUploaderAttachments("clientJobAttachments",[]),Y(e)},document.getElementById("clientLogJobForm").onsubmit=async t=>{t.preventDefault();const s=document.getElementById("submitClientJobBtn"),l=document.getElementById("clientJobTitle").value.trim(),r=document.getElementById("clientJobService").value;if(!r){flashToast("Please select a service",!0);return}const a=document.getElementById("clientJobDate").value,o=document.getElementById("clientJobCompDate").value,d=document.getElementById("clientJobDesc").value.trim(),g=document.getElementById("clientJobPriority").value,n=document.getElementById("clientJobPrefPerson").value,p=getUploaderAttachments("clientJobAttachments");s.disabled=!0,s.textContent="Submitting…";try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}await apiPost("/jobs",{title:l,serviceIds:[r],date:a,completionDate:o,value:0,description:d,priority:g,preferredPersonId:n||null,assignments:[],attachments:p}),flashToast("Job logged successfully with attachments! 🎉"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),f={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},c.tab="jobs",u()}catch(m){flashToast(m.message,!0)}finally{s.disabled=!1,s.textContent="Submit Job"}}}let w="all",$="";function G(e,t){var o;const s=e.status==="Completed"||e.clientApproval&&e.clientApproval.status==="Approved",l=e.clientApproval&&e.clientApproval.status==="Revision Requested",r=t[e.priority||"Medium"]||"gray",a=x&&e.createdBy&&(typeof e.createdBy=="object"&&String(e.createdBy._id)===String(x._id||x.id)||String(e.createdBy)===String(x._id||x.id));return`
    <div class="card client-job-card" data-id="${e._id}" style="border-left:4px solid ${s?"var(--green-500)":l?"var(--amber-500)":"var(--brand-500)"};padding:18px 22px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:15px;font-weight:800;color:var(--text-1)">${escapeHtml(e.title||"Untitled Job")}</span>
            ${a?'<span class="badge blue" style="font-size:10.5px;padding:2px 8px">👤 Logged by You</span>':""}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span class="badge ${s?"green":l?"amber":"gold"}">
              ${s?"✓ Completed":l?"↺ Revision Requested":"⏳ In Progress"}
            </span>
            <span class="badge ${r}">${escapeHtml(e.priority||"Medium")}</span>
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
      ${s&&e.completionDate?`<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(e.completionDate)}</div>`:""}

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
              <span style="font-size:11px;color:var(--text-4)">${fmtDate(((o=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:o.requestedAt)||e.updatedAt)}</span>
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
    </div>`}function Q(e){document.querySelectorAll(".client-app-btn").forEach(t=>{t.onclick=()=>oe(t.dataset.id,t.dataset.title,()=>S())}),document.querySelectorAll(".client-rev-btn").forEach(t=>{t.onclick=()=>re(t.dataset.id,t.dataset.title,()=>S())}),e.forEach(t=>bindSupportTicketSection(t._id,!1))}function ae(e,t){const s=t.jobs||[],l={Medium:"gray",High:"amber",Urgent:"red"};if(s.length===0){e.innerHTML=`
      <div class="block">
        <h2>All Jobs Logged <span class="eyebrow">No jobs logged yet</span></h2>
        ${renderEmptyState("No jobs logged yet","Log your first job to request projects, design, campaigns, or services from our team.","📋",`<button class="btn gold" onclick="ui.tab='logjob';render()">➕ Log Your First Job</button>`)}
      </div>`;return}function r(){let n=s;if(w==="inprogress"?n=n.filter(p=>p.status!=="Completed"&&(!p.clientApproval||p.clientApproval.status!=="Approved")):w==="completed"?n=n.filter(p=>p.status==="Completed"||p.clientApproval&&p.clientApproval.status==="Approved"):w==="revision"&&(n=n.filter(p=>p.clientApproval&&p.clientApproval.status==="Revision Requested")),$){const p=$.toLowerCase();n=n.filter(m=>(m.title||"").toLowerCase().includes(p)||(m.description||"").toLowerCase().includes(p)||(m.serviceNames||[]).some(y=>y.toLowerCase().includes(p))||(m.preferredPersonName||"").toLowerCase().includes(p))}return n}const a=s.filter(n=>n.status!=="Completed"&&(!n.clientApproval||n.clientApproval.status!=="Approved")).length,o=s.filter(n=>n.status==="Completed"||n.clientApproval&&n.clientApproval.status==="Approved").length,d=s.filter(n=>n.clientApproval&&n.clientApproval.status==="Revision Requested").length;function g(){const n=r();e.innerHTML=`
      <div class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px">
          <div>
            <h2 style="margin-bottom:4px">All Jobs Logged <span class="eyebrow">${s.length} total entries</span></h2>
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
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin-top:2px">${s.length}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">In Progress</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${a}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--green-500);text-transform:uppercase;letter-spacing:0.5px">Completed</div>
            <div style="font-size:22px;font-weight:800;color:var(--green-500);margin-top:2px">${o}</div>
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
            <button type="button" class="btn ${w==="all"?"primary":"ghost"} small filter-tab-btn" data-f="all">All (${s.length})</button>
            <button type="button" class="btn ${w==="inprogress"?"primary":"ghost"} small filter-tab-btn" data-f="inprogress">In Progress (${a})</button>
            <button type="button" class="btn ${w==="completed"?"primary":"ghost"} small filter-tab-btn" data-f="completed">Completed (${o})</button>
            ${d>0?`<button type="button" class="btn ${w==="revision"?"primary":"ghost"} small filter-tab-btn" data-f="revision">Revisions (${d})</button>`:""}
          </div>
          <div style="flex:1;max-width:280px;min-width:180px">
            <input type="text" id="clientJobSearchInput" value="${escapeHtml($)}" placeholder="Search jobs…" style="padding:6px 12px;font-size:12.5px;width:100%;border-radius:var(--r-xs)">
          </div>
        </div>

        <!-- Jobs Listing -->
        <div style="display:flex;flex-direction:column;gap:14px">
          ${n.length===0?`
            <div class="card empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-4)">
              No matching jobs found ${$?`for "${escapeHtml($)}"`:""}
            </div>
          `:n.map(y=>G(y,l)).join("")}
        </div>
      </div>`;const p=document.getElementById("tabJobsLogNewBtn");p&&(p.onclick=()=>{c.tab="logjob",u()}),e.querySelectorAll(".filter-tab-btn").forEach(y=>{y.onclick=()=>{w=y.dataset.f,g()}});const m=document.getElementById("clientJobSearchInput");m&&(m.oninput=y=>{$=y.target.value.trim(),g();const h=document.getElementById("clientJobSearchInput");h&&(h.focus(),h.selectionStart=h.selectionEnd=h.value.length)}),Q(n)}g()}function se(e,t){const l=(t.jobs||[]).filter(o=>o.deliverables&&o.deliverables.length>0||o.status==="Completed"||o.clientApproval&&o.clientApproval.status==="Approved"),r={Medium:"gray",High:"amber",Urgent:"red"};if(l.length===0){e.innerHTML=`
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No delivered work yet</span></h2>
        ${renderEmptyState("No completed deliverables yet","When the team uploads final deliverables and marks work complete, you can review and sign off on them here.","📦",`<button class="btn ghost" onclick="ui.tab='jobs';render()">View All Jobs Logged</button>`)}
      </div>`;return}const a=l.filter(o=>o.deliverables&&o.deliverables.length&&(!o.clientApproval||o.clientApproval.status==="Pending")).length;e.innerHTML=`
    <div class="block">
      <div style="margin-bottom:18px">
        <h2 style="margin-bottom:4px">Work Delivered <span class="eyebrow">${l.length} completed deliverables</span></h2>
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
        ${l.map(o=>G(o,r)).join("")}
      </div>
    </div>`,Q(l)}function oe(e,t,s){let l=5;const r=openModal(`
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
  `),a=r.querySelectorAll(".star-item");function o(d){l=d,a.forEach(g=>{g.style.color=Number(g.dataset.val)<=d?"#F59E0B":"var(--text-4)"})}a.forEach(d=>{d.onclick=()=>o(Number(d.dataset.val))}),r.querySelector("#mAppCancel").onclick=()=>r.remove(),r.querySelector("#mAppConfirm").onclick=async()=>{const d=r.querySelector("#mAppFeedback").value.trim(),g=r.querySelector("#mAppConfirm");g.disabled=!0,g.textContent="Approving…";try{await apiPost(`/jobs/${e}/approve`,{rating:l,feedback:d}),flashToast("Deliverables approved & signed off! 🎉"),r.remove(),s&&s()}catch(n){flashToast(n.message,!0)}finally{g.disabled=!1,g.textContent="✓ Confirm Approval"}}}function re(e,t,s){const l=openModal(`
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
  `);bindAttachmentUploader("mRevAttachments"),l.querySelector("#mRevCancel").onclick=()=>l.remove(),l.querySelector("#mRevConfirm").onclick=async()=>{const r=l.querySelector("#mRevNotes").value.trim();if(!r){flashToast("Please enter revision details",!0);return}const a=getUploaderAttachments("mRevAttachments"),o=l.querySelector("#mRevConfirm");o.disabled=!0,o.textContent="Sending…";try{await apiPost(`/jobs/${e}/revision`,{feedback:r,attachments:a}),flashToast("Revision request sent to the team! ↺"),l.remove(),s&&s()}catch(d){flashToast(d.message,!0)}finally{o.disabled=!1,o.textContent="↺ Send Revision Request"}}}function ne(e,t){const s=t.roster||[],l=A&&A.length?A:[];e.innerHTML=`
    <div class="block">
      <h2>Our Team <span class="eyebrow">${l.length} members</span></h2>

      ${s.length>0?`
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${s.map(r=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${r.nature==="Existing"?"green":"blue"}">${r.nature}</span>
              </div>
              <div class="grid grid-2">
                ${V.filter(([a])=>(r.roles[a]||"").trim()&&r.roles[a]!=="TBD").map(([a,o])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${o}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(r.roles[a])}</strong>
                  </div>`).join("")||'<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join("")}
        </div>`:""}

      <div class="grid grid-2">
        ${l.map(r=>`
          <div class="card" style="border-left:4px solid var(--gold-500);display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500),var(--gold-500));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${r.name?r.name.charAt(0).toUpperCase():"?"}</div>
                <div>
                  <div style="font-size:14px;font-weight:800;color:var(--text-1)">${escapeHtml(r.name)}</div>
                  <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${escapeHtml(r.duties||"Team Member")}</div>
                </div>
              </div>
              <span class="badge ${r.status==="active"?"green":"gray"}">${escapeHtml(r.status)}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`}async function le(e){const t=await apiGet("/accounts/client-portal"),s=t.summary||{},l=t.invoices||[],r=t.payments||[];e.innerHTML=`
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2>Billing & Invoices <span class="eyebrow">${l.length} invoices issued</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">View your billing invoices, payment history, and pending balances.</p>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="grid grid-3" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Invoiced</span><span class="badge blue">Billed</span></div>
          <div class="kpi-value">${fmtINR(s.totalBilled||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${s.invoiceCount||0} total invoices</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500)">
          <div class="kpi-header"><span class="kpi-label">Total Payments Cleared</span><span class="badge green">Paid</span></div>
          <div class="kpi-value" style="color:var(--green-600)">${fmtINR(s.totalPaid||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${s.paymentCount||0} payments recorded</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header"><span class="kpi-label">Pending Dues Balance</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(s.pendingAmount||0)}</div>
          <div style="font-size:12px;color:${s.overdueAmount>0?"var(--red-600)":"var(--text-3)"};margin-top:4px">
            ${s.overdueAmount>0?`🚨 ${fmtINR(s.overdueAmount)} is overdue`:"No overdue invoices"}
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
              ${l.map(a=>`
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
      ${r.length>0?`
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
                ${r.map(a=>`
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
    </div>`}te();
