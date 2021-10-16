import * as Colyseus from 'colyseus.js';

class FilmTabColyseus {
  constructor(endpoint) {
    this.colyseus = new Colyseus.Client(endpoint);
    this.room = null;
  }

  get sessionId() {
    if (this.room) {
      return this.room.sessionId;
    }
    return null;
  }

  get roomId() {
    if (this.room) {
      return this.room.id;
    }
    return null;
  }

  addStateChangeListener(callback) {
    this.room.onStateChange.once(callback);
    this.room.onStateChange(callback);
  }

  addPlayedSecondsChangeListener(callback) {
    this.room.onMessage('video::playedSeconds', callback);
  }

  async joinRoom(roomId, username) {
    this.room = await this.colyseus.joinById(roomId, { username });
  }
  async createRoom(isRoomPrivate, username) {
    this.room = await this.colyseus.create('video-room', {
      private: isRoomPrivate,
      username,
    });
  }

  async setVideo(url) {
    await this.room.send('video::set', { url });
  }
  async playVideo(playedSeconds) {
    await this.room.send('video::play', { playedSeconds });
  }
  async pauseVideo(playedSeconds) {
    await this.room.send('video::pause', { playedSeconds });
  }
  async seekVideo(playedSeconds) {
    await this.room.send('video::seek', { playedSeconds });
  }
  async sendUserStatus(status = true) {
    await this.room.send('user::status', { status });
  }
}

export default FilmTabColyseus;
