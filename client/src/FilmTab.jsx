import { Provider } from 'react-redux';
import { store } from './store';

import AppThemeProvider from './components/AppThemeProvider';

import FilmTabRouting from './FilmTabRouting';

import { NotificationsContainer } from './features/notifications';

const FilmTab = () => {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <FilmTabRouting />
        <NotificationsContainer />
      </AppThemeProvider>
    </Provider>
  );
};

export default FilmTab;
