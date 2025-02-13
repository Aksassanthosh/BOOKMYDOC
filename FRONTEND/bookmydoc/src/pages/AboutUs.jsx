import React from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" paragraph>
          Welcome to [Your Company Name]! Our mission is to simplify healthcare by providing an intuitive platform for patients to easily book appointments with qualified doctors, while also offering seamless tools for healthcare providers to manage their schedules and patient care.
        </Typography>

        <Typography variant="h6" paragraph>
          Our platform connects patients with healthcare professionals for a more convenient and accessible healthcare experience. We believe that healthcare should be easy to access and transparent, and we strive to bridge the gap between doctors and patients with our technology.
        </Typography>

        <Typography variant="h6" paragraph>
          We understand how important it is to find reliable healthcare, and our goal is to make it easier for you to manage appointments, stay connected with your doctors, and receive the care you need.
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to provide a trustworthy and easy-to-use platform that connects patients with doctors, ensuring that healthcare services are more accessible, efficient, and user-friendly for everyone.
      </Typography>

     


      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or need assistance, feel free to contact us at [Insert Contact Info]. We're here to help!
      </Typography>
    </Container>
  );
};

export default AboutUs;
