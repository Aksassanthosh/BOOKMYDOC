import React, { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axiosInstance from "../axiosinterceptor";

const Adminpage = () => {
  const [doctors, setDoctors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDoctor, setEditDoctor] = useState({
    doctorId: "",
    name: "",
    email: "",
    specialization: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRes = await axiosInstance.get(
          "http://localhost:3000/admins/doctors"
        );
        setDoctors(doctorsRes.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSendEmail = (doctor) => {
    navigate("/mailfordoc", {
      state: { name: doctor.name, email: doctor.email }, // Pass the doctor details
    });
  };

  const handleUpdate = (doctorId, name, email, specialization) => {
    setEditDoctor({
      doctorId,
      name,
      email,
      specialization,
    });
    setOpenDialog(true); // Open the edit form
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axiosInstance.delete(
          `http://localhost:3000/admins/doctor/${doctorId}`
        );
        setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
        alert("Doctor deleted successfully.");
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Failed to delete doctor.");
      }
    }
  };

  const handleFormSubmit = async () => {
    const { doctorId, name, email, specialization } = editDoctor;
    try {
      const response = await axiosInstance.put(
        `http://localhost:3000/admins/doctor/${doctorId}`,
        { name, email, specialization }
      );
      // Update doctor list with the new data
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === doctorId
            ? { ...doctor, name, email, specialization }
            : doctor
        )
      );
      setOpenDialog(false);
      alert("Doctor updated successfully.");
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor.");
    }
  };

  return (
    <Container sx={{ maxWidth: "lg" }}>
      <Typography variant="h4" align="center" sx={{ marginY: 4 }}>
        Admin Dashboard
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Manage Doctors
      </Typography>

      <Grid container spacing={4}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
                padding: 2,
                maxWidth: 400,
                margin: "auto",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                  {doctor.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {doctor.specialization}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 2, fontWeight: "bold" }}
                >
                  Email: {doctor.email}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EmailIcon />}
                    onClick={() => handleSendEmail(doctor)} // Send the doctor details
                    fullWidth
                    sx={{ marginBottom: 1 }}
                  >
                    Send Welcome Email
                  </Button>

                  <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        handleUpdate(doctor._id, doctor.name, doctor.email, doctor.specialization)
                      }
                      fullWidth
                    >
                      Update
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(doctor._id)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Doctor Dialog Form */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editDoctor.name}
            onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={editDoctor.email}
            onChange={(e) => setEditDoctor({ ...editDoctor, email: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Specialization"
            fullWidth
            value={editDoctor.specialization}
            onChange={(e) => setEditDoctor({ ...editDoctor, specialization: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Adminpage;
