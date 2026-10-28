const mongoose = require('mongoose');

const RateCardItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  category: { type: String, default: 'Other' },
  service: { type: String, required: true },
  unit: { type: String, default: 'item' },
  inr: { type: Number, default: 0 },
  usd: { type: Number, default: 0 },
  inc: { type: String, default: '' },
  exc: { type: String, default: '' },
  note: { type: String, default: '' },
  tag: { type: String, default: '' },
  slabs: { type: [[Number]], default: [] }
}, { _id: false });

const RateCardPackageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  service: { type: String, required: true },
  billing: { type: String, enum: ['monthly', 'one-time'], default: 'monthly' },
  desc: { type: String, default: '' },
  exc: { type: String, default: '' },
  packDisc: { type: Number, default: 0 },
  mult: { type: Number, default: 1 },
  multLabel: { type: String, default: 'brands' },
  components: [{
    rateId: { type: String, required: true },
    qty: { type: Number, default: 1 }
  }]
}, { _id: false });

const ProposalRateCardSchema = new mongoose.Schema({
  key: { type: String, default: 'main', unique: true },
  items: [RateCardItemSchema],
  packages: [RateCardPackageSchema],
  settings: {
    name: { type: String, default: 'CI360 Degrees' },
    legal: { type: String, default: 'Cognitio Innovo Pvt. Ltd.' },
    address: { type: String, default: '' },
    gstin: { type: String, default: '' },
    signatory: { type: String, default: 'Pramit Ghosh' },
    signRole: { type: String, default: 'Founder & CEO' },
    email: { type: String, default: 'pramit.ghosh@ci360degrees.com' },
    phone: { type: String, default: '' },
    website: { type: String, default: 'ci360degrees.com' },
    baseLink: { type: String, default: '' },
    about: { type: String, default: '' },
    paymentNotes: { type: String, default: '' },
    retainerIncl: { type: [String], default: [] },
    termSlabs: { type: [[Number]], default: [[3, 0], [6, 5], [12, 10]] },
    defaultChoices: { type: [mongoose.Schema.Types.Mixed], default: [] },
    needsByTag: { type: mongoose.Schema.Types.Mixed, default: {} },
    team: { type: [mongoose.Schema.Types.Mixed], default: [] },
    termsLib: { type: [mongoose.Schema.Types.Mixed], default: [] }
  }
}, { timestamps: true });

module.exports = mongoose.models.ProposalRateCard || mongoose.model('ProposalRateCard', ProposalRateCardSchema);
