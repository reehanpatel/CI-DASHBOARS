import { apiGet, apiPost, apiPut, apiDelete, fmtINR, escapeHtml, getToken, getUser, flashToast } from './api.js';

/* ==========================================================================
   CI360 PROPOSAL STUDIO & RATE CARD MODULE
   With Secure Admin PIN / Passcode Authorization & Audit Trail
   ========================================================================== */

const CDN = {
  docx: 'https://cdn.jsdelivr.net/npm/docx@9.0.2/build/index.umd.js',
  pdf: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  mammoth: 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
  pdfjs: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  pdfworker: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
};

function num(v) { const n = Number(v); return isFinite(n) ? n : 0; }
function money(n, cur = 'INR') {
  n = num(n);
  if (cur === 'USD') return '$' + Math.round(n).toLocaleString('en-US');
  return '₹' + Math.round(n).toLocaleString('en-IN');
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + (String(iso).length === 10 ? 'T00:00:00' : ''));
  return isNaN(d) ? String(iso) : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtDateTime(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return isNaN(dt) ? String(d) : dt.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function validUntil(p) {
  const d = new Date((p.date || new Date().toISOString().slice(0, 10)) + 'T00:00:00');
  d.setDate(d.getDate() + num(p.validity || 30));
  return d.toISOString().slice(0, 10);
}
function uid(n = 8) {
  const a = 'abcdefghijkmnpqrstuvwxyz23456789';
  return [...crypto.getRandomValues(new Uint8Array(n))].map(x => a[x % a.length]).join('');
}
function clean(o) { return JSON.parse(JSON.stringify(o ?? null)); }

function loadScript(src, g) {
  if (window[g]) return Promise.resolve(window[g]);
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => window[g] ? res(window[g]) : rej(new Error('Failed to load ' + g));
    s.onerror = () => rej(new Error('Failed to load ' + g));
    document.head.append(s);
  });
}

/* ---------- PRICING ENGINE ---------- */
function slabPct(slabs, n) {
  let p = 0;
  (slabs || []).forEach(s => {
    if (n >= num(s[0]) && num(s[1]) > p) p = num(s[1]);
  });
  return p;
}
function headCalc(h) {
  const m = Math.max(1, num(h.mult) || 1);
  let gross = 0, slab = 0;
  const lines = (h.lines || []).map(l => {
    const g = num(l.qty) * num(l.rate);
    const sp = slabPct(l.slabs, num(l.qty) * m);
    const net = g * (1 - sp / 100);
    gross += g;
    slab += g - net;
    return { ...l, gross: g, slabPct: sp, net };
  });
  const perSet = gross - slab;
  const pack = perSet * num(h.packDisc) / 100;
  const fixed = num(h.fixed) > 0;
  const net = fixed ? num(h.fixed) : (perSet - pack) * m;
  return { lines, m, gross: gross * m, slab: slab * m, pack: fixed ? 0 : pack * m, net, fixed, alacarte: gross * m };
}

const PREPAY = { 'q-adv': 3, 'term-adv': 5, '100': 3 };

function totals(p) {
  const heads = (p.heads || []).map(h => ({ ...h, c: headCalc(h) }));
  const mon = heads.filter(h => h.billing === 'monthly');
  const one = heads.filter(h => h.billing !== 'monthly');
  const sum = a => a.reduce((s, h) => s + h.c.net, 0);
  const g = num(p.gst), dP = num(p.discount), tP = num(p.termDisc);
  const mSub = sum(mon), mTerm = mSub * tP / 100, mDisc = (mSub - mTerm) * dP / 100, mNet = mSub - mTerm - mDisc;
  const oSub = sum(one), oDisc = oSub * dP / 100, oNet = oSub - oDisc;
  const term = Math.max(1, num(p.term) || 1);
  const mPre = mon.length ? num(PREPAY[p.retainerPay]) : 0;
  const oPre = one.length ? num(PREPAY[p.projectPay]) : 0;
  return {
    heads, term,
    mon: { has: mon.length > 0, sub: mSub, term: mTerm, disc: mDisc, net: mNet, tax: mNet * g / 100, total: mNet * (1 + g / 100), pre: mPre },
    one: { has: one.length > 0, sub: oSub, disc: oDisc, net: oNet, tax: oNet * g / 100, total: oNet * (1 + g / 100), pre: oPre },
    contract: mNet * term + oNet
  };
}

const RETAINER_PAY = {
  'm-adv': 'Monthly fee invoiced in advance on the 1st of each month, payable within 7 days.',
  'm-arr': 'Monthly fee invoiced at the end of each month, payable within 15 days.',
  'q-adv': 'Invoiced quarterly in advance, payable within 7 days. A 3% prepayment discount applies to each quarterly invoice.',
  'term-adv': 'The full term is invoiced in advance on signing, with a 5% prepayment discount.'
};

const PROJECT_PAY = {
  '100': { label: '100% advance (3% discount)', ms: [[100, 'On signing']] },
  '5050': { label: '50% advance, 50% on delivery', ms: [[50, 'Advance on signing'], [50, 'On final delivery']] },
  '403030': { label: '40 / 30 / 30 milestones', ms: [[40, 'Advance on signing'], [30, 'On approval of concept / shoot completion'], [30, 'On final delivery']] },
  '304030': { label: '30 / 40 / 30 milestones', ms: [[30, 'Advance on signing'], [40, 'Mid-project milestone'], [30, 'On final delivery']] },
  'custom': { label: 'Custom milestones', ms: null }
};

/* ---------- MARKDOWN LITE & DOCUMENT MODEL ---------- */
function blocks(text) {
  const out = []; let para = [], list = null, ord = null;
  const flush = () => { if (para.length) { out.push({ t: 'p', text: para.join(' ') }); para = []; } };
  const endL = () => { if (list) { out.push({ t: 'ul', items: list }); list = null; } if (ord) { out.push({ t: 'ol', items: ord }); ord = null; } };
  String(text || '').replace(/\r/g, '').split('\n').forEach(raw => {
    const line = raw.trim();
    if (!line) { flush(); endL(); return; }
    let m;
    if ((m = line.match(/^[-*\u2022]\s+(.*)$/))) { flush(); if (ord) endL(); (list = list || []).push(m[1]); return; }
    if ((m = line.match(/^\d+[.)]\s+(.*)$/))) { flush(); if (list) endL(); (ord = ord || []).push(m[1]); return; }
    if ((m = line.match(/^#{1,4}\s+(.*)$/))) { flush(); endL(); out.push({ t: 'h', text: m[1] }); return; }
    endL(); para.push(line);
  });
  flush(); endL();
  return out;
}

function runsOf(text) {
  return String(text).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s => s.startsWith('**') && s.endsWith('**') ? { bold: true, text: s.slice(2, -2) } : { bold: false, text: s });
}

function whatYouGet(h, cur) {
  const per = h.billing === 'monthly' ? ' a month' : '';
  const qty = (h.lines || []).filter(l => num(l.qty) > 0).map(l => `- ${num(l.qty)} \u00D7 ${l.service}${per}${l.desc ? ': ' + l.desc : ''}`);
  const parts = [];
  if (h.desc) parts.push(h.desc);
  if (num(h.mult) > 1) parts.push(`For each of ${num(h.mult)} ${h.multLabel || 'brands'}:`);
  if (qty.length) parts.push(qty.join('\n'));
  if (h.exc) parts.push('**Not included:** ' + h.exc);
  return parts.join('\n\n');
}

export function docModel(p, co, opts = {}) {
  const cur = p.currency || 'INR', T = totals(p), B = [];
  let n = 0; const H = t => B.push({ t: 'h', n: ++n, text: t });
  const gstWord = cur === 'INR' ? 'GST' : 'Tax';
  const contact = [p.contact, p.contactRole].filter(Boolean).join(', ');

  const kv = [];
  if (T.mon.has) kv.push(['Term', `${T.term} month${T.term > 1 ? 's' : ''} from the agreed start date.`]);
  if (T.mon.has) kv.push(['Monthly investment', `${money(T.mon.net, cur)} per month, ${gstWord} extra.${T.mon.term ? ` Includes a ${num(p.termDisc)}% commitment discount for the ${T.term}-month term.` : ''}`]);
  if (T.one.has) kv.push([T.mon.has ? 'One-time investment' : 'Investment', `${money(T.one.net, cur)}, ${gstWord} extra.`]);
  if (T.mon.has && T.one.has) kv.push(['Total contract value', `${money(T.contract, cur)} over ${T.term} months, ${gstWord} extra.`]);
  if (p.oneLine) kv.push(['In one line', p.oneLine]);
  if (kv.length) B.push({ t: 'kv', rows: kv });

  (p.sections || []).forEach(s => { if (s.title || s.body) { H(s.title); B.push({ t: 'md', text: s.body }); } });

  const heads = T.heads;
  if (heads.length) {
    H('What is included');
    B.push({ t: 'table', cols: [{ h: 'Area', w: 26 }, { h: 'What you get', w: 74 }], rows: heads.map(h => ({ cells: [{ b: h.title, s: h.billing === 'monthly' ? 'Monthly' : 'One-time' }, { md: whatYouGet(h, cur) }] })) });
    const monthly = heads.filter(h => h.billing === 'monthly');
    if (monthly.length) {
      const agg = {}, order = [];
      monthly.forEach(h => (h.lines || []).forEach(l => {
        const q = num(l.qty) * Math.max(1, num(h.mult) || 1);
        if (!q) return;
        const k = l.service + '|' + (l.unit || '');
        if (!agg[k]) { agg[k] = { s: l.service, u: l.unit || '', q: 0 }; order.push(k); }
        agg[k].q += q;
      }));
      B.push({ t: 'md', text: '**Monthly retainer: included every month**' });
      B.push({ t: 'table', cols: [{ h: 'Deliverable', w: 70 }, { h: 'Per month', w: 30, align: 'r' }], rows: order.map((k, i) => ({ style: i % 2 ? 'alt' : '', cells: [agg[k].s, `${agg[k].q} ${agg[k].u}`.trim()] })) });
      const incl = (p.retainerIncl || []).filter(Boolean);
      if (incl.length) B.push({ t: 'md', text: '**Also included in the retainer at no extra cost**\n' + incl.map(x => '- ' + x).join('\n') });
    }
  }

  const team = (p.team || []).filter(t => t.name), escl = (p.escalation || []).filter(e => e.name);
  if (team.length || p.cadence || escl.length || p.clientTeam) {
    H('Team and governance');
    if (team.length) B.push({ t: 'table', cols: [{ h: 'Role on this engagement', w: 30 }, { h: 'Name', w: 24 }, { h: 'Responsibility', w: 46 }], rows: team.map((t, i) => ({ style: i % 2 ? 'alt' : '', cells: [{ b: t.role || '' }, t.name, t.resp || ''] })) });
    if (p.clientTeam) B.push({ t: 'md', text: `**From ${p.clientShort || p.client || 'the client'}:** ${p.clientTeam}` });
    if (p.cadence) B.push({ t: 'md', text: p.cadence });
    if (escl.length) {
      B.push({ t: 'md', text: '**Escalation path**' });
      B.push({ t: 'table', cols: [{ h: 'Level', w: 10 }, { h: 'Contact', w: 36 }, { h: 'Raise when', w: 54 }], rows: escl.map((e, i) => ({ style: i % 2 ? 'alt' : '', cells: [String(i + 1), { b: e.name, s: e.role || '' }, e.when || ''] })) });
    }
  }

  if (heads.length) {
    H('Investment');
    const view = p.pricingView || 'heads';
    const sumRows = (k, x, monthly) => {
      const r = [];
      const sfx = monthly ? ' per month' : '';
      if (view !== 'overall' || x.term || x.disc) r.push({ style: 'sum', cells: ['Subtotal', money(x.sub, cur) + sfx] });
      if (x.term) r.push({ style: 'sum', cells: [`Commitment discount (${num(p.termDisc)}%, ${T.term}-month term)`, '\u2212' + money(x.term, cur)] });
      if (x.disc) r.push({ style: 'sum', cells: [`Discount (${num(p.discount)}%)`, '\u2212' + money(x.disc, cur)] });
      r.push({ style: 'sum', cells: [`${k} before ${gstWord}`, money(x.net, cur) + sfx] });
      if (num(p.gst)) r.push({ style: 'sum', cells: [`${gstWord} (${num(p.gst)}%)`, money(x.tax, cur)] });
      r.push({ style: 'grand', cells: [`${k} including ${gstWord}`, money(x.total, cur) + sfx] });
      return r;
    };
    const block = (monthly) => {
      const x = monthly ? T.mon : T.one, hs = heads.filter(h => (h.billing === 'monthly') === monthly);
      if (!hs.length) return;
      const k = monthly ? 'Monthly investment' : (T.mon.has ? 'One-time investment' : 'Investment');
      if (view === 'overall') {
        B.push({ t: 'table', cols: [{ h: k, w: 70 }, { h: 'Amount', w: 30, align: 'r' }], rows: [
          { style: 'hl', cells: [{ b: `Everything in “What is included”${monthly ? ' billed monthly' : ''}: ${hs.map(h => h.title).join(', ')}. ${gstWord} extra.` }, { b: money(x.net, cur) + (monthly ? ' per month' : '') }] },
          ...(x.term || x.disc ? [{ style: 'sub', cells: [`Includes ${[x.term ? `a ${num(p.termDisc)}% commitment discount` : '', x.disc ? `a ${num(p.discount)}% discount` : ''].filter(Boolean).join(' and ')}.`, ''] }] : [])
        ] });
      } else if (view === 'heads') {
        B.push({ t: 'table', cols: [{ h: k, w: 70 }, { h: 'Amount', w: 30, align: 'r' }], rows: [
          ...hs.map((h, i) => ({ style: i % 2 ? 'alt' : '', cells: [{ b: h.title, s: (num(h.mult) > 1 ? `${num(h.mult)} ${h.multLabel || 'brands'}` : '') }, money(h.c.net, cur) + (monthly ? ' per month' : '')] })),
          ...sumRows(k, x, monthly)
        ] });
      } else {
        const rows = [];
        hs.forEach(h => {
          rows.push({ style: 'group', cells: [{ b: h.title + (num(h.mult) > 1 ? ` (\u00D7 ${num(h.mult)} ${h.multLabel || 'brands'})` : '') }, '', '', '', ''] });
          h.c.lines.forEach((l, i) => rows.push({ style: i % 2 ? 'alt' : '', cells: [{ b: l.service, s: l.desc }, String(num(l.qty) * h.c.m), l.unit || '', money(l.rate, cur), money(l.net * h.c.m, cur) + (l.slabPct ? `\n(${l.slabPct}% volume)` : '')] }));
          if (h.c.pack) rows.push({ style: 'sum', cells: ['Package saving' + (num(h.packDisc) ? ` (${num(h.packDisc)}%)` : ''), '', '', '', '\u2212' + money(h.c.pack, cur)] });
          if (h.c.fixed) rows.push({ style: 'sum', cells: ['Package price', '', '', '', money(h.c.net, cur)] });
          rows.push({ style: 'sum', cells: [{ b: h.title + ' total' }, '', '', '', { b: money(h.c.net, cur) }] });
        });
        sumRows(k, x, monthly).forEach(r => rows.push({ style: r.style, cells: [r.cells[0], '', '', '', r.cells[1]] }));
        B.push({ t: 'table', cols: [{ h: k, w: 44 }, { h: 'Qty', w: 9, align: 'r' }, { h: 'Unit', w: 13, align: 'r' }, { h: 'Rate', w: 15, align: 'r' }, { h: 'Amount', w: 19, align: 'r' }], rows });
      }
    };
    block(true); block(false);
    if (T.mon.has && T.one.has && view !== 'overall') B.push({ t: 'note', text: `Total contract value: ${money(T.contract, cur)} (${T.term} months of retainer plus one-time work), ${gstWord} extra.` });
  }

  const req = (p.onRequest || []).filter(r => r.item);
  if (req.length || p.exclusions) {
    H('Not included, available on request');
    if (req.length) B.push({ t: 'table', cols: [{ h: 'Item', w: 30 }, { h: 'How it works', w: 45 }, { h: 'Price', w: 25, align: 'r' }], rows: req.map((r, i) => ({ style: i % 2 ? 'alt' : '', cells: [{ b: r.item }, r.how || '', r.price || ''] })) });
    B.push({ t: 'note', text: 'Add-ons start only with written go-ahead.' + (p.exclusions ? ' Also outside this scope: ' + p.exclusions : '') });
  }

  if (heads.length) {
    H('Payment terms');
    const pay = [];
    if (T.mon.has) {
      pay.push('**Retainer.** ' + (p.retainerPay === 'custom' ? (p.retainerCustom || '') : RETAINER_PAY[p.retainerPay] || RETAINER_PAY['m-adv']));
      if (p.retainerPay === 'q-adv') pay.push(`Quarterly invoice: ${money(T.mon.net * 3 * 0.97, cur)} plus ${gstWord}.`);
      if (p.retainerPay === 'term-adv') pay.push(`Term invoice: ${money(T.mon.net * T.term * 0.95, cur)} plus ${gstWord}.`);
    }
    if (pay.length) B.push({ t: 'md', text: pay.join('\n\n') });
    if (T.one.has) {
      const sch = PROJECT_PAY[p.projectPay] || PROJECT_PAY['5050'];
      const ms = (sch.ms || (p.milestones || []).map(m => [num(m.pct), m.label])).filter(m => m[0]);
      const base = T.one.total * (1 - T.one.pre / 100);
      if (T.one.pre) B.push({ t: 'md', text: `**One-time work.** Paid 100% in advance with a ${T.one.pre}% prepayment discount.` });
      else B.push({ t: 'md', text: '**One-time work.** Invoiced against these milestones:' });
      B.push({ t: 'table', cols: [{ h: 'Milestone', w: 55 }, { h: 'Share', w: 15, align: 'r' }, { h: `Amount incl. ${gstWord}`, w: 30, align: 'r' }], rows: ms.map((m, i) => ({ style: i % 2 ? 'alt' : '', cells: [m[1], m[0] + '%', money(base * m[0] / 100, cur)] })) });
    }
    if (co.paymentNotes) B.push({ t: 'md', text: co.paymentNotes });
  }

  const terms = (p.terms || []).filter(t => t.on);
  if (terms.length) { H('Terms'); B.push({ t: 'md', text: terms.map(t => `- **${t.title}:** ${t.text}`).join('\n') }); }

  const needs = (p.clientNeeds || []).filter(Boolean);
  if (needs.length) { H(`What we need from ${p.clientShort || p.client || 'you'} to start`); B.push({ t: 'md', text: needs.map((x, i) => `${i + 1}. ${x}`).join('\n') }); }

  const ch = (p.choices || []).filter(c => c.label);
  if (ch.length) { H('Choices to confirm on sign-off'); B.push({ t: 'choices', items: ch.map(c => ({ label: c.label, options: (c.options || []).filter(Boolean), answer: opts.answers ? opts.answers[c.id] : '' })) }); }

  H('Sign-off');
  // Official Admin PIN verification stamp
  if (p.approval && p.approval.decision === 'approved') {
    const approverText = `🔐 Internally Approved & Verified with Admin PIN by ${p.approval.approverName || 'Admin'} on ${fmtDateTime(p.approval.at)}`;
    B.push({ t: 'stamp', text: approverText, type: 'admin' });
  }
  if (opts.approval && opts.approval.name) {
    B.push({ t: 'stamp', text: `Approved online by client ${opts.approval.name}${opts.approval.role ? ', ' + opts.approval.role : ''} on ${fmtDate(opts.approval.at)}`, type: 'client' });
  }

  B.push({ t: 'sig', left: { who: 'For ' + (p.client || 'the client'), name: '', role: '' }, right: { who: `For ${co.name}${co.legal ? ' (' + co.legal + ')' : ''}`, name: co.signatory, role: co.signRole } });

  const foot = [co.address, co.gstin && 'GSTIN ' + co.gstin, co.email, co.phone, co.website].filter(Boolean).join(' • ');
  return {
    cover: {
      brand: co.name || 'CI360 Degrees',
      title: p.title || 'Proposal',
      subtitle: p.subtitle,
      kicker: p.kicker || 'Proposal for sign-off',
      meta: [
        ['Prepared for', [p.client, contact].filter(Boolean).join('\n')],
        ['Reference', p.ref],
        ['Date', fmtDate(p.date)],
        ['Valid until', fmtDate(validUntil(p))]
      ]
    },
    blocks: B,
    foot,
    title: p.title || 'Proposal',
    ref: p.ref,
    brand: co.name || 'CI360 Degrees'
  };
}

/* ---------- HTML PAPER RENDERING (Screen & PDF) ---------- */
function inl(s) { return runsOf(s).map(r => r.bold ? `<strong>${escapeHtml(r.text)}</strong>` : escapeHtml(r.text)).join(''); }
function mdHTML(text) { return blocks(text).map(b => b.t === 'p' ? `<p>${inl(b.text)}</p>` : b.t === 'h' ? `<h3>${inl(b.text)}</h3>` : `<${b.t}>${b.items.map(i => `<li>${inl(i)}</li>`).join('')}</${b.t}>`).join(''); }
function cellHTML(c) {
  if (c && typeof c === 'object' && 'md' in c) return mdHTML(c.md);
  if (c && typeof c === 'object') return `<strong>${inl(c.b || '')}</strong>${c.s ? `<div class="desc">${escapeHtml(c.s)}</div>` : ''}`;
  return String(c ?? '').split('\n').map((ln, i) => i ? `<div class="desc">${escapeHtml(ln)}</div>` : escapeHtml(ln)).join('');
}

export function paperHTML(model, print = false) {
  const cv = model.cover;
  const body = model.blocks.map(b => {
    if (b.t === 'h') return `<h2><span class="n">${b.n}.</span>${escapeHtml(b.text)}</h2>`;
    if (b.t === 'md') return mdHTML(b.text);
    if (b.t === 'note') return `<p class="pnote">${escapeHtml(b.text)}</p>`;
    if (b.t === 'stamp') return `<div class="approved-stamp ${b.type === 'admin' ? 'admin-stamp' : ''}">${escapeHtml(b.text)}</div>`;
    if (b.t === 'kv') return `<table class="kv"><tbody>${b.rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${cellHTML(v)}</td></tr>`).join('')}</tbody></table>`;
    if (b.t === 'table') {
      const n = b.cols.length;
      return `<table class="pt"><thead><tr>${b.cols.map(c => `<th class="${c.align === 'r' ? 'r' : ''}" style="width:${c.w}%">${escapeHtml(c.h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => {
        if (['sum', 'grand', 'sub', 'group'].includes(r.style)) return `<tr class="${r.style}"><td colspan="${n - 1}" class="${r.style === 'group' || r.style === 'sub' ? '' : 'r'}">${cellHTML(r.cells[0])}</td><td class="r">${cellHTML(r.cells[r.cells.length - 1])}</td></tr>`;
        return `<tr class="${r.style || ''}">${r.cells.map((c, i) => `<td class="${b.cols[i].align === 'r' ? 'r' : ''}">${cellHTML(c)}</td>`).join('')}</tr>`;
      }).join('')}</tbody></table>`;
    }
    if (b.t === 'choices') return `<div class="choices">${b.items.map(c => `<p><strong>${escapeHtml(c.label)}:</strong> ${c.options.length ? c.options.map(o => `<span class="box">${c.answer === o ? '☑' : '☐'} ${escapeHtml(o)}</span>`).join(' ') : `<span class="blank">${c.answer ? escapeHtml(c.answer) : ''}</span>`}</p>`).join('')}</div>`;
    if (b.t === 'sig') return `<div class="sig">${[b.left, b.right].map(s => `<div><div class="who">${escapeHtml(s.who)}</div>${[['Name', s.name], ['Designation', s.role], ['Signature', ''], ['Date', '']].map(([k, v]) => `<div class="ln"><span>${k}:</span> ${escapeHtml(v || '')}</div>`).join('')}</div>`).join('')}</div>${model.foot ? `<div class="foot">${escapeHtml(model.foot)}</div>` : ''}`;
    return '';
  }).join('');

  return `<article class="paper${print ? ' print' : ''}">
    <section class="cover">
      <div class="cv-brand">${escapeHtml(cv.brand)}</div>
      <div class="cv-kicker">${escapeHtml(cv.kicker)}</div>
      <h1>${escapeHtml(cv.title)}</h1>
      <p class="cv-sub">${escapeHtml(cv.subtitle || '')}</p>
      <div class="cv-rule"></div>
      <dl class="cv-meta">${cv.meta.filter(m => m[1]).map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v).replace(/\n/g, '<br>')}</dd>`).join('')}</dl>
    </section>
    <div class="html2pdf__page-break pb"></div>
    <div class="body">${body}</div>
  </article>`;
}

/* ---------- WORD DOCX BUILDER ---------- */
export async function exportWordDocx(p, co, btn, opts = {}) {
  const oldText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Generating Word (.docx)…';
  try {
    const D = await loadScript(CDN.docx, 'docx');
    const model = docModel(p, co, opts);

    const NAVY = '0F2A4A', GOLD = 'B8893A', INK = '1C2430', MUTED = '5A6577', LINE = 'D5DCE5', MIST = 'F1F4F8', HL = 'EFE3CC';
    const W = 9026;
    const none = { style: D.BorderStyle.NONE, size: 0, color: 'FFFFFF' }, noB = { top: none, bottom: none, left: none, right: none };
    const thin = { style: D.BorderStyle.SINGLE, size: 4, color: LINE }, thinB = { top: thin, bottom: thin, left: thin, right: thin };
    const tr = (t, o = {}) => new D.TextRun({ text: String(t ?? ''), font: o.font || 'Arial', size: o.size || 20, bold: !!o.bold, italics: !!o.italics, color: o.color || INK });
    const P = (c, o = {}) => new D.Paragraph({ children: c, alignment: o.align, keepNext: o.keepNext, numbering: o.numbering, border: o.border, heading: o.heading, spacing: { after: o.after ?? 110, before: o.before ?? 0, line: o.line ?? 290, lineRule: 'auto' } });
    const rich = (t, o = {}) => runsOf(t).map(r => tr(r.text, { ...o, bold: r.bold || o.bold }));

    const OL = { n: 0 };
    const mdParas = (text, o = {}) => {
      const out = [];
      blocks(text).forEach(b => {
        if (b.t === 'p') out.push(P(rich(b.text, o), { after: o.after ?? 110 }));
        else if (b.t === 'h') out.push(P([tr(b.text, { font: 'Georgia', bold: true, size: (o.size || 20) + 2, color: NAVY })], { before: 100, after: 60, keepNext: true }));
        else { const ref = b.t === 'ol' ? 'num' + Math.min(40, ++OL.n) : 'bul'; b.items.forEach(it => out.push(P(rich(it, o), { numbering: { reference: ref, level: 0 }, after: 50 }))); }
      });
      return out.length ? out : [P([])];
    };

    const cellKids = (c, o = {}) => {
      const sz = o.size || 18, col = o.color || INK, al = o.align;
      if (c && typeof c === 'object' && 'md' in c) return mdParas(c.md, { size: sz, after: 70 });
      if (c && typeof c === 'object') {
        const k = [P(rich(c.b || '', { bold: true, size: sz, color: col }), { after: c.s ? 30 : 0, align: al, line: 260 })];
        if (c.s) k.push(P([tr(c.s, { size: sz - 2, color: o.sub || MUTED })], { after: 0, align: al, line: 250 }));
        return k;
      }
      return String(c ?? '').split('\n').map((ln, i) => P([tr(ln, { size: i ? sz - 2 : sz, color: i ? (o.sub || MUTED) : col, bold: o.bold })], { after: 0, align: al, line: 260 }));
    };

    const cell = (kids, w, o = {}) => new D.TableCell({
      children: kids,
      width: { size: w, type: D.WidthType.DXA },
      borders: o.borders || thinB,
      columnSpan: o.span && o.span > 1 ? o.span : undefined,
      shading: o.fill ? { type: D.ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
      margins: { top: 90, bottom: 90, left: 120, right: 120 },
      verticalAlign: o.v || D.VerticalAlign.TOP
    });

    const h1 = (n, t) => P([tr(n + '.  ', { font: 'Georgia', size: 28, bold: true, color: GOLD }), tr(t, { font: 'Georgia', size: 28, bold: true, color: NAVY })], {
      heading: D.HeadingLevel.HEADING_1,
      keepNext: true,
      before: 340,
      after: 140,
      border: { bottom: { style: D.BorderStyle.SINGLE, size: 8, color: GOLD, space: 6 } }
    });

    const kids = [];
    const cv = model.cover;
    const meta = cv.meta.filter(m => m[1]).map(([k, v]) => P([tr(k + ':   ', { color: 'C9A35E', size: 19, bold: true }), ...String(v).split('\n').flatMap((ln, i) => i ? [new D.TextRun({ break: 1, text: ln, font: 'Arial', size: 21, color: 'FFFFFF' })] : [tr(ln, { color: 'FFFFFF', size: 21 })])], { after: 70 }));

    kids.push(new D.Table({
      width: { size: W, type: D.WidthType.DXA },
      columnWidths: [W],
      rows: [new D.TableRow({
        height: { value: 11000, rule: D.HeightRule.ATLEAST },
        children: [new D.TableCell({
          width: { size: W, type: D.WidthType.DXA },
          borders: noB,
          shading: { type: D.ShadingType.CLEAR, color: 'auto', fill: NAVY },
          margins: { top: 900, bottom: 900, left: 700, right: 700 },
          children: [
            P([tr(cv.brand, { font: 'Georgia', size: 24, bold: true, color: 'D4A657' })], { after: 2000 }),
            P([tr(cv.kicker, { size: 19, color: 'AEBBCD', bold: true })], { after: 120 }),
            P([tr(cv.title, { font: 'Georgia', size: 52, bold: true, color: 'FFFFFF' })], { after: 200, line: 260 }),
            P(cv.subtitle ? [tr(cv.subtitle, { font: 'Georgia', size: 24, italics: true, color: 'D9E1EC' })] : [], { after: 1400 }),
            new D.Paragraph({ border: { top: { style: D.BorderStyle.SINGLE, size: 12, color: GOLD, space: 12 } }, spacing: { after: 180 }, children: [] }),
            ...meta
          ]
        })]
      })]
    }));
    kids.push(new D.Paragraph({ children: [new D.PageBreak()] }));

    model.blocks.forEach(b => {
      if (b.t === 'h') kids.push(h1(b.n, b.text));
      else if (b.t === 'md') kids.push(...mdParas(b.text));
      else if (b.t === 'note') kids.push(P([tr(b.text, { italics: true, size: 18, color: MUTED })], { before: 80 }));
      else if (b.t === 'stamp') {
        kids.push(new D.Table({
          width: { size: W, type: D.WidthType.DXA },
          columnWidths: [W],
          rows: [new D.TableRow({
            cantSplit: true,
            children: [new D.TableCell({
              width: { size: W, type: D.WidthType.DXA },
              borders: {
                top: thin,
                bottom: thin,
                left: { style: D.BorderStyle.SINGLE, size: 18, color: b.type === 'admin' ? NAVY : '2F6B45' },
                right: thin
              },
              shading: { type: D.ShadingType.CLEAR, color: 'auto', fill: b.type === 'admin' ? 'F1F4F8' : 'ECFDF5' },
              margins: { top: 120, bottom: 120, left: 160, right: 160 },
              children: [
                P([tr(b.text, { bold: true, size: 19, color: b.type === 'admin' ? NAVY : '2F6B45' })], { after: 0 })
              ]
            })]
          })]
        }));
        kids.push(P([], { after: 120 }));
      }
      else if (b.t === 'kv') {
        const w = [2500, W - 2500];
        kids.push(new D.Table({ width: { size: W, type: D.WidthType.DXA }, columnWidths: w, rows: b.rows.map(([k, v], i) => new D.TableRow({ cantSplit: true, children: [cell(cellKids({ b: k }, { size: 19 }), w[0], { fill: MIST }), cell(cellKids(v, { size: 19 }), w[1], { fill: i % 2 ? MIST : undefined })] })) }));
      } else if (b.t === 'table') {
        const ws = b.cols.map(c => Math.round(W * c.w / 100)); ws[ws.length - 1] += W - ws.reduce((a, x) => a + x, 0);
        const rows = [new D.TableRow({ tableHeader: true, children: b.cols.map((c, i) => cell(cellKids(c.h, { size: 17, color: 'FFFFFF', bold: true, align: c.align === 'r' ? D.AlignmentType.RIGHT : undefined }), ws[i], { fill: NAVY, v: D.VerticalAlign.CENTER })) })];
        b.rows.forEach(r => {
          const fill = r.style === 'alt' ? MIST : r.style === 'grand' ? NAVY : r.style === 'hl' ? HL : r.style === 'group' ? 'E4E9F0' : undefined;
          const col = r.style === 'grand' ? 'FFFFFF' : INK, sub = r.style === 'grand' ? 'D9E1EC' : MUTED;
          if (r.style === 'sum' || r.style === 'grand' || r.style === 'sub' || r.style === 'group') {
            const last = r.cells[r.cells.length - 1];
            const spanW = ws.slice(0, -1).reduce((a, x) => a + x, 0);
            rows.push(new D.TableRow({ cantSplit: true, children: [
              cell(cellKids(r.cells[0], { size: r.style === 'grand' ? 20 : 18, color: col, sub, bold: r.style === 'grand', align: r.style === 'group' || r.style === 'sub' ? undefined : D.AlignmentType.RIGHT }), spanW, { span: ws.length - 1, fill }),
              cell(cellKids(last, { size: r.style === 'grand' ? 20 : 18, color: col, sub, bold: r.style !== 'sub', align: D.AlignmentType.RIGHT }), ws[ws.length - 1], { fill })
            ] }));
          } else {
            rows.push(new D.TableRow({
              cantSplit: true,
              children: r.cells.map((c, i) => cell(
                cellKids(c, { size: 18, color: col, sub, align: (b.cols[i] && b.cols[i].align === 'r') ? D.AlignmentType.RIGHT : undefined }),
                ws[i] || Math.round(W / Math.max(1, r.cells.length)),
                { fill }
              ))
            }));
          }
        });
        kids.push(new D.Table({ width: { size: W, type: D.WidthType.DXA }, columnWidths: ws, rows }));
        kids.push(P([], { after: 60 }));
      } else if (b.t === 'choices') {
        b.items.forEach(c => {
          const ans = c.answer;
          const runs = [tr(c.label + ':   ', { bold: true })];
          if (c.options.length) c.options.forEach(o => runs.push(tr((ans === o ? '☑ ' : '☐ ') + o + '    ')));
          else runs.push(tr(ans ? ans : '______________________________'));
          kids.push(P(runs, { after: 140 }));
        });
      } else if (b.t === 'sig') {
        const half = W / 2;
        const blk = s => [P([tr(s.who, { font: 'Georgia', bold: true, color: NAVY, size: 21 })], { after: 200 }),
          ...[['Name', s.name], ['Designation', s.role], ['Signature', ''], ['Date', '']].map(([k, v]) => P([tr(k + ':  ', { size: 19, color: MUTED }), tr(v || '', { size: 20 })], { after: 200, border: { bottom: { style: D.BorderStyle.SINGLE, size: 4, color: LINE, space: 2 } } }))];
        kids.push(new D.Table({ width: { size: W, type: D.WidthType.DXA }, columnWidths: [half, half], rows: [new D.TableRow({ cantSplit: true, children: [cell(blk(b.left), half, { borders: noB }), cell(blk(b.right), half, { borders: noB })] })] }));
        if (model.foot) kids.push(P([tr(model.foot, { size: 16, color: MUTED })], { before: 360 }));
      }
    });

    const numCfg = [{ reference: 'bul', levels: [{ level: 0, format: D.LevelFormat.BULLET, text: '\u2022', alignment: D.AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 280 } }, run: { color: GOLD } } }] }];
    for (let i = 1; i <= 40; i++) numCfg.push({ reference: 'num' + i, levels: [{ level: 0, format: D.LevelFormat.DECIMAL, text: '%1.', alignment: D.AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 320 } }, run: { color: NAVY, bold: true } } }] });

    const doc = new D.Document({
      creator: model.brand, title: model.title,
      styles: { default: { document: { run: { font: 'Arial', size: 20, color: INK } } }, paragraphStyles: [{ id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Georgia', size: 28, bold: true, color: NAVY }, paragraph: { outlineLevel: 0 } }] },
      numbering: { config: numCfg },
      sections: [{
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1200, left: 1440, right: 1440 } }, titlePage: true },
        headers: { first: new D.Header({ children: [P([])] }), default: new D.Header({ children: [P([tr(model.brand, { font: 'Georgia', size: 16, bold: true, color: GOLD }), tr('   ' + model.title, { size: 16, color: MUTED })], { after: 0 })] }) },
        footers: { first: new D.Footer({ children: [P([])] }), default: new D.Footer({ children: [new D.Paragraph({ alignment: D.AlignmentType.RIGHT, children: [tr((model.ref || '') + '   Page ', { size: 15, color: MUTED }), new D.TextRun({ children: [D.PageNumber.CURRENT], size: 15, color: MUTED, font: 'Arial' })] })] }) },
        children: kids
      }]
    });

    const blob = await D.Packer.toBlob(doc);
    const filename = `${p.clientShort || p.client || 'Client'} - ${p.title || 'Proposal'}.docx`.replace(/[\\/:*?"<>|]+/g, '_');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.append(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 600);
  } catch (err) {
    alert('Word document export error: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = oldText;
  }
}

/* ---------- PDF EXPORTER ---------- */
export async function exportPdfDoc(p, co, btn, opts = {}) {
  const oldText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Generating PDF…';

  // Create an active, fully visible staging overlay in front of everything
  const overlay = document.createElement('div');
  overlay.id = 'ci360-pdf-export-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.92);backdrop-filter:blur(6px);z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;overflow-y:auto;padding:24px 12px;';
  
  overlay.innerHTML = `
    <div style="background:#0F2A4A;border:1px solid #B8893A;border-radius:8px;padding:14px 28px;color:#fff;margin-bottom:16px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.5);max-width:600px;">
      <div style="font-size:24px;margin-bottom:4px;">📄</div>
      <div style="font-size:15px;font-weight:700;color:#D4A657;">Rendering High-Resolution Proposal PDF…</div>
      <div style="font-size:12px;color:#AEBBCD;margin-top:2px;">Formatting cover page, pricing tables, terms, and signatures into PDF document.</div>
    </div>
    <div id="ci360-pdf-stage-inner" style="width:794px;background:#ffffff;box-shadow:0 12px 40px rgba(0,0,0,0.6);border-radius:4px;overflow:hidden;">
    </div>
  `;
  document.body.appendChild(overlay);

  try {
    const h2p = await loadScript(CDN.pdf, 'html2pdf');
    const model = docModel(p, co, opts);
    const htmlString = paperHTML(model, true);

    const stageInner = overlay.querySelector('#ci360-pdf-stage-inner');
    stageInner.setAttribute('data-theme', 'light');
    stageInner.innerHTML = `
      <style>
        * { box-sizing: border-box; }
        .paper, .paper.print { background: #FFFFFF !important; color: #1C2430 !important; font-family: Arial, Helvetica, sans-serif !important; width: 794px !important; margin: 0 !important; box-shadow: none !important; }
        .paper .cover { background: #0F2A4A !important; color: #FFFFFF !important; box-sizing: border-box !important; width: 794px !important; height: 1122px !important; min-height: 1122px !important; max-height: 1122px !important; padding: 56px 44px !important; page-break-after: always !important; break-after: page !important; position: relative !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; }
        .paper .cv-brand { color: #D4A657 !important; font-family: Georgia, serif !important; font-weight: 700 !important; font-size: 20px !important; }
        .paper .cv-kicker { color: #AEBBCD !important; font-size: 13px !important; margin-top: 4px !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }
        .paper .cover h1 { color: #FFFFFF !important; font-family: Georgia, serif !important; font-size: 34px !important; margin: 16px 0 12px !important; line-height: 1.25 !important; }
        .paper .cv-sub { color: #D9E1EC !important; font-family: Georgia, serif !important; font-style: italic !important; font-size: 16px !important; margin: 0 0 20px !important; }
        .paper .cv-rule { background: #B8893A !important; height: 2px !important; margin-bottom: 24px !important; }
        .paper .cv-meta dt { color: #C9A35E !important; font-weight: 700 !important; font-size: 13.5px !important; }
        .paper .cv-meta dd { color: #FFFFFF !important; font-size: 13.5px !important; }
        .paper .html2pdf__page-break, .paper .pb { break-before: page !important; page-break-before: always !important; height: 1px !important; line-height: 1px !important; display: block !important; margin: 0 !important; padding: 0 !important; }
        .paper .body { background: #FFFFFF !important; color: #1C2430 !important; padding: 40px 48px 48px !important; }
        .paper h2 { color: #0F2A4A !important; font-family: Georgia, serif !important; font-size: 19px !important; border-bottom: 1.5px solid #B8893A !important; margin: 26px 0 12px !important; padding-bottom: 4px !important; }
        .paper h2 .n { color: #B8893A !important; margin-right: 6px !important; }
        .paper h3 { color: #0F2A4A !important; font-family: Georgia, serif !important; font-size: 14.5px !important; margin: 14px 0 6px !important; font-weight: 700 !important; }
        .paper p { color: #1E293B !important; font-size: 13px !important; line-height: 1.6 !important; margin: 0 0 9px !important; }
        .paper ul, .paper ol { color: #1E293B !important; margin: 0 0 10px !important; padding-left: 20px !important; }
        .paper li { color: #1E293B !important; font-size: 13px !important; line-height: 1.5 !important; margin-bottom: 4px !important; }
        .paper li::marker { color: #B8893A !important; }
        .paper strong, .paper b { color: #0F172A !important; font-weight: 700 !important; }
        .paper table { width: 100% !important; border-collapse: collapse !important; font-size: 12px !important; margin: 8px 0 14px !important; background: #FFFFFF !important; color: #1C2430 !important; }
        .paper thead, .paper tbody { background: #FFFFFF !important; }
        .paper tbody tr { background: #FFFFFF !important; }
        .paper th, .paper td { border: 1px solid #D5DCE5 !important; padding: 7px 10px !important; color: #1C2430 !important; background: #FFFFFF !important; vertical-align: top !important; text-align: left !important; }
        .paper .r { text-align: right !important; white-space: nowrap !important; }
        .paper table.pt thead th { background: #0F2A4A !important; color: #FFFFFF !important; border: 1px solid #0F2A4A !important; font-weight: 700 !important; }
        .paper table.pt thead th * { color: #FFFFFF !important; }
        .paper table.kv th { background: #F1F4F8 !important; color: #0F2A4A !important; font-weight: 700 !important; border: 1px solid #D5DCE5 !important; width: 26% !important; }
        .paper table.kv td { background: #FFFFFF !important; color: #1C2430 !important; border: 1px solid #D5DCE5 !important; }
        .paper tr.alt td { background: #F8FAFC !important; color: #1C2430 !important; }
        .paper tr.sum td { background: #F8FAFC !important; color: #0F2A4A !important; font-weight: 700 !important; border-top: 1.5px solid #0F2A4A !important; }
        .paper tr.sum td * { color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.hl td { background: #FDF6E2 !important; color: #0F2A4A !important; font-size: 13px !important; }
        .paper tr.hl td * { color: #0F2A4A !important; }
        .paper tr.group td { background: #E2E8F0 !important; color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.group td * { color: #0F2A4A !important; font-weight: 700 !important; }
        .paper tr.sub td { background: #FFFFFF !important; color: #64748B !important; font-style: italic !important; border-top: 0 !important; }
        .paper tr.sub td * { color: #64748B !important; }
        .paper tr.grand td { background: #0F2A4A !important; color: #FFFFFF !important; font-weight: 700 !important; font-size: 13px !important; border: 1px solid #0F2A4A !important; }
        .paper tr.grand td * { color: #FFFFFF !important; }
        .paper td p, .paper td ul, .paper td ol, .paper td li, .paper td div, .paper td span { background: transparent !important; }
        .paper td p { color: #1E293B !important; margin: 0 0 3px !important; }
        .paper td ul, .paper td ol { color: #1E293B !important; margin: 0 0 4px !important; padding-left: 16px !important; }
        .paper td li { color: #1E293B !important; margin-bottom: 2px !important; }
        .paper td li::marker { color: #B8893A !important; }
        .paper tr.grand .desc { color: #D9E1EC !important; }
        .paper .desc { color: #475569 !important; font-size: 11px !important; margin-top: 2px !important; }
        .paper .pnote { color: #475569 !important; font-style: italic !important; font-size: 12px !important; }
        .paper .approved-stamp { border: 1.5px solid #2F6B45 !important; background: #ECFDF5 !important; color: #2F6B45 !important; font-weight: 700 !important; padding: 8px 14px !important; border-radius: 6px !important; display: inline-flex !important; margin: 10px 0 !important; font-size: 13px !important; }
        .paper .approved-stamp.admin-stamp { border-color: #0F2A4A !important; background: #F1F4F8 !important; color: #0F2A4A !important; }
        .paper .sig { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 32px !important; margin-top: 22px !important; }
        .paper .sig .who { color: #0F2A4A !important; font-family: Georgia, serif !important; font-weight: 700 !important; margin-bottom: 12px !important; font-size: 14px !important; }
        .paper .sig .ln { border-bottom: 1px solid #CBD5E1 !important; color: #1E293B !important; padding: 8px 0 4px !important; font-size: 12px !important; }
        .paper .sig .ln span { color: #64748B !important; }
        .paper .foot { color: #64748B !important; font-size: 11px !important; margin-top: 24px !important; padding-top: 10px !important; border-top: 1px solid #D5DCE5 !important; text-align: center !important; }
      </style>
      ${htmlString}
    `;

    // Wait for DOM layout and web fonts to settle
    await new Promise(r => setTimeout(r, 350));

    const paperEl = stageInner.querySelector('.paper');
    const opt = {
      margin: 0,
      filename: `${p.clientShort || p.client || 'Client'} - ${p.title || 'Proposal'}.pdf`.replace(/[\\/:*?"<>|]+/g, '_'),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        backgroundColor: '#ffffff', 
        useCORS: true,
        logging: false,
        windowWidth: 794
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: {
        mode: ['css', 'legacy'],
        before: ['.html2pdf__page-break', '.pb'],
        avoid: ['tr', '.sig', '.approved-stamp', '.kv']
      }
    };

    await h2p().set(opt).from(paperEl || stageInner).save();
    flashToast('PDF downloaded successfully! 📄');
  } catch (err) {
    alert('PDF export error: ' + err.message);
  } finally {
    overlay.remove();
    btn.disabled = false;
    btn.textContent = oldText;
  }
}

/* ---------- BROWSER PRINT / VECTOR PDF EXPORTER ---------- */
export function printProposalDocument(p, co, opts = {}) {
  const model = docModel(p, co, opts);
  const html = paperHTML(model, true);
  const printWin = window.open('', '_blank', 'width=950,height=1050');
  if (!printWin) {
    alert('Please allow popups to open the print dialog.');
    return;
  }
  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(p.client || 'Client')} - ${escapeHtml(p.title || 'Proposal')}</title>
      <link rel="stylesheet" href="/src/css/style.css">
      <style>
        @page { size: A4 portrait; margin: 0; }
        body { margin: 0; padding: 0; background: #FFFFFF; font-family: Arial, Helvetica, sans-serif; }
        .paper { width: 100% !important; max-width: none !important; margin: 0 !important; box-shadow: none !important; }
        .paper .cover { height: 100vh !important; min-height: 100vh !important; page-break-after: always !important; break-after: page !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .paper .html2pdf__page-break, .paper .pb { page-break-before: always !important; break-before: page !important; height: 1px !important; }
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      </style>
    </head>
    <body>
      ${html}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.focus();
            window.print();
          }, 350);
        };
      <\/script>
    </body>
    </html>
  `);
  printWin.document.close();
}

/* ==========================================================================
   STATE & CONTROLLER FOR THE PROPOSAL STUDIO DASHBOARD
   ========================================================================== */
export class ProposalStudioController {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.currentUser = options.currentUser || getUser() || {};
    this.userRole = options.userRole || this.currentUser.role || 'employee';
    this.isAdmin = this.userRole === 'admin' || this.userRole === 'superadmin' || this.currentUser.role === 'admin' || this.currentUser.role === 'superadmin';
    this.proposals = [];
    this.rateDoc = null;
    this.pinStatus = { isConfigured: false, defaultPinHint: null };
    this.personnel = [];
    this.currentView = 'list'; // 'list' | 'editor' | 'ratecard' | 'settings' | 'audit'
    this.activeStep = 'brief'; // 'brief' | 'scope' | 'content' | 'team' | 'terms' | 'approve'
    this.activeProposal = null;
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.briefTab = 'paste';
    this.saving = false;
    this.saveTimeout = null;
  }

  async init() {
    this.container.innerHTML = `<div class="card" style="padding:40px;text-align:center"><div class="loading">Loading Proposal Studio…</div></div>`;
    try {
      const [proposals, rateDoc, pinStatus, personnel] = await Promise.all([
        apiGet('/proposals'),
        apiGet('/proposals/ratecard'),
        apiGet('/proposals/pin/status'),
        apiGet('/personnel').catch(() => [])
      ]);
      this.proposals = proposals || [];
      this.rateDoc = rateDoc;
      this.pinStatus = pinStatus || { isConfigured: false, defaultPinHint: null };
      this.personnel = personnel || [];
      this.render();
    } catch (err) {
      this.container.innerHTML = `
        <div class="empty">
          <h3>Failed to load Proposal Studio</h3>
          <p class="muted">${escapeHtml(err.message)}</p>
          <button class="btn primary" id="retry-ps-btn">Retry</button>
        </div>`;
      const btn = this.container.querySelector('#retry-ps-btn');
      if (btn) btn.onclick = () => this.init();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="ps-wrapper">
        <!-- Top Sub-Navigation Header -->
        <div class="ps-header">
          <div class="ps-title-block">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2 style="margin:0;font-size:22px;font-weight:800;color:var(--text-1);">Proposal Studio</h2>
              <span class="ps-badge-gold">CI360 Studio</span>
              <span class="badge green" title="Admin Approval PIN is secured and active">🔐 PIN Protected</span>
            </div>
            <p class="muted small" style="margin:4px 0 0;">Branded proposal generation, comprehensive rate card pricing, and secure Admin PIN authorization audit trail.</p>
          </div>

          <div class="ps-subnav">
            <button class="ps-nav-btn ${this.currentView === 'list' ? 'active' : ''}" data-ps-view="list">📁 Proposals (${this.proposals.length})</button>
            <button class="ps-nav-btn ${this.currentView === 'ratecard' ? 'active' : ''}" data-ps-view="ratecard">🏷️ Rate Card & Packages</button>
            ${this.isAdmin ? `
              <button class="ps-nav-btn ${this.currentView === 'audit' ? 'active' : ''}" data-ps-view="audit">🛡️ Admin PIN Audit Trail</button>
              <button class="ps-nav-btn ${this.currentView === 'settings' ? 'active' : ''}" data-ps-view="settings">⚙️ Settings & PIN</button>
            ` : ''}
            <button class="btn gold" id="ps-btn-new-proposal">✨ New Proposal</button>
          </div>
        </div>

        <!-- Main View Area -->
        <div id="ps-view-content" class="ps-content-body"></div>
      </div>
    `;

    // Bind subnav buttons
    this.container.querySelectorAll('[data-ps-view]').forEach(btn => {
      btn.onclick = () => {
        this.currentView = btn.dataset.psView;
        this.render();
      };
    });

    const newBtn = this.container.querySelector('#ps-btn-new-proposal');
    if (newBtn) newBtn.onclick = () => this.createNewProposal();

    const viewArea = this.container.querySelector('#ps-view-content');
    if (this.currentView === 'list') {
      this.renderProposalList(viewArea);
    } else if (this.currentView === 'editor') {
      this.renderProposalEditor(viewArea);
    } else if (this.currentView === 'ratecard') {
      this.renderRateCardView(viewArea);
    } else if (this.currentView === 'audit') {
      this.renderAuditTrailView(viewArea);
    } else if (this.currentView === 'settings') {
      this.renderSettingsView(viewArea);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     VIEW 1: PROPOSAL LIST
     ───────────────────────────────────────────────────────────── */
  renderProposalList(el) {
    let list = [...this.proposals];

    // For employees, only show proposals if employee is in escalation plan or role of engagement (or created it)
    if (!this.isAdmin) {
      const empName = (this.currentUser?.name || '').toLowerCase().trim();
      const empId = String(this.currentUser?._id || this.currentUser?.id || '');
      list = list.filter(p => {
        const inTeam = Array.isArray(p.team) && p.team.some(t =>
          (t.name && empName && t.name.toLowerCase().includes(empName)) ||
          (t.memberId && empId && (t.memberId === empId || t.memberId === 'emp_' + empId))
        );
        const inEscalation = Array.isArray(p.escalation) && p.escalation.some(e =>
          e.name && empName && e.name.toLowerCase().includes(empName)
        );
        const isCreator = (p.createdBy && (
          (typeof p.createdBy === 'object' && String(p.createdBy._id || p.createdBy.id) === empId) ||
          String(p.createdBy) === empId ||
          (p.createdBy.email && this.currentUser?.email && p.createdBy.email.toLowerCase() === this.currentUser.email.toLowerCase())
        ));
        return inTeam || inEscalation || isCreator;
      });
    }

    const baseEmployeeList = list;

    if (this.statusFilter !== 'all') {
      list = list.filter(p => p.status === this.statusFilter);
    }

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.trim().toLowerCase();
      list = list.filter(p =>
        (p.client || '').toLowerCase().includes(q) ||
        (p.title || '').toLowerCase().includes(q) ||
        (p.ref || '').toLowerCase().includes(q)
      );
    }

    // Counts by status
    const pendingCount = baseEmployeeList.filter(p => p.status === 'pending').length;
    const approvedCount = baseEmployeeList.filter(p => p.status === 'approved' || p.status === 'with_client' || p.status === 'won').length;
    const totalContractValue = baseEmployeeList.reduce((sum, p) => sum + totals(p).contract, 0);

    el.innerHTML = `
      <!-- Stats Overview Banner -->
      <div class="grid grid-4" style="margin-bottom:20px;">
        <div class="card kpi">
          <div class="label">${this.isAdmin ? 'Total Proposals' : 'My Assigned Proposals'}</div>
          <div class="value">${baseEmployeeList.length}</div>
          <div class="sub">${this.isAdmin ? 'Active scope documents' : 'Role of engagement or escalation'}</div>
        </div>
        <div class="card kpi">
          <div class="label">Awaiting Admin PIN</div>
          <div class="value" style="color:${pendingCount > 0 ? 'var(--amber-500)' : 'var(--text-1)'}">${pendingCount}</div>
          <div class="sub">Needs internal authorization</div>
        </div>
        <div class="card kpi">
          <div class="label">PIN Approved / Live</div>
          <div class="value" style="color:var(--green-500)">${approvedCount}</div>
          <div class="sub">Verified & signed off</div>
        </div>
        <div class="card kpi">
          <div class="label">Pipeline Value</div>
          <div class="value" style="color:var(--brand-600)">${fmtINR(totalContractValue)}</div>
          <div class="sub">Aggregate contract volume</div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="card" style="padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex:1;max-width:440px;">
          <input type="text" class="input" id="ps-search" placeholder="Search by client, title or reference..." value="${escapeHtml(this.searchTerm)}">
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <span class="muted small">Status:</span>
          <select class="input" id="ps-status-filter" style="width:190px;">
            <option value="all" ${this.statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
            <option value="draft" ${this.statusFilter === 'draft' ? 'selected' : ''}>Draft</option>
            <option value="pending" ${this.statusFilter === 'pending' ? 'selected' : ''}>⏳ Awaiting Approval</option>
            <option value="approved" ${this.statusFilter === 'approved' ? 'selected' : ''}>🔐 Approved with PIN</option>
            <option value="with_client" ${this.statusFilter === 'with_client' ? 'selected' : ''}>📤 With Client</option>
            <option value="won" ${this.statusFilter === 'won' ? 'selected' : ''}>🎉 Client Approved</option>
            <option value="changes" ${this.statusFilter === 'changes' ? 'selected' : ''}>⚠️ Changes Requested</option>
            <option value="returned" ${this.statusFilter === 'returned' ? 'selected' : ''}>↩️ Returned</option>
          </select>
        </div>
      </div>

      <!-- Proposals Table -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div class="scroll">
          <table class="table" style="width:100%;margin:0;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="padding:12px 16px;">Reference & Proposal</th>
                <th style="padding:12px 16px;">Client Organisation</th>
                <th style="padding:12px 16px;">Date & Term</th>
                <th style="padding:12px 16px;text-align:right;">Contract Value</th>
                <th style="padding:12px 16px;text-align:center;">Internal Approval Status</th>
                <th style="padding:12px 16px;text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${list.length === 0 ? `
                <tr>
                  <td colspan="6" style="padding:48px;text-align:center;">
                    <div class="empty">
                      <div style="font-size:36px;margin-bottom:10px;">📜</div>
                      <h3 style="margin:0 0 6px 0;">No proposals found</h3>
                      <p class="muted small">Create your first client proposal or clear your search filters.</p>
                      <button class="btn gold" id="ps-empty-new-btn" style="margin-top:12px;">Create Proposal</button>
                    </div>
                  </td>
                </tr>
              ` : list.map(p => {
                const T = totals(p);
                const statusBadge = this.renderStatusBadge(p);
                const isPinApproved = p.approval && p.approval.decision === 'approved' && p.approval.pinVerified;

                return `
                  <tr style="cursor:pointer;" class="ps-row-hover" data-open-proposal="${escapeHtml(p._id)}">
                    <td style="padding:14px 16px;">
                      <div style="font-weight:700;color:var(--text-1);font-size:14.5px;">${escapeHtml(p.title || 'Untitled Proposal')}</div>
                      <div class="muted small" style="font-family:var(--font-mono);">${escapeHtml(p.ref)}${p.createdBy && p.createdBy.name ? ` · <span style="color:var(--text-3);">By ${escapeHtml(p.createdBy.name)}</span>` : ''}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div style="font-weight:600;color:var(--text-1);">${escapeHtml(p.client)}</div>
                      <div class="muted small">${escapeHtml(p.contact ? p.contact + (p.contactRole ? ` (${p.contactRole})` : '') : '—')}</div>
                    </td>
                    <td style="padding:14px 16px;">
                      <div>${fmtDate(p.date)}</div>
                      <div class="muted small">${p.term ? `${p.term} months retainer` : 'One-time project'}</div>
                    </td>
                    <td style="padding:14px 16px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700;color:var(--text-1);">
                      ${money(T.contract, p.currency)}
                      ${T.mon.has ? `<div class="muted small" style="font-weight:400;">${money(T.mon.net, p.currency)}/mo</div>` : ''}
                    </td>
                    <td style="padding:14px 16px;text-align:center;">
                      ${statusBadge}
                      ${isPinApproved ? `<div class="small" style="color:var(--green-600);font-size:11px;margin-top:2px;">🔐 PIN Verified</div>` : ''}
                    </td>
                    <td style="padding:14px 16px;text-align:right;" onclick="event.stopPropagation();">
                      <div style="display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
                        <button class="btn small" data-edit-p="${escapeHtml(p._id)}" title="Edit proposal">✏️ Edit</button>
                        <button class="btn small" data-list-pdf="${escapeHtml(p._id)}" title="Download PDF document directly">📄 PDF</button>
                        <button class="btn small" data-list-word="${escapeHtml(p._id)}" title="Download Word (.docx) document directly">📝 Word</button>
                        ${p.shareId ? `
                          <button class="btn small ghost" data-list-share="${escapeHtml(p.shareId)}" title="Copy direct client review link">🔗 Link</button>
                        ` : ''}
                        ${this.isAdmin ? `
                          ${p.status === 'pending' || !isPinApproved ? `
                            <button class="btn small gold" data-quick-pin="${escapeHtml(p._id)}" title="Approve with Admin PIN">🔐 Approve</button>
                          ` : ''}
                        ` : `
                          ${p.status === 'draft' ? `
                            <button class="btn small gold" data-quick-submit="${escapeHtml(p._id)}" title="Submit for Admin Approval">📤 Submit</button>
                          ` : ''}
                        `}
                        ${(p.status === 'approved' || isPinApproved) && p.status !== 'won' ? `
                          <button class="btn small primary" data-send-client="${escapeHtml(p._id)}" title="Send authorized proposal to client">
                            📤 ${p.status === 'with_client' ? 'Re-send' : 'Send to Client'}
                          </button>
                        ` : ''}
                        <button class="btn small ghost text-red" data-delete-p="${escapeHtml(p._id)}" title="Delete proposal">🗑️</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind search and filter
    const searchInput = el.querySelector('#ps-search');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchTerm = e.target.value;
        this.renderProposalList(el);
      };
    }

    const filterSelect = el.querySelector('#ps-status-filter');
    if (filterSelect) {
      filterSelect.onchange = (e) => {
        this.statusFilter = e.target.value;
        this.renderProposalList(el);
      };
    }

    const emptyNewBtn = el.querySelector('#ps-empty-new-btn');
    if (emptyNewBtn) emptyNewBtn.onclick = () => this.createNewProposal();

    // Bind row clicks
    el.querySelectorAll('[data-open-proposal]').forEach(row => {
      row.onclick = () => {
        const id = row.dataset.openProposal;
        this.openProposal(id);
      };
    });

    el.querySelectorAll('[data-edit-p]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.openProposal(btn.dataset.editP);
      };
    });

    el.querySelectorAll('[data-list-pdf]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const p = this.proposals.find(x => x._id === btn.dataset.listPdf);
        if (p) {
          await exportPdfDoc(p, this.rateDoc?.settings, btn);
        }
      };
    });

    el.querySelectorAll('[data-list-word]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const p = this.proposals.find(x => x._id === btn.dataset.listWord);
        if (p) {
          await exportWordDocx(p, this.rateDoc?.settings, btn);
        }
      };
    });

    el.querySelectorAll('[data-list-share]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const url = `${window.location.origin}/proposal?p=${btn.dataset.listShare}`;
        navigator.clipboard.writeText(url).then(() => {
          flashToast('Direct client proposal link copied! 📋');
        }).catch(() => {
          prompt('Copy client link:', url);
        });
      };
    });

    el.querySelectorAll('[data-quick-pin]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const p = this.proposals.find(x => x._id === btn.dataset.quickPin);
        if (p) this.showAdminPinModal(p, 'Approved with Admin PIN', () => this.init());
      };
    });

    el.querySelectorAll('[data-quick-submit]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.dataset.quickSubmit;
        try {
          btn.disabled = true;
          btn.textContent = 'Submitting…';
          await apiPost(`/proposals/${id}/request-approval`, {
            note: `Submitted by ${this.currentUser.name || 'employee'}`
          });
          flashToast('Proposal submitted to Admin for approval! ⏳');
          const updated = await apiGet('/proposals');
          this.proposals = updated || [];
          this.renderProposalList(el);
        } catch (err) {
          alert(err.message);
          btn.disabled = false;
          btn.textContent = '📤 Submit';
        }
      };
    });

    el.querySelectorAll('[data-delete-p]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.dataset.deleteP;
        const p = this.proposals.find(x => x._id === id);
        const title = p?.title || p?.ref || 'this proposal';
        if (!confirm(`Are you sure you want to permanently delete proposal "${title}"?`)) return;
        try {
          btn.disabled = true;
          btn.textContent = '…';
          await apiDelete(`/proposals/${id}`);
          flashToast('Proposal deleted successfully');
          this.proposals = this.proposals.filter(x => x._id !== id);
          this.renderProposalList(el);
        } catch (err) {
          alert('Failed to delete proposal: ' + err.message);
          btn.disabled = false;
          btn.textContent = '🗑️';
        }
      };
    });

    el.querySelectorAll('[data-send-client]').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.dataset.sendClient;
        try {
          btn.disabled = true;
          btn.textContent = 'Sending…';
          const res = await apiPost(`/proposals/${id}/send-to-client`);
          flashToast('Proposal sent to client! 📤');
          const clientUrl = `${window.location.origin}/proposal?p=${res.shareId || res.proposal?.shareId}`;
          navigator.clipboard.writeText(clientUrl).catch(() => {});
          alert(`Proposal successfully sent to client!\n\nDirect review link:\n${clientUrl}\n\n(Link copied to clipboard)`);
          const updated = await apiGet('/proposals');
          this.proposals = updated || [];
          this.renderProposalList(el);
        } catch (err) {
          alert('Failed to send to client: ' + err.message);
          btn.disabled = false;
          btn.textContent = '📤 Send to Client';
        }
      };
    });
  }

  renderStatusBadge(p) {
    const s = p.status || 'draft';
    if (s === 'approved') return '<span class="badge green">🔐 Approved Internally</span>';
    if (s === 'pending') return '<span class="badge amber">⏳ Awaiting Approval</span>';
    if (s === 'with_client') return '<span class="badge blue">📤 With Client</span>';
    if (s === 'won') return '<span class="badge green" style="font-weight:700;">🎉 Client Approved</span>';
    if (s === 'changes') return '<span class="badge red">⚠️ Changes Requested</span>';
    if (s === 'returned') return '<span class="badge red">↩️ Returned</span>';
    return '<span class="badge gray">Draft</span>';
  }

  async createNewProposal() {
    const d = new Date();
    const year = d.getFullYear();
    const rand = Math.floor(100 + Math.random() * 900);
    const co = (this.rateDoc && this.rateDoc.settings) || {};

    this.activeProposal = {
      ref: `CI360/PR/${year}/${rand}`,
      title: 'Digital Marketing & Content Strategy Proposal',
      subtitle: 'Comprehensive Strategy, Creative Production & Growth Execution',
      kicker: 'Proposal for sign-off',
      oneLine: 'Integrated marketing, creative content production, and managed digital visibility.',
      client: 'Client',
      clientShort: 'Client',
      contact: '',
      contactRole: '',
      industry: '',
      location: 'India',
      currency: 'INR',
      date: d.toISOString().slice(0, 10),
      validity: 30,
      brief: '',
      briefForm: {},
      briefFiles: [],
      services: [],
      tone: 'Confident and consultative',
      sections: [
        { id: uid(), title: '1. Understanding of the Brief', body: 'We understand that your primary growth focus is building consistent brand presence, driving quality lead engagement, and scaling commercial outreach across digital platforms with high-caliber creative execution.' },
        { id: uid(), title: '2. Strategic Approach', body: '- Insight First, Story Always: Every deliverable is anchored in data, competitive analysis, and audience intent.\n- Integrated Workflow: Unified management across design, copywriting, video, SEO, and performance tracking.\n- Clear Governance: Regular weekly status updates and comprehensive monthly review calls.' },
        { id: uid(), title: '3. Onboarding & First 30 Days', body: '- Days 1–7: Handover, admin access setup, brand asset audit, and team introduction.\n- Days 8–15: Finalization of content calendar, tone guidelines, and campaign messaging framework.\n- Days 16–30: Full publishing cadence, live monitoring, and delivery of month-one performance report.' },
        { id: uid(), title: '4. Why CI360 Degrees', body: 'With over 25+ years of strategic leadership (founded in 2017) and 60+ global mandates, CI360 Degrees pairs senior-level marketing counsel with responsive, AI-enabled production agility.' }
      ],
      heads: [],
      onRequest: [
        { id: uid(), item: 'Video Shoot Day (Director + Crew)', how: 'On-location production day with lighting and sound', price: '₹45,000 per day' },
        { id: uid(), item: 'Custom Corporate Website (12 pages)', how: 'WordPress/Elementor responsive website with SEO setup', price: '₹1,00,000 one-time' }
      ],
      exclusions: 'Paid media ad spend, external celebrity talent fees, venue/travel expenses outside city, and government filing fees.',
      term: 6,
      termDisc: 5,
      discount: 0,
      gst: 18,
      pricingView: 'heads',
      retainerPay: 'm-adv',
      retainerCustom: '',
      projectPay: '5050',
      milestones: [
        { pct: 50, label: 'Advance on signing' },
        { pct: 50, label: 'On final delivery and launch' }
      ],
      retainerIncl: [
        'A dedicated account lead and named team',
        'A monthly content calendar, shared for approval before the month begins',
        'A monthly performance report by the 5th working day, with a review call',
        'A quarterly strategy review and plan reset',
        'Replies to comments and messages within 1 business day',
        'Two revision rounds on every deliverable',
        'Use of CI360’s design, scheduling and AI tool stack at no extra cost'
      ],
      team: [
        ...(this.currentUser?.name && !this.isAdmin ? [{
          id: uid(),
          memberId: this.currentUser._id ? 'emp_' + this.currentUser._id : '',
          name: this.currentUser.name,
          role: 'Engagement Lead',
          resp: 'Project lead and primary client engagement liaison'
        }] : []),
        ...((co.team || []).slice(0, 4).filter(m => !this.currentUser?.name || m.name.toLowerCase() !== this.currentUser.name.toLowerCase()).map(m => ({
          id: uid(),
          memberId: m.id,
          name: m.name,
          role: m.engRole || m.role,
          resp: m.resp || ''
        })))
      ],
      clientTeam: 'Point of Contact for Approvals: TBD on signing',
      cadence: '**How we work together**\n- Weekly 30-minute status call with the client’s designated point of contact.\n- Shared tracker for requests, deliverables, and revisions.\n- Monthly performance report by the 5th working day followed by an executive review call.\n- Quarterly strategy review to reset targets and priorities.',
      escalation: [
        { name: 'Mansi Bagdai', role: 'Strategy & Growth Lead, Account Lead', when: 'Day-to-day operational matters not resolved within 1 working day' },
        { name: 'Urna Banerji', role: 'COO', when: 'Delivery, quality, or timeline concerns not resolved within 2 working days' },
        { name: 'Pramit Ghosh', role: 'Founder & CEO', when: 'Commercial or strategic relationship matters, or anything unresolved at Level 2' }
      ],
      terms: (co.termsLib || []).map(t => ({ ...t, on: t.tag === 'general' })),
      clientNeeds: [
        'A signed copy of this proposal, and purchase order if required by client policies.',
        'Official start date and a designated primary point of contact with approver details.',
        'Billing information: Legal entity name, registered office address, and GSTIN.'
      ],
      choices: [
        { id: uid(), label: 'Proposed Start Date', options: [] },
        { id: uid(), label: 'Billing Entity Name & GSTIN', options: [] }
      ],
      openItems: [],
      notes: '',
      status: 'draft',
      approval: null,
      approvalHistory: [],
      shareId: null,
      sharedVersion: 0
    };

    // Auto add default starter package if available
    const defPkg = (this.rateDoc && this.rateDoc.packages && this.rateDoc.packages[0]);
    if (defPkg) {
      this.activeProposal.heads.push(this.createHeadFromPackage(defPkg));
    }

    // Auto-save initial draft so it has an official MongoDB _id
    await this.saveActiveProposal(true);

    this.activeStep = 'brief';
    this.currentView = 'editor';
    this.render();
  }

  createHeadFromPackage(pkg) {
    const lines = (pkg.components || []).map(c => {
      const item = (this.rateDoc && this.rateDoc.items && this.rateDoc.items.find(x => x.id === c.rateId));
      if (!item) return null;
      return {
        id: uid(),
        rateId: item.id,
        service: item.service,
        desc: item.inc || '',
        unit: item.unit || 'item',
        qty: num(c.qty) || 1,
        rate: num(item.inr) || 0,
        slabs: clean(item.slabs || [])
      };
    }).filter(Boolean);

    return {
      id: uid(),
      packageId: pkg.id,
      title: pkg.service,
      billing: pkg.billing || 'monthly',
      desc: pkg.desc || '',
      exc: pkg.exc || '',
      mult: num(pkg.mult) || 1,
      multLabel: pkg.multLabel || 'brands',
      packDisc: num(pkg.packDisc) || 0,
      fixed: 0,
      lines
    };
  }

  async openProposal(id) {
    try {
      const p = await apiGet(`/proposals/${id}`);
      this.activeProposal = p;
      this.activeStep = 'scope';
      this.currentView = 'editor';
      this.render();
    } catch (err) {
      alert('Could not open proposal: ' + err.message);
    }
  }

  async saveActiveProposal(silent = false) {
    if (!this.activeProposal) return;
    this.saving = true;
    const saveStateEl = this.container.querySelector('#ps-save-state');
    if (saveStateEl) saveStateEl.textContent = 'Saving…';

    try {
      let saved;
      if (this.activeProposal._id) {
        saved = await apiPut(`/proposals/${this.activeProposal._id}`, this.activeProposal);
      } else {
        saved = await apiPost('/proposals', this.activeProposal);
        this.activeProposal._id = saved._id;
      }
      this.activeProposal = saved;

      // Update in local cache
      const idx = this.proposals.findIndex(x => x._id === saved._id);
      if (idx >= 0) this.proposals[idx] = saved;
      else this.proposals.unshift(saved);

      if (saveStateEl) saveStateEl.textContent = 'Saved ✓';
      if (!silent) {
        // notify toast
      }
    } catch (err) {
      if (saveStateEl) saveStateEl.textContent = 'Save failed: ' + err.message;
    } finally {
      this.saving = false;
    }
  }

  scheduleAutoSave() {
    clearTimeout(this.saveTimeout);
    const saveStateEl = this.container.querySelector('#ps-save-state');
    if (saveStateEl) saveStateEl.textContent = 'Unsaved changes';
    this.saveTimeout = setTimeout(() => this.saveActiveProposal(true), 1200);
  }

  /* ─────────────────────────────────────────────────────────────
     VIEW 2: PROPOSAL STUDIO 6-STEP EDITOR
     ───────────────────────────────────────────────────────────── */
  renderProposalEditor(el) {
    const p = this.activeProposal;
    if (!p) return this.render();

    const T = totals(p);
    const co = (this.rateDoc && this.rateDoc.settings) || {};
    const STEPS = [
      ['brief', '1. Client & Brief'],
      ['scope', '2. Scope & Pricing'],
      ['content', '3. Content Narrative'],
      ['team', '4. Team & Governance'],
      ['terms', '5. Terms & Payment'],
      ['approve', '6. Approval & Release']
    ];

    const isPinApproved = p.approval && p.approval.decision === 'approved' && p.approval.pinVerified;

    el.innerHTML = `
      <div class="ps-editor-container">
        <!-- Editor Navigation Header -->
        <div class="card ps-editor-topbar">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button class="btn small" id="ps-editor-back-btn">← Back to Proposals</button>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">
              ${escapeHtml(p.client || 'Untitled Client')} — ${escapeHtml(p.title || 'Proposal')}
            </h3>
            <span class="muted small" style="font-family:var(--font-mono);">(${escapeHtml(p.ref)})</span>
            ${this.renderStatusBadge(p)}
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div id="ps-save-state" class="muted small" style="font-weight:600;">Saved ✓</div>
            <div style="text-align:right;margin-right:4px;">
              <span class="muted small">Contract Value:</span>
              <strong style="color:var(--brand-600);font-size:16px;margin-left:4px;">${money(T.contract, p.currency)}</strong>
            </div>

            <!-- PROPER PREVIEW BUTTON -->
            <button class="btn gold" id="ps-open-preview-modal-btn" style="font-weight:700;display:inline-flex;align-items:center;gap:8px;">
              <span>👁️ Preview Proposal Document</span>
            </button>

            <button class="btn small" id="ps-preview-pdf-btn" ${isPinApproved ? '' : 'disabled title="Requires Admin PIN Approval"'}>
              📄 Download PDF
            </button>
            <button class="btn small" id="ps-preview-docx-btn" ${isPinApproved ? '' : 'disabled title="Requires Admin PIN Approval"'}>
              📝 Word
            </button>
            <button class="btn small primary" id="ps-manual-save-btn">Save Changes</button>
            ${(isPinApproved || p.status === 'approved' || p.status === 'with_client') && p.status !== 'won' ? `
              <button class="btn small primary" id="ps-editor-send-client-btn" style="background:#0F2A4A;color:#FFFFFF;border-color:#0F2A4A;" title="Send proposal to client">
                📤 ${p.status === 'with_client' ? 'Re-send Link' : 'Send to Client'}
              </button>
            ` : ''}
            <button class="btn small ghost text-red" id="ps-editor-delete-btn" title="Delete this proposal">🗑️ Delete</button>
          </div>
        </div>

        <!-- 6-Step Tab Bar -->
        <div class="ps-steps-bar card" style="padding:6px;display:flex;gap:4px;overflow-x:auto;">
          ${STEPS.map(([k, label]) => `
            <button class="ps-step-btn ${this.activeStep === k ? 'active' : ''}" data-step="${k}">
              ${label}
              ${k === 'approve' && isPinApproved ? ' 🔐' : ''}
            </button>
          `).join('')}
        </div>

        <!-- Full Width Step Content (Spacious, Proper UI) -->
        <div class="ps-step-content-full" id="ps-step-pane"></div>
      </div>
    `;

    // Bind navigation buttons
    el.querySelector('#ps-editor-back-btn').onclick = () => {
      this.currentView = 'list';
      this.render();
    };

    el.querySelector('#ps-manual-save-btn').onclick = () => this.saveActiveProposal();

    const editorDelBtn = el.querySelector('#ps-editor-delete-btn');
    if (editorDelBtn) {
      editorDelBtn.onclick = async () => {
        if (!p._id) {
          this.activeProposal = null;
          this.currentView = 'list';
          this.render();
          return;
        }
        const title = p.title || p.ref || 'this proposal';
        if (!confirm(`Are you sure you want to permanently delete proposal "${title}"?`)) return;
        try {
          editorDelBtn.disabled = true;
          editorDelBtn.textContent = 'Deleting…';
          await apiDelete(`/proposals/${p._id}`);
          flashToast('Proposal deleted successfully');
          this.proposals = this.proposals.filter(x => x._id !== p._id);
          this.activeProposal = null;
          this.currentView = 'list';
          this.render();
        } catch (err) {
          alert('Failed to delete proposal: ' + err.message);
          editorDelBtn.disabled = false;
          editorDelBtn.textContent = '🗑️ Delete';
        }
      };
    }

    const editorSendClientBtn = el.querySelector('#ps-editor-send-client-btn');
    if (editorSendClientBtn) {
      editorSendClientBtn.onclick = async () => {
        try {
          editorSendClientBtn.disabled = true;
          editorSendClientBtn.textContent = 'Sending…';
          const res = await apiPost(`/proposals/${p._id}/send-to-client`);
          flashToast('Proposal sent to client! 📤');
          const clientUrl = `${window.location.origin}/proposal?p=${res.shareId || res.proposal?.shareId}`;
          navigator.clipboard.writeText(clientUrl).catch(() => {});
          alert(`Proposal successfully sent to client!\n\nDirect review link:\n${clientUrl}\n\n(Link copied to clipboard)`);
          const updated = await apiGet(`/proposals/${p._id}`);
          this.activeProposal = updated;
          this.renderProposalEditor(el);
        } catch (err) {
          alert('Failed to send to client: ' + err.message);
          editorSendClientBtn.disabled = false;
          editorSendClientBtn.textContent = '📤 Send to Client';
        }
      };
    }

    // Bind Preview Proposal Document button
    const openPreviewBtn = el.querySelector('#ps-open-preview-modal-btn');
    if (openPreviewBtn) {
      openPreviewBtn.onclick = () => this.showPreviewModal();
    }

    el.querySelectorAll('[data-step]').forEach(btn => {
      btn.onclick = () => {
        this.activeStep = btn.dataset.step;
        this.renderProposalEditor(el);
      };
    });

    const docxBtn = el.querySelector('#ps-preview-docx-btn');
    if (docxBtn) docxBtn.onclick = () => exportWordDocx(p, co, docxBtn);

    const pdfBtn = el.querySelector('#ps-preview-pdf-btn');
    if (pdfBtn) pdfBtn.onclick = () => exportPdfDoc(p, co, pdfBtn);

    // Render active step full-width
    const pane = el.querySelector('#ps-step-pane');
    if (this.activeStep === 'brief') this.renderStepBrief(pane);
    else if (this.activeStep === 'scope') this.renderStepScope(pane);
    else if (this.activeStep === 'content') this.renderStepContent(pane);
    else if (this.activeStep === 'team') this.renderStepTeam(pane);
    else if (this.activeStep === 'terms') this.renderStepTerms(pane);
    else if (this.activeStep === 'approve') this.renderStepApprove(pane);
  }

  showPreviewModal() {
    const p = this.activeProposal;
    if (!p) return;
    const co = (this.rateDoc && this.rateDoc.settings) || {};
    const isPinApproved = p.approval && p.approval.decision === 'approved' && p.approval.pinVerified;

    // Remove existing modal if any
    const existing = document.querySelector('.ps-preview-modal-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop ps-preview-modal-overlay';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(6px);display:flex;flex-direction:column;z-index:99999;padding:0;animation:modalFade 0.2s ease;';

    modal.innerHTML = `
      <!-- Modal Top Control Bar -->
      <div style="background:#0F2A4A;color:#FFFFFF;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.12);flex-shrink:0;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:22px;">📄</span>
          <div>
            <strong style="font-size:16px;color:#FFFFFF;">${escapeHtml(p.client || 'Client')} — ${escapeHtml(p.title || 'Proposal')}</strong>
            <span class="muted small" style="color:#AEBBCD;margin-left:8px;font-family:var(--font-mono);">(${escapeHtml(p.ref)})</span>
          </div>
          ${isPinApproved ? '<span class="badge green" style="background:#059669;color:#fff;">🔐 PIN Approved</span>' : '<span class="badge amber" style="background:#D97706;color:#fff;">Draft / Unapproved</span>'}
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <button class="btn small" id="ps-modal-export-docx" ${isPinApproved ? '' : 'disabled title="Requires Admin PIN Approval"'} style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.25);">
            📝 Download Word (.docx)
          </button>
          <button class="btn small gold" id="ps-modal-export-pdf" ${isPinApproved ? '' : 'disabled title="Requires Admin PIN Approval"'} style="font-weight:700;">
            📄 Download PDF
          </button>
          <button class="btn small" id="ps-modal-print-btn" ${isPinApproved ? '' : 'disabled title="Requires Admin PIN Approval"'} style="background:rgba(255,255,255,0.18);color:#fff;border-color:rgba(255,255,255,0.3);font-weight:600;">
            🖨️ Print / Vector PDF
          </button>
          <button class="btn small" id="ps-close-preview-modal" style="background:rgba(255,255,255,0.2);color:#fff;border-color:transparent;font-weight:700;margin-left:6px;">
            ✕ Close Preview
          </button>
        </div>
      </div>

      <!-- Scrollable Centered Document Container -->
      <div style="flex:1;overflow-y:auto;padding:36px 16px;background:#DCE1E8;">
        <div style="max-width:820px;margin:0 auto;box-shadow:0 8px 30px rgba(0,0,0,0.25);border-radius:6px;overflow:hidden;" id="ps-modal-live-paper" data-theme="light">
          ${paperHTML(docModel(p, co))}
        </div>
      </div>
    `;

    document.body.append(modal);

    modal.querySelector('#ps-close-preview-modal').onclick = () => modal.remove();

    const docxBtn = modal.querySelector('#ps-modal-export-docx');
    if (docxBtn) docxBtn.onclick = () => exportWordDocx(p, co, docxBtn);

    const pdfBtn = modal.querySelector('#ps-modal-export-pdf');
    if (pdfBtn) pdfBtn.onclick = () => exportPdfDoc(p, co, pdfBtn);

    const printBtn = modal.querySelector('#ps-modal-print-btn');
    if (printBtn) printBtn.onclick = () => printProposalDocument(p, co);

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        window.removeEventListener('keydown', handleEsc);
      }
    };
    window.addEventListener('keydown', handleEsc);
  }

  refreshLivePaper() {
    const modalPaper = document.querySelector('#ps-modal-live-paper');
    if (modalPaper && this.activeProposal) {
      const co = (this.rateDoc && this.rateDoc.settings) || {};
      modalPaper.innerHTML = paperHTML(docModel(this.activeProposal, co));
    }
  }

  /* ── STEP 1: CLIENT & BRIEF ── */
  renderStepBrief(el) {
    const p = this.activeProposal;
    el.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Client Profile & Proposal Information</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Client Organisation <span style="color:var(--red-500)">*</span></label>
            <input type="text" class="input" id="ps-f-client" value="${escapeHtml(p.client)}" placeholder="e.g. Times of India / Hilton">
          </div>
          <div>
            <label class="label">Short Name in Narrative</label>
            <input type="text" class="input" id="ps-f-clientShort" value="${escapeHtml(p.clientShort)}" placeholder="e.g. TOI">
          </div>
          <div>
            <label class="label">Primary Contact Person</label>
            <input type="text" class="input" id="ps-f-contact" value="${escapeHtml(p.contact)}" placeholder="e.g. Rajesh Sharma">
          </div>
          <div>
            <label class="label">Contact Designation / Title</label>
            <input type="text" class="input" id="ps-f-contactRole" value="${escapeHtml(p.contactRole)}" placeholder="e.g. VP Marketing">
          </div>
          <div>
            <label class="label">Industry / Sector</label>
            <input type="text" class="input" id="ps-f-industry" value="${escapeHtml(p.industry)}" placeholder="e.g. Hospitality / Fintech">
          </div>
          <div>
            <label class="label">Target Market / Geography</label>
            <input type="text" class="input" id="ps-f-location" value="${escapeHtml(p.location)}" placeholder="e.g. India & GCC">
          </div>
          <div>
            <label class="label">Pricing Currency</label>
            <select class="input" id="ps-f-currency">
              <option value="INR" ${p.currency === 'INR' ? 'selected' : ''}>INR (₹) — Indian Rupee</option>
              <option value="USD" ${p.currency === 'USD' ? 'selected' : ''}>USD ($) — US Dollar</option>
            </select>
          </div>
          <div>
            <label class="label">Proposal Date</label>
            <input type="date" class="input" id="ps-f-date" value="${escapeHtml(p.date)}">
          </div>
          <div>
            <label class="label">Proposal Validity (Days)</label>
            <input type="number" class="input" id="ps-f-validity" value="${escapeHtml(p.validity)}" min="1">
          </div>
          <div>
            <label class="label">Proposal Reference ID</label>
            <input type="text" class="input" id="ps-f-ref" value="${escapeHtml(p.ref)}">
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 4px 0;">Client Brief & Strategic Requirements</h3>
        <p class="muted small" style="margin:0 0 12px 0;">Paste discovery notes, client requirements, RFP extracts, or RFQ scope items below.</p>
        <textarea class="input" id="ps-f-brief" rows="7" placeholder="Paste discovery call transcripts, client goals, expected deliverables, competitor benchmarks, or timelines...">${escapeHtml(p.brief)}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Proposal Title & Narrative Cover</h3>
        <div class="grid grid-2">
          <div class="span2">
            <label class="label">Cover Title</label>
            <input type="text" class="input" id="ps-f-title" value="${escapeHtml(p.title)}">
          </div>
          <div class="span2">
            <label class="label">Cover Subtitle</label>
            <input type="text" class="input" id="ps-f-subtitle" value="${escapeHtml(p.subtitle)}">
          </div>
          <div class="span2">
            <label class="label">One-Line Executive Scope Summary</label>
            <textarea class="input" id="ps-f-oneLine" rows="2">${escapeHtml(p.oneLine)}</textarea>
          </div>
        </div>
      </div>
    `;

    // Bind fields
    const bindVal = (id, key, isNum = false) => {
      const input = el.querySelector(id);
      if (input) {
        input.oninput = () => {
          p[key] = isNum ? num(input.value) : input.value;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      }
    };

    bindVal('#ps-f-client', 'client');
    bindVal('#ps-f-clientShort', 'clientShort');
    bindVal('#ps-f-contact', 'contact');
    bindVal('#ps-f-contactRole', 'contactRole');
    bindVal('#ps-f-industry', 'industry');
    bindVal('#ps-f-location', 'location');
    bindVal('#ps-f-date', 'date');
    bindVal('#ps-f-validity', 'validity', true);
    bindVal('#ps-f-ref', 'ref');
    bindVal('#ps-f-brief', 'brief');
    bindVal('#ps-f-title', 'title');
    bindVal('#ps-f-subtitle', 'subtitle');
    bindVal('#ps-f-oneLine', 'oneLine');

    const curSelect = el.querySelector('#ps-f-currency');
    if (curSelect) {
      curSelect.onchange = () => {
        p.currency = curSelect.value;
        if (p.currency === 'USD' && p.gst === 18) p.gst = 0;
        if (p.currency === 'INR' && !p.gst) p.gst = 18;
        this.repriceAllScopeLines();
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }
  }

  repriceAllScopeLines() {
    const p = this.activeProposal;
    if (!p || !this.rateDoc) return;
    (p.heads || []).forEach(h => {
      (h.lines || []).forEach(l => {
        const item = this.rateDoc.items.find(x => x.id === l.rateId);
        if (item) {
          l.rate = num(p.currency === 'USD' ? item.usd : item.inr);
        }
      });
    });
  }

  /* ── STEP 2: SCOPE & PRICING ── */
  renderStepScope(el) {
    const p = this.activeProposal;
    const items = (this.rateDoc && this.rateDoc.items) || [];
    const packages = (this.rateDoc && this.rateDoc.packages) || [];

    el.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Heads of Work & Deliverables</h3>
            <p class="muted small" style="margin:0;">Add packaged service suites or custom line items. Volume discounts apply automatically as quantities scale.</p>
          </div>
          <div style="display:flex;gap:8px;">
            <select class="input" id="ps-add-pkg-select" style="width:200px;">
              <option value="">+ Add Package...</option>
              ${packages.map(k => `<option value="${escapeHtml(k.id)}">${escapeHtml(k.service)} (${k.billing})</option>`).join('')}
            </select>
            <select class="input" id="ps-add-svc-select" style="width:200px;">
              <option value="">+ Add Single Item...</option>
              ${items.map(r => `<option value="${escapeHtml(r.id)}">${escapeHtml(r.category)}: ${escapeHtml(r.service)}</option>`).join('')}
            </select>
            <button class="btn small" id="ps-add-blank-head-btn">+ Blank Head</button>
          </div>
        </div>

        <div id="ps-heads-list">
          ${(p.heads || []).map((h, i) => this.renderHeadCardHTML(h, i)).join('')}
        </div>
      </div>

      <!-- Commercials & Discounts -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Commercial Terms, Discounts & Taxes</h3>
        <div class="grid grid-4">
          <div>
            <label class="label">Retainer Term (Months)</label>
            <input type="number" class="input" id="ps-f-term" value="${escapeHtml(p.term)}" min="1">
          </div>
          <div>
            <label class="label">Term Commitment Discount (%)</label>
            <input type="number" class="input" id="ps-f-termDisc" value="${escapeHtml(p.termDisc)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">Additional Commercial Discount (%)</label>
            <input type="number" class="input" id="ps-f-discount" value="${escapeHtml(p.discount)}" min="0" max="90" step="any">
          </div>
          <div>
            <label class="label">${p.currency === 'INR' ? 'GST Tax Rate (%)' : 'Tax Rate (%)'}</label>
            <input type="number" class="input" id="ps-f-gst" value="${escapeHtml(p.gst)}" min="0" step="any">
          </div>
          <div class="span4">
            <label class="label">Pricing Breakdown Displayed to Client</label>
            <div style="display:flex;gap:20px;margin-top:6px;">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                <input type="radio" name="ps-pricing-view" value="heads" ${p.pricingView === 'heads' ? 'checked' : ''}>
                <span>Head-wise Subtotals (Recommended)</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                <input type="radio" name="ps-pricing-view" value="overall" ${p.pricingView === 'overall' ? 'checked' : ''}>
                <span>One Overall Lump Sum</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                <input type="radio" name="ps-pricing-view" value="itemised" ${p.pricingView === 'itemised' ? 'checked' : ''}>
                <span>Fully Itemised Line Details</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Out of Scope & Exclusions -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Available on Request & Scope Exclusions</h3>
        <label class="label">Scope Exclusions (Items Not Included)</label>
        <textarea class="input" id="ps-f-exclusions" rows="2" placeholder="e.g. Media ad spend, commercial talent fees, travel expenses...">${escapeHtml(p.exclusions)}</textarea>
      </div>
    `;

    // Bind head additions
    const pkgSelect = el.querySelector('#ps-add-pkg-select');
    if (pkgSelect) {
      pkgSelect.onchange = () => {
        const pkgId = pkgSelect.value;
        if (!pkgId) return;
        const pkg = packages.find(k => k.id === pkgId);
        if (pkg) {
          p.heads.push(this.createHeadFromPackage(pkg));
          this.scheduleAutoSave();
          this.renderStepScope(el);
          this.refreshLivePaper();
        }
      };
    }

    const svcSelect = el.querySelector('#ps-add-svc-select');
    if (svcSelect) {
      svcSelect.onchange = () => {
        const svcId = svcSelect.value;
        if (!svcId) return;
        const item = items.find(r => r.id === svcId);
        if (item) {
          const isMon = /month|handle set|platform/.test(item.unit) || /month/.test(item.note || '');
          p.heads.push({
            id: uid(),
            packageId: null,
            title: item.service,
            billing: isMon ? 'monthly' : 'one-time',
            desc: '',
            exc: item.exc || '',
            mult: 1,
            multLabel: 'brands',
            packDisc: 0,
            fixed: 0,
            lines: [{
              id: uid(),
              rateId: item.id,
              service: item.service,
              desc: item.inc || '',
              unit: item.unit || 'item',
              qty: 1,
              rate: num(p.currency === 'USD' ? item.usd : item.inr),
              slabs: clean(item.slabs || [])
            }]
          });
          this.scheduleAutoSave();
          this.renderStepScope(el);
          this.refreshLivePaper();
        }
      };
    }

    const blankHeadBtn = el.querySelector('#ps-add-blank-head-btn');
    if (blankHeadBtn) {
      blankHeadBtn.onclick = () => {
        p.heads.push({
          id: uid(),
          packageId: null,
          title: 'Custom Scope Area',
          billing: 'monthly',
          desc: '',
          exc: '',
          mult: 1,
          multLabel: 'brands',
          packDisc: 0,
          fixed: 0,
          lines: []
        });
        this.scheduleAutoSave();
        this.renderStepScope(el);
        this.refreshLivePaper();
      };
    }

    // Bind head interactions
    this.bindHeadEvents(el);

    // Bind commercial fields
    const termInput = el.querySelector('#ps-f-term');
    if (termInput) {
      termInput.oninput = () => {
        p.term = Math.max(1, num(termInput.value));
        // Auto apply term discount slab
        if (p.term >= 12) p.termDisc = 10;
        else if (p.term >= 6) p.termDisc = 5;
        else p.termDisc = 0;
        const td = el.querySelector('#ps-f-termDisc');
        if (td) td.value = p.termDisc;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }

    const bindNum = (id, key) => {
      const input = el.querySelector(id);
      if (input) {
        input.oninput = () => {
          p[key] = num(input.value);
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      }
    };
    bindNum('#ps-f-termDisc', 'termDisc');
    bindNum('#ps-f-discount', 'discount');
    bindNum('#ps-f-gst', 'gst');

    el.querySelectorAll('input[name="ps-pricing-view"]').forEach(radio => {
      radio.onchange = () => {
        p.pricingView = radio.value;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    });

    const exclInput = el.querySelector('#ps-f-exclusions');
    if (exclInput) {
      exclInput.oninput = () => {
        p.exclusions = exclInput.value;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }
  }

  renderHeadCardHTML(h, i) {
    const p = this.activeProposal;
    const calc = headCalc(h);

    return `
      <div class="headcard" data-head-id="${escapeHtml(h.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:16px;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <input type="text" class="input hc-title" data-head-field="title" value="${escapeHtml(h.title)}" style="font-weight:700;flex:1;min-width:200px;">
          <select class="input" data-head-field="billing" style="width:130px;">
            <option value="monthly" ${h.billing === 'monthly' ? 'selected' : ''}>Monthly</option>
            <option value="one-time" ${h.billing !== 'monthly' ? 'selected' : ''}>One-time</option>
          </select>
          <div style="display:inline-flex;gap:4px;">
            <button class="btn small" data-head-action="up" ${i === 0 ? 'disabled' : ''} title="Move Up">↑</button>
            <button class="btn small" data-head-action="down" ${i === (p.heads.length - 1) ? 'disabled' : ''} title="Move Down">↓</button>
            <button class="btn small danger" data-head-action="remove" title="Remove Head">✕</button>
          </div>
        </div>

        <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:13px;margin-bottom:12px;align-items:center;">
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Multiplier:</span>
            <input type="number" class="input" data-head-field="mult" value="${escapeHtml(h.mult || 1)}" min="1" style="width:65px;">
            <input type="text" class="input" data-head-field="multLabel" value="${escapeHtml(h.multLabel || 'brands')}" style="width:100px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Package Disc (%):</span>
            <input type="number" class="input" data-head-field="packDisc" value="${escapeHtml(h.packDisc || 0)}" min="0" max="90" style="width:75px;">
          </label>
          <label style="display:flex;align-items:center;gap:6px;">
            <span class="muted">Fixed Override:</span>
            <input type="number" class="input" data-head-field="fixed" value="${escapeHtml(h.fixed || '')}" placeholder="None" style="width:110px;">
          </label>
        </div>

        <!-- Lines Table -->
        <div class="scroll" style="margin-bottom:12px;overflow-x:auto;">
          <table class="table" style="width:100%;min-width:920px;margin:0;font-size:13px;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="min-width:230px;">Service Deliverable</th>
                <th style="min-width:320px;">Inclusions / Description</th>
                <th style="width:85px;text-align:center;">Qty</th>
                <th style="width:100px;">Unit</th>
                <th style="width:125px;text-align:right;">Rate</th>
                <th style="width:130px;text-align:right;">Net Amount</th>
                <th style="width:44px;text-align:center;"></th>
              </tr>
            </thead>
            <tbody>
              ${(h.lines || []).map(l => {
                const g = num(l.qty) * num(l.rate);
                const sp = slabPct(l.slabs, num(l.qty) * (num(h.mult) || 1));
                const lineNet = g * (1 - sp / 100);
                return `
                  <tr data-line-id="${escapeHtml(l.id)}">
                    <td><input type="text" class="input" data-line-field="service" value="${escapeHtml(l.service)}" style="font-weight:600;width:100%;"></td>
                    <td><input type="text" class="input" data-line-field="desc" value="${escapeHtml(l.desc)}" placeholder="What this line covers..." style="width:100%;"></td>
                    <td><input type="number" class="input" data-line-field="qty" value="${escapeHtml(l.qty)}" min="0" style="text-align:center;width:100%;font-weight:700;font-variant-numeric:tabular-nums;"></td>
                    <td><input type="text" class="input" data-line-field="unit" value="${escapeHtml(l.unit)}" style="width:100%;"></td>
                    <td><input type="number" class="input" data-line-field="rate" value="${escapeHtml(l.rate)}" min="0" style="text-align:right;width:100%;font-weight:700;font-variant-numeric:tabular-nums;"></td>
                    <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;padding:12px 10px;">
                      ${money(lineNet, p.currency)}
                      ${sp ? `<div style="color:var(--green-600);font-size:11px;font-weight:500;">(${sp}% vol disc)</div>` : ''}
                    </td>
                    <td style="text-align:center;"><button class="btn small danger" data-line-action="remove" style="padding:6px 10px;line-height:1;" title="Remove deliverable">✕</button></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <button class="btn small" data-head-action="add-line">+ Add Deliverable Line</button>
          <div style="font-size:13.5px;font-weight:700;color:var(--text-1);">
            Head Subtotal: <span style="color:var(--brand-600);">${money(calc.net, p.currency)}</span>
            <span class="muted small" style="font-weight:400;">${h.billing === 'monthly' ? '/ month' : ' one-time'}</span>
          </div>
        </div>
      </div>
    `;
  }

  bindHeadEvents(el) {
    const p = this.activeProposal;

    el.querySelectorAll('.headcard').forEach((card, i) => {
      const headId = card.dataset.headId;
      const h = p.heads.find(x => x.id === headId);
      if (!h) return;

      // Head inputs
      card.querySelectorAll('[data-head-field]').forEach(input => {
        input.oninput = () => {
          const field = input.dataset.headField;
          h[field] = input.type === 'number' ? num(input.value) : input.value;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      });

      // Head billing change
      const billingSelect = card.querySelector('select[data-head-field="billing"]');
      if (billingSelect) {
        billingSelect.onchange = () => {
          h.billing = billingSelect.value;
          this.scheduleAutoSave();
          this.renderStepScope(el);
          this.refreshLivePaper();
        };
      }

      // Head actions
      card.querySelectorAll('[data-head-action]').forEach(btn => {
        btn.onclick = () => {
          const act = btn.dataset.headAction;
          if (act === 'remove') {
            p.heads = p.heads.filter(x => x.id !== headId);
          } else if (act === 'up' && i > 0) {
            [p.heads[i - 1], p.heads[i]] = [p.heads[i], p.heads[i - 1]];
          } else if (act === 'down' && i < p.heads.length - 1) {
            [p.heads[i + 1], p.heads[i]] = [p.heads[i], p.heads[i + 1]];
          } else if (act === 'add-line') {
            h.lines.push({
              id: uid(),
              rateId: '',
              service: 'Custom Deliverable',
              desc: '',
              unit: 'item',
              qty: 1,
              rate: 0,
              slabs: []
            });
          }
          this.scheduleAutoSave();
          this.renderStepScope(el);
          this.refreshLivePaper();
        };
      });

      // Line events
      card.querySelectorAll('tr[data-line-id]').forEach(row => {
        const lineId = row.dataset.lineId;
        const line = h.lines.find(x => x.id === lineId);
        if (!line) return;

        row.querySelectorAll('[data-line-field]').forEach(inp => {
          inp.oninput = () => {
            const f = inp.dataset.lineField;
            line[f] = inp.type === 'number' ? num(inp.value) : inp.value;
            this.scheduleAutoSave();
            this.refreshLivePaper();
          };
        });

        const rmBtn = row.querySelector('[data-line-action="remove"]');
        if (rmBtn) {
          rmBtn.onclick = () => {
            h.lines = h.lines.filter(x => x.id !== lineId);
            this.scheduleAutoSave();
            this.renderStepScope(el);
            this.refreshLivePaper();
          };
        }
      });
    });
  }

  /* ── STEP 3: CONTENT NARRATIVE ── */
  renderStepContent(el) {
    const p = this.activeProposal;

    el.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Proposal Narrative Sections</h3>
            <p class="muted small" style="margin:0;">The core strategic story: Understanding, Strategic Approach, Implementation, and Credentials.</p>
          </div>
          <button class="btn small" id="ps-add-section-btn">+ Add Section</button>
        </div>

        <div id="ps-sections-list">
          ${(p.sections || []).map((s, i) => `
            <div class="card ps-sec-card" data-sec-id="${escapeHtml(s.id)}" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin-bottom:12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <input type="text" class="input" data-sec-field="title" value="${escapeHtml(s.title)}" style="font-weight:700;flex:1;">
                <button class="btn small danger" data-sec-action="remove">✕</button>
              </div>
              <textarea class="input" data-sec-field="body" rows="4" placeholder="Section body text... Use '- ' for bullet points.">${escapeHtml(s.body)}</textarea>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    el.querySelector('#ps-add-section-btn').onclick = () => {
      p.sections.push({ id: uid(), title: 'New Narrative Section', body: '' });
      this.scheduleAutoSave();
      this.renderStepContent(el);
      this.refreshLivePaper();
    };

    el.querySelectorAll('.ps-sec-card').forEach(card => {
      const sId = card.dataset.secId;
      const s = p.sections.find(x => x.id === sId);
      if (!s) return;

      const titleInp = card.querySelector('[data-sec-field="title"]');
      if (titleInp) {
        titleInp.oninput = () => {
          s.title = titleInp.value;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      }

      const bodyInp = card.querySelector('[data-sec-field="body"]');
      if (bodyInp) {
        bodyInp.oninput = () => {
          s.body = bodyInp.value;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      }

      const rmBtn = card.querySelector('[data-sec-action="remove"]');
      if (rmBtn) {
        rmBtn.onclick = () => {
          p.sections = p.sections.filter(x => x.id !== sId);
          this.scheduleAutoSave();
          this.renderStepContent(el);
          this.refreshLivePaper();
        };
      }
    });
  }

  /* ── STEP 4: TEAM & GOVERNANCE ── */
  renderStepTeam(el) {
    const p = this.activeProposal;
    const teamLib = (this.rateDoc && this.rateDoc.settings && this.rateDoc.settings.team) || [];
    const activePersonnel = (this.personnel || []).filter(x => x.status !== 'inactive');

    // Build unified employee pool for engagement roles & escalation paths
    const employeePool = [];
    activePersonnel.forEach(emp => {
      employeePool.push({
        id: 'emp_' + emp._id,
        name: emp.name,
        role: emp.duties || emp.role || 'Team Member',
        resp: emp.duties ? `Execution lead for ${emp.duties}` : 'Mandate execution and client deliverables'
      });
    });
    teamLib.forEach(m => {
      if (!employeePool.some(e => e.name.toLowerCase() === m.name.toLowerCase())) {
        employeePool.push({
          id: m.id,
          name: m.name,
          role: m.engRole || m.role || 'Specialist',
          resp: m.resp || ''
        });
      }
    });

    if (!Array.isArray(p.escalation) || !p.escalation.length) {
      p.escalation = [
        { name: 'Mansi Bagdai', role: 'Strategy & Growth Lead, Account Lead', when: 'Day-to-day operational matters not resolved within 1 working day' },
        { name: 'Urna Banerji', role: 'COO', when: 'Delivery, quality, or timeline concerns not resolved within 2 working days' },
        { name: 'Pramit Ghosh', role: 'Founder & CEO', when: 'Commercial or strategic relationship matters, or anything unresolved at Level 2' }
      ];
    }

    el.innerHTML = `
      <!-- Named Team -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">Named CI360 Account Team</h3>
            <p class="muted small" style="margin:0;">Select from all employees in your team (${activePersonnel.length} available) or enter custom role assignments for this engagement.</p>
          </div>
          <button class="btn small" id="ps-add-team-btn">+ Add Team Member</button>
        </div>

        <div class="scroll">
          <table class="table" style="width:100%;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="width:230px;">Select Employee / Role</th>
                <th style="min-width:160px;">Name</th>
                <th style="min-width:180px;">Engagement Role</th>
                <th style="min-width:240px;">Responsibility</th>
                <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
              ${(p.team || []).map(t => `
                <tr data-team-id="${escapeHtml(t.id)}">
                  <td>
                    <select class="input" data-t-select style="font-size:12.5px;">
                      <option value="">Select Employee...</option>
                      ${employeePool.map(m => `<option value="${escapeHtml(m.id)}" ${t.memberId === m.id || t.name === m.name ? 'selected' : ''}>${escapeHtml(m.name)} (${escapeHtml(m.role)})</option>`).join('')}
                    </select>
                  </td>
                  <td><input type="text" class="input" data-t-field="name" value="${escapeHtml(t.name)}" placeholder="Full Name"></td>
                  <td><input type="text" class="input" data-t-field="role" value="${escapeHtml(t.role)}" placeholder="e.g. Account Lead"></td>
                  <td><input type="text" class="input" data-t-field="resp" value="${escapeHtml(t.resp)}" placeholder="Specific ownership"></td>
                  <td><button class="btn small danger" data-t-action="remove" title="Remove member">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Escalation Path Matrix -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3 style="font-size:17px;font-weight:700;margin:0 0 2px 0;">🚨 Escalation Path & SLA Matrix</h3>
            <p class="muted small" style="margin:0;">Define tiered contacts for client escalation with SLA conditions and resolution triggers.</p>
          </div>
          <button class="btn small" id="ps-add-escl-btn">+ Add Escalation Level</button>
        </div>

        <div class="scroll">
          <table class="table" style="width:100%;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th style="width:90px;">Tier</th>
                <th style="width:230px;">Select Employee</th>
                <th style="min-width:160px;">Contact Name</th>
                <th style="min-width:180px;">Designation / Title</th>
                <th style="min-width:240px;">When to Escalate (Trigger Condition / SLA)</th>
                <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
              ${p.escalation.map((e, idx) => `
                <tr data-escl-idx="${idx}">
                  <td><span class="badge blue">Level ${idx + 1}</span></td>
                  <td>
                    <select class="input" data-e-select style="font-size:12.5px;">
                      <option value="">Select Employee...</option>
                      ${employeePool.map(m => `<option value="${escapeHtml(m.name)}" ${e.name === m.name ? 'selected' : ''}>${escapeHtml(m.name)} (${escapeHtml(m.role)})</option>`).join('')}
                    </select>
                  </td>
                  <td><input type="text" class="input" data-e-field="name" value="${escapeHtml(e.name || '')}" placeholder="Contact Name"></td>
                  <td><input type="text" class="input" data-e-field="role" value="${escapeHtml(e.role || '')}" placeholder="Designation / Role"></td>
                  <td><input type="text" class="input" data-e-field="when" value="${escapeHtml(e.when || '')}" placeholder="Trigger SLA or condition"></td>
                  <td><button class="btn small danger" data-e-action="remove" title="Remove level">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Client Side Contacts -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">Client-Side Contacts & Approvers</h3>
        <p class="muted small" style="margin:0 0 10px 0;">Named client contacts responsible for briefs, feedback approvals, and commercial sign-offs.</p>
        <textarea class="input" id="ps-f-clientTeam" rows="2" placeholder="e.g. Content approval: Sachin Nagi; Commercial sign-off: Pramit Ghosh">${escapeHtml(p.clientTeam)}</textarea>
      </div>

      <!-- Meeting Cadence -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">How We Work Together (Governance & Meeting Cadence)</h3>
        <p class="muted small" style="margin:0 0 10px 0;">Regular touchpoints, review calls, content calendar approval flow, and reporting rhythm.</p>
        <textarea class="input" id="ps-f-cadence" rows="4">${escapeHtml(p.cadence)}</textarea>
      </div>
    `;

    // Team events
    el.querySelector('#ps-add-team-btn').onclick = () => {
      p.team.push({ id: uid(), memberId: '', name: '', role: '', resp: '' });
      this.scheduleAutoSave();
      this.renderStepTeam(el);
      this.refreshLivePaper();
    };

    el.querySelectorAll('tr[data-team-id]').forEach(row => {
      const tId = row.dataset.teamId;
      const t = p.team.find(x => x.id === tId);
      if (!t) return;

      const sel = row.querySelector('[data-t-select]');
      if (sel) {
        sel.onchange = () => {
          const m = employeePool.find(x => x.id === sel.value);
          if (m) {
            t.memberId = m.id;
            t.name = m.name;
            t.role = m.role;
            t.resp = m.resp || '';
          } else {
            t.memberId = '';
          }
          this.scheduleAutoSave();
          this.renderStepTeam(el);
          this.refreshLivePaper();
        };
      }

      row.querySelectorAll('[data-t-field]').forEach(inp => {
        inp.oninput = () => {
          t[inp.dataset.tField] = inp.value;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      });

      const rm = row.querySelector('[data-t-action="remove"]');
      if (rm) {
        rm.onclick = () => {
          p.team = p.team.filter(x => x.id !== tId);
          this.scheduleAutoSave();
          this.renderStepTeam(el);
          this.refreshLivePaper();
        };
      }
    });

    // Escalation Matrix events
    const addEsclBtn = el.querySelector('#ps-add-escl-btn');
    if (addEsclBtn) {
      addEsclBtn.onclick = () => {
        p.escalation.push({ name: '', role: '', when: '' });
        this.scheduleAutoSave();
        this.renderStepTeam(el);
        this.refreshLivePaper();
      };
    }

    el.querySelectorAll('tr[data-escl-idx]').forEach(row => {
      const idx = Number(row.dataset.esclIdx);
      const e = p.escalation[idx];
      if (!e) return;

      const sel = row.querySelector('[data-e-select]');
      if (sel) {
        sel.onchange = () => {
          const emp = employeePool.find(x => x.name === sel.value);
          if (emp) {
            e.name = emp.name;
            e.role = emp.role;
          }
          this.scheduleAutoSave();
          this.renderStepTeam(el);
          this.refreshLivePaper();
        };
      }

      row.querySelectorAll('[data-e-field]').forEach(inp => {
        inp.oninput = () => {
          e[inp.dataset.eField] = inp.value;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        };
      });

      const rm = row.querySelector('[data-e-action="remove"]');
      if (rm) {
        rm.onclick = () => {
          p.escalation.splice(idx, 1);
          this.scheduleAutoSave();
          this.renderStepTeam(el);
          this.refreshLivePaper();
        };
      }
    });

    const ctInp = el.querySelector('#ps-f-clientTeam');
    if (ctInp) {
      ctInp.oninput = () => {
        p.clientTeam = ctInp.value;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }

    const cadInp = el.querySelector('#ps-f-cadence');
    if (cadInp) {
      cadInp.oninput = () => {
        p.cadence = cadInp.value;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }
  }

  /* ── STEP 5: TERMS & PAYMENT ── */
  renderStepTerms(el) {
    const p = this.activeProposal;

    el.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Payment Terms & Schedules</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Retainer Payment Schedule</label>
            <select class="input" id="ps-f-retainerPay">
              <option value="m-adv" ${p.retainerPay === 'm-adv' ? 'selected' : ''}>Monthly in advance on the 1st</option>
              <option value="m-arr" ${p.retainerPay === 'm-arr' ? 'selected' : ''}>Monthly in arrears, net 15 days</option>
              <option value="q-adv" ${p.retainerPay === 'q-adv' ? 'selected' : ''}>Quarterly in advance (3% discount)</option>
              <option value="term-adv" ${p.retainerPay === 'term-adv' ? 'selected' : ''}>Full term in advance (5% discount)</option>
            </select>
          </div>
          <div>
            <label class="label">One-time Work Milestone Schedule</label>
            <select class="input" id="ps-f-projectPay">
              <option value="5050" ${p.projectPay === '5050' ? 'selected' : ''}>50% advance, 50% on delivery</option>
              <option value="100" ${p.projectPay === '100' ? 'selected' : ''}>100% advance (3% discount)</option>
              <option value="403030" ${p.projectPay === '403030' ? 'selected' : ''}>40% / 30% / 30% milestones</option>
              <option value="304030" ${p.projectPay === '304030' ? 'selected' : ''}>30% / 40% / 30% milestones</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 8px 0;">What We Need from Client to Start</h3>
        <textarea class="input" id="ps-f-clientNeeds" rows="4" placeholder="One requirement per line...">${escapeHtml((p.clientNeeds || []).join('\n'))}</textarea>
      </div>

      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 12px 0;">Legal Terms & Clauses Included</h3>
        <div style="display:grid;gap:8px;">
          ${(p.terms || []).map(t => `
            <label class="card" style="padding:10px 14px;display:flex;align-items:flex-start;gap:10px;cursor:pointer;background:var(--bg-elevated);border:1px solid var(--border-sm);margin:0;">
              <input type="checkbox" data-term-id="${escapeHtml(t.id)}" ${t.on ? 'checked' : ''} style="margin-top:4px;">
              <div>
                <strong style="font-size:13.5px;color:var(--text-1);">${escapeHtml(t.title)}</strong>
                <p class="muted small" style="margin:2px 0 0 0;">${escapeHtml(t.text)}</p>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    `;

    const retInp = el.querySelector('#ps-f-retainerPay');
    if (retInp) {
      retInp.onchange = () => {
        p.retainerPay = retInp.value;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }

    const prjInp = el.querySelector('#ps-f-projectPay');
    if (prjInp) {
      prjInp.onchange = () => {
        p.projectPay = prjInp.value;
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }

    const cnInp = el.querySelector('#ps-f-clientNeeds');
    if (cnInp) {
      cnInp.oninput = () => {
        p.clientNeeds = cnInp.value.split('\n').map(s => s.trim()).filter(Boolean);
        this.scheduleAutoSave();
        this.refreshLivePaper();
      };
    }

    el.querySelectorAll('input[data-term-id]').forEach(chk => {
      chk.onchange = () => {
        const t = p.terms.find(x => x.id === chk.dataset.termId);
        if (t) {
          t.on = chk.checked;
          this.scheduleAutoSave();
          this.refreshLivePaper();
        }
      };
    });
  }

  /* ── STEP 6: APPROVAL & RELEASE WITH ADMIN PIN ── */
  renderStepApprove(el) {
    const p = this.activeProposal;
    const isPinApproved = p.approval && p.approval.decision === 'approved' && p.approval.pinVerified;
    const isPending = p.status === 'pending';
    const clientLink = p.shareId ? `${window.location.origin}/proposal?p=${p.shareId}` : '';

    el.innerHTML = `
      <!-- Admin PIN Status Card -->
      <div class="card" style="margin-bottom:16px;border-left:4px solid ${isPinApproved ? 'var(--green-500)' : (isPending ? 'var(--amber-500)' : 'var(--border-md)')}">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <h3 style="font-size:18px;font-weight:800;color:var(--text-1);margin:0;">
                Internal Admin Approval & Sign-off
              </h3>
              ${isPinApproved ? '<span class="badge green">🔐 VERIFIED WITH ADMIN PIN</span>' : (isPending ? '<span class="badge amber">⏳ AWAITING ADMIN PIN</span>' : '<span class="badge gray">DRAFT (UNAPPROVED)</span>')}
            </div>
            <p class="muted small" style="margin:4px 0 0;">
              Proposals must be signed off by an authorized admin using their secure PIN before Word/PDF downloads or client links can be released.
            </p>
          </div>

          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <button class="btn" id="ps-step6-preview-btn" style="font-weight:700;">
              👁️ Preview Proposal Document
            </button>
            ${this.isAdmin ? `
              ${!isPinApproved ? `
                <button class="btn gold" id="ps-btn-approve-pin" style="font-weight:700;">
                  🔐 Authorize & Approve with Admin PIN
                </button>
              ` : `
                <button class="btn" id="ps-btn-reauthorize-pin">
                  🔄 Re-authorize / Sign Again
                </button>
              `}
            ` : `
              ${!isPinApproved ? `
                ${isPending ? `
                  <button class="btn" disabled style="font-weight:700;color:var(--amber-500);background:var(--bg-elevated);">
                    ⏳ Submitted for Admin Sign-off
                  </button>
                ` : `
                  <button class="btn gold" id="ps-btn-emp-submit" style="font-weight:700;">
                    📤 Submit for Admin Approval
                  </button>
                `}
              ` : `
                <span class="badge green" style="font-size:13px;padding:7px 14px;font-weight:700;">🔐 Admin Approved</span>
              `}
            `}
          </div>
        </div>

        ${isPinApproved ? `
          <div style="margin-top:14px;padding:12px 16px;background:var(--green-50, rgba(16,185,129,0.08));border:1px solid rgba(16,185,129,0.25);border-radius:var(--r-md);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:20px;">🛡️</span>
              <div>
                <strong style="color:var(--green-600);font-size:14px;">Officially Approved by Admin</strong>
                <div class="small" style="color:var(--text-2);">
                  Sign-off by <strong>${escapeHtml(p.approval.approverName || 'Admin')}</strong>
                  (${escapeHtml(p.approval.approverEmail || 'admin')}) on <strong>${fmtDateTime(p.approval.at)}</strong>
                </div>
                ${p.approval.note ? `<div class="small muted" style="margin-top:4px;">“${escapeHtml(p.approval.note)}”</div>` : ''}
              </div>
            </div>
          </div>
        ` : (isPending ? `
          <div style="margin-top:14px;padding:12px 16px;background:var(--amber-50, rgba(245,158,11,0.08));border:1px solid rgba(245,158,11,0.25);border-radius:var(--r-md);font-size:13.5px;color:var(--amber-600);">
            ⏳ This proposal has been submitted and is currently awaiting Admin PIN authorization. Once an Admin reviews and approves it, client release will be unlocked.
          </div>
        ` : `
          <div style="margin-top:14px;padding:12px 16px;background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);font-size:13.5px;color:var(--text-2);">
            📝 <strong>Employee Draft Mode:</strong> Any team member can design deliverables and commercial pricing. Click <strong>Submit for Admin Approval</strong> when ready. Only an authorized Admin can enter their secure PIN to approve and release the proposal.
          </div>
        `)}
      </div>

      <!-- Release & Sharing Card -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 6px 0;">Client Release & Online Share Link</h3>
        <p class="muted small" style="margin:0 0 14px 0;">Proposals must be approved by an Admin with their secure PIN before being released to clients.</p>

        ${p.shareId ? `
          <div style="margin-bottom:14px;">
            <label class="label">Live Client Link (Version ${p.sharedVersion})</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <input type="text" class="input" id="ps-share-link-input" readonly value="${escapeHtml(clientLink)}" style="flex:1;min-width:240px;">
              <button class="btn" id="ps-copy-link-btn">📋 Copy Link</button>
              <a href="/proposal?p=${escapeHtml(p.shareId)}" target="_blank" class="btn">👁️ Open View</a>
            </div>
          </div>

          <!-- Non-Portal / Offline Client Direct Download Section -->
          <div style="margin-bottom:16px;padding:14px 16px;background:var(--bg-elevated);border-radius:var(--r-md);border:1px solid var(--border-sm);">
            <div style="font-weight:700;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
              <span>💾 Client Direct Download Options</span>
              <span class="badge blue" style="font-size:11px;">If client is not registered on portal</span>
            </div>
            <p class="muted small" style="margin:0 0 12px 0;">If the client does not have a CI360 portal account, download the file directly or copy the public download link to send via email/WhatsApp:</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn" id="ps-step6-dl-pdf">📄 Download PDF</button>
              <button class="btn" id="ps-step6-dl-word">📝 Download Word (.docx)</button>
              <button class="btn ghost" id="ps-step6-copy-pdf-link">🔗 Copy Direct PDF Link</button>
            </div>
          </div>
        ` : ''}

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          ${isPinApproved ? `
            <button class="btn primary" id="ps-step6-send-client-btn" style="font-weight:700;">
              📤 ${p.shareId ? 'Re-send / Copy Client Review Link' : 'Send to Client'}
            </button>
            ${this.isAdmin ? `
              <button class="btn" id="ps-btn-release-pin" title="Record updated release version with Admin PIN">
                🚀 Update Version with Admin PIN
              </button>
            ` : ''}
            <span class="muted small" style="color:var(--green-600);font-weight:600;">
              ✓ Proposal authorized by Admin. Ready for client delivery.
            </span>
          ` : `
            <button class="btn" disabled style="opacity:0.6;cursor:not-allowed;">
              🔒 Send to Client (Requires Admin PIN Approval First)
            </button>
            <span class="muted small">
              ${isPending ? '⏳ Awaiting Admin review and PIN sign-off.' : 'Draft must be submitted and approved by Admin.'}
            </span>
          `}
        </div>

        ${p.clientResponse && p.clientResponse.decision ? `
          <div style="margin-top:16px;padding:14px;border-radius:var(--r-md);background:${p.clientResponse.decision === 'approved' ? 'var(--green-50, rgba(16,185,129,0.1))' : 'var(--amber-50, rgba(245,158,11,0.1))'};border:1px solid ${p.clientResponse.decision === 'approved' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}">
            <strong style="color:${p.clientResponse.decision === 'approved' ? 'var(--green-600)' : 'var(--amber-600)'}">
              ${p.clientResponse.decision === 'approved' ? '🎉 Client Approved Online' : '⚠️ Client Requested Changes'}
            </strong>
            <div class="small muted" style="margin-top:2px;">
              Responded by ${escapeHtml(p.clientResponse.name)} (${escapeHtml(p.clientResponse.role || 'Client')}) on ${fmtDateTime(p.clientResponse.at)}
            </div>
            ${p.clientResponse.comment ? `<p style="margin:8px 0 0 0;font-size:13.5px;">“${escapeHtml(p.clientResponse.comment)}”</p>` : ''}
          </div>
        ` : ''}
      </div>

      <!-- Immutable Audit Log Table for this Proposal -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 4px 0;">🛡️ Proposal Action & Admin PIN Audit Trail</h3>
        <p class="muted small" style="margin:0 0 12px 0;">Complete tamper-evident log recording admin identity, date, time, and authorized actions.</p>

        <div class="scroll">
          <table class="table" style="width:100%;font-size:13px;margin:0;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th>Action Performed</th>
                <th>Admin Identity</th>
                <th>Role</th>
                <th>Date & Time</th>
                <th>PIN Verified</th>
                <th>Content Hash</th>
                <th>Notes / Memo</th>
              </tr>
            </thead>
            <tbody>
              ${!(p.approvalHistory && p.approvalHistory.length) ? `
                <tr><td colspan="7" class="muted" style="text-align:center;padding:18px;">No audit events recorded yet.</td></tr>
              ` : p.approvalHistory.slice().reverse().map(ev => `
                <tr>
                  <td><strong style="color:var(--text-1);">${escapeHtml(ev.action)}</strong></td>
                  <td>${escapeHtml(ev.adminName)} <span class="muted small">(${escapeHtml(ev.adminEmail || 'admin')})</span></td>
                  <td><span class="badge gray">${escapeHtml(ev.adminRole || 'admin')}</span></td>
                  <td style="white-space:nowrap;">${fmtDateTime(ev.timestamp)}</td>
                  <td>${ev.pinVerified ? '<span class="badge green">🔐 Verified</span>' : '<span class="badge gray">—</span>'}</td>
                  <td><code style="font-size:11px;background:var(--bg-elevated);padding:2px 4px;border-radius:4px;">${escapeHtml((ev.hash || '').slice(0, 8))}</code></td>
                  <td class="muted small">${escapeHtml(ev.note || '—')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind Preview Document
    const prevBtn = el.querySelector('#ps-step6-preview-btn');
    if (prevBtn) {
      prevBtn.onclick = () => this.showPreviewModal();
    }

    // Bind Employee Submit for Approval
    const empSubmitBtn = el.querySelector('#ps-btn-emp-submit');
    if (empSubmitBtn) {
      empSubmitBtn.onclick = async () => {
        try {
          empSubmitBtn.disabled = true;
          empSubmitBtn.textContent = 'Submitting…';
          await apiPost(`/proposals/${p._id}/request-approval`, {
            note: `Submitted by ${this.currentUser.name || 'team member'}`
          });
          flashToast('Submitted to Admin for review & PIN sign-off! ⏳');
          const updated = await apiGet(`/proposals/${p._id}`);
          this.activeProposal = updated;
          this.renderProposalEditor(this.container.querySelector('#ps-view-content'));
        } catch (err) {
          alert(err.message);
          empSubmitBtn.disabled = false;
          empSubmitBtn.textContent = '📤 Submit for Admin Approval';
        }
      };
    }

    // Bind Approve with PIN (Admin only)
    const approveBtn = el.querySelector('#ps-btn-approve-pin') || el.querySelector('#ps-btn-reauthorize-pin');
    if (approveBtn) {
      approveBtn.onclick = async () => {
        if (!p._id || p._id === 'undefined') {
          await this.saveActiveProposal(true);
        }
        this.showAdminPinModal(this.activeProposal || p, 'Approved with Admin PIN', () => {
          this.renderProposalEditor(this.container.querySelector('#ps-view-content'));
        });
      };
    }

    // Bind Release with PIN (Admin only)
    const releaseBtn = el.querySelector('#ps-btn-release-pin');
    if (releaseBtn) {
      releaseBtn.onclick = async () => {
        if (!p._id || p._id === 'undefined') {
          await this.saveActiveProposal(true);
        }
        this.showAdminPinModal(this.activeProposal || p, 'Released to Client with Admin PIN', () => {
          this.renderProposalEditor(this.container.querySelector('#ps-view-content'));
        }, true);
      };
    }

    const sendClientDirectBtn = el.querySelector('#ps-step6-send-client-btn');
    if (sendClientDirectBtn) {
      sendClientDirectBtn.onclick = async () => {
        try {
          sendClientDirectBtn.disabled = true;
          sendClientDirectBtn.textContent = 'Sending…';
          const res = await apiPost(`/proposals/${p._id}/send-to-client`);
          flashToast('Proposal sent to client! 📤');
          const clientUrl = `${window.location.origin}/proposal?p=${res.shareId || res.proposal?.shareId}`;
          navigator.clipboard.writeText(clientUrl).catch(() => {});
          alert(`Proposal successfully sent to client!\n\nDirect review link:\n${clientUrl}\n\n(Link copied to clipboard)`);
          const updated = await apiGet(`/proposals/${p._id}`);
          this.activeProposal = updated;
          this.renderProposalEditor(this.container.querySelector('#ps-view-content'));
        } catch (err) {
          alert('Failed to send to client: ' + err.message);
          sendClientDirectBtn.disabled = false;
          sendClientDirectBtn.textContent = '📤 Send to Client';
        }
      };
    }

    // Copy link button
    const copyBtn = el.querySelector('#ps-copy-link-btn');
    if (copyBtn) {
      copyBtn.onclick = async () => {
        const inp = el.querySelector('#ps-share-link-input');
        if (inp) {
          inp.select();
          try {
            await navigator.clipboard.writeText(inp.value);
            copyBtn.textContent = 'Copied ✓';
            setTimeout(() => copyBtn.textContent = '📋 Copy Link', 2000);
          } catch (e) {
            alert('Press Ctrl+C to copy: ' + inp.value);
          }
        }
      };
    }

    // Step 6 Direct Download buttons (Offline / Non-Portal Client)
    const dlPdfBtn = el.querySelector('#ps-step6-dl-pdf');
    if (dlPdfBtn) {
      dlPdfBtn.onclick = async () => {
        await exportPdfDoc(p, this.rateDoc?.settings, dlPdfBtn);
      };
    }

    const dlWordBtn = el.querySelector('#ps-step6-dl-word');
    if (dlWordBtn) {
      dlWordBtn.onclick = async () => {
        await exportWordDocx(p, this.rateDoc?.settings, dlWordBtn);
      };
    }

    const copyPdfLinkBtn = el.querySelector('#ps-step6-copy-pdf-link');
    if (copyPdfLinkBtn) {
      copyPdfLinkBtn.onclick = async () => {
        const directPdfUrl = `${window.location.origin}/proposal?p=${p.shareId}&dl=pdf`;
        try {
          await navigator.clipboard.writeText(directPdfUrl);
          copyPdfLinkBtn.textContent = 'Copied ✓';
          setTimeout(() => copyPdfLinkBtn.textContent = '🔗 Copy Direct PDF Link', 2000);
        } catch (e) {
          prompt('Direct PDF Download Link:', directPdfUrl);
        }
      };
    }
  }

  /* ─────────────────────────────────────────────────────────────
     ADMIN PIN / PASSCODE MODAL DIALOG
     ───────────────────────────────────────────────────────────── */
  showAdminPinModal(proposal, defaultAction = 'Approved with Admin PIN', onComplete, isRelease = false) {
    const user = getUser() || { name: 'Admin', email: 'admin@ci360.local', role: 'superadmin' };

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px;';

    modal.innerHTML = `
      <div class="card ps-pin-modal" style="width:100%;max-width:440px;padding:26px;box-shadow:var(--shadow-xl);border:1px solid var(--border-sm);animation:modalFade 0.2s ease;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg, #0F2A4A, #1E4A7E);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">
            🔐
          </div>
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Admin PIN Authorization</h3>
            <p class="muted small" style="margin:2px 0 0 0;">Internal Sign-off & Release Gate</p>
          </div>
        </div>

        <div style="background:var(--bg-elevated);border-radius:var(--r-md);padding:12px 14px;margin-bottom:16px;font-size:13px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="muted">Proposal:</span>
            <strong>${escapeHtml(proposal.ref)}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="muted">Client:</span>
            <strong>${escapeHtml(proposal.client || 'Client')}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span class="muted">Approving Admin:</span>
            <span><strong>${escapeHtml(user.name)}</strong> (${escapeHtml(user.email || 'admin')})</span>
          </div>
        </div>

        <form id="ps-pin-form">
          <div style="margin-bottom:14px;">
            <label class="label" style="font-weight:700;">Enter Secure Admin PIN / Passcode</label>
            <div style="position:relative;">
              <input type="password" id="ps-modal-pin-input" class="input" style="font-size:22px;letter-spacing:6px;text-align:center;padding:12px;font-family:var(--font-mono);" placeholder="••••" maxlength="8" autocomplete="off" autofocus required>
              <button type="button" id="ps-toggle-pin-visibility" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;font-size:16px;">👁️</button>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <label class="label">Approval Note / Audit Memo (Optional)</label>
            <input type="text" id="ps-modal-note-input" class="input" placeholder="e.g. Scope & commercials verified with management">
          </div>

          <div id="ps-modal-error" style="color:var(--red-500);font-size:13px;margin-bottom:12px;display:none;"></div>

          <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button type="button" class="btn" id="ps-modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn gold" id="ps-modal-submit-btn" style="font-weight:700;">
              Authorize & Sign
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.append(modal);

    const pinInput = modal.querySelector('#ps-modal-pin-input');
    const noteInput = modal.querySelector('#ps-modal-note-input');
    const errorDiv = modal.querySelector('#ps-modal-error');
    const toggleBtn = modal.querySelector('#ps-toggle-pin-visibility');
    const cancelBtn = modal.querySelector('#ps-modal-cancel-btn');
    const form = modal.querySelector('#ps-pin-form');

    pinInput.focus();

    toggleBtn.onclick = () => {
      pinInput.type = pinInput.type === 'password' ? 'text' : 'password';
    };

    cancelBtn.onclick = () => modal.remove();

    form.onsubmit = async (e) => {
      e.preventDefault();
      const enteredPin = pinInput.value.trim();
      const enteredNote = noteInput.value.trim();

      if (!enteredPin) {
        errorDiv.textContent = 'Please enter your Admin PIN';
        errorDiv.style.display = 'block';
        return;
      }

      const submitBtn = modal.querySelector('#ps-modal-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying PIN…';
      errorDiv.style.display = 'none';

      try {
        let targetId = proposal._id || this.activeProposal?._id;
        if (!targetId || targetId === 'undefined') {
          submitBtn.textContent = 'Saving proposal…';
          if (this.activeProposal && (!this.activeProposal.client || !this.activeProposal.client.trim())) {
            this.activeProposal.client = 'Client';
          }
          await this.saveActiveProposal(true);
          targetId = this.activeProposal?._id;
          if (targetId) {
            proposal._id = targetId;
            Object.assign(proposal, this.activeProposal);
          }
        }

        if (!targetId || targetId === 'undefined') {
          throw new Error('Please ensure proposal is saved before authorizing.');
        }

        submitBtn.textContent = 'Verifying PIN…';
        const endpoint = isRelease ? `/proposals/${targetId}/release` : `/proposals/${targetId}/approve`;
        const res = await apiPost(endpoint, {
          pin: enteredPin,
          note: enteredNote,
          action: defaultAction
        });

        // Update proposal in memory
        if (res.proposal) {
          Object.assign(proposal, res.proposal);
          if (this.activeProposal) Object.assign(this.activeProposal, res.proposal);
          const idx = this.proposals.findIndex(x => x._id === res.proposal._id);
          if (idx >= 0) this.proposals[idx] = res.proposal;
          else this.proposals.unshift(res.proposal);
        }

        modal.remove();
        alert(`✅ Action Authorized!\nProposal ${proposal.ref} has been officially recorded and approved with Admin PIN.`);
        if (typeof onComplete === 'function') onComplete();
      } catch (err) {
        errorDiv.textContent = err.message || 'Incorrect Admin PIN / Passcode';
        errorDiv.style.display = 'block';
        pinInput.select();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Authorize & Sign';
      }
    };
  }

  /* ─────────────────────────────────────────────────────────────
     VIEW 3: RATE CARD & PACKAGES MANAGER
     ───────────────────────────────────────────────────────────── */
  renderRateCardView(el) {
    if (!this.rateDoc) return;
    const items = this.rateDoc.items || [];
    const packages = this.rateDoc.packages || [];

    el.innerHTML = `
      <div class="card" style="margin-bottom:18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Rate Card Catalog & Pre-configured Packages</h3>
            <p class="muted small" style="margin:2px 0 0 0;">All proposal lines price from these standard deliverables and packages. Pricing in INR and USD.</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn small primary" id="ps-save-ratecard-btn">Save Rate Card Changes</button>
          </div>
        </div>
      </div>

      <!-- Packages Section -->
      <div class="card" style="margin-bottom:18px;">
        <h3 style="font-size:16px;font-weight:700;margin:0 0 12px 0;">Standard Service Packages (${packages.length})</h3>
        <div class="grid grid-2">
          ${packages.map(k => `
            <div class="card" style="background:var(--bg-elevated);border:1px solid var(--border-sm);padding:14px;margin:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
                <strong style="font-size:15px;color:var(--text-1);">${escapeHtml(k.service)}</strong>
                <span class="badge ${k.billing === 'monthly' ? 'blue' : 'green'}">${escapeHtml(k.billing)}</span>
              </div>
              <p class="small muted" style="margin:0 0 8px 0;">${escapeHtml(k.desc)}</p>
              <div style="font-size:12.5px;color:var(--text-2);">
                <span>Discount: <strong>${k.packDisc}%</strong></span> •
                <span>Components: <strong>${k.components.length} items</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- All Deliverable Services -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div style="padding:14px 18px;background:var(--bg-elevated);display:flex;align-items:center;justify-content:space-between;">
          <strong style="font-size:15px;color:var(--text-1);">All Rate Card Services (${items.length} items)</strong>
          <input type="text" class="input" id="ps-rate-filter" placeholder="Filter items..." style="max-width:240px;height:32px;font-size:13px;">
        </div>
        <div class="scroll">
          <table class="table" style="width:100%;font-size:13px;margin:0;" id="ps-rate-table">
            <thead>
              <tr style="background:var(--bg-card);">
                <th>Category</th>
                <th>Service Name</th>
                <th>Unit</th>
                <th style="text-align:right;">INR (₹)</th>
                <th style="text-align:right;">USD ($)</th>
                <th>Inclusions</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(r => `
                <tr data-rate-row="${escapeHtml((r.service + ' ' + r.category).toLowerCase())}">
                  <td><span class="badge gray">${escapeHtml(r.category)}</span></td>
                  <td><strong>${escapeHtml(r.service)}</strong></td>
                  <td class="muted">${escapeHtml(r.unit)}</td>
                  <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums;">${fmtINR(r.inr)}</td>
                  <td style="text-align:right;font-variant-numeric:tabular-nums;">$${r.usd || 0}</td>
                  <td class="muted small" style="max-width:320px;">${escapeHtml(r.inc)}</td>
                  <td>${r.tag ? `<span class="badge blue">${escapeHtml(r.tag)}</span>` : '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const filterInput = el.querySelector('#ps-rate-filter');
    if (filterInput) {
      filterInput.oninput = () => {
        const q = filterInput.value.toLowerCase().trim();
        el.querySelectorAll('tr[data-rate-row]').forEach(tr => {
          tr.style.display = !q || tr.dataset.rateRow.includes(q) ? '' : 'none';
        });
      };
    }

    const saveBtn = el.querySelector('#ps-save-ratecard-btn');
    if (saveBtn) {
      saveBtn.onclick = async () => {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving…';
        try {
          await apiPut('/proposals/ratecard', this.rateDoc);
          alert('Rate card updated successfully!');
        } catch (e) {
          alert('Error: ' + e.message);
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = 'Save Rate Card Changes';
        }
      };
    }
  }

  /* ─────────────────────────────────────────────────────────────
     VIEW 4: ALL PROPOSALS ADMIN PIN AUDIT TRAIL
     ───────────────────────────────────────────────────────────── */
  renderAuditTrailView(el) {
    const allAudits = [];
    this.proposals.forEach(p => {
      (p.approvalHistory || []).forEach(ev => {
        allAudits.push({ ...ev, proposalRef: p.ref, proposalClient: p.client, proposalId: p._id });
      });
    });

    allAudits.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    el.innerHTML = `
      <div class="card" style="margin-bottom:18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">🔐 System-wide Admin PIN Authorization Audit Trail</h3>
            <p class="muted small" style="margin:2px 0 0 0;">Complete security register recording admin identity, date, time, and proposal actions.</p>
          </div>
          <button class="btn small" id="ps-refresh-audit-btn">🔄 Refresh Log</button>
        </div>
      </div>

      <div class="card" style="padding:0;overflow:hidden;">
        <div class="scroll">
          <table class="table" style="width:100%;font-size:13px;margin:0;">
            <thead>
              <tr style="background:var(--bg-elevated);">
                <th>Date & Time</th>
                <th>Admin Name & Identity</th>
                <th>Role</th>
                <th>Proposal & Client</th>
                <th>Action Taken</th>
                <th>PIN Gate Status</th>
                <th>Content Fingerprint</th>
                <th>Notes / Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${allAudits.length === 0 ? `
                <tr><td colspan="8" class="muted" style="text-align:center;padding:36px;">No admin PIN actions logged yet. Authorize a proposal to create an audit record.</td></tr>
              ` : allAudits.map(ev => `
                <tr>
                  <td style="white-space:nowrap;font-weight:600;">${fmtDateTime(ev.timestamp)}</td>
                  <td>
                    <strong>${escapeHtml(ev.adminName)}</strong>
                    <div class="muted small">${escapeHtml(ev.adminEmail || 'admin')}</div>
                  </td>
                  <td><span class="badge gray">${escapeHtml(ev.adminRole || 'superadmin')}</span></td>
                  <td>
                    <strong>${escapeHtml(ev.proposalClient)}</strong>
                    <div class="muted small">${escapeHtml(ev.proposalRef)}</div>
                  </td>
                  <td><span class="badge blue">${escapeHtml(ev.action)}</span></td>
                  <td>
                    ${ev.pinVerified ? '<span class="badge green">🔐 PIN Verified</span>' : '<span class="badge gray">Standard</span>'}
                  </td>
                  <td>
                    <code style="font-size:11px;background:var(--bg-elevated);padding:2px 5px;border-radius:4px;">${escapeHtml((ev.hash || '').slice(0, 8))}</code>
                  </td>
                  <td class="muted small">${escapeHtml(ev.note || '—')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    el.querySelector('#ps-refresh-audit-btn').onclick = () => this.init();
  }

  /* ─────────────────────────────────────────────────────────────
     VIEW 5: SETTINGS & ADMIN PIN MANAGEMENT
     ───────────────────────────────────────────────────────────── */
  renderSettingsView(el) {
    const s = (this.rateDoc && this.rateDoc.settings) || {};

    el.innerHTML = `
      <!-- Admin PIN Configuration Card -->
      <div class="card" style="margin-bottom:18px;border-top:3px solid var(--brand-600);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="font-size:26px;">🔐</span>
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Admin Approval PIN / Passcode Configuration</h3>
            <p class="muted small" style="margin:2px 0 0 0;">Secure PIN entered by the administrator before any proposal can be approved, finalized, or released.</p>
          </div>
        </div>

        <div style="background:var(--bg-elevated);padding:14px 18px;border-radius:var(--r-md);margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--text-1);">
                Current Status: ${this.pinStatus.isConfigured ? '<span style="color:var(--green-600);">Custom PIN Active ✓</span>' : '<span style="color:var(--amber-600);">Default Initial PIN Active (3600)</span>'}
              </div>
              <div class="muted small" style="margin-top:2px;">
                ${this.pinStatus.lastUpdated ? `Last updated: ${fmtDateTime(this.pinStatus.lastUpdated)} by ${escapeHtml(this.pinStatus.updatedBy || 'Admin')}` : 'Using default startup PIN: 3600'}
              </div>
            </div>
            <button class="btn gold" id="ps-change-pin-toggle-btn">Set / Change Admin PIN</button>
          </div>
        </div>

        <div id="ps-change-pin-panel" style="display:none;padding:16px;border:1px solid var(--border-sm);border-radius:var(--r-md);background:var(--bg-card);margin-top:12px;">
          <h4 style="margin:0 0 12px 0;font-size:15px;color:var(--text-1);">Update Admin Approval PIN</h4>
          <form id="ps-update-pin-form" style="max-width:360px;">
            <div style="margin-bottom:12px;">
              <label class="label">Current PIN</label>
              <input type="password" class="input" id="ps-cur-pin" placeholder="${this.pinStatus.isConfigured ? 'Current PIN' : 'Enter 3600'}" required>
            </div>
            <div style="margin-bottom:12px;">
              <label class="label">New PIN (4–8 digits)</label>
              <input type="password" class="input" id="ps-new-pin" placeholder="New secure PIN" minlength="4" maxlength="8" required>
            </div>
            <div style="margin-bottom:14px;">
              <label class="label">Confirm New PIN</label>
              <input type="password" class="input" id="ps-confirm-pin" placeholder="Re-enter new PIN" minlength="4" maxlength="8" required>
            </div>
            <div id="ps-pin-update-err" style="color:var(--red-500);font-size:13px;margin-bottom:10px;display:none;"></div>
            <div style="display:flex;gap:8px;">
              <button type="submit" class="btn primary">Save New PIN</button>
              <button type="button" class="btn" id="ps-cancel-pin-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Company Agency Settings -->
      <div class="card">
        <h3 style="font-size:17px;font-weight:700;margin:0 0 14px 0;">Company Profile & Signatory Defaults</h3>
        <div class="grid grid-2">
          <div>
            <label class="label">Brand Name</label>
            <input type="text" class="input" id="ps-set-name" value="${escapeHtml(s.name)}">
          </div>
          <div>
            <label class="label">Legal Entity Name</label>
            <input type="text" class="input" id="ps-set-legal" value="${escapeHtml(s.legal)}">
          </div>
          <div>
            <label class="label">Signatory Name</label>
            <input type="text" class="input" id="ps-set-signatory" value="${escapeHtml(s.signatory)}">
          </div>
          <div>
            <label class="label">Signatory Designation</label>
            <input type="text" class="input" id="ps-set-signRole" value="${escapeHtml(s.signRole)}">
          </div>
          <div>
            <label class="label">Official Email</label>
            <input type="email" class="input" id="ps-set-email" value="${escapeHtml(s.email)}">
          </div>
          <div>
            <label class="label">GSTIN</label>
            <input type="text" class="input" id="ps-set-gstin" value="${escapeHtml(s.gstin)}">
          </div>
          <div class="span2">
            <label class="label">Registered Address</label>
            <input type="text" class="input" id="ps-set-address" value="${escapeHtml(s.address)}">
          </div>
        </div>
        <div style="margin-top:16px;text-align:right;">
          <button class="btn primary" id="ps-save-settings-btn">Save Company Profile</button>
        </div>
      </div>
    `;

    // Toggle Change PIN
    const toggleBtn = el.querySelector('#ps-change-pin-toggle-btn');
    const pinPanel = el.querySelector('#ps-change-pin-panel');
    const cancelPin = el.querySelector('#ps-cancel-pin-btn');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        pinPanel.style.display = pinPanel.style.display === 'none' ? 'block' : 'none';
      };
    }
    if (cancelPin) {
      cancelPin.onclick = () => {
        pinPanel.style.display = 'none';
      };
    }

    // Submit PIN update
    const pinForm = el.querySelector('#ps-update-pin-form');
    if (pinForm) {
      pinForm.onsubmit = async (e) => {
        e.preventDefault();
        const cur = el.querySelector('#ps-cur-pin').value.trim();
        const n1 = el.querySelector('#ps-new-pin').value.trim();
        const n2 = el.querySelector('#ps-confirm-pin').value.trim();
        const errDiv = el.querySelector('#ps-pin-update-err');

        if (n1 !== n2) {
          errDiv.textContent = 'New PIN and Confirmation PIN do not match';
          errDiv.style.display = 'block';
          return;
        }

        try {
          await apiPost('/proposals/pin/update', { currentPin: cur, newPin: n1 });
          alert('Admin PIN updated successfully!');
          this.init();
        } catch (err) {
          errDiv.textContent = err.message || 'Failed to update PIN';
          errDiv.style.display = 'block';
        }
      };
    }

    // Save company profile
    const saveSetBtn = el.querySelector('#ps-save-settings-btn');
    if (saveSetBtn) {
      saveSetBtn.onclick = async () => {
        s.name = el.querySelector('#ps-set-name').value;
        s.legal = el.querySelector('#ps-set-legal').value;
        s.signatory = el.querySelector('#ps-set-signatory').value;
        s.signRole = el.querySelector('#ps-set-signRole').value;
        s.email = el.querySelector('#ps-set-email').value;
        s.gstin = el.querySelector('#ps-set-gstin').value;
        s.address = el.querySelector('#ps-set-address').value;

        saveSetBtn.disabled = true;
        saveSetBtn.textContent = 'Saving…';
        try {
          await apiPut('/proposals/ratecard', { settings: s });
          alert('Company profile saved successfully!');
        } catch (e) {
          alert('Error: ' + e.message);
        } finally {
          saveSetBtn.disabled = false;
          saveSetBtn.textContent = 'Save Company Profile';
        }
      };
    }
  }
}

export function initProposalStudio(container, options = {}) {
  const controller = new ProposalStudioController(container, options);
  controller.init();
  return controller;
}
