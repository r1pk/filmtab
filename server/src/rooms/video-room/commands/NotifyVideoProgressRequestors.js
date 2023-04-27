import { Command } from '@colyseus/command';

import { VideoProgress } from '../schemas/VideoProgress.js';

export class NotifyVideoProgressRequestors extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ progress }) {
    const requestors = this.state.requests.get('video_progress');

    for (const client of this.room.clients) {
      if (requestors.includes(client.sessionId)) {
        client.send('video::latest_progress', new VideoProgress().assign({ progress: progress }));
      }
    }
  }
}
