import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import chat from './slices/chat';
import room from './slices/room';
import session from './slices/session';
import video from './slices/video';

export const reducer = combineReducers({
  chat: chat.reducer,
  room: room.reducer,
  session: session.reducer,
  video: video.reducer,
});

export const store = configureStore({
  reducer: (state, action) => {
    if (action.type === 'store/clear') {
      state = undefined;
    }
    return reducer(state, action);
  },
  middleware: [thunk],
});
