import {
  UPDATE_PLAYED_SECONDS,
  CREATE_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  ADD_USER,
  REMOVE_USER,
  UPDATE_VIDEO_STATE,
} from '../actions/room';

const initialReducerState = {
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
  users: [],
  video: {
    url: '',
    playing: false,
    playedSeconds: 0,
    updateTimestamp: 0,
  },
};

export const roomReducer = (state = initialReducerState, action) => {
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

    case ADD_USER: {
      const { user, sessionId } = action.payload;
      return {
        ...state,
        users: [...state.users, { name: user.name, sessionId: sessionId }],
      };
    }
    case REMOVE_USER: {
      const { sessionId } = action.payload;
      return {
        ...state,
        users: state.users.filter((user) => user.sessionId !== sessionId),
      };
    }
    case UPDATE_VIDEO_STATE: {
      const { updatedState } = action.payload;
      return {
        ...state,
        video: {
          ...state.video,
          ...updatedState,
        },
      };
    }
    case UPDATE_PLAYED_SECONDS: {
      const { currentPlayedSeconds, updateTimestamp } = action.payload;
      return {
        ...state,
        video: {
          ...state.video,
          playedSeconds: currentPlayedSeconds,
          updateTimestamp: updateTimestamp,
        },
      };
    }
    default:
      return state;
  }
};
