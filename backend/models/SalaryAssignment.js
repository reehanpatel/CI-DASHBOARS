const mongoose = require('mongoose');

const SalaryAssignmentSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true, unique: true },
  gradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalaryGrade', required: true },
}, { timestamps: true });

module.exports = mongoose.models.SalaryAssignment || mongoose.model('SalaryAssignment', SalaryAssignmentSchema);
