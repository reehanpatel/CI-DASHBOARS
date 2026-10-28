const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Proposal = mongoose.models.Proposal || require('../models/Proposal');
const ProposalRateCard = mongoose.models.ProposalRateCard || require('../models/ProposalRateCard');
const SystemSetting = mongoose.models.SystemSetting || require('../models/SystemSetting');
const Client = mongoose.models.Client || require('../models/Client');
const { verifyToken, requireRole } = require('../middleware/auth');
const { DEFAULT_RATE_CARD } = require('../utils/proposalDefaults');

const router = express.Router();

// Helper: Content Hash for Proposals
function computeContentHash(p) {
  const payload = {
    title: p.title || '',
    subtitle: p.subtitle || '',
    kicker: p.kicker || '',
    oneLine: p.oneLine || '',
    client: p.client || '',
    clientShort: p.clientShort || '',
    contact: p.contact || '',
    contactRole: p.contactRole || '',
    currency: p.currency || 'INR',
    date: p.date || '',
    validity: p.validity || 30,
    sections: (p.sections || []).map(s => ({ title: s.title, body: s.body })),
    heads: (p.heads || []).map(h => ({
      title: h.title,
      billing: h.billing,
      mult: h.mult,
      packDisc: h.packDisc,
      fixed: h.fixed,
      desc: h.desc,
      exc: h.exc,
      lines: (h.lines || []).map(l => ({ service: l.service, qty: l.qty, rate: l.rate, desc: l.desc, unit: l.unit }))
    })),
    term: p.term || 6,
    termDisc: p.termDisc || 0,
    discount: p.discount || 0,
    gst: p.gst || 0,
    pricingView: p.pricingView || 'heads',
    retainerPay: p.retainerPay || 'm-adv',
    projectPay: p.projectPay || '5050',
    milestones: p.milestones || [],
    retainerIncl: p.retainerIncl || [],
    onRequest: p.onRequest || [],
    exclusions: p.exclusions || '',
    terms: (p.terms || []).filter(t => t.on).map(t => ({ title: t.title, text: t.text })),
    clientNeeds: p.clientNeeds || [],
    choices: p.choices || []
  };
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 16);
}

// Helper: Get or Init Admin PIN
const DEFAULT_PIN = '3600';

async function verifyAdminPin(enteredPin) {
  if (!enteredPin || typeof enteredPin !== 'string') return false;
  const pinSetting = await SystemSetting.findOne({ key: 'admin_proposal_pin' });
  if (!pinSetting || !pinSetting.value || !pinSetting.value.hash) {
    // If not configured, check against default PIN
    return enteredPin.trim() === DEFAULT_PIN;
  }
  return await bcrypt.compare(enteredPin.trim(), pinSetting.value.hash);
}

async function setAdminPin(newPin, updatedBy) {
  const hash = await bcrypt.hash(newPin.trim(), 10);
  await SystemSetting.findOneAndUpdate(
    { key: 'admin_proposal_pin' },
    {
      key: 'admin_proposal_pin',
      value: {
        hash,
        updatedAt: new Date(),
        updatedBy: updatedBy ? updatedBy.name || updatedBy.email : 'Admin'
      },
      description: 'Secure Admin PIN for proposal approval, finalization and release'
    },
    { upsert: true, new: true }
  );
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC CLIENT SHARE ROUTES (No Auth Required)
   ───────────────────────────────────────────────────────────── */
// GET /api/proposals/shared/:shareId
router.get('/shared/:shareId', async (req, res) => {
  try {
    const proposal = await Proposal.findOne({ shareId: req.params.shareId });
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found or link has expired' });
    }

    const rateCardDoc = await ProposalRateCard.findOne({ key: 'main' });
    const settings = (rateCardDoc && rateCardDoc.settings) || DEFAULT_RATE_CARD.settings;

    // Filter out internal fields for client view
    const p = proposal.toObject();
    delete p.brief;
    delete p.briefForm;
    delete p.briefFiles;
    delete p.notes;
    delete p.openItems;
    delete p.tone;

    res.json({
      proposal: p,
      company: settings,
      version: proposal.sharedVersion,
      clientResponse: proposal.clientResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/shared/:shareId/respond
router.post('/shared/:shareId/respond', async (req, res) => {
  try {
    const proposal = await Proposal.findOne({ shareId: req.params.shareId });
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const { decision, name, role, comment, answers } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Please enter your name' });
    }
    if (decision === 'changes' && (!comment || !comment.trim())) {
      return res.status(400).json({ error: 'Please describe the requested changes' });
    }

    proposal.clientResponse = {
      decision: decision === 'changes' ? 'changes' : 'approved',
      name: name.trim(),
      role: (role || '').trim(),
      comment: (comment || '').trim(),
      answers: answers || {},
      at: new Date(),
      version: proposal.sharedVersion
    };

    proposal.status = decision === 'changes' ? 'changes' : 'won';
    await proposal.save();

    res.json({
      success: true,
      decision: proposal.clientResponse.decision,
      status: proposal.status,
      response: proposal.clientResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────
   AUTHENTICATED PROPOSAL ROUTES
   ───────────────────────────────────────────────────────────── */
router.use(verifyToken);

// GET /api/proposals/ratecard
router.get('/ratecard', async (req, res) => {
  try {
    let doc = await ProposalRateCard.findOne({ key: 'main' });
    if (!doc || !doc.items || !doc.items.length) {
      // Auto-seed with default rate card & packages
      doc = await ProposalRateCard.findOneAndUpdate(
        { key: 'main' },
        {
          key: 'main',
          items: DEFAULT_RATE_CARD.items,
          packages: DEFAULT_RATE_CARD.packages,
          settings: DEFAULT_RATE_CARD.settings
        },
        { upsert: true, new: true }
      );
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/proposals/ratecard
router.put('/ratecard', async (req, res) => {
  try {
    const { items, packages, settings } = req.body;
    const update = {};
    if (items) update.items = items;
    if (packages) update.packages = packages;
    if (settings) update.settings = settings;

    const doc = await ProposalRateCard.findOneAndUpdate(
      { key: 'main' },
      { $set: update },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/proposals/pin/status
router.get('/pin/status', async (req, res) => {
  try {
    const pinSetting = await SystemSetting.findOne({ key: 'admin_proposal_pin' });
    const isConfigured = !!(pinSetting && pinSetting.value && pinSetting.value.hash);
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'superadmin');
    res.json({
      isConfigured,
      defaultPinHint: (isAdmin && !isConfigured) ? DEFAULT_PIN : null,
      lastUpdated: pinSetting ? pinSetting.value?.updatedAt : null,
      updatedBy: pinSetting ? pinSetting.value?.updatedBy : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/pin/verify
router.post('/pin/verify', async (req, res) => {
  try {
    const { pin } = req.body;
    const isValid = await verifyAdminPin(pin);
    if (!isValid) {
      return res.status(401).json({ valid: false, error: 'Incorrect Admin PIN / Passcode' });
    }
    res.json({ valid: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/pin/update
router.post('/pin/update', async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only an authorized Admin can update the Admin PIN' });
    }
    const { currentPin, newPin } = req.body;
    if (!newPin || newPin.trim().length < 4) {
      return res.status(400).json({ error: 'New PIN must be at least 4 digits' });
    }

    const pinSetting = await SystemSetting.findOne({ key: 'admin_proposal_pin' });
    if (pinSetting && pinSetting.value && pinSetting.value.hash) {
      const isMatch = await bcrypt.compare((currentPin || '').trim(), pinSetting.value.hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Current Admin PIN is incorrect' });
      }
    } else {
      // First time setting: check if current pin matches default or let them set
      if (currentPin && currentPin.trim() !== DEFAULT_PIN) {
        return res.status(401).json({ error: `Initial default PIN is ${DEFAULT_PIN}` });
      }
    }

    await setAdminPin(newPin, req.user);
    res.json({ success: true, message: 'Admin PIN updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/proposals
router.get('/', async (req, res) => {
  try {
    const { status, search, client } = req.query;
    const filter = {};

    // Role-specific scoping: Clients can only see approved/released proposals for their organisation
    if (req.user && req.user.role === 'client') {
      let clientName = '';
      if (req.user.clientId) {
        const cDoc = await Client.findById(req.user.clientId).lean();
        if (cDoc && cDoc.name) clientName = cDoc.name;
      }

      const clientMatch = [];
      if (clientName) {
        clientMatch.push({ client: new RegExp(clientName.trim(), 'i') });
        clientMatch.push({ clientShort: new RegExp(clientName.trim(), 'i') });
      }
      if (req.user.name) {
        clientMatch.push({ contact: new RegExp(req.user.name.trim(), 'i') });
      }
      if (req.user.email) {
        clientMatch.push({ contactEmail: req.user.email.toLowerCase().trim() });
      }

      if (!clientMatch.length) {
        return res.json([]);
      }

      filter.$or = clientMatch;
      // Clients may only access verified and released proposals
      filter.status = { $in: ['approved', 'with_client', 'won', 'changes'] };
    } else {
      if (status && status !== 'all') {
        filter.status = status;
      }
      if (client) {
        filter.client = new RegExp(client, 'i');
      }
      if (search) {
        const q = search.trim();
        filter.$or = [
          { client: { $regex: q, $options: 'i' } },
          { title: { $regex: q, $options: 'i' } },
          { ref: { $regex: q, $options: 'i' } },
          { contact: { $regex: q, $options: 'i' } }
        ];
      }
    }

    const proposals = await Proposal.find(filter)
      .sort({ updatedAt: -1 })
      .populate('createdBy', 'name email role');

    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Validate MongoDB ObjectId on all /:id parameters
router.param('id', (req, res, next, id) => {
  if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid or missing proposal ID' });
  }
  next();
});

// GET /api/proposals/:id
router.get('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate('createdBy', 'name email role')
      .populate('approval.approverId', 'name email role');
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    // Client role authorization check
    if (req.user && req.user.role === 'client') {
      let clientName = '';
      if (req.user.clientId) {
        const cDoc = await Client.findById(req.user.clientId).lean();
        if (cDoc && cDoc.name) clientName = cDoc.name;
      }
      const matchName = clientName && (
        (proposal.client && proposal.client.toLowerCase().includes(clientName.toLowerCase())) ||
        (proposal.clientShort && proposal.clientShort.toLowerCase().includes(clientName.toLowerCase()))
      );
      const matchContact = req.user.name && proposal.contact && proposal.contact.toLowerCase().includes(req.user.name.toLowerCase());
      const matchEmail = req.user.email && proposal.contactEmail && proposal.contactEmail.toLowerCase() === req.user.email.toLowerCase();

      if (!matchName && !matchContact && !matchEmail) {
        return res.status(403).json({ error: 'You do not have permission to view this proposal' });
      }
      if (!['approved', 'with_client', 'won', 'changes'].includes(proposal.status)) {
        return res.status(403).json({ error: 'This proposal has not been released yet' });
      }
    }

    res.json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.client || !data.client.trim()) {
      data.client = (data.clientShort && data.clientShort.trim()) || 'Client';
    }

    if (!data.ref) {
      const year = new Date().getFullYear();
      const rand = Math.floor(100 + Math.random() * 900);
      data.ref = `CI360/PR/${year}/${rand}`;
    }

    data.createdBy = req.user._id;
    data.contentHash = computeContentHash(data);

    const proposal = await Proposal.create(data);
    res.status(201).json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/proposals/:id
router.put('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    const newHash = computeContentHash(req.body);
    const wasApproved = proposal.status === 'approved' || proposal.status === 'with_client';

    // If client-facing content changed after approval, require fresh approval
    if (wasApproved && proposal.contentHash && proposal.contentHash !== newHash) {
      req.body.status = 'draft';
      if (req.body.approval) {
        req.body.approval.decision = null;
      }
    }

    req.body.contentHash = newHash;

    const updated = await Proposal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/proposals/:id
router.delete('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.json({ success: true, message: 'Proposal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/:id/request-approval
router.post('/:id/request-approval', async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    if (!proposal.heads || !proposal.heads.length) {
      return res.status(400).json({ error: 'Add scope and heads before requesting approval' });
    }

    const { approverId, approverName, approverEmail, note } = req.body;
    proposal.status = 'pending';
    proposal.contentHash = computeContentHash(proposal);
    proposal.approval = {
      approverId: approverId || req.user._id,
      approverName: approverName || 'Pramit Ghosh',
      approverEmail: approverEmail || 'pramit.ghosh@ci360degrees.com',
      decision: 'pending',
      note: note || '',
      hash: proposal.contentHash,
      at: new Date(),
      pinVerified: false
    };

    proposal.approvalHistory.push({
      adminId: req.user._id,
      adminName: req.user.name,
      adminEmail: req.user.email,
      adminRole: req.user.role,
      action: 'Submitted for Internal Approval',
      pinVerified: false,
      note: note || '',
      hash: proposal.contentHash,
      timestamp: new Date(),
      ip: req.ip || req.headers['x-forwarded-for'] || ''
    });

    await proposal.save();
    res.json({ success: true, proposal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────
   ADMIN PIN SECURE APPROVAL & RELEASE ENDPOINTS
   "The admin enters a secure PIN before a proposal can be approved,
    finalized, or released. The software records the admin's identity,
    date, time, and action."
   ───────────────────────────────────────────────────────────── */

// POST /api/proposals/:id/approve (Requires Admin PIN)
router.post('/:id/approve', async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only an authorized Admin can approve proposals with Admin PIN' });
    }

    const { pin, note, action = 'Approved with Admin PIN' } = req.body;

    // Verify Admin PIN
    const isPinValid = await verifyAdminPin(pin);
    if (!isPinValid) {
      return res.status(401).json({
        error: 'Incorrect Admin PIN / Passcode. Internal approval declined.',
        pinFailed: true
      });
    }

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    const hash = computeContentHash(proposal);
    proposal.contentHash = hash;
    proposal.status = 'approved';

    proposal.approval = {
      approverId: req.user._id,
      approverName: req.user.name,
      approverEmail: req.user.email,
      decision: 'approved',
      note: (note || '').trim(),
      hash,
      at: new Date(),
      pinVerified: true
    };

    // Record immutable audit entry
    proposal.approvalHistory.push({
      adminId: req.user._id,
      adminName: req.user.name,
      adminEmail: req.user.email,
      adminRole: req.user.role,
      action: action.trim(),
      pinVerified: true,
      note: (note || '').trim(),
      hash,
      timestamp: new Date(),
      ip: req.ip || req.headers['x-forwarded-for'] || ''
    });

    await proposal.save();

    res.json({
      success: true,
      message: 'Proposal authorized and approved successfully with Admin PIN',
      proposal,
      approvalEvent: proposal.approvalHistory[proposal.approvalHistory.length - 1]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/:id/finalize (Requires Admin PIN)
router.post('/:id/finalize', async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only an authorized Admin can finalize proposals' });
    }

    const { pin, note } = req.body;

    const isPinValid = await verifyAdminPin(pin);
    if (!isPinValid) {
      return res.status(401).json({
        error: 'Incorrect Admin PIN / Passcode. Finalization declined.',
        pinFailed: true
      });
    }

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    const hash = computeContentHash(proposal);
    proposal.contentHash = hash;
    proposal.status = 'approved';

    proposal.approvalHistory.push({
      adminId: req.user._id,
      adminName: req.user.name,
      adminEmail: req.user.email,
      adminRole: req.user.role,
      action: 'Finalized & Locked with Admin PIN',
      pinVerified: true,
      note: (note || '').trim(),
      hash,
      timestamp: new Date(),
      ip: req.ip || req.headers['x-forwarded-for'] || ''
    });

    await proposal.save();

    res.json({
      success: true,
      message: 'Proposal finalized with Admin PIN',
      proposal
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/:id/release (Requires Admin PIN)
router.post('/:id/release', async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only an authorized Admin can release proposals to clients' });
    }

    const { pin, note } = req.body;

    const isPinValid = await verifyAdminPin(pin);
    if (!isPinValid) {
      return res.status(401).json({
        error: 'Incorrect Admin PIN / Passcode. Release to client declined.',
        pinFailed: true
      });
    }

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    // Must be approved by an Admin first
    if (proposal.status !== 'approved' || !proposal.approval || !proposal.approval.pinVerified) {
      return res.status(400).json({
        error: 'Proposal must be approved by an Admin with PIN before it can be released to client.'
      });
    }

    if (!proposal.shareId) {
      proposal.shareId = crypto.randomBytes(9).toString('hex');
    }
    proposal.sharedVersion = (proposal.sharedVersion || 0) + 1;
    proposal.sharedAt = new Date();
    proposal.status = 'with_client';

    const hash = computeContentHash(proposal);
    proposal.contentHash = hash;

    // Record audit event
    proposal.approvalHistory.push({
      adminId: req.user._id,
      adminName: req.user.name,
      adminEmail: req.user.email,
      adminRole: req.user.role,
      action: `Released to Client (v${proposal.sharedVersion}) with Admin PIN`,
      pinVerified: true,
      note: (note || '').trim(),
      hash,
      timestamp: new Date(),
      ip: req.ip || req.headers['x-forwarded-for'] || ''
    });

    await proposal.save();

    const host = req.get('host') || 'localhost:3000';
    const protocol = req.protocol || 'http';
    const shareUrl = `${protocol}://${host}/proposal?p=${proposal.shareId}`;

    res.json({
      success: true,
      message: 'Proposal released to client successfully with Admin PIN',
      shareId: proposal.shareId,
      shareUrl,
      sharedVersion: proposal.sharedVersion,
      proposal
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/proposals/:id/return (Admin returns proposal with feedback)
router.post('/:id/return', async (req, res) => {
  try {
    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({ error: 'Please enter review comments explaining what to change' });
    }

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    proposal.status = 'returned';
    proposal.approval = {
      approverId: req.user._id,
      approverName: req.user.name,
      approverEmail: req.user.email,
      decision: 'returned',
      note: note.trim(),
      hash: proposal.contentHash,
      at: new Date(),
      pinVerified: false
    };

    proposal.approvalHistory.push({
      adminId: req.user._id,
      adminName: req.user.name,
      adminEmail: req.user.email,
      adminRole: req.user.role,
      action: 'Returned by Admin with Comments',
      pinVerified: false,
      note: note.trim(),
      hash: proposal.contentHash,
      timestamp: new Date(),
      ip: req.ip || req.headers['x-forwarded-for'] || ''
    });

    await proposal.save();
    res.json({ success: true, message: 'Proposal returned for revision', proposal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
