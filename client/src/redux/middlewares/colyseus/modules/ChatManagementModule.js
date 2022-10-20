import ManagementModule from '../lib/ManagementModule';

import * as actions from '../actions';

class ChatManagementModule extends ManagementModule {
  getModuleActions = () => {
    return {
      [actions.sendChatMessage.type]: this.handleSendChatMessageAction,
    };
  };

  handleSendChatMessageAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('chat::message', { content: action.payload.content });
      }

      return actions.sendChatMessage(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleChatMessageEvent = (message) => {
    this.store.dispatch(actions.chatMessageReceived({ message: message }));
  };

  handleRoomChange = (room) => {
    if (room) {
      room.onMessage('chat::message', this.handleChatMessageEvent);
    }
  };
}

export default ChatManagementModule;
