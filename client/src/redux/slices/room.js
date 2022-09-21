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
    builder.addCase(colyseus.actions.room.create.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
    });

    builder.addCase(colyseus.actions.room.join.type, (state, action) => {
      state.roomId = action.payload.roomId;
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
    });

    builder.addCase(colyseus.actions.room.leave.type, () => initialState);

    builder.addCase(colyseus.actions.room.users.onAdd.type, (state, action) => {
      state.users.push({
        id: action.payload.user.id,
        username: action.payload.user.username,
        color: action.payload.user.color,
      });
    });

    builder.addCase(colyseus.actions.room.users.onRemove.type, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.user.id);
    });
  },
});

export default slice.reducer;
