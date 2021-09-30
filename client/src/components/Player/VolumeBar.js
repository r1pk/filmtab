import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Stack, Slider, IconButton } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const VolumeSlider = styled(Slider)`
  width: 0px;
  overflow: hidden;
  transition: all ease-in-out 0.2s;
`;

const Container = styled(Stack)`
  flex-direction: row;
  align-items: center;
  margin: 0 !important;

  &:hover ${VolumeSlider}, &:active ${VolumeSlider} {
    width: 80px;
    overflow: visible;
  }
`;

const VolumeBar = ({ volume, onVolumeChange, ...rest }) => {
  const handleVolumeChange = (e, nextValue) => {
    if (onVolumeChange) {
      onVolumeChange(nextValue);
    }
  };

  return (
    <Container {...rest}>
      <IconButton>{volume === 0 ? <VolumeOff /> : <VolumeUp />}</IconButton>
      <VolumeSlider size="small" aria-label="Sound volume" value={volume} max={100} onChange={handleVolumeChange} />
    </Container>
  );
};

VolumeBar.propTypes = {
  volume: PropTypes.number,
  onVolumeChange: PropTypes.func.isRequired,
};

VolumeBar.defaultProps = {
  volume: 50,
};

export default VolumeBar;
