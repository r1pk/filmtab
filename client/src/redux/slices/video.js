import { createSlice } from '@reduxjs/toolkit';

import { video, room } from '../middlewares/colyseus/actions';

const initialState = {
  player: {
    url: '',
    subtitles: '',
    progress: 0,
    playing: false,
    updatedAt: 0,
  },
  requests: {
    progress: false,
  },
};

const slice = createSlice({
  name: 'video',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(room.leave, () => {
      return initialState;
    });

    builder.addCase(video.progress.response, (state) => {
      state.requests.progress = false;
    });

    builder.addCase(video.progress.onRequest, (state) => {
      state.requests.progress = true;
    });

    builder.addCase(video.progress.onResponse, (state, action) => {
      state.player.progress = action.payload.progress;
    });

    builder.addCase(video.onStateChanges, (state, action) => {
      for (const change of action.payload.changes) {
        state.player[change.field] = change.value;
      }
    });
  },
});

export default slice.reducer;
