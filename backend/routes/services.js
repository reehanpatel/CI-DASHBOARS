const express = require('express');
const Service = require('../models/Service');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken);

router.get('/', async (req, res) => {
  const list = await Service.find().sort('name');
  res.json(list);
});

router.post('/', requireRole('superadmin', 'employee'), async (req, res) => {
  const { name, hours } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const s = await Service.create({ name, hours });
  res.status(201).json(s);
});

router.put('/:id', requireRole('superadmin'), async (req, res) => {
  const { name, hours } = req.body;
  const s = await Service.findByIdAndUpdate(req.params.id, { name, hours }, { new: true });
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

router.delete('/:id', requireRole('superadmin'), async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
