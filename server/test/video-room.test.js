import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { boot } from '@colyseus/testing';

import appConfig from '../src/arena.config.js';

chai.use(chaiAsPromised);

describe('"video-room" tests', () => {
  let colyseus;
  let room;

  before(async () => (colyseus = await boot(appConfig)));
  after(async () => colyseus.shutdown());

  beforeEach(async () => await colyseus.cleanup());
  beforeEach(async () => (room = await colyseus.createRoom('video-room')));

  it('creates a room', async () => {
    expect(room).to.be.an('object');
    expect(room.roomId).to.be.a('string');
    expect(room.roomId).to.have.lengthOf(9);
    expect(room.state).to.be.an('object');
    expect(room.state.video).to.be.an('object');
    expect(room.state.video.url).to.be.a('string');
    expect(room.state.video.url).to.have.lengthOf(0);
    expect(room.state.video.progress).to.be.a('number');
    expect(room.state.video.progress).to.equal(0);
    expect(room.state.video.updateTimestamp).to.be.a('number');
    expect(room.state.video.updateTimestamp).to.equal(0);
  });

  it('joins a room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });

    expect(client1).to.be.an('object');
    expect(client1.hasJoined).to.be.true;
    expect(client1.state).to.be.an('object');
    expect(room.state.users.size).to.equal(1);
    expect(room.state.users.has(client1.sessionId)).to.be.true;
    expect(room.state.users.get(client1.sessionId).name).to.be.a('string');
    expect(room.state.users.get(client1.sessionId).name).to.equal('client1');
    expect(room.state.users.get(client1.sessionId).color).to.be.a('string');
  });

  it('normalizes username', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: '__ClienT1#__' });

    expect(room.state.users.size).to.equal(1);
    expect(room.state.users.get(client1.sessionId).name).to.equal('client1');
  });

  it('throw error when username is not provided', async () => {
    const connectClient = async () => await colyseus.sdk.joinById(room.roomId, {});

    expect(connectClient()).to.be.rejectedWith(/Username must be provided!/);
  });

  it('throw error when username is too short', async () => {
    const connectClient = async () => await colyseus.sdk.joinById(room.roomId, { username: '1' });

    expect(connectClient()).to.be.rejectedWith(/Username must be at least 3 characters long!/);
  });

  it('throw error when username is already taken', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });

    const connectClient = async () => await colyseus.sdk.joinById(room.roomId, { username: 'client1' });

    expect(room.state.users.size).to.equal(1);
    expect(room.state.users.has(client1.sessionId)).to.be.true;
    expect(connectClient()).to.be.rejectedWith(/Username must be at least 3 characters long!/);
  });

  it('sets a video in the room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    client1.send('video::set', { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

    const [author, message] = await room.waitForMessage('video::set');

    expect(author.sessionId).to.equal(client1.sessionId);
    expect(room.state.video.url).to.equal(message.url);
    expect(room.state.video.progress).to.equal(0);
    expect(room.state.video.playing).to.be.false;
  });

  it('plays a video in the room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    client1.send('video::play', { progress: 0 });

    const [author, message] = await room.waitForMessage('video::play');

    expect(author.sessionId).to.equal(client1.sessionId);
    expect(room.state.video.progress).to.equal(message.progress);
    expect(room.state.video.playing).to.be.true;
  });

  it('pauses a video in the room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    client1.send('video::pause', { progress: 10 });

    const [author, message] = await room.waitForMessage('video::pause');

    expect(author.sessionId).to.equal(client1.sessionId);
    expect(room.state.video.progress).to.equal(message.progress);
    expect(room.state.video.playing).to.be.false;
  });

  it('seeks a video in the room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    client1.send('video::seek', { progress: 15 });

    const [author, message] = await room.waitForMessage('video::seek');

    expect(author.sessionId).to.equal(client1.sessionId);
    expect(room.state.video.progress).to.equal(message.progress);
  });

  it('receives current video progress after joining the room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    client1.send('video::play', { progress: 0 });

    client1.waitForMessage('video::request_progress').then(() => {
      client1.send('video::current_progress', { progress: 10 });
    });

    const client2 = await colyseus.sdk.joinById(room.roomId, { username: 'client2' });
    const message = await client2.waitForMessage('video::current_progress');

    expect(message.progress).to.be.a('number');
    expect(message.progress).to.be.greaterThanOrEqual(10);
    expect(message.updateTimestamp).to.be.a('number');
  });

  it('sends chat message', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    client1.send('chat::message', { content: 'Hello' });

    const [author, message] = await room.waitForMessage('chat::message');

    expect(author.sessionId).to.equal(client1.sessionId);
    expect(message.content).to.equal('Hello');
  });

  it('receives chat message', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    const client2 = await colyseus.sdk.joinById(room.roomId, { username: 'client2' });

    client1.send('chat::message', { content: 'Hello' });

    const message = await client2.waitForMessage('chat::message');

    expect(message.id).to.be.a('string');
    expect(message.content).to.equal('Hello');
    expect(message.timestamp).to.be.a('number');
    expect(message.author.name).to.equal('client1');
  });

  it('recives normalized chat message', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    const client2 = await colyseus.sdk.joinById(room.roomId, { username: 'client2' });

    client1.send('chat::message', { content: '  Hello  ' });

    const message = await client2.waitForMessage('chat::message');

    expect(message.content).to.equal('Hello');
  });

  it('throws error when chat message is not provided', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    const sendMessage = async () => client1.send('chat::message', {});

    expect(sendMessage()).to.be.rejectedWith(/Message content must be provided!/);
  });

  it('throws error when chat message is too short', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    const sendMessage = async () => client1.send('chat::message', { content: '' });

    expect(sendMessage()).to.be.rejectedWith(/Message must have at least one character!/);
  });

  it('throws error when chat message is too long', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });
    const sendMessage = async () => client1.send('chat::message', { content: 'a'.repeat(200) });

    expect(sendMessage()).to.be.rejectedWith(/The length of message is too long. The maximum length is 140!/);
  });

  it('leaves the room', async () => {
    const client1 = await colyseus.sdk.joinById(room.roomId, { username: 'client1' });

    await client1.leave();

    expect(room.clients.length).to.equal(0);
    expect(room.state.users.has(client1.sessionId)).to.be.false;
  });
});
