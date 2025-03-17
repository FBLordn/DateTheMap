import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7b967a',
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
      main: '#A9C3A8',
    },
    secondary: {
      main: '#D8A48C',
    },
    error: {
      main: '#e01b1b',
    },
    background: {
      default: '#F5F5F5',
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