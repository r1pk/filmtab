export const saveUsername = (username) => {
  window.localStorage.setItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY, username);
};
