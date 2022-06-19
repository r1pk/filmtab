import { Command } from '@colyseus/command';

import { CurrentVideoProgress } from '../../schemas/video-room.schemas.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class SendVideoProgressCommand extends Command {
  execute({ clients, progress }) {
    const requestingUsers = clients.filter((client) => client.userData && client.userData.shouldReceiveVideoProgress);

    for (const requestingUser of requestingUsers) {
      const offset = (getTimestamp() - requestingUser.userData.videoProgressRequestTimestamp) / 1000;
      const currentVideoProgress = new CurrentVideoProgress().assign({
        progress: progress + offset + 0.25,
        updateTimestamp: getTimestamp(),
      });

      requestingUser.userData.shouldReceiveVideoProgress = false;
      requestingUser.userData.videoProgressRequestTimestamp = null;
      requestingUser.send('video::current_progress', currentVideoProgress);
    }
  }
}
