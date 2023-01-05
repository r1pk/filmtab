import { Provider } from 'react-redux';
import { store } from '@/redux';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from '@/theme/darkTheme';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer theme="dark" position={toast.POSITION.BOTTOM_LEFT} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
