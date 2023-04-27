import { Command } from '@colyseus/command';

export class SetVideoUrl extends Command {
  execute({ url }) {
    this.state.video.url = url;
  }
}
