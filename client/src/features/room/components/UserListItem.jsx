import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Avatar, Tooltip } from '@mui/material';

const UserListItem = forwardRef(({ user }, ref) => {
  return (
    <Tooltip title={user.username}>
      <Avatar name={user.username} alt={user.username} sx={{ backgroundColor: user.color }} ref={ref}>
        {user.username[0]}
      </Avatar>
    </Tooltip>
  );
});

UserListItem.displayName = 'UserListItem';

UserListItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserListItem;
