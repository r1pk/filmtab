import { useRoutes } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import Home from '@/pages/Home';
import Room from '@/pages/Room';

const Routes = () => {
  const routes = useRoutes([
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
  ]);

  return routes;
};

export default Routes;
