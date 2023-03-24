import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

class UsernameManager {
  constructor() {
    this.LOCAL_STORAGE_KEY = import.meta.env.VITE_USERNAME_LOCALSTORAGE_KEY;
  }

  saveToLocalStorage(username) {
    return window.localStorage.setItem(this.LOCAL_STORAGE_KEY, username);
  }

  readFromLocalStorage() {
    return window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  clearLocalStorage() {
    return window.localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }

  createRandom() {
    return uniqueNamesGenerator({
      style: 'capital',
      separator: '',
      dictionaries: [colors, animals],
      length: 2,
    });
  }
}

export const usernameManager = new UsernameManager();
