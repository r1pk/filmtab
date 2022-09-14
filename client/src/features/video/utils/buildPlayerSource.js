import { providers } from '../settings/plyr';

export const buildPlayerSource = (url) => {
  const provider = Object.keys(providers).find((provider) => providers[provider].test(url));
  const source = {
    type: 'video',
    sources: [],
  };

  if (provider) {
    source.sources.push({
      src: url,
      provider: provider,
    });
  }

  return source;
};
