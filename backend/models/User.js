const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'employee', 'client'], required: true },
  // Link an employee login to their Personnel record
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', default: null },
  // Link a client login to their Client record
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
