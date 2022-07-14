import { Command } from '@colyseus/command';

import { logger } from '../../logger.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class SetVideoSubtitlesCommand extends Command {
  validate() {
    return this.state.video.url !== '';
  }

  execute({ subtitles }) {
    logger.debug(`Subtitles set! - RID: ${this.room.roomId}`);

    this.state.video.subtitles = subtitles;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
