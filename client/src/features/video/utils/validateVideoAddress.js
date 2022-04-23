import { providers } from '../defaults/providers';

export const validateVideoAddress = (url) => {
  for (let provider of providers) {
    if (provider.pattern.test(url)) {
      return true;
    }
  }
  return false;
};
