import { useState } from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Box } from '@mui/material';

import Controls from './Controls';

import useFullscreen from '../../hooks/useFullscreen';

const ControlsContainer = styled(Box)`
  position: absolute;
  top: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  transition: all ease-in-out 0.2s;
`;

const Container = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;

  :hover > ${ControlsContainer}, :active > ${ControlsContainer} {
    transform: translateY(-100%);
  }
`;

const StyledPlayer = styled(ReactPlayer)`
  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
  }
`;

const Player = forwardRef((props, ref) => {
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [isFullscreenActive, toggleFullscreen, containerRef] = useFullscreen();

  const { onTogglePlay, onVideoSeek, ...rest } = props;

  const handleDuration = (seconds) => {
    setDuration(seconds);
  };

  const handleProgress = (progress) => {
    setProgress(progress.playedSeconds);
  };

  const handleVolume = (volume) => {
    setVolume(volume);
  };

  return (
    <Container ref={containerRef}>
      <StyledPlayer {...rest} ref={ref} volume={volume} onDuration={handleDuration} onProgress={handleProgress} />
      <ControlsContainer>
        <Controls
          isPlaying={props.playing}
          isFullscreen={isFullscreenActive}
          playedSeconds={progress}
          videoDuration={duration}
          volume={volume * 100}
          onTogglePlay={onTogglePlay}
          onToggleFullscreen={toggleFullscreen}
          onVideoSeek={onVideoSeek}
          onVolumeChange={handleVolume}
        />
      </ControlsContainer>
    </Container>
  );
});

Player.displayName = 'Player';

Player.propTypes = {
  url: PropTypes.string,
  playing: PropTypes.bool,
  onTogglePlay: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
};

Player.defaultProps = {
  url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  playing: false,
};

export default Player;
