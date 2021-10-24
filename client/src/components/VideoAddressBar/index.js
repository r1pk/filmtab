import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

import VideoAddressField from '../Shared/VideoAddressField';
import Button from '../Shared/Button';

const VideoAddressBar = ({ roomVideoAddress, onSetVideo, ...rest }) => {
  const [localVideoAddress, setLocalVideoAddress] = useState({ value: roomVideoAddress, valid: true });
  const isValidForm = localVideoAddress.valid;

  const handleVideoAddressChange = (e, isValidVideoAddress) => {
    setLocalVideoAddress({ value: e.target.value, valid: isValidVideoAddress });
  };

  const handleSetVideo = () => {
    if (onSetVideo) {
      onSetVideo(localVideoAddress.value);
    }
  };

  useEffect(() => {
    setLocalVideoAddress({ value: roomVideoAddress, valid: true });
  }, [roomVideoAddress]);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <VideoAddressField
        value={localVideoAddress.value}
        error={!localVideoAddress.valid}
        onChange={handleVideoAddressChange}
      />
      <Button endIcon={<Send />} disabled={!isValidForm} onClick={handleSetVideo}>
        Set
      </Button>
    </Stack>
  );
};

VideoAddressBar.propTypes = {
  roomVideoAddress: PropTypes.string,
  onSetVideo: PropTypes.func.isRequired,
};

VideoAddressBar.defaultProps = {
  roomVideoAddress: '',
};

export default VideoAddressBar;
