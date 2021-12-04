import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

import { isVideoSupported } from '../utils/isVideoSupported';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const VideoAddressBar = ({ videoAddress, onSetVideo, ...rest }) => {
  const [localVideoAddress, setLocalVideoAddress] = useState({ value: videoAddress, valid: true });
  const isSubmitButtonDisabled = !localVideoAddress.valid;

  const handleVideoAddressChange = (e, validatorResult) => {
    setLocalVideoAddress({ value: e.target.value, valid: validatorResult });
  };

  const handleVideoSet = () => {
    onSetVideo(localVideoAddress.value);
  };

  useEffect(() => {
    setLocalVideoAddress({ value: videoAddress, valid: true });
  }, [videoAddress]);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <ValidationTextField
        fullWidth
        variant="outlined"
        label="Video Address"
        value={localVideoAddress.value}
        error={!localVideoAddress.valid}
        validator={isVideoSupported}
        onChange={handleVideoAddressChange}
      />
      <Button endIcon={<Send />} disabled={isSubmitButtonDisabled} onClick={handleVideoSet}>
        Set
      </Button>
    </Stack>
  );
};

VideoAddressBar.propTypes = {
  videoAddress: PropTypes.string,
  onSetVideo: PropTypes.func.isRequired,
};

VideoAddressBar.defaultProps = {
  videoAddress: '',
};

export default VideoAddressBar;
