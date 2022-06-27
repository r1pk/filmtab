import sinon from 'sinon';
import { expect } from 'chai';

import { Room } from '@colyseus/core';
import { Dispatcher } from '@colyseus/command';

import { VideoRoomState } from '../../../src/schemas/video-room.schemas.js';
import { JoinRoomCommand } from '../../../src/commands/video-room/join-room.command.js';
import { PlayVideoCommand } from '../../../src/commands/video-room/play-video.command.js';
import { RequestVideoProgressCommand } from '../../../src/commands/video-room/request-video-progress.command.js';

import { Client } from '../../mocks/colyseus.js';

describe('[VIDEO-ROOM] Command: "request-video-progress" tests', () => {
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

  it('creates `video::request_progress` property in requester `userData.events` object', async () => {
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

    expect(client1.userData.events['video::request_progress']).to.be.a('object');
    expect(client1.userData.events['video::request_progress'].requester).to.be.true;
    expect(client1.userData.events['video::request_progress'].timestamp).to.be.a('number');
    expect(client1.userData.events['video::request_progress'].timestamp).to.be.greaterThan(0);
  });

  it('broadcasts `video::request_progress` event to all users except requester', async () => {
    const broadcast = sinon.spy(room, 'broadcast');

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

    const [type, message, options] = broadcast.getCall(0).args;

    expect(type).to.be.equal('video::request_progress');
    expect(message).to.be.a('object');
    expect(options.except).to.be.equal(client1);
  });

  it('not executes when only one user is in room', async () => {
    const execute = sinon.spy(RequestVideoProgressCommand.prototype, 'execute');

    const client1 = new Client();

    await dispatcher.dispatch(new RequestVideoProgressCommand(), {
      requester: client1,
    });

    expect(execute.called).to.be.false;
  });

  it('not executes when video is not playing', async () => {
    const execute = sinon.spy(RequestVideoProgressCommand.prototype, 'execute');

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

    await dispatcher.dispatch(new RequestVideoProgressCommand(), {
      requester: client1,
    });

    expect(room.state.video.playing).to.be.false;
    expect(execute.called).to.be.false;
  });
});
