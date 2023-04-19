import { useSelector } from 'react-redux';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '@/layouts/main/MainLayout';

import Home from '@/pages/Home';
import CreateRoom from '@/pages/CreateRoom';
import JoinRoom from '@/pages/JoinRoom';
import Room from '@/pages/Room';
import RoomInvite from '@/pages/RoomInvite';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.id);

  const isRoomMember = Boolean(roomId);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="create-room" replace />} />

        {/* Common routes */}
        <Route element={<Home />}>
          <Route path="create-room" element={<CreateRoom />} />
          <Route path="join-room" element={<JoinRoom />} />
        </Route>

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
