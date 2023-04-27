import { Command } from '@colyseus/command';

export class RegisterVideoProgressRequest extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ userId }) {
    this.state.requests.get('video_progress').push(userId);
  }
}
