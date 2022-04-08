import PropTypes from 'prop-types';

import { Tooltip, Avatar } from '@mui/material';

const User = ({ name, color, ...rest }) => {
  return (
    <Tooltip title={name} {...rest}>
      <Avatar alt={name} name={name} sx={{ bgcolor: color, color: '#f1f2f3' }}>
        {name[0]}
      </Avatar>
    </Tooltip>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default User;
