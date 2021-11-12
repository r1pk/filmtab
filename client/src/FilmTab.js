import AppThemeProvider from './components/AppThemeProvider';

import FilmTabRouting from './FilmTabRouting';

import Notification from './containers/Notification';

const FilmTab = () => {
  return (
    <AppThemeProvider>
      <FilmTabRouting />
      <Notification />
    </AppThemeProvider>
  );
};

export default FilmTab;
