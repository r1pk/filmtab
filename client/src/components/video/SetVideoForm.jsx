import { forwardRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';

import { SendOutlined } from '@mui/icons-material';
import { Button, Card, CardActions, Stack, TextField } from '@mui/material';

const schema = Joi.object({
  url: Joi.string().trim().uri().required().label('url'),
});

const SetVideoForm = forwardRef(({ url, onSubmit, ...rest }, ref) => {
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      url: url,
    },
    resolver: joiResolver(schema),
  });
  const { isValid, isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid || !isDirty) {
      return;
    }

    onSubmit(data);
  };

  useEffect(
    function updateFormState() {
      reset({ url: url }, { shouldDirty: false });
    },
    [url, reset]
  );

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ width: 1, alignItems: 'center' }}>
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <TextField size="small" label="Video URL" error={Boolean(fieldState.error)} fullWidth {...field} />
            )}
          />
          <Button size="small" type="submit" disabled={!(isValid && isDirty)} startIcon={<SendOutlined />}>
            Set
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
});

SetVideoForm.displayName = 'SetVideoForm';

SetVideoForm.propTypes = {
  url: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SetVideoForm;
