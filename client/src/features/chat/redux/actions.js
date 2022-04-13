export const RECEIVE_MESSAGE = 'chat/receive';
export const SEND_MESSAGE = 'chat/send';
export const CLEAR_CHAT = 'chat/clear';
export const NOTIFICATION_MESSAGE = 'chat/room_message';

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

export const sendNotificationMessage = (messageContent) => ({
  type: NOTIFICATION_MESSAGE,
  payload: {
    author: {
      name: 'FilmTab Bot',
      color: 'rgb(255,215,0)',
    },
    content: messageContent,
  },
});

export const clearChat = () => ({
  type: CLEAR_CHAT,
});
