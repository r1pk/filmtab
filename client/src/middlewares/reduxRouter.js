import { history } from '../history';
import { actions } from '../features/affiliation';

export const reduxRouter = () => {
  return (next) => async (action) => {
    switch (action.type) {
      case actions.SET_ROOM_DETAILS: {
        history.push(`/rooms/${action.payload.roomId}`);
        return next(action);
      }
      case actions.LEAVE_ROOM: {
        history.push('/');
        return next(action);
      }
      default: {
        return next(action);
      }
    }
  };
};
