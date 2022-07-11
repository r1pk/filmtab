import { SET_CONNECTING_FLAG, SET_ROOM_DETAILS, ADD_USER, REMOVE_USER, LEAVE_ROOM } from './actions';

const initialReducerState = {
  isConnecting: false,
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
  users: [],
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
    case ADD_USER: {
      const { user, sessionId } = action.payload;

      return {
        ...state,
        users: [...state.users, { name: user.name, color: user.color, sessionId: sessionId }],
      };
    }
    case REMOVE_USER: {
      const { sessionId } = action.payload;

      return {
        ...state,
        users: state.users.filter((user) => user.sessionId !== sessionId),
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
