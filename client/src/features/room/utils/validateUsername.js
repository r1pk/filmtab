export const validateUsername = (username) => {
  return username.replace(/[^a-zA-Z0-9 ]/g, '').length >= 3;
};
