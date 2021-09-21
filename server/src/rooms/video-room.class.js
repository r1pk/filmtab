import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../schemas/video-room.schemas.js';
import { OnJoinCommand, OnLeaveCommand } from '../commands/video-room.commands.js';

import { logger } from '../helpers/logger.js';

export class VideoRoom extends Room {
  onCreate(options) {
    logger.info(`Room RID: ${this.roomId} created!`);

    this.dispatcher = new Dispatcher(this);
    this.setState(new VideoRoomState());
  }

  onJoin(client, options) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId,
      username: options.username,
    });
  }

  onLeave(client) {
    this.dispatcher.dispatch(new OnLeaveCommand(), {
      sessionId: client.sessionId,
    });
  }

  onDispose() {
    logger.info(`Room RID: ${this.roomId} disposing!`);

    this.dispatcher.stop();
  }
}
