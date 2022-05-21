import * as actions from '../redux/actions';

class ColyseusNotificationModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.colyseus.roomInstanceSubscribers.push(this.roomInstanceListener);
  }

  handleRoomError = (code, message) => {
    this.store.dispatch(actions.addNotification('error', message));
  };

  getModuleActions = () => {
    return {};
  };

  roomInstanceListener = (room) => {
    if (room !== null) {
      room.onError(this.handleRoomError);
    }
  };
}

export default ColyseusNotificationModule;
