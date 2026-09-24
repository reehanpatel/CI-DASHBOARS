const express = require('express');
const SalaryGrade = require('../models/SalaryGrade');
const SalaryAssignment = require('../models/SalaryAssignment');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
// Salary data is sensitive — Super Admin only, end to end.
router.use(verifyToken, requireRole('superadmin'));

router.get('/grades', async (req, res) => {
  res.json(await SalaryGrade.find().sort('min'));
});
router.post('/grades', async (req, res) => {
  const { label, min, max } = req.body;
  if (!label) return res.status(400).json({ error: 'Label is required' });
  res.status(201).json(await SalaryGrade.create({ label, min, max }));
});
router.put('/grades/:id', async (req, res) => {
  const { label, min, max } = req.body;
  const g = await SalaryGrade.findByIdAndUpdate(req.params.id, { label, min, max }, { new: true });
  if (!g) return res.status(404).json({ error: 'Not found' });
  res.json(g);
});
router.delete('/grades/:id', async (req, res) => {
  await SalaryGrade.findByIdAndDelete(req.params.id);
  await SalaryAssignment.deleteMany({ gradeId: req.params.id });
  res.json({ ok: true });
});

router.get('/assignments', async (req, res) => {
  res.json(await SalaryAssignment.find());
});
router.put('/assignments/:personId', async (req, res) => {
  const { gradeId } = req.body;
  if (!gradeId) {
    await SalaryAssignment.findOneAndDelete({ personId: req.params.personId });
    return res.json({ ok: true, cleared: true });
  }
  const a = await SalaryAssignment.findOneAndUpdate(
    { personId: req.params.personId },
    { personId: req.params.personId, gradeId },
    { new: true, upsert: true }
  );
  res.json(a);
});

module.exports = router;
