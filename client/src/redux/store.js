import { configureStore } from '@reduxjs/toolkit';

import room from './slices/room';

import colyseus from './middlewares/colyseus';

export const store = configureStore({
  reducer: {
    room: room,
  },
  middleware: [colyseus],
});
