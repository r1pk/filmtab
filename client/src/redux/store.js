import { configureStore } from '@reduxjs/toolkit';

import room from './slices/room';
import video from './slices/video';

import colyseus from './middlewares/colyseus';

export const store = configureStore({
  reducer: {
    room: room,
    video: video,
  },
  middleware: [colyseus],
});
