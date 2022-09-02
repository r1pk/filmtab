import { Command } from '@colyseus/command';

export class BroadcastVideoProgressRequest extends Command {
  execute({ requestor }) {
    this.room.broadcast('video::progress_request', {}, { except: requestor });
  }
}
