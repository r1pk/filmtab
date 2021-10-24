import ReactPlayer from 'react-player';

import ValidationTextField from './ValidationTextField';

const validator = (value) => {
  return ReactPlayer.canPlay(value);
};

const VideoAddressField = (props) => {
  return <ValidationTextField fullWidth variant="outlined" label="Video Address" validator={validator} {...props} />;
};

export default VideoAddressField;
