const mongoose = require('mongoose');

const BondingMemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'employee' },
  email: { type: String, default: '' },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const BondingChannelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['direct', 'group'], default: 'group', index: true },
  description: { type: String, default: '' },
  avatar: { type: String, default: '💬' },
  isDefault: { type: Boolean, default: false },
  members: [BondingMemberSchema],
  createdBy: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: 'System' }
  },
  lastMessage: {
    content: { type: String, default: '' },
    senderName: { type: String, default: '' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sentAt: { type: Date, default: Date.now },
    type: { type: String, default: 'text' }
  },
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

BondingChannelSchema.index({ 'members.userId': 1 });
BondingChannelSchema.index({ type: 1, 'members.userId': 1 });

module.exports = mongoose.models.BondingChannel || mongoose.model('BondingChannel', BondingChannelSchema);
