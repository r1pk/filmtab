import { chat } from '../actions';

export default class ChatManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;

    this.client.onRoomChange = this.handleRoomChangeEvent;
  }

  getModuleActions = () => {
    return {
      [chat.message.send.type]: this.handleSendChatMessageAction,
    };
  };

  handleSendChatMessageAction = async (action) => {
    await this.client.room.send('chat::message', { content: action.payload.content });

    return chat.message.send(action.payload);
  };

  handleOnChatMessageEvent = (message) => {
    this.store.dispatch(chat.onMessage({ message: message }));
  };

  handleRoomChangeEvent = (room) => {
    room.onMessage('chat::message', this.handleOnChatMessageEvent);
  };
}
