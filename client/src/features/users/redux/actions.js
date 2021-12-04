export const ADD_USER = 'users/add';
export const REMOVE_USER = 'users/remove';
export const RESET_USERS = 'users/reset';

export const addUser = (user, sessionId) => ({
  type: ADD_USER,
  payload: {
    user,
    sessionId,
  },
});

export const removeUser = (sessionId) => ({
  type: REMOVE_USER,
  payload: {
    sessionId,
  },
});

export const resetUsers = () => ({
  type: RESET_USERS,
});
