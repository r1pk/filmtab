import { Command } from '@colyseus/command';

import { User, Message, CurrentVideoProgress } from '../schemas/video-room.schemas.js';

import { logger } from '../logger.js';

import { getTimestamp } from '../utils/get-timestamp.js';
import { normalizeUsername } from '../utils/normalize-username.js';
import { createUserColor } from '../utils/create-user-color.js';
import { normalizeMessageContent } from '../utils/normalize-message-content.js';
import { getUniqueId } from '../utils/get-unique-id.js';

export class ValidateUsernameCommand extends Command {
  execute({ username }) {
    const normalizedUsername = normalizeUsername(username);
    const users = this.state.users.values();

    if (normalizedUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long!');
    }

    for (let user of users) {
      if (normalizedUsername === user.name) {
        throw new Error('Username is already taken!');
      }
    }
  }
}

export class JoinRoomCommand extends Command {
  execute({ sessionId, username }) {
    logger.debug(`Client joined! - SID: ${sessionId} - Username: ${username}`);

    const normalizedUsername = normalizeUsername(username);
    const user = new User().assign({
      name: normalizedUsername,
      color: createUserColor(normalizedUsername, 0.7),
    });

    this.state.users.set(sessionId, user);
    this.room.broadcastPatch();
  }
}

export class LeaveRoomCommand extends Command {
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
    this.state.video.progress = 0;
    this.state.video.updateTimestamp = getTimestamp();
  }
}

export class PlayVideoCommand extends Command {
  execute({ progress }) {
    logger.debug(`Video resumed! - RID: ${this.room.roomId} Progress: ${progress}`);

    this.state.video.playing = true;
    this.state.video.progress = progress;
    this.state.video.updateTimestamp = getTimestamp();
  }
}

export class PauseVideoCommand extends Command {
  execute({ progress }) {
    logger.debug(`Video paused! - RID: ${this.room.roomId} Progress: ${progress}`);

    this.state.video.playing = false;
    this.state.video.progress = progress;
    this.state.video.updateTimestamp = getTimestamp();
  }
}

export class SeekVideoCommand extends Command {
  execute({ progress }) {
    logger.debug(`Video seeking! - RID: ${this.room.roomId} Progress: ${progress}`);

    this.state.video.progress = progress;
    this.state.video.updateTimestamp = getTimestamp();
  }
}

export class SendCurrentVideoProgressCommand extends Command {
  validate() {
    return this.state.users.size > 1;
  }

  execute({ sessionId }) {
    const { playing, progress, updateTimestamp } = this.state.video;
    const client = this.room.clients.find((client) => client.sessionId === sessionId);
    const timeOffset = (getTimestamp() - updateTimestamp) / 1000;

    const currentVideoProgress = new CurrentVideoProgress().assign({
      currentProgress: playing ? progress + timeOffset : progress,
      updateTimestamp: getTimestamp(),
    });

    client.send('video::current_video_progress', currentVideoProgress);
  }
}

export class ValidateMessageContentCommand extends Command {
  execute({ content }) {
    const normalizedMessageContent = normalizeMessageContent(content);

    if (normalizedMessageContent.length < 1) {
      throw new Error('Message must have at least one character!');
    }

    if (normalizedMessageContent.length > 140) {
      throw new Error('The length of message is too long. The maximum length is 140!');
    }
  }
}

export class PublishChatMessageCommand extends Command {
  validate({ sessionId }) {
    return this.state.users.has(sessionId);
  }

  execute({ sessionId, content }) {
    const normalizedMessageContent = normalizeMessageContent(content);
    const message = new Message().assign({
      id: getUniqueId(),
      timestamp: getTimestamp(),
      author: this.state.users.get(sessionId),
      content: normalizedMessageContent,
    });

    this.room.broadcast('chat::message', message);
  }
}
