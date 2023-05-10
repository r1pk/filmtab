import { createTheme, responsiveFontSizes } from '@mui/material';

export const dark = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FBAE3C',
      },
    },
  })
);
