import { UPDATE_ROOM_STATE, UPDATE_PLAYED_SECONDS, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM } from '../actions/room';

const initialReducerState = {
  isRoomMember: false,
  activeRoomId: null,
  sessionId: null,
  users: [],
  video: {
    url: '',
    playing: false,
    playedSeconds: 0,
    timestamp: new Date().getTime(),
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

    case UPDATE_ROOM_STATE: {
      const { users, video } = action.payload.state;
      return {
        ...state,
        users: [...users.values()].map((user) => ({
          name: user.name,
        })),
        video: JSON.parse(JSON.stringify(video)),
      };
    }
    case UPDATE_PLAYED_SECONDS: {
      return {
        ...state,
        video: {
          ...state.video,
          playedSeconds: action.payload.playedSeconds,
        },
      };
    }
    default:
      return state;
  }
};
