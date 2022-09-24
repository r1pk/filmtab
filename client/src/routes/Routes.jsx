import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import Home from '@/pages/Home';
import CreateRoom from '@/pages/CreateRoom';
import JoinRoom from '@/pages/JoinRoom';
import Room from '@/pages/Room';

const Routes = () => {
  const routes = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/create-room" />,
        },
        {
          element: <Home />,
          children: [
            {
              path: 'create-room',
              element: <CreateRoom />,
            },
            {
              path: 'join-room',
              element: <JoinRoom />,
            },
          ],
        },
        {
          path: 'rooms',
          children: [
            {
              path: ':roomId',
              element: <Room />,
            },
          ],
        },
      ],
    },
  ]);

  return routes;
};

export default Routes;
