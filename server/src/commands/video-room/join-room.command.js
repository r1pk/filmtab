import { Command } from '@colyseus/command';

import { User } from '../../schemas/video-room.schemas.js';

import { logger } from '../../logger.js';

import { normalizeUsername } from '../../utils/normalize-username.js';
import { createUserColor } from '../../utils/create-user-color.js';

export class JoinRoomCommand extends Command {
  execute({ client, username }) {
    logger.debug(`Client joined! - SID: ${client.sessionId} - Username: ${username}`);

    const normalizedUsername = normalizeUsername(username);
    const user = new User().assign({
      name: normalizedUsername,
      color: createUserColor(normalizedUsername, 0.7, 0.75),
    });

    client.userData = { events: {} };

    this.state.users.set(client.sessionId, user);
    this.room.broadcastPatch();
  }
}
