import React, { useEffect, useState } from "react";

import { Button, TextField, Typography, Container, Paper, Grid, Box } from "@mui/material";
import { CalendarToday, AccessTime } from "@mui/icons-material";
import axiosInstance from "../axiosinterceptor";

const DoctorsPage = () => {
  const [doctor, setDoctor] = useState(null); // Store doctor data
  const [schedule, setSchedule] = useState({ availableDays: [], availableTimes: [] }); // Store schedule data
  const [doctorId, setDoctorId] = useState(""); // Store doctor ID (ObjectId)

  // Fetch doctor data from backend
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorEmail = sessionStorage.getItem("email");
        console.log("Fetching doctor with email:", doctorEmail);
        
        const response = await axiosInstance.get(`http://localhost:3000/doctors/doctors/${doctorEmail}`);
        
        setDoctor(response.data);
        setSchedule(response.data.schedule || { availableDays: [], availableTimes: [] });
        setDoctorId(response.data._id); // Store the doctor ID
        
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    

    fetchDoctorData();
  }, []);

  // Handle schedule update
  const handleScheduleChange = async () => {
    try {
      // Update the doctor’s schedule with new available days and times
      await axiosInstance.put("http://localhost:3000/doctors/update-schedule", { doctorId: doctorId, ...schedule });
      alert("Schedule updated!");
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

  // Show loading message if doctor data is not fetched yet
  if (!doctor) {
    return <Typography variant="h5">Loading doctor information...</Typography>;
  }

  return (
    <Container>
      <Paper elevation={6} sx={{ padding: 3, borderRadius: 2, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
        <Typography variant="h5" gutterBottom>Doctor: {doctor.name}</Typography>

        {/* Display the doctor’s schedule */}
        <Typography variant="h6">Scheduled Days and Times</Typography>
        <Box sx={{ marginBottom: 2 }}>
          {schedule.availableDays.length > 0 ? (
            <Grid container spacing={2}>
              {schedule.availableDays.map((day, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Typography variant="body1">
                    <strong>{day}</strong> - {schedule.availableTimes.join(", ")}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No schedule available.</Typography>
          )}
        </Box>

        {/* Update Schedule Form */}
        <Typography variant="h5">Update Schedule</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <CalendarToday />
          </Grid>
          <Grid item>
            <TextField
              label="Available Days"
              variant="outlined"
              fullWidth
              value={schedule.availableDays.join(", ")}
              onChange={(e) => setSchedule({ ...schedule, availableDays: e.target.value.split(", ") })}
            />
          </Grid>
          <Grid item>
            <AccessTime />
          </Grid>
          <Grid item>
            <TextField
              label="Available Times"
              variant="outlined"
              fullWidth
              value={schedule.availableTimes.join(", ")}
              onChange={(e) => setSchedule({ ...schedule, availableTimes: e.target.value.split(", ") })}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={handleScheduleChange} sx={{ marginTop: 2 }}>
          Update Schedule
        </Button>

        <Typography variant="h5" sx={{ marginTop: 3 }}>My Appointments</Typography>
        {/* Display Appointments if needed */}
      </Paper>
    </Container>
  );
};

export default DoctorsPage;
