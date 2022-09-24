import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FBAE3C',
      },
      background: {
        main: '#161E26',
      },
    },
  })
);
