import { Command } from '@colyseus/command';

export class UpdateVideoStateTimestamp extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute() {
    this.state.video.updatedAt = new Date().getTime();
  }
}
