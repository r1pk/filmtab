import * as actions from '../redux/actions';

class ColyseusUsersModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.colyseus.roomInstanceSubscribers.push(this.roomInstanceListener);
  }

  handleAddUser = (user, sessionId) => {
    this.store.dispatch(actions.addUser(user, sessionId));
  };

  handleRemoveUser = (user, sessionId) => {
    this.store.dispatch(actions.removeUser(sessionId));
  };

  handleLeaveRoomEvent = () => {
    this.store.dispatch(actions.resetUsers());
  };

  getModuleActions = () => {
    return {};
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
    }
  };
}

export default ColyseusUsersModule;
