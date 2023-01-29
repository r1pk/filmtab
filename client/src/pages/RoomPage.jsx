import { useRef, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, Stack, Paper, Box } from '@mui/material';

import { UserList, LeaveRoomButton } from '@/features/room';
import { SetVideoForm, VideoPlayer, UploadVideoSubtitlesButton, DeleteVideoSubtitlesButton } from '@/features/video';
import { Chat } from '@/features/chat';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useNavigationBlocker } from '@/hooks/useNavigationBlocker';

import { colyseus } from '@/api/colyseus';
import { store, actions } from '@/redux';

const RoomPage = () => {
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

  const handleUploadVideoSubtitles = (subtitles) => {
    colyseus.room.send('video::set_subtitles', { subtitles: subtitles });
  };

  const handleDeleteVideoSubtitles = () => {
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

  useEffect(() => {
    const createRequestVideoProgressListener = () => {
      return colyseus.room.onMessage('video::request_progress', () => {
        if (player.current) {
          colyseus.room.send('video::progress', { progress: player.current.getCurrentProgress() });
        }
      });
    };

    const removeRequestVideoProgressListener = createRequestVideoProgressListener();

    return () => removeRequestVideoProgressListener();
  }, []);

  useEffect(() => {
    const createVideoProgressListener = () => {
      return colyseus.room.onMessage('video::progress', (data) => {
        dispatch(actions.room.setVideoProgress({ progress: data.progress }));
      });
    };

    const removeVideoProgressListener = createVideoProgressListener();

    return () => removeVideoProgressListener();
  }, [dispatch]);

  useEffect(() => {
    const createChatMessageListener = () => {
      return colyseus.room.onMessage('chat::message', (message) => {
        dispatch(actions.chat.addMessage({ message: message }));
      });
    };

    const removeChatMessageListener = createChatMessageListener();

    return () => removeChatMessageListener();
  }, [dispatch]);

  useNavigationBlocker(handleLeavePage, isRoomMember);
  useDocumentTitle('Room');

  return (
    <Grid container columns={16} spacing={2}>
      <Grid item xs={16}>
        <SetVideoForm url={video.url} onSetVideo={handleSetVideo} />
      </Grid>
      <Grid item xs={16} lg={12}>
        <Stack direction="column" spacing={2}>
          <Paper>
            <VideoPlayer
              state={video}
              onTogglePlayback={handleTogglePlayback}
              onSeekVideo={handleSeekVideo}
              onReadyToSeek={handleReadyToSeek}
              ref={player}
            />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ m: 1, justifyContent: 'flex-end' }}>
              <UploadVideoSubtitlesButton onUploadVideoSubtitles={handleUploadVideoSubtitles} />
              <DeleteVideoSubtitlesButton onDeleteVideoSubtitles={handleDeleteVideoSubtitles} />
            </Stack>
          </Paper>
          <Box sx={{ alignSelf: 'flex-end' }}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={16} lg={4}>
        <Stack direction="column" spacing={2}>
          <UserList users={users} />
          <Chat messages={messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RoomPage;
