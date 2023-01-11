export const restoreLastUsername = () => {
  return window.localStorage.getItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY);
};
