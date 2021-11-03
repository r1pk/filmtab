import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Tooltip, Avatar } from '@mui/material';

const createValue = (sum) => {
  const sin = Math.sin(sum).toString().substr(6);
  return ~~(parseFloat('0.' + sin) * 150);
};

const getAvatarColor = (name) => {
  const sum = name.split('').reduce((p, c) => (p += c.charCodeAt(0)), 0);
  return `rgb(${createValue(sum + 1)}, ${createValue(sum + 2)}, ${createValue(sum + 3)})`;
};

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
