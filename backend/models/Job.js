const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
  percent: { type: Number, default: 0 },   // % of job revenue credited to this person
  hours: { type: Number, default: 0 },     // hours actually spent
}, { _id: false });

const JobSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  serviceNames: [{ type: String }],
  date: { type: Date, required: true },
  completionDate: { type: Date, default: null }, // Expected End Date
  status: { type: String, enum: ['In Progress', 'Completed', 'Needs Revision'], default: 'In Progress' }, // Completion status
  value: { type: Number, default: 0 },
  description: { type: String, default: '' },
  priority: { type: String, enum: ['Medium', 'High', 'Urgent'], default: 'Medium' },
  preferredPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', default: null },
  preferredPersonName: { type: String, default: '' },
  assignments: [AssignmentSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  attachments: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    uploadedBy: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  deliverables: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    notes: { type: String, default: '' },
    uploadedBy: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  clientApproval: {
    status: { type: String, enum: ['Pending', 'Approved', 'Revision Requested'], default: 'Pending' },
    approvedAt: { type: Date, default: null },
    approvedBy: { type: String, default: '' },
    feedback: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: null },
    revisions: [{
      requestedAt: { type: Date, default: Date.now },
      requestedBy: { type: String, default: '' },
      feedback: { type: String, default: '' },
      attachments: [{
        name: { type: String },
        url: { type: String },
        size: { type: Number, default: 0 },
        type: { type: String, default: '' }
      }]
    }]
  }
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
