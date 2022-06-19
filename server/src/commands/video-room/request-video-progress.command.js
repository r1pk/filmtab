import { Command } from '@colyseus/command';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class RequestVideoProgress extends Command {
  validate() {
    return this.state.users.size > 1 && this.state.video.playing;
  }

  execute({ client }) {
    client.userData = {
      ...client.userData,
      shouldReceiveVideoProgress: true,
      videoProgressRequestTimestamp: getTimestamp(),
    };

    this.room.broadcast('video::request_progress', {}, { except: client });
  }
}
