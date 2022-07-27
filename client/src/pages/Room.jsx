import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { Grid, Stack, Backdrop, Link } from '@mui/material';

import { VideoAddressBarContainer, VideoPlayerContainer, TheaterModeBox } from '../features/video';
import { TheaterModeButton, SetSubtitlesButtonContainer, ClearSubtitlesButtonContainer } from '../features/video';
import { JoinRoomCardContainer, LeaveRoomButtonContainer, UserListContainer, actions } from '../features/affiliation';
import { ChatContainer } from '../features/chat';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Room = () => {
  const isRoomMember = useSelector((store) => store.affiliation.isRoomMember);
  const dispatch = useDispatch();

  const [isTheaterModeActive, setIsTheaterModeActive] = useState(false);
  const theaterModeGridSizes = { xs: 12, md: 12, lg: 12, xl: 12 };

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
            <TheaterModeBox isTheaterModeActive={isTheaterModeActive}>
              <VideoPlayerContainer />
            </TheaterModeBox>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end" alignItems="center">
              <SetSubtitlesButtonContainer />
              <ClearSubtitlesButtonContainer />
              <TheaterModeButton
                isTheaterModeActive={isTheaterModeActive}
                onToggleTheaterMode={handleToggleTheaterMode}
              />
            </Stack>
            <UserListContainer />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
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
