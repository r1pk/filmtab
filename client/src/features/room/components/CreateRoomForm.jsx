import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardActions, Divider } from '@mui/material';

import TextField from '@/components/form/TextField';
import Button from '@/components/form/Button';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { CreateRoomFormSchema } from '../schemas/CreateRoomFormSchema';

import { createRandomUsername } from '../utils/createRandomUsername';
import { restoreLastUsername } from '../utils/restoreLastUsername';
import { saveUsername } from '../utils/saveUsername';

const CreateRoomForm = forwardRef(({ onCreateRoom, defaultValues, disableForm, ...rest }, ref) => {
  const suggestedUsername = restoreLastUsername() || createRandomUsername();

  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: Object.assign({}, { username: suggestedUsername }, defaultValues),
    resolver: joiResolver(CreateRoomFormSchema),
  });

  const onSubmit = (data) => {
    if (formState.isValid && !disableForm) {
      saveUsername(data.username);
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
