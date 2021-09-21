import { Room } from '@colyseus/core';

import { VideoRoomState, User } from '../schemas/video-room.schemas.js';

import { logger } from '../helpers/logger.js';
import { normalize } from '../helpers/normalize.js';

export class VideoRoom extends Room {
  onCreate(options) {
    logger.info(`Room created! - RID: ${this.roomId}`);

    this.setState(new VideoRoomState());
  }

  onAuth(client, options) {
    const username = normalize(options.username);
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long!');
    }
    if (!this.isUsernameUnique(username)) {
      throw new Error('Username is already taken!');
    }
    return username;
  }

  onJoin(client, options, username) {
    logger.info(`Client joined! - SID: ${client.sessionId} - Username: ${username}`);

    const user = new User().assign({
      name: username,
    });

    this.state.users.set(client.sessionId, user);
  }

  onLeave(client) {
    logger.info(`Client left! - SID: ${client.sessionId}`);

    if (this.state.users.has(client.sessionId)) {
      this.state.users.delete(client.sessionId);
    }
  }

  isUsernameUnique(username) {
    const users = this.state.users.values();
    for (let user of users) {
      if (username === user.name) {
        return false;
      }
    }
    return true;
  }
}
