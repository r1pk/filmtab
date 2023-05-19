import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { AvatarGroup, Paper, Skeleton } from '@mui/material';

import UserAvatar from './UserAvatar';

const UserList = forwardRef(({ users, ...rest }, ref) => {
  return (
    <Paper sx={{ p: 1 }} ref={ref} {...rest}>
      <AvatarGroup max={7} sx={{ justifyContent: 'center' }}>
        {users.length === 0 && <Skeleton variant="circular" width={44} height={44} />}
        {users.length > 0 && users.map((user) => <UserAvatar key={user.id} user={user} />)}
      </AvatarGroup>
    </Paper>
  );
});

UserList.displayName = 'UserList';

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
