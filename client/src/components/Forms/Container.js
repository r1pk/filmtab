import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box, Typography, Divider } from '@mui/material';

const StyledContainer = styled(Box)`
  min-width: 300px;
  min-height: 252px;
  padding: 24px;
  border: 1px solid #282828;
`;

const Container = ({ header, children }) => {
  return (
    <StyledContainer>
      <Typography variant="h6" align="center">
        {header}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {children}
    </StyledContainer>
  );
};

Container.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Container;
