import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

export class User extends Schema {}

defineTypes(User, {
  name: 'string',
});

export class Video extends Schema {
  constructor() {
    super();

    this.url = '';
    this.playing = false;
    this.playedSeconds = 0;
    this.updateTimestamp = new Date().getTime();
  }
}

defineTypes(Video, {
  url: 'string',
  playing: 'boolean',
  playedSeconds: 'number',
  updateTimestamp: 'number',
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
