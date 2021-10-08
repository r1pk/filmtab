import { useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Layout, { appTheme } from './components/Layout';
import ProtectedRoute from './components/Shared/ProtectedRoute ';

import Home from './pages/Home';
import Room from './pages/Room';

const FilmTab = () => {
  const isRoomMember = useSelector((state) => state.server.isRoomMember);
  const activeRoomId = useSelector((state) => state.server.activeRoomId);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Switch>
            <ProtectedRoute exact path="/" routeEnabled={!isRoomMember} fallbackPath={`/rooms/${activeRoomId}`}>
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/rooms/:roomId" routeEnabled={isRoomMember} fallbackPath="/">
              <Room />
            </ProtectedRoute>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default FilmTab;
