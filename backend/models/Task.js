const mongoose = require('mongoose');

const ChecklistItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { _id: true });

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', default: null },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  status: { 
    type: String, 
    enum: ['Todo', 'In Progress', 'Review', 'Completed'], 
    default: 'Todo' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Urgent'], 
    default: 'Medium' 
  },
  dueDate: { type: Date, default: null },
  category: { type: String, default: 'General', trim: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null },
  checklists: [ChecklistItemSchema],
  timeSpent: { type: Number, default: 0 },
  tags: [{ type: String, trim: true }],
  completedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
