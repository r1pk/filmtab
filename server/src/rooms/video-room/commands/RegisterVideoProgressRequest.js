import { Command } from '@colyseus/command';

export class RegisterVideoProgressRequest extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ userId }) {
    this.state.requests.get('video_progress').push(userId);
  }
}
