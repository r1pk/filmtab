import { Command } from '@colyseus/command';

export class UpdateVideoStateTimestamp extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute() {
    this.state.video.updatedAt = new Date().getTime();
  }
}
