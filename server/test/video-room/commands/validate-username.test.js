import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { JoinRoomCommand } from '../../../src/commands/video-room/join-room.command.js';
import { ValidateUsernameCommand } from '../../../src/commands/video-room/validate-username.command.js';

import { Client } from '../../mocks/colyseus.js';

chai.use(chaiAsPromised);

describe('[VIDEO-ROOM] Command: "validate-username" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('throws error when username is not provided', async () => {
    const validateUsername = async () => {
      return dispatcher.dispatch(new ValidateUsernameCommand(), {});
    };

    expect(validateUsername()).to.be.rejectedWith(/Username must be provided!/);
  });

  it('throws error when username is too short', async () => {
    const validateUsername = async () => {
      return dispatcher.dispatch(new ValidateUsernameCommand(), {
        username: '',
      });
    };

    expect(validateUsername()).to.be.rejectedWith(/Username must be at least 3 characters long!/);
  });

  it('throws error when username is too short after normalization', async () => {
    const validateUsername = async () => {
      return dispatcher.dispatch(new ValidateUsernameCommand(), {
        username: 'a  ',
      });
    };

    expect(validateUsername()).to.be.rejectedWith(/Username must be at least 3 characters long!/);
  });

  it('throws error when username is already taken', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    const validateUsername = async () => {
      return dispatcher.dispatch(new ValidateUsernameCommand(), {
        username: 'client1',
      });
    };

    expect(validateUsername()).to.be.rejectedWith(/Username is already taken!/);
  });

  it('throws error when username is already taken after normalization', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    const validateUsername = async () => {
      return dispatcher.dispatch(new ValidateUsernameCommand(), {
        username: ' CLIENT1 ',
      });
    };

    expect(validateUsername()).to.be.rejectedWith(/Username is already taken!/);
  });
});
