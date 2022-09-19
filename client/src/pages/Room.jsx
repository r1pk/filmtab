import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, Stack } from '@mui/material';

import { UserList, LeaveRoomButton } from '@/features/room';
import { SetVideoForm, VideoPlayer, UploadVideoSubtitlesButton, DeleteVideoSubtitlesButton } from '@/features/video';
import { Chat } from '@/features/chat';

import { useNavigationBlocker } from '@/hooks';

import { colyseus, chat } from '@/redux';

const Room = () => {
  const video = useSelector((store) => store.video);
  const room = useSelector((store) => store.room);
  const messages = useSelector((store) => store.chat.messages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetVideo = useCallback(
    (data) => {
      dispatch(colyseus.video.set({ url: data.url }));
    },
    [dispatch]
  );

  const handleTogglePlayback = useCallback(
    (progress) => {
      dispatch(colyseus.video.togglePlayback({ progress: progress }));
    },
    [dispatch]
  );

  const handleSeekVideo = useCallback(
    (progress) => {
      dispatch(colyseus.video.seek({ progress: progress }));
    },
    [dispatch]
  );

  const handleProgressResponse = useCallback(
    (progress) => {
      dispatch(colyseus.video.progress.response({ progress: progress }));
    },
    [dispatch]
  );

  const handleLeaveRoom = useCallback(async () => {
    await dispatch(colyseus.room.leave());
    navigate('/');
  }, [navigate, dispatch]);

  const handleUploadVideoSubtitles = useCallback(
    (subtitles) => {
      dispatch(colyseus.video.subtitles.set({ subtitles: subtitles }));
    },
    [dispatch]
  );

  const handleDeleteVideoSubtitles = useCallback(() => {
    dispatch(colyseus.video.subtitles.delete());
  }, [dispatch]);

  const handleSendMessage = useCallback(
    (data) => {
      dispatch(colyseus.chat.message.send({ content: data.content }));
    },
    [dispatch]
  );

  const handleClearChat = useCallback(() => {
    dispatch(chat.clear());
  }, [dispatch]);

  const handleLeavePage = useCallback(
    async (transition) => {
      const isActionConfirmed = window.confirm('Are you sure you want to leave the room?');

      if (isActionConfirmed) {
        await dispatch(colyseus.room.leave());
        transition.retry();
      }
    },
    [dispatch]
  );

  useNavigationBlocker(handleLeavePage, Boolean(room.roomId));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SetVideoForm url={video.player.url} onSetVideo={handleSetVideo} />
      </Grid>
      <Grid item xs={12} lg={8} xl={9}>
        <Stack direction="column" spacing={2}>
          <VideoPlayer
            state={video.player}
            requests={video.requests}
            onTogglePlayback={handleTogglePlayback}
            onSeekVideo={handleSeekVideo}
            onProgressResponse={handleProgressResponse}
          />
          <Stack direction={{ xs: 'column-reverse', sm: 'row-reverse' }} spacing={2}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
            <DeleteVideoSubtitlesButton onDeleteVideoSubtitles={handleDeleteVideoSubtitles} />
            <UploadVideoSubtitlesButton onUploadVideoSubtitles={handleUploadVideoSubtitles} />
          </Stack>
          <UserList users={room.users} />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={4} xl={3}>
        <Chat messages={messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} />
      </Grid>
    </Grid>
  );
};

export default Room;
