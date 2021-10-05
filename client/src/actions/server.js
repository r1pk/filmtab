export const JOIN_ROOM = 'server/join_room';
export const CREATE_ROOM = 'server/create_room';
export const SET_ACTIVE_ROOM = 'server/set_active_room';

export const joinRoom = (roomId, username) => ({
  type: JOIN_ROOM,
  payload: {
    roomId,
    username,
    sessionId: null,
  },
});

export const createRoom = (isRoomPrivate, username) => ({
  type: CREATE_ROOM,
  payload: {
    username,
    roomId: null,
    sessionId: null,
    private: isRoomPrivate,
  },
});
