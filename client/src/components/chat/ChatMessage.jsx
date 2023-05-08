import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

const ChatMessage = forwardRef(({ message, ...rest }, ref) => {
  return (
    <Box sx={{ '&:hover': { background: 'rgba(0, 0, 0, 0.1)' } }} ref={ref} {...rest}>
      <Typography component="span" variant="subtitle2" sx={{ color: message.author.color }}>
        {message.author.username}
      </Typography>
      <Typography component="span" variant="body2" sx={{ wordWrap: 'break-word' }}>
        {': ' + message.content}
      </Typography>
    </Box>
  );
});

ChatMessage.displayName = 'ChatMessage';

ChatMessage.propTypes = {
  message: PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessage;
