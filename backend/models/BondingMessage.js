const mongoose = require('mongoose');

const BondingMessageSchema = new mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'BondingChannel', required: true, index: true },
  sender: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'employee' },
    email: { type: String, default: '' }
  },
  type: {
    type: String,
    enum: ['text', 'challenge', 'system'],
    default: 'text'
  },
  content: { type: String, default: '', trim: true },
  challengeData: {
    gameType: { type: String, enum: ['trivia', 'tictactoe', 'wordle', 'speedtyper', 'memory'], default: 'trivia' },
    gameTitle: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'active', 'completed', 'declined'], default: 'active' },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    targetUserName: { type: String, default: '' },
    challengerScore: { type: Number, default: 0 },
    challengerTime: { type: Number, default: 0 }, // in seconds
    gameState: { type: mongoose.Schema.Types.Mixed, default: {} }, // board, turns, custom payload
    participants: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String },
      score: { type: Number, default: 0 },
      timeSpent: { type: Number, default: 0 },
      details: { type: mongoose.Schema.Types.Mixed },
      completedAt: { type: Date, default: Date.now }
    }],
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    winnerName: { type: String, default: '' },
    winnerScore: { type: Number, default: 0 }
  },
  reactions: [{
    emoji: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }]
}, { timestamps: true });

BondingMessageSchema.index({ channelId: 1, createdAt: 1 });

module.exports = mongoose.models.BondingMessage || mongoose.model('BondingMessage', BondingMessageSchema);
