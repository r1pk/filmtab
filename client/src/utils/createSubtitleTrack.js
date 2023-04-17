export const createSubtitleTrack = (subtitles) => {
  const track = document.createElement('track');
  const blob = new Blob([subtitles], { type: 'text/vtt' });

  Object.assign(track, {
    kind: 'subtitles',
    label: 'Subtitles',
    src: URL.createObjectURL(blob),
  });

  return track;
};
