import { SET_ROOM_DETAILS, LEAVE_ROOM } from './actions';

const initialReducerState = {
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
};

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
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
