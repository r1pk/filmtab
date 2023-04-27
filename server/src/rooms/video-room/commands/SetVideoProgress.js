import { Command } from '@colyseus/command';

export class SetVideoProgress extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ progress }) {
    this.state.video.progress = progress;
  }
}
