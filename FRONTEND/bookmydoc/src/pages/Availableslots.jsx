import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Container, Alert } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';

const Availableslots = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorEmail, formData } = location.state || {};
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!doctorEmail) {
      console.log('Doctor email is missing or incorrect');
      return;
    }
    fetchSlots();
    fetchBookedSlots();
  }, [doctorEmail]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('http://localhost:3000/doctors/schedule', {
        params: { doctorEmail },
      });
      setSlots(response.data.availableSlots || []);
    } catch (err) {
      setError('Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedSlots = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/doctors/booked-slots', {
        params: { doctorEmail },
      });
      setBookedSlots(response.data.bookedSlots || []);
    } catch (err) {
      console.error('Failed to fetch booked slots:', err);
      setBookedSlots([]);
    }
  };

  const isSlotBooked = (day, slot) => {
    return bookedSlots.some((booked) => booked.day === day && booked.slots.includes(slot));
  };

  const handleSlotSelection = (day, slot) => {
    setSelectedDay(day);
    setSelectedSlot(slot);
    setSuccessMessage(`Selected slot: ${day} at ${slot}`);
  };

  const handleBookAppointment = async () => {
  if (!selectedDay || !selectedSlot) {
    alert('Please select a slot before booking.');
    return;
  }

  
  const appointmentDate = selectedDay;
  const appointmentTime = selectedSlot;
  const requestData = {
    name: formData.name,
    email: formData.email,
    doctorEmail: formData.doctorEmail,
    doctor: formData.doctorName,  
    specialization: formData.specialization,
    appointmentDate, 
    appointmentTime, 
    reason: formData.reason,  
  };

  console.log(' Sending appointment request:', requestData);

  try {
    const response = await axiosInstance.post('http://localhost:3000/patients/appointments', requestData);

    console.log(' Appointment booked successfully:', response.data);
    alert('✅ Appointment booked successfully!');
    navigate('/bookedticket', { state: { appointment: response.data } });

  } catch (err) {
    console.error(' Failed to book appointment:', err.response?.data || err.message);
    alert(`❌ Failed to book appointment: ${err.response?.data?.message || 'Please try again'}`);
  }
};

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
        Available Slots
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      {loading ? (
        <Typography variant="h6" align="center">Loading slots...</Typography>
      ) : error ? (
        <Typography variant="h6" align="center" color="error">{error}</Typography>
      ) : (
        slots.length === 0 ? (
          <Typography variant="h6" align="center">No available slots.</Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {slots.map((slotObj, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                  {slotObj.day}
                </Typography>
                {slotObj.slots.map((slot, slotIndex) => (
                  <Button
                    key={`${index}-${slotIndex}`}
                    variant="contained"
                    color={isSlotBooked(slotObj.day, slot) ? "error" : "primary"}
                    disabled={isSlotBooked(slotObj.day, slot)} 
                    sx={{ width: 120, marginBottom: 1 }}
                    onClick={() => handleSlotSelection(slotObj.day, slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </Grid>
            ))}
          </Grid>
        )
      )}

      {selectedSlot && (
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginTop: 3 }}
          onClick={handleBookAppointment}
        >
          Book Appointment
        </Button>
      )}
    </Container>
  );
};

export default Availableslots;
