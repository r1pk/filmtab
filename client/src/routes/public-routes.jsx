import { Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import RouterParamsProvider from './components/RouterParamsProvider';

export const publicRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: 'rooms',
        children: [
          {
            path: ':roomId',
            element: (
              <RouterParamsProvider>
                {(params) => <Navigate to="/join-room" state={{ ...params }} />}
              </RouterParamsProvider>
            ),
          },
        ],
      },
    ],
  },
];
