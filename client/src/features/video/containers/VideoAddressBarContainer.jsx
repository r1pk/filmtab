import { useSelector, useDispatch } from 'react-redux';

import { setVideo } from '../redux/actions';

import VideoAddressBar from '../components/VideoAddressBar';

const VideoAddressBarContainer = (props) => {
  const videoAddress = useSelector((store) => store.video.url);

  const dispatch = useDispatch();

  const handleSetVideo = (videoUrl) => {
    dispatch(setVideo(videoUrl));
  };

  return <VideoAddressBar videoAddress={videoAddress} onSetVideo={handleSetVideo} {...props} />;
};

export default VideoAddressBarContainer;
