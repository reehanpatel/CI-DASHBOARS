const mongoose = require('mongoose');

const SystemSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  value: { type: mongoose.Schema.Types.Mixed, default: {} },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.SystemSetting || mongoose.model('SystemSetting', SystemSettingSchema);
