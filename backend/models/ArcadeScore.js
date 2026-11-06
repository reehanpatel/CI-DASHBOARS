const mongoose = require('mongoose');

const ArcadeScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  userName: { type: String, required: true },
  userRole: { type: String, default: 'employee' },
  gameId: {
    type: String,
    enum: ['snake', '2048', 'memory'],
    required: true,
    index: true
  },
  gameTitle: { type: String, required: true },
  score: { type: Number, required: true, index: -1 },
  metrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

ArcadeScoreSchema.index({ gameId: 1, score: -1 });

module.exports = mongoose.models.ArcadeScore || mongoose.model('ArcadeScore', ArcadeScoreSchema);

