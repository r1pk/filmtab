import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { Grid, Stack, Backdrop, Link } from '@mui/material';

import { VideoAddressBarContainer, VideoPlayerContainer, TheaterModeButton } from '../features/video';
import { UsersContainer } from '../features/users';
import { JoinRoomCardContainer, LeaveRoomButtonContainer, actions } from '../features/room';
import { ChatContainer } from '../features/chat';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Room = () => {
  const isRoomMember = useSelector((store) => store.room.isRoomMember);
  const dispatch = useDispatch();

  const [isTheaterModeActive, setIsTheaterModeActive] = useState(false);
  const theaterModeGridSizes = { xs: 11, md: 10, lg: 10, xl: 9 };

  const handleToggleTheaterMode = () => {
    setIsTheaterModeActive(!isTheaterModeActive);
  };

  const { roomId } = useParams();

  useEffect(() => {
    return () => {
      if (isRoomMember) {
        dispatch(actions.leaveRoom());
      }
    };
  }, [dispatch, isRoomMember]);

  useDocumentTitle(`FilmTab - Room: ${roomId}`);

  return (
    <>
      <Backdrop open={!isRoomMember} sx={{ zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <Stack alignItems="center" spacing={1}>
          <JoinRoomCardContainer defaultRoomId={roomId} />
          <Link to="/" variant="body2" underline="hover" component={RouterLink}>
            Go Back
          </Link>
        </Stack>
      </Backdrop>
      <Grid container justifyContent="center" my={2} spacing={1}>
        <Grid item xs={11} md={10} lg={8} xl={6} {...(isTheaterModeActive && theaterModeGridSizes)}>
          <Stack spacing={1}>
            <VideoAddressBarContainer />
            <VideoPlayerContainer />
            <UsersContainer />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <TheaterModeButton
                isTheaterModeActive={isTheaterModeActive}
                onToggleTheaterMode={handleToggleTheaterMode}
              />
              <LeaveRoomButtonContainer />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={11} md={10} lg="auto">
          <ChatContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
