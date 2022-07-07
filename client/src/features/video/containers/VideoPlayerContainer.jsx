import { useSelector, useDispatch } from 'react-redux';

import { toggleVideoPlayback, seekVideo, saveVideoProgress } from '../redux/actions';

import VideoPlayer from '../components/VideoPlayer';

const VideoPlayerContainer = (props) => {
  const url = useSelector((store) => store.video.url);
  const playing = useSelector((store) => store.video.playing);
  const progress = useSelector((store) => store.video.progress);
  const localUpdateTimestamp = useSelector((store) => store.video.localUpdateTimestamp);
  const dispatch = useDispatch();

  const handleTogglePlayback = (progress) => {
    dispatch(toggleVideoPlayback(progress));
  };

  const handleSeekVideo = (progress) => {
    dispatch(seekVideo(progress));
  };

  const handleVideoProgress = (progress) => {
    dispatch(saveVideoProgress(progress));
  };

  return (
    <VideoPlayer
      url={url}
      playing={playing}
      progress={progress}
      updateTimestamp={localUpdateTimestamp}
      onTogglePlayback={handleTogglePlayback}
      onSeekVideo={handleSeekVideo}
      onVideoProgress={handleVideoProgress}
      {...props}
    />
  );
};

export default VideoPlayerContainer;
