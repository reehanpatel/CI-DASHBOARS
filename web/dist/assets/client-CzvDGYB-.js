const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/proposals-B63DDSho.js","assets/api-DLObGl5e.js","assets/api-BYMlAisN.css"])))=>i.map(i=>d[i]);
import{f as j,d as ee,n as te,o as ie}from"./api-DLObGl5e.js";const ae="modulepreload",se=function(e){return"/"+e},O={},U=function(i,s,r){let t=Promise.resolve();if(s&&s.length>0){let o=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),v=l?.nonce||l?.getAttribute("nonce");t=o(s.map(c=>{if(c=se(c),c in O)return;O[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":ae,d||(f.as="script"),f.crossOrigin="",f.href=c,v&&f.setAttribute("nonce",v),document.head.appendChild(f),d)return new Promise((m,h)=>{f.addEventListener("load",m),f.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return t.then(o=>{for(const l of o||[])l.status==="rejected"&&n(l.reason);return i().catch(n)})};let $=null,J=[],D=[],g={tab:"dashboard",period:"month"},u={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:""};const _=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","Quality Check"]];async function oe(){if(initTheme(),$=requireAuth("client"),!!$){try{const[e,i]=await Promise.all([apiGet("/services"),apiGet("/personnel"),ee().catch(()=>{})]);J=e,D=i.filter(s=>s.status==="active")}catch{J=[],D=[]}y()}}const ne=[{key:"dashboard",label:"Overview Dashboard",icon:"📊"},{key:"jobs",label:"All Jobs Logged",icon:"📋"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"delivered",label:"Work Delivered",icon:"📦"},{key:"proposals",label:"Proposals & Scope",icon:"📜"},{key:"billing",label:"Billing & Invoices",icon:"💳"},{key:"team",label:"Our Team",icon:"👥"},{key:"settings",label:"Settings",icon:"⚙️"}];function y(){const e=document.getElementById("app"),i=j("client",ne,!1),s=i.find(r=>r.key===g.tab)||i[0];i.some(r=>r.key===g.tab)||(g.tab=s?s.key:"dashboard"),e.innerHTML=renderAppShell({user:$,currentRole:"client",activeTab:g.tab,tabs:i,title:s?s.label:"Overview Dashboard",subtitle:"Client Portal & Service Requests"}),bindAppShellEvents(r=>{g.tab=r,y()}),C()}window.ci360NavTab=e=>{g.tab=e,y()};async function C(e=!1){const i=document.getElementById("content");if(i){if(g.tab==="logjob"){W(i);return}!e&&!i.dataset.loaded&&(i.innerHTML=renderSkeletonCards(3)),i.dataset.loaded="true";try{const s=await apiGet("/dashboard/client?period="+g.period);g.tab==="dashboard"?await le(i,s):g.tab==="jobs"?de(i,s):g.tab==="delivered"?pe(i,s):g.tab==="proposals"?await me(i,s):g.tab==="billing"?await fe(i):g.tab==="team"?be(i,s):g.tab==="settings"&&re(i)}catch(s){i.innerHTML=renderEmptyState("Something went wrong",s.message,"⚠️")}}}function re(e){e.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">⚙️</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Account Settings & Security</h1>
            <p class="ci360-hero-subheading">Manage your authorized client portal username, login email, and security password</p>
          </div>
        </div>
      </header>
      <div style="padding:8px 0 24px 0;">
        ${te({title:"Client Account Credentials",subtitle:"Manage your authorized client portal username, login email, and security password"})}
      </div>
    </section>
  `,ie(e)}async function le(e,i){const s=i.client?.name||$?.name||"Valued Client",r=i.client?.code||"CI360-ACC",t=i.client?.nature||i.client?.difficulty||"Retainer Account",n=i.jobs||[];let o=[];try{o=((await apiGet("/accounts/client-portal")).invoices||[]).filter(x=>x.status==="overdue"||x.pendingAmount>0&&new Date(x.dueDate)<new Date),o.length>0&&typeof window.showClientOverdueInvoiceModal=="function"&&window.showClientOverdueInvoiceModal(o)}catch{}let l=[];try{l=(await apiGet("/proposals")||[]).filter(b=>["approved","with_client","won","changes"].includes(b.status))}catch{}const v=g.period==="all"?n:n.filter(a=>{if(!a.date)return!0;const b=a.date.slice(0,10);return(!i.from||b>=i.from)&&(!i.to||b<=i.to)}),c=v.length,p=v.filter(a=>a.status==="Completed"||a.clientApproval&&a.clientApproval.status==="Approved"||a.completionDate).length,m=v.filter(a=>!a.completionDate&&a.status!=="Completed"&&(!a.clientApproval||a.clientApproval.status!=="Approved")).length,H=v.filter(a=>a.clientApproval&&a.clientApproval.status==="Revision Requested").length,Y=i.stats?.hours!=null?Number(i.stats.hours):v.reduce((a,b)=>{let x=0;return(b.assignments||[]).forEach(S=>x+=Number(S.hours)||0),a+x},0),z=c>0?Math.round(p/c*100):n.length>0?Math.round(n.filter(a=>a.completionDate).length/n.length*100):100,T=n.filter(a=>(a.deliverables&&a.deliverables.length||a.status==="Completed")&&(!a.clientApproval||a.clientApproval.status==="Pending")&&a.status!=="Denied"&&(!a.clientApproval||a.clientApproval.status!=="Approved")),P={};v.forEach(a=>{(a.serviceNames&&a.serviceNames.length?a.serviceNames:["General Deliverable"]).forEach(x=>{P[x]=(P[x]||0)+1})});const I=Object.entries(P).sort((a,b)=>b[1]-a[1]),Q=v.filter(a=>a.priority==="Urgent").length,K=v.filter(a=>a.priority==="High").length,X=i.roster||[],R=[];X.forEach(a=>{_.forEach(([b,x])=>{String(a.roles?.[b]||"").split(",").map(A=>A.trim()).filter(Boolean).forEach(A=>{R.some(Z=>Z.name===A)||R.push({name:A,role:x})})})});const B=n.slice(0,5);e.innerHTML=`
    <div class="block client-overview-container" style="max-width:1280px;margin:0 auto">
      
      <!-- Overdue Invoice Urgent Alert (if any) -->
      ${o.length>0?`
        <div class="card" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.35);margin-bottom:20px;padding:16px 22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;border-radius:var(--r-xl);box-shadow:0 8px 24px -6px rgba(239,68,68,0.2)">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:42px;height:42px;border-radius:12px;background:rgba(239,68,68,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🚨</div>
            <div>
              <strong style="color:var(--red-600);font-size:14px">Immediate Action Required: ${o.length} Overdue Invoice${o.length>1?"s":""}</strong>
              <div style="font-size:12.5px;color:var(--text-3);margin-top:2px">
                Total outstanding overdue balance: <strong style="color:var(--red-600);font-weight:800">${fmtINR(o.reduce((a,b)=>a+(Number(b.pendingAmount||b.totalAmount)||0),0))}</strong>. Please settle to keep active deliverable pipelines moving smoothly.
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
      <div class="card client-hero-card">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;width:100%;">
          <div style="display:flex;align-items:center;gap:18px">
            <div style="width:54px;height:54px;border-radius:var(--r-lg);background:linear-gradient(135deg,#0284C7 0%,#0070F3 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;box-shadow:0 8px 16px -4px rgba(0,112,243,0.4);flex-shrink:0">
              ${s.slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
                <h1 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0;letter-spacing:-0.5px">${escapeHtml(s)}</h1>
                <span class="badge blue" style="font-size:11px;font-weight:700">${escapeHtml(r)}</span>
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
            ${renderPeriodPicker(g.period)}
          </div>
        </div>
      </div>

      <!-- Action Required: Proposal Released Alert (if any pending) -->
      ${l.some(a=>a.status==="with_client"||a.status==="approved")?`
        <div class="card" style="background:rgba(0,112,243,0.06);border:1px solid #0070F3;border-radius:var(--r-lg);padding:16px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(0,112,243,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">📜</div>
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
            <div class="value" style="font-size:32px;font-weight:900;color:var(--text-1);line-height:1">${c}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${n.length} all-time requests recorded</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--amber-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Active in Production</div>
              <div style="font-size:20px">⏳</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--amber-500);line-height:1">${m}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${H>0?`<strong style="color:var(--amber-600)">${H}</strong> in revision review`:"Under active execution"}</div>
          </div>

          <div class="card kpi" style="border-top:3px solid var(--green-500);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Delivered &amp; Signed Off</div>
              <div style="font-size:20px">✅</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:var(--green-500);line-height:1">${p}</div>
            <div class="sub" style="font-size:12px;color:var(--text-4);margin-top:6px">${z}% delivery fulfillment rate</div>
          </div>

          <div class="card kpi" style="border-top:3px solid #8B5CF6;padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div class="label" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-3)">Dedicated Effort</div>
              <div style="font-size:20px">⏱️</div>
            </div>
            <div class="value" style="font-size:32px;font-weight:900;color:#8B5CF6;line-height:1">${Y.toFixed(1)} <span style="font-size:18px;font-weight:600">hrs</span></div>
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
            <span class="badge ${z>=80?"green":"gold"}" style="font-weight:700">${z}% Complete</span>
          </div>

          <div style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:var(--text-3);margin-bottom:6px">
              <span>Fulfillment Rate</span>
              <span>${p} of ${c} Jobs Completed</span>
            </div>
            <div style="width:100%;height:10px;background:var(--border-sm);border-radius:10px;overflow:hidden;display:flex">
              <div style="width:${z}%;background:linear-gradient(90deg, var(--green-500), #059669);border-radius:10px;transition:width 0.6s ease"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;padding:12px 8px;background:var(--bg-surface);border-radius:var(--r-md);border:1px solid var(--border-xs)">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Completed</div>
              <div style="font-size:18px;font-weight:900;color:var(--green-500);margin-top:2px">${p}</div>
            </div>
            <div style="border-left:1px solid var(--border-sm);border-right:1px solid var(--border-sm)">
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">In Progress</div>
              <div style="font-size:18px;font-weight:900;color:var(--amber-500);margin-top:2px">${m}</div>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase">Urgent / High</div>
              <div style="font-size:18px;font-weight:900;color:var(--brand-500);margin-top:2px">${Q+K}</div>
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
              ${I.slice(0,5).map(([a,b])=>{const x=Math.round(b/(c||1)*100);return`
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;color:var(--text-2);margin-bottom:4px">
                      <span>${escapeHtml(a)}</span>
                      <span style="color:var(--text-4)">${b} job(s) (${x}%)</span>
                    </div>
                    <div style="width:100%;height:7px;background:var(--border-sm);border-radius:6px;overflow:hidden">
                      <div style="width:${x}%;height:100%;background:linear-gradient(90deg, #0284C7, #0070F3);border-radius:6px"></div>
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

        ${R.length>0?`
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:14px">
            ${R.slice(0,6).map(a=>`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-surface);border:1px solid var(--border-xs);border-radius:var(--r-md)">
                <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#0284C7 0%,#0070F3 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">
                  ${a.name.slice(0,2).toUpperCase()}
                </div>
                <div style="min-width:0;flex:1">
                  <div style="font-size:13.5px;font-weight:800;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(a.name)}</div>
                  <div style="font-size:11px;font-weight:600;color:var(--brand-500);text-transform:uppercase">${escapeHtml(a.role)}</div>
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
            View All Jobs (${n.length}) →
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
                ${B.map(a=>{const b=a.status==="Completed"||a.clientApproval&&a.clientApproval.status==="Approved"||a.completionDate,x=a.clientApproval&&a.clientApproval.status==="Revision Requested",S=a.priority==="Urgent"?"red":a.priority==="High"?"amber":"blue";return`
                    <tr style="cursor:pointer" onclick="ci360NavTab('jobs')">
                      <td style="padding-left:24px;font-weight:800;color:var(--text-1)">
                        ${escapeHtml(a.title||"Untitled Request")}
                      </td>
                      <td>
                        ${(a.serviceNames||[]).map(A=>`<span class="badge gray" style="font-size:11px">${escapeHtml(A)}</span>`).join(" ")||'<span style="color:var(--text-4)">—</span>'}
                      </td>
                      <td>
                        <span class="badge ${S}" style="font-size:11px;font-weight:700">${escapeHtml(a.priority||"Medium")}</span>
                      </td>
                      <td style="font-size:12.5px;color:var(--text-3)">${fmtDate(a.date)}</td>
                      <td style="font-size:12.5px;color:var(--text-2);font-weight:600">${a.completionDate?fmtDate(a.completionDate):"—"}</td>
                      <td>
                        <span class="badge ${b?"green":x?"amber":"gold"}" style="font-weight:700">
                          ${b?"✓ Completed":x?"↺ Revision":"⏳ In Progress"}
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
  `;const N=document.getElementById("btnHeroLogJob");N&&(N.onclick=()=>{g.tab="logjob",y()});const E=document.getElementById("btnHeroProposals");E&&(E.onclick=()=>{g.tab="proposals",y()});const F=document.getElementById("btnHeroInvoices");F&&(F.onclick=()=>{g.tab="billing",y()});const q=document.getElementById("btnReviewNow");q&&(q.onclick=()=>{g.tab="delivered",y()});const L=document.getElementById("btnMeetTeam");L&&(L.onclick=()=>{g.tab="team",y()});const M=document.getElementById("btnViewAllJobs");M&&(M.onclick=()=>{g.tab="jobs",y()}),document.querySelectorAll("#overviewPeriodWrapper [data-period]").forEach(a=>{a.onclick=()=>{g.period=a.dataset.period,C()}})}function W(e){e.innerHTML=`
    <div class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">➕</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Log a New Job</h1>
            <p class="ci360-hero-subheading">Request or record project work for your account</p>
          </div>
        </div>
      </header>
      <div class="card form-card">
        <form id="clientLogJobForm" novalidate>

          <div class="form-section">
            <div class="form-section-title">
              <span class="form-section-num">1</span>
              Job Details
            </div>
            <div class="field">
              <label for="clientJobTitle">Job Title *</label>
              <input type="text" id="clientJobTitle" value="${escapeHtml(u.title||"")}" placeholder="e.g. Brand Redesign &amp; Social Campaign" required>
            </div>
            <div class="field">
              <label for="clientJobService">Select Service *</label>
              <select id="clientJobService" required>
                <option value="">Select a service…</option>
                ${J.map(i=>`<option value="${i._id}" ${u.serviceId===i._id?"selected":""}>${escapeHtml(i.name)}</option>`).join("")}
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
                  <option value="Medium" ${u.priority==="Medium"?"selected":""}>🟡 Medium Priority</option>
                  <option value="High"   ${u.priority==="High"?"selected":""}>🟠 High Priority</option>
                  <option value="Urgent" ${u.priority==="Urgent"?"selected":""}>🔴 Urgent</option>
                </select>
              </div>
              <div class="field">
                <label for="clientJobPrefPerson">Preferred Team Member</label>
                <select id="clientJobPrefPerson">
                  <option value="">No Preference (Auto-Assign)</option>
                  ${D.map(i=>`<option value="${i._id}" ${u.preferredPersonId===i._id?"selected":""}>👤 ${escapeHtml(i.name)}${i.duties?` (${escapeHtml(i.duties)})`:""}</option>`).join("")}
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
                <input type="date" id="clientJobDate" value="${u.date}" required>
              </div>
              <div class="field">
                <label for="clientJobCompDate">Expected End Date</label>
                <input type="date" id="clientJobCompDate" value="${u.completionDate}">
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
              <textarea id="clientJobDesc" rows="3" placeholder="Describe the project scope, deliverables, or specific requirements…">${escapeHtml(u.desc)}</textarea>
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
    </div>`,bindAttachmentUploader("clientJobAttachments",{existing:u.attachments||[]}),document.getElementById("resetClientJobBtn").onclick=()=>{u={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},setUploaderAttachments("clientJobAttachments",[]),W(e)},document.getElementById("clientLogJobForm").onsubmit=async i=>{i.preventDefault();const s=document.getElementById("submitClientJobBtn"),r=document.getElementById("clientJobTitle").value.trim(),t=document.getElementById("clientJobService").value;if(!t){flashToast("Please select a service",!0);return}const n=document.getElementById("clientJobDate").value,o=document.getElementById("clientJobCompDate").value,l=document.getElementById("clientJobDesc").value.trim(),v=document.getElementById("clientJobPriority").value,c=document.getElementById("clientJobPrefPerson").value,d=getUploaderAttachments("clientJobAttachments");s.disabled=!0,s.textContent="Submitting…";try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}await apiPost("/jobs",{title:r,serviceIds:[t],date:n,completionDate:o,value:0,description:l,priority:v,preferredPersonId:c||null,assignments:[],attachments:d}),flashToast("Job logged successfully with attachments! 🎉"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),u={title:"",serviceId:"",date:new Date().toISOString().slice(0,10),completionDate:"",desc:"",priority:"Medium",preferredPersonId:"",attachments:[]},g.tab="jobs",y()}catch(p){flashToast(p.message,!0)}finally{s.disabled=!1,s.textContent="Submit Job"}}}let w="all",k="";function V(e,i){const s=!!(e.clientApproval&&e.clientApproval.status==="Approved"),r=e.status==="Denied"||!!(e.clientApproval&&e.clientApproval.status==="Denied"),t=!r&&!s&&!!(e.clientApproval&&e.clientApproval.status==="Revision Requested"),n=!r&&!s&&!t&&!!(e.clientApproval&&e.clientApproval.isRevised),o=!!(e.deliverables&&e.deliverables.length>0),l=e.status==="Completed"||!!e.completionDate,c=(o||l)&&!s&&!r&&!t,d=i[e.priority||"Medium"]||"gray",p=$&&e.createdBy&&(typeof e.createdBy=="object"&&String(e.createdBy._id)===String($._id||$.id)||String(e.createdBy)===String($._id||$.id)),f=r?"var(--red-500)":s?"var(--green-500)":t?"var(--amber-500)":n||c?"var(--brand-500)":"var(--amber-500)";let m="";return s?m='<span class="badge green">✓ Approved &amp; Signed Off</span>':r?m='<span class="badge red">❌ Denied by Client</span>':t?m='<span class="badge amber">↺ Revision Requested</span>':n?m='<span class="badge blue">📦 Revised — Awaiting Re-approval</span>':c?m='<span class="badge blue">🔔 Ready for Your Approval</span>':m='<span class="badge gold">⏳ In Progress</span>',`
    <div class="card client-job-card" data-id="${e._id}" style="border-left:4px solid ${f};padding:18px 22px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span style="font-size:15px;font-weight:800;color:var(--text-1)">${escapeHtml(e.title||"Untitled Job")}</span>
            ${p?'<span class="badge blue" style="font-size:10.5px;padding:2px 8px">👤 Logged by You</span>':""}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${m}
            <span class="badge ${d}">${escapeHtml(e.priority||"Medium")}</span>
            ${(e.serviceNames||[]).map(h=>`<span class="badge gray">${escapeHtml(h)}</span>`).join("")}
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
      ${s&&(e.clientApproval?.approvedAt||e.completionDate)?`<div style="margin-top:6px;font-size:12px;color:var(--s-green-text)">✓ Signed Off: ${fmtDate(e.clientApproval?.approvedAt||e.completionDate)}</div>`:e.completionDate?`<div style="margin-top:6px;font-size:12px;color:var(--text-3)">Delivered on: ${fmtDate(e.completionDate)}</div>`:""}

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

      <!-- Client Deliverable Approval / Revision / Denial / Working Box -->
      ${s?`
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:16px">✅</span>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--green-500)">Approved &amp; Signed Off</div>
              <div style="font-size:11.5px;color:var(--text-3)">Approved by ${escapeHtml(e.clientApproval?.approvedBy||"Client")} on ${fmtDate(e.clientApproval?.approvedAt||e.completionDate)}</div>
            </div>
          </div>
          ${e.clientApproval?.rating?`<span class="badge gold" style="font-size:12px">${"★".repeat(e.clientApproval.rating)} ${e.clientApproval.rating}/5</span>`:""}
        </div>
      `:r?`
        <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px">
            <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--red-500)">
              <span>❌</span> Deliverable Denied by You
            </div>
            <span style="font-size:11px;color:var(--text-4)">${fmtDate(e.clientApproval?.deniedAt||e.updatedAt)}</span>
          </div>
          <div style="font-size:12.5px;color:var(--text-1);background:var(--bg-surface);border-radius:var(--r-xs);padding:10px 12px;margin-top:6px;border-left:3px solid var(--red-500);line-height:1.5">
            <strong style="color:var(--red-500);font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">Reason for Denial:</strong>
            "${escapeHtml(e.clientApproval?.deniedReason||e.clientApproval?.feedback||"Job denied")}"
          </div>
        </div>
      `:t?`
        <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
            <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--amber-500)">
              <span>↺</span> Revision Requested
            </div>
            <span style="font-size:11px;color:var(--text-4)">${fmtDate((e.clientApproval?.revisions||[]).slice(-1)[0]?.requestedAt||e.updatedAt)}</span>
          </div>
          <div style="font-size:12.5px;color:var(--text-2);background:var(--bg-surface);border-radius:var(--r-xs);padding:8px 10px;margin-top:6px;line-height:1.4">
            "${escapeHtml(e.clientApproval?.feedback||"Revision requested")}"
          </div>
        </div>
      `:n?`
        <div style="background:linear-gradient(135deg,rgba(0,112,243,0.1) 0%,rgba(56,189,248,0.06) 100%);border:1px solid rgba(0,112,243,0.3);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800;color:var(--brand-500)">
              <span>📦</span> Revised Work Uploaded — Please Re-approve
            </div>
            <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">Our team has uploaded revised work based on your feedback. Please inspect and approve or deny.</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn ghost small client-deny-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(239,68,68,0.4);color:var(--red-500);font-weight:700;">
              ❌ Deny Job
            </button>
            <button type="button" class="btn ghost small client-rev-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(245,158,11,0.4);color:var(--amber-500)">
              ↺ Request Revision
            </button>
            <button type="button" class="btn gold small client-app-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="font-weight:700;">
              ✓ Re-approve Deliverables
            </button>
          </div>
        </div>
      `:c?`
        <div style="background:linear-gradient(135deg,rgba(0,112,243,0.08) 0%,rgba(56,189,248,0.05) 100%);border:1px solid rgba(0,112,243,0.25);border-radius:var(--r-sm);padding:12px 14px;margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--brand-500)">Deliverables Ready for Review</div>
            <div style="font-size:11.5px;color:var(--text-3)">Our team has completed the work / deliverables above. Please inspect and approve or deny this job.</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn ghost small client-deny-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(239,68,68,0.4);color:var(--red-500);font-weight:700;">
              ❌ Deny Job
            </button>
            <button type="button" class="btn ghost small client-rev-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="border-color:rgba(245,158,11,0.4);color:var(--amber-500)">
              ↺ Request Revision
            </button>
            <button type="button" class="btn gold small client-app-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" style="font-weight:700;">
              ✓ Approve &amp; Sign Off
            </button>
          </div>
        </div>
      `:`
        <div style="background:rgba(245,158,11,0.05);border:1px dashed var(--border-sm);border-radius:var(--r-sm);padding:10px 14px;margin-top:12px;display:flex;align-items:center;gap:8px">
          <span style="font-size:14px">⏳</span>
          <span style="font-size:12px;color:var(--text-3)">Our team is actively working on this job. Once deliverables or live links are submitted, you will be able to review and approve them here.</span>
        </div>
      `}
    </div>`}function G(e){document.querySelectorAll(".client-app-btn").forEach(i=>{i.onclick=()=>ce(i.dataset.id,i.dataset.title,()=>C())}),document.querySelectorAll(".client-rev-btn").forEach(i=>{i.onclick=()=>ve(i.dataset.id,i.dataset.title,()=>C())}),document.querySelectorAll(".client-deny-btn").forEach(i=>{i.onclick=()=>ge(i.dataset.id,i.dataset.title,()=>C())})}function de(e,i){const s=i.jobs||[],r={Medium:"gray",High:"amber",Urgent:"red"};if(s.length===0){e.innerHTML=`
      <div class="block">
        <h2>All Jobs Logged <span class="eyebrow">No jobs logged yet</span></h2>
        ${renderEmptyState("No jobs logged yet","Log your first job to request projects, design, campaigns, or services from our team.","📋",`<button class="btn gold" onclick="ui.tab='logjob';render()">➕ Log Your First Job</button>`)}
      </div>`;return}function t(){let d=s;if(w==="inprogress"?d=d.filter(p=>p.status!=="Denied"&&(!p.clientApproval||p.clientApproval.status!=="Approved")):w==="completed"?d=d.filter(p=>p.clientApproval&&p.clientApproval.status==="Approved"&&p.status!=="Denied"):w==="revision"?d=d.filter(p=>p.clientApproval&&p.clientApproval.status==="Revision Requested"&&p.status!=="Denied"):w==="denied"&&(d=d.filter(p=>p.status==="Denied"||p.clientApproval&&p.clientApproval.status==="Denied")),k){const p=k.toLowerCase();d=d.filter(f=>(f.title||"").toLowerCase().includes(p)||(f.description||"").toLowerCase().includes(p)||(f.serviceNames||[]).some(m=>m.toLowerCase().includes(p))||(f.preferredPersonName||"").toLowerCase().includes(p))}return d}const n=s.filter(d=>d.status!=="Denied"&&(!d.clientApproval||d.clientApproval.status!=="Approved")).length,o=s.filter(d=>d.clientApproval&&d.clientApproval.status==="Approved"&&d.status!=="Denied").length,l=s.filter(d=>d.clientApproval&&d.clientApproval.status==="Revision Requested"&&d.status!=="Denied").length,v=s.filter(d=>d.status==="Denied"||d.clientApproval&&d.clientApproval.status==="Denied").length;function c(){const d=t();e.innerHTML=`
      <div class="block">
        <header class="ci360-hero-banner">
          <div class="ci360-hero-left">
            <div class="ci360-hero-icon">📁</div>
            <div class="ci360-hero-title-group">
              <h1 class="ci360-hero-heading">All Jobs Logged</h1>
              <p class="ci360-hero-subheading">Track all projects and requests submitted by your account</p>
            </div>
          </div>
          <div class="ci360-hero-actions">
            <button class="btn primary" type="button" id="tabJobsLogNewBtn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
              <span>➕ Log a New Job</span>
            </button>
          </div>
        </header>

        <!-- Metric Badges Row -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:10px;margin-bottom:16px">
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;letter-spacing:0.5px">Total Logged</div>
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin-top:2px">${s.length}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">In Progress</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${n}</div>
          </div>
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--green-500);text-transform:uppercase;letter-spacing:0.5px">Completed</div>
            <div style="font-size:22px;font-weight:800;color:var(--green-500);margin-top:2px">${o}</div>
          </div>
          ${l>0?`
          <div class="card" style="padding:12px 14px;text-align:center">
            <div style="font-size:11px;font-weight:700;color:var(--amber-500);text-transform:uppercase;letter-spacing:0.5px">Revisions</div>
            <div style="font-size:22px;font-weight:800;color:var(--amber-500);margin-top:2px">${l}</div>
          </div>`:""}
          ${v>0?`
          <div class="card" style="padding:12px 14px;text-align:center;border-left:3px solid var(--red-500)">
            <div style="font-size:11px;font-weight:700;color:var(--red-500);text-transform:uppercase;letter-spacing:0.5px">Denied</div>
            <div style="font-size:22px;font-weight:800;color:var(--red-500);margin-top:2px">${v}</div>
          </div>`:""}
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;background:var(--bg-surface);padding:10px 14px;border-radius:var(--r-sm);border:1px solid var(--border-xs)">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btn ${w==="all"?"primary":"ghost"} small filter-tab-btn" data-f="all">All (${s.length})</button>
            <button type="button" class="btn ${w==="inprogress"?"primary":"ghost"} small filter-tab-btn" data-f="inprogress">In Progress (${n})</button>
            <button type="button" class="btn ${w==="completed"?"primary":"ghost"} small filter-tab-btn" data-f="completed">Completed (${o})</button>
            ${l>0?`<button type="button" class="btn ${w==="revision"?"primary":"ghost"} small filter-tab-btn" data-f="revision">Revisions (${l})</button>`:""}
            ${v>0?`<button type="button" class="btn ${w==="denied"?"primary":"ghost"} small filter-tab-btn" data-f="denied" style="color:var(--red-500)">Denied (${v})</button>`:""}
          </div>
          <div style="flex:1;max-width:280px;min-width:180px">
            <input type="text" id="clientJobSearchInput" value="${escapeHtml(k)}" placeholder="Search jobs…" style="padding:6px 12px;font-size:12.5px;width:100%;border-radius:var(--r-xs)">
          </div>
        </div>

        <!-- Jobs Listing -->
        <div style="display:flex;flex-direction:column;gap:14px">
          ${d.length===0?`
            <div class="card empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-4)">
              No matching jobs found ${k?`for "${escapeHtml(k)}"`:""}
            </div>
          `:d.map(m=>V(m,r)).join("")}
        </div>
      </div>`;const p=document.getElementById("tabJobsLogNewBtn");p&&(p.onclick=()=>{g.tab="logjob",y()}),e.querySelectorAll(".filter-tab-btn").forEach(m=>{m.onclick=()=>{w=m.dataset.f,c()}});const f=document.getElementById("clientJobSearchInput");f&&(f.oninput=m=>{k=m.target.value.trim(),c();const h=document.getElementById("clientJobSearchInput");h&&(h.focus(),h.selectionStart=h.selectionEnd=h.value.length)}),G()}c()}function pe(e,i){const r=(i.jobs||[]).filter(o=>o.deliverables&&o.deliverables.length>0||o.status==="Completed"||o.status==="Denied"||o.clientApproval&&(o.clientApproval.status==="Approved"||o.clientApproval.status==="Denied")),t={Medium:"gray",High:"amber",Urgent:"red"};if(r.length===0){e.innerHTML=`
      <div class="block">
        <h2>Work Delivered <span class="eyebrow">No delivered work yet</span></h2>
        ${renderEmptyState("No completed deliverables yet","When the team uploads final deliverables and marks work complete, you can review and sign off on them here.","📦",`<button class="btn ghost" onclick="ui.tab='jobs';render()">View All Jobs Logged</button>`)}
      </div>`;return}const n=r.filter(o=>(o.deliverables&&o.deliverables.length||o.status==="Completed")&&(!o.clientApproval||o.clientApproval.status==="Pending")&&o.status!=="Denied"&&(!o.clientApproval||o.clientApproval.status!=="Approved")).length;e.innerHTML=`
    <div class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">📦</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Work Delivered & Approvals</h1>
            <p class="ci360-hero-subheading">Review deliverable files, approve completed projects, or request revisions</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <span class="badge" style="background:rgba(0,112,243,0.15);color:#0070F3;font-weight:700;font-size:12px;padding:6px 12px;border-radius:12px;">${r.length} deliverables</span>
        </div>
      </header>

      ${n>0?`
        <div style="background:linear-gradient(135deg,rgba(0,112,243,0.12),rgba(56,189,248,0.06));border:1px solid rgba(0,112,243,0.3);border-radius:var(--r-sm);padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--brand-500)">🔔 ${n} Deliverable${n>1?"s":""} Waiting for Your Approval</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Please inspect the deliverables below and click Approve or Request Revision.</div>
          </div>
        </div>
      `:""}

      <div style="display:flex;flex-direction:column;gap:14px">
        ${r.map(o=>V(o,t)).join("")}
      </div>
    </div>`,G()}function ce(e,i,s){let r=5;const t=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Approve Deliverables &amp; Sign Off</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i)}</div>
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
  `),n=t.querySelectorAll(".star-item");function o(l){r=l,n.forEach(v=>{v.style.color=Number(v.dataset.val)<=l?"#F59E0B":"var(--text-4)"})}n.forEach(l=>{l.onclick=()=>o(Number(l.dataset.val))}),t.querySelector("#mAppCancel").onclick=()=>t.remove(),t.querySelector("#mAppConfirm").onclick=async()=>{const l=t.querySelector("#mAppFeedback").value.trim(),v=t.querySelector("#mAppConfirm");v.disabled=!0,v.textContent="Approving…";try{await apiPost(`/jobs/${e}/approve`,{rating:r,feedback:l}),flashToast("Deliverables approved & signed off! 🎉"),t.remove(),s&&s()}catch(c){flashToast(c.message,!0)}finally{v.disabled=!1,v.textContent="✓ Confirm Approval"}}}function ve(e,i,s){const r=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px">Request Deliverable Revision</div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i)}</div>
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
  `);bindAttachmentUploader("mRevAttachments"),r.querySelector("#mRevCancel").onclick=()=>r.remove(),r.querySelector("#mRevConfirm").onclick=async()=>{const t=r.querySelector("#mRevNotes").value.trim();if(!t){flashToast("Please enter revision details",!0);return}const n=getUploaderAttachments("mRevAttachments"),o=r.querySelector("#mRevConfirm");o.disabled=!0,o.textContent="Sending…";try{await apiPost(`/jobs/${e}/revision`,{feedback:t,attachments:n}),flashToast("Revision request sent to the team! ↺"),r.remove(),s&&s()}catch(l){flashToast(l.message,!0)}finally{o.disabled=!1,o.textContent="↺ Send Revision Request"}}}function ge(e,i,s){const r=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--red-500);margin-bottom:4px;display:flex;align-items:center;gap:8px">
        <span>❌</span> Deny Delivered Job
      </div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(i)}</div>
    </div>

    <div style="margin-bottom:16px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--r-sm);padding:12px 14px">
      <div style="font-size:13px;font-weight:700;color:var(--red-500);margin-bottom:4px">Why is this job denied?</div>
      <div style="font-size:12px;color:var(--text-3);line-height:1.4">
        Please state the reason clearly. Your explanation will be recorded and sent to the team and management immediately.
      </div>
    </div>

    <div class="field" style="margin-bottom:16px">
      <label for="mDenyReason" style="font-weight:700;">Reason for Denial <span style="color:var(--red-500)">*</span></label>
      <textarea id="mDenyReason" rows="4" placeholder="Detail exactly why this deliverable was denied, issues identified, or unmet specifications…" style="width:100%;box-sizing:border-box;"></textarea>
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mDenyCancel">Cancel</button>
      <button class="btn danger" id="mDenyConfirm" style="background:#EF4444;color:#FFFFFF;border-color:#EF4444;font-weight:700;">
        ❌ Confirm &amp; Deny Job
      </button>
    </div>
  `),t=r.querySelector("#mDenyReason");t&&t.focus(),r.querySelector("#mDenyCancel").onclick=()=>r.remove(),r.querySelector("#mDenyConfirm").onclick=async()=>{const n=r.querySelector("#mDenyReason").value.trim();if(!n){flashToast("Please enter the reason why this job is denied",!0),t&&t.focus();return}const o=r.querySelector("#mDenyConfirm");o.disabled=!0,o.textContent="Submitting Denial…";try{await apiPost(`/jobs/${e}/deny`,{reason:n}),flashToast("Job marked as denied. The team has been notified. ❌"),r.remove(),s&&s()}catch(l){flashToast(l.message,!0),o.disabled=!1,o.textContent="❌ Confirm & Deny Job"}}}async function me(e,i){let s=[];try{s=await apiGet("/proposals")||[]}catch{s=[]}const r=s.filter(t=>["approved","with_client","won","changes"].includes(t.status));e.innerHTML=`
    <div class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h2>Commercial Proposals & Scope <span class="eyebrow">${r.length} mandates</span></h2>
          <p style="font-size:13px;color:var(--text-3);margin:0;">
            Official service proposals, deliverables scope, rate cards, and SLA governance released by CI360 administration.
          </p>
        </div>
      </div>

      <!-- Quick KPI Cards -->
      <div class="grid grid-3" style="margin-bottom:24px;">
        <div class="card kpi">
          <div class="kpi-header"><span class="kpi-label">Active Proposals</span><span class="badge blue">Scope</span></div>
          <div class="kpi-value">${r.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Released & ready for review / reference</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--green-500);">
          <div class="kpi-header"><span class="kpi-label">Signed / Approved</span><span class="badge green">Signed</span></div>
          <div class="kpi-value" style="color:var(--green-600);">${r.filter(t=>t.status==="won").length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Accepted mandates in execution</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500);">
          <div class="kpi-header"><span class="kpi-label">Awaiting Sign-off</span><span class="badge amber">Pending</span></div>
          <div class="kpi-value" style="color:var(--amber-600);">${r.filter(t=>t.status==="with_client"||t.status==="approved").length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Open for online sign-off</div>
        </div>
      </div>

      <!-- Proposals List -->
      ${r.length===0?`
        <div class="card" style="padding:48px 24px;text-align:center;">
          <div style="font-size:42px;margin-bottom:12px;">📜</div>
          <h3 style="margin:0 0 8px 0;font-size:17px;font-weight:800;color:var(--text-1);">No Released Proposals Found</h3>
          <p class="muted" style="max-width:540px;margin:0 auto 16px;font-size:13.5px;">
            Proposals released by CI360 will automatically appear here. If you were sent a direct review link by your account director, you can also view or download it directly at any time.
          </p>
        </div>
      `:`
        <div style="display:flex;flex-direction:column;gap:16px;">
          ${r.map(t=>{const o=t.status==="won"?'<span class="badge green" style="font-weight:700;">🎉 Officially Signed & Approved</span>':t.status==="changes"?'<span class="badge amber">⚠️ Revision Requested</span>':'<span class="badge blue">⏳ Awaiting Your Review & Sign-off</span>';return`
              <div class="card" style="border:1px solid var(--border-sm);padding:20px;border-radius:var(--r-lg);">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:14px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
                      <span class="badge gray" style="font-family:var(--font-mono);font-size:11.5px;">${escapeHtml(t.ref||"CI360-PR")}</span>
                      ${o}
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
                    <strong>Included Scope Areas:</strong> ${t.heads.map(l=>escapeHtml(l.title)).join(" • ")}
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
  `,e.querySelectorAll("[data-client-pdf]").forEach(t=>{t.onclick=async()=>{const n=t.dataset.clientPdf,o=r.find(l=>l._id===n);if(o){t.disabled=!0,t.textContent="Generating PDF…";try{const{exportPdfDoc:l}=await U(async()=>{const{exportPdfDoc:c}=await import("./proposals-B63DDSho.js");return{exportPdfDoc:c}},__vite__mapDeps([0,1,2])),v=await apiGet("/proposals/ratecard").catch(()=>({}));await l(o,v.settings||{},t)}catch(l){flashToast("Failed to download PDF: "+l.message,!0),t.disabled=!1,t.textContent="📄 Download PDF"}}}}),e.querySelectorAll("[data-client-word]").forEach(t=>{t.onclick=async()=>{const n=t.dataset.clientWord,o=r.find(l=>l._id===n);if(o){t.disabled=!0,t.textContent="Generating Word…";try{const{exportWordDocx:l}=await U(async()=>{const{exportWordDocx:c}=await import("./proposals-B63DDSho.js");return{exportWordDocx:c}},__vite__mapDeps([0,1,2])),v=await apiGet("/proposals/ratecard").catch(()=>({}));await l(o,v.settings||{},t)}catch(l){flashToast("Failed to download Word document: "+l.message,!0),t.disabled=!1,t.textContent="📝 Download Word (.docx)"}}}})}function be(e,i){const s=i.roster||[],r=D&&D.length?D:[];e.innerHTML=`
    <div class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">👥</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Our Team & Dedicated Leads</h1>
            <p class="ci360-hero-subheading">Meet your assigned creative and account management team members</p>
          </div>
        </div>
      </header>

      ${s.length>0?`
        <div style="margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:var(--text-2);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">Account Lead Assignments</h3>
          ${s.map(t=>`
            <div class="card" style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:13px;font-weight:700;color:var(--text-1)">Roster</span>
                <span class="badge ${t.nature==="Existing"?"green":"blue"}">${t.nature}</span>
              </div>
              <div class="grid grid-2">
                ${_.filter(([n])=>(t.roles[n]||"").trim()&&t.roles[n]!=="TBD").map(([n,o])=>`
                  <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-xs)">
                    <span style="font-size:12.5px;color:var(--text-3)">${o}</span>
                    <strong style="font-size:12.5px;color:var(--text-1)">${escapeHtml(t.roles[n])}</strong>
                  </div>`).join("")||'<div style="color:var(--text-4);font-size:13px">Not yet assigned.</div>'}
              </div>
            </div>`).join("")}
        </div>`:""}

      <div class="grid grid-2">
        ${r.map(t=>`
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
    </div>`}async function fe(e){const i=await apiGet("/accounts/client-portal"),s=i.summary||{},r=i.invoices||[],t=i.payments||[];e.innerHTML=`
    <div class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">💳</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Billing & Invoices</h1>
            <p class="ci360-hero-subheading">View your billing invoices, payment history, and pending balances</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <span class="badge" style="background:rgba(0,112,243,0.15);color:#0070F3;font-weight:700;font-size:12px;padding:6px 12px;border-radius:12px;">${r.length} invoices</span>
        </div>
      </header>

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
              ${r.map(n=>`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(n.invoiceNumber)}</strong></td>
                  <td>${fmtDate(n.issueDate)}</td>
                  <td style="color:${n.status==="overdue"?"var(--red-600)":"inherit"}">${fmtDate(n.dueDate)}</td>
                  <td class="num" style="font-weight:700">${fmtINR(n.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(n.amountPaid)}</td>
                  <td class="num" style="font-weight:800;color:${n.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${fmtINR(n.pendingAmount)}
                  </td>
                  <td>
                    <span class="badge ${n.status==="paid"?"green":n.status==="overdue"?"red":"amber"}">
                      ${escapeHtml(n.status.replace("_"," ").toUpperCase())}
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
                ${t.map(n=>`
                  <tr>
                    <td style="padding-left:22px"><strong>${escapeHtml(n.paymentNumber)}</strong></td>
                    <td>${fmtDate(n.paymentDate)}</td>
                    <td><span class="badge">${escapeHtml(n.paymentMethod.toUpperCase())}</span></td>
                    <td style="font-family:var(--font-mono);font-size:12px">${escapeHtml(n.referenceId||"—")}</td>
                    <td class="num" style="padding-right:22px;color:var(--green-600);font-weight:800">${fmtINR(n.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`}window.addEventListener("ci360:dataUpdated",e=>{const i=document.activeElement;!(i&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"||i.isContentEditable))&&g.tab!=="logjob"&&C(!0)});oe();
