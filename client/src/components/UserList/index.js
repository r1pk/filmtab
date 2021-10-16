import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import User from './User';

const UserList = ({ users }) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
      {users.map((user) => (
        <User name={user.name} isReady={user.isReady} key={user.name} />
      ))}
    </Stack>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isReady: PropTypes.bool,
    })
  ).isRequired,
};

export default UserList;
