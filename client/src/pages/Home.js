import { useLocation } from 'react-router-dom';

import { Grid } from '@mui/material';

import CreateRoomContainer from '../containers/CreateRoom';
import JoinRoomContainer from '../containers/JoinRoom';

const Home = () => {
  const location = useLocation();

  return (
    <Grid container justifyContent="center" direction="row">
      <Grid item>
        <JoinRoomContainer defaultRoomId={location.state?.params.roomId} />
      </Grid>
      <Grid item>
        <CreateRoomContainer />
      </Grid>
    </Grid>
  );
};

export default Home;
