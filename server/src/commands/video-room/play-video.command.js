import { Command } from '@colyseus/command';

import { logger } from '../../logger.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class PlayVideoCommand extends Command {
  execute({ progress }) {
    logger.debug(`Video resumed! - RID: ${this.room.roomId} Progress: ${progress}`);

    this.state.video.playing = true;
    this.state.video.progress = progress;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
