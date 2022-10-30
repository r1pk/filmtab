import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import { CreateRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks';

import { colyseus } from '@/redux';

const CreateRoom = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const roomId = useSelector((store) => store.room.roomId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRoomMember = Boolean(roomId);

  const handleCreateRoom = async (data) => {
    setIsFormDisabled(true);
    const result = await dispatch(colyseus.createRoom({ username: data.username }));

    if (result) {
      const { roomId } = result.payload;

      navigate(`/rooms/${roomId}`);
    }
    setIsFormDisabled(false);
  };

  useDocumentTitle('Create room');

  return (
    <Grid container columns={16} sx={{ justifyContent: 'center', my: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <CreateRoomForm onCreateRoom={handleCreateRoom} disableForm={isFormDisabled || isRoomMember} />
      </Grid>
    </Grid>
  );
};

export default CreateRoom;
