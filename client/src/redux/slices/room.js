import { createSlice } from '@reduxjs/toolkit';

import * as colyseus from '../middlewares/colyseus';

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
    builder.addCase(colyseus.actions.createRoom.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
    });

    builder.addCase(colyseus.actions.joinRoom.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
    });

    builder.addCase(colyseus.actions.userJoined.type, (state, action) => {
      state.users.push({
        id: action.payload.user.id,
        username: action.payload.user.username,
        color: action.payload.user.color,
      });
    });

    builder.addCase(colyseus.actions.userLeft.type, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.user.id);
    });

    builder.addCase(colyseus.actions.leaveRoom.type, () => initialState);
  },
});

export default slice.reducer;
