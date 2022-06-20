import { Command } from '@colyseus/command';

import { VideoProgressMessage } from '../../schemas/video-room.schemas.js';

import { getTimestamp } from '../../utils/get-timestamp.js';

export class SendVideoProgressCommand extends Command {
  execute({ progress }) {
    const eventName = 'video::request_progress';
    for (const client of this.room.clients) {
      if (client.userData.events[eventName]) {
        const { requester, timestamp } = client.userData.events[eventName];

        if (requester) {
          const offset = (getTimestamp() - timestamp) / 1000;
          const videoProgressMessage = new VideoProgressMessage().assign({
            progress: progress + offset + 0.25,
            updateTimestamp: getTimestamp(),
          });

          client.send('video::current_progress', videoProgressMessage);
          client.userData.events[eventName].requester = false;
        }
      }
    }
  }
}
