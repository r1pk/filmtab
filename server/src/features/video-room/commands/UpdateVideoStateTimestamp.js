import { Command } from '@colyseus/command';

export class UpdateVideoStateTimestamp extends Command {
  execute() {
    this.state.video.updatedAt = new Date().getTime();
  }
}
