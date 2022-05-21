import { useSelector, useDispatch } from 'react-redux';

import { playVideo, pauseVideo, seekVideo } from '../redux/actions';

import VideoPlayer from '../components/VideoPlayer';

const VideoPlayerContainer = (props) => {
  const url = useSelector((store) => store.video.url);
  const playing = useSelector((store) => store.video.playing);
  const progress = useSelector((store) => store.video.progress);
  const dispatch = useDispatch();

  const handleTogglePlay = (isPlaying, progress) => {
    const action = isPlaying ? playVideo : pauseVideo;

    dispatch(action(progress));
  };

  const handleSeekVideo = (progress) => {
    dispatch(seekVideo(progress));
  };

  return (
    <VideoPlayer
      url={url}
      playing={playing}
      progress={progress}
      onTogglePlay={handleTogglePlay}
      onSeekVideo={handleSeekVideo}
      {...props}
    />
  );
};

export default VideoPlayerContainer;
