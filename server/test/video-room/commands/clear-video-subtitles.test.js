import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { ClearVideoSubtitlesCommand } from '../../../src/commands/video-room/clear-video-subtitles.command.js';

describe('[VIDEO-ROOM] Command: "clear-video-subtitles" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('resets video subtitles to empty string', async () => {
    await dispatcher.dispatch(new ClearVideoSubtitlesCommand(), {});

    expect(room.state.video.subtitles).to.be.equal('');
  });

  it('updates `updateTimestamp` property when command is dispatched', async () => {
    await dispatcher.dispatch(new ClearVideoSubtitlesCommand(), {});

    expect(room.state.video.updateTimestamp).to.be.not.equal(0);
  });
});
