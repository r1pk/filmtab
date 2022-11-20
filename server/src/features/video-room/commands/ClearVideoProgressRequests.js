import { Command } from '@colyseus/command';

export class ClearVideoProgressRequests extends Command {
  execute() {
    this.state.requests.set('video_progress', []);
  }
}
