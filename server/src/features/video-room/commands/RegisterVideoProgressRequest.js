import { Command } from '@colyseus/command';

export class RegisterVideoProgressRequest extends Command {
  execute({ userId }) {
    this.state.requests.get('video_progress').push(userId);
  }
}
