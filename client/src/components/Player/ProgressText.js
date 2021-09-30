import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Typography } from '@mui/material';

const formatTime = (seconds) => {
  const isoString = new Date(seconds * 1000).toISOString();

  if (seconds < 3600) {
    return isoString.substr(14, 5);
  }
  return isoString.substr(11, 8);
};

const StyledTypography = styled(Typography)`
  font-size: 0.775rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ProgressText = ({ playedSeconds, videoDuration, ...rest }) => {
  return (
    <StyledTypography variant="body2" {...rest}>
      {formatTime(playedSeconds)}/{formatTime(videoDuration)}
    </StyledTypography>
  );
};

ProgressText.propTypes = {
  playedSeconds: PropTypes.number,
  videoDuration: PropTypes.number,
};

ProgressText.defaultProps = {
  playedSeconds: 0,
  videoDuration: 0,
};

export default ProgressText;
