import sinon from 'sinon';
import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { JoinRoomCommand } from '../../../src/commands/video-room/join-room.command.js';
import { PublishChatMessageCommand } from '../../../src/commands/video-room/publish-chat-message.command.js';

import { Client } from '../../mocks/colyseus.js';

describe('[VIDEO-ROOM] Command: "publish-chat-message" tests', () => {
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

  it('creates chat message object and broadcasts it', async () => {
    const broadcast = sinon.spy(room, 'broadcast');

    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    await dispatcher.dispatch(new PublishChatMessageCommand(), {
      sessionId: client1.sessionId,
      content: 'Hello world!',
    });

    const [type, message] = broadcast.getCall(0).args;

    expect(broadcast.called).to.be.true;
    expect(type).to.be.equal('chat::message');
    expect(message).to.be.an('object');
    expect(message.id).to.be.a('string');
    expect(message.timestamp).to.be.a('number');
    expect(message.timestamp).to.be.greaterThan(0);
    expect(message.author).to.be.a('object');
    expect(message.author).to.be.equal(room.state.users.get(client1.sessionId));
    expect(message.content).to.be.a('string');
    expect(message.content).to.be.equal('Hello world!');
  });

  it('normalizes message content before broadcasting', async () => {
    const broadcast = sinon.spy(room, 'broadcast');

    const client1 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    await dispatcher.dispatch(new PublishChatMessageCommand(), {
      sessionId: client1.sessionId,
      content: '   Hello world!    ',
    });

    const message = broadcast.getCall(0).args[1];

    expect(message.content).to.be.equal('Hello world!');
  });

  it('not executes when user is not in room', async () => {
    const execute = sinon.spy(PublishChatMessageCommand.prototype, 'execute');

    await dispatcher.dispatch(new PublishChatMessageCommand(), {
      sessionId: '12345678',
      content: 'Hello world!',
    });

    expect(execute.called).to.be.false;
  });
});
