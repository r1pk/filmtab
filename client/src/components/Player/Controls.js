import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import TogglePlay from './TogglePlay';
import VolumeBar from './VolumeBar';
import ProgressBar from './ProgressBar';
import ToggleFullscreen from './ToggleFullscreen';

const Controls = (props) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TogglePlay isPlaying={props.isPlaying} onTogglePlay={props.onTogglePlay} />
      <VolumeBar volume={props.volume} onVolumeChange={props.onVolumeChange} />
      <ProgressBar
        playedSeconds={props.playedSeconds}
        videoDuration={props.videoDuration}
        onVideoSeek={props.onVideoSeek}
      />
      <ToggleFullscreen isFullscreen={props.isFullscreen} onToggleFullscreen={props.onToggleFullscreen} />
    </Stack>
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
