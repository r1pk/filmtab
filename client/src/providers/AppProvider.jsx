import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { store } from '@/redux';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme';

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
