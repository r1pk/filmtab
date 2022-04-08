import { RECEIVE_MESSAGE, CLEAR_CHAT } from './actions';

const welcomeMessage = {
  id: 'welcome_message',
  author: {
    name: 'FilmTab Bot',
    color: 'rgb(255,215,0)',
  },
  content: 'Welcome to FilmTab!',
  timestamp: new Date().getTime(),
};
const initialReducerState = {
  messages: [welcomeMessage],
};

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      const { message } = action.payload;

      return { ...state, messages: [...state.messages, message] };
    }
    case CLEAR_CHAT: {
      return { ...state, messages: initialReducerState.messages.slice(1) };
    }
    default: {
      return state;
    }
  }
};
