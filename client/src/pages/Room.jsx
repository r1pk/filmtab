import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, Stack } from '@mui/material';

import { UserList, LeaveRoomButton } from '@/features/room';
import { SetVideoForm, VideoPlayer } from '@/features/video';
import { UploadVideoSubtitlesButton, DeleteVideoSubtitlesButton, RequestVideoProgressButton } from '@/features/video';
import { Chat } from '@/features/chat';

import { useDocumentTitle, useNavigationBlocker } from '@/hooks';

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
      dispatch(colyseus.toggleVideoPlayback({ progress: progress }));
    },
    [dispatch]
  );

  const handleSeekVideo = useCallback(
    (progress) => {
      dispatch(colyseus.seekVideo({ progress: progress }));
    },
    [dispatch]
  );

  const handleReadyToSeek = useCallback(() => {
    dispatch((dispatchAction, getStateFromStore) => {
      if (getStateFromStore().room.users.length >= 2) {
        return dispatchAction(colyseus.requestVideoProgress());
      }
    });
  }, [dispatch]);

  const handleRequestVideoProgress = () => {
    dispatch(colyseus.requestVideoProgress());
  };

  const handleSendVideoProgress = (progress) => {
    dispatch(colyseus.sendVideoProgress({ progress: progress }));
  };

  const handleSetVideo = (data) => {
    dispatch(colyseus.setVideo({ url: data.url }));
  };

  const handleUploadVideoSubtitles = (subtitles) => {
    dispatch(colyseus.setVideoSubtitles({ subtitles: subtitles }));
  };

  const handleDeleteVideoSubtitles = () => {
    dispatch(colyseus.deleteVideoSubtitles());
  };

  const handleSendMessage = (data) => {
    dispatch(colyseus.sendChatMessage({ content: data.content }));
  };

  const handleClearChat = () => {
    dispatch(chat.clear());
  };

  const handleLeaveRoom = () => {
    dispatch(colyseus.leaveRoom());
    navigate('/');
  };

  const handleLeavePage = (transition) => {
    dispatch(colyseus.leaveRoom());
    transition.retry();
  };

  useNavigationBlocker(handleLeavePage, isRoomMember);
  useDocumentTitle(`Room [${room.roomId}]`);

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
            onSendVideoProgress={handleSendVideoProgress}
            onReadyToSeek={handleReadyToSeek}
          />
          <Stack direction={{ xs: 'column-reverse', md: 'row-reverse' }} spacing={2}>
            <LeaveRoomButton onLeaveRoom={handleLeaveRoom} />
            <DeleteVideoSubtitlesButton onDeleteVideoSubtitles={handleDeleteVideoSubtitles} />
            <UploadVideoSubtitlesButton onUploadVideoSubtitles={handleUploadVideoSubtitles} />
            {room.users.length >= 2 && (
              <RequestVideoProgressButton timeoutTime={60000} onRequestVideoProgress={handleRequestVideoProgress} />
            )}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={16} lg={4}>
        <Stack direction="column" spacing={2}>
          <UserList users={room.users} />
          <Chat messages={messages} onSendMessage={handleSendMessage} onClearChat={handleClearChat} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Room;
