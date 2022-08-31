import { Command } from '@colyseus/command';

import { getTimestamp } from '../utils/getTimestamp.js';

export class SetVideoProgress extends Command {
  execute({ progress }) {
    this.state.video.progress = progress;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
