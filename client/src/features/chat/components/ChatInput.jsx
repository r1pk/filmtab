import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, IconButton, Tooltip } from '@mui/material';
import { DeleteSweep } from '@mui/icons-material';

import { isValidMessageContent } from '../utils/isValidMessageContent';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const ChatInput = ({ onSendMessage, onClearChat }) => {
  const [message, setMessage] = useState('');
  const [isMessageValid, setIsMessageValid] = useState(false);
  const showInputError = message.length > 0 && !isMessageValid;

  const handleSendMessage = () => {
    if (isMessageValid) {
      onSendMessage(message);
      setMessage('');
      setIsMessageValid(false);
    }
  };

  const handleClearChat = () => {
    onClearChat();
  };

  const handleMessageContentChange = (e, validatorResult) => {
    setMessage(e.target.value);
    setIsMessageValid(validatorResult);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  return (
    <Stack direction="column" spacing={1} py={1} px={2}>
      <ValidationTextField
        fullWidth
        label="Message"
        variant="outlined"
        value={message}
        error={showInputError}
        validator={isValidMessageContent}
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
        <Button disabled={!isMessageValid} onClick={handleSendMessage}>
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
