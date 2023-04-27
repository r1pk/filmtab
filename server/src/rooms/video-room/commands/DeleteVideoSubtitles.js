import { Command } from '@colyseus/command';

export class DeleteVideoSubtitles extends Command {
  execute() {
    this.state.video.subtitles = '';
  }
}
