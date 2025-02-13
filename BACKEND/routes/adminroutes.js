const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Doctor");
const Appointment=require("../model/booking")
 const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change to other services like SendGrid, etc.
  auth: {
    user: 'your-email@gmail.com',  // Replace with your email
    pass: 'your-email-password',   // Replace with your email password
  },
});

// Route to send the email with doctor credentials
router.post('/send-welcome-email', async (req, res) => {
  const { email, name } = req.body;

  const password = `${name.toLowerCase()}@123`; // Generate password as per your specification

  // Define the email content
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender's email
    to: email,                    // Receiver's email
    subject: 'Welcome to the Team!',
    text: `Hello ${name},\n\nWelcome to the medical team! Here are your login credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nYou can use these credentials to log in and update your profile.`
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Welcome email sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});
// Admin - Add Doctor
router.get("/getallappointments", async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments from the database
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});
router.post("/adddoctor", async (req, res) => {
  const { doctorId, name, email, password, specialization } = req.body;

  try {
    // Check if the doctorId already exists in the database
    const doctorExists = await User.findOne({ doctorId });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor ID already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds value

    // Create a new doctor entry
    const newDoctor = new User({
      doctorId, // Now using doctorId
      name,
      email,
      password: hashedPassword, // Store the hashed password
      specialization,
    });

    // Save the new doctor
    await newDoctor.save();
    
    // Send success response
    res.status(201).json({ message: "Doctor added successfully." });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

    
// Admin - View All Doctors
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
    // Fetch the doctor by their ID
    const doctor = await User.findById(req.params.id); // req.params.id is the doctor ID
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor); // Return the doctor data as JSON
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// Admin - Delete Doctor
router.delete("/doctor/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin - Update Doctor
router.put("/doctor/:id", async (req, res) => {
  try {
    const { name, email, specialization } = req.body;

    // Validate incoming data
    if (!name || !email || !specialization) {
      return res.status(400).json({
        message: "Name, email, and specialization are required fields.",
      });
    }

    // Find doctor by ID and update details
    const updatedDoctor = await User.findByIdAndUpdate(
      req.params.id,  // The doctor's ID from the URL
      { name, email, specialization },  // Fields to be updated
      { new: true }  // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Return the updated doctor details
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
