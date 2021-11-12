import PropTypes from 'prop-types';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const appTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AppThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

AppThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppThemeProvider;
