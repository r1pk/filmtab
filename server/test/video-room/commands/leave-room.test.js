import sinon from 'sinon';
import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { JoinRoomCommand } from '../../../src/commands/video-room/join-room.command.js';
import { LeaveRoomCommand } from '../../../src/commands/video-room/leave-room.command.js';

import { Client } from '../../mocks/colyseus.js';

describe('[VIDEO-ROOM] Command: "leave-room" tests', () => {
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

  it('removes user from users list in room state', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    await dispatcher.dispatch(new LeaveRoomCommand(), {
      sessionId: client1.sessionId,
    });

    expect(room.state.users.size).to.be.equal(0);
    expect(room.state.users.has(client1.sessionId)).to.be.false;
  });

  it('not executes if user is not in room', async () => {
    const execute = sinon.spy(LeaveRoomCommand.prototype, 'execute');

    await dispatcher.dispatch(new LeaveRoomCommand(), {
      sessionId: '12345678',
    });

    expect(execute.called).to.be.false;
  });
});
