import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

export class User extends Schema {
  constructor() {
    super();

    this.name = '';
    this.color = '';
  }
}

defineTypes(User, {
  name: 'string',
  color: 'string',
});

export class Video extends Schema {
  constructor() {
    super();

    this.url = '';
    this.subtitles = '';
    this.playing = false;
    this.progress = 0;
    this.updateTimestamp = 0;
  }
}

defineTypes(Video, {
  url: 'string',
  subtitles: 'string',
  playing: 'boolean',
  progress: 'number',
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

export class VideoProgressMessage extends Schema {
  constructor() {
    super();

    this.progress = 0;
    this.updateTimestamp = 0;
  }
}

defineTypes(VideoProgressMessage, {
  progress: 'number',
  updateTimestamp: 'number',
});

export class ChatMessage extends Schema {
  constructor() {
    super();

    this.id = '';
    this.author = new User();
    this.content = '';
    this.timestamp = 0;
  }
}

defineTypes(ChatMessage, {
  id: 'string',
  author: User,
  content: 'string',
  timestamp: 'number',
});
