export const SET_CONNECTING_FLAG = 'affiliation/set_connecting_flag';
export const SET_ROOM_DETAILS = 'affiliation/set_room_details';
export const CREATE_ROOM = 'affiliation/create_room';
export const JOIN_ROOM = 'affiliation/join_room';
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

export const leaveRoom = () => ({
  type: LEAVE_ROOM,
});
