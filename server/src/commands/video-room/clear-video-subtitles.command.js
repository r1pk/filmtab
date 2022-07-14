import { Command } from '@colyseus/command';

import { logger } from '../../logger.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class ClearVideoSubtitlesCommand extends Command {
  execute() {
    logger.debug(`Subtitles cleared! RID: ${this.room.id}`);

    this.state.video.subtitles = '';
    this.state.video.updateTimestamp = getTimestamp();
  }
}
