import { Command } from '@colyseus/command';

export class RegisterSyncVideoProgressRequest extends Command {
  execute({ userId }) {
    if (this.state.users.size > 1) {
      this.state.requests.get('sync_video_progress').push(userId);
    }
  }
}
