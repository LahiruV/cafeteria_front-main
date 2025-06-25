import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.setItem('cusmail', 'empty');
    window.location.href = '/';
  };
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/MenuPage', label: 'Menu' },
    { to: '/CartPage', label: 'Cart' },
    { to: '/AboutUs', label: 'About' },
    { to: '/Feedback', label: 'Feedback' },
    { to: '/Support', label: 'Support' },
    { to: '/Orders', label: 'Your Orders' },
    { to: '/Profile', label: 'Profile' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, pl: '25px', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: '#FFA500', textDecoration: 'none' }}>Cake Caravan</Link>
        </Typography>
        {navLinks.map((link) => (
          <Typography key={link.to} variant="subtitle1" sx={{ mr: 2 }}>
            <Link to={link.to} style={{ color: '#fff', textDecoration: 'none' }}>{link.label}</Link>
          </Typography>
        ))}
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          <Link onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none' }}>Log Out</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
