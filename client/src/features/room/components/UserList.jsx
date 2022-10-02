import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Paper, AvatarGroup, Skeleton } from '@mui/material';

import UserListItem from './UserListItem';

const UserList = forwardRef(({ users, ...rest }, ref) => {
  return (
    <Paper component={AvatarGroup} max={7} sx={{ p: 2, justifyContent: 'center' }} ref={ref} {...rest}>
      {users.length === 0 && <Skeleton variant="circular" width={44} height={44} />}
      {users.length > 0 && users.map((user) => <UserListItem key={user.id} user={user} />)}
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
