const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const SupportTicket = mongoose.models.SupportTicket || require('../models/SupportTicket');
const Job = mongoose.models.Job || require('../models/Job');
const Personnel = mongoose.models.Personnel || require('../models/Personnel');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Helper: Check if user is a primary manager (superadmin, Mansi, or Urna)
const isManager = (user) => {
  if (!user) return false;
  if (user.role === 'superadmin') return true;
  return /mansi/i.test(user.name) || /urna/i.test(user.name);
};

/* ── CREATE a support ticket (for a job OR general workspace) ── */
router.post('/', async (req, res) => {
  try {
    const { jobId, subject, message, priority, attachments } = req.body;
    if (!subject || !subject.trim() || !message || !message.trim()) {
      return res.status(400).json({ error: 'Subject and message are required' });
    }

    let validJobId = null;
    if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
      const jobExists = await Job.findById(jobId);
      if (jobExists) validJobId = jobExists._id;
    }

    const ticket = await SupportTicket.create({
      jobId: validJobId,
      userId:   req.user._id,
      userName: req.user.name || 'Staff Member',
      userRole: req.user.role || 'employee',
      subject:  subject.trim(),
      message:  message.trim(),
      priority: priority || 'Medium',
      status:   'Open',
      attachments: (attachments || []).map(att => ({
        name: att.name || 'Attachment',
        url: att.url,
        size: Number(att.size) || 0,
        type: att.type || '',
        uploadedAt: att.uploadedAt || new Date()
      }))
    });

    const populated = await SupportTicket.findById(ticket._id)
      .populate('jobId', 'title')
      .lean();

    res.status(201).json(populated || ticket);
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ── GET tickets for a specific job (or general workspace) ── */
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId || jobId === 'general' || jobId === 'null') {
      const tickets = await SupportTicket.find({ jobId: null })
        .populate('jobId', 'title')
        .sort({ createdAt: -1 })
        .lean();
      return res.json(tickets);
    }

    const filter = { jobId };

    // If manager, return all tickets for this job
    if (isManager(req.user)) {
      const tickets = await SupportTicket.find(filter)
        .populate('jobId', 'title')
        .sort({ createdAt: -1 })
        .lean();
      return res.json(tickets);
    }

    // Check job assignments & client ownership
    const job = await Job.findById(jobId);
    let pId = req.user.personnelId;
    if (!pId && req.user.name) {
      const p = await Personnel.findOne({ name: new RegExp('^' + req.user.name + '$', 'i') });
      if (p) pId = p._id;
    }

    const isAssignedEmp = job && pId && job.assignments.some(a => String(a.personId) === String(pId));
    const isOwnerClient = job && req.user.clientId && String(job.clientId) === String(req.user.clientId);

    if (isAssignedEmp || isOwnerClient) {
      const tickets = await SupportTicket.find(filter)
        .populate('jobId', 'title')
        .sort({ createdAt: -1 })
        .lean();
      return res.json(tickets);
    }

    // Fallback: user's own tickets on this job
    filter.userId = req.user._id;
    const tickets = await SupportTicket.find(filter)
      .populate('jobId', 'title')
      .sort({ createdAt: -1 })
      .lean();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── GET all tickets ── */
router.get('/', async (req, res) => {
  try {
    if (isManager(req.user)) {
      const tickets = await SupportTicket.find()
        .populate('jobId', 'title')
        .sort({ createdAt: -1 })
        .lean();
      return res.json(tickets);
    }

    if (req.user.role === 'employee') {
      let pId = req.user.personnelId;
      if (!pId && req.user.name) {
        const p = await Personnel.findOne({ name: new RegExp('^' + req.user.name + '$', 'i') });
        if (p) pId = p._id;
      }
      const myJobs = pId ? await Job.find({ 'assignments.personId': pId }).select('_id') : [];
      const jobIds = myJobs.map(j => j._id);
      const tickets = await SupportTicket.find({
        $or: [
          { userId: req.user._id },
          { jobId: { $in: jobIds } },
          { jobId: null }
        ]
      })
        .populate('jobId', 'title')
        .sort({ createdAt: -1 })
        .lean();
      return res.json(tickets);
    }

    if (req.user.role === 'client') {
      const myJobs = req.user.clientId ? await Job.find({ clientId: req.user.clientId }).select('_id') : [];
      const jobIds = myJobs.map(j => j._id);
      const tickets = await SupportTicket.find({
        $or: [
          { userId: req.user._id },
          { jobId: { $in: jobIds } }
        ]
      })
        .populate('jobId', 'title')
        .sort({ createdAt: -1 })
        .lean();
      return res.json(tickets);
    }

    const tickets = await SupportTicket.find({ userId: req.user._id })
      .populate('jobId', 'title')
      .sort({ createdAt: -1 })
      .lean();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── REPLY / update ticket status ── */
router.put('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    let pId = req.user.personnelId;
    if (!pId && req.user.name) {
      const p = await Personnel.findOne({ name: new RegExp('^' + req.user.name + '$', 'i') });
      if (p) pId = p._id;
    }

    const job = ticket.jobId ? await Job.findById(ticket.jobId) : null;
    const isAssigned = job && pId && job.assignments.some(a => String(a.personId) === String(pId));
    const isOwner = String(ticket.userId) === String(req.user._id);

    if (!isManager(req.user) && !isAssigned && !isOwner) {
      return res.status(403).json({ error: 'Not authorized to update this ticket' });
    }

    const { status, adminReply, adminAttachments, attachments, subject, message, priority } = req.body;
    const update = {};
    if (status) update.status = status;
    if (subject) update.subject = subject.trim();
    if (message) update.message = message.trim();
    if (priority) update.priority = priority;
    if (adminReply !== undefined) {
      update.adminReply = adminReply;
      update.repliedAt = new Date();
    }
    if (adminAttachments !== undefined) update.adminAttachments = adminAttachments;
    if (attachments !== undefined) update.attachments = attachments;

    const updated = await SupportTicket.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate('jobId', 'title');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── DELETE a ticket ── */
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    const isOwner = String(ticket.userId) === String(req.user._id);
    if (!isManager(req.user) && !isOwner) {
      return res.status(403).json({ error: 'Not allowed to delete this ticket' });
    }
    await ticket.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


