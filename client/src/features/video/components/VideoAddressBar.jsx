import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

import { validateVideoAddress } from '../utils/validateVideoAddress';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const VideoAddressBar = ({ videoAddress, onSetVideo, ...rest }) => {
  const { control, formState, setValue, trigger, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      videoAddress: videoAddress || '',
    },
  });

  const onSubmit = (data) => {
    onSetVideo(data.videoAddress);
  };

  useEffect(() => {
    if (videoAddress) {
      setValue('videoAddress', videoAddress);
      trigger('videoAddress');
    }
  }, [setValue, trigger, videoAddress]);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <Controller
        name="videoAddress"
        control={control}
        rules={{ required: true, validate: validateVideoAddress }}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!formState.errors.videoAddress}
            variant="outlined"
            label="Video Address"
            fullWidth
          />
        )}
      />
      <Button endIcon={<Send />} disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>
        Set
      </Button>
    </Stack>
  );
};

VideoAddressBar.propTypes = {
  videoAddress: PropTypes.string,
  onSetVideo: PropTypes.func.isRequired,
};

export default VideoAddressBar;
