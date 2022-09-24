import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box, Stack, Tooltip } from '@mui/material';
import { DeleteSweepOutlined } from '@mui/icons-material';

import { TextField, Button, IconButton } from '@/components/form';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { ChatMessageFormSchema } from '../schemas/ChatMessageFormSchema';

const ChatMessageForm = forwardRef(({ onSendMessage, onClearChat, ...rest }, ref) => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      content: '',
    },
    resolver: joiResolver(ChatMessageFormSchema),
  });

  const onSubmit = (data) => {
    if (formState.isValid) {
      if (onSendMessage) {
        onSendMessage(data);
      }
      reset();
    }
  };

  const handleClearChat = () => {
    if (onClearChat) {
      onClearChat();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: 1 }} ref={ref} {...rest}>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <TextField label="Message" variant="outlined" error={Boolean(fieldState.error)} fullWidth {...field} />
        )}
      />
      <Stack direction="row-reverse" spacing={1} sx={{ mt: 1 }}>
        <Button type="submit" disabled={!formState.isValid}>
          Send
        </Button>
        <Tooltip title="Clear chat messages" placement="left">
          <IconButton onClick={handleClearChat}>
            <DeleteSweepOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
});

ChatMessageForm.displayName = 'ChatMessageForm';

ChatMessageForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
};

export default ChatMessageForm;
