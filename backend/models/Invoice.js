const mongoose = require('mongoose');

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', default: null },
  serviceName: { type: String, default: '' },
  quantity: { type: Number, default: 1, min: 0 },
  rate: { type: Number, default: 0, min: 0 },
  amount: { type: Number, required: true, default: 0 }
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  clientName: { type: String, default: '', trim: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  billingPeriod: {
    monthYear: { type: String, default: '' },
    from: { type: Date, default: null },
    to: { type: Date, default: null }
  },
  billingType: {
    type: String,
    enum: ['retainer', 'project', 'hourly', 'milestone', 'one_time', 'custom'],
    default: 'retainer'
  },
  status: {
    type: String,
    enum: ['draft', 'issued', 'partially_paid', 'paid', 'overdue', 'cancelled'],
    default: 'issued'
  },
  items: [InvoiceItemSchema],
  subtotal: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 },
  taxRate: { type: Number, default: 18 }, // GST %
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true, default: 0 },
  amountPaid: { type: Number, default: 0 },
  pendingAmount: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  notes: { type: String, default: 'Thank you for partnering with COGNITO INNOVO PRIVATE LIMITED.' },
  paymentTerms: { type: String, default: 'Payment due within 15 days of invoice date.' },
  bankDetails: {
    accountName: { type: String, default: 'COGNITO INNOVO PRIVATE LIMITED' },
    bankName: { type: String, default: 'HDFC Bank' },
    accountNumber: { type: String, default: '50200088992211' },
    ifscCode: { type: String, default: 'HDFC0001234' },
    upiId: { type: String, default: 'cognitoinnovo@hdfcbank' }
  },
  billingAddress: { type: String, default: '' },
  gstin: { type: String, default: '' },
  createdById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdByName: { type: String, default: '' },
}, { timestamps: true });

InvoiceSchema.methods.syncStatus = function() {
  if (this.status === 'cancelled' || this.status === 'draft') return this;
  if (this.pendingAmount <= 0 && this.totalAmount > 0) {
    this.status = 'paid';
  } else if (this.amountPaid > 0) {
    this.status = 'partially_paid';
  } else if (new Date() > new Date(this.dueDate)) {
    this.status = 'overdue';
  } else {
    this.status = 'issued';
  }
  return this;
};

module.exports = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
