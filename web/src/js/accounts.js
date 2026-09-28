import {
  requireAuth,
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  fmtINR,
  fmtDate,
  escapeHtml,
  openModal,
  flashToast,
  renderAppShell,
  bindAppShellEvents,
  initTheme
} from './api.js';

let user = null;
let currentTab = 'overview';
let cachedClients = [];
let cachedServices = [];

const ACCOUNTS_TABS = [
  { key: 'overview', label: 'Overview', icon: '📊' },
  { key: 'invoices', label: 'Invoices', icon: '📄' },
  { key: 'payments', label: 'Payments', icon: '💵' },
  { key: 'receivables', label: 'Pending & Receivables', icon: '⏳' },
  { key: 'billing', label: 'Billing Profiles', icon: '⚙️' }
];

// Initialize
async function init() {
  initTheme();
  user = requireAuth('accounts');
  if (!user) return;

  try {
    const [clients, services] = await Promise.all([
      apiGet('/clients').catch(() => []),
      apiGet('/services').catch(() => [])
    ]);
    cachedClients = clients || [];
    cachedServices = services || [];
  } catch (e) {
    console.error('Failed to load initial metadata', e);
  }

  render();
}

function render() {
  const app = document.getElementById('app');
  const activeTabObj = ACCOUNTS_TABS.find(t => t.key === currentTab) || ACCOUNTS_TABS[0];

  app.innerHTML = renderAppShell({
    user,
    currentRole: 'accounts',
    activeTab: currentTab,
    tabs: ACCOUNTS_TABS,
    title: activeTabObj.label,
    subtitle: 'Billing, Invoicing & Receivables Intelligence'
  });

  bindAppShellEvents((newTab) => {
    currentTab = newTab;
    render();
  });

  renderContent();
}

window.ci360NavTab = (newTab) => {
  currentTab = newTab;
  render();
};

async function renderContent() {
  const container = document.getElementById('content');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex;justify-content:center;align-items:center;min-height:240px">
      <div class="spinner"></div>
    </div>`;

  try {
    if (currentTab === 'overview') await renderOverviewTab(container);
    else if (currentTab === 'invoices') await renderInvoicesTab(container);
    else if (currentTab === 'payments') await renderPaymentsTab(container);
    else if (currentTab === 'receivables') await renderReceivablesTab(container);
    else if (currentTab === 'billing') await renderBillingProfilesTab(container);
  } catch (err) {
    container.innerHTML = `
      <div class="empty" style="padding:48px 24px">
        <h3 style="color:var(--s-red-text);margin-bottom:8px">Unable to load accounts data</h3>
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px">${escapeHtml(err.message)}</p>
        <button class="btn gold small" id="retryAccountsBtn">Retry</button>
      </div>`;
    const retryBtn = document.getElementById('retryAccountsBtn');
    if (retryBtn) retryBtn.onclick = () => renderContent();
  }
}

/* ─────────────────────────────────────────────────────────────
   TAB 1: OVERVIEW & ANALYTICS
   ───────────────────────────────────────────────────────────── */
async function renderOverviewTab(container) {
  const data = await apiGet('/accounts/dashboard');
  const m = data.metrics || {};
  const aging = data.aging || { current: 0, days31to60: 0, days61to90: 0, days90plus: 0 };
  const totalAgingPending = (aging.current + aging.days31to60 + aging.days61to90 + aging.days90plus) || 1;

  const currentPct = Math.round((aging.current / totalAgingPending) * 100);
  const d31Pct = Math.round((aging.days31to60 / totalAgingPending) * 100);
  const d61Pct = Math.round((aging.days61to90 / totalAgingPending) * 100);
  const d90Pct = Math.max(0, 100 - (currentPct + d31Pct + d61Pct));

  const isEkta = user && (/ekta/i.test(user.name) || /ekta/i.test(user.email));
  const isSuperadmin = user && (user.role === 'superadmin' || user.role === 'admin');
  const hasEmployeeAccess = isEkta || isSuperadmin || (user && user.personnelId);

  container.innerHTML = `
    <section class="block">
      <div class="accounts-header-banner">
        <div class="accounts-header-title">
          <h2>Accounts & Finance Hub ${isEkta ? `<span class="badge" style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:12px;margin-left:8px;vertical-align:middle;padding:4px 8px;border-radius:6px">Ekta · Finance Manager</span>` : ''}</h2>
          <div class="accounts-header-subtitle">Real-time revenue tracking, invoice lifecycle, and client pending balances.</div>
        </div>
        <div class="accounts-header-actions">
          ${isSuperadmin ? `
            <a href="/admin" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
              <span>← Admin Portal</span>
            </a>` : ''}
          ${hasEmployeeAccess ? `
            <a href="/employee" class="btn ghost small" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px" title="Open Daily Tasks & Employee Workspace">
              <span>💼 Employee Workspace →</span>
            </a>` : ''}
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
          <div class="kpi-value">${fmtINR(m.totalBilled || 0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge blue">${m.invoiceCounts ? m.invoiceCounts.total : 0} Total</span>
            <span>All active billing</span>
          </div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Payments Collected</span>
            <div class="kpi-icon" style="background:var(--s-green-bg);color:var(--green-600)">💵</div>
          </div>
          <div class="kpi-value" style="color:var(--green-600)">${fmtINR(m.totalReceived || 0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge green">${m.collectionRate || 0}% Cleared</span>
            <span>of total billed</span>
          </div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--amber-500)">
          <div class="kpi-header">
            <span class="kpi-label">Total Pending Dues</span>
            <div class="kpi-icon" style="background:#FFFBEB;color:var(--amber-600)">⏳</div>
          </div>
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(m.totalPending || 0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge amber">${(m.invoiceCounts?.partially_paid || 0) + (m.invoiceCounts?.issued || 0)} Invoices</span>
            <span>Awaiting full settlement</span>
          </div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Overdue Amount</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${fmtINR(m.totalOverdue || 0)}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:6px;display:flex;align-items:center;gap:6px">
            <span class="badge red">${m.invoiceCounts ? m.invoiceCounts.overdue : 0} Overdue</span>
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
            <span class="badge gold">${fmtINR(m.totalPending || 0)} Pending</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">Visual distribution of pending receivables based on invoice due dates.</div>
          
          <div class="aging-bar-container">
            <div class="aging-segment current" style="width:${currentPct}%" title="0-30 Days: ${fmtINR(aging.current)}"></div>
            <div class="aging-segment days31to60" style="width:${d31Pct}%" title="31-60 Days: ${fmtINR(aging.days31to60)}"></div>
            <div class="aging-segment days61to90" style="width:${d61Pct}%" title="61-90 Days: ${fmtINR(aging.days61to90)}"></div>
            <div class="aging-segment days90plus" style="width:${d90Pct}%" title="90+ Days: ${fmtINR(aging.days90plus)}"></div>
          </div>

          <div class="aging-legend">
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--green-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">0 - 30 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${fmtINR(aging.current)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--amber-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">31 - 60 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${fmtINR(aging.days31to60)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:#F97316"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">61 - 90 Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--text-1)">${fmtINR(aging.days61to90)}</div>
              </div>
            </div>
            <div class="aging-legend-item">
              <div class="aging-dot" style="background:var(--red-500)"></div>
              <div>
                <div style="font-size:11px;color:var(--text-3);font-weight:600">90+ Days</div>
                <div style="font-size:13px;font-weight:800;color:var(--red-600)">${fmtINR(aging.days90plus)}</div>
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
            ${(data.monthlyTrend || []).map(item => {
              const maxVal = Math.max(...(data.monthlyTrend || []).map(t => Math.max(t.billed, t.collected)), 1000);
              const billedWidth = Math.round((item.billed / maxVal) * 100);
              const collectedWidth = Math.round((item.collected / maxVal) * 100);
              return `
                <div style="display:flex;align-items:center;gap:12px;font-size:12px">
                  <span style="width:50px;font-weight:700;color:var(--text-2)">${item.month}</span>
                  <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--brand-500);width:${Math.max(4, billedWidth)}%;border-radius:4px" title="Billed: ${fmtINR(item.billed)}"></div>
                      <span style="font-size:10.5px;color:var(--text-3);min-width:60px">${fmtINR(item.billed)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="height:7px;background:var(--green-500);width:${Math.max(4, collectedWidth)}%;border-radius:4px" title="Collected: ${fmtINR(item.collected)}"></div>
                      <span style="font-size:10.5px;color:var(--green-600);font-weight:600;min-width:60px">${fmtINR(item.collected)}</span>
                    </div>
                  </div>
                </div>`;
            }).join('') || '<div class="empty" style="padding:16px">No trend data yet</div>'}
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
                ${(data.topClientsPending || []).slice(0, 5).map(c => `
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${escapeHtml(c.clientName)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${c.invoiceCount} invoices</div>
                    </td>
                    <td class="num" style="font-weight:700;color:var(--amber-600)">${fmtINR(c.pendingAmount)}</td>
                    <td class="num">
                      ${c.overdueAmount > 0 ? `<span class="badge red">${fmtINR(c.overdueAmount)}</span>` : `<span class="muted">—</span>`}
                    </td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn green small quick-collect-btn" data-client-id="${c.clientId}" data-client-name="${escapeHtml(c.clientName)}" data-pending="${c.pendingAmount}">
                        Collect
                      </button>
                    </td>
                  </tr>`).join('') || `<tr><td colspan="4"><div class="empty" style="padding:24px">No pending balances! All dues collected. 🎉</div></td></tr>`}
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
                ${(data.recentInvoices || []).slice(0, 5).map(inv => `
                  <tr>
                    <td style="padding-left:20px">
                      <strong>${escapeHtml(inv.invoiceNumber)}</strong>
                      <div style="font-size:11px;color:var(--text-3)">${fmtDate(inv.issueDate)}</div>
                    </td>
                    <td>${escapeHtml(inv.clientName)}</td>
                    <td class="num" style="font-weight:700">${fmtINR(inv.totalAmount)}</td>
                    <td>${renderInvoiceStatusBadge(inv.status)}</td>
                    <td class="num" style="padding-right:20px">
                      <button class="btn ghost small view-invoice-btn" data-id="${inv._id}">View</button>
                    </td>
                  </tr>`).join('') || `<tr><td colspan="5"><div class="empty" style="padding:24px">No invoices generated yet.</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`;

  // Bind overview actions
  document.getElementById('quickNewInvoiceBtn').onclick = () => openCreateInvoiceModal();
  document.getElementById('quickRecordPaymentBtn').onclick = () => openRecordPaymentModal();

  const seedBtn = document.getElementById('seedDemoAccountsBtn');
  if (seedBtn) {
    seedBtn.onclick = async () => {
      if (!confirm('Load realistic demo invoices, payments, and billing profiles?')) return;
      try {
        seedBtn.disabled = true;
        seedBtn.textContent = 'Loading demo data…';
        const res = await apiPost('/accounts/seed-demo', {});
        flashToast(res.message || 'Demo data loaded successfully!');
        renderContent();
      } catch (err) {
        flashToast(err.message, true);
        seedBtn.disabled = false;
        seedBtn.textContent = '⚡ Seed Demo Data';
      }
    };
  }

  document.getElementById('viewAllReceivablesBtn').onclick = () => {
    currentTab = 'receivables';
    render();
  };
  document.getElementById('viewAllInvoicesBtn').onclick = () => {
    currentTab = 'invoices';
    render();
  };

  container.querySelectorAll('.quick-collect-btn').forEach(b => {
    b.onclick = () => {
      openRecordPaymentModal({
        clientId: b.dataset.clientId,
        clientName: b.dataset.clientName,
        suggestedAmount: Number(b.dataset.pending) || 0
      });
    };
  });

  container.querySelectorAll('.view-invoice-btn').forEach(b => {
    b.onclick = () => openViewInvoiceModal(b.dataset.id);
  });
}

function renderInvoiceStatusBadge(status) {
  if (status === 'paid') return `<span class="badge green">Paid</span>`;
  if (status === 'partially_paid') return `<span class="badge blue">Partially Paid</span>`;
  if (status === 'overdue') return `<span class="badge red">Overdue</span>`;
  if (status === 'issued') return `<span class="badge amber">Issued</span>`;
  if (status === 'draft') return `<span class="badge gray">Draft</span>`;
  if (status === 'cancelled') return `<span class="badge red">Cancelled</span>`;
  return `<span class="badge">${escapeHtml(status || '—')}</span>`;
}

/* ─────────────────────────────────────────────────────────────
   TAB 2: INVOICES MANAGEMENT
   ───────────────────────────────────────────────────────────── */
let invoiceFilterStatus = 'all';
let invoiceFilterClient = '';
let invoiceSearchQuery = '';

async function renderInvoicesTab(container) {
  let query = `?status=${encodeURIComponent(invoiceFilterStatus)}`;
  if (invoiceFilterClient) query += `&clientId=${encodeURIComponent(invoiceFilterClient)}`;
  if (invoiceSearchQuery) query += `&search=${encodeURIComponent(invoiceSearchQuery)}`;

  const invoices = await apiGet('/accounts/invoices' + query);

  const totalBilled = invoices.reduce((s, i) => s + (i.totalAmount || 0), 0);
  const totalPaid = invoices.reduce((s, i) => s + (i.amountPaid || 0), 0);
  const totalPending = invoices.reduce((s, i) => s + (i.pendingAmount || 0), 0);

  container.innerHTML = `
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Invoices <span class="eyebrow">${invoices.length} invoices</span></h2>
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
          <span style="color:var(--text-3)">Total Billed:</span> <strong>${fmtINR(totalBilled)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Collected:</span> <strong style="color:var(--green-600)">${fmtINR(totalPaid)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Pending:</span> <strong style="color:var(--amber-600)">${fmtINR(totalPending)}</strong>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="invoiceSearchInput" placeholder="Search by invoice #, client name, service…" value="${escapeHtml(invoiceSearchQuery)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="invoiceClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${cachedClients.map(cl => `<option value="${cl._id}" ${invoiceFilterClient === cl._id ? 'selected' : ''}>${escapeHtml(cl.name)}</option>`).join('')}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${['all', 'issued', 'partially_paid', 'paid', 'overdue', 'draft'].map(st => `
              <button class="btn ghost small invoice-status-filter ${invoiceFilterStatus === st ? 'active gold' : ''}" data-status="${st}">
                ${st === 'all' ? 'All' : st.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>`).join('')}
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
              ${invoices.map(inv => `
                <tr>
                  <td style="padding-left:22px">
                    <strong style="font-family:var(--font-heading);color:var(--brand-600)">${escapeHtml(inv.invoiceNumber)}</strong>
                  </td>
                  <td><strong>${escapeHtml(inv.clientName)}</strong></td>
                  <td><span class="badge">${inv.billingType ? inv.billingType.toUpperCase() : 'RETAINER'}</span></td>
                  <td style="font-size:12.5px">${fmtDate(inv.issueDate)}</td>
                  <td style="font-size:12.5px;color:${inv.status === 'overdue' ? 'var(--red-600)' : 'inherit'}">${fmtDate(inv.dueDate)}</td>
                  <td class="num" style="font-weight:700">${fmtINR(inv.totalAmount)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(inv.amountPaid)}</td>
                  <td class="num" style="font-weight:700;color:${inv.pendingAmount > 0 ? 'var(--amber-600)' : 'var(--text-4)'}">
                    ${fmtINR(inv.pendingAmount)}
                  </td>
                  <td>${renderInvoiceStatusBadge(inv.status)}</td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    <button class="btn ghost small view-invoice-btn" data-id="${inv._id}" title="View and Print Invoice">👁️ View</button>
                    ${inv.pendingAmount > 0 ? `
                      <button class="btn green small pay-invoice-btn" data-id="${inv._id}" data-num="${escapeHtml(inv.invoiceNumber)}" data-client-id="${inv.clientId}" data-client-name="${escapeHtml(inv.clientName)}" data-pending="${inv.pendingAmount}" title="Record Payment">
                        💵 Pay
                      </button>` : ''}
                    <button class="btn ghost small edit-invoice-btn" data-id="${inv._id}" title="Edit Invoice">✏️</button>
                    <button class="btn danger small delete-invoice-btn" data-id="${inv._id}" title="Delete Invoice">🗑️</button>
                  </td>
                </tr>`).join('') || `<tr><td colspan="10"><div class="empty" style="padding:36px">No invoices match the current filters.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

  // Bind filter events
  const sInput = document.getElementById('invoiceSearchInput');
  let searchTimer = null;
  sInput.oninput = () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      invoiceSearchQuery = sInput.value.trim();
      renderContent();
    }, 300);
  };

  document.getElementById('invoiceClientFilter').onchange = (e) => {
    invoiceFilterClient = e.target.value;
    renderContent();
  };

  container.querySelectorAll('.invoice-status-filter').forEach(b => {
    b.onclick = () => {
      invoiceFilterStatus = b.dataset.status;
      renderContent();
    };
  });

  document.getElementById('newInvoiceBtn').onclick = () => openCreateInvoiceModal();

  container.querySelectorAll('.view-invoice-btn').forEach(b => {
    b.onclick = () => openViewInvoiceModal(b.dataset.id);
  });

  container.querySelectorAll('.edit-invoice-btn').forEach(b => {
    b.onclick = () => openEditInvoiceModal(b.dataset.id);
  });

  container.querySelectorAll('.pay-invoice-btn').forEach(b => {
    b.onclick = () => {
      openRecordPaymentModal({
        invoiceId: b.dataset.id,
        invoiceNumber: b.dataset.num,
        clientId: b.dataset.clientId,
        clientName: b.dataset.clientName,
        suggestedAmount: Number(b.dataset.pending) || 0
      });
    };
  });

  container.querySelectorAll('.delete-invoice-btn').forEach(b => {
    b.onclick = async () => {
      if (!confirm('Are you sure you want to delete this invoice? This cannot be undone.')) return;
      try {
        await apiDelete('/accounts/invoices/' + b.dataset.id);
        flashToast('Invoice deleted successfully');
        renderContent();
      } catch (err) {
        flashToast(err.message, true);
      }
    };
  });

  const exportBtn = document.getElementById('exportInvoicesCsvBtn');
  if (exportBtn) {
    exportBtn.onclick = () => exportInvoicesToCsv(invoices);
  }
}

function exportInvoicesToCsv(invoices) {
  if (!invoices || !invoices.length) {
    flashToast('No invoices to export', true);
    return;
  }
  const headers = ['Invoice Number', 'Client Name', 'Type', 'Issue Date', 'Due Date', 'Subtotal', 'Tax (18%)', 'Total Amount', 'Amount Paid', 'Pending Amount', 'Status'];
  const rows = invoices.map(i => [
    i.invoiceNumber,
    `"${(i.clientName || '').replace(/"/g, '""')}"`,
    i.billingType || '',
    fmtDate(i.issueDate),
    fmtDate(i.dueDate),
    i.subtotal || 0,
    i.taxAmount || 0,
    i.totalAmount || 0,
    i.amountPaid || 0,
    i.pendingAmount || 0,
    i.status
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CI360_Invoices_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  flashToast('Invoices exported to CSV');
}

/* ─────────────────────────────────────────────────────────────
   CREATE / EDIT INVOICE MODAL
   ───────────────────────────────────────────────────────────── */
async function openCreateInvoiceModal(presetClientId) {
  let nextInvNumber = 'INV-2026-0001';
  try {
    const res = await apiGet('/accounts/next-invoice-number');
    if (res && res.invoiceNumber) nextInvNumber = res.invoiceNumber;
  } catch (e) {}

  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 15);

  const initialItems = [
    { description: 'Strategic Intelligence & Creative Retainer', serviceId: '', quantity: 1, rate: 50000, amount: 50000 }
  ];

  const modal = openModal(`
    <div style="max-width:680px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Create New Invoice</h3>
        <span class="badge gold" style="font-family:var(--font-heading);font-size:12px">${escapeHtml(nextInvNumber)}</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client *</label>
          <select id="modalInvClient" required>
            <option value="">Select client…</option>
            ${cachedClients.map(c => `<option value="${c._id}" ${presetClientId === c._id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Invoice Number</label>
          <input type="text" id="modalInvNum" value="${escapeHtml(nextInvNumber)}" required>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Issue Date</label>
          <input type="date" id="modalInvIssueDate" value="${new Date().toISOString().slice(0, 10)}">
        </div>
        <div class="field">
          <label>Due Date *</label>
          <input type="date" id="modalInvDueDate" value="${defaultDueDate.toISOString().slice(0, 10)}" required>
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
    </div>`);

  let currentItems = [...initialItems];

  function renderItemRows() {
    const list = modal.querySelector('#modalItemsContainer');
    list.innerHTML = currentItems.map((item, idx) => `
      <div style="display:flex;gap:8px;align-items:center;background:var(--bg-card);border:1px solid var(--border-xs);padding:8px 10px;border-radius:var(--r-sm)">
        <div style="flex:2">
          <input type="text" class="item-desc" data-idx="${idx}" placeholder="Description / Service" value="${escapeHtml(item.description)}" style="margin:0;font-size:12px">
        </div>
        <div style="width:70px">
          <input type="number" class="item-qty" data-idx="${idx}" placeholder="Qty" min="1" value="${item.quantity}" style="margin:0;font-size:12px;text-align:center">
        </div>
        <div style="width:110px">
          <input type="number" class="item-rate" data-idx="${idx}" placeholder="Rate (₹)" min="0" value="${item.rate}" style="margin:0;font-size:12px;text-align:right">
        </div>
        <div style="width:90px;font-weight:700;font-size:12.5px;text-align:right">
          ${fmtINR(item.amount)}
        </div>
        <div>
          ${currentItems.length > 1 ? `<button type="button" class="btn danger small remove-item-btn" data-idx="${idx}" style="padding:4px 8px">✕</button>` : ''}
        </div>
      </div>`).join('');

    // Re-bind row inputs
    list.querySelectorAll('.item-desc').forEach(i => {
      i.oninput = (e) => { currentItems[Number(e.target.dataset.idx)].description = e.target.value; };
    });
    list.querySelectorAll('.item-qty').forEach(i => {
      i.oninput = (e) => {
        const idx = Number(e.target.dataset.idx);
        const qty = Number(e.target.value) || 1;
        currentItems[idx].quantity = qty;
        currentItems[idx].amount = qty * (currentItems[idx].rate || 0);
        renderItemRows();
        recalculateTotals();
      };
    });
    list.querySelectorAll('.item-rate').forEach(i => {
      i.oninput = (e) => {
        const idx = Number(e.target.dataset.idx);
        const rate = Number(e.target.value) || 0;
        currentItems[idx].rate = rate;
        currentItems[idx].amount = (currentItems[idx].quantity || 1) * rate;
        renderItemRows();
        recalculateTotals();
      };
    });
    list.querySelectorAll('.remove-item-btn').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.idx);
        currentItems.splice(idx, 1);
        renderItemRows();
        recalculateTotals();
      };
    });
  }

  function recalculateTotals() {
    const subtotal = currentItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const taxRate = Number(modal.querySelector('#modalCalcTaxRate').value) || 0;
    const discount = Number(modal.querySelector('#modalCalcDiscount').value) || 0;
    const taxable = Math.max(0, subtotal - discount);
    const taxAmount = Math.round(taxable * (taxRate / 100));
    const grandTotal = taxable + taxAmount;

    modal.querySelector('#modalCalcSubtotal').textContent = fmtINR(subtotal);
    modal.querySelector('#modalCalcTaxAmount').textContent = fmtINR(taxAmount);
    modal.querySelector('#modalCalcTotal').textContent = fmtINR(grandTotal);
  }

  modal.querySelector('#modalAddItemRowBtn').onclick = () => {
    currentItems.push({ description: '', serviceId: '', quantity: 1, rate: 0, amount: 0 });
    renderItemRows();
    recalculateTotals();
  };

  modal.querySelector('#modalCalcTaxRate').onchange = recalculateTotals;
  modal.querySelector('#modalCalcDiscount').oninput = recalculateTotals;

  // Prefill client profile details if client selected
  modal.querySelector('#modalInvClient').onchange = async (e) => {
    const cid = e.target.value;
    if (!cid) return;
    try {
      const prof = await apiGet(`/accounts/billing-profiles`).then(all => all.find(p => p.clientId === cid)?.profile);
      if (prof) {
        if (prof.retainerAmount && currentItems.length === 1 && currentItems[0].rate === 50000) {
          currentItems[0].rate = prof.retainerAmount;
          currentItems[0].amount = prof.retainerAmount;
          renderItemRows();
          recalculateTotals();
        }
        if (prof.gstin) modal.querySelector('#modalInvGstin').value = prof.gstin;
        if (prof.billingType) modal.querySelector('#modalInvType').value = prof.billingType;
      }
    } catch (err) {}
  };

  renderItemRows();
  recalculateTotals();

  modal.querySelector('#modalCancelInvBtn').onclick = () => modal.remove();

  modal.querySelector('#modalSaveInvBtn').onclick = async () => {
    const clientId = modal.querySelector('#modalInvClient').value;
    const invoiceNumber = modal.querySelector('#modalInvNum').value.trim();
    const issueDate = modal.querySelector('#modalInvIssueDate').value;
    const dueDate = modal.querySelector('#modalInvDueDate').value;
    const billingType = modal.querySelector('#modalInvType').value;
    const taxRate = Number(modal.querySelector('#modalCalcTaxRate').value) || 0;
    const discount = Number(modal.querySelector('#modalCalcDiscount').value) || 0;
    const paymentTerms = modal.querySelector('#modalInvTerms').value.trim();
    const gstin = modal.querySelector('#modalInvGstin').value.trim();
    const notes = modal.querySelector('#modalInvNotes').value.trim();

    if (!clientId) {
      flashToast('Please select a client', true);
      return;
    }
    if (!dueDate) {
      flashToast('Please select a due date', true);
      return;
    }
    if (!currentItems.length || !currentItems.some(i => i.amount > 0)) {
      flashToast('Please provide at least one valid line item with an amount', true);
      return;
    }

    const payload = {
      clientId,
      invoiceNumber,
      issueDate,
      dueDate,
      billingType,
      items: currentItems,
      discount,
      taxRate,
      paymentTerms,
      gstin,
      notes
    };

    try {
      const saveBtn = modal.querySelector('#modalSaveInvBtn');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Generating Invoice…';

      await apiPost('/accounts/invoices', payload);
      flashToast('Invoice created and issued successfully!');
      modal.remove();
      renderContent();
    } catch (err) {
      flashToast(err.message, true);
      modal.querySelector('#modalSaveInvBtn').disabled = false;
      modal.querySelector('#modalSaveInvBtn').textContent = 'Create & Issue Invoice';
    }
  };
}

async function openEditInvoiceModal(invoiceId) {
  const data = await apiGet('/accounts/invoices/' + invoiceId);
  const inv = data.invoice;
  if (!inv) return;

  const modal = openModal(`
    <div style="max-width:640px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Edit Invoice ${escapeHtml(inv.invoiceNumber)}</h3>
        ${renderInvoiceStatusBadge(inv.status)}
      </div>

      <div class="field-row">
        <div class="field">
          <label>Client</label>
          <input type="text" value="${escapeHtml(inv.clientName)}" disabled>
        </div>
        <div class="field">
          <label>Status</label>
          <select id="editInvStatus">
            <option value="issued" ${inv.status === 'issued' ? 'selected' : ''}>Issued</option>
            <option value="partially_paid" ${inv.status === 'partially_paid' ? 'selected' : ''}>Partially Paid</option>
            <option value="paid" ${inv.status === 'paid' ? 'selected' : ''}>Paid</option>
            <option value="overdue" ${inv.status === 'overdue' ? 'selected' : ''}>Overdue</option>
            <option value="draft" ${inv.status === 'draft' ? 'selected' : ''}>Draft</option>
            <option value="cancelled" ${inv.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Issue Date</label>
          <input type="date" id="editInvIssueDate" value="${inv.issueDate ? new Date(inv.issueDate).toISOString().slice(0, 10) : ''}">
        </div>
        <div class="field">
          <label>Due Date</label>
          <input type="date" id="editInvDueDate" value="${inv.dueDate ? new Date(inv.dueDate).toISOString().slice(0, 10) : ''}">
        </div>
      </div>

      <div class="field">
        <label>Payment Terms</label>
        <input type="text" id="editInvTerms" value="${escapeHtml(inv.paymentTerms || '')}">
      </div>

      <div class="field">
        <label>GSTIN</label>
        <input type="text" id="editInvGstin" value="${escapeHtml(inv.gstin || '')}">
      </div>

      <div class="field">
        <label>Notes</label>
        <textarea id="editInvNotes" rows="2">${escapeHtml(inv.notes || '')}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="editCancelBtn">Cancel</button>
        <button class="btn gold" id="editSaveBtn">Save Changes</button>
      </div>
    </div>`);

  modal.querySelector('#editCancelBtn').onclick = () => modal.remove();

  modal.querySelector('#editSaveBtn').onclick = async () => {
    const payload = {
      status: modal.querySelector('#editInvStatus').value,
      issueDate: modal.querySelector('#editInvIssueDate').value,
      dueDate: modal.querySelector('#editInvDueDate').value,
      paymentTerms: modal.querySelector('#editInvTerms').value.trim(),
      gstin: modal.querySelector('#editInvGstin').value.trim(),
      notes: modal.querySelector('#editInvNotes').value.trim()
    };

    try {
      await apiPut('/accounts/invoices/' + invoiceId, payload);
      flashToast('Invoice updated successfully');
      modal.remove();
      renderContent();
    } catch (err) {
      flashToast(err.message, true);
    }
  };
}

/* ─────────────────────────────────────────────────────────────
   VIEW & PRINT INVOICE MODAL
   ───────────────────────────────────────────────────────────── */
async function openViewInvoiceModal(invoiceId) {
  const data = await apiGet('/accounts/invoices/' + invoiceId);
  const inv = data.invoice;
  const payments = data.payments || [];
  if (!inv) return;

  const modal = openModal(`
    <div style="max-width:860px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px" class="no-print">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:18px;font-weight:800;color:var(--text-1)">Invoice Details</span>
          ${renderInvoiceStatusBadge(inv.status)}
        </div>
        <div style="display:flex;gap:8px">
          ${inv.pendingAmount > 0 ? `
            <button class="btn green small" id="viewModalPayBtn">💵 Record Payment</button>` : ''}
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
            <div class="invoice-number-badge">${escapeHtml(inv.invoiceNumber)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:4px">Date: <strong>${fmtDate(inv.issueDate)}</strong></div>
            <div style="font-size:12px;color:${inv.status === 'overdue' ? 'var(--red-600)' : 'var(--text-3)'}">
              Due Date: <strong>${fmtDate(inv.dueDate)}</strong>
            </div>
          </div>
        </div>

        <!-- Bill To Grid -->
        <div class="invoice-grid-details">
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Billed To</div>
            <div style="font-size:16px;font-weight:800;color:var(--text-1)">${escapeHtml(inv.clientName)}</div>
            ${inv.gstin ? `<div style="font-size:12px;color:var(--text-2);margin-top:2px">GSTIN: <strong>${escapeHtml(inv.gstin)}</strong></div>` : ''}
            ${inv.billingAddress ? `<div style="font-size:12px;color:var(--text-3);margin-top:2px">${escapeHtml(inv.billingAddress)}</div>` : ''}
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;font-weight:700;color:var(--text-4);text-transform:uppercase;margin-bottom:4px">Payment Status</div>
            <div>${renderInvoiceStatusBadge(inv.status)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:6px">Pending Balance: <strong style="color:${inv.pendingAmount > 0 ? 'var(--amber-600)' : 'var(--green-600)'};font-size:14px">${fmtINR(inv.pendingAmount)}</strong></div>
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
            ${(inv.items || []).map(item => `
              <tr>
                <td>
                  <strong>${escapeHtml(item.description)}</strong>
                  ${item.serviceName ? `<div style="font-size:11px;color:var(--text-3)">Service: ${escapeHtml(item.serviceName)}</div>` : ''}
                </td>
                <td style="text-align:center">${item.quantity || 1}</td>
                <td style="text-align:right">${fmtINR(item.rate)}</td>
                <td style="text-align:right;font-weight:700">${fmtINR(item.amount)}</td>
              </tr>`).join('')}
          </tbody>
        </table>

        <!-- Totals Wrap -->
        <div class="invoice-totals-wrap">
          <div class="invoice-totals-box">
            <div class="invoice-total-row">
              <span>Subtotal</span>
              <strong>${fmtINR(inv.subtotal)}</strong>
            </div>
            ${inv.discount > 0 ? `
              <div class="invoice-total-row">
                <span>Discount</span>
                <span style="color:var(--green-600)">- ${fmtINR(inv.discount)}</span>
              </div>` : ''}
            <div class="invoice-total-row">
              <span>GST (${inv.taxRate || 18}%)</span>
              <span>${fmtINR(inv.taxAmount)}</span>
            </div>
            <div class="invoice-total-row grand-total">
              <span>Total Amount</span>
              <span>${fmtINR(inv.totalAmount)}</span>
            </div>
            <div class="invoice-total-row" style="padding-top:8px">
              <span>Amount Paid</span>
              <span style="color:var(--green-600);font-weight:700">${fmtINR(inv.amountPaid)}</span>
            </div>
            <div class="invoice-total-row" style="font-size:15px;font-weight:800;color:${inv.pendingAmount > 0 ? 'var(--amber-600)' : 'var(--green-600)'}">
              <span>Pending Amount</span>
              <span>${fmtINR(inv.pendingAmount)}</span>
            </div>
          </div>
        </div>

        <!-- Bank Details & Terms Footer -->
        <div class="invoice-bank-footer">
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Bank Transfer & UPI Details</div>
            <div>Account Name: <strong>${escapeHtml(inv.bankDetails?.accountName || 'CI360 Intelligence')}</strong></div>
            <div>Bank: <strong>${escapeHtml(inv.bankDetails?.bankName || 'HDFC Bank')}</strong></div>
            <div>A/C Number: <strong>${escapeHtml(inv.bankDetails?.accountNumber || '50200088992211')}</strong></div>
            <div>IFSC Code: <strong>${escapeHtml(inv.bankDetails?.ifscCode || 'HDFC0001234')}</strong></div>
            <div>UPI ID: <strong>${escapeHtml(inv.bankDetails?.upiId || 'ci360@hdfcbank')}</strong></div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--text-2);margin-bottom:4px;text-transform:uppercase;font-size:11px">Terms & Conditions</div>
            <div style="line-height:1.4">${escapeHtml(inv.paymentTerms || 'Payment due within 15 days of invoice date.')}</div>
            <div style="margin-top:8px;font-style:italic;color:var(--text-4)">${escapeHtml(inv.notes || '')}</div>
          </div>
        </div>
      </div>

      <!-- Linked Payment History (if any) -->
      ${payments.length > 0 ? `
        <div style="margin-top:20px" class="no-print">
          <h4 style="font-size:14px;font-weight:800;color:var(--text-1);margin:0 0 10px 0">Linked Payments (${payments.length})</h4>
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
                ${payments.map(p => `
                  <tr>
                    <td><strong>${escapeHtml(p.paymentNumber)}</strong></td>
                    <td>${fmtDate(p.paymentDate)}</td>
                    <td><span class="badge">${escapeHtml(p.paymentMethod)}</span></td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${escapeHtml(p.referenceId || '—')}</td>
                    <td class="num" style="color:var(--green-600);font-weight:700">${fmtINR(p.amount)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>` : ''}
    </div>`);

  modal.querySelector('#viewModalCloseBtn').onclick = () => modal.remove();

  modal.querySelector('#viewModalPrintBtn').onclick = () => {
    window.print();
  };

  const payBtn = modal.querySelector('#viewModalPayBtn');
  if (payBtn) {
    payBtn.onclick = () => {
      modal.remove();
      openRecordPaymentModal({
        invoiceId: inv._id,
        invoiceNumber: inv.invoiceNumber,
        clientId: inv.clientId,
        clientName: inv.clientName,
        suggestedAmount: inv.pendingAmount
      });
    };
  }
}

/* ─────────────────────────────────────────────────────────────
   TAB 3: PAYMENTS MANAGEMENT
   ───────────────────────────────────────────────────────────── */
let paymentFilterMethod = 'all';
let paymentFilterClient = '';
let paymentSearchQuery = '';

async function renderPaymentsTab(container) {
  let query = `?paymentMethod=${encodeURIComponent(paymentFilterMethod)}`;
  if (paymentFilterClient) query += `&clientId=${encodeURIComponent(paymentFilterClient)}`;
  if (paymentSearchQuery) query += `&search=${encodeURIComponent(paymentSearchQuery)}`;

  const payments = await apiGet('/accounts/payments' + query);
  const totalCollections = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  container.innerHTML = `
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Payments Ledger <span class="eyebrow">${payments.length} transactions</span></h2>
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
          <span style="color:var(--text-3)">Total Collections:</span> <strong style="color:var(--green-600)">${fmtINR(totalCollections)}</strong>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-sm);padding:8px 14px;border-radius:var(--r-sm);font-size:12px">
          <span style="color:var(--text-3)">Average Payment:</span> <strong>${fmtINR(payments.length ? totalCollections / payments.length : 0)}</strong>
        </div>
      </div>

      <!-- Filters -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <input type="text" id="paymentSearchInput" placeholder="Search by payment #, UTR, client name, invoice…" value="${escapeHtml(paymentSearchQuery)}" style="margin:0;width:100%">
          </div>
          <div style="min-width:160px">
            <select id="paymentClientFilter" style="margin:0;width:100%">
              <option value="">All Clients</option>
              ${cachedClients.map(c => `<option value="${c._id}" ${paymentFilterClient === c._id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
            </select>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${['all', 'bank_transfer', 'upi', 'cheque', 'card', 'cash'].map(m => `
              <button class="btn ghost small payment-method-filter ${paymentFilterMethod === m ? 'active gold' : ''}" data-method="${m}">
                ${m === 'all' ? 'All Methods' : m.replace('_', ' ').toUpperCase()}
              </button>`).join('')}
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
              ${payments.map(p => `
                <tr>
                  <td style="padding-left:22px">
                    <strong style="font-family:var(--font-heading);color:var(--green-600)">${escapeHtml(p.paymentNumber)}</strong>
                  </td>
                  <td><strong>${escapeHtml(p.clientName)}</strong></td>
                  <td>
                    ${p.invoiceNumber ? `<span class="badge blue">${escapeHtml(p.invoiceNumber)}</span>` : `<span class="muted">Advance / General</span>`}
                  </td>
                  <td style="font-size:12.5px">${fmtDate(p.paymentDate)}</td>
                  <td>
                    <span class="badge ${p.paymentMethod === 'upi' ? 'gold' : p.paymentMethod === 'bank_transfer' ? 'blue' : 'green'}">
                      ${p.paymentMethod === 'bank_transfer' ? '🏦 RTGS/NEFT' : p.paymentMethod === 'upi' ? '📱 UPI' : p.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td style="font-family:var(--font-mono);font-size:12px">${escapeHtml(p.referenceId || '—')}</td>
                  <td class="num" style="font-weight:800;color:var(--green-600);font-size:14px">${fmtINR(p.amount)}</td>
                  <td style="font-size:12px;color:var(--text-3)">${escapeHtml(p.recordedByName || 'Accounts')}</td>
                  <td class="num" style="padding-right:22px">
                    <button class="btn danger small delete-payment-btn" data-id="${p._id}" title="Delete payment & restore invoice balance">
                      🗑️
                    </button>
                  </td>
                </tr>`).join('') || `<tr><td colspan="9"><div class="empty" style="padding:36px">No payment records match the current filters.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

  // Bind filter events
  const sInput = document.getElementById('paymentSearchInput');
  let searchTimer = null;
  sInput.oninput = () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      paymentSearchQuery = sInput.value.trim();
      renderContent();
    }, 300);
  };

  document.getElementById('paymentClientFilter').onchange = (e) => {
    paymentFilterClient = e.target.value;
    renderContent();
  };

  container.querySelectorAll('.payment-method-filter').forEach(b => {
    b.onclick = () => {
      paymentFilterMethod = b.dataset.method;
      renderContent();
    };
  });

  document.getElementById('newPaymentBtn').onclick = () => openRecordPaymentModal();

  container.querySelectorAll('.delete-payment-btn').forEach(b => {
    b.onclick = async () => {
      if (!confirm('Delete this payment record? This will restore the pending amount on the linked invoice.')) return;
      try {
        await apiDelete('/accounts/payments/' + b.dataset.id);
        flashToast('Payment deleted and invoice balance restored');
        renderContent();
      } catch (err) {
        flashToast(err.message, true);
      }
    };
  });

  const exportBtn = document.getElementById('exportPaymentsCsvBtn');
  if (exportBtn) {
    exportBtn.onclick = () => {
      if (!payments.length) return flashToast('No payments to export', true);
      const headers = ['Payment Number', 'Client Name', 'Invoice Number', 'Date', 'Method', 'Reference / UTR', 'Amount', 'Recorded By'];
      const rows = payments.map(p => [
        p.paymentNumber,
        `"${(p.clientName || '').replace(/"/g, '""')}"`,
        p.invoiceNumber || '',
        fmtDate(p.paymentDate),
        p.paymentMethod,
        p.referenceId || '',
        p.amount || 0,
        p.recordedByName || ''
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CI360_Payments_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      flashToast('Payments exported to CSV');
    };
  }
}

/* ─────────────────────────────────────────────────────────────
   RECORD PAYMENT MODAL
   ───────────────────────────────────────────────────────────── */
async function openRecordPaymentModal(preset = {}) {
  let nextPayNum = 'PAY-2026-0001';
  try {
    const res = await apiGet('/accounts/next-payment-number');
    if (res && res.paymentNumber) nextPayNum = res.paymentNumber;
  } catch (e) {}

  let clientInvoices = [];
  if (preset.clientId) {
    try {
      clientInvoices = await apiGet(`/accounts/invoices?clientId=${preset.clientId}`);
      clientInvoices = clientInvoices.filter(i => i.pendingAmount > 0 && i.status !== 'cancelled');
    } catch (e) {}
  }

  const modal = openModal(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="margin:0;font-size:18px">Record Client Payment</h3>
        <span class="badge green" style="font-family:var(--font-heading);font-size:12px">${escapeHtml(nextPayNum)}</span>
      </div>

      <div class="field">
        <label>Client *</label>
        <select id="modalPayClient" required>
          <option value="">Select client…</option>
          ${cachedClients.map(c => `<option value="${c._id}" ${preset.clientId === c._id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
        </select>
      </div>

      <div class="field">
        <label>Link to Unpaid Invoice (Optional)</label>
        <select id="modalPayInvoice">
          <option value="">General advance / No invoice link</option>
          ${clientInvoices.map(i => `
            <option value="${i._id}" data-pending="${i.pendingAmount}" ${preset.invoiceId === i._id ? 'selected' : ''}>
              ${escapeHtml(i.invoiceNumber)} — Balance: ${fmtINR(i.pendingAmount)} (Total: ${fmtINR(i.totalAmount)})
            </option>`).join('')}
        </select>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Payment Amount (₹) *</label>
          <input type="number" id="modalPayAmount" min="1" value="${preset.suggestedAmount || ''}" required placeholder="Amount received">
        </div>
        <div class="field">
          <label>Payment Date</label>
          <input type="date" id="modalPayDate" value="${new Date().toISOString().slice(0, 10)}">
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
    </div>`);

  // Update invoices dropdown on client change
  const clientSel = modal.querySelector('#modalPayClient');
  const invSel = modal.querySelector('#modalPayInvoice');
  const amtInput = modal.querySelector('#modalPayAmount');

  clientSel.onchange = async () => {
    const cid = clientSel.value;
    if (!cid) {
      invSel.innerHTML = '<option value="">General advance / No invoice link</option>';
      return;
    }
    try {
      const invs = await apiGet(`/accounts/invoices?clientId=${cid}`);
      const unpaid = (invs || []).filter(i => i.pendingAmount > 0 && i.status !== 'cancelled');
      invSel.innerHTML = `
        <option value="">General advance / No invoice link</option>
        ${unpaid.map(i => `
          <option value="${i._id}" data-pending="${i.pendingAmount}">
            ${escapeHtml(i.invoiceNumber)} — Balance: ${fmtINR(i.pendingAmount)} (Total: ${fmtINR(i.totalAmount)})
          </option>`).join('')}`;

      if (unpaid.length === 1 && !amtInput.value) {
        invSel.value = unpaid[0]._id;
        amtInput.value = unpaid[0].pendingAmount;
      }
    } catch (e) {}
  };

  invSel.onchange = () => {
    const selectedOpt = invSel.options[invSel.selectedIndex];
    const pending = selectedOpt.getAttribute('data-pending');
    if (pending) {
      amtInput.value = pending;
    }
  };

  modal.querySelector('#modalPayCancelBtn').onclick = () => modal.remove();

  modal.querySelector('#modalPaySaveBtn').onclick = async () => {
    const clientId = clientSel.value;
    const invoiceId = invSel.value || null;
    const amount = Number(amtInput.value);
    const paymentDate = modal.querySelector('#modalPayDate').value;
    const paymentMethod = modal.querySelector('#modalPayMethod').value;
    const referenceId = modal.querySelector('#modalPayRef').value.trim();
    const notes = modal.querySelector('#modalPayNotes').value.trim();

    if (!clientId) return flashToast('Please select a client', true);
    if (!amount || amount <= 0) return flashToast('Please enter a valid payment amount', true);

    try {
      const saveBtn = modal.querySelector('#modalPaySaveBtn');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving…';

      await apiPost('/accounts/payments', {
        clientId,
        invoiceId,
        amount,
        paymentDate,
        paymentMethod,
        referenceId,
        notes
      });

      flashToast('Payment recorded successfully!');
      modal.remove();
      renderContent();
    } catch (err) {
      flashToast(err.message, true);
      modal.querySelector('#modalPaySaveBtn').disabled = false;
      modal.querySelector('#modalPaySaveBtn').textContent = 'Save Payment Receipt';
    }
  };
}

/* ─────────────────────────────────────────────────────────────
   TAB 4: PENDING AMOUNT & RECEIVABLES LEDGER
   ───────────────────────────────────────────────────────────── */
async function renderReceivablesTab(container) {
  const receivables = await apiGet('/accounts/receivables');

  const totalPending = receivables.reduce((s, r) => s + (r.pendingAmount || 0), 0);
  const totalOverdue = receivables.reduce((s, r) => s + (r.overdueAmount || 0), 0);
  const clientsWithPending = receivables.filter(r => r.pendingAmount > 0);

  container.innerHTML = `
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Pending Amount & Receivables <span class="eyebrow">${clientsWithPending.length} clients with balances</span></h2>
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
          <div class="kpi-value" style="color:var(--amber-600)">${fmtINR(totalPending)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Across all clients</div>
        </div>

        <div class="card kpi" style="border-left:3px solid var(--red-500)">
          <div class="kpi-header">
            <span class="kpi-label">Critically Overdue</span>
            <div class="kpi-icon" style="background:var(--s-red-bg);color:var(--red-600)">🚨</div>
          </div>
          <div class="kpi-value" style="color:var(--red-600)">${fmtINR(totalOverdue)}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Exceeded credit payment terms</div>
        </div>

        <div class="card kpi">
          <div class="kpi-header">
            <span class="kpi-label">Unsettled Clients</span>
            <div class="kpi-icon" style="background:var(--accent-bg);color:var(--accent)">👥</div>
          </div>
          <div class="kpi-value">${clientsWithPending.length}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">Out of ${receivables.length} total clients</div>
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
              ${receivables.map(r => `
                <tr style="${r.pendingAmount > 0 ? '' : 'opacity:0.65'}">
                  <td style="padding-left:22px">
                    <strong>${escapeHtml(r.clientName)}</strong>
                    ${r.gstin ? `<div style="font-size:11px;color:var(--text-3)">GSTIN: ${escapeHtml(r.gstin)}</div>` : ''}
                  </td>
                  <td class="num">${fmtINR(r.totalBilled)}</td>
                  <td class="num" style="color:var(--green-600);font-weight:600">${fmtINR(r.totalPaid)}</td>
                  <td class="num" style="font-weight:800;font-size:14px;color:${r.pendingAmount > 0 ? 'var(--amber-600)' : 'var(--text-4)'}">
                    ${fmtINR(r.pendingAmount)}
                  </td>
                  <td class="num">
                    ${r.overdueAmount > 0 ? `<span class="badge red">${fmtINR(r.overdueAmount)}</span>` : `<span class="muted">—</span>`}
                  </td>
                  <td style="font-size:12.5px;color:${r.overdueAmount > 0 ? 'var(--red-600)' : 'inherit'}">
                    ${r.oldestDueDate ? fmtDate(r.oldestDueDate) : '<span class="muted">—</span>'}
                  </td>
                  <td style="font-size:12px">
                    ${r.lastPaymentDate ? `${fmtDate(r.lastPaymentDate)} (${fmtINR(r.lastPaymentAmount)})` : '<span class="muted">No payments</span>'}
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap">
                    ${r.pendingAmount > 0 ? `
                      <button class="btn green small settle-payment-btn" data-client-id="${r.clientId}" data-client-name="${escapeHtml(r.clientName)}" data-pending="${r.pendingAmount}" title="Record Payment">
                        💵 Collect
                      </button>
                      <button class="btn ghost small reminder-btn" data-client-name="${escapeHtml(r.clientName)}" data-pending="${r.pendingAmount}" data-overdue="${r.overdueAmount}" data-phone="${escapeHtml(r.billingPhone || '')}" title="Copy or Send Payment Reminder">
                        💬 Reminder
                      </button>` : `<span class="badge green">Settled</span>`}
                  </td>
                </tr>`).join('') || `<tr><td colspan="8"><div class="empty" style="padding:36px">No client records available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

  container.querySelectorAll('.settle-payment-btn').forEach(b => {
    b.onclick = () => {
      openRecordPaymentModal({
        clientId: b.dataset.clientId,
        clientName: b.dataset.clientName,
        suggestedAmount: Number(b.dataset.pending) || 0
      });
    };
  });

  container.querySelectorAll('.reminder-btn').forEach(b => {
    b.onclick = () => {
      openReminderModal({
        clientName: b.dataset.clientName,
        pending: Number(b.dataset.pending) || 0,
        overdue: Number(b.dataset.overdue) || 0,
        phone: b.dataset.phone
      });
    };
  });

  const exportBtn = document.getElementById('exportReceivablesCsvBtn');
  if (exportBtn) {
    exportBtn.onclick = () => {
      if (!receivables.length) return flashToast('No receivables to export', true);
      const headers = ['Client Name', 'GSTIN', 'Total Billed', 'Total Paid', 'Pending Balance', 'Overdue Amount', 'Oldest Due Date', 'Last Payment Date', 'Last Payment Amount'];
      const rows = receivables.map(r => [
        `"${(r.clientName || '').replace(/"/g, '""')}"`,
        r.gstin || '',
        r.totalBilled || 0,
        r.totalPaid || 0,
        r.pendingAmount || 0,
        r.overdueAmount || 0,
        r.oldestDueDate ? fmtDate(r.oldestDueDate) : '',
        r.lastPaymentDate ? fmtDate(r.lastPaymentDate) : '',
        r.lastPaymentAmount || 0
      ]);
      const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CI360_Receivables_Statement_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      flashToast('Receivables statement exported to CSV');
    };
  }
}

function openReminderModal({ clientName, pending, overdue, phone }) {
  const reminderText = `Dear ${clientName},\n\nGreetings from CI360 Intelligence.\n\nThis is a friendly reminder regarding your outstanding account balance of ${fmtINR(pending)}${overdue > 0 ? ` (including ${fmtINR(overdue)} overdue)` : ''}.\n\nPlease arrange for the settlement at your earliest convenience to our registered bank account:\n- Bank: HDFC Bank\n- A/C: 50200088992211\n- IFSC: HDFC0001234\n- UPI: ci360@hdfcbank\n\nIf you have already processed this remittance, kindly share the UTR / transaction receipt. Thank you for your continued partnership!\n\nWarm regards,\nAccounts Department | CI360`;

  const modal = openModal(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:18px">Payment Reminder for ${escapeHtml(clientName)}</h3>
        <span class="badge amber" style="font-size:12px">${fmtINR(pending)} Due</span>
      </div>
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:12px">
        You can copy this formatted payment reminder template to email/chat or launch WhatsApp directly.
      </div>

      <div class="field">
        <label>Reminder Message Template</label>
        <textarea id="reminderTextArea" rows="10" style="font-family:var(--font-mono);font-size:12px;line-height:1.4">${escapeHtml(reminderText)}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="reminderCloseBtn">Close</button>
        <button class="btn gold" id="reminderCopyBtn">📋 Copy to Clipboard</button>
        <button class="btn green" id="reminderWhatsAppBtn">💬 Open WhatsApp</button>
      </div>
    </div>`);

  modal.querySelector('#reminderCloseBtn').onclick = () => modal.remove();

  modal.querySelector('#reminderCopyBtn').onclick = () => {
    const txt = modal.querySelector('#reminderTextArea').value;
    navigator.clipboard.writeText(txt).then(() => {
      flashToast('Reminder template copied to clipboard!');
    }).catch(() => {
      flashToast('Failed to copy text', true);
    });
  };

  modal.querySelector('#reminderWhatsAppBtn').onclick = () => {
    const txt = encodeURIComponent(modal.querySelector('#reminderTextArea').value);
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${txt}` : `https://wa.me/?text=${txt}`;
    window.open(waUrl, '_blank');
  };
}

/* ─────────────────────────────────────────────────────────────
   TAB 5: BILLING PROFILES
   ───────────────────────────────────────────────────────────── */
async function renderBillingProfilesTab(container) {
  const profiles = await apiGet('/accounts/billing-profiles');

  container.innerHTML = `
    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
        <div>
          <h2>Client Billing Profiles <span class="eyebrow">${profiles.length} clients</span></h2>
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
              ${profiles.map(item => {
                const p = item.profile;
                return `
                  <tr>
                    <td style="padding-left:22px">
                      <strong>${escapeHtml(item.clientName)}</strong>
                      ${p.billingEmail ? `<div style="font-size:11px;color:var(--text-3)">${escapeHtml(p.billingEmail)}</div>` : ''}
                    </td>
                    <td><span class="badge">${(p.billingType || 'retainer').toUpperCase()}</span></td>
                    <td style="font-size:12px;text-transform:capitalize">${escapeHtml(p.billingCycle || 'monthly')}</td>
                    <td class="num" style="font-weight:800;color:var(--brand-600);font-size:14px">
                      ${fmtINR(p.retainerAmount || 0)}
                    </td>
                    <td style="font-family:var(--font-mono);font-size:11.5px">${escapeHtml(p.gstin || '—')}</td>
                    <td style="font-size:12px">Net ${p.paymentTermsDays || 15}d</td>
                    <td>
                      <span class="badge ${p.status === 'active' ? 'green' : 'amber'}">${escapeHtml(p.status || 'active')}</span>
                    </td>
                    <td class="num" style="padding-right:22px;white-space:nowrap">
                      <button class="btn gold small gen-monthly-inv-btn" data-client-id="${item.clientId}" data-client-name="${escapeHtml(item.clientName)}" data-amount="${p.retainerAmount || 0}" title="Generate this month's invoice">
                        ⚡ Gen Invoice
                      </button>
                      <button class="btn ghost small edit-profile-btn" data-client-id="${item.clientId}" data-client-name="${escapeHtml(item.clientName)}" title="Edit Billing Setup">
                        ⚙️ Edit
                      </button>
                    </td>
                  </tr>`;
              }).join('') || `<tr><td colspan="8"><div class="empty" style="padding:36px">No client billing profiles found.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

  container.querySelectorAll('.gen-monthly-inv-btn').forEach(b => {
    b.onclick = async () => {
      const cname = b.dataset.clientName;
      const amt = Number(b.dataset.amount) || 0;
      if (!confirm(`Generate this month's invoice for ${cname} for ${fmtINR(amt)}?`)) return;

      try {
        b.disabled = true;
        b.textContent = '…';
        await apiPost(`/accounts/billing-profiles/${b.dataset.clientId}/generate-invoice`, { amount: amt });
        flashToast(`Invoice generated successfully for ${cname}!`);
        currentTab = 'invoices';
        render();
      } catch (err) {
        flashToast(err.message, true);
        b.disabled = false;
        b.textContent = '⚡ Gen Invoice';
      }
    };
  });

  container.querySelectorAll('.edit-profile-btn').forEach(b => {
    b.onclick = () => {
      const pObj = profiles.find(item => item.clientId === b.dataset.clientId);
      openEditBillingProfileModal(b.dataset.clientId, b.dataset.clientName, pObj ? pObj.profile : {});
    };
  });
}

function openEditBillingProfileModal(clientId, clientName, currentProfile = {}) {
  const modal = openModal(`
    <div style="max-width:540px;width:100%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:18px">Billing Setup: ${escapeHtml(clientName)}</h3>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Billing Model</label>
          <select id="bpType">
            <option value="retainer" ${currentProfile.billingType === 'retainer' ? 'selected' : ''}>Monthly Retainer</option>
            <option value="project" ${currentProfile.billingType === 'project' ? 'selected' : ''}>Project Based</option>
            <option value="hourly" ${currentProfile.billingType === 'hourly' ? 'selected' : ''}>Hourly Rate</option>
            <option value="milestone" ${currentProfile.billingType === 'milestone' ? 'selected' : ''}>Milestones</option>
          </select>
        </div>
        <div class="field">
          <label>Billing Cycle</label>
          <select id="bpCycle">
            <option value="monthly" ${currentProfile.billingCycle === 'monthly' ? 'selected' : ''}>Monthly</option>
            <option value="quarterly" ${currentProfile.billingCycle === 'quarterly' ? 'selected' : ''}>Quarterly</option>
            <option value="one_time" ${currentProfile.billingCycle === 'one_time' ? 'selected' : ''}>One-Time</option>
          </select>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Retainer Amount (₹ / month)</label>
          <input type="number" id="bpAmount" value="${currentProfile.retainerAmount || 0}" min="0">
        </div>
        <div class="field">
          <label>Credit / Payment Terms (Days)</label>
          <input type="number" id="bpTerms" value="${currentProfile.paymentTermsDays || 15}" min="0">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>GSTIN / Tax ID</label>
          <input type="text" id="bpGstin" value="${escapeHtml(currentProfile.gstin || '')}" placeholder="e.g. 24AAACC1206M1ZT">
        </div>
        <div class="field">
          <label>PAN Number</label>
          <input type="text" id="bpPan" value="${escapeHtml(currentProfile.panNumber || '')}" placeholder="e.g. AAACC1206M">
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label>Accounts Email</label>
          <input type="email" id="bpEmail" value="${escapeHtml(currentProfile.billingEmail || '')}" placeholder="billing@client.com">
        </div>
        <div class="field">
          <label>Accounts Phone</label>
          <input type="text" id="bpPhone" value="${escapeHtml(currentProfile.billingPhone || '')}" placeholder="+91 98765 43210">
        </div>
      </div>

      <div class="field">
        <label>Billing Address</label>
        <textarea id="bpAddress" rows="2">${escapeHtml(currentProfile.billingAddress || '')}</textarea>
      </div>

      <div class="modal-actions" style="margin-top:16px">
        <button class="btn ghost" id="bpCancelBtn">Cancel</button>
        <button class="btn gold" id="bpSaveBtn">Save Billing Setup</button>
      </div>
    </div>`);

  modal.querySelector('#bpCancelBtn').onclick = () => modal.remove();

  modal.querySelector('#bpSaveBtn').onclick = async () => {
    const payload = {
      billingType: modal.querySelector('#bpType').value,
      billingCycle: modal.querySelector('#bpCycle').value,
      retainerAmount: Number(modal.querySelector('#bpAmount').value) || 0,
      paymentTermsDays: Number(modal.querySelector('#bpTerms').value) || 15,
      gstin: modal.querySelector('#bpGstin').value.trim(),
      panNumber: modal.querySelector('#bpPan').value.trim(),
      billingEmail: modal.querySelector('#bpEmail').value.trim(),
      billingPhone: modal.querySelector('#bpPhone').value.trim(),
      billingAddress: modal.querySelector('#bpAddress').value.trim()
    };

    try {
      await apiPut(`/accounts/billing-profiles/${clientId}`, payload);
      flashToast('Billing profile saved successfully');
      modal.remove();
      renderContent();
    } catch (err) {
      flashToast(err.message, true);
    }
  };
}

// Auto-run init
init();
