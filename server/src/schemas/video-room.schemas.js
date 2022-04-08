import { Schema, MapSchema, ArraySchema, defineTypes } from '@colyseus/schema';

export class User extends Schema {
  constructor() {
    super();

    this.name = null;
    this.color = null;
  }
}

defineTypes(User, {
  name: 'string',
  color: 'string',
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

export class Message extends Schema {
  constructor() {
    super();

    this.id = null;
    this.author = null;
    this.content = null;
    this.timestamp = 0;
  }
}

defineTypes(Message, {
  id: 'string',
  author: User,
  content: 'string',
  timestamp: 'number',
});

export class VideoRoomState extends Schema {
  constructor() {
    super();

    this.users = new MapSchema();
    this.video = new Video();
    this.messages = new ArraySchema();
  }
}

defineTypes(VideoRoomState, {
  users: {
    map: User,
  },
  video: Video,
  messages: [Message],
});
