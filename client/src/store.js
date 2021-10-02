import { createStore, combineReducers } from 'redux';

import { roomReducer } from './reducers/room';

const rootReducer = combineReducers({
  room: roomReducer,
});

export const store = createStore(rootReducer);
