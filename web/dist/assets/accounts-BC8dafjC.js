import{r as Y,b as Z,i as K,a as X,c as S,e as s,f as r,d as C,g as P,h,j as H,o as q,k as V}from"./api-B2Bht1wi.js";let B=null,k="overview",M=[],J=[];const _=[{key:"overview",label:"Overview",icon:"📊"},{key:"invoices",label:"Invoices",icon:"📄"},{key:"payments",label:"Payments",icon:"💵"},{key:"receivables",label:"Pending & Receivables",icon:"⏳"},{key:"billing",label:"Billing Profiles",icon:"⚙️"}];async function ee(){if(K(),B=X("accounts"),!!B){try{const[l,u]=await Promise.all([S("/clients").catch(()=>[]),S("/services").catch(()=>[])]);M=l||[],J=u||[]}catch(l){console.error("Failed to load initial metadata",l)}D()}}function D(){const l=document.getElementById("app"),u=_.find(e=>e.key===k)||_[0];l.innerHTML=Y({user:B,currentRole:"accounts",activeTab:k,tabs:_,title:u.label,subtitle:"Billing, Invoicing & Receivables Intelligence"}),Z(e=>{k=e,D()}),I()}window.ci360NavTab=l=>{k=l,D()};async function I(){const l=document.getElementById("content");if(l){l.innerHTML=`
    <div style="display:flex;justify-content:center;align-items:center;min-height:240px">
      <div class="spinner"></div>
    </div>`;try{k==="overview"?await te(l):k==="invoices"?await ne(l):k==="payments"?await le(l):k==="receivables"?await se(l):k==="billing"&&await de(l)}catch(u){l.innerHTML=`
      <div class="empty" style="padding:48px 24px">
        <h3 style="color:var(--s-red-text);margin-bottom:8px">Unable to load accounts data</h3>
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px">${s(u.message)}</p>
        <button class="btn gold small" id="retryAccountsBtn">Retry</button>
      </div>`;const e=document.getElementById("retryAccountsBtn");e&&(e.onclick=()=>I())}}}async function te(l){var w,A;const u=await S("/accounts/dashboard"),e=u.metrics||{},n=u.aging||{current:0,days31to60:0,days61to90:0,days90plus:0},c=n.current+n.days31to60+n.days61to90+n.days90plus||1,p=Math.round(n.current/c*100),a=Math.round(n.days31to60/c*100),i=Math.round(n.days61to90/c*100),m=Math.max(0,100-(p+a+i)),g=B&&(/ekta/i.test(B.name)||/ekta/i.test(B.email)),o=B&&(B.role==="superadmin"||B.role==="admin"),b=g||o||B&&B.personnelId;l.innerHTML=`
    <section class="block">
      <div class="accounts-header-banner">
        <div class="accounts-header-title">
          <h2>Accounts & Finance Hub ${g?'<span class="badge" style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:12px;margin-left:8px;vertical-align:middle;padding:4px 8px;border-radius:6px">Ekta · Finance Manager</span>':""}</h2>
          <div class="accounts-header-subtitle">Real-time revenue tracking, invoice lifecycle, and client pending balances.</div>
        </div>
        <div class="accounts-header-actions">
          ${o?`
            <a href="/admin" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
              <span>← Admin Portal</span>
            </a>`:""}
          ${b?`
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
          <div class="kpi-value">${r(e.totalBilled||0)}</div>
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
          <div class="kpi-value" style="color:var(--green-600)">${r(e.totalReceived||0)}</div>
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
          <div class="kpi-value" style="color:var(--amber-600)">${r(e.totalPending||0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge amber">${(((w=e.invoiceCounts)==null?void 0:w.partially_paid)||0)+(((A=e.invoiceCounts)==null?void 0:A.issued)||0)} Invoices</span>
            <span>Awaiting full settlement</span>
          </div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Overdue Amount</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${r(e.totalOverdue||0)}</div>
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
            <span class="badge gold">${r(e.totalPending||0)} Pending</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">Visual distribution of pending receivables based on invoice due dates.</div>
          
          <div class="aging-bar-container">
            <div class="aging-segment current" style="width:${p}%" title="0-30 Days: ${r(n.current)}"></div>
            <div class="aging-segment days31to60" style="width:${a}%" title="31-60 Days: ${r(n.days31to60)}"></div>
            <div class="aging-segment days61to90" style="width:${i}%" title="61-90 Days: ${r(n.days61to90)}"></div>
            <div class="aging-segment days90plus" style="width:${m}%" title="90+ Days: ${r(n.days90plus)}"></div>
          </div>

          <div class="aging-legend">
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--green-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">0 - 30 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${r(n.current)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--amber-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">31 - 60 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${r(n.days31to60)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:#F97316"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">61 - 90 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${r(n.days61to90)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--red-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">90+ Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--red-600)">${r(n.days90plus)}</div>
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
            ${(u.monthlyTrend||[]).map(y=>{const d=Math.max(...(u.monthlyTrend||[]).map(x=>Math.max(x.billed,x.collected)),1e3),f=Math.round(y.billed/d*100),t=Math.round(y.collected/d*100);return`
                <div style="display:flex;align-items:center;gap:12px;font-size:12px">
                  <span style="width:50px;font-weight:700;color:var(--text-2)">${y.month}</span>
                  <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--brand-500);width:${Math.max(4,f)}%;border-radius:4px" title="Billed: ${r(y.billed)}"></div>
                      <span style="font-size:10.5px;color:var(--text-3);min-width:60px">${r(y.billed)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--green-500);width:${Math.max(4,t)}%;border-radius:4px" title="Collected: ${r(y.collected)}"></div>
                      <span style="font-size:10.5px;color:var(--green-600);font-weight:600;min-width:60px">${r(y.collected)}</span>
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
                ${(u.topClientsPending||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${s(y.clientName)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${y.invoiceCount} invoices</div>
                    </td>
                    <td class="num" style="font-weight:700;color:var(--amber-600)">${r(y.pendingAmount)}</td>
                    <td class="num">
                      ${y.overdueAmount>0?`<span class="badge red">${r(y.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                    </td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn green small quick-collect-btn" data-client-id="${y.clientId}" data-client-name="${s(y.clientName)}" data-pending="${y.pendingAmount}">
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
                ${(u.recentInvoices||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${s(y.invoiceNumber)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${C(y.issueDate)}</div>
                    </td>
                    <td>${s(y.clientName)}</td>
                    <td class="num" style="font-weight:700">${r(y.totalAmount)}</td>
                    <td>${E(y.status)}</td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn ghost small view-invoice-btn" data-id="${y._id}">View</button>
                    </td>
                  </tr>`).join("")||'<tr><td colspan="5"><div class="empty" style="padding:24px">No invoices generated yet.</div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`,document.getElementById("quickNewInvoiceBtn").onclick=()=>W(),document.getElementById("quickRecordPaymentBtn").onclick=()=>N();const v=document.getElementById("seedDemoAccountsBtn");v&&(v.onclick=async()=>{if(confirm("Load realistic demo invoices, payments, and billing profiles?"))try{v.disabled=!0,v.textContent="Loading demo data…";const y=await P("/accounts/seed-demo",{});h(y.message||"Demo data loaded successfully!"),I()}catch(y){h(y.message,!0),v.disabled=!1,v.textContent="⚡ Seed Demo Data"}});const $=document.getElementById("clearAllAccountsDataBtn");$&&($.onclick=async()=>{if(confirm(`⚠️ WARNING: Are you sure you want to delete ALL invoices and ALL payments in CI360 Accounts?

This will permanently wipe all transactions. Client billing profiles will remain intact.`))try{$.disabled=!0,$.textContent="Clearing…";const y=await P("/accounts/clear-all",{});h(y.message||"Accounts data cleared successfully"),I()}catch(y){h(y.message,!0),$.disabled=!1,$.innerHTML="<span>🗑️ Delete All Data</span>"}}),document.getElementById("viewAllReceivablesBtn").onclick=()=>{k="receivables",D()},document.getElementById("viewAllInvoicesBtn").onclick=()=>{k="invoices",D()},l.querySelectorAll(".quick-collect-btn").forEach(y=>{y.onclick=()=>{N({clientId:y.dataset.clientId,clientName:y.dataset.clientName,suggestedAmount:Number(y.dataset.pending)||0})}}),l.querySelectorAll(".view-invoice-btn").forEach(y=>{y.onclick=()=>Q(y.dataset.id)})}function E(l){return l==="paid"?'<span class="badge green">Paid</span>':l==="partially_paid"?'<span class="badge blue">Partially Paid</span>':l==="overdue"?'<span class="badge red">Overdue</span>':l==="issued"?'<span class="badge amber">Issued</span>':l==="draft"?'<span class="badge gray">Draft</span>':l==="cancelled"?'<span class="badge red">Cancelled</span>':`<span class="badge">${s(l||"—")}</span>`}let G="all",j="",L="";async function ne(l){let u=`?status=${encodeURIComponent(G)}`;j&&(u+=`&clientId=${encodeURIComponent(j)}`),L&&(u+=`&search=${encodeURIComponent(L)}`);const e=await S("/accounts/invoices"+u),n=e.reduce((t,x)=>t+(x.totalAmount||0),0),c=e.reduce((t,x)=>t+(x.amountPaid||0),0),p=e.reduce((t,x)=>t+(x.pendingAmount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Total Billed:</span> <strong>${r(n)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Collected:</span> <strong style="color:var(--green-600)">${r(c)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Pending:</span> <strong style="color:var(--amber-600)">${r(p)}</strong>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="invoiceSearchInput" placeholder="Search by invoice #, client name, service…" value="${s(L)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="invoiceClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${M.map(t=>`<option value="${t._id}" ${j===t._id?"selected":""}>${s(t.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","issued","partially_paid","paid","overdue","draft"].map(t=>`
              <button class="btn ghost small invoice-status-filter ${G===t?"active gold":""}" data-status="${t}">
                ${t==="all"?"All":t.replace("_"," ").replace(/\b\w/g,x=>x.toUpperCase())}
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
                    <input type="checkbox" class="invoice-select-cb" data-id="${t._id}" data-num="${s(t.invoiceNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--brand-600)">${s(t.invoiceNumber)}</strong>
                  </td>
                  <td><strong>${s(t.clientName)}</strong></td>
                  <td><span class="badge">${t.billingType?t.billingType.toUpperCase():"RETAINER"}</span></td>
                  <td style="font-size:12.5px">${C(t.issueDate)}</td>
                  <td style="font-size:12.5px;color:${t.status==="overdue"?"var(--red-600)":"inherit"}">${C(t.dueDate)}</td>
                  <td class="num" style="font-weight:700">${r(t.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${r(t.amountPaid)}</td>
                  <td class="num" style="font-weight:700;color:${t.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${r(t.pendingAmount)}
                  </td>
                  <td>${E(t.status)}</td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    <button class="btn ghost small view-invoice-btn" data-id="${t._id}" title="View and Print Invoice">👁️ View</button>
                    ${t.pendingAmount>0?`
                      <button class="btn green small pay-invoice-btn" data-id="${t._id}" data-num="${s(t.invoiceNumber)}" data-client-id="${t.clientId}" data-client-name="${s(t.clientName)}" data-pending="${t.pendingAmount}" title="Record Payment">
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
    </section>`;const a=document.getElementById("invoiceSearchInput");let i=null;a.oninput=()=>{clearTimeout(i),i=setTimeout(()=>{L=a.value.trim(),I()},300)},document.getElementById("invoiceClientFilter").onchange=t=>{j=t.target.value,I()},l.querySelectorAll(".invoice-status-filter").forEach(t=>{t.onclick=()=>{G=t.dataset.status,I()}}),document.getElementById("newInvoiceBtn").onclick=()=>W();const m=document.getElementById("selectAllInvoicesCb"),g=document.getElementById("thSelectAllInvoices"),o=document.getElementById("invoicesDeselectAllBtn"),b=document.getElementById("invoicesSelectedCounter"),v=document.getElementById("deleteSelectedInvoicesBtn"),$=document.getElementById("deleteInvoicesSelectedCount"),w=document.getElementById("deleteAllInvoicesBtn"),A=l.querySelectorAll(".invoice-select-cb");function y(){const t=Array.from(A).filter(z=>z.checked),x=t.length;b&&(b.textContent=`${x} of ${e.length} selected`),$&&($.textContent=x),x>0?(v&&(v.style.display="inline-flex"),o&&(o.style.display="inline-flex")):(v&&(v.style.display="none"),o&&(o.style.display="none"));const R=A.length>0&&t.length===A.length;m&&(m.checked=R),g&&(g.checked=R)}function d(t){A.forEach(x=>{x.checked=t}),y()}m&&(m.onchange=t=>d(t.target.checked)),g&&(g.onchange=t=>d(t.target.checked)),o&&(o.onclick=()=>d(!1)),A.forEach(t=>{t.onchange=()=>y()}),v&&(v.onclick=async()=>{const t=Array.from(A).filter(x=>x.checked).map(x=>x.dataset.id);if(t.length&&confirm(`Are you sure you want to permanently delete the ${t.length} selected invoice(s)? This cannot be undone.`))try{v.disabled=!0,v.textContent="Deleting…";const x=await P("/accounts/invoices/bulk-delete",{ids:t});h(x.message||`Deleted ${t.length} invoice(s)`),I()}catch(x){h(x.message,!0),v.disabled=!1,y()}}),w&&(w.onclick=async()=>{if(!e.length){h("No invoices to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} invoices?

This will permanently remove all invoice records and unlink their payment records. This cannot be undone.`))try{w.disabled=!0,w.textContent="Deleting all…";const t=await P("/accounts/invoices/bulk-delete",{deleteAll:!0});h(t.message||"All invoices have been deleted."),I()}catch(t){h(t.message,!0),w.disabled=!1,w.textContent=`💥 Delete All Invoices (${e.length})`}}),l.querySelectorAll(".view-invoice-btn").forEach(t=>{t.onclick=()=>Q(t.dataset.id)}),l.querySelectorAll(".edit-invoice-btn").forEach(t=>{t.onclick=()=>ie(t.dataset.id)}),l.querySelectorAll(".pay-invoice-btn").forEach(t=>{t.onclick=()=>{N({invoiceId:t.dataset.id,invoiceNumber:t.dataset.num,clientId:t.dataset.clientId,clientName:t.dataset.clientName,suggestedAmount:Number(t.dataset.pending)||0})}}),l.querySelectorAll(".delete-invoice-btn").forEach(t=>{t.onclick=async()=>{if(confirm("Are you sure you want to delete this invoice? This cannot be undone."))try{await H("/accounts/invoices/"+t.dataset.id),h("Invoice deleted successfully"),I()}catch(x){h(x.message,!0)}}});const f=document.getElementById("exportInvoicesCsvBtn");f&&(f.onclick=()=>ae(e))}function ae(l){if(!l||!l.length){h("No invoices to export",!0);return}const u=["Invoice Number","Client Name","Type","Issue Date","Due Date","Subtotal","Tax (18%)","Total Amount","Amount Paid","Pending Amount","Status"],e=l.map(i=>[i.invoiceNumber,`"${(i.clientName||"").replace(/"/g,'""')}"`,i.billingType||"",C(i.issueDate),C(i.dueDate),i.subtotal||0,i.taxAmount||0,i.totalAmount||0,i.amountPaid||0,i.pendingAmount||0,i.status]),n=[u.join(","),...e.map(i=>i.join(","))].join(`
`),c=new Blob([n],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(c),a=document.createElement("a");a.href=p,a.download=`CI360_Invoices_${new Date().toISOString().slice(0,10)}.csv`,a.click(),URL.revokeObjectURL(p),h("Invoices exported to CSV")}async function W(l){let u="INV-2026-0001";try{const m=await S("/accounts/next-invoice-number");m&&m.invoiceNumber&&(u=m.invoiceNumber)}catch{}const e=new Date;e.setDate(e.getDate()+15);const n=[{description:"Strategic Intelligence & Creative Retainer",serviceId:"",quantity:1,rate:5e4,amount:5e4}],c=q(`
    <div style="max-width:680px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Create New Invoice</h3>
        <span class="badge gold" style="font-family:var(--font-heading);font-size:12px">${s(u)}</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client *</label>
          <select id="modalInvClient" required>
            <option value="">Select client…</option>
            ${M.map(m=>`<option value="${m._id}" ${l===m._id?"selected":""}>${s(m.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Invoice Number</label>
          <input type="text" id="modalInvNum" value="${s(u)}" required>
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
    </div>`);let p=[...n];function a(){const m=c.querySelector("#modalItemsContainer");m.innerHTML=p.map((g,o)=>`
      <div style="display:flex;gap:8px;align-items:center;background:var(--bg-card);border:1px solid var(--border-xs);padding:8px 10px;border-radius:var(--r-sm)">
        <div style="flex:2">
          <input type="text" class="item-desc" data-idx="${o}" placeholder="Description / Service" value="${s(g.description)}" style="margin:0;font-size:12px">
        </div>
        <div style="width:70px">
          <input type="number" class="item-qty" data-idx="${o}" placeholder="Qty" min="1" value="${g.quantity}" style="margin:0;font-size:12px;text-align:center">
        </div>
        <div style="width:110px">
          <input type="number" class="item-rate" data-idx="${o}" placeholder="Rate (₹)" min="0" value="${g.rate}" style="margin:0;font-size:12px;text-align:right">
        </div>
        <div style="width:90px;font-weight:700;font-size:12.5px;text-align:right">
          ${r(g.amount)}
        </div>
        <div>
          ${p.length>1?`<button type="button" class="btn danger small remove-item-btn" data-idx="${o}" style="padding:4px 8px">✕</button>`:""}
        </div>
      </div>`).join(""),m.querySelectorAll(".item-desc").forEach(g=>{g.oninput=o=>{p[Number(o.target.dataset.idx)].description=o.target.value}}),m.querySelectorAll(".item-qty").forEach(g=>{g.oninput=o=>{const b=Number(o.target.dataset.idx),v=Number(o.target.value)||1;p[b].quantity=v,p[b].amount=v*(p[b].rate||0),a(),i()}}),m.querySelectorAll(".item-rate").forEach(g=>{g.oninput=o=>{const b=Number(o.target.dataset.idx),v=Number(o.target.value)||0;p[b].rate=v,p[b].amount=(p[b].quantity||1)*v,a(),i()}}),m.querySelectorAll(".remove-item-btn").forEach(g=>{g.onclick=()=>{const o=Number(g.dataset.idx);p.splice(o,1),a(),i()}})}function i(){const m=p.reduce((w,A)=>w+(Number(A.amount)||0),0),g=Number(c.querySelector("#modalCalcTaxRate").value)||0,o=Number(c.querySelector("#modalCalcDiscount").value)||0,b=Math.max(0,m-o),v=Math.round(b*(g/100)),$=b+v;c.querySelector("#modalCalcSubtotal").textContent=r(m),c.querySelector("#modalCalcTaxAmount").textContent=r(v),c.querySelector("#modalCalcTotal").textContent=r($)}c.querySelector("#modalAddItemRowBtn").onclick=()=>{p.push({description:"",serviceId:"",quantity:1,rate:0,amount:0}),a(),i()},c.querySelector("#modalCalcTaxRate").onchange=i,c.querySelector("#modalCalcDiscount").oninput=i,c.querySelector("#modalInvClient").onchange=async m=>{const g=m.target.value;if(g)try{const o=await S("/accounts/billing-profiles").then(b=>{var v;return(v=b.find($=>$.clientId===g))==null?void 0:v.profile});o&&(o.retainerAmount&&p.length===1&&p[0].rate===5e4&&(p[0].rate=o.retainerAmount,p[0].amount=o.retainerAmount,a(),i()),o.gstin&&(c.querySelector("#modalInvGstin").value=o.gstin),o.billingType&&(c.querySelector("#modalInvType").value=o.billingType))}catch{}},a(),i(),c.querySelector("#modalCancelInvBtn").onclick=()=>c.remove(),c.querySelector("#modalSaveInvBtn").onclick=async()=>{const m=c.querySelector("#modalInvClient").value,g=c.querySelector("#modalInvNum").value.trim(),o=c.querySelector("#modalInvIssueDate").value,b=c.querySelector("#modalInvDueDate").value,v=c.querySelector("#modalInvType").value,$=Number(c.querySelector("#modalCalcTaxRate").value)||0,w=Number(c.querySelector("#modalCalcDiscount").value)||0,A=c.querySelector("#modalInvTerms").value.trim(),y=c.querySelector("#modalInvGstin").value.trim(),d=c.querySelector("#modalInvNotes").value.trim();if(!m){h("Please select a client",!0);return}if(!b){h("Please select a due date",!0);return}if(!p.length||!p.some(t=>t.amount>0)){h("Please provide at least one valid line item with an amount",!0);return}const f={clientId:m,invoiceNumber:g,issueDate:o,dueDate:b,billingType:v,items:p,discount:w,taxRate:$,paymentTerms:A,gstin:y,notes:d};try{const t=c.querySelector("#modalSaveInvBtn");t.disabled=!0,t.textContent="Generating Invoice…",await P("/accounts/invoices",f),h("Invoice created and issued successfully!"),c.remove(),I()}catch(t){h(t.message,!0),c.querySelector("#modalSaveInvBtn").disabled=!1,c.querySelector("#modalSaveInvBtn").textContent="Create & Issue Invoice"}}}async function ie(l){const e=(await S("/accounts/invoices/"+l)).invoice;if(!e)return;const n=q(`
    <div style="max-width:640px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Edit Invoice ${s(e.invoiceNumber)}</h3>
        ${E(e.status)}
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client</label>
          <input type="text" value="${s(e.clientName)}" disabled>
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
        <input type="text" id="editInvTerms" value="${s(e.paymentTerms||"")}">
      </div>

      <div class="field">
        <label>GSTIN</label>
        <input type="text" id="editInvGstin" value="${s(e.gstin||"")}">
      </div>

      <div class="field">
        <label>Notes</label>
        <textarea id="editInvNotes" rows="2">${s(e.notes||"")}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="editCancelBtn">Cancel</button>
        <button class="btn gold" id="editSaveBtn">Save Changes</button>
      </div>
    </div>`);n.querySelector("#editCancelBtn").onclick=()=>n.remove(),n.querySelector("#editSaveBtn").onclick=async()=>{const c={status:n.querySelector("#editInvStatus").value,issueDate:n.querySelector("#editInvIssueDate").value,dueDate:n.querySelector("#editInvDueDate").value,paymentTerms:n.querySelector("#editInvTerms").value.trim(),gstin:n.querySelector("#editInvGstin").value.trim(),notes:n.querySelector("#editInvNotes").value.trim()};try{await V("/accounts/invoices/"+l,c),h("Invoice updated successfully"),n.remove(),I()}catch(p){h(p.message,!0)}}}async function Q(l){var a,i,m,g,o;const u=await S("/accounts/invoices/"+l),e=u.invoice,n=u.payments||[];if(!e)return;const c=q(`
    <div style="max-width:860px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px" class="no-print">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:18px;font-weight:800;color:var(--text-1)">Invoice Details</span>
          ${E(e.status)}
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
            <div class="invoice-number-badge">${s(e.invoiceNumber)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">Date: <strong>${C(e.issueDate)}</strong></div>
            <div style="font-size:12px;color:${e.status==="overdue"?"var(--red-600)":"var(--text-3)"}">
              Due Date: <strong>${C(e.dueDate)}</strong>
            </div>
          </div>
        </div>

        <!-- Bill To Grid -->
        <div class="invoice-grid-details">
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Billed To</div>
            <div style="font-size:16px;font-weight:800;color:var(--text-1)">${s(e.clientName)}</div>
            ${e.gstin?`<div style="font-size:12px;color:var(--text-2);margin-top:2px">GSTIN: <strong>${s(e.gstin)}</strong></div>`:""}
            ${e.billingAddress?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${s(e.billingAddress)}</div>`:""}
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Payment Status</div>
            <div>${E(e.status)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:6px">Pending Balance: <strong style="color:${e.pendingAmount>0?"var(--amber-600)":"var(--green-600)"};font-size:14px">${r(e.pendingAmount)}</strong></div>
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
            ${(e.items||[]).map(b=>`
              <tr>
                <td>
                  <strong>${s(b.description)}</strong>
                  ${b.serviceName?`<div style="font-size:11px;color:var(--text-3)">Service: ${s(b.serviceName)}</div>`:""}
                </td>
                <td style="text-align:center">${b.quantity||1}</td>
                <td style="text-align:right">${r(b.rate)}</td>
                <td style="text-align:right;font-weight:700">${r(b.amount)}</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <!-- Totals Wrap -->
        <div class="invoice-totals-wrap">
          <div class="invoice-totals-box">
            <div class="invoice-total-row">
              <span>Subtotal</span>
              <strong>${r(e.subtotal)}</strong>
            </div>
            ${e.discount>0?`
              <div class="invoice-total-row">
                <span>Discount</span>
                <span style="color:var(--green-600)">- ${r(e.discount)}</span>
              </div>`:""}
            <div class="invoice-total-row">
              <span>GST (${e.taxRate||18}%)</span>
              <span>${r(e.taxAmount)}</span>
            </div>
            <div class="invoice-total-row grand-total">
              <span>Total Amount</span>
              <span>${r(e.totalAmount)}</span>
            </div>
            <div class="invoice-total-row" style="padding-top:8px">
              <span>Amount Paid</span>
              <span style="color:var(--green-600);font-weight:700">${r(e.amountPaid)}</span>
            </div>
            <div class="invoice-total-row" style="font-size:15px;font-weight:800;color:${e.pendingAmount>0?"var(--amber-600)":"var(--green-600)"}">
              <span>Pending Amount</span>
              <span>${r(e.pendingAmount)}</span>
            </div>
          </div>
        </div>

        <!-- Bank Details & Terms Footer -->
        <div class="invoice-bank-footer">
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Bank Transfer & UPI Details</div>
            <div>Account Name: <strong>${s(((a=e.bankDetails)==null?void 0:a.accountName)||"CI360 Intelligence")}</strong></div>
            <div>Bank: <strong>${s(((i=e.bankDetails)==null?void 0:i.bankName)||"HDFC Bank")}</strong></div>
            <div>A/C Number: <strong>${s(((m=e.bankDetails)==null?void 0:m.accountNumber)||"50200088992211")}</strong></div>
            <div>IFSC Code: <strong>${s(((g=e.bankDetails)==null?void 0:g.ifscCode)||"HDFC0001234")}</strong></div>
            <div>UPI ID: <strong>${s(((o=e.bankDetails)==null?void 0:o.upiId)||"ci360@hdfcbank")}</strong></div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Terms & Conditions</div>
            <div style="line-height:1.4">${s(e.paymentTerms||"Payment due within 15 days of invoice date.")}</div>
            <div style="margin-top:8px;font-style:italic;color:var(--text-4)">${s(e.notes||"")}</div>
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
                ${n.map(b=>`
                  <tr>
                    <td><strong>${s(b.paymentNumber)}</strong></td>
                    <td>${C(b.paymentDate)}</td>
                    <td><span class="badge">${s(b.paymentMethod)}</span></td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${s(b.referenceId||"—")}</td>
                    <td class="num" style="color:var(--green-600);font-weight:700">${r(b.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`);c.querySelector("#viewModalCloseBtn").onclick=()=>c.remove(),c.querySelector("#viewModalPrintBtn").onclick=()=>{window.print()};const p=c.querySelector("#viewModalPayBtn");p&&(p.onclick=()=>{c.remove(),N({invoiceId:e._id,invoiceNumber:e.invoiceNumber,clientId:e.clientId,clientName:e.clientName,suggestedAmount:e.pendingAmount})})}let F="all",O="",U="";async function le(l){let u=`?paymentMethod=${encodeURIComponent(F)}`;O&&(u+=`&clientId=${encodeURIComponent(O)}`),U&&(u+=`&search=${encodeURIComponent(U)}`);const e=await S("/accounts/payments"+u),n=e.reduce((d,f)=>d+(f.amount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Total Collections:</span> <strong style="color:var(--green-600)">${r(n)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Average Payment:</span> <strong>${r(e.length?n/e.length:0)}</strong>
        </div>
      </div>

      <!-- Filters -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="paymentSearchInput" placeholder="Search by payment #, UTR, client name, invoice…" value="${s(U)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="paymentClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${M.map(d=>`<option value="${d._id}" ${O===d._id?"selected":""}>${s(d.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","bank_transfer","upi","cheque","card","cash"].map(d=>`
              <button class="btn ghost small payment-method-filter ${F===d?"active gold":""}" data-method="${d}">
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
                    <input type="checkbox" class="payment-select-cb" data-id="${d._id}" data-num="${s(d.paymentNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--green-600)">${s(d.paymentNumber)}</strong>
                  </td>
                  <td><strong>${s(d.clientName)}</strong></td>
                  <td>
                    ${d.invoiceNumber?`<span class="badge blue">${s(d.invoiceNumber)}</span>`:'<span class="muted">Advance / General</span>'}
                  </td>
                  <td style="font-size:12.5px">${C(d.paymentDate)}</td>
                  <td>
                    <span class="badge ${d.paymentMethod==="upi"?"gold":d.paymentMethod==="bank_transfer"?"blue":"green"}">
                      ${d.paymentMethod==="bank_transfer"?"🏦 RTGS/NEFT":d.paymentMethod==="upi"?"📱 UPI":d.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td style="font-family:var(--font-mono);font-size:12px">${s(d.referenceId||"—")}</td>
                  <td class="num" style="font-weight:800;color:var(--green-600);font-size:14px">${r(d.amount)}</td>
                  <td style="font-size:12px;color:var(--text-3)">${s(d.recordedByName||"Accounts")}</td>
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
    </section>`;const c=document.getElementById("paymentSearchInput");let p=null;c.oninput=()=>{clearTimeout(p),p=setTimeout(()=>{U=c.value.trim(),I()},300)},document.getElementById("paymentClientFilter").onchange=d=>{O=d.target.value,I()},l.querySelectorAll(".payment-method-filter").forEach(d=>{d.onclick=()=>{F=d.dataset.method,I()}}),document.getElementById("newPaymentBtn").onclick=()=>N();const a=document.getElementById("selectAllPaymentsCb"),i=document.getElementById("thSelectAllPayments"),m=document.getElementById("paymentsDeselectAllBtn"),g=document.getElementById("paymentsSelectedCounter"),o=document.getElementById("deleteSelectedPaymentsBtn"),b=document.getElementById("deletePaymentsSelectedCount"),v=document.getElementById("deleteAllPaymentsBtn"),$=l.querySelectorAll(".payment-select-cb");function w(){const d=Array.from($).filter(x=>x.checked),f=d.length;g&&(g.textContent=`${f} of ${e.length} selected`),b&&(b.textContent=f),f>0?(o&&(o.style.display="inline-flex"),m&&(m.style.display="inline-flex")):(o&&(o.style.display="none"),m&&(m.style.display="none"));const t=$.length>0&&d.length===$.length;a&&(a.checked=t),i&&(i.checked=t)}function A(d){$.forEach(f=>{f.checked=d}),w()}a&&(a.onchange=d=>A(d.target.checked)),i&&(i.onchange=d=>A(d.target.checked)),m&&(m.onclick=()=>A(!1)),$.forEach(d=>{d.onchange=()=>w()}),o&&(o.onclick=async()=>{const d=Array.from($).filter(f=>f.checked).map(f=>f.dataset.id);if(d.length&&confirm(`Are you sure you want to permanently delete the ${d.length} selected payment(s)? This will restore linked invoice balances.`))try{o.disabled=!0,o.textContent="Deleting…";const f=await P("/accounts/payments/bulk-delete",{ids:d});h(f.message||`Deleted ${d.length} payment(s)`),I()}catch(f){h(f.message,!0),o.disabled=!1,w()}}),v&&(v.onclick=async()=>{if(!e.length){h("No payments to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} payments?

This will restore all invoice balances to pending. This cannot be undone.`))try{v.disabled=!0,v.textContent="Deleting all…";const d=await P("/accounts/payments/bulk-delete",{deleteAll:!0});h(d.message||"All payments have been deleted."),I()}catch(d){h(d.message,!0),v.disabled=!1,v.textContent=`💥 Delete All Payments (${e.length})`}}),l.querySelectorAll(".delete-payment-btn").forEach(d=>{d.onclick=async()=>{if(confirm("Delete this payment record? This will restore the pending amount on the linked invoice."))try{await H("/accounts/payments/"+d.dataset.id),h("Payment deleted and invoice balance restored"),I()}catch(f){h(f.message,!0)}}});const y=document.getElementById("exportPaymentsCsvBtn");y&&(y.onclick=()=>{if(!e.length)return h("No payments to export",!0);const d=["Payment Number","Client Name","Invoice Number","Date","Method","Reference / UTR","Amount","Recorded By"],f=e.map(T=>[T.paymentNumber,`"${(T.clientName||"").replace(/"/g,'""')}"`,T.invoiceNumber||"",C(T.paymentDate),T.paymentMethod,T.referenceId||"",T.amount||0,T.recordedByName||""]),t=[d.join(","),...f.map(T=>T.join(","))].join(`
`),x=new Blob([t],{type:"text/csv;charset=utf-8;"}),R=URL.createObjectURL(x),z=document.createElement("a");z.href=R,z.download=`CI360_Payments_${new Date().toISOString().slice(0,10)}.csv`,z.click(),URL.revokeObjectURL(R),h("Payments exported to CSV")})}async function N(l={}){let u="PAY-2026-0001";try{const i=await S("/accounts/next-payment-number");i&&i.paymentNumber&&(u=i.paymentNumber)}catch{}let e=[];if(l.clientId)try{e=await S(`/accounts/invoices?clientId=${l.clientId}`),e=e.filter(i=>i.pendingAmount>0&&i.status!=="cancelled")}catch{}const n=q(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Record Client Payment</h3>
        <span class="badge green" style="font-family:var(--font-heading);font-size:12px">${s(u)}</span>
      </div>

      <div class="field">
        <label>Client *</label>
        <select id="modalPayClient" required>
          <option value="">Select client…</option>
          ${M.map(i=>`<option value="${i._id}" ${l.clientId===i._id?"selected":""}>${s(i.name)}</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label>Link to Unpaid Invoice (Optional)</label>
        <select id="modalPayInvoice">
          <option value="">General advance / No invoice link</option>
          ${e.map(i=>`
            <option value="${i._id}" data-pending="${i.pendingAmount}" ${l.invoiceId===i._id?"selected":""}>
              ${s(i.invoiceNumber)} — Balance: ${r(i.pendingAmount)} (Total: ${r(i.totalAmount)})
            </option>`).join("")}
        </select>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Payment Amount (₹) *</label>
          <input type="number" id="modalPayAmount" min="1" value="${l.suggestedAmount||""}" required placeholder="Amount received">
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
    </div>`),c=n.querySelector("#modalPayClient"),p=n.querySelector("#modalPayInvoice"),a=n.querySelector("#modalPayAmount");c.onchange=async()=>{const i=c.value;if(!i){p.innerHTML='<option value="">General advance / No invoice link</option>';return}try{const g=(await S(`/accounts/invoices?clientId=${i}`)||[]).filter(o=>o.pendingAmount>0&&o.status!=="cancelled");p.innerHTML=`
        <option value="">General advance / No invoice link</option>
        ${g.map(o=>`
          <option value="${o._id}" data-pending="${o.pendingAmount}">
            ${s(o.invoiceNumber)} — Balance: ${r(o.pendingAmount)} (Total: ${r(o.totalAmount)})
          </option>`).join("")}`,g.length===1&&!a.value&&(p.value=g[0]._id,a.value=g[0].pendingAmount)}catch{}},p.onchange=()=>{const m=p.options[p.selectedIndex].getAttribute("data-pending");m&&(a.value=m)},n.querySelector("#modalPayCancelBtn").onclick=()=>n.remove(),n.querySelector("#modalPaySaveBtn").onclick=async()=>{const i=c.value,m=p.value||null,g=Number(a.value),o=n.querySelector("#modalPayDate").value,b=n.querySelector("#modalPayMethod").value,v=n.querySelector("#modalPayRef").value.trim(),$=n.querySelector("#modalPayNotes").value.trim();if(!i)return h("Please select a client",!0);if(!g||g<=0)return h("Please enter a valid payment amount",!0);try{const w=n.querySelector("#modalPaySaveBtn");w.disabled=!0,w.textContent="Saving…",await P("/accounts/payments",{clientId:i,invoiceId:m,amount:g,paymentDate:o,paymentMethod:b,referenceId:v,notes:$}),h("Payment recorded successfully!"),n.remove(),I()}catch(w){h(w.message,!0),n.querySelector("#modalPaySaveBtn").disabled=!1,n.querySelector("#modalPaySaveBtn").textContent="Save Payment Receipt"}}}async function se(l){const u=await S("/accounts/receivables"),e=u.reduce((a,i)=>a+(i.pendingAmount||0),0),n=u.reduce((a,i)=>a+(i.overdueAmount||0),0),c=u.filter(a=>a.pendingAmount>0);l.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Pending Amount & Receivables <span class="eyebrow">${c.length} clients with balances</span></h2>
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
          <div class="kpi-value" style="color:var(--amber-600)">${r(e)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Across all clients</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Critically Overdue</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${r(n)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Exceeded credit payment terms</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Unsettled Clients</span>
            <div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent)">👥</div>
          </div>
          <div class="kpi-value">${c.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Out of ${u.length} total clients</div>
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
              ${u.map(a=>`
                <tr style="${a.pendingAmount>0?"":"opacity:0.65"}">
                  <td style="padding-left:22px">
                    <strong>${s(a.clientName)}</strong>
                    ${a.gstin?`<div style="font-size:11px;color:var(--text-3)">GSTIN: ${s(a.gstin)}</div>`:""}
                  </td>
                  <td class="num">${r(a.totalBilled)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${r(a.totalPaid)}</td>
                  <td class="num" style="font-weight:800;font-size:14px;color:${a.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${r(a.pendingAmount)}
                  </td>
                  <td class="num">
                    ${a.overdueAmount>0?`<span class="badge red">${r(a.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12.5px;color:${a.overdueAmount>0?"var(--red-600)":"inherit"}">
                    ${a.oldestDueDate?C(a.oldestDueDate):'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12px">
                    ${a.lastPaymentDate?`${C(a.lastPaymentDate)} (${r(a.lastPaymentAmount)})`:'<span class="muted">No payments</span>'}
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    ${a.pendingAmount>0?`
                      <button class="btn green small settle-payment-btn" data-client-id="${a.clientId}" data-client-name="${s(a.clientName)}" data-pending="${a.pendingAmount}" title="Record Payment">
                        💵 Collect
                      </button>
                      <button class="btn ghost small reminder-btn" data-client-name="${s(a.clientName)}" data-pending="${a.pendingAmount}" data-overdue="${a.overdueAmount}" data-phone="${s(a.billingPhone||"")}" title="Copy or Send Payment Reminder">
                        💬 Reminder
                      </button>`:'<span class="badge green">Settled</span>'}
                  </td>
                </tr>`).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client records available.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,l.querySelectorAll(".settle-payment-btn").forEach(a=>{a.onclick=()=>{N({clientId:a.dataset.clientId,clientName:a.dataset.clientName,suggestedAmount:Number(a.dataset.pending)||0})}}),l.querySelectorAll(".reminder-btn").forEach(a=>{a.onclick=()=>{oe({clientName:a.dataset.clientName,pending:Number(a.dataset.pending)||0,overdue:Number(a.dataset.overdue)||0,phone:a.dataset.phone})}});const p=document.getElementById("exportReceivablesCsvBtn");p&&(p.onclick=()=>{if(!u.length)return h("No receivables to export",!0);const a=["Client Name","GSTIN","Total Billed","Total Paid","Pending Balance","Overdue Amount","Oldest Due Date","Last Payment Date","Last Payment Amount"],i=u.map(v=>[`"${(v.clientName||"").replace(/"/g,'""')}"`,v.gstin||"",v.totalBilled||0,v.totalPaid||0,v.pendingAmount||0,v.overdueAmount||0,v.oldestDueDate?C(v.oldestDueDate):"",v.lastPaymentDate?C(v.lastPaymentDate):"",v.lastPaymentAmount||0]),m=[a.join(","),...i.map(v=>v.join(","))].join(`
`),g=new Blob([m],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(g),b=document.createElement("a");b.href=o,b.download=`CI360_Receivables_Statement_${new Date().toISOString().slice(0,10)}.csv`,b.click(),URL.revokeObjectURL(o),h("Receivables statement exported to CSV")})}function oe({clientName:l,pending:u,overdue:e,phone:n}){const c=`Dear ${l},

Greetings from CI360 Intelligence.

This is a friendly reminder regarding your outstanding account balance of ${r(u)}${e>0?` (including ${r(e)} overdue)`:""}.

Please arrange for the settlement at your earliest convenience to our registered bank account:
- Bank: HDFC Bank
- A/C: 50200088992211
- IFSC: HDFC0001234
- UPI: ci360@hdfcbank

If you have already processed this remittance, kindly share the UTR / transaction receipt. Thank you for your continued partnership!

Warm regards,
Accounts Department | CI360`,p=q(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:18px">Payment Reminder for ${s(l)}</h3>
        <span class="badge amber" style="font-size:12px">${r(u)} Due</span>
      </div>
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:12px">
        You can copy this formatted payment reminder template to email/chat or launch WhatsApp directly.
      </div>

      <div class="field">
        <label>Reminder Message Template</label>
        <textarea id="reminderTextArea" rows="10" style="font-family:var(--font-mono);font-size:12px;line-height:1.4">${s(c)}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="reminderCloseBtn">Close</button>
        <button class="btn gold" id="reminderCopyBtn">📋 Copy to Clipboard</button>
        <button class="btn green" id="reminderWhatsAppBtn">💬 Open WhatsApp</button>
      </div>
    </div>`);p.querySelector("#reminderCloseBtn").onclick=()=>p.remove(),p.querySelector("#reminderCopyBtn").onclick=()=>{const a=p.querySelector("#reminderTextArea").value;navigator.clipboard.writeText(a).then(()=>{h("Reminder template copied to clipboard!")}).catch(()=>{h("Failed to copy text",!0)})},p.querySelector("#reminderWhatsAppBtn").onclick=()=>{const a=encodeURIComponent(p.querySelector("#reminderTextArea").value),i=(n||"").replace(/[^0-9]/g,""),m=i?`https://wa.me/${i}?text=${a}`:`https://wa.me/?text=${a}`;window.open(m,"_blank")}}async function de(l){const u=await S("/accounts/billing-profiles");l.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Client Billing Profiles <span class="eyebrow">${u.length} clients</span></h2>
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
              ${u.map(e=>{const n=e.profile;return`
                  <tr>
                    <td style="padding-left:22px">
                      <strong>${s(e.clientName)}</strong>
                      ${n.billingEmail?`<div style="font-size:11px;color:var(--text-3)">${s(n.billingEmail)}</div>`:""}
                    </td>
                    <td><span class="badge">${(n.billingType||"retainer").toUpperCase()}</span></td>
                    <td style="font-size:12px;text-transform:capitalize">${s(n.billingCycle||"monthly")}</td>
                    <td class="num" style="font-weight:800;color:var(--brand-600);font-size:14px">
                      ${r(n.retainerAmount||0)}
                    </td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${s(n.gstin||"—")}</td>
                    <td style="font-size:12px">Net ${n.paymentTermsDays||15}d</td>
                    <td>
                      <span class="badge ${n.status==="active"?"green":"amber"}">${s(n.status||"active")}</span>
                    </td>
                    <td class="num" style="padding-right:22px;white-space:nowrap">
                      <button class="btn gold small gen-monthly-inv-btn" data-client-id="${e.clientId}" data-client-name="${s(e.clientName)}" data-amount="${n.retainerAmount||0}" title="Generate this month's invoice">
                        ⚡ Gen Invoice
                      </button>
                      <button class="btn ghost small edit-profile-btn" data-client-id="${e.clientId}" data-client-name="${s(e.clientName)}" title="Edit Billing Setup">
                        ⚙️ Edit
                      </button>
                    </td>
                  </tr>`}).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client billing profiles found.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,l.querySelectorAll(".gen-monthly-inv-btn").forEach(e=>{e.onclick=async()=>{const n=e.dataset.clientName,c=Number(e.dataset.amount)||0;if(confirm(`Generate this month's invoice for ${n} for ${r(c)}?`))try{e.disabled=!0,e.textContent="…",await P(`/accounts/billing-profiles/${e.dataset.clientId}/generate-invoice`,{amount:c}),h(`Invoice generated successfully for ${n}!`),k="invoices",D()}catch(p){h(p.message,!0),e.disabled=!1,e.textContent="⚡ Gen Invoice"}}}),l.querySelectorAll(".edit-profile-btn").forEach(e=>{e.onclick=()=>{const n=u.find(c=>c.clientId===e.dataset.clientId);ce(e.dataset.clientId,e.dataset.clientName,n?n.profile:{})}})}function ce(l,u,e={}){const n=q(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Billing Setup: ${s(u)}</h3>
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
          <input type="text" id="bpGstin" value="${s(e.gstin||"")}" placeholder="e.g. 24AAACC1206M1ZT">
        </div>
        <div class="field">
          <label>PAN Number</label>
          <input type="text" id="bpPan" value="${s(e.panNumber||"")}" placeholder="e.g. AAACC1206M">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Accounts Email</label>
          <input type="email" id="bpEmail" value="${s(e.billingEmail||"")}" placeholder="billing@client.com">
        </div>
        <div class="field">
          <label>Accounts Phone</label>
          <input type="text" id="bpPhone" value="${s(e.billingPhone||"")}" placeholder="+91 98765 43210">
        </div>
      </div>

      <div class="field">
        <label>Billing Address</label>
        <textarea id="bpAddress" rows="2">${s(e.billingAddress||"")}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="bpCancelBtn">Cancel</button>
        <button class="btn gold" id="bpSaveBtn">Save Billing Setup</button>
      </div>
    </div>`);n.querySelector("#bpCancelBtn").onclick=()=>n.remove(),n.querySelector("#bpSaveBtn").onclick=async()=>{const c={billingType:n.querySelector("#bpType").value,billingCycle:n.querySelector("#bpCycle").value,retainerAmount:Number(n.querySelector("#bpAmount").value)||0,paymentTermsDays:Number(n.querySelector("#bpTerms").value)||15,gstin:n.querySelector("#bpGstin").value.trim(),panNumber:n.querySelector("#bpPan").value.trim(),billingEmail:n.querySelector("#bpEmail").value.trim(),billingPhone:n.querySelector("#bpPhone").value.trim(),billingAddress:n.querySelector("#bpAddress").value.trim()};try{await V(`/accounts/billing-profiles/${l}`,c),h("Billing profile saved successfully"),n.remove(),I()}catch(p){h(p.message,!0)}}}ee();
