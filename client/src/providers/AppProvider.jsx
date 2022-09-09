import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { store } from '@/redux';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ToastContainer theme="dark" position={toast.POSITION.BOTTOM_LEFT} />
      </ThemeProvider>
    </Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
