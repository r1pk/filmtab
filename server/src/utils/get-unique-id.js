export const availableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const getUniqueId = (length = 8) => {
  let uniqueString = '';

  for (let i = 0; i < length; i++) {
    uniqueString += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
  }

  return uniqueString;
};
