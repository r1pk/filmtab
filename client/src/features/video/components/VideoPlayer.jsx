import { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Plyr from 'plyr-react';

import { resolveVideoSource } from '../utils/resolveVideoSource';
import { buildPlayerOptions } from '../utils/buildPlayerOptions';
import { reduceProgressDelay } from '../utils/reduceProgressDelay';

const VideoPlayer = ({
  url,
  playing,
  progress,
  updateTimestamp,
  onTogglePlay,
  onSeekVideo,
  onProgressIntervalTick,
  ...rest
}) => {
  const [shouldSynchronizePlayer, setShouldSynchronizePlayer] = useState(false);
  const player = useRef(null);

  const handleTogglePlay = () => {
    const { playing, currentTime } = player.current.plyr;

    onTogglePlay(!playing, currentTime);
  };

  const handleSeekVideo = (e) => {
    const currentVideoProgress = (e.target.value / e.target.max) * player.current.plyr.media.duration;

    onSeekVideo(currentVideoProgress);
  };

  const videoSource = useMemo(() => resolveVideoSource(url), [url]);
  const playerOptions = useMemo(
    () =>
      buildPlayerOptions({
        play: handleTogglePlay,
        seek: handleSeekVideo,
      }),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    const setPlayerParameters = async () => {
      await player.current.plyr.togglePlay(playing);
      player.current.plyr.currentTime = reduceProgressDelay(progress, updateTimestamp);
    };

    if (shouldSynchronizePlayer && player.current.plyr.ready) {
      setPlayerParameters();
    }
  }, [shouldSynchronizePlayer, playing, progress, updateTimestamp]);

  useEffect(() => {
    let interval;
    const handleIntervalTick = () => {
      if (player.current.plyr.source) {
        clearInterval(interval);
        setShouldSynchronizePlayer(true);
      }
    };

    if (!shouldSynchronizePlayer) {
      interval = setInterval(handleIntervalTick, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [shouldSynchronizePlayer]);

  useEffect(() => {
    let interval;
    const handleIntervalTick = () => {
      onProgressIntervalTick(player.current.plyr.currentTime);
    };

    if (playing && player.current.plyr.ready) {
      interval = setInterval(handleIntervalTick, 250);
    }

    return () => {
      clearInterval(interval);
    };
  }, [playing, onProgressIntervalTick]);

  return <Plyr ref={player} source={videoSource} options={playerOptions} {...rest} />;
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  updateTimestamp: PropTypes.number.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onSeekVideo: PropTypes.func.isRequired,
  onProgressIntervalTick: PropTypes.func.isRequired,
};

export default VideoPlayer;
