import { Command } from '@colyseus/command';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class RequestVideoProgressCommand extends Command {
  validate() {
    return this.state.users.size > 1 && this.state.video.playing;
  }

  execute({ requester }) {
    requester.userData.events['video::request_progress'] = {
      requester: true,
      timestamp: getTimestamp(),
    };

    this.room.broadcast('video::request_progress', {}, { except: requester });
  }
}
