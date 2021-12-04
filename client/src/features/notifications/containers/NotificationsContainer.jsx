import { useSelector, useDispatch } from 'react-redux';

import { closeNotification } from '../redux/actions';

import Notifications from '../components/Notifications';

const NotificationsContainer = (props) => {
  const notifications = useSelector((store) => store.notifications);

  const dispatch = useDispatch();

  const handleCloseNotification = () => {
    dispatch(closeNotification());
  };

  return <Notifications notifications={notifications} onCloseNotification={handleCloseNotification} {...props} />;
};

export default NotificationsContainer;
