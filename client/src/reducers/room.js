import { UPDATE_ROOM_STATE, UPDATE_PLAYED_SECONDS } from '../actions/room';

const initialReducerState = {
  users: [],
  video: {
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    playing: false,
    playedSeconds: 0,
    timestamp: new Date().getTime(),
  },
};

export const roomReducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case UPDATE_ROOM_STATE: {
      const { users, video } = action.payload.state;
      return {
        ...state,
        users: [...users.values()].map((user) => ({
          name: user.name,
          isReady: user.isReady,
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
    default: {
      return state;
    }
  }
};
