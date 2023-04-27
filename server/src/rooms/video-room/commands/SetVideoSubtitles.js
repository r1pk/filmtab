import { Command } from '@colyseus/command';

export class SetVideoSubtitles extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ subtitles }) {
    this.state.video.subtitles = subtitles;
  }
}
