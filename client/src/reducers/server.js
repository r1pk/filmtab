import { JOIN_ROOM, CREATE_ROOM } from '../actions/server';

const initialReducerState = {
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
};

export const serverReducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case CREATE_ROOM:
    case JOIN_ROOM: {
      const { roomId, sessionId } = action.payload;
      return {
        ...state,
        isRoomMember: true,
        activeRoomId: roomId,
        sessionId: sessionId,
      };
    }
    default: {
      return state;
    }
  }
};
