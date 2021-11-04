import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

export class User extends Schema {
  constructor() {
    super();

    this.name = null;
  }
}

defineTypes(User, {
  name: 'string',
});

export class Video extends Schema {
  constructor() {
    super();

    this.url = null;
    this.playing = false;
    this.playedSeconds = 0;
    this.updateTimestamp = null;
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
