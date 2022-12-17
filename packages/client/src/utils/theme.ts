import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C9FB8',
      light: '#7B9680',
      dark: '#656075',
    },
    secondary: {
      main: '#A7B1B1',
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});