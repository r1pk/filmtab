import PropTypes from 'prop-types';

import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

const TogglePlay = ({ isPlaying, onTogglePlay, ...rest }) => {
  const handleTogglePlay = () => {
    if (onTogglePlay) {
      onTogglePlay(!isPlaying);
    }
  };

  return (
    <IconButton onClick={handleTogglePlay} {...rest}>
      {isPlaying ? <Pause /> : <PlayArrow />}
    </IconButton>
  );
};

TogglePlay.propTypes = {
  isPlaying: PropTypes.bool,
  onTogglePlay: PropTypes.func.isRequired,
};

TogglePlay.defaultProps = {
  isPlaying: false,
};

export default TogglePlay;
