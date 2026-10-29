const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  hours: { type: Number, default: 0 }, // reference / informational effort estimate
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedByName: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
