import { useCallback, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Plyr from 'plyr-react';

const resolveVideoProvider = (url) => {
  const supportedProviders = [
    {
      pattern: /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/,
      name: 'youtube',
    },
    {
      pattern: /vimeo\.com\/.+/,
      name: 'vimeo',
    },
    {
      pattern: /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/,
      name: 'html5',
    },
  ];

  for (let supportedProvider of supportedProviders) {
    if (supportedProvider.pattern.test(url)) {
      return supportedProvider.name;
    }
  }
};

const resolveVideoSource = (url) => {
  return {
    type: 'video',
    sources: [
      {
        src: url,
        provider: resolveVideoProvider(url),
      },
    ],
  };
};

const buildPlayerOptions = (listeners = {}) => {
  const defaultOptions = {
    controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen'],
    keyboard: {
      focused: false,
      global: false,
    },
  };

  return {
    ...defaultOptions,
    listeners: {
      ...defaultOptions.listeners,
      ...listeners,
    },
  };
};

const Player = ({ url, playing, playedSeconds, updateTimestamp, onTogglePlay, onVideoSeek, ...rest }) => {
  const player = useRef(null);

  const handleTogglePlay = () => {
    const { playing, currentTime } = player.current.plyr;
    onTogglePlay(!playing, currentTime);
  };

  const handleVideoSeek = (e) => {
    const currentVideoProgress = (e.target.value / e.target.max) * player.current.plyr.media.duration;
    onVideoSeek(currentVideoProgress);
  };

  const videoSource = useMemo(() => resolveVideoSource(url), [url]);
  const playerOptions = useMemo(
    () =>
      buildPlayerOptions({
        play: handleTogglePlay,
        seek: handleVideoSeek,
      }),
    // eslint-disable-next-line
    []
  );

  const setPlayerRef = useCallback(
    (node) => {
      if (node !== null && node.plyr.ready !== undefined) {
        if (!node.plyr.isAlreadyUsedInstance) {
          node.plyr.once('ready', (e) => {
            e.detail.plyr.once('playing', () => {
              const offset = playedSeconds === 0 ? 0 : (new Date().getTime() - updateTimestamp) / 1000;
              e.detail.plyr.currentTime = playedSeconds + offset;
            });
            e.detail.plyr.togglePlay(playing);
          });
          node.plyr.isAlreadyUsedInstance = true;
        }
      }
      player.current = node;
    },
    [playing, playedSeconds, updateTimestamp]
  );

  useEffect(() => {
    if (player.current !== null && player.current.plyr.ready) {
      player.current.plyr.currentTime = playedSeconds;
      player.current.plyr.togglePlay(playing);
    }
  }, [playing, playedSeconds]);

  return <Plyr ref={setPlayerRef} source={videoSource} options={playerOptions} {...rest} />;
};

Player.propTypes = {
  url: PropTypes.string,
  playing: PropTypes.bool,
  playedSeconds: PropTypes.number,
  updateTimestamp: PropTypes.number,
  onTogglePlay: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
};

Player.defaultProps = {
  url: '',
  playing: false,
  playedSeconds: 0,
  updateTimestamp: 0,
};

export default Player;
