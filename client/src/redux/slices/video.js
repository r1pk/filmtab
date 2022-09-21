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
    builder.addCase(colyseus.actions.room.leave.type, () => initialState);

    builder.addCase(colyseus.actions.video.progress.syncResponse.type, (state) => {
      state.requests.syncProgress = false;
    });

    builder.addCase(colyseus.actions.video.progress.onSyncRequest.type, (state) => {
      state.requests.syncProgress = true;
    });

    builder.addCase(colyseus.actions.video.progress.onSyncResponse.type, (state, action) => {
      state.player.progress = action.payload.progress;
    });

    builder.addCase(colyseus.actions.video.onStateChanges.type, (state, action) => {
      for (const change of action.payload.changes) {
        state.player[change.field] = change.value;
      }
    });
  },
});

export default slice.reducer;
