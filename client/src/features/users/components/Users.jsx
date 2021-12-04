import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import User from './User';

const Users = ({ users, ...rest }) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" {...rest}>
      {users.map((user) => (
        <User name={user.name} key={user.sessionId} />
      ))}
    </Stack>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sessionId: PropTypes.string,
    })
  ),
};

Users.defaultProps = {
  users: [],
};

export default Users;
