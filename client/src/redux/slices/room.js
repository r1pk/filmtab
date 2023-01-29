import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  users: [],
  video: {
    url: '',
    subtitles: '',
    playing: false,
    progress: 0,
    updatedAt: 0,
  },
};

const slice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.id = action.payload.id;
    },
    setVideoProgress: (state, action) => {
      state.video.progress = action.payload.progress;
    },
    updateState: (state, action) => {
      state.users = action.payload.users;
      state.video = action.payload.video;
    },
    resetState: () => initialState,
  },
});

export const actions = slice.actions;
export default slice.reducer;
