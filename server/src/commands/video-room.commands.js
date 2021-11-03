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
    logger.debug(`Client joined! - SID: ${sessionId} - Username: ${username}`);

    const normalizedUsername = normalize(username);
    const user = new User().assign({
      name: normalizedUsername,
    });

    this.state.users.set(sessionId, user);
    this.room.broadcastPatch();

    return [new SendCurrentPlayedSeconds().setPayload({ sessionId })];
  }
}

export class OnLeaveCommand extends Command {
  validate({ sessionId }) {
    return this.state.users.has(sessionId);
  }

  execute({ sessionId }) {
    logger.debug(`Client left! - SID: ${sessionId}`);

    this.state.users.delete(sessionId);
  }
}

export class SetVideoUrlCommand extends Command {
  execute({ url }) {
    logger.debug(`Video url set! - RID: ${this.room.roomId} URL: ${url}`);

    this.state.video.url = url;
    this.state.video.playing = false;
    this.state.video.playedSeconds = 0;
  }
}

export class PlayVideoCommand extends Command {
  execute({ playedSeconds }) {
    logger.debug(`Video resumed! - RID: ${this.room.roomId} Played seconds: ${playedSeconds}`);

    this.state.video.playing = true;
    this.state.video.playedSeconds = playedSeconds;
    this.state.video.updateTimestamp = new Date().getTime();
  }
}

export class PauseVideoCommand extends Command {
  execute({ playedSeconds }) {
    logger.debug(`Video paused! - RID: ${this.room.roomId} Played seconds: ${playedSeconds}`);

    this.state.video.playing = false;
    this.state.video.playedSeconds = playedSeconds;
    this.state.video.updateTimestamp = new Date().getTime();
  }
}

export class SeekVideoCommand extends Command {
  execute({ playedSeconds }) {
    logger.debug(`Video seeking! - RID: ${this.room.roomId} Played seconds: ${playedSeconds}`);

    this.state.video.playedSeconds = playedSeconds;
    this.state.video.updateTimestamp = new Date().getTime();
  }
}

export class SendCurrentPlayedSeconds extends Command {
  execute({ sessionId }) {
    const { playing, playedSeconds, updateTimestamp } = this.state.video;
    const client = this.room.clients.find((client) => client.sessionId === sessionId);
    const timeOffset = (new Date().getTime() - updateTimestamp) / 1000;

    client.send('video::currentPlayedSeconds', {
      currentPlayedSeconds: playedSeconds + (playing ? timeOffset : 0),
    });
  }
}
