import { Provider } from 'react-redux';
import { store } from '@/redux';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer theme="dark" position={toast.POSITION.BOTTOM_LEFT} />
      </ThemeProvider>
    </Provider>
  );
};
