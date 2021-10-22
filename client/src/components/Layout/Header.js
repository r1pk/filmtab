import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';
import { AppBar, Toolbar, Link } from '@mui/material';
import { ConnectedTv } from '@mui/icons-material';

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Header = ({ brandName, ...rest }) => {
  return (
    <AppBar position="static" {...rest}>
      <Toolbar variant="dense">
        <StyledLink variant="h6" underline="none" color="inherit" component={RouterLink} to="/">
          <ConnectedTv />
          {brandName}
        </StyledLink>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  brandName: PropTypes.string.isRequired,
};

export default Header;
