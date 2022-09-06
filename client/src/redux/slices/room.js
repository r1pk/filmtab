import { createSlice } from '@reduxjs/toolkit';

import { room } from '../middlewares/colyseus/actions';

const initialState = {
  roomId: '',
  user: {
    userId: '',
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
        userId: action.payload.clientId,
        username: action.payload.username,
      };
    });

    builder.addCase(room.join.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        userId: action.payload.clientId,
        username: action.payload.username,
      };
    });

    builder.addCase(room.leave.type, () => {
      return initialState;
    });

    builder.addCase(room.onAddUser.type, (state, action) => {
      state.users.push({
        id: action.payload.id,
        username: action.payload.username,
        color: action.payload.color,
      });
    });

    builder.addCase(room.onRemoveUser.type, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
  },
});

export default slice.reducer;
