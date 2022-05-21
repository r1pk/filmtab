import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import User from './User';

const Users = ({ users, ...rest }) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" {...rest}>
      {users.map((user) => (
        <User name={user.name} color={user.color} key={user.sessionId} />
      ))}
    </Stack>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      sessionId: PropTypes.string.isRequired,
    })
  ),
};

export default Users;
