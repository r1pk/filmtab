import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

import { User } from './User.js';
import { Video } from './Video.js';

export class RoomState extends Schema {
  constructor() {
    super();

    this.users = new MapSchema();
    this.video = new Video();
  }
}

defineTypes(RoomState, {
  users: {
    map: User,
  },
  video: Video,
});
