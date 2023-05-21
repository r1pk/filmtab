import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';

import { Button, Card, CardActions, CardContent, CardHeader, Stack } from '@mui/material';

import UsernameField from './UsernameField';

const schema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
  rememberUsername: Joi.boolean().label('rememberUsername'),
});

const CreateRoomForm = forwardRef(({ onSubmit, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
      rememberUsername: true,
    },
    resolver: joiResolver(schema),
  });
  const { isValid } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid) {
      return;
    }

    onSubmit(data);
  };

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Create Room"
        titleTypographyProps={{
          variant: 'overline',
        }}
        sx={{ textAlign: 'center', p: 1 }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <UsernameField
                size="small"
                label="Username"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                onGenerateUsername={field.onChange}
                fullWidth
                {...field}
              />
            )}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" type="submit" disabled={!isValid} fullWidth>
          Create
        </Button>
      </CardActions>
    </Card>
  );
});

CreateRoomForm.displayName = 'CreateRoomForm';

CreateRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateRoomForm;
