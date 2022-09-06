import { configureStore } from '@reduxjs/toolkit';

import colyseus from './middlewares/colyseus';

export const store = configureStore({
  reducer: {},
  middleware: [colyseus],
});
