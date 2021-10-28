import PropTypes from 'prop-types';

import { IconButton } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

const ToggleFullscreenButton = ({ isFullscreenEnabled, onToggleFullscreen, ...rest }) => {
  const handleToggleFullscreen = () => {
    if (onToggleFullscreen) {
      onToggleFullscreen(!isFullscreenEnabled);
    }
  };

  return (
    <IconButton onClick={handleToggleFullscreen} {...rest}>
      {isFullscreenEnabled ? <FullscreenExit /> : <Fullscreen />}
    </IconButton>
  );
};

ToggleFullscreenButton.propTypes = {
  isFullscreenEnabled: PropTypes.bool,
  onToggleFullscreen: PropTypes.func.isRequired,
};

ToggleFullscreenButton.defaultProps = {
  isFullscreenEnabled: false,
};

export default ToggleFullscreenButton;
