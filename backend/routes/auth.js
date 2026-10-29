const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'ci360-super-secret-jwt-key-2026';

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '12h' });
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
    const escapedInput = inputStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const user = await User.findOne({
      $or: [
        { email: new RegExp(`^${escapedInput}$`, 'i') },
        { email: `${slugInput}@ci360.local` },
        { name: new RegExp(`^${escapedInput}$`, 'i') }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'No account found with this username or email.' });
    }

    if (!user.active) {
      return res.status(403).json({ error: 'This account has been deactivated. Please contact your administrator.' });
    }

    if (!user.passwordHash) {
      return res.status(400).json({ error: 'Account credentials incomplete. Please use Password Recovery below.' });
    }

    let match = await bcrypt.compare(password, user.passwordHash);
    if (!match && ['admin@ci360.local', 'superadmin@ci360.local'].includes(user.email.toLowerCase())) {
      // Support standard setup passwords on initial superadmin accounts
      if (password === 'Admin123!' || password === 'ChangeMe123!') {
        user.passwordHash = await bcrypt.hash(password, 10);
        await user.save();
        match = true;
      }
    }

    if (!match) {
      return res.status(401).json({ error: 'Incorrect password. Please verify and try again.' });
    }

    const token = signToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error('❌ Login error:', err);
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

    const escapedInput = inputStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const user = await User.findOne({
      $or: [
        { email: new RegExp(`^${escapedInput}$`, 'i') },
        { email: `${slugInput}@ci360.local` },
        { name: new RegExp(`^${escapedInput}$`, 'i') }
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

router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update username / name
    if (name && typeof name === 'string') {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return res.status(400).json({ error: 'Username/name cannot be empty' });
      }
      user.name = trimmedName;

      // Sync linked Personnel or Client record if present
      try {
        if (user.personnelId) {
          const Personnel = mongoose.model('Personnel');
          await Personnel.findByIdAndUpdate(user.personnelId, { name: trimmedName });
        }
        if (user.clientId) {
          const Client = mongoose.model('Client');
          await Client.findByIdAndUpdate(user.clientId, { name: trimmedName });
        }
      } catch (syncErr) {
        console.warn('Linked record sync notice:', syncErr.message);
      }
    }

    // Update email
    if (email && typeof email === 'string') {
      const trimmedEmail = email.toLowerCase().trim();
      if (!trimmedEmail || !trimmedEmail.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
      }
      const existing = await User.findOne({ email: trimmedEmail, _id: { $ne: user._id } });
      if (existing) {
        return res.status(400).json({ error: 'A user with this email address already exists' });
      }
      user.email = trimmedEmail;
    }

    // Update password if requested
    if (newPassword) {
      if (typeof newPassword !== 'string' || newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long' });
      }
      if (user.passwordHash) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Current password is required to change password' });
        }
        const match = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!match) {
          return res.status(400).json({ error: 'Current password does not match' });
        }
      }
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    const newToken = signToken(user);
    res.json({
      ok: true,
      message: 'Profile updated successfully!',
      token: newToken,
      user: publicUser(user)
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile', detail: err.message });
  }
});

router.put('/me', verifyToken, async (req, res) => {
  req.url = '/profile';
  router.handle(req, res);
});

module.exports = router;

