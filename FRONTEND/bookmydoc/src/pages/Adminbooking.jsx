import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

import axiosInstance from "../axiosinterceptor";

const Adminbooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/admins/getallappointments");
        console.log("API Response:", response.data); 
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          All Appointments (Sorted by Date)
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : appointments.length === 0 ? (
          <Typography align="center">No appointments found.</Typography>
        ) : (
          <List>
            {appointments.map((appt, index) => {
              const formattedDate = new Date(appt.appointmentDate).toLocaleDateString();
              const formattedTime = new Date(`1970-01-01T${appt.appointmentTime}Z`).toLocaleTimeString();

              return (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`Dr. ${appt.doctor} - ${appt.specialization}`}
                      secondary={`📅 ${formattedDate} at ${formattedTime} | Patient: ${appt.name}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default Adminbooking;
