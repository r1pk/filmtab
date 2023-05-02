import { Schema, defineTypes } from '@colyseus/schema';

export class VideoProgress extends Schema {
  constructor() {
    super();

    this.progress = 0;
  }
}

defineTypes(VideoProgress, {
  progress: 'number',
});
