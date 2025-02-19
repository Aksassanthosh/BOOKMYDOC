const express = require("express");
const jwt = require("jsonwebtoken");
const Appointment = require("../model/booking");
const Doctor = require("../model/Doctor");
require("dotenv").config();

const router = express.Router();

// Get patient appointments
router.get("/patient-appointments", async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const patientId = decoded.email; 
        const appointments = await Appointment.find({ email: patientId });

        res.send(appointments);
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access" });
    }
});

// Get doctor appointments
router.get("/doctor-appointments", async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctorName = decoded.name;

        const appointments = await Appointment.find({ doctor: doctorName });
        res.send(appointments);
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access" });
    }
});

// Cancel Appointment
router.delete("/cancel-appointment/:appointmentId", async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Find the appointment
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Restore the slot to available slots
        await Doctor.updateOne(
            { name: appointment.doctor },
            { $push: { "availableSlots.$[elem].slots": appointment.appointmentTime } },
            { arrayFilters: [{ "elem.day": appointment.appointmentDate }] }
        );

        // Delete the appointment
        await Appointment.findByIdAndDelete(appointmentId);

        res.status(200).json({ message: "Appointment canceled successfully" });
    } catch (error) {
        console.error("Error canceling appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
