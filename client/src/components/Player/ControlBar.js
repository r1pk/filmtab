import { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box, Stack } from '@mui/material';

import TogglePlayButton from './Controls/TogglePlayButton';
import VolumeBar from './Controls/VolumeBar';
import SeekBar from './Controls/SeekBar';
import TimeProgressText from './Controls/TimeProgressText';
import ToggleFullscreenButton from './Controls/ToggleFullscreenButton';

import { useIdleTimer } from 'react-idle-timer';

const StyledBox = styled(Box)`
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease-out;
  transform: ${(p) => (p.isIdle ? 'translateY(100%)' : 'none')};
`;

const StyledSeekBar = styled(SeekBar)`
  position: absolute;
  transform: translateY(-50%);
`;

const ControlBar = (props) => {
  const [isIdle, setIsIdle] = useState(false);

  const handleIdle = () => {
    setIsIdle(true);
  };

  const handleActive = () => {
    setIsIdle(false);
  };

  useIdleTimer({
    timeout: 5000,
    events: ['mousemove', 'touchstart', 'touchmove'],
    onIdle: handleIdle,
    onActive: handleActive,
  });

  const { isPlaying, isFullscreenEnabled, progress, duration, volume, ...handlers } = props;
  const { onTogglePlay, onToggleFullscreen, onVideoSeek, onVolumeChange, ...rest } = handlers;

  return (
    <StyledBox isIdle={isIdle} {...rest}>
      <StyledSeekBar progress={progress} duration={duration} onVideoSeek={onVideoSeek} />
      <Stack direction="row">
        <Stack direction="row" alignItems="center" spacing={1}>
          <TogglePlayButton isPlaying={isPlaying} onTogglePlay={onTogglePlay} />
          <VolumeBar volume={volume} onVolumeChange={onVolumeChange} />
          <TimeProgressText progress={progress} duration={duration} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} ml="auto !important">
          <ToggleFullscreenButton isFullscreenEnabled={isFullscreenEnabled} onToggleFullscreen={onToggleFullscreen} />
        </Stack>
      </Stack>
    </StyledBox>
  );
};

ControlBar.propTypes = {
  isPlaying: PropTypes.bool,
  isFullscreenEnabled: PropTypes.bool,
  progress: PropTypes.number,
  duration: PropTypes.number,
  volume: PropTypes.number,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default ControlBar;
