import { SET_CONNECTING_FLAG, SET_ROOM_DETAILS, LEAVE_ROOM } from './actions';

const initialReducerState = {
  isConnecting: false,
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
};

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case SET_CONNECTING_FLAG: {
      return {
        ...state,
        isConnecting: action.payload.isConnecting,
      };
    }
    case SET_ROOM_DETAILS: {
      const { roomId, sessionId } = action.payload;

      return {
        ...state,
        isRoomMember: roomId !== null,
        activeRoomId: roomId,
        sessionId: sessionId,
      };
    }
    case LEAVE_ROOM: {
      return {
        ...initialReducerState,
      };
    }
    default:
      return state;
  }
};
