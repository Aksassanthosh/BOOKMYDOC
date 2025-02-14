const express = require("express");
const Doctor = require("../model/Doctor");
const Appointment = require("../model/booking");
const router = express.Router();


const getCurrentDate = () => new Date().toISOString().split("T")[0];


router.get("/doctors/:email", async (req, res) => {
    try {
        const email = req.params.email; 

        
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(doctor); 
    } catch (error) {
        console.error("Error fetching doctor by email:", error);
        res.status(500).json({ message: "Error fetching doctor", error });
    }
});


const generateSlotsForDay = (startTime, endTime) => {
    const slots = [];
    let start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
  
    while (start < end) {
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeSlot);
      start = new Date(start.getTime() + 30 * 60000); 
    }
  
    console.log("Generated slots:", slots); 
    return slots;
  };
  
  
  router.put("/update-schedule", async (req, res) => {
    try {
      const { doctorEmail, availableDays, availableSlots } = req.body;
  
      console.log("Received data:", { doctorEmail, availableDays, availableSlots });
  
      const doctor = await Doctor.findOne({ email: doctorEmail });
  
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      
      const updatedSlots = availableSlots.map((slotObj) => {
        if (slotObj.slots.length === 0) {
          console.log(`Generating slots for day: ${slotObj.day}`); 
          return {
            ...slotObj,
            slots: generateSlotsForDay("09:00", "17:00"), 
            
          };
        }
        return slotObj;
      });
  
      doctor.availableDays = availableDays;
      doctor.availableSlots = updatedSlots; 
      doctor.lastUpdated = getCurrentDate(); 
  
      await doctor.save();
  
      console.log("Updated Doctor:", doctor); 
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
      const doctorEmail = req.query.doctorEmail; 
      console.log("Fetching schedule for doctorEmail:", doctorEmail); 
  
      if (!doctorEmail) {
        return res.status(400).json({ message: "Doctor email is required" });
      }
  
      
      console.log("Querying doctor with email:", doctorEmail);
      const doctor = await Doctor.findOne({ email: doctorEmail });
  
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      console.log("Doctor's availableSlots:", doctor.availableSlots); 
  
      res.json({
        availableDays: doctor.availableDays,
        availableSlots: doctor.availableSlots, 
      });
    } catch (error) {
      console.error("Error fetching schedule:", error);
      res.status(500).json({ message: "Error fetching schedule", error: error.message });
    }
  });
  



router.get('/booked-slots', async (req, res) => {
  try {
    const { doctorEmail } = req.query;

    console.log('🔹 Fetching booked slots for:', doctorEmail);

    if (!doctorEmail) {
      console.log(' Missing doctorEmail in request');
      return res.status(400).json({ message: 'doctorEmail is required' });
    }

    // Fetch all booked appointments for this doctor
    const bookedAppointments = await Appointment.find({ doctorEmail });

    if (!bookedAppointments.length) {
      console.log('No booked slots found');
      return res.status(200).json({ bookedSlots: [] });
    }

    
    const bookedSlotsMap = {};

    bookedAppointments.forEach((appointment) => {
      const date = appointment.appointmentDate; 
      if (!bookedSlotsMap[date]) {
        bookedSlotsMap[date] = [];
      }
      bookedSlotsMap[date].push(appointment.appointmentTime);
    });

    console.log(' Booked slots:', bookedSlotsMap);

    
    const bookedSlots = Object.keys(bookedSlotsMap).map((day) => ({
      day,
      slots: bookedSlotsMap[day],
    }));

    res.status(200).json({ bookedSlots });

  } catch (error) {
    console.error(' Error fetching booked slots:', error);
    res.status(500).json({ message: 'Error fetching booked slots', error: error.message });
  }
});



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
        
        doctor.availableSlots[dayIndex].slots = doctor.availableSlots[dayIndex].slots.filter(slot => !slots.includes(slot));
  
        
        if (doctor.availableSlots[dayIndex].slots.length === 0) {
          doctor.availableSlots.splice(dayIndex, 1);
        }
      }
  
      
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
