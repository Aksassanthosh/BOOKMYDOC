import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

import axiosInstance from "../axiosinterceptor";

const Adddoctors = () => {
  const [doctor, setDoctor] = useState({
    doctorId: "",  // Changed to doctorId
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    day: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("http://localhost:3000/admins/adddoctor", {
        doctorId: doctor.doctorId,  // Use doctorId here
        name: doctor.name,
        email: doctor.email,
        password: doctor.password,
        specialization: doctor.specialization,
      });
      setSuccess("Doctor added successfully!");
      setDoctor({
        doctorId: "",  // Clear doctorId after success
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
        day: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add doctor.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Add New Doctor</Typography>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="green">{success}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField 
            label="Doctor ID" 
            name="doctorId"  // Changed to doctorId
            fullWidth 
            required 
            value={doctor.doctorId}  // Use doctorId here
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Doctor Name" 
            name="name" 
            fullWidth 
            required 
            value={doctor.name} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Email" 
            name="email" 
            fullWidth 
            required 
            value={doctor.email} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            fullWidth 
            required 
            value={doctor.password} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Specialization" 
            name="specialization" 
            fullWidth 
            required 
            value={doctor.specialization} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Doctor
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Adddoctors;
