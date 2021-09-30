import PropTypes from 'prop-types';

import { Slider } from '@mui/material';

const ProgressBar = ({ playedSeconds, videoDuration, onVideoSeek, ...rest }) => {
  const handleSliderChange = (e, nextValue) => {
    if (onVideoSeek) {
      onVideoSeek(nextValue);
    }
  };

  return (
    <Slider
      size="small"
      aria-label="Video progress"
      value={playedSeconds}
      max={videoDuration}
      onChange={handleSliderChange}
      {...rest}
    />
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
