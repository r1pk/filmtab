export const SET_VIDEO = 'video/set';
export const TOGGLE_VIDEO_PLAYBACK = 'video/toggle_playback';
export const SEEK_VIDEO = 'video/seek';
export const SET_VIDEO_PROGRESS = 'video/set_video_progress';
export const SAVE_VIDEO_PROGRESS = 'video/save_progress';
export const UPDATE_VIDEO_STATE = 'video/update_state';
export const RESET_VIDEO_STATE = 'video/reset_video_state';

export const setVideo = (url) => ({
  type: SET_VIDEO,
  payload: {
    url,
  },
});

export const toggleVideoPlayback = (progress) => ({
  type: TOGGLE_VIDEO_PLAYBACK,
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

export const saveVideoProgress = (progress) => ({
  type: SAVE_VIDEO_PROGRESS,
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
