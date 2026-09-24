const express = require('express');
const Target = require('../models/Target');
const Job = require('../models/Job');
const { verifyToken, requireRole } = require('../middleware/auth');
const { startOfDay, startOfWeek, startOfMonth } = require('../utils/stats');

const Personnel = require('../models/Personnel');
const Service = require('../models/Service');
const { createNotificationForTarget } = require('../utils/notify');

const router = express.Router();
router.use(verifyToken);

async function actualForTarget(t) {
  const now = new Date();
  let from;
  if (t.period === 'day') from = startOfDay(now);
  else if (t.period === 'week') from = startOfWeek(now);
  else from = startOfMonth(now);

  const jobs = await Job.find({
    serviceIds: t.serviceId,
    date: { $gte: from, $lte: now },
    'assignments.personId': t.personId,
  }).lean();

  let count = 0, hours = 0;
  jobs.forEach(j => {
    (j.assignments || []).forEach(a => {
      if (String(a.personId) === String(t.personId)) { count += 1; hours += Number(a.hours) || 0; }
    });
  });
  const autoVal = t.unit === 'hours' ? hours : count;
  if (t.completed !== undefined && t.completed !== null && t.completed > 0) {
    return Math.max(t.completed, autoVal);
  }
  return autoVal;
}

router.get('/', async (req, res) => {
  let filter = {};
  if (req.user.role === 'employee') {
    let pId = req.user.personnelId;
    if (!pId) {
      const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
      if (p) pId = p._id;
    }
    const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
    if (req.query.mine === 'true' || !isLead) {
      if (pId) filter.personId = pId;
    }
  } else if (req.query.personId) {
    filter.personId = req.query.personId;
  }

  const targets = await Target.find(filter).populate('personId', 'name').populate('serviceId', 'name');
  const withActuals = await Promise.all(targets.map(async t => ({
    ...t.toObject(), actual: await actualForTarget(t),
  })));
  res.json(withActuals);
});

router.post('/', requireRole('superadmin', 'employee'), async (req, res) => {
  let { personId, serviceId, quantity, unit, period, completed, attachments } = req.body;
  if (req.user.role === 'employee') {
    let userPId = String(req.user.personnelId?._id || req.user.personnelId || '');
    if (!userPId) {
      const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
      if (p) userPId = String(p._id);
    }
    const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
    if (!isLead || !personId) {
      personId = userPId;
    }
  }
  if (!personId || !serviceId) return res.status(400).json({ error: 'Person and service are required' });
  const t = await Target.create({
    personId,
    serviceId,
    quantity,
    unit: unit || 'count',
    period: period || 'day',
    completed: Number(completed) || 0,
    attachments: (attachments || []).map(att => ({
      name: att.name,
      url: att.url,
      size: Number(att.size) || 0,
      type: att.type || '',
      notes: att.notes || '',
      uploadedAt: att.uploadedAt || new Date()
    }))
  });

  try {
    const p = await Personnel.findById(personId);
    const s = await Service.findById(serviceId);
    createNotificationForTarget({
      type: 'target_assigned',
      title: '🎯 New Target Assigned',
      message: `${p ? p.name : 'Team member'} assigned a target of ${quantity} ${unit || 'deliverables'} (${period || 'day'}) for ${s ? s.name : 'Service'}.`,
      target: t,
      actorId: req.user._id
    });
  } catch(e){}

  res.status(201).json(t);
});

router.put('/:id', requireRole('superadmin', 'employee'), async (req, res) => {
  const { quantity, unit, period, serviceId, personId, completed, attachments } = req.body;
  const target = await Target.findById(req.params.id);
  if (!target) return res.status(404).json({ error: 'Target not found' });

  if (req.user.role === 'employee') {
    let userPId = String(req.user.personnelId?._id || req.user.personnelId || '');
    if (!userPId) {
      const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
      if (p) userPId = String(p._id);
    }
    const isOwner = String(target.personId) === userPId;
    const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
    if (!isOwner && !isLead) {
      return res.status(403).json({ error: 'You can only edit targets assigned to you' });
    }
  }

  if (quantity !== undefined) target.quantity = Number(quantity) || 1;
  if (unit) target.unit = unit;
  if (period) target.period = period;
  if (completed !== undefined) target.completed = Number(completed) || 0;
  if (serviceId) target.serviceId = serviceId;
  if (attachments !== undefined) target.attachments = attachments;
  if (personId && req.user.role === 'superadmin') target.personId = personId;

  await target.save();

  try {
    const p = await Personnel.findById(target.personId);
    const s = await Service.findById(target.serviceId);
    const isCompleted = target.completed >= target.quantity && target.quantity > 0;
    if (isCompleted) {
      createNotificationForTarget({
        type: 'target_completed',
        title: '🎉 Target Goal Achieved!',
        message: `${p ? p.name : 'Team member'} has completed 100% target quota (${target.completed}/${target.quantity} ${target.unit}) for ${s ? s.name : 'Service'}!`,
        target,
        actorId: req.user._id
      });
    } else {
      createNotificationForTarget({
        type: 'target_updated',
        title: '🎯 Target Updated',
        message: `Target for ${s ? s.name : 'Service'} updated to ${target.quantity} ${target.unit} (Completed: ${target.completed || 0}).`,
        target,
        actorId: req.user._id
      });
    }
  } catch(e){}

  res.json(target);
});

// Endpoint to append attachment / proof of work to target
router.post('/:id/attachments', requireRole('superadmin', 'employee'), async (req, res) => {
  try {
    const target = await Target.findById(req.params.id);
    if (!target) return res.status(404).json({ error: 'Target not found' });
    const { name, url, size, type, notes } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Attachment name and URL are required' });

    target.attachments.push({
      name,
      url,
      size: Number(size) || 0,
      type: type || '',
      notes: notes || '',
      uploadedAt: new Date()
    });

    await target.save();
    res.json(target);
  } catch (err) {
    res.status(500).json({ error: 'Could not add attachment', detail: err.message });
  }
});

router.delete('/:id', requireRole('superadmin', 'employee'), async (req, res) => {
  const target = await Target.findById(req.params.id);
  if (!target) return res.status(404).json({ error: 'Target not found' });

  if (req.user.role === 'employee') {
    let userPId = String(req.user.personnelId?._id || req.user.personnelId || '');
    if (!userPId) {
      const p = await Personnel.findOne({ name: new RegExp(req.user.name, 'i') });
      if (p) userPId = String(p._id);
    }
    const isOwner = String(target.personId) === userPId;
    const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
    if (!isOwner && !isLead) {
      return res.status(403).json({ error: 'You can only delete targets assigned to you' });
    }
  }

  await Target.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
