import { useSelector, useDispatch } from 'react-redux';

import { playVideo, pauseVideo, seekVideo } from '../redux/actions';

import VideoPlayer from '../components/VideoPlayer';

const VideoPlayerContainer = (props) => {
  const url = useSelector((store) => store.video.url);
  const playing = useSelector((store) => store.video.playing);
  const playedSeconds = useSelector((store) => store.video.playedSeconds);

  const dispatch = useDispatch();

  const handleTogglePlay = (isPlaying, playedSeconds) => {
    const action = isPlaying ? playVideo : pauseVideo;

    dispatch(action(playedSeconds));
  };

  const handleSeekVideo = (playedSeconds) => {
    dispatch(seekVideo(playedSeconds));
  };

  return (
    <VideoPlayer
      url={url}
      playing={playing}
      playedSeconds={playedSeconds}
      onTogglePlay={handleTogglePlay}
      onSeekVideo={handleSeekVideo}
      {...props}
    />
  );
};

export default VideoPlayerContainer;
