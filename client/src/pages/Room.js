import { useParams } from 'react-router-dom';

import { Grid, Stack } from '@mui/material';

import Player from '../containers/Player';
import VideoAddressBar from '../containers/VideoAddressBar';
import UserList from '../containers/UserList';
import LeaveRoomButton from '../containers/LeaveRoomButton';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Room = () => {
  const { roomId } = useParams();

  useDocumentTitle(`FilmTab - Room: ${roomId}`);

  return (
    <Grid container justifyContent="center" mt={2}>
      <Grid item xs={11} md={10} lg={8} xl={6}>
        <Stack spacing={1}>
          <VideoAddressBar />
          <Player />
          <UserList />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <LeaveRoomButton />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
