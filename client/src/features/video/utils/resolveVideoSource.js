import { providers } from '../defaults/providers';

export const resolveVideoProvider = (url) => {
  for (let provider of providers) {
    if (provider.pattern.test(url)) {
      return provider.name;
    }
  }
};

export const resolveVideoSource = (url) => {
  return {
    type: 'video',
    sources: [
      {
        src: url,
        provider: resolveVideoProvider(url),
      },
    ],
  };
};
