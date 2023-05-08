import { useRef, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Unstable_Grid2 as Grid, Stack, Paper, Box } from '@mui/material';

import Chat from '@/components/chat/Chat';
import LeaveRoomButton from '@/components/room/LeaveRoomButton';
import UserList from '@/components/room/UserList';
import DeleteSubtitlesButton from '@/components/video/DeleteSubtitlesButton';
import SetVideoForm from '@/components/video/SetVideoForm';
import UploadSubtitlesButton from '@/components/video/UploadSubtitlesButton';
import VideoPlayer from '@/components/video/VideoPlayer';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { colyseus } from '@/apis/colyseus';

import { actions } from '@/redux/actions';
import { store } from '@/redux/store';

const Room = () => {
  const player = useRef(null);

  const room = useSelector((store) => store.room);
  const video = useSelector((store) => store.video);
  const chat = useSelector((store) => store.chat);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaybackToggle = useCallback((progress) => {
    colyseus.room.send('video::toggle_playback', { progress: progress });
  }, []);

  const handleVideoSeek = useCallback((progress) => {
    colyseus.room.send('video::seek', { progress: progress });
  }, []);

  const handleVideoPlaying = useCallback(() => {
    if (store.getState().room.users.length > 1) {
      colyseus.room.send('video::request_progress');
    }
  }, []);

  const handleSetVideoFormSubmit = (data) => {
    colyseus.room.send('video::set_url', { url: data.url });
  };

  const handleSubtitlesLoaded = (subtitles) => {
    colyseus.room.send('video::set_subtitles', { subtitles: subtitles });
  };

  const handleDeleteSubtitlesButtonClick = () => {
    colyseus.room.send('video::delete_subtitles');
  };

  const handleSendMessage = (data) => {
    colyseus.room.send('chat::message', { content: data.content });
  };

  const handleClearChat = () => {
    dispatch(actions.chat.clearChat());
  };

  const handleLeaveRoomButtonClick = () => {
    colyseus.room.leave();
    dispatch(actions.store.clear());
    navigate('/');
  };

  useEffect(
    function setupCoreListeners() {
      const handleRoomState = (state) => {
        const { users, video } = JSON.parse(JSON.stringify(state));

        dispatch(actions.room.setRoomUsers(Object.values(users)));
        dispatch(actions.video.setVideoState(video));
      };

      const handleRoomError = (code, message) => {
        console.error(`Room error: ${code} - ${message}`);
        toast.error(message);
      };

      const handleChatMessage = (data) => {
        dispatch(actions.chat.addChatMessage(data));
      };

      const handleVideoLatestProgress = (data) => {
        dispatch(actions.video.setVideoProgress(data.progress));
      };

      const handleVideoProgressRequest = () => {
        if (player.current) {
          colyseus.room.send('video::latest_progress', { progress: player.current.getCurrentProgress() });
        }
      };

      colyseus.room.onStateChange(handleRoomState);
      colyseus.room.onError(handleRoomError);

      colyseus.room.onMessage('chat::message', handleChatMessage);
      colyseus.room.onMessage('video::latest_progress', handleVideoLatestProgress);
      colyseus.room.onMessage('video::request_progress', handleVideoProgressRequest);

      return function cleanup() {
        colyseus.room.removeAllListeners();
      };
    },
    [dispatch]
  );

  useDocumentTitle('Room');

  return (
    <Grid container columns={16} spacing={2} sx={{ justifyContent: 'center' }}>
      <Grid xs={16}>
        <SetVideoForm url={video.url} onSubmit={handleSetVideoFormSubmit} />
      </Grid>
      <Grid xs={16} lg={12}>
        <Stack spacing={2}>
          <Paper>
            <VideoPlayer
              state={video}
              onPlaybackToggle={handlePlaybackToggle}
              onVideoSeek={handleVideoSeek}
              onceVideoPlaying={handleVideoPlaying}
              ref={player}
            />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ m: 1, justifyContent: 'flex-end' }}>
              <UploadSubtitlesButton onSubtitlesLoaded={handleSubtitlesLoaded} />
              <DeleteSubtitlesButton onConfirmedClick={handleDeleteSubtitlesButtonClick} />
            </Stack>
          </Paper>
          <Box sx={{ alignSelf: 'flex-end' }}>
            <LeaveRoomButton onConfirmedClick={handleLeaveRoomButtonClick} />
          </Box>
        </Stack>
      </Grid>
      <Grid xs={16} lg={4} sx={{ alignSelf: 'stretch' }}>
        <Stack spacing={2} sx={{ height: 1 }}>
          <UserList users={room.users} />
          <Box sx={{ position: 'relative', flex: '1 0 480px' }}>
            <Box sx={{ position: 'absolute', height: 1, width: 1 }}>
              <Chat messages={chat.messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} />
            </Box>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
