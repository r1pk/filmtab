import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Plyr from 'plyr';

import { buildPlyrSourceObject } from '../utils/buildPlyrSourceObject';
import { reduceProgressDelay } from '../utils/reduceProgressDelay';

import { options } from '../defaults/options';

const VideoPlayer = (props) => {
  const { url, playing, progress, updateTimestamp, onTogglePlayback, onSeekVideo, onVideoProgress, ...rest } = props;

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const player = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const handlePlayerReady = async () => {
      if (player.current.source && !player.current.duration) {
        await player.current.togglePlay(true);
        await player.current.togglePlay(false);
      }
      setIsPlayerReady(true);
    };

    if (!player.current && video.current) {
      player.current = new Plyr(video.current, options);
      player.current.on('ready', () => handlePlayerReady());
    }

    return () => {
      if (player.current) {
        player.current.destroy();
        player.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleTogglePlayback = () => {
      onTogglePlayback(player.current.currentTime);
    };

    const handleSeekVideo = () => {
      const { value, max } = player.current.elements.inputs.seek;
      const currentVideoProgress = (value / max) * player.current.media.duration;

      onSeekVideo(currentVideoProgress);
    };

    const setupControlsListeners = () => {
      if (player.current.elements.buttons.play) {
        player.current.elements.buttons.play.forEach((element) => {
          element.addEventListener('click', handleTogglePlayback);
        });
      }
      if (player.current.elements.inputs.seek) {
        player.current.elements.inputs.seek.addEventListener('click', handleSeekVideo);
      }
    };

    if (player.current && isPlayerReady) {
      setupControlsListeners();
    }

    return () => {
      if (player.current) {
        if (player.current.elements.buttons.play) {
          player.current.elements.buttons.play.forEach((element) => {
            element.removeEventListener('click', handleTogglePlayback);
          });
        }
        if (player.current.elements.inputs.seek) {
          player.current.elements.inputs.seek.removeEventListener('click', handleSeekVideo);
        }
      }
    };
  }, [isPlayerReady, onSeekVideo, onTogglePlayback]);

  useEffect(() => {
    const setPlayerSource = () => {
      player.current.source = buildPlyrSourceObject(url);
      setIsPlayerReady(false);
    };

    if (player.current && player.current.source !== url) {
      setPlayerSource();
    }
  }, [url]);

  useEffect(() => {
    const updatePlayerParameters = async () => {
      await player.current.togglePlay(playing);
      player.current.currentTime = reduceProgressDelay(playing, progress, updateTimestamp);
    };

    if (player.current && isPlayerReady) {
      updatePlayerParameters();
    }
  }, [isPlayerReady, playing, progress, updateTimestamp]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      onVideoProgress(player.current.currentTime);
    };

    if (player.current) {
      player.current.on('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (player.current) {
        player.current.off('timeupdate', handleTimeUpdate);
      }
    };
  }, [onVideoProgress]);

  return <video ref={video} {...rest} />;
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  updateTimestamp: PropTypes.number.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
  onSeekVideo: PropTypes.func.isRequired,
  onVideoProgress: PropTypes.func.isRequired,
};

export default VideoPlayer;
