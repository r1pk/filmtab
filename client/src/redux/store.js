import { configureStore } from '@reduxjs/toolkit';

import room from './slices/room';
import video from './slices/video';
import chat from './slices/chat';

import * as colyseus from './middlewares/colyseus';

export const store = configureStore({
  reducer: {
    room: room,
    video: video,
    chat: chat,
  },
  middleware: [colyseus.middleware],
});
