const mongoose = require('mongoose');

const GameInvitationSchema = new mongoose.Schema({
  gameType: {
    type: String,
    enum: ['chess', 'tictactoe', 'connectfour'],
    required: true
  },
  gameTitle: { type: String, required: true },
  sender: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'employee' },
    email: { type: String, default: '' }
  },
  recipient: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'employee' },
    email: { type: String, default: '' }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'cancelled', 'expired'],
    default: 'pending',
    index: true
  },
  matchSettings: {
    timerMode: { type: String, enum: ['3m', '5m', 'none'], default: 'none' }
  },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'BondingChannel', default: null },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameMatch', default: null },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 60 * 1000) },
  respondedAt: { type: Date, default: null }
}, { timestamps: true });

GameInvitationSchema.index({ 'recipient.userId': 1, status: 1 });
GameInvitationSchema.index({ 'sender.userId': 1, status: 1 });

module.exports = mongoose.models.GameInvitation || mongoose.model('GameInvitation', GameInvitationSchema);
