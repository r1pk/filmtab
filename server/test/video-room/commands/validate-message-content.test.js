import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { ValidateMessageContentCommand } from '../../../src/commands/video-room/validate-message-content.command.js';

chai.use(chaiAsPromised);

describe('[VIDEO-ROOM] Command: "validate-message-content" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('throws error when message content is not provided', async () => {
    const validateMessage = async () => {
      return dispatcher.dispatch(new ValidateMessageContentCommand(), {});
    };

    await expect(validateMessage()).to.be.rejectedWith('Message content must be provided!');
  });

  it('throws error when message content is too short', async () => {
    const validateMessage = async () => {
      return dispatcher.dispatch(new ValidateMessageContentCommand(), {
        content: '',
      });
    };

    await expect(validateMessage()).to.be.rejectedWith('Message must have at least one character!');
  });

  it('throws error when message content is too short after normalization', async () => {
    const validateMessage = async () => {
      return dispatcher.dispatch(new ValidateMessageContentCommand(), {
        content: '  ',
      });
    };

    await expect(validateMessage()).to.be.rejectedWith('Message must have at least one character!');
  });

  it('throws error when message content is too long', async () => {
    const validateMessage = async () => {
      return dispatcher.dispatch(new ValidateMessageContentCommand(), {
        content: 'a'.repeat(141),
      });
    };

    await expect(validateMessage()).to.be.rejectedWith('The length of message is too long. The maximum length is 140!');
  });
});
