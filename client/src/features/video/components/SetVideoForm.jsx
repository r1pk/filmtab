import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';

import { Card, CardActions, Stack } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';

import TextField from '@/components/form/TextField';
import Button from '@/components/form/Button';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { SetVideoFormSchema } from '../schemas/SetVideoFormSchema';

const SetVideoForm = forwardRef(({ onSetVideo, url, ...rest }, ref) => {
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      url: url,
    },
    resolver: joiResolver(SetVideoFormSchema),
  });

  const onSubmit = (data) => {
    if (formState.isValid && formState.isDirty) {
      onSetVideo(data);
    }
  };

  useEffect(() => {
    reset({ url: url }, { shouldDirty: false });
  }, [url, reset]);

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={2} sx={{ width: 1, alignItems: 'center' }}>
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <TextField variant="outlined" label="Video URL" error={Boolean(fieldState.error)} fullWidth {...field} />
            )}
          />
          <Button type="submit" disabled={!(formState.isValid && formState.isDirty)} startIcon={<SendOutlined />}>
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
