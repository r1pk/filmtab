import { Provider } from 'react-redux';
import { store } from '@/redux';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme';

import { BrowserRouter } from 'react-router-dom';
import { Routes } from '@/routes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppProvider = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ToastContainer theme="dark" position={toast.POSITION.BOTTOM_LEFT} />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
