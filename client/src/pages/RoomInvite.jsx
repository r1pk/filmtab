import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid } from '@mui/material';
import { Paper, Stack, Typography, Link } from '@mui/material';

import JoinRoomForm from '@/components/room/JoinRoomForm';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';
import { actions } from '@/redux/actions';

const RoomInvite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleRoomReady = () => {
    const { id, sessionId, state } = colyseus.room;
    const { users, video } = JSON.parse(JSON.stringify(state));
    const username = state.users.get(sessionId).username;

    dispatch(actions.room.setRoomId(id));
    dispatch(actions.room.setRoomUsers(Object.values(users)));
    dispatch(actions.session.setSessionUser({ id: sessionId, username: username }));
    dispatch(actions.video.setVideoState(video));

    navigate(`/rooms/${id}`);
  };

  const handleJoinRoom = async (data) => {
    try {
      await colyseus.joinById(data.roomId, {
        username: data.username,
      });

      colyseus.room.onStateChange.once(() => {
        handleRoomReady();
      });
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
