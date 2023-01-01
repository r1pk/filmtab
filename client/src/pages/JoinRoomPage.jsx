import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import { JoinRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks';

import { colyseus } from '@/redux';

const JoinRoomPage = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const roomId = useSelector((store) => store.room.roomId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRoomMember = Boolean(roomId);

  const handleJoinRoom = async (data) => {
    setIsFormDisabled(true);
    const result = await dispatch(colyseus.joinRoom({ roomId: data.roomId, username: data.username }));

    if (result) {
      navigate(`/rooms/${result.payload.roomId}`);
    }
    setIsFormDisabled(false);
  };

  useDocumentTitle('Join room');

  return (
    <Grid container columns={16} sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <JoinRoomForm onJoinRoom={handleJoinRoom} disableForm={isFormDisabled || isRoomMember} />
      </Grid>
    </Grid>
  );
};

export default JoinRoomPage;
