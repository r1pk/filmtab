import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

import TextField from '../Shared/TextField';
import Button from '../Shared/Button';

const VideoAddressBar = ({ roomVideoAddress, onSetVideo, ...rest }) => {
  const [localVideoAddress, setLocalVideoAddress] = useState(roomVideoAddress);

  const handleVideoAddressChange = (e) => {
    setLocalVideoAddress(e.target.value);
  };

  const handleSetVideo = () => {
    if (onSetVideo) {
      onSetVideo(localVideoAddress);
    }
  };

  useEffect(() => {
    setLocalVideoAddress(roomVideoAddress);
  }, [roomVideoAddress]);

  return (
    <Stack direction="row" spacing={1} {...rest}>
      <TextField
        fullWidth
        variant="outlined"
        label="Video Address"
        value={localVideoAddress}
        onChange={handleVideoAddressChange}
      />
      <Button endIcon={<Send />} onClick={handleSetVideo}>
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
  roomVideoAddress: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
};

export default VideoAddressBar;
