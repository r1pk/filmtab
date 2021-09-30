import PropTypes from 'prop-types';

import { Button as MuiButton } from '@mui/material';

const Button = ({ children, ...props }) => {
  return (
    <MuiButton variant="contained" size="small" {...props}>
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Button;
