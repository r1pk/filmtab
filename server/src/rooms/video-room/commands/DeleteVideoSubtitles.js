import { Command } from '@colyseus/command';

export class DeleteVideoSubtitles extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute() {
    this.state.video.subtitles = '';
  }
}
