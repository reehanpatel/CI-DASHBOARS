const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number, default: 0 },
  type: { type: String, default: '' },
  uploadedBy: { type: String, default: 'Staff' },
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const LinkSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, default: '', trim: true },
  url: { type: String, required: true, trim: true },
  addedBy: { type: String, default: 'Staff' },
  addedAt: { type: Date, default: Date.now }
}, { _id: false });

const SubtaskSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  assignedTo: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, default: '' },
    avatar: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null }
}, { _id: false });

const LinkedTicketSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  ticketId: { type: String, required: true }, // e.g. SUP-002
  ticketDocId: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportTicket', default: null },
  relationship: {
    type: String,
    enum: ['relates to', 'blocks', 'is blocked by', 'duplicates'],
    default: 'relates to'
  },
  title: { type: String, default: '' },
  status: { type: String, default: 'To Do' }
}, { _id: false });

const CommentSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userRole: { type: String, default: 'employee' },
  userAvatar: { type: String, default: '' },
  content: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, { _id: false });

const HistoryEventSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  userName: { type: String, default: 'System' },
  field: { type: String, required: true },
  from: { type: String, default: '' },
  to: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const WorkLogSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  timeSpent: { type: String, required: true }, // e.g. "2h 30m"
  hours: { type: Number, default: 0 },
  description: { type: String, default: '' },
  loggedAt: { type: Date, default: Date.now }
}, { _id: false });

const SupportTicketSchema = new mongoose.Schema({
  // Jira-style unique ID, e.g. SUP-001, SUP-002
  ticketId: { type: String, required: true, unique: true, index: true, uppercase: true },

  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },

  category: {
    type: String,
    enum: ['Bug', 'Feature', 'Task', 'Internal', 'Infrastructure', 'Client Request', 'General'],
    default: 'Task',
    index: true
  },

  // 5 Jira Scrum status columns
  status: {
    type: String,
    enum: ['To Do', 'Content', 'Creative', 'Under Review', 'Ready to Leave', 'In Progress', 'Resolved', 'Closed'],
    default: 'To Do',
    index: true
  },

  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
    index: true
  },

  // Reporter (creator of ticket)
  reporter: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'employee' },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' }
  },

  // Assignee (primary)
  assignee: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, default: 'Unassigned' },
    role: { type: String, default: '' },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' }
  },

  // Multiple Assignees (team collaboration)
  assignees: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' }
  }],

  // Optional link to internal job / project
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null },
  jobTitle: { type: String, default: '' },

  dueDate: { type: Date, default: null },
  estimatedHours: { type: Number, default: 0 },
  loggedHours: { type: Number, default: 0 },

  linkUrl: { type: String, default: '', trim: true },
  links: [LinkSchema],
  attachments: [AttachmentSchema],
  subtasks: [SubtaskSchema],
  linkedTickets: [LinkedTicketSchema],
  comments: [CommentSchema],
  history: [HistoryEventSchema],
  workLogs: [WorkLogSchema],

  resolvedAt: { type: Date, default: null },
  closedAt: { type: Date, default: null },

  // Backwards compatibility fields for legacy code
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  userRole: { type: String },
  subject: { type: String },
  message: { type: String },
  adminReply: { type: String, default: '' },
  repliedAt: { type: Date, default: null },
  adminAttachments: [AttachmentSchema]
}, { timestamps: true });

// Auto-sync legacy fields and assignees before saving
SupportTicketSchema.pre('save', function (next) {
  // Sync assignees array and primary assignee
  if (Array.isArray(this.assignees) && this.assignees.length > 0) {
    this.assignee = this.assignees[0];
  } else if (this.assignee && this.assignee.userId) {
    this.assignees = [this.assignee];
  } else {
    this.assignee = { userId: null, name: 'Unassigned', role: '', email: '', avatar: '' };
    this.assignees = [];
  }

  if (this.reporter && this.reporter.userId) {
    this.userId = this.reporter.userId;
    this.userName = this.reporter.name;
    this.userRole = this.reporter.role;
  }
  if (this.title && !this.subject) {
    this.subject = this.title;
  }
  if (this.description && !this.message) {
    this.message = this.description;
  }
  next();
});

module.exports = mongoose.models.SupportTicket || mongoose.model('SupportTicket', SupportTicketSchema);
