import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { dark } from '@/themes/dark';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={dark}>
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
