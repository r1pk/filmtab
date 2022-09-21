import { createSlice } from '@reduxjs/toolkit';

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

    builder.addCase(colyseus.actions.leaveRoom.type, () => initialState);
  },
});

export const { actions } = slice;
export default slice.reducer;
