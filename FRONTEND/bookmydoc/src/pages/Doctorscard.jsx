import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Container, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosinterceptor';

const Doctorscard = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/patients/getdoctors');
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointment = (doctor) => {
    console.log("Navigating with selected doctor:", doctor); // Debugging
    navigate('/appointment', { state: { doctor: doctor } }); // Pass entire doctor object to AppointmentForm
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading doctors...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333' }}>
        Available Doctors
      </Typography>
      <Grid container spacing={4}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                padding: 2,
                textAlign: 'center',
                boxShadow: 3,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)',
                },
                backgroundColor: '#F9F9F9',
              }}
              onClick={() => handleAppointment(doctor)}
            >
              <CardContent>
                {/* Doctor's Photo */}
                <Avatar
                  alt={doctor.name}
                  src={doctor.photo} // Assuming the 'photo' is the URL to the doctor's image
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto 16px', // Centers the photo and adds space below it
                    border: '2px solid #0066CC',
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, fontStyle: 'italic' }}>
                  {doctor.specialization}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: 2,
                    backgroundColor: '#0066CC',
                    '&:hover': {
                      backgroundColor: '#004A99',
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from firing
                    handleAppointment(doctor);
                  }}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Doctorscard;
