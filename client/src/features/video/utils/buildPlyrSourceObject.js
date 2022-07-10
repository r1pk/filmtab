import { providers } from '../defaults/providers';

export const buildPlyrSourceObject = (url) => {
  const provider = providers.find((provider) => provider.isVideoSupported(url));

  if (provider) {
    return {
      type: 'video',
      sources: [
        {
          src: url,
          provider: provider.getProviderName(),
        },
      ],
    };
  }

  return null;
};
