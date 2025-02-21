// src/components/Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Money as ExpensesIcon,
  Receipt as InvoicesIcon,
  Build as ServiceRecordsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Expenses', icon: <ExpensesIcon sx={{ color: 'white' }} />, path: '/expenses' },
    { text: 'Invoices', icon: <InvoicesIcon sx={{ color: 'white' }} />, path: '/invoices' },
    { text: 'Service Records', icon: <ServiceRecordsIcon sx={{ color: 'white' }} />, path: '/service-records' },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu Button when drawer is closed */}
      {!open && (
        <Box
          sx={{
            position: 'fixed',
            top: 60, // 70px from top
            left: 0,
            width: '50px', // Width of the closed sidebar
            height: '100vh', // Full height
            backgroundColor: '#1976d2', // Blue background when closed
            zIndex: 1201,
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: '10px',
          }}
        >
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ 
              color: 'white', // White icon color to contrast with blue
              marginLeft: '6px'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#1976d2', // Blue background when closed
            color:'white',
            boxSizing: 'border-box',
            top: 60, // 70px from top
            height: 'calc(100% - 70px)', // Adjust height to account for top offset
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton 
            onClick={handleDrawerClose}
            sx={{ 
              color: 'white', // Explicitly set Chevron to white
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;