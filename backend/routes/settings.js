const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SystemSetting = mongoose.models.SystemSetting || require('../models/SystemSetting');
const { verifyToken } = require('../middleware/auth');

// 1. Mandatory Token Verification for all settings routes
router.use(verifyToken);

// Default canonical sidebar tabs for every dashboard
const DEFAULT_SIDEBAR_CONFIG = {
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: '📊', visible: true, category: 'Core' },
    { key: 'dailytasks', label: 'Daily Planner', icon: '📅', visible: true, category: 'Productivity' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'billing_dashboard', label: 'Accounts & Billing', icon: '💳', href: '/accounts', visible: true, category: 'Finance' },
    { key: 'proposals', label: 'Proposal Studio', icon: '📜', visible: true, category: 'Sales' },
    { key: 'teambonding', label: 'Team Chat & Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'jobs', label: 'All Jobs', icon: '📁', visible: true, category: 'Operations' },
    { key: 'byclient', label: 'By Client', icon: '💼', visible: true, category: 'Analytics' },
    { key: 'byperson', label: 'By Person', icon: '👥', visible: true, category: 'Analytics' },
    { key: 'accounts', label: 'Client Roster', icon: '🏢', visible: true, category: 'Directory' },
    { key: 'targets', label: 'Targets', icon: '🎯', visible: true, category: 'Management' },
    { key: 'salaries', label: 'Salaries', icon: '💰', visible: true, superadminOnly: true, category: 'Finance' },
    { key: 'users', label: 'Users', icon: '👤', visible: true, superadminOnly: true, category: 'System' },
    { key: 'manage', label: 'Settings & Manage', icon: '⚙️', visible: true, locked: true, category: 'System' }
  ],
  employee: [
    { key: 'dashboard', label: 'Overview Dashboard', icon: '📊', visible: true, category: 'Core' },
    { key: 'myjobs', label: 'My Jobs', icon: '📋', visible: true, category: 'Operations' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'jobs', label: 'All Jobs', icon: '📁', visible: true, category: 'Operations' },
    { key: 'dailytasks', label: 'Daily Planner', icon: '📅', visible: true, category: 'Productivity' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'billing_dashboard', label: 'Accounts & Billing', icon: '💳', href: '/accounts', visible: true, category: 'Finance' },
    { key: 'proposals', label: 'Proposal Studio', icon: '📜', visible: true, category: 'Sales' },
    { key: 'teambonding', label: 'Team Chat & Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'byclient', label: 'By Client', icon: '💼', visible: true, category: 'Analytics' },
    { key: 'byperson', label: 'By Person', icon: '👥', visible: true, category: 'Analytics' },
    { key: 'accounts', label: 'Client Roster', icon: '🏢', visible: true, category: 'Directory' },
    { key: 'targets', label: 'Targets', icon: '🎯', visible: true, category: 'Productivity' },
    { key: 'salaries', label: 'Salaries', icon: '💰', visible: true, superadminOnly: true, category: 'Finance' },
    { key: 'users', label: 'Users', icon: '👤', visible: true, superadminOnly: true, category: 'System' },
    { key: 'manage', label: 'Settings & Manage', icon: '⚙️', visible: true, category: 'System' },
    { key: 'settings', label: 'Settings', icon: '⚙️', visible: true, category: 'System' }
  ],
  accounts: [
    { key: 'overview', label: 'Overview', icon: '📊', visible: true, category: 'Core' },
    { key: 'invoices', label: 'Invoices', icon: '📄', visible: true, category: 'Billing' },
    { key: 'payments', label: 'Payments', icon: '💵', visible: true, category: 'Billing' },
    { key: 'receivables', label: 'Pending & Receivables', icon: '⏳', visible: true, category: 'Billing' },
    { key: 'billing', label: 'Billing Profiles', icon: '📑', visible: true, category: 'Billing' },
    { key: 'tally', label: 'TallyPrime Silver', icon: '🏛️', visible: true, category: 'Integration' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'jobs', label: 'All Jobs', icon: '📁', visible: true, category: 'Operations' },
    { key: 'proposals', label: 'Proposal Studio', icon: '📜', visible: true, category: 'Sales' },
    { key: 'teambonding', label: 'Team Chat & Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'settings', label: 'Settings', icon: '⚙️', visible: true, category: 'System' }
  ],
  client: [
    { key: 'dashboard', label: 'Overview Dashboard', icon: '📊', visible: true, category: 'Core' },
    { key: 'jobs', label: 'All Jobs Logged', icon: '📋', visible: true, category: 'Operations' },
    { key: 'logjob', label: 'Log a Job', icon: '➕', visible: true, category: 'Operations' },
    { key: 'delivered', label: 'Work Delivered', icon: '📦', visible: true, category: 'Deliverables' },
    { key: 'proposals', label: 'Proposals & Scope', icon: '📜', visible: true, category: 'Contracts' },
    { key: 'billing', label: 'Billing & Invoices', icon: '💳', visible: true, category: 'Finance' },
    { key: 'tickets', label: 'Support Tickets', icon: '🎫', visible: true, category: 'Support' },
    { key: 'team', label: 'Our Team', icon: '👥', visible: true, category: 'Personnel' },
    { key: 'teambonding', label: 'Team Lounge', icon: '💬', visible: true, category: 'Collaboration' },
    { key: 'settings', label: 'Settings', icon: '⚙️', visible: true, category: 'System' }
  ]
};

// Helper: merge saved DB config with defaults
function mergeWithDefaults(saved) {
  const result = {};
  for (const [dashboard, defaultItems] of Object.entries(DEFAULT_SIDEBAR_CONFIG)) {
    const savedItems = (saved && saved[dashboard]) || [];
    const savedMap = new Map();

    if (Array.isArray(savedItems)) {
      savedItems.forEach(item => {
        if (item && item.key) savedMap.set(item.key, item);
      });
    } else if (savedItems && typeof savedItems === 'object') {
      Object.entries(savedItems).forEach(([k, v]) => {
        savedMap.set(k, { key: k, ...v });
      });
    }

    result[dashboard] = defaultItems.map(def => {
      const existing = savedMap.get(def.key);
      if (!existing) return { ...def };
      return {
        ...def,
        // Locked items can never be hidden
        visible: def.locked ? true : (existing.visible !== false)
      };
    });
  }
  return result;
}

// GET /api/settings/navigation
// Returns the active sidebar navigation config for all dashboards
router.get('/navigation', async (req, res) => {
  try {
    const setting = await SystemSetting.findOne({ key: 'sidebar_nav_config' }).lean();
    const config = mergeWithDefaults(setting ? setting.value : null);
    const isSuperadmin = req.user && req.user.role === 'superadmin';

    res.json({
      config,
      isSuperadmin
    });
  } catch (err) {
    console.error('Error fetching sidebar config:', err);
    res.status(500).json({ error: 'Failed to fetch sidebar navigation config' });
  }
});

// PUT /api/settings/navigation
// Superadmin only: save custom sidebar navigation visibility
router.put('/navigation', async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Superadmin privileges required to customize dashboard navigation' });
    }

    const { config } = req.body;
    if (!config || typeof config !== 'object') {
      return res.status(400).json({ error: 'Invalid navigation configuration payload' });
    }

    // Merge and sanitize input
    const sanitized = mergeWithDefaults(config);

    // Save to SystemSetting
    const setting = await SystemSetting.findOneAndUpdate(
      { key: 'sidebar_nav_config' },
      {
        value: sanitized,
        description: 'Superadmin custom sidebar navigation visibility for all dashboards'
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Dashboard navigation customization saved successfully',
      config: sanitized
    });
  } catch (err) {
    console.error('Error saving sidebar config:', err);
    res.status(500).json({ error: 'Failed to save sidebar navigation config: ' + err.message });
  }
});

// POST /api/settings/navigation/reset
// Superadmin only: restore all dashboard sidebars to default visibility
router.post('/navigation/reset', async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Superadmin privileges required to reset navigation' });
    }

    await SystemSetting.findOneAndDelete({ key: 'sidebar_nav_config' });

    res.json({
      success: true,
      message: 'Dashboard sidebar navigation reset to defaults',
      config: DEFAULT_SIDEBAR_CONFIG
    });
  } catch (err) {
    console.error('Error resetting sidebar config:', err);
    res.status(500).json({ error: 'Failed to reset sidebar navigation config' });
  }
});

module.exports = router;
module.exports.DEFAULT_SIDEBAR_CONFIG = DEFAULT_SIDEBAR_CONFIG;

