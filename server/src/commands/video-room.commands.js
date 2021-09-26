import { Command } from '@colyseus/command';

import { User } from '../schemas/video-room.schemas.js';

import { logger } from '../helpers/logger.js';
import { normalize } from '../helpers/normalize.js';

export class OnJoinCommand extends Command {
  validate({ username }) {
    const normalizedUsername = normalize(username);
    const users = this.state.users.values();

    if (normalizedUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long!');
    }

    for (let user of users) {
      if (normalizedUsername === user.name) {
        throw new Error('Username is already taken!');
      }
    }

    return true;
  }

  execute({ sessionId, username }) {
    logger.info(`Client joined! - SID: ${sessionId} - Username: ${username}`);

    const normalizedUsername = normalize(username);
    const user = new User().assign({
      name: normalizedUsername,
    });

    this.state.users.set(sessionId, user);
  }
}

export class OnLeaveCommand extends Command {
  validate({ sessionId }) {
    return this.state.users.has(sessionId);
  }

  execute({ sessionId }) {
    logger.info(`Client left! - SID: ${sessionId}`);

    this.state.users.delete(sessionId);
  }
}

export class SetVideoUrlCommand extends Command {
  execute({ url }) {
    logger.info(`Video url set! - RID: ${this.room.roomId} URL: ${url}`);

    this.state.video.url = url;
    this.state.video.paused = true;
  }
}

export class PlayVideoCommand extends Command {
  execute({ playedSeconds }) {
    logger.info(`Video resumed! - RID: ${this.room.roomId} Played seconds: ${playedSeconds}`);

    this.state.video.paused = false;
    this.state.video.playedSeconds = playedSeconds;
    this.state.video.updateTimestamp = new Date().getTime();
  }
}

export class PauseVideoCommand extends Command {
  execute({ playedSeconds }) {
    logger.info(`Video paused! - RID: ${this.room.roomId} Played seconds: ${playedSeconds}`);

    this.state.video.paused = true;
    this.state.video.playedSeconds = playedSeconds;
    this.state.video.updateTimestamp = new Date().getTime();
  }
}

export class SeekVideoCommand extends Command {
  execute({ playedSeconds }) {
    logger.info(`Video seeking! - RID: ${this.room.roomId} Played seconds: ${playedSeconds}`);

    this.state.video.playedSeconds = playedSeconds;
    this.state.video.updateTimestamp = new Date().getTime();
  }
}
