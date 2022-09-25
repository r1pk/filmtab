import { useSelector } from 'react-redux';

import { useRoutes } from 'react-router-dom';

import { commonRoutes, protectedRoutes, publicRoutes } from './routes';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.roomId);

  const isRoomMember = Boolean(roomId);
  const routes = isRoomMember ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};

export default AppRoutes;
