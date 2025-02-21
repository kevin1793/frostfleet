// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled logo component
const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <LogoTypography
          variant="h6"
          component="div"
          onClick={handleLogoClick}
        >
          MyApp
        </LogoTypography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            onClick={handleLoginClick}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            onClick={handleSignupClick}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;