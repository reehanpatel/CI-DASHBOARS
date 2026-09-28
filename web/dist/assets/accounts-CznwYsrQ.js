import{r as ee,b as te,i as ne,a as ae,c as B,e as l,f as v,d as D,g as z,h as b,j as K,o as L,k as Q}from"./api-B2Bht1wi.js";let E=null,N="overview",j=[],le=[];const V=[{key:"overview",label:"Overview",icon:"📊"},{key:"invoices",label:"Invoices",icon:"📄"},{key:"payments",label:"Payments",icon:"💵"},{key:"receivables",label:"Pending & Receivables",icon:"⏳"},{key:"billing",label:"Billing Profiles",icon:"⚙️"},{key:"tally",label:"TallyPrime Silver",icon:"🏛️"}];async function ie(){if(ne(),E=ae("accounts"),!!E){try{const[s,m]=await Promise.all([B("/clients").catch(()=>[]),B("/services").catch(()=>[])]);j=s||[],le=m||[]}catch(s){console.error("Failed to load initial metadata",s)}M()}}function M(){const s=document.getElementById("app"),m=V.find(e=>e.key===N)||V[0];s.innerHTML=ee({user:E,currentRole:"accounts",activeTab:N,tabs:V,title:m.label,subtitle:"Billing, Invoicing & Receivables Intelligence"}),te(e=>{N=e,M()}),k()}window.ci360NavTab=s=>{N=s,M()};async function k(){const s=document.getElementById("content");if(s){s.innerHTML=`
    <div style="display:flex;justify-content:center;align-items:center;min-height:240px">
      <div class="spinner"></div>
    </div>`;try{N==="overview"?await se(s):N==="invoices"?await oe(s):N==="payments"?await ce(s):N==="receivables"?await pe(s):N==="billing"?await ue(s):N==="tally"&&await ye(s)}catch(m){s.innerHTML=`
      <div class="empty" style="padding:48px 24px">
        <h3 style="color:var(--s-red-text);margin-bottom:8px">Unable to load accounts data</h3>
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px">${l(m.message)}</p>
        <button class="btn gold small" id="retryAccountsBtn">Retry</button>
      </div>`;const e=document.getElementById("retryAccountsBtn");e&&(e.onclick=()=>k())}}}async function se(s){var S,C;const m=await B("/accounts/dashboard"),e=m.metrics||{},n=m.aging||{current:0,days31to60:0,days61to90:0,days90plus:0},r=n.current+n.days31to60+n.days61to90+n.days90plus||1,c=Math.round(n.current/r*100),a=Math.round(n.days31to60/r*100),o=Math.round(n.days61to90/r*100),u=Math.max(0,100-(c+a+o)),g=E&&(/ekta/i.test(E.name)||/ekta/i.test(E.email)),i=E&&(E.role==="superadmin"||E.role==="admin"),x=g||i||E&&E.personnelId;s.innerHTML=`
    <section class="block">
      <div class="accounts-header-banner">
        <div class="accounts-header-title">
          <h2>Accounts & Finance Hub ${g?'<span class="badge" style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:12px;margin-left:8px;vertical-align:middle;padding:4px 8px;border-radius:6px">Ekta · Finance Manager</span>':""}</h2>
          <div class="accounts-header-subtitle">Real-time revenue tracking, invoice lifecycle, and client pending balances.</div>
        </div>
        <div class="accounts-header-actions">
          ${i?`
            <a href="/admin" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
              <span>← Admin Portal</span>
            </a>`:""}
          ${x?`
            <a href="/employee" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px" title="Open Daily Tasks & Employee Workspace">
              <span>💼 Employee Workspace →</span>
            </a>`:""}
          <button class="btn ghost small" id="seedDemoAccountsBtn" title="Seed realistic demo data if needed">
            <span>⚡ Seed Demo Data</span>
          </button>
          <button class="btn danger small" id="clearAllAccountsDataBtn" title="Permanently delete all invoices and payments">
            <span>🗑️ Delete All Data</span>
          </button>
          <button class="btn gold small" id="quickNewInvoiceBtn">
            <span>+ Create Invoice</span>
          </button>
          <button class="btn green small" id="quickRecordPaymentBtn">
            <span>+ Record Payment</span>
          </button>
        </div>
      </div>

      <!-- Top KPI Metric Cards -->
      <div class="grid grid-4" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Total Invoiced</span>
            <div class="kpi-icon" style="background:var(--brand-50);color:var(--brand-600)">📄</div>
          </div>
          <div class="kpi-value">${v(e.totalBilled||0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge blue">${e.invoiceCounts?e.invoiceCounts.total:0} Total</span>
            <span>All active billing</span>
          </div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Payments Collected</span>
            <div class="kpi-icon" style="background:var(--s-green-bg);color:var(--green-600)">💵</div>
          </div>
          <div class="kpi-value" style="color:var(--green-600)">${v(e.totalReceived||0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge green">${e.collectionRate||0}% Cleared</span>
            <span>of total billed</span>
          </div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header">
            <span class="kpi-label">Total Pending Dues</span>
            <div class="kpi-icon" style="background:#FFFBEB;color:var(--amber-600)">⏳</div>
          </div>
          <div class="kpi-value" style="color:var(--amber-600)">${v(e.totalPending||0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge amber">${(((S=e.invoiceCounts)==null?void 0:S.partially_paid)||0)+(((C=e.invoiceCounts)==null?void 0:C.issued)||0)} Invoices</span>
            <span>Awaiting full settlement</span>
          </div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Overdue Amount</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${v(e.totalOverdue||0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge red">${e.invoiceCounts?e.invoiceCounts.overdue:0} Overdue</span>
            <span>Past due date</span>
          </div>
        </div>
      </div>

      <!-- Aging & Monthly Invoicing Trend Row -->
      <div class="grid grid-2" style="margin-bottom:24px">
        <!-- Receivables Aging Analysis -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0">Receivables Aging Analysis</h3>
            <span class="badge gold">${v(e.totalPending||0)} Pending</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">Visual distribution of pending receivables based on invoice due dates.</div>
          
          <div class="aging-bar-container">
            <div class="aging-segment current" style="width:${c}%" title="0-30 Days: ${v(n.current)}"></div>
            <div class="aging-segment days31to60" style="width:${a}%" title="31-60 Days: ${v(n.days31to60)}"></div>
            <div class="aging-segment days61to90" style="width:${o}%" title="61-90 Days: ${v(n.days61to90)}"></div>
            <div class="aging-segment days90plus" style="width:${u}%" title="90+ Days: ${v(n.days90plus)}"></div>
          </div>

          <div class="aging-legend">
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--green-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">0 - 30 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${v(n.current)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--amber-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">31 - 60 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${v(n.days31to60)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:#F97316"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">61 - 90 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${v(n.days61to90)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--red-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">90+ Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--red-600)">${v(n.days90plus)}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Billed vs Collected Trend -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0">Revenue & Collections Trend</h3>
            <span class="badge blue">Last 6 Months</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:14px">Comparison of total invoiced amounts vs. cash collected.</div>

          <div style="display:flex;flex-direction:column;gap:12px">
            ${(m.monthlyTrend||[]).map(y=>{const d=Math.max(...(m.monthlyTrend||[]).map(h=>Math.max(h.billed,h.collected)),1e3),$=Math.round(y.billed/d*100),t=Math.round(y.collected/d*100);return`
                <div style="display:flex;align-items:center;gap:12px;font-size:12px">
                  <span style="width:50px;font-weight:700;color:var(--text-2)">${y.month}</span>
                  <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--brand-500);width:${Math.max(4,$)}%;border-radius:4px" title="Billed: ${v(y.billed)}"></div>
                      <span style="font-size:10.5px;color:var(--text-3);min-width:60px">${v(y.billed)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--green-500);width:${Math.max(4,t)}%;border-radius:4px" title="Collected: ${v(y.collected)}"></div>
                      <span style="font-size:10.5px;color:var(--green-600);font-weight:600;min-width:60px">${v(y.collected)}</span>
                    </div>
                  </div>
                </div>`}).join("")||'<div class="empty" style="padding:16px">No trend data yet</div>'}
          </div>
          <div style="display:flex;gap:16px;margin-top:14px;padding-top:10px;border-top:1px solid var(--border-xs);font-size:11.5px">
            <span style="display:flex;align-items:center;gap:5px"><span style="width:8px;height:8px;background:var(--brand-500);border-radius:2px"></span> Invoiced</span>
            <span style="display:flex;align-items:center;gap:5px"><span style="width:8px;height:8px;background:var(--green-500);border-radius:2px"></span> Collected</span>
          </div>
        </div>
      </div>

      <!-- Top Outstanding Clients & Recent Invoices -->
      <div class="grid grid-2">
        <!-- Top Clients with Pending Balances -->
        <div class="card table-card" style="padding:0;overflow:hidden">
          <div style="padding:18px 20px 14px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border-sm)">
            <div>
              <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0">Top Outstanding Receivables</h3>
              <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">Clients with highest pending amount</div>
            </div>
            <button class="btn ghost small" id="viewAllReceivablesBtn">View All →</button>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:20px">Client</th>
                  <th class="num">Pending</th>
                  <th class="num">Overdue</th>
                  <th class="num" style="padding-right:20px">Action</th>
                </tr>
              </thead>
              <tbody>
                ${(m.topClientsPending||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${l(y.clientName)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${y.invoiceCount} invoices</div>
                    </td>
                    <td class="num" style="font-weight:700;color:var(--amber-600)">${v(y.pendingAmount)}</td>
                    <td class="num">
                      ${y.overdueAmount>0?`<span class="badge red">${v(y.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                    </td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn green small quick-collect-btn" data-client-id="${y.clientId}" data-client-name="${l(y.clientName)}" data-pending="${y.pendingAmount}">
                        Collect
                      </button>
                    </td>
                  </tr>`).join("")||'<tr><td colspan="4"><div class="empty" style="padding:24px">No pending balances! All dues collected. 🎉</div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Invoices -->
        <div class="card table-card" style="padding:0;overflow:hidden">
          <div style="padding:18px 20px 14px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border-sm)">
            <div>
              <h3 style="font-size:15px;font-weight:800;color:var(--text-1);margin:0">Recent Invoices</h3>
              <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">Latest issued and billed invoices</div>
            </div>
            <button class="btn ghost small" id="viewAllInvoicesBtn">View All →</button>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="padding-left:20px">Invoice</th>
                  <th>Client</th>
                  <th class="num">Amount</th>
                  <th>Status</th>
                  <th class="num" style="padding-right:20px"></th>
                </tr>
              </thead>
              <tbody>
                ${(m.recentInvoices||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${l(y.invoiceNumber)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${D(y.issueDate)}</div>
                    </td>
                    <td>${l(y.clientName)}</td>
                    <td class="num" style="font-weight:700">${v(y.totalAmount)}</td>
                    <td>${O(y.status)}</td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn ghost small view-invoice-btn" data-id="${y._id}">View</button>
                    </td>
                  </tr>`).join("")||'<tr><td colspan="5"><div class="empty" style="padding:24px">No invoices generated yet.</div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`,document.getElementById("quickNewInvoiceBtn").onclick=()=>Z(),document.getElementById("quickRecordPaymentBtn").onclick=()=>q();const p=document.getElementById("seedDemoAccountsBtn");p&&(p.onclick=async()=>{if(confirm("Load realistic demo invoices, payments, and billing profiles?"))try{p.disabled=!0,p.textContent="Loading demo data…";const y=await z("/accounts/seed-demo",{});b(y.message||"Demo data loaded successfully!"),k()}catch(y){b(y.message,!0),p.disabled=!1,p.textContent="⚡ Seed Demo Data"}});const w=document.getElementById("clearAllAccountsDataBtn");w&&(w.onclick=async()=>{if(confirm(`⚠️ WARNING: Are you sure you want to delete ALL invoices and ALL payments in CI360 Accounts?

This will permanently wipe all transactions. Client billing profiles will remain intact.`))try{w.disabled=!0,w.textContent="Clearing…";const y=await z("/accounts/clear-all",{});b(y.message||"Accounts data cleared successfully"),k()}catch(y){b(y.message,!0),w.disabled=!1,w.innerHTML="<span>🗑️ Delete All Data</span>"}}),document.getElementById("viewAllReceivablesBtn").onclick=()=>{N="receivables",M()},document.getElementById("viewAllInvoicesBtn").onclick=()=>{N="invoices",M()},s.querySelectorAll(".quick-collect-btn").forEach(y=>{y.onclick=()=>{q({clientId:y.dataset.clientId,clientName:y.dataset.clientName,suggestedAmount:Number(y.dataset.pending)||0})}}),s.querySelectorAll(".view-invoice-btn").forEach(y=>{y.onclick=()=>J(y.dataset.id)})}function O(s){return s==="paid"?'<span class="badge green">Paid</span>':s==="partially_paid"?'<span class="badge blue">Partially Paid</span>':s==="overdue"?'<span class="badge red">Overdue</span>':s==="issued"?'<span class="badge amber">Issued</span>':s==="draft"?'<span class="badge gray">Draft</span>':s==="cancelled"?'<span class="badge red">Cancelled</span>':`<span class="badge">${l(s||"—")}</span>`}let W="all",G="",U="";async function oe(s){let m=`?status=${encodeURIComponent(W)}`;G&&(m+=`&clientId=${encodeURIComponent(G)}`),U&&(m+=`&search=${encodeURIComponent(U)}`);const e=await B("/accounts/invoices"+m),n=e.reduce((t,h)=>t+(h.totalAmount||0),0),r=e.reduce((t,h)=>t+(h.amountPaid||0),0),c=e.reduce((t,h)=>t+(h.pendingAmount||0),0);s.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Invoices <span class="eyebrow">${e.length} invoices</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Create, track, print, and manage all client invoices & billing schedules.</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn ghost small" id="exportInvoicesCsvBtn">📥 Export CSV</button>
          <button class="btn gold small" id="newInvoiceBtn">+ Create Invoice</button>
        </div>
      </div>

      <!-- Quick Summary Pills -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px">
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Total Billed:</span> <strong>${v(n)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Collected:</span> <strong style="color:var(--green-600)">${v(r)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Pending:</span> <strong style="color:var(--amber-600)">${v(c)}</strong>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="invoiceSearchInput" placeholder="Search by invoice #, client name, service…" value="${l(U)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="invoiceClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${j.map(t=>`<option value="${t._id}" ${G===t._id?"selected":""}>${l(t.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","issued","partially_paid","paid","overdue","draft"].map(t=>`
              <button class="btn ghost small invoice-status-filter ${W===t?"active gold":""}" data-status="${t}">
                ${t==="all"?"All":t.replace("_"," ").replace(/\b\w/g,h=>h.toUpperCase())}
              </button>`).join("")}
          </div>
        </div>
      </div>

      <!-- Bulk Selection & Action Bar -->
      <div class="card" style="padding:10px 16px;margin-bottom:12px;background:var(--bg-card);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:12px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:600;font-size:13px;margin:0;user-select:none">
            <input type="checkbox" id="selectAllInvoicesCb" style="width:17px;height:17px;cursor:pointer;margin:0">
            <span>Select All</span>
          </label>
          <span id="invoicesSelectedCounter" style="font-size:12px;color:var(--text-3);padding:2px 8px;background:var(--bg-2);border-radius:12px;border:1px solid var(--border-sm)">0 of ${e.length} selected</span>
          <button class="btn ghost small" id="invoicesDeselectAllBtn" style="display:none;padding:2px 8px;font-size:11px">Clear Selection</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <button class="btn danger small" id="deleteSelectedInvoicesBtn" style="display:none">
            🗑️ Delete Selected (<span id="deleteInvoicesSelectedCount">0</span>)
          </button>
          <button class="btn ghost danger small" id="deleteAllInvoicesBtn" title="Permanently delete all invoices" ${e.length===0?"disabled":""}>
            💥 Delete All Invoices (${e.length})
          </button>
        </div>
      </div>

      <!-- Invoices Table -->
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="width:36px;padding-left:16px;text-align:center">
                  <input type="checkbox" id="thSelectAllInvoices" style="width:16px;height:16px;cursor:pointer;margin:0" title="Select All">
                </th>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Type</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th class="num">Total</th>
                <th class="num">Paid</th>
                <th class="num">Pending</th>
                <th>Status</th>
                <th class="num" style="padding-right:22px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(t=>`
                <tr>
                  <td style="width:36px;padding-left:16px;text-align:center">
                    <input type="checkbox" class="invoice-select-cb" data-id="${t._id}" data-num="${l(t.invoiceNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--brand-600)">${l(t.invoiceNumber)}</strong>
                  </td>
                  <td><strong>${l(t.clientName)}</strong></td>
                  <td><span class="badge">${t.billingType?t.billingType.toUpperCase():"RETAINER"}</span></td>
                  <td style="font-size:12.5px">${D(t.issueDate)}</td>
                  <td style="font-size:12.5px;color:${t.status==="overdue"?"var(--red-600)":"inherit"}">${D(t.dueDate)}</td>
                  <td class="num" style="font-weight:700">${v(t.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${v(t.amountPaid)}</td>
                  <td class="num" style="font-weight:700;color:${t.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${v(t.pendingAmount)}
                  </td>
                  <td>${O(t.status)}</td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    <button class="btn ghost small view-invoice-btn" data-id="${t._id}" title="View and Print Invoice">👁️ View</button>
                    ${t.pendingAmount>0?`
                      <button class="btn green small pay-invoice-btn" data-id="${t._id}" data-num="${l(t.invoiceNumber)}" data-client-id="${t.clientId}" data-client-name="${l(t.clientName)}" data-pending="${t.pendingAmount}" title="Record Payment">
                        💵 Pay
                      </button>`:""}
                    <button class="btn ghost small edit-invoice-btn" data-id="${t._id}" title="Edit Invoice">✏️</button>
                    <button class="btn danger small delete-invoice-btn" data-id="${t._id}" title="Delete Invoice">🗑️</button>
                  </td>
                </tr>`).join("")||'<tr><td colspan="11"><div class="empty" style="padding:36px">No invoices match the current filters.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;const a=document.getElementById("invoiceSearchInput");let o=null;a.oninput=()=>{clearTimeout(o),o=setTimeout(()=>{U=a.value.trim(),k()},300)},document.getElementById("invoiceClientFilter").onchange=t=>{G=t.target.value,k()},s.querySelectorAll(".invoice-status-filter").forEach(t=>{t.onclick=()=>{W=t.dataset.status,k()}}),document.getElementById("newInvoiceBtn").onclick=()=>Z();const u=document.getElementById("selectAllInvoicesCb"),g=document.getElementById("thSelectAllInvoices"),i=document.getElementById("invoicesDeselectAllBtn"),x=document.getElementById("invoicesSelectedCounter"),p=document.getElementById("deleteSelectedInvoicesBtn"),w=document.getElementById("deleteInvoicesSelectedCount"),S=document.getElementById("deleteAllInvoicesBtn"),C=s.querySelectorAll(".invoice-select-cb");function y(){const t=Array.from(C).filter(I=>I.checked),h=t.length;x&&(x.textContent=`${h} of ${e.length} selected`),w&&(w.textContent=h),h>0?(p&&(p.style.display="inline-flex"),i&&(i.style.display="inline-flex")):(p&&(p.style.display="none"),i&&(i.style.display="none"));const P=C.length>0&&t.length===C.length;u&&(u.checked=P),g&&(g.checked=P)}function d(t){C.forEach(h=>{h.checked=t}),y()}u&&(u.onchange=t=>d(t.target.checked)),g&&(g.onchange=t=>d(t.target.checked)),i&&(i.onclick=()=>d(!1)),C.forEach(t=>{t.onchange=()=>y()}),p&&(p.onclick=async()=>{const t=Array.from(C).filter(h=>h.checked).map(h=>h.dataset.id);if(t.length&&confirm(`Are you sure you want to permanently delete the ${t.length} selected invoice(s)? This cannot be undone.`))try{p.disabled=!0,p.textContent="Deleting…";const h=await z("/accounts/invoices/bulk-delete",{ids:t});b(h.message||`Deleted ${t.length} invoice(s)`),k()}catch(h){b(h.message,!0),p.disabled=!1,y()}}),S&&(S.onclick=async()=>{if(!e.length){b("No invoices to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} invoices?

This will permanently remove all invoice records and unlink their payment records. This cannot be undone.`))try{S.disabled=!0,S.textContent="Deleting all…";const t=await z("/accounts/invoices/bulk-delete",{deleteAll:!0});b(t.message||"All invoices have been deleted."),k()}catch(t){b(t.message,!0),S.disabled=!1,S.textContent=`💥 Delete All Invoices (${e.length})`}}),s.querySelectorAll(".view-invoice-btn").forEach(t=>{t.onclick=()=>J(t.dataset.id)}),s.querySelectorAll(".edit-invoice-btn").forEach(t=>{t.onclick=()=>re(t.dataset.id)}),s.querySelectorAll(".pay-invoice-btn").forEach(t=>{t.onclick=()=>{q({invoiceId:t.dataset.id,invoiceNumber:t.dataset.num,clientId:t.dataset.clientId,clientName:t.dataset.clientName,suggestedAmount:Number(t.dataset.pending)||0})}}),s.querySelectorAll(".delete-invoice-btn").forEach(t=>{t.onclick=async()=>{if(confirm("Are you sure you want to delete this invoice? This cannot be undone."))try{await K("/accounts/invoices/"+t.dataset.id),b("Invoice deleted successfully"),k()}catch(h){b(h.message,!0)}}});const $=document.getElementById("exportInvoicesCsvBtn");$&&($.onclick=()=>de(e))}function de(s){if(!s||!s.length){b("No invoices to export",!0);return}const m=["Invoice Number","Client Name","Type","Issue Date","Due Date","Subtotal","Tax (18%)","Total Amount","Amount Paid","Pending Amount","Status"],e=s.map(o=>[o.invoiceNumber,`"${(o.clientName||"").replace(/"/g,'""')}"`,o.billingType||"",D(o.issueDate),D(o.dueDate),o.subtotal||0,o.taxAmount||0,o.totalAmount||0,o.amountPaid||0,o.pendingAmount||0,o.status]),n=[m.join(","),...e.map(o=>o.join(","))].join(`
`),r=new Blob([n],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(r),a=document.createElement("a");a.href=c,a.download=`CI360_Invoices_${new Date().toISOString().slice(0,10)}.csv`,a.click(),URL.revokeObjectURL(c),b("Invoices exported to CSV")}async function Z(s){let m="INV-2026-0001";try{const u=await B("/accounts/next-invoice-number");u&&u.invoiceNumber&&(m=u.invoiceNumber)}catch{}const e=new Date;e.setDate(e.getDate()+15);const n=[{description:"Strategic Intelligence & Creative Retainer",serviceId:"",quantity:1,rate:5e4,amount:5e4}],r=L(`
    <div style="max-width:680px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Create New Invoice</h3>
        <span class="badge gold" style="font-family:var(--font-heading);font-size:12px">${l(m)}</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client *</label>
          <select id="modalInvClient" required>
            <option value="">Select client…</option>
            ${j.map(u=>`<option value="${u._id}" ${s===u._id?"selected":""}>${l(u.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Invoice Number</label>
          <input type="text" id="modalInvNum" value="${l(m)}" required>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Issue Date</label>
          <input type="date" id="modalInvIssueDate" value="${new Date().toISOString().slice(0,10)}">
        </div>
        <div class="field">
          <label>Due Date *</label>
          <input type="date" id="modalInvDueDate" value="${e.toISOString().slice(0,10)}" required>
        </div>
        <div class="field">
          <label>Billing Type</label>
          <select id="modalInvType">
            <option value="retainer">Monthly Retainer</option>
            <option value="project">Project Fee</option>
            <option value="hourly">Hourly Billing</option>
            <option value="milestone">Milestone / Deliverable</option>
            <option value="one_time">One-Time Fee</option>
          </select>
        </div>
      </div>

      <!-- Line Items Section -->
      <div style="margin:16px 0 10px 0;display:flex;justify-content:space-between;align-items:center">
        <strong style="font-size:13px;color:var(--text-1)">Invoice Items & Services</strong>
        <button type="button" class="btn ghost small" id="modalAddItemRowBtn">+ Add Item</button>
      </div>

      <div id="modalItemsContainer" style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;padding-right:4px">
        <!-- Rendered dynamically -->
      </div>

      <!-- Calculations Card -->
      <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:14px 18px;margin:16px 0">
        <div style="display:flex;justify-content:space-between;font-size:12.5px;padding:3px 0">
          <span style="color:var(--text-3)">Subtotal:</span>
          <span id="modalCalcSubtotal" style="font-weight:700">₹0</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:3px 0">
          <div style="display:flex;align-items:center;gap:6px">
            <span style="color:var(--text-3);font-size:12.5px">GST Tax Rate:</span>
            <select id="modalCalcTaxRate" style="padding:2px 8px;font-size:12px;margin:0;width:auto">
              <option value="18" selected>18% (Standard GST)</option>
              <option value="12">12%</option>
              <option value="5">5%</option>
              <option value="0">0% (Nil / Exempt)</option>
              <option value="28">28%</option>
            </select>
          </div>
          <span id="modalCalcTaxAmount" style="font-weight:700;font-size:12.5px">₹0</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:3px 0">
          <span style="color:var(--text-3);font-size:12.5px">Discount (₹):</span>
          <input type="number" id="modalCalcDiscount" value="0" min="0" style="width:110px;text-align:right;padding:2px 8px;margin:0;font-size:12px">
        </div>
        <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:var(--brand-600);border-top:1px solid var(--border-sm);padding-top:8px;margin-top:6px">
          <span>Grand Total:</span>
          <span id="modalCalcTotal">₹0</span>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Payment Terms</label>
          <input type="text" id="modalInvTerms" value="Net 15 days from invoice date.">
        </div>
        <div class="field">
          <label>GSTIN / Tax ID</label>
          <input type="text" id="modalInvGstin" placeholder="e.g. 24AAACC1206M1ZT">
        </div>
      </div>

      <div class="field">
        <label>Notes / Client Message</label>
        <textarea id="modalInvNotes" rows="2" style="resize:vertical">Thank you for partnering with CI360 Intelligence.</textarea>
      </div>

      <div class="modal-actions" style="margin-top:18px">
        <button class="btn ghost" id="modalCancelInvBtn">Cancel</button>
        <button class="btn gold" id="modalSaveInvBtn">Create & Issue Invoice</button>
      </div>
    </div>`);let c=[...n];function a(){const u=r.querySelector("#modalItemsContainer");u.innerHTML=c.map((g,i)=>`
      <div style="display:flex;gap:8px;align-items:center;background:var(--bg-card);border:1px solid var(--border-xs);padding:8px 10px;border-radius:var(--r-sm)">
        <div style="flex:2">
          <input type="text" class="item-desc" data-idx="${i}" placeholder="Description / Service" value="${l(g.description)}" style="margin:0;font-size:12px">
        </div>
        <div style="width:70px">
          <input type="number" class="item-qty" data-idx="${i}" placeholder="Qty" min="1" value="${g.quantity}" style="margin:0;font-size:12px;text-align:center">
        </div>
        <div style="width:110px">
          <input type="number" class="item-rate" data-idx="${i}" placeholder="Rate (₹)" min="0" value="${g.rate}" style="margin:0;font-size:12px;text-align:right">
        </div>
        <div style="width:90px;font-weight:700;font-size:12.5px;text-align:right">
          ${v(g.amount)}
        </div>
        <div>
          ${c.length>1?`<button type="button" class="btn danger small remove-item-btn" data-idx="${i}" style="padding:4px 8px">✕</button>`:""}
        </div>
      </div>`).join(""),u.querySelectorAll(".item-desc").forEach(g=>{g.oninput=i=>{c[Number(i.target.dataset.idx)].description=i.target.value}}),u.querySelectorAll(".item-qty").forEach(g=>{g.oninput=i=>{const x=Number(i.target.dataset.idx),p=Number(i.target.value)||1;c[x].quantity=p,c[x].amount=p*(c[x].rate||0),a(),o()}}),u.querySelectorAll(".item-rate").forEach(g=>{g.oninput=i=>{const x=Number(i.target.dataset.idx),p=Number(i.target.value)||0;c[x].rate=p,c[x].amount=(c[x].quantity||1)*p,a(),o()}}),u.querySelectorAll(".remove-item-btn").forEach(g=>{g.onclick=()=>{const i=Number(g.dataset.idx);c.splice(i,1),a(),o()}})}function o(){const u=c.reduce((S,C)=>S+(Number(C.amount)||0),0),g=Number(r.querySelector("#modalCalcTaxRate").value)||0,i=Number(r.querySelector("#modalCalcDiscount").value)||0,x=Math.max(0,u-i),p=Math.round(x*(g/100)),w=x+p;r.querySelector("#modalCalcSubtotal").textContent=v(u),r.querySelector("#modalCalcTaxAmount").textContent=v(p),r.querySelector("#modalCalcTotal").textContent=v(w)}r.querySelector("#modalAddItemRowBtn").onclick=()=>{c.push({description:"",serviceId:"",quantity:1,rate:0,amount:0}),a(),o()},r.querySelector("#modalCalcTaxRate").onchange=o,r.querySelector("#modalCalcDiscount").oninput=o,r.querySelector("#modalInvClient").onchange=async u=>{const g=u.target.value;if(g)try{const i=await B("/accounts/billing-profiles").then(x=>{var p;return(p=x.find(w=>w.clientId===g))==null?void 0:p.profile});i&&(i.retainerAmount&&c.length===1&&c[0].rate===5e4&&(c[0].rate=i.retainerAmount,c[0].amount=i.retainerAmount,a(),o()),i.gstin&&(r.querySelector("#modalInvGstin").value=i.gstin),i.billingType&&(r.querySelector("#modalInvType").value=i.billingType))}catch{}},a(),o(),r.querySelector("#modalCancelInvBtn").onclick=()=>r.remove(),r.querySelector("#modalSaveInvBtn").onclick=async()=>{const u=r.querySelector("#modalInvClient").value,g=r.querySelector("#modalInvNum").value.trim(),i=r.querySelector("#modalInvIssueDate").value,x=r.querySelector("#modalInvDueDate").value,p=r.querySelector("#modalInvType").value,w=Number(r.querySelector("#modalCalcTaxRate").value)||0,S=Number(r.querySelector("#modalCalcDiscount").value)||0,C=r.querySelector("#modalInvTerms").value.trim(),y=r.querySelector("#modalInvGstin").value.trim(),d=r.querySelector("#modalInvNotes").value.trim();if(!u){b("Please select a client",!0);return}if(!x){b("Please select a due date",!0);return}if(!c.length||!c.some(t=>t.amount>0)){b("Please provide at least one valid line item with an amount",!0);return}const $={clientId:u,invoiceNumber:g,issueDate:i,dueDate:x,billingType:p,items:c,discount:S,taxRate:w,paymentTerms:C,gstin:y,notes:d};try{const t=r.querySelector("#modalSaveInvBtn");t.disabled=!0,t.textContent="Generating Invoice…",await z("/accounts/invoices",$),b("Invoice created and issued successfully!"),r.remove(),k()}catch(t){b(t.message,!0),r.querySelector("#modalSaveInvBtn").disabled=!1,r.querySelector("#modalSaveInvBtn").textContent="Create & Issue Invoice"}}}async function re(s){const e=(await B("/accounts/invoices/"+s)).invoice;if(!e)return;const n=L(`
    <div style="max-width:640px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Edit Invoice ${l(e.invoiceNumber)}</h3>
        ${O(e.status)}
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client</label>
          <input type="text" value="${l(e.clientName)}" disabled>
        </div>
        <div class="field">
          <label>Status</label>
          <select id="editInvStatus">
            <option value="issued" ${e.status==="issued"?"selected":""}>Issued</option>
            <option value="partially_paid" ${e.status==="partially_paid"?"selected":""}>Partially Paid</option>
            <option value="paid" ${e.status==="paid"?"selected":""}>Paid</option>
            <option value="overdue" ${e.status==="overdue"?"selected":""}>Overdue</option>
            <option value="draft" ${e.status==="draft"?"selected":""}>Draft</option>
            <option value="cancelled" ${e.status==="cancelled"?"selected":""}>Cancelled</option>
          </select>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Issue Date</label>
          <input type="date" id="editInvIssueDate" value="${e.issueDate?new Date(e.issueDate).toISOString().slice(0,10):""}">
        </div>
        <div class="field">
          <label>Due Date</label>
          <input type="date" id="editInvDueDate" value="${e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):""}">
        </div>
      </div>

      <div class="field">
        <label>Payment Terms</label>
        <input type="text" id="editInvTerms" value="${l(e.paymentTerms||"")}">
      </div>

      <div class="field">
        <label>GSTIN</label>
        <input type="text" id="editInvGstin" value="${l(e.gstin||"")}">
      </div>

      <div class="field">
        <label>Notes</label>
        <textarea id="editInvNotes" rows="2">${l(e.notes||"")}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="editCancelBtn">Cancel</button>
        <button class="btn gold" id="editSaveBtn">Save Changes</button>
      </div>
    </div>`);n.querySelector("#editCancelBtn").onclick=()=>n.remove(),n.querySelector("#editSaveBtn").onclick=async()=>{const r={status:n.querySelector("#editInvStatus").value,issueDate:n.querySelector("#editInvIssueDate").value,dueDate:n.querySelector("#editInvDueDate").value,paymentTerms:n.querySelector("#editInvTerms").value.trim(),gstin:n.querySelector("#editInvGstin").value.trim(),notes:n.querySelector("#editInvNotes").value.trim()};try{await Q("/accounts/invoices/"+s,r),b("Invoice updated successfully"),n.remove(),k()}catch(c){b(c.message,!0)}}}async function J(s){var a,o,u,g,i;const m=await B("/accounts/invoices/"+s),e=m.invoice,n=m.payments||[];if(!e)return;const r=L(`
    <div style="max-width:860px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px" class="no-print">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:18px;font-weight:800;color:var(--text-1)">Invoice Details</span>
          ${O(e.status)}
        </div>
        <div style="display:flex;gap:8px">
          ${e.pendingAmount>0?`
            <button class="btn green small" id="viewModalPayBtn">💵 Record Payment</button>`:""}
          <button class="btn gold small" id="viewModalPrintBtn">🖨️ Print / Save PDF</button>
          <button class="btn ghost small" id="viewModalCloseBtn">✕ Close</button>
        </div>
      </div>

      <!-- Printable Invoice Sheet -->
      <div class="invoice-sheet" id="printableInvoice">
        <!-- Header -->
        <div class="invoice-header-row">
          <div class="invoice-company-brand">
            <img src="/logo.png" alt="CI360" style="width:48px;height:48px;object-fit:contain">
            <div>
              <h1>CI360</h1>
              <div style="font-size:12px;color:var(--text-3);font-weight:600">PRODUCTIVITY & REVENUE INTELLIGENCE</div>
              <div style="font-size:11px;color:var(--text-4);margin-top:2px">SG Highway, Ahmedabad, Gujarat, 380054</div>
            </div>
          </div>
          <div class="invoice-meta-right">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--text-4);text-transform:uppercase">TAX INVOICE</div>
            <div class="invoice-number-badge">${l(e.invoiceNumber)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">Date: <strong>${D(e.issueDate)}</strong></div>
            <div style="font-size:12px;color:${e.status==="overdue"?"var(--red-600)":"var(--text-3)"}">
              Due Date: <strong>${D(e.dueDate)}</strong>
            </div>
          </div>
        </div>

        <!-- Bill To Grid -->
        <div class="invoice-grid-details">
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Billed To</div>
            <div style="font-size:16px;font-weight:800;color:var(--text-1)">${l(e.clientName)}</div>
            ${e.gstin?`<div style="font-size:12px;color:var(--text-2);margin-top:2px">GSTIN: <strong>${l(e.gstin)}</strong></div>`:""}
            ${e.billingAddress?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${l(e.billingAddress)}</div>`:""}
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Payment Status</div>
            <div>${O(e.status)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:6px">Pending Balance: <strong style="color:${e.pendingAmount>0?"var(--amber-600)":"var(--green-600)"};font-size:14px">${v(e.pendingAmount)}</strong></div>
          </div>
        </div>

        <!-- Line Items Table -->
        <table class="invoice-table">
          <thead>
            <tr>
              <th style="width:50%">Description / Service</th>
              <th style="text-align:center;width:15%">Qty</th>
              <th style="text-align:right;width:15%">Rate</th>
              <th style="text-align:right;width:20%">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${(e.items||[]).map(x=>`
              <tr>
                <td>
                  <strong>${l(x.description)}</strong>
                  ${x.serviceName?`<div style="font-size:11px;color:var(--text-3)">Service: ${l(x.serviceName)}</div>`:""}
                </td>
                <td style="text-align:center">${x.quantity||1}</td>
                <td style="text-align:right">${v(x.rate)}</td>
                <td style="text-align:right;font-weight:700">${v(x.amount)}</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <!-- Totals Wrap -->
        <div class="invoice-totals-wrap">
          <div class="invoice-totals-box">
            <div class="invoice-total-row">
              <span>Subtotal</span>
              <strong>${v(e.subtotal)}</strong>
            </div>
            ${e.discount>0?`
              <div class="invoice-total-row">
                <span>Discount</span>
                <span style="color:var(--green-600)">- ${v(e.discount)}</span>
              </div>`:""}
            <div class="invoice-total-row">
              <span>GST (${e.taxRate||18}%)</span>
              <span>${v(e.taxAmount)}</span>
            </div>
            <div class="invoice-total-row grand-total">
              <span>Total Amount</span>
              <span>${v(e.totalAmount)}</span>
            </div>
            <div class="invoice-total-row" style="padding-top:8px">
              <span>Amount Paid</span>
              <span style="color:var(--green-600);font-weight:700">${v(e.amountPaid)}</span>
            </div>
            <div class="invoice-total-row" style="font-size:15px;font-weight:800;color:${e.pendingAmount>0?"var(--amber-600)":"var(--green-600)"}">
              <span>Pending Amount</span>
              <span>${v(e.pendingAmount)}</span>
            </div>
          </div>
        </div>

        <!-- Bank Details & Terms Footer -->
        <div class="invoice-bank-footer">
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Bank Transfer & UPI Details</div>
            <div>Account Name: <strong>${l(((a=e.bankDetails)==null?void 0:a.accountName)||"CI360 Intelligence")}</strong></div>
            <div>Bank: <strong>${l(((o=e.bankDetails)==null?void 0:o.bankName)||"HDFC Bank")}</strong></div>
            <div>A/C Number: <strong>${l(((u=e.bankDetails)==null?void 0:u.accountNumber)||"50200088992211")}</strong></div>
            <div>IFSC Code: <strong>${l(((g=e.bankDetails)==null?void 0:g.ifscCode)||"HDFC0001234")}</strong></div>
            <div>UPI ID: <strong>${l(((i=e.bankDetails)==null?void 0:i.upiId)||"ci360@hdfcbank")}</strong></div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Terms & Conditions</div>
            <div style="line-height:1.4">${l(e.paymentTerms||"Payment due within 15 days of invoice date.")}</div>
            <div style="margin-top:8px;font-style:italic;color:var(--text-4)">${l(e.notes||"")}</div>
          </div>
        </div>
      </div>

      <!-- Linked Payment History (if any) -->
      ${n.length>0?`
        <div style="margin-top:20px" class="no-print">
          <h4 style="font-size:14px;font-weight:800;color:var(--text-1);margin:0 0 10px 0">Linked Payments (${n.length})</h4>
          <div class="table-wrapper" style="border:1px solid var(--border-sm);border-radius:var(--r-sm)">
            <table>
              <thead>
                <tr>
                  <th>Payment #</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Reference / UTR</th>
                  <th class="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${n.map(x=>`
                  <tr>
                    <td><strong>${l(x.paymentNumber)}</strong></td>
                    <td>${D(x.paymentDate)}</td>
                    <td><span class="badge">${l(x.paymentMethod)}</span></td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${l(x.referenceId||"—")}</td>
                    <td class="num" style="color:var(--green-600);font-weight:700">${v(x.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`);r.querySelector("#viewModalCloseBtn").onclick=()=>r.remove(),r.querySelector("#viewModalPrintBtn").onclick=()=>{window.print()};const c=r.querySelector("#viewModalPayBtn");c&&(c.onclick=()=>{r.remove(),q({invoiceId:e._id,invoiceNumber:e.invoiceNumber,clientId:e.clientId,clientName:e.clientName,suggestedAmount:e.pendingAmount})})}let Y="all",_="",F="";async function ce(s){let m=`?paymentMethod=${encodeURIComponent(Y)}`;_&&(m+=`&clientId=${encodeURIComponent(_)}`),F&&(m+=`&search=${encodeURIComponent(F)}`);const e=await B("/accounts/payments"+m),n=e.reduce((d,$)=>d+($.amount||0),0);s.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Payments Ledger <span class="eyebrow">${e.length} transactions</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track client remittances, bank transfers, UPI transactions, and receipts.</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn ghost small" id="exportPaymentsCsvBtn">📥 Export CSV</button>
          <button class="btn green small" id="newPaymentBtn">+ Record Payment</button>
        </div>
      </div>

      <!-- Quick Summary -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px">
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Total Collections:</span> <strong style="color:var(--green-600)">${v(n)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Average Payment:</span> <strong>${v(e.length?n/e.length:0)}</strong>
        </div>
      </div>

      <!-- Filters -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="paymentSearchInput" placeholder="Search by payment #, UTR, client name, invoice…" value="${l(F)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="paymentClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${j.map(d=>`<option value="${d._id}" ${_===d._id?"selected":""}>${l(d.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","bank_transfer","upi","cheque","card","cash"].map(d=>`
              <button class="btn ghost small payment-method-filter ${Y===d?"active gold":""}" data-method="${d}">
                ${d==="all"?"All Methods":d.replace("_"," ").toUpperCase()}
              </button>`).join("")}
          </div>
        </div>
      </div>

      <!-- Bulk Selection & Action Bar -->
      <div class="card" style="padding:10px 16px;margin-bottom:12px;background:var(--bg-card);border:1px solid var(--border-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:12px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:600;font-size:13px;margin:0;user-select:none">
            <input type="checkbox" id="selectAllPaymentsCb" style="width:17px;height:17px;cursor:pointer;margin:0">
            <span>Select All</span>
          </label>
          <span id="paymentsSelectedCounter" style="font-size:12px;color:var(--text-3);padding:2px 8px;background:var(--bg-2);border-radius:12px;border:1px solid var(--border-sm)">0 of ${e.length} selected</span>
          <button class="btn ghost small" id="paymentsDeselectAllBtn" style="display:none;padding:2px 8px;font-size:11px">Clear Selection</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <button class="btn danger small" id="deleteSelectedPaymentsBtn" style="display:none">
            🗑️ Delete Selected (<span id="deletePaymentsSelectedCount">0</span>)
          </button>
          <button class="btn ghost danger small" id="deleteAllPaymentsBtn" title="Permanently delete all payments" ${e.length===0?"disabled":""}>
            💥 Delete All Payments (${e.length})
          </button>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="width:36px;padding-left:16px;text-align:center">
                  <input type="checkbox" id="thSelectAllPayments" style="width:16px;height:16px;cursor:pointer;margin:0" title="Select All">
                </th>
                <th>Payment #</th>
                <th>Client</th>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Method</th>
                <th>Reference / UTR</th>
                <th class="num">Amount Paid</th>
                <th>Recorded By</th>
                <th class="num" style="padding-right:22px">Action</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(d=>`
                <tr>
                  <td style="width:36px;padding-left:16px;text-align:center">
                    <input type="checkbox" class="payment-select-cb" data-id="${d._id}" data-num="${l(d.paymentNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--green-600)">${l(d.paymentNumber)}</strong>
                  </td>
                  <td><strong>${l(d.clientName)}</strong></td>
                  <td>
                    ${d.invoiceNumber?`<span class="badge blue">${l(d.invoiceNumber)}</span>`:'<span class="muted">Advance / General</span>'}
                  </td>
                  <td style="font-size:12.5px">${D(d.paymentDate)}</td>
                  <td>
                    <span class="badge ${d.paymentMethod==="upi"?"gold":d.paymentMethod==="bank_transfer"?"blue":"green"}">
                      ${d.paymentMethod==="bank_transfer"?"🏦 RTGS/NEFT":d.paymentMethod==="upi"?"📱 UPI":d.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td style="font-family:var(--font-mono);font-size:12px">${l(d.referenceId||"—")}</td>
                  <td class="num" style="font-weight:800;color:var(--green-600);font-size:14px">${v(d.amount)}</td>
                  <td style="font-size:12px;color:var(--text-3)">${l(d.recordedByName||"Accounts")}</td>
                  <td class="num" style="padding-right:22px">
                    <button class="btn danger small delete-payment-btn" data-id="${d._id}" title="Delete payment & restore invoice balance">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")||'<tr><td colspan="10"><div class="empty" style="padding:36px">No payment records match the current filters.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;const r=document.getElementById("paymentSearchInput");let c=null;r.oninput=()=>{clearTimeout(c),c=setTimeout(()=>{F=r.value.trim(),k()},300)},document.getElementById("paymentClientFilter").onchange=d=>{_=d.target.value,k()},s.querySelectorAll(".payment-method-filter").forEach(d=>{d.onclick=()=>{Y=d.dataset.method,k()}}),document.getElementById("newPaymentBtn").onclick=()=>q();const a=document.getElementById("selectAllPaymentsCb"),o=document.getElementById("thSelectAllPayments"),u=document.getElementById("paymentsDeselectAllBtn"),g=document.getElementById("paymentsSelectedCounter"),i=document.getElementById("deleteSelectedPaymentsBtn"),x=document.getElementById("deletePaymentsSelectedCount"),p=document.getElementById("deleteAllPaymentsBtn"),w=s.querySelectorAll(".payment-select-cb");function S(){const d=Array.from(w).filter(h=>h.checked),$=d.length;g&&(g.textContent=`${$} of ${e.length} selected`),x&&(x.textContent=$),$>0?(i&&(i.style.display="inline-flex"),u&&(u.style.display="inline-flex")):(i&&(i.style.display="none"),u&&(u.style.display="none"));const t=w.length>0&&d.length===w.length;a&&(a.checked=t),o&&(o.checked=t)}function C(d){w.forEach($=>{$.checked=d}),S()}a&&(a.onchange=d=>C(d.target.checked)),o&&(o.onchange=d=>C(d.target.checked)),u&&(u.onclick=()=>C(!1)),w.forEach(d=>{d.onchange=()=>S()}),i&&(i.onclick=async()=>{const d=Array.from(w).filter($=>$.checked).map($=>$.dataset.id);if(d.length&&confirm(`Are you sure you want to permanently delete the ${d.length} selected payment(s)? This will restore linked invoice balances.`))try{i.disabled=!0,i.textContent="Deleting…";const $=await z("/accounts/payments/bulk-delete",{ids:d});b($.message||`Deleted ${d.length} payment(s)`),k()}catch($){b($.message,!0),i.disabled=!1,S()}}),p&&(p.onclick=async()=>{if(!e.length){b("No payments to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} payments?

This will restore all invoice balances to pending. This cannot be undone.`))try{p.disabled=!0,p.textContent="Deleting all…";const d=await z("/accounts/payments/bulk-delete",{deleteAll:!0});b(d.message||"All payments have been deleted."),k()}catch(d){b(d.message,!0),p.disabled=!1,p.textContent=`💥 Delete All Payments (${e.length})`}}),s.querySelectorAll(".delete-payment-btn").forEach(d=>{d.onclick=async()=>{if(confirm("Delete this payment record? This will restore the pending amount on the linked invoice."))try{await K("/accounts/payments/"+d.dataset.id),b("Payment deleted and invoice balance restored"),k()}catch($){b($.message,!0)}}});const y=document.getElementById("exportPaymentsCsvBtn");y&&(y.onclick=()=>{if(!e.length)return b("No payments to export",!0);const d=["Payment Number","Client Name","Invoice Number","Date","Method","Reference / UTR","Amount","Recorded By"],$=e.map(f=>[f.paymentNumber,`"${(f.clientName||"").replace(/"/g,'""')}"`,f.invoiceNumber||"",D(f.paymentDate),f.paymentMethod,f.referenceId||"",f.amount||0,f.recordedByName||""]),t=[d.join(","),...$.map(f=>f.join(","))].join(`
`),h=new Blob([t],{type:"text/csv;charset=utf-8;"}),P=URL.createObjectURL(h),I=document.createElement("a");I.href=P,I.download=`CI360_Payments_${new Date().toISOString().slice(0,10)}.csv`,I.click(),URL.revokeObjectURL(P),b("Payments exported to CSV")})}async function q(s={}){let m="PAY-2026-0001";try{const o=await B("/accounts/next-payment-number");o&&o.paymentNumber&&(m=o.paymentNumber)}catch{}let e=[];if(s.clientId)try{e=await B(`/accounts/invoices?clientId=${s.clientId}`),e=e.filter(o=>o.pendingAmount>0&&o.status!=="cancelled")}catch{}const n=L(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Record Client Payment</h3>
        <span class="badge green" style="font-family:var(--font-heading);font-size:12px">${l(m)}</span>
      </div>

      <div class="field">
        <label>Client *</label>
        <select id="modalPayClient" required>
          <option value="">Select client…</option>
          ${j.map(o=>`<option value="${o._id}" ${s.clientId===o._id?"selected":""}>${l(o.name)}</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label>Link to Unpaid Invoice (Optional)</label>
        <select id="modalPayInvoice">
          <option value="">General advance / No invoice link</option>
          ${e.map(o=>`
            <option value="${o._id}" data-pending="${o.pendingAmount}" ${s.invoiceId===o._id?"selected":""}>
              ${l(o.invoiceNumber)} — Balance: ${v(o.pendingAmount)} (Total: ${v(o.totalAmount)})
            </option>`).join("")}
        </select>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Payment Amount (₹) *</label>
          <input type="number" id="modalPayAmount" min="1" value="${s.suggestedAmount||""}" required placeholder="Amount received">
        </div>
        <div class="field">
          <label>Payment Date</label>
          <input type="date" id="modalPayDate" value="${new Date().toISOString().slice(0,10)}">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Payment Method *</label>
          <select id="modalPayMethod">
            <option value="bank_transfer" selected>🏦 Bank Transfer (NEFT / RTGS)</option>
            <option value="upi">📱 UPI / QR</option>
            <option value="cheque">📝 Cheque</option>
            <option value="card">💳 Credit / Debit Card</option>
            <option value="cash">💵 Cash</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="field">
          <label>Transaction / UTR / Cheque #</label>
          <input type="text" id="modalPayRef" placeholder="e.g. UTR12345678 or Cheque 0045">
        </div>
      </div>

      <div class="field">
        <label>Notes</label>
        <input type="text" id="modalPayNotes" placeholder="Optional reference notes">
      </div>

      <div class="modal-actions" style="margin-top:20px">
        <button class="btn ghost" id="modalPayCancelBtn">Cancel</button>
        <button class="btn green" id="modalPaySaveBtn">Save Payment Receipt</button>
      </div>
    </div>`),r=n.querySelector("#modalPayClient"),c=n.querySelector("#modalPayInvoice"),a=n.querySelector("#modalPayAmount");r.onchange=async()=>{const o=r.value;if(!o){c.innerHTML='<option value="">General advance / No invoice link</option>';return}try{const g=(await B(`/accounts/invoices?clientId=${o}`)||[]).filter(i=>i.pendingAmount>0&&i.status!=="cancelled");c.innerHTML=`
        <option value="">General advance / No invoice link</option>
        ${g.map(i=>`
          <option value="${i._id}" data-pending="${i.pendingAmount}">
            ${l(i.invoiceNumber)} — Balance: ${v(i.pendingAmount)} (Total: ${v(i.totalAmount)})
          </option>`).join("")}`,g.length===1&&!a.value&&(c.value=g[0]._id,a.value=g[0].pendingAmount)}catch{}},c.onchange=()=>{const u=c.options[c.selectedIndex].getAttribute("data-pending");u&&(a.value=u)},n.querySelector("#modalPayCancelBtn").onclick=()=>n.remove(),n.querySelector("#modalPaySaveBtn").onclick=async()=>{const o=r.value,u=c.value||null,g=Number(a.value),i=n.querySelector("#modalPayDate").value,x=n.querySelector("#modalPayMethod").value,p=n.querySelector("#modalPayRef").value.trim(),w=n.querySelector("#modalPayNotes").value.trim();if(!o)return b("Please select a client",!0);if(!g||g<=0)return b("Please enter a valid payment amount",!0);try{const S=n.querySelector("#modalPaySaveBtn");S.disabled=!0,S.textContent="Saving…",await z("/accounts/payments",{clientId:o,invoiceId:u,amount:g,paymentDate:i,paymentMethod:x,referenceId:p,notes:w}),b("Payment recorded successfully!"),n.remove(),k()}catch(S){b(S.message,!0),n.querySelector("#modalPaySaveBtn").disabled=!1,n.querySelector("#modalPaySaveBtn").textContent="Save Payment Receipt"}}}async function pe(s){const m=await B("/accounts/receivables"),e=m.reduce((a,o)=>a+(o.pendingAmount||0),0),n=m.reduce((a,o)=>a+(o.overdueAmount||0),0),r=m.filter(a=>a.pendingAmount>0);s.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Pending Amount & Receivables <span class="eyebrow">${r.length} clients with balances</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Track overdue amounts, aging schedules, and trigger instant payment reminders.</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn ghost small" id="exportReceivablesCsvBtn">📥 Export Statement</button>
        </div>
      </div>

      <!-- Metric Pills -->
      <div class="grid grid-3" style="margin-bottom:20px">
        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header">
            <span class="kpi-label">Total Outstanding Balance</span>
            <div class="kpi-icon" style="background:#FFFBEB;color:var(--amber-600)">⏳</div>
          </div>
          <div class="kpi-value" style="color:var(--amber-600)">${v(e)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Across all clients</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Critically Overdue</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${v(n)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Exceeded credit payment terms</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Unsettled Clients</span>
            <div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent)">👥</div>
          </div>
          <div class="kpi-value">${r.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Out of ${m.length} total clients</div>
        </div>
      </div>

      <!-- Receivables Table -->
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="padding-left:22px">Client</th>
                <th class="num">Total Invoiced</th>
                <th class="num">Collected</th>
                <th class="num">Pending Balance</th>
                <th class="num">Overdue</th>
                <th>Oldest Due Date</th>
                <th>Last Payment</th>
                <th class="num" style="padding-right:22px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${m.map(a=>`
                <tr style="${a.pendingAmount>0?"":"opacity:0.65"}">
                  <td style="padding-left:22px">
                    <strong>${l(a.clientName)}</strong>
                    ${a.gstin?`<div style="font-size:11px;color:var(--text-3)">GSTIN: ${l(a.gstin)}</div>`:""}
                  </td>
                  <td class="num">${v(a.totalBilled)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${v(a.totalPaid)}</td>
                  <td class="num" style="font-weight:800;font-size:14px;color:${a.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${v(a.pendingAmount)}
                  </td>
                  <td class="num">
                    ${a.overdueAmount>0?`<span class="badge red">${v(a.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12.5px;color:${a.overdueAmount>0?"var(--red-600)":"inherit"}">
                    ${a.oldestDueDate?D(a.oldestDueDate):'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12px">
                    ${a.lastPaymentDate?`${D(a.lastPaymentDate)} (${v(a.lastPaymentAmount)})`:'<span class="muted">No payments</span>'}
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    ${a.pendingAmount>0?`
                      <button class="btn green small settle-payment-btn" data-client-id="${a.clientId}" data-client-name="${l(a.clientName)}" data-pending="${a.pendingAmount}" title="Record Payment">
                        💵 Collect
                      </button>
                      <button class="btn ghost small reminder-btn" data-client-name="${l(a.clientName)}" data-pending="${a.pendingAmount}" data-overdue="${a.overdueAmount}" data-phone="${l(a.billingPhone||"")}" title="Copy or Send Payment Reminder">
                        💬 Reminder
                      </button>`:'<span class="badge green">Settled</span>'}
                  </td>
                </tr>`).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client records available.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,s.querySelectorAll(".settle-payment-btn").forEach(a=>{a.onclick=()=>{q({clientId:a.dataset.clientId,clientName:a.dataset.clientName,suggestedAmount:Number(a.dataset.pending)||0})}}),s.querySelectorAll(".reminder-btn").forEach(a=>{a.onclick=()=>{ve({clientName:a.dataset.clientName,pending:Number(a.dataset.pending)||0,overdue:Number(a.dataset.overdue)||0,phone:a.dataset.phone})}});const c=document.getElementById("exportReceivablesCsvBtn");c&&(c.onclick=()=>{if(!m.length)return b("No receivables to export",!0);const a=["Client Name","GSTIN","Total Billed","Total Paid","Pending Balance","Overdue Amount","Oldest Due Date","Last Payment Date","Last Payment Amount"],o=m.map(p=>[`"${(p.clientName||"").replace(/"/g,'""')}"`,p.gstin||"",p.totalBilled||0,p.totalPaid||0,p.pendingAmount||0,p.overdueAmount||0,p.oldestDueDate?D(p.oldestDueDate):"",p.lastPaymentDate?D(p.lastPaymentDate):"",p.lastPaymentAmount||0]),u=[a.join(","),...o.map(p=>p.join(","))].join(`
`),g=new Blob([u],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(g),x=document.createElement("a");x.href=i,x.download=`CI360_Receivables_Statement_${new Date().toISOString().slice(0,10)}.csv`,x.click(),URL.revokeObjectURL(i),b("Receivables statement exported to CSV")})}function ve({clientName:s,pending:m,overdue:e,phone:n}){const r=`Dear ${s},

Greetings from CI360 Intelligence.

This is a friendly reminder regarding your outstanding account balance of ${v(m)}${e>0?` (including ${v(e)} overdue)`:""}.

Please arrange for the settlement at your earliest convenience to our registered bank account:
- Bank: HDFC Bank
- A/C: 50200088992211
- IFSC: HDFC0001234
- UPI: ci360@hdfcbank

If you have already processed this remittance, kindly share the UTR / transaction receipt. Thank you for your continued partnership!

Warm regards,
Accounts Department | CI360`,c=L(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:18px">Payment Reminder for ${l(s)}</h3>
        <span class="badge amber" style="font-size:12px">${v(m)} Due</span>
      </div>
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:12px">
        You can copy this formatted payment reminder template to email/chat or launch WhatsApp directly.
      </div>

      <div class="field">
        <label>Reminder Message Template</label>
        <textarea id="reminderTextArea" rows="10" style="font-family:var(--font-mono);font-size:12px;line-height:1.4">${l(r)}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="reminderCloseBtn">Close</button>
        <button class="btn gold" id="reminderCopyBtn">📋 Copy to Clipboard</button>
        <button class="btn green" id="reminderWhatsAppBtn">💬 Open WhatsApp</button>
      </div>
    </div>`);c.querySelector("#reminderCloseBtn").onclick=()=>c.remove(),c.querySelector("#reminderCopyBtn").onclick=()=>{const a=c.querySelector("#reminderTextArea").value;navigator.clipboard.writeText(a).then(()=>{b("Reminder template copied to clipboard!")}).catch(()=>{b("Failed to copy text",!0)})},c.querySelector("#reminderWhatsAppBtn").onclick=()=>{const a=encodeURIComponent(c.querySelector("#reminderTextArea").value),o=(n||"").replace(/[^0-9]/g,""),u=o?`https://wa.me/${o}?text=${a}`:`https://wa.me/?text=${a}`;window.open(u,"_blank")}}async function ue(s){const m=await B("/accounts/billing-profiles");s.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Client Billing Profiles <span class="eyebrow">${m.length} clients</span></h2>
          <div style="font-size:12.5px;color:var(--text-3)">Configure monthly retainer amounts, GSTIN, payment terms, and 1-click invoice generation.</div>
        </div>
      </div>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="padding-left:22px">Client</th>
                <th>Billing Model</th>
                <th>Cycle</th>
                <th class="num">Monthly Retainer</th>
                <th>GSTIN</th>
                <th>Terms</th>
                <th>Status</th>
                <th class="num" style="padding-right:22px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${m.map(e=>{const n=e.profile;return`
                  <tr>
                    <td style="padding-left:22px">
                      <strong>${l(e.clientName)}</strong>
                      ${n.billingEmail?`<div style="font-size:11px;color:var(--text-3)">${l(n.billingEmail)}</div>`:""}
                    </td>
                    <td><span class="badge">${(n.billingType||"retainer").toUpperCase()}</span></td>
                    <td style="font-size:12px;text-transform:capitalize">${l(n.billingCycle||"monthly")}</td>
                    <td class="num" style="font-weight:800;color:var(--brand-600);font-size:14px">
                      ${v(n.retainerAmount||0)}
                    </td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${l(n.gstin||"—")}</td>
                    <td style="font-size:12px">Net ${n.paymentTermsDays||15}d</td>
                    <td>
                      <span class="badge ${n.status==="active"?"green":"amber"}">${l(n.status||"active")}</span>
                    </td>
                    <td class="num" style="padding-right:22px;white-space:nowrap">
                      <button class="btn gold small gen-monthly-inv-btn" data-client-id="${e.clientId}" data-client-name="${l(e.clientName)}" data-amount="${n.retainerAmount||0}" title="Generate this month's invoice">
                        ⚡ Gen Invoice
                      </button>
                      <button class="btn ghost small edit-profile-btn" data-client-id="${e.clientId}" data-client-name="${l(e.clientName)}" title="Edit Billing Setup">
                        ⚙️ Edit
                      </button>
                    </td>
                  </tr>`}).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client billing profiles found.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,s.querySelectorAll(".gen-monthly-inv-btn").forEach(e=>{e.onclick=async()=>{const n=e.dataset.clientName,r=Number(e.dataset.amount)||0;if(confirm(`Generate this month's invoice for ${n} for ${v(r)}?`))try{e.disabled=!0,e.textContent="…",await z(`/accounts/billing-profiles/${e.dataset.clientId}/generate-invoice`,{amount:r}),b(`Invoice generated successfully for ${n}!`),N="invoices",M()}catch(c){b(c.message,!0),e.disabled=!1,e.textContent="⚡ Gen Invoice"}}}),s.querySelectorAll(".edit-profile-btn").forEach(e=>{e.onclick=()=>{const n=m.find(r=>r.clientId===e.dataset.clientId);me(e.dataset.clientId,e.dataset.clientName,n?n.profile:{})}})}function me(s,m,e={}){const n=L(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Billing Setup: ${l(m)}</h3>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Billing Model</label>
          <select id="bpType">
            <option value="retainer" ${e.billingType==="retainer"?"selected":""}>Monthly Retainer</option>
            <option value="project" ${e.billingType==="project"?"selected":""}>Project Based</option>
            <option value="hourly" ${e.billingType==="hourly"?"selected":""}>Hourly Rate</option>
            <option value="milestone" ${e.billingType==="milestone"?"selected":""}>Milestones</option>
          </select>
        </div>
        <div class="field">
          <label>Billing Cycle</label>
          <select id="bpCycle">
            <option value="monthly" ${e.billingCycle==="monthly"?"selected":""}>Monthly</option>
            <option value="quarterly" ${e.billingCycle==="quarterly"?"selected":""}>Quarterly</option>
            <option value="one_time" ${e.billingCycle==="one_time"?"selected":""}>One-Time</option>
          </select>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Retainer Amount (₹ / month)</label>
          <input type="number" id="bpAmount" value="${e.retainerAmount||0}" min="0">
        </div>
        <div class="field">
          <label>Credit / Payment Terms (Days)</label>
          <input type="number" id="bpTerms" value="${e.paymentTermsDays||15}" min="0">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>GSTIN / Tax ID</label>
          <input type="text" id="bpGstin" value="${l(e.gstin||"")}" placeholder="e.g. 24AAACC1206M1ZT">
        </div>
        <div class="field">
          <label>PAN Number</label>
          <input type="text" id="bpPan" value="${l(e.panNumber||"")}" placeholder="e.g. AAACC1206M">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Accounts Email</label>
          <input type="email" id="bpEmail" value="${l(e.billingEmail||"")}" placeholder="billing@client.com">
        </div>
        <div class="field">
          <label>Accounts Phone</label>
          <input type="text" id="bpPhone" value="${l(e.billingPhone||"")}" placeholder="+91 98765 43210">
        </div>
      </div>

      <div class="field">
        <label>Billing Address</label>
        <textarea id="bpAddress" rows="2">${l(e.billingAddress||"")}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="bpCancelBtn">Cancel</button>
        <button class="btn gold" id="bpSaveBtn">Save Billing Setup</button>
      </div>
    </div>`);n.querySelector("#bpCancelBtn").onclick=()=>n.remove(),n.querySelector("#bpSaveBtn").onclick=async()=>{const r={billingType:n.querySelector("#bpType").value,billingCycle:n.querySelector("#bpCycle").value,retainerAmount:Number(n.querySelector("#bpAmount").value)||0,paymentTermsDays:Number(n.querySelector("#bpTerms").value)||15,gstin:n.querySelector("#bpGstin").value.trim(),panNumber:n.querySelector("#bpPan").value.trim(),billingEmail:n.querySelector("#bpEmail").value.trim(),billingPhone:n.querySelector("#bpPhone").value.trim(),billingAddress:n.querySelector("#bpAddress").value.trim()};try{await Q(`/accounts/billing-profiles/${s}`,r),b("Billing profile saved successfully"),n.remove(),k()}catch(c){b(c.message,!0)}}}async function ye(s){const m=await B("/accounts/tally/summary"),e=m.config||{},n=m.stats||{totalInvoices:0,totalPayments:0,totalClients:0,syncReadyVouchers:0},r=`http://${l(e.serverHost||"localhost")}:${l(e.serverPort||9e3)}`;s.innerHTML=`
    <section class="block">
      <!-- Header Banner -->
      <div class="accounts-header-banner" style="background:linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(16,185,129,0.1) 100%)">
        <div class="accounts-header-title">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <h2>TallyPrime Silver Integration</h2>
            <span class="badge gold" style="font-size:12px;font-weight:700">Silver Edition (Single User)</span>
            <span class="badge blue" style="font-size:11px">XML &amp; ODBC Gateway</span>
          </div>
          <div class="accounts-header-subtitle">
            Seamlessly bridge CI360 invoices, receipts, and clients directly into TallyPrime Day Book with standard dual-entry XML.
          </div>
        </div>
        <div class="accounts-header-actions">
          <button class="btn ghost small" id="tallyTestPingBtn" style="display:inline-flex;align-items:center;gap:6px">
            <span class="status-indicator-dot" id="tallyStatusDot" style="background:var(--amber-500)"></span>
            <span id="tallyStatusText">Check Tally (Port ${e.serverPort||9e3})</span>
          </button>
          <button class="btn gold small" id="tallyQuickDownloadBundleBtn">
            <span>📥 Download Tally XML</span>
          </button>
        </div>
      </div>

      <!-- Live Connection Alert Box -->
      <div id="tallyConnectionAlert" class="card" style="display:none;padding:12px 18px;margin-bottom:20px;border-left:4px solid var(--brand-500)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <span id="tallyAlertIcon" style="font-size:18px">ℹ️</span>
            <div>
              <strong id="tallyAlertTitle" style="font-size:13px">Tally Connection Status</strong>
              <div id="tallyAlertMsg" style="font-size:12px;color:var(--text-3);margin-top:2px"></div>
            </div>
          </div>
          <button class="btn ghost small" id="tallyAlertCloseBtn" style="padding:2px 8px;font-size:11px">Dismiss</button>
        </div>
      </div>

      <!-- Sync Readiness KPI Cards -->
      <div class="grid grid-4" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Sync-Ready Vouchers</span>
            <div class="kpi-icon" style="background:var(--brand-50);color:var(--brand-600)">🏛️</div>
          </div>
          <div class="kpi-value" style="color:var(--brand-600)">${n.syncReadyVouchers}</div>
          <div class="kpi-sub">Total sales &amp; receipt entries ready for export</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Sales Invoices</span>
            <div class="kpi-icon" style="background:rgba(245,158,11,0.12);color:var(--amber-600)">📄</div>
          </div>
          <div class="kpi-value">${n.totalInvoices}</div>
          <div class="kpi-sub">Exportable as Sales Vouchers with GST lines</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Receipts &amp; Payments</span>
            <div class="kpi-icon" style="background:rgba(16,185,129,0.12);color:var(--green-600)">💵</div>
          </div>
          <div class="kpi-value" style="color:var(--green-600)">${n.totalPayments}</div>
          <div class="kpi-sub">Exportable as Receipt Vouchers with Bill allocations</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Client Masters</span>
            <div class="kpi-icon" style="background:rgba(59,130,246,0.12);color:var(--blue-600)">👥</div>
          </div>
          <div class="kpi-value">${n.totalClients}</div>
          <div class="kpi-sub">Exportable as Sundry Debtors Ledgers</div>
        </div>
      </div>

      <!-- Main Two Column Workflows -->
      <div class="grid grid-2" style="gap:20px;align-items:start;margin-bottom:24px">
        
        <!-- CARD 1: 1-CLICK XML SYNC & EXPORT -->
        <div class="card" style="padding:22px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:18px">📥</span>
              <h3 style="margin:0;font-size:16px">TallyPrime 1-Click Sync &amp; Export</h3>
            </div>
            <span class="badge green">Alt + O Ready</span>
          </div>
          <p style="font-size:12.5px;color:var(--text-3);margin-bottom:18px">
            Generate standard Tally XML files containing vouchers, bill references, and tax ledgers formatted for TallyPrime Silver.
          </p>

          <div class="field" style="margin-bottom:16px">
            <label style="font-weight:700">What to Export / Sync</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px">
              <label style="display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--border-sm);border-radius:var(--r-sm);cursor:pointer;background:var(--bg-card)">
                <input type="radio" name="tallyExportType" value="all" checked style="margin:0">
                <div>
                  <strong style="font-size:12.5px">Full Bundle</strong>
                  <div style="font-size:11px;color:var(--text-3)">Sales + Receipts + Masters</div>
                </div>
              </label>

              <label style="display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--border-sm);border-radius:var(--r-sm);cursor:pointer;background:var(--bg-card)">
                <input type="radio" name="tallyExportType" value="sales" style="margin:0">
                <div>
                  <strong style="font-size:12.5px">Sales Invoices</strong>
                  <div style="font-size:11px;color:var(--text-3)">Sales Vouchers + GST (${n.totalInvoices})</div>
                </div>
              </label>

              <label style="display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--border-sm);border-radius:var(--r-sm);cursor:pointer;background:var(--bg-card)">
                <input type="radio" name="tallyExportType" value="receipts" style="margin:0">
                <div>
                  <strong style="font-size:12.5px">Receipt Payments</strong>
                  <div style="font-size:11px;color:var(--text-3)">Receipt Vouchers (${n.totalPayments})</div>
                </div>
              </label>

              <label style="display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--border-sm);border-radius:var(--r-sm);cursor:pointer;background:var(--bg-card)">
                <input type="radio" name="tallyExportType" value="masters" style="margin:0">
                <div>
                  <strong style="font-size:12.5px">Client Masters</strong>
                  <div style="font-size:11px;color:var(--text-3)">Sundry Debtors (${n.totalClients})</div>
                </div>
              </label>
            </div>
          </div>

          <div class="field" style="margin-bottom:18px">
            <label style="font-weight:700">Date Range Filter</label>
            <select id="tallyDateRangeSelect" style="margin-top:6px;width:100%">
              <option value="all">All Records (Complete Financial Year)</option>
              <option value="this_month">Current Month (${new Date().toLocaleString("default",{month:"long",year:"numeric"})})</option>
              <option value="last_month">Previous Month</option>
              <option value="last_30">Last 30 Days</option>
            </select>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding-top:16px;border-top:1px solid var(--border-sm)">
            <button class="btn gold" id="tallyDownloadXmlBtn" style="flex:1;min-width:180px;display:inline-flex;align-items:center;justify-content:center;gap:8px">
              <span>📥 Download Tally XML</span>
            </button>
            <button class="btn green" id="tallyDirectPushBtn" style="flex:1;min-width:180px;display:inline-flex;align-items:center;justify-content:center;gap:8px" title="Push XML directly to TallyPrime XML Server port 9000">
              <span>⚡ Direct Push to Tally</span>
            </button>
            <button class="btn ghost" id="tallyPreviewXmlBtn" style="display:inline-flex;align-items:center;gap:6px" title="Preview the generated XML in a modal">
              <span>👁️ View XML</span>
            </button>
          </div>
        </div>

        <!-- CARD 2: TALLY LEDGER & SERVER SETTINGS -->
        <div class="card" style="padding:22px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:18px">⚙️</span>
              <h3 style="margin:0;font-size:16px">TallyPrime Ledger &amp; Server Setup</h3>
            </div>
            <span class="badge blue">Port 9000 Config</span>
          </div>
          <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">
            Map CI360 financial accounts to the exact Ledger names created in your Tally company masters.
          </p>

          <form id="tallyConfigForm" onsubmit="return false;">
            <div class="field" style="margin-bottom:12px">
              <label>Company Name in TallyPrime</label>
              <input type="text" id="tallyCompanyName" value="${l(e.companyName||"CI360 INTELLIGENCE PRIVATE LIMITED")}" placeholder="Exact name as in Tally" required>
            </div>

            <div class="field-row" style="margin-bottom:12px">
              <div class="field">
                <label>Tally Server Host</label>
                <input type="text" id="tallyServerHost" value="${l(e.serverHost||"localhost")}" placeholder="localhost">
              </div>
              <div class="field">
                <label>XML Server Port</label>
                <input type="number" id="tallyServerPort" value="${e.serverPort||9e3}" placeholder="9000">
              </div>
            </div>

            <div class="field-row" style="margin-bottom:12px">
              <div class="field">
                <label>Sales Ledger Name</label>
                <input type="text" id="tallySalesLedger" value="${l(e.salesLedger||"Sales - Professional Services")}" placeholder="Sales Account">
              </div>
              <div class="field">
                <label>Primary Bank Ledger</label>
                <input type="text" id="tallyBankLedger" value="${l(e.bankLedger||"HDFC Bank Current A/c")}" placeholder="Bank Account">
              </div>
            </div>

            <div class="field-row" style="margin-bottom:12px">
              <div class="field">
                <label>CGST Output Ledger (9%)</label>
                <input type="text" id="tallyCgstLedger" value="${l(e.cgstLedger||"Output CGST @ 9%")}" placeholder="Output CGST">
              </div>
              <div class="field">
                <label>SGST Output Ledger (9%)</label>
                <input type="text" id="tallySgstLedger" value="${l(e.sgstLedger||"Output SGST @ 9%")}" placeholder="Output SGST">
              </div>
            </div>

            <div class="field-row" style="margin-bottom:16px">
              <div class="field">
                <label>IGST Output Ledger (18%)</label>
                <input type="text" id="tallyIgstLedger" value="${l(e.igstLedger||"Output IGST @ 18%")}" placeholder="Output IGST">
              </div>
              <div class="field">
                <label>Cash in Hand Ledger</label>
                <input type="text" id="tallyCashLedger" value="${l(e.cashLedger||"Cash in Hand")}" placeholder="Cash">
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:10px;padding-top:14px;border-top:1px solid var(--border-sm)">
              <button class="btn gold small" id="tallySaveConfigBtn">
                <span>💾 Save Tally Configuration</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      <!-- CARD 3: STEP-BY-STEP USER GUIDE -->
      <div class="card" style="padding:22px;background:var(--bg-card)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <span style="font-size:20px">📖</span>
          <div>
            <h3 style="margin:0;font-size:16px">How to Import XML into TallyPrime Silver</h3>
            <div style="font-size:12.5px;color:var(--text-3)">Standard workflow for Ekta and the accounts team:</div>
          </div>
        </div>

        <div class="grid grid-4" style="gap:16px">
          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:16px;border-radius:var(--r-sm)">
            <div style="font-size:20px;font-weight:900;color:var(--brand-500);margin-bottom:6px">1</div>
            <strong style="font-size:13px;display:block;margin-bottom:4px">Export Tally XML</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.4">
              Click <strong>📥 Download Tally XML</strong> above to save the structured voucher file to your computer.
            </p>
          </div>

          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:16px;border-radius:var(--r-sm)">
            <div style="font-size:20px;font-weight:900;color:var(--brand-500);margin-bottom:6px">2</div>
            <strong style="font-size:13px;display:block;margin-bottom:4px">Open TallyPrime Silver</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.4">
              Open your company in TallyPrime Silver, press <strong>Alt + O</strong> (or click <em>Import</em> on the top bar).
            </p>
          </div>

          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:16px;border-radius:var(--r-sm)">
            <div style="font-size:20px;font-weight:900;color:var(--brand-500);margin-bottom:6px">3</div>
            <strong style="font-size:13px;display:block;margin-bottom:4px">Select &amp; Import</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.4">
              Choose <strong>Transactions</strong> (for Invoices/Receipts) or <strong>Masters</strong>, select the downloaded XML, and hit Enter.
            </p>
          </div>

          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:16px;border-radius:var(--r-sm)">
            <div style="font-size:20px;font-weight:900;color:var(--brand-500);margin-bottom:6px">4</div>
            <strong style="font-size:13px;display:block;margin-bottom:4px">Check Day Book</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.4">
              Press <strong>Alt + G → Day Book</strong> to view all auto-reconciled GST sales entries and bank receipts immediately.
            </p>
          </div>
        </div>

        <div style="margin-top:18px;padding:12px 16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:var(--r-sm);font-size:12px;color:var(--text-2);display:flex;align-items:center;gap:10px">
          <span style="font-size:16px">💡</span>
          <span>
            <strong>To enable Direct HTTP Push on Port 9000:</strong> In TallyPrime, go to <code>F1 (Help) → Settings → Connectivity → Client/Server configuration</code>. Set <em>Enable ODBC</em> and <em>Enable XML Server</em> to <strong>Yes</strong> with Port <strong>9000</strong>.
          </span>
        </div>
      </div>
    </section>`;function c(){const I=document.getElementById("tallyDateRangeSelect").value,f=new Date;let A="",T="";if(I==="this_month")A=new Date(f.getFullYear(),f.getMonth(),1).toISOString().slice(0,10),T=new Date(f.getFullYear(),f.getMonth()+1,0).toISOString().slice(0,10);else if(I==="last_month")A=new Date(f.getFullYear(),f.getMonth()-1,1).toISOString().slice(0,10),T=new Date(f.getFullYear(),f.getMonth(),0).toISOString().slice(0,10);else if(I==="last_30"){const R=new Date;R.setDate(R.getDate()-30),A=R.toISOString().slice(0,10),T=f.toISOString().slice(0,10)}return{startDate:A,endDate:T}}function a(){const I=s.querySelector('input[name="tallyExportType"]:checked');return I?I.value:"all"}const o=document.getElementById("tallyTestPingBtn"),u=document.getElementById("tallyStatusDot"),g=document.getElementById("tallyStatusText"),i=document.getElementById("tallyConnectionAlert"),x=document.getElementById("tallyAlertTitle"),p=document.getElementById("tallyAlertMsg"),w=document.getElementById("tallyAlertIcon");async function S(){g.textContent="Pinging Tally…",u.style.background="var(--amber-500)";try{const I=document.getElementById("tallyServerHost").value.trim()||"localhost",f=Number(document.getElementById("tallyServerPort").value)||9e3,A=await z("/accounts/tally/test-connection",{serverHost:I,serverPort:f});i.style.display="block",A.connected?(u.style.background="var(--green-500)",g.textContent=`Tally Online (${f})`,i.style.borderLeftColor="var(--green-500)",w.textContent="✅",x.textContent="TallyPrime XML Server Connected",p.textContent=A.message,b("Connected to TallyPrime Silver XML Server!")):(u.style.background="var(--red-500)",g.textContent=`Tally Offline (${f})`,i.style.borderLeftColor="var(--amber-500)",w.textContent="⚠️",x.textContent="TallyPrime Server Not Detected on Port "+f,p.textContent=`${A.message} ${A.instructions||"You can still use 📥 Download Tally XML anytime to import via Alt+O in Tally."}`)}catch(I){u.style.background="var(--red-500)",g.textContent="Tally Offline",i.style.display="block",i.style.borderLeftColor="var(--red-500)",w.textContent="❌",x.textContent="Connection Test Error",p.textContent=I.message}}o&&(o.onclick=S);const C=document.getElementById("tallyAlertCloseBtn");C&&(C.onclick=()=>{i.style.display="none"});async function y(){const I=a(),{startDate:f,endDate:A}=c();let T=`/accounts/tally/export-xml?type=${encodeURIComponent(I)}`;f&&(T+=`&startDate=${encodeURIComponent(f)}`),A&&(T+=`&endDate=${encodeURIComponent(A)}`);try{b("Generating Tally XML…"),window.location.href="/api"+T}catch(R){b(R.message,!0)}}const d=document.getElementById("tallyDownloadXmlBtn");d&&(d.onclick=y);const $=document.getElementById("tallyQuickDownloadBundleBtn");$&&($.onclick=y);const t=document.getElementById("tallyDirectPushBtn");t&&(t.onclick=async()=>{const I=a(),{startDate:f,endDate:A}=c();if(confirm(`Attempt direct push of ${I.toUpperCase()} vouchers to TallyPrime at ${r}?

Ensure TallyPrime is open with your company loaded.`))try{t.disabled=!0,t.textContent="Pushing to Tally…";const T=await z("/accounts/tally/push-direct",{type:I,startDate:f,endDate:A});b(T.message||"Pushed successfully to TallyPrime!"),i.style.display="block",i.style.borderLeftColor="var(--green-500)",w.textContent="🎉",x.textContent="Direct Sync Succeeded",p.textContent=T.message}catch(T){b(T.message,!0),i.style.display="block",i.style.borderLeftColor="var(--amber-500)",w.textContent="⚠️",x.textContent="Direct Push Inaccessible",p.textContent=`${T.message}. Please use the "📥 Download Tally XML" button instead to import the file via Alt + O in TallyPrime.`}finally{t.disabled=!1,t.innerHTML="<span>⚡ Direct Push to Tally</span>"}});const h=document.getElementById("tallyPreviewXmlBtn");h&&(h.onclick=async()=>{const I=a(),{startDate:f,endDate:A}=c();let T=`/accounts/tally/export-xml?type=${encodeURIComponent(I)}`;f&&(T+=`&startDate=${encodeURIComponent(f)}`),A&&(T+=`&endDate=${encodeURIComponent(A)}`);try{h.disabled=!0,h.textContent="Loading…";const H=await(await fetch("/api"+T,{headers:{Authorization:"Bearer "+localStorage.getItem("ci360_token")}})).text(),X=L(`
          <div style="max-width:850px;width:100%">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:18px">📄</span>
                <strong style="font-size:16px">TallyPrime XML Preview (${I.toUpperCase()})</strong>
              </div>
              <div style="display:flex;gap:8px">
                <button class="btn gold small" id="tallyModalCopyBtn">📋 Copy XML</button>
                <button class="btn ghost small" id="tallyModalCloseBtn">✕ Close</button>
              </div>
            </div>
            <div style="font-size:12px;color:var(--text-3);margin-bottom:12px">
              This standard Tally XML envelope will be imported into TallyPrime Day Book:
            </div>
            <pre style="background:var(--bg-2);border:1px solid var(--border-sm);border-radius:var(--r-sm);padding:14px;max-height:480px;overflow:auto;font-family:var(--font-mono);font-size:11.5px;color:var(--text-1);white-space:pre-wrap;word-break:break-all">${l(H.slice(0,15e3))}${H.length>15e3?`

... (truncated for preview, full XML will be downloaded)`:""}</pre>
          </div>`);X.querySelector("#tallyModalCloseBtn").onclick=()=>X.remove(),X.querySelector("#tallyModalCopyBtn").onclick=()=>{navigator.clipboard.writeText(H).then(()=>{b("Full Tally XML copied to clipboard!")})}}catch(R){b("Failed to load XML preview: "+R.message,!0)}finally{h.disabled=!1,h.innerHTML="<span>👁️ View XML</span>"}});const P=document.getElementById("tallySaveConfigBtn");P&&(P.onclick=async()=>{const I={companyName:document.getElementById("tallyCompanyName").value.trim(),serverHost:document.getElementById("tallyServerHost").value.trim()||"localhost",serverPort:Number(document.getElementById("tallyServerPort").value)||9e3,salesLedger:document.getElementById("tallySalesLedger").value.trim()||"Sales - Professional Services",bankLedger:document.getElementById("tallyBankLedger").value.trim()||"HDFC Bank Current A/c",cgstLedger:document.getElementById("tallyCgstLedger").value.trim()||"Output CGST @ 9%",sgstLedger:document.getElementById("tallySgstLedger").value.trim()||"Output SGST @ 9%",igstLedger:document.getElementById("tallyIgstLedger").value.trim()||"Output IGST @ 18%",cashLedger:document.getElementById("tallyCashLedger").value.trim()||"Cash in Hand"};try{P.disabled=!0,P.textContent="Saving…";const f=await Q("/accounts/tally/config",I);b(f.message||"TallyPrime configuration saved!"),P.disabled=!1,P.innerHTML="<span>💾 Save Tally Configuration</span>"}catch(f){b(f.message,!0),P.disabled=!1,P.innerHTML="<span>💾 Save Tally Configuration</span>"}}),setTimeout(S,600)}ie();
