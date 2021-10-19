import { createStore, combineReducers, applyMiddleware } from 'redux';

import { colyseusMiddleware } from './middleware/colyseus';

import { roomReducer } from './reducers/room';
import { serverReducer } from './reducers/server';
import { notificationsReducer } from './reducers/notifications';

const middleware = applyMiddleware(colyseusMiddleware);

const rootReducer = combineReducers({
  room: roomReducer,
  server: serverReducer,
  notifications: notificationsReducer,
});

export const store = createStore(rootReducer, middleware);
