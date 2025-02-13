const express = require("express");
const Doctor = require("../model/Doctor");
const Appointment = require("../model/booking");
const router = express.Router();

// Helper function to format the date (to remove the time part)
const getCurrentDate = () => new Date().toISOString().split("T")[0];

// Fetch doctor by email
router.get("/doctors/:email", async (req, res) => {
    try {
        const email = req.params.email; // Get email from request parameters

        // Search for the doctor using the email
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(doctor); // Return the doctor data if found
    } catch (error) {
        console.error("Error fetching doctor by email:", error);
        res.status(500).json({ message: "Error fetching doctor", error });
    }
});

// Fetch doctor's schedule using email

// Helper function to format the date (to remove the time part)

// Fetch doctor's schedule using email
// Backend route to fetch doctor's schedule

// Route to update the doctor's schedule
// Helper function to generate slots for a day
// Helper function to generate slots for a day
const generateSlotsForDay = (startTime, endTime) => {
    const slots = [];
    let start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
  
    while (start < end) {
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeSlot);
      start = new Date(start.getTime() + 30 * 60000); // Add 30 minutes to the slot
    }
  
    console.log("Generated slots:", slots); // Log the generated slots
    return slots;
  };
  
  // Route to update the doctor's schedule
  router.put("/update-schedule", async (req, res) => {
    try {
      const { doctorEmail, availableDays, availableSlots } = req.body;
  
      console.log("Received data:", { doctorEmail, availableDays, availableSlots }); // Debugging log
  
      const doctor = await Doctor.findOne({ email: doctorEmail });
  
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      // Ensure that slots are generated if they're empty
      const updatedSlots = availableSlots.map((slotObj) => {
        if (slotObj.slots.length === 0) {
          console.log(`Generating slots for day: ${slotObj.day}`); // Debugging log
          return {
            ...slotObj,
            slots: generateSlotsForDay("09:00", "17:00"), // Generate slots from 9:00 AM to 5:00 PM
            
          };
        }
        return slotObj; // Return existing slot data if already populated
      });
  
      doctor.availableDays = availableDays;
      doctor.availableSlots = updatedSlots; // Set the generated or existing slots
      doctor.lastUpdated = getCurrentDate(); // Update the last updated field
  
      await doctor.save();
  
      console.log("Updated Doctor:", doctor); // Debugging log to check saved data
      res.json({
        message: "Schedule updated successfully",
        updatedDoctor: doctor,
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).json({ message: "Error updating schedule", error: error.message });
    }
  });
  
  
  router.get("/schedule", async (req, res) => {
    try {
      const doctorEmail = req.query.doctorEmail; // Get doctorEmail from the query params
      console.log("Fetching schedule for doctorEmail:", doctorEmail); // Log doctorEmail for debugging
  
      if (!doctorEmail) {
        return res.status(400).json({ message: "Doctor email is required" });
      }
  
      // Log the query being used to find the doctor
      console.log("Querying doctor with email:", doctorEmail);
      const doctor = await Doctor.findOne({ email: doctorEmail });
  
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      console.log("Doctor's availableSlots:", doctor.availableSlots); // Log availableSlots
  
      res.json({
        availableDays: doctor.availableDays,
        availableSlots: doctor.availableSlots,  // Send availableSlots for the doctor
      });
    } catch (error) {
      console.error("Error fetching schedule:", error);
      res.status(500).json({ message: "Error fetching schedule", error: error.message });
    }
  });
  
// Assuming you're using Express.js and Mongoose

// Route to fetch booked slots for a specific doctor
router.get('/booked-slots', async (req, res) => {
  try {
    const { doctorEmail } = req.query;

    console.log('🔹 Fetching booked slots for:', doctorEmail);

    if (!doctorEmail) {
      console.log('❌ Missing doctorEmail in request');
      return res.status(400).json({ message: 'doctorEmail is required' });
    }

    // Fetch all booked appointments for this doctor
    const bookedAppointments = await Appointment.find({ doctorEmail });

    if (!bookedAppointments.length) {
      console.log('✅ No booked slots found');
      return res.status(200).json({ bookedSlots: [] });
    }

    // Format booked slots as { day: 'YYYY-MM-DD', slots: ['10:00', '11:00'] }
    const bookedSlotsMap = {};

    bookedAppointments.forEach((appointment) => {
      const date = appointment.appointmentDate; // Ensure this is in `YYYY-MM-DD` format
      if (!bookedSlotsMap[date]) {
        bookedSlotsMap[date] = [];
      }
      bookedSlotsMap[date].push(appointment.appointmentTime);
    });

    console.log('✅ Booked slots:', bookedSlotsMap);

    // Convert the map to an array
    const bookedSlots = Object.keys(bookedSlotsMap).map((day) => ({
      day,
      slots: bookedSlotsMap[day],
    }));

    res.status(200).json({ bookedSlots });

  } catch (error) {
    console.error('❌ Error fetching booked slots:', error);
    res.status(500).json({ message: 'Error fetching booked slots', error: error.message });
  }
});


//Add/update available slots dynamically using email
router.post('/book-slot', async (req, res) => {
    try {
      const { doctorEmail, day, slots } = req.body;
  
      if (!doctorEmail || !day || !slots || !Array.isArray(slots)) {
        return res.status(400).json({ message: 'Invalid input' });
      }
  
      const doctor = await Doctor.findOne({ email: doctorEmail });
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      const dayIndex = doctor.availableSlots.findIndex(d => d.day === day);
  
      if (dayIndex !== -1) {
        // Remove booked slots from availableSlots
        doctor.availableSlots[dayIndex].slots = doctor.availableSlots[dayIndex].slots.filter(slot => !slots.includes(slot));
  
        // If no slots remain for the day, remove the day entry
        if (doctor.availableSlots[dayIndex].slots.length === 0) {
          doctor.availableSlots.splice(dayIndex, 1);
        }
      }
  
      // Add to bookedSlots
      const bookedDayIndex = doctor.bookedSlots.findIndex(d => d.day === day);
      if (bookedDayIndex !== -1) {
        doctor.bookedSlots[bookedDayIndex].slots = [...new Set([...doctor.bookedSlots[bookedDayIndex].slots, ...slots])];
      } else {
        doctor.bookedSlots.push({ day, slots: [...new Set(slots)] });
      }
  
      await doctor.save();
  
      res.json({ message: 'Slot booked successfully', updatedDoctor: doctor });
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ message: 'Error booking slot', error });
    }
  });
  
module.exports = router;
