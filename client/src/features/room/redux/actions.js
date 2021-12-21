export const CREATE_ROOM = 'room/create';
export const JOIN_ROOM = 'room/join';
export const LEAVE_ROOM = 'room/leave';

export const joinRoom = (roomId, username) => ({
  type: JOIN_ROOM,
  payload: {
    roomId,
    username,
    sessionId: null,
  },
});

export const createRoom = (username) => ({
  type: CREATE_ROOM,
  payload: {
    username,
    roomId: null,
    sessionId: null,
  },
});

export const leaveRoom = () => ({
  type: LEAVE_ROOM,
});
