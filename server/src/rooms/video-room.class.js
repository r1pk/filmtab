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
    this.onMessage('chat::message', this.onChatMessage.bind(this));
  }

  onJoin(client, options) {
    try {
      this.dispatcher.dispatch(new Commands.ValidateUsernameCommand(), {
        username: options.username,
      });

      this.dispatcher.dispatch(new Commands.JoinRoomCommand(), {
        sessionId: client.sessionId,
        username: options.username,
      });

      this.dispatcher.dispatch(new Commands.SendCurrentVideoProgressCommand(), {
        sessionId: client.sessionId,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onLeave(client) {
    try {
      this.dispatcher.dispatch(new Commands.LeaveRoomCommand(), {
        sessionId: client.sessionId,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onSetVideo(client, message) {
    try {
      this.dispatcher.dispatch(new Commands.SetVideoUrlCommand(), {
        url: message.url,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onPlayVideo(client, message) {
    try {
      this.dispatcher.dispatch(new Commands.PlayVideoCommand(), {
        progress: message.progress,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onPauseVideo(client, message) {
    try {
      this.dispatcher.dispatch(new Commands.PauseVideoCommand(), {
        progress: message.progress,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onSeekVideo(client, message) {
    try {
      this.dispatcher.dispatch(new Commands.SeekVideoCommand(), {
        progress: message.progress,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onChatMessage(client, message) {
    try {
      this.dispatcher.dispatch(new Commands.ValidateMessageContentCommand(), {
        content: message.content,
      });

      this.dispatcher.dispatch(new Commands.PublishChatMessageCommand(), {
        sessionId: client.sessionId,
        content: message.content,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  handleRoomErrors(client, error) {
    logger.error(error);
    client.error(0, error.message);
  }

  onDispose() {
    logger.debug(`Room RID: ${this.roomId} disposing!`);

    this.dispatcher.stop();
  }
}
