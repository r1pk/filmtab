import { createAction } from '@reduxjs/toolkit';

// Actions listened to by the Colyseus middleware
export const createRoom = createAction('colyseus/createRoom');
export const joinRoom = createAction('colyseus/joinRoom');
export const leaveRoom = createAction('colyseus/leaveRoom');

export const setVideo = createAction('colyseus/setVideo');
export const playVideo = createAction('colyseus/playVideo');
export const pauseVideo = createAction('colyseus/pauseVideo');
export const toggleVideoPlayback = createAction('colyseus/toggleVideoPlayback');
export const seekVideo = createAction('colyseus/seekVideo');

export const setVideoSubtitles = createAction('colyseus/setVideoSubtitles');
export const deleteVideoSubtitles = createAction('colyseus/deleteVideoSubtitles');

export const requestVideoProgress = createAction('colyseus/requestVideoProgress');
export const sendVideoProgress = createAction('colyseus/sendVideoProgress');

export const sendChatMessage = createAction('colyseus/sendChatMessage');

// Actions dispatched by the Colyseus middleware
export const userJoined = createAction('colyseus/userJoined');
export const userLeft = createAction('colyseus/userLeft');

export const videoProgressRequested = createAction('colyseus/videoProgressRequested');
export const videoStateChanged = createAction('colyseus/videoStateChanged');

export const chatMessageReceived = createAction('colyseus/chatMessageReceived');
