import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';

const Register = () => {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');

  
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;  
  const phoneRegex = /^[+]?[0-9]{10,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!gmailRegex.test(form.email)) {
      setError("Invalid Gmail address. Please use a valid @gmail.com email.");
      return;
    }

    
    if (!phoneRegex.test(form.phone)) {
      setError("Invalid phone number. It should be 10-15 digits long.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/patients/register`, form);
      console.log("API URL:", import.meta.env.VITE_API_BASE_URL);
      console.log(response.data);
      alert("Registration successful");
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
     
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1606892588690-c60cb2e1c5ba)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          zIndex: -1,
        }}
      />
      
      <Container component="main" maxWidth="xs" style={{ marginTop: '10%' }}>
        <Paper elevation={6} sx={{ padding: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Sign Up
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email (Gmail only)"
                variant="outlined"
                fullWidth
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                error={!gmailRegex.test(form.email) && form.email !== ""}
                helperText={!gmailRegex.test(form.email) && form.email !== "" ? "Use a valid @gmail.com email" : ""}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                error={!phoneRegex.test(form.phone) && form.phone !== ""}
                helperText={!phoneRegex.test(form.phone) && form.phone !== "" ? "Enter a valid phone number (10-15 digits)" : ""}
              />
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: 1.5,
                  marginTop: 2,
                  backgroundColor: '#2F4F4F',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                Sign Up
              </Button>
            </form>
          </Box>

          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <a href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Log In
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
