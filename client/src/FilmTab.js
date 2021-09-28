import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Layout, { appTheme } from './components/Layout';

const FilmTab = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Layout></Layout>
    </ThemeProvider>
  );
};

export default FilmTab;
