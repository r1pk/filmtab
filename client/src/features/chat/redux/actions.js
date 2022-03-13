export const RECEIVE_MESSAGE = 'chat/receive';
export const SEND_MESSAGE = 'chat/send';
export const CLEAR_CHAT = 'chat/clear';

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: {
    message,
  },
});

export const sendMessage = (content) => ({
  type: SEND_MESSAGE,
  payload: {
    content,
  },
});

export const clearChat = () => ({
  type: CLEAR_CHAT,
});
