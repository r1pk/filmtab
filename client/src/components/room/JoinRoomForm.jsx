import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Joi from 'joi';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { usernameManager } from '@/utils/username-manager';

const schema = Joi.object({
  roomId: Joi.string().trim().length(9).required().label('roomId'),
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
  rememberUsername: Joi.boolean().label('rememberUsername'),
});

const JoinRoomForm = forwardRef(({ onSubmit, roomId, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      roomId: roomId || '',
      username: usernameManager.readFromLocalStorage() || usernameManager.createRandom(),
      rememberUsername: true,
    },
    resolver: joiResolver(schema),
  });
  const { isValid } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid) {
      return;
    }

    if (data.rememberUsername) {
      usernameManager.saveToLocalStorage(data.username);
    } else {
      usernameManager.clearLocalStorage();
    }

    onSubmit(data);
  };

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Join Room"
        titleTypographyProps={{
          variant: 'overline',
        }}
        sx={{ textAlign: 'center', p: 1 }}
      />

      <CardContent>
        <Stack spacing={2}>
          <Controller
            name="roomId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                size="small"
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
                size="small"
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
                componentsProps={{ typography: { variant: 'button' } }}
                control={
                  <Checkbox
                    size="small"
                    checked={field.value}
                    icon={<BookmarkBorder />}
                    checkedIcon={<Bookmark />}
                    sx={{ p: 0, mr: 1 }}
                    {...field}
                  />
                }
              />
            )}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" type="submit" disabled={!isValid} fullWidth>
          Join
        </Button>
      </CardActions>
    </Card>
  );
});

JoinRoomForm.displayName = 'JoinRoomForm';

JoinRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  roomId: PropTypes.string,
};

export default JoinRoomForm;
