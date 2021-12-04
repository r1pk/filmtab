import PropTypes from 'prop-types';

import { ThemeProvider as MUIThemeProvider, CssBaseline, createTheme } from '@mui/material';

const appTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <MUIThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ThemeProvider;
