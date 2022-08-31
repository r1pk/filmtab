import { Command } from '@colyseus/command';

export class PlayVideo extends Command {
  execute() {
    this.state.video.playing = true;
  }
}
