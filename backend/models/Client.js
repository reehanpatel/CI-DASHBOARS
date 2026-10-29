const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  notes: { type: String, default: '' },
  attachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    category: { type: String, default: 'General' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedByName: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);
