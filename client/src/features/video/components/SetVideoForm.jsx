import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import Joi from 'joi';

import { Card, CardActions, Stack } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import Button from '@/components/form/Button';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  url: Joi.string().trim().uri().required().label('url'),
});

const SetVideoForm = forwardRef(({ onSetVideo, url, ...rest }, ref) => {
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      url: url,
    },
    resolver: joiResolver(schema),
  });
  const { isValid, isDirty } = formState;

  const onSubmit = (data) => {
    if (isValid && isDirty) {
      onSetVideo(data);
    }
  };

  useEffect(
    function updateFormState() {
      reset({ url: url }, { shouldDirty: false });
    },
    [url, reset]
  );

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ width: 1, alignItems: 'center' }}>
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <TextField variant="outlined" label="Video URL" error={Boolean(fieldState.error)} fullWidth {...field} />
            )}
          />
          <Button type="submit" disabled={!(isValid && isDirty)} startIcon={<SendOutlined />}>
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
  onSetVideo: PropTypes.func.isRequired,
};

export default SetVideoForm;
