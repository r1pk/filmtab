import { createStore, combineReducers, applyMiddleware } from 'redux';

import { colyseusMiddleware } from './middlewares/colyseus';

import { reducer as roomReducer } from './features/room';
import { reducer as usersReducer } from './features/users';
import { reducer as videoReducer } from './features/video';
import { reducer as notificationsReducer } from './features/notifications';

const middleware = applyMiddleware(colyseusMiddleware);

const rootReducer = combineReducers({
  room: roomReducer,
  users: usersReducer,
  video: videoReducer,
  notifications: notificationsReducer,
});

export const store = createStore(rootReducer, middleware);
