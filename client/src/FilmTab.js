import { useSelector } from 'react-redux';
import { HashRouter, Switch } from 'react-router-dom';

import Notification from './containers/Notification';

import Layout from './components/Layout';
import ProtectedRoute from './components/Shared/ProtectedRoute ';

import Home from './pages/Home';
import Room from './pages/Room';

const FilmTab = () => {
  const isRoomMember = useSelector((state) => state.room.isRoomMember);
  const activeRoomId = useSelector((state) => state.room.activeRoomId);

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Switch>
          <ProtectedRoute exact path="/" routeEnabled={!isRoomMember} fallbackPath={`/rooms/${activeRoomId}`}>
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path="/rooms/:roomId" routeEnabled={isRoomMember} fallbackPath="/">
            <Room />
          </ProtectedRoute>
        </Switch>
        <Notification />
      </Layout>
    </HashRouter>
  );
};

export default FilmTab;
