const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  clientName: { type: String, default: '', trim: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', default: null },
  invoiceNumber: { type: String, default: '', trim: true },
  amount: { type: Number, required: true, min: 1 },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'upi', 'cheque', 'card', 'cash', 'other'],
    default: 'bank_transfer'
  },
  referenceId: { type: String, default: '', trim: true }, // UTR, Cheque #, Transaction ID
  receiptUrl: { type: String, default: '' },
  status: {
    type: String,
    enum: ['completed', 'pending_clearance', 'bounced', 'refunded'],
    default: 'completed'
  },
  notes: { type: String, default: '' },
  recordedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  recordedByName: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
