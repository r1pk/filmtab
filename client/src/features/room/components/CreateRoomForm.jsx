import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Joi from 'joi';

import { Card, CardHeader, CardContent, CardActions, Divider, Stack } from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import FormControlLabel from '@/components/form/FormControlLabel';
import Checkbox from '@/components/form/Checkbox';
import Button from '@/components/form/Button';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { usernameManager } from '../utils/usernameManager';

const schema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
  rememberUsername: Joi.boolean().label('rememberUsername'),
});

const CreateRoomForm = forwardRef(({ onCreateRoom, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      username: usernameManager.getRecommendedUsername(),
      rememberUsername: usernameManager.isUsernameAlreadySaved(),
    },
    resolver: joiResolver(schema),
  });
  const { isValid } = formState;

  const onSubmit = (data) => {
    if (isValid) {
      if (data.rememberUsername) {
        usernameManager.saveUsername(data.username);
      } else {
        usernameManager.removeSavedUsername();
      }

      onCreateRoom(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Create Room"
        titleTypographyProps={{
          variant: 'h6',
        }}
        sx={{ textAlign: 'center', textTransform: 'uppercase', p: 1 }}
      />
      <Divider />
      <CardContent>
        <Stack direction="column" spacing={1}>
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
                componentsProps={{ typography: { variant: 'button' } }}
                control={
                  <Checkbox
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
        <Button type="submit" disabled={!isValid} fullWidth>
          Create
        </Button>
      </CardActions>
    </Card>
  );
});

CreateRoomForm.displayName = 'CreateRoomForm';

CreateRoomForm.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoomForm;
