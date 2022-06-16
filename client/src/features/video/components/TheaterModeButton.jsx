import PropTypes from 'prop-types';

import { PanoramaWideAngle, PanoramaHorizontal } from '@mui/icons-material';

import Button from '../../../components/Button';

const TheaterModeButton = ({ isTheaterModeActive, onToggleTheaterMode, ...rest }) => {
  const icon = isTheaterModeActive ? <PanoramaHorizontal /> : <PanoramaWideAngle />;

  const handleLeaveRoom = () => {
    onToggleTheaterMode();
  };

  return (
    <Button variant="text" color="primary" startIcon={icon} onClick={handleLeaveRoom} {...rest}>
      {isTheaterModeActive ? 'Leave Theater Mode' : 'Enter Theater Mode'}
    </Button>
  );
};

TheaterModeButton.propTypes = {
  isTheaterModeActive: PropTypes.bool,
  onToggleTheaterMode: PropTypes.func.isRequired,
};

export default TheaterModeButton;
