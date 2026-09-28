const mongoose = require('mongoose');

const BillingProfileSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, unique: true },
  clientName: { type: String, default: '', trim: true },
  billingType: {
    type: String,
    enum: ['retainer', 'project', 'hourly', 'milestone', 'one_time'],
    default: 'retainer'
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly', 'milestone', 'one_time'],
    default: 'monthly'
  },
  retainerAmount: { type: Number, default: 0, min: 0 },
  hourlyRate: { type: Number, default: 0, min: 0 },
  currency: { type: String, default: 'INR' },
  gstin: { type: String, default: '', trim: true },
  panNumber: { type: String, default: '', trim: true },
  billingEmail: { type: String, default: '', trim: true },
  billingPhone: { type: String, default: '', trim: true },
  billingAddress: { type: String, default: '' },
  billingDay: { type: Number, default: 1, min: 1, max: 31 },
  paymentTermsDays: { type: Number, default: 15, min: 0 },
  status: {
    type: String,
    enum: ['active', 'paused', 'inactive'],
    default: 'active'
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.BillingProfile || mongoose.model('BillingProfile', BillingProfileSchema);
