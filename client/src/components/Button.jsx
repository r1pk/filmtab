import PropTypes from 'prop-types';

import { Button as MUIButton } from '@mui/material';

const Button = ({ children, ...rest }) => {
  return (
    <MUIButton variant="contained" size="small" {...rest}>
      {children}
    </MUIButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Button;
