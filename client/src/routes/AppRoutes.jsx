import { useSelector } from 'react-redux';

import { useRoutes } from 'react-router-dom';

import { commonRoutes } from './common-routes';
import { protectedRoutes } from './protected-routes';
import { publicRoutes } from './public-routes';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.roomId);

  const isRoomMember = Boolean(roomId);
  const routes = isRoomMember ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};

export default AppRoutes;
