const express = require("express");
const jwt = require("jsonwebtoken");
const Appointment = require("../model/booking")
const User = require("../model/User");
const Doctor = require("../model/Doctor");
require("dotenv").config();

const router = express.Router();
 

router.get("/patient-appointments", async (req, res) => {
 
    let token= req.headers.authorization;
    token = token.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
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
  token = token.split(" ")[1];
  const decoded = jwt.verify(token,process.env.JWT_SECRET); 
  const doc = decoded.name; 
console.log('sre',doc);
const app = await Appointment.find({doctor:doc})
 console.log('app',app)
console.log('hello aksa');
res.send(app)
});

module.exports = router;
