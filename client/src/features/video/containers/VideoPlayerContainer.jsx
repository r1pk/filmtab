import { useSelector, useDispatch } from 'react-redux';

import { playVideo, pauseVideo, seekVideo, sendProgressIntervalTick } from '../redux/actions';

import VideoPlayer from '../components/VideoPlayer';

const VideoPlayerContainer = (props) => {
  const url = useSelector((store) => store.video.url);
  const playing = useSelector((store) => store.video.playing);
  const progress = useSelector((store) => store.video.progress);
  const localUpdateTimestamp = useSelector((store) => store.video.localUpdateTimestamp);
  const dispatch = useDispatch();

  const handleTogglePlay = (isPlaying, progress) => {
    const action = isPlaying ? playVideo : pauseVideo;

    dispatch(action(progress));
  };

  const handleSeekVideo = (progress) => {
    dispatch(seekVideo(progress));
  };

  const handleProgressIntervalTick = (progress) => {
    dispatch(sendProgressIntervalTick(progress));
  };

  return (
    <VideoPlayer
      url={url}
      playing={playing}
      progress={progress}
      updateTimestamp={localUpdateTimestamp}
      onTogglePlay={handleTogglePlay}
      onSeekVideo={handleSeekVideo}
      onProgressIntervalTick={handleProgressIntervalTick}
      {...props}
    />
  );
};

export default VideoPlayerContainer;
