import { createSlice } from '@reduxjs/toolkit';

import { chat, room } from '../middlewares/colyseus/actions';

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
    builder.addCase(room.leave.type, () => {
      return initialState;
    });

    builder.addCase(chat.onMessage.type, (state, action) => {
      if (state.messages.length >= 50) {
        state.messages.shift();
      }

      state.messages.push(action.payload.message);
    });
  },
});

export const { actions } = slice;
export default slice.reducer;
