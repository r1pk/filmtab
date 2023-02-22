import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Stack } from '@mui/material';

import ChatMessage from './ChatMessage';

const ChatMessageList = forwardRef(({ messages, ...rest }, ref) => {
  return (
    <Stack direction="column" spacing={1} ref={ref} {...rest}>
      {messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
    </Stack>
  );
});

ChatMessageList.displayName = 'ChatMessageList';

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatMessageList;