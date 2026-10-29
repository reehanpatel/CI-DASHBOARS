const mongoose = require('mongoose');

const GameMatchSchema = new mongoose.Schema({
  invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameInvitation' },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'BondingChannel', default: null },
  gameType: {
    type: String,
    enum: ['chess', 'tictactoe', 'connectfour'],
    required: true
  },
  gameTitle: { type: String, required: true },
  player1: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'employee' },
    assignedRole: { type: String, required: true } // 'white', 'X', 'red'
  },
  player2: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'employee' },
    assignedRole: { type: String, required: true } // 'black', 'O', 'yellow'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'resigned', 'draw', 'abandoned'],
    default: 'active',
    index: true
  },
  turn: { type: String, required: true }, // 'white'|'black', 'X'|'O', 'red'|'yellow'
  currentTurnUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameState: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  matchSettings: {
    timerMode: { type: String, enum: ['3m', '5m', 'none'], default: 'none' },
    p1TimeRemaining: { type: Number, default: 0 },
    p2TimeRemaining: { type: Number, default: 0 },
    lastMoveTime: { type: Date, default: Date.now }
  },
  moves: [{
    moveNum: { type: Number },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    playerRole: { type: String },
    moveData: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now }
  }],
  drawOfferedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  winnerName: { type: String, default: '' },
  winnerRole: { type: String, default: '' },
  winningReason: { type: String, default: '' },
  winningCells: [{ type: mongoose.Schema.Types.Mixed }], // For highlighting winning 3 or 4 line in TTT / Connect 4
  completedAt: { type: Date, default: null }
}, { timestamps: true });

GameMatchSchema.index({ 'player1.userId': 1, status: 1 });
GameMatchSchema.index({ 'player2.userId': 1, status: 1 });
GameMatchSchema.index({ status: 1, updatedAt: -1 });

module.exports = mongoose.models.GameMatch || mongoose.model('GameMatch', GameMatchSchema);
