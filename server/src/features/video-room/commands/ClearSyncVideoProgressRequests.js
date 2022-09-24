import { Command } from '@colyseus/command';

export class ClearSyncVideoProgressRequests extends Command {
  execute() {
    this.state.requests.set('sync_video_progress', []);
  }
}
