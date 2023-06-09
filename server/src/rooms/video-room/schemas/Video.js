import { Schema, defineTypes } from '@colyseus/schema';

export class Video extends Schema {
  constructor() {
    super();

    this.url = '';
    this.subtitles = '';
    this.progress = 0;
    this.playing = false;
    this.updatedAt = 0;
  }
}

defineTypes(Video, {
  url: 'string',
  subtitles: 'string',
  progress: 'number',
  playing: 'boolean',
  updatedAt: 'number',
});
