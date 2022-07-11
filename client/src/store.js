import { createStore, combineReducers, applyMiddleware } from 'redux';

import { colyseusMediator } from './middlewares/colyseusMediator';
import { reduxRouter } from './middlewares/reduxRouter';

import { reducer as affiliationReducer } from './features/affiliation';
import { reducer as usersReducer } from './features/users';
import { reducer as videoReducer } from './features/video';
import { reducer as notificationsReducer } from './features/notifications';
import { reducer as chatReducer } from './features/chat';

const middleware = applyMiddleware(colyseusMediator, reduxRouter);

const rootReducer = combineReducers({
  affiliation: affiliationReducer,
  users: usersReducer,
  video: videoReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
});

export const store = createStore(rootReducer, middleware);
