export const SET_VIDEO = 'video/set';
export const PLAY_VIDEO = 'video/play';
export const PAUSE_VIDEO = 'video/pause';
export const SEEK_VIDEO = 'video/seek';
export const UPDATE_VIDEO_STATE = 'video/update_state';
export const UPDATE_PLAYED_SECONDS = 'video/update_played_seconds';
export const RESET_VIDEO_STATE = 'video/reset_video_state';

export const setVideo = (url) => ({
  type: SET_VIDEO,
  payload: {
    url,
  },
});

export const playVideo = (playedSeconds) => ({
  type: PLAY_VIDEO,
  payload: {
    playedSeconds,
  },
});

export const pauseVideo = (playedSeconds) => ({
  type: PAUSE_VIDEO,
  payload: {
    playedSeconds,
  },
});

export const seekVideo = (playedSeconds) => ({
  type: SEEK_VIDEO,
  payload: {
    playedSeconds,
  },
});

export const updateVideoState = (updatedState) => ({
  type: UPDATE_VIDEO_STATE,
  payload: {
    updatedState,
  },
});

export const updatePlayedSeconds = (currentPlayedSeconds, updateTimestamp) => ({
  type: UPDATE_PLAYED_SECONDS,
  payload: {
    currentPlayedSeconds,
    updateTimestamp,
  },
});

export const resetVideoState = () => ({
  type: RESET_VIDEO_STATE,
});
