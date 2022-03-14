import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, IconButton, Tooltip } from '@mui/material';
import { DeleteSweep } from '@mui/icons-material';

import { isValidMessageContent } from '../utils/isValidMessageContent';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const ChatInput = ({ onSendMessage, onClearChat }) => {
  const [message, setMessage] = useState({ value: '', valid: false });
  const isSubmitButtonDisabled = !message.valid;
  const showInputError = message.value.length > 0 && isSubmitButtonDisabled;

  const handleSendMessage = () => {
    if (message.valid) {
      onSendMessage(message.value);
      setMessage({ value: '', valid: false });
    }
  };

  const handleClearChat = () => {
    onClearChat();
  };

  const handleMessageContentChange = (e, validatorResult) => {
    setMessage({ value: e.target.value, valid: validatorResult });
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
        value={message.value}
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
        <Button disabled={isSubmitButtonDisabled} onClick={handleSendMessage}>
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
