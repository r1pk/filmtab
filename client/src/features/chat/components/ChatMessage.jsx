import PropTypes from 'prop-types';

import { Tooltip, Typography } from '@mui/material';

const ChatMessage = ({ author, content, timestamp }) => {
  const sentAt = new Date(timestamp).toLocaleString();

  return (
    <Tooltip title={`${author.name} - ${sentAt}`} arrow>
      <Typography component="span" gutterBottom sx={{ '&:hover': { background: 'rgba(0, 0, 0, 0.1)' } }}>
        <Typography component="span" variant="subtitle2" sx={{ color: author.color }}>
          {author.name}
        </Typography>
        <Typography component="span" variant="body2" sx={{ wordWrap: 'break-word' }}>
          {': ' + content}
        </Typography>
      </Typography>
    </Tooltip>
  );
};

ChatMessage.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default ChatMessage;
