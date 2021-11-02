import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box } from '@mui/material';

const PlayerContainer = styled(Box)`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  background: #191919;
  cursor: ${(p) => (p.isUserIdle ? 'none' : 'default')};

  & > :last-child {
    transform: ${(p) => (p.isUserIdle ? 'translateY(100%)' : 'none')};
  }
`;

PlayerContainer.propTypes = {
  isUserIdle: PropTypes.bool,
};

PlayerContainer.defaultProps = {
  isUserIdle: false,
};

export default PlayerContainer;
