import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../schemas/video-room.schemas.js';
import * as Commands from '../commands/video-room.commands.js';

import { logger } from '../logger.js';

export class VideoRoom extends Room {
  onCreate() {
    logger.debug(`Room RID: ${this.roomId} created!`);

    this.dispatcher = new Dispatcher(this);
    this.setState(new VideoRoomState());
    this.setPrivate(true);

    this.onMessage('video::set', this.onSetVideo.bind(this));
    this.onMessage('video::play', this.onPlayVideo.bind(this));
    this.onMessage('video::pause', this.onPauseVideo.bind(this));
    this.onMessage('video::seek', this.onSeekVideo.bind(this));
  }

  onJoin(client, options) {
    this.dispatcher.dispatch(new Commands.ValidateUsernameCommand(), {
      username: options.username,
    });

    this.dispatcher.dispatch(new Commands.JoinRoomCommand(), {
      sessionId: client.sessionId,
      username: options.username,
    });
  }

  onLeave(client) {
    this.dispatcher.dispatch(new Commands.LeaveRoomCommand(), {
      sessionId: client.sessionId,
    });
  }

  onSetVideo(client, message) {
    this.dispatcher.dispatch(new Commands.SetVideoUrlCommand(), {
      url: message.url,
    });
  }

  onPlayVideo(client, message) {
    this.dispatcher.dispatch(new Commands.PlayVideoCommand(), {
      playedSeconds: message.playedSeconds,
    });
  }

  onPauseVideo(client, message) {
    this.dispatcher.dispatch(new Commands.PauseVideoCommand(), {
      playedSeconds: message.playedSeconds,
    });
  }

  onSeekVideo(client, message) {
    this.dispatcher.dispatch(new Commands.SeekVideoCommand(), {
      playedSeconds: message.playedSeconds,
    });
  }

  onDispose() {
    logger.debug(`Room RID: ${this.roomId} disposing!`);

    this.dispatcher.stop();
  }
}
