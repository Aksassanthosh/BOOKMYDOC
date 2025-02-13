const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' }, // Ensure 'patient' is included
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
