export const providers = [
  {
    pattern: /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/,
    name: 'youtube',
  },
  {
    pattern: /vimeo\.com\/.+/,
    name: 'vimeo',
  },
  {
    pattern: /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/,
    name: 'html5',
  },
];
