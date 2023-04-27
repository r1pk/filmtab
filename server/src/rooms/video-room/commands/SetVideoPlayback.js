import { Command } from '@colyseus/command';

export class SetVideoPlayback extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ playing }) {
    this.state.video.playing = playing;
  }
}
