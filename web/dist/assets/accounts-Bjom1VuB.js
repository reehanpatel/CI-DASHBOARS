import{f as ae,r as le,b as ie,e as i,i as se,a as oe,c as P,d as de,g as v,h as B,j as N,k as g,l as J,m as K,n as re,o as ce,p as j}from"./api-DWnSPm0D.js";let E=null,A="overview",G=[],pe=[];const ve=[{key:"overview",label:"Overview",icon:"📊"},{key:"invoices",label:"Invoices",icon:"📄"},{key:"payments",label:"Payments",icon:"💵"},{key:"receivables",label:"Pending & Receivables",icon:"⏳"},{key:"billing",label:"Billing Profiles",icon:"📑"},{key:"tally",label:"TallyPrime Silver",icon:"🏛️"},{key:"settings",label:"Settings",icon:"⚙️"}];async function me(){if(se(),E=oe("accounts"),!!E){try{const[l,p]=await Promise.all([P("/clients").catch(()=>[]),P("/services").catch(()=>[]),de().catch(()=>{})]);G=l||[],pe=p||[]}catch(l){console.error("Failed to load initial metadata",l)}q()}}function q(){const l=document.getElementById("app"),p=ae("accounts",ve,!1),e=p.find(t=>t.key===A)||p[0];p.some(t=>t.key===A)||(A=e?e.key:"overview"),l.innerHTML=le({user:E,currentRole:"accounts",activeTab:A,tabs:p,title:e?e.label:"Overview",subtitle:"Billing, Invoicing & Receivables Intelligence"}),ie(t=>{A=t,q()}),C()}window.ci360NavTab=l=>{A=l,q()};async function C(){const l=document.getElementById("content");if(l){l.innerHTML=`
    <div style="display:flex;justify-content:center;align-items:center;min-height:240px">
      <div class="spinner"></div>
    </div>`;try{A==="overview"?await ue(l):A==="invoices"?await ge(l):A==="payments"?await fe(l):A==="receivables"?await he(l):A==="billing"?await we(l):A==="tally"?await Ce(l):A==="settings"&&ye(l)}catch(p){l.innerHTML=`
      <div class="empty" style="padding:48px 24px">
        <h3 style="color:var(--s-red-text);margin-bottom:8px">Unable to load accounts data</h3>
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px">${i(p.message)}</p>
        <button class="btn gold small" id="retryAccountsBtn">Retry</button>
      </div>`;const e=document.getElementById("retryAccountsBtn");e&&(e.onclick=()=>C())}}}function ye(l){l.innerHTML=`
    <div style="padding:8px 0 24px 0;">
      ${re({title:"Accounts User Profile & Credentials",subtitle:"Manage your authorized financial management username, login email, and security password"})}
    </div>
  `,ce(l)}async function ue(l){const p=await P("/accounts/dashboard"),e=p.metrics||{},t=p.aging||{current:0,days31to60:0,days61to90:0,days90plus:0},s=t.current+t.days31to60+t.days61to90+t.days90plus||1,m=Math.round(t.current/s*100),a=Math.round(t.days31to60/s*100),o=Math.round(t.days61to90/s*100),b=Math.max(0,100-(m+a+o)),x=E&&(/ekta/i.test(E.name)||/ekta/i.test(E.email)),c=E&&(E.role==="superadmin"||E.role==="admin"),h=x||c||E&&E.personnelId;l.innerHTML=`
    <section class="block">
      <div class="accounts-header-banner">
        <div class="accounts-header-title">
          <h2>Accounts & Finance Hub ${x?'<span class="badge" style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:12px;margin-left:8px;vertical-align:middle;padding:4px 8px;border-radius:6px">Ekta · Finance Manager</span>':""}</h2>
          <div class="accounts-header-subtitle">Real-time revenue tracking, invoice lifecycle, and client pending balances.</div>
        </div>
        <div class="accounts-header-actions">
          ${c?`
            <a href="/admin" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
              <span>← Admin Portal</span>
            </a>`:""}
          ${h?`
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
            <span class="badge amber">${(e.invoiceCounts?.partially_paid||0)+(e.invoiceCounts?.issued||0)} Invoices</span>
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
            <div class="aging-segment current" style="width:${m}%" title="0-30 Days: ${v(t.current)}"></div>
            <div class="aging-segment days31to60" style="width:${a}%" title="31-60 Days: ${v(t.days31to60)}"></div>
            <div class="aging-segment days61to90" style="width:${o}%" title="61-90 Days: ${v(t.days61to90)}"></div>
            <div class="aging-segment days90plus" style="width:${b}%" title="90+ Days: ${v(t.days90plus)}"></div>
          </div>

          <div class="aging-legend">
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--green-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">0 - 30 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${v(t.current)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--amber-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">31 - 60 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${v(t.days31to60)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:#F97316"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">61 - 90 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${v(t.days61to90)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--red-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">90+ Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--red-600)">${v(t.days90plus)}</div>
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
            ${(p.monthlyTrend||[]).map(r=>{const $=Math.max(...(p.monthlyTrend||[]).map(I=>Math.max(I.billed,I.collected)),1e3),T=Math.round(r.billed/$*100),d=Math.round(r.collected/$*100);return`
                <div style="display:flex;align-items:center;gap:12px;font-size:12px">
                  <span style="width:50px;font-weight:700;color:var(--text-2)">${r.month}</span>
                  <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--brand-500);width:${Math.max(4,T)}%;border-radius:4px" title="Billed: ${v(r.billed)}"></div>
                      <span style="font-size:10.5px;color:var(--text-3);min-width:60px">${v(r.billed)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--green-500);width:${Math.max(4,d)}%;border-radius:4px" title="Collected: ${v(r.collected)}"></div>
                      <span style="font-size:10.5px;color:var(--green-600);font-weight:600;min-width:60px">${v(r.collected)}</span>
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
                ${(p.topClientsPending||[]).slice(0,5).map(r=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${i(r.clientName)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${r.invoiceCount} invoices</div>
                    </td>
                    <td class="num" style="font-weight:700;color:var(--amber-600)">${v(r.pendingAmount)}</td>
                    <td class="num">
                      ${r.overdueAmount>0?`<span class="badge red">${v(r.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                    </td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn green small quick-collect-btn" data-client-id="${r.clientId}" data-client-name="${i(r.clientName)}" data-pending="${r.pendingAmount}">
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
                ${(p.recentInvoices||[]).slice(0,5).map(r=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${i(r.invoiceNumber)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${B(r.issueDate)}</div>
                    </td>
                    <td>${i(r.clientName)}</td>
                    <td class="num" style="font-weight:700">${v(r.totalAmount)}</td>
                    <td>${U(r.status)}</td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn ghost small view-invoice-btn" data-id="${r._id}">View</button>
                    </td>
                  </tr>`).join("")||'<tr><td colspan="5"><div class="empty" style="padding:24px">No invoices generated yet.</div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`,document.getElementById("quickNewInvoiceBtn").onclick=()=>ee(),document.getElementById("quickRecordPaymentBtn").onclick=()=>O();const y=document.getElementById("seedDemoAccountsBtn");y&&(y.onclick=async()=>{if(confirm("Load realistic demo invoices, payments, and billing profiles?"))try{y.disabled=!0,y.textContent="Loading demo data…";const r=await N("/accounts/seed-demo",{});g(r.message||"Demo data loaded successfully!"),C()}catch(r){g(r.message,!0),y.disabled=!1,y.textContent="⚡ Seed Demo Data"}});const f=document.getElementById("clearAllAccountsDataBtn");f&&(f.onclick=async()=>{if(confirm(`⚠️ WARNING: Are you sure you want to delete ALL invoices and ALL payments in CI360 Accounts?

This will permanently wipe all transactions. Client billing profiles will remain intact.`))try{f.disabled=!0,f.textContent="Clearing…";const r=await N("/accounts/clear-all",{});g(r.message||"Accounts data cleared successfully"),C()}catch(r){g(r.message,!0),f.disabled=!1,f.innerHTML="<span>🗑️ Delete All Data</span>"}}),document.getElementById("viewAllReceivablesBtn").onclick=()=>{A="receivables",q()},document.getElementById("viewAllInvoicesBtn").onclick=()=>{A="invoices",q()},l.querySelectorAll(".quick-collect-btn").forEach(r=>{r.onclick=()=>{O({clientId:r.dataset.clientId,clientName:r.dataset.clientName,suggestedAmount:Number(r.dataset.pending)||0})}}),l.querySelectorAll(".view-invoice-btn").forEach(r=>{r.onclick=()=>te(r.dataset.id)})}function U(l){return l==="paid"?'<span class="badge green">Paid</span>':l==="partially_paid"?'<span class="badge blue">Partially Paid</span>':l==="overdue"?'<span class="badge red">Overdue</span>':l==="issued"?'<span class="badge amber">Issued</span>':l==="draft"?'<span class="badge gray">Draft</span>':l==="cancelled"?'<span class="badge red">Cancelled</span>':`<span class="badge">${i(l||"—")}</span>`}let Y="all",H="",_="";async function ge(l){let p=`?status=${encodeURIComponent(Y)}`;H&&(p+=`&clientId=${encodeURIComponent(H)}`),_&&(p+=`&search=${encodeURIComponent(_)}`);const e=await P("/accounts/invoices"+p),t=e.reduce((n,w)=>n+(w.totalAmount||0),0),s=e.reduce((n,w)=>n+(w.amountPaid||0),0),m=e.reduce((n,w)=>n+(w.pendingAmount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Total Billed:</span> <strong>${v(t)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Collected:</span> <strong style="color:var(--green-600)">${v(s)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Pending:</span> <strong style="color:var(--amber-600)">${v(m)}</strong>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="invoiceSearchInput" placeholder="Search by invoice #, client name, service…" value="${i(_)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="invoiceClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${G.map(n=>`<option value="${n._id}" ${H===n._id?"selected":""}>${i(n.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","issued","partially_paid","paid","overdue","draft"].map(n=>`
              <button class="btn ghost small invoice-status-filter ${Y===n?"active gold":""}" data-status="${n}">
                ${n==="all"?"All":n.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase())}
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
              ${e.map(n=>`
                <tr>
                  <td style="width:36px;padding-left:16px;text-align:center">
                    <input type="checkbox" class="invoice-select-cb" data-id="${n._id}" data-num="${i(n.invoiceNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--brand-600)">${i(n.invoiceNumber)}</strong>
                  </td>
                  <td><strong>${i(n.clientName)}</strong></td>
                  <td><span class="badge">${n.billingType?n.billingType.toUpperCase():"RETAINER"}</span></td>
                  <td style="font-size:12.5px">${B(n.issueDate)}</td>
                  <td style="font-size:12.5px;color:${n.status==="overdue"?"var(--red-600)":"inherit"}">${B(n.dueDate)}</td>
                  <td class="num" style="font-weight:700">${v(n.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${v(n.amountPaid)}</td>
                  <td class="num" style="font-weight:700;color:${n.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${v(n.pendingAmount)}
                  </td>
                  <td>${U(n.status)}</td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    <button class="btn ghost small view-invoice-btn" data-id="${n._id}" title="View and Print Invoice">👁️ View</button>
                    ${n.pendingAmount>0?`
                      <button class="btn green small pay-invoice-btn" data-id="${n._id}" data-num="${i(n.invoiceNumber)}" data-client-id="${n.clientId}" data-client-name="${i(n.clientName)}" data-pending="${n.pendingAmount}" title="Record Payment">
                        💵 Pay
                      </button>`:""}
                    <button class="btn ghost small edit-invoice-btn" data-id="${n._id}" title="Edit Invoice">✏️</button>
                    <button class="btn danger small delete-invoice-btn" data-id="${n._id}" title="Delete Invoice">🗑️</button>
                  </td>
                </tr>`).join("")||'<tr><td colspan="11"><div class="empty" style="padding:36px">No invoices match the current filters.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;const a=document.getElementById("invoiceSearchInput");let o=null;a.oninput=()=>{clearTimeout(o),o=setTimeout(()=>{_=a.value.trim(),C()},300)},document.getElementById("invoiceClientFilter").onchange=n=>{H=n.target.value,C()},l.querySelectorAll(".invoice-status-filter").forEach(n=>{n.onclick=()=>{Y=n.dataset.status,C()}}),document.getElementById("newInvoiceBtn").onclick=()=>ee();const b=document.getElementById("selectAllInvoicesCb"),x=document.getElementById("thSelectAllInvoices"),c=document.getElementById("invoicesDeselectAllBtn"),h=document.getElementById("invoicesSelectedCounter"),y=document.getElementById("deleteSelectedInvoicesBtn"),f=document.getElementById("deleteInvoicesSelectedCount"),r=document.getElementById("deleteAllInvoicesBtn"),$=l.querySelectorAll(".invoice-select-cb");function T(){const n=Array.from($).filter(k=>k.checked),w=n.length;h&&(h.textContent=`${w} of ${e.length} selected`),f&&(f.textContent=w),w>0?(y&&(y.style.display="inline-flex"),c&&(c.style.display="inline-flex")):(y&&(y.style.display="none"),c&&(c.style.display="none"));const R=$.length>0&&n.length===$.length;b&&(b.checked=R),x&&(x.checked=R)}function d(n){$.forEach(w=>{w.checked=n}),T()}b&&(b.onchange=n=>d(n.target.checked)),x&&(x.onchange=n=>d(n.target.checked)),c&&(c.onclick=()=>d(!1)),$.forEach(n=>{n.onchange=()=>T()}),y&&(y.onclick=async()=>{const n=Array.from($).filter(w=>w.checked).map(w=>w.dataset.id);if(n.length&&confirm(`Are you sure you want to permanently delete the ${n.length} selected invoice(s)? This cannot be undone.`))try{y.disabled=!0,y.textContent="Deleting…";const w=await N("/accounts/invoices/bulk-delete",{ids:n});g(w.message||`Deleted ${n.length} invoice(s)`),C()}catch(w){g(w.message,!0),y.disabled=!1,T()}}),r&&(r.onclick=async()=>{if(!e.length){g("No invoices to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} invoices?

This will permanently remove all invoice records and unlink their payment records. This cannot be undone.`))try{r.disabled=!0,r.textContent="Deleting all…";const n=await N("/accounts/invoices/bulk-delete",{deleteAll:!0});g(n.message||"All invoices have been deleted."),C()}catch(n){g(n.message,!0),r.disabled=!1,r.textContent=`💥 Delete All Invoices (${e.length})`}}),l.querySelectorAll(".view-invoice-btn").forEach(n=>{n.onclick=()=>te(n.dataset.id)}),l.querySelectorAll(".edit-invoice-btn").forEach(n=>{n.onclick=()=>xe(n.dataset.id)}),l.querySelectorAll(".pay-invoice-btn").forEach(n=>{n.onclick=()=>{O({invoiceId:n.dataset.id,invoiceNumber:n.dataset.num,clientId:n.dataset.clientId,clientName:n.dataset.clientName,suggestedAmount:Number(n.dataset.pending)||0})}}),l.querySelectorAll(".delete-invoice-btn").forEach(n=>{n.onclick=async()=>{if(confirm("Are you sure you want to delete this invoice? This cannot be undone."))try{await J("/accounts/invoices/"+n.dataset.id),g("Invoice deleted successfully"),C()}catch(w){g(w.message,!0)}}});const I=document.getElementById("exportInvoicesCsvBtn");I&&(I.onclick=()=>be(e))}function be(l){if(!l||!l.length){g("No invoices to export",!0);return}const p=["Invoice Number","Client Name","Type","Issue Date","Due Date","Subtotal","Tax (18%)","Total Amount","Amount Paid","Pending Amount","Status"],e=l.map(o=>[o.invoiceNumber,`"${(o.clientName||"").replace(/"/g,'""')}"`,o.billingType||"",B(o.issueDate),B(o.dueDate),o.subtotal||0,o.taxAmount||0,o.totalAmount||0,o.amountPaid||0,o.pendingAmount||0,o.status]),t=[p.join(","),...e.map(o=>o.join(","))].join(`
`),s=new Blob([t],{type:"text/csv;charset=utf-8;"}),m=URL.createObjectURL(s),a=document.createElement("a");a.href=m,a.download=`CI360_Invoices_${new Date().toISOString().slice(0,10)}.csv`,a.click(),URL.revokeObjectURL(m),g("Invoices exported to CSV")}async function ee(l){let p="INV-2026-0001";try{const b=await P("/accounts/next-invoice-number");b&&b.invoiceNumber&&(p=b.invoiceNumber)}catch{}const e=new Date;e.setDate(e.getDate()+15);const t=[{description:"Strategic Intelligence & Creative Retainer",serviceId:"",quantity:1,rate:5e4,amount:5e4}],s=j(`
    <div style="max-width:680px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Create New Invoice</h3>
        <span class="badge gold" style="font-family:var(--font-heading);font-size:12px">${i(p)}</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client *</label>
          <select id="modalInvClient" required>
            <option value="">Select client…</option>
            ${G.map(b=>`<option value="${b._id}" ${l===b._id?"selected":""}>${i(b.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Invoice Number</label>
          <input type="text" id="modalInvNum" value="${i(p)}" required>
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
        <textarea id="modalInvNotes" rows="2" style="resize:vertical">Thank you for partnering with COGNITO INNOVO PRIVATE LIMITED.</textarea>
      </div>

      <div class="modal-actions" style="margin-top:18px">
        <button class="btn ghost" id="modalCancelInvBtn">Cancel</button>
        <button class="btn gold" id="modalSaveInvBtn">Create & Issue Invoice</button>
      </div>
    </div>`);let m=[...t];function a(){const b=s.querySelector("#modalItemsContainer");b.innerHTML=m.map((x,c)=>`
      <div style="display:flex;gap:8px;align-items:center;background:var(--bg-card);border:1px solid var(--border-xs);padding:8px 10px;border-radius:var(--r-sm)">
        <div style="flex:2">
          <input type="text" class="item-desc" data-idx="${c}" placeholder="Description / Service" value="${i(x.description)}" style="margin:0;font-size:12px">
        </div>
        <div style="width:70px">
          <input type="number" class="item-qty" data-idx="${c}" placeholder="Qty" min="1" value="${x.quantity}" style="margin:0;font-size:12px;text-align:center">
        </div>
        <div style="width:110px">
          <input type="number" class="item-rate" data-idx="${c}" placeholder="Rate (₹)" min="0" value="${x.rate}" style="margin:0;font-size:12px;text-align:right">
        </div>
        <div style="width:90px;font-weight:700;font-size:12.5px;text-align:right">
          ${v(x.amount)}
        </div>
        <div>
          ${m.length>1?`<button type="button" class="btn danger small remove-item-btn" data-idx="${c}" style="padding:4px 8px">✕</button>`:""}
        </div>
      </div>`).join(""),b.querySelectorAll(".item-desc").forEach(x=>{x.oninput=c=>{m[Number(c.target.dataset.idx)].description=c.target.value}}),b.querySelectorAll(".item-qty").forEach(x=>{x.oninput=c=>{const h=Number(c.target.dataset.idx),y=Number(c.target.value)||1;m[h].quantity=y,m[h].amount=y*(m[h].rate||0),a(),o()}}),b.querySelectorAll(".item-rate").forEach(x=>{x.oninput=c=>{const h=Number(c.target.dataset.idx),y=Number(c.target.value)||0;m[h].rate=y,m[h].amount=(m[h].quantity||1)*y,a(),o()}}),b.querySelectorAll(".remove-item-btn").forEach(x=>{x.onclick=()=>{const c=Number(x.dataset.idx);m.splice(c,1),a(),o()}})}function o(){const b=m.reduce((r,$)=>r+(Number($.amount)||0),0),x=Number(s.querySelector("#modalCalcTaxRate").value)||0,c=Number(s.querySelector("#modalCalcDiscount").value)||0,h=Math.max(0,b-c),y=Math.round(h*(x/100)),f=h+y;s.querySelector("#modalCalcSubtotal").textContent=v(b),s.querySelector("#modalCalcTaxAmount").textContent=v(y),s.querySelector("#modalCalcTotal").textContent=v(f)}s.querySelector("#modalAddItemRowBtn").onclick=()=>{m.push({description:"",serviceId:"",quantity:1,rate:0,amount:0}),a(),o()},s.querySelector("#modalCalcTaxRate").onchange=o,s.querySelector("#modalCalcDiscount").oninput=o,s.querySelector("#modalInvClient").onchange=async b=>{const x=b.target.value;if(x)try{const c=await P("/accounts/billing-profiles").then(h=>h.find(y=>y.clientId===x)?.profile);c&&(c.retainerAmount&&m.length===1&&m[0].rate===5e4&&(m[0].rate=c.retainerAmount,m[0].amount=c.retainerAmount,a(),o()),c.gstin&&(s.querySelector("#modalInvGstin").value=c.gstin),c.billingType&&(s.querySelector("#modalInvType").value=c.billingType))}catch{}},a(),o(),s.querySelector("#modalCancelInvBtn").onclick=()=>s.remove(),s.querySelector("#modalSaveInvBtn").onclick=async()=>{const b=s.querySelector("#modalInvClient").value,x=s.querySelector("#modalInvNum").value.trim(),c=s.querySelector("#modalInvIssueDate").value,h=s.querySelector("#modalInvDueDate").value,y=s.querySelector("#modalInvType").value,f=Number(s.querySelector("#modalCalcTaxRate").value)||0,r=Number(s.querySelector("#modalCalcDiscount").value)||0,$=s.querySelector("#modalInvTerms").value.trim(),T=s.querySelector("#modalInvGstin").value.trim(),d=s.querySelector("#modalInvNotes").value.trim();if(!b){g("Please select a client",!0);return}if(!h){g("Please select a due date",!0);return}if(!m.length||!m.some(n=>n.amount>0)){g("Please provide at least one valid line item with an amount",!0);return}const I={clientId:b,invoiceNumber:x,issueDate:c,dueDate:h,billingType:y,items:m,discount:r,taxRate:f,paymentTerms:$,gstin:T,notes:d};try{const n=s.querySelector("#modalSaveInvBtn");n.disabled=!0,n.textContent="Generating Invoice…",await N("/accounts/invoices",I),g("Invoice created and issued successfully!"),s.remove(),C()}catch(n){g(n.message,!0),s.querySelector("#modalSaveInvBtn").disabled=!1,s.querySelector("#modalSaveInvBtn").textContent="Create & Issue Invoice"}}}async function xe(l){const e=(await P("/accounts/invoices/"+l)).invoice;if(!e)return;const t=j(`
    <div style="max-width:640px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Edit Invoice ${i(e.invoiceNumber)}</h3>
        ${U(e.status)}
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client</label>
          <input type="text" value="${i(e.clientName)}" disabled>
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
        <input type="text" id="editInvTerms" value="${i(e.paymentTerms||"")}">
      </div>

      <div class="field">
        <label>GSTIN</label>
        <input type="text" id="editInvGstin" value="${i(e.gstin||"")}">
      </div>

      <div class="field">
        <label>Notes</label>
        <textarea id="editInvNotes" rows="2">${i(e.notes||"")}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="editCancelBtn">Cancel</button>
        <button class="btn gold" id="editSaveBtn">Save Changes</button>
      </div>
    </div>`);t.querySelector("#editCancelBtn").onclick=()=>t.remove(),t.querySelector("#editSaveBtn").onclick=async()=>{const s={status:t.querySelector("#editInvStatus").value,issueDate:t.querySelector("#editInvIssueDate").value,dueDate:t.querySelector("#editInvDueDate").value,paymentTerms:t.querySelector("#editInvTerms").value.trim(),gstin:t.querySelector("#editInvGstin").value.trim(),notes:t.querySelector("#editInvNotes").value.trim()};try{await K("/accounts/invoices/"+l,s),g("Invoice updated successfully"),t.remove(),C()}catch(m){g(m.message,!0)}}}async function te(l){const p=await P("/accounts/invoices/"+l),e=p.invoice,t=p.payments||[];if(!e)return;const s=j(`
    <div style="max-width:860px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px" class="no-print">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:18px;font-weight:800;color:var(--text-1)">Invoice Details</span>
          ${U(e.status)}
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
            <div class="invoice-number-badge">${i(e.invoiceNumber)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">Date: <strong>${B(e.issueDate)}</strong></div>
            <div style="font-size:12px;color:${e.status==="overdue"?"var(--red-600)":"var(--text-3)"}">
              Due Date: <strong>${B(e.dueDate)}</strong>
            </div>
          </div>
        </div>

        <!-- Bill To Grid -->
        <div class="invoice-grid-details">
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Billed To</div>
            <div style="font-size:16px;font-weight:800;color:var(--text-1)">${i(e.clientName)}</div>
            ${e.gstin?`<div style="font-size:12px;color:var(--text-2);margin-top:2px">GSTIN: <strong>${i(e.gstin)}</strong></div>`:""}
            ${e.billingAddress?`<div style="font-size:12px;color:var(--text-3);margin-top:2px">${i(e.billingAddress)}</div>`:""}
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Payment Status</div>
            <div>${U(e.status)}</div>
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
            ${(e.items||[]).map(a=>`
              <tr>
                <td>
                  <strong>${i(a.description)}</strong>
                  ${a.serviceName?`<div style="font-size:11px;color:var(--text-3)">Service: ${i(a.serviceName)}</div>`:""}
                </td>
                <td style="text-align:center">${a.quantity||1}</td>
                <td style="text-align:right">${v(a.rate)}</td>
                <td style="text-align:right;font-weight:700">${v(a.amount)}</td>
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
            <div>Account Name: <strong>${i(e.bankDetails?.accountName||"COGNITO INNOVO PRIVATE LIMITED")}</strong></div>
            <div>Bank: <strong>${i(e.bankDetails?.bankName||"HDFC Bank")}</strong></div>
            <div>A/C Number: <strong>${i(e.bankDetails?.accountNumber||"50200088992211")}</strong></div>
            <div>IFSC Code: <strong>${i(e.bankDetails?.ifscCode||"HDFC0001234")}</strong></div>
            <div>UPI ID: <strong>${i(e.bankDetails?.upiId||"cognitoinnovo@hdfcbank")}</strong></div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Terms & Conditions</div>
            <div style="line-height:1.4">${i(e.paymentTerms||"Payment due within 15 days of invoice date.")}</div>
            <div style="margin-top:8px;font-style:italic;color:var(--text-4)">${i(e.notes||"")}</div>
          </div>
        </div>
      </div>

      <!-- Linked Payment History (if any) -->
      ${t.length>0?`
        <div style="margin-top:20px" class="no-print">
          <h4 style="font-size:14px;font-weight:800;color:var(--text-1);margin:0 0 10px 0">Linked Payments (${t.length})</h4>
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
                ${t.map(a=>`
                  <tr>
                    <td><strong>${i(a.paymentNumber)}</strong></td>
                    <td>${B(a.paymentDate)}</td>
                    <td><span class="badge">${i(a.paymentMethod)}</span></td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${i(a.referenceId||"—")}</td>
                    <td class="num" style="color:var(--green-600);font-weight:700">${v(a.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`);s.querySelector("#viewModalCloseBtn").onclick=()=>s.remove(),s.querySelector("#viewModalPrintBtn").onclick=()=>{window.print()};const m=s.querySelector("#viewModalPayBtn");m&&(m.onclick=()=>{s.remove(),O({invoiceId:e._id,invoiceNumber:e.invoiceNumber,clientId:e.clientId,clientName:e.clientName,suggestedAmount:e.pendingAmount})})}let Q="all",V="",X="";async function fe(l){let p=`?paymentMethod=${encodeURIComponent(Q)}`;V&&(p+=`&clientId=${encodeURIComponent(V)}`),X&&(p+=`&search=${encodeURIComponent(X)}`);const e=await P("/accounts/payments"+p),t=e.reduce((d,I)=>d+(I.amount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Total Collections:</span> <strong style="color:var(--green-600)">${v(t)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Average Payment:</span> <strong>${v(e.length?t/e.length:0)}</strong>
        </div>
      </div>

      <!-- Filters -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="paymentSearchInput" placeholder="Search by payment #, UTR, client name, invoice…" value="${i(X)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="paymentClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${G.map(d=>`<option value="${d._id}" ${V===d._id?"selected":""}>${i(d.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","bank_transfer","upi","cheque","card","cash"].map(d=>`
              <button class="btn ghost small payment-method-filter ${Q===d?"active gold":""}" data-method="${d}">
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
                    <input type="checkbox" class="payment-select-cb" data-id="${d._id}" data-num="${i(d.paymentNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--green-600)">${i(d.paymentNumber)}</strong>
                  </td>
                  <td><strong>${i(d.clientName)}</strong></td>
                  <td>
                    ${d.invoiceNumber?`<span class="badge blue">${i(d.invoiceNumber)}</span>`:'<span class="muted">Advance / General</span>'}
                  </td>
                  <td style="font-size:12.5px">${B(d.paymentDate)}</td>
                  <td>
                    <span class="badge ${d.paymentMethod==="upi"?"gold":d.paymentMethod==="bank_transfer"?"blue":"green"}">
                      ${d.paymentMethod==="bank_transfer"?"🏦 RTGS/NEFT":d.paymentMethod==="upi"?"📱 UPI":d.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td style="font-family:var(--font-mono);font-size:12px">${i(d.referenceId||"—")}</td>
                  <td class="num" style="font-weight:800;color:var(--green-600);font-size:14px">${v(d.amount)}</td>
                  <td style="font-size:12px;color:var(--text-3)">${i(d.recordedByName||"Accounts")}</td>
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
    </section>`;const s=document.getElementById("paymentSearchInput");let m=null;s.oninput=()=>{clearTimeout(m),m=setTimeout(()=>{X=s.value.trim(),C()},300)},document.getElementById("paymentClientFilter").onchange=d=>{V=d.target.value,C()},l.querySelectorAll(".payment-method-filter").forEach(d=>{d.onclick=()=>{Q=d.dataset.method,C()}}),document.getElementById("newPaymentBtn").onclick=()=>O();const a=document.getElementById("selectAllPaymentsCb"),o=document.getElementById("thSelectAllPayments"),b=document.getElementById("paymentsDeselectAllBtn"),x=document.getElementById("paymentsSelectedCounter"),c=document.getElementById("deleteSelectedPaymentsBtn"),h=document.getElementById("deletePaymentsSelectedCount"),y=document.getElementById("deleteAllPaymentsBtn"),f=l.querySelectorAll(".payment-select-cb");function r(){const d=Array.from(f).filter(w=>w.checked),I=d.length;x&&(x.textContent=`${I} of ${e.length} selected`),h&&(h.textContent=I),I>0?(c&&(c.style.display="inline-flex"),b&&(b.style.display="inline-flex")):(c&&(c.style.display="none"),b&&(b.style.display="none"));const n=f.length>0&&d.length===f.length;a&&(a.checked=n),o&&(o.checked=n)}function $(d){f.forEach(I=>{I.checked=d}),r()}a&&(a.onchange=d=>$(d.target.checked)),o&&(o.onchange=d=>$(d.target.checked)),b&&(b.onclick=()=>$(!1)),f.forEach(d=>{d.onchange=()=>r()}),c&&(c.onclick=async()=>{const d=Array.from(f).filter(I=>I.checked).map(I=>I.dataset.id);if(d.length&&confirm(`Are you sure you want to permanently delete the ${d.length} selected payment(s)? This will restore linked invoice balances.`))try{c.disabled=!0,c.textContent="Deleting…";const I=await N("/accounts/payments/bulk-delete",{ids:d});g(I.message||`Deleted ${d.length} payment(s)`),C()}catch(I){g(I.message,!0),c.disabled=!1,r()}}),y&&(y.onclick=async()=>{if(!e.length){g("No payments to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} payments?

This will restore all invoice balances to pending. This cannot be undone.`))try{y.disabled=!0,y.textContent="Deleting all…";const d=await N("/accounts/payments/bulk-delete",{deleteAll:!0});g(d.message||"All payments have been deleted."),C()}catch(d){g(d.message,!0),y.disabled=!1,y.textContent=`💥 Delete All Payments (${e.length})`}}),l.querySelectorAll(".delete-payment-btn").forEach(d=>{d.onclick=async()=>{if(confirm("Delete this payment record? This will restore the pending amount on the linked invoice."))try{await J("/accounts/payments/"+d.dataset.id),g("Payment deleted and invoice balance restored"),C()}catch(I){g(I.message,!0)}}});const T=document.getElementById("exportPaymentsCsvBtn");T&&(T.onclick=()=>{if(!e.length)return g("No payments to export",!0);const d=["Payment Number","Client Name","Invoice Number","Date","Method","Reference / UTR","Amount","Recorded By"],I=e.map(D=>[D.paymentNumber,`"${(D.clientName||"").replace(/"/g,'""')}"`,D.invoiceNumber||"",B(D.paymentDate),D.paymentMethod,D.referenceId||"",D.amount||0,D.recordedByName||""]),n=[d.join(","),...I.map(D=>D.join(","))].join(`
`),w=new Blob([n],{type:"text/csv;charset=utf-8;"}),R=URL.createObjectURL(w),k=document.createElement("a");k.href=R,k.download=`CI360_Payments_${new Date().toISOString().slice(0,10)}.csv`,k.click(),URL.revokeObjectURL(R),g("Payments exported to CSV")})}async function O(l={}){let p="PAY-2026-0001";try{const o=await P("/accounts/next-payment-number");o&&o.paymentNumber&&(p=o.paymentNumber)}catch{}let e=[];if(l.clientId)try{e=await P(`/accounts/invoices?clientId=${l.clientId}`),e=e.filter(o=>o.pendingAmount>0&&o.status!=="cancelled")}catch{}const t=j(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Record Client Payment</h3>
        <span class="badge green" style="font-family:var(--font-heading);font-size:12px">${i(p)}</span>
      </div>

      <div class="field">
        <label>Client *</label>
        <select id="modalPayClient" required>
          <option value="">Select client…</option>
          ${G.map(o=>`<option value="${o._id}" ${l.clientId===o._id?"selected":""}>${i(o.name)}</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label>Link to Unpaid Invoice (Optional)</label>
        <select id="modalPayInvoice">
          <option value="">General advance / No invoice link</option>
          ${e.map(o=>`
            <option value="${o._id}" data-pending="${o.pendingAmount}" ${l.invoiceId===o._id?"selected":""}>
              ${i(o.invoiceNumber)} — Balance: ${v(o.pendingAmount)} (Total: ${v(o.totalAmount)})
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
    </div>`),s=t.querySelector("#modalPayClient"),m=t.querySelector("#modalPayInvoice"),a=t.querySelector("#modalPayAmount");s.onchange=async()=>{const o=s.value;if(!o){m.innerHTML='<option value="">General advance / No invoice link</option>';return}try{const x=(await P(`/accounts/invoices?clientId=${o}`)||[]).filter(c=>c.pendingAmount>0&&c.status!=="cancelled");m.innerHTML=`
        <option value="">General advance / No invoice link</option>
        ${x.map(c=>`
          <option value="${c._id}" data-pending="${c.pendingAmount}">
            ${i(c.invoiceNumber)} — Balance: ${v(c.pendingAmount)} (Total: ${v(c.totalAmount)})
          </option>`).join("")}`,x.length===1&&!a.value&&(m.value=x[0]._id,a.value=x[0].pendingAmount)}catch{}},m.onchange=()=>{const b=m.options[m.selectedIndex].getAttribute("data-pending");b&&(a.value=b)},t.querySelector("#modalPayCancelBtn").onclick=()=>t.remove(),t.querySelector("#modalPaySaveBtn").onclick=async()=>{const o=s.value,b=m.value||null,x=Number(a.value),c=t.querySelector("#modalPayDate").value,h=t.querySelector("#modalPayMethod").value,y=t.querySelector("#modalPayRef").value.trim(),f=t.querySelector("#modalPayNotes").value.trim();if(!o)return g("Please select a client",!0);if(!x||x<=0)return g("Please enter a valid payment amount",!0);try{const r=t.querySelector("#modalPaySaveBtn");r.disabled=!0,r.textContent="Saving…",await N("/accounts/payments",{clientId:o,invoiceId:b,amount:x,paymentDate:c,paymentMethod:h,referenceId:y,notes:f}),g("Payment recorded successfully!"),t.remove(),C()}catch(r){g(r.message,!0),t.querySelector("#modalPaySaveBtn").disabled=!1,t.querySelector("#modalPaySaveBtn").textContent="Save Payment Receipt"}}}async function he(l){const p=await P("/accounts/receivables"),e=p.reduce((a,o)=>a+(o.pendingAmount||0),0),t=p.reduce((a,o)=>a+(o.overdueAmount||0),0),s=p.filter(a=>a.pendingAmount>0);l.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Pending Amount & Receivables <span class="eyebrow">${s.length} clients with balances</span></h2>
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
          <div class="kpi-value" style="color:var(--red-600)">${v(t)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Exceeded credit payment terms</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Unsettled Clients</span>
            <div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent)">👥</div>
          </div>
          <div class="kpi-value">${s.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Out of ${p.length} total clients</div>
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
              ${p.map(a=>`
                <tr style="${a.pendingAmount>0?"":"opacity:0.65"}">
                  <td style="padding-left:22px">
                    <strong>${i(a.clientName)}</strong>
                    ${a.gstin?`<div style="font-size:11px;color:var(--text-3)">GSTIN: ${i(a.gstin)}</div>`:""}
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
                    ${a.oldestDueDate?B(a.oldestDueDate):'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12px">
                    ${a.lastPaymentDate?`${B(a.lastPaymentDate)} (${v(a.lastPaymentAmount)})`:'<span class="muted">No payments</span>'}
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    ${a.pendingAmount>0?`
                      <button class="btn green small settle-payment-btn" data-client-id="${a.clientId}" data-client-name="${i(a.clientName)}" data-pending="${a.pendingAmount}" title="Record Payment">
                        💵 Collect
                      </button>
                      <button class="btn ghost small reminder-btn" data-client-name="${i(a.clientName)}" data-pending="${a.pendingAmount}" data-overdue="${a.overdueAmount}" data-phone="${i(a.billingPhone||"")}" title="Copy or Send Payment Reminder">
                        💬 Reminder
                      </button>`:'<span class="badge green">Settled</span>'}
                  </td>
                </tr>`).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client records available.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,l.querySelectorAll(".settle-payment-btn").forEach(a=>{a.onclick=()=>{O({clientId:a.dataset.clientId,clientName:a.dataset.clientName,suggestedAmount:Number(a.dataset.pending)||0})}}),l.querySelectorAll(".reminder-btn").forEach(a=>{a.onclick=()=>{Ie({clientName:a.dataset.clientName,pending:Number(a.dataset.pending)||0,overdue:Number(a.dataset.overdue)||0,phone:a.dataset.phone})}});const m=document.getElementById("exportReceivablesCsvBtn");m&&(m.onclick=()=>{if(!p.length)return g("No receivables to export",!0);const a=["Client Name","GSTIN","Total Billed","Total Paid","Pending Balance","Overdue Amount","Oldest Due Date","Last Payment Date","Last Payment Amount"],o=p.map(y=>[`"${(y.clientName||"").replace(/"/g,'""')}"`,y.gstin||"",y.totalBilled||0,y.totalPaid||0,y.pendingAmount||0,y.overdueAmount||0,y.oldestDueDate?B(y.oldestDueDate):"",y.lastPaymentDate?B(y.lastPaymentDate):"",y.lastPaymentAmount||0]),b=[a.join(","),...o.map(y=>y.join(","))].join(`
`),x=new Blob([b],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(x),h=document.createElement("a");h.href=c,h.download=`CI360_Receivables_Statement_${new Date().toISOString().slice(0,10)}.csv`,h.click(),URL.revokeObjectURL(c),g("Receivables statement exported to CSV")})}function Ie({clientName:l,pending:p,overdue:e,phone:t}){const s=`Dear ${l},

Greetings from COGNITO INNOVO PRIVATE LIMITED.

This is a friendly reminder regarding your outstanding account balance of ${v(p)}${e>0?` (including ${v(e)} overdue)`:""}.

Please arrange for the settlement at your earliest convenience to our registered bank account:
- Company: COGNITO INNOVO PRIVATE LIMITED
- Bank: HDFC Bank
- A/C: 50200088992211
- IFSC: HDFC0001234
- UPI: cognitoinnovo@hdfcbank

If you have already processed this remittance, kindly share the UTR / transaction receipt. Thank you for your continued partnership!

Warm regards,
Accounts Department | COGNITO INNOVO PRIVATE LIMITED`,m=j(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:18px">Payment Reminder for ${i(l)}</h3>
        <span class="badge amber" style="font-size:12px">${v(p)} Due</span>
      </div>
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:12px">
        You can copy this formatted payment reminder template to email/chat or launch WhatsApp directly.
      </div>

      <div class="field">
        <label>Reminder Message Template</label>
        <textarea id="reminderTextArea" rows="10" style="font-family:var(--font-mono);font-size:12px;line-height:1.4">${i(s)}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="reminderCloseBtn">Close</button>
        <button class="btn gold" id="reminderCopyBtn">📋 Copy to Clipboard</button>
        <button class="btn green" id="reminderWhatsAppBtn">💬 Open WhatsApp</button>
      </div>
    </div>`);m.querySelector("#reminderCloseBtn").onclick=()=>m.remove(),m.querySelector("#reminderCopyBtn").onclick=()=>{const a=m.querySelector("#reminderTextArea").value;navigator.clipboard.writeText(a).then(()=>{g("Reminder template copied to clipboard!")}).catch(()=>{g("Failed to copy text",!0)})},m.querySelector("#reminderWhatsAppBtn").onclick=()=>{const a=encodeURIComponent(m.querySelector("#reminderTextArea").value),o=(t||"").replace(/[^0-9]/g,""),b=o?`https://wa.me/${o}?text=${a}`:`https://wa.me/?text=${a}`;window.open(b,"_blank")}}async function we(l){const p=await P("/accounts/billing-profiles");l.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Client Billing Profiles <span class="eyebrow">${p.length} clients</span></h2>
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
              ${p.map(e=>{const t=e.profile;return`
                  <tr>
                    <td style="padding-left:22px">
                      <strong>${i(e.clientName)}</strong>
                      ${t.billingEmail?`<div style="font-size:11px;color:var(--text-3)">${i(t.billingEmail)}</div>`:""}
                    </td>
                    <td><span class="badge">${(t.billingType||"retainer").toUpperCase()}</span></td>
                    <td style="font-size:12px;text-transform:capitalize">${i(t.billingCycle||"monthly")}</td>
                    <td class="num" style="font-weight:800;color:var(--brand-600);font-size:14px">
                      ${v(t.retainerAmount||0)}
                    </td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${i(t.gstin||"—")}</td>
                    <td style="font-size:12px">Net ${t.paymentTermsDays||15}d</td>
                    <td>
                      <span class="badge ${t.status==="active"?"green":"amber"}">${i(t.status||"active")}</span>
                    </td>
                    <td class="num" style="padding-right:22px;white-space:nowrap">
                      <button class="btn gold small gen-monthly-inv-btn" data-client-id="${e.clientId}" data-client-name="${i(e.clientName)}" data-amount="${t.retainerAmount||0}" title="Generate this month's invoice">
                        ⚡ Gen Invoice
                      </button>
                      <button class="btn ghost small edit-profile-btn" data-client-id="${e.clientId}" data-client-name="${i(e.clientName)}" title="Edit Billing Setup">
                        ⚙️ Edit
                      </button>
                    </td>
                  </tr>`}).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client billing profiles found.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,l.querySelectorAll(".gen-monthly-inv-btn").forEach(e=>{e.onclick=async()=>{const t=e.dataset.clientName,s=Number(e.dataset.amount)||0;if(confirm(`Generate this month's invoice for ${t} for ${v(s)}?`))try{e.disabled=!0,e.textContent="…",await N(`/accounts/billing-profiles/${e.dataset.clientId}/generate-invoice`,{amount:s}),g(`Invoice generated successfully for ${t}!`),A="invoices",q()}catch(m){g(m.message,!0),e.disabled=!1,e.textContent="⚡ Gen Invoice"}}}),l.querySelectorAll(".edit-profile-btn").forEach(e=>{e.onclick=()=>{const t=p.find(s=>s.clientId===e.dataset.clientId);$e(e.dataset.clientId,e.dataset.clientName,t?t.profile:{})}})}function $e(l,p,e={}){const t=j(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Billing Setup: ${i(p)}</h3>
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
          <input type="text" id="bpGstin" value="${i(e.gstin||"")}" placeholder="e.g. 24AAACC1206M1ZT">
        </div>
        <div class="field">
          <label>PAN Number</label>
          <input type="text" id="bpPan" value="${i(e.panNumber||"")}" placeholder="e.g. AAACC1206M">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Accounts Email</label>
          <input type="email" id="bpEmail" value="${i(e.billingEmail||"")}" placeholder="billing@client.com">
        </div>
        <div class="field">
          <label>Accounts Phone</label>
          <input type="text" id="bpPhone" value="${i(e.billingPhone||"")}" placeholder="+91 98765 43210">
        </div>
      </div>

      <div class="field">
        <label>Billing Address</label>
        <textarea id="bpAddress" rows="2">${i(e.billingAddress||"")}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="bpCancelBtn">Cancel</button>
        <button class="btn gold" id="bpSaveBtn">Save Billing Setup</button>
      </div>
    </div>`);t.querySelector("#bpCancelBtn").onclick=()=>t.remove(),t.querySelector("#bpSaveBtn").onclick=async()=>{const s={billingType:t.querySelector("#bpType").value,billingCycle:t.querySelector("#bpCycle").value,retainerAmount:Number(t.querySelector("#bpAmount").value)||0,paymentTermsDays:Number(t.querySelector("#bpTerms").value)||15,gstin:t.querySelector("#bpGstin").value.trim(),panNumber:t.querySelector("#bpPan").value.trim(),billingEmail:t.querySelector("#bpEmail").value.trim(),billingPhone:t.querySelector("#bpPhone").value.trim(),billingAddress:t.querySelector("#bpAddress").value.trim()};try{await K(`/accounts/billing-profiles/${l}`,s),g("Billing profile saved successfully"),t.remove(),C()}catch(m){g(m.message,!0)}}}async function Ce(l){const p=await P("/accounts/tally/summary"),e=p.config||{},t=p.stats||{totalInvoices:0,totalClients:0,tallyInvoices:0,tallyPayments:0},s=p.lastSync||null,m=p.recentInvoices||[],a=p.recentPayments||[],o=`http://${i(e.serverHost||"localhost")}:${i(e.serverPort||9e3)}`,b=[...m.map(u=>({type:"Sales Invoice",icon:"📄",number:u.invoiceNumber,party:u.clientName,amount:u.totalAmount,date:u.issueDate,badgeClass:"badge blue"})),...a.map(u=>({type:"Payment Receipt",icon:"💵",number:u.paymentNumber,party:u.clientName,amount:u.amount,date:u.paymentDate,badgeClass:"badge green"}))].sort((u,S)=>new Date(S.date)-new Date(u.date)).slice(0,15);l.innerHTML=`
    <section class="block">
      <!-- Header Banner -->
      <div class="accounts-header-banner" style="background:linear-gradient(135deg,rgba(16,185,129,0.15) 0%,rgba(79,70,229,0.12) 100%)">
        <div class="accounts-header-title">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <h2>TallyPrime Silver ➔ CI360 Ingestion</h2>
            <span class="badge green" style="font-size:12px;font-weight:700">One-Way Ingestion: Tally ➔ CI360</span>
            <span class="badge blue" style="font-size:11px">Port ${e.serverPort||9e3} XML Gateway</span>
          </div>
          <div class="accounts-header-subtitle">
            Pull and ingest Sales Vouchers, Payment Receipts, and Client Ledgers directly <strong>FROM TallyPrime into CI360</strong>. Tally remains your primary entry book; CI360 automates tracking, billing analytics, and pending amounts.
          </div>
        </div>
        <div class="accounts-header-actions">
          <button class="btn ghost small" id="tallyTestPingBtn" style="display:inline-flex;align-items:center;gap:6px">
            <span class="status-indicator-dot" id="tallyStatusDot" style="background:var(--amber-500)"></span>
            <span id="tallyStatusText">Check Tally (${e.serverPort||9e3})</span>
          </button>
          <button class="btn gold small" id="tallyTopFetchBtn" style="display:inline-flex;align-items:center;gap:6px">
            <span>⚡ Pull from Tally</span>
          </button>
        </div>
      </div>

      <!-- Live Connection / Import Alert Box -->
      <div id="tallyConnectionAlert" class="card" style="display:none;padding:14px 18px;margin-bottom:20px;border-left:4px solid var(--brand-500)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div style="display:flex;align-items:center;gap:12px">
            <span id="tallyAlertIcon" style="font-size:20px">ℹ️</span>
            <div>
              <strong id="tallyAlertTitle" style="font-size:13px">Tally Sync Notice</strong>
              <div id="tallyAlertMsg" style="font-size:12px;color:var(--text-3);margin-top:2px"></div>
            </div>
          </div>
          <button class="btn ghost small" id="tallyAlertCloseBtn" style="padding:2px 8px;font-size:11px">Dismiss</button>
        </div>
      </div>

      ${s?`
      <!-- Last Sync Banner -->
      <div style="margin-bottom:20px;padding:12px 16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--text-1)">
          <span style="font-size:16px">🕒</span>
          <span><strong>Last Synchronized:</strong> ${B(s.syncedAt)} (${new Date(s.syncedAt).toLocaleTimeString()})</span>
          <span style="color:var(--text-3)">•</span>
          <span class="badge blue" style="font-size:11px">${s.invoicesImported||0} Invoices</span>
          <span class="badge green" style="font-size:11px">${s.paymentsImported||0} Receipts</span>
          <span class="badge gold" style="font-size:11px">${s.clientsCreated||0} Clients</span>
        </div>
        <span style="font-size:11px;color:var(--text-3)">Automated balance reconciliation active</span>
      </div>`:""}

      <!-- KPI Cards -->
      <div class="grid grid-4" style="margin-bottom:24px">
        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Tally Invoices Ingested</span>
            <div class="kpi-icon" style="background:rgba(59,130,246,0.12);color:var(--blue-600)">📄</div>
          </div>
          <div class="kpi-value" style="color:var(--blue-600)">${t.tallyInvoices||0}</div>
          <div class="kpi-sub">Sales vouchers pulled from Tally into CI360</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Tally Receipts Ingested</span>
            <div class="kpi-icon" style="background:rgba(16,185,129,0.12);color:var(--green-600)">💵</div>
          </div>
          <div class="kpi-value" style="color:var(--green-600)">${t.tallyPayments||0}</div>
          <div class="kpi-sub">Receipt entries synced &amp; reconciled</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Total CI360 Invoices</span>
            <div class="kpi-icon" style="background:rgba(245,158,11,0.12);color:var(--amber-600)">📑</div>
          </div>
          <div class="kpi-value">${t.totalInvoices||0}</div>
          <div class="kpi-sub">Across all billing profiles &amp; accounts</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Client Masters</span>
            <div class="kpi-icon" style="background:var(--brand-50);color:var(--brand-600)">👥</div>
          </div>
          <div class="kpi-value">${t.totalClients||0}</div>
          <div class="kpi-sub">Sundry Debtors auto-linked</div>
        </div>
      </div>

      <!-- Main Ingestion Methods (Two Column) -->
      <div class="grid grid-2" style="gap:20px;align-items:start;margin-bottom:24px">
        
        <!-- INGESTION METHOD 1: LIVE PULL FROM TALLY PORT 9000 -->
        <div class="card" style="padding:22px;border:1px solid var(--border-sm);position:relative">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:22px">⚡</span>
              <div>
                <h3 style="margin:0;font-size:16px">Live Pull from TallyPrime</h3>
                <div style="font-size:11.5px;color:var(--text-3)">Automatic HTTP XML Fetch (Port 9000)</div>
              </div>
            </div>
            <span class="badge green">Real-Time</span>
          </div>

          <p style="font-size:12.5px;color:var(--text-2);margin-bottom:16px;line-height:1.5">
            If TallyPrime is open on this computer (or local office network), click below to query Tally's Day Book directly and pull all latest Sales Vouchers, Receipts, and Debtors into CI360 without exporting any files!
          </p>

          <div style="background:var(--bg-2);padding:14px;border-radius:var(--r-sm);border:1px solid var(--border-sm);margin-bottom:18px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:12px;color:var(--text-3)">Target Tally Endpoint:</span>
              <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--brand-600)">${o}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:12px;color:var(--text-3)">Company:</span>
              <span style="font-size:12px;font-weight:600;color:var(--text-1)">${i(e.companyName||"COGNITO INNOVO PRIVATE LIMITED")}</span>
            </div>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn gold" id="tallyLiveFetchBtn" style="flex:1;min-width:200px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:700">
              <span>⚡ Fetch &amp; Ingest from Tally</span>
            </button>
            <button class="btn ghost" id="tallyLivePingBtn" style="display:inline-flex;align-items:center;gap:6px" title="Test if TallyPrime XML server is reachable">
              <span>📡 Ping Port 9000</span>
            </button>
          </div>
        </div>

        <!-- INGESTION METHOD 2: UPLOAD TALLY DAY BOOK XML FILE -->
        <div class="card" style="padding:22px;border:1px solid var(--border-sm)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:22px">📂</span>
              <div>
                <h3 style="margin:0;font-size:16px">Upload Tally XML File</h3>
                <div style="font-size:11.5px;color:var(--text-3)">Works for Offline / Remote Tally</div>
              </div>
            </div>
            <span class="badge blue">Day Book XML</span>
          </div>

          <p style="font-size:12.5px;color:var(--text-2);margin-bottom:16px;line-height:1.5">
            If TallyPrime is on another system or offline, export your Day Book as XML (press <code>Alt + E</code> in Tally) and drop or select the file here. CI360 will instantly parse and import all entries.
          </p>

          <div id="tallyDropzone" style="border:2px dashed var(--border-sm);padding:24px;border-radius:var(--r-sm);text-align:center;background:var(--bg-2);cursor:pointer;transition:all 0.2s ease;margin-bottom:16px">
            <div style="font-size:28px;margin-bottom:6px">📥</div>
            <strong style="font-size:13px;display:block;margin-bottom:4px">Click or Drag &amp; Drop Tally XML File Here</strong>
            <span id="tallySelectedFileName" style="font-size:11.5px;color:var(--text-3)">Accepts .xml exported from TallyPrime Day Book</span>
            <input type="file" id="tallyFileInput" accept=".xml" style="display:none">
          </div>

          <div style="display:flex;justify-content:flex-end">
            <button class="btn green" id="tallyUploadXmlBtn" disabled style="display:inline-flex;align-items:center;gap:8px;font-weight:700">
              <span>📤 Parse &amp; Ingest XML</span>
            </button>
          </div>
        </div>

      </div>

      <!-- RECENT IMPORTED ENTRIES FROM TALLY TABLE -->
      <div class="card" style="margin-bottom:24px;padding:22px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:18px">📋</span>
            <div>
              <h3 style="margin:0;font-size:15px">Recently Ingested Vouchers from Tally</h3>
              <div style="font-size:12px;color:var(--text-3)">Real-time log of entries pulled into CI360</div>
            </div>
          </div>
          <span class="badge gray">${b.length} Recent Records</span>
        </div>

        ${b.length===0?`
          <div class="empty" style="padding:36px 20px;text-align:center">
            <div style="font-size:32px;margin-bottom:8px">🏛️</div>
            <h4 style="margin:0 0 6px 0;font-size:14px">No entries ingested from Tally yet</h4>
            <p style="font-size:12.5px;color:var(--text-3);margin:0 0 16px 0">
              Click <strong>⚡ Fetch &amp; Ingest from Tally</strong> above or upload an exported Day Book XML file to pull your vouchers.
            </p>
          </div>
        `:`
          <div class="table-responsive">
            <table class="table" style="width:100%;font-size:12.5px">
              <thead>
                <tr>
                  <th style="width:110px">Date</th>
                  <th style="width:150px">Voucher Type</th>
                  <th style="width:180px">Voucher / Bill #</th>
                  <th>Client / Ledger Party</th>
                  <th style="text-align:right;width:140px">Amount</th>
                  <th style="text-align:center;width:120px">Source</th>
                </tr>
              </thead>
              <tbody>
                ${b.map(u=>`
                  <tr>
                    <td>${B(u.date)}</td>
                    <td>
                      <span class="${u.badgeClass}" style="display:inline-flex;align-items:center;gap:4px">
                        <span>${u.icon}</span>
                        <span>${u.type}</span>
                      </span>
                    </td>
                    <td style="font-family:var(--font-mono);font-weight:600">${i(u.number)}</td>
                    <td><strong>${i(u.party||"—")}</strong></td>
                    <td style="text-align:right;font-weight:700">${v(u.amount)}</td>
                    <td style="text-align:center">
                      <span class="badge green" style="font-size:10.5px">TallyPrime</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- 3 EASY STEPS GUIDE FOR EKTA / ACCOUNTS -->
      <div class="card" style="padding:22px;background:var(--bg-card);margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <span style="font-size:20px">📖</span>
          <div>
            <h3 style="margin:0;font-size:16px">How to Take Entries from Tally into CI360 (Easy Steps)</h3>
            <div style="font-size:12.5px;color:var(--text-3)">Simple non-technical guide for Ekta and the accounts team:</div>
          </div>
        </div>

        <div class="grid grid-3" style="gap:16px">
          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:18px;border-radius:var(--r-sm)">
            <div style="font-size:24px;font-weight:900;color:var(--brand-500);margin-bottom:8px">1</div>
            <strong style="font-size:13.5px;display:block;margin-bottom:6px">Record Entries in Tally</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.5">
              Ekta continues doing regular accounting in TallyPrime Silver (creating Sales invoices and Bank/Cash Receipts as usual).
            </p>
          </div>

          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:18px;border-radius:var(--r-sm)">
            <div style="font-size:24px;font-weight:900;color:var(--brand-500);margin-bottom:8px">2</div>
            <strong style="font-size:13.5px;display:block;margin-bottom:6px">Option A: Live Pull (Recommended)</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.5">
              Keep Tally open on port 9000. In CI360, just click <strong>⚡ Fetch &amp; Ingest from Tally</strong>. CI360 automatically connects and fetches your latest vouchers!
            </p>
          </div>

          <div style="background:var(--bg-2);border:1px solid var(--border-sm);padding:18px;border-radius:var(--r-sm)">
            <div style="font-size:24px;font-weight:900;color:var(--brand-500);margin-bottom:8px">3</div>
            <strong style="font-size:13.5px;display:block;margin-bottom:6px">Option B: Export XML from Tally</strong>
            <p style="font-size:12px;color:var(--text-3);margin:0;line-height:1.5">
              In Tally, press <strong>Alt + G → Day Book</strong>, then press <strong>Alt + E (Export) → XML</strong>. Drop that XML file into CI360's file uploader above!
            </p>
          </div>
        </div>

        <div style="margin-top:18px;padding:12px 16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:var(--r-sm);font-size:12px;color:var(--text-2);display:flex;align-items:center;gap:10px">
          <span style="font-size:16px">💡</span>
          <span>
            <strong>To enable XML Gateway in TallyPrime:</strong> Press <code>F1 (Help) → Settings → Connectivity → Client/Server configuration</code>. Set <em>Enable ODBC</em> and <em>Enable XML Server</em> to <strong>Yes</strong> with Port <strong>9000</strong>.
          </span>
        </div>
      </div>

      <!-- TALLY CONFIGURATION SETTINGS (COLLAPSIBLE / CLEAN) -->
      <div class="card" style="padding:20px">
        <details>
          <summary style="cursor:pointer;font-weight:700;font-size:14px;color:var(--text-1);display:flex;align-items:center;gap:8px">
            <span>⚙️ Tally Server &amp; Gateway Settings</span>
            <span style="font-size:12px;color:var(--text-3);font-weight:normal">(Click to view/edit host, port and company name)</span>
          </summary>

          <form id="tallyConfigForm" onsubmit="return false;" style="margin-top:16px">
            <div class="field-row" style="margin-bottom:12px">
              <div class="field" style="flex:2">
                <label>Company Name in Tally</label>
                <input type="text" id="tallyCompanyName" value="${i(e.companyName||"COGNITO INNOVO PRIVATE LIMITED")}">
              </div>
              <div class="field" style="flex:1">
                <label>Tally Server Host</label>
                <input type="text" id="tallyServerHost" value="${i(e.serverHost||"localhost")}">
              </div>
              <div class="field" style="flex:1">
                <label>XML Server Port</label>
                <input type="number" id="tallyServerPort" value="${e.serverPort||9e3}">
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;margin-top:12px">
              <button class="btn gold small" id="tallySaveConfigBtn">💾 Save Settings</button>
            </div>
          </form>
        </details>
      </div>

    </section>`;const x=document.getElementById("tallyTestPingBtn"),c=document.getElementById("tallyLivePingBtn"),h=document.getElementById("tallyStatusDot"),y=document.getElementById("tallyStatusText"),f=document.getElementById("tallyConnectionAlert"),r=document.getElementById("tallyAlertTitle"),$=document.getElementById("tallyAlertMsg"),T=document.getElementById("tallyAlertIcon");async function d(){y.textContent="Pinging Tally…",h.style.background="var(--amber-500)";try{const u=(document.getElementById("tallyServerHost")?document.getElementById("tallyServerHost").value.trim():e.serverHost)||"localhost",S=Number(document.getElementById("tallyServerPort")?document.getElementById("tallyServerPort").value:e.serverPort)||9e3,M=await N("/accounts/tally/test-connection",{serverHost:u,serverPort:S});f.style.display="block",M.connected?(h.style.background="var(--green-500)",y.textContent=`Tally Online (${S})`,f.style.borderLeftColor="var(--green-500)",T.textContent="✅",r.textContent="TallyPrime Server Connected",$.textContent=M.message,g("Connected to TallyPrime Silver on port "+S)):(h.style.background="var(--red-500)",y.textContent=`Tally Offline (${S})`,f.style.borderLeftColor="var(--amber-500)",T.textContent="⚠️",r.textContent="TallyPrime XML Server Not Detected on Port "+S,$.textContent=`${M.message} ${M.instructions||"You can still use Upload XML File anytime!"}`)}catch(u){h.style.background="var(--red-500)",y.textContent="Tally Offline",f.style.display="block",f.style.borderLeftColor="var(--red-500)",T.textContent="❌",r.textContent="Connection Error",$.textContent=u.message}}x&&(x.onclick=d),c&&(c.onclick=d);const I=document.getElementById("tallyAlertCloseBtn");I&&(I.onclick=()=>{f.style.display="none"});async function n(){const u=document.getElementById("tallyLiveFetchBtn"),S=document.getElementById("tallyTopFetchBtn"),M=u?u.innerHTML:"";try{u&&(u.disabled=!0,u.innerHTML='<span class="spinner" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:6px"></span> Ingesting from Tally…'),S&&(S.disabled=!0),g("Connecting to TallyPrime port "+(e.serverPort||9e3)+" and fetching Day Book vouchers…");const F=await N("/accounts/tally/fetch-from-tally",{serverHost:e.serverHost||"localhost",serverPort:e.serverPort||9e3});f.style.display="block",f.style.borderLeftColor="var(--green-500)",T.textContent="🎉",r.textContent="Tally Entries Ingested Successfully!",$.textContent=F.message,g(F.message),setTimeout(()=>C(),1200)}catch(F){f.style.display="block",f.style.borderLeftColor="var(--amber-500)",T.textContent="⚠️",r.textContent="Tally Ingestion Notice",$.textContent=`${F.message}. If Tally is running on a different computer, export your Day Book as XML and use the "Upload Tally XML File" option!`,g(F.message,!0)}finally{u&&(u.disabled=!1,u.innerHTML=M),S&&(S.disabled=!1)}}const w=document.getElementById("tallyLiveFetchBtn");w&&(w.onclick=n);const R=document.getElementById("tallyTopFetchBtn");R&&(R.onclick=n);const k=document.getElementById("tallyDropzone"),D=document.getElementById("tallyFileInput"),ne=document.getElementById("tallySelectedFileName"),z=document.getElementById("tallyUploadXmlBtn");let W=null;k&&D&&(k.onclick=()=>D.click(),k.ondragover=u=>{u.preventDefault(),k.style.borderColor="var(--brand-500)",k.style.background="rgba(79,70,229,0.05)"},k.ondragleave=()=>{k.style.borderColor="var(--border-sm)",k.style.background="var(--bg-2)"},k.ondrop=u=>{u.preventDefault(),k.style.borderColor="var(--border-sm)",k.style.background="var(--bg-2)",u.dataTransfer.files&&u.dataTransfer.files.length&&Z(u.dataTransfer.files[0])},D.onchange=u=>{u.target.files&&u.target.files.length&&Z(u.target.files[0])});function Z(u){if(!u.name.toLowerCase().endsWith(".xml")){g("Please select a valid Tally .xml file",!0);return}ne.innerHTML=`<strong style="color:var(--brand-600)">📄 ${i(u.name)}</strong> (${(u.size/1024).toFixed(1)} KB)`;const S=new FileReader;S.onload=M=>{W=M.target.result,z&&(z.disabled=!1,z.classList.add("gold"),z.classList.remove("green")),g('XML file loaded. Click "Parse & Ingest XML" to import.')},S.readAsText(u)}z&&(z.onclick=async()=>{if(!W){g("Please select an XML file first",!0);return}try{z.disabled=!0,z.textContent="Parsing XML & Ingesting…";const u=await N("/accounts/tally/import-xml-file",{xmlContent:W});f.style.display="block",f.style.borderLeftColor="var(--green-500)",T.textContent="🎉",r.textContent="Tally XML Ingested Successfully!",$.textContent=u.message,g(u.message),setTimeout(()=>C(),1200)}catch(u){f.style.display="block",f.style.borderLeftColor="var(--red-500)",T.textContent="❌",r.textContent="XML Ingestion Error",$.textContent=u.message,g(u.message,!0),z.disabled=!1,z.textContent="📤 Parse & Ingest XML"}});const L=document.getElementById("tallySaveConfigBtn");L&&(L.onclick=async()=>{const u={companyName:document.getElementById("tallyCompanyName").value.trim(),serverHost:document.getElementById("tallyServerHost").value.trim()||"localhost",serverPort:Number(document.getElementById("tallyServerPort").value)||9e3};try{L.disabled=!0,L.textContent="Saving…",await K("/accounts/tally/config",u),g("Tally settings saved!"),L.disabled=!1,L.textContent="💾 Save Settings"}catch(S){g(S.message,!0),L.disabled=!1,L.textContent="💾 Save Settings"}}),setTimeout(d,600)}window.addEventListener("ci360:dataUpdated",()=>{const l=document.activeElement,p=l&&(l.tagName==="INPUT"||l.tagName==="TEXTAREA"||l.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, .modal");!p&&!e&&C()});me();
