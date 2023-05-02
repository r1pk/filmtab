import { Command } from '@colyseus/command';

export class BroadcastVideoProgressRequest extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ requestor }) {
    this.room.broadcast('video::request_progress', {}, { except: requestor });
  }
}
