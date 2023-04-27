import { Command } from '@colyseus/command';

export class SetVideoPlayback extends Command {
  execute({ playing }) {
    this.state.video.playing = playing;
  }
}
