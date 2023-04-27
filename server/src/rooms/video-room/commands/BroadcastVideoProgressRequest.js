import { Command } from '@colyseus/command';

export class BroadcastVideoProgressRequest extends Command {
  execute({ requestor }) {
    this.room.broadcast('video::request_progress', {}, { except: requestor });
  }
}
