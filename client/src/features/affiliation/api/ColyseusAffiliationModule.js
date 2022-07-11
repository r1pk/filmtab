import * as actions from '../redux/actions';

class ColyseusAffiliationModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.colyseus.roomInstanceSubscribers.push(this.roomInstanceListener);
  }

  handleCreateRoom = async (payload) => {
    if (!this.store.getState().affiliation.isConnecting) {
      try {
        this.store.dispatch(actions.setConnectingFlag(true));
        this.colyseus.roomInstance = await this.colyseus.client.create('video-room', { username: payload.username });
      } finally {
        this.store.dispatch(actions.setConnectingFlag(false));
      }
    }
  };

  handleJoinRoom = async (payload) => {
    if (!this.store.getState().affiliation.isConnecting) {
      try {
        this.store.dispatch(actions.setConnectingFlag(true));
        this.colyseus.roomInstance = await this.colyseus.client.joinById(payload.roomId, {
          username: payload.username,
        });
      } finally {
        this.store.dispatch(actions.setConnectingFlag(false));
      }
    }
  };

  handleLeaveRoom = async () => {
    this.colyseus.roomInstance.leave();
  };

  handleLeaveRoomEvent = () => {
    if (this.colyseus.roomInstance) {
      this.colyseus.roomInstance.removeAllListeners();
      this.store.dispatch(actions.leaveRoom());
    }
  };

  handleAddUser = (user, sessionId) => {
    this.store.dispatch(actions.addUser(user, sessionId));
  };

  handleRemoveUser = (user, sessionId) => {
    this.store.dispatch(actions.removeUser(sessionId));
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
      const previousOnAddCallback = room.state.users.onAdd;
      const previousOnRemoveCallback = room.state.users.onRemove;

      room.state.users.onAdd = (...args) => {
        if (previousOnAddCallback) {
          previousOnAddCallback(...args);
        }
        this.handleAddUser(...args);
      };

      room.state.users.onRemove = (...args) => {
        if (previousOnRemoveCallback) {
          previousOnRemoveCallback(...args);
        }
        this.handleRemoveUser(...args);
      };

      room.onLeave(this.handleLeaveRoomEvent);

      this.store.dispatch(actions.setRoomDetails(room.id, room.sessionId));
    }
  };
}

export default ColyseusAffiliationModule;
