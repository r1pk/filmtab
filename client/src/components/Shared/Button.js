import PropTypes from 'prop-types';

import { Button as MuiButton } from '@mui/material';

const Button = ({ children, ...rest }) => {
  return (
    <MuiButton variant="contained" size="small" {...rest}>
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Button;
