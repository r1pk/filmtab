import { Command } from '@colyseus/command';

import { getTimestamp } from '../utils/getTimestamp.js';

export class PlayVideo extends Command {
  execute() {
    this.state.video.playing = true;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
