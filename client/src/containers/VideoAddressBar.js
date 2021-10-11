import { useSelector, useDispatch } from 'react-redux';

import { setVideo } from '../actions/room';

import VideoAddressBar from '../components/VideoAddressBar';

const VideoAddressBarContainer = (props) => {
  const videoAddress = useSelector((state) => state.room.video.url);

  const dispatch = useDispatch();

  const handleSetVideo = (videoUrl) => {
    return dispatch(setVideo(videoUrl));
  };

  return <VideoAddressBar roomVideoAddress={videoAddress} onSetVideo={handleSetVideo} {...props} />;
};

export default VideoAddressBarContainer;
