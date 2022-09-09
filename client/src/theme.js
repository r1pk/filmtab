import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#d81b60',
      },
      secondary: {
        main: '#7b1fa2',
      },
    },
  })
);
