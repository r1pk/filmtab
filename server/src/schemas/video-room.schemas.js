import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

export class User extends Schema {}

defineTypes(User, {
  name: 'string',
});

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
