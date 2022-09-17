import { MainLayout } from '@/layouts';

import Landing from '@/pages/Landing';
import Room from '@/pages/Room';

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
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
];
