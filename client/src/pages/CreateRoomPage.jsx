import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Grid } from '@mui/material';

import { CreateRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/api/colyseus';
import { actions } from '@/redux';

const CreateRoomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateRoom = async (data) => {
    try {
      const room = await colyseus.create('video-room', {
        username: data.username,
      });

      dispatch(actions.room.setRoomId({ id: room.id }));
      dispatch(actions.session.setUser({ id: room.sessionId, username: data.username }));
      navigate(`/rooms/${room.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useDocumentTitle('Create Room');

  return (
    <Grid container columns={16} sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <CreateRoomForm onCreateRoom={handleCreateRoom} />
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
