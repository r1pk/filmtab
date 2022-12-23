import { Client } from 'colyseus.js';

class ColyseusClient extends Client {
  #room = null;
  #onRoomChange = () => null;

  set room(room) {
    this.#room = room;
    this.#onRoomChange(this.#room);
  }

  set onRoomChange(callback) {
    this.#onRoomChange = callback;
  }

  get room() {
    return this.#room;
  }

  get isRoomMember() {
    return Boolean(this.room);
  }

  async create(roomName, options, rootSchema) {
    this.room = await super.create(roomName, options, rootSchema);

    return this.room;
  }

  async joinById(roomId, options, rootSchema) {
    this.room = await super.joinById(roomId, options, rootSchema);

    return this.room;
  }
}

export default ColyseusClient;
