import { createSlice } from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';
import * as colyseus from '../middlewares/colyseus';

const initialState = {
  messages: [],
};

const slice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    clear: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(colyseus.actions.chatMessageReceived.type, (state, action) => {
      if (state.messages.length >= 50) {
        state.messages.shift();
      }

      state.messages.push(action.payload.message);
    });

    builder.addCase(colyseus.actions.userJoined.type, (state, action) => {
      state.messages.push({
        id: nanoid(),
        content: `${action.payload.user.username} joined the room.`,
        createdAt: new Date().getTime(),
        author: {
          id: nanoid(),
          username: 'FilmTab',
          color: 'primary.main',
        },
      });
    });

    builder.addCase(colyseus.actions.userLeft.type, (state, action) => {
      state.messages.push({
        id: nanoid(),
        content: `${action.payload.user.username} left the room.`,
        createdAt: new Date().getTime(),
        author: {
          id: nanoid(),
          username: 'FilmTab',
          color: 'primary.main',
        },
      });
    });

    builder.addCase(colyseus.actions.leaveRoom.type, () => initialState);
  },
});

export const { actions } = slice;
export default slice.reducer;
