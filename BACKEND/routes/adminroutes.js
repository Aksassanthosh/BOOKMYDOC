const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Doctor");
const Appointment=require("../model/booking")
 const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',  
    pass: 'your-email-password',
  },
});


router.post('/send-welcome-email', async (req, res) => {
  const { email, name } = req.body;

  const password = `${name.toLowerCase()}@123`; // 


  const mailOptions = {
    from: 'your-email@gmail.com', 
    to: email,                    
    subject: 'Welcome to the Team!',
    text: `Hello ${name},\n\nWelcome to the medical team! Here are your login credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nYou can use these credentials to log in and update your profile.`
  };

  try {
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Welcome email sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

router.get("/getallappointments", async (req, res) => {
  try {
    const appointments = await Appointment.find(); 
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});
router.post("/adddoctor", async (req, res) => {
  const { doctorId, name, email, password, specialization } = req.body;

  try {
    
    const doctorExists = await User.findOne({ doctorId });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor ID already exists." });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10); 

    
    const newDoctor = new User({
      doctorId, 
      name,
      email,
      password: hashedPassword, 
      specialization,
    });

    
    await newDoctor.save();
    
  
    res.status(201).json({ message: "Doctor added successfully." });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

    

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/doctor/:id", async (req, res) => {
  try {
    
    const doctor = await User.findById(req.params.id); 
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor); 
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/doctor/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/doctor/:id", async (req, res) => {
  try {
    const { name, email, specialization } = req.body;

    
    if (!name || !email || !specialization) {
      return res.status(400).json({
        message: "Name, email, and specialization are required fields.",
      });
    }

    
    const updatedDoctor = await User.findByIdAndUpdate(
      req.params.id, 
      { name, email, specialization },  
      { new: true }  
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    
    res.status(200).json({
      message: "Doctor updated successfully",
      updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
