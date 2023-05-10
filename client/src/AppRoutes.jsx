import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import MainLayout from '@/layouts/main/MainLayout';

import Home from '@/pages/Home';
import Room from '@/pages/Room';
import RoomInvite from '@/pages/RoomInvite';

import ProtectedOutlet from '@/components/misc/ProtectedOutlet';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.id);
  const location = useLocation();

  const isRoomMember = Boolean(roomId);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route element={<ProtectedOutlet disabled={isRoomMember} fallback={`${location.pathname}/join-room`} />}>
          <Route path="rooms">
            <Route path=":roomId" element={<Room />} />
          </Route>
        </Route>

        <Route path="rooms/:roomId/join-room" element={<RoomInvite />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
