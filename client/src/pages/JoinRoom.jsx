import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { JoinRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks';

import { colyseus } from '@/redux';

const JoinRoom = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const roomId = useSelector((store) => store.room.roomId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRoomMember = Boolean(roomId);

  const handleJoinRoom = async (data) => {
    setIsFormDisabled(true);
    const result = await dispatch(colyseus.joinRoom({ roomId: data.roomId, username: data.username }));

    if (result) {
      const { roomId } = result.payload;

      navigate(`/rooms/${roomId}`);
    }
    setIsFormDisabled(false);
  };

  useDocumentTitle('Join room');

  return <JoinRoomForm onJoinRoom={handleJoinRoom} disableForm={isFormDisabled || isRoomMember} />;
};

export default JoinRoom;
