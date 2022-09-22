import { Client } from 'colyseus.js';

class ColyseusClient extends Client {
  constructor(endpoint) {
    super(endpoint);

    this.__room__ = null;
    this.__roomChangeListeners__ = [];
  }

  get room() {
    return this.__room__;
  }

  set room(room) {
    this.__room__ = room;
    this.__roomChangeListeners__.forEach((listener) => {
      listener(room);
    });
  }

  addRoomChangeListener(listener) {
    this.__roomChangeListeners__.push(listener);
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
