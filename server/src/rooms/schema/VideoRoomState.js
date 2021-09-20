import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

import { User } from './User.js';

export class VideoRoomState extends Schema {
  constructor() {
    super();
    this.users = new MapSchema();
  }
}

defineTypes(VideoRoomState, {
  users: {
    map: User,
  },
});
