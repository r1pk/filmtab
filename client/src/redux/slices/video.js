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
    builder.addCase(room.leave.type, () => {
      return initialState;
    });

    builder.addCase(video.progress.response.type, (state) => {
      state.requests.progress = false;
    });

    builder.addCase(video.progress.onRequest.type, (state) => {
      state.requests.progress = true;
    });

    builder.addCase(video.progress.onResponse.type, (state, action) => {
      state.player.progress = action.payload.progress;
    });

    builder.addCase(video.onStateChanges.type, (state, action) => {
      for (const change of action.payload.changes) {
        state.player[change.field] = change.value;
      }
    });
  },
});

export default slice.reducer;
