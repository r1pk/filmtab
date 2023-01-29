import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    username: '',
  },
};

const slice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.username = action.payload.username;
    },
    resetState: () => initialState,
  },
});

export const actions = slice.actions;
export default slice.reducer;
