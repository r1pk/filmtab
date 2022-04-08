import { ADD_USER, REMOVE_USER, RESET_USERS } from './actions';

const initialReducerState = [];

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case ADD_USER: {
      const { user, sessionId } = action.payload;

      return [...state, { name: user.name, color: user.color, sessionId: sessionId }];
    }
    case REMOVE_USER: {
      const { sessionId } = action.payload;

      return state.filter((user) => user.sessionId !== sessionId);
    }
    case RESET_USERS: {
      return [...initialReducerState];
    }
    default:
      return state;
  }
};
