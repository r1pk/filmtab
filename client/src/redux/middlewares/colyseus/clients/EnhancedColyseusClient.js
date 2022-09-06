import { Client } from 'colyseus.js';

class EnhancedColyseusClient extends Client {
  constructor(endpoint) {
    super(endpoint);

    this.__listeners__ = [];
    this.__room__ = null;
  }

  get room() {
    return this.__room__;
  }

  set room(room) {
    this.__room__ = room;
    this.__listeners__.forEach((listener) => {
      listener(room);
    });
  }

  set onRoomChange(listener) {
    this.__listeners__.push(listener);
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

export default EnhancedColyseusClient;
