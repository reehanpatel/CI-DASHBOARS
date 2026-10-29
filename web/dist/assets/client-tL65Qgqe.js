const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/proposals-D779wMz-.js","assets/api-l7nmF1Ia.js","assets/api-DUY0rKwj.css"])))=>i.map(i=>d[i]);
import{l as oe,m as ne}from"./api-l7nmF1Ia.js";const re="modulepreload",le=function(e){return"/"+e},Y={},Q=function(a,n,d){let t=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),r=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));t=Promise.allSettled(n.map(p=>{if(p=le(p),p in Y)return;Y[p]=!0;const l=p.endsWith(".css"),g=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${g}`))return;const v=document.createElement("link");if(v.rel=l?"stylesheet":re,l||(v.as="script"),v.crossOrigin="",v.href=p,r&&v.setAttribute("nonce",r),document.head.appendChild(v),l)return new Promise((x,h)=>{v.addEventListener("load",x),v.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${p}`)))})}))}function o(s){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s}return t.then(s=>{for(const r of s||[])r.status==="rejected"&&o(r.reason);return a().catch(o)})};let y=null,H=[],A=[],c={tab:"dashboard",period:"month"},f={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:""};const K=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","Quality Check"]];async function de(){if(initTheme(),y=requireAuth("client"),!!y){try{const[e,a]=await Promise.all([apiGet("/services"),apiGet("/personnel")]);H=e,A=a.filter(n=>n.status==="active")}catch{H=[],A=[]}u()}}const J=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"jobs",label:"All Jobs Logged",icon:"📋"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"delivered",label:"Work Delivered",icon:"📦"},{key:"proposals",label:"Proposals & Scope",icon:"📜"},{key:"billing",label:"Billing & Invoices",icon:"💳"},{key:"team",label:"Our Team",icon:"👥"},{key:"settings",label:"Settings",icon:"⚙️"}];function u(){const e=document.getElementById("app"),a=J.find(n=>n.key===c.tab)||J[0];e.innerHTML=renderAppShell({user:y,currentRole:"client",activeTab:c.tab,tabs:J,title:a.label,subtitle:"Client Portal & Service Requests"}),bindAppShellEvents(n=>{c.tab=n,u()}),k()}window.ci360NavTab=e=>{c.tab=e,u()};async function k(){const e=document.getElementById("content");if(e){if(c.tab==="logjob"){X(e);return}e.innerHTML=renderSkeletonCards(3);try{const a=await apiGet("/dashboard/client?period="+c.period);c.tab==="dashboard"?await ce(e,a):c.tab==="jobs"?ve(e,a):c.tab==="delivered"?ge(e,a):c.tab==="proposals"?await fe(e,a):c.tab==="billing"?await ue(e):c.tab==="team"?xe(e,a):c.tab==="settings"&&pe(e)}catch(a){e.innerHTML=renderEmptyState("Something went wrong",a.message,"⚠️")}}}function pe(e){e.innerHTML=`
    <div style="padding:8px 0 24px 0;">
      ${oe({title:"Client Account Credentials",subtitle:"Manage your authorized client portal username, login email, and security password"})}
    </div>
  `,ne(e)}async function ce(e,a){var O,_,W,V,G;const n=((O=a.client)==null?void 0:O.name)||(y==null?void 0:y.name)||"Valued Client",d=((_=a.client)==null?void 0:_.code)||"CI360-ACC",t=((W=a.client)==null?void 0:W.nature)||((V=a.client)==null?void 0:V.difficulty)||"Retainer Account",o=a.jobs||[];let s=[];try{s=((await apiGet("/accounts/client-portal")).invoices||[]).filter(b=>b.status==="overdue"||b.pendingAmount>0&&new Date(b.dueDate)<new Date),s.length>0&&typeof window.showClientOverdueInvoiceModal=="function"&&window.showClientOverdueInvoiceModal(s)}catch{}let r=[];try{r=(await apiGet("/proposals")||[]).filter(m=>["approved","with_client","won","changes"].includes(m.status))}catch{}const p=c.period==="all"?o:o.filter(i=>{if(!i.date)return!0;const m=i.date.slice(0,10);return(!a.from||m>=a.from)&&(!a.to||m<=a.to)}),l=p.length,v=p.filter(i=>i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate).length,h=p.filter(i=>!i.completionDate&&i.status!=="Completed"&&(!i.clientApproval||i.clientApproval.status!=="Approved")).length,E=p.filter(i=>i.clientApproval&&i.clientApproval.status==="Revision Requested").length,ee=((G=a.stats)==null?void 0:G.hours)!=null?Number(a.stats.hours):p.reduce((i,m)=>{let b=0;return(m.assignments||[]).forEach(R=>b+=Number(R.hours)||0),i+b},0),C=l>0?Math.round(v/l*100):o.length>0?Math.round(o.filter(i=>i.completionDate).length/o.length*100):100,T=o.filter(i=>i.deliverables&&i.deliverables.length&&(!i.clientApproval||i.clientApproval.status==="Pending")),P={};p.forEach(i=>{(i.serviceNames&&i.serviceNames.length?i.serviceNames:["General Deliverable"]).forEach(b=>{P[b]=(P[b]||0)+1})});const I=Object.entries(P).sort((i,m)=>m[1]-i[1]),te=p.filter(i=>i.priority==="Urgent").length,ie=p.filter(i=>i.priority==="High").length,ae=a.roster||[],z=[];ae.forEach(i=>{K.forEach(([m,b])=>{var D;String(((D=i.roles)==null?void 0:D[m])||"").split(",").map(S=>S.trim()).filter(Boolean).forEach(S=>{z.some(se=>se.name===S)||z.push({name:S,role:b})})})});const B=o.slice(0,5);e.innerHTML=`
    <div class="block client-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Overdue Invoice Urgent Alert (if any) -->
      ${s.length>0?`
        <div class="card" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.35);margin-bottom:20px;padding:16px 22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;border-radius:var(--r-xl);box-shadow:0 8px 24px -6px rgba(239,68,68,0.2)">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:42px;height:42px;border-radius:12px;background:rgba(239,68,68,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🚨</div>
            <div>
              <strong style="color:var(--red-600);font-size:14px">Immediate Action Required: ${s.length} Overdue Invoice${s.length>1?"s":""}</strong>
              <div style="font-size:12.5px;color:var(--text-3);margin-top:2px">
                Total outstanding overdue balance: <strong style="color:var(--red-600);font-weight:800">${fmtINR(s.reduce((i,m)=>i+(Number(m.pendingAmount||m.totalAmount)||0),0))}</strong>. Please settle to keep active deliverable pipelines moving smoothly.
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
              ${n.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(n)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(d)}</span>
                <span class="badge gold" style="font-size:11px;font-weight:700">★ ${escapeHtml(t)}</span>
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
            <button class="btn" id="btnHeroProposals" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;padding:9px 16px;border-radius:var(--r-md);background:var(--bg-surface);border:1px solid var(--border-sm);">
              <span>📜</span> Proposals &amp; Scope
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

      <!-- Action Required: Proposal Released Alert (if any pending) -->
      ${r.some(i=>i.status==="with_client"||i.status==="approved")?`
        <div class="card" style="background:linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(14,165,233,0.06) 100%);border:1px solid var(--brand-500);border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(79,70,229,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">📜</div>
            <div>
              <strong style="color:var(--text-1);font-size:14px;">Action Required: Commercial Proposal & Scope Released</strong>
              <div style="font-size:12.5px;color:var(--text-3);margin-top:2px;">
                You have active proposals released by CI360 administration ready for your review and online sign-off.
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <button class="btn primary small" onclick="window.ci360NavTab('proposals')" style="font-weight:700;">
              Review Proposals & SOW →
            </button>
          </div>
        </div>
      `:""}

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
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${l}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${o.length} all-time requests recorded</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active in Production</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${h}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${E>0?`<strong style="color:var(--amber-600)">${E}</strong> in revision review`:"Under active execution"}</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Delivered &amp; Signed Off</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${v}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${C}% delivery fulfillment rate</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Dedicated Effort</div>
              <div style="font-size:20px">⏱️</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${ee.toFixed(1)} <span style="font-size:18px;font-weight:600">hrs</span></div>
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
              <span>${v} of ${l} Jobs Completed</span>
            </div>
            <div style="width:100%;height:10px;background:var(--border-sm);border-radius:10px;overflow:hidden;display:flex">
              <div style="width:${C}%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:10px;transition:width 0.6s ease"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;padding:12px 8px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-xs)">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Completed</div>
              <div style="font-size:18px;font-weight:900;color:var(--green-500);margin-top:2px">${v}</div>
            </div>
            <div style="border-left:1px solid var(--border-sm);border-right:1px solid var(--border-sm)">
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">In Progress</div>
              <div style="font-size:18px;font-weight:900;color:var(--amber-500);margin-top:2px">${h}</div>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Urgent / High</div>
              <div style="font-size:18px;font-weight:900;color:var(--brand-500);margin-top:2px">${te+ie}</div>
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
              ${I.slice(0,5).map(([i,m])=>{const b=Math.round(m/(l||1)*100);return`
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;color:var(--text-2);margin-bottom:4px">
                      <span>${escapeHtml(i)}</span>
                      <span style="color:var(--text-4)">${m} job(s) (${b}%)</span>
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
            View All Jobs (${o.length}) →
          </button>
        </div>

        ${B.length>0?`
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
                ${B.map(i=>{const m=i.status==="Completed"||i.clientApproval&&i.clientApproval.status==="Approved"||i.completionDate,b=i.clientApproval&&i.clientApproval.status==="Revision Requested",R=i.priority==="Urgent"?"red":i.priority==="High"?"amber":"blue";return`
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
                        <span class="badge ${m?"green":b?"amber":"gold"}" style="font-weight:700">
                          ${m?"✓ Completed":b?"↺ Revision":"⏳ In Progress"}
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
  `;const N=document.getElementById("btnHeroLogJob");N&&(N.onclick=()=>{c.tab="logjob",u()});const L=document.getElementById("btnHeroProposals");L&&(L.onclick=()=>{c.tab="proposals",u()});const q=document.getElementById("btnHeroInvoices");q&&(q.onclick=()=>{c.tab="billing",u()});const F=document.getElementById("btnReviewNow");F&&(F.onclick=()=>{c.tab="delivered",u()});const M=document.getElementById("btnMeetTeam");M&&(M.onclick=()=>{c.tab="team",u()});const U=document.getElementById("btnViewAllJobs");U&&(U.onclick=()=>{c.tab="jobs",u()}),document.querySelectorAll("#overviewPeriodWrapper [data-period]").forEach(i=>{i.onclick=()=>{c.period=i.dataset.period,k()}})}function X(e){e.innerHTML=`
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
                ${H.map(a=>`<option value="${a._id}" ${f.serviceId===a._id?"selected":""}>${escapeHtml(a.name)}</option>`).join("")}
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
                  ${A.map(a=>`<option value="${a._id}" ${f.preferredPersonId===a._id?"selected":""}>👤 ${escapeHtml(a.name)}${a.duties?` (${escapeHtml(a.duties)})`:""}</option>`).join("")}
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
    </div>`,bindAttachmentUploader("clientJobAttachments",{existing:f.attachments||[]}),document.getElementById("resetClientJobBtn").onclick=()=>{f={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},setUploaderAttachments("clientJobAttachments",[]),X(e)},document.getElementById("clientLogJobForm").onsubmit=async a=>{a.preventDefault();const n=document.getElementById("submitClientJobBtn"),d=document.getElementById("clientJobTitle").value.trim(),t=document.getElementById("clientJobService").value;if(!t){flashToast("Please select a service",!0);return}const o=document.getElementById("clientJobDate").value,s=document.getElementById("clientJobCompDate").value,r=document.getElementById("clientJobDesc").value.trim(),p=document.getElementById("clientJobPriority").value,l=document.getElementById("clientJobPrefPerson").value,g=getUploaderAttachments("clientJobAttachments");n.disabled=!0,n.textContent="Submitting…";try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}await apiPost("/jobs",{title:d,serviceIds:[t],date:o,completionDate:s,value:0,description:r,priority:p,preferredPersonId:l||null,assignments:[],attachments:g}),flashToast("Job logged successfully with attachments! 🎉"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),f={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},c.tab="jobs",u()}catch(v){flashToast(v.message,!0)}finally{n.disabled=!1,n.textContent="Submit Job"}}}let w="all",$="";function Z(e,a){var s;const n=e.status==="Completed"||e.clientApproval&&e.clientApproval.status==="Approved",d=e.clientApproval&&e.clientApproval.status==="Revision Requested",t=a[e.priority||"Medium"]||"gray",o=y&&e.createdBy&&(typeof e.createdBy=="object"&&String(e.createdBy._id)===String(y._id||y.id)||String(e.createdBy)===String(y._id||y.id));return`
    <div class="card client-job-card" data-id="${e._id}" style="border-left:4px solid ${n?"var(--green-500)":d?"var(--amber-500)":"var(--brand-500)"};padding:18px 22px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:15px;font-weight:800;color:var(--text-1)">${escapeHtml(e.title||"Untitled Job")}</span>
            ${o?'<span class="badge blue" style="font-size:10.5px;padding:2px 8px">👤 Logged by You</span>':""}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span class="badge ${n?"green":d?"amber":"gold"}">
              ${n?"✓ Completed":d?"↺ Revision Requested":"⏳ In Progress"}
            </span>
            <span class="badge ${t}">${escapeHtml(e.priority||"Medium")}</span>
            ${(e.serviceNames||[]).map(r=>`<span class="badge gray">${escapeHtml(r)}</span>`).join("")}
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
      ${n&&e.completionDate?`<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Completed: ${fmtDate(e.completionDate)}</div>`:""}

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
              <span style="font-size:11px;color:var(--text-4)">${fmtDate(((s=(e.clientApproval.revisions||[]).slice(-1)[0])==null?void 0:s.requestedAt)||e.updatedAt)}</span>
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
    </div>`}function j(e){document.querySelectorAll(".client-app-btn").forEach(a=>{a.onclick=()=>me(a.dataset.id,a.dataset.title,()=>k())}),document.querySelectorAll(".client-rev-btn").forEach(a=>{a.onclick=()=>be(a.dataset.id,a.dataset.title,()=>k())})}function ve(e,a){const n=a.jobs||[],d={Medium:"gray",High:"amber",Urgent:"red"};if(n.length===0){e.innerHTML=`
      <div class="block">
        <h2>All Jobs Logged <span class="eyebrow">No jobs logged yet</span></h2>
        ${renderEmptyState("No jobs logged yet","Log your first job to request projects, design, campaigns, or services from our team.","📋",`<button class="btn gold" onclick="ui.tab='logjob';render()">➕ Log Your First Job</button>`)}
      </div>`;return}function t(){let l=n;if(w==="inprogress"?l=l.filter(g=>g.status!=="Completed"&&(!g.clientApproval||g.clientApproval.status!=="Approved")):w==="completed"?l=l.filter(g=>g.status==="Completed"||g.clientApproval&&g.clientApproval.status==="Approved"):w==="revision"&&(l=l.filter(g=>g.clientApproval&&g.clientApproval.status==="Revision Requested")),$){const g=$.toLowerCase();l=l.filter(v=>(v.title||"").toLowerCase().includes(g)||(v.description||"").toLowerCase().includes(g)||(v.serviceNames||[]).some(x=>x.toLowerCase().includes(g))||(v.preferredPersonName||"").toLowerCase().includes(g))}return l}const o=n.filter(l=>l.status!=="Completed"&&(!l.clientApproval||l.clientApproval.status!=="Approved")).length,s=n.filter(l=>l.status==="Completed"||l.clientApproval&&l.clientApproval.status==="Approved").length,r=n.filter(l=>l.clientApproval&&l.clientApproval.status==="Revision Requested").length;function p(){const l=t();e.innerHTML=`
      <div class="block">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px">
          <div>
            <h2 style="margin-bottom:4px">All Jobs Logged <span class="eyebrow">${n.length} total entries</span></h2>
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
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin-top:2px">${n.length}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">In Progress</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${o}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--green-500);text-transform:uppercase;letter-spacing:0.5px">Completed</div>
            <div style="font-size:22px;font-weight:800;color:var(--green-500);margin-top:2px">${s}</div>
          </div>
          ${r>0?`
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--red-500);text-transform:uppercase;letter-spacing:0.5px">Revisions</div>
            <div style="font-size:22px;font-weight:800;color:var(--red-500);margin-top:2px">${r}</div>
          </div>`:""}
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;background:var(--bg-surface);padding:10px 14px;border-radius:var(--r-sm);border:1px solid var(--border-xs)">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btn ${w==="all"?"primary":"ghost"} small filter-tab-btn" data-f="all">All (${n.length})</button>
            <button type="button" class="btn ${w==="inprogress"?"primary":"ghost"} small filter-tab-btn" data-f="inprogress">In Progress (${o})</button>
            <button type="button" class="btn ${w==="completed"?"primary":"ghost"} small filter-tab-btn" data-f="completed">Completed (${s})</button>
            ${r>0?`<button type="button" class="btn ${w==="revision"?"primary":"ghost"} small filter-tab-btn" data-f="revision">Revisions (${r})</button>`:""}
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
          `:l.map(x=>Z(x,d)).join("")}
        </div>
      </div>`;const g=document.getElementById("tabJobsLogNewBtn");g&&(g.onclick=()=>{c.tab="logjob",u()}),e.querySelectorAll(".filter-tab-btn").forEach(x=>{x.onclick=()=>{w=x.dataset.f,p()}});const v=document.getElementById("clientJobSearchInput");v&&(v.oninput=x=>{$=x.target.value.trim(),p();const h=document.getElementById("clientJobSearchInput");h&&(h.focus(),h.selectionStart=h.selectionEnd=h.value.length)}),j()}p()}function ge(e,a){const d=(a.jobs||[]).filter(s=>s.deliverables&&s.deliverables.length>0||s.status==="Completed"||s.clientApproval&&s.clientApproval.status==="Approved"),t={Medium:"gray",High:"amber",Urgent:"red"};if(d.length===0){e.innerHTML=`
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No delivered work yet</span></h2>
        ${renderEmptyState("No completed deliverables yet","When the team uploads final deliverables and marks work complete, you can review and sign off on them here.","📦",`<button class="btn ghost" onclick="ui.tab='jobs';render()">View All Jobs Logged</button>`)}
      </div>`;return}const o=d.filter(s=>s.deliverables&&s.deliverables.length&&(!s.clientApproval||s.clientApproval.status==="Pending")).length;e.innerHTML=`
    <div class="block">
      <div style="margin-bottom:18px">
        <h2 style="margin-bottom:4px">Work Delivered <span class="eyebrow">${d.length} completed deliverables</span></h2>
        <div style="font-size:12.5px;color:var(--text-3)">Review deliverable files, approve completed projects, or request revisions</div>
      </div>

      ${o>0?`
        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.06));border:1px solid rgba(99,102,241,0.3);border-radius:var(--r-sm);padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--brand-500)">🔔 ${o} Deliverable${o>1?"s":""} Waiting for Your Approval</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Please inspect the deliverables below and click Approve or Request Revision.</div>
          </div>
        </div>
      `:""}

      <div style="display:flex;flex-direction:column;gap:14px">
        ${d.map(s=>Z(s,t)).join("")}
      </div>
    </div>`,j()}function me(e,a,n){let d=5;const t=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Approve Deliverables &amp; Sign Off</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(a)}</div>
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
  `),o=t.querySelectorAll(".star-item");function s(r){d=r,o.forEach(p=>{p.style.color=Number(p.dataset.val)<=r?"#F59E0B":"var(--text-4)"})}o.forEach(r=>{r.onclick=()=>s(Number(r.dataset.val))}),t.querySelector("#mAppCancel").onclick=()=>t.remove(),t.querySelector("#mAppConfirm").onclick=async()=>{const r=t.querySelector("#mAppFeedback").value.trim(),p=t.querySelector("#mAppConfirm");p.disabled=!0,p.textContent="Approving…";try{await apiPost(`/jobs/${e}/approve`,{rating:d,feedback:r}),flashToast("Deliverables approved & signed off! 🎉"),t.remove(),n&&n()}catch(l){flashToast(l.message,!0)}finally{p.disabled=!1,p.textContent="✓ Confirm Approval"}}}function be(e,a,n){const d=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Request Deliverable Revision</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(a)}</div>
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
  `);bindAttachmentUploader("mRevAttachments"),d.querySelector("#mRevCancel").onclick=()=>d.remove(),d.querySelector("#mRevConfirm").onclick=async()=>{const t=d.querySelector("#mRevNotes").value.trim();if(!t){flashToast("Please enter revision details",!0);return}const o=getUploaderAttachments("mRevAttachments"),s=d.querySelector("#mRevConfirm");s.disabled=!0,s.textContent="Sending…";try{await apiPost(`/jobs/${e}/revision`,{feedback:t,attachments:o}),flashToast("Revision request sent to the team! ↺"),d.remove(),n&&n()}catch(r){flashToast(r.message,!0)}finally{s.disabled=!1,s.textContent="↺ Send Revision Request"}}}async function fe(e,a){let n=[];try{n=await apiGet("/proposals")||[]}catch{n=[]}const d=n.filter(t=>["approved","with_client","won","changes"].includes(t.status));e.innerHTML=`
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h2>Commercial Proposals & Scope <span class="eyebrow">${d.length} mandates</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0;">
            Official service proposals, deliverables scope, rate cards, and SLA governance released by CI360 administration.
          </p>
        </div>
      </div>

      <!-- Quick KPI Cards -->
      <div class="grid grid-3" style="margin-bottom:24px;">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Proposals</span><span class="badge blue">Scope</span></div>
          <div class="kpi-value">${d.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Released & ready for review / reference</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500);">
          <div class="kpi-header"><span class="kpi-label">Signed / Approved</span><span class="badge green">Signed</span></div>
          <div class="kpi-value" style="color:var(--green-600);">${d.filter(t=>t.status==="won").length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Accepted mandates in execution</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500);">
          <div class="kpi-header"><span class="kpi-label">Awaiting Sign-off</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600);">${d.filter(t=>t.status==="with_client"||t.status==="approved").length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Open for online sign-off</div>
        </div>
      </div>

      <!-- Proposals List -->
      ${d.length===0?`
        <div class="card" style="padding:48px 24px;text-align:center;">
          <div style="font-size:42px;margin-bottom:12px;">📜</div>
          <h3 style="margin:0 0 8px 0;font-size:17px;font-weight:800;color:var(--text-1);">No Released Proposals Found</h3>
          <p class="muted" style="max-width:540px;margin:0 auto 16px;font-size:13.5px;">
            Proposals released by CI360 will automatically appear here. If you were sent a direct review link by your account director, you can also view or download it directly at any time.
          </p>
        </div>
      `:`
        <div style="display:flex;flex-direction:column;gap:16px;">
          ${d.map(t=>{const s=t.status==="won"?'<span class="badge green" style="font-weight:700;">🎉 Officially Signed & Approved</span>':t.status==="changes"?'<span class="badge amber">⚠️ Revision Requested</span>':'<span class="badge blue">⏳ Awaiting Your Review & Sign-off</span>';return`
              <div class="card" style="border:1px solid var(--border-sm);padding:20px;border-radius:var(--r-lg);">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:14px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
                      <span class="badge gray" style="font-family:var(--font-mono);font-size:11.5px;">${escapeHtml(t.ref||"CI360-PR")}</span>
                      ${s}
                      ${t.approval&&t.approval.pinVerified?'<span class="badge green" style="font-size:11px;">🔐 Admin PIN Verified</span>':""}
                    </div>
                    <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">${escapeHtml(t.title||"Service Scope Proposal")}</h3>
                    <p class="muted small" style="margin:4px 0 0;">${escapeHtml(t.subtitle||t.oneLine||"Comprehensive Marketing & Growth Strategy")}</p>
                  </div>

                  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                    ${t.shareId?`
                      <a href="/proposal?p=${encodeURIComponent(t.shareId)}" target="_blank" class="btn primary small" style="font-weight:700;">
                        👁️ Review & Sign Online
                      </a>
                    `:""}
                    <button class="btn small" data-client-pdf="${escapeHtml(t._id)}" style="font-weight:600;">
                      📄 Download PDF
                    </button>
                    <button class="btn small" data-client-word="${escapeHtml(t._id)}">
                      📝 Download Word (.docx)
                    </button>
                  </div>
                </div>

                <!-- Scope Metadata Pills -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;padding:14px 16px;background:var(--bg-elevated);border-radius:var(--r-md);margin-bottom:14px;font-size:13px;">
                  <div>
                    <span class="muted" style="display:block;font-size:11.5px;">Engagement Term</span>
                    <strong style="color:var(--text-1);">${t.term?`${t.term} Months Retainer`:"Project Based"}</strong>
                  </div>
                  <div>
                    <span class="muted" style="display:block;font-size:11.5px;">Proposal Date</span>
                    <strong style="color:var(--text-1);">${fmtDate(t.date)}</strong>
                  </div>
                  <div>
                    <span class="muted" style="display:block;font-size:11.5px;">Validity</span>
                    <strong style="color:var(--text-1);">${t.validity||30} days from issue</strong>
                  </div>
                  <div>
                    <span class="muted" style="display:block;font-size:11.5px;">Primary Point of Contact</span>
                    <strong style="color:var(--text-1);">${escapeHtml(t.contact||"Account Director")}</strong>
                  </div>
                </div>

                <!-- Deliverables / Heads Summary -->
                ${t.heads&&t.heads.length?`
                  <div style="font-size:12.5px;color:var(--text-2);margin-bottom:8px;">
                    <strong>Included Scope Areas:</strong> ${t.heads.map(r=>escapeHtml(r.title)).join(" • ")}
                  </div>
                `:""}

                ${t.clientResponse&&t.clientResponse.decision?`
                  <div style="margin-top:12px;padding:10px 14px;background:var(--bg-surface);border-radius:var(--r-sm);border-left:3px solid ${t.clientResponse.decision==="approved"?"var(--green-500)":"var(--amber-500)"};font-size:12.5px;">
                    <strong>${t.clientResponse.decision==="approved"?"Signed by":"Feedback from"} ${escapeHtml(t.clientResponse.name)}:</strong>
                    ${t.clientResponse.comment?` “${escapeHtml(t.clientResponse.comment)}”`:" Formal confirmation submitted."}
                    <span class="muted small">(${new Date(t.clientResponse.at).toLocaleDateString("en-GB")})</span>
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `,e.querySelectorAll("[data-client-pdf]").forEach(t=>{t.onclick=async()=>{const o=t.dataset.clientPdf,s=d.find(r=>r._id===o);if(s){t.disabled=!0,t.textContent="Generating PDF…";try{const{exportPdfDoc:r}=await Q(async()=>{const{exportPdfDoc:l}=await import("./proposals-D779wMz-.js");return{exportPdfDoc:l}},__vite__mapDeps([0,1,2])),p=await apiGet("/proposals/ratecard").catch(()=>({}));await r(s,p.settings||{},t)}catch(r){flashToast("Failed to download PDF: "+r.message,!0),t.disabled=!1,t.textContent="📄 Download PDF"}}}}),e.querySelectorAll("[data-client-word]").forEach(t=>{t.onclick=async()=>{const o=t.dataset.clientWord,s=d.find(r=>r._id===o);if(s){t.disabled=!0,t.textContent="Generating Word…";try{const{exportWordDocx:r}=await Q(async()=>{const{exportWordDocx:l}=await import("./proposals-D779wMz-.js");return{exportWordDocx:l}},__vite__mapDeps([0,1,2])),p=await apiGet("/proposals/ratecard").catch(()=>({}));await r(s,p.settings||{},t)}catch(r){flashToast("Failed to download Word document: "+r.message,!0),t.disabled=!1,t.textContent="📝 Download Word (.docx)"}}}})}function xe(e,a){const n=a.roster||[],d=A&&A.length?A:[];e.innerHTML=`
    <div class="block">
      <h2>Our Team <span class="eyebrow">${d.length} members</span></h2>

      ${n.length>0?`
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${n.map(t=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${t.nature==="Existing"?"green":"blue"}">${t.nature}</span>
              </div>
              <div class="grid grid-2">
                ${K.filter(([o])=>(t.roles[o]||"").trim()&&t.roles[o]!=="TBD").map(([o,s])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${s}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(t.roles[o])}</strong>
                  </div>`).join("")||'<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join("")}
        </div>`:""}

      <div class="grid grid-2">
        ${d.map(t=>`
          <div class="card" style="border-left:4px solid var(--gold-500);display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--brand-500),var(--gold-500));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${t.name?t.name.charAt(0).toUpperCase():"?"}</div>
                <div>
                  <div style="font-size:14px;font-weight:800;color:var(--text-1)">${escapeHtml(t.name)}</div>
                  <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${escapeHtml(t.duties||"Team Member")}</div>
                </div>
              </div>
              <span class="badge ${t.status==="active"?"green":"gray"}">${escapeHtml(t.status)}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`}async function ue(e){const a=await apiGet("/accounts/client-portal"),n=a.summary||{},d=a.invoices||[],t=a.payments||[];e.innerHTML=`
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <h2>Billing & Invoices <span class="eyebrow">${d.length} invoices issued</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0">View your billing invoices, payment history, and pending balances.</p>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div class="grid grid-3" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Total Invoiced</span><span class="badge blue">Billed</span></div>
          <div class="kpi-value">${fmtINR(n.totalBilled||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${n.invoiceCount||0} total invoices</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500)">
          <div class="kpi-header"><span class="kpi-label">Total Payments Cleared</span><span class="badge green">Paid</span></div>
          <div class="kpi-value" style="color:var(--green-600)">${fmtINR(n.totalPaid||0)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${n.paymentCount||0} payments recorded</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header"><span class="kpi-label">Pending Dues Balance</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(n.pendingAmount||0)}</div>
          <div style="font-size:12px;color:${n.overdueAmount>0?"var(--red-600)":"var(--text-3)"};margin-top:4px">
            ${n.overdueAmount>0?`🚨 ${fmtINR(n.overdueAmount)} is overdue`:"No overdue invoices"}
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
              ${d.map(o=>`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(o.invoiceNumber)}</strong></td>
                  <td>${fmtDate(o.issueDate)}</td>
                  <td style="color:${o.status==="overdue"?"var(--red-600)":"inherit"}">${fmtDate(o.dueDate)}</td>
                  <td class="num" style="font-weight:700">${fmtINR(o.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(o.amountPaid)}</td>
                  <td class="num" style="font-weight:800;color:${o.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${fmtINR(o.pendingAmount)}
                  </td>
                  <td>
                    <span class="badge ${o.status==="paid"?"green":o.status==="overdue"?"red":"amber"}">
                      ${escapeHtml(o.status.replace("_"," ").toUpperCase())}
                    </span>
                  </td>
                </tr>`).join("")||'<tr><td colspan="7"><div class="empty" style="padding:28px">No invoices on file.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Payment Receipts Table -->
      ${t.length>0?`
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
                ${t.map(o=>`
                  <tr>
                    <td style="padding-left:22px"><strong>${escapeHtml(o.paymentNumber)}</strong></td>
                    <td>${fmtDate(o.paymentDate)}</td>
                    <td><span class="badge">${escapeHtml(o.paymentMethod.toUpperCase())}</span></td>
                    <td style="font-family:var(--font-mono);font-size:12px">${escapeHtml(o.referenceId||"—")}</td>
                    <td class="num" style="padding-right:22px;color:var(--green-600);font-weight:800">${fmtINR(o.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`}window.addEventListener("ci360:dataUpdated",e=>{const a=document.activeElement;!(a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.isContentEditable))&&c.tab!=="logjob"&&k()});de();
