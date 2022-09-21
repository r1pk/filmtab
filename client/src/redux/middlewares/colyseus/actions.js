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

export const requestSyncVideoProgress = createAction('colyseus/requestSyncVideoProgress');
export const responseSyncVideoProgress = createAction('colyseus/responseSyncVideoProgress');

export const sendChatMessage = createAction('colyseus/sendChatMessage');

// Actions dispatched by the Colyseus middleware
export const userJoined = createAction('colyseus/userJoined');
export const userLeft = createAction('colyseus/userLeft');

export const syncVideoProgressRequested = createAction('colyseus/syncVideoProgressRequested');
export const videoStateChanged = createAction('colyseus/videoStateChanged');

export const chatMessageReceived = createAction('colyseus/chatMessageReceived');
