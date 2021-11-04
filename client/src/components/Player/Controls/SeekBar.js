import { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Slider } from '@mui/material';

const convertSecondsToHMS = (seconds) => {
  const isoString = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? isoString.substr(14, 5) : isoString.substr(11, 8);
};

const StyledSlider = styled(Slider)`
  & .MuiSlider-thumb {
    height: 8px;
    width: 8px;
  }
`;

const SeekBar = ({ progress, duration, onVideoSeek, ...rest }) => {
  const [isValueChanging, setIsValueChanging] = useState(false);
  const [localSeekBarValue, setLocalSeekBarValue] = useState(progress);
  const currentSeekBarValue = isValueChanging ? localSeekBarValue : progress;

  const handleSliderChange = (e, value) => {
    if (!isValueChanging) {
      setIsValueChanging(true);
    }
    setLocalSeekBarValue(value);
  };

  const handleSliderChangeCommitted = (e, value) => {
    setIsValueChanging(false);
    onVideoSeek(value);
  };

  const handleLabelValue = (value) => {
    return convertSecondsToHMS(value);
  };

  return (
    <StyledSlider
      size="small"
      valueLabelDisplay="auto"
      max={duration}
      value={currentSeekBarValue}
      onChange={handleSliderChange}
      onChangeCommitted={handleSliderChangeCommitted}
      valueLabelFormat={handleLabelValue}
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
