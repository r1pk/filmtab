export const SET_VIDEO = 'room/set_video';
export const PLAY_VIDEO = 'room/play_video';
export const PAUSE_VIDEO = 'room/pause_video';
export const SEEK_VIDEO = 'room/seek_video';
export const SEND_USER_STATUS = 'room/send_user_status';
export const UPDATE_ROOM_STATE = 'room/update_room_state';

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

export const sendUserStatus = (status) => ({
  type: SEND_USER_STATUS,
  payload: {
    status,
  },
});

export const updateRoomState = (state) => ({
  type: UPDATE_ROOM_STATE,
  payload: {
    state,
  },
});
