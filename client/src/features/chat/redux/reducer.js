import { RECEIVE_MESSAGE, CLEAR_CHAT, NOTIFICATION_MESSAGE } from './actions';

import { getUniqueId } from '../utils/getUniqueId';

const initialReducerState = {
  messages: [],
};

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      const { message } = action.payload;

      return { ...state, messages: [...state.messages, message] };
    }
    case NOTIFICATION_MESSAGE: {
      const { author, content } = action.payload;

      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: getUniqueId(),
            author: author,
            content: content,
            timestamp: new Date().getTime(),
          },
        ],
      };
    }
    case CLEAR_CHAT: {
      return { ...state, messages: initialReducerState.messages.slice(1) };
    }
    default: {
      return state;
    }
  }
};
