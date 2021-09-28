import PropTypes from 'prop-types';

import { createTheme } from '@mui/material/styles';

import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header brandName="FilmTab" />
      {children}
    </>
  );
};

const appTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
export { appTheme };
