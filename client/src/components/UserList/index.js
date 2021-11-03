import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import User from './User';

const UserList = ({ users, ...rest }) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" {...rest}>
      {users.map((user) => (
        <User name={user.name} key={user.name} />
      ))}
    </Stack>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
