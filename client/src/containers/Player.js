import { useSelector, useDispatch } from 'react-redux';

import { playVideo, pauseVideo, seekVideo } from '../actions/room';

import Player from '../components/Player';

const PlayerContainer = (props) => {
  const url = useSelector((state) => state.room.video.url);
  const playing = useSelector((state) => state.room.video.playing);
  const playedSeconds = useSelector((state) => state.room.video.playedSeconds);

  const dispatch = useDispatch();

  const handleTogglePlay = (isPlaying, playedSeconds) => {
    const action = isPlaying ? playVideo : pauseVideo;
    dispatch(action(playedSeconds));
  };

  const handleVideoSeek = (playedSeconds) => {
    dispatch(seekVideo(playedSeconds));
  };

  return (
    <Player
      url={url}
      playing={playing}
      playedSeconds={playedSeconds}
      onTogglePlay={handleTogglePlay}
      onVideoSeek={handleVideoSeek}
      {...props}
    />
  );
};

export default PlayerContainer;
