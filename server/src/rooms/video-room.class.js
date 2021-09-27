import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../schemas/video-room.schemas.js';
import * as Commands from '../commands/video-room.commands.js';

import { logger } from '../helpers/logger.js';

export class VideoRoom extends Room {
  onCreate(options) {
    logger.debug(`Room RID: ${this.roomId} created!`);

    this.dispatcher = new Dispatcher(this);
    this.setState(new VideoRoomState());
    this.setPrivate(options.private);

    this.onMessage('video::set', (client, message) => {
      this.dispatcher.dispatch(new Commands.SetVideoUrlCommand(), {
        url: message.url,
      });
    });

    this.onMessage('video::play', (client, message) => {
      this.dispatcher.dispatch(new Commands.PlayVideoCommand(), {
        playedSeconds: message.playedSeconds,
      });
    });

    this.onMessage('video::pause', (client, message) => {
      this.dispatcher.dispatch(new Commands.PauseVideoCommand(), {
        playedSeconds: message.playedSeconds,
      });
    });

    this.onMessage('video::seek', (client, message) => {
      this.dispatcher.dispatch(new Commands.SeekVideoCommand(), {
        playedSeconds: message.playedSeconds,
      });
    });
  }

  onJoin(client, options) {
    this.dispatcher.dispatch(new Commands.OnJoinCommand(), {
      sessionId: client.sessionId,
      username: options.username,
    });
  }

  onLeave(client) {
    this.dispatcher.dispatch(new Commands.OnLeaveCommand(), {
      sessionId: client.sessionId,
    });
  }

  onDispose() {
    logger.debug(`Room RID: ${this.roomId} disposing!`);

    this.dispatcher.stop();
  }
}
