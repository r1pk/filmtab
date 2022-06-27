import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { JoinRoomCommand } from '../../../src/commands/video-room/join-room.command.js';

import { Client } from '../../mocks/colyseus.js';

describe('[VIDEO-ROOM] Command: "join-room" tests', () => {
  let room;
  let dispatcher;

  beforeEach(() => {
    room = new Room();
    room.setState(new VideoRoomState());

    dispatcher = new Dispatcher(room);
  });

  it('adds user to users list in room state', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    expect(room.state.users.size).to.be.equal(1);
    expect(room.state.users.has(client1.sessionId)).to.be.true;
  });

  it('user object in users list has username and color', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    expect(room.state.users.get(client1.sessionId).name).to.exist;
    expect(room.state.users.get(client1.sessionId).name).to.be.equal('client1');
    expect(room.state.users.get(client1.sessionId).color).to.exist;
  });

  it('normalizes client username', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: '__!@#cLieNt1!@#__',
    });

    expect(room.state.users.get(client1.sessionId).name).to.be.equal('client1');
  });

  it('creates `userData` property in client object', async () => {
    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    expect(client1.userData).to.exist;
    expect(client1.userData).to.be.a('object');
  });
});
