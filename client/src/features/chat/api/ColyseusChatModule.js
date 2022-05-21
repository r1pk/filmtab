import * as actions from '../redux/actions';

class ColyseusChatModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.colyseus.roomInstanceSubscribers.push(this.roomInstanceListener);
  }

  handleSendChatMessage = async (payload) => {
    await this.colyseus.roomInstance.send('chat::message', { content: payload.content });
  };

  handleChatMessage = (message) => {
    this.store.dispatch(actions.receiveMessage(message));
  };

  handleAddUser = (user) => {
    this.store.dispatch(actions.sendNotificationMessage(`${user.name} joined the room.`));
  };

  handleRemoveUser = (user) => {
    this.store.dispatch(actions.sendNotificationMessage(`${user.name} left the room.`));
  };

  handleLeaveRoomEvent = () => {
    this.store.dispatch(actions.clearChat());
  };

  getModuleActions = () => {
    return {
      [actions.SEND_MESSAGE]: this.handleSendChatMessage,
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

      room.onMessage('chat::message', this.handleChatMessage);
      room.onLeave(this.handleLeaveRoomEvent);
    }
  };
}

export default ColyseusChatModule;
