const mongoose = require('mongoose');

const GameStatSchema = new mongoose.Schema({
  played: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 }
}, { _id: false });

const BondingScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  userName: { type: String, required: true },
  userRole: { type: String, default: 'employee' },
  points: { type: Number, default: 0, index: -1 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  chessRating: { type: Number, default: 1200 },
  gameStats: {
    chess: { type: GameStatSchema, default: () => ({}) },
    tictactoe: { type: GameStatSchema, default: () => ({}) },
    connectfour: { type: GameStatSchema, default: () => ({}) }
  },
  badges: [{ type: String }],
  lastPlayedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.BondingScore || mongoose.model('BondingScore', BondingScoreSchema);
