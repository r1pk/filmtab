import { Room } from '@colyseus/core';

import { RoomState } from '../schemas/RoomState.js';

import { logger } from '##/logger.js';

export class VideoRoom extends Room {
  onCreate() {
    logger.debug('VideoRoom instance created!', { roomId: this.roomId });

    this.setState(new RoomState());
    this.setPrivate(true);
  }
}
