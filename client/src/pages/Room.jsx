import { useRef, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Stack, Paper, Box } from '@mui/material';

import UserList from '@/components/room/UserList';
import LeaveRoomButton from '@/components/room/LeaveRoomButton';

import SetVideoForm from '@/components/video/SetVideoForm';
import VideoPlayer from '@/components/video/VideoPlayer';
import UploadSubtitlesButton from '@/components/video/UploadSubtitlesButton';
import DeleteSubtitlesButton from '@/components/video/DeleteSubtitlesButton';

import Chat from '@/components/chat/Chat';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useNavigationBlocker } from '@/hooks/useNavigationBlocker';

import { colyseus } from '@/apis/colyseus';
import { store, actions } from '@/redux';

const Room = () => {
  const mainSection = useRef(null);
  const sideSection = useRef(null);

  const player = useRef(null);

  const roomId = useSelector((store) => store.room.id);
  const users = useSelector((store) => store.room.users);
  const video = useSelector((store) => store.room.video);
  const messages = useSelector((store) => store.chat.messages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRoomMember = Boolean(roomId);

  const handleTogglePlayback = useCallback((progress) => {
    colyseus.room.send('video::toggle_playback', { progress: progress });
  }, []);

  const handleSeekVideo = useCallback((progress) => {
    colyseus.room.send('video::seek', { progress: progress });
  }, []);

  const handleReadyToSeek = useCallback(() => {
    if (store.getState().room.users.length > 1) {
      colyseus.room.send('video::request_progress');
    }
  }, []);

  const handleSetVideo = (data) => {
    colyseus.room.send('video::set_url', { url: data.url });
  };

  const handleUploadSubtitles = (subtitles) => {
    colyseus.room.send('video::set_subtitles', { subtitles: subtitles });
  };

  const handleDeleteSubtitles = () => {
    colyseus.room.send('video::delete_subtitles');
  };

  const handleSendMessage = (data) => {
    colyseus.room.send('chat::message', { content: data.content });
  };

  const handleClearChat = () => {
    dispatch(actions.chat.clear());
  };

  const handleLeaveRoom = () => {
    colyseus.room.leave();
    navigate('/');
  };

  const handleLeavePage = (transition) => {
    colyseus.room.leave();
    transition.retry();
  };

  useEffect(function createVideoProgressRequestListener() {
    const handleVideoProgressRequest = () => {
      if (player.current) {
        colyseus.room.send('video::latest_progress', { progress: player.current.getCurrentProgress() });
      }
    };

    const removeColyseusListener = colyseus.room.onMessage('video::request_progress', handleVideoProgressRequest);

    return function cleanup() {
      removeColyseusListener();
    };
  }, []);

  useEffect(
    function createLatestVideoProgressListener() {
      const handleLatestVideoProgress = (data) => {
        dispatch(actions.room.setVideoProgress({ progress: data.progress }));
      };

      const removeColyseusListener = colyseus.room.onMessage('video::latest_progress', handleLatestVideoProgress);

      return function cleanup() {
        removeColyseusListener();
      };
    },
    [dispatch]
  );

  useEffect(
    function createChatMessageListener() {
      const handleChatMessage = (message) => {
        dispatch(actions.chat.addMessage({ message: message }));
      };

      const removeColyseusListener = colyseus.room.onMessage('chat::message', handleChatMessage);

      return function cleanup() {
        removeColyseusListener();
      };
    },
    [dispatch]
  );

  useEffect(function createWindowResizeListener() {
    const handleWindowResize = () => {
      if (mainSection.current && sideSection.current) {
        sideSection.current.style.height = `${mainSection.current.clientHeight}px`;
      }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return function cleanup() {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useNavigationBlocker(handleLeavePage, isRoomMember);
  useDocumentTitle('Room');

  return (
    <Grid container columns={16} spacing={2} sx={{ alignItems: 'start' }}>
      <Grid xs={16}>
        <SetVideoForm url={video.url} onSetVideo={handleSetVideo} />
      </Grid>
      <Grid xs={16} lg={12} ref={mainSection}>
        <Stack spacing={2}>
          <Paper>
            <VideoPlayer
              state={video}
              onTogglePlayback={handleTogglePlayback}
              onSeekVideo={handleSeekVideo}
              onReadyToSeek={handleReadyToSeek}
              ref={player}
            />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ m: 1, justifyContent: 'flex-end' }}>
              <UploadSubtitlesButton onUploadSubtitles={handleUploadSubtitles} />
              <DeleteSubtitlesButton onDeleteSubtitles={handleDeleteSubtitles} />
            </Stack>
          </Paper>
          <Box sx={{ alignSelf: 'flex-end' }}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
          </Box>
        </Stack>
      </Grid>
      <Grid xs={16} lg={4} sx={{ alignSelf: 'stretch', minHeight: { xs: 480 } }} ref={sideSection}>
        <Stack spacing={2} sx={{ height: 1 }}>
          <UserList users={users} />
          <Chat messages={messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
