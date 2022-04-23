import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

import { validateVideoAddress } from '../utils/validateVideoAddress';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const VideoAddressBar = ({ videoAddress, onSetVideo, ...rest }) => {
  const [localVideoAddress, setLocalVideoAddress] = useState(videoAddress);
  const [isValidLocalVideoAddress, setIsValidLocalVideoAddress] = useState(true);
  const showLocalVideoAddressInputError = localVideoAddress !== '' && !isValidLocalVideoAddress;

  const handleVideoAddressChange = (e) => {
    setLocalVideoAddress(e.target.value);
    setIsValidLocalVideoAddress(validateVideoAddress(e.target.value));
  };

  const handleVideoSet = () => {
    onSetVideo(localVideoAddress);
  };

  useEffect(() => {
    setLocalVideoAddress(videoAddress);
    setIsValidLocalVideoAddress(true);
  }, [videoAddress]);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <TextField
        fullWidth
        variant="outlined"
        label="Video Address"
        value={localVideoAddress}
        error={showLocalVideoAddressInputError}
        onChange={handleVideoAddressChange}
      />
      <Button endIcon={<Send />} disabled={!isValidLocalVideoAddress} onClick={handleVideoSet}>
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
