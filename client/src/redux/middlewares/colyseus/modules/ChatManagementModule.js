import * as actions from '../actions';

export default class ChatManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;

    this.client.onRoomChange = this.handleRoomChangeEvent;
  }

  getModuleActions = () => {
    return {
      [actions.sendChatMessage.type]: this.handleSendChatMessageAction,
    };
  };

  handleSendChatMessageAction = async (action) => {
    await this.client.room.send('chat::message', { content: action.payload.content });

    return actions.sendChatMessage(action.payload);
  };

  handleChatMessageEvent = (message) => {
    this.store.dispatch(actions.chatMessageReceived({ message: message }));
  };

  handleRoomChangeEvent = (room) => {
    room.onMessage('chat::message', this.handleChatMessageEvent);
  };
}
