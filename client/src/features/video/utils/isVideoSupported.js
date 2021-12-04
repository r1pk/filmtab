import { providers } from '../defaults/providers';

export const isVideoSupported = (url) => {
  for (let provider of providers) {
    if (provider.pattern.test(url)) {
      return true;
    }
  }
  return false;
};
