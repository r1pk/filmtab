import { Command } from '@colyseus/command';

import { getTimestamp } from '../utils/getTimestamp.js';

export class PauseVideo extends Command {
  execute() {
    this.state.video.playing = false;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
