import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { PlayArrow, Pause } from '@mui/icons-material';

const iconAnimation = keyframes`
  0% {
    opacity: 1;
    font-size: 1rem;
  }
  100% {
    opacity: 0;
    font-size: 5rem;
  }
`;

const Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const IconWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & > .MuiSvgIcon-root {
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    animation: ${iconAnimation} 0.5s ease-out forwards;
  }
`;

const TogglePlayOverlay = ({ isPlaying, onTogglePlay, ...rest }) => {
  const handleTogglePlay = () => {
    onTogglePlay(!isPlaying);
  };

  return (
    <Overlay onClick={handleTogglePlay} {...rest}>
      <IconWrapper>{isPlaying ? <PlayArrow /> : <Pause />}</IconWrapper>
    </Overlay>
  );
};

TogglePlayOverlay.propTypes = {
  isPlaying: PropTypes.bool,
  onTogglePlay: PropTypes.func.isRequired,
};

TogglePlayOverlay.defaultProps = {
  isPlaying: false,
};

export default TogglePlayOverlay;
