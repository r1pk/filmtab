import { createStore, combineReducers } from 'redux';

import { membershipReducer } from './reducers/membership';

const rootReducer = combineReducers({
  membership: membershipReducer,
});

export const store = createStore(rootReducer);
