import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { RoomState } from '../schemas/RoomState.js';

import { logger } from '##/logger.js';

import { ValidateUsername } from '../commands/ValidateUsername.js';
import { CheckUsernameUniqueness } from '../commands/CheckUsernameUniqueness.js';
import { CreateUserInstance } from '../commands/CreateUserInstance.js';
import { CreateUserColor } from '../commands/CreateUserColor.js';
import { DeleteUserInstance } from '../commands/DeleteUserInstance.js';
import { ValidateVideoUrl } from '../commands/ValidateVideoUrl.js';
import { UpdateVideoStateTimestamp } from '../commands/UpdateVideoStateTimestamp.js';
import { SetVideoUrl } from '../commands/SetVideoUrl.js';
import { ValidateVideoProgress } from '../commands/ValidateVideoProgress.js';
import { PlayVideo } from '../commands/PlayVideo.js';
import { PauseVideo } from '../commands/PauseVideo.js';
import { SetVideoProgress } from '../commands/SetVideoProgress.js';

export class VideoRoom extends Room {
  onCreate() {
    logger.debug('Room instance created!', { roomId: this.roomId });

    this.setPrivate(true);
    this.setState(new RoomState());
    this.dispatcher = new Dispatcher(this);

    this.onMessage('video::set_url', this.onSetVideoUrl.bind(this));
    this.onMessage('video::play', this.onPlayVideo.bind(this));
    this.onMessage('video::pause', this.onPauseVideo.bind(this));
    this.onMessage('video::seek', this.onSeekVideo.bind(this));
  }

  onJoin(client, options) {
    try {
      this.dispatcher.dispatch(new ValidateUsername(), {
        username: options.username,
      });

      this.dispatcher.dispatch(new CheckUsernameUniqueness(), {
        users: this.state.users.values(),
        username: options.username,
      });

      this.dispatcher.dispatch(new CreateUserInstance(), {
        id: client.sessionId,
        username: options.username,
      });

      this.dispatcher.dispatch(new CreateUserColor(), {
        id: client.sessionId,
        username: options.username,
      });

      logger.debug('Client joined!', { roomId: this.roomId, sessionId: client.sessionId, username: options.username });
    } catch (error) {
      this.errorHandler(client, error);
    }
  }

  onLeave(client) {
    this.dispatcher.dispatch(new DeleteUserInstance(), {
      id: client.sessionId,
    });

    logger.debug('Client left!', { roomId: this.roomId, sessionId: client.sessionId });
  }

  onDispose() {
    logger.debug('Room instance disposed!', { roomId: this.roomId });

    this.dispatcher.stop();
  }

  onSetVideoUrl(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoUrl(), {
        url: message.url,
      });

      this.dispatcher.dispatch(new SetVideoUrl(), {
        url: message.url,
      });

      this.dispatcher.dispatch(new SetVideoProgress(), {
        progress: 0,
      });

      this.dispatcher.dispatch(new PauseVideo());

      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video url set!', { roomId: this.roomId, sessionId: client.sessionId, url: message.url });
    } catch (error) {
      this.errorHandler(client, error);
    }
  }

  onPlayVideo(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoProgress(), {
        progress: message.progress,
      });

      this.dispatcher.dispatch(new SetVideoProgress(), {
        progress: message.progress,
      });

      this.dispatcher.dispatch(new PlayVideo());

      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video played!', { roomId: this.roomId, sessionId: client.sessionId, progress: message.progress });
    } catch (error) {
      this.errorHandler(client, error);
    }
  }

  onPauseVideo(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoProgress(), {
        progress: message.progress,
      });

      this.dispatcher.dispatch(new SetVideoProgress(), {
        progress: message.progress,
      });

      this.dispatcher.dispatch(new PauseVideo());

      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video paused!', { roomId: this.roomId, sessionId: client.sessionId, progress: message.progress });
    } catch (error) {
      this.errorHandler(client, error);
    }
  }

  onSeekVideo(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoProgress(), {
        progress: message.progress,
      });

      this.dispatcher.dispatch(new SetVideoProgress(), {
        progress: message.progress,
      });

      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video seeked!', { roomId: this.roomId, sessionId: client.sessionId, progress: message.progress });
    } catch (error) {
      this.errorHandler(client, error);
    }
  }

  errorHandler(client, error) {
    logger.error('Something went wrong!', { roomId: this.roomId, sessionId: client.sessionId, message: error.message });
    client.error(0, error.message);
  }
}
