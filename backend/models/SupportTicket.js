const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
  jobId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null, required: false },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userRole: { type: String, required: true },
  subject:  { type: String, required: true, trim: true },
  message:  { type: String, required: true, trim: true },
  priority: { type: String, enum: ['Low','Medium','High','Urgent'], default: 'Medium' },
  status:   { type: String, enum: ['Open','In Review','Resolved','Closed'], default: 'Open' },
  adminReply: { type: String, default: '' },
  repliedAt:  { type: Date, default: null },
  attachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  adminAttachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.models.SupportTicket || mongoose.model('SupportTicket', SupportTicketSchema);
