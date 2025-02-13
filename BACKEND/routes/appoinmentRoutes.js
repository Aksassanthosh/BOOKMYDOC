const express = require("express");
const jwt = require("jsonwebtoken");
const Appointment = require("../model/booking")
const User = require("../model/User");
const Doctor = require("../model/Doctor");
require("dotenv").config();

const router = express.Router();
 
//Get patient appointments without middleware
router.get("/patient-appointments", async (req, res) => {
 
    let token= req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    const patientId = decoded.email; 
console.log('sre',decoded);
 const appoi = await Appointment.find({email:patientId})
   console.log('app',appoi)
  console.log('hi');
  res.send(appoi)
});

router.get("/doctor-appointments", async (req, res) => {
 
  let token= req.headers.authorization;
  console.log(token);
  
  const decoded = jwt.verify(token,process.env.JWT_SECRET); // Decode token
  const doc = decoded.name; 
console.log('sre',doc);
const app = await Appointment.find({doctor:doc})
 console.log('app',app)
console.log('hello aksa');
res.send(app)
});

module.exports = router;
