// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  maxWidth: 400,
  margin: '0 auto',
}));

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <StyledPaper elevation={3}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          color="primary"
        >
          Welcome
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center"
        >
          Please choose an option to continue
        </Typography>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={handleSignup}
            fullWidth
          >
            Sign Up
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default HomePage;