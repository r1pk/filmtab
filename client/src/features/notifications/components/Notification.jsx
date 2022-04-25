import PropTypes from 'prop-types';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

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
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  type: 'info',
  message: '',
};

export default Notification;
