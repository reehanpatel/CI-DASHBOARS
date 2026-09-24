const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  hours: { type: Number, default: 0 }, // reference / informational effort estimate
}, { timestamps: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
