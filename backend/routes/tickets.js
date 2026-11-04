const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SupportTicket = mongoose.models.SupportTicket || require('../models/SupportTicket');
const Job = mongoose.models.Job || require('../models/Job');
const User = mongoose.models.User || require('../models/User');
const Personnel = mongoose.models.Personnel || require('../models/Personnel');
const { verifyToken } = require('../middleware/auth');
const { createNotificationForTicket } = require('../utils/notify');

// 1. Mandatory Token Verification
router.use(verifyToken);

// 2. STRICT RBAC ACCESS CONTROL: Clients are strictly prohibited from the Support Tickets module
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  if (req.user.role === 'client') {
    return res.status(403).json({ error: 'Access denied. Support tickets are internal-only.' });
  }
  next();
});

// Helper: Check if user is Admin / Manager
const isAdmin = (user) => {
  if (!user) return false;
  return user.role === 'superadmin' || user.role === 'admin';
};

// Helper: Can user access/modify this ticket? (Admins, assigned employees, or ticket creator/reporter)
function canAccessTicket(ticket, user) {
  if (!user || !ticket) return false;
  if (user.role === 'superadmin' || user.role === 'admin') return true;
  const uid = String(user._id);
  const pId = user.personnelId ? String(user.personnelId) : null;
  const uName = (user.name || '').toLowerCase().trim();

  // Check assigned (single or multiple)
  if (ticket.assignee) {
    if (ticket.assignee.userId && (String(ticket.assignee.userId) === uid || (pId && String(ticket.assignee.userId) === pId))) return true;
    if (ticket.assignee.name && ticket.assignee.name.toLowerCase().trim() === uName) return true;
  }
  if (Array.isArray(ticket.assignees) && ticket.assignees.some(a => {
    if (!a) return false;
    if (a.userId && (String(a.userId) === uid || (pId && String(a.userId) === pId))) return true;
    if (a.name && a.name.toLowerCase().trim() === uName) return true;
    return false;
  })) return true;

  // Check reporter / creator
  if (ticket.reporter) {
    if (ticket.reporter.userId && (String(ticket.reporter.userId) === uid || (pId && String(ticket.reporter.userId) === pId))) return true;
    if (ticket.reporter.name && ticket.reporter.name.toLowerCase().trim() === uName) return true;
  }
  if (ticket.userId && (String(ticket.userId) === uid || (pId && String(ticket.userId) === pId))) return true;
  return false;
}

// Helper: Generate next sequential unique Ticket ID (e.g. SUP-001)
async function generateUniqueTicketId() {
  const latestTickets = await SupportTicket.find({ ticketId: /^SUP-\d+$/ })
    .sort({ createdAt: -1 })
    .limit(20)
    .select('ticketId')
    .lean();

  let maxNum = 0;
  for (const t of latestTickets) {
    const match = t.ticketId && t.ticketId.match(/^SUP-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  }

  if (maxNum === 0) {
    const count = await SupportTicket.countDocuments();
    maxNum = count;
  }

  let nextNum = maxNum + 1;
  let candidateId = `SUP-${String(nextNum).padStart(3, '0')}`;

  // Guard against any collision
  while (await SupportTicket.findOne({ ticketId: candidateId })) {
    nextNum++;
    candidateId = `SUP-${String(nextNum).padStart(3, '0')}`;
  }

  return candidateId;
}

// Helper: Parse human time string into hours (e.g. "2h 30m" -> 2.5, "45m" -> 0.75, "3h" -> 3)
function parseTimeStringToHours(str) {
  if (!str) return 0;
  let totalHours = 0;
  const hMatch = str.match(/(\d+(?:\.\d+)?)\s*h/i);
  if (hMatch) totalHours += parseFloat(hMatch[1]);
  const mMatch = str.match(/(\d+(?:\.\d+)?)\s*m/i);
  if (mMatch) totalHours += parseFloat(mMatch[1]) / 60;
  const dMatch = str.match(/(\d+(?:\.\d+)?)\s*d/i);
  if (dMatch) totalHours += parseFloat(dMatch[1]) * 8; // standard 8h day
  if (totalHours === 0 && !isNaN(Number(str))) {
    totalHours = parseFloat(str);
  }
  return Math.round(totalHours * 100) / 100;
}

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/tickets/staff - Active internal staff/employees for ticket assignment
   Accessible to all internal roles (superadmin, admin, employee, accounts)
   ───────────────────────────────────────────────────────────────────────────── */
router.get('/staff', async (req, res) => {
  try {
    const staff = await User.find({
      active: { $ne: false },
      isDeleted: { $ne: true },
      role: { $in: ['employee', 'admin', 'superadmin', 'accounts'] }
    })
      .select('_id name role email avatar personnelId')
      .sort({ name: 1 })
      .lean();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/tickets/stats - Aggregate Overview KPI Metrics for Board & Admin
   ───────────────────────────────────────────────────────────────────────────── */
router.get('/stats', async (req, res) => {
  try {
    const isAdmin = req.user.role === 'superadmin' || req.user.role === 'admin';
    const filter = {};
    if (!isAdmin) {
      const myId = req.user._id;
      const orConditions = [
        { 'assignees.userId': myId },
        { 'assignee.userId': myId },
        { 'reporter.userId': myId },
        { userId: myId }
      ];
      if (req.user.personnelId) {
        orConditions.push({ 'assignees.userId': req.user.personnelId });
        orConditions.push({ 'assignee.userId': req.user.personnelId });
      }
      if (req.user.name) {
        orConditions.push({ 'assignees.name': new RegExp(`^${req.user.name}$`, 'i') });
        orConditions.push({ 'assignee.name': new RegExp(`^${req.user.name}$`, 'i') });
      }
      filter.$or = orConditions;
    }
    const tickets = await SupportTicket.find(filter).lean();
    const now = new Date();

    const stats = {
      total: tickets.length,
      toDo: 0,
      content: 0,
      design: 0,
      underReview: 0,
      readyToLeave: 0,
      // Backwards compatibility mirrors
      inProgress: 0,
      resolved: 0,
      closed: 0,
      critical: 0,
      overdue: 0,
      myAssigned: 0,
      myReported: 0
    };

    const myId = String(req.user._id);
    const myPid = req.user.personnelId ? String(req.user.personnelId) : null;
    const myName = (req.user.name || '').toLowerCase().trim();

    tickets.forEach(t => {
      let st = t.status || 'To Do';
      // Normalize legacy statuses
      if (st === 'In Progress') st = 'Content';
      else if (st === 'Resolved') st = 'Under Review';
      else if (st === 'Closed') st = 'Ready to Leave';

      if (st === 'To Do') stats.toDo++;
      else if (st === 'Content') { stats.content++; stats.inProgress++; }
      else if (st === 'Design') stats.design++;
      else if (st === 'Under Review') { stats.underReview++; stats.resolved++; }
      else if (st === 'Ready to Leave') { stats.readyToLeave++; stats.closed++; }

      if (t.priority === 'Critical') stats.critical++;

      if (t.dueDate && new Date(t.dueDate) < now && st !== 'Ready to Leave' && st !== 'Closed') {
        stats.overdue++;
      }

      const isAssigned = (t.assignees && t.assignees.some(a => a && (
        (a.userId && (String(a.userId) === myId || (myPid && String(a.userId) === myPid))) ||
        (a.name && a.name.toLowerCase().trim() === myName)
      ))) || (t.assignee && (
        (t.assignee.userId && (String(t.assignee.userId) === myId || (myPid && String(t.assignee.userId) === myPid))) ||
        (t.assignee.name && t.assignee.name.toLowerCase().trim() === myName)
      ));

      if (isAssigned) {
        stats.myAssigned++;
      }
      if (t.reporter && (
        (t.reporter.userId && (String(t.reporter.userId) === myId || (myPid && String(t.reporter.userId) === myPid))) ||
        (t.reporter.name && t.reporter.name.toLowerCase().trim() === myName)
      )) {
        stats.myReported++;
      }
    });

    res.json(stats);
  } catch (err) {
    console.error('Error fetching ticket stats:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/tickets - List tickets with filtering, search, and sorting
   (Employees see only tickets assigned to them or created by them; Admins see all)
   ───────────────────────────────────────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      category,
      assigneeId,
      reporterId,
      jobId,
      myIssuesOnly,
      sort
    } = req.query;

    const isAdmin = req.user.role === 'superadmin' || req.user.role === 'admin';
    const filter = {};

    // Role Filtering: Employees only see their assigned tickets (or tickets they created); Admins see all
    if (!isAdmin) {
      const myId = req.user._id;
      const orConditions = [
        { 'assignees.userId': myId },
        { 'assignee.userId': myId },
        { 'reporter.userId': myId },
        { userId: myId }
      ];
      if (req.user.personnelId) {
        orConditions.push({ 'assignees.userId': req.user.personnelId });
        orConditions.push({ 'assignee.userId': req.user.personnelId });
      }
      if (req.user.name) {
        orConditions.push({ 'assignees.name': new RegExp(`^${req.user.name}$`, 'i') });
        orConditions.push({ 'assignee.name': new RegExp(`^${req.user.name}$`, 'i') });
      }
      filter.$or = orConditions;
    }

    // Assignee filter (usable by admins or employees filtering among their assigned tickets)
    if (assigneeId && assigneeId !== 'all') {
      let assigneeConditions = [];
      if (assigneeId === 'unassigned') {
        assigneeConditions = [
          { assignees: { $size: 0 } },
          { 'assignee.userId': null },
          { assignee: null }
        ];
      } else {
        assigneeConditions = [
          { 'assignees.userId': assigneeId },
          { 'assignee.userId': assigneeId }
        ];
      }
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: assigneeConditions }];
        delete filter.$or;
      } else {
        filter.$or = assigneeConditions;
      }
    }

    // Status filter
    if (status && status !== 'all') {
      if (status.includes(',')) {
        filter.status = { $in: status.split(',').map(s => s.trim()) };
      } else {
        filter.status = status;
      }
    }

    // Priority filter
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    // Category filter
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Reporter filter
    if (reporterId && reporterId !== 'all') {
      filter['reporter.userId'] = reporterId;
    }

    // Related Job filter
    if (jobId && jobId !== 'all') {
      filter.jobId = jobId;
    }

    // Quick filter: My Issues Only
    if (myIssuesOnly === 'true' || myIssuesOnly === true) {
      const myId = req.user._id;
      filter.$or = [
        { 'assignee.userId': myId },
        { 'reporter.userId': myId },
        { userId: myId }
      ];
    }

    // Search query (matches ticketId, title, or description)
    if (search && search.trim()) {
      const q = search.trim();
      const rx = new RegExp(q, 'i');
      const searchConditions = [
        { ticketId: rx },
        { title: rx },
        { description: rx },
        { subject: rx },
        { message: rx }
      ];
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: searchConditions }];
        delete filter.$or;
      } else {
        filter.$or = searchConditions;
      }
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'priority') {
      sortOption = { priority: 1, createdAt: -1 };
    } else if (sort === 'dueDate') {
      sortOption = { dueDate: 1, createdAt: -1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'updated') {
      sortOption = { updatedAt: -1 };
    }

    const tickets = await SupportTicket.find(filter)
      .populate('jobId', 'title')
      .sort(sortOption)
      .lean();

    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/tickets/:id - Fetch single detailed ticket
   ───────────────────────────────────────────────────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    let ticket = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      ticket = await SupportTicket.findById(req.params.id)
        .populate('jobId', 'title')
        .lean();
    }
    if (!ticket) {
      ticket = await SupportTicket.findOne({ ticketId: req.params.id.toUpperCase() })
        .populate('jobId', 'title')
        .lean();
    }

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only view tickets assigned to you or created by you.' });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/tickets - Create a new internal support ticket (Jira-Style)
   ───────────────────────────────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      subject,
      description,
      message,
      category = 'Task',
      priority = 'Medium',
      assigneeId,
      assigneeIds,
      dueDate,
      jobId,
      attachments = []
    } = req.body;

    const ticketTitle = (title || subject || '').trim();
    if (!ticketTitle) {
      return res.status(400).json({ error: 'Ticket title is required' });
    }

    const ticketDesc = (description || message || '').trim();

    // 1. Generate unique sequential ID (e.g. SUP-001)
    const uniqueId = await generateUniqueTicketId();

    // 2. Reporter info (current user)
    const reporter = {
      userId: req.user._id,
      name: req.user.name || 'Staff Member',
      role: req.user.role || 'employee',
      email: req.user.email || '',
      avatar: (req.user.name || 'U').slice(0, 1).toUpperCase()
    };

    // 3. Assignees info (multi-employee assignment support)
    let targetIds = [];
    if (Array.isArray(assigneeIds)) {
      targetIds = assigneeIds.filter(id => id && mongoose.Types.ObjectId.isValid(id));
    } else if (typeof assigneeIds === 'string' && assigneeIds.trim()) {
      targetIds = assigneeIds.split(',').map(s => s.trim()).filter(id => id && mongoose.Types.ObjectId.isValid(id));
    } else if (assigneeId && mongoose.Types.ObjectId.isValid(assigneeId)) {
      targetIds = [assigneeId];
    }

    let assignees = [];
    if (targetIds.length > 0) {
      let targetUsers = await User.find({ _id: { $in: targetIds }, active: { $ne: false } });
      const matchedPersonnel = await Personnel.find({ _id: { $in: targetIds } });
      if (matchedPersonnel.length > 0) {
        const pIds = matchedPersonnel.map(p => p._id);
        const usersByPersonnel = await User.find({ personnelId: { $in: pIds }, active: { $ne: false } });
        const existingIds = new Set(targetUsers.map(u => String(u._id)));
        usersByPersonnel.forEach(u => {
          if (!existingIds.has(String(u._id))) targetUsers.push(u);
        });
      }
      assignees = targetUsers.map(u => ({
        userId: u._id,
        name: u.name,
        role: u.role || 'employee',
        email: u.email || '',
        avatar: (u.name || 'U').slice(0, 1).toUpperCase()
      }));
    }

    const primaryAssignee = assignees.length > 0 ? assignees[0] : {
      userId: null,
      name: 'Unassigned',
      role: '',
      email: '',
      avatar: ''
    };

    // 4. Job link
    let validJobId = null;
    let jobTitle = '';
    if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
      const job = await Job.findById(jobId).select('title');
      if (job) {
        validJobId = job._id;
        jobTitle = job.title;
      }
    }

    // 5. Initial history entry
    const history = [{
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'ticket',
      from: '',
      to: 'Created ticket with status To Do',
      timestamp: new Date()
    }];

    if (assignees.length > 0) {
      history.push({
        id: new mongoose.Types.ObjectId().toString(),
        userId: req.user._id,
        userName: req.user.name,
        field: 'assignees',
        from: 'Unassigned',
        to: assignees.map(a => a.name).join(', '),
        timestamp: new Date()
      });
    }

    const newTicket = new SupportTicket({
      ticketId: uniqueId,
      title: ticketTitle,
      description: ticketDesc,
      category,
      status: 'To Do',
      priority,
      reporter,
      assignee: primaryAssignee,
      assignees,
      jobId: validJobId,
      jobTitle,
      dueDate: dueDate ? new Date(dueDate) : null,
      estimatedHours: Number(req.body.estimatedHours) || 0,
      loggedHours: 0,
      attachments: attachments.map(att => ({
        id: att.id || new mongoose.Types.ObjectId().toString(),
        name: att.name || 'Attachment',
        url: att.url,
        size: Number(att.size) || 0,
        type: att.type || '',
        uploadedBy: req.user.name || 'Staff',
        uploadedAt: new Date()
      })),
      subtasks: [],
      linkedTickets: [],
      comments: [],
      history,
      workLogs: []
    });

    await newTicket.save();

    // 6. Send notification to assignees and admins
    createNotificationForTicket({
      type: 'ticket_created',
      title: `🎫 New Ticket: [${uniqueId}] ${ticketTitle}`,
      message: `${reporter.name} created ticket ${uniqueId} (${priority} priority).`,
      ticket: newTicket,
      actorId: req.user._id,
      actorName: req.user.name
    }).catch(e => console.warn('Ticket notification error:', e.message));

    const populated = await SupportTicket.findById(newTicket._id)
      .populate('jobId', 'title')
      .lean();

    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating support ticket:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/tickets/:id/status - Quick drag & drop status change
   ───────────────────────────────────────────────────────────────────────────── */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['To Do', 'Content', 'Design', 'Under Review', 'Ready to Leave', 'In Progress', 'Resolved', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status column' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const oldStatus = ticket.status;
    if (oldStatus === status) {
      return res.json(ticket);
    }

    ticket.status = status;
    if ((status === 'Under Review' || status === 'Ready to Leave' || status === 'Resolved') && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
    }
    if ((status === 'Ready to Leave' || status === 'Closed') && !ticket.closedAt) {
      ticket.closedAt = new Date();
    }

    // Record history
    ticket.history.push({
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'status',
      from: oldStatus,
      to: status,
      timestamp: new Date()
    });

    await ticket.save();

    // Notify
    createNotificationForTicket({
      type: (status === 'Ready to Leave' || status === 'Resolved') ? 'ticket_resolved' : 'ticket_status_changed',
      title: `🎫 [${ticket.ticketId}] Status: ${status}`,
      message: `${req.user.name} moved ticket ${ticket.ticketId} from "${oldStatus}" to "${status}".`,
      ticket,
      actorId: req.user._id,
      actorName: req.user.name
    }).catch(e => console.warn('Status change notification error:', e.message));

    const updated = await SupportTicket.findById(ticket._id)
      .populate('jobId', 'title')
      .lean();

    res.json(updated);
  } catch (err) {
    console.error('Error updating ticket status:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/tickets/:id - Update ticket details (Title, Desc, Assignee, Priority...)
   ───────────────────────────────────────────────────────────────────────────── */
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const {
      title,
      description,
      priority,
      category,
      dueDate,
      assigneeId,
      assigneeIds,
      estimatedHours,
      jobId
    } = req.body;

    const changes = [];

    // Title
    if (title && title.trim() && title.trim() !== ticket.title) {
      changes.push({ field: 'title', from: ticket.title, to: title.trim() });
      ticket.title = title.trim();
    }

    // Description
    if (description !== undefined && description !== ticket.description) {
      changes.push({ field: 'description', from: '...', to: 'Updated description' });
      ticket.description = description;
    }

    // Priority
    if (priority && priority !== ticket.priority) {
      changes.push({ field: 'priority', from: ticket.priority, to: priority });
      ticket.priority = priority;
    }

    // Category
    if (category && category !== ticket.category) {
      changes.push({ field: 'category', from: ticket.category, to: category });
      ticket.category = category;
    }

    // Due Date
    if (dueDate !== undefined) {
      const newDue = dueDate ? new Date(dueDate) : null;
      const oldDueStr = ticket.dueDate ? ticket.dueDate.toISOString().slice(0, 10) : 'None';
      const newDueStr = newDue ? newDue.toISOString().slice(0, 10) : 'None';
      if (oldDueStr !== newDueStr) {
        changes.push({ field: 'dueDate', from: oldDueStr, to: newDueStr });
        ticket.dueDate = newDue;
      }
    }

    // Estimated Hours
    if (estimatedHours !== undefined && Number(estimatedHours) !== ticket.estimatedHours) {
      ticket.estimatedHours = Number(estimatedHours) || 0;
    }

    // Linked Job
    if (jobId !== undefined) {
      if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
        const job = await Job.findById(jobId).select('title');
        if (job) {
          ticket.jobId = job._id;
          ticket.jobTitle = job.title;
        }
      } else {
        ticket.jobId = null;
        ticket.jobTitle = '';
      }
    }

    // Reassignment (single or multiple employees)
    let reassigned = false;
    if (assigneeIds !== undefined || assigneeId !== undefined) {
      let targetIds = [];
      if (assigneeIds !== undefined) {
        if (Array.isArray(assigneeIds)) {
          targetIds = assigneeIds.filter(id => id && mongoose.Types.ObjectId.isValid(id));
        } else if (typeof assigneeIds === 'string' && assigneeIds.trim()) {
          targetIds = assigneeIds.split(',').map(s => s.trim()).filter(id => id && mongoose.Types.ObjectId.isValid(id));
        }
      } else if (assigneeId !== undefined) {
        if (assigneeId && mongoose.Types.ObjectId.isValid(assigneeId)) {
          targetIds = [assigneeId];
        }
      }

      let newAssignees = [];
      if (targetIds.length > 0) {
        let targetUsers = await User.find({ _id: { $in: targetIds }, active: { $ne: false } });
        const matchedPersonnel = await Personnel.find({ _id: { $in: targetIds } });
        if (matchedPersonnel.length > 0) {
          const pIds = matchedPersonnel.map(p => p._id);
          const usersByPersonnel = await User.find({ personnelId: { $in: pIds }, active: { $ne: false } });
          const existingIds = new Set(targetUsers.map(u => String(u._id)));
          usersByPersonnel.forEach(u => {
            if (!existingIds.has(String(u._id))) targetUsers.push(u);
          });
        }
        newAssignees = targetUsers.map(u => ({
          userId: u._id,
          name: u.name,
          role: u.role || 'employee',
          email: u.email || '',
          avatar: (u.name || 'U').slice(0, 1).toUpperCase()
        }));
      }

      const oldNames = (ticket.assignees && ticket.assignees.length > 0)
        ? ticket.assignees.map(a => a.name).join(', ')
        : (ticket.assignee && ticket.assignee.name ? ticket.assignee.name : 'Unassigned');
      const newNames = newAssignees.length > 0 ? newAssignees.map(a => a.name).join(', ') : 'Unassigned';

      if (oldNames !== newNames) {
        changes.push({ field: 'assignees', from: oldNames, to: newNames });
        ticket.assignees = newAssignees;
        ticket.assignee = newAssignees.length > 0 ? newAssignees[0] : {
          userId: null,
          name: 'Unassigned',
          role: '',
          email: '',
          avatar: ''
        };
        reassigned = true;
      }
    }

    // Log all changes to history
    changes.forEach(c => {
      ticket.history.push({
        id: new mongoose.Types.ObjectId().toString(),
        userId: req.user._id,
        userName: req.user.name,
        field: c.field,
        from: String(c.from || ''),
        to: String(c.to || ''),
        timestamp: new Date()
      });
    });

    await ticket.save();

    if (reassigned && ticket.assignees && ticket.assignees.length > 0) {
      createNotificationForTicket({
        type: 'ticket_assigned',
        title: `👤 Ticket Assigned: [${ticket.ticketId}]`,
        message: `${req.user.name} assigned ticket "${ticket.title}" to ${ticket.assignees.map(a => a.name).join(', ')}.`,
        ticket,
        actorId: req.user._id,
        actorName: req.user.name
      }).catch(e => console.warn('Assign notification error:', e.message));
    }

    const updated = await SupportTicket.findById(ticket._id)
      .populate('jobId', 'title')
      .lean();

    res.json(updated);
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/tickets/:id/comments - Add internal comment
   ───────────────────────────────────────────────────────────────────────────── */
router.post('/:id/comments', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content cannot be empty' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const newComment = {
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name || 'Staff Member',
      userRole: req.user.role || 'employee',
      userAvatar: (req.user.name || 'U').slice(0, 1).toUpperCase(),
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: null
    };

    ticket.comments.push(newComment);

    ticket.history.push({
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'comment',
      from: '',
      to: 'Added a comment',
      timestamp: new Date()
    });

    await ticket.save();

    createNotificationForTicket({
      type: 'ticket_comment_added',
      title: `💬 New Comment on [${ticket.ticketId}]`,
      message: `${req.user.name}: "${content.trim().slice(0, 80)}${content.trim().length > 80 ? '...' : ''}"`,
      ticket,
      actorId: req.user._id,
      actorName: req.user.name
    }).catch(e => console.warn('Comment notification error:', e.message));

    const updated = await SupportTicket.findById(ticket._id)
      .populate('jobId', 'title')
      .lean();

    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   PUT /api/tickets/:id/comments/:commentId - Edit comment
   ───────────────────────────────────────────────────────────────────────────── */
router.put('/:id/comments/:commentId', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content cannot be empty' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const comment = ticket.comments.find(c => c.id === req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    // Only author or admin can edit
    if (String(comment.userId) !== String(req.user._id) && !isAdmin(req.user)) {
      return res.status(403).json({ error: 'Not authorized to edit this comment' });
    }

    comment.content = content.trim();
    comment.updatedAt = new Date();

    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/tickets/:id/comments/:commentId - Delete comment
   ───────────────────────────────────────────────────────────────────────────── */
router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const comment = ticket.comments.find(c => c.id === req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (String(comment.userId) !== String(req.user._id) && !isAdmin(req.user)) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    ticket.comments = ticket.comments.filter(c => c.id !== req.params.commentId);
    await ticket.save();

    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/tickets/:id/subtasks - Create subtask
   ───────────────────────────────────────────────────────────────────────────── */
router.post('/:id/subtasks', async (req, res) => {
  try {
    const { title, assignedToUserId } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Subtask title is required' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    let assignedTo = { userId: null, name: '', avatar: '' };
    if (assignedToUserId && mongoose.Types.ObjectId.isValid(assignedToUserId)) {
      const u = await User.findById(assignedToUserId);
      if (u) {
        assignedTo = {
          userId: u._id,
          name: u.name,
          avatar: u.name.slice(0, 1).toUpperCase()
        };
      }
    }

    const newSubtask = {
      id: new mongoose.Types.ObjectId().toString(),
      title: title.trim(),
      completed: false,
      assignedTo,
      createdAt: new Date(),
      completedAt: null
    };

    ticket.subtasks.push(newSubtask);

    ticket.history.push({
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'subtask',
      from: '',
      to: `Added subtask "${title.trim()}"`,
      timestamp: new Date()
    });

    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/tickets/:id/subtasks/:subtaskId - Toggle completion or reassign subtask
   ───────────────────────────────────────────────────────────────────────────── */
router.patch('/:id/subtasks/:subtaskId', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const subtask = ticket.subtasks.find(s => s.id === req.params.subtaskId);
    if (!subtask) return res.status(404).json({ error: 'Subtask not found' });

    if (req.body.completed !== undefined) {
      subtask.completed = !!req.body.completed;
      subtask.completedAt = subtask.completed ? new Date() : null;
      ticket.history.push({
        id: new mongoose.Types.ObjectId().toString(),
        userId: req.user._id,
        userName: req.user.name,
        field: 'subtask',
        from: subtask.completed ? 'Open' : 'Completed',
        to: subtask.completed ? 'Completed' : 'Reopened',
        timestamp: new Date()
      });
    }

    if (req.body.title) {
      subtask.title = req.body.title.trim();
    }

    if (req.body.assignedToUserId !== undefined) {
      if (req.body.assignedToUserId) {
        const u = await User.findById(req.body.assignedToUserId);
        if (u) {
          subtask.assignedTo = {
            userId: u._id,
            name: u.name,
            avatar: u.name.slice(0, 1).toUpperCase()
          };
        }
      } else {
        subtask.assignedTo = { userId: null, name: '', avatar: '' };
      }
    }

    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/tickets/:id/subtasks/:subtaskId - Delete subtask
   ───────────────────────────────────────────────────────────────────────────── */
router.delete('/:id/subtasks/:subtaskId', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    ticket.subtasks = ticket.subtasks.filter(s => s.id !== req.params.subtaskId);
    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/tickets/:id/worklogs - Log time spent on ticket
   ───────────────────────────────────────────────────────────────────────────── */
router.post('/:id/worklogs', async (req, res) => {
  try {
    const { timeSpent, description } = req.body;
    if (!timeSpent || !timeSpent.trim()) {
      return res.status(400).json({ error: 'Time spent is required (e.g. 2h 30m)' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const hours = parseTimeStringToHours(timeSpent);
    const newLog = {
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      timeSpent: timeSpent.trim(),
      hours,
      description: (description || '').trim(),
      loggedAt: new Date()
    };

    ticket.workLogs.push(newLog);
    ticket.loggedHours = Math.round(((ticket.loggedHours || 0) + hours) * 100) / 100;

    ticket.history.push({
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'worklog',
      from: '',
      to: `Logged ${timeSpent.trim()}${description ? ' (' + description.slice(0, 40) + ')' : ''}`,
      timestamp: new Date()
    });

    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/tickets/:id/worklogs/:logId - Delete work log
   ───────────────────────────────────────────────────────────────────────────── */
router.delete('/:id/worklogs/:logId', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const log = ticket.workLogs.find(l => l.id === req.params.logId);
    if (!log) return res.status(404).json({ error: 'Work log not found' });

    if (String(log.userId) !== String(req.user._id) && !isAdmin(req.user)) {
      return res.status(403).json({ error: 'Not authorized to delete this work log' });
    }

    ticket.loggedHours = Math.max(0, Math.round(((ticket.loggedHours || 0) - (log.hours || 0)) * 100) / 100);
    ticket.workLogs = ticket.workLogs.filter(l => l.id !== req.params.logId);

    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/tickets/:id/links - Link another ticket
   ───────────────────────────────────────────────────────────────────────────── */
router.post('/:id/links', async (req, res) => {
  try {
    const { targetTicketId, relationship = 'relates to' } = req.body;
    if (!targetTicketId) {
      return res.status(400).json({ error: 'Target ticket identifier is required' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Source ticket not found' });

    const targetTicket = await SupportTicket.findOne({
      $or: [
        { ticketId: targetTicketId.toUpperCase().trim() },
        { _id: mongoose.Types.ObjectId.isValid(targetTicketId) ? targetTicketId : null }
      ]
    });

    if (!targetTicket) {
      return res.status(404).json({ error: `Target ticket ${targetTicketId} not found` });
    }

    if (String(ticket._id) === String(targetTicket._id)) {
      return res.status(400).json({ error: 'Cannot link a ticket to itself' });
    }

    // Check if link already exists
    const exists = ticket.linkedTickets.some(l => l.ticketId === targetTicket.ticketId);
    if (exists) {
      return res.status(400).json({ error: `Ticket ${targetTicket.ticketId} is already linked` });
    }

    ticket.linkedTickets.push({
      id: new mongoose.Types.ObjectId().toString(),
      ticketId: targetTicket.ticketId,
      ticketDocId: targetTicket._id,
      relationship,
      title: targetTicket.title,
      status: targetTicket.status
    });

    // Add reciprocal link on target
    const reciprocalRels = {
      'blocks': 'is blocked by',
      'is blocked by': 'blocks',
      'relates to': 'relates to',
      'duplicates': 'relates to'
    };
    targetTicket.linkedTickets.push({
      id: new mongoose.Types.ObjectId().toString(),
      ticketId: ticket.ticketId,
      ticketDocId: ticket._id,
      relationship: reciprocalRels[relationship] || 'relates to',
      title: ticket.title,
      status: ticket.status
    });

    ticket.history.push({
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'link',
      from: '',
      to: `Linked ${relationship} ${targetTicket.ticketId}`,
      timestamp: new Date()
    });

    await ticket.save();
    await targetTicket.save();

    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/tickets/:id/links/:linkId - Delete linked ticket
   ───────────────────────────────────────────────────────────────────────────── */
router.delete('/:id/links/:linkId', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    const link = ticket.linkedTickets.find(l => l.id === req.params.linkId);
    if (!link) return res.status(404).json({ error: 'Link not found' });

    ticket.linkedTickets = ticket.linkedTickets.filter(l => l.id !== req.params.linkId);
    await ticket.save();

    // Clean reciprocal link
    if (link.ticketDocId) {
      await SupportTicket.updateOne(
        { _id: link.ticketDocId },
        { $pull: { linkedTickets: { ticketId: ticket.ticketId } } }
      );
    }

    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/tickets/:id/attachments - Add file attachments
   ───────────────────────────────────────────────────────────────────────────── */
router.post('/:id/attachments', async (req, res) => {
  try {
    const { attachments } = req.body;
    if (!attachments || !attachments.length) {
      return res.status(400).json({ error: 'No attachments provided' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    attachments.forEach(att => {
      ticket.attachments.push({
        id: att.id || new mongoose.Types.ObjectId().toString(),
        name: att.name || 'File',
        url: att.url,
        size: Number(att.size) || 0,
        type: att.type || '',
        uploadedBy: req.user.name || 'Staff',
        uploadedAt: new Date()
      });
    });

    ticket.history.push({
      id: new mongoose.Types.ObjectId().toString(),
      userId: req.user._id,
      userName: req.user.name,
      field: 'attachment',
      from: '',
      to: `Uploaded ${attachments.length} file(s)`,
      timestamp: new Date()
    });

    await ticket.save();
    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/tickets/:id/attachments/:attachmentId - Delete attachment
   ───────────────────────────────────────────────────────────────────────────── */
router.delete('/:id/attachments/:attachmentId', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Access denied: You can only update tickets assigned to you or created by you.' });
    }

    ticket.attachments = ticket.attachments.filter(a => a.id !== req.params.attachmentId);
    await ticket.save();

    const updated = await SupportTicket.findById(ticket._id).populate('jobId', 'title').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/tickets/:id - Delete ticket (Admin or original Reporter)
   ───────────────────────────────────────────────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    // Admins, assigned employees, or original creators can delete the ticket
    if (!canAccessTicket(ticket, req.user)) {
      return res.status(403).json({ error: 'Not allowed to delete this ticket' });
    }

    await ticket.deleteOne();
    res.json({ success: true, message: `Ticket ${ticket.ticketId} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
