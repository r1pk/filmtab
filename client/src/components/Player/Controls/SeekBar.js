import PropTypes from 'prop-types';

import { Slider } from '@mui/material';

const SeekBar = ({ progress, duration, onVideoSeek, ...rest }) => {
  const handleSliderChange = (e, value) => {
    if (onVideoSeek) {
      onVideoSeek(value);
    }
  };

  return <Slider size="small" value={progress} max={duration} onChange={handleSliderChange} {...rest} />;
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
