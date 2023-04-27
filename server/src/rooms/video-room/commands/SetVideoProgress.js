import { Command } from '@colyseus/command';

export class SetVideoProgress extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ progress }) {
    this.state.video.progress = progress;
  }
}
