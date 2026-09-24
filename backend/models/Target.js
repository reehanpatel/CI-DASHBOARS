const mongoose = require('mongoose');

const TargetSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  quantity: { type: Number, default: 1 },
  unit: { type: String, default: 'count' }, // Supports custom units like reels, stories, banners, shorts, etc.
  period: { type: String, enum: ['day', 'week', 'month'], default: 'day' },
  completed: { type: Number, default: 0 }, // Employee logged completed amount
  attachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    notes: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

module.exports = mongoose.models.Target || mongoose.model('Target', TargetSchema);
