import { Command } from '@colyseus/command';

export class SetVideoProgress extends Command {
  execute({ progress }) {
    this.state.video.progress = progress;
  }
}
