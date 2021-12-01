import ValidationTextField from './ValidationTextField';

const validator = (value) => {
  const validAddressPatterns = [
    /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/,
    /vimeo\.com\/.+/,
    /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/,
  ];
  const validAddressPatternIndex = validAddressPatterns.findIndex((validAddressPattern) =>
    validAddressPattern.test(value)
  );

  return validAddressPatternIndex !== -1;
};

const VideoAddressField = (props) => {
  return <ValidationTextField fullWidth variant="outlined" label="Video Address" validator={validator} {...props} />;
};

export default VideoAddressField;
