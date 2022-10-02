import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider } from '@mui/material';

import { TextField, Button } from '@/components/form';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { CreateRoomFormSchema } from '../schemas/CreateRoomFormSchema';

import { createUsername } from '../utils/createUsername';

const CreateRoomForm = forwardRef(({ onCreateRoom, defaultValues, disableForm, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: Object.assign({}, { username: createUsername() }, defaultValues),
    resolver: joiResolver(CreateRoomFormSchema),
  });

  const onSubmit = (data) => {
    if (formState.isValid && !disableForm) {
      onCreateRoom(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardHeader
        title="Create Room"
        titleTypographyProps={{
          variant: 'h5',
        }}
        sx={{ textAlign: 'center' }}
      />
      <Divider />
      <CardContent>
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
      </CardContent>
      <CardActions>
        <Button type="submit" disabled={!formState.isValid || disableForm} fullWidth>
          Create
        </Button>
      </CardActions>
    </Card>
  );
});

CreateRoomForm.displayName = 'CreateRoomForm';

CreateRoomForm.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    username: PropTypes.string,
  }),
  disableForm: PropTypes.bool,
};

export default CreateRoomForm;
