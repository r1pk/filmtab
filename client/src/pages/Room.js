import { Grid, Stack } from '@mui/material';

import Player from '../containers/Player';
import VideoAddressBar from '../containers/VideoAddressBar';
import UserList from '../containers/UserList';

const Room = () => {
  return (
    <Grid container justifyContent="center" mt={2}>
      <Grid item xs={11} md={10} lg={8} xl={6}>
        <Stack spacing={1}>
          <VideoAddressBar />
          <Player />
          <UserList />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
