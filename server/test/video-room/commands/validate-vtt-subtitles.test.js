import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { ValidateVTTSubtitlesCommand } from '../../../src/commands/video-room/validate-vtt-subtitles.command.js';

chai.use(chaiAsPromised);

describe('[VIDEO-ROOM] Command: "validate-vtt-subtitles" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('throws error when subtitles are not provided', async () => {
    const validateVTTSubtitles = async () => {
      return dispatcher.dispatch(new ValidateVTTSubtitlesCommand(), {});
    };

    await expect(validateVTTSubtitles()).to.be.rejectedWith('Subtitles must be provided!');
  });

  it('throws error when subtitles are invalid', async () => {
    const validateVTTSubtitles = async () => {
      return dispatcher.dispatch(new ValidateVTTSubtitlesCommand(), {
        subtitles: '',
      });
    };

    await expect(validateVTTSubtitles()).to.be.rejectedWith('Must start with "WEBVTT"');
  });

  it('does not throw error when subtitles are valid', async () => {
    const validateVTTSubtitles = async () => {
      return dispatcher.dispatch(new ValidateVTTSubtitlesCommand(), {
        subtitles: 'WEBVTT\n\n',
      });
    };

    await expect(validateVTTSubtitles()).to.be.fulfilled;
  });
});
