import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { PauseVideoCommand } from '../../../src/commands/video-room/pause-video.command.js';

describe('[VIDEO-ROOM] Command: "pause-video" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('updates video `playing` property', async () => {
    await dispatcher.dispatch(new PauseVideoCommand(), {
      progress: 0,
    });

    expect(room.state.video.playing).to.be.false;
  });

  it('pauses video at given progress', async () => {
    await dispatcher.dispatch(new PauseVideoCommand(), {
      progress: 15,
    });

    expect(room.state.video.progress).to.be.equal(15);
  });

  it('updates `updateTimestamp` property when command is dispatched', async () => {
    await dispatcher.dispatch(new PauseVideoCommand(), {
      progress: 0,
    });

    expect(room.state.video.updateTimestamp).to.be.not.equal(0);
  });
});
