import { MainLayout } from '@/layouts';

import Landing from '@/pages/Landing';

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
];
