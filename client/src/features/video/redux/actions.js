export const SET_VIDEO = 'video/set';
export const PLAY_VIDEO = 'video/play';
export const PAUSE_VIDEO = 'video/pause';
export const SEEK_VIDEO = 'video/seek';
export const SET_VIDEO_PROGRESS = 'video/set_video_progress';
export const VIDEO_INTERVAL_PROGRESS_TICK = 'video/interval_progress_tick';
export const UPDATE_VIDEO_STATE = 'video/update_state';
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

export const setVideoProgress = (progress, updateTimestamp) => ({
  type: SET_VIDEO_PROGRESS,
  payload: {
    progress,
    updateTimestamp,
  },
});

export const sendIntervalProgressTick = (progress) => ({
  type: VIDEO_INTERVAL_PROGRESS_TICK,
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

export const resetVideoState = () => ({
  type: RESET_VIDEO_STATE,
});
