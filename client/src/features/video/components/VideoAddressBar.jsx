import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

import { isVideoSupported } from '../utils/isVideoSupported';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const VideoAddressBar = ({ videoAddress, onSetVideo, ...rest }) => {
  const [localVideoAddress, setLocalVideoAddress] = useState(videoAddress);
  const [isLocalVideoAddressValid, setIsLocalVideoAddressValid] = useState(true);

  const handleVideoAddressChange = (e, validatorResult) => {
    setLocalVideoAddress(e.target.value);
    setIsLocalVideoAddressValid(validatorResult);
  };

  const handleVideoSet = () => {
    onSetVideo(localVideoAddress);
  };

  useEffect(() => {
    setLocalVideoAddress(videoAddress);
    setIsLocalVideoAddressValid(true);
  }, [videoAddress]);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <ValidationTextField
        fullWidth
        variant="outlined"
        label="Video Address"
        value={localVideoAddress}
        error={!isLocalVideoAddressValid}
        validator={isVideoSupported}
        onChange={handleVideoAddressChange}
      />
      <Button endIcon={<Send />} disabled={!isLocalVideoAddressValid} onClick={handleVideoSet}>
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
