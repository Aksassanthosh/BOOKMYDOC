import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Security = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Security
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Effective Date: [Insert Date]
        </Typography>
        <Typography variant="body1" paragraph>
          At [Your Company Name], we take the security of your data seriously. We have implemented various security measures to ensure the protection of your personal information.
        </Typography>
        
        <Typography variant="h6" paragraph>
          1. Data Encryption
        </Typography>
        <Typography variant="body1" paragraph>
          All sensitive data, including medical records and personal information, is encrypted using industry-standard encryption algorithms both in transit (SSL/TLS) and at rest.
        </Typography>

        <Typography variant="h6" paragraph>
          2. Authentication and Authorization
        </Typography>
        <Typography variant="body1" paragraph>
          We use secure authentication methods, such as two-factor authentication (2FA), to ensure that only authorized users can access sensitive information.
        </Typography>

        <Typography variant="h6" paragraph>
          3. Regular Security Audits
        </Typography>
        <Typography variant="body1" paragraph>
          We conduct regular security audits to identify vulnerabilities and ensure that our systems remain secure against new threats.
        </Typography>

        <Typography variant="h6" paragraph>
          4. Secure Communication
        </Typography>
        <Typography variant="body1" paragraph>
          All communication between users and our servers is transmitted over encrypted channels using SSL/TLS to prevent interception and eavesdropping.
        </Typography>

        <Typography variant="h6" paragraph>
          5. Data Retention and Deletion
        </Typography>
        <Typography variant="body1" paragraph>
          We retain personal and medical data only for as long as necessary to provide our services and comply with legal obligations. Data is securely deleted once it's no longer needed.
        </Typography>

        <Typography variant="h6" paragraph>
          6. User Responsibility
        </Typography>
        <Typography variant="body1" paragraph>
          We encourage users to take appropriate steps to secure their own accounts, such as choosing strong passwords and keeping their login information confidential.
        </Typography>

        <Typography variant="h6" paragraph>
          7. Third-Party Security
        </Typography>
        <Typography variant="body1" paragraph>
          We work with third-party vendors who comply with similar security standards to ensure the safe handling of your data.
        </Typography>

        <Typography variant="h6" paragraph>
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about the security of your data, please contact us at [Insert Contact Info].
        </Typography>
      </Box>
    </Container>
  );
};

export default Security;
