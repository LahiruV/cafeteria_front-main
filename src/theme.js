import { createTheme } from '@mui/material/styles';

export const themes = [
  createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#FFA500' }, // orange
      secondary: { main: '#f50057' },
    },
  }),
  createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#2196F3' }, // blue
      secondary: { main: '#f50057' },
    },
  }),
  createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#4CAF50' }, // green
      secondary: { main: '#f50057' },
    },
  }),
  createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#9c27b0' }, // purple
      secondary: { main: '#f50057' },
    },
  }),
];
