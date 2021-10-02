export const SET_VIDEO = 'player/set_video';
export const PLAY_VIDEO = 'player/play_video';
export const PAUSE_VIDEO = 'player/pause_video';
export const SEEK_VIDEO = 'player/seek_video';

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
