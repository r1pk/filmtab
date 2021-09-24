import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

export class User extends Schema {}

defineTypes(User, {
  name: 'string',
});

export class Video extends Schema {
  constructor() {
    super();

    this.url = '';
    this.paused = true;
  }
}

defineTypes(Video, {
  url: 'string',
  paused: 'boolean',
});

export class VideoRoomState extends Schema {
  constructor() {
    super();

    this.users = new MapSchema();
    this.video = new Video();
  }
}

defineTypes(VideoRoomState, {
  users: {
    map: User,
  },
  video: Video,
});
