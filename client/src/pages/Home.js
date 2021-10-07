import { Grid } from '@mui/material';

import CreateRoomContainer from '../containers/CreateRoom';
import JoinRoomContainer from '../containers/JoinRoom';

const Home = () => {
  return (
    <Grid container justifyContent="center" direction="row">
      <Grid item>
        <JoinRoomContainer />
      </Grid>
      <Grid item>
        <CreateRoomContainer />
      </Grid>
    </Grid>
  );
};

export default Home;
