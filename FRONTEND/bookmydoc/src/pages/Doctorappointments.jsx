import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

import axiosInstance from "../axiosinterceptor";

const Doctorappointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token"); // Retrieve token
        console.log(token);
        
        const response = await axiosInstance.get("http://localhost:3000/appointment/doctor-appointments", {
          headers: { Authorization:token },
        });
  
        console.log("Response Data:", response.data); // Debugging output
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching doctor appointments:", err.response);
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
          My Appointments (Doctor)
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
                    primary={`Patient: ${appt.name}`}
                    secondary={`📅 ${new Date(appt.appointmentDate).toLocaleDateString()} at ${appt.appointmentTime}`}
                  />
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

export default Doctorappointments;
