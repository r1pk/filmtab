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
    setSessionUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.username = action.payload.username;
    },
  },
});

export default slice;
