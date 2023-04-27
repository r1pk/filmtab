import { Command } from '@colyseus/command';

export class ClearVideoProgressRequests extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute() {
    this.state.requests.set('video_progress', []);
  }
}
