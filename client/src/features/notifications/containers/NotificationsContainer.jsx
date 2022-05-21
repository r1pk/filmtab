import { useSelector, useDispatch } from 'react-redux';

import { closeNotification } from '../redux/actions';

import Notifications from '../components/Notifications';

const NotificationsContainer = (props) => {
  const notifications = useSelector((store) => store.notifications);

  const dispatch = useDispatch();

  const handleCloseNotification = (id) => {
    dispatch(closeNotification(id));
  };

  return <Notifications notifications={notifications} onCloseNotification={handleCloseNotification} {...props} />;
};

export default NotificationsContainer;
