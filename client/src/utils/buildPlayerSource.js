import { playerProviders } from '@/constants/playerProviders';

export const buildPlayerSource = (url) => {
  const provider = playerProviders.find((provider) => provider.regexp.test(url));

  const source = {
    type: 'video',
    sources: [],
  };

  if (provider) {
    source.sources.push({
      src: url,
      provider: provider.name,
    });
  }

  return source;
};
