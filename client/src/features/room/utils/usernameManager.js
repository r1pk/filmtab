import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

const saveUsername = (username) => {
  return window.localStorage.setItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY, username);
};

const getSavedUsername = () => {
  return window.localStorage.getItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY);
};

const getRandomUsername = () => {
  return uniqueNamesGenerator({
    style: 'capital',
    separator: '',
    dictionaries: [colors, animals],
    length: 2,
  });
};

const removeSavedUsername = () => {
  return window.localStorage.removeItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY);
};

const isUsernameAlreadySaved = () => {
  return Boolean(getSavedUsername());
};

const getRecommendedUsername = () => {
  if (isUsernameAlreadySaved()) {
    return getSavedUsername();
  }

  return getRandomUsername();
};

export const usernameManager = {
  saveUsername,
  getSavedUsername,
  getRandomUsername,
  removeSavedUsername,
  isUsernameAlreadySaved,
  getRecommendedUsername,
};
