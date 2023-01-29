import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Grid, Paper, Typography, Link as MUILink } from '@mui/material';

import { JoinRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/api/colyseus';
import { actions } from '@/redux';

const RoomInvitePage = () => {
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
      <Grid item xs={16}>
        <Grid container columns={16} spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={16} sm={12} md={8} lg={6}>
            <Paper>
              <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
                FilmTab
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8} md={6} lg={4}>
        <JoinRoomForm onJoinRoom={handleJoinRoom} roomId={params?.roomId} />
        <MUILink to="/" variant="body2" sx={{ display: 'block', textAlign: 'center', my: 2 }} component={Link}>
          Back to Home
        </MUILink>
      </Grid>
    </Grid>
  );
};

export default RoomInvitePage;
