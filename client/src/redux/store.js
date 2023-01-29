import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import chat from './slices/chat';
import room from './slices/room';
import session from './slices/session';

export const store = configureStore({
  reducer: {
    chat: chat,
    room: room,
    session: session,
  },
  middleware: [thunk],
});
