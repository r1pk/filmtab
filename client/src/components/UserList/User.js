import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Tooltip, Badge, Avatar } from '@mui/material';

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

const StyledUserStatus = styled('div')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isReady ? '#009432' : '#EA2027')};
  transition: background-color 0.1s ease;
`;

const User = ({ name, isReady, ...rest }) => {
  return (
    <Tooltip title={name} {...rest}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<StyledUserStatus isReady={isReady} />}
      >
        <StyledAvatar alt={name} name={name}>
          {name[0]}
        </StyledAvatar>
      </Badge>
    </Tooltip>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  isReady: PropTypes.bool,
};

User.defaultTypes = {
  isReady: false,
};

export default User;
