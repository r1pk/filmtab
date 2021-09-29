import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';

import { AppBar, Toolbar, Link } from '@mui/material';
import { ConnectedTv } from '@mui/icons-material';

const Brand = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Header = ({ brandName }) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Brand variant="h6" underline="none" color="inherit" component={RouterLink} to="/">
          <ConnectedTv />
          {brandName}
        </Brand>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  brandName: PropTypes.string.isRequired,
};

export default Header;
