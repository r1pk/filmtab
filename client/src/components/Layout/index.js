import PropTypes from 'prop-types';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import Header from './Header';

const appTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header brandName="FilmTab" />
      {children}
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
