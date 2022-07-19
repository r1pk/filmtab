import { Provider } from 'react-redux';
import { store } from './store';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { NotificationsContainer } from './features/notifications';

import FilmTabRouting from './FilmTabRouting';

import { history } from './history';
import { theme } from './theme';

const FilmTab = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationsContainer>
          <HistoryRouter history={history} basename={process.env.PUBLIC_URL}>
            <FilmTabRouting />
          </HistoryRouter>
        </NotificationsContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default FilmTab;
