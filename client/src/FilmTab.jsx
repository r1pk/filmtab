import { Provider } from 'react-redux';
import { store } from './store';

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './history';

import AppThemeProvider from './components/AppThemeProvider';

import FilmTabRouting from './FilmTabRouting';

import { NotificationsContainer } from './features/notifications';

const FilmTab = () => {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <NotificationsContainer>
          <HistoryRouter history={history} basename={process.env.PUBLIC_URL}>
            <FilmTabRouting />
          </HistoryRouter>
        </NotificationsContainer>
      </AppThemeProvider>
    </Provider>
  );
};

export default FilmTab;
