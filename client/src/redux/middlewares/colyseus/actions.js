import { createAction } from '@reduxjs/toolkit';

export const room = {
  create: createAction('colyseus/room/create'),
  join: createAction('colyseus/room/join'),
  leave: createAction('colyseus/room/leave'),

  onAddUser: createAction('colyseus/room/onAddUser'),
  onRemoveUser: createAction('colyseus/room/onRemoveUser'),
};
