import { MainLayout } from '@/layouts';

import Room from '@/pages/Room';

export const protectedRoutes = [
  {
    element: <MainLayout />,
    children: [
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
];
