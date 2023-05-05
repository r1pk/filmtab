import { Client } from 'colyseus.js';

import { store } from '@/redux/store';
import { actions } from '@/redux/actions';

import { toast } from 'react-toastify';

class ColyseusClient extends Client {
  room = null;

  #handleRoomStateChange = (state) => {
    const { users, video } = JSON.parse(JSON.stringify(state));

    store.dispatch(actions.room.setRoomUsers(Object.values(users)));
    store.dispatch(actions.video.setVideoState(video));
  };

  #handleRoomLeave = () => {
    store.dispatch(actions.chat.resetChatState());
    store.dispatch(actions.room.resetRoomState());
    store.dispatch(actions.session.resetSessionState());
    store.dispatch(actions.video.resetVideoState());

    this.room = null;
  };

  #handleRoomError = (code, message) => {
    console.error(code, message);
    toast.error(message);
  };

  async create(roomName, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before creating a new one.');
    }

    this.room = await super.create(roomName, options, rootSchema);

    this.room.onStateChange(this.#handleRoomStateChange);
    this.room.onLeave(this.#handleRoomLeave);
    this.room.onError(this.#handleRoomError);

    return this.room;
  }

  async joinById(roomId, options, rootSchema) {
    if (this.room) {
      throw new Error('You need to leave the current room before joining a new one.');
    }

    this.room = await super.joinById(roomId, options, rootSchema);

    this.room.onStateChange(this.#handleRoomStateChange);
    this.room.onLeave(this.#handleRoomLeave);
    this.room.onError(this.#handleRoomError);

    return this.room;
  }
}

export const colyseus = new ColyseusClient(import.meta.env.VITE_COLYSEUS_URL);
