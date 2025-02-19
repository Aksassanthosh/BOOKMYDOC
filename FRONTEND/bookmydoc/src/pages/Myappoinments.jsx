import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import axiosInstance from "../axiosinterceptor";

const Myappoinments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("http://localhost:3000/appointment/patient-appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await axiosInstance.delete(`http://localhost:3000/appointment/cancel-appointment/${appointmentId}`);

      alert("Appointment canceled successfully!");
      fetchAppointments(); // Refresh appointments
    } catch (err) {
      console.error("Error canceling appointment:", err);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          My Appointments (Patient)
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : appointments.length === 0 ? (
          <Typography align="center">No appointments found.</Typography>
        ) : (
          <List>
            {appointments.map((appt, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Dr. ${appt.doctor} - ${appt.specialization}`}
                    secondary={`📅 ${new Date(appt.appointmentDate).toLocaleDateString()} at ${appt.appointmentTime}`}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelAppointment(appt._id)}
                  >
                    Cancel
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default Myappoinments;
