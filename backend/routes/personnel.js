const express = require('express');
const Personnel = require('../models/Personnel');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken);

// All logged-in roles can read the personnel list (needed to display names, assign jobs, etc.)
router.get('/', async (req, res) => {
  const list = await Personnel.find().sort('name');
  res.json(list);
});

router.post('/', requireRole('superadmin'), async (req, res) => {
  const { name, duties, capacity, status, attachments } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const p = await Personnel.create({
    name,
    duties,
    capacity,
    status,
    attachments: (attachments || []).map(att => ({
      name: att.name,
      url: att.url,
      size: Number(att.size) || 0,
      type: att.type || '',
      category: att.category || 'Document',
      uploadedAt: att.uploadedAt || new Date()
    }))
  });
  res.status(201).json(p);
});

router.put('/:id', requireRole('superadmin'), async (req, res) => {
  try {
    const p = await Personnel.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    const { name, duties, capacity, status, attachments } = req.body;
    if (name !== undefined) p.name = name;
    if (duties !== undefined) p.duties = duties;
    if (capacity !== undefined) p.capacity = capacity;
    if (status !== undefined) p.status = status;
    if (attachments !== undefined) p.attachments = attachments;
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/attachments', requireRole('superadmin'), async (req, res) => {
  try {
    const p = await Personnel.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Personnel not found' });
    const { name, url, size, type, category } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Attachment name and URL are required' });

    p.attachments.push({
      name,
      url,
      size: Number(size) || 0,
      type: type || '',
      category: category || 'Document',
      uploadedAt: new Date()
    });

    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: 'Could not add attachment', detail: err.message });
  }
});

router.delete('/:id', requireRole('superadmin'), async (req, res) => {
  await Personnel.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
