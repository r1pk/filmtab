import { ADD_NOTIFICATION, CLOSE_NOTIFICATION, CLEAR_NOTIFICATIONS } from '../actions/notifications';

const initialReducerState = {
  queue: [],
};

export const notificationsReducer = (state = initialReducerState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    }
    case CLOSE_NOTIFICATION: {
      return {
        ...state,
        queue: state.queue.slice(1),
      };
    }
    case CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        queue: [],
      };
    }
    default: {
      return state;
    }
  }
};
