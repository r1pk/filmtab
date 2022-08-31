import { Command } from '@colyseus/command';

export class PauseVideo extends Command {
  execute() {
    this.state.video.playing = false;
  }
}
