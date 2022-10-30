import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import { JoinRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks';

import { colyseus } from '@/redux';

const JoinRoom = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const roomId = useSelector((store) => store.room.roomId);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isRoomMember = Boolean(roomId);
  const isRoomIdProvided = Boolean(location.state?.roomId);

  const defaultFormValues = {
    roomId: isRoomIdProvided ? location.state.roomId : '',
  };

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

  return (
    <Grid container columns={16} sx={{ justifyContent: 'center', my: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <JoinRoomForm
          onJoinRoom={handleJoinRoom}
          defaultValues={defaultFormValues}
          disableForm={isFormDisabled || isRoomMember}
          disableRoomIdInput={isRoomIdProvided}
        />
      </Grid>
    </Grid>
  );
};

export default JoinRoom;
