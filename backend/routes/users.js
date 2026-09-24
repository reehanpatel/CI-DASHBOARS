const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken, requireRole('superadmin'));

router.get('/', async (req, res) => {
  const users = await User.find().select('-passwordHash').populate('personnelId', 'name').populate('clientId', 'name').sort('name');
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, role, personnelId, clientId } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ error: 'name, email, password and role are required' });
    if (!['superadmin', 'employee', 'client'].includes(role)) return res.status(400).json({ error: 'Invalid role' });

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(400).json({ error: 'A user with that email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email: email.toLowerCase().trim(), passwordHash, role,
      personnelId: role === 'employee' ? (personnelId || null) : null,
      clientId: role === 'client' ? (clientId || null) : null,
    });
    const clean = user.toObject(); delete clean.passwordHash;
    res.status(201).json(clean);
  } catch (err) {
    res.status(500).json({ error: 'Could not create user', detail: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, role, personnelId, clientId, active } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name != null) user.name = name;
    if (email != null) user.email = email.toLowerCase().trim();
    if (role != null) user.role = role;
    if (personnelId !== undefined) user.personnelId = role === 'employee' || user.role === 'employee' ? personnelId : null;
    if (clientId !== undefined) user.clientId = role === 'client' || user.role === 'client' ? clientId : null;
    if (active != null) user.active = active;
    if (password) user.passwordHash = await bcrypt.hash(password, 10);

    await user.save();
    const clean = user.toObject(); delete clean.passwordHash;
    res.json(clean);
  } catch (err) {
    res.status(500).json({ error: 'Could not update user', detail: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
