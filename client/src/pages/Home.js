import { Grid } from '@mui/material';

import CreateRoomContainer from '../containers/CreateRoom';
import JoinRoomContainer from '../containers/JoinRoom';

const Home = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} sm={6} md={5} lg={4} xl={3}>
        <JoinRoomContainer />
      </Grid>
      <Grid item xs={11} sm={6} md={5} lg={4} xl={3}>
        <CreateRoomContainer />
      </Grid>
    </Grid>
  );
};

export default Home;
