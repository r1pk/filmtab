import { useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Plyr from 'plyr-react';

import { resolveVideoSource } from '../utils/resolveVideoSource';
import { buildPlayerOptions } from '../utils/buildPlayerOptions';

const VideoPlayer = ({ url, playing, progress, onTogglePlay, onSeekVideo, ...rest }) => {
  const componentMountTimestamp = useMemo(() => new Date().getTime(), []);
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
    if (player.current.plyr.ready !== undefined) {
      player.current.plyr.once('ready', () => {
        player.current.plyr.once('playing', () => {
          const shouldAddOffset = progress !== 0;
          const offset = shouldAddOffset ? (new Date().getTime() - componentMountTimestamp) / 1000 : 0;

          player.current.plyr.currentTime = progress + offset;
        });
        player.current.plyr.togglePlay(playing);
      });
    }
  }, [playing, progress, componentMountTimestamp]);

  useEffect(() => {
    if (player.current.plyr.ready) {
      player.current.plyr.currentTime = progress;
      player.current.plyr.togglePlay(playing);
    }
  }, [playing, progress]);

  return <Plyr ref={player} source={videoSource} options={playerOptions} {...rest} />;
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onSeekVideo: PropTypes.func.isRequired,
};

export default VideoPlayer;
