import PropTypes from 'prop-types';

import { Stack, Slider, IconButton } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const VolumeBar = ({ volume, onVolumeChange, ...rest }) => {
  const handleVolumeChange = (e, value) => {
    const nextVolume = value / 100;
    if (onVolumeChange) {
      onVolumeChange(nextVolume);
    }
  };

  const handleButtonClick = () => {
    handleVolumeChange(null, volume === 0 ? 20 : 0);
  };

  return (
    <Stack flexDirection="row" alignItems="center" margin={0} {...rest}>
      <IconButton onClick={handleButtonClick}>{volume === 0 ? <VolumeOff /> : <VolumeUp />}</IconButton>
      <Slider size="small" value={volume * 100} max={100} onChange={handleVolumeChange} sx={{ width: '80px' }} />
    </Stack>
  );
};

VolumeBar.propTypes = {
  volume: PropTypes.number,
  onVolumeChange: PropTypes.func.isRequired,
};

VolumeBar.defaultProps = {
  volume: 0,
};

export default VolumeBar;
