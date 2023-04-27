import { Command } from '@colyseus/command';

export class ClearVideoProgressRequests extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute() {
    this.state.requests.set('video_progress', []);
  }
}
