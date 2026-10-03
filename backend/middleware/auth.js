const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyToken(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const secret = process.env.JWT_SECRET || 'ci360-super-secret-jwt-key-2026';
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    if (!user || !user.active) return res.status(401).json({ error: 'Invalid or inactive account' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

async function optionalToken(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) {
      const secret = process.env.JWT_SECRET || 'ci360-super-secret-jwt-key-2026';
      const payload = jwt.verify(token, secret);
      const user = await User.findById(payload.id);
      if (user && user.active) {
        req.user = user;
      }
    }
  } catch (err) {}
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ error: 'You do not have permission to do that' });
    }
    // Ekta manages accounts so she always has access to 'accounts' endpoints
    const isEkta = (req.user.email && req.user.email.toLowerCase().includes('ekta')) ||
                   (req.user.name && req.user.name.toLowerCase().includes('ekta'));
    if (roles.includes('accounts') && isEkta) {
      return next();
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to do that' });
    }
    next();
  };
}

module.exports = { verifyToken, optionalToken, requireRole };

