import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Grid } from '@mui/material';

import JoinRoomForm from '@/components/room/JoinRoomForm';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';
import { actions } from '@/redux';

const JoinRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJoinRoom = async (data) => {
    try {
      const room = await colyseus.joinById(data.roomId, {
        username: data.username,
      });

      dispatch(actions.room.setRoomId({ id: room.id }));
      dispatch(actions.session.setUser({ id: room.sessionId, username: data.username }));
      navigate(`/rooms/${room.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useDocumentTitle('Join Room');

  return (
    <Grid container columns={16} sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <JoinRoomForm onJoinRoom={handleJoinRoom} />
      </Grid>
    </Grid>
  );
};

export default JoinRoom;
