import { createStore, combineReducers, applyMiddleware } from 'redux';

import { colyseusMiddleware } from './middleware/colyseus';

import { roomReducer } from './reducers/room';

const middleware = applyMiddleware(colyseusMiddleware);

const rootReducer = combineReducers({
  room: roomReducer,
});

export const store = createStore(rootReducer, middleware);
