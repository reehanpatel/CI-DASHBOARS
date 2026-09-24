// Shared aggregation helpers used by the dashboard endpoints.

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function startOfWeek(d) {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const m = new Date(d); m.setDate(d.getDate() + diff); m.setHours(0, 0, 0, 0);
  return m;
}
function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function startOfQuarter(d) { const q = Math.floor(d.getMonth() / 3); return new Date(d.getFullYear(), q * 3, 1); }

function periodRange(period) {
  const now = new Date();
  let from, to = now;
  if (period === 'today') { from = startOfDay(now); }
  else if (period === 'week') { from = startOfWeek(now); }
  else if (period === 'quarter') { from = startOfQuarter(now); }
  else if (period === 'all') { from = new Date(2000, 0, 1); }
  else { from = startOfMonth(now); } // default: month
  return { from, to };
}

function weeksBetween(from, to) {
  return Math.max((to - from) / 86400000 / 7, 1 / 7);
}

function utilStatus(u) {
  if (u >= 115) return { label: 'Overworked', cls: 'red' };
  if (u >= 90) return { label: 'Stretched', cls: 'amber' };
  if (u >= 55) return { label: 'Balanced', cls: 'green' };
  if (u >= 25) return { label: 'Underutilised', cls: 'blue' };
  return { label: 'Idle', cls: 'gray' };
}

// jobs: array of Job docs (lean), personnelList: array of Personnel docs (lean)
function computePersonStats(jobs, personnelList, from, to) {
  const weeks = weeksBetween(from, to);
  const map = {};
  personnelList.forEach(p => { map[String(p._id)] = { person: p, hours: 0, revenue: 0, jobCount: 0 }; });
  jobs.forEach(job => {
    (job.assignments || []).forEach(a => {
      const key = String(a.personId);
      const bucket = map[key];
      if (!bucket) return;
      bucket.hours += Number(a.hours) || 0;
      bucket.revenue += (Number(job.value) || 0) * (Number(a.percent) || 0) / 100;
      bucket.jobCount += 1;
    });
  });
  Object.values(map).forEach(b => {
    const capacityHours = (b.person.capacity || 48) * weeks;
    b.capacityHours = capacityHours;
    b.utilization = capacityHours > 0 ? (b.hours / capacityHours) * 100 : 0;
  });
  return map;
}

function computeClientStats(jobs, clientsList) {
  const map = {};
  clientsList.forEach(c => { map[String(c._id)] = { client: c, value: 0, hours: 0, jobCount: 0, peopleSet: new Set(), services: {} }; });
  jobs.forEach(job => {
    const bucket = map[String(job.clientId)];
    if (!bucket) return;
    bucket.value += Number(job.value) || 0;
    bucket.jobCount += 1;
    (job.serviceNames || []).forEach(n => { bucket.services[n] = (bucket.services[n] || 0) + 1; });
    (job.assignments || []).forEach(a => {
      bucket.hours += Number(a.hours) || 0;
      bucket.peopleSet.add(String(a.personId));
    });
  });
  return map;
}

function filterJobsInRange(jobs, from, to) {
  const toEnd = new Date(to.getTime() + 86399999);
  return jobs.filter(j => {
    const d = new Date(j.date);
    return d >= from && d <= toEnd;
  });
}

function computeRosterLoad(rosterList, roleKeys) {
  const load = {};
  rosterList.forEach(r => {
    const names = new Set();
    roleKeys.forEach(key => {
      String((r.roles || {})[key] || '').split(',').map(s => s.trim()).filter(Boolean).forEach(n => {
        if (n && n !== 'TBD') names.add(n);
      });
    });
    names.forEach(n => {
      load[n] = load[n] || { accounts: 0, difficultySum: 0 };
      load[n].accounts += 1;
      load[n].difficultySum += Number(r.difficulty) || 0;
    });
  });
  return load;
}

const ROLE_KEYS = ['strategy', 'cs', 'website', 'design', 'copy', 'edit', 'shoot', 'seo', 'smo', 'qc'];

module.exports = {
  periodRange, weeksBetween, utilStatus, computePersonStats, computeClientStats,
  filterJobsInRange, computeRosterLoad, ROLE_KEYS, startOfDay, startOfWeek, startOfMonth,
};
