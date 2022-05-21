import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';

const NotificationHandler = ({ notifications, onCloseNotification }) => {
  const { enqueueSnackbar } = useSnackbar();

  const activeNotifications = useRef([]);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!activeNotifications.current.includes(notification.id)) {
        enqueueSnackbar(notification.message, {
          key: notification.id,
          variant: notification.type,
          onClose: (event, reason, key) => {
            if (reason === 'timeout') {
              onCloseNotification(key);

              activeNotifications.current = activeNotifications.current.filter((id) => id !== key);
            }
          },
        });

        activeNotifications.current.push(notification.id);
      }
    });
  }, [enqueueSnackbar, notifications, onCloseNotification]);

  return null;
};

NotificationHandler.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ),
  onCloseNotification: PropTypes.func.isRequired,
};

export default NotificationHandler;
