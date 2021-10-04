import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { playVideo, pauseVideo, seekVideo } from '../actions/room';

import Player from '../components/Player';

const PlayerContainer = () => {
  const [isPlayerReady, setPlayerStatus] = useState(false);

  const videoUrl = useSelector((state) => state.room.video.url);
  const videoPlaying = useSelector((state) => state.room.video.playing);
  const playedSeconds = useSelector((state) => state.room.video.playedSeconds);

  const playerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.seekTo(playedSeconds);
    }
  }, [playedSeconds]);

  const handlePlayerReady = () => {
    setPlayerStatus(true);
  };

  const handlePlayState = () => {
    const currentVideoProgress = playerRef.current.getCurrentTime();

    if (videoPlaying) {
      return dispatch(pauseVideo(currentVideoProgress));
    }
    return dispatch(playVideo(currentVideoProgress));
  };

  const handleVideoSeek = (playedSeconds) => {
    return dispatch(seekVideo(playedSeconds));
  };

  return (
    <Player
      ref={playerRef}
      url={videoUrl}
      playing={videoPlaying}
      onReady={handlePlayerReady}
      onTogglePlay={handlePlayState}
      onVideoSeek={handleVideoSeek}
    />
  );
};

export default PlayerContainer;
