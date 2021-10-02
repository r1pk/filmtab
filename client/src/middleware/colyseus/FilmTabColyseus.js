import * as Colyseus from 'colyseus.js';

class FilmTabColyseus {
  constructor(endpoint) {
    this.colyseus = new Colyseus.Client(endpoint);
    this.room = null;
  }
  registerRoomListener(callback) {
    if (this.room !== null) {
      this.room.onStateChange.once(callback);
      this.room.onStateChange(callback);
    }
  }

  async joinRoom(roomId, username, onStateUpdate) {
    this.room = await this.colyseus.joinById(roomId, { username });
    this.registerRoomListener(onStateUpdate);
  }
  async createRoom(isRoomPrivate, username, onStateUpdate) {
    this.room = await this.colyseus.create('video-room', {
      private: isRoomPrivate,
      username,
    });
    this.registerRoomListener(onStateUpdate);
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
}

export default FilmTabColyseus;
