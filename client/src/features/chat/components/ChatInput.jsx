import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, IconButton, Tooltip } from '@mui/material';
import { DeleteSweep } from '@mui/icons-material';

import { validateMessageContent } from '../utils/validateMessageContent';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const ChatInput = ({ onSendMessage, onClearChat }) => {
  const [message, setMessage] = useState('');
  const [isValidMessage, setIsValidMessage] = useState(false);
  const showMessageInputError = message !== '' && !isValidMessage;

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
    setIsValidMessage(false);
  };

  const handleClearChat = () => {
    onClearChat();
  };

  const handleMessageContentChange = (e) => {
    setMessage(e.target.value);
    setIsValidMessage(validateMessageContent(e.target.value));
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && isValidMessage) {
      handleSendMessage();
    }
  };

  return (
    <Stack direction="column" spacing={1} py={1} px={2}>
      <TextField
        fullWidth
        label="Message"
        variant="outlined"
        value={message}
        error={showMessageInputError}
        onChange={handleMessageContentChange}
        onKeyDown={handleKeyDown}
      />
      <Stack direction="row">
        <Stack direction="row" mr="auto">
          <Tooltip title="Clear chat">
            <IconButton aria-label="clear chat" size="small" onClick={handleClearChat}>
              <DeleteSweep />
            </IconButton>
          </Tooltip>
        </Stack>
        <Button disabled={!isValidMessage} onClick={handleSendMessage}>
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
};

export default ChatInput;
