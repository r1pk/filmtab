import { useLocation } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';

import CreateRoomCardContainer from '../containers/CreateRoomCard';
import JoinRoomCardContainer from '../containers/JoinRoomCard';

const Home = () => {
  const location = useLocation();

  return (
    <Grid container justifyContent="center" direction="row" spacing={1} mt={2}>
      <Grid item xs={12}>
        <Typography variant="h1" component="div" textAlign="center">
          FilmTab
        </Typography>
      </Grid>
      <Grid item>
        <JoinRoomCardContainer defaultRoomId={location.state?.params.roomId} />
      </Grid>
      <Grid item>
        <CreateRoomCardContainer />
      </Grid>
    </Grid>
  );
};

export default Home;
