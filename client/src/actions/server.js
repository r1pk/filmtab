export const JOIN_ROOM = 'server/join_room';
export const CREATE_ROOM = 'server/create_room';

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
