import PropTypes from 'prop-types';
import { useEffect, useRef, forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider } from '@mui/material';

import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';

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
        <ChatMessageList messages={messages} />
      </CardContent>
      <Divider />
      <CardActions>
        <ChatMessageForm onSendMessage={onSendMessage} onClearChat={onClearChat} />
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
