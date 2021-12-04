import AppThemeProvider from './components/AppThemeProvider';

import FilmTabRouting from './FilmTabRouting';

import { NotificationsContainer } from './features/notifications';

const FilmTab = () => {
  return (
    <AppThemeProvider>
      <FilmTabRouting />
      <NotificationsContainer />
    </AppThemeProvider>
  );
};

export default FilmTab;
