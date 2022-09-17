import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

import Plyr from 'plyr';

import { useTheme } from '@mui/material';

import { options } from '../settings/plyr';
import { buildPlayerSource } from '../utils/buildPlayerSource';
import { createSubtitleTrack } from '../utils/createSubtitleTrack';

const VideoPlayer = ({ state, requests, onTogglePlayback, onSeekVideo, onProgressResponse }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const theme = useTheme();
  const plyr = useRef(null);

  useEffect(() => {
    const setupPlyrPlayer = () => {
      setIsPlayerReady(false);

      plyr.current = new Plyr('.filmtab-player-target', options);
      plyr.current.on('ready', () => setIsPlayerReady(true));
    };

    setupPlyrPlayer();

    return () => {
      const destroyPlyrPlayer = () => {
        plyr.current.destroy(() => setIsPlayerReady(false));
      };

      destroyPlyrPlayer();
    };
  }, []);

  useEffect(() => {
    const setVideoSource = () => {
      if (state.url !== '') {
        setIsPlayerReady(false);

        plyr.current.source = buildPlayerSource(state.url);
      }
    };

    setVideoSource();
  }, [state.url]);

  useEffect(() => {
    const addVideoSubtitles = () => {
      if (isPlayerReady && plyr.current.isHTML5) {
        if (state.subtitles !== '') {
          const track = createSubtitleTrack(state.subtitles);

          plyr.current.media.appendChild(track);
          plyr.current.media.textTracks[0].mode = 'hidden';
        }
      }
    };

    addVideoSubtitles();

    return () => {
      const clearVideoSubtitles = () => {
        if (plyr.current.isHTML5 && plyr.current.media) {
          plyr.current.media.querySelectorAll('track').forEach((track) => {
            track.remove();
          });
          plyr.current.currentTrack = -1;
        }
      };

      clearVideoSubtitles();
    };
  }, [isPlayerReady, state.subtitles]);

  useEffect(() => {
    const setVideoPlayback = async () => {
      if (isPlayerReady) {
        await plyr.current.togglePlay(state.playing);
        plyr.current.currentTime = state.progress;
      }
    };

    setVideoPlayback();
  }, [isPlayerReady, state.playing, state.progress]);

  useEffect(() => {
    const handleTogglePlayback = () => {
      if (onTogglePlayback) {
        onTogglePlayback(plyr.current.currentTime);
      }
    };

    const setupListeners = () => {
      if (isPlayerReady) {
        plyr.current.elements.buttons.play.forEach((element) => {
          element.addEventListener('click', handleTogglePlayback);
        });
      }
    };

    setupListeners();

    return () => {
      const removeListeners = () => {
        if (plyr.current.elements.buttons.play) {
          plyr.current.elements.buttons.play.forEach((element) => {
            element.removeEventListener('input', handleTogglePlayback);
          });
        }
      };

      removeListeners();
    };
  }, [isPlayerReady, onTogglePlayback]);

  useEffect(() => {
    const handleSeekVideo = () => {
      const { value, max } = plyr.current.elements.inputs.seek;
      const currentProgress = (value / max) * plyr.current.media.duration;

      if (onSeekVideo) {
        onSeekVideo(currentProgress);
      }
    };

    const setupListeners = () => {
      if (isPlayerReady) {
        plyr.current.elements.inputs.seek.addEventListener('input', handleSeekVideo);
      }
    };

    setupListeners();

    return () => {
      const removeListeners = () => {
        if (plyr.current.elements.inputs.seek) {
          plyr.current.elements.inputs.seek.removeEventListener('input', handleSeekVideo);
        }
      };

      removeListeners();
    };
  }, [isPlayerReady, onSeekVideo]);

  useEffect(() => {
    const emitProgressResponse = () => {
      if (requests.progress) {
        onProgressResponse(plyr.current.currentTime);
      }
    };

    emitProgressResponse();
  }, [requests.progress, onProgressResponse]);

  return <video className="filmtab-player-target" style={{ '--plyr-color-main': theme.palette.primary.main }} />;
};

VideoPlayer.propTypes = {
  state: PropTypes.shape({
    url: PropTypes.string.isRequired,
    subtitles: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired,
  }),
  requests: PropTypes.shape({
    progress: PropTypes.bool.isRequired,
  }),
  onTogglePlayback: PropTypes.func.isRequired,
  onSeekVideo: PropTypes.func.isRequired,
  onProgressResponse: PropTypes.func.isRequired,
};

export default VideoPlayer;
