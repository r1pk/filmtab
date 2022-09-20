import { Command } from '@colyseus/command';

export class RegisterSyncVideoProgressRequest extends Command {
  execute({ userId }) {
    this.state.requests.get('sync_video_progress').push(userId);
  }
}
