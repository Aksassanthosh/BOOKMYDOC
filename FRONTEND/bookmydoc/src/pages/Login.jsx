import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Paper, Link, Box } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/patients/loginpage`, form);
      console.log(data); 
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        
        sessionStorage.setItem("email", data.email);

        alert("Login successful");

        
        switch (data.role) {
          case "admin":
            navigate("/adminpage");
            break;
          case "doctor":
            navigate("/doctorspage");
            break;
          case "patient":
            navigate("/");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        setError("No token received from the server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "10%" }}>
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1.5 }}>
            Login
          </Button>
        </form>

        
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link href="/register" variant="body2" sx={{ marginRight: 2 }}>
            Don't have an account? Sign Up
          </Link>
        
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
