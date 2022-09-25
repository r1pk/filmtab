import { Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import { RouterParams } from '../components';

export const publicRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: 'rooms',
        children: [
          {
            path: ':roomId',
            element: <RouterParams>{(params) => <Navigate to="/join-room" state={{ ...params }} />}</RouterParams>,
          },
        ],
      },
    ],
  },
];
