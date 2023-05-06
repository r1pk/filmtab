import { Client } from 'colyseus.js';

class ColyseusClient extends Client {
  room = null;

  async create(roomName, options, rootSchema) {
    if (this.room?.connection.isOpen) {
      throw new Error('You need to leave the current room before creating a new one.');
    }

    this.room = await super.create(roomName, options, rootSchema);

    return this.room;
  }

  async joinById(roomId, options, rootSchema) {
    if (this.room?.connection.isOpen) {
      throw new Error('You need to leave the current room before joining a new one.');
    }

    this.room = await super.joinById(roomId, options, rootSchema);

    return this.room;
  }
}

export const colyseus = new ColyseusClient(import.meta.env.VITE_COLYSEUS_URL);
