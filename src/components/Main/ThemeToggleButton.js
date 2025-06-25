import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Tooltip from '@mui/material/Tooltip';
import { ThemeContext } from '../../ThemeContext';

const ThemeToggleButton = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip title="Change Theme">
      <IconButton color="inherit" onClick={toggleTheme} data-testid="theme-toggle">
        <ColorLensIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
