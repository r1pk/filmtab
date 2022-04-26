export const SET_VIDEO = 'video/set';
export const PLAY_VIDEO = 'video/play';
export const PAUSE_VIDEO = 'video/pause';
export const SEEK_VIDEO = 'video/seek';
export const UPDATE_VIDEO_STATE = 'video/update_state';
export const UPDATE_VIDEO_PROGRESS = 'video/update_video_progress';
export const RESET_VIDEO_STATE = 'video/reset_video_state';

export const setVideo = (url) => ({
  type: SET_VIDEO,
  payload: {
    url,
  },
});

export const playVideo = (progress) => ({
  type: PLAY_VIDEO,
  payload: {
    progress,
  },
});

export const pauseVideo = (progress) => ({
  type: PAUSE_VIDEO,
  payload: {
    progress,
  },
});

export const seekVideo = (progress) => ({
  type: SEEK_VIDEO,
  payload: {
    progress,
  },
});

export const updateVideoState = (updatedState) => ({
  type: UPDATE_VIDEO_STATE,
  payload: {
    updatedState,
  },
});

export const updateVideoProgress = (currentProgress, updateTimestamp) => ({
  type: UPDATE_VIDEO_PROGRESS,
  payload: {
    currentProgress,
    updateTimestamp,
  },
});

export const resetVideoState = () => ({
  type: RESET_VIDEO_STATE,
});
