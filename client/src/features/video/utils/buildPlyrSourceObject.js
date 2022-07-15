import { providers } from '../defaults/providers';

export const buildPlyrSourceObject = (url, subtitles) => {
  const provider = providers.find((provider) => provider.isVideoSupported(url));
  const source = {
    type: 'video',
    sources: [],
    tracks: [],
  };

  if (provider) {
    source.sources.push({
      src: url,
      provider: provider.getProviderName(),
    });
  }

  if (subtitles) {
    const blob = new Blob([subtitles], { type: 'text/vtt' });

    source.tracks.push({
      kind: 'subtitles',
      src: URL.createObjectURL(blob),
    });
  }

  return source;
};
