import { ADD_NOTIFICATION, CLOSE_NOTIFICATION, CLEAR_NOTIFICATIONS } from './actions';

const initialReducerState = [];

export const reducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return [...state, action.payload];
    }
    case CLOSE_NOTIFICATION: {
      return state.slice(1);
    }
    case CLEAR_NOTIFICATIONS: {
      return [...initialReducerState];
    }
    default: {
      return state;
    }
  }
};
