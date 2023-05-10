import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import Plyr from 'plyr';

import { playerConfig } from '@/configs/player-config';
import { buildPlayerSource } from '@/utils/build-player-source';
import { createSubtitleTrack } from '@/utils/create-subtitle-track';

const VideoPlayer = forwardRef(({ state, onPlaybackToggle, onVideoSeek, onceVideoPlaying }, ref) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const plyr = useRef(null);

  useEffect(
    function setupPlyrPlayer() {
      setIsPlayerReady(false);

      const handlePlaybackToggle = () => {
        onPlaybackToggle(plyr.current.currentTime);
      };

      const handleVideoSeek = () => {
        const { value, max } = plyr.current.elements.inputs.seek;
        const currentProgress = (value / max) * plyr.current.media.duration;

        onVideoSeek(currentProgress);
      };

      plyr.current = new Plyr(
        '.filmtab-player-target',
        Object.assign({}, playerConfig, {
          listeners: {
            play: handlePlaybackToggle,
            seek: handleVideoSeek,
          },
        })
      );
      plyr.current.on('ready', () => setIsPlayerReady(true));
      plyr.current.once('ready', () => {
        plyr.current.once('playing', onceVideoPlaying);
      });

      return function destroyPlyrPlayer() {
        plyr.current.destroy(() => setIsPlayerReady(false));
      };
    },
    [onPlaybackToggle, onVideoSeek, onceVideoPlaying]
  );

  useEffect(
    function setVideoSource() {
      if (state.url !== '') {
        setIsPlayerReady(false);

        plyr.current.source = buildPlayerSource(state.url);
      }
    },
    [state.url]
  );

  useEffect(
    function createVideoSubtitles() {
      if (isPlayerReady && plyr.current.isHTML5 && state.subtitles !== '') {
        const track = createSubtitleTrack(state.subtitles);

        plyr.current.media.appendChild(track);
        plyr.current.media.textTracks[0].mode = 'hidden';
      }

      return function removeVideoSubtitles() {
        if (plyr.current.isHTML5 && plyr.current.media) {
          plyr.current.media.querySelectorAll('track').forEach((track) => {
            track.remove();
          });
          plyr.current.currentTrack = -1;
        }
      };
    },

    [isPlayerReady, state.subtitles]
  );

  useEffect(
    function setVideoPlayback() {
      if (isPlayerReady) {
        plyr.current.togglePlay(state.playing);
        plyr.current.currentTime = state.progress;
      }
    },
    [isPlayerReady, state.playing, state.progress]
  );

  useImperativeHandle(ref, () => ({
    getCurrentProgress: () => plyr.current.currentTime,
  }));

  return <video className="filmtab-player-target" />;
});

VideoPlayer.displayName = 'VideoPlayer';

VideoPlayer.propTypes = {
  state: PropTypes.shape({
    url: PropTypes.string.isRequired,
    subtitles: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired,
  }),
  onPlaybackToggle: PropTypes.func.isRequired,
  onVideoSeek: PropTypes.func.isRequired,
  onceVideoPlaying: PropTypes.func.isRequired,
};

export default VideoPlayer;
