import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Divider } from '@mui/material';

import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const Chat = ({ messages, onSendMessage, onClearChat }) => {
  const messageList = useRef(null);

  useEffect(() => {
    if (messageList.current) {
      messageList.current.scrollTo(0, messageList.current.scrollHeight);
    }
  }, [messages]);

  return (
    <Card sx={{ width: { xs: '100%', lg: 360 } }}>
      <CardContent ref={messageList} sx={{ height: { xs: 360, lg: 500 }, overflow: 'auto' }}>
        <Stack>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              author={message.author}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <ChatInput onSendMessage={onSendMessage} onClearChat={onClearChat} />
      </CardActions>
    </Card>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string,
      }),
      content: PropTypes.string,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  onSendMessage: PropTypes.func,
  onClearChat: PropTypes.func,
};

export default Chat;
