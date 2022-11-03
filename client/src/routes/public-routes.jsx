import { Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import RoomInvite from '@/pages/RoomInvite';

export const publicRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: 'rooms',
        children: [
          {
            path: ':roomId',
            children: [
              {
                index: true,
                element: <Navigate to="./join-room" />,
              },
              {
                path: 'join-room',
                element: <RoomInvite />,
              },
            ],
          },
        ],
      },
    ],
  },
];
