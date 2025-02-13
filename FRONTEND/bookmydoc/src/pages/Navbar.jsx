import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ffffff", boxShadow: 2 }}>
      <Container>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img src="/images/logo2.png" alt="Logo" style={{ height: 50 }} />
            <Typography
              variant="h6"
              sx={{ color: "#333", fontWeight: 600, ml: 2 }}
            >
              BOOK MY DOC
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box>
            {role === "admin" && (
              <>
                <Button component={Link} to="/adddoctors" sx={navButtonStyle}>
                  Add Doctors
                </Button>
                <Button component={Link} to="/adminbooking" sx={navButtonStyle}>
                  Bookings
                </Button>
              </>
            )}
            {role === "doctor" && (
              <>
                <Button component={Link} to="/doctorbooking" sx={navButtonStyle}>
                  My Bookings
                </Button>
                <Button component={Link} to="/updateschedule" sx={navButtonStyle}>
                  Update Schedule
                </Button>
              </>
            )}
            {role === "patient" && (
              <>
                <Button component={Link} to="/" sx={navButtonStyle}>
                  Home
                </Button>
                <Button component={Link} to="/doctorss" sx={navButtonStyle}>
                  Find Doctors
                </Button>
                <Button component={Link} to="/aboutus" sx={navButtonStyle}>
                  About Us
                </Button>
                <Button component={Link} to="/myappointments" sx={navButtonStyle}>
                  My Appointments
                </Button>
              </>
            )}
            {role ? (
              <Button onClick={handleLogout} sx={logoutButtonStyle}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/login" sx={navButtonStyle}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const navButtonStyle = {
  mx: 1,
  color: "#333",
  fontWeight: "bold",
  textTransform: "uppercase",
  "&:hover": { backgroundColor: "#f0f0f0" },
};

const logoutButtonStyle = {
  mx: 1,
  color: "#fff",
  backgroundColor: "#d32f2f",
  fontWeight: "bold",
  textTransform: "uppercase",
  "&:hover": { backgroundColor: "#b71c1c" },
};

export default Navbar;
