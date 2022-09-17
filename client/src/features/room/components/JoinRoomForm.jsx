import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack } from '@mui/material';

import { TextField, Button } from '@/components/form';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { JoinRoomFormSchema } from '../schemas/JoinRoomFormSchema';

const JoinRoomForm = forwardRef(({ onJoinRoom, defaultValues, disableRoomIdInput, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: Object.assign({}, { roomId: '', username: '' }, defaultValues),
    resolver: joiResolver(JoinRoomFormSchema),
  });

  const onSubmit = (data) => {
    if (formState.isValid) {
      if (onJoinRoom) {
        onJoinRoom(data);
      }
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Join Room"
        titleTypographyProps={{
          variant: 'h5',
        }}
        sx={{ textAlign: 'center' }}
      />
      <Divider />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Controller
            name="roomId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Room ID"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                disabled={disableRoomIdInput}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Username"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button type="submit" disabled={!formState.isValid} fullWidth>
          Join
        </Button>
      </CardActions>
    </Card>
  );
});

JoinRoomForm.displayName = 'JoinRoomForm';

JoinRoomForm.propTypes = {
  onJoinRoom: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    roomId: PropTypes.string,
    username: PropTypes.string,
  }),
  disableRoomIdInput: PropTypes.bool,
};

export default JoinRoomForm;
