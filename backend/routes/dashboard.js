const express = require('express');
const Job = require('../models/Job');
const Personnel = require('../models/Personnel');
const Client = require('../models/Client');
const Roster = require('../models/Roster');
const { verifyToken, requireRole } = require('../middleware/auth');
const {
  periodRange, weeksBetween, utilStatus, computePersonStats, computeClientStats,
  filterJobsInRange, computeRosterLoad, ROLE_KEYS,
} = require('../utils/stats');

const router = express.Router();
router.use(verifyToken);

function buildInsights(personMap) {
  const out = [];
  const active = Object.values(personMap).filter(b => b.person.status !== 'vendor' && b.person.status !== 'inactive');

  const overworked = active.filter(b => utilStatus(b.utilization).label === 'Overworked').sort((a, b) => b.utilization - a.utilization);
  overworked.slice(0, 5).forEach(b => {
    out.push({
      type: 'red',
      text: `${b.person.name} is running at ${b.utilization.toFixed(0)}% of capacity (${b.hours.toFixed(1)} hrs logged). Duties: ${b.person.duties}. Consider redistributing work, backfilling with a hire, or leaning on external support for overflow.`,
    });
  });

  const idle = active.filter(b => ['Idle', 'Underutilised'].includes(utilStatus(b.utilization).label) && b.hours > 0).sort((a, b) => a.utilization - b.utilization);
  idle.slice(0, 4).forEach(b => {
    out.push({ type: 'blue', text: `${b.person.name} is at ${b.utilization.toFixed(0)}% of capacity. There's room here — consider cross-training toward a stretched role, or reassigning accounts.` });
  });

  return out;
}

// ---- SUPER ADMIN OVERVIEW ----
router.get('/admin', requireRole('superadmin'), async (req, res) => {
  const period = req.query.period || 'month';
  const { from, to } = periodRange(period);

  const [allJobs, personnel, clients, roster] = await Promise.all([
    Job.find().lean(), Personnel.find().lean(), Client.find().lean(), Roster.find().lean(),
  ]);
  const jobs = filterJobsInRange(allJobs, from, to);

  const personMap = computePersonStats(jobs, personnel, from, to);
  const clientMap = computeClientStats(jobs, clients);
  const rosterLoad = computeRosterLoad(roster, ROLE_KEYS);

  let totalValue = 0, totalHours = 0;
  jobs.forEach(j => {
    totalValue += Number(j.value) || 0;
    (j.assignments || []).forEach(a => { totalHours += Number(a.hours) || 0; });
  });

  const personArr = Object.values(personMap).map(b => ({
    personId: b.person._id, name: b.person.name, duties: b.person.duties, status: b.person.status,
    hours: b.hours, revenue: b.revenue, jobCount: b.jobCount, utilization: b.utilization, ...utilStatus(b.utilization),
  })).sort((a, b) => b.utilization - a.utilization);

  const clientArr = Object.values(clientMap).map(c => ({
    clientId: c.client._id, name: c.client.name, value: c.value, hours: c.hours, jobCount: c.jobCount,
    peopleCount: c.peopleSet.size, services: c.services,
  })).sort((a, b) => b.value - a.value);

  const svcTotals = {};
  jobs.forEach(j => {
    const names = j.serviceNames && j.serviceNames.length ? j.serviceNames : ['—'];
    const share = (Number(j.value) || 0) / names.length;
    names.forEach(n => { svcTotals[n] = (svcTotals[n] || 0) + share; });
  });
  const serviceArr = Object.entries(svcTotals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  res.json({
    period, from, to,
    overview: {
      totalValue, totalHours, totalJobs: jobs.length,
      activeClients: new Set(jobs.map(j => String(j.clientId))).size,
      totalClients: clients.length,
      overworked: personArr.filter(p => p.label === 'Overworked').length,
      underused: personArr.filter(p => p.label === 'Idle' || p.label === 'Underutilised').length,
    },
    insights: buildInsights(personMap),
    personnel: personArr,
    clients: clientArr,
    services: serviceArr,
    rosterLoad,
  });
});

// ---- EMPLOYEE OVERVIEW ----
router.get('/employee', requireRole('employee'), async (req, res) => {
  if (!req.user.personnelId) return res.status(400).json({ error: 'This login is not linked to a personnel record. Ask your admin to link it.' });
  const period = req.query.period || 'month';
  const { from, to } = periodRange(period);
  const weeks = weeksBetween(from, to);

  const [allJobs, person, roster] = await Promise.all([
    Job.find({ 'assignments.personId': req.user.personnelId }).populate('clientId', 'name').lean(),
    Personnel.findById(req.user.personnelId).lean(),
    Roster.find().lean(),
  ]);
  if (!person) return res.status(404).json({ error: 'Personnel record not found' });

  const jobs = filterJobsInRange(allJobs, from, to);
  let hours = 0, revenue = 0;
  jobs.forEach(j => {
    (j.assignments || []).forEach(a => {
      if (String(a.personId) === String(req.user.personnelId)) {
        hours += Number(a.hours) || 0;
        revenue += (Number(j.value) || 0) * (Number(a.percent) || 0) / 100;
      }
    });
  });
  const capacityHours = (person.capacity || 48) * weeks;
  const utilization = capacityHours > 0 ? (hours / capacityHours) * 100 : 0;

  const myAccounts = roster.filter(r => ROLE_KEYS.some(k => String(r.roles[k] || '').split(',').map(s => s.trim()).includes(person.name)));

  res.json({
    period, from, to,
    person: { name: person.name, duties: person.duties, capacity: person.capacity, status: person.status },
    stats: { hours, revenue, jobCount: jobs.length, utilization, ...utilStatus(utilization) },
    recentJobs: jobs.slice(0, 20),
    accountsCount: myAccounts.length,
    accounts: myAccounts.map(r => ({ id: r._id, clientId: r.clientId, difficulty: r.difficulty, nature: r.nature })),
  });
});

// ---- CLIENT OVERVIEW ----
router.get('/client', requireRole('client'), async (req, res) => {
  if (!req.user.clientId) return res.status(400).json({ error: 'This login is not linked to a client record. Ask your admin to link it.' });
  const period = req.query.period || 'month';
  const { from, to } = periodRange(period);

  const [allJobs, client, rosterEntries] = await Promise.all([
    Job.find({ clientId: req.user.clientId }).lean(),
    Client.findById(req.user.clientId).lean(),
    Roster.find({ clientId: req.user.clientId }).lean(),
  ]);
  const jobs = filterJobsInRange(allJobs, from, to);

  let value = 0, hours = 0;
  jobs.forEach(j => {
    value += Number(j.value) || 0;
    (j.assignments || []).forEach(a => { hours += Number(a.hours) || 0; });
  });

  res.json({
    period, from, to,
    client,
    stats: { value, hours, jobCount: jobs.length, completed: jobs.filter(j => j.completionDate).length, inProgress: jobs.filter(j => !j.completionDate).length },
    roster: rosterEntries,
    jobs: allJobs.sort((a, b) => new Date(b.date) - new Date(a.date)),
  });
});

module.exports = router;
