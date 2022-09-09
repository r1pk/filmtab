import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FBAE3C',
      },
      secondary: {
        main: '#3c88fb',
      },
    },
  })
);
