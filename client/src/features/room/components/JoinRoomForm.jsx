import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack } from '@mui/material';

import TextField from '@/components/form/TextField';
import FormControlLabel from '@/components/form/FormControlLabel';
import Checkbox from '@/components/form/Checkbox';
import Button from '@/components/form/Button';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { JoinRoomFormSchema } from '../schemas/JoinRoomFormSchema';

import { usernameManager } from '../utils/usernameManager';

const JoinRoomForm = forwardRef(({ onJoinRoom, roomId, disableForm, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      roomId: roomId || '',
      username: usernameManager.getRecommendedUsername(),
      rememberUsername: usernameManager.isUsernameAlreadySaved(),
    },
    resolver: joiResolver(JoinRoomFormSchema),
  });

  const onSubmit = (data) => {
    if (formState.isValid && !disableForm) {
      if (data.rememberUsername) {
        usernameManager.saveUsername(data.username);
      } else {
        usernameManager.removeSavedUsername();
      }

      onJoinRoom(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Join Room"
        titleTypographyProps={{
          variant: 'h6',
        }}
        sx={{ textAlign: 'center', textTransform: 'uppercase', p: 1 }}
      />
      <Divider />
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Controller
            name="roomId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Room ID"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                disabled={Boolean(roomId)}
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
          <Controller
            name="rememberUsername"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Remember Username"
                control={<Checkbox checked={field.value} sx={{ p: 0, mr: 1 }} {...field} />}
              />
            )}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button type="submit" disabled={!formState.isValid || disableForm} fullWidth>
          Join
        </Button>
      </CardActions>
    </Card>
  );
});

JoinRoomForm.displayName = 'JoinRoomForm';

JoinRoomForm.propTypes = {
  onJoinRoom: PropTypes.func.isRequired,
  roomId: PropTypes.string,
  disableForm: PropTypes.bool,
};

export default JoinRoomForm;
