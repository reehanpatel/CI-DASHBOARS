const mongoose = require('mongoose');

// Only min/max band is ever stored — no individual salary figure exists anywhere.
const SalaryGradeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.models.SalaryGrade || mongoose.model('SalaryGrade', SalaryGradeSchema);
