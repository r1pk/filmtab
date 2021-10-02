import { Grid } from '@mui/material';

import CreateRoom from '../components/Forms/CreateRoom';
import JoinRoom from '../components/Forms/JoinRoom';

const Home = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} sm={6} md={5} lg={4} xl={3}>
        <JoinRoom onJoinRoom={() => {}} />
      </Grid>
      <Grid item xs={11} sm={6} md={5} lg={4} xl={3}>
        <CreateRoom onCreateRoom={() => {}} />
      </Grid>
    </Grid>
  );
};

export default Home;
