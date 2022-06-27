import sinon from 'sinon';
import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { JoinRoomCommand } from '../../../src/commands/video-room/join-room.command.js';
import { PlayVideoCommand } from '../../../src/commands/video-room/play-video.command.js';
import { RequestVideoProgressCommand } from '../../../src/commands/video-room/request-video-progress.command.js';
import { SendVideoProgressCommand } from '../../../src/commands/video-room/send-video-progress.command.js';

import { Client } from '../../mocks/colyseus.js';

describe('[VIDEO-ROOM] Command: "send-video-progress" tests', () => {
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

  it('sends video progress only to requester', async () => {
    const client1 = new Client();
    const client2 = new Client();

    const client1Send = sinon.spy(client1, 'send');
    const client2Send = sinon.spy(client2, 'send');

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client2,
      username: 'client2',
    });

    await dispatcher.dispatch(new PlayVideoCommand(), {
      progress: 0,
    });

    await dispatcher.dispatch(new RequestVideoProgressCommand(), {
      requester: client1,
    });

    await dispatcher.dispatch(new SendVideoProgressCommand(), {
      progress: 10,
      clients: [client1, client2],
    });

    const [type, message] = client1Send.getCall(0).args;

    expect(client1Send.called).to.be.true;
    expect(client2Send.called).to.be.false;
    expect(type).to.equal('video::current_progress');
    expect(message.progress).to.be.a('number');
    expect(message.progress).to.be.greaterThanOrEqual(10);
    expect(message.updateTimestamp).to.be.a('number');
    expect(message.updateTimestamp).to.be.greaterThan(0);
  });

  it('sets `requester` property to false after sending video progress', async () => {
    const client1 = new Client();
    const client2 = new Client();

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client1,
      username: 'client1',
    });

    await dispatcher.dispatch(new JoinRoomCommand(), {
      client: client2,
      username: 'client2',
    });

    await dispatcher.dispatch(new PlayVideoCommand(), {
      progress: 0,
    });

    await dispatcher.dispatch(new RequestVideoProgressCommand(), {
      requester: client1,
    });

    await dispatcher.dispatch(new SendVideoProgressCommand(), {
      progress: 10,
      clients: [client1, client2],
    });

    expect(client1.userData.events['video::request_progress'].requester).to.be.false;
  });
});
