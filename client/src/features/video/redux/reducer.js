import { UPDATE_PLAYED_SECONDS, UPDATE_VIDEO_STATE, RESET_VIDEO_STATE } from './actions';

const initialReducerState = {
  url: '',
  playing: false,
  playedSeconds: 0,
  updateTimestamp: 0,
};

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case UPDATE_VIDEO_STATE: {
      const { updatedState } = action.payload;

      return {
        ...state,
        ...updatedState,
      };
    }
    case UPDATE_PLAYED_SECONDS: {
      const { currentPlayedSeconds, updateTimestamp } = action.payload;

      return {
        ...state,
        playedSeconds: currentPlayedSeconds,
        updateTimestamp: updateTimestamp,
      };
    }
    case RESET_VIDEO_STATE: {
      return {
        ...initialReducerState,
      };
    }
    default:
      return state;
  }
};
