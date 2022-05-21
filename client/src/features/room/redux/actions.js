export const SET_ROOM_DETAILS = 'room/set_details';
export const CREATE_ROOM = 'room/create';
export const JOIN_ROOM = 'room/join';
export const LEAVE_ROOM = 'room/leave';

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
