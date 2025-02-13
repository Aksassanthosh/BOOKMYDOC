import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Paper as MuiPaper } from '@mui/material';


const Appoinmentform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDoctor = location.state?.doctor || null;

  const [form, setForm] = useState({
    name: '',
    email: '',
    appointmentDate: '',
    reason: '',
    doctorName: selectedDoctor ? selectedDoctor.name : '',
    specialization: selectedDoctor ? selectedDoctor.specialization : '',
  });

  useEffect(() => {
    const userEmail = sessionStorage.getItem('email');
    if (userEmail) {
      setForm((prevForm) => ({ ...prevForm, email: userEmail }));
    }
  }, []);

  const validateForm = () => {
    const { name, email, appointmentDate, reason } = form;
    return name && email && appointmentDate && reason;
  };

  const handleSlotSelection = () => {
    if (!validateForm()) {
      alert('Please fill in all fields before proceeding.');
      return;
    }
    navigate('/availableslots', { state: { doctorEmail: selectedDoctor.email, formData: form } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <Box sx={{ background: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <MuiPaper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Book an Appointment
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              required
              disabled
            />
            <TextField
              fullWidth
              label="Appointment Date"
              name="appointmentDate"
              type="date"
              value={form.appointmentDate}
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Reason for Visit"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Doctor Name"
              name="doctorName"
              value={form.doctorName}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              disabled
            />
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={form.specialization}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              disabled
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleSlotSelection}
            >
              Select Available Slot
            </Button>
          </form>
        </MuiPaper>
      </Container>
    </Box>
  );
};

export default Appoinmentform;
