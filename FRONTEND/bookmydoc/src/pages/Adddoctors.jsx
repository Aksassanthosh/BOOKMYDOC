import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import axiosInstance from "../axiosinterceptor";

const Adddoctors = () => {
  const [doctor, setDoctor] = useState({
    doctorId: "",
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    day: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    
    if (!gmailRegex.test(doctor.email)) {
      setError("Invalid Gmail address. Please use a valid @gmail.com email.");
      return;
    }

    try {
      const response = await axiosInstance.post("/admins/adddoctor", {
        doctorId: doctor.doctorId,
        name: doctor.name,
        email: doctor.email,
        password: doctor.password,
        specialization: doctor.specialization,
      });
      setSuccess("Doctor added successfully!");
      setDoctor({
        doctorId: "",
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
            name="doctorId"
            fullWidth 
            required 
            value={doctor.doctorId}
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
            label="Email (Gmail only)" 
            name="email" 
            fullWidth 
            required 
            value={doctor.email} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
            error={!gmailRegex.test(doctor.email) && doctor.email !== ""}
            helperText={!gmailRegex.test(doctor.email) && doctor.email !== "" ? "Use a valid @gmail.com email" : ""}
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
