import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  users: [],
};

const slice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.id = action.payload;
    },
    setRoomUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default slice;
