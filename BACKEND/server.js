const express = require('express')
const app = express()
const patientRoutes = require('./routes/patientRoutes')
const adminroutes=require("./routes/adminroutes")
const doctorroutes=require("./routes/doctorRoutes")
const appointmentroutes=require("./routes/appoinmentRoutes")

require('dotenv').config()
require('./db/connection ')
const cors = require('cors')
app.use(express.json()); 

app.use(cors())


app.use('/patients', patientRoutes);
app.use('/admins',adminroutes)
app.use('/doctors',doctorroutes)
app.use('/appointment',appointmentroutes)





app.listen(process.env.PORT, () =>{
    console.log('server is listening on port 3000!')
})