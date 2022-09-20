import { Command } from '@colyseus/command';

export class BroadcastSyncVideoProgressRequest extends Command {
  execute({ requestor }) {
    this.room.broadcast('video::sync_progress_request', {}, { except: requestor });
  }
}
