import { createAction } from '@reduxjs/toolkit';

export const room = {
  create: createAction('colyseus/room/create'),
  join: createAction('colyseus/room/join'),
  leave: createAction('colyseus/room/leave'),

  onAddUser: createAction('colyseus/room/onAddUser'),
  onRemoveUser: createAction('colyseus/room/onRemoveUser'),
};

export const video = {
  set: createAction('colyseus/video/set'),
  play: createAction('colyseus/video/play'),
  pause: createAction('colyseus/video/pause'),
  seek: createAction('colyseus/video/seek'),

  subtitles: {
    set: createAction('colyseus/video/subtitles/set'),
    delete: createAction('colyseus/video/subtitles/delete'),
  },

  progress: {
    request: createAction('colyseus/video/progress/request'),
    response: createAction('colyseus/video/progress/response'),

    onRequest: createAction('colyseus/video/progress/onRequest'),
    onResponse: createAction('colyseus/video/progress/onResponse'),
  },

  onStateChanges: createAction('colyseus/video/onStateChanges'),
};
