import { CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM } from './actions';

const initialReducerState = {
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
};

export const reducer = (state = initialReducerState, action) => {
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
    case LEAVE_ROOM: {
      return {
        ...initialReducerState,
      };
    }
    default:
      return state;
  }
};
