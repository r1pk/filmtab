export const SET_CONNECTING_FLAG = 'affiliation/set_connecting_flag';
export const SET_ROOM_DETAILS = 'affiliation/set_room_details';
export const CREATE_ROOM = 'affiliation/create_room';
export const JOIN_ROOM = 'affiliation/join_room';
export const ADD_USER = 'affiliation/add_user';
export const REMOVE_USER = 'affiliation/remove_user';
export const LEAVE_ROOM = 'affiliation/leave_room';

export const setConnectingFlag = (isConnecting) => ({
  type: SET_CONNECTING_FLAG,
  payload: {
    isConnecting,
  },
});

export const setRoomDetails = (roomId, sessionId) => ({
  type: SET_ROOM_DETAILS,
  payload: {
    roomId,
    sessionId,
  },
});

export const createRoom = (username) => ({
  type: CREATE_ROOM,
  payload: {
    username,
  },
});

export const joinRoom = (roomId, username) => ({
  type: JOIN_ROOM,
  payload: {
    roomId,
    username,
  },
});

export const addUser = (user, sessionId) => ({
  type: ADD_USER,
  payload: {
    user,
    sessionId,
  },
});

export const removeUser = (sessionId) => ({
  type: REMOVE_USER,
  payload: {
    sessionId,
  },
});

export const leaveRoom = () => ({
  type: LEAVE_ROOM,
});
