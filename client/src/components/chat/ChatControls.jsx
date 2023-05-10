import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';

import { DeleteSweepOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField, Tooltip } from '@mui/material';

const schema = Joi.object({
  content: Joi.string().trim().min(1).max(140).required().label('content'),
});

const ChatControls = forwardRef(({ onSendMessage, onClearChat, ...rest }, ref) => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      content: '',
    },
    resolver: joiResolver(schema),
  });
  const { isValid, isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid || !isDirty) {
      return;
    }

    onSendMessage(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ width: 1 }} ref={ref} {...rest}>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            size="small"
            label="Message"
            error={fieldState.error && fieldState.value > 0}
            fullWidth
            {...field}
          />
        )}
      />
      <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'flex-end' }}>
        <Tooltip title="Clear chat messages" placement="left">
          <IconButton size="small" onClick={onClearChat}>
            <DeleteSweepOutlined />
          </IconButton>
        </Tooltip>
        <Button size="small" variant="contained" type="submit" disabled={!(isValid && isDirty)}>
          Send
        </Button>
      </Stack>
    </Box>
  );
});

ChatControls.displayName = 'ChatControls';

ChatControls.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
};

export default ChatControls;
