import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import chat from './slices/chat';
import room from './slices/room';
import session from './slices/session';
import video from './slices/video';

export const store = configureStore({
  reducer: {
    chat: chat.reducer,
    room: room.reducer,
    session: session.reducer,
    video: video.reducer,
  },
  middleware: [thunk],
});
