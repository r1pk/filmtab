import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { PlayVideoCommand } from '../../../src/commands/video-room/play-video.command.js';

describe('[VIDEO-ROOM] Command: "play-video" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('updates video `playing` property', async () => {
    await dispatcher.dispatch(new PlayVideoCommand(), {
      progress: 0,
    });

    expect(room.state.video.playing).to.be.true;
  });

  it('plays video from given progress', async () => {
    await dispatcher.dispatch(new PlayVideoCommand(), {
      progress: 15,
    });

    expect(room.state.video.progress).to.be.equal(15);
  });

  it('updates `updateTimestamp` property when command is dispatched', async () => {
    await dispatcher.dispatch(new PlayVideoCommand(), {
      progress: 0,
    });

    expect(room.state.video.updateTimestamp).to.be.not.equal(0);
  });
});
