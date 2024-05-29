import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a5c74',
    },
    secondary: {
      main: '#955d3f',
    },
    error: {
      main: '#e01b1b',
    },
    background: {
      default: '#1C1C1C',
      paper: '#1A2027',
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
      main: '#678cae',
    },
    secondary: {
      main: '#c3835d',
    },
    error: {
      main: '#e01b1b',
    },
    background: {
      default: '#e2e0e0',
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