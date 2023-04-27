import { Command } from '@colyseus/command';

export class SetVideoUrl extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ url }) {
    this.state.video.url = url;
  }
}
