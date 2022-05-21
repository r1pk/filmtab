import PropTypes from 'prop-types';

import { SnackbarProvider } from 'notistack';

import NotificationHandler from './NotificationHandler';

const Notifications = ({ notifications, onCloseNotification, children, ...rest }) => {
  return (
    <SnackbarProvider dense={true} {...rest}>
      {children}
      <NotificationHandler notifications={notifications} onCloseNotification={onCloseNotification} />
    </SnackbarProvider>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  onCloseNotification: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Notifications;
