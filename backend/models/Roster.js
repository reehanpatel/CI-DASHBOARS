const mongoose = require('mongoose');

const RosterSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  nature: { type: String, enum: ['Existing', 'Prospect'], default: 'Existing' },
  roles: {
    strategy: { type: String, default: '' },
    cs: { type: String, default: '' },
    website: { type: String, default: '' },
    design: { type: String, default: '' },
    copy: { type: String, default: '' },
    edit: { type: String, default: '' },
    shoot: { type: String, default: '' },
    seo: { type: String, default: '' },
    smo: { type: String, default: '' },
    qc: { type: String, default: '' },
  },
  difficulty: { type: Number, min: 1, max: 10, default: 5 },
  comments: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Roster || mongoose.model('Roster', RosterSchema);
