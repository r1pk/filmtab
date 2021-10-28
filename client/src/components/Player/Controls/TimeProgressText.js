import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

const convertSecondsToHMS = (seconds) => {
  const isoString = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? isoString.substr(14, 5) : isoString.substr(11, 8);
};

const TimeProgressText = ({ progress, duration, ...rest }) => {
  return (
    <Typography variant="body2" fontSize="0.775rem" {...rest}>
      {convertSecondsToHMS(progress)}/{convertSecondsToHMS(duration)}
    </Typography>
  );
};

TimeProgressText.propTypes = {
  progress: PropTypes.number,
  duration: PropTypes.number,
};

TimeProgressText.defaultProps = {
  progress: 0,
  duration: 0,
};

export default TimeProgressText;
