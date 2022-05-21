export const ADD_NOTIFICATION = 'notifications/add';
export const CLOSE_NOTIFICATION = 'notifications/close';
export const CLEAR_NOTIFICATIONS = 'notifications/clear';

export const addNotification = (type, message) => ({
  type: ADD_NOTIFICATION,
  payload: {
    type,
    message,
  },
});

export const closeNotification = (id) => ({
  type: CLOSE_NOTIFICATION,
  payload: {
    id,
  },
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});
