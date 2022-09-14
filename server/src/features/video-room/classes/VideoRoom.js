import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { RoomState } from '../schemas/RoomState.js';

import { logger } from '##/logger.js';

import { ValidateUsername } from '../commands/ValidateUsername.js';
import { ValidateUsernameUniqueness } from '../commands/ValidateUsernameUniqueness.js';
import { ValidateVideoUrl } from '../commands/ValidateVideoUrl.js';
import { ValidateVideoProgress } from '../commands/ValidateVideoProgress.js';
import { ValidateVideoSubtitles } from '../commands/ValidateVideoSubtitles.js';
import { ValidateChatMessageContent } from '../commands/ValidateChatMessageContent.js';
import { ValidateVideoProgressRequest } from '../commands/ValidateVideoProgressRequest.js';

import { CreateUserInstance } from '../commands/CreateUserInstance.js';
import { DeleteUserInstance } from '../commands/DeleteUserInstance.js';
import { CreateUserColor } from '../commands/CreateUserColor.js';
import { SetVideoUrl } from '../commands/SetVideoUrl.js';
import { SetVideoPlayback } from '../commands/SetVideoPlayback.js';
import { SetVideoProgress } from '../commands/SetVideoProgress.js';
import { SetVideoSubtitles } from '../commands/SetVideoSubtitles.js';
import { DeleteVideoSubtitles } from '../commands/DeleteVideoSubtitles.js';
import { UpdateVideoStateTimestamp } from '../commands/UpdateVideoStateTimestamp.js';
import { RegisterRequest } from '../commands/RegisterRequest.js';
import { ClearRequests } from '../commands/ClearRequests.js';
import { BroadcastVideoProgressRequest } from '../commands/BroadcastVideoProgressRequest.js';
import { NotifyVideoProgressRequestors } from '../commands/NotifyVideoProgressRequestors.js';
import { BroadcastChatMessage } from '../commands/BroadcastChatMessage.js';

export class VideoRoom extends Room {
  onCreate() {
    this.setPrivate(true);
    this.setState(new RoomState());
    this.dispatcher = new Dispatcher(this);

    this.onMessage('video::set_url', this.onSetVideoUrl.bind(this));
    this.onMessage('video::play', this.onPlayVideo.bind(this));
    this.onMessage('video::pause', this.onPauseVideo.bind(this));
    this.onMessage('video::toggle_playback', this.onToggleVideoPlayback.bind(this));
    this.onMessage('video::seek', this.onSeekVideo.bind(this));
    this.onMessage('video::set_subtitles', this.onSetVideoSubtitles.bind(this));
    this.onMessage('video::delete_subtitles', this.onDeleteVideoSubtitles.bind(this));
    this.onMessage('video::progress_request', this.onVideoProgressRequest.bind(this));
    this.onMessage('video::progress_response', this.onVideoProgressRequestResponse.bind(this));

    this.onMessage('chat::message', this.onChatMessage.bind(this));

    logger.debug('Room instance created!', { roomId: this.roomId });
  }

  onJoin(client, options) {
    try {
      this.dispatcher.dispatch(new ValidateUsername(), {
        username: options.username,
      });
      this.dispatcher.dispatch(new ValidateUsernameUniqueness(), {
        username: options.username,
      });
      this.dispatcher.dispatch(new CreateUserInstance(), {
        userId: client.sessionId,
        username: options.username,
      });
      this.dispatcher.dispatch(new CreateUserColor(), {
        userId: client.sessionId,
        username: options.username,
      });

      logger.debug('Client joined!', { roomId: this.roomId, userId: client.sessionId, username: options.username });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onLeave(client) {
    this.dispatcher.dispatch(new DeleteUserInstance(), {
      userId: client.sessionId,
    });

    logger.debug('Client left!', { roomId: this.roomId, userId: client.sessionId });
  }

  onDispose() {
    this.dispatcher.stop();

    logger.debug('Room instance disposed!', { roomId: this.roomId });
  }

  onError(client, error) {
    client.error(0, error.message);

    logger.error('Something went wrong!', { roomId: this.roomId, userId: client.sessionId, message: error.message });
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
      this.dispatcher.dispatch(new SetVideoPlayback(), {
        playing: false,
      });
      this.dispatcher.dispatch(new DeleteVideoSubtitles());
      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video url set!', { roomId: this.roomId, userId: client.sessionId, url: message.url });
    } catch (error) {
      this.onError(client, error);
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
      this.dispatcher.dispatch(new SetVideoPlayback(), {
        playing: true,
      });
      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video played!', { roomId: this.roomId, userId: client.sessionId, progress: message.progress });
    } catch (error) {
      this.onError(client, error);
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
      this.dispatcher.dispatch(new SetVideoPlayback(), {
        playing: false,
      });
      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video paused!', { roomId: this.roomId, userId: client.sessionId, progress: message.progress });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onToggleVideoPlayback(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoProgress(), {
        progress: message.progress,
      });
      this.dispatcher.dispatch(new SetVideoProgress(), {
        progress: message.progress,
      });
      this.dispatcher.dispatch(new SetVideoPlayback(), {
        playing: !this.state.video.playing,
      });
      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video playback toggled!', { roomId: this.roomId, userId: client.sessionId });
    } catch (error) {
      this.onError(client, error);
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

      logger.debug('Video seeked!', { roomId: this.roomId, userId: client.sessionId, progress: message.progress });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onSetVideoSubtitles(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoSubtitles(), {
        subtitles: message.subtitles,
      });
      this.dispatcher.dispatch(new SetVideoSubtitles(), {
        subtitles: message.subtitles,
      });
      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video subtitles set!', { roomId: this.roomId, userId: client.sessionId });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onDeleteVideoSubtitles(client) {
    try {
      this.dispatcher.dispatch(new DeleteVideoSubtitles());
      this.dispatcher.dispatch(new UpdateVideoStateTimestamp());

      logger.debug('Video subtitles deleted!', { roomId: this.roomId, userId: client.sessionId });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onVideoProgressRequest(client) {
    try {
      this.dispatcher.dispatch(new ValidateVideoProgressRequest());
      this.dispatcher.dispatch(new RegisterRequest(), {
        requestType: 'video_progress',
        userId: client.sessionId,
      });
      this.dispatcher.dispatch(new BroadcastVideoProgressRequest(), {
        requestor: client,
      });

      logger.debug('Video progress request registered!', { roomId: this.roomId, userId: client.sessionId });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onVideoProgressRequestResponse(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateVideoProgress(), {
        progress: message.progress,
      });
      this.dispatcher.dispatch(new NotifyVideoProgressRequestors(), {
        progress: message.progress,
      });
      this.dispatcher.dispatch(new ClearRequests(), {
        requestType: 'video_progress',
      });

      logger.debug('Video progress request response received!', { roomId: this.roomId, userId: client.sessionId });
    } catch (error) {
      this.onError(client, error);
    }
  }

  onChatMessage(client, message) {
    try {
      this.dispatcher.dispatch(new ValidateChatMessageContent(), {
        content: message.content,
      });
      this.dispatcher.dispatch(new BroadcastChatMessage(), {
        userId: client.sessionId,
        content: message.content,
      });

      logger.debug('Chat message received!', { roomId: this.roomId, userId: client.sessionId });
    } catch (error) {
      this.onError(client, error);
    }
  }
}
