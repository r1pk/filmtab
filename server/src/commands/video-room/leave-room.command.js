import { Command } from '@colyseus/command';

import { logger } from '../../logger.js';

export class LeaveRoomCommand extends Command {
  validate({ sessionId }) {
    return this.state.users.has(sessionId);
  }

  execute({ sessionId }) {
    logger.debug(`Client left! - SID: ${sessionId}`);

    this.state.users.delete(sessionId);
  }
}
