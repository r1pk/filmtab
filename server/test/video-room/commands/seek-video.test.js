import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { SeekVideoCommand } from '../../../src/commands/video-room/seek-video.command.js';

describe('[VIDEO-ROOM] Command: "seek-video" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('updates video progress', async () => {
    await dispatcher.dispatch(new SeekVideoCommand(), {
      progress: 10,
    });

    expect(room.state.video.progress).to.be.equal(10);
  });

  it('updates `updateTimestamp` property when command is dispatched', async () => {
    await dispatcher.dispatch(new SeekVideoCommand(), {
      progress: 0,
    });

    expect(room.state.video.updateTimestamp).to.be.not.equal(0);
  });
});
