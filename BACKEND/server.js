const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const patientRoutes = require('./routes/patientRoutes')
const adminroutes=require("./routes/adminroutes")
const doctorroutes=require("./routes/doctorRoutes")
const appointmentroutes=require("./routes/appoinmentRoutes")

require('dotenv').config()
require('./db/connection ')

app.use(express.json()); 




app.use('/patients', patientRoutes);
app.use('/admins',adminroutes)
app.use('/doctors',doctorroutes)
app.use('/appointment',appointmentroutes)





app.listen(process.env.PORT, () =>{
    console.log('server is listening on port 3000!')
})