export const JOIN_ROOM = 'lobby/join_room';
export const CREATE_ROOM = 'lobby/create_room';

export const joinRoom = (roomId, username) => ({
  type: JOIN_ROOM,
  payload: {
    roomId,
    username,
  },
});

export const createRoom = (isRoomPrivate, username) => ({
  type: CREATE_ROOM,
  payload: {
    username,
    private: isRoomPrivate,
  },
});
