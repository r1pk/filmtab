import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../schemas/video-room.schemas.js';

import { JoinRoomCommand } from '../commands/video-room/join-room.command.js';
import { LeaveRoomCommand } from '../commands/video-room/leave-room.command.js';
import { PauseVideoCommand } from '../commands/video-room/pause-video.command.js';
import { PlayVideoCommand } from '../commands/video-room/play-video.command.js';
import { PublishChatMessageCommand } from '../commands/video-room/publish-chat-message.command.js';
import { RequestVideoProgressCommand } from '../commands/video-room/request-video-progress.command.js';
import { SeekVideoCommand } from '../commands/video-room/seek-video.command.js';
import { SendVideoProgressCommand } from '../commands/video-room/send-video-progress.command.js';
import { SetVideoUrlCommand } from '../commands/video-room/set-video-url.command.js';
import { ValidateMessageContentCommand } from '../commands/video-room/validate-message-content.command.js';
import { ValidateUsernameCommand } from '../commands/video-room/validate-username.command.js';

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
    this.onMessage('video::current_progress', this.onCurrentVideoProgressMessage.bind(this));
    this.onMessage('chat::message', this.onChatMessage.bind(this));
  }

  onJoin(client, options) {
    try {
      this.dispatcher.dispatch(new ValidateUsernameCommand(), {
        username: options.username,
      });

      this.dispatcher.dispatch(new JoinRoomCommand(), {
        client: client,
        username: options.username,
      });

      this.dispatcher.dispatch(new RequestVideoProgressCommand(), {
        requester: client,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onLeave(client) {
    try {
      this.dispatcher.dispatch(new LeaveRoomCommand(), {
        sessionId: client.sessionId,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onSetVideo(client, message) {
    try {
      this.dispatcher.dispatch(new SetVideoUrlCommand(), {
        url: message.url,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onPlayVideo(client, message) {
    try {
      this.dispatcher.dispatch(new PlayVideoCommand(), {
        progress: message.progress,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onPauseVideo(client, message) {
    try {
      this.dispatcher.dispatch(new PauseVideoCommand(), {
        progress: message.progress,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onSeekVideo(client, message) {
    try {
      this.dispatcher.dispatch(new SeekVideoCommand(), {
        progress: message.progress,
      });
    } catch (error) {
      this.handleRoomErrors(client, error);
    }
  }

  onCurrentVideoProgressMessage(client, message) {
    this.dispatcher.dispatch(new SendVideoProgressCommand(), {
      progress: message.progress,
      clients: this.clients,
    });
  }

  onChatMessage(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateMessageContentCommand(), {
        content: message.content,
      });

      this.dispatcher.dispatch(new PublishChatMessageCommand(), {
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
