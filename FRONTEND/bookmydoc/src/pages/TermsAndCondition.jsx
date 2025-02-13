import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Effective Date: [Insert Date]
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms and Conditions ("Terms") govern your use of the [Your Company Name] website and services. By using our services, you agree to be bound by these Terms.
        </Typography>
        
        <Typography variant="h6" paragraph>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using our services, you agree to comply with these Terms and all applicable laws and regulations.
        </Typography>

        <Typography variant="h6" paragraph>
          2. Use of Services
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others or disrupt the services.
        </Typography>

        <Typography variant="h6" paragraph>
          3. Account Security
        </Typography>
        <Typography variant="body1" paragraph>
          You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
        </Typography>

        <Typography variant="h6" paragraph>
          4. Payment and Billing
        </Typography>
        <Typography variant="body1" paragraph>
          If applicable, you agree to provide accurate billing information and authorize the processing of payments for services rendered.
        </Typography>

        <Typography variant="h6" paragraph>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          [Your Company Name] is not liable for any indirect, incidental, or consequential damages arising from the use of our services.
        </Typography>

        <Typography variant="h6" paragraph>
          6. Modifications to the Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and the revised Terms will be effective upon publication.
        </Typography>

        <Typography variant="h6" paragraph>
          7. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms shall be governed by the laws of [Insert Jurisdiction].
        </Typography>

        <Typography variant="h6" paragraph>
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          For any questions regarding these Terms, please contact us at [Insert Contact Info].
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
