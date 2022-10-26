import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

import Plyr from 'plyr';

import { useTheme } from '@mui/material';

import { options } from '../options/plyr';
import { buildPlayerSource } from '../utils/buildPlayerSource';
import { createSubtitleTrack } from '../utils/createSubtitleTrack';

const VideoPlayer = ({ state, requests, onTogglePlayback, onSeekVideo, onSyncResponse, onReadyToSeek }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const theme = useTheme();
  const plyr = useRef(null);

  useEffect(() => {
    const handleTogglePlayback = () => {
      onTogglePlayback(plyr.current.currentTime);
    };

    const handleSeekVideo = () => {
      const { value, max } = plyr.current.elements.inputs.seek;
      const currentProgress = (value / max) * plyr.current.media.duration;

      onSeekVideo(currentProgress);
    };

    const setupPlyrPlayer = () => {
      setIsPlayerReady(false);

      plyr.current = new Plyr(
        '.filmtab-player-target',
        Object.assign({}, options, {
          listeners: {
            play: handleTogglePlayback,
            seek: handleSeekVideo,
          },
        })
      );
      plyr.current.on('ready', () => setIsPlayerReady(true));
      plyr.current.once('ready', () => {
        plyr.current.once('playing', onReadyToSeek);
      });
    };

    setupPlyrPlayer();

    return () => {
      const destroyPlyrPlayer = () => {
        plyr.current.destroy(() => setIsPlayerReady(false));
      };

      destroyPlyrPlayer();
    };
  }, [onSeekVideo, onTogglePlayback, onReadyToSeek]);

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
      if (isPlayerReady && plyr.current.isHTML5 && state.subtitles !== '') {
        const track = createSubtitleTrack(state.subtitles);

        plyr.current.media.appendChild(track);
        plyr.current.media.textTracks[0].mode = 'hidden';
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
    const emitProgressResponse = () => {
      if (requests.syncProgress) {
        onSyncResponse(plyr.current.currentTime);
      }
    };

    emitProgressResponse();
  }, [requests.syncProgress, onSyncResponse]);

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
    syncProgress: PropTypes.bool.isRequired,
  }),
  onTogglePlayback: PropTypes.func.isRequired,
  onSeekVideo: PropTypes.func.isRequired,
  onSyncResponse: PropTypes.func.isRequired,
  onReadyToSeek: PropTypes.func.isRequired,
};

export default VideoPlayer;
