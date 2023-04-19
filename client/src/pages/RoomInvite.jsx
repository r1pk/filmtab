import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid, Paper, Typography, Link } from '@mui/material';

import JoinRoomForm from '@/components/room/JoinRoomForm';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';
import { actions } from '@/redux';

const RoomInvite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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

  useDocumentTitle('Room Invite');

  return (
    <Grid container columns={16} spacing={2} sx={{ justifyContent: 'center' }}>
      <Grid container xs={16} sx={{ justifyContent: 'center' }}>
        <Grid xs={16} sm={12} md={8} lg={6}>
          <Paper>
            <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
              {import.meta.env.VITE_BASE_APP_TITLE}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid xs={12} sm={8} md={6} lg={4}>
        <JoinRoomForm onJoinRoom={handleJoinRoom} roomId={params?.roomId} />
        <Link component={RouterLink} to="/" variant="body2" sx={{ display: 'block', textAlign: 'center', my: 2 }}>
          Back to Home
        </Link>
      </Grid>
    </Grid>
  );
};

export default RoomInvite;
