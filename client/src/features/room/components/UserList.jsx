import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Paper, AvatarGroup } from '@mui/material';

import UserListItem from './UserListItem';

const UserList = forwardRef(({ users, ...rest }, ref) => {
  return (
    <Paper component={AvatarGroup} max={8} sx={{ p: 2, justifyContent: 'center' }} ref={ref} {...rest}>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
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
