const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Doctor = require("../model/Doctor");
const Appointment=require('../model/booking')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();  

const router = express.Router();


// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// User Login
router.post("/loginpage", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // First check in the User collection (patients & admins)
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token for user (admin/patient)
      try {
        const token = jwt.sign(
          { id: user._id, role: user.role,email: user.email  },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        console.log("Generated Token: ", token);
        return res.status(200).json({ message: "Login Successful", token, role: user.role ,email:user.email});
      } catch (err) {
        console.error("Error generating token:", err);
        return res.status(500).json({ message: "Error generating token", error: err.message });
      }
    }

    // If not found in User collection, check in Doctor collection
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token for doctor
      try {
        const token = jwt.sign(
          { id: doctor._id, role: "doctor",email:doctor.email,name:doctor.name },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        console.log("Generated Token for Doctor:", token);
        return res.status(200).json({ message: "Login Successful", token, role: "doctor" ,email});
      } catch (err) {
        console.error("Error generating token for doctor:", err);
        return res.status(500).json({ message: "Error generating token for doctor", error: err.message });
      }
    }

    // If no user found in both collections
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.get('/getdoctors', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from DB
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch doctors' });
  }
});
// Protected Route Example (Directly Including Token Verification)
router.get("/protected", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    res.json({ message: "This is a protected route", user: verified });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Access" });
  }
});


// Route for booking an appointment
console.log("EMAIL_USER:", process.env.EMAIL_USER);  // Log to check if credentials are being loaded
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);  // Log to check if credentials are being loaded

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Nodemailer verification failed:", error);
  } else {
    console.log("✅ Nodemailer is ready to send emails.");
  }
});


router.post('/appointments', async (req, res) => {
  try {
    const { name, email, doctor, specialization, appointmentDate, appointmentTime, reason } = req.body;

    console.log('🔹 Incoming appointment request:', req.body);

    if (!name || !email || !doctor || !specialization || !appointmentDate || !appointmentTime || !reason) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the slot is already booked
    const existingBooking = await Appointment.findOne({ doctor, appointmentDate, appointmentTime });
    if (existingBooking) {
      console.log('❌ Slot already booked:', appointmentDate, appointmentTime);
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    // Save the new appointment
    const newAppointment = new Appointment({
      name,
      email,
      doctor,
      specialization,
      appointmentDate,
      appointmentTime,
      reason,
    });

    await newAppointment.save();
    console.log('✅ Appointment booked successfully:', newAppointment);

    // Send confirmation email to the patient
    const subject = 'Your Appointment Confirmation';
    const body = `
      Hello ${name},\n\n
      Your appointment with Dr. ${doctor} has been successfully booked.\n\n
      Appointment Details:\n
      Date: ${appointmentDate}\n
      Time: ${appointmentTime}\n\n
      Thank you for choosing our medical service. We look forward to seeing you soon!\n\n
      Best regards,\n
      The Medical Team
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Patient's email address
      subject: subject, // Subject of the email
      text: body, // Body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Appointment confirmation email sent to ${email}`);

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('❌ Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
});





module.exports = router;
