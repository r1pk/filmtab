import { Command } from '@colyseus/command';

export class SetVideoSubtitles extends Command {
  execute({ subtitles }) {
    this.state.video.subtitles = subtitles;
  }
}
