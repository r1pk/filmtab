import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, List, Divider } from '@mui/material';

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
    <Paper sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 360, height: '100%' }}>
        <List ref={messageList} sx={{ flex: '1 0 300px', overflow: 'auto' }} dense>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              author={message.author}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </List>
        <Divider />
        <ChatInput onSendMessage={onSendMessage} onClearChat={onClearChat} />
      </Box>
    </Paper>
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
  onSendMessage: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
};

export default Chat;
