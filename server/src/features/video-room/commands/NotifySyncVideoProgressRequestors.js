import { Command } from '@colyseus/command';

import { VideoProgress } from '../schemas/VideoProgress.js';

export class NotifySyncVideoProgressRequestors extends Command {
  execute({ progress }) {
    const requestors = this.state.requests.get('sync_video_progress');

    for (const client of this.room.clients) {
      if (requestors.includes(client.sessionId)) {
        client.send('video::sync_progress_response', new VideoProgress().assign({ progress: progress }));
      }
    }
  }
}
