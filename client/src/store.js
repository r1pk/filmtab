import { createStore, combineReducers, applyMiddleware } from 'redux';

import { colyseusMiddleware } from './middleware/colyseus';

import { roomReducer } from './reducers/room';
import { serverReducer } from './reducers/server';

const middleware = applyMiddleware(colyseusMiddleware);

const rootReducer = combineReducers({
  room: roomReducer,
  server: serverReducer,
});

export const store = createStore(rootReducer, middleware);
