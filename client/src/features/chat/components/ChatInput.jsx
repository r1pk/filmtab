import PropTypes from 'prop-types';

import { Stack, IconButton, Tooltip } from '@mui/material';
import { DeleteSweep } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

import { validateMessageContent } from '../utils/validateMessageContent';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const ChatInput = ({ onSendMessage, onClearChat }) => {
  const { control, reset, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      messageContent: '',
    },
  });

  const onSubmit = (data) => {
    onSendMessage(data.messageContent);
    reset();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && formState.isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleClearChat = () => {
    onClearChat();
  };

  return (
    <Stack direction="column" spacing={1} py={1} px={2}>
      <Controller
        name="messageContent"
        control={control}
        rules={{ required: true, validate: validateMessageContent }}
        render={({ field }) => (
          <TextField {...field} error={!!formState.errors.messageContent} onKeyDown={handleKeyDown} label="Message" />
        )}
      />
      <Stack direction="row">
        <Stack direction="row" mr="auto">
          <Tooltip title="Clear chat">
            <IconButton aria-label="clear chat" size="small" onClick={handleClearChat}>
              <DeleteSweep />
            </IconButton>
          </Tooltip>
        </Stack>
        <Button disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>
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
