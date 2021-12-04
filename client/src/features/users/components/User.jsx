import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Tooltip, Avatar } from '@mui/material';

import { getAvatarColor } from '../utils/getAvatarColor';

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => getAvatarColor(props.name)};
  color: #f1f2f3;
`;

const User = ({ name, ...rest }) => {
  return (
    <Tooltip title={name} {...rest}>
      <StyledAvatar alt={name} name={name}>
        {name[0]}
      </StyledAvatar>
    </Tooltip>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
