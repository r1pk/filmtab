import { createTheme, responsiveFontSizes } from '@mui/material';
import { deepmerge } from '@mui/utils';

import { base } from './base';

export const dark = responsiveFontSizes(
  createTheme(
    deepmerge(base, {
      palette: {
        mode: 'dark',
        primary: {
          main: '#FBAE3C',
        },
      },
    })
  )
);
