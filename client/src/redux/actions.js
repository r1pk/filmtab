import { createAction } from '@reduxjs/toolkit';

import chat from './slices/chat';
import room from './slices/room';
import session from './slices/session';
import video from './slices/video';

export const actions = {
  chat: chat.actions,
  room: room.actions,
  session: session.actions,
  video: video.actions,
  store: {
    clear: createAction('store/clear'),
  },
};
