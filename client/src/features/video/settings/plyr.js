export const providers = {
  youtube: /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/,
  vimeo: /vimeo\.com\/(?!progressive_redirect).+/,
  html5: /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,
};

export const options = {
  ratio: '16:9',
  debug: false,
  autoplay: false,
  clickToPlay: false,
  keyboard: {
    focused: false,
    global: false,
  },
  captions: {
    active: true,
    update: true,
  },
  controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'fullscreen'],
};
