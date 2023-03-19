import { useSelector } from 'react-redux';

import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts/main';

import HomePage from '@/pages/HomePage';
import CreateRoomPage from '@/pages/CreateRoomPage';
import JoinRoomPage from '@/pages/JoinRoomPage';
import RoomInvitePage from '@/pages/RoomInvitePage';
import RoomPage from '@/pages/RoomPage';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.id);

  const isRoomMember = Boolean(roomId);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="create-room" replace />} />

        {/* Common routes */}
        <Route element={<HomePage />}>
          <Route path="create-room" element={<CreateRoomPage />} />
          <Route path="join-room" element={<JoinRoomPage />} />
        </Route>

        {/* Protected routes */}
        {isRoomMember && (
          <Route path="rooms">
            <Route path=":roomId" element={<RoomPage />} />
          </Route>
        )}

        {/* Fallback routes */}
        {!isRoomMember && (
          <Route path="rooms">
            <Route path=":roomId">
              <Route index element={<Navigate to="join-room" />} />
              <Route path="join-room" element={<RoomInvitePage />} />
            </Route>
          </Route>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
