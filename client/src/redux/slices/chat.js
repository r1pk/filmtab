import { createSlice } from '@reduxjs/toolkit';

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
    addMessage: (state, action) => {
      if (state.messages.length >= 50) {
        state.messages.shift();
      }

      state.messages.push(action.payload.message);
    },
    resetState: () => initialState,
  },
});

export const { actions } = slice;
export default slice.reducer;
