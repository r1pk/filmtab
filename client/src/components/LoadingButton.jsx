import PropTypes from 'prop-types';

import { Button as MUIButton, CircularProgress } from '@mui/material';

const LoadingButton = ({ loading, disabled, children, ...rest }) => {
  const shouldBeDisabled = loading || disabled;
  const loadingButtonIcon = loading ? <CircularProgress color="inherit" size={16} /> : null;

  return (
    <MUIButton variant="contained" size="small" disabled={shouldBeDisabled} startIcon={loadingButtonIcon} {...rest}>
      {children}
    </MUIButton>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LoadingButton;
