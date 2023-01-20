import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Grid, Paper, Typography, Link as MUILink } from '@mui/material';

import { JoinRoomForm } from '@/features/room';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/redux';

const RoomInvitePage = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const roomId = useSelector((store) => store.room.roomId);

  const dispatch = useDispatch();
  const params = useParams();
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

  useDocumentTitle(`Join room [${params.roomId}]`);

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

      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <JoinRoomForm
          onJoinRoom={handleJoinRoom}
          roomId={params?.roomId}
          disableForm={isFormDisabled || isRoomMember}
        />
        <MUILink to="/" variant="body2" sx={{ display: 'block', textAlign: 'center', my: 2 }} component={Link}>
          Back to Home
        </MUILink>
      </Grid>
    </Grid>
  );
};

export default RoomInvitePage;
