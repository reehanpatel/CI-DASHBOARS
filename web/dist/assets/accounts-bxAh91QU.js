import{r as H,b as V,i as W,a as Q,c as f,e as s,f as r,d as h,g as z,h as g,j as _,o as k,k as L}from"./api-B2Bht1wi.js";let I=null,$="overview",P=[],Y=[];const j=[{key:"overview",label:"Overview",icon:"📊"},{key:"invoices",label:"Invoices",icon:"📄"},{key:"payments",label:"Payments",icon:"💵"},{key:"receivables",label:"Pending & Receivables",icon:"⏳"},{key:"billing",label:"Billing Profiles",icon:"⚙️"}];async function Z(){if(W(),I=Q("accounts"),!!I){try{const[l,p]=await Promise.all([f("/clients").catch(()=>[]),f("/services").catch(()=>[])]);P=l||[],Y=p||[]}catch(l){console.error("Failed to load initial metadata",l)}C()}}function C(){const l=document.getElementById("app"),p=j.find(e=>e.key===$)||j[0];l.innerHTML=H({user:I,currentRole:"accounts",activeTab:$,tabs:j,title:p.label,subtitle:"Billing, Invoicing & Receivables Intelligence"}),V(e=>{$=e,C()}),x()}window.ci360NavTab=l=>{$=l,C()};async function x(){const l=document.getElementById("content");if(l){l.innerHTML=`
    <div style="display:flex;justify-content:center;align-items:center;min-height:240px">
      <div class="spinner"></div>
    </div>`;try{$==="overview"?await K(l):$==="invoices"?await X(l):$==="payments"?await te(l):$==="receivables"?await ae(l):$==="billing"&&await ie(l)}catch(p){l.innerHTML=`
      <div class="empty" style="padding:48px 24px">
        <h3 style="color:var(--s-red-text);margin-bottom:8px">Unable to load accounts data</h3>
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px">${s(p.message)}</p>
        <button class="btn gold small" id="retryAccountsBtn">Retry</button>
      </div>`;const e=document.getElementById("retryAccountsBtn");e&&(e.onclick=()=>x())}}}async function K(l){var b,w;const p=await f("/accounts/dashboard"),e=p.metrics||{},n=p.aging||{current:0,days31to60:0,days61to90:0,days90plus:0},o=n.current+n.days31to60+n.days61to90+n.days90plus||1,c=Math.round(n.current/o*100),i=Math.round(n.days31to60/o*100),t=Math.round(n.days61to90/o*100),v=Math.max(0,100-(c+i+t)),a=I&&(/ekta/i.test(I.name)||/ekta/i.test(I.email)),d=I&&(I.role==="superadmin"||I.role==="admin"),m=a||d||I&&I.personnelId;l.innerHTML=`
    <section class="block">
      <div class="accounts-header-banner">
        <div class="accounts-header-title">
          <h2>Accounts & Finance Hub ${a?'<span class="badge" style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:12px;margin-left:8px;vertical-align:middle;padding:4px 8px;border-radius:6px">Ekta · Finance Manager</span>':""}</h2>
          <div class="accounts-header-subtitle">Real-time revenue tracking, invoice lifecycle, and client pending balances.</div>
        </div>
        <div class="accounts-header-actions">
          ${d?`
            <a href="/admin" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
              <span>← Admin Portal</span>
            </a>`:""}
          ${m?`
            <a href="/employee" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px" title="Open Daily Tasks & Employee Workspace">
              <span>💼 Employee Workspace →</span>
            </a>`:""}
          <button class="btn ghost small" id="seedDemoAccountsBtn" title="Seed realistic demo data if needed">
            <span>⚡ Seed Demo Data</span>
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
            <span class="badge amber">${(((b=e.invoiceCounts)==null?void 0:b.partially_paid)||0)+(((w=e.invoiceCounts)==null?void 0:w.issued)||0)} Invoices</span>
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
            <div class="aging-segment current" style="width:${c}%" title="0-30 Days: ${r(n.current)}"></div>
            <div class="aging-segment days31to60" style="width:${i}%" title="31-60 Days: ${r(n.days31to60)}"></div>
            <div class="aging-segment days61to90" style="width:${t}%" title="61-90 Days: ${r(n.days61to90)}"></div>
            <div class="aging-segment days90plus" style="width:${v}%" title="90+ Days: ${r(n.days90plus)}"></div>
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
            ${(p.monthlyTrend||[]).map(y=>{const N=Math.max(...(p.monthlyTrend||[]).map(S=>Math.max(S.billed,S.collected)),1e3),E=Math.round(y.billed/N*100),M=Math.round(y.collected/N*100);return`
                <div style="display:flex;align-items:center;gap:12px;font-size:12px">
                  <span style="width:50px;font-weight:700;color:var(--text-2)">${y.month}</span>
                  <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--brand-500);width:${Math.max(4,E)}%;border-radius:4px" title="Billed: ${r(y.billed)}"></div>
                      <span style="font-size:10.5px;color:var(--text-3);min-width:60px">${r(y.billed)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--green-500);width:${Math.max(4,M)}%;border-radius:4px" title="Collected: ${r(y.collected)}"></div>
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
                ${(p.topClientsPending||[]).slice(0,5).map(y=>`
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
                ${(p.recentInvoices||[]).slice(0,5).map(y=>`
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${s(y.invoiceNumber)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${h(y.issueDate)}</div>
                    </td>
                    <td>${s(y.clientName)}</td>
                    <td class="num" style="font-weight:700">${r(y.totalAmount)}</td>
                    <td>${T(y.status)}</td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn ghost small view-invoice-btn" data-id="${y._id}">View</button>
                    </td>
                  </tr>`).join("")||'<tr><td colspan="5"><div class="empty" style="padding:24px">No invoices generated yet.</div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`,document.getElementById("quickNewInvoiceBtn").onclick=()=>G(),document.getElementById("quickRecordPaymentBtn").onclick=()=>A();const u=document.getElementById("seedDemoAccountsBtn");u&&(u.onclick=async()=>{if(confirm("Load realistic demo invoices, payments, and billing profiles?"))try{u.disabled=!0,u.textContent="Loading demo data…";const y=await z("/accounts/seed-demo",{});g(y.message||"Demo data loaded successfully!"),x()}catch(y){g(y.message,!0),u.disabled=!1,u.textContent="⚡ Seed Demo Data"}}),document.getElementById("viewAllReceivablesBtn").onclick=()=>{$="receivables",C()},document.getElementById("viewAllInvoicesBtn").onclick=()=>{$="invoices",C()},l.querySelectorAll(".quick-collect-btn").forEach(y=>{y.onclick=()=>{A({clientId:y.dataset.clientId,clientName:y.dataset.clientName,suggestedAmount:Number(y.dataset.pending)||0})}}),l.querySelectorAll(".view-invoice-btn").forEach(y=>{y.onclick=()=>F(y.dataset.id)})}function T(l){return l==="paid"?'<span class="badge green">Paid</span>':l==="partially_paid"?'<span class="badge blue">Partially Paid</span>':l==="overdue"?'<span class="badge red">Overdue</span>':l==="issued"?'<span class="badge amber">Issued</span>':l==="draft"?'<span class="badge gray">Draft</span>':l==="cancelled"?'<span class="badge red">Cancelled</span>':`<span class="badge">${s(l||"—")}</span>`}let O="all",D="",B="";async function X(l){let p=`?status=${encodeURIComponent(O)}`;D&&(p+=`&clientId=${encodeURIComponent(D)}`),B&&(p+=`&search=${encodeURIComponent(B)}`);const e=await f("/accounts/invoices"+p),n=e.reduce((a,d)=>a+(d.totalAmount||0),0),o=e.reduce((a,d)=>a+(d.amountPaid||0),0),c=e.reduce((a,d)=>a+(d.pendingAmount||0),0);l.innerHTML=`
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
          <span style="color:var(--text-3)">Collected:</span> <strong style="color:var(--green-600)">${r(o)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Pending:</span> <strong style="color:var(--amber-600)">${r(c)}</strong>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="invoiceSearchInput" placeholder="Search by invoice #, client name, service…" value="${s(B)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="invoiceClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${P.map(a=>`<option value="${a._id}" ${D===a._id?"selected":""}>${s(a.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","issued","partially_paid","paid","overdue","draft"].map(a=>`
              <button class="btn ghost small invoice-status-filter ${O===a?"active gold":""}" data-status="${a}">
                ${a==="all"?"All":a.replace("_"," ").replace(/\b\w/g,d=>d.toUpperCase())}
              </button>`).join("")}
          </div>
        </div>
      </div>

      <!-- Invoices Table -->
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="padding-left:22px">Invoice #</th>
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
              ${e.map(a=>`
                <tr>
                  <td style="padding-left:22px">
                    <strong style="font-family:var(--font-heading);color:var(--brand-600)">${s(a.invoiceNumber)}</strong>
                  </td>
                  <td><strong>${s(a.clientName)}</strong></td>
                  <td><span class="badge">${a.billingType?a.billingType.toUpperCase():"RETAINER"}</span></td>
                  <td style="font-size:12.5px">${h(a.issueDate)}</td>
                  <td style="font-size:12.5px;color:${a.status==="overdue"?"var(--red-600)":"inherit"}">${h(a.dueDate)}</td>
                  <td class="num" style="font-weight:700">${r(a.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${r(a.amountPaid)}</td>
                  <td class="num" style="font-weight:700;color:${a.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${r(a.pendingAmount)}
                  </td>
                  <td>${T(a.status)}</td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    <button class="btn ghost small view-invoice-btn" data-id="${a._id}" title="View and Print Invoice">👁️ View</button>
                    ${a.pendingAmount>0?`
                      <button class="btn green small pay-invoice-btn" data-id="${a._id}" data-num="${s(a.invoiceNumber)}" data-client-id="${a.clientId}" data-client-name="${s(a.clientName)}" data-pending="${a.pendingAmount}" title="Record Payment">
                        💵 Pay
                      </button>`:""}
                    <button class="btn ghost small edit-invoice-btn" data-id="${a._id}" title="Edit Invoice">✏️</button>
                    <button class="btn danger small delete-invoice-btn" data-id="${a._id}" title="Delete Invoice">🗑️</button>
                  </td>
                </tr>`).join("")||'<tr><td colspan="10"><div class="empty" style="padding:36px">No invoices match the current filters.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;const i=document.getElementById("invoiceSearchInput");let t=null;i.oninput=()=>{clearTimeout(t),t=setTimeout(()=>{B=i.value.trim(),x()},300)},document.getElementById("invoiceClientFilter").onchange=a=>{D=a.target.value,x()},l.querySelectorAll(".invoice-status-filter").forEach(a=>{a.onclick=()=>{O=a.dataset.status,x()}}),document.getElementById("newInvoiceBtn").onclick=()=>G(),l.querySelectorAll(".view-invoice-btn").forEach(a=>{a.onclick=()=>F(a.dataset.id)}),l.querySelectorAll(".edit-invoice-btn").forEach(a=>{a.onclick=()=>ee(a.dataset.id)}),l.querySelectorAll(".pay-invoice-btn").forEach(a=>{a.onclick=()=>{A({invoiceId:a.dataset.id,invoiceNumber:a.dataset.num,clientId:a.dataset.clientId,clientName:a.dataset.clientName,suggestedAmount:Number(a.dataset.pending)||0})}}),l.querySelectorAll(".delete-invoice-btn").forEach(a=>{a.onclick=async()=>{if(confirm("Are you sure you want to delete this invoice? This cannot be undone."))try{await _("/accounts/invoices/"+a.dataset.id),g("Invoice deleted successfully"),x()}catch(d){g(d.message,!0)}}});const v=document.getElementById("exportInvoicesCsvBtn");v&&(v.onclick=()=>J(e))}function J(l){if(!l||!l.length){g("No invoices to export",!0);return}const p=["Invoice Number","Client Name","Type","Issue Date","Due Date","Subtotal","Tax (18%)","Total Amount","Amount Paid","Pending Amount","Status"],e=l.map(t=>[t.invoiceNumber,`"${(t.clientName||"").replace(/"/g,'""')}"`,t.billingType||"",h(t.issueDate),h(t.dueDate),t.subtotal||0,t.taxAmount||0,t.totalAmount||0,t.amountPaid||0,t.pendingAmount||0,t.status]),n=[p.join(","),...e.map(t=>t.join(","))].join(`
`),o=new Blob([n],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(o),i=document.createElement("a");i.href=c,i.download=`CI360_Invoices_${new Date().toISOString().slice(0,10)}.csv`,i.click(),URL.revokeObjectURL(c),g("Invoices exported to CSV")}async function G(l){let p="INV-2026-0001";try{const v=await f("/accounts/next-invoice-number");v&&v.invoiceNumber&&(p=v.invoiceNumber)}catch{}const e=new Date;e.setDate(e.getDate()+15);const n=[{description:"Strategic Intelligence & Creative Retainer",serviceId:"",quantity:1,rate:5e4,amount:5e4}],o=k(`
    <div style="max-width:680px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Create New Invoice</h3>
        <span class="badge gold" style="font-family:var(--font-heading);font-size:12px">${s(p)}</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client *</label>
          <select id="modalInvClient" required>
            <option value="">Select client…</option>
            ${P.map(v=>`<option value="${v._id}" ${l===v._id?"selected":""}>${s(v.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Invoice Number</label>
          <input type="text" id="modalInvNum" value="${s(p)}" required>
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
    </div>`);let c=[...n];function i(){const v=o.querySelector("#modalItemsContainer");v.innerHTML=c.map((a,d)=>`
      <div style="display:flex;gap:8px;align-items:center;background:var(--bg-card);border:1px solid var(--border-xs);padding:8px 10px;border-radius:var(--r-sm)">
        <div style="flex:2">
          <input type="text" class="item-desc" data-idx="${d}" placeholder="Description / Service" value="${s(a.description)}" style="margin:0;font-size:12px">
        </div>
        <div style="width:70px">
          <input type="number" class="item-qty" data-idx="${d}" placeholder="Qty" min="1" value="${a.quantity}" style="margin:0;font-size:12px;text-align:center">
        </div>
        <div style="width:110px">
          <input type="number" class="item-rate" data-idx="${d}" placeholder="Rate (₹)" min="0" value="${a.rate}" style="margin:0;font-size:12px;text-align:right">
        </div>
        <div style="width:90px;font-weight:700;font-size:12.5px;text-align:right">
          ${r(a.amount)}
        </div>
        <div>
          ${c.length>1?`<button type="button" class="btn danger small remove-item-btn" data-idx="${d}" style="padding:4px 8px">✕</button>`:""}
        </div>
      </div>`).join(""),v.querySelectorAll(".item-desc").forEach(a=>{a.oninput=d=>{c[Number(d.target.dataset.idx)].description=d.target.value}}),v.querySelectorAll(".item-qty").forEach(a=>{a.oninput=d=>{const m=Number(d.target.dataset.idx),u=Number(d.target.value)||1;c[m].quantity=u,c[m].amount=u*(c[m].rate||0),i(),t()}}),v.querySelectorAll(".item-rate").forEach(a=>{a.oninput=d=>{const m=Number(d.target.dataset.idx),u=Number(d.target.value)||0;c[m].rate=u,c[m].amount=(c[m].quantity||1)*u,i(),t()}}),v.querySelectorAll(".remove-item-btn").forEach(a=>{a.onclick=()=>{const d=Number(a.dataset.idx);c.splice(d,1),i(),t()}})}function t(){const v=c.reduce((w,y)=>w+(Number(y.amount)||0),0),a=Number(o.querySelector("#modalCalcTaxRate").value)||0,d=Number(o.querySelector("#modalCalcDiscount").value)||0,m=Math.max(0,v-d),u=Math.round(m*(a/100)),b=m+u;o.querySelector("#modalCalcSubtotal").textContent=r(v),o.querySelector("#modalCalcTaxAmount").textContent=r(u),o.querySelector("#modalCalcTotal").textContent=r(b)}o.querySelector("#modalAddItemRowBtn").onclick=()=>{c.push({description:"",serviceId:"",quantity:1,rate:0,amount:0}),i(),t()},o.querySelector("#modalCalcTaxRate").onchange=t,o.querySelector("#modalCalcDiscount").oninput=t,o.querySelector("#modalInvClient").onchange=async v=>{const a=v.target.value;if(a)try{const d=await f("/accounts/billing-profiles").then(m=>{var u;return(u=m.find(b=>b.clientId===a))==null?void 0:u.profile});d&&(d.retainerAmount&&c.length===1&&c[0].rate===5e4&&(c[0].rate=d.retainerAmount,c[0].amount=d.retainerAmount,i(),t()),d.gstin&&(o.querySelector("#modalInvGstin").value=d.gstin),d.billingType&&(o.querySelector("#modalInvType").value=d.billingType))}catch{}},i(),t(),o.querySelector("#modalCancelInvBtn").onclick=()=>o.remove(),o.querySelector("#modalSaveInvBtn").onclick=async()=>{const v=o.querySelector("#modalInvClient").value,a=o.querySelector("#modalInvNum").value.trim(),d=o.querySelector("#modalInvIssueDate").value,m=o.querySelector("#modalInvDueDate").value,u=o.querySelector("#modalInvType").value,b=Number(o.querySelector("#modalCalcTaxRate").value)||0,w=Number(o.querySelector("#modalCalcDiscount").value)||0,y=o.querySelector("#modalInvTerms").value.trim(),N=o.querySelector("#modalInvGstin").value.trim(),E=o.querySelector("#modalInvNotes").value.trim();if(!v){g("Please select a client",!0);return}if(!m){g("Please select a due date",!0);return}if(!c.length||!c.some(S=>S.amount>0)){g("Please provide at least one valid line item with an amount",!0);return}const M={clientId:v,invoiceNumber:a,issueDate:d,dueDate:m,billingType:u,items:c,discount:w,taxRate:b,paymentTerms:y,gstin:N,notes:E};try{const S=o.querySelector("#modalSaveInvBtn");S.disabled=!0,S.textContent="Generating Invoice…",await z("/accounts/invoices",M),g("Invoice created and issued successfully!"),o.remove(),x()}catch(S){g(S.message,!0),o.querySelector("#modalSaveInvBtn").disabled=!1,o.querySelector("#modalSaveInvBtn").textContent="Create & Issue Invoice"}}}async function ee(l){const e=(await f("/accounts/invoices/"+l)).invoice;if(!e)return;const n=k(`
    <div style="max-width:640px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Edit Invoice ${s(e.invoiceNumber)}</h3>
        ${T(e.status)}
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
    </div>`);n.querySelector("#editCancelBtn").onclick=()=>n.remove(),n.querySelector("#editSaveBtn").onclick=async()=>{const o={status:n.querySelector("#editInvStatus").value,issueDate:n.querySelector("#editInvIssueDate").value,dueDate:n.querySelector("#editInvDueDate").value,paymentTerms:n.querySelector("#editInvTerms").value.trim(),gstin:n.querySelector("#editInvGstin").value.trim(),notes:n.querySelector("#editInvNotes").value.trim()};try{await L("/accounts/invoices/"+l,o),g("Invoice updated successfully"),n.remove(),x()}catch(c){g(c.message,!0)}}}async function F(l){var i,t,v,a,d;const p=await f("/accounts/invoices/"+l),e=p.invoice,n=p.payments||[];if(!e)return;const o=k(`
    <div style="max-width:860px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px" class="no-print">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:18px;font-weight:800;color:var(--text-1)">Invoice Details</span>
          ${T(e.status)}
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
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">Date: <strong>${h(e.issueDate)}</strong></div>
            <div style="font-size:12px;color:${e.status==="overdue"?"var(--red-600)":"var(--text-3)"}">
              Due Date: <strong>${h(e.dueDate)}</strong>
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
            <div>${T(e.status)}</div>
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
            ${(e.items||[]).map(m=>`
              <tr>
                <td>
                  <strong>${s(m.description)}</strong>
                  ${m.serviceName?`<div style="font-size:11px;color:var(--text-3)">Service: ${s(m.serviceName)}</div>`:""}
                </td>
                <td style="text-align:center">${m.quantity||1}</td>
                <td style="text-align:right">${r(m.rate)}</td>
                <td style="text-align:right;font-weight:700">${r(m.amount)}</td>
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
            <div>Account Name: <strong>${s(((i=e.bankDetails)==null?void 0:i.accountName)||"CI360 Intelligence")}</strong></div>
            <div>Bank: <strong>${s(((t=e.bankDetails)==null?void 0:t.bankName)||"HDFC Bank")}</strong></div>
            <div>A/C Number: <strong>${s(((v=e.bankDetails)==null?void 0:v.accountNumber)||"50200088992211")}</strong></div>
            <div>IFSC Code: <strong>${s(((a=e.bankDetails)==null?void 0:a.ifscCode)||"HDFC0001234")}</strong></div>
            <div>UPI ID: <strong>${s(((d=e.bankDetails)==null?void 0:d.upiId)||"ci360@hdfcbank")}</strong></div>
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
                ${n.map(m=>`
                  <tr>
                    <td><strong>${s(m.paymentNumber)}</strong></td>
                    <td>${h(m.paymentDate)}</td>
                    <td><span class="badge">${s(m.paymentMethod)}</span></td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${s(m.referenceId||"—")}</td>
                    <td class="num" style="color:var(--green-600);font-weight:700">${r(m.amount)}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`:""}
    </div>`);o.querySelector("#viewModalCloseBtn").onclick=()=>o.remove(),o.querySelector("#viewModalPrintBtn").onclick=()=>{window.print()};const c=o.querySelector("#viewModalPayBtn");c&&(c.onclick=()=>{o.remove(),A({invoiceId:e._id,invoiceNumber:e.invoiceNumber,clientId:e.clientId,clientName:e.clientName,suggestedAmount:e.pendingAmount})})}let U="all",q="",R="";async function te(l){let p=`?paymentMethod=${encodeURIComponent(U)}`;q&&(p+=`&clientId=${encodeURIComponent(q)}`),R&&(p+=`&search=${encodeURIComponent(R)}`);const e=await f("/accounts/payments"+p),n=e.reduce((t,v)=>t+(v.amount||0),0);l.innerHTML=`
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
            <input type="text" id="paymentSearchInput" placeholder="Search by payment #, UTR, client name, invoice…" value="${s(R)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="paymentClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${P.map(t=>`<option value="${t._id}" ${q===t._id?"selected":""}>${s(t.name)}</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${["all","bank_transfer","upi","cheque","card","cash"].map(t=>`
              <button class="btn ghost small payment-method-filter ${U===t?"active gold":""}" data-method="${t}">
                ${t==="all"?"All Methods":t.replace("_"," ").toUpperCase()}
              </button>`).join("")}
          </div>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="padding-left:22px">Payment #</th>
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
              ${e.map(t=>`
                <tr>
                  <td style="padding-left:22px">
                    <strong style="font-family:var(--font-heading);color:var(--green-600)">${s(t.paymentNumber)}</strong>
                  </td>
                  <td><strong>${s(t.clientName)}</strong></td>
                  <td>
                    ${t.invoiceNumber?`<span class="badge blue">${s(t.invoiceNumber)}</span>`:'<span class="muted">Advance / General</span>'}
                  </td>
                  <td style="font-size:12.5px">${h(t.paymentDate)}</td>
                  <td>
                    <span class="badge ${t.paymentMethod==="upi"?"gold":t.paymentMethod==="bank_transfer"?"blue":"green"}">
                      ${t.paymentMethod==="bank_transfer"?"🏦 RTGS/NEFT":t.paymentMethod==="upi"?"📱 UPI":t.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td style="font-family:var(--font-mono);font-size:12px">${s(t.referenceId||"—")}</td>
                  <td class="num" style="font-weight:800;color:var(--green-600);font-size:14px">${r(t.amount)}</td>
                  <td style="font-size:12px;color:var(--text-3)">${s(t.recordedByName||"Accounts")}</td>
                  <td class="num" style="padding-right:22px">
                    <button class="btn danger small delete-payment-btn" data-id="${t._id}" title="Delete payment & restore invoice balance">
                      🗑️
                    </button>
                  </td>
                </tr>`).join("")||'<tr><td colspan="9"><div class="empty" style="padding:36px">No payment records match the current filters.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;const o=document.getElementById("paymentSearchInput");let c=null;o.oninput=()=>{clearTimeout(c),c=setTimeout(()=>{R=o.value.trim(),x()},300)},document.getElementById("paymentClientFilter").onchange=t=>{q=t.target.value,x()},l.querySelectorAll(".payment-method-filter").forEach(t=>{t.onclick=()=>{U=t.dataset.method,x()}}),document.getElementById("newPaymentBtn").onclick=()=>A(),l.querySelectorAll(".delete-payment-btn").forEach(t=>{t.onclick=async()=>{if(confirm("Delete this payment record? This will restore the pending amount on the linked invoice."))try{await _("/accounts/payments/"+t.dataset.id),g("Payment deleted and invoice balance restored"),x()}catch(v){g(v.message,!0)}}});const i=document.getElementById("exportPaymentsCsvBtn");i&&(i.onclick=()=>{if(!e.length)return g("No payments to export",!0);const t=["Payment Number","Client Name","Invoice Number","Date","Method","Reference / UTR","Amount","Recorded By"],v=e.map(b=>[b.paymentNumber,`"${(b.clientName||"").replace(/"/g,'""')}"`,b.invoiceNumber||"",h(b.paymentDate),b.paymentMethod,b.referenceId||"",b.amount||0,b.recordedByName||""]),a=[t.join(","),...v.map(b=>b.join(","))].join(`
`),d=new Blob([a],{type:"text/csv;charset=utf-8;"}),m=URL.createObjectURL(d),u=document.createElement("a");u.href=m,u.download=`CI360_Payments_${new Date().toISOString().slice(0,10)}.csv`,u.click(),URL.revokeObjectURL(m),g("Payments exported to CSV")})}async function A(l={}){let p="PAY-2026-0001";try{const t=await f("/accounts/next-payment-number");t&&t.paymentNumber&&(p=t.paymentNumber)}catch{}let e=[];if(l.clientId)try{e=await f(`/accounts/invoices?clientId=${l.clientId}`),e=e.filter(t=>t.pendingAmount>0&&t.status!=="cancelled")}catch{}const n=k(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Record Client Payment</h3>
        <span class="badge green" style="font-family:var(--font-heading);font-size:12px">${s(p)}</span>
      </div>

      <div class="field">
        <label>Client *</label>
        <select id="modalPayClient" required>
          <option value="">Select client…</option>
          ${P.map(t=>`<option value="${t._id}" ${l.clientId===t._id?"selected":""}>${s(t.name)}</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label>Link to Unpaid Invoice (Optional)</label>
        <select id="modalPayInvoice">
          <option value="">General advance / No invoice link</option>
          ${e.map(t=>`
            <option value="${t._id}" data-pending="${t.pendingAmount}" ${l.invoiceId===t._id?"selected":""}>
              ${s(t.invoiceNumber)} — Balance: ${r(t.pendingAmount)} (Total: ${r(t.totalAmount)})
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
    </div>`),o=n.querySelector("#modalPayClient"),c=n.querySelector("#modalPayInvoice"),i=n.querySelector("#modalPayAmount");o.onchange=async()=>{const t=o.value;if(!t){c.innerHTML='<option value="">General advance / No invoice link</option>';return}try{const a=(await f(`/accounts/invoices?clientId=${t}`)||[]).filter(d=>d.pendingAmount>0&&d.status!=="cancelled");c.innerHTML=`
        <option value="">General advance / No invoice link</option>
        ${a.map(d=>`
          <option value="${d._id}" data-pending="${d.pendingAmount}">
            ${s(d.invoiceNumber)} — Balance: ${r(d.pendingAmount)} (Total: ${r(d.totalAmount)})
          </option>`).join("")}`,a.length===1&&!i.value&&(c.value=a[0]._id,i.value=a[0].pendingAmount)}catch{}},c.onchange=()=>{const v=c.options[c.selectedIndex].getAttribute("data-pending");v&&(i.value=v)},n.querySelector("#modalPayCancelBtn").onclick=()=>n.remove(),n.querySelector("#modalPaySaveBtn").onclick=async()=>{const t=o.value,v=c.value||null,a=Number(i.value),d=n.querySelector("#modalPayDate").value,m=n.querySelector("#modalPayMethod").value,u=n.querySelector("#modalPayRef").value.trim(),b=n.querySelector("#modalPayNotes").value.trim();if(!t)return g("Please select a client",!0);if(!a||a<=0)return g("Please enter a valid payment amount",!0);try{const w=n.querySelector("#modalPaySaveBtn");w.disabled=!0,w.textContent="Saving…",await z("/accounts/payments",{clientId:t,invoiceId:v,amount:a,paymentDate:d,paymentMethod:m,referenceId:u,notes:b}),g("Payment recorded successfully!"),n.remove(),x()}catch(w){g(w.message,!0),n.querySelector("#modalPaySaveBtn").disabled=!1,n.querySelector("#modalPaySaveBtn").textContent="Save Payment Receipt"}}}async function ae(l){const p=await f("/accounts/receivables"),e=p.reduce((i,t)=>i+(t.pendingAmount||0),0),n=p.reduce((i,t)=>i+(t.overdueAmount||0),0),o=p.filter(i=>i.pendingAmount>0);l.innerHTML=`
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
          <div class="kpi-value">${o.length}</div>
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
              ${p.map(i=>`
                <tr style="${i.pendingAmount>0?"":"opacity:0.65"}">
                  <td style="padding-left:22px">
                    <strong>${s(i.clientName)}</strong>
                    ${i.gstin?`<div style="font-size:11px;color:var(--text-3)">GSTIN: ${s(i.gstin)}</div>`:""}
                  </td>
                  <td class="num">${r(i.totalBilled)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${r(i.totalPaid)}</td>
                  <td class="num" style="font-weight:800;font-size:14px;color:${i.pendingAmount>0?"var(--amber-600)":"var(--text-4)"}">
                    ${r(i.pendingAmount)}
                  </td>
                  <td class="num">
                    ${i.overdueAmount>0?`<span class="badge red">${r(i.overdueAmount)}</span>`:'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12.5px;color:${i.overdueAmount>0?"var(--red-600)":"inherit"}">
                    ${i.oldestDueDate?h(i.oldestDueDate):'<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12px">
                    ${i.lastPaymentDate?`${h(i.lastPaymentDate)} (${r(i.lastPaymentAmount)})`:'<span class="muted">No payments</span>'}
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    ${i.pendingAmount>0?`
                      <button class="btn green small settle-payment-btn" data-client-id="${i.clientId}" data-client-name="${s(i.clientName)}" data-pending="${i.pendingAmount}" title="Record Payment">
                        💵 Collect
                      </button>
                      <button class="btn ghost small reminder-btn" data-client-name="${s(i.clientName)}" data-pending="${i.pendingAmount}" data-overdue="${i.overdueAmount}" data-phone="${s(i.billingPhone||"")}" title="Copy or Send Payment Reminder">
                        💬 Reminder
                      </button>`:'<span class="badge green">Settled</span>'}
                  </td>
                </tr>`).join("")||'<tr><td colspan="8"><div class="empty" style="padding:36px">No client records available.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>`,l.querySelectorAll(".settle-payment-btn").forEach(i=>{i.onclick=()=>{A({clientId:i.dataset.clientId,clientName:i.dataset.clientName,suggestedAmount:Number(i.dataset.pending)||0})}}),l.querySelectorAll(".reminder-btn").forEach(i=>{i.onclick=()=>{ne({clientName:i.dataset.clientName,pending:Number(i.dataset.pending)||0,overdue:Number(i.dataset.overdue)||0,phone:i.dataset.phone})}});const c=document.getElementById("exportReceivablesCsvBtn");c&&(c.onclick=()=>{if(!p.length)return g("No receivables to export",!0);const i=["Client Name","GSTIN","Total Billed","Total Paid","Pending Balance","Overdue Amount","Oldest Due Date","Last Payment Date","Last Payment Amount"],t=p.map(u=>[`"${(u.clientName||"").replace(/"/g,'""')}"`,u.gstin||"",u.totalBilled||0,u.totalPaid||0,u.pendingAmount||0,u.overdueAmount||0,u.oldestDueDate?h(u.oldestDueDate):"",u.lastPaymentDate?h(u.lastPaymentDate):"",u.lastPaymentAmount||0]),v=[i.join(","),...t.map(u=>u.join(","))].join(`
`),a=new Blob([v],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(a),m=document.createElement("a");m.href=d,m.download=`CI360_Receivables_Statement_${new Date().toISOString().slice(0,10)}.csv`,m.click(),URL.revokeObjectURL(d),g("Receivables statement exported to CSV")})}function ne({clientName:l,pending:p,overdue:e,phone:n}){const o=`Dear ${l},

Greetings from CI360 Intelligence.

This is a friendly reminder regarding your outstanding account balance of ${r(p)}${e>0?` (including ${r(e)} overdue)`:""}.

Please arrange for the settlement at your earliest convenience to our registered bank account:
- Bank: HDFC Bank
- A/C: 50200088992211
- IFSC: HDFC0001234
- UPI: ci360@hdfcbank

If you have already processed this remittance, kindly share the UTR / transaction receipt. Thank you for your continued partnership!

Warm regards,
Accounts Department | CI360`,c=k(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:18px">Payment Reminder for ${s(l)}</h3>
        <span class="badge amber" style="font-size:12px">${r(p)} Due</span>
      </div>
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:12px">
        You can copy this formatted payment reminder template to email/chat or launch WhatsApp directly.
      </div>

      <div class="field">
        <label>Reminder Message Template</label>
        <textarea id="reminderTextArea" rows="10" style="font-family:var(--font-mono);font-size:12px;line-height:1.4">${s(o)}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="reminderCloseBtn">Close</button>
        <button class="btn gold" id="reminderCopyBtn">📋 Copy to Clipboard</button>
        <button class="btn green" id="reminderWhatsAppBtn">💬 Open WhatsApp</button>
      </div>
    </div>`);c.querySelector("#reminderCloseBtn").onclick=()=>c.remove(),c.querySelector("#reminderCopyBtn").onclick=()=>{const i=c.querySelector("#reminderTextArea").value;navigator.clipboard.writeText(i).then(()=>{g("Reminder template copied to clipboard!")}).catch(()=>{g("Failed to copy text",!0)})},c.querySelector("#reminderWhatsAppBtn").onclick=()=>{const i=encodeURIComponent(c.querySelector("#reminderTextArea").value),t=(n||"").replace(/[^0-9]/g,""),v=t?`https://wa.me/${t}?text=${i}`:`https://wa.me/?text=${i}`;window.open(v,"_blank")}}async function ie(l){const p=await f("/accounts/billing-profiles");l.innerHTML=`
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
              ${p.map(e=>{const n=e.profile;return`
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
    </section>`,l.querySelectorAll(".gen-monthly-inv-btn").forEach(e=>{e.onclick=async()=>{const n=e.dataset.clientName,o=Number(e.dataset.amount)||0;if(confirm(`Generate this month's invoice for ${n} for ${r(o)}?`))try{e.disabled=!0,e.textContent="…",await z(`/accounts/billing-profiles/${e.dataset.clientId}/generate-invoice`,{amount:o}),g(`Invoice generated successfully for ${n}!`),$="invoices",C()}catch(c){g(c.message,!0),e.disabled=!1,e.textContent="⚡ Gen Invoice"}}}),l.querySelectorAll(".edit-profile-btn").forEach(e=>{e.onclick=()=>{const n=p.find(o=>o.clientId===e.dataset.clientId);le(e.dataset.clientId,e.dataset.clientName,n?n.profile:{})}})}function le(l,p,e={}){const n=k(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Billing Setup: ${s(p)}</h3>
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
    </div>`);n.querySelector("#bpCancelBtn").onclick=()=>n.remove(),n.querySelector("#bpSaveBtn").onclick=async()=>{const o={billingType:n.querySelector("#bpType").value,billingCycle:n.querySelector("#bpCycle").value,retainerAmount:Number(n.querySelector("#bpAmount").value)||0,paymentTermsDays:Number(n.querySelector("#bpTerms").value)||15,gstin:n.querySelector("#bpGstin").value.trim(),panNumber:n.querySelector("#bpPan").value.trim(),billingEmail:n.querySelector("#bpEmail").value.trim(),billingPhone:n.querySelector("#bpPhone").value.trim(),billingAddress:n.querySelector("#bpAddress").value.trim()};try{await L(`/accounts/billing-profiles/${l}`,o),g("Billing profile saved successfully"),n.remove(),x()}catch(c){g(c.message,!0)}}}Z();
