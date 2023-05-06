import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  subtitles: '',
  playing: false,
  progress: 0,
  updatedAt: 0,
};

const slice = createSlice({
  name: 'video',
  initialState: initialState,
  reducers: {
    setVideoProgress: (state, action) => {
      state.progress = action.payload;
    },
    setVideoState: (state, action) => {
      state.url = action.payload.url;
      state.subtitles = action.payload.subtitles;
      state.playing = action.payload.playing;
      state.progress = action.payload.progress;
      state.updatedAt = action.payload.updatedAt;
    },
  },
});

export default slice;
