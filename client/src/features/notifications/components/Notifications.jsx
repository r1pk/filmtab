import PropTypes from 'prop-types';

import Notification from '../components/Notification';

const Notifications = ({ notifications, onCloseNotification, ...rest }) => {
  const isNotificationAvailable = notifications.length > 0;

  const handleCloseNotification = (e, reason) => {
    if (reason !== 'clickaway') {
      onCloseNotification();
    }
  };

  return (
    isNotificationAvailable && (
      <Notification
        open
        autoHideDuration={10000}
        onClose={handleCloseNotification}
        type={notifications[0].type}
        message={notifications[0].message}
        key={notifications[0].id}
        {...rest}
      />
    )
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string,
      message: PropTypes.string,
    })
  ),
  onCloseNotification: PropTypes.func.isRequired,
};

export default Notifications;
