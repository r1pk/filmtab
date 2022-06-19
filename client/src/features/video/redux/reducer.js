import { SET_VIDEO_PROGRESS, UPDATE_VIDEO_STATE, RESET_VIDEO_STATE } from './actions';

const initialReducerState = {
  url: '',
  playing: false,
  progress: 0,
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
    case SET_VIDEO_PROGRESS: {
      const { progress, updateTimestamp } = action.payload;

      return {
        ...state,
        progress: progress,
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
