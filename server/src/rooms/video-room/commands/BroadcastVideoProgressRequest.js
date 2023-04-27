import { Command } from '@colyseus/command';

export class BroadcastVideoProgressRequest extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ requestor }) {
    this.room.broadcast('video::request_progress', {}, { except: requestor });
  }
}
