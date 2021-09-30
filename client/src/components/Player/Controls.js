import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Stack } from '@mui/material';

import TogglePlay from './TogglePlay';
import VolumeBar from './VolumeBar';
import ProgressBar from './ProgressBar';
import ProgressText from './ProgressText';
import ToggleFullscreen from './ToggleFullscreen';

const Container = styled(Stack)`
  position: relative;
  height: 40px;
`;

const StyledProgressBar = styled(ProgressBar)`
  position: absolute;
  transform: translateY(-50%);
`;

const StyledToggleFullscreen = styled(ToggleFullscreen)`
  margin-left: auto !important;
`;

const Controls = (props) => {
  return (
    <Container>
      <StyledProgressBar
        playedSeconds={props.playedSeconds}
        videoDuration={props.videoDuration}
        onVideoSeek={props.onVideoSeek}
      />
      <Stack direction="row" spacing={2} alignItems="center">
        <TogglePlay isPlaying={props.isPlaying} onTogglePlay={props.onTogglePlay} />
        <VolumeBar volume={props.volume} onVolumeChange={props.onVolumeChange} />
        <ProgressText playedSeconds={props.playedSeconds} videoDuration={props.videoDuration} />
        <StyledToggleFullscreen isFullscreen={props.isFullscreen} onToggleFullscreen={props.onToggleFullscreen} />
      </Stack>
    </Container>
  );
};

Controls.propTypes = {
  isPlaying: PropTypes.bool,
  isFullscreen: PropTypes.bool,
  playedSeconds: PropTypes.number,
  videoDuration: PropTypes.number,
  volume: PropTypes.number,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default Controls;
