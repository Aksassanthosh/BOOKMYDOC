const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  doctorId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  specialization: { type: String, required: true },
  role: { type: String, default: "doctor" },
  availableDays: {
    type: [String],  // Array of available days (e.g., ["Monday", "Tuesday"])
    required: true,
  },
 availableSlots: {
    type: [
      {
        day: { type: String, required: true },
        slots: { type: [String], required: true }
      }
    ],
    required: true
  },


  bookedSlots: [
    {
      day: { type: String, required: true }, // Day of the week
      slots: { type: [String], required: true } // Booked time slots
    }
  ]}, { strict: 'throw' });


module.exports = mongoose.model("doctor", DoctorSchema);
