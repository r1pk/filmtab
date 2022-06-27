import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { SetVideoUrlCommand } from '../../../src/commands/video-room/set-video-url.command.js';

describe('[VIDEO-ROOM] Command: "set-video-url" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('changes video `url` property to given value', async () => {
    await dispatcher.dispatch(new SetVideoUrlCommand(), {
      url: 'http://example.com/video.mp4',
    });

    expect(room.state.video.url).to.be.equal('http://example.com/video.mp4');
  });

  it('resets video progress to 0', async () => {
    await dispatcher.dispatch(new SetVideoUrlCommand(), {
      url: 'http://example.com/video.mp4',
    });

    expect(room.state.video.progress).to.be.equal(0);
  });

  it('pauses video when new video url is set', async () => {
    await dispatcher.dispatch(new SetVideoUrlCommand(), {
      url: 'http://example.com/video.mp4',
    });

    expect(room.state.video.playing).to.be.false;
  });

  it('updates `updateTimestamp` property when command is dispatched', async () => {
    await dispatcher.dispatch(new SetVideoUrlCommand(), {
      url: 'http://example.com/video.mp4',
    });

    expect(room.state.video.updateTimestamp).to.be.not.equal(0);
  });
});
