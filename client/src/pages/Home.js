import { Grid } from '@mui/material';

import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';

const Home = () => {
  const sx = { m: 1, p: 2, border: '1px solid #282828' };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} sm={6} md={5} lg={4} xl={3}>
        <JoinRoom onJoinRoom={() => {}} sx={sx} />
      </Grid>
      <Grid item xs={11} sm={6} md={5} lg={4} xl={3}>
        <CreateRoom onCreateRoom={() => {}} sx={sx} />
      </Grid>
    </Grid>
  );
};

export default Home;
