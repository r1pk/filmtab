import { createStore, combineReducers, applyMiddleware } from 'redux';

import { colyseusMiddleware } from './middleware/colyseus';

import { roomReducer } from './reducers/room';
import { notificationsReducer } from './reducers/notifications';

const middleware = applyMiddleware(colyseusMiddleware);

const rootReducer = combineReducers({
  room: roomReducer,
  notifications: notificationsReducer,
});

export const store = createStore(rootReducer, middleware);
