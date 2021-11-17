import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import PlayerContainer from './PlayerContainer';
import VideoPlayer from './VideoPlayer';
import VideoControls from './VideoControls';

import useFullscreen from '../../hooks/useFullscreen';
import useIdleDetection from '../../hooks/useIdleDetection';

const Player = ({ url, playing, playedSeconds, onTogglePlay, onVideoSeek, ...rest }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(playedSeconds);
  const [volume, setVolume] = useState(0.2);

  const container = useRef(null);
  const player = useRef(null);

  const [isFullscreenEnabled, handleToggleFullscreen] = useFullscreen(container);
  const isUserIdle = useIdleDetection(3500);

  const handlePlayerReady = () => {
    setIsPlayerReady(true);
  };

  const handleDuration = (seconds) => {
    setDuration(seconds);
  };

  const handleProgress = (progress) => {
    setProgress(progress.playedSeconds);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const handleTogglePlay = (videoState) => {
    onTogglePlay(videoState, progress);
  };

  const handleVideoSeek = (seconds) => {
    setProgress(seconds);
    onVideoSeek(seconds);
  };

  useEffect(() => {
    setIsPlayerReady(false);
  }, [url]);

  useEffect(() => {
    if (isPlayerReady && player.current.getInternalPlayer()) {
      player.current.seekTo(playedSeconds);
    }
  }, [isPlayerReady, playedSeconds]);

  return (
    <PlayerContainer ref={container} {...rest}>
      <VideoPlayer
        url={url}
        playing={playing}
        volume={volume}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onReady={handlePlayerReady}
        ref={player}
      />
      <VideoControls
        isPlaying={playing}
        isFullscreenEnabled={isFullscreenEnabled}
        isUserIdle={isUserIdle}
        progress={progress}
        duration={duration}
        volume={volume}
        onTogglePlay={handleTogglePlay}
        onToggleFullscreen={handleToggleFullscreen}
        onVideoSeek={handleVideoSeek}
        onVolumeChange={handleVolumeChange}
      />
    </PlayerContainer>
  );
};

Player.propTypes = {
  url: PropTypes.string,
  playing: PropTypes.bool,
  playedSeconds: PropTypes.number,
  onTogglePlay: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
};

Player.defaultProps = {
  url: '',
  playing: false,
  playedSeconds: 0,
};

export default Player;
