import{r as le,b as ie,e as i,i as se,a as oe,c as B,f as c,d as A,g as N,h as b,j as ee,k as Z,o as j}from"./api-BsUU16QT.js";let E=null,D="overview",G=[],de=[];const Y=[{key:"overview",label:"Overview",icon:"📊"},{key:"invoices",label:"Invoices",icon:"📄"},{key:"payments",label:"Payments",icon:"💵"},{key:"receivables",label:"Pending & Receivables",icon:"⏳"},{key:"billing",label:"Billing Profiles",icon:"⚙️"},{key:"tally",label:"TallyPrime Silver",icon:"🏛️"}];async function re(){if(se(),E=oe("accounts"),!!E){try{const[l,v]=await Promise.all([B("/clients").catch(()=>[]),B("/services").catch(()=>[])]);G=l||[],de=v||[]}catch(l){console.error("Failed to load initial metadata",l)}q()}}function q(){const l=document.getElementById("app"),v=Y.find(e=>e.key===D)||Y[0];l.innerHTML=le({user:E,currentRole:"accounts",activeTab:D,tabs:Y,title:v.label,subtitle:"Billing, Invoicing & Receivables Intelligence"}),ie(e=>{D=e,q()}),k()}window.ci360NavTab=l=>{D=l,q()};async function k(){const l=document.getElementById("content");if(l){l.innerHTML=`
    <div style="display:flex;justify-content:center;align-items:center;min-height:240px">
      <div class="spinner"></div>
    </div>`;try{D==="overview"?await ce(l):D==="invoices"?await pe(l):D==="payments"?await ye(l):D==="receivables"?await ue(l):D==="billing"?await be(l):D==="tally"&&await fe(l)}catch(v){l.innerHTML=`
      <div class="empty" style="padding:48px 24px">
        <h3 style="color:var(--s-red-text);margin-bottom:8px">Unable to load accounts data</h3>
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px">${i(v.message)}</p>
        <button class="btn gold small" id="retryAccountsBtn">Retry</button>
      </div>`;const e=document.getElementById("retryAccountsBtn");e&&(e.onclick=()=>k())}}}async function ce(l){var w,C;const v=await B("/accounts/dashboard"),e=v.metrics||{},n=v.aging||{current:0,days31to60:0,days61to90:0,days90plus:0},o=n.current+n.days31to60+n.days61to90+n.days90plus||1,p=Math.round(n.current/o*100),a=Math.round(n.days31to60/o*100),s=Math.round(n.days61to90/o*100),g=Math.max(0,100-(p+a+s)),x=E&&(/ekta/i.test(E.name)||/ekta/i.test(E.email)),r=E&&(E.role==="superadmin"||E.role==="admin"),f=x||r||E&&E.personnelId;l.innerHTML=`
    <section class="block">
      <div class="accounts-header-banner">
        <div class="accounts-header-title">
          <h2>Accounts & Finance Hub ${x?'<span class="badge" style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:12px;margin-left:8px;vertical-align:middle;padding:4px 8px;border-radius:6px">Ekta · Finance Manager</span>':""}</h2>
          <div class="accounts-header-subtitle">Real-time revenue tracking, invoice lifecycle, and client pending balances.</div>
        </div>
        <div class="accounts-header-actions">
          ${r?`
            <a href="/admin" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
              <span>← Admin Portal</span>
            </a>`:""}
          ${f?`
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
          <div class="kpi-value">${c(e.totalBilled||0)}</div>
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
          <div class="kpi-value" style="color:var(--green-600)">${c(e.totalReceived||0)}</div>
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
          <div class="kpi-value" style="color:var(--amber-600)">${c(e.totalPending||0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge amber">${(((w=e.invoiceCounts)==null?void 0:w.partially_paid)||0)+(((C=e.invoiceCounts)==null?void 0:C.issued)||0)} Invoices</span>
            <span>Awaiting full settlement</span>
          </div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Overdue Amount</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${c(e.totalOverdue||0)}</div>
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
            <span class="badge gold">${c(e.totalPending||0)} Pending</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">Visual distribution of pending receivables based on invoice due dates.</div>
          
          <div class="aging-bar-container">
            <div class="aging-segment current" style="width:${p}%" title="0-30 Days: ${c(n.current)}"></div>
            <div class="aging-segment days31to60" style="width:${a}%" title="31-60 Days: ${c(n.days31to60)}"></div>
            <div class="aging-segment days61to90" style="width:${s}%" title="61-90 Days: ${c(n.days61to90)}"></div>
            <div class="aging-segment days90plus" style="width:${g}%" title="90+ Days: ${c(n.days90plus)}"></div>
          </div>

          <div class="aging-legend">
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--green-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">0 - 30 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${c(n.current)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--amber-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">31 - 60 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${c(n.days31to60)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:#F97316"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">61 - 90 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${c(n.days61to90)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--red-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">90+ Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--red-600)">${c(n.days90plus)}</div>
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
            ${(v.monthlyTrend||[]).map(y=>{const d=Math.max(...(v.monthlyTrend||[]).map(I=>Math.max(I.billed,I.collected)),1e3),$=Math.round(y.billed/d*100),t=Math.round(y.collected/d*100);return`
                <div style="display:flex;align-items:center;gap:12px;font-size:12px">
                  <span style="width:50px;font-weight:700;color:var(--text-2)">${y.month}</span>
                  <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--brand-500);width:${Math.max(4,$)}%;border-radius:4px" title="Billed: ${c(y.billed)}"></div>
                      <span style="font-size:10.5px;color:var(--text-3);min-width:60px">${c(y.billed)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--green-500);width:${Math.max(4,t)}%;border-radius:4px" title="Collected: ${c(y.collected)}"></div>
                      <span style="font-size:10.5px;color:var(--green-600);font-weight:600;min-width:60px">${c(y.collected)}</span>
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
                ${(v.topClientsPending||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${i(y.clientName)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${y.invoiceCount} invoices</div>
                    </td>
                    <td class="num" style="font-weight:700;color:var(--amber-600)">${c(y.pendingAmount)}</td>
                    <td class="num">
                      ${y.overdueAmount>0?`<span class="badge red">${c(y.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                    </td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn green small quick-collect-btn" data-client-id="${y.clientId}" data-client-name="${i(y.clientName)}" data-pending="${y.pendingAmount}">
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
                ${(v.recentInvoices||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${i(y.invoiceNumber)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${A(y.issueDate)}</div>
                    </td>
                    <td>${i(y.clientName)}</td>
                    <td class="num" style="font-weight:700">${c(y.totalAmount)}</td>
                    <td>${U(y.status)}</td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn ghost small view-invoice-btn" data-id="${y._id}">View</button>
                    </td>
                  </tr>`).join("")||'<tr><td colspan="5"><div class="empty" style="padding:24px">No invoices generated yet.</div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`,document.getElementById("quickNewInvoiceBtn").onclick=()=>te(),document.getElementById("quickRecordPaymentBtn").onclick=()=>O();const m=document.getElementById("seedDemoAccountsBtn");m&&(m.onclick=async()=>{if(confirm("Load realistic demo invoices, payments, and billing profiles?"))try{m.disabled=!0,m.textContent="Loading demo data…";const y=await N("/accounts/seed-demo",{});b(y.message||"Demo data loaded successfully!"),k()}catch(y){b(y.message,!0),m.disabled=!1,m.textContent="⚡ Seed Demo Data"}});const h=document.getElementById("clearAllAccountsDataBtn");h&&(h.onclick=async()=>{if(confirm(`⚠️ WARNING: Are you sure you want to delete ALL invoices and ALL payments in CI360 Accounts?

This will permanently wipe all transactions. Client billing profiles will remain intact.`))try{h.disabled=!0,h.textContent="Clearing…";const y=await N("/accounts/clear-all",{});b(y.message||"Accounts data cleared successfully"),k()}catch(y){b(y.message,!0),h.disabled=!1,h.innerHTML="<span>🗑️ Delete All Data</span>"}}),document.getElementById("viewAllReceivablesBtn").onclick=()=>{D="receivables",q()},document.getElementById("viewAllInvoicesBtn").onclick=()=>{D="invoices",q()},l.querySelectorAll(".quick-collect-btn").forEach(y=>{y.onclick=()=>{O({clientId:y.dataset.clientId,clientName:y.dataset.clientName,suggestedAmount:Number(y.dataset.pending)||0})}}),l.querySelectorAll(".view-invoice-btn").forEach(y=>{y.onclick=()=>ne(y.dataset.id)})}function U(l){return l==="paid"?'<span class="badge green">Paid</span>':l==="partially_paid"?'<span class="badge blue">Partially Paid</span>':l==="overdue"?'<span class="badge red">Overdue</span>':l==="issued"?'<span class="badge amber">Issued</span>':l==="draft"?'<span class="badge gray">Draft</span>':l==="cancelled"?'<span class="badge red">Cancelled</span>':`<span class="badge">${i(l||"—")}</span>`}let Q="all",H="",_="";async function pe(l){let v=`?status=${encodeURIComponent(Q)}`;H&&(v+=`&clientId=${encodeURIComponent(H)}`),_&&(v+=`&search=${encodeURIComponent(_)}`);const e=await B("/accounts/invoices"+v),n=e.reduce((t,I)=>t+(I.totalAmount||0),0),o=e.reduce((t,I)=>t+(I.amountPaid||0),0),p=e.reduce((t,I)=>t+(I.pendingAmount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Total Billed:</span> <strong>${c(n)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Collected:</span> <strong style="color:var(--green-600)">${c(o)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Pending:</span> <strong style="color:var(--amber-600)">${c(p)}</strong>
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
              ${G.map(t=>`<option value="${t._id}" ${H===t._id?"selected":""}>${i(t.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","issued","partially_paid","paid","overdue","draft"].map(t=>`
              <button class="btn ghost small invoice-status-filter ${Q===t?"active gold":""}" data-status="${t}">
                ${t==="all"?"All":t.replace("_"," ").replace(/\b\w/g,I=>I.toUpperCase())}
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
                    <input type="checkbox" class="invoice-select-cb" data-id="${t._id}" data-num="${i(t.invoiceNumber)}" style="width:16px;height:16px;cursor:pointer;margin:0">
                  </td>
                  <td>
                    <strong style="font-family:var(--font-heading);color:var(--brand-600)">${i(t.invoiceNumber)}</strong>
                  </td>
                  <td><strong>${i(t.clientName)}</strong></td>
                  <td><span class="badge">${t.billingType?t.billingType.toUpperCase():"RETAINER"}</span></td>
                  <td style="font-size:12.5px">${A(t.issueDate)}</td>
                  <td style="font-size:12.5px;color:${t.status==="overdue"?"var(--red-600)":"inherit"}">${A(t.dueDate)}</td>
                  <td class="num" style="font-weight:700">${c(t.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${c(t.amountPaid)}</td>
                  <td class="num" style="font-weight:700;color:${t.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${c(t.pendingAmount)}
                  </td>
                  <td>${U(t.status)}</td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    <button class="btn ghost small view-invoice-btn" data-id="${t._id}" title="View and Print Invoice">👁️ View</button>
                    ${t.pendingAmount>0?`
                      <button class="btn green small pay-invoice-btn" data-id="${t._id}" data-num="${i(t.invoiceNumber)}" data-client-id="${t.clientId}" data-client-name="${i(t.clientName)}" data-pending="${t.pendingAmount}" title="Record Payment">
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
    </section>`;const a=document.getElementById("invoiceSearchInput");let s=null;a.oninput=()=>{clearTimeout(s),s=setTimeout(()=>{_=a.value.trim(),k()},300)},document.getElementById("invoiceClientFilter").onchange=t=>{H=t.target.value,k()},l.querySelectorAll(".invoice-status-filter").forEach(t=>{t.onclick=()=>{Q=t.dataset.status,k()}}),document.getElementById("newInvoiceBtn").onclick=()=>te();const g=document.getElementById("selectAllInvoicesCb"),x=document.getElementById("thSelectAllInvoices"),r=document.getElementById("invoicesDeselectAllBtn"),f=document.getElementById("invoicesSelectedCounter"),m=document.getElementById("deleteSelectedInvoicesBtn"),h=document.getElementById("deleteInvoicesSelectedCount"),w=document.getElementById("deleteAllInvoicesBtn"),C=l.querySelectorAll(".invoice-select-cb");function y(){const t=Array.from(C).filter(T=>T.checked),I=t.length;f&&(f.textContent=`${I} of ${e.length} selected`),h&&(h.textContent=I),I>0?(m&&(m.style.display="inline-flex"),r&&(r.style.display="inline-flex")):(m&&(m.style.display="none"),r&&(r.style.display="none"));const R=C.length>0&&t.length===C.length;g&&(g.checked=R),x&&(x.checked=R)}function d(t){C.forEach(I=>{I.checked=t}),y()}g&&(g.onchange=t=>d(t.target.checked)),x&&(x.onchange=t=>d(t.target.checked)),r&&(r.onclick=()=>d(!1)),C.forEach(t=>{t.onchange=()=>y()}),m&&(m.onclick=async()=>{const t=Array.from(C).filter(I=>I.checked).map(I=>I.dataset.id);if(t.length&&confirm(`Are you sure you want to permanently delete the ${t.length} selected invoice(s)? This cannot be undone.`))try{m.disabled=!0,m.textContent="Deleting…";const I=await N("/accounts/invoices/bulk-delete",{ids:t});b(I.message||`Deleted ${t.length} invoice(s)`),k()}catch(I){b(I.message,!0),m.disabled=!1,y()}}),w&&(w.onclick=async()=>{if(!e.length){b("No invoices to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} invoices?

This will permanently remove all invoice records and unlink their payment records. This cannot be undone.`))try{w.disabled=!0,w.textContent="Deleting all…";const t=await N("/accounts/invoices/bulk-delete",{deleteAll:!0});b(t.message||"All invoices have been deleted."),k()}catch(t){b(t.message,!0),w.disabled=!1,w.textContent=`💥 Delete All Invoices (${e.length})`}}),l.querySelectorAll(".view-invoice-btn").forEach(t=>{t.onclick=()=>ne(t.dataset.id)}),l.querySelectorAll(".edit-invoice-btn").forEach(t=>{t.onclick=()=>me(t.dataset.id)}),l.querySelectorAll(".pay-invoice-btn").forEach(t=>{t.onclick=()=>{O({invoiceId:t.dataset.id,invoiceNumber:t.dataset.num,clientId:t.dataset.clientId,clientName:t.dataset.clientName,suggestedAmount:Number(t.dataset.pending)||0})}}),l.querySelectorAll(".delete-invoice-btn").forEach(t=>{t.onclick=async()=>{if(confirm("Are you sure you want to delete this invoice? This cannot be undone."))try{await ee("/accounts/invoices/"+t.dataset.id),b("Invoice deleted successfully"),k()}catch(I){b(I.message,!0)}}});const $=document.getElementById("exportInvoicesCsvBtn");$&&($.onclick=()=>ve(e))}function ve(l){if(!l||!l.length){b("No invoices to export",!0);return}const v=["Invoice Number","Client Name","Type","Issue Date","Due Date","Subtotal","Tax (18%)","Total Amount","Amount Paid","Pending Amount","Status"],e=l.map(s=>[s.invoiceNumber,`"${(s.clientName||"").replace(/"/g,'""')}"`,s.billingType||"",A(s.issueDate),A(s.dueDate),s.subtotal||0,s.taxAmount||0,s.totalAmount||0,s.amountPaid||0,s.pendingAmount||0,s.status]),n=[v.join(","),...e.map(s=>s.join(","))].join(`
`),o=new Blob([n],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(o),a=document.createElement("a");a.href=p,a.download=`CI360_Invoices_${new Date().toISOString().slice(0,10)}.csv`,a.click(),URL.revokeObjectURL(p),b("Invoices exported to CSV")}async function te(l){let v="INV-2026-0001";try{const g=await B("/accounts/next-invoice-number");g&&g.invoiceNumber&&(v=g.invoiceNumber)}catch{}const e=new Date;e.setDate(e.getDate()+15);const n=[{description:"Strategic Intelligence & Creative Retainer",serviceId:"",quantity:1,rate:5e4,amount:5e4}],o=j(`
    <div style="max-width:680px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Create New Invoice</h3>
        <span class="badge gold" style="font-family:var(--font-heading);font-size:12px">${i(v)}</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client *</label>
          <select id="modalInvClient" required>
            <option value="">Select client…</option>
            ${G.map(g=>`<option value="${g._id}" ${l===g._id?"selected":""}>${i(g.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Invoice Number</label>
          <input type="text" id="modalInvNum" value="${i(v)}" required>
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
    </div>`);let p=[...n];function a(){const g=o.querySelector("#modalItemsContainer");g.innerHTML=p.map((x,r)=>`
      <div style="display:flex;gap:8px;align-items:center;background:var(--bg-card);border:1px solid var(--border-xs);padding:8px 10px;border-radius:var(--r-sm)">
        <div style="flex:2">
          <input type="text" class="item-desc" data-idx="${r}" placeholder="Description / Service" value="${i(x.description)}" style="margin:0;font-size:12px">
        </div>
        <div style="width:70px">
          <input type="number" class="item-qty" data-idx="${r}" placeholder="Qty" min="1" value="${x.quantity}" style="margin:0;font-size:12px;text-align:center">
        </div>
        <div style="width:110px">
          <input type="number" class="item-rate" data-idx="${r}" placeholder="Rate (₹)" min="0" value="${x.rate}" style="margin:0;font-size:12px;text-align:right">
        </div>
        <div style="width:90px;font-weight:700;font-size:12.5px;text-align:right">
          ${c(x.amount)}
        </div>
        <div>
          ${p.length>1?`<button type="button" class="btn danger small remove-item-btn" data-idx="${r}" style="padding:4px 8px">✕</button>`:""}
        </div>
      </div>`).join(""),g.querySelectorAll(".item-desc").forEach(x=>{x.oninput=r=>{p[Number(r.target.dataset.idx)].description=r.target.value}}),g.querySelectorAll(".item-qty").forEach(x=>{x.oninput=r=>{const f=Number(r.target.dataset.idx),m=Number(r.target.value)||1;p[f].quantity=m,p[f].amount=m*(p[f].rate||0),a(),s()}}),g.querySelectorAll(".item-rate").forEach(x=>{x.oninput=r=>{const f=Number(r.target.dataset.idx),m=Number(r.target.value)||0;p[f].rate=m,p[f].amount=(p[f].quantity||1)*m,a(),s()}}),g.querySelectorAll(".remove-item-btn").forEach(x=>{x.onclick=()=>{const r=Number(x.dataset.idx);p.splice(r,1),a(),s()}})}function s(){const g=p.reduce((w,C)=>w+(Number(C.amount)||0),0),x=Number(o.querySelector("#modalCalcTaxRate").value)||0,r=Number(o.querySelector("#modalCalcDiscount").value)||0,f=Math.max(0,g-r),m=Math.round(f*(x/100)),h=f+m;o.querySelector("#modalCalcSubtotal").textContent=c(g),o.querySelector("#modalCalcTaxAmount").textContent=c(m),o.querySelector("#modalCalcTotal").textContent=c(h)}o.querySelector("#modalAddItemRowBtn").onclick=()=>{p.push({description:"",serviceId:"",quantity:1,rate:0,amount:0}),a(),s()},o.querySelector("#modalCalcTaxRate").onchange=s,o.querySelector("#modalCalcDiscount").oninput=s,o.querySelector("#modalInvClient").onchange=async g=>{const x=g.target.value;if(x)try{const r=await B("/accounts/billing-profiles").then(f=>{var m;return(m=f.find(h=>h.clientId===x))==null?void 0:m.profile});r&&(r.retainerAmount&&p.length===1&&p[0].rate===5e4&&(p[0].rate=r.retainerAmount,p[0].amount=r.retainerAmount,a(),s()),r.gstin&&(o.querySelector("#modalInvGstin").value=r.gstin),r.billingType&&(o.querySelector("#modalInvType").value=r.billingType))}catch{}},a(),s(),o.querySelector("#modalCancelInvBtn").onclick=()=>o.remove(),o.querySelector("#modalSaveInvBtn").onclick=async()=>{const g=o.querySelector("#modalInvClient").value,x=o.querySelector("#modalInvNum").value.trim(),r=o.querySelector("#modalInvIssueDate").value,f=o.querySelector("#modalInvDueDate").value,m=o.querySelector("#modalInvType").value,h=Number(o.querySelector("#modalCalcTaxRate").value)||0,w=Number(o.querySelector("#modalCalcDiscount").value)||0,C=o.querySelector("#modalInvTerms").value.trim(),y=o.querySelector("#modalInvGstin").value.trim(),d=o.querySelector("#modalInvNotes").value.trim();if(!g){b("Please select a client",!0);return}if(!f){b("Please select a due date",!0);return}if(!p.length||!p.some(t=>t.amount>0)){b("Please provide at least one valid line item with an amount",!0);return}const $={clientId:g,invoiceNumber:x,issueDate:r,dueDate:f,billingType:m,items:p,discount:w,taxRate:h,paymentTerms:C,gstin:y,notes:d};try{const t=o.querySelector("#modalSaveInvBtn");t.disabled=!0,t.textContent="Generating Invoice…",await N("/accounts/invoices",$),b("Invoice created and issued successfully!"),o.remove(),k()}catch(t){b(t.message,!0),o.querySelector("#modalSaveInvBtn").disabled=!1,o.querySelector("#modalSaveInvBtn").textContent="Create & Issue Invoice"}}}async function me(l){const e=(await B("/accounts/invoices/"+l)).invoice;if(!e)return;const n=j(`
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
    </div>`);n.querySelector("#editCancelBtn").onclick=()=>n.remove(),n.querySelector("#editSaveBtn").onclick=async()=>{const o={status:n.querySelector("#editInvStatus").value,issueDate:n.querySelector("#editInvIssueDate").value,dueDate:n.querySelector("#editInvDueDate").value,paymentTerms:n.querySelector("#editInvTerms").value.trim(),gstin:n.querySelector("#editInvGstin").value.trim(),notes:n.querySelector("#editInvNotes").value.trim()};try{await Z("/accounts/invoices/"+l,o),b("Invoice updated successfully"),n.remove(),k()}catch(p){b(p.message,!0)}}}async function ne(l){var a,s,g,x,r;const v=await B("/accounts/invoices/"+l),e=v.invoice,n=v.payments||[];if(!e)return;const o=j(`
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
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">Date: <strong>${A(e.issueDate)}</strong></div>
            <div style="font-size:12px;color:${e.status==="overdue"?"var(--red-600)":"var(--text-3)"}">
              Due Date: <strong>${A(e.dueDate)}</strong>
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
            <div style="font-size:12px;color:var(--text-3);margin-top:6px">Pending Balance: <strong style="color:${e.pendingAmount>0?"var(--amber-600)":"var(--green-600)"};font-size:14px">${c(e.pendingAmount)}</strong></div>
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
            ${(e.items||[]).map(f=>`
              <tr>
                <td>
                  <strong>${i(f.description)}</strong>
                  ${f.serviceName?`<div style="font-size:11px;color:var(--text-3)">Service: ${i(f.serviceName)}</div>`:""}
                </td>
                <td style="text-align:center">${f.quantity||1}</td>
                <td style="text-align:right">${c(f.rate)}</td>
                <td style="text-align:right;font-weight:700">${c(f.amount)}</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <!-- Totals Wrap -->
        <div class="invoice-totals-wrap">
          <div class="invoice-totals-box">
            <div class="invoice-total-row">
              <span>Subtotal</span>
              <strong>${c(e.subtotal)}</strong>
            </div>
            ${e.discount>0?`
              <div class="invoice-total-row">
                <span>Discount</span>
                <span style="color:var(--green-600)">- ${c(e.discount)}</span>
              </div>`:""}
            <div class="invoice-total-row">
              <span>GST (${e.taxRate||18}%)</span>
              <span>${c(e.taxAmount)}</span>
            </div>
            <div class="invoice-total-row grand-total">
              <span>Total Amount</span>
              <span>${c(e.totalAmount)}</span>
            </div>
            <div class="invoice-total-row" style="padding-top:8px">
              <span>Amount Paid</span>
              <span style="color:var(--green-600);font-weight:700">${c(e.amountPaid)}</span>
            </div>
            <div class="invoice-total-row" style="font-size:15px;font-weight:800;color:${e.pendingAmount>0?"var(--amber-600)":"var(--green-600)"}">
              <span>Pending Amount</span>
              <span>${c(e.pendingAmount)}</span>
            </div>
          </div>
        </div>

        <!-- Bank Details & Terms Footer -->
        <div class="invoice-bank-footer">
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Bank Transfer & UPI Details</div>
            <div>Account Name: <strong>${i(((a=e.bankDetails)==null?void 0:a.accountName)||"COGNITO INNOVO PRIVATE LIMITED")}</strong></div>
            <div>Bank: <strong>${i(((s=e.bankDetails)==null?void 0:s.bankName)||"HDFC Bank")}</strong></div>
            <div>A/C Number: <strong>${i(((g=e.bankDetails)==null?void 0:g.accountNumber)||"50200088992211")}</strong></div>
            <div>IFSC Code: <strong>${i(((x=e.bankDetails)==null?void 0:x.ifscCode)||"HDFC0001234")}</strong></div>
            <div>UPI ID: <strong>${i(((r=e.bankDetails)==null?void 0:r.upiId)||"cognitoinnovo@hdfcbank")}</strong></div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Terms & Conditions</div>
            <div style="line-height:1.4">${i(e.paymentTerms||"Payment due within 15 days of invoice date.")}</div>
            <div style="margin-top:8px;font-style:italic;color:var(--text-4)">${i(e.notes||"")}</div>
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
                ${n.map(f=>`
                  <tr>
                    <td><strong>${i(f.paymentNumber)}</strong></td>
                    <td>${A(f.paymentDate)}</td>
                    <td><span class="badge">${i(f.paymentMethod)}</span></td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${i(f.referenceId||"—")}</td>
                    <td class="num" style="color:var(--green-600);font-weight:700">${c(f.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`);o.querySelector("#viewModalCloseBtn").onclick=()=>o.remove(),o.querySelector("#viewModalPrintBtn").onclick=()=>{window.print()};const p=o.querySelector("#viewModalPayBtn");p&&(p.onclick=()=>{o.remove(),O({invoiceId:e._id,invoiceNumber:e.invoiceNumber,clientId:e.clientId,clientName:e.clientName,suggestedAmount:e.pendingAmount})})}let K="all",V="",X="";async function ye(l){let v=`?paymentMethod=${encodeURIComponent(K)}`;V&&(v+=`&clientId=${encodeURIComponent(V)}`),X&&(v+=`&search=${encodeURIComponent(X)}`);const e=await B("/accounts/payments"+v),n=e.reduce((d,$)=>d+($.amount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Total Collections:</span> <strong style="color:var(--green-600)">${c(n)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Average Payment:</span> <strong>${c(e.length?n/e.length:0)}</strong>
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
              <button class="btn ghost small payment-method-filter ${K===d?"active gold":""}" data-method="${d}">
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
                  <td style="font-size:12.5px">${A(d.paymentDate)}</td>
                  <td>
                    <span class="badge ${d.paymentMethod==="upi"?"gold":d.paymentMethod==="bank_transfer"?"blue":"green"}">
                      ${d.paymentMethod==="bank_transfer"?"🏦 RTGS/NEFT":d.paymentMethod==="upi"?"📱 UPI":d.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td style="font-family:var(--font-mono);font-size:12px">${i(d.referenceId||"—")}</td>
                  <td class="num" style="font-weight:800;color:var(--green-600);font-size:14px">${c(d.amount)}</td>
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
    </section>`;const o=document.getElementById("paymentSearchInput");let p=null;o.oninput=()=>{clearTimeout(p),p=setTimeout(()=>{X=o.value.trim(),k()},300)},document.getElementById("paymentClientFilter").onchange=d=>{V=d.target.value,k()},l.querySelectorAll(".payment-method-filter").forEach(d=>{d.onclick=()=>{K=d.dataset.method,k()}}),document.getElementById("newPaymentBtn").onclick=()=>O();const a=document.getElementById("selectAllPaymentsCb"),s=document.getElementById("thSelectAllPayments"),g=document.getElementById("paymentsDeselectAllBtn"),x=document.getElementById("paymentsSelectedCounter"),r=document.getElementById("deleteSelectedPaymentsBtn"),f=document.getElementById("deletePaymentsSelectedCount"),m=document.getElementById("deleteAllPaymentsBtn"),h=l.querySelectorAll(".payment-select-cb");function w(){const d=Array.from(h).filter(I=>I.checked),$=d.length;x&&(x.textContent=`${$} of ${e.length} selected`),f&&(f.textContent=$),$>0?(r&&(r.style.display="inline-flex"),g&&(g.style.display="inline-flex")):(r&&(r.style.display="none"),g&&(g.style.display="none"));const t=h.length>0&&d.length===h.length;a&&(a.checked=t),s&&(s.checked=t)}function C(d){h.forEach($=>{$.checked=d}),w()}a&&(a.onchange=d=>C(d.target.checked)),s&&(s.onchange=d=>C(d.target.checked)),g&&(g.onclick=()=>C(!1)),h.forEach(d=>{d.onchange=()=>w()}),r&&(r.onclick=async()=>{const d=Array.from(h).filter($=>$.checked).map($=>$.dataset.id);if(d.length&&confirm(`Are you sure you want to permanently delete the ${d.length} selected payment(s)? This will restore linked invoice balances.`))try{r.disabled=!0,r.textContent="Deleting…";const $=await N("/accounts/payments/bulk-delete",{ids:d});b($.message||`Deleted ${d.length} payment(s)`),k()}catch($){b($.message,!0),r.disabled=!1,w()}}),m&&(m.onclick=async()=>{if(!e.length){b("No payments to delete",!0);return}if(confirm(`⚠️ DANGER: Are you sure you want to delete ALL ${e.length} payments?

This will restore all invoice balances to pending. This cannot be undone.`))try{m.disabled=!0,m.textContent="Deleting all…";const d=await N("/accounts/payments/bulk-delete",{deleteAll:!0});b(d.message||"All payments have been deleted."),k()}catch(d){b(d.message,!0),m.disabled=!1,m.textContent=`💥 Delete All Payments (${e.length})`}}),l.querySelectorAll(".delete-payment-btn").forEach(d=>{d.onclick=async()=>{if(confirm("Delete this payment record? This will restore the pending amount on the linked invoice."))try{await ee("/accounts/payments/"+d.dataset.id),b("Payment deleted and invoice balance restored"),k()}catch($){b($.message,!0)}}});const y=document.getElementById("exportPaymentsCsvBtn");y&&(y.onclick=()=>{if(!e.length)return b("No payments to export",!0);const d=["Payment Number","Client Name","Invoice Number","Date","Method","Reference / UTR","Amount","Recorded By"],$=e.map(P=>[P.paymentNumber,`"${(P.clientName||"").replace(/"/g,'""')}"`,P.invoiceNumber||"",A(P.paymentDate),P.paymentMethod,P.referenceId||"",P.amount||0,P.recordedByName||""]),t=[d.join(","),...$.map(P=>P.join(","))].join(`
`),I=new Blob([t],{type:"text/csv;charset=utf-8;"}),R=URL.createObjectURL(I),T=document.createElement("a");T.href=R,T.download=`CI360_Payments_${new Date().toISOString().slice(0,10)}.csv`,T.click(),URL.revokeObjectURL(R),b("Payments exported to CSV")})}async function O(l={}){let v="PAY-2026-0001";try{const s=await B("/accounts/next-payment-number");s&&s.paymentNumber&&(v=s.paymentNumber)}catch{}let e=[];if(l.clientId)try{e=await B(`/accounts/invoices?clientId=${l.clientId}`),e=e.filter(s=>s.pendingAmount>0&&s.status!=="cancelled")}catch{}const n=j(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Record Client Payment</h3>
        <span class="badge green" style="font-family:var(--font-heading);font-size:12px">${i(v)}</span>
      </div>

      <div class="field">
        <label>Client *</label>
        <select id="modalPayClient" required>
          <option value="">Select client…</option>
          ${G.map(s=>`<option value="${s._id}" ${l.clientId===s._id?"selected":""}>${i(s.name)}</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label>Link to Unpaid Invoice (Optional)</label>
        <select id="modalPayInvoice">
          <option value="">General advance / No invoice link</option>
          ${e.map(s=>`
            <option value="${s._id}" data-pending="${s.pendingAmount}" ${l.invoiceId===s._id?"selected":""}>
              ${i(s.invoiceNumber)} — Balance: ${c(s.pendingAmount)} (Total: ${c(s.totalAmount)})
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
    </div>`),o=n.querySelector("#modalPayClient"),p=n.querySelector("#modalPayInvoice"),a=n.querySelector("#modalPayAmount");o.onchange=async()=>{const s=o.value;if(!s){p.innerHTML='<option value="">General advance / No invoice link</option>';return}try{const x=(await B(`/accounts/invoices?clientId=${s}`)||[]).filter(r=>r.pendingAmount>0&&r.status!=="cancelled");p.innerHTML=`
        <option value="">General advance / No invoice link</option>
        ${x.map(r=>`
          <option value="${r._id}" data-pending="${r.pendingAmount}">
            ${i(r.invoiceNumber)} — Balance: ${c(r.pendingAmount)} (Total: ${c(r.totalAmount)})
          </option>`).join("")}`,x.length===1&&!a.value&&(p.value=x[0]._id,a.value=x[0].pendingAmount)}catch{}},p.onchange=()=>{const g=p.options[p.selectedIndex].getAttribute("data-pending");g&&(a.value=g)},n.querySelector("#modalPayCancelBtn").onclick=()=>n.remove(),n.querySelector("#modalPaySaveBtn").onclick=async()=>{const s=o.value,g=p.value||null,x=Number(a.value),r=n.querySelector("#modalPayDate").value,f=n.querySelector("#modalPayMethod").value,m=n.querySelector("#modalPayRef").value.trim(),h=n.querySelector("#modalPayNotes").value.trim();if(!s)return b("Please select a client",!0);if(!x||x<=0)return b("Please enter a valid payment amount",!0);try{const w=n.querySelector("#modalPaySaveBtn");w.disabled=!0,w.textContent="Saving…",await N("/accounts/payments",{clientId:s,invoiceId:g,amount:x,paymentDate:r,paymentMethod:f,referenceId:m,notes:h}),b("Payment recorded successfully!"),n.remove(),k()}catch(w){b(w.message,!0),n.querySelector("#modalPaySaveBtn").disabled=!1,n.querySelector("#modalPaySaveBtn").textContent="Save Payment Receipt"}}}async function ue(l){const v=await B("/accounts/receivables"),e=v.reduce((a,s)=>a+(s.pendingAmount||0),0),n=v.reduce((a,s)=>a+(s.overdueAmount||0),0),o=v.filter(a=>a.pendingAmount>0);l.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Pending Amount & Receivables <span class="eyebrow">${o.length} clients with balances</span></h2>
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
          <div class="kpi-value" style="color:var(--amber-600)">${c(e)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Across all clients</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Critically Overdue</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${c(n)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Exceeded credit payment terms</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Unsettled Clients</span>
            <div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent)">👥</div>
          </div>
          <div class="kpi-value">${o.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Out of ${v.length} total clients</div>
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
              ${v.map(a=>`
                <tr style="${a.pendingAmount>0?"":"opacity:0.65"}">
                  <td style="padding-left:22px">
                    <strong>${i(a.clientName)}</strong>
                    ${a.gstin?`<div style="font-size:11px;color:var(--text-3)">GSTIN: ${i(a.gstin)}</div>`:""}
                  </td>
                  <td class="num">${c(a.totalBilled)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${c(a.totalPaid)}</td>
                  <td class="num" style="font-weight:800;font-size:14px;color:${a.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${c(a.pendingAmount)}
                  </td>
                  <td class="num">
                    ${a.overdueAmount>0?`<span class="badge red">${c(a.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12.5px;color:${a.overdueAmount>0?"var(--red-600)":"inherit"}">
                    ${a.oldestDueDate?A(a.oldestDueDate):'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12px">
                    ${a.lastPaymentDate?`${A(a.lastPaymentDate)} (${c(a.lastPaymentAmount)})`:'<span class="muted">No payments</span>'}
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
    </section>`,l.querySelectorAll(".settle-payment-btn").forEach(a=>{a.onclick=()=>{O({clientId:a.dataset.clientId,clientName:a.dataset.clientName,suggestedAmount:Number(a.dataset.pending)||0})}}),l.querySelectorAll(".reminder-btn").forEach(a=>{a.onclick=()=>{ge({clientName:a.dataset.clientName,pending:Number(a.dataset.pending)||0,overdue:Number(a.dataset.overdue)||0,phone:a.dataset.phone})}});const p=document.getElementById("exportReceivablesCsvBtn");p&&(p.onclick=()=>{if(!v.length)return b("No receivables to export",!0);const a=["Client Name","GSTIN","Total Billed","Total Paid","Pending Balance","Overdue Amount","Oldest Due Date","Last Payment Date","Last Payment Amount"],s=v.map(m=>[`"${(m.clientName||"").replace(/"/g,'""')}"`,m.gstin||"",m.totalBilled||0,m.totalPaid||0,m.pendingAmount||0,m.overdueAmount||0,m.oldestDueDate?A(m.oldestDueDate):"",m.lastPaymentDate?A(m.lastPaymentDate):"",m.lastPaymentAmount||0]),g=[a.join(","),...s.map(m=>m.join(","))].join(`
`),x=new Blob([g],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(x),f=document.createElement("a");f.href=r,f.download=`CI360_Receivables_Statement_${new Date().toISOString().slice(0,10)}.csv`,f.click(),URL.revokeObjectURL(r),b("Receivables statement exported to CSV")})}function ge({clientName:l,pending:v,overdue:e,phone:n}){const o=`Dear ${l},

Greetings from COGNITO INNOVO PRIVATE LIMITED.

This is a friendly reminder regarding your outstanding account balance of ${c(v)}${e>0?` (including ${c(e)} overdue)`:""}.

Please arrange for the settlement at your earliest convenience to our registered bank account:
- Company: COGNITO INNOVO PRIVATE LIMITED
- Bank: HDFC Bank
- A/C: 50200088992211
- IFSC: HDFC0001234
- UPI: cognitoinnovo@hdfcbank

If you have already processed this remittance, kindly share the UTR / transaction receipt. Thank you for your continued partnership!

Warm regards,
Accounts Department | COGNITO INNOVO PRIVATE LIMITED`,p=j(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:18px">Payment Reminder for ${i(l)}</h3>
        <span class="badge amber" style="font-size:12px">${c(v)} Due</span>
      </div>
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:12px">
        You can copy this formatted payment reminder template to email/chat or launch WhatsApp directly.
      </div>

      <div class="field">
        <label>Reminder Message Template</label>
        <textarea id="reminderTextArea" rows="10" style="font-family:var(--font-mono);font-size:12px;line-height:1.4">${i(o)}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="reminderCloseBtn">Close</button>
        <button class="btn gold" id="reminderCopyBtn">📋 Copy to Clipboard</button>
        <button class="btn green" id="reminderWhatsAppBtn">💬 Open WhatsApp</button>
      </div>
    </div>`);p.querySelector("#reminderCloseBtn").onclick=()=>p.remove(),p.querySelector("#reminderCopyBtn").onclick=()=>{const a=p.querySelector("#reminderTextArea").value;navigator.clipboard.writeText(a).then(()=>{b("Reminder template copied to clipboard!")}).catch(()=>{b("Failed to copy text",!0)})},p.querySelector("#reminderWhatsAppBtn").onclick=()=>{const a=encodeURIComponent(p.querySelector("#reminderTextArea").value),s=(n||"").replace(/[^0-9]/g,""),g=s?`https://wa.me/${s}?text=${a}`:`https://wa.me/?text=${a}`;window.open(g,"_blank")}}async function be(l){const v=await B("/accounts/billing-profiles");l.innerHTML=`
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Client Billing Profiles <span class="eyebrow">${v.length} clients</span></h2>
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
              ${v.map(e=>{const n=e.profile;return`
                  <tr>
                    <td style="padding-left:22px">
                      <strong>${i(e.clientName)}</strong>
                      ${n.billingEmail?`<div style="font-size:11px;color:var(--text-3)">${i(n.billingEmail)}</div>`:""}
                    </td>
                    <td><span class="badge">${(n.billingType||"retainer").toUpperCase()}</span></td>
                    <td style="font-size:12px;text-transform:capitalize">${i(n.billingCycle||"monthly")}</td>
                    <td class="num" style="font-weight:800;color:var(--brand-600);font-size:14px">
                      ${c(n.retainerAmount||0)}
                    </td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${i(n.gstin||"—")}</td>
                    <td style="font-size:12px">Net ${n.paymentTermsDays||15}d</td>
                    <td>
                      <span class="badge ${n.status==="active"?"green":"amber"}">${i(n.status||"active")}</span>
                    </td>
                    <td class="num" style="padding-right:22px;white-space:nowrap">
                      <button class="btn gold small gen-monthly-inv-btn" data-client-id="${e.clientId}" data-client-name="${i(e.clientName)}" data-amount="${n.retainerAmount||0}" title="Generate this month's invoice">
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
    </section>`,l.querySelectorAll(".gen-monthly-inv-btn").forEach(e=>{e.onclick=async()=>{const n=e.dataset.clientName,o=Number(e.dataset.amount)||0;if(confirm(`Generate this month's invoice for ${n} for ${c(o)}?`))try{e.disabled=!0,e.textContent="…",await N(`/accounts/billing-profiles/${e.dataset.clientId}/generate-invoice`,{amount:o}),b(`Invoice generated successfully for ${n}!`),D="invoices",q()}catch(p){b(p.message,!0),e.disabled=!1,e.textContent="⚡ Gen Invoice"}}}),l.querySelectorAll(".edit-profile-btn").forEach(e=>{e.onclick=()=>{const n=v.find(o=>o.clientId===e.dataset.clientId);xe(e.dataset.clientId,e.dataset.clientName,n?n.profile:{})}})}function xe(l,v,e={}){const n=j(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Billing Setup: ${i(v)}</h3>
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
    </div>`);n.querySelector("#bpCancelBtn").onclick=()=>n.remove(),n.querySelector("#bpSaveBtn").onclick=async()=>{const o={billingType:n.querySelector("#bpType").value,billingCycle:n.querySelector("#bpCycle").value,retainerAmount:Number(n.querySelector("#bpAmount").value)||0,paymentTermsDays:Number(n.querySelector("#bpTerms").value)||15,gstin:n.querySelector("#bpGstin").value.trim(),panNumber:n.querySelector("#bpPan").value.trim(),billingEmail:n.querySelector("#bpEmail").value.trim(),billingPhone:n.querySelector("#bpPhone").value.trim(),billingAddress:n.querySelector("#bpAddress").value.trim()};try{await Z(`/accounts/billing-profiles/${l}`,o),b("Billing profile saved successfully"),n.remove(),k()}catch(p){b(p.message,!0)}}}async function fe(l){const v=await B("/accounts/tally/summary"),e=v.config||{},n=v.stats||{totalInvoices:0,totalClients:0,tallyInvoices:0,tallyPayments:0},o=v.lastSync||null,p=v.recentInvoices||[],a=v.recentPayments||[],s=`http://${i(e.serverHost||"localhost")}:${i(e.serverPort||9e3)}`,g=[...p.map(u=>({type:"Sales Invoice",icon:"📄",number:u.invoiceNumber,party:u.clientName,amount:u.totalAmount,date:u.issueDate,badgeClass:"badge blue"})),...a.map(u=>({type:"Payment Receipt",icon:"💵",number:u.paymentNumber,party:u.clientName,amount:u.amount,date:u.paymentDate,badgeClass:"badge green"}))].sort((u,S)=>new Date(S.date)-new Date(u.date)).slice(0,15);l.innerHTML=`
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

      ${o?`
      <!-- Last Sync Banner -->
      <div style="margin-bottom:20px;padding:12px 16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--text-1)">
          <span style="font-size:16px">🕒</span>
          <span><strong>Last Synchronized:</strong> ${A(o.syncedAt)} (${new Date(o.syncedAt).toLocaleTimeString()})</span>
          <span style="color:var(--text-3)">•</span>
          <span class="badge blue" style="font-size:11px">${o.invoicesImported||0} Invoices</span>
          <span class="badge green" style="font-size:11px">${o.paymentsImported||0} Receipts</span>
          <span class="badge gold" style="font-size:11px">${o.clientsCreated||0} Clients</span>
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
          <div class="kpi-value" style="color:var(--blue-600)">${n.tallyInvoices||0}</div>
          <div class="kpi-sub">Sales vouchers pulled from Tally into CI360</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Tally Receipts Ingested</span>
            <div class="kpi-icon" style="background:rgba(16,185,129,0.12);color:var(--green-600)">💵</div>
          </div>
          <div class="kpi-value" style="color:var(--green-600)">${n.tallyPayments||0}</div>
          <div class="kpi-sub">Receipt entries synced &amp; reconciled</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Total CI360 Invoices</span>
            <div class="kpi-icon" style="background:rgba(245,158,11,0.12);color:var(--amber-600)">📑</div>
          </div>
          <div class="kpi-value">${n.totalInvoices||0}</div>
          <div class="kpi-sub">Across all billing profiles &amp; accounts</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Client Masters</span>
            <div class="kpi-icon" style="background:var(--brand-50);color:var(--brand-600)">👥</div>
          </div>
          <div class="kpi-value">${n.totalClients||0}</div>
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
              <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--brand-600)">${s}</span>
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
          <span class="badge gray">${g.length} Recent Records</span>
        </div>

        ${g.length===0?`
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
                ${g.map(u=>`
                  <tr>
                    <td>${A(u.date)}</td>
                    <td>
                      <span class="${u.badgeClass}" style="display:inline-flex;align-items:center;gap:4px">
                        <span>${u.icon}</span>
                        <span>${u.type}</span>
                      </span>
                    </td>
                    <td style="font-family:var(--font-mono);font-weight:600">${i(u.number)}</td>
                    <td><strong>${i(u.party||"—")}</strong></td>
                    <td style="text-align:right;font-weight:700">${c(u.amount)}</td>
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

    </section>`;const x=document.getElementById("tallyTestPingBtn"),r=document.getElementById("tallyLivePingBtn"),f=document.getElementById("tallyStatusDot"),m=document.getElementById("tallyStatusText"),h=document.getElementById("tallyConnectionAlert"),w=document.getElementById("tallyAlertTitle"),C=document.getElementById("tallyAlertMsg"),y=document.getElementById("tallyAlertIcon");async function d(){m.textContent="Pinging Tally…",f.style.background="var(--amber-500)";try{const u=(document.getElementById("tallyServerHost")?document.getElementById("tallyServerHost").value.trim():e.serverHost)||"localhost",S=Number(document.getElementById("tallyServerPort")?document.getElementById("tallyServerPort").value:e.serverPort)||9e3,M=await N("/accounts/tally/test-connection",{serverHost:u,serverPort:S});h.style.display="block",M.connected?(f.style.background="var(--green-500)",m.textContent=`Tally Online (${S})`,h.style.borderLeftColor="var(--green-500)",y.textContent="✅",w.textContent="TallyPrime Server Connected",C.textContent=M.message,b("Connected to TallyPrime Silver on port "+S)):(f.style.background="var(--red-500)",m.textContent=`Tally Offline (${S})`,h.style.borderLeftColor="var(--amber-500)",y.textContent="⚠️",w.textContent="TallyPrime XML Server Not Detected on Port "+S,C.textContent=`${M.message} ${M.instructions||"You can still use Upload XML File anytime!"}`)}catch(u){f.style.background="var(--red-500)",m.textContent="Tally Offline",h.style.display="block",h.style.borderLeftColor="var(--red-500)",y.textContent="❌",w.textContent="Connection Error",C.textContent=u.message}}x&&(x.onclick=d),r&&(r.onclick=d);const $=document.getElementById("tallyAlertCloseBtn");$&&($.onclick=()=>{h.style.display="none"});async function t(){const u=document.getElementById("tallyLiveFetchBtn"),S=document.getElementById("tallyTopFetchBtn"),M=u?u.innerHTML:"";try{u&&(u.disabled=!0,u.innerHTML='<span class="spinner" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:6px"></span> Ingesting from Tally…'),S&&(S.disabled=!0),b("Connecting to TallyPrime port "+(e.serverPort||9e3)+" and fetching Day Book vouchers…");const F=await N("/accounts/tally/fetch-from-tally",{serverHost:e.serverHost||"localhost",serverPort:e.serverPort||9e3});h.style.display="block",h.style.borderLeftColor="var(--green-500)",y.textContent="🎉",w.textContent="Tally Entries Ingested Successfully!",C.textContent=F.message,b(F.message),setTimeout(()=>k(),1200)}catch(F){h.style.display="block",h.style.borderLeftColor="var(--amber-500)",y.textContent="⚠️",w.textContent="Tally Ingestion Notice",C.textContent=`${F.message}. If Tally is running on a different computer, export your Day Book as XML and use the "Upload Tally XML File" option!`,b(F.message,!0)}finally{u&&(u.disabled=!1,u.innerHTML=M),S&&(S.disabled=!1)}}const I=document.getElementById("tallyLiveFetchBtn");I&&(I.onclick=t);const R=document.getElementById("tallyTopFetchBtn");R&&(R.onclick=t);const T=document.getElementById("tallyDropzone"),P=document.getElementById("tallyFileInput"),ae=document.getElementById("tallySelectedFileName"),z=document.getElementById("tallyUploadXmlBtn");let W=null;T&&P&&(T.onclick=()=>P.click(),T.ondragover=u=>{u.preventDefault(),T.style.borderColor="var(--brand-500)",T.style.background="rgba(79,70,229,0.05)"},T.ondragleave=()=>{T.style.borderColor="var(--border-sm)",T.style.background="var(--bg-2)"},T.ondrop=u=>{u.preventDefault(),T.style.borderColor="var(--border-sm)",T.style.background="var(--bg-2)",u.dataTransfer.files&&u.dataTransfer.files.length&&J(u.dataTransfer.files[0])},P.onchange=u=>{u.target.files&&u.target.files.length&&J(u.target.files[0])});function J(u){if(!u.name.toLowerCase().endsWith(".xml")){b("Please select a valid Tally .xml file",!0);return}ae.innerHTML=`<strong style="color:var(--brand-600)">📄 ${i(u.name)}</strong> (${(u.size/1024).toFixed(1)} KB)`;const S=new FileReader;S.onload=M=>{W=M.target.result,z&&(z.disabled=!1,z.classList.add("gold"),z.classList.remove("green")),b('XML file loaded. Click "Parse & Ingest XML" to import.')},S.readAsText(u)}z&&(z.onclick=async()=>{if(!W){b("Please select an XML file first",!0);return}try{z.disabled=!0,z.textContent="Parsing XML & Ingesting…";const u=await N("/accounts/tally/import-xml-file",{xmlContent:W});h.style.display="block",h.style.borderLeftColor="var(--green-500)",y.textContent="🎉",w.textContent="Tally XML Ingested Successfully!",C.textContent=u.message,b(u.message),setTimeout(()=>k(),1200)}catch(u){h.style.display="block",h.style.borderLeftColor="var(--red-500)",y.textContent="❌",w.textContent="XML Ingestion Error",C.textContent=u.message,b(u.message,!0),z.disabled=!1,z.textContent="📤 Parse & Ingest XML"}});const L=document.getElementById("tallySaveConfigBtn");L&&(L.onclick=async()=>{const u={companyName:document.getElementById("tallyCompanyName").value.trim(),serverHost:document.getElementById("tallyServerHost").value.trim()||"localhost",serverPort:Number(document.getElementById("tallyServerPort").value)||9e3};try{L.disabled=!0,L.textContent="Saving…",await Z("/accounts/tally/config",u),b("Tally settings saved!"),L.disabled=!1,L.textContent="💾 Save Settings"}catch(S){b(S.message,!0),L.disabled=!1,L.textContent="💾 Save Settings"}}),setTimeout(d,600)}window.addEventListener("ci360:dataUpdated",()=>{const l=document.activeElement,v=l&&(l.tagName==="INPUT"||l.tagName==="TEXTAREA"||l.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, .modal");!v&&!e&&k()});re();
