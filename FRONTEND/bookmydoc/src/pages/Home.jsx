import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box sx={heroStyle}>
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "3rem" }}>
          Your Health, Our Priority
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, opacity: 0.8, fontSize: "1.2rem" }}>
          Book an appointment with top doctors near you.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#0066CC",
            "&:hover": { backgroundColor: "#004A99" },
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "12px 24px",
          }}
          component={Link}
          to="/doctorss"
        >
          Find a Doctor
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={featureCardStyle}>
              <LocalHospitalIcon sx={{ fontSize: 60, color: "#0066CC" }} />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#333" }}>Expert Doctors</Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  Connect with top specialists in various medical fields.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={featureCardStyle}>
              <AccessTimeIcon sx={{ fontSize: 60, color: "#FF6347" }} />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#333" }}>Easy Appointments</Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  Book and manage your appointments hassle-free.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={featureCardStyle}>
              <SupportAgentIcon sx={{ fontSize: 60, color: "#32CD32" }} />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#333" }}>24/7 Support</Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  We provide round-the-clock assistance for your needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={footerStyle}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Location</Typography>
              <Typography variant="body2">123 Main Street, City, Country</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Quick Links</Typography>
              <Typography variant="body2"><Link to="/privacy">Privacy Policy</Link></Typography>
              <Typography variant="body2"><Link to="/security">Security</Link></Typography>
              <Typography variant="body2"><Link to="/terms">Terms & Conditions</Link></Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="body2">Email: contact@hospital.com</Typography>
              <Typography variant="body2">Phone: +123 456 7890</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

const heroStyle = {
  height: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "linear-gradient(135deg, #00bfff, #add8e6)",
  color: "#fff",
  padding: "0 20px",
};

const featureCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: 3,
  boxShadow: 5,
  backgroundColor: "#fff",
  borderRadius: 5,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const footerStyle = {
  mt: 6,
  py: 4,
  textAlign: "center",
  backgroundColor: "#333",
  color: "#fff",
};

export default Home;
