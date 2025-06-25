import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/AboutUs', label: 'About' },
    { to: '/Login', label: 'Login' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, pl: '25px', fontWeight: 'bold' }}>
          <Link to="/New" style={{ color: '#FFA500', textDecoration: 'none' }}>Cake Caravan</Link>
        </Typography>
        {navLinks.map((link) => (
          <Typography key={link.to} variant="subtitle1" sx={{ mr: 2 }}>
            <Link to={link.to} style={{ color: '#fff', textDecoration: 'none' }}>{link.label}</Link>
          </Typography>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
