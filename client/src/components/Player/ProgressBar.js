import PropTypes from 'prop-types';

import { Slider, Typography } from '@mui/material';

const formatTime = (seconds) => {
  const isoString = new Date(seconds * 1000).toISOString();

  if (seconds < 3600) {
    return isoString.substr(14, 5);
  }
  return isoString.substr(11, 8);
};

const ProgressBar = ({ playedSeconds, videoDuration, onVideoSeek, ...rest }) => {
  const handleSliderChange = (e, nextValue) => {
    if (onVideoSeek) {
      onVideoSeek(nextValue);
    }
  };

  return (
    <>
      <Typography variant="body2">{formatTime(playedSeconds)}</Typography>
      <Slider
        size="small"
        aria-label="Video progress"
        value={playedSeconds}
        max={videoDuration}
        onChange={handleSliderChange}
        {...rest}
      />
      <Typography variant="body2">{formatTime(videoDuration)}</Typography>
    </>
  );
};

ProgressBar.propTypes = {
  playedSeconds: PropTypes.number,
  videoDuration: PropTypes.number,
  onVideoSeek: PropTypes.func.isRequired,
};

ProgressBar.defaultProps = {
  playedSeconds: 0,
  videoDuration: 0,
};

export default ProgressBar;
