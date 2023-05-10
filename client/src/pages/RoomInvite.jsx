import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid, Link, Paper, Stack, Typography } from '@mui/material';

import JoinRoomForm from '@/components/room/JoinRoomForm';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';

import { actions } from '@/redux/actions';

const RoomInvite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const setupRoomPage = async () => {
    const { id, sessionId, state } = colyseus.room;
    const { users, video } = JSON.parse(JSON.stringify(state));
    const username = state.users.get(sessionId).username;

    await dispatch(actions.room.setRoomId(id));
    await dispatch(actions.room.setRoomUsers(Object.values(users)));
    await dispatch(actions.session.setSessionUser({ id: sessionId, username: username }));
    await dispatch(actions.video.setVideoState(video));

    navigate(`/rooms/${id}`);
  };

  const handleJoinRoomFormSubmit = async (data) => {
    try {
      await colyseus.joinById(data.roomId, {
        username: data.username,
      });

      colyseus.room.onStateChange.once(() => {
        setupRoomPage();
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
            <JoinRoomForm roomId={params?.roomId} onSubmit={handleJoinRoomFormSubmit} elevation={2} />
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
