import sinon from 'sinon';
import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { SetVideoSubtitlesCommand } from '../../../src/commands/video-room/set-video-subtitles.command.js';
import { SetVideoUrlCommand } from '../../../src/commands/video-room/set-video-url.command.js';

describe('[VIDEO-ROOM] Command: "set-video-subtitles" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('sets video `subtitles` property to given value', async () => {
    await dispatcher.dispatch(new SetVideoUrlCommand(), {
      url: 'http://example.com/video.mp4',
    });

    await dispatcher.dispatch(new SetVideoSubtitlesCommand(), {
      subtitles: 'subtitles',
    });

    expect(room.state.video.subtitles).to.be.a('string');
    expect(room.state.video.subtitles).to.be.equal('subtitles');
  });

  it('updates `updateTimestamp` property when command is dispatched', async () => {
    await dispatcher.dispatch(new SetVideoUrlCommand(), {
      url: 'http://example.com/video.mp4',
    });

    await dispatcher.dispatch(new SetVideoSubtitlesCommand(), {
      subtitles: 'subtitles',
    });

    expect(room.state.video.updateTimestamp).to.be.not.equal(0);
  });

  it('not executes command when video url is not set', async () => {
    const execute = sinon.spy(SetVideoSubtitlesCommand.prototype, 'execute');

    await dispatcher.dispatch(new SetVideoSubtitlesCommand(), {
      subtitles: 'subtitles',
    });

    expect(execute.called).to.be.false;
    expect(room.state.video.subtitles).to.be.equal('');
  });
});
