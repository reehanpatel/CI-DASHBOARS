const express = require('express');
const Roster = require('../models/Roster');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken);

router.get('/', async (req, res) => {
  const filter = {};
  if (req.user.role === 'client') {
    if (!req.user.clientId) return res.json([]);
    filter.clientId = req.user.clientId;
  }
  const list = await Roster.find(filter).sort('-difficulty');
  res.json(list);
});

router.post('/', requireRole('superadmin'), async (req, res) => {
  const { clientId, nature, roles, difficulty, comments } = req.body;
  if (!clientId) return res.status(400).json({ error: 'Client is required' });
  const r = await Roster.create({ clientId, nature, roles, difficulty, comments });
  res.status(201).json(r);
});

router.put('/:id', requireRole('superadmin'), async (req, res) => {
  const { nature, roles, difficulty, comments } = req.body;
  const r = await Roster.findByIdAndUpdate(req.params.id, { nature, roles, difficulty, comments }, { new: true });
  if (!r) return res.status(404).json({ error: 'Not found' });
  res.json(r);
});

router.delete('/:id', requireRole('superadmin'), async (req, res) => {
  await Roster.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Bulk reassignment: swap a name across every role cell on every account
router.post('/reassign', requireRole('superadmin'), async (req, res) => {
  const { from, to } = req.body;
  if (!from || !to) return res.status(400).json({ error: 'from and to are required' });
  const roleKeys = ['strategy', 'cs', 'website', 'design', 'copy', 'edit', 'shoot', 'seo', 'smo', 'qc'];
  const all = await Roster.find();
  let count = 0;
  for (const r of all) {
    let changed = false;
    roleKeys.forEach(key => {
      const names = String(r.roles[key] || '').split(',').map(s => s.trim()).filter(Boolean);
      if (names.includes(from)) {
        const replaced = [...new Set(names.map(n => (n === from ? to : n)))];
        r.roles[key] = replaced.join(', ');
        changed = true;
      }
    });
    if (changed) { count += 1; await r.save(); }
  }
  res.json({ ok: true, accountsUpdated: count });
});

module.exports = router;
