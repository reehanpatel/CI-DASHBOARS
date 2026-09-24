const express = require('express');
const Job = require('../models/Job');
const Service = require('../models/Service');
const Personnel = require('../models/Personnel');
const { verifyToken, requireRole } = require('../middleware/auth');
const { createNotificationsForJob } = require('../utils/notify');

const router = express.Router();
router.use(verifyToken);

router.get('/', async (req, res) => {
  const filter = {};
  if (req.user.role === 'client') {
    if (!req.user.clientId) return res.json([]);
    filter.clientId = req.user.clientId;
  } else if (req.query.mine === 'true' && req.user.personnelId) {
    filter['assignments.personId'] = req.user.personnelId;
  }
  if (req.query.clientId) filter.clientId = req.query.clientId;
  const jobs = await Job.find(filter).sort('-date').lean();
  res.json(jobs);
});

router.post('/', requireRole('superadmin', 'employee', 'client'), async (req, res) => {
  try {
    let { title, clientId, serviceIds, date, completionDate, status, value, description, priority, preferredPersonId, assignments, attachments, deliverables } = req.body;
    
    // Auto-scope clientId if logged in as client
    if (req.user.role === 'client') {
      if (!req.user.clientId) return res.status(400).json({ error: 'No client profile linked to this user' });
      clientId = req.user.clientId;
      
      // Assign to assigned/preferred employee if specified by client, otherwise default to Mansi & Urna
      if (!assignments || !assignments.length) {
        assignments = [];
        if (preferredPersonId) {
          assignments.push({
            personId: preferredPersonId,
            percent: 100,
            hours: 0
          });
        } else {
          const defaultPersons = await Personnel.find({ name: { $in: [/mansi/i, /urna/i] } });
          defaultPersons.forEach(p => {
            assignments.push({
              personId: p._id,
              percent: 0,
              hours: 0
            });
          });
        }
      }
    }

    if (!clientId) return res.status(400).json({ error: 'Client is required' });
    if (!serviceIds || !serviceIds.length) return res.status(400).json({ error: 'At least one service is required' });
    if (!date) return res.status(400).json({ error: 'Start date is required' });

    if (req.user.role !== 'client') {
      if (!assignments || !assignments.length) return res.status(400).json({ error: 'At least one person must be assigned' });
      for (const a of assignments) {
        if (a.hours === '' || a.hours == null) return res.status(400).json({ error: 'Enter hours spent for every assigned person' });
      }
    }

    const services = await Service.find({ _id: { $in: serviceIds } });
    const serviceNames = services.map(s => s.name);

    let preferredPersonName = '';
    if (preferredPersonId) {
      const prefPerson = await Personnel.findById(preferredPersonId);
      if (prefPerson) preferredPersonName = prefPerson.name;
    }

    const validPriorities = ['Medium', 'High', 'Urgent'];
    const jobPriority = validPriorities.includes(priority) ? priority : 'Medium';

    const job = await Job.create({
      title: title || '',
      clientId, serviceIds, serviceNames, date,
      completionDate: completionDate || null, // End Date / Expected Date
      status: status || 'In Progress', // Completion status (default In Progress)
      value: Number(value) || 0,
      description: description || '',
      priority: jobPriority,
      preferredPersonId: preferredPersonId || null,
      preferredPersonName,
      assignments: (assignments || []).map(a => ({ personId: a.personId, percent: Number(a.percent) || 0, hours: Number(a.hours) || 0 })),
      attachments: (attachments || []).map(att => ({
        name: att.name,
        url: att.url,
        size: Number(att.size) || 0,
        type: att.type || '',
        uploadedBy: att.uploadedBy || req.user.name || 'User',
        uploadedAt: att.uploadedAt || new Date()
      })),
      deliverables: (deliverables || []).map(del => ({
        name: del.name,
        url: del.url,
        size: Number(del.size) || 0,
        type: del.type || '',
        notes: del.notes || '',
        uploadedBy: del.uploadedBy || req.user.name || 'User',
        uploadedAt: del.uploadedAt || new Date()
      })),
      createdBy: req.user._id,
    });
    
    await createNotificationsForJob({
      type: 'job_created',
      title: 'New Job Logged',
      message: `Job "${job.title || 'Untitled'}" was logged.`,
      job,
      actorId: req.user._id
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Could not save job', detail: err.message });
  }
});

// Endpoint for Super Admin / Employee to toggle job status (Mark Complete / Mark In Progress)
router.patch('/:id/status', requireRole('superadmin', 'employee'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    
    if (req.body.completed === true || req.body.status === 'Completed') {
      job.status = 'Completed';
      if (!job.completionDate) job.completionDate = new Date();
    } else if (req.body.completed === false || req.body.status === 'In Progress') {
      job.status = 'In Progress';
      job.completionDate = null;
    } else {
      // Toggle
      const willBeDone = job.status !== 'Completed';
      job.status = willBeDone ? 'Completed' : 'In Progress';
      job.completionDate = willBeDone ? new Date() : null;
    }
    
    await job.save();

    await createNotificationsForJob({
      type: 'status_changed',
      title: 'Job Status Updated',
      message: `Job "${job.title || 'Untitled'}" is now ${job.status}.`,
      job,
      actorId: req.user._id
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Could not update status', detail: err.message });
  }
});

router.put('/:id', requireRole('superadmin', 'employee'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Not found' });
  if (req.user.role === 'employee') {
    let userPId = String(req.user.personnelId?._id || req.user.personnelId || '');
    if (!userPId) {
      const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
      if (p) userPId = String(p._id);
    }
    const isAssigned = (job.assignments || []).some(a => String(a.personId) === userPId);
    const isCreator = String(job.createdBy) === String(req.user._id);
    const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
    if (!isAssigned && !isCreator && !isLead) {
      return res.status(403).json({ error: 'You can only edit jobs assigned to you or logged yourself' });
    }
  }
  const { title, clientId, serviceIds, date, completionDate, status, value, description, priority, preferredPersonId, assignments, myHours, attachments, deliverables } = req.body;
  if (title !== undefined) job.title = title;
  if (clientId) job.clientId = clientId;
  if (serviceIds) {
    job.serviceIds = serviceIds;
    const services = await Service.find({ _id: { $in: serviceIds } });
    job.serviceNames = services.map(s => s.name);
  }
  if (date) job.date = date;
  
  // Synchronize status and completionDate
  if (status) {
    job.status = status;
    if (status === 'Completed') {
      job.completionDate = completionDate ? new Date(completionDate) : (job.completionDate || new Date());
    } else if (status === 'In Progress') {
      job.completionDate = null;
    }
  } else if (completionDate !== undefined) {
    if (completionDate) {
      job.completionDate = new Date(completionDate);
      job.status = 'Completed';
    } else {
      job.completionDate = null;
      job.status = 'In Progress';
    }
  }

  if (value !== undefined) job.value = Number(value) || 0;
  if (description !== undefined) job.description = description;
  if (priority && ['Medium', 'High', 'Urgent'].includes(priority)) job.priority = priority;
  if (attachments !== undefined) job.attachments = attachments;
  if (deliverables !== undefined) job.deliverables = deliverables;
  if (preferredPersonId !== undefined) {
    job.preferredPersonId = preferredPersonId || null;
    if (preferredPersonId) {
      const prefPerson = await Personnel.findById(preferredPersonId);
      job.preferredPersonName = prefPerson ? prefPerson.name : '';
    } else {
      job.preferredPersonName = '';
    }
  }
  if (assignments) {
    const validAss = (assignments || []).filter(a => a && a.personId && String(a.personId).trim() !== '');
    job.assignments = validAss.map(a => ({ personId: a.personId, percent: Number(a.percent) || 0, hours: Number(a.hours) || 0 }));
  } else if (myHours !== undefined) {
    let userPId = String(req.user.personnelId?._id || req.user.personnelId || '');
    if (!userPId) {
      const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
      if (p) userPId = String(p._id);
    }
    const ass = (job.assignments || []).find(a => String(a.personId) === userPId);
    if (ass) {
      ass.hours = Number(myHours) || 0;
      job.markModified('assignments');
    }
  }
  await job.save();

  await createNotificationsForJob({
    type: 'job_updated',
    title: 'Job Details Updated',
    message: `Job "${job.title || 'Untitled'}" is ${job.status}.`,
    job,
    actorId: req.user._id
  });

  res.json(job);
});

// Endpoint to append deliverable to a job
router.post('/:id/deliverables', requireRole('superadmin', 'employee', 'client'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const items = Array.isArray(req.body.deliverables)
      ? req.body.deliverables
      : (Array.isArray(req.body) ? req.body : [req.body]);

    const valid = items.filter(d => d && (d.url || d.base64 || d.data));
    if (!valid.length) {
      return res.status(400).json({ error: 'Deliverable name and URL are required' });
    }

    valid.forEach(d => {
      job.deliverables.push({
        name: d.name || 'Deliverable',
        url: d.url || d.base64 || d.data,
        size: Number(d.size) || 0,
        type: d.type || '',
        notes: d.notes || '',
        uploadedBy: req.user.name || 'User',
        uploadedAt: new Date()
      });
    });

    if (req.body.markComplete === true || req.body.status === 'Completed') {
      job.status = 'Completed';
      if (!job.completionDate) job.completionDate = new Date();
    }

    await job.save();

    const firstName = valid[0].name || 'Deliverable';
    await createNotificationsForJob({
      type: 'deliverable_added',
      title: 'New Deliverable Attached',
      message: `"${firstName}" was attached to Job "${job.title || 'Untitled'}".`,
      job,
      actorId: req.user._id
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Could not add deliverable', detail: err.message });
  }
});

// Endpoint to append general attachment to a job
router.post('/:id/attachments', requireRole('superadmin', 'employee', 'client'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const items = Array.isArray(req.body.attachments)
      ? req.body.attachments
      : (Array.isArray(req.body) ? req.body : [req.body]);

    const valid = items.filter(a => a && (a.url || a.base64 || a.data));
    if (!valid.length) {
      return res.status(400).json({ error: 'Attachment name and URL are required' });
    }

    valid.forEach(a => {
      job.attachments.push({
        name: a.name || 'Attachment',
        url: a.url || a.base64 || a.data,
        size: Number(a.size) || 0,
        type: a.type || '',
        uploadedBy: req.user.name || 'User',
        uploadedAt: new Date()
      });
    });

    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Could not add attachment', detail: err.message });
  }
});

// Endpoint for Client or Admin to approve deliverables
router.post('/:id/approve', requireRole('superadmin', 'client'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (req.user.role === 'client' && String(job.clientId) !== String(req.user.clientId)) {
      return res.status(403).json({ error: 'You can only approve jobs for your own account' });
    }

    const { rating, feedback } = req.body;
    job.status = 'Completed';
    if (!job.completionDate) job.completionDate = new Date();
    job.clientApproval = job.clientApproval || {};
    job.clientApproval.status = 'Approved';
    job.clientApproval.approvedAt = new Date();
    job.clientApproval.approvedBy = req.user.name || 'Client';
    if (feedback) job.clientApproval.feedback = feedback;
    if (rating && Number(rating) >= 1 && Number(rating) <= 5) {
      job.clientApproval.rating = Number(rating);
    }

    await job.save();

    await createNotificationsForJob({
      type: 'job_approved',
      title: '🎉 Deliverables Approved by Client',
      message: `Client approved deliverables for Job "${job.title || 'Untitled'}"${rating ? ` (${rating}★)` : ''}.`,
      job,
      actorId: req.user._id
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Could not approve job', detail: err.message });
  }
});

// Endpoint for Client or Admin to request a revision
router.post('/:id/revision', requireRole('superadmin', 'client'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (req.user.role === 'client' && String(job.clientId) !== String(req.user.clientId)) {
      return res.status(403).json({ error: 'You can only request revisions for your own account' });
    }

    const { feedback, attachments } = req.body;
    if (!feedback || !feedback.trim()) {
      return res.status(400).json({ error: 'Please describe the revision requested' });
    }

    job.status = 'Needs Revision';
    job.clientApproval = job.clientApproval || {};
    job.clientApproval.status = 'Revision Requested';
    job.clientApproval.feedback = feedback.trim();
    job.clientApproval.revisions = job.clientApproval.revisions || [];
    job.clientApproval.revisions.push({
      requestedAt: new Date(),
      requestedBy: req.user.name || 'Client',
      feedback: feedback.trim(),
      attachments: Array.isArray(attachments) ? attachments : []
    });

    await job.save();

    await createNotificationsForJob({
      type: 'revision_requested',
      title: '↺ Revision Requested by Client',
      message: `Client requested revision on Job "${job.title || 'Untitled'}": "${feedback.trim().slice(0, 100)}"`,
      job,
      actorId: req.user._id
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Could not request revision', detail: err.message });
  }
});

router.delete('/:id', requireRole('superadmin', 'employee'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Not found' });
  if (req.user.role === 'employee' && String(job.createdBy) !== String(req.user._id)) {
    return res.status(403).json({ error: 'You can only delete jobs you logged yourself' });
  }
  await Job.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
