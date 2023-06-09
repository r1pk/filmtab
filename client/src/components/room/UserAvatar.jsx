import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Avatar, Tooltip } from '@mui/material';

const UserAvatar = forwardRef(({ user, ...rest }, ref) => {
  return (
    <Tooltip title={user.username}>
      <Avatar name={user.username} alt={user.username} sx={{ backgroundColor: user.color }} ref={ref} {...rest}>
        {user.username[0]}
      </Avatar>
    </Tooltip>
  );
});

UserAvatar.displayName = 'UserAvatar';

UserAvatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserAvatar;
