import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import Plyr from 'plyr';

import { GlobalStyles } from '@mui/material';

import { playerSettings } from '@/configs/player-settings';

import { buildPlayerSource } from '@/utils/build-player-source';
import { createSubtitleTrack } from '@/utils/create-subtitle-track';

const componentGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '.plyr': {
        '--plyr-color-main': theme.palette.primary.main,
      },

      '.plyr__caption': {
        background: 'none',
        fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
        fontSize: '22px',
        fontWeight: '600',
        textShadow: '-1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000, 0 0 0.5rem #000',
      },
    })}
  />
);

const VideoPlayer = forwardRef(({ state, onTogglePlayback, onSeekVideo, oncePlaying }, ref) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const plyr = useRef(null);

  useEffect(
    function setupPlyrPlayer() {
      setIsPlayerReady(false);

      const handleTogglePlayback = () => {
        onTogglePlayback(plyr.current.currentTime);
      };

      const handleSeekVideo = () => {
        const { value, max } = plyr.current.elements.inputs.seek;
        const currentProgress = (value / max) * plyr.current.media.duration;

        onSeekVideo(currentProgress);
      };

      plyr.current = new Plyr(
        '.filmtab-player-target',
        Object.assign({}, playerSettings, {
          listeners: {
            play: handleTogglePlayback,
            seek: handleSeekVideo,
          },
        })
      );
      plyr.current.on('ready', () => setIsPlayerReady(true));
      plyr.current.once('ready', () => {
        plyr.current.once('playing', oncePlaying);
      });

      return function destroyPlyrPlayer() {
        plyr.current.destroy(() => setIsPlayerReady(false));
      };
    },
    [onTogglePlayback, onSeekVideo, oncePlaying]
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

  return (
    <>
      {componentGlobalStyles}
      <video className="filmtab-player-target" />
    </>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

VideoPlayer.propTypes = {
  state: PropTypes.shape({
    url: PropTypes.string.isRequired,
    subtitles: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired,
  }),
  onTogglePlayback: PropTypes.func.isRequired,
  onSeekVideo: PropTypes.func.isRequired,
  oncePlaying: PropTypes.func.isRequired,
};

export default VideoPlayer;
