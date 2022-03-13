import { useParams } from 'react-router-dom';

import { Grid, Stack } from '@mui/material';

import { VideoAddressBarContainer, VideoPlayerContainer } from '../features/video';
import { UsersContainer } from '../features/users';
import { LeaveRoomButtonContainer } from '../features/room';
import { ChatContainer } from '../features/chat';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Room = () => {
  const { roomId } = useParams();

  useDocumentTitle(`FilmTab - Room: ${roomId}`);

  return (
    <Grid container justifyContent="center" my={2} spacing={1}>
      <Grid item xs={11} md={10} lg={8} xl={6}>
        <Stack spacing={1}>
          <VideoAddressBarContainer />
          <VideoPlayerContainer />
          <UsersContainer />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <LeaveRoomButtonContainer />
          </Stack>
        </Stack>
      </Grid>
      <Grid item>
        <ChatContainer />
      </Grid>
    </Grid>
  );
};

export default Room;
