const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  reason: { type: String, required: true },
  doctor: { type: String, required: true },
  specialization: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
