import { Command } from '@colyseus/command';

import { logger } from '../../logger.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class PauseVideoCommand extends Command {
  execute({ progress }) {
    logger.debug(`Video paused! - RID: ${this.room.roomId} Progress: ${progress}`);

    this.state.video.playing = false;
    this.state.video.progress = progress;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
