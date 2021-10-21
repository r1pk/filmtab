import { useSelector, useDispatch } from 'react-redux';

import { closeNotification } from '../actions/notifications';

import Notification from '../components/Notification';

const NotificationContainer = (props) => {
  const queue = useSelector((state) => state.notifications.queue);
  const isNotificationAvailable = queue.length > 0;

  const dispatch = useDispatch();

  const handleCloseNotification = (e, reason) => {
    if (reason !== 'clickaway') {
      dispatch(closeNotification());
    }
  };

  return (
    isNotificationAvailable && (
      <Notification
        open={true}
        autoHideDuration={10000}
        onClose={handleCloseNotification}
        type={queue[0].type}
        message={queue[0].message}
        key={queue[0].message}
        {...props}
      />
    )
  );
};

export default NotificationContainer;
