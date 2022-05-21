import * as actions from '../redux/actions';

class ColyseusRoomModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.colyseus.roomInstanceSubscribers.push(this.roomInstanceListener);
  }

  handleCreateRoom = async (payload) => {
    this.colyseus.roomInstance = await this.colyseus.client.create('video-room', { username: payload.username });
  };

  handleJoinRoom = async (payload) => {
    this.colyseus.roomInstance = await this.colyseus.client.joinById(payload.roomId, { username: payload.username });
  };

  handleLeaveRoom = async () => {
    this.colyseus.roomInstance.leave();
  };

  handleLeaveRoomEvent = () => {
    if (this.colyseus.roomInstance) {
      this.colyseus.roomInstance.removeAllListeners();
    }
  };

  getModuleActions = () => {
    return {
      [actions.CREATE_ROOM]: this.handleCreateRoom,
      [actions.JOIN_ROOM]: this.handleJoinRoom,
      [actions.LEAVE_ROOM]: this.handleLeaveRoom,
    };
  };

  roomInstanceListener = (room) => {
    if (room !== null) {
      this.store.dispatch(actions.setRoomDetails(room.id, room.sessionId));

      room.onLeave(this.handleLeaveRoomEvent);
    }
  };
}

export default ColyseusRoomModule;
