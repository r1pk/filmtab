import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider } from '@mui/material';

import { TextField, Button } from '@/components/form';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { CreateRoomFormSchema } from '../../schemas/CreateRoomFormSchema';

const CreateRoomForm = forwardRef(({ onCreateRoom, defaultValues, ...rest }, ref) => {
  const { control, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: Object.assign({}, { username: '' }, defaultValues),
    resolver: joiResolver(CreateRoomFormSchema),
  });

  const onSubmit = (data) => {
    if (onCreateRoom) {
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
        <Button type="submit" disabled={!formState.isValid} fullWidth>
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
};

export default CreateRoomForm;
