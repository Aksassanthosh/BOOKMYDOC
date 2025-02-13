import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Effective Date: [Insert Date]
        </Typography>
        <Typography variant="body1" paragraph>
          At [Your Company Name], we value your privacy and are committed to protecting the personal data you share with us. This Privacy Policy outlines how we collect, use, store, and safeguard your information when you use our services.
        </Typography>
        
        <Typography variant="h6" paragraph>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect personal information such as name, email address, phone number, and medical information for patient and doctor profiles. We may also collect non-personal data, such as IP address and usage data.
        </Typography>

        <Typography variant="h6" paragraph>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          Your personal information is used to provide our services, including managing appointments, sending reminders, and improving our platform. We may also send promotional material if you have opted-in to receive such communications.
        </Typography>

        <Typography variant="h6" paragraph>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell or rent your personal information. However, we may share your data with third-party service providers for operational purposes such as scheduling or payment processing.
        </Typography>

        <Typography variant="h6" paragraph>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement reasonable security measures to protect your information, but no data transmission over the internet is completely secure.
        </Typography>

        <Typography variant="h6" paragraph>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to access, update, and delete your personal data. You may also withdraw consent for marketing communications at any time.
        </Typography>

        <Typography variant="h6" paragraph>
          6. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will become effective when published.
        </Typography>

        <Typography variant="h6" paragraph>
          7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Privacy Policy, please contact us at [Insert Contact Info].
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
