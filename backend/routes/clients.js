const express = require('express');
const Client = require('../models/Client');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken);

router.get('/', async (req, res) => {
  if (req.user.role === 'client') {
    if (!req.user.clientId) return res.json([]);
    const c = await Client.findById(req.user.clientId);
    return res.json(c ? [c] : []);
  }
  const list = await Client.find().sort('name');
  res.json(list);
});

router.post('/', requireRole('superadmin', 'employee'), async (req, res) => {
  const { name, notes, attachments } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const c = await Client.create({
    name,
    notes,
    attachments: (attachments || []).map(att => ({
      name: att.name,
      url: att.url,
      size: Number(att.size) || 0,
      type: att.type || '',
      category: att.category || 'General',
      uploadedAt: att.uploadedAt || new Date()
    }))
  });
  res.status(201).json(c);
});

router.put('/:id', requireRole('superadmin'), async (req, res) => {
  const { name, notes, attachments } = req.body;
  const update = { name, notes };
  if (attachments !== undefined) update.attachments = attachments;
  const c = await Client.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

router.post('/:id/attachments', requireRole('superadmin', 'employee'), async (req, res) => {
  try {
    const c = await Client.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'Client not found' });
    const { name, url, size, type, category } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Attachment name and URL are required' });

    c.attachments.push({
      name,
      url,
      size: Number(size) || 0,
      type: type || '',
      category: category || 'General',
      uploadedAt: new Date()
    });

    await c.save();
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: 'Could not add attachment', detail: err.message });
  }
});

router.delete('/:id', requireRole('superadmin'), async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
