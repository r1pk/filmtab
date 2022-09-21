import { createSlice } from '@reduxjs/toolkit';

import * as colyseus from '../middlewares/colyseus';

const initialState = {
  player: {
    url: '',
    subtitles: '',
    progress: 0,
    playing: false,
    updatedAt: 0,
  },
  requests: {
    syncProgress: false,
  },
};

const slice = createSlice({
  name: 'video',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(colyseus.actions.responseSyncVideoProgress.type, (state) => {
      state.requests.syncProgress = false;
    });

    builder.addCase(colyseus.actions.syncVideoProgressRequested.type, (state) => {
      state.requests.syncProgress = true;
    });

    builder.addCase(colyseus.actions.videoStateChanged.type, (state, action) => {
      for (const change of action.payload.changes) {
        state.player[change.field] = change.value;
      }
    });

    builder.addCase(colyseus.actions.leaveRoom.type, () => initialState);
  },
});

export default slice.reducer;
