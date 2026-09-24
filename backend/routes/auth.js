const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    personnelId: user.personnelId,
    clientId: user.clientId,
  };
}

router.post('/login', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: 'Database connection failed. Please check your MONGO_URI in backend/.env (verify username, password, and IP whitelist in MongoDB Atlas).'
    });
  }

  try {
    const { email, username, identifier, password } = req.body;
    const inputStr = (email || username || identifier || '').trim();

    if (!inputStr || !password) {
      return res.status(400).json({ error: 'Username/Email and password are required' });
    }

    const lowerInput = inputStr.toLowerCase();
    const slugInput = lowerInput.replace(/[^a-z0-9]/g, '');

    const user = await User.findOne({
      $or: [
        { email: lowerInput },
        { email: `${slugInput}@ci360.local` },
        { name: new RegExp(`^${inputStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      ]
    });

    if (!user || !user.active) {
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    const token = signToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', detail: err.message });
  }
});

router.post('/reset-password', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: 'Database connection failed. Please check your database connection.'
    });
  }

  try {
    const { email, username, identifier, newPassword } = req.body;
    const inputStr = (email || username || identifier || '').trim();

    if (!inputStr || !newPassword) {
      return res.status(400).json({ error: 'Username or email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const lowerInput = inputStr.toLowerCase();
    const slugInput = lowerInput.replace(/[^a-z0-9]/g, '');

    const user = await User.findOne({
      $or: [
        { email: lowerInput },
        { email: `${slugInput}@ci360.local` },
        { name: new RegExp(`^${inputStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      ]
    });

    if (!user || !user.active) {
      return res.status(404).json({ error: 'No active account found for this username or email.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      ok: true,
      message: 'Password reset successfully! You can now log in with your new password.',
      email: user.email,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password', detail: err.message });
  }
});

router.get('/me', verifyToken, async (req, res) => {
  res.json({ user: publicUser(req.user) });
});

module.exports = router;
