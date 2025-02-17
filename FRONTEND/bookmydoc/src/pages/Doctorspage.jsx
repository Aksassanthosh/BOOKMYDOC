import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Grid, Card, CardContent, Button, TextField, Chip } from "@mui/material";
import { CalendarToday, AccessTime } from "@mui/icons-material";
import axiosInstance from "../axiosinterceptor";

const Doctorspage = () => {
  const [doctor, setDoctor] = useState(null);
  const [schedule, setSchedule] = useState({ availableDays: [], availableTimes: [] });
  const [doctorId, setDoctorId] = useState("");


  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorEmail = sessionStorage.getItem("email");
        console.log("Fetching doctor with email:", doctorEmail);
        
        const response = await axiosInstance.get(`http://localhost:3000/doctors/doctors/${doctorEmail}`);
        
        setDoctor(response.data);
        setSchedule(response.data.schedule || { availableDays: [], availableTimes: [] });
        setDoctorId(response.data._id);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []);


  const handleScheduleChange = async () => {
    try {
      await axiosInstance.put(`${import.meta.env.VITE_API_URL}/doctors/update-schedule`, { doctorId, ...schedule });
      alert("Schedule updated!");
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

  if (!doctor) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 5 }}>
          Loading doctor information...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
        
        <Typography variant="h4" gutterBottom align="center">
          Doctor Dashboard
        </Typography>
        <Card sx={{ backgroundColor: "#E3F2FD", borderRadius: 3, padding: 2, mb: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>Dr. {doctor.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{doctor.specialization}</Typography>
            
            <Typography variant="body1">Email: {doctor.email}</Typography>
          </CardContent>
        </Card>

        
      </Paper>
    </Container>
  );
};

export default Doctorspage;
