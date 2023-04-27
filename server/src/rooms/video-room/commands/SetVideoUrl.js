import { Command } from '@colyseus/command';

export class SetVideoUrl extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ url }) {
    this.state.video.url = url;
  }
}
