import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, FormControl, InputLabel, Box, Card, CardContent } from '@mui/material';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import axiosInstance from '../axiosinterceptor';

const Updateschedule = () => {
  const [doctorEmail, setDoctorEmail] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [slotStartTime, setSlotStartTime] = useState('');
  const [slotEndTime, setSlotEndTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setDoctorEmail(email);
    } else {
      setError("Doctor's email is missing.");
    }
  }, []);

  useEffect(() => {
    if (!doctorEmail) return;

    const fetchSchedule = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/doctors/schedule`, { params: { doctorEmail } });
        setAvailableSlots(response.data.availableSlots);
        setSelectedDays(response.data.availableDays);
      } catch (err) {
        setError("Error fetching doctor schedule");
      }
    };

    fetchSchedule();
  }, [doctorEmail]);

  const handleDayChange = (event) => {
    setSelectedDays(event.target.value);
  };

  const generateSlots = (startTime, endTime) => {
    const slots = [];
    const start = startTime.split(":");
    const end = endTime.split(":");
  
    let startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    let endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
  
    while (startMinutes < endMinutes) {
      const hours = Math.floor(startMinutes / 60);
      const minutes = startMinutes % 60;
      const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeSlot);
      startMinutes += 10; 
    }
  
    return slots;
  };

  const handleSlotChange = () => {
    const newAvailableSlots = selectedDays.map((day) => ({
      day,
      slots: generateSlots(slotStartTime, slotEndTime),
    }));
    setAvailableSlots(newAvailableSlots);
  };

  const handleSubmit = async () => {
    if (!doctorEmail) {
      setError("Doctor email is missing. Cannot update schedule.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const slotsData = selectedDays.map((day) => ({
        day,
        slots: availableSlots.find(slot => slot.day === day)?.slots || [],
      }));

      await axiosInstance.put(`http://localhost:3000/doctors/update-schedule`, {
        doctorEmail,
        availableDays: selectedDays,
        availableSlots: slotsData,
      });

      alert('Schedule updated successfully!');
    } catch (err) {
      setError("Error updating schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, marginTop: 3, backgroundColor: '#fafafa' }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ color: '#2F4F4F' }}>
        Update Schedule for Dr. {doctorEmail}
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}

      <Grid container spacing={3} justifyContent="center">
      
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2F4F4F' }}>
                <CalendarToday sx={{ verticalAlign: 'middle', mr: 1 }} />
                Select Available Days
              </Typography>
              <FormControl fullWidth>
                <Select
                  multiple
                  value={selectedDays}
                  onChange={handleDayChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <MenuItem key={day} value={day}>{day}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2F4F4F' }}>
                <AccessTime sx={{ verticalAlign: 'middle', mr: 1 }} />
                Select Time Slot
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={slotStartTime}
                    onChange={(e) => setSlotStartTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    value={slotEndTime}
                    onChange={(e) => setSlotEndTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSlotChange}
            disabled={!slotStartTime || !slotEndTime}
            sx={{
              padding: 1.5,
              backgroundColor: '#2F4F4F',
              '&:hover': { backgroundColor: '#1565c0' },
              marginTop: 2,
            }}
          >
            Generate Slots
          </Button>
        </Grid>

        
        {availableSlots.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#2F4F4F' }}>
                  Generated Available Slots
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {availableSlots.map((slotObj, index) => (
                    <Box key={index} sx={{ margin: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{slotObj.day}:</Typography>
                      {slotObj.slots.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {slotObj.slots.map((slot, slotIndex) => (
                            <Button
                              key={slotIndex}
                              variant="outlined"
                              sx={{ margin: 0.5 }}
                            >
                              {slot}
                            </Button>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="textSecondary">No slots available</Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              padding: 1.5,
              backgroundColor: '#2F4F4F',
              '&:hover': { backgroundColor: '#1565c0' },
              marginTop: 3,
            }}
          >
            {loading ? 'Updating...' : 'Update Schedule'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Updateschedule;
