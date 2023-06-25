import { forwardRef, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { Card, CardActions, CardContent, CardHeader, Divider, Stack } from '@mui/material';

import Controls from './Controls';
import Message from './Message';

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
          variant: 'overline',
        }}
        sx={{ textAlign: 'center', p: 1 }}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, overflowY: 'scroll', scrollBehavior: 'smooth' }} ref={content}>
        <Stack spacing={1}>
          {messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Controls onSendMessage={onSendMessage} onClearChat={onClearChat} />
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
