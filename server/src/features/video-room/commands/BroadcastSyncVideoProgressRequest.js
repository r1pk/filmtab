import { Command } from '@colyseus/command';

export class BroadcastSyncVideoProgressRequest extends Command {
  execute({ requestor }) {
    if (this.state.users.size > 1) {
      this.room.broadcast('video::sync_progress_request', {}, { except: requestor });
    }
  }
}
