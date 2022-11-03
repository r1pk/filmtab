import { Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import Home from '@/pages/Home';
import CreateRoom from '@/pages/CreateRoom';
import JoinRoom from '@/pages/JoinRoom';

export const commonRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/create-room" replace />,
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
    ],
  },
];
