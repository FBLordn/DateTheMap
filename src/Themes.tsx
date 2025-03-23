import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7b967a',
    },
    secondary: {
      main: '#45637b',
    },
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#20120d',
      paper: '#311807',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 300,
  },
  shape: {
    borderRadius: 20,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#82b580',
    },
    secondary: {
      main: '#6195bf',
    },
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#695439',
      paper: '#a48b69',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 300,
  },
  shape: {
    borderRadius: 20,
  },
});