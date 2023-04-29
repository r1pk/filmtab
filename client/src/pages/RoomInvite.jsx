import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { Paper, Stack, Typography, Link } from '@mui/material';

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
    <Grid container columns={16} sx={{ justifyContent: 'center' }}>
      <Grid xs={16} sm={10} md={8} lg={5}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h2" sx={{ p: 2, pb: 0, textAlign: 'center' }}>
              {import.meta.env.VITE_BASE_APP_TITLE}
            </Typography>
            <JoinRoomForm onJoinRoom={handleJoinRoom} roomId={params?.roomId} elevation={2} />
          </Stack>
        </Paper>
        <Link component={RouterLink} to="/" variant="body2" sx={{ display: 'block', textAlign: 'center', my: 2 }}>
          Back to Home
        </Link>
      </Grid>
    </Grid>
  );
};

export default RoomInvite;
