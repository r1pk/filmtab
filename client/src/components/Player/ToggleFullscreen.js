import PropTypes from 'prop-types';

import { IconButton } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

const ToggleFullscreen = ({ isFullscreen, onToggleFullscreen, ...rest }) => {
  const handleToggleFullScreen = () => {
    if (onToggleFullscreen) {
      onToggleFullscreen(!isFullscreen);
    }
  };

  return (
    <IconButton onClick={handleToggleFullScreen} {...rest}>
      {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </IconButton>
  );
};

ToggleFullscreen.propTypes = {
  isFullscreen: PropTypes.bool,
  onToggleFullscreen: PropTypes.func.isRequired,
};

ToggleFullscreen.defaultProps = {
  isFullscreen: false,
};

export default ToggleFullscreen;
