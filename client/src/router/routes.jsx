import { MainLayout } from '@/layouts';

import Home from '@/pages/Home';
import Room from '@/pages/Room';

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
