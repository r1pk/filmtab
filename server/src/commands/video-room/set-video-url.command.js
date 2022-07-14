import { Command } from '@colyseus/command';

import { logger } from '../../logger.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class SetVideoUrlCommand extends Command {
  execute({ url }) {
    logger.debug(`Video url set! - RID: ${this.room.roomId} URL: ${url}`);

    this.state.video.url = url;
    this.state.video.subtitles = '';
    this.state.video.playing = false;
    this.state.video.progress = 0;
    this.state.video.updateTimestamp = getTimestamp();
  }
}
