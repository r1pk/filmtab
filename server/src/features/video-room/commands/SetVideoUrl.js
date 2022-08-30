import { Command } from '@colyseus/command';

import { getTimestamp } from '../utils/getTimestamp.js';

export class SetVideoUrl extends Command {
  execute({ url }) {
    this.state.video.url = url;
    this.state.video.subtitles = '';
    this.state.video.progress = 0;
    this.state.video.playing = false;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
