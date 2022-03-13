import { RECEIVE_MESSAGE, CLEAR_CHAT } from './actions';

const initialReducerState = {
  messages: [],
};

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      const { message } = action.payload;

      return { ...state, messages: [...state.messages, message] };
    }
    case CLEAR_CHAT: {
      return { ...state, messages: initialReducerState.messages };
    }
    default: {
      return state;
    }
  }
};
