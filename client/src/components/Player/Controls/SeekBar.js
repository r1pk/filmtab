import { useState } from 'react';
import PropTypes from 'prop-types';

import { Slider } from '@mui/material';

const convertSecondsToHMS = (seconds) => {
  const isoString = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? isoString.substr(14, 5) : isoString.substr(11, 8);
};

const SeekBar = ({ progress, duration, onVideoSeek, ...rest }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);

  const handleSliderChange = (e, value) => {
    if (!isChanging) {
      setIsChanging(true);
    }
    setLocalProgress(value);
  };

  const handleSliderChangeCommitted = (e, value) => {
    setIsChanging(false);
    onVideoSeek(value);
  };

  const handleLabelValue = (value) => {
    return convertSecondsToHMS(value);
  };

  return (
    <Slider
      size="small"
      valueLabelDisplay="auto"
      valueLabelFormat={handleLabelValue}
      value={isChanging ? localProgress : progress}
      max={duration}
      onChange={handleSliderChange}
      onChangeCommitted={handleSliderChangeCommitted}
      {...rest}
    />
  );
};

SeekBar.propTypes = {
  progress: PropTypes.number,
  duration: PropTypes.number,
  onVideoSeek: PropTypes.func.isRequired,
};

SeekBar.defaultProps = {
  progress: 0,
  duration: 0,
};

export default SeekBar;
