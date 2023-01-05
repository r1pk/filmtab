import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box, Stack, Tooltip } from '@mui/material';
import { DeleteSweepOutlined } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import Button from '@/components/form/Button';
import IconButton from '@/components/form/IconButton';

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
      onSendMessage(data);
      reset();
    }
  };

  const handleClearChat = () => {
    onClearChat();
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
      <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'flex-end' }}>
        <Tooltip title="Clear chat messages" placement="left">
          <IconButton onClick={handleClearChat}>
            <DeleteSweepOutlined />
          </IconButton>
        </Tooltip>
        <Button type="submit" disabled={!formState.isValid}>
          Send
        </Button>
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
