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
  const [isFullscreenActive, toggleFullscreen, containerRef] = useFullscreen();

  const { playedSeconds, videoDuration, onTogglePlay, onVideoSeek, onVolumeChange, ...rest } = props;

  return (
    <Container ref={containerRef}>
      <StyledPlayer {...rest} ref={ref} />
      <ControlsContainer>
        <Controls
          isPlaying={props.playing}
          isFullscreen={isFullscreenActive}
          playedSeconds={playedSeconds}
          videoDuration={videoDuration}
          volume={props.volume}
          onTogglePlay={onTogglePlay}
          onToggleFullscreen={toggleFullscreen}
          onVideoSeek={onVideoSeek}
          onVolumeChange={onVolumeChange}
        />
      </ControlsContainer>
    </Container>
  );
});

Player.displayName = 'Player';

Player.propTypes = {
  url: PropTypes.string,
  playing: PropTypes.bool,
  volume: PropTypes.number,
  playedSeconds: PropTypes.number,
  videoDuration: PropTypes.number,
  onTogglePlay: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

Player.defaultProps = {
  url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  playing: false,
  volume: 0.1,
  playedSeconds: 0,
  videoDuration: 0,
};

export default Player;
