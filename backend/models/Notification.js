const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    default: 'general'
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null },
  targetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Target', default: null },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  read: { type: Boolean, default: false },
  attachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' }
  }],
}, { timestamps: true });

module.exports = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
