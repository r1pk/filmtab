import PropTypes from 'prop-types';

import { Tooltip, Avatar } from '@mui/material';

import { getAvatarColor } from '../utils/getAvatarColor';

const User = ({ name, ...rest }) => {
  return (
    <Tooltip title={name} {...rest}>
      <Avatar alt={name} name={name} sx={{ bgcolor: getAvatarColor(name), color: '#f1f2f3' }}>
        {name[0]}
      </Avatar>
    </Tooltip>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
