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

  const isRoomMember = Boolean(room.roomId);

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

  const handleSetVideo = (data) => {
    dispatch(colyseus.video.set({ url: data.url }));
  };

  const handleSyncProgressResponse = (progress) => {
    dispatch(colyseus.video.progress.syncResponse({ progress: progress }));
  };

  const handleLeaveRoom = async () => {
    await dispatch(colyseus.room.leave());
    navigate('/');
  };

  const handleUploadVideoSubtitles = (subtitles) => {
    dispatch(colyseus.video.subtitles.set({ subtitles: subtitles }));
  };

  const handleDeleteVideoSubtitles = () => {
    dispatch(colyseus.video.subtitles.delete());
  };

  const handleSendMessage = (data) => {
    dispatch(colyseus.chat.message.send({ content: data.content }));
  };

  const handleClearChat = () => {
    dispatch(chat.clear());
  };

  const handleLeavePage = async (transition) => {
    await dispatch(colyseus.room.leave());
    transition.retry();
  };

  useNavigationBlocker(handleLeavePage, isRoomMember);

  return (
    <Grid container columns={16} spacing={2}>
      <Grid item xs={16}>
        <SetVideoForm url={video.player.url} onSetVideo={handleSetVideo} />
      </Grid>
      <Grid item xs={16} lg={12}>
        <Stack direction="column" spacing={2}>
          <VideoPlayer
            state={video.player}
            requests={video.requests}
            onTogglePlayback={handleTogglePlayback}
            onSeekVideo={handleSeekVideo}
            onSyncProgressResponse={handleSyncProgressResponse}
          />
          <Stack direction={{ xs: 'column-reverse', sm: 'row-reverse' }} spacing={2}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
            <DeleteVideoSubtitlesButton onDeleteVideoSubtitles={handleDeleteVideoSubtitles} />
            <UploadVideoSubtitlesButton onUploadVideoSubtitles={handleUploadVideoSubtitles} />
          </Stack>
          <UserList users={room.users} />
        </Stack>
      </Grid>
      <Grid item xs={16} lg={4}>
        <Chat messages={messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} />
      </Grid>
    </Grid>
  );
};

export default Room;
