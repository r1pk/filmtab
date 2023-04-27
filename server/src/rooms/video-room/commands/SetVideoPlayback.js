import { Command } from '@colyseus/command';

export class SetVideoPlayback extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ playing }) {
    this.state.video.playing = playing;
  }
}
