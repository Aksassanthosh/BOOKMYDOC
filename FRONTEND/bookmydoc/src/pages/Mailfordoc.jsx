import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom'; 

const Mailfordoc = () => {
  const location = useLocation(); 
  const { name, email } = location.state || {}; 

  
  const password = name ? `${name.toLowerCase()}@123` : '';

  
  const subject = encodeURIComponent("Welcome to the Team");
  const body = encodeURIComponent(`
    Hello ${name},\n\n
    We are pleased to welcome you to the medical team. Here are your login credentials:\n\n
    Email: ${email}\n
    Password: ${password}\n\n
    You can log in using these credentials and update your profile.
  `);

  
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ marginY: 4 }}>
        Welcome to the Team, {name}!
      </Typography>

      <Box sx={{ textAlign: 'center', marginY: 4 }}>
        <Typography variant="h6">
          Hello {name},
        </Typography>
        <Typography variant="body1" sx={{ marginY: 2 }}>
          We are pleased to welcome you to the medical team. Here are your login credentials:
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {email}
        </Typography>
        <Typography variant="body1">
          <strong>Password:</strong> {password}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          You can log in using these credentials and update your profile.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href={gmailLink}  
          sx={{ marginTop: 3 }}
        >
          Send Email to {name}
        </Button>
      </Box>
    </Container>
  );
};

export default Mailfordoc;
