import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';

import { CreateRoomCardContainer, JoinRoomCardContainer } from '../features/room';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  const isRoomMember = useSelector((store) => store.room.isRoomMember);
  const activeRoomId = useSelector((store) => store.room.activeRoomId);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRoomMember) {
      navigate(`rooms/${activeRoomId}`);
    }
  }, [navigate, isRoomMember, activeRoomId]);

  useDocumentTitle('FilmTab - Home');

  return (
    <Grid container justifyContent="center" direction="row" spacing={1} mt={2}>
      <Grid item xs={12}>
        <Typography variant="h1" component="div" textAlign="center">
          FilmTab
        </Typography>
      </Grid>
      <Grid item>
        <JoinRoomCardContainer defaultRoomId={location.state?.roomId} />
      </Grid>
      <Grid item>
        <CreateRoomCardContainer />
      </Grid>
    </Grid>
  );
};

export default Home;
