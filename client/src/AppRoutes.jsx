import { useSelector } from 'react-redux';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '@/layouts/main/MainLayout';

import Home from '@/pages/Home';
import Room from '@/pages/Room';
import RoomInvite from '@/pages/RoomInvite';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.id);

  const isRoomMember = Boolean(roomId);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Common routes */}
        <Route index element={<Home />} />

        {/* Protected routes */}
        {isRoomMember && (
          <Route path="rooms">
            <Route path=":roomId" element={<Room />} />
          </Route>
        )}

        {/* Fallback routes */}
        {!isRoomMember && (
          <Route path="rooms">
            <Route path=":roomId">
              <Route index element={<Navigate to="join-room" />} />
              <Route path="join-room" element={<RoomInvite />} />
            </Route>
          </Route>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
