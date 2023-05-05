import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const slice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
    },
    addChatMessage: (state, action) => {
      if (state.messages.length >= 50) {
        state.messages.shift();
      }

      state.messages.push(action.payload);
    },
    resetChatState: () => initialState,
  },
});

export default slice;
