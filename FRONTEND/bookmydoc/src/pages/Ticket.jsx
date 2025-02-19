import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { Box, Container, Paper, Typography, Button } from '@mui/material';

const Ticket = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  
  const appointment = location.state?.appointment; 

  
  useEffect(() => {
    if (!appointment) {
      navigate('/appointment');
    }
  }, [appointment, navigate]);

  const handleGoToAppointments = () => {
    navigate('/myappointments'); 
  };

  return (
    <Box sx={{ background: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Booking Successful!
          </Typography>

          {appointment ? (
            <>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Your appointment has been successfully booked with Dr. {appointment.doctor}.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Specialization: {appointment.specialization}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Appointment Date: {appointment.appointmentDate} at {appointment.appointmentTime}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Reason: {appointment.reason}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Booked on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleGoToAppointments}
              >
                View My Appointments
              </Button>
            </>
          ) : (
            <Typography variant="body1" color="error">
              Failed to load booking details.
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Ticket;
