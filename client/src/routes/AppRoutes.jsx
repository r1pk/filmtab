import { useSelector } from 'react-redux';

import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import Home from '@/pages/Home';
import CreateRoom from '@/pages/CreateRoom';
import JoinRoom from '@/pages/JoinRoom';
import RoomInvite from '@/pages/RoomInvite';
import Room from '@/pages/Room';

const AppRoutes = () => {
  const roomId = useSelector((store) => store.room.roomId);

  const isRoomMember = Boolean(roomId);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/create-room" replace />} />

        <Route element={<Home />}>
          <Route path="create-room" element={<CreateRoom />} />
          <Route path="join-room" element={<JoinRoom />} />
        </Route>

        <Route path="rooms">
          {isRoomMember && <Route path=":roomId" element={<Room />} />}

          {!isRoomMember && (
            <Route path=":roomId">
              <Route index element={<Navigate to="./join-room" />} />
              <Route path="join-room" element={<RoomInvite />} />
            </Route>
          )}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
