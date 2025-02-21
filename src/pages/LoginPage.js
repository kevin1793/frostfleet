// src/pages/LoginPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Login Page
      </Typography>
      <Typography>
        This is where your login form would go
      </Typography>
    </Container>
  );
};

export default LoginPage;