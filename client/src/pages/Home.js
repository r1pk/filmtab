import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';

import CreateRoomCardContainer from '../containers/CreateRoomCard';
import JoinRoomCardContainer from '../containers/JoinRoomCard';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  const isRoomMember = useSelector((state) => state.room.isRoomMember);
  const activeRoomId = useSelector((state) => state.room.activeRoomId);

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
