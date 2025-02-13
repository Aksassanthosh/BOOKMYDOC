import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

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

  // Fetch the doctor's email from sessionStorage
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setDoctorEmail(email);
    } else {
      setError("Doctor's email is missing.");
    }
  }, []);

  // Fetch the doctor's schedule using the email stored in sessionStorage
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
    const start = startTime.split(":"); // Split start time into hours and minutes
    const end = endTime.split(":"); // Split end time into hours and minutes
  
    // Convert time to minutes
    let startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    let endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
  
    while (startMinutes < endMinutes) {
      const hours = Math.floor(startMinutes / 60);
      const minutes = startMinutes % 60;
      const timeSlot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeSlot);
      startMinutes += 10; // Add 10 minutes for the next slot
    }
  
    return slots;
  };
  

  const handleSlotChange = () => {
    const newAvailableSlots = selectedDays.map((day) => ({
      day,
      slots: generateSlots(slotStartTime, slotEndTime), // Generate slots for each day
    }));
    setAvailableSlots(newAvailableSlots); // Update state with generated slots
  };

  const handleSubmit = async () => {
    if (!doctorEmail) {
      setError("Doctor email is missing. Cannot update schedule.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare the data in the correct format
      const slotsData = selectedDays.map((day) => ({
        day,
        slots: availableSlots.find(slot => slot.day === day)?.slots || [], // Ensure the slots are passed correctly
      }));

      await axiosInstance.put(`http://localhost:3000/doctors/update-schedule`, {
        doctorEmail,
        availableDays: selectedDays,
        availableSlots: slotsData, // Send the array of slots as { day, slots }
      });

      alert('Schedule updated successfully!');
    } catch (err) {
      setError("Error updating schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>Update Schedule for Dr. {doctorEmail}</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Available Days</InputLabel>
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={slotStartTime}
            onChange={(e) => setSlotStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={slotEndTime}
            onChange={(e) => setSlotEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSlotChange} disabled={!slotStartTime || !slotEndTime}>
            Generate Slots
          </Button>
        </Grid>

        {availableSlots.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Generated Available Slots</Typography>
            <div>
              {availableSlots.map((slotObj, index) => (
                <div key={index}>
                  <Typography variant="body1"><strong>{slotObj.day}:</strong></Typography>
                  {slotObj.slots && slotObj.slots.length > 0 ? (
                    <div>
                      {slotObj.slots.map((slot, slotIndex) => (
                        <Button key={slotIndex} variant="outlined" sx={{ margin: 0.5 }}>
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Typography variant="body2" color="textSecondary">No slots available</Typography>
                  )}
                </div>
              ))}
            </div>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? 'Updating...' : 'Update Schedule'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Updateschedule;
