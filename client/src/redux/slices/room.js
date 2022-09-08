import { createSlice } from '@reduxjs/toolkit';

import { room } from '../middlewares/colyseus/actions';

const initialState = {
  roomId: '',
  user: {
    id: '',
    username: '',
  },
  users: [],
};

const slice = createSlice({
  name: 'room',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(room.create.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
    });

    builder.addCase(room.join.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
    });

    builder.addCase(room.leave.type, () => {
      return initialState;
    });

    builder.addCase(room.onAddUser.type, (state, action) => {
      state.users.push({
        id: action.payload.user.id,
        username: action.payload.user.username,
        color: action.payload.user.color,
      });
    });

    builder.addCase(room.onRemoveUser.type, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.user.id);
    });
  },
});

export default slice.reducer;
