import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Layout, { appTheme } from './components/Layout';

import Home from './pages/Home';

const FilmTab = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default FilmTab;
