export const JOIN_ROOM = 'membership/join_room';
export const CREATE_ROOM = 'membership/create_room';
export const UPDATE_ROOM_STATE = 'membership/update_room_state';

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

export const updateRoomState = (state) => ({
  type: UPDATE_ROOM_STATE,
  payload: {
    state,
  },
});
