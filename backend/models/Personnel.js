const mongoose = require('mongoose');

const PersonnelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  duties: { type: String, default: '' },
  capacity: { type: Number, default: 48 }, // weekly hours, 6-day work week
  status: { type: String, enum: ['active', 'work from home', 'wfh', 'on leave', 'pn leave'], default: 'active' },
  attachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    category: { type: String, default: 'Document' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedByName: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Personnel || mongoose.model('Personnel', PersonnelSchema);
