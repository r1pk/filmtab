import { providers } from '../defaults/providers';

export const validateVideoAddress = (url) => {
  return providers.some((provider) => provider.isVideoSupported(url));
};
