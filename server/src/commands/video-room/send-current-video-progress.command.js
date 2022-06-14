import { Command } from '@colyseus/command';

import { CurrentVideoProgress } from '../../schemas/video-room.schemas.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class SendCurrentVideoProgressCommand extends Command {
  validate() {
    return this.state.users.size > 1;
  }

  execute({ sessionId }) {
    const { playing, progress, updateTimestamp } = this.state.video;
    const client = this.room.clients.find((client) => client.sessionId === sessionId);
    const timeOffset = (getTimestamp() - updateTimestamp) / 1000;

    const currentVideoProgress = new CurrentVideoProgress().assign({
      currentProgress: playing ? progress + timeOffset : progress,
      updateTimestamp: getTimestamp(),
    });

    client.send('video::current_video_progress', currentVideoProgress);
  }
}
