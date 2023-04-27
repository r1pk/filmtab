import { Command } from '@colyseus/command';

export class DeleteVideoSubtitles extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute() {
    this.state.video.subtitles = '';
  }
}
