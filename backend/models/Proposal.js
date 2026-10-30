const mongoose = require('mongoose');

const ProposalLineSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rateId: { type: String, default: '' },
  service: { type: String, required: true },
  desc: { type: String, default: '' },
  unit: { type: String, default: 'item' },
  qty: { type: Number, default: 1 },
  rate: { type: Number, default: 0 },
  slabs: { type: [[Number]], default: [] }
}, { _id: false });

const ProposalHeadSchema = new mongoose.Schema({
  id: { type: String, required: true },
  packageId: { type: String, default: null },
  title: { type: String, required: true },
  billing: { type: String, enum: ['monthly', 'one-time'], default: 'monthly' },
  desc: { type: String, default: '' },
  exc: { type: String, default: '' },
  mult: { type: Number, default: 1 },
  multLabel: { type: String, default: 'brands' },
  packDisc: { type: Number, default: 0 },
  fixed: { type: Number, default: 0 },
  lines: [ProposalLineSchema]
}, { _id: false });

const ProposalApprovalEventSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminName: { type: String, required: true },
  adminEmail: { type: String, default: '' },
  adminRole: { type: String, default: 'superadmin' },
  action: { type: String, required: true }, // e.g. "Approved with Admin PIN", "Finalized", "Released to Client", "Returned"
  pinVerified: { type: Boolean, default: true },
  note: { type: String, default: '' },
  hash: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String, default: '' }
}, { _id: false });

const ProposalSchema = new mongoose.Schema({
  ref: { type: String, required: true, trim: true },
  title: { type: String, default: 'Proposal', trim: true },
  subtitle: { type: String, default: '' },
  kicker: { type: String, default: 'Proposal for sign-off' },
  oneLine: { type: String, default: '' },

  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null, index: true },
  client: { type: String, required: true, trim: true },
  clientShort: { type: String, default: '', trim: true },
  contact: { type: String, default: '' },
  contactRole: { type: String, default: '' },
  contactEmail: { type: String, default: '', trim: true },
  industry: { type: String, default: '' },
  location: { type: String, default: '' },

  currency: { type: String, enum: ['INR', 'USD'], default: 'INR' },
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  validity: { type: Number, default: 30 },

  // Internal Brief & AI Context
  brief: { type: String, default: '' },
  briefForm: { type: mongoose.Schema.Types.Mixed, default: {} },
  briefFiles: [{
    name: String,
    at: Number,
    chars: Number
  }],
  services: { type: [String], default: [] },
  tone: { type: String, default: 'Confident and consultative' },

  // Narrative sections
  sections: [{
    id: String,
    title: String,
    body: String
  }],

  // Scope & Heads
  heads: [ProposalHeadSchema],
  retainerIncl: { type: [String], default: [] },
  onRequest: [{
    id: String,
    rateId: String,
    item: String,
    how: String,
    price: String
  }],
  exclusions: { type: String, default: '' },

  // Commercials
  term: { type: Number, default: 6 },
  termDisc: { type: Number, default: 5 },
  discount: { type: Number, default: 0 },
  gst: { type: Number, default: 18 },
  pricingView: { type: String, enum: ['overall', 'heads', 'itemised'], default: 'heads' },

  // Payment Schedules
  retainerPay: { type: String, default: 'm-adv' },
  retainerCustom: { type: String, default: '' },
  projectPay: { type: String, default: '5050' },
  milestones: [{
    pct: Number,
    label: String
  }],

  // Governance & Team
  team: [{
    id: String,
    memberId: String,
    name: String,
    role: String,
    resp: String
  }],
  clientTeam: { type: String, default: '' },
  cadence: { type: String, default: '' },
  escalation: [{
    name: String,
    role: String,
    when: String
  }],

  // Terms, Needs & Choices
  terms: [{
    id: String,
    title: String,
    text: String,
    tag: String,
    on: Boolean
  }],
  clientNeeds: { type: [String], default: [] },
  choices: [{
    id: String,
    label: String,
    options: [String]
  }],
  openItems: [{
    id: String,
    text: String,
    done: Boolean
  }],
  notes: { type: String, default: '' },

  // Approval & Status
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'returned', 'with_client', 'won', 'changes'],
    default: 'draft'
  },
  contentHash: { type: String, default: '' },

  approval: {
    approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approverName: { type: String, default: '' },
    approverEmail: { type: String, default: '' },
    decision: { type: String, enum: ['approved', 'returned', 'pending', null], default: null },
    note: { type: String, default: '' },
    hash: { type: String, default: '' },
    at: { type: Date },
    pinVerified: { type: Boolean, default: false }
  },

  // Immutable Admin PIN Audit Trail
  approvalHistory: [ProposalApprovalEventSchema],

  // Sharing & Client Interactions
  shareId: { type: String, index: true, sparse: true, default: null },
  sharedVersion: { type: Number, default: 0 },
  sharedAt: { type: Date },
  clientResponse: {
    decision: { type: String, enum: ['approved', 'changes', null], default: null },
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    comment: { type: String, default: '' },
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    at: { type: Date },
    version: { type: Number, default: 0 }
  },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedByName: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema);
