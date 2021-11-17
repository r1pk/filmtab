import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box, Stack } from '@mui/material';

import TogglePlayButton from './Controls/TogglePlayButton';
import VolumeBar from './Controls/VolumeBar';
import SeekBar from './Controls/SeekBar';
import TimeProgressText from './Controls/TimeProgressText';
import ToggleFullscreenButton from './Controls/ToggleFullscreenButton';
import TogglePlayOverlay from './Controls/TogglePlayOverlay';

const Container = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: ${(p) => (p.isUserIdle ? 'none' : 'default')};
`;

const BottomBar = styled(Box)`
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease-out;
  transform: ${(p) => (p.isUserIdle ? 'translateY(100%)' : 'none')};
`;

const StyledSeekBar = styled(SeekBar)`
  position: absolute;
  transform: translateY(-50%);
`;

const VideoControls = (props) => {
  const { isPlaying, isFullscreenEnabled, isUserIdle, progress, duration, volume, ...handlers } = props;
  const { onTogglePlay, onToggleFullscreen, onVideoSeek, onVolumeChange, ...rest } = handlers;

  return (
    <Container isUserIdle={isUserIdle} {...rest}>
      <TogglePlayOverlay isPlaying={isPlaying} onTogglePlay={onTogglePlay} />
      <BottomBar isUserIdle={isUserIdle}>
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
      </BottomBar>
    </Container>
  );
};

VideoControls.propTypes = {
  isPlaying: PropTypes.bool,
  isFullscreenEnabled: PropTypes.bool,
  isUserIdle: PropTypes.bool,
  progress: PropTypes.number,
  duration: PropTypes.number,
  volume: PropTypes.number,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default VideoControls;
