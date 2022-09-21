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
    builder.addCase(colyseus.actions.room.leave.type, () => initialState);

    builder.addCase(colyseus.actions.chat.onMessage.type, (state, action) => {
      if (state.messages.length >= 50) {
        state.messages.shift();
      }

      state.messages.push(action.payload.message);
    });
  },
});

export const { actions } = slice;
export default slice.reducer;
