import { Command } from '@colyseus/command';

export class SetVideoSubtitles extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ subtitles }) {
    this.state.video.subtitles = subtitles;
  }
}
