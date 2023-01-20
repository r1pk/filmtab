import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

class UsernameManager {
  saveUsername(username) {
    return window.localStorage.setItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY, username);
  }

  getSavedUsername() {
    return window.localStorage.getItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY);
  }

  removeSavedUsername() {
    return window.localStorage.removeItem(import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY);
  }

  isUsernameAlreadySaved() {
    return Boolean(this.getSavedUsername());
  }

  generateRandomUsername() {
    return uniqueNamesGenerator({
      style: 'capital',
      separator: '',
      dictionaries: [colors, animals],
      length: 2,
    });
  }

  getRecommendedUsername() {
    if (this.isUsernameAlreadySaved()) {
      return this.getSavedUsername();
    }

    return this.generateRandomUsername();
  }
}

export const usernameManager = new UsernameManager();
