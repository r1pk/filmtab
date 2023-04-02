import PropTypes from 'prop-types';
import { useEffect, useRef, forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Stack, Divider } from '@mui/material';

import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';

const Chat = forwardRef(({ messages, onSendMessage, onClearChat, ...rest }, ref) => {
  const content = useRef(null);

  useEffect(
    function scrollToBottom() {
      if (content.current) {
        content.current.scrollTop = content.current.scrollHeight;
      }
    },
    [messages]
  );

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: 1 }} ref={ref} {...rest}>
      <CardHeader
        title="Chat"
        titleTypographyProps={{
          variant: 'h6',
        }}
        sx={{ textAlign: 'center', textTransform: 'uppercase', p: 1 }}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, overflowY: 'scroll', scrollBehavior: 'smooth' }} ref={content}>
        <Stack direction="column" spacing={1}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <ChatForm onSendMessage={onSendMessage} onClearChat={onClearChat} />
      </CardActions>
    </Card>
  );
});

Chat.displayName = 'Chat';

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
};

export default Chat;
