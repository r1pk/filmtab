import PropTypes from 'prop-types';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

const capitalizeFirstLetter = (string = '') => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Notification = ({ type, message, onClose, ...rest }) => {
  const handleCloseNotification = (e, reason = 'button') => {
    onClose(e, reason);
  };

  return (
    <Snackbar onClose={handleCloseNotification} {...rest}>
      <Alert onClose={handleCloseNotification} severity={type} sx={{ width: '100%' }}>
        {type && <AlertTitle>{capitalizeFirstLetter(type)}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  type: 'info',
};

export default Notification;
