import { requireAuth, renderAppShell, bindAppShellEvents } from '/src/js/api.js';
import { initProposalStudio } from '/src/js/proposals.js';

const user = requireAuth('superadmin');
if (user) {
  const app = document.getElementById('app');
  app.innerHTML = renderAppShell({
    user,
    currentRole: 'superadmin',
    activeTab: 'proposals',
    tabs: [
      { key: 'dashboard', label: 'Dashboard', icon: '📊' },
      { key: 'proposals', label: 'Proposal Studio', icon: '📜' },
      { key: 'jobs', label: 'All Jobs', icon: '📁' },
      { key: 'accounts', label: 'Client Roster', icon: '🏢' },
      { key: 'manage', label: 'Manage', icon: '⚙️' }
    ],
    title: 'Proposal Studio & Rate Card',
    subtitle: 'Branded Proposals, Rate Card Pricing & Admin PIN Approval'
  });

  bindAppShellEvents((newTab) => {
    if (newTab === 'dashboard') window.location.href = '/admin';
    else if (newTab === 'proposals') window.location.href = '/proposals';
    else window.location.href = '/admin';
  });

  const c = document.getElementById('content');
  if (c) {
    initProposalStudio(c);
  }
}

